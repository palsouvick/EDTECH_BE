'use strict';

/** Study books: chapter validation, table of contents, chapter view, practice modes, PYQ links and progress. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// The API reads chapters from BOOKS_DIR, so it must be set before the app is loaded.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'books-'));
process.env.BOOKS_DIR = dir;

const { createApp } = require('../src/app');
const { Question, ExamCategory, BookProgress, BookChapterState, User } = require('../src/models');
const config = require('../src/config');

const ADMIN_EMAIL = 'book-editor@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);
const { validateChapter } = require('../src/services/books.validate');
const books = require('../src/services/books');
const study = require('../src/services/bookStudy.service');
const { ensureBooks } = require('../scripts/seedBooks');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const catalog = require('../db/seed/catalog');

const REAL_DIR = path.join(__dirname, '../db/books/history');
const PYQ = 'WBCS-EXE-PRELIMS-2022-PRELIMS-Q46'; // the Harappan sites match question
const SECTIONS = ['discovery', 'town_planning', 'seals_script', 'decline'];
const LEVELS = ['basic', 'moderate', 'difficult', 'exam'];

/** A small valid chapter (Bengali text, NCERT source, 32 questions over 4 sections and 4 levels). */
function chapter(overrides = {}) {
  const ch = {
    book: 'history',
    code: 'HIS-02',
    number: 2,
    part: 'ancient',
    title: 'হরপ্পা সভ্যতা',
    subtitle: 'ভারতের প্রথম নগর সভ্যতা',
    subtopics: ['ivc'],
    related_facts: ['GK-HIS-104'],
    prerequisites: [],
    reading_minutes: { quick: 5, standard: 25, deep: 40 },
    status: 'PUBLISHED',
    verification: { status: 'VERIFIED', checked_at: '2026-11-11', notes: '' },
    overview: { intro: 'এই অধ্যায়ে হরপ্পা সভ্যতার কথা।', you_will_learn: ['আবিষ্কার', 'নগর পরিকল্পনা', 'লিপি'] },
    sections: SECTIONS.map((id, i) => ({
      id,
      heading: `অংশ ${i + 1}`,
      quick: 'সংক্ষেপে বলা হল।',
      standard: 'বিস্তারিত ব্যাখ্যা এখানে।',
      deep: i === 0 ? 'আরও গভীর আলোচনা।' : null,
      boxes: i === 1 ? [{ kind: 'exam_note', title: 'পরীক্ষার কথা', body: 'মনে রাখো।' }] : [],
      claims: ['c01'],
    })),
    events: [{ title: 'হরপ্পায় খনন', when: '১৯২১', what: 'খনন শুরু', why_it_matters: 'সভ্যতা চেনা গেল', section: 'discovery', claims: ['c01'] }],
    people: [{ name: 'দয়ারাম সাহনি', when: '১৯২১', role: 'প্রত্নতত্ত্ববিদ', contribution: 'হরপ্পায় খনন', section: 'discovery', claims: ['c01'] }],
    timeline: [
      { sort_year: -2600, when: 'খ্রিস্টপূর্ব ২৬০০', label: 'পরিণত পর্ব শুরু', claims: ['c01'] },
      { sort_year: 1921, when: '১৯২১', label: 'হরপ্পায় খনন', claims: ['c01'] },
    ],
    terms: [{ term: 'সিটাডেল', meaning: 'উঁচু অংশ', section: 'town_planning' }],
    cause_effect: [{ title: 'পতন', causes: ['জলবায়ু'], event: 'নগর ছেড়ে যাওয়া', results: ['গ্রামীণ জীবন'], section: 'decline', claims: ['c01'] }],
    exam_focus: [{ point: 'স্থান ও আবিষ্কারক মেলাও', section: 'discovery' }],
    bengal_connection: { body: 'রাখালদাস বন্দ্যোপাধ্যায়।', claims: ['c01'] },
    quick_revision: ['এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়'],
    sources: [{ id: 's1', title: 'Themes in Indian History Part I', class: 'XII', url: 'https://ncert.nic.in/textbook/pdf/lehs101.pdf', accessed_at: '2026-11-11' }],
    claims: [{ id: 'c01', claim: 'Daya Ram Sahni began excavations at Harappa in 1921.', source: 's1', page: 'p. 2', quote: 'Daya Ram Sahni' }],
    questions: Array.from({ length: 32 }, (_, i) => ({
      id: `q${String(i + 1).padStart(2, '0')}`,
      section: SECTIONS[i % 4],
      level: LEVELS[Math.floor(i / 8)],
      format: 'DIRECT',
      q: `প্রশ্ন নম্বর ${i + 1}: হরপ্পায় খনন কে শুরু করেন?`,
      a: 'দয়ারাম সাহনি',
      w: ['মর্টিমার হুইলার', 'এস. আর. রাও', 'জন মার্শাল'],
      e: 'দয়ারাম সাহনি ১৯২১ সালে খনন শুরু করেন।',
      claims: ['c01'],
    })),
  };
  return { ...ch, ...overrides };
}

