'use strict';

/**
 * Math Hard Quiz, Speed Challenge and pattern coverage: pure rules (no database).
 * hardQuiz.logic.js and mathCoverage.logic.js.
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const HQ = require('../src/services/hardQuiz.logic');
const C = require('../src/services/mathCoverage.logic');
const L = require('../src/services/customTest.logic');

const signals = (extra = {}) => ({
  seen: new Set(), recent: new Set(), mistakeQids: new Set(), skipQids: new Set(),
  mistakePatterns: new Set(), mistakeSubtopics: new Set(), weakPatterns: new Set(), masteredPatterns: new Set(), ...extra,
});
/** Fixed rng so picks are reproducible. */
function rngOf(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

let id = 0;
const q = (topic, pattern, difficulty, extra = {}) => ({ _id: `q${++id}`, topic, pattern, difficulty, duplicate_keys: [`k${id}`], ...extra });

/* ------------------------------------------------------------------ skills */

test('skill index: every Hard matrix pattern and the Profit & Loss registry are indexed', () => {
  const idx = HQ.skillIndex();
  assert.ok(idx.size >= 60, `indexed ${idx.size}`);
  // pct_three_step_net has skills multi_step + trap in the matrix.
  assert.deepEqual([...idx.get('percentage.pct_three_step_net')].sort(), ['mixed', 'trap']);
  // P&L registry: reverse_* concept -> reverse.
  assert.ok(idx.get('profit_loss.same_sp_rates').has('reverse'));
  assert.ok(idx.get('profit_loss.false_weight_discount').has('trap'));
});

test('categories: matrix skills, real PYQ, challenge level; standard only without a special skill', () => {
  assert.deepEqual([...HQ.categoriesOf(q('percentage', 'pct_three_step_net', 3))].sort(), ['mixed', 'trap']);
  assert.deepEqual([...HQ.categoriesOf(q('percentage', 'percent_of_number', 3))], ['standard']);
  assert.deepEqual([...HQ.categoriesOf(q('percentage', 'percent_of_number', 5, { realPyq: true }))].sort(), ['challenge', 'pyq', 'standard']);
  assert.deepEqual([...HQ.categoriesOf(q('percentage', 'percent_of_number', 2))], [], 'an easy question is no Hard category');
});

/* ------------------------------------------------------------------ tiers */

test('tier from the chapter level: weak -> foundation, Hard next -> strong, Challenge next -> very strong', () => {
  assert.equal(HQ.tierOf({ status: 'weak', level: { next: 'moderate' } }), 'foundation');
  assert.equal(HQ.tierOf({ status: 'learning', level: { next: 'easy' } }), 'foundation');
  assert.equal(HQ.tierOf({ status: 'learning', level: { next: 'moderate', action: 'review_concept' } }), 'foundation');
  assert.equal(HQ.tierOf({ status: 'learning', level: { next: 'moderate' } }), 'developing');
  assert.equal(HQ.tierOf({ status: 'learning', level: { next: 'assess' } }), 'developing');
  assert.equal(HQ.tierOf({ status: 'strong', level: { next: 'hard' } }), 'strong');
  assert.equal(HQ.tierOf({ status: 'strong', level: { next: 'challenge' } }), 'very_strong');
  assert.equal(HQ.tierOf(undefined), 'developing');
});

/* ------------------------------------------------------------------ picking */

/** A chapter with every category: 6 patterns x levels 1-5 x 4 questions. */
function percentagePool() {
  const patterns = ['pct_three_step_net', 'pct_reverse_successive', 'pct_election', 'pct_comparison_chain', 'percent_of_number', 'more_than_less_than'];
  const out = [];
  for (const p of patterns) for (let d = 1; d <= 5; d++) for (let i = 0; i < 4; i++) out.push(q('percentage', p, d, { realPyq: p === 'percent_of_number' && d === 4 && i === 0 }));
  return out;
}

test('Hard Quiz (strong): 10 questions, all within moderate-challenge, every skill slot filled, varied patterns', () => {
  const r = HQ.pickHard(percentagePool(), 10, { tier: 'strong', signals: signals(), rng: rngOf() });
  assert.equal(r.picked.length, 10);
  assert.ok(r.picked.every((x) => x.difficulty >= 3), r.picked.map((x) => x.difficulty).join());
  assert.equal(new Set(r.picked.map((x) => x._id)).size, 10, 'no repeats');
  assert.deepEqual(r.short, []);
  assert.equal(r.slots.reverse, 2);
  assert.equal(r.slots.mixed, 2);
  assert.equal(r.slots.trap, 1);
  assert.equal(r.slots.challenge, 1);
  assert.equal(r.slots.pyq, 1);
  const perPattern = {};
  for (const x of r.picked) perPattern[x.pattern] = (perPattern[x.pattern] || 0) + 1;
  assert.ok(Math.max(...Object.values(perPattern)) <= 4, JSON.stringify(perPattern));
  assert.ok(Object.keys(perPattern).length >= 4, 'at least 4 patterns');
});

test('Hard Quiz (foundation): a weak chapter gets basic/easy/moderate only, never a Hard set', () => {
  const r = HQ.pickHard(percentagePool(), 10, { tier: 'foundation', signals: signals(), rng: rngOf(3) });
  assert.equal(r.picked.length, 10);
  assert.ok(r.picked.every((x) => x.difficulty <= 3), r.picked.map((x) => x.difficulty).join());
  assert.deepEqual(r.slots, {});
});

test('Hard Quiz (very strong): hard and challenge only', () => {
  const r = HQ.pickHard(percentagePool(), 10, { tier: 'very_strong', signals: signals(), rng: rngOf(5) });
  assert.ok(r.picked.every((x) => x.difficulty >= 4), r.picked.map((x) => x.difficulty).join());
});

test('Hard Quiz: a chapter without skill tags still fills the quiz from its level mix and reports the short slots', () => {
  const pool = [];
  for (let d = 1; d <= 5; d++) for (let i = 0; i < 6; i++) pool.push(q('mensuration', `m_p${i % 3}`, d));
  const r = HQ.pickHard(pool, 10, { tier: 'strong', signals: signals(), rng: rngOf(11) });
  assert.equal(r.picked.length, 10);
  assert.ok(r.short.includes('reverse') && r.short.includes('trap'));
  assert.ok(r.slots.level_fill >= 1);
});

test('Hard Quiz: prefers a different pattern one level easier over repeating one pattern', () => {
  // Level 4-5 has only one pattern; level 3 has others.
  const pool = [];
  for (let i = 0; i < 12; i++) pool.push(q('time_speed_distance', 'tsd_one', 4));
  for (const p of ['tsd_a', 'tsd_b', 'tsd_c']) for (let i = 0; i < 4; i++) pool.push(q('time_speed_distance', p, 3));
  const r = HQ.pickHard(pool, 10, { tier: 'very_strong', signals: signals(), rng: rngOf(13) });
  assert.equal(r.picked.length, 10);
  assert.ok(r.picked.filter((x) => x.pattern === 'tsd_one').length <= 4, 'pattern cap kept while other patterns exist');
});

test('Hard Quiz: exact earlier mistakes are not served (they have their own preset)', () => {
  const pool = percentagePool();
  const mistakes = new Set(pool.filter((x) => x.difficulty >= 3).slice(0, 40).map((x) => x._id));
  const r = HQ.pickHard(pool, 10, { tier: 'strong', signals: signals({ mistakeQids: mistakes }), rng: rngOf(17) });
  assert.ok(r.picked.every((x) => !mistakes.has(x._id)));
});

/* ------------------------------------------------------------------ rotation */

test('mastered pattern: 5+ right of the latest 8, on 2+ days, 80%+ accuracy', () => {
  const day = (d) => new Date(Date.UTC(2026, 10, d));
  const a = (pattern, correct, d) => ({ topic: 'percentage', pattern, correct, at: day(d) });
  const answers = [
    ...[1, 1, 2, 2, 3].map((d) => a('succ', true, d)), // 5 right, 3 days -> mastered
    ...[1, 1, 1, 1, 1].map((d) => a('one_day', true, d)), // all on one day -> not yet
    ...[1, 2, 3, 4, 5].map((d) => a('mixed', true, d)), a('mixed', false, 6), a('mixed', false, 7), // 5/7 = 71% -> no
  ];
  const m = HQ.masteredPatterns(answers);
  assert.ok(m.has('percentage.succ'));
  assert.ok(!m.has('percentage.one_day'));
  assert.ok(!m.has('percentage.mixed'));
});

test('rotation: a mastered pattern is down-weighted in scoring, but not in Retry my mistakes', () => {
  const s = signals({ masteredPatterns: new Set(['percentage.succ']) });
  const x = { _id: 'x', topic: 'percentage', pattern: 'succ', difficulty: 3 };
  const y = { _id: 'y', topic: 'percentage', pattern: 'other', difficulty: 3 };
  const wx = L.scoreCandidate(x, s, { preset: 'hard', pyqBoost: 1 }).w;
  const wy = L.scoreCandidate(y, s, { preset: 'hard', pyqBoost: 1 }).w;
  assert.ok(wx < wy * 0.5, `${wx} vs ${wy}`);
  assert.equal(L.scoreCandidate(x, s, { preset: 'mistakes', pyqBoost: 1 }).w, wy);
});

/* ------------------------------------------------------------------ labels */

test('practice type: real PYQ, PYQ-pattern practice, then by difficulty; never a PYQ claim for originals', () => {
  const pyqPatterns = new Set(['percentage.pct_election']);
  assert.equal(HQ.practiceTypeFor(q('percentage', 'pct_election', 4, { realPyq: true }), pyqPatterns), 'pyq');
  assert.equal(HQ.practiceTypeFor(q('percentage', 'pct_election', 4), pyqPatterns), 'pyq_pattern');
  assert.equal(HQ.practiceTypeFor(q('percentage', 'other', 5), pyqPatterns), 'challenge');
  assert.equal(HQ.practiceTypeFor(q('percentage', 'other', 3), pyqPatterns), 'exam_pattern');
  assert.equal(HQ.practiceTypeFor(q('percentage', 'other', 1), pyqPatterns), 'learning');
});

/* ------------------------------------------------------------------ result analysis */

test('skill report: a question counts in each of its categories; strong / ok / weak', () => {
  const rows = [
    { cats: new Set(['reverse', 'trap']), correct: true },
    { cats: new Set(['reverse']), correct: true },
    { cats: new Set(['trap']), correct: false },
    { cats: new Set(['trap']), correct: false },
    { cats: new Set(['standard']), correct: true },
  ];
  const r = Object.fromEntries(HQ.skillReport(rows).map((s) => [s.skill, s]));
  assert.deepEqual([r.reverse.correct, r.reverse.total, r.reverse.status], [2, 2, 'strong']);
  assert.deepEqual([r.trap.correct, r.trap.total, r.trap.status], [1, 3, 'weak']);
  assert.deepEqual(HQ.skillReport(rows).map((s) => s.skill), ['standard', 'reverse', 'trap'], 'listed in SKILLS order');
});

test('next step: foundation, concept review, harder mix, new pattern, more moderate', () => {
  const ch = (topic, accuracy, total = 5) => ({ topic, accuracy, total });
  assert.equal(HQ.nextStep({ accuracy: 70, chapters: [ch('a', 30)] }).action, 'foundation');
  assert.equal(HQ.nextStep({ accuracy: 90, chapters: [ch('a', 90)], foundationTopics: ['b'] }).action, 'foundation');
  assert.equal(HQ.nextStep({ accuracy: 60, chapters: [ch('a', 60)], repeatedPattern: { topic: 'a', pattern: 'p' } }).action, 'review_concept');
  assert.equal(HQ.nextStep({ accuracy: 85, preset: 'hard', chapters: [ch('a', 85)] }).action, 'harder_mix');
  assert.equal(HQ.nextStep({ accuracy: 85, preset: 'custom', chapters: [ch('a', 85)] }).action, 'new_pattern');
  assert.equal(HQ.nextStep({ accuracy: 65, chapters: [ch('a', 65)] }).action, 'more_moderate');
});

test('speed report: completed, skipped, average time, rushed mistakes', () => {
  // 10 questions in 10 min = 60 s planned; rushed = wrong in under 24 s.
  const p = (outcome, t) => ({ outcome, time_spent_sec: t });
  const rows = [p('CORRECT', 50), p('CORRECT', 40), p('INCORRECT', 10), p('INCORRECT', 70), p('CORRECT', 30), p('UNATTEMPTED', 0), p('CORRECT', 60), p('INCORRECT', 20), p('CORRECT', 40), p('TIMED_OUT', 0)];
  const s = HQ.speedReport(rows, 10);
  assert.equal(s.questions, 10);
  assert.equal(s.completed, 8);
  assert.equal(s.skipped, 2);
  assert.equal(s.accuracy, 63); // 5 / 8
  assert.equal(s.plannedSecPerQuestion, 60);
  assert.equal(s.avgSecPerQuestion, 40); // (50+40+10+70+30+60+20+40)/8
  assert.equal(s.rushedMistakes, 2);
});

/* ------------------------------------------------------------------ coverage */

test('template: same question with new numbers and names is one template', () => {
  assert.equal(C.templateOf('Ram sells 12 pens for ₹30. Find the profit.'), C.templateOf('Sita sells 8 pens for ₹1,250.50. Find the profit.'));
  assert.notEqual(C.templateOf('Find 20% of 500.'), C.templateOf('500 is what percent of 2000?'));
});

test('coverage: many questions in few shapes is poor even with a big count', () => {
  const qs = [];
  for (let i = 0; i < 300; i++) qs.push({ pattern: 'basic', difficulty: 2, stem: `Pipe A fills a tank in ${i + 2} hours. Find the time.` });
  const row = C.coverageRow({ topic: 'pipes_cistern', questions: qs, libraryPatterns: ['basic', 'leak', 'alternate'], hardPatterns: [] });
  assert.equal(row.templates, 1);
  assert.equal(row.status, 'poor');
  assert.ok(row.flags.includes('many_questions_few_patterns'));
  assert.ok(row.flags.includes('one_template_dominates'));
  assert.ok(row.flags.includes('no_hard_questions'));
  assert.deepEqual(row.missingPatterns, ['leak', 'alternate']);
  assert.equal(row.patternsCovered, 1);
});

test('coverage: a varied chapter with all levels and most patterns is good', () => {
  const qs = [];
  const lib = Array.from({ length: 10 }, (_, i) => `p${i}`);
  for (let i = 0; i < 100; i++) qs.push({ pattern: lib[i % 10], difficulty: (i % 5) + 1, stem: `shape ${'abcdefghijklmnopqrstuvwxyz'[i % 26]}${'xyz'[i % 3]} question` }); // 78 word shapes, no digits
  const row = C.coverageRow({ topic: 'percentage', questions: qs, libraryPatterns: lib, hardPatterns: ['h1'] });
  assert.equal(row.coveragePct, 91); // 10 of 11
  assert.equal(row.status, 'good', JSON.stringify(row));
  assert.deepEqual(row.missingLevels, []);
});

test('coverage rows sort worst first', () => {
  const rows = C.sortRows([{ status: 'good', questions: 5 }, { status: 'poor', questions: 1 }, { status: 'needs_more', questions: 9 }, { status: 'poor', questions: 7 }]);
  assert.deepEqual(rows.map((r) => [r.status, r.questions]), [['poor', 7], ['poor', 1], ['needs_more', 9], ['good', 5]]);
});
