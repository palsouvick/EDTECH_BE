'use strict';

/**
 * F13 — one revision place. GET /me/revision summarises every revision
 * store in six sections, and every old revision endpoint still returns the
 * student's existing data unchanged (nothing is moved or rescheduled).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt, ReviewItem, Bookmark, GkFactProgress, VocabularyProgress } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const catalog = require('../db/seed/catalog');

const DAY = 86_400_000;
let mongod;
let server;
let base;

async function call(method, url, { body, cookie } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}
const cookieFrom = (setCookie) => setCookie?.split(';')[0];

let seq = 0;
function mkQuestion(subject, topic, pyq = false) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `RV-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty: 2,
    provenance: pyq ? 'OFFICIAL_VERIFIED' : 'ORIGINAL_PRACTICE',
    stem: { en: `Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    status: 'PUBLISHED',
    ...(pyq && { pyq: { is_pyq: true, refs: [{ exam_name: 'WBCS (Exe.) Prelims', tier: 'PRELIMS', year: 2022, question_code: `RV-2022-Q${seq}`, source_url: 'https://psc.wb.gov.in/p', answer_key_url: 'https://psc.wb.gov.in/k' }] } }),
  };
}

let q;
test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('revision_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init(), ReviewItem.init(), Bookmark.init(), GkFactProgress.init(), VocabularyProgress.init()]);
  await ExamCategory.insertMany(catalog);
  q = {
    pct: await Question.create(mkQuestion('quant', 'percentage')),
    polityPyq: await Question.create(mkQuestion('gs', 'polity', true)),
    grammar: await Question.create(mkQuestion('english', 'grammar')),
    english: await Question.insertMany(Array.from({ length: 8 }, () => mkQuestion('english', 'grammar'))),
  };
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Revision Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}

/** Existing revision data, written straight into each old store (as earlier versions of the app did). */
async function seedOldData(userId) {
  const past = new Date(Date.now() - DAY);
  const future = new Date(Date.now() + 5 * DAY);
  await ReviewItem.insertMany([
    // A mistake, due today.
    { user_id: userId, question_id: q.pct._id, subject: 'quant', topic: 'percentage', from_mistake: true, wrong_count: 2, due_at: past, stage: 1 },
    // A previous-year question got wrong, due today.
    { user_id: userId, question_id: q.polityPyq._id, subject: 'gs', topic: 'polity', from_mistake: true, wrong_count: 1, due_at: past },
    // A bookmark, not due yet.
    { user_id: userId, question_id: q.grammar._id, subject: 'english', topic: 'grammar', from_bookmark: true, due_at: future },
    // A mastered mistake.
    { user_id: userId, question_id: q.english[0]._id, subject: 'english', topic: 'grammar', from_mistake: true, status: 'mastered', due_at: past },
  ]);
  await Bookmark.create({ user_id: userId, question_id: q.grammar._id, subject: 'english', topic: 'grammar' });
  const fid = () => new mongoose.Types.ObjectId();
  await GkFactProgress.insertMany([
    { user_id: userId, fact_id: fid(), topic: 'polity', status: 'learning', due_at: past, reviews: 1 },
    { user_id: userId, fact_id: fid(), topic: 'polity', status: 'learning', due_at: future, bookmarked: true },
    { user_id: userId, fact_id: fid(), topic: 'geography', status: 'mastered' },
  ]);
  await VocabularyProgress.insertMany([
    { user_id: userId, word_id: fid(), learned: true, next_review_at: past },
    { user_id: userId, word_id: fid(), learned: true, next_review_at: future, difficult: true, favourite: true, miss_count: 2 },
  ]);
  // English grammar answered poorly -> a weak topic under the unified mastery definition.
  await PracticeAttempt.insertMany(q.english.map((x, i) => ({ user_id: userId, question_id: x._id, subject: 'english', topic: 'grammar', correct: i < 2, source: 'practice' })));
}

