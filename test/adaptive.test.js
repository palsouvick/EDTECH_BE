'use strict';

/** Adaptive practice: per-chapter level, promotion/demotion window, session plan, next actions (adaptive.logic.js). */

const test = require('node:test');
const assert = require('node:assert/strict');
const AD = require('../src/services/adaptive.logic');
const L = require('../src/services/customTest.logic');

const NOW = new Date('2026-11-20T12:00:00Z');
const DAY = 86_400_000;

/**
 * n answers, newest first, at one difficulty, with `rightPct` of them right (spread evenly), over `days` days.
 * `subtopic` (optional) on every answer.
 */
function answers(n, { difficulty = 3, rightPct = 50, days = 3, subtopic = null } = {}) {
  const right = Math.round((n * rightPct) / 100);
  return Array.from({ length: n }, (_, i) => ({
    qid: `q${i}`,
    correct: Math.floor(((i + 1) * right) / n) > Math.floor((i * right) / n),
    difficulty,
    at: new Date(NOW.getTime() - (i % days) * DAY - i * 60_000),
    subtopic,
  }));
}

test('scenario 1 — weak student (35%): Basic questions, back to concept practice', () => {
  const lv = AD.chapterLevel(answers(12, { difficulty: 3, rightPct: 35 }), { stage: 'practising' });
  assert.equal(lv.status, 'weak');
  assert.equal(lv.next, 'basic');
  assert.equal(lv.action, 'reset');
  assert.deepEqual(lv.mix, { 1: 0.7, 2: 0.3 });
});

test('scenario 2 — developing student (65% at Moderate): stays Moderate', () => {
  const lv = AD.chapterLevel(answers(14, { difficulty: 3, rightPct: 65 }), { stage: 'developing' });
  assert.equal(lv.status, 'developing');
  assert.equal(lv.current, 'moderate');
  assert.equal(lv.next, 'moderate');
  assert.equal(lv.action, 'hold');
  assert.deepEqual(lv.mix, { 2: 0.2, 3: 0.6, 4: 0.2 });
});

test('scenario 3 — strong student (90%): Hard, and from Hard to Exam Challenge', () => {
  const moderate = AD.chapterLevel(answers(12, { difficulty: 3, rightPct: 90 }), { stage: 'strong' });
  assert.equal(moderate.status, 'strong');
  assert.equal(moderate.next, 'hard');
  assert.equal(moderate.action, 'up');
  const hard = AD.chapterLevel(answers(12, { difficulty: 4, rightPct: 92 }), { stage: 'mastered' });
  assert.equal(hard.next, 'challenge');
  assert.ok(hard.pyqBoost >= 3, 'strong students get PYQ-level questions');
});

test('scenario 4 — strong overall, weak chapter: the weak chapter gets Basic, not Hard Mathematics', () => {
  const chapters = {
    percentage: AD.chapterLevel(answers(15, { difficulty: 4, rightPct: 90 }), { stage: 'strong' }),
    average: AD.chapterLevel(answers(15, { difficulty: 4, rightPct: 85 }), { stage: 'strong' }),
    time_work: AD.chapterLevel(answers(15, { difficulty: 3, rightPct: 35 }), { stage: 'practising' }),
  };
  assert.equal(chapters.time_work.next, 'basic');
  assert.equal(chapters.percentage.next, 'challenge');
  assert.notEqual(chapters.time_work.next, chapters.percentage.next, 'difficulty is per chapter, never one level for the subject');
});

test('scenario 5 — weak overall, strong chapter: the strong chapter gets Hard', () => {
  const pct = AD.chapterLevel(answers(12, { difficulty: 3, rightPct: 90 }), { stage: 'strong' });
  const others = AD.chapterLevel(answers(20, { difficulty: 2, rightPct: 30 }), { stage: 'practising' });
  assert.equal(pct.next, 'hard');
  assert.equal(others.next, 'basic');
});

test('scenario 6 — insufficient data (2 answers): assessment, never Strong or Weak', () => {
  const lv = AD.chapterLevel(answers(2, { difficulty: 3, rightPct: 100 }), { stage: 'learning' });
  assert.equal(lv.status, 'insufficient');
  assert.equal(lv.action, 'assess');
  assert.equal(lv.current, null);
  assert.deepEqual(lv.mix, { 1: 0.4, 2: 0.4, 3: 0.2 });
});