let mongod;
let server;
let root;
const call = async (method, p, { body, user } = {}) => {
  const res = await fetch(root + p, { method, headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) }, body: body && JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};
const get = (p, opts) => call('GET', p, opts);

test.before(async () => {
  fs.mkdirSync(path.join(dir, 'history'));
  fs.copyFileSync(path.join(REAL_DIR, 'toc.js'), path.join(dir, 'history/toc.js'));
  fs.writeFileSync(path.join(dir, 'history/ch02-harappan.json'), JSON.stringify(chapter()));
  fs.writeFileSync(path.join(dir, 'history/ch22-partition.json'), JSON.stringify(chapter({
    code: 'HIS-22', number: 22, part: 'modern_national', title: 'বঙ্গভঙ্গ', subtopics: ['inc'], status: 'DRAFT', verification: { status: 'UNVERIFIED' },
    questions: chapter().questions.map((q) => ({ ...q, q: `${q.q} (খসড়া)` })),
  })));
  fs.writeFileSync(path.join(dir, 'history/pyq_map.json'), JSON.stringify({ 'HIS-02': [{ pyq_code: PYQ, section: 'discovery', taught: true }, { pyq_code: 'X-NOT-TAUGHT', section: 'decline', taught: false }] }));

  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('books_test'));
  await Promise.all([Question.init(), ExamCategory.init(), BookProgress.init(), BookChapterState.init(), User.init()]);
  await ExamCategory.insertMany(catalog);
  await importQuestionFile(path.join(PYQ_DIR, 'wbcs-prelims-2022.json'), { log: () => {}, warn: () => {} });
  await ensureBooks({ log: () => {} });
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('validator: the fixture is valid; missing parts, bad sources and bad questions are caught', () => {
  assert.deepEqual(validateChapter(chapter()), []);
  const codes = (ch) => validateChapter(ch).map((e) => e.code);
  assert.ok(codes(chapter({ sections: chapter().sections.slice(0, 3) })).includes('COUNT'));
  assert.ok(codes(chapter({ sources: [{ id: 's1', title: 'Wiki', url: 'https://en.wikipedia.org/wiki/Harappa' }] })).includes('SOURCE_NOT_ALLOWED'));
  assert.deepEqual(validateChapter(chapter({ sources: [{ id: 's1', title: 'অতীত ও ঐতিহ্য, অষ্টম শ্রেণি', class: 'VIII', url: 'https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit o Aityaja Class VIII.pdf' }] })), [], 'WBBSE e-Text Books are allowed');
  assert.ok(codes(chapter({ sources: [{ id: 's1', title: 'x', publisher: 'NCERT', url: 'https://banglarshiksha.wb.gov.in/readwrite/etextbook/x.pdf' }] })).includes('PUBLISHER_MISMATCH'));
  assert.ok(codes(chapter({ status: 'PUBLISHED', verification: { status: 'NEEDS_REVIEW' } })).includes('NOT_VERIFIED'));
  assert.ok(codes(chapter({ title: 'Harappan Civilisation' })).includes('NOT_BENGALI'));
  const qs = chapter().questions;
  assert.ok(codes(chapter({ questions: qs.slice(0, 10) })).includes('COUNT'));
  assert.ok(codes(chapter({ questions: [{ ...qs[0], w: ['দয়ারাম সাহনি', 'ক', 'খ'] }, ...qs.slice(1)] })).includes('DUPLICATE_OPTION'));
  assert.ok(codes(chapter({ questions: [{ ...qs[0], w: ['উপরের সবকটি', 'ক', 'খ'] }, ...qs.slice(1)] })).includes('BANNED_OPTION'));
  assert.ok(codes(chapter({ questions: [{ ...qs[0], claims: ['c99'] }, ...qs.slice(1)] })).includes('UNKNOWN_CLAIM'));
  assert.ok(codes(chapter({ questions: [{ ...qs[0], section: 'nowhere' }, ...qs.slice(1)] })).includes('UNKNOWN_SECTION'));
  assert.ok(codes(chapter({ questions: qs.filter((q) => q.level !== 'exam') })).includes('LEVEL_MISSING'));
  assert.ok(codes(chapter({ timeline: [...chapter().timeline].reverse() })).includes('NOT_SORTED'));
  assert.ok(codes(chapter({ subtopics: ['dinosaurs'] })).includes('UNKNOWN_SUBTOPIC'));
});

test('validator: Geography has a "locate it" table instead of a timeline, and may cite official government pages', () => {
  const codes = (ch) => validateChapter(ch).map((e) => e.code);
  const row = (i) => ({ place: `স্থান ${i}`, where: 'উত্তরাখণ্ড', about: 'নদীর উৎস', section: 'discovery', claims: ['c01'] });
  const geo = (overrides = {}) => {
    const ch = chapter({ book: 'geography', code: 'GEO-03', number: 3, part: 'india_land', subtopics: ['rivers'], locate: Array.from({ length: 6 }, (_, i) => row(i)), ...overrides });
    delete ch.timeline;
    delete ch.events;
    delete ch.people;
    return ch;
  };
  assert.deepEqual(validateChapter(geo()), [], 'no timeline, events or people needed');
  assert.ok(codes(geo({ locate: [row(1)] })).includes('REQUIRED'), 'too few locate rows');
  assert.ok(codes(geo({ locate: [...geo().locate.slice(1), { ...row(9), where: 'Uttarakhand' }] })).includes('NOT_BENGALI'));
  assert.ok(codes(geo({ part: 'ancient' })).includes('BAD_PART'));
  assert.ok(codes(geo({ code: 'HIS-03' })).includes('BAD_CODE'));
  assert.ok(codes(geo({ subtopics: ['ivc'] })).includes('UNKNOWN_SUBTOPIC'));
  const govt = [{ id: 's1', title: 'District list', url: 'https://wb.gov.in/districts.aspx' }];
  assert.deepEqual(validateChapter(geo({ sources: govt })), [], 'official *.gov.in pages are allowed for Geography');
  assert.ok(codes(chapter({ sources: govt })).includes('SOURCE_NOT_ALLOWED'), 'but not for History');
  assert.ok(codes(geo({ sources: [{ id: 's1', title: 'x', url: 'https://example.com/a' }] })).includes('SOURCE_NOT_ALLOWED'));
  assert.ok(codes({ ...geo(), book: 'polity' }).includes('BAD_BOOK'));
});

test('the real Geography folder: table of contents 1-16 in four parts, every chapter file valid', () => {
  const toc = require('../db/books/geography/toc.js');
  assert.deepEqual(toc.CHAPTERS.map((c) => c.number), Array.from({ length: 16 }, (_, i) => i + 1));
  assert.ok(toc.CHAPTERS.every((c) => toc.PARTS.some((p) => p.code === c.part)));
  const real = books.loadBook('geography', { dir: path.join(__dirname, '../db/books'), fresh: true });
  assert.deepEqual(real.errors, [], 'every chapter file in db/books/geography passes the validator');
});

test('the real book folder: table of contents has chapters 0-28 and every chapter file is valid', () => {
  const toc = require('../db/books/history/toc.js');
  assert.deepEqual(toc.CHAPTERS.map((c) => c.number), Array.from({ length: 29 }, (_, i) => i));
  assert.ok(toc.CHAPTERS.every((c) => toc.PARTS.some((p) => p.code === c.part)));
  const real = books.loadBook('history', { dir: path.join(__dirname, '../db/books'), fresh: true });
  assert.deepEqual(real.errors, [], 'every chapter file in db/books/history passes the validator');
  for (const [code, list] of Object.entries(real.pyqMap)) {
    const ch = real.chapters.get(code);
    assert.ok(ch, `pyq_map names a chapter that does not exist: ${code}`);
    for (const x of list.filter((y) => y.taught)) assert.ok(ch.sections.some((s) => s.id === x.section), `${code}: ${x.pyq_code} → unknown section ${x.section}`);
  }
});

test('table of contents: published chapters are available, drafts and unwritten chapters are not', async () => {
  const { status, body } = await get('/books/history');
  assert.equal(status, 200);
  const byCode = Object.fromEntries(body.data.chapters.map((c) => [c.code, c]));
  assert.equal(body.data.chapters.length, 29);
  assert.equal(byCode['HIS-02'].available, true);
  assert.equal(byCode['HIS-02'].questionCount, 32);
  assert.equal(byCode['HIS-02'].pyqCount, 1, 'only taught PYQs count');
  assert.deepEqual(byCode['HIS-02'].sections.map((s) => s.id), SECTIONS);
  assert.equal(byCode['HIS-22'].available, false, 'a DRAFT chapter is hidden from students');
  assert.equal(byCode['HIS-03'].available, false);
  assert.equal((await get('/books/history?preview=1')).body.data.chapters.find((c) => c.code === 'HIS-22').available, false, 'preview needs an admin');
  assert.equal((await get('/books/polity')).status, 400);
  assert.equal((await get('/books/geography')).status, 404, 'a known book whose folder is not there yet');
});

test('chapter view: sections with depths, no claim quotes, PYQ evidence on sections and exam focus, neighbours', async () => {
  const { status, body } = await get('/books/history/chapters/HIS-02');
  assert.equal(status, 200);
  const ch = body.data;
  assert.equal(ch.sections.length, 4);
  assert.ok(ch.sections.every((s) => s.quick && s.standard && Array.isArray(s.sources)));
  assert.equal(ch.sections[0].deep, 'আরও গভীর আলোচনা।');
  assert.equal(JSON.stringify(ch).includes('Daya Ram Sahni'), false, 'claims and quotes stay internal');
  assert.deepEqual(ch.sections[0].pyq, [{ exam: 'WBCS', years: [2022] }]);
  assert.deepEqual(ch.examFocus[0].pyq, [{ exam: 'WBCS', years: [2022] }]);
  assert.deepEqual(ch.pyq, { total: 1, byExam: [{ exam: 'WBCS', count: 1, years: [2022] }] });
  assert.equal(ch.previous.code, 'HIS-01');
  assert.equal(ch.next.code, 'HIS-03');
  assert.equal((await get('/books/history/chapters/HIS-22')).status, 404, 'draft hidden');
  assert.equal((await get('/books/history/chapters/HIS-05')).status, 404, 'not written yet');
});

test('seeding: Bengali-only questions with stable codes and section tags; drafts stay DRAFT; re-run changes nothing', async () => {
  const q = await Question.findOne({ code: 'BK-HIS-02-Q01' }).select('+correct_option_id').lean();
  assert.equal(q.status, 'PUBLISHED');
  assert.equal(q.lang_set, 'bn');
  assert.equal(q.stem.en, undefined);
  assert.equal(q.provenance, 'ORIGINAL_PRACTICE');
  assert.ok(q.concept_tags.includes('book:HIS-02:discovery'));
  assert.equal(await Question.countDocuments({ code: /^BK-HIS-22-/, status: 'DRAFT' }), 32);
  const again = await ensureBooks({ log: () => {} });
  assert.deepEqual([again.inserted, again.updated, again.retired], [0, 0, 0]);
  const id = String(q._id);
  // Correcting a question in the file updates it in place (same id).
  const file = path.join(dir, 'history/ch02-harappan.json');
  const ch = JSON.parse(fs.readFileSync(file, 'utf8'));
  ch.questions[0].e = 'সংশোধিত ব্যাখ্যা।';
  fs.writeFileSync(file, JSON.stringify(ch));
  const fixed = await ensureBooks({ log: () => {} });
  assert.equal(fixed.updated, 1);
  assert.equal(String((await Question.findOne({ code: 'BK-HIS-02-Q01' }))._id), id);
  books.loadBook('history', { fresh: true });
});

test('practice modes: practice runs basic → exam; mini test spreads sections; weak picks sections; pyq lists mapped PYQs', async () => {
  const practice = (await get('/books/history/chapters/HIS-02/questions?mode=practice')).body.data.questions;
  assert.equal(practice.length, 32);
  const order = practice.map((q) => LEVELS.indexOf(q.book.level));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.equal(practice[0].correctOptionId, undefined, 'no answers before checking');

  const mini = (await get('/books/history/chapters/HIS-02/questions?mode=mini')).body.data.questions;
  assert.equal(mini.length, study.MINI_SIZE);
  for (const s of SECTIONS) assert.ok(mini.filter((q) => q.book.section === s).length >= 3, `mini test covers ${s}`);

  const weak = (await get('/books/history/chapters/HIS-02/questions?mode=weak&sections=decline')).body.data.questions;
  assert.equal(weak.length, 8);
  assert.ok(weak.every((q) => q.book.section === 'decline'));
  assert.equal((await get('/books/history/chapters/HIS-02/questions?mode=weak&sections=nowhere')).status, 422, 'no such section');

  const pyq = (await get('/books/history/chapters/HIS-02/questions?mode=pyq')).body.data.questions;
  assert.equal(pyq.length, 1);
  assert.equal(pyq[0].book.section, 'discovery');
  assert.equal(pyq[0].pyq.length, 1, 'shown with its PYQ badge');
});

test('checking answers: only questions of this chapter; attempts and mistakes recorded for signed-in students', async () => {
  const [q] = (await get('/books/history/chapters/HIS-02/questions?mode=practice')).body.data.questions;
  const doc = await Question.findById(q.questionId).select('+correct_option_id').lean();
  const wrong = doc.options.find((o) => o.oid !== doc.correct_option_id).oid;
  const res = await call('POST', '/books/history/chapters/HIS-02/verify', { user: 'student-1', body: { questionId: q.questionId, selectedOptionId: wrong } });
  assert.equal(res.status, 200);
  assert.equal(res.body.data.isCorrect, false);
  assert.equal(res.body.data.correctOptionId, doc.correct_option_id);
  const pyq = await Question.findOne({ 'pyq.refs.question_code': PYQ }).select('+correct_option_id').lean();
  assert.equal((await call('POST', '/books/history/chapters/HIS-02/verify', { body: { questionId: String(pyq._id), selectedOptionId: pyq.correct_option_id } })).body.data.isCorrect, true);
  const other = await Question.findOne({ 'pyq.is_pyq': true, 'pyq.refs.question_code': { $ne: PYQ } }).select('+correct_option_id').lean();
  assert.equal((await call('POST', '/books/history/chapters/HIS-02/verify', { body: { questionId: String(other._id), selectedOptionId: other.correct_option_id } })).status, 404);
  const draft = await Question.findOne({ code: 'BK-HIS-22-Q01' }).select('+correct_option_id').lean();
  assert.equal((await call('POST', '/books/history/chapters/HIS-22/verify', { body: { questionId: String(draft._id), selectedOptionId: draft.correct_option_id } })).status, 404, 'no checking of drafts');
});

test('admin preview: a draft chapter and its questions can be read and checked without recording anything', async () => {
  const ch = await books.getChapter('history', 'HIS-22', { preview: true });
  assert.equal(ch.draft, true);
  const { questions } = await study.chapterQuestions('history', 'HIS-22', { mode: 'mini', preview: true });
  assert.equal(questions.length, study.MINI_SIZE);
  const doc = await Question.findById(questions[0].questionId).select('+correct_option_id').lean();
  const r = await study.verify('history', 'HIS-22', { questionId: questions[0].questionId, selectedOptionId: doc.correct_option_id }, 'owner', { preview: true });
  assert.equal(r.isCorrect, true);
  assert.equal((await Question.findById(doc._id).lean()).stats.attempts, 0, 'nothing recorded in preview');
});

test('progress: reading merges sections, remembers the last place and depth; results keep best and add section totals', async () => {
  const user = 'reader-1';
  assert.equal((await get('/books/history/progress')).status, 401);
  let r = await call('PUT', '/books/history/progress', { user, body: { chapters: [{ chapter: 'HIS-02', read: ['discovery', 'nowhere'] }], last: { chapter: 'HIS-02', section: 'town_planning' }, depth: 'quick' } });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body.data.chapters['HIS-02'].read, ['discovery'], 'unknown sections are dropped');
  assert.equal(r.body.data.last.section, 'town_planning');
  assert.equal(r.body.data.depth, 'quick');
  r = await call('PUT', '/books/history/progress', { user, body: { chapters: [{ chapter: 'HIS-02', read: SECTIONS }, { chapter: 'HIS-99', read: ['xx'] }] } });
  assert.deepEqual(r.body.data.chapters['HIS-02'].read, SECTIONS);
  assert.ok(r.body.data.chapters['HIS-02'].read_at, 'chapter marked read when every section is read');
  assert.equal(r.body.data.chapters['HIS-99'], undefined);

  await call('POST', '/books/history/results', { user, body: { chapter: 'HIS-02', mode: 'mini', correct: 9, total: 15, bySection: { discovery: { correct: 1, total: 4 }, decline: { correct: 4, total: 4 } } } });
  r = await call('POST', '/books/history/results', { user, body: { chapter: 'HIS-02', mode: 'mini', correct: 6, total: 15, bySection: { discovery: { correct: 2, total: 4 } } } });
  const mini = r.body.data.chapters['HIS-02'].mini;
  assert.deepEqual([mini.best.correct, mini.last.correct, mini.attempts], [9, 6, 2]);
  assert.deepEqual(r.body.data.chapters['HIS-02'].sections.discovery, { correct: 3, total: 8 });
  assert.equal((await call('POST', '/books/history/results', { user, body: { chapter: 'HIS-02', mode: 'mini', correct: 9, total: 5 } })).status, 400);
  assert.equal((await get('/books/history/progress', { user })).body.data.chapters['HIS-02'].read.length, 4);
});

