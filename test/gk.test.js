'use strict';

/**
 * GK section (G1-G3): validator, seeding rules, public API, admin content
 * management with history, question editing, Learn progress sync and the
 * catalogue's syllabus mapping.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const config = require('../src/config');
const { createApp } = require('../src/app');
const { GkFact, Question, ContentRevision, PracticeAttempt, ExamCategory } = require('../src/models');
const { validateFact, validateLibrary } = require('../src/services/gkFacts.validate');
const { ensureGkLibrary, loadRecords, AUTHOR } = require('../scripts/seedGkFacts');
const { presentQuestion } = require('../src/services/presenters');
const { clearGkCache } = require('../src/services/gk.service');
const { clearCatalogCache } = require('../src/services/catalog.service');
const { CARDS, NEW_TOPICS } = require('../src/services/gkTaxonomy');
const catalog = require('../db/seed/catalog');

const ADMIN_EMAIL = 'gk-editor@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);
const quiet = { log: () => {} };

const SRC = {
  title: 'Kolkata Metro: History',
  url: 'https://mtp.indianrailways.gov.in/history',
  publisher: 'Metro Railway, Kolkata',
  publisher_type: 'OFFICIAL',
  accessed_at: '2026-10-31',
  quote: 'The first stretch of Metro from Esplanade to Bhowanipur was commissioned on 24.10.1984.',
};

function fact(overrides = {}) {
  return {
    code: 'GK-IGK-001',
    topic: 'indian_gk',
    subtopic: 'important_firsts',
    tags: ['transport', 'west_bengal'],
    fact_kind: 'STATIC',
    title: { en: 'First metro railway in India', bn: 'ভারতের প্রথম মেট্রো রেল' },
    statement: { en: 'Kolkata Metro: Esplanade–Bhowanipur opened on 24 October 1984.', bn: 'কলকাতা মেট্রো: এসপ্ল্যানেড–ভবানীপুর ২৪ অক্টোবর ১৯৮৪-এ চালু হয়।' },
    explanation: { en: 'Foundation stone: 29 December 1972.', bn: 'ভিত্তিপ্রস্তর: ২৯ ডিসেম্বর ১৯৭২।' },
    milestones: [{ kind: 'FOUNDATION', date: '1972-12-29' }, { kind: 'COMMERCIAL_OPERATION', date: '1984-10-24' }],
    dates: { event_date: null, valid_from: null, review_by: null },
    reference_year: null,
    difficulty: 2,
    exam_relevance: ['WBPSC_CLERKSHIP', 'SSC'],
    sources: [SRC],
    verification: { status: 'VERIFIED', method: 'SOURCE_QUOTE+INDEPENDENT_CHECK', verified_at: '2026-10-31', notes: '' },
    bengali_review: 'PENDING',
    linked_existing: [],
    questions: [{
      format: 'DIRECT',
      d: 2,
      q: ['India\'s first metro railway began commercial service in which city?', 'ভারতের প্রথম মেট্রো রেল কোন শহরে বাণিজ্যিক পরিষেবা শুরু করে?'],
      a: ['Kolkata', 'কলকাতা'],
      w: [['Delhi', 'দিল্লি'], ['Mumbai', 'মুম্বাই'], ['Chennai', 'চেন্নাই']],
      e: ['Kolkata Metro opened on 24 October 1984.', 'কলকাতা মেট্রো ২৪ অক্টোবর ১৯৮৪-এ চালু হয়।'],
    }],
    ...overrides,
  };
}

// ------------------------------------------------------------------ validator

test('validator: a well-formed verified fact passes', () => {
  assert.deepEqual(validateFact(fact()), []);
});

test('validator: rejects claims the library may not make', () => {
  const codes = (f) => validateFact(f).map((e) => e.code);
  assert.ok(codes(fact({ sources: [{ ...SRC, quote: undefined }] })).includes('VERIFIED_NEEDS_SOURCE'), 'verified needs a quote');
  assert.ok(codes(fact({ sources: [{ ...SRC, publisher_type: 'REFERENCE' }] })).includes('VERIFIED_NEEDS_SOURCE'), 'verified needs an official/institutional source');
  assert.ok(codes(fact({ fact_kind: 'CHANGING' })).includes('CHANGING_NEEDS_DATES'));
  assert.ok(codes(fact({ bengali_review: 'REVIEWED' })).includes('BENGALI_REVIEW_IN_FILE'), 'files cannot claim a human Bengali review');
  assert.ok(codes(fact({ subtopic: 'rivers' })).includes('UNKNOWN_SUBTOPIC'));
  assert.ok(codes(fact({ code: 'GK-WBG-001' })).includes('CODE_PREFIX'));
  assert.ok(codes(fact({ topic: 'current_affairs', code: 'GK-CA-001', subtopic: 'national' })).includes('EVENT_DATE_REQUIRED'));
  const q = fact().questions[0];
  assert.ok(codes(fact({ questions: [{ ...q, w: [['Kolkata', 'দিল্লি'], ...q.w.slice(1)] }] })).includes('DUPLICATE_OPTION'));
  assert.ok(codes(fact({ questions: [{ ...q, w: q.w.slice(1) }] })).includes('WRONG_OPTIONS'), 'exactly four options');
  assert.ok(codes(fact({ questions: [{ ...q, q: ['PYQ: ' + q.q[0], q.q[1]] }] })).includes('PYQ_CLAIM'));
  assert.ok(codes(fact({ questions: [{ ...q, a: ['Kolkata', 'Kolkata'] }] })).includes('OPTION_NOT_BENGALI'));
});

test('validator: library-level duplicates', () => {
  const { errors } = validateLibrary([fact(), fact()]);
  assert.ok(errors.some((e) => e.code === 'DUPLICATE_CODE'));
  assert.ok(errors.some((e) => e.code === 'DUPLICATE_QUESTION'));
});

test('the committed GK library (db/gk/*.jsonl) is valid', () => {
  const { records, parseErrors } = loadRecords();
  assert.deepEqual(parseErrors, []);
  assert.deepEqual(validateLibrary(records).errors, []);
  for (const r of records) {
    assert.notEqual(r.bengali_review, 'REVIEWED', `${r.code}: no human Bengali review is claimed in files`);
    if (r.verification.status === 'VERIFIED') assert.ok(r.sources.some((s) => s.quote && s.url.startsWith('https://')), `${r.code} has a quoted source`);
  }
});

test('GK research drafts parse and pass the same library validator', () => {
  const { records, parseErrors } = loadRecords(path.join(__dirname, '../db/gk/drafts'));
  assert.ok(records.length > 0, 'draft validation must not silently pass an empty directory');
  assert.deepEqual(parseErrors, []);
  assert.deepEqual(validateLibrary(records).errors, []);
  assert.ok(records.every((record) => record.verification.status !== 'VERIFIED'), 'unchecked draft facts cannot claim independent verification');
});

// ------------------------------------------------------------------ catalogue

test('catalogue: new GK chapters only where an official syllabus line was checked', () => {
  const gsOf = (code) => catalog.find((c) => c.code === code).subjects.find((s) => s.code === 'gs');
  const wbpsc = gsOf('WBPSC');
  for (const t of NEW_TOPICS) assert.ok(wbpsc.topics.some((x) => x.code === t), `WBPSC has ${t}`);
  for (const t of wbpsc.topics) {
    assert.ok(['SYLLABUS', 'SUPPLEMENTARY'].includes(t.syllabus_status), t.code);
    assert.match(t.syllabus_source_url, /^https:\/\/psc\.wb\.gov\.in\//, `${t.code} cites the commission`);
    assert.ok(t.syllabus_note.en && t.syllabus_note.bn, t.code);
  }
  assert.equal(wbpsc.topics.find((t) => t.code === 'computer_awareness').syllabus_status, 'SUPPLEMENTARY');
  for (const code of ['SSC', 'BANK', 'WB_POST']) {
    assert.ok(!gsOf(code).topics.some((t) => NEW_TOPICS.includes(t.code)), `${code}: no unverified additions`);
  }
});

// ------------------------------------------------------------------ database-backed

let mongod;
let server;
let api;
let dir;

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('gk_test'));
  await Promise.all([GkFact.init(), Question.init(), ContentRevision.init(), ExamCategory.init()]);
  await ExamCategory.insertMany(catalog);
  clearCatalogCache();

  // An older practice question the library proves, and one it repeats.
  await Question.create({
    code: 'GS-OLD-1', exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }], subject: 'gs', topic: 'west_bengal_gk', difficulty: 1,
    stem: { en: 'Which river is known as the "Sorrow of Bengal"?', bn: 'কোন নদীকে "বাংলার দুঃখ" বলা হয়?' },
    options: [{ oid: 'opt_aaaa', text: { en: 'Damodar', bn: 'দামোদর' } }, { oid: 'opt_bbbb', text: { en: 'Teesta', bn: 'তিস্তা' } }, { oid: 'opt_cccc', text: { en: 'Ajay', bn: 'অজয়' } }, { oid: 'opt_dddd', text: { en: 'Kangsabati', bn: 'কংসাবতী' } }],
    correct_option_id: 'opt_aaaa', status: 'PUBLISHED', provenance: 'ORIGINAL_PRACTICE', authored_by: 'seed_generator',
  });

  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gk-'));
  const damodar = fact({
    code: 'GK-WBG-001', topic: 'west_bengal_gk', subtopic: 'geography_rivers', tags: [],
    title: { en: 'Sorrow of Bengal', bn: 'বাংলার দুঃখ' },
    statement: { en: 'The Damodar was called the Sorrow of Bengal.', bn: 'দামোদরকে বাংলার দুঃখ বলা হত।' },
    sources: [{ ...SRC, title: 'DVC: About', url: 'https://www.dvc.gov.in/about', quote: 'the Damodar, known as the Sorrow of Bengal' }],
    linked_existing: ['Which river is known as the "Sorrow of Bengal"?'],
    questions: [{ ...fact().questions[0], q: ['Which river is known as the "Sorrow of Bengal"?', 'কোন নদীকে "বাংলার দুঃখ" বলা হয়?'], a: ['Damodar', 'দামোদর'], w: [['Teesta', 'তিস্তা'], ['Ajay', 'অজয়'], ['Rupnarayan', 'রূপনারায়ণ']] }],
  });
  const doubtful = fact({
    code: 'GK-IGK-002', subtopic: 'national_symbols', tags: [],
    title: { en: 'National fruit', bn: 'জাতীয় ফল' },
    statement: { en: 'Mango is widely listed as the national fruit.', bn: 'আম জাতীয় ফল হিসেবে ব্যাপকভাবে উল্লিখিত।' },
    verification: { status: 'NEEDS_REVIEW', method: 'SOURCE_QUOTE', verified_at: null, notes: 'No notification found.' },
    questions: [{ ...fact().questions[0], q: ['Which fruit is widely listed as India\'s national fruit?', 'কোন ফল ভারতের জাতীয় ফল হিসেবে ব্যাপকভাবে উল্লিখিত?'], a: ['Mango', 'আম'], w: [['Banana', 'কলা'], ['Jackfruit', 'কাঁঠাল'], ['Guava', 'পেয়ারা']] }],
  });
  const ca = fact({
    code: 'GK-CA-001', topic: 'current_affairs', subtopic: 'economy_banking', tags: [],
    title: { en: 'Repo rate October 2026', bn: 'রেপো রেট অক্টোবর ২০২৬' },
    statement: { en: 'On 7 October 2026 the MPC raised the repo rate to 5.50%.', bn: '৭ অক্টোবর ২০২৬-এ এমপিসি রেপো রেট বাড়িয়ে ৫.৫০% করে।' },
    fact_kind: 'CHANGING', dates: { event_date: '2026-10-07', valid_from: '2026-10-07', review_by: '2026-12-31' },
    questions: [{ ...fact().questions[0], q: ['On 7 October 2026 the repo rate was raised to:', '৭ অক্টোবর ২০২৬-এ রেপো রেট বাড়িয়ে কত করা হয়?'], a: ['5.50%', '৫.৫০%'], w: [['5.25%', '৫.২৫%'], ['5.75%', '৫.৭৫%'], ['6.00%', '৬.০০%']] }],
  });
  fs.writeFileSync(path.join(dir, 'indian_gk.jsonl'), [fact(), doubtful].map((f) => JSON.stringify(f)).join('\n'));
  fs.writeFileSync(path.join(dir, 'west_bengal_gk.jsonl'), JSON.stringify(damodar));
  fs.writeFileSync(path.join(dir, 'current_affairs.jsonl'), JSON.stringify(ca));

  server = createApp().listen(0);
  const root = `http://127.0.0.1:${server.address().port}/api/v1`;
  let cookie;
  api = async (method, p, body, { asAdmin = true, user } = {}) => {
    const res = await fetch(root + p, {
      method,
      headers: { 'content-type': 'application/json', ...(asAdmin && cookie && { cookie }), ...(user && { 'x-user-id': user }) },
      body: body ? JSON.stringify(body) : undefined,
    });
    return { status: res.status, body: await res.json() };
  };
  await api('POST', '/auth/register', { name: 'Editor', email: ADMIN_EMAIL, password: 'safe-password-123' });
  const login = await fetch(`${root}/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }) });
  cookie = login.headers.get('set-cookie').split(';')[0];
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

test('seed: only verified facts publish; questions are original practice with the fact\'s source check', async () => {
  const s = await ensureGkLibrary({ ...quiet, dir });
  assert.equal(s.facts, 4);
  assert.equal(s.published, 3);
  assert.equal(s.draft, 1);
  assert.deepEqual(s.duplicates, ['GKQ-WBG-001-1 repeats GS-OLD-1'], 'a repeated stem is not inserted');
  assert.equal(s.linked, 1);

  const metro = await GkFact.findOne({ code: 'GK-IGK-001' }).lean();
  assert.deepEqual([metro.status, metro.verification.status, metro.bengali_review.status], ['PUBLISHED', 'VERIFIED', 'PENDING']);
  const q = await Question.findOne({ code: 'GKQ-IGK-001-1' }).select('+correct_option_id').lean();
  assert.equal(q.status, 'PUBLISHED');
  assert.equal(q.provenance, 'ORIGINAL_PRACTICE');
  assert.equal(q.pyq.is_pyq, false, 'never a PYQ');
  assert.equal(q.source_check.status, 'SOURCE_VERIFIED');
  assert.equal(q.source_check.source_url, SRC.url);
  assert.equal(q.question_format, 'DIRECT');
  assert.deepEqual(q.exam_targets.map((t) => t.category), ['WBPSC', 'WB_POLICE'], 'new chapter: only the categories whose syllabus covers it');
  assert.equal(q.options.find((o) => o.oid === q.correct_option_id).text.en, 'Kolkata');

  const doubtful = await Question.findOne({ code: 'GKQ-IGK-002-1' }).lean();
  assert.deepEqual([doubtful.status, doubtful.source_check.status], ['DRAFT', 'NEEDS_REVIEW'], 'doubtful facts never reach students');

  const old = await Question.findOne({ code: 'GS-OLD-1' }).lean();
  assert.equal(old.source_check.status, 'SOURCE_VERIFIED', 'the verified fact backs the older question');
  assert.equal(old.fact_ids.length, 1);
  assert.equal(old.status, 'PUBLISHED');

  const again = await ensureGkLibrary({ ...quiet, dir });
  assert.deepEqual([again.inserted, again.updated, again.questionsInserted], [0, 0, 0], 'idempotent');
});

test('presenter: GS questions show their source status; unchecked ones are "pending", never verified', async () => {
  const q = await Question.findOne({ code: 'GKQ-IGK-001-1' }).lean();
  assert.equal(presentQuestion(q).sourceCheck.status, 'SOURCE_VERIFIED');
  const unchecked = { ...q, source_check: undefined };
  assert.deepEqual(presentQuestion(unchecked).sourceCheck, { status: 'SOURCE_PENDING', sourceTitle: null, sourceUrl: null, checkedAt: null });
  assert.equal(presentQuestion({ ...q, provenance: 'OFFICIAL_VERIFIED' }).sourceCheck, null, 'official papers keep their PYQ badge instead');
  assert.equal(presentQuestion({ ...q, subject: 'quant' }).sourceCheck, null);
});

test('API: cards count real content; progress only for the signed-in student', async () => {
  clearGkCache();
  const guest = (await api('GET', '/gk/cards', null, { asAdmin: false })).body.data;
  assert.equal(guest.cards.length, CARDS.length);
  const igk = guest.cards.find((c) => c.code === 'indian_gk');
  assert.equal(igk.factCount, 1, 'the draft fact is not counted');
  assert.equal(igk.bengaliPendingCount, 1);
  assert.equal(igk.questionCount, 1);
  assert.equal(igk.sourceVerifiedQuestionCount, 1);
  assert.equal(igk.progress, null);
  assert.equal(guest.cards.find((c) => c.code === 'west_bengal_gk').crossListedFactCount, 1, 'the metro fact is tagged west_bengal');

  const q = await Question.findOne({ code: 'GKQ-IGK-001-1' }).lean();
  await PracticeAttempt.create([
    { user_id: 'student_gk', question_id: q._id, subject: 'gs', topic: 'indian_gk', correct: false },
    { user_id: 'student_gk', question_id: q._id, subject: 'gs', topic: 'indian_gk', correct: true },
  ]);
  const mine = (await api('GET', '/gk/cards', null, { asAdmin: false, user: 'student_gk' })).body.data;
  assert.deepEqual(mine.cards.find((c) => c.code === 'indian_gk').progress, { questionsAttempted: 1, completedCorrectly: 1, answers: 2, correctAnswers: 1, accuracy: 50 });
  const other = (await api('GET', '/gk/cards', null, { asAdmin: false, user: 'someone_else' })).body.data;
  assert.equal(other.cards.find((c) => c.code === 'indian_gk').progress.questionsAttempted, 0, 'no one sees another student\'s progress');
});

test('API: facts are paginated, searchable in both languages, and filterable', async () => {
  const list = (qs) => api('GET', `/gk/facts?${qs}`, null, { asAdmin: false }).then((r) => r.body.data);
  assert.equal((await list('card=indian_gk')).facts.length, 1, 'drafts are hidden');
  assert.deepEqual((await list('card=west_bengal_gk')).facts.map((f) => f.code).sort(), ['GK-IGK-001', 'GK-WBG-001'], 'West Bengal card includes tagged facts');
  assert.equal((await list('q=মেট্রো')).facts[0].code, 'GK-IGK-001', 'Bengali search');
  assert.equal((await list('q=metro')).facts.length, 1);
  assert.equal((await list('card=current_affairs&year=2026&month=10')).facts.length, 1);
  assert.equal((await list('card=current_affairs&year=2026&month=9')).facts.length, 0);
  const page = await list('limit=1&offset=0');
  assert.equal(page.facts.length, 1);
  assert.equal(page.pagination.hasMore, true);
  const one = page.facts[0];
  assert.ok(one.sources[0].url && one.verification.status === 'VERIFIED' && one.bengaliReview === 'PENDING');
  assert.equal(one.sources[0].quote, undefined, 'quotes stay in the admin console');
  assert.equal((await api('GET', '/gk/facts?month=10', null, { asAdmin: false })).status, 400, 'month needs a year');
  assert.equal((await api('GET', '/gk/facts/GK-IGK-002', null, { asAdmin: false })).status, 404, 'a draft fact cannot be fetched');
  const months = (await api('GET', '/gk/current-affairs/months', null, { asAdmin: false })).body.data.months;
  assert.deepEqual(months, [{ year: 2026, month: 10, factCount: 1 }]);
});

test('admin: access control', async () => {
  assert.equal((await api('GET', '/admin/gk/facts', null, { asAdmin: false })).status, 401);
  assert.equal((await api('GET', '/admin/gk/facts', null, { asAdmin: false, user: 'student_gk' })).status, 403);
  const metro = await GkFact.findOne({ code: 'GK-IGK-001' }).lean();
  assert.equal((await api('POST', `/admin/gk/facts/${metro._id}/bengali-review`, {}, { asAdmin: false, user: 'student_gk' })).status, 403);
  assert.equal((await api('PATCH', `/admin/questions/${metro.question_ids[0]}`, { reason: 'x', changes: { difficulty: 3 } }, { asAdmin: false, user: 'student_gk' })).status, 403);
  assert.equal((await api('PUT', '/learn/progress', { entries: [] }, { asAdmin: false })).status, 401);
});

test('admin: Bengali review is separate from verification and records who and when', async () => {
  const metro = await GkFact.findOne({ code: 'GK-IGK-001' }).lean();
  const r = (await api('POST', `/admin/gk/facts/${metro._id}/bengali-review`, { note: 'Checked wording' })).body.data;
  assert.equal(r.fact.bengaliReview.status, 'REVIEWED');
  assert.equal(r.fact.bengaliReview.reviewedBy, ADMIN_EMAIL);
  assert.ok(r.fact.bengaliReview.reviewedAt);
  assert.equal(r.fact.verification.status, 'VERIFIED', 'unchanged');
  assert.equal(r.history[0].action, 'BENGALI_REVIEW');
});

test('admin: editing what a fact claims sends it back for verification; history is kept', async () => {
  const metro = await GkFact.findOne({ code: 'GK-IGK-001' }).lean();
  const bad = await api('PATCH', `/admin/gk/facts/${metro._id}`, { reason: 'typo', changes: { difficulty: 9 } });
  assert.equal(bad.status, 400);
  const res = await api('PATCH', `/admin/gk/facts/${metro._id}`, {
    reason: 'Name the section precisely',
    changes: { statement: { en: 'Kolkata Metro: the Esplanade–Bhowanipur section opened on 24 October 1984.', bn: 'কলকাতা মেট্রো: এসপ্ল্যানেড–ভবানীপুর অংশ ২৪ অক্টোবর ১৯৮৪-এ চালু হয়।' } },
  });
  assert.equal(res.status, 200);
  const d = res.body.data;
  assert.equal(d.fact.verification.status, 'NEEDS_REVIEW');
  assert.equal(d.fact.status, 'DRAFT', 'unpublished until verified again');
  assert.equal(d.fact.bengaliReview.status, 'PENDING', 'Bengali changed: review again');
  assert.equal(d.history[0].action, 'EDIT');
  assert.ok(d.history[0].changes.some((c) => c.field === 'statement.en'));
  assert.equal((await Question.findOne({ code: 'GKQ-IGK-001-1' }).lean()).status, 'DRAFT', 'its own question follows');

  // Verification needs a quoted source; the model refuses otherwise.
  const verified = (await api('POST', `/admin/gk/facts/${metro._id}/verification`, { status: 'VERIFIED', notes: 'Re-read the Metro Railway history page' })).body.data;
  assert.deepEqual([verified.fact.status, verified.fact.verification.verifiedBy], ['PUBLISHED', ADMIN_EMAIL]);
  assert.equal((await Question.findOne({ code: 'GKQ-IGK-001-1' }).lean()).status, 'PUBLISHED');

  // The library seed never overwrites an admin's edit.
  await ensureGkLibrary({ ...quiet, dir });
  assert.match((await GkFact.findById(metro._id).lean()).statement.en, /the Esplanade–Bhowanipur section/);
});

test('admin: retire archives the fact\'s own questions, not older linked ones; restore brings them back', async () => {
  const wb = await GkFact.findOne({ code: 'GK-WBG-001' }).lean();
  const r = (await api('POST', `/admin/gk/facts/${wb._id}/retire`, { reason: 'Superseded by a better-sourced fact' })).body.data;
  assert.equal(r.fact.status, 'RETIRED');
  assert.equal((await Question.findOne({ code: 'GS-OLD-1' }).lean()).status, 'PUBLISHED');
  const back = (await api('POST', `/admin/gk/facts/${wb._id}/restore`, { reason: 'Restored after check' })).body.data;
  assert.equal(back.fact.status, 'PUBLISHED');
  assert.deepEqual(back.history.slice(0, 2).map((h) => h.action), ['RESTORE', 'RETIRE']);
});

test('admin: import preview catches problems; commit writes only a clean file', async () => {
  const fresh = fact({
    code: 'GK-IGK-010', subtopic: 'national_symbols', tags: [],
    title: { en: 'National aquatic animal', bn: 'জাতীয় জলজ প্রাণী' },
    statement: { en: 'The Ganges river dolphin is the national aquatic animal.', bn: 'গাঙ্গেয় শুশুক জাতীয় জলজ প্রাণী।' },
    questions: [{ ...fact().questions[0], q: ['Which is India\'s national aquatic animal?', 'ভারতের জাতীয় জলজ প্রাণী কোনটি?'], a: ['Ganges river dolphin', 'গাঙ্গেয় শুশুক'], w: [['Gharial', 'ঘড়িয়াল'], ['Olive ridley turtle', 'অলিভ রিডলে কচ্ছপ'], ['Dugong', 'ডুগং']] }],
  });
  const dupe = fact(); // code and question already in the database
  const report = (await api('POST', '/admin/gk/import/preview', { jsonl: [fresh, dupe].map((f) => JSON.stringify(f)).join('\n') + '\n{bad json' })).body.data;
  assert.equal(report.valid, false);
  const codes = report.errors.map((e) => e.code);
  assert.ok(codes.includes('INVALID_JSON') && codes.includes('CODE_EXISTS') && codes.includes('DUPLICATE_QUESTION'));
  assert.equal((await api('POST', '/admin/gk/import/commit', { jsonl: JSON.stringify(dupe) })).status, 422);

  const ok = await api('POST', '/admin/gk/import/commit', { jsonl: JSON.stringify(fresh) });
  assert.equal(ok.status, 200);
  const saved = await GkFact.findOne({ code: 'GK-IGK-010' }).lean();
  assert.deepEqual([saved.origin, saved.admin_edited, saved.verification.verified_by], ['ADMIN', true, ADMIN_EMAIL]);
  assert.equal(await ContentRevision.countDocuments({ entity_id: saved._id, action: 'CREATE' }), 1);
});

test('admin: question edits are versioned; a changed answer is flagged and needs a new source check', async () => {
  const q = await Question.findOne({ code: 'GKQ-IGK-001-1' }).select('+correct_option_id').lean();
  const wrong = q.options.find((o) => o.oid !== q.correct_option_id).oid;
  const res = await api('PATCH', `/admin/questions/${q._id}`, { reason: 'Testing an answer correction', changes: { correctOptionId: wrong } });
  assert.equal(res.status, 200);
  const d = res.body.data;
  assert.equal(d.question.version, 2);
  assert.equal(d.question.correctOptionId, wrong);
  assert.equal(d.question.sourceCheck.status, 'NEEDS_REVIEW');
  assert.equal(d.history[0].answerChanged, true);
  assert.deepEqual(d.question.options.map((o) => o.optionId), q.options.map((o) => o.oid), 'option ids never change');
  assert.equal((await api('PATCH', `/admin/questions/${q._id}`, { reason: 'bad', changes: { options: [{ optionId: 'opt_zzzz', text: { en: 'x' } }] } })).status, 422);

  const noSource = await api('PUT', `/admin/questions/${q._id}/source-check`, { status: 'SOURCE_VERIFIED', note: 'checked' });
  assert.equal(noSource.status, 422, 'verified needs the supporting page');
  const back = (await api('PATCH', `/admin/questions/${q._id}`, { reason: 'Undo the test change', changes: { correctOptionId: q.correct_option_id } })).body.data;
  assert.equal(back.question.version, 3);
  const checked = (await api('PUT', `/admin/questions/${q._id}/source-check`, { status: 'SOURCE_VERIFIED', sourceUrl: SRC.url, sourceTitle: SRC.title, note: 'Re-checked' })).body.data;
  assert.equal(checked.question.sourceCheck.status, 'SOURCE_VERIFIED');

  const retired = (await api('POST', `/admin/questions/${q._id}/retire`, { reason: 'Outdated wording' })).body.data;
  assert.deepEqual([retired.question.status, retired.question.retiredReason], ['ARCHIVED', 'Outdated wording']);
  assert.equal((await api('POST', `/admin/questions/${q._id}/restore`, { reason: 'Wording fixed' })).body.data.question.status, 'PUBLISHED');
  assert.equal(await ContentRevision.countDocuments({ entity: 'question', entity_id: q._id }), 5, 'two edits, a source check, retire, restore');
});

test('admin: summary separates verified, pending, needs-review and retired GS questions', async () => {
  const s = (await api('GET', '/admin/gk/summary')).body.data;
  assert.ok(s.gsQuestions.SOURCE_VERIFIED >= 2);
  assert.ok('SOURCE_PENDING' in s.gsQuestions && 'NEEDS_REVIEW' in s.gsQuestions && 'RETIRED' in s.gsQuestions);
  assert.equal(s.topics.indian_gk.needsReview, 1);
  const stale = (await api('GET', '/admin/gk/stale')).body.data;
  assert.ok(Array.isArray(stale.facts) && Array.isArray(stale.questions));
});

test('learn progress: merged per account, best score kept, never shared between students', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const put = (user, entries) => api('PUT', '/learn/progress', { entries }, { asAdmin: false, user });
  const a = (await put('learner_a', [{ subject: 'gs', topic: 'indian_gk', level: 'beginner', best: { correct: 6, total: 10 }, seen: [id] }])).body.data;
  assert.deepEqual(a.progress['gs.indian_gk.beginner'].best, { correct: 6, total: 10 });
  // A worse score from another device does not replace the best; seen ids are unioned.
  const id2 = new mongoose.Types.ObjectId().toString();
  const b = (await put('learner_a', [{ subject: 'gs', topic: 'indian_gk', level: 'beginner', best: { correct: 3, total: 10 }, seen: [id2] }])).body.data;
  assert.deepEqual(b.progress['gs.indian_gk.beginner'].best, { correct: 6, total: 10 });
  assert.deepEqual(b.progress['gs.indian_gk.beginner'].seen.sort(), [id, id2].sort());
  const other = (await api('GET', '/learn/progress', null, { asAdmin: false, user: 'learner_b' })).body.data;
  assert.deepEqual(other.progress, {});
  assert.equal((await put('learner_a', [{ subject: 'gs', topic: 'indian_gk', level: 'beginner', best: { correct: 11, total: 10 } }])).status, 400);
});

// ------------------------------------------------------------------ Indian GK expansion: sections, filters, fact revision

test('dashboard: Indian GK is a section over the India cards; West Bengal stays separate; topic-wise progress per subcategory', async () => {
  clearGkCache();
  const data = (await api('GET', '/gk/cards', null, { asAdmin: false, user: 'student_gk' })).body.data;
  const india = data.sections.find((s) => s.code === 'india');
  const wb = data.sections.find((s) => s.code === 'west_bengal');
  assert.ok(india.cards.includes('indian_gk') && india.cards.includes('indian_history') && !india.cards.includes('west_bengal_gk'));
  assert.deepEqual(wb.cards, ['west_bengal_gk']);
  const inIndia = data.cards.filter((c) => c.section === 'india');
  assert.equal(india.questionCount, inIndia.reduce((a, c) => a + c.questionCount, 0), 'section total is the sum of its cards');
  const igk = data.cards.find((c) => c.code === 'indian_gk');
  const firsts = igk.subtopics.find((s) => s.code === 'important_firsts');
  assert.equal(firsts.questionCount, 1);
  assert.equal(firsts.progress.questionsAttempted, 1, 'the student answered that question');
  assert.equal(firsts.progress.completedCorrectly, 1);
  assert.equal(india.progress.questionsAttempted, igk.progress.questionsAttempted);
  const guest = (await api('GET', '/gk/cards', null, { asAdmin: false })).body.data;
  assert.equal(guest.sections[0].progress, null);
  assert.equal(guest.cards[0].subtopics[0].progress, null, 'guests get no progress figures');
});

test('practice: filters by subcategory, difficulty and source-verified, with a matching count', async () => {
  const stream = (qs) => api('GET', `/practice/questions?category=WBPSC&subject=gs&topic=indian_gk&language=en&limit=20&${qs}`, null, { asAdmin: false }).then((r) => r.body.data.questions.map((q) => q.questionId));
  const count = (qs) => api('GET', `/gk/questions/count?category=WBPSC&topic=indian_gk&${qs}`, null, { asAdmin: false }).then((r) => r.body.data.count);
  const all = await stream('');
  const firsts = await stream('subtopic=important_firsts');
  const symbols = await stream('subtopic=national_symbols');
  assert.ok(firsts.length >= 1 && symbols.length >= 1 && firsts.length + symbols.length <= all.length);
  assert.equal(firsts.length, await count('subtopic=important_firsts'));
  assert.equal((await stream('difficulty=hard')).length, await count('difficulty=hard'));
  assert.equal(await count('verifiedOnly=true'), (await stream('verifiedOnly=true')).length);
  assert.equal((await api('GET', '/practice/questions?category=WBPSC&subject=gs&topic=indian_gk&difficulty=extreme', null, { asAdmin: false })).status, 400);
});

test('fact bookmarks, revision and Daily GK belong to the signed-in student', async () => {
  const as = (user) => ({ asAdmin: false, user });
  assert.equal((await api('PUT', '/gk/facts/GK-IGK-001/bookmark', { on: true }, { asAdmin: false })).status, 401);
  assert.equal((await api('GET', '/gk/revision', null, { asAdmin: false })).status, 401);
  assert.equal((await api('GET', '/gk/facts?mine=bookmarked', null, { asAdmin: false })).status, 401);

  assert.equal((await api('PUT', '/gk/facts/GK-IGK-001/bookmark', { on: true }, as('reviser'))).body.data.bookmarked, true);
  const marked = (await api('GET', '/gk/facts?mine=bookmarked', null, as('reviser'))).body.data.facts;
  assert.deepEqual(marked.map((f) => f.code), ['GK-IGK-001']);
  assert.equal(marked[0].mine.bookmarked, true);
  assert.equal((await api('GET', '/gk/facts?mine=bookmarked', null, as('someone_else'))).body.data.facts.length, 0, 'not shared');

  const known = (await api('POST', '/gk/facts/GK-WBG-001/review', { result: 'known' }, as('reviser'))).body.data;
  assert.equal(known.status, 'learning');
  assert.ok(new Date(known.dueAt) > new Date(), 'due again later');
  const again = (await api('POST', '/gk/facts/GK-CA-001/review', { result: 'again' }, as('reviser'))).body.data;
  assert.equal(again.lastResult, 'again');
  const rev = (await api('GET', '/gk/revision', null, as('reviser'))).body.data;
  assert.deepEqual([rev.counts.learning, rev.counts.bookmarked, rev.counts.due], [2, 1, 0], 'nothing is due today');
  assert.equal((await api('POST', '/gk/facts/GK-IGK-002/review', { result: 'known' }, as('reviser'))).status, 404, 'held facts cannot be reviewed');

  const day1 = (await api('GET', '/gk/daily?tz=330', null, as('daily_student'))).body.data;
  assert.ok(day1.total >= 1 && day1.total <= 10);
  const again1 = (await api('GET', '/gk/daily?tz=330', null, as('daily_student'))).body.data;
  assert.deepEqual(again1.items.map((i) => i.fact.code), day1.items.map((i) => i.fact.code), 'the same set after a refresh');
  const first = day1.items[0].fact.code;
  await api('POST', `/gk/facts/${first}/review`, { result: 'known', tz: 330 }, as('daily_student'));
  const after = (await api('GET', '/gk/daily?tz=330', null, as('daily_student'))).body.data;
  assert.equal(after.done, 1);
  assert.equal(after.items.find((i) => i.fact.code === first).done, true);
});

test('subcategory migration tags generated GS questions from the bank headers, leaves pattern-bound values alone', async () => {
  const { tagGsSubtopics } = require('../scripts/tagGsSubtopics');
  const base = {
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }], subject: 'gs', difficulty: 1, status: 'PUBLISHED', authored_by: 'seed_generator',
    options: [{ oid: 'opt_aaaa', text: { en: 'A', bn: 'ক' } }, { oid: 'opt_bbbb', text: { en: 'B', bn: 'খ' } }, { oid: 'opt_cccc', text: { en: 'C', bn: 'গ' } }],
    correct_option_id: 'opt_aaaa',
  };
  await Question.create([
    { ...base, code: 'GS-TPL-CAP', topic: 'geography', subtopic: 'capitals', stem: { en: 'What is the capital of Odisha (test)?', bn: 'ওড়িশার রাজধানী (পরীক্ষা)?' } },
    { ...base, code: 'GS-TPL-ART', topic: 'polity', subtopic: 'articles', stem: { en: 'Which Article deals with test?', bn: 'কোন অনুচ্ছেদ পরীক্ষা?' } },
  ]);
  const s = await tagGsSubtopics();
  assert.ok(s.updated >= 2);
  assert.equal((await Question.findOne({ code: 'GS-OLD-1' }).lean()).subtopic, 'geography_rivers', 'matched to its bank item under "Geography: rivers"');
  assert.equal((await Question.findOne({ code: 'GS-TPL-CAP' }).lean()).subtopic, 'states_capitals');
  assert.equal((await Question.findOne({ code: 'GS-TPL-ART' }).lean()).subtopic, 'articles', 'kept: the which_article pattern matches on it');
  assert.equal((await tagGsSubtopics()).updated, 0, 'idempotent');
  const { subtopicFor } = require('../src/services/gkTaxonomy');
  assert.equal(subtopicFor('polity', 'articles'), 'schedules_articles', 'still counted under Schedules and Articles');
});
