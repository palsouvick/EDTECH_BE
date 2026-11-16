'use strict';

/**
 * PYQ-only practice tests (preset 'pyq' on POST /custom-tests): a subject-wise test
 * built ONLY from real past-paper questions, with exam / year / difficulty / repeat
 * filters and practice marking. Seeded from the real paper files, so the pool is the
 * real one — not fixtures.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, MockSession, ReviewItem, PracticeAttempt, Bookmark, ExamCategory } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const catalog = require('../db/seed/catalog');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const { pyqRefBasis } = require('../src/services/questionProvenance');

const FILES = ['wbcs-prelims-2022.json', 'wbcs-prelims-2023.json', 'wbcs-prelims-2024.json', 'wbpsc-clerkship-2023-session-1.json', 'ido-2019.json'];
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const quiet = { log: () => {}, warn: () => {} };

let mongod;
let server;
let base;

async function api(method, url, body, user) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

/** Real id -> correct option, for answering a live (aliased) test in tests. */
async function keyOf(sessionId) {
  const { mockQuestionAlias } = require('../src/services/signedToken');
  const doc = await MockSession.findById(sessionId).select('+answer_key').lean();
  return Object.fromEntries(doc.questions.map((q) => [mockQuestionAlias(sessionId, String(q.qid)), { right: doc.answer_key[String(q.qid)], topic: q.topic, qid: String(q.qid) }]));
}

/** The PYQ docs in the seeded pool for a subject, by the same rules the service uses. */
async function poolDocs(subject) {
  const rows = await Question.find({ status: 'PUBLISHED', subject, provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true }).lean();
  return rows.filter((q) => q.pyq.refs.some((r) => pyqRefBasis(r, q.provenance)));
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('pyq_practice_test'));
  await Promise.all([Question.init(), ExamCategory.init(), MockSession.init(), ReviewItem.init(), PracticeAttempt.init(), Bookmark.init()]);
  await ExamCategory.insertMany(catalog);
  for (const f of FILES) {
    const r = await importQuestionFile(path.join(PYQ_DIR, f), quiet);
    assert.deepEqual(r.errors, [], f);
  }
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

const pyqBody = (over = {}) => ({ subject: 'quant', preset: 'pyq', questionCount: 10, timeLimitMinutes: 10, ...over });

test('a PYQ test needs a signed-in student', async () => {
  assert.equal((await api('POST', '/custom-tests/preview', pyqBody())).status, 401);
  assert.equal((await api('POST', '/custom-tests', pyqBody())).status, 401);
});

test('preview: Mathematics, all West Bengal exams, counts the real pool', async () => {
  const pool = await poolDocs('quant');
  assert.ok(pool.length >= 70, `seeded quant pool ${pool.length}`);
  const { status, body } = await api('POST', '/custom-tests/preview', pyqBody(), 'previewer');
  assert.equal(status, 200, JSON.stringify(body));
  const d = body.data;
  assert.equal(d.preset, 'pyq');
  assert.equal(d.pyq.available, pool.length);
  assert.equal(d.questionCount, 10);
  assert.equal(d.shortBy, 0);
  assert.equal(d.recommendedMinutes, 12, '10 mixed Math questions at 70s each');
  assert.deepEqual(d.pyq.years, [2024, 2023, 2022, 2019]);
  assert.ok(d.plan.length > 0 && d.plan.reduce((a, p) => a + p.count, 0) === 10);
});

