'use strict';

/**
 * Learn section API: subjects -> chapters -> lesson + level quizzes.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { clearLearnCache, levelPools } = require('../src/services/learn.service');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');
const samples = require('../db/seed/pyq-sample-25.json');

let mongod;
let server;
let base;

const call = async (path, body) => {
  const res = await fetch(base + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
  return { status: res.status, body: await res.json() };
};

/** n percentage questions at one difficulty, each with its own stem. */
function percentageQuestions(n, difficulty, tag) {
  const base = convertExamStyleQuestion(samples[0], { index: 0 }).doc;
  return Array.from({ length: n }, (_, i) => ({
    ...base,
    code: `T-${tag}-${i}`,
    difficulty,
    stem: { en: `${tag} question ${i}`, bn: `${tag} প্রশ্ন ${i}` },
  }));
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('learn_test'));
  await Question.init();
  await Question.insertMany([
    ...percentageQuestions(25, 1, 'easy'),
    ...percentageQuestions(5, 3, 'mid'),
    // English only: never served, Bengali is required.
    ...percentageQuestions(3, 1, 'en-only').map((q) => ({ ...q, stem: { en: q.stem.en } })),
  ]);
  clearLearnCache();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1/learn`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('levels borrow easier questions when a level is thin', () => {
  const [beginner, intermediate, advanced] = levelPools({ 1: 25, 3: 5 });
  assert.deepEqual([beginner.count, beginner.timed], [25, false]);
  assert.deepEqual(intermediate.difficulties, [2, 3]);
  assert.deepEqual([advanced.difficulties, advanced.count, advanced.timed, advanced.timeLimitSec], [[3, 4, 5], 5, true, 300]);
});

test('GET /subjects: Math and English', async () => {
  const { status, body } = await call('/subjects');
  assert.equal(status, 200);
  assert.deepEqual(body.data.subjects.map((s) => s.code), ['quant', 'english']);
  assert.equal(body.data.subjects[0].questionCount, 30, 'English-only questions are not counted');
});

test('GET /subjects/:subject lists every chapter with level counts', async () => {
  const { body } = await call('/subjects/quant');
  const pct = body.data.chapters.find((c) => c.topic === 'percentage');
  assert.equal(body.data.chapters.length, 15);
  assert.deepEqual(pct.levels.map((l) => l.count), [25, 5, 5]);
  assert.equal((await call('/subjects/reasoning')).status, 400);
});

test('GET chapter returns the lesson slot and neighbours', async () => {
  const { status, body } = await call('/subjects/quant/chapters/percentage');
  assert.equal(status, 200);
  assert.equal(body.data.title.en, 'Percentage');
  assert.equal(body.data.next.topic, 'profit_loss');
  assert.equal((await call('/subjects/quant/chapters/grammar')).status, 404);
});

test('quiz: 10 bilingual questions without answers; a repeat attempt gets different ones', async () => {
  const first = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'beginner' })).body.data;
  assert.equal(first.questions.length, 10);
  assert.equal(first.timed, false);
  assert.ok(first.questions.every((q) => q.stem.bn && !('correctOptionId' in q)));

  const seen = first.questions.map((q) => q.questionId);
  const second = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'beginner', exclude: seen })).body.data;
  assert.equal(second.restarted, false);
  assert.ok(second.questions.every((q) => !seen.includes(q.questionId)));

  // 20 of 25 seen: 5 fresh ones, then the cycle restarts with no repeats inside the quiz.
  const third = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'beginner', exclude: [...seen, ...second.questions.map((q) => q.questionId)] })).body.data;
  assert.equal(third.restarted, true);
  assert.equal(new Set(third.questions.map((q) => q.questionId)).size, 10);
});

test('advanced quiz is timed', async () => {
  const quiz = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'advanced' })).body.data;
  assert.equal(quiz.questions.length, 5);
  assert.deepEqual([quiz.timed, quiz.timeLimitSec], [true, 300]);
});

test('check: marks every answer and returns explanations, skipped ones count as wrong', async () => {
  const quiz = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'advanced' })).body.data;
  const key = await Question.find({ _id: { $in: quiz.questions.map((q) => q.questionId) } }).select('+correct_option_id').lean();
  const correctOf = Object.fromEntries(key.map((q) => [String(q._id), q.correct_option_id]));
  const answers = quiz.questions.map((q, i) => ({
    questionId: q.questionId,
    selectedOptionId: i === 0 ? null : i === 1 ? q.options.find((o) => o.optionId !== correctOf[q.questionId]).optionId : correctOf[q.questionId],
  }));
  const { status, body } = await call('/quiz/check', { subject: 'quant', topic: 'percentage', answers });
  assert.equal(status, 200);
  assert.deepEqual(body.data.score, { correct: 3, total: 5 });
  assert.equal(body.data.results[0].selectedOptionId, null);
  assert.ok(body.data.results.every((r) => r.correctOptionId && r.steps.length && r.steps[0].bn));
});
