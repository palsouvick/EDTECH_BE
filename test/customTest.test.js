'use strict';

/**
 * Custom chapter test: pure rules (distribution, picking, time, history) and the API
 * (/custom-tests) against a real mongod. The key promise: a test built from chosen chapters
 * contains questions from those chapters only.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const L = require('../src/services/customTest.logic');
const { createApp } = require('../src/app');
const { Question, ExamCategory, MockSession, ReviewItem } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const catalog = require('../db/seed/catalog');

/* ------------------------------------------------------------------ pure rules */

test('smart time: 20 exam-level Math questions -> 25 minutes; never under 5', () => {
  assert.equal(L.smartMinutes('quant', 'exam', 20), 25);
  assert.equal(L.smartMinutes('quant', 'easy', 10), 8);
  assert.equal(L.smartMinutes('gs', 'easy', 5), 5);
});

test('difficulty ladder for follow-ups and Challenge me', () => {
  assert.deepEqual(['easy', 'moderate', 'exam', 'hard', 'mixed'].map(L.stepUp), ['moderate', 'exam', 'hard', 'hard', 'exam']);
});

test('balanced split: 30 over 3 chapters -> 10/10/10, sums to n', () => {
  const chapters = ['percentage', 'profit_loss', 'ratio_proportion'].map((topic) => ({ topic, available: 100 }));
  const { plan, total, shortBy } = L.planDistribution({ chapters, questionCount: 30, distribution: 'balanced' });
  assert.deepEqual(plan.map((p) => p.count), [10, 10, 10]);
  assert.equal(total, 30);
  assert.equal(shortBy, 0);
  const odd = L.planDistribution({ chapters, questionCount: 25, distribution: 'balanced' });
  assert.equal(odd.plan.reduce((a, p) => a + p.count, 0), 25);
});

test('a chapter with few questions gives its share to the others', () => {
  const chapters = [{ topic: 'a', available: 4 }, { topic: 'b', available: 100 }, { topic: 'c', available: 100 }];
  const { plan } = L.planDistribution({ chapters, questionCount: 30, distribution: 'balanced' });
  assert.deepEqual(plan.map((p) => p.count), [4, 13, 13]);
  assert.ok(plan[0].reasons.includes('limited:4'));
  const tiny = L.planDistribution({ chapters: [{ topic: 'a', available: 6 }], questionCount: 20, distribution: 'balanced' });
  assert.equal(tiny.total, 6);
  assert.equal(tiny.shortBy, 14);
});

test('smart split gives weak, must-know and mistake-heavy chapters more, and says why', () => {
  const chapters = [
    { topic: 'percentage', available: 100, accuracyPct: 92, answers: 30, priority: 'MUST' },
    { topic: 'profit_loss', available: 100, accuracyPct: 40, answers: 20, mistakes: 6 },
    { topic: 'ratio_proportion', available: 100, accuracyPct: 70, answers: 10 },
  ];
  const { plan } = L.planDistribution({ chapters, questionCount: 30, distribution: 'smart' });
  const by = Object.fromEntries(plan.map((p) => [p.topic, p]));
  assert.equal(plan.reduce((a, p) => a + p.count, 0), 30);
  assert.ok(by.profit_loss.count > by.ratio_proportion.count, JSON.stringify(plan));
  assert.ok(by.profit_loss.count > by.percentage.count);
  assert.ok(by.profit_loss.reasons.includes('weak:40'));
  assert.ok(by.profit_loss.reasons.includes('mistakes:6'));
  assert.ok(by.percentage.reasons.includes('must_know'));
  assert.ok(plan.every((p) => p.count >= 1));
});

test('mistakes split follows the number of open mistakes', () => {
  const chapters = [{ topic: 'a', available: 50, mistakes: 9 }, { topic: 'b', available: 50, mistakes: 1 }];
  const { plan } = L.planDistribution({ chapters, questionCount: 20, distribution: 'mistakes' });
  assert.ok(plan[0].count >= 15, JSON.stringify(plan));
});