test('the specified flow: Mathematics → All West Bengal Exams → 10 questions → 10 minutes', async () => {
  const user = 'pyq_flow';
  const created = await api('POST', '/custom-tests', pyqBody(), user);
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const s = created.body.data;
  assert.equal(s.questions.length, 10);
  assert.equal(s.config.timeLimitMinutes, 10);
  assert.equal(s.config.markingScheme.basis, 'PRACTICE');
  assert.deepEqual([s.config.markingScheme.positive, s.config.markingScheme.negative], [1, 0]);
  assert.equal(s.custom.preset, 'pyq');
  assert.deepEqual(s.custom.pyq, { exam: null, year: 'all', yearFrom: null, yearTo: null, repeatMode: 'all' });
  // Only real past-paper questions: a showable PYQ ref, never a synthetic one.
  for (const q of s.questions) {
    assert.ok(q.pyq.length > 0, 'every question carries its paper');
    assert.ok(!q.pyq.some((r) => /-SYN-/i.test(r.question_code ?? '')), 'no synthetic ref');
    assert.ok(REAL_PAPER.includes(q.provenance), q.provenance);
  }
  assert.equal(s.notes.pyq, 10);
  assert.equal(s.notes.shortBy, 0);

  // 7 right, 2 wrong, 1 unattempted.
  const key = await keyOf(s.sessionId);
  const responses = s.questions.map((q, i) => {
    if (i === 9) return { questionId: q.questionId, selectedOptionId: null, timeSpentSec: 0 };
    const right = key[q.questionId].right;
    return {
      questionId: q.questionId,
      selectedOptionId: i < 7 ? right : q.options.find((o) => o.optionId !== right).optionId,
      timeSpentSec: 30,
    };
  });
  const sub = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  const r = sub.body.data;
  assert.equal(r.counts.correct, 7);
  assert.equal(r.counts.incorrect, 2);
  assert.equal(r.counts.unattempted, 1);
  assert.equal(r.score, 7, 'practice marking: +1 correct, 0 for wrong');
  assert.equal(r.maxScore, 10);
  assert.equal(r.custom.preset, 'pyq');

  // Wrong answers land in the Mistake Notebook.
  const mistakes = await ReviewItem.find({ user_id: user, from_mistake: true }).lean();
  assert.equal(mistakes.length, 2);

  // The result shows the original paper per question, with the stored explanation.
  const analytics = await api('GET', `/mock/session/${s.sessionId}/analytics`, null, user);
  assert.equal(analytics.status, 200, JSON.stringify(analytics.body));
  assert.equal(analytics.body.data.review.length, 10);
  for (const item of analytics.body.data.review) {
    assert.ok(item.pyq.length > 0, 'review carries the paper source');
    assert.ok(item.pyq[0].examName, 'review names the exam');
    assert.ok(item.explanation.steps.length > 0, 'every PYQ has a stored explanation');
    assert.ok(item.explanation.steps[0].en && item.explanation.steps[0].bn, 'explanation in English and Bengali');
  }
  assert.equal(analytics.body.data.marking.basis, 'PRACTICE');
  assert.equal(analytics.body.data.topicBreakdown.reduce((a, t) => a + t.total, 0), 10);

  // The custom-test report agrees: score, accuracy, time, chapter table.
  const report = await api('GET', `/custom-tests/${s.sessionId}/report`, null, user);
  assert.equal(report.status, 200, JSON.stringify(report.body));
  assert.equal(report.body.data.score, 7);
  assert.equal(report.body.data.accuracy, 70);
  assert.equal(report.body.data.correct, 7);
  assert.equal(report.body.data.wrong, 2);
  assert.equal(report.body.data.skipped, 1);
  assert.equal(report.body.data.total, 10);
  assert.ok(report.body.data.timeSec >= 0);
  assert.equal(report.body.data.chapters.reduce((a, c) => a + c.total, 0), 10);
  assert.equal(report.body.data.marking.basis, 'PRACTICE');
});

test('exam filter: Clerkship-only quant draws only Clerkship papers', async () => {
  const prev = await api('POST', '/custom-tests/preview', pyqBody({ pyqExam: 'WBPSC Clerkship (Part-I)' }), 'clerk_prev');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.equal(prev.body.data.pyq.available, 29, 'one Clerkship session file, no collisions in it');
  const created = await api('POST', '/custom-tests', pyqBody({ pyqExam: 'WBPSC Clerkship (Part-I)' }), 'clerk_taker');
  assert.equal(created.status, 201, JSON.stringify(created.body));
  for (const q of created.body.data.questions) {
    assert.ok(q.pyq.some((r) => r.examName === 'WBPSC Clerkship (Part-I)'), JSON.stringify(q.pyq));
  }
});

test('year filter: 2022 quant draws only 2022 papers', async () => {
  const prev = await api('POST', '/custom-tests/preview', pyqBody({ pyqYear: 2022 }), 'year_prev');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.equal(prev.body.data.pyq.available, 8);
  assert.deepEqual(prev.body.data.pyq.years, [2022]);
  const created = await api('POST', '/custom-tests', pyqBody({ pyqYear: 2022, questionCount: 8 }), 'year_taker');
  assert.equal(created.status, 201, JSON.stringify(created.body));
  assert.equal(created.body.data.questions.length, 8);
  for (const q of created.body.data.questions) {
    assert.ok(q.pyq.some((r) => r.year === 2022), JSON.stringify(q.pyq));
  }
});

