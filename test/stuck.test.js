'use strict';

/**
 * Math "I'm Stuck" learning loop: the pure rules (stuck.logic) and the API end to end —
 * a stuck mark is stored next to the answer without touching the score, shows up on
 * My Stuck Problems, and drives a similar-pattern Practice My Weakness quiz with an adaptive level.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const S = require('../src/services/stuck.logic');
const { createApp } = require('../src/app');
const { Question, ExamCategory, MockSession, ReviewItem } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const catalog = require('../db/seed/catalog');
const { mockQuestionAlias } = require('../src/services/signedToken');

/* ------------------------------------------------------------------ pure rules */

const ev = (over = {}) => ({ topic: 'percentage', pattern: 'p1', outcome: 'CORRECT', timeSec: 40, targetSec: 75, stuck: false, stuckReason: null, lossReason: null, skipReason: null, ...over });

test('one stuck question is never a diagnosis; two is "possible"; repeated evidence is "high"', () => {
  const one = [ev({ stuck: true, stuckReason: 'calculation' }), ...Array.from({ length: 9 }, () => ev())];
  assert.equal(S.diagnose(one).find((g) => g.gap === 'calculation'), undefined);

  const two = [ev({ stuck: true, stuckReason: 'calculation' }), ev({ outcome: 'INCORRECT', lossReason: 'calculation' }), ...Array.from({ length: 13 }, () => ev())];
  const possible = S.diagnose(two).find((g) => g.gap === 'calculation');
  assert.equal(possible.confidence, 'possible');
  assert.equal(possible.toConfirm, 3);
  assert.deepEqual(possible.evidence[0], { kind: 'signals', n: 2, of: 15 });

  const many = [
    ...Array.from({ length: 4 }, () => ev({ stuck: true, stuckReason: 'calculation' })),
    ...Array.from({ length: 3 }, () => ev({ outcome: 'INCORRECT', lossReason: 'calculation' })),
    ...Array.from({ length: 8 }, () => ev()),
  ];
  const high = S.diagnose(many).find((g) => g.gap === 'calculation');
  assert.equal(high.confidence, 'high');
  assert.equal(high.count, 7);
  assert.equal(high.of, 15);
  assert.ok(high.evidence.some((e) => e.kind === 'stuck' && e.n === 4));
  assert.equal(high.practice.mode, 'calculation');
});

test('each stuck reason points at its own gap; "other" points at none', () => {
  const gapOf = (reason) => [...S.signalsOf(ev({ stuck: true, stuckReason: reason }))][0] ?? null;
  assert.deepEqual(
    ['concept', 'start', 'method', 'calculation', 'forgot_rule', 'too_slow', 'question_unclear', 'other'].map(gapOf),
    ['knowledge', 'knowledge', 'method', 'calculation', 'recall', 'speed', 'reading', null],
  );
});

test('speed gap from correct answers taking 2x the planned time, with the average factor', () => {
  const rows = [ev({ timeSec: 180 }), ev({ timeSec: 150 }), ev({ timeSec: 165 }), ev({ timeSec: 160 }), ev(), ev(), ev(), ev()];
  const speed = S.diagnose(rows).find((g) => g.gap === 'speed');
  assert.equal(speed.confidence, 'high');
  assert.deepEqual(speed.evidence.find((e) => e.kind === 'slow'), { kind: 'slow', factor: 2.2 });
});

test('BODMAS is diagnosed only from order-of-operations patterns, never from other chapters', () => {
  const bodmas = [ev({ topic: 'simplification', pattern: 'bodmas_order', outcome: 'INCORRECT' }), ev({ topic: 'simplification', pattern: 'nested_brackets', stuck: true })];
  assert.ok(S.diagnose(bodmas).some((g) => g.gap === 'bodmas'));
  const other = [ev({ topic: 'simplification', pattern: 'approximation', outcome: 'INCORRECT' }), ev({ topic: 'percentage', outcome: 'INCORRECT' })];
  assert.ok(!S.diagnose(other).some((g) => g.gap === 'bodmas'));
});