test('Admin Console → Books: list, unpublish hides the chapter and its questions, publish brings them back; unverified cannot be published', async () => {
  const rootUrl = root;
  await call('POST', '/auth/register', { body: { name: 'Book editor', email: ADMIN_EMAIL, password: 'safe-password-123' } });
  const login = await fetch(`${rootUrl}/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }) });
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const admin = async (method, p) => {
    const res = await fetch(rootUrl + p, { method, headers: { 'content-type': 'application/json', cookie } });
    return { status: res.status, body: await res.json() };
  };
  assert.equal((await get('/admin/books')).status, 401, 'needs a session');
  assert.equal((await get('/admin/books', { user: 'student-1' })).status, 403, 'the dev header never qualifies');

  const list = (await admin('GET', '/admin/books')).body.data;
  const row = (code) => list.chapters.find((c) => c.code === code);
  assert.equal(list.chapters.length, 29);
  assert.deepEqual([row('HIS-02').published, row('HIS-02').canPublish, row('HIS-02').questions], [true, true, 32]);
  assert.deepEqual([row('HIS-22').published, row('HIS-22').canPublish], [false, false]);
  assert.equal(row('HIS-05').written, false);

  assert.equal((await admin('POST', '/admin/books/history/HIS-22/publish')).status, 422, 'not VERIFIED');
  assert.equal((await admin('POST', '/admin/books/history/HIS-05/publish')).status, 404, 'not written');

  const off = await admin('POST', '/admin/books/history/HIS-02/unpublish');
  assert.equal(off.status, 200);
  assert.deepEqual([off.body.data.published, off.body.data.questionsLive], [false, 0]);
  assert.equal((await get('/books/history/chapters/HIS-02')).status, 404, 'students no longer see it');
  assert.equal(await Question.countDocuments({ code: /^BK-HIS-02-/, status: 'PUBLISHED' }), 0);
  const state = await BookChapterState.findOne({ book: 'history', code: 'HIS-02' }).lean();
  assert.deepEqual([state.status, state.set_by, state.history.length], ['DRAFT', ADMIN_EMAIL, 1]);

  const on = await admin('POST', '/admin/books/history/HIS-02/publish');
  assert.deepEqual([on.body.data.published, on.body.data.questionsLive], [true, 32]);
  assert.equal((await get('/books/history/chapters/HIS-02')).status, 200);
  assert.equal((await admin('GET', '/admin/books')).body.data.chapters.find((c) => c.code === 'HIS-02').history.length, 2);
});