test('recent years: the 5 most recent years in the pool', async () => {
  const prev = await api('POST', '/custom-tests/preview', pyqBody({ pyqYear: 'recent' }), 'recent_prev');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.deepEqual(prev.body.data.pyq.years, [2024, 2023, 2022, 2019]);
  assert.equal(prev.body.data.pyq.available, (await poolDocs('quant')).length);
});

test('difficulty: Hard quant has only 3 questions — the shortfall is reported, not padded', async () => {
  const prev = await api('POST', '/custom-tests/preview', pyqBody({ difficulty: 'hard' }), 'hard_prev');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.equal(prev.body.data.pyq.available, 3);
  assert.equal(prev.body.data.questionCount, 3);
  assert.equal(prev.body.data.shortBy, 7);
  const created = await api('POST', '/custom-tests', pyqBody({ difficulty: 'hard' }), 'hard_taker');
  assert.equal(created.status, 422, JSON.stringify(created.body));
  assert.equal(created.body.error.code, 'INSUFFICIENT_QUESTIONS');
  assert.equal(created.body.error.details.available, 3);

  const easy = await api('POST', '/custom-tests', pyqBody({ difficulty: 'easy', questionCount: 10 }), 'easy_taker');
  assert.equal(easy.status, 201, JSON.stringify(easy.body));
  const session = await MockSession.findById(easy.body.data.sessionId).lean();
  assert.ok(session.questions.every((q) => q.difficulty <= 2), 'easy means difficulty 1–2');
});

test('IDO-only English has only 7 questions in the bank — the test starts with 7, not 10', async () => {
  // 8 file rows, but two share one printed stem, so the importer stores 7 documents.
  const prev = await api('POST', '/custom-tests/preview', { subject: 'english', preset: 'pyq', questionCount: 10, timeLimitMinutes: 10, pyqExam: 'Industrial Development Officer' }, 'ido_prev');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.equal(prev.body.data.pyq.available, 7);
  assert.equal(prev.body.data.questionCount, 7);
  assert.equal(prev.body.data.shortBy, 3);
  const created = await api('POST', '/custom-tests', { subject: 'english', preset: 'pyq', questionCount: 10, timeLimitMinutes: 10, pyqExam: 'Industrial Development Officer' }, 'ido_taker');
  assert.equal(created.status, 201, JSON.stringify(created.body));
  assert.equal(created.body.data.questions.length, 7);
  assert.equal(created.body.data.notes.shortBy, 3);
  for (const q of created.body.data.questions) {
    assert.ok(q.pyq.some((r) => r.examName === 'Industrial Development Officer'));
  }
});