test('accuracy by level: weak basics = knowledge gap; good basics but weak harder questions = skill / multi-step gap', () => {
  const ans = (topic, d, correct, n) => Array.from({ length: n }, () => ({ topic, difficulty: d, correct }));
  const knowledge = S.diagnose([], [...ans('percentage', 1, false, 4), ...ans('percentage', 2, true, 2)]);
  assert.equal(knowledge.find((g) => g.gap === 'knowledge')?.confidence, 'high');

  const applied = [...ans('percentage', 1, true, 8), ...ans('percentage', 3, false, 4), ...ans('percentage', 3, true, 2), ...ans('percentage', 4, false, 5)];
  const gaps = S.diagnose([], applied);
  const skill = gaps.find((g) => g.gap === 'skill');
  assert.ok(skill, JSON.stringify(gaps));
  assert.deepEqual(skill.evidence.find((e) => e.kind === 'levels'), { kind: 'levels', topic: 'percentage', basicPct: 100, appliedPct: 33, level: 'moderate' });
  assert.ok(gaps.find((g) => g.gap === 'multistep'));
  assert.ok(!gaps.find((g) => g.gap === 'knowledge'));
});

test('adaptive level: 4/5 up, 2-3/5 same level, 0-1/5 back to learning, 5/5 at exam level = mastered', () => {
  assert.deepEqual(S.nextLevel('basic', 4, 5), { level: 'moderate', action: 'up' });
  assert.deepEqual(S.nextLevel('moderate', 3, 5), { level: 'moderate', action: 'same' });
  assert.deepEqual(S.nextLevel('moderate', 2, 5), { level: 'moderate', action: 'same' });
  assert.deepEqual(S.nextLevel('exam', 1, 5), { level: 'basic', action: 'revise' });
  assert.deepEqual(S.nextLevel('exam', 0, 5), { level: 'basic', action: 'revise' });
  assert.deepEqual(S.nextLevel('exam', 5, 5), { level: 'exam', action: 'mastered' });
  assert.equal(S.startLevel({ gap: 'knowledge', basic: { n: 10, pct: 95 } }), 'basic');
  assert.equal(S.startLevel({ gap: 'calculation', basic: { n: 10, pct: 90 } }), 'moderate');
  assert.equal(S.startLevel({}), 'basic');
});

test('practice targets: stuck chapters first, counts add up, the level mix is used, reasons filter the mode', () => {
  const targets = [
    { qid: 'a', topic: 'percentage', pattern: 'succ', kind: 'stuck', reason: 'calculation' },
    { qid: 'b', topic: 'percentage', pattern: 'succ', kind: 'wrong' },
    { qid: 'c', topic: 'time_work', pattern: 'eff', kind: 'stuck', reason: 'concept' },
    { qid: 'd', topic: 'ages', pattern: 'x', kind: 'skipped' },
  ];
  const all = S.practiceTargets(targets, { mode: 'pattern', level: 'moderate', count: 10 });
  assert.deepEqual(all.plan.map((p) => p.topic), ['percentage', 'time_work']);
  assert.equal(all.plan.reduce((s, p) => s + p.count, 0), 10);
  assert.deepEqual(all.plan[0].mix, S.LEVEL_MIX.moderate);
  assert.deepEqual(all.qids.sort(), ['a', 'b', 'c', 'd']);
  const concept = S.practiceTargets(targets, { mode: 'concept', level: 'basic', count: 5 });
  assert.deepEqual(concept.plan, [{ topic: 'time_work', count: 5, mix: S.LEVEL_MIX.basic }]);
  assert.deepEqual(concept.patterns, ['time_work.eff']);
});