test('revision: auth required; a new student gets empty sections, not errors', async () => {
  assert.equal((await call('GET', '/me/revision')).status, 401);
  const u = await registerUser('rev-new@example.com');
  const res = await call('GET', '/me/revision?tz=330', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;
  assert.equal(d.dueToday.total, 0);
  assert.equal(d.mistakes.open, 0);
  assert.deepEqual(d.bookmarked, { questions: 0, gkFacts: 0, words: 0 });
  assert.deepEqual(d.weakTopics, []);
  assert.deepEqual(d.pyq, { inQueue: 0, dueToday: 0 });
});

test('revision: one summary with all six sections, from the existing stores', async () => {
  const u = await registerUser('rev-all@example.com');
  await seedOldData(u.id);
  const res = await call('GET', '/me/revision?tz=330', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const d = res.body.data;

  // Due today: 2 questions + 1 GK fact + 1 word.
  assert.deepEqual(
    { total: d.dueToday.total, questions: d.dueToday.questions, gkFacts: d.dueToday.gkFacts, vocabulary: d.dueToday.vocabulary },
    { total: 4, questions: 2, gkFacts: 1, vocabulary: 1 },
  );
  // Mistakes: 2 open (1 repeating), 1 mastered.
  assert.equal(d.mistakes.open, 2);
  assert.equal(d.mistakes.repeating, 1);
  assert.equal(d.mistakes.mastered, 1);
  assert.ok(d.mistakes.bySubject.some((s) => s.subject === 'quant' && s.open === 1));
  // Bookmarked: 1 question, 1 GK fact, 1 favourite word.
  assert.deepEqual(d.bookmarked, { questions: 1, gkFacts: 1, words: 1 });
  // Weak topics come from the unified mastery definition.
  assert.equal(d.weakTopics[0].subject, 'english');
  assert.equal(d.weakTopics[0].topic, 'grammar');
  assert.equal(d.weakTopics[0].stage, 'practising');
  // PYQ revision: the polity PYQ mistake.
  assert.deepEqual(d.pyq, { inQueue: 1, dueToday: 1 });
  // Vocabulary.
  assert.equal(d.vocabulary.due, 1);
  assert.equal(d.vocabulary.difficult, 1);
  assert.equal(d.vocabulary.missed, 1);
});

test('revision: old revision data is still reachable through every old endpoint, unchanged', async () => {
  const u = await registerUser('rev-old@example.com');
  await seedOldData(u.id);
  const before = await ReviewItem.find({ user_id: u.id }).sort({ _id: 1 }).lean();
  await call('GET', '/me/revision?tz=330', { cookie: u.cookie });

  // /revise: the question queue.
  const due = await call('GET', '/review/due?tz=330', { cookie: u.cookie });
  assert.equal(due.status, 200);
  assert.equal(due.body.data.items.length, 2);
  // PYQ revision = the same queue, narrowed.
  const pyq = await call('GET', '/review/due?tz=330&pyq=1', { cookie: u.cookie });
  assert.equal(pyq.status, 200);
  assert.deepEqual(pyq.body.data.items.map((i) => i.question.questionId), [String(q.polityPyq._id)]);
  // /mistakes: the notebook.
  const mistakes = await call('GET', '/review/mistakes', { cookie: u.cookie });
  assert.equal(mistakes.status, 200, JSON.stringify(mistakes.body));
  assert.ok(JSON.stringify(mistakes.body.data).includes(String(q.pct._id)));
  // Bookmarks (old /revision page, now /revision/bookmarks).
  const bm = await call('GET', '/practice/bookmarks', { cookie: u.cookie });
  assert.equal(bm.status, 200);
  assert.ok(JSON.stringify(bm.body.data).includes(String(q.grammar._id)));
  // GK revision.
  const gkRev = await call('GET', '/gk/revision', { cookie: u.cookie });
  assert.equal(gkRev.status, 200);
  assert.equal(gkRev.body.data.counts.due, 1);
  assert.equal(gkRev.body.data.counts.bookmarked, 1);
  // Vocabulary revision.
  const vocab = await call('GET', '/vocabulary/progress/summary', { cookie: u.cookie });
  assert.equal(vocab.status, 200);
  assert.equal(vocab.body.data.due, 1);

  // Reading the summary rescheduled nothing.
  const after = await ReviewItem.find({ user_id: u.id }).sort({ _id: 1 }).lean();
  assert.deepEqual(after.map((i) => [String(i._id), i.due_at.getTime(), i.stage, i.status]), before.map((i) => [String(i._id), i.due_at.getTime(), i.stage, i.status]));
});

test('revision: answering a PYQ from PYQ revision uses the existing schedule', async () => {
  const u = await registerUser('rev-answer@example.com');
  await seedOldData(u.id);
  const correct = q.polityPyq.options[0].oid;
  const res = await call('POST', '/review/answer', { cookie: u.cookie, body: { questionId: String(q.polityPyq._id), selectedOptionId: correct } });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const item = await ReviewItem.findOne({ user_id: u.id, question_id: q.polityPyq._id }).lean();
  assert.ok(item.due_at > new Date(), 'moved along the existing intervals');
  const d = (await call('GET', '/me/revision?tz=330', { cookie: u.cookie })).body.data;
  assert.deepEqual(d.pyq, { inQueue: 1, dueToday: 0 });
});