test('repeat modes resolve server-side from attempts, mistakes and bookmarks', async () => {
  const user = 'pyq_repeat';
  const pool = await poolDocs('quant');
  const attempted = pool.slice(0, 5);
  const wrong = pool.slice(5, 13);
  const saved = pool.slice(13, 19);
  await PracticeAttempt.insertMany(attempted.map((q) => ({ user_id: user, question_id: q._id, subject: 'quant', topic: q.topic, correct: true })));
  await ReviewItem.insertMany(wrong.map((q) => ({ user_id: user, question_id: q._id, subject: 'quant', topic: q.topic, from_mistake: true, status: 'active', due_at: new Date() })));
  await Bookmark.insertMany(saved.map((q) => ({ user_id: user, question_id: q._id, subject: 'quant', topic: q.topic })));

  const un = await api('POST', '/custom-tests/preview', pyqBody({ repeatMode: 'unattempted' }), user);
  assert.equal(un.status, 200, JSON.stringify(un.body));
  assert.equal(un.body.data.pyq.available, pool.length - attempted.length);
  const unCreated = await api('POST', '/custom-tests', pyqBody({ repeatMode: 'unattempted' }), user);
  assert.equal(unCreated.status, 201, JSON.stringify(unCreated.body));
  const unSession = await MockSession.findById(unCreated.body.data.sessionId).lean();
  const attemptedIds = new Set(attempted.map((q) => String(q._id)));
  assert.ok(unSession.questions.every((q) => !attemptedIds.has(String(q.qid))), 'no attempted question is served again');

  const wr = await api('POST', '/custom-tests/preview', pyqBody({ repeatMode: 'wrong' }), user);
  assert.equal(wr.body.data.pyq.available, wrong.length);
  const wrCreated = await api('POST', '/custom-tests', pyqBody({ repeatMode: 'wrong', questionCount: 5 }), user);
  assert.equal(wrCreated.status, 201, JSON.stringify(wrCreated.body));
  const wrSession = await MockSession.findById(wrCreated.body.data.sessionId).lean();
  const wrongIds = new Set(wrong.map((q) => String(q._id)));
  assert.ok(wrSession.questions.every((q) => wrongIds.has(String(q.qid))), 'wrong mode serves only open mistakes');

  const bm = await api('POST', '/custom-tests/preview', pyqBody({ repeatMode: 'bookmarked' }), user);
  assert.equal(bm.body.data.pyq.available, saved.length);
  const bmCreated = await api('POST', '/custom-tests', pyqBody({ repeatMode: 'bookmarked', questionCount: 5 }), user);
  assert.equal(bmCreated.status, 201, JSON.stringify(bmCreated.body));
  const bmSession = await MockSession.findById(bmCreated.body.data.sessionId).lean();
  const savedIds = new Set(saved.map((q) => String(q._id)));
  assert.ok(bmSession.questions.every((q) => savedIds.has(String(q.qid))), 'bookmarked mode serves only bookmarks');

  // A repeat mode with nothing in it reports 0 instead of serving other questions.
  const fresh = await api('POST', '/custom-tests/preview', pyqBody({ repeatMode: 'wrong' }), 'nobody_yet');
  assert.equal(fresh.body.data.pyq.available, 0);
  assert.equal(fresh.body.data.shortBy, 10);
  assert.equal((await api('POST', '/custom-tests', pyqBody({ repeatMode: 'wrong' }), 'nobody_yet')).body.error.code, 'INSUFFICIENT_QUESTIONS');
});

test('practice again after a PYQ test rebuilds a PYQ test without repeating questions', async () => {
  const user = 'pyq_followup';
  const first = await api('POST', '/custom-tests', pyqBody(), user);
  assert.equal(first.status, 201, JSON.stringify(first.body));
  const key = await keyOf(first.body.data.sessionId);
  const responses = first.body.data.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: key[q.questionId].right, timeSpentSec: 10 }));
  assert.equal((await api('POST', '/mock/submit-session', { sessionId: first.body.data.sessionId, responses }, user)).status, 200);
  const again = await api('POST', '/custom-tests', { subject: 'quant', preset: 'followup', followUpOf: first.body.data.sessionId }, user);
  assert.equal(again.status, 201, JSON.stringify(again.body));
  assert.equal(again.body.data.custom.preset, 'pyq');
  assert.deepEqual(again.body.data.custom.pyq, { exam: null, year: 'all', yearFrom: null, yearTo: null, repeatMode: 'all' });
  const second = await MockSession.findById(again.body.data.sessionId).lean();
  const firstIds = new Set((await MockSession.findById(first.body.data.sessionId).lean()).questions.map((q) => String(q.qid)));
  assert.ok(second.questions.every((q) => !firstIds.has(String(q.qid))), 'no question repeats');
});

test('invalid PYQ filters are rejected, not silently widened', async () => {
  assert.equal((await api('POST', '/custom-tests', pyqBody({ pyqExam: 'WBP Constable' }), 'bad_exam')).status, 400);
  assert.equal((await api('POST', '/custom-tests', pyqBody({ pyqExam: 'WBPSC Miscellaneous' }), 'bad_exam2')).status, 400);
  const range = await api('POST', '/custom-tests', pyqBody({ pyqYearFrom: 2023, pyqYearTo: 2019 }), 'bad_range');
  assert.equal(range.status, 422, JSON.stringify(range.body));
  assert.equal(range.body.error.code, 'INVALID_YEAR_RANGE');
  // A year range that matches nothing reports 0.
  const empty = await api('POST', '/custom-tests/preview', pyqBody({ pyqYearFrom: 2000, pyqYearTo: 2001 }), 'empty_range');
  assert.equal(empty.body.data.pyq.available, 0);
});