test('no promotion from one good answer, no demotion from one mistake (rolling window)', () => {
  // 7 right at Moderate on 2 days: one short of the 8-answer window → stays.
  assert.equal(AD.chapterLevel(answers(7, { difficulty: 3, rightPct: 100 }), { stage: 'developing' }).action, 'hold');
  // Same, but on a single day → stays (promotion needs 2+ days).
  assert.equal(AD.chapterLevel(answers(10, { difficulty: 3, rightPct: 100, days: 1 }), { stage: 'developing' }).action, 'hold');
  // One mistake among 10 at Hard → no demotion.
  const one = answers(10, { difficulty: 4, rightPct: 100 });
  one[0].correct = false;
  assert.notEqual(AD.chapterLevel(one, { stage: 'strong' }).action, 'down');
  // 3 of the last 8 right at Hard (37.5%), 5 of the last 10 (50%, not a reset) → one level down, not straight to Basic.
  const mixed = answers(10, { difficulty: 4 });
  [false, true, false, true, false, false, true, false, true, true].forEach((ok, i) => { mixed[i].correct = ok; });
  const down = AD.chapterLevel(mixed, { stage: 'developing' });
  assert.equal(down.action, 'down');
  assert.equal(down.next, 'moderate');
});

test('a concept wrong 3+ times: review the concept, no promotion until fixed', () => {
  const list = answers(12, { difficulty: 3, rightPct: 90, subtopic: 'other' });
  for (const i of [0, 2, 4]) Object.assign(list[i], { subtopic: 'successive_change', correct: false });
  list[6].subtopic = 'successive_change';
  const lv = AD.chapterLevel(list, { stage: 'developing', nameOf: (k) => ({ en: k }) });
  assert.equal(lv.action, 'review_concept');
  assert.equal(lv.concept.key, 'successive_change');
  assert.equal(lv.concept.wrong, 3);
  assert.notEqual(lv.next, 'hard', 'no promotion while a concept keeps going wrong');
});

test('a thin level in the bank is reported with the nearest level that has questions', () => {
  const lv = AD.chapterLevel(answers(12, { difficulty: 3, rightPct: 35 }), { stage: 'practising', bank: { 1: 0, 2: 40, 3: 200 } });
  assert.equal(lv.next, 'basic');
  assert.equal(lv.thin, true);
  assert.equal(lv.nearest, 'easy');
});

test('status comes from the one mastery stage', () => {
  assert.equal(AD.statusOf('mastered', 40), 'strong');
  assert.equal(AD.statusOf('developing', 20), 'developing');
  assert.equal(AD.statusOf('practising', 20), 'weak');
  assert.equal(AD.statusOf('strong', 3), 'insufficient', 'never Strong on 3 answers');
});

test('picker in levels mode follows the per-difficulty mix and borrows from the nearest level', () => {
  const qs = [];
  for (const d of [1, 2, 3, 4, 5]) for (let i = 0; i < 20; i += 1) qs.push({ _id: `${d}-${i}`, topic: 't', difficulty: d, duplicate_keys: [] });
  const signals = { seen: new Set(), recent: new Set(), mistakeQids: new Set(), mistakePatterns: new Set(), mistakeSubtopics: new Set(), weakPatterns: new Set() };
  const basic = L.pickChapter(qs, 10, { mix: AD.mixFor('basic'), signals, preset: 'adaptive', levels: true });
  assert.deepEqual(basic.picked.map((q) => q.difficulty).sort(), [1, 1, 1, 1, 1, 1, 1, 2, 2, 2]);
  const hardOnly = qs.filter((q) => q.difficulty !== 4); // the bank has no level-4 questions
  const hard = L.pickChapter(hardOnly, 10, { mix: AD.mixFor('hard'), signals, preset: 'adaptive', levels: true });
  assert.equal(hard.picked.length, 10);
  assert.ok(hard.picked.every((q) => q.difficulty >= 3), 'a missing Hard level borrows upwards first, never Basic');
});

const ch = (topic, status, next, extra = {}) => ({
  topic, status, title: { en: topic }, mastery: extra.mastery ?? 50, available: 100, openMistakes: 0, revisionDue: false, daysSinceTouched: 3,
  focus: { score: extra.score ?? 40, band: 'medium' }, level: { current: next, next, action: 'hold', concept: null }, started: true, ...extra,
});