const signals = (over = {}) => ({
  seen: new Set(),
  recent: new Set(),
  mistakeQids: new Set(),
  mistakePatterns: new Set(),
  mistakeSubtopics: new Set(),
  weakPatterns: new Set(),
  ...over,
});
const cand = (i, extra = {}) => ({ _id: `q${i}`, topic: 't', difficulty: (i % 5) + 1, pattern: `p${i % 4}`, ...extra });
const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

test('picking: exact count, no repeats or duplicates, band mix followed when the pool allows', () => {
  const pool = Array.from({ length: 60 }, (_, i) => cand(i, i === 1 ? { duplicate_keys: ['k'] } : i === 2 ? { duplicate_keys: ['k'] } : {}));
  const res = L.pickChapter(pool, 20, { mix: L.DIFFICULTY_RULES.exam.mix, signals: signals(), rng: seeded(7) });
  assert.equal(res.picked.length, 20);
  assert.equal(new Set(res.picked.map((q) => q._id)).size, 20);
  assert.ok(!(res.picked.some((q) => q._id === 'q1') && res.picked.some((q) => q._id === 'q2')), 'duplicate keys never together');
  assert.deepEqual(res.mix, { EASY: 3, MEDIUM: 10, HARD: 7 });
  assert.equal(res.borrowed, 0);
});

test('picking: a short band borrows from the nearest one and reports it', () => {
  const pool = Array.from({ length: 30 }, (_, i) => cand(i, { difficulty: i < 3 ? 4 : 3 }));
  const res = L.pickChapter(pool, 10, { mix: L.DIFFICULTY_RULES.hard.mix, signals: signals(), rng: seeded(3) });
  assert.equal(res.picked.length, 10);
  assert.equal(res.mix.HARD, 3);
  assert.equal(res.borrowed, 7);
});

test('picking prefers unseen questions and siblings of mistakes; exact mistakes only in Retry, capped at 30%', () => {
  const pool = Array.from({ length: 40 }, (_, i) => cand(i, { difficulty: 3 }));
  const seen = new Set(pool.slice(0, 30).map((q) => q._id));
  let unseenPicked = 0;
  for (let s = 1; s <= 20; s++) {
    const res = L.pickChapter(pool, 10, { mix: { MEDIUM: 1 }, signals: signals({ seen }), rng: seeded(s) });
    unseenPicked += res.picked.filter((q) => !seen.has(q._id)).length;
  }
  assert.ok(unseenPicked / 200 > 0.45, `unseen share ${unseenPicked / 200}`); // 25% of the pool

  const mistakeQids = new Set(['q0', 'q4', 'q8', 'q12', 'q16', 'q20']); // all pattern p0
  const sig = signals({ mistakeQids, mistakePatterns: new Set(['t.p0']) });
  const normal = L.pickChapter(pool, 10, { mix: { MEDIUM: 1 }, signals: sig, rng: seeded(5) });
  assert.equal(normal.picked.filter((q) => mistakeQids.has(q._id)).length, 0, 'no exact repeat of a mistake outside Retry');
  let siblings = 0;
  for (let s = 1; s <= 20; s++) {
    const retry = L.pickChapter(pool, 10, { mix: { MEDIUM: 1 }, signals: sig, preset: 'mistakes', rng: seeded(s * 7919) });
    assert.ok(retry.originals <= 3);
    siblings += retry.siblings;
  }
  assert.ok(siblings / 20 >= 3, `on average most of the 4 new same-pattern questions are picked (${siblings / 20})`);

  // A chapter with nothing else left still fills the test with earlier mistakes.
  const small = pool.slice(0, 8);
  const smallSig = signals({ mistakeQids: new Set(small.slice(0, 5).map((q) => q._id)) });
  assert.equal(L.pickChapter(small, 8, { mix: { MEDIUM: 1 }, signals: smallSig, rng: seeded(9) }).picked.length, 8);
});

test('history: improvement, best, challenge unlock after three tests >= 85%', () => {
  const t = (scorePct, topic = 'a') => ({ scorePct, accuracy: scorePct, timeSec: 600, perQuestion: [{ topic, correct: scorePct > 50 }] });
  const h = L.historySummary([t(90), t(88), t(86), t(60), t(50), t(40)]); // newest first
  assert.equal(h.testsTaken, 6);
  assert.equal(h.bestScorePct, 90);
  assert.equal(h.improvement, 88 - 50);
  assert.equal(h.challengeUnlocked, true);
  assert.equal(L.historySummary([t(90), t(80), t(95)]).challengeUnlocked, false);
  assert.equal(L.historySummary([t(90)]).improvement, null);
});