test('chapter table and improvement', () => {
  const rows = S.chapterTable(
    [{ topic: 'percentage' }, { topic: 'percentage' }, { topic: 'time_work' }],
    [{ topic: 'percentage', correct: false }, { topic: 'percentage', correct: true }, { topic: 'percentage', correct: true }, { topic: 'time_work', correct: false }, { topic: 'ages', correct: false }],
  );
  assert.deepEqual(rows.map((r) => [r.topic, r.stuck, r.wrong, r.accuracy]), [['percentage', 2, 1, 67], ['time_work', 1, 1, null]]);

  const imp = S.improvementOf(
    [{ topics: { percentage: { correct: 2, total: 5 } } }, { topics: { percentage: { correct: 4, total: 5 }, ages: { correct: 3, total: 5 } } }],
    new Map([['ages', 40]]),
  );
  assert.deepEqual(imp, [
    { topic: 'percentage', before: 40, now: 80, change: 40, quizzes: 2 },
    { topic: 'ages', before: 40, now: 60, change: 20, quizzes: 1 },
  ]);
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

const TOPICS = ['percentage', 'profit_loss'];
let n = 0;
function Q(subject, topic, difficulty, pattern) {
  n += 1;
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_${String(n).padStart(5, '0')}${c}`);
  return {
    code: `ST-${n}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty,
    pattern,
    stem: { en: `Stuck test question ${n} on ${topic}`, bn: `প্রশ্ন ${n}` },
    options: ids.map((oid, k) => ({ oid, text: { en: `${n}-${k}`, bn: `${n}-${k}` } })),
    correct_option_id: ids[0],
    solution: { steps: [{ en: `Step for ${n}`, bn: 'ধাপ' }], shortcut: { en: 'Shortcut', bn: 'শর্টকাট' } },
    status: 'PUBLISHED',
  };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('stuck_test'));
  await Promise.all([Question.init(), ExamCategory.init(), MockSession.init(), ReviewItem.init()]);
  await ExamCategory.insertMany(catalog);
  const docs = [];
  for (const topic of TOPICS) for (let i = 0; i < 30; i++) docs.push(Q('quant', topic, (i % 5) + 1, `${topic}_p${i % 3}`));
  for (let i = 0; i < 30; i++) docs.push(Q('english', 'tenses', (i % 5) + 1, 'tense_p'));
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

async function keyOf(sessionId) {
  const doc = await MockSession.findById(sessionId).select('+answer_key').lean();
  return new Map(doc.questions.map((q) => [mockQuestionAlias(sessionId, String(q.qid)), { qid: String(q.qid), right: doc.answer_key[String(q.qid)], topic: q.topic }]));
}

async function createMock(user, subject = 'quant') {
  const res = await api('POST', '/mock/create-session', { category: 'WBPSC', subject, topicIds: subject === 'quant' ? ['percentage'] : [], questionCount: 10, timeLimitMinutes: 20, language: 'en' }, user);
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return res.body.data;
}

const AT = '2026-11-24T10:00:00.000Z';

test('API: a stuck mark is stored next to the answer and never changes the score', async () => {
  const user = 'stuck_scoring';
  const s = await createMock(user);
  const key = await keyOf(s.sessionId);
  const qs = s.questions.map((q) => q.questionId);
  // Q1 stuck then answered right, Q2 stuck then answered wrong, Q3 stuck and left; the rest right.
  const responses = qs.map((id, i) => {
    const k = key.get(id);
    const wrong = s.questions[i].options.find((o) => o.optionId !== k.right).optionId;
    const selectedOptionId = i === 1 ? wrong : i === 2 ? null : k.right;
    return { questionId: id, selectedOptionId, timeSpentSec: 30, ...(i < 3 && { stuck: { reason: ['method', 'calculation', null][i], timeBeforeSec: 20, markedAt: AT } }) };
  });
  const res = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const r = res.body.data;
  // Same marks as with no stuck marks at all: 8 right, 1 wrong, 1 left (official marking).
  assert.equal(r.counts.correct, 8);
  assert.equal(r.counts.incorrect, 1);
  assert.equal(r.counts.unattempted, 1);
  const pq = r.perQuestion.sort((a, b) => a.seq - b.seq);
  assert.deepEqual(pq.slice(0, 3).map((p) => [p.outcome, p.stuck?.reason]), [['CORRECT', 'method'], ['INCORRECT', 'calculation'], ['UNATTEMPTED', null]]);
  assert.equal(pq[3].stuck, null);
  assert.equal(pq[0].stuck.timeBeforeSec, 20);

  const items = await ReviewItem.find({ user_id: user, from_stuck: true }).lean();
  assert.equal(items.length, 3);
  const solved = items.find((i) => String(i.question_id) === key.get(qs[0]).qid);
  assert.equal(solved.wrong_count, 0); // stuck is not a mistake
  assert.equal(solved.from_mistake, false);
  assert.equal(solved.stuck_count, 1);
  assert.equal(solved.last_stuck_reason, 'method');
});

test('API: outside Math a stuck mark is ignored', async () => {
  const user = 'stuck_english';
  const s = await createMock(user, 'english');
  const responses = s.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: null, stuck: { reason: 'concept', timeBeforeSec: 5, markedAt: AT } }));
  const res = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(res.status, 200);
  assert.ok(res.body.data.perQuestion.every((p) => p.stuck === null));
  assert.equal(await ReviewItem.countDocuments({ user_id: user, from_stuck: true }), 0);
});