test('session plan of 10: 5 weak focus, 2 previously wrong, 2 strong challenge, 1 revision — each at its own level', () => {
  const plan = AD.sessionPlan([
    ch('time_work', 'weak', 'basic', { score: 80 }),
    ch('profit_loss', 'developing', 'moderate', { score: 55, openMistakes: 4 }),
    ch('percentage', 'strong', 'challenge', { score: 10 }),
    ch('average', 'strong', 'hard', { score: 8, revisionDue: true, daysSinceTouched: 20 }),
  ], 10);
  const by = (role) => plan.filter((p) => p.role === role).reduce((a, p) => a + p.count, 0);
  assert.equal(plan.reduce((a, p) => a + p.count, 0), 10);
  assert.equal(by('focus'), 5);
  assert.equal(by('mistakes'), 2);
  assert.equal(by('challenge'), 2);
  assert.equal(by('retention'), 1);
  assert.equal(plan.find((p) => p.topic === 'time_work').level, 'basic');
  assert.equal(plan.find((p) => p.role === 'challenge').topic, 'percentage');
});

test('session plan: a role with nothing to offer passes its questions to focus; one chapter = all at its level', () => {
  const plan = AD.sessionPlan([ch('time_work', 'weak', 'basic', { score: 80 }), ch('ratio', 'developing', 'moderate', { score: 50 })], 10);
  assert.equal(plan.reduce((a, p) => a + p.count, 0), 10);
  assert.ok(plan.every((p) => p.role === 'focus'));
  const one = AD.sessionPlan([ch('percentage', 'strong', 'hard')], 5, { topics: ['percentage'] });
  assert.deepEqual(one, [{ topic: 'percentage', count: 5, role: 'focus', level: 'hard' }]);
});

test('next actions: exam priority + weakness first, one strong chapter as a challenge; strong topics are not over-practised', () => {
  const actions = AD.nextActions([
    ch('percentage', 'strong', 'challenge', { score: 5, mastery: 93 }),
    ch('mixture', 'weak', 'basic', { score: 30, priority: 'ADDITIONAL' }),
    ch('hcf_lcm', 'weak', 'basic', { score: 70, priority: 'MUST' }),
    ch('time_work', 'developing', 'moderate', { score: 50 }),
  ]);
  assert.deepEqual(actions.map((a) => a.topic), ['hcf_lcm', 'time_work', 'percentage']);
  assert.deepEqual(actions.map((a) => a.kind), ['basic', 'moderate', 'challenge']);
  assert.equal(AD.nextActions([ch('percentage', 'strong', 'hard', { revisionDue: true })])[0].kind, 'revise', 'strong + due = spaced revision, not more practice');
});

test('continue studying: learn first when the concept is missing, then revision when much is due, else practice', () => {
  const weakNoLesson = AD.nextActions([ch('time_work', 'weak', 'basic', { hasLesson: true, readingPct: 10, subject: 'quant' })]);
  assert.equal(AD.continueStep(weakNoLesson).kind, 'learn');
  const weakRead = AD.nextActions([ch('time_work', 'weak', 'basic', { hasLesson: true, readingPct: 90, subject: 'quant' })]);
  assert.equal(AD.continueStep(weakRead, { revisionDue: 20 }).kind, 'revision');
  assert.deepEqual(AD.continueStep(weakRead, { revisionDue: 2 }), { kind: 'practice', subject: 'quant', topic: 'time_work', title: { en: 'time_work' }, practice: 'basic', level: 'basic' });
});

test('practice type labels: real PYQ, challenge, exam pattern, learning', () => {
  assert.equal(AD.practiceTypeOf({ realPyq: true, difficulty: 2 }), 'pyq');
  assert.equal(AD.practiceTypeOf({ difficulty: 5 }), 'challenge');
  assert.equal(AD.practiceTypeOf({ difficulty: 3 }), 'exam_pattern');
  assert.equal(AD.practiceTypeOf({ difficulty: 1 }), 'learning');
});

test('week change and insights come only from the data', () => {
  const list = [...answers(10, { rightPct: 80, days: 3 }), ...answers(10, { rightPct: 50, days: 3 }).map((a) => ({ ...a, at: new Date(a.at.getTime() - 8 * DAY) }))];
  const w = AD.weekChange(list, NOW);
  assert.equal(w.answers, 10);
  assert.equal(w.accuracy, 80);
  assert.equal(w.accuracyDelta, 30);
  assert.equal(w.wrongDelta, -3);
  assert.deepEqual(AD.insights([]), [], 'no data, no insight');
  const cards = AD.insights([{ ...ch('percentage', 'developing', 'moderate'), trend: { direction: 'up', previousAccuracy: 62, recentAccuracy: 81 } }]);
  assert.deepEqual(cards[0], { kind: 'progress', subject: undefined, topic: 'percentage', title: { en: 'percentage' }, from: 62, to: 81 });
});