test('recommendations: >= 85% next chapter, 60-84% practise, < 60% revise steps', () => {
  const rec = L.recommendationsFor([{ topic: 'a', accuracy: 90 }, { topic: 'b', accuracy: 70 }, { topic: 'c', accuracy: 40 }], { nextChapterOf: () => 'd' });
  assert.deepEqual(rec.map((r) => r.action), ['next_chapter', 'practice', 'revise']);
  assert.equal(rec[0].nextTopic, 'd');
  assert.deepEqual(rec[2].steps, ['revise_lesson', 'basic_quiz', 'targeted_test']);
});

/* ------------------------------------------------------------------ API */

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

const TOPICS = ['percentage', 'profit_loss', 'ratio_proportion', 'time_work'];
let n = 0;
function Q(topic, difficulty, extra = {}) {
  n += 1;
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_${String(n).padStart(5, '0')}${c}`);
  return {
    code: `CT-${n}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'quant',
    topic,
    difficulty,
    pattern: `${topic}_p${n % 3}`,
    stem: { en: `Custom test question ${n} on ${topic}`, bn: `প্রশ্ন ${n}` },
    options: ids.map((oid, k) => ({ oid, text: { en: `${n}-${k}`, bn: `${n}-${k}` } })),
    correct_option_id: ids[0],
    solution: { steps: [{ en: `Step for ${n}`, bn: 'ধাপ' }], shortcut: { en: 'Shortcut', bn: 'শর্টকাট' } },
    status: 'PUBLISHED',
    ...extra,
  };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('custom_test'));
  await Promise.all([Question.init(), ExamCategory.init(), MockSession.init(), ReviewItem.init()]);
  await ExamCategory.insertMany(catalog);
  const docs = [];
  for (const topic of TOPICS) for (let i = 0; i < 30; i++) docs.push(Q(topic, (i % 5) + 1));
  docs.push(Q('time_work', 3, { status: 'DRAFT' })); // never served
  await Question.insertMany(docs);
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

/** Real id -> correct option, for answering a live (aliased) test in tests. */
async function keyOf(sessionId) {
  const { mockQuestionAlias } = require('../src/services/signedToken');
  const doc = await MockSession.findById(sessionId).select('+answer_key').lean();
  return Object.fromEntries(doc.questions.map((q) => [mockQuestionAlias(sessionId, String(q.qid)), { right: doc.answer_key[String(q.qid)], topic: q.topic }]));
}

test('needs a signed-in student', async () => {
  assert.equal((await api('GET', '/custom-tests/options?subject=quant')).status, 401);
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', topics: ['percentage'] })).status, 401);
});

test('options list every Math chapter with how many questions it has', async () => {
  const { status, body } = await api('GET', '/custom-tests/options?subject=quant', null, 'opt_student');
  assert.equal(status, 200, JSON.stringify(body));
  const d = body.data;
  assert.equal(d.chapters[0].topic, 'percentage');
  const pct = d.chapters.find((c) => c.topic === 'percentage');
  assert.equal(pct.available.total, 30);
  assert.equal(pct.available.easy + pct.available.moderate + pct.available.hard, 30);
  assert.equal(d.chapters.find((c) => c.topic === 'time_work').available.total, 30, 'drafts are not counted');
  assert.equal(d.chapters.find((c) => c.topic === 'algebra').available.total, 0);
  assert.equal(d.secondsPerQuestion.exam, 75);
  assert.equal(d.history.testsTaken, 0);
});

