'use strict';

/**
 * Pattern tagging, mastery map, weak patterns, badges, opt-in leaderboard,
 * daily challenge, and the pattern filter on the practice stream.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, PracticeAttempt, User, UserBadge, DailyChallengeResult } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { masteryStatus } = require('../src/services/insights.service');
const { classify, checkRules, loadRules } = require('../src/services/patternTagger');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');
const samples = require('../db/seed/pyq-sample-25.json');

let mongod;
let server;
let base;

async function api(method, url, body, user = 'student_i') {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

const percentage = convertExamStyleQuestion(samples[0], { index: 0 }).doc; // quant.percentage
let succIds = [];
let otherIds = [];

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('insights_test'));
  await Promise.all([Question.init(), PracticeAttempt.init(), UserBadge.init(), DailyChallengeResult.init()]);
  const mk = (i, pattern, difficulty) => ({ ...percentage, code: `T-${pattern}-${i}`, difficulty, pattern, stem: { en: `${pattern} q${i}`, bn: `${pattern} প্রশ্ন ${i}` } });
  const succ = await Question.insertMany(Array.from({ length: 8 }, (_, i) => mk(i, 'successive_change', 3)));
  const other = await Question.insertMany(Array.from({ length: 12 }, (_, i) => mk(i, 'percent_of_number', 2)));
  succIds = succ.map((q) => q._id);
  otherIds = other.map((q) => q._id);
  // Other subjects, for the daily challenge mix.
  await Question.insertMany(samples.slice(10, 25).map((s, i) => convertExamStyleQuestion(s, { index: i }).doc));
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('mastery status from recent answers', () => {
  const a = (correct, difficulty = 2) => ({ correct, difficulty });
  assert.equal(masteryStatus([]), 'not_started');
  assert.equal(masteryStatus([a(true), a(true)]), 'started');
  assert.equal(masteryStatus([...Array(6)].map((_, i) => a(i < 2))), 'weak');
  assert.equal(masteryStatus([...Array(10)].map((_, i) => a(i < 8))), 'strong');
  // Strong accuracy but failing the harder ones: still improving.
  assert.equal(masteryStatus([...Array(8)].map(() => a(true)).concat([a(false, 4), a(false, 4), a(false, 4), a(true, 4)])), 'improving');
});

test('pattern rules: subtopic first, then the stem; every rule key is a real pattern', () => {
  const rules = { successive_change: { subtopics: ['successive_percentage_change'], stem: [/successive/i] }, percent_of_number: { subtopics: ['percentage_of_number'] } };
  assert.equal(classify(rules, { subtopic: 'percentage_of_number', stem: { en: 'successive' } }), 'percent_of_number');
  assert.equal(classify(rules, { stem: { en: 'Two successive discounts' } }), 'successive_change');
  assert.equal(classify(rules, { stem: { en: 'Something else' } }), null);
  assert.deepEqual(checkRules(), []);
});

test('percentage taxonomy subtopics map to existing question patterns', () => {
  const rules = loadRules().quant.percentage;
  const expected = {
    percentage_increase: 'percentage_change',
    percentage_decrease: 'percentage_change',
    population_change: 'percentage_change',
    marks_percentage: 'marks_percentage',
    percentage_comparison: 'more_than_less_than',
    compound_growth: 'population_growth',
    income_expenditure_savings: 'savings_as_percent_income',
    finding_whole_from_percentage: 'find_whole_from_percent',
  };
  for (const [subtopic, pattern] of Object.entries(expected)) {
    assert.equal(classify(rules, { subtopic, stem: { en: '' } }), pattern, subtopic);
  }
});

test('Profit & Loss taxonomy subtopics map to existing question patterns', () => {
  const rules = loadRules().quant.profit_loss;
  const expected = {
    profit_percent: 'profit_loss_percent',
    loss_percent: 'profit_loss_percent',
    find_cost_price: 'find_cp_or_sp',
    marked_price_discount: 'discount_on_marked_price',
    two_articles_same_price: 'profit_loss_percent',
    cp_sp_articles: 'profit_loss_percent',
  };
  for (const [subtopic, pattern] of Object.entries(expected)) {
    assert.equal(classify(rules, { subtopic, stem: { en: '' } }), pattern, subtopic);
  }
});

test('insights: weak pattern inside a good chapter, mastery tile, badges', async () => {
  const now = Date.now();
  const rows = [
    ...otherIds.map((id, i) => ({ question_id: id, correct: true, created_at: new Date(now - i * 1000) })),
    ...succIds.map((id, i) => ({ question_id: id, correct: i < 2, created_at: new Date(now - 20_000 - i * 1000) })),
  ].map((r) => ({ ...r, user_id: 'student_i', subject: 'quant', topic: 'percentage', category: 'SSC' }));
  await PracticeAttempt.insertMany(rows);

  const d = (await api('GET', '/me/insights?tz=330')).body.data;
  const pct = d.mastery.find((m) => m.topic === 'percentage');
  assert.deepEqual([pct.answers, pct.accuracyPct, pct.status, pct.category], [20, 70, 'improving', 'SSC']);
  assert.equal(d.mastery.find((m) => m.topic === 'algebra').status, 'not_started');
  assert.equal(d.counts.improving, 1);

  const weak = d.weakPatterns[0];
  assert.deepEqual([weak.pattern, weak.accuracyPct, weak.chapterAccuracyPct], ['successive_change', 25, 70]);
  assert.equal(weak.patternName.en, 'Successive percentage change');
  assert.ok(!d.weakPatterns.some((w) => w.pattern === 'percent_of_number'), 'a pattern answered well is not weak');

  assert.ok(d.badges.some((b) => b.key === 'first_steps'));
  assert.equal(d.streak.days, 1);
  assert.equal((await api('GET', '/me/insights')).body.data.badges.length, d.badges.length, 'badges are not duplicated');
});

test('practice stream can be limited to one pattern', async () => {
  const { body } = await api('GET', '/practice/questions?category=WBPSC&subject=quant&topic=percentage&language=en&limit=20&pattern=successive_change');
  assert.equal(body.data.questions.length, 8);
  assert.ok(body.data.questions.every((q) => q.stem.en.startsWith('successive_change')));
});

test('leaderboard: opt-in only, "First L." names', async () => {
  const [riya, arjun, hidden] = await User.insertMany([
    { name: 'Riya Sen', email: 'riya@example.com', password_hash: 'x', leaderboard_opt_in: true },
    { name: 'Arjun Das', email: 'arjun@example.com', password_hash: 'x', leaderboard_opt_in: false },
    { name: 'Mou Roy', email: 'mou@example.com', password_hash: 'x', leaderboard_opt_in: false },
  ]);
  const att = (u, n) => Array.from({ length: n }, (_, i) => ({ user_id: String(u._id), question_id: otherIds[i % otherIds.length], subject: 'quant', topic: 'percentage', correct: true }));
  await PracticeAttempt.insertMany([...att(riya, 5), ...att(arjun, 9), ...att(hidden, 12)]);

  let lb = (await api('GET', '/me/leaderboard', null, String(arjun._id))).body.data;
  assert.equal(lb.optedIn, false);
  assert.deepEqual(lb.top.map((r) => r.name), ['Riya S.']);

  lb = (await api('PUT', '/me/leaderboard', { optIn: true }, String(arjun._id))).body.data;
  assert.equal(lb.optedIn, true);
  assert.deepEqual(lb.top.map((r) => [r.name, r.correct]), [['Arjun D.', 9], ['Riya S.', 5]]);
  assert.equal(lb.me.rank, 1);
  assert.ok(!lb.top.some((r) => r.name.startsWith('Mou')), 'students who did not opt in never appear');
});

test('daily challenge: same set all day, anyone can play, first signed-in attempt saved', async () => {
  const a = (await api('GET', '/challenge/today?tz=330', null, null)).body.data;
  const b = (await api('GET', '/challenge/today?tz=330')).body.data;
  // One per subject slot; the test bank has no General Studies, so 3 of the 5 slots fill.
  assert.ok(a.questions.length >= 3 && a.questions.length <= 5);
  assert.equal(new Set(a.questions.map((q) => q.topic)).size >= 3, true);
  assert.deepEqual(a.questions.map((q) => q.questionId), b.questions.map((q) => q.questionId));
  assert.equal(new Set(a.questions.map((q) => q.questionId)).size, a.questions.length);
  assert.equal(b.done, null);

  const answers = a.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: q.options[0].optionId }));
  const anon = (await api('POST', '/challenge/today', { tz: 330, answers }, null)).body.data;
  assert.equal(anon.results.length, a.questions.length);
  assert.equal(await DailyChallengeResult.countDocuments(), 0, 'anonymous results are not stored');

  const first = (await api('POST', '/challenge/today', { tz: 330, answers })).body.data;
  assert.equal(first.firstAttempt, true);
  const again = (await api('POST', '/challenge/today', { tz: 330, answers })).body.data;
  assert.equal(again.firstAttempt, false);
  assert.deepEqual((await api('GET', '/challenge/today?tz=330')).body.data.done, first.score);

  // A question that is certainly not in today's set. (A fixed id was flaky: on some
  // days the daily hash picked exactly that question.)
  const outsider = await Question.findOne({ status: 'PUBLISHED', _id: { $nin: a.questions.map((q) => q.questionId) } }).select('_id').lean();
  assert.ok(outsider, 'the test bank has questions outside the challenge');
  const bad = await api('POST', '/challenge/today', { tz: 330, answers: [{ questionId: String(outsider._id), selectedOptionId: null }] });
  assert.equal(bad.status, 422);
  assert.equal(bad.body.error.code, 'NOT_IN_CHALLENGE');
});
