'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { scoreSession } = require('../src/services/scoring');
const { allocateQuotas, selectWithBackfill } = require('../src/services/mockGenerator.pipeline');
const { langSetsContaining, langSetKey } = require('../src/models/schemas/localized');

const q = (n, topic, difficulty) => ({ qid: `q${n}`.padEnd(24, '0'), seq: n, topic, difficulty });

test('allocateQuotas follows 30/50/20 and always sums to n', () => {
  assert.deepEqual(allocateQuotas(10), { EASY: 3, MEDIUM: 5, HARD: 2 });
  assert.deepEqual(allocateQuotas(20), { EASY: 6, MEDIUM: 10, HARD: 4 });
  assert.deepEqual(allocateQuotas(50), { EASY: 15, MEDIUM: 25, HARD: 10 });
  for (let n = 1; n <= 60; n++) {
    const s = allocateQuotas(n);
    assert.equal(s.EASY + s.MEDIUM + s.HARD, n);
  }
});

test('selectWithBackfill borrows from the nearest band when one is short', () => {
  const mk = (d, k) => Array.from({ length: k }, (_, i) => ({ _id: `${d}-${i}`, difficulty: d }));
  const { picked, mix } = selectWithBackfill(
    { EASY: mk(1, 10), MEDIUM: mk(3, 10), HARD: mk(5, 1) },
    { EASY: 3, MEDIUM: 5, HARD: 2 },
  );
  assert.equal(picked.length, 10);
  assert.deepEqual(mix, { EASY: 3, MEDIUM: 6, HARD: 1 });
  assert.equal(new Set(picked.map((p) => p._id)).size, 10);
});

test('lang_set helpers', () => {
  assert.equal(langSetKey(['en', 'bn']), 'bn_en');
  assert.deepEqual(langSetsContaining('bn').sort(), ['bn', 'bn_en', 'bn_en_hi', 'bn_hi']);
  assert.equal(langSetsContaining('hi').length, 4);
});

test('scoreSession: marks, negative marking, accuracy, strengths/weaknesses', () => {
  const questions = [
    q(1, 'profit_loss', 1), q(2, 'profit_loss', 3), q(3, 'profit_loss', 4),
    q(4, 'percentage', 2), q(5, 'percentage', 3), q(6, 'percentage', 5),
  ];
  const answerKey = Object.fromEntries(questions.map((x) => [x.qid, 'opt_aaaa']));
  const r = (n, sel, t) => ({ questionId: questions[n - 1].qid, selectedOptionId: sel, timeSpentSec: t });

  const res = scoreSession({
    questions,
    answerKey,
    responses: [
      r(1, 'opt_aaaa', 30), r(2, 'opt_aaaa', 40), r(3, 'opt_aaaa', 50), // P&L 3/3
      r(4, 'opt_bbbb', 20), r(5, 'opt_bbbb', 20), // percentage 0/2, Q6 skipped
    ],
    marking: { positive: 2, negative: 0.5 },
    perQuestionLimitSec: null,
    timeBudgetSec: 600,
  });

  assert.equal(res.correct, 3);
  assert.equal(res.incorrect, 2);
  assert.equal(res.unattempted, 1);
  assert.equal(res.negative_marks, 1);
  assert.equal(res.score, 5); // 3*2 - 2*0.5
  assert.equal(res.max_score, 12);
  assert.equal(res.accuracy_pct, 60);
  assert.equal(res.total_time_sec, 160);
  assert.deepEqual(res.strengths.map((s) => s.topic), ['profit_loss']);
  assert.deepEqual(res.weaknesses.map((s) => [s.topic, s.reason]), [['percentage', 'LOW_ACCURACY']]);
});

test('scoreSession: per-question timer and inflated client times', () => {
  const questions = [q(1, 't', 3), q(2, 't', 3)];
  const answerKey = { [questions[0].qid]: 'opt_aaaa', [questions[1].qid]: 'opt_aaaa' };
  const res = scoreSession({
    questions,
    answerKey,
    responses: [
      { questionId: questions[0].qid, selectedOptionId: 'opt_aaaa', timeSpentSec: 95 }, // over 60s limit
      { questionId: questions[1].qid, selectedOptionId: 'opt_aaaa', timeSpentSec: 30 },
    ],
    marking: { positive: 1, negative: 0.25 },
    perQuestionLimitSec: 60,
    timeBudgetSec: 45, // client claims 90s (after capping) but only ~45s really elapsed
  });
  assert.equal(res.per_question[0].outcome, 'TIMED_OUT');
  assert.equal(res.per_question[0].marks, 0);
  assert.equal(res.score, 1);
  assert.equal(res.time_adjusted, true);
  assert.ok(res.total_time_sec <= 45.01);
});