test('a test from two chapters has questions from those chapters only, without answers', async () => {
  const { status, body } = await api('POST', '/custom-tests', { subject: 'quant', topics: ['percentage', 'profit_loss'], questionCount: 20, distribution: 'balanced' }, 'only_two');
  assert.equal(status, 201, JSON.stringify(body));
  const d = body.data;
  assert.equal(d.questions.length, 20);
  assert.ok(d.questions.every((q) => ['percentage', 'profit_loss'].includes(q.topic)), 'only the chosen chapters');
  assert.deepEqual(d.custom.plan.map((p) => [p.topic, p.count]), [['percentage', 10], ['profit_loss', 10]]);
  assert.equal(d.config.timeLimitMinutes, 25, 'smart time for 20 exam-level questions');
  assert.equal(d.custom.difficulty, 'exam');
  assert.equal(d.custom.mode, 'exam');
  assert.equal(d.config.markingScheme.basis, 'OFFICIAL', 'exam mode uses the official Clerkship marking');
  assert.equal(d.config.markingScheme.negative, 0.25);
  const raw = JSON.stringify(d.questions);
  assert.ok(!raw.includes('correct_option_id') && !raw.includes('correctOptionId'));
  const doc = await MockSession.findById(d.sessionId).lean();
  assert.ok(doc.questions.every((q) => ['percentage', 'profit_loss'].includes(q.topic)));
  // Exam mode never reveals an answer before submitting.
  const check = await api('POST', `/custom-tests/${d.sessionId}/check`, { questionId: d.questions[0].questionId, selectedOptionId: d.questions[0].options[0].optionId }, 'only_two');
  assert.equal(check.status, 409);
});

test('chosen time, preview and validation', async () => {
  const prev = await api('POST', '/custom-tests/preview', { subject: 'quant', topics: ['percentage', 'ratio_proportion', 'time_work'], questionCount: 30 }, 'previewer');
  assert.equal(prev.status, 200, JSON.stringify(prev.body));
  assert.equal(prev.body.data.questionCount, 30);
  assert.equal(prev.body.data.recommendedMinutes, 38);
  assert.equal(prev.body.data.plan.length, 3);
  assert.ok(prev.body.data.plan.every((p) => p.reasons.includes('new')), 'no history yet: every chapter is new');

  const timed = await api('POST', '/custom-tests', { subject: 'quant', topics: ['ratio_proportion'], questionCount: 10, timeLimitMinutes: 12, difficulty: 'easy' }, 'previewer');
  assert.equal(timed.status, 201, JSON.stringify(timed.body));
  assert.equal(timed.body.data.config.timeLimitMinutes, 12);
  assert.equal(timed.body.data.notes.mix.EASY, 10, 'ratio_proportion has 12 easy questions');

  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', topics: [], questionCount: 10 }, 'previewer')).status, 422);
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', topics: ['algebra'], questionCount: 10 }, 'previewer')).body.error.code, 'INSUFFICIENT_QUESTIONS');
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', topics: ['percentage'], questionCount: 101 }, 'previewer')).status, 400);
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', topics: ['percentage'], questionCount: 30, timeLimitMinutes: 4 }, 'previewer')).body.error.code, 'TIME_TOO_SHORT');
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', preset: 'mastery', topics: ['percentage', 'profit_loss'] }, 'previewer')).body.error.code, 'ONE_CHAPTER');
});