test('API: My Stuck Problems lists the stuck questions with solution, concept and revision status', async () => {
  const empty = await api('GET', '/me/stuck', null, 'stuck_nobody');
  assert.equal(empty.status, 200);
  assert.equal(empty.body.data.total, 0);
  assert.equal(empty.body.data.next, null);

  const res = await api('GET', '/me/stuck', null, 'stuck_scoring');
  assert.equal(res.status, 200);
  const d = res.body.data;
  assert.equal(d.total, 3);
  assert.equal(d.solvedAfterStuck, 1);
  assert.equal(d.wrongAfterStuck, 1);
  assert.equal(d.leftAfterStuck, 1);
  assert.deepEqual(d.reasons, { method: 1, calculation: 1 });
  assert.equal(d.chapters[0].topic, 'percentage');
  assert.equal(d.chapters[0].stuck, 3);
  const item = d.items.find((i) => i.reason === 'calculation');
  assert.equal(item.outcome, 'INCORRECT');
  assert.ok(item.correctOptionId);
  assert.ok(item.steps.length);
  assert.ok(item.concept?.key);
  assert.equal(item.revision.status, 'due');
  assert.equal(typeof item.similarCount, 'number');
  assert.ok(d.next && d.next.kind === 'practice');

  const sum = await api('GET', '/me/stuck/summary', null, 'stuck_scoring');
  assert.equal(sum.status, 200);
  assert.equal(sum.body.data.total, 3);
  assert.equal(sum.body.data.mostStuck[0].topic, 'percentage');
});

test('API: Practice My Weakness builds new same-pattern questions (never the stuck ones) and adapts the level', async () => {
  const none = await api('POST', '/custom-tests', { subject: 'quant', preset: 'stuck', language: 'en' }, 'stuck_nobody');
  assert.equal(none.status, 422);
  assert.equal(none.body.error.code, 'NO_STUCK_PROBLEMS');
  const notMath = await api('POST', '/custom-tests', { subject: 'english', preset: 'stuck', language: 'en' }, 'stuck_scoring');
  assert.equal(notMath.status, 422);

  const user = 'stuck_scoring';
  const stuckIds = new Set((await ReviewItem.find({ user_id: user, from_stuck: true }).lean()).map((i) => String(i.question_id)));
  const res = await api('POST', '/custom-tests', { subject: 'quant', preset: 'stuck', stuckMode: 'pattern', questionCount: 5, language: 'en' }, user);
  assert.equal(res.status, 201, JSON.stringify(res.body));
  const quiz = res.body.data;
  assert.deepEqual(quiz.custom.stuck, { mode: 'pattern', level: 'basic' });
  assert.equal(quiz.custom.mode, 'practice');
  const doc = await MockSession.findById(quiz.sessionId).select('+answer_key').lean();
  assert.equal(doc.questions.length, 5);
  assert.ok(doc.questions.every((q) => !stuckIds.has(String(q.qid))), 'the stuck questions themselves are not repeated');
  assert.ok(doc.questions.every((q) => q.topic === 'percentage'));
  assert.ok(doc.questions.every((q) => q.difficulty <= 2), 'basic level: difficulty 1-2');

  // 5/5 right -> the next set goes up a level, and the report says so.
  const key = await keyOf(quiz.sessionId);
  const responses = quiz.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: key.get(q.questionId).right, timeSpentSec: 20 }));
  const sub = await api('POST', '/mock/submit-session', { sessionId: quiz.sessionId, responses }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  const rep = await api('GET', `/custom-tests/${quiz.sessionId}/report`, null, user);
  assert.equal(rep.status, 200);
  const sp = rep.body.data.stuckPractice;
  assert.equal(sp.accuracy, 100);
  assert.deepEqual([sp.next.level, sp.next.action], ['moderate', 'up']);

  // The next quiz picks the adaptive level by itself.
  const next = await api('POST', '/custom-tests/preview', { subject: 'quant', preset: 'stuck', questionCount: 5, language: 'en' }, user);
  assert.equal(next.status, 200, JSON.stringify(next.body));
  assert.equal(next.body.data.stuck.level, 'moderate');

  const overview = await api('GET', '/me/stuck', null, user);
  assert.equal(overview.body.data.quizzes.length, 1);
  assert.equal(overview.body.data.improvement[0].topic, 'percentage');
  assert.equal(overview.body.data.improvement[0].now, 100);
});
