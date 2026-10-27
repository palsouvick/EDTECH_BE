'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validatePatterns } = require('../db/patterns/validate');
const patternDoc = require('../db/patterns/quant/profit_loss');
const { generateQuestions, validateQuestion } = require('../scripts/generators/profit_loss_hard');
const { levelPools, selectHardProfitLoss } = require('../src/services/learn.service');

test('Profit & Loss registry defines 15 patterns with valid difficulty and methods', () => {
  assert.equal(patternDoc.registry.length, 15);
  assert.deepEqual(validatePatterns(patternDoc), []);
  assert.equal(new Set(patternDoc.registry.map((pattern) => pattern.id)).size, 15);
  assert.ok(patternDoc.registry.every((pattern) => pattern.concepts.length >= 2 && pattern.generationRule && pattern.solutionMethod));
});

test('every registered generator produces a valid bilingual four-option question', () => {
  const { generators, registry } = require('../scripts/generators/profit_loss_hard');
  for (const [index, pattern] of registry.entries()) {
    require('../scripts/generators/common').seed(17_000 + index);
    const question = generators[pattern.id]();
    assert.ok(question, `${pattern.id} should generate a question`);
    assert.deepEqual(validateQuestion(question), [], pattern.id);
    assert.equal(question.pattern, pattern.id);
    assert.equal(question.difficulty, pattern.difficulty);
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options.map((option) => option.text.en)).size, 4);
    assert.equal(question.options.find((option) => option.oid === question.correct_option_id).text.en, question._audit.answerText);
  }
});

test('100 generated hard questions are unique and cover all 15 patterns', () => {
  const questions = generateQuestions(100, { seed: 20261027 });
  assert.equal(questions.length, 100);
  assert.equal(new Set(questions.map((question) => question.fingerprint)).size, 100);
  assert.equal(new Set(questions.map((question) => question.pattern)).size, 15);
  for (const question of questions) {
    assert.deepEqual(validateQuestion(question), []);
    assert.ok(question.solution.steps.length >= 3);
    assert.ok(question.solution.steps.every((step) => /[ঀ-৿]/u.test(step.bn)));
  }
});

test('the Hard quiz selector enforces its difficulty mix and pattern cap', () => {
  const generated = generateQuestions(100, { seed: 20261029 });
  const pool = generated.map((question, index) => ({
    ...question,
    _id: `question-${index}`,
    duplicate_keys: [question.fingerprint],
  }));
  const selected = selectHardProfitLoss(pool);
  assert.equal(selected.length, 10);
  assert.deepEqual(
    selected.reduce((counts, question) => ((counts[question.difficulty] = (counts[question.difficulty] || 0) + 1), counts), {}),
    { 3: 2, 4: 5, 5: 3 },
  );
  const byPattern = selected.reduce((counts, question) => ((counts[question.pattern] = (counts[question.pattern] || 0) + 1), counts), {});
  assert.ok(Object.keys(byPattern).length >= 7);
  assert.ok(Object.values(byPattern).every((count) => count <= 2));
  assert.equal(new Set(selected.map((question) => question.fingerprint)).size, 10);
});

test('Profit & Loss Hard does not borrow Easy questions when its pool is thin', () => {
  const advanced = levelPools({ 1: 40, 2: 35, 3: 2, 4: 1, 5: 0 }, { subject: 'quant', topic: 'profit_loss' })
    .find((pool) => pool.level === 'advanced');
  assert.deepEqual(advanced.difficulties, [3, 4, 5]);
  assert.equal(advanced.count, 3);
});