test('exam mode: submit, mistakes go to the notebook, report with chapters, concepts and next steps', async () => {
  const user = 'exam_taker';
  const created = await api('POST', '/custom-tests', { subject: 'quant', topics: ['percentage', 'profit_loss'], questionCount: 10, distribution: 'balanced' }, user);
  const s = created.body.data;
  assert.equal(s.config.allowPause, true); // exam mode can be paused too (beginners need it)
  const key = await keyOf(s.sessionId);
  // All percentage right, all profit_loss wrong.
  const responses = s.questions.map((q) => ({
    questionId: q.questionId,
    selectedOptionId: key[q.questionId].topic === 'percentage' ? key[q.questionId].right : q.options.find((o) => o.optionId !== key[q.questionId].right).optionId,
    timeSpentSec: 40,
  }));
  const sub = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  assert.equal(sub.body.data.custom.preset, 'custom');
  assert.equal(sub.body.data.score, 5 - 0.25 * 5);

  const mistakes = await ReviewItem.find({ user_id: user, from_mistake: true }).lean();
  assert.equal(mistakes.length, 5);
  assert.ok(mistakes.every((m) => m.topic === 'profit_loss'));

  const rep = await api('GET', `/custom-tests/${s.sessionId}/report`, null, user);
  assert.equal(rep.status, 200, JSON.stringify(rep.body));
  const r = rep.body.data;
  assert.equal(r.accuracy, 50);
  assert.deepEqual(r.chapters.map((c) => [c.topic, c.correct, c.total, c.band]), [['percentage', 5, 5, 'strong'], ['profit_loss', 0, 5, 'weak']]);
  assert.deepEqual(r.recommendations.map((x) => x.action), ['next_chapter', 'revise']);
  assert.equal(r.recommendations[0].nextTopic, 'ratio_proportion');
  assert.ok(r.concepts.length > 0);
  assert.deepEqual(r.nextTest.focusTopics.map((f) => f.topic), ['profit_loss']);
  assert.equal(r.nextTest.harder, false);
  assert.equal((await api('GET', `/custom-tests/${s.sessionId}/report`, null, 'someone_else')).status, 404);

  // The standard analytics (answers + explanations) work, without peers or cut-offs.
  const an = await api('GET', `/mock/session/${s.sessionId}/analytics`, null, user);
  assert.equal(an.status, 200);
  assert.equal(an.body.data.peers.available, false);
  assert.deepEqual(an.body.data.cutoffs, []);
  assert.ok(an.body.data.review[0].explanation.steps.length);

  // Retry my mistakes: only the chapter with mistakes, mostly new questions on the same patterns.
  const retry = await api('POST', '/custom-tests', { subject: 'quant', preset: 'mistakes', questionCount: 10 }, user);
  assert.equal(retry.status, 201, JSON.stringify(retry.body));
  assert.ok(retry.body.data.questions.every((q) => q.topic === 'profit_loss'));
  assert.ok(retry.body.data.notes.originals <= 3);

  // Practice again: same chapters, none of the previous questions, weak chapter weighted.
  const again = await api('POST', '/custom-tests', { subject: 'quant', preset: 'followup', followUpOf: s.sessionId }, user);
  assert.equal(again.status, 201, JSON.stringify(again.body));
  const prevIds = new Set((await MockSession.findById(s.sessionId).lean()).questions.map((q) => String(q.qid)));
  const nextIds = (await MockSession.findById(again.body.data.sessionId).lean()).questions.map((q) => String(q.qid));
  assert.ok(nextIds.every((id) => !prevIds.has(id)), 'no repeated question');
  const plan = Object.fromEntries(again.body.data.custom.plan.map((p) => [p.topic, p]));
  assert.ok(plan.profit_loss.count > plan.percentage.count, JSON.stringify(plan));
  assert.ok(plan.profit_loss.reasons.includes('focus'));
  assert.equal(again.body.data.custom.followUpOf, s.sessionId);

  const hist = await api('GET', '/custom-tests/history?subject=quant', null, user);
  assert.equal(hist.status, 200);
  assert.equal(hist.body.data.testsTaken, 1);
  assert.equal(hist.body.data.bestScorePct, 38); // 3.75 / 10
  assert.deepEqual(hist.body.data.mastery.map((m) => [m.topic, m.accuracy]), [['percentage', 100], ['profit_loss', 0]]);
});

test('practice mode: instant check with explanation; the first answer is final', async () => {
  const user = 'practiser';
  const created = await api('POST', '/custom-tests', { subject: 'quant', topics: ['time_work'], questionCount: 5, mode: 'practice' }, user);
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const s = created.body.data;
  assert.equal(s.config.allowPause, true);
  assert.equal(s.config.markingScheme.basis, 'PRACTICE');
  const key = await keyOf(s.sessionId);
  const q = s.questions[0];
  const wrong = q.options.find((o) => o.optionId !== key[q.questionId].right).optionId;

  const c1 = await api('POST', `/custom-tests/${s.sessionId}/check`, { questionId: q.questionId, selectedOptionId: wrong }, user);
  assert.equal(c1.status, 200, JSON.stringify(c1.body));
  assert.equal(c1.body.data.isCorrect, false);
  assert.equal(c1.body.data.correctOptionId, key[q.questionId].right);
  assert.ok(c1.body.data.explanation.steps[0].en.startsWith('Step for'));
  assert.equal(c1.body.data.explanation.shortcut.en, 'Shortcut');
  assert.equal(c1.body.data.concept.topic, 'time_work');

  const c2 = await api('POST', `/custom-tests/${s.sessionId}/check`, { questionId: q.questionId, selectedOptionId: key[q.questionId].right }, user);
  assert.equal(c2.body.data.locked, true);
  assert.equal(c2.body.data.isCorrect, false, 'changing the answer after seeing it does not count');
  assert.equal((await api('POST', `/custom-tests/${s.sessionId}/check`, { questionId: q.questionId, selectedOptionId: 'opt_zzzzzzzz' }, user)).status, 422);
  assert.equal((await api('POST', `/custom-tests/${s.sessionId}/check`, { questionId: s.questions[1].questionId, selectedOptionId: 'opt_zzzzzzzz' }, user)).body.error.code, 'UNKNOWN_OPTION');

  // Resume shows what was already checked.
  const resumed = await api('GET', `/mock/session/${s.sessionId}`, null, user);
  assert.equal(resumed.body.data.custom.checked[q.questionId], wrong);

  // Submitting the right option for the locked question still scores the locked (wrong) one.
  const responses = s.questions.map((x) => ({ questionId: x.questionId, selectedOptionId: key[x.questionId].right }));
  const sub = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  assert.equal(sub.body.data.counts.correct, 4);
  assert.equal(sub.body.data.counts.incorrect, 1);
  assert.equal((await api('POST', `/custom-tests/${s.sessionId}/check`, { questionId: q.questionId, selectedOptionId: wrong }, user)).status, 409);
});

test('weak-topic preset needs answers first, then picks the weak chapters', async () => {
  const user = 'weakling';
  const none = await api('POST', '/custom-tests', { subject: 'quant', preset: 'weak' }, user);
  assert.equal(none.body.error.code, 'NO_WEAK_TOPICS');
  assert.equal((await api('POST', '/custom-tests', { subject: 'quant', preset: 'mistakes' }, user)).body.error.code, 'NO_MISTAKES');

  // 10 ratio questions, all wrong -> ratio_proportion is weak.
  const t = (await api('POST', '/custom-tests', { subject: 'quant', topics: ['ratio_proportion'], questionCount: 10 }, user)).body.data;
  const key = await keyOf(t.sessionId);
  const responses = t.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: q.options.find((o) => o.optionId !== key[q.questionId].right).optionId }));
  assert.equal((await api('POST', '/mock/submit-session', { sessionId: t.sessionId, responses }, user)).status, 200);

  const opts = await api('GET', '/custom-tests/options?subject=quant', null, user);
  assert.deepEqual(opts.body.data.weakTopics, ['ratio_proportion']);
  assert.equal(opts.body.data.chapters.find((c) => c.topic === 'ratio_proportion').accuracyPct, 0);
  assert.equal(opts.body.data.mistakesTotal, 10);

  const weak = await api('POST', '/custom-tests', { subject: 'quant', preset: 'weak', questionCount: 10 }, user);
  assert.equal(weak.status, 201, JSON.stringify(weak.body));
  assert.deepEqual(weak.body.data.custom.topics, ['ratio_proportion']);
});

test('custom tests are not peers of standard mocks', async () => {
  // Several 10-question custom tests were submitted above; a standard 10-question mock must not count them.
  assert.ok((await MockSession.countDocuments({ status: 'SUBMITTED', 'config.question_count': 10, 'custom.mode': { $exists: true } })) >= 2);
  const user = 'standard_mock';
  const s = (await api('POST', '/mock/create-session', { category: 'WBPSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10 }, user)).body.data;
  const responses = s.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: null }));
  assert.equal((await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user)).status, 200);
  const an = await api('GET', `/mock/session/${s.sessionId}/analytics`, null, user);
  assert.equal(an.status, 200, JSON.stringify(an.body));
  assert.equal(an.body.data.peers.peers, 0);
  assert.equal(an.body.data.result.custom, null);
});
