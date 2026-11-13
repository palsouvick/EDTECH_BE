'use strict';

/**
 * Tests inside the 60-day plan: the daily mixed test (Math, English, GS and real PYQs on
 * today's and earlier topics), the weekly test (the week's topics) and full mocks in the
 * Clerkship Part-I pattern. Questions come from the published bank; answers stay on the
 * server (signed list, graded by grading.gradeAnswers, which records attempts and sends
 * mistakes to the student's Mistake Notebook). A signed-in student's best result per day
 * is kept on their plan progress and drives the day summary and recommendations.
 */

const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { gradeAnswers, peekAnswer } = require('./grading');
const { signToken, verifySignedToken } = require('./signedToken');
const { topicName } = require('./catalogNames');
const studyPlan = require('./studyPlan.service');
const plan = require('../../db/plans/clerkship60');
const AppError = require('../utils/AppError');

const PURPOSE = 'plan-test';
const TTL_SEC = 6 * 3600;
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const SECTION_ORDER = ['english', 'gs', 'quant', 'pyq']; // the Part-I paper's order, PYQs last
const WEAK_BELOW = 50;
const STRONG_FROM = 90;

async function sample(match, size, exclude) {
  if (size <= 0) return [];
  const ids = await Question.aggregate([{ $match: { ...match, _id: { $nin: exclude } } }, { $sample: { size } }, { $project: { _id: 1 } }]);
  return ids.map((d) => d._id);
}

/** Up to n question ids for one block: today's topics first, then everything learned so far, then the subject. */
async function pickBlock(subject, n, { today, learned, base, exclude, pyqOnly }) {
  const picked = [];
  const tiers = [
    today.filter((x) => x.subject === subject).map((x) => x.topic),
    learned.filter((x) => x.subject === subject).map((x) => x.topic),
    null, // whole subject
  ];
  for (const topics of tiers) {
    if (picked.length >= n || (topics && !topics.length)) continue;
    const match = { ...base, subject, ...(topics && { topic: { $in: [...new Set(topics)] } }), ...(pyqOnly && { provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true }) };
    picked.push(...(await sample(match, n - picked.length, [...exclude, ...picked])));
  }
  return picked;
}

/** A plan day's test: questions without answers and a signed token for checking. */
async function createTest(day, { budget = plan.BASE_BUDGET, language = 'en' } = {}) {
  const task = studyPlan.testTaskOf(day, budget);
  if (!task) throw AppError.notFound('NO_TEST_TODAY', `Day ${day} has no test`);
  const base = { status: 'PUBLISHED', lang_set: { $in: langSetsContaining(language) }, 'exam_targets.category': 'WBPSC' };
  const today = task.topics || [];
  const learned = task.kind === 'full_mock' ? [] : studyPlan.learnedBefore(day);
  const picked = {};
  const all = [];
  for (const section of SECTION_ORDER) {
    const n = task.sizes[section] || 0;
    if (!n) continue;
    if (section === 'pyq') {
      // Real PYQs, spread over the three subjects, preferring today's and learned topics.
      const per = Math.ceil(n / 3);
      const ids = [];
      for (const subject of ['gs', 'quant', 'english']) ids.push(...(await pickBlock(subject, Math.min(per, n - ids.length), { today, learned, base: { status: 'PUBLISHED', lang_set: base.lang_set }, exclude: all, pyqOnly: true })));
      picked.pyq = ids;
    } else {
      picked[section] = await pickBlock(section, n, { today, learned, base, exclude: all });
    }
    all.push(...picked[section]);
  }
  const docs = await Question.find({ _id: { $in: all } }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const sections = SECTION_ORDER.filter((s) => picked[s]?.length).map((s) => ({
    section: s,
    questions: picked[s].map((id) => byId.get(String(id))).filter(Boolean).map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty })),
  }));
  const ids = sections.flatMap((s) => s.questions.map((q) => q.questionId));
  return {
    day,
    kind: task.kind,
    taskId: task.id,
    minutes: task.minutes,
    timed: task.kind === 'full_mock',
    negativeMarking: task.kind === 'full_mock' ? plan.FULL_MOCK.negative : 0,
    sections,
    testToken: signToken(PURPOSE, { d: day, k: task.kind, q: ids }, TTL_SEC),
  };
}

const pct = (c, t) => (t ? Math.round((c / t) * 100) : null);

/**
 * Marks a plan test. Unanswered questions count as not correct (and, in a full mock, carry no
 * negative mark). Returns every answer with its explanation, totals per subject and topic, the
 * weak and strong topics, and what to do next.
 */
async function checkTest(day, { testToken, answers }, userId) {
  const issued = verifySignedToken(PURPOSE, testToken);
  if (!issued || issued.d !== day) throw new AppError(403, 'TEST_TOKEN_INVALID', 'This test has expired or was not issued by the server. Start it again.');
  const allowed = new Set(issued.q);
  if (answers.some((a) => !allowed.has(a.questionId))) throw new AppError(403, 'QUESTION_NOT_IN_TEST', 'Answers include questions that are not part of this test');

  const answered = new Map(answers.map((a) => [a.questionId, a]));
  const full = issued.q.map((id) => answered.get(id) ?? { questionId: id, selectedOptionId: null });
  const { results } = await gradeAnswers(full, { userId, source: 'learn' });
  const meta = new Map((await Question.find({ _id: { $in: issued.q } }).select('subject topic pyq.is_pyq').lean()).map((q) => [String(q._id), q]));

  const bySubject = {};
  const byTopic = {};
  let wrong = 0;
  for (const r of results) {
    const q = meta.get(r.questionId);
    if (!q) continue;
    const s = (bySubject[q.subject] ??= { correct: 0, total: 0 });
    const tk = `${q.subject}.${q.topic}`;
    const tp = (byTopic[tk] ??= { subject: q.subject, topic: q.topic, name: topicName(q.subject, q.topic), correct: 0, total: 0 });
    s.total += 1;
    tp.total += 1;
    if (r.isCorrect) {
      s.correct += 1;
      tp.correct += 1;
    } else if (r.selectedOptionId) wrong += 1;
  }
  for (const v of [...Object.values(bySubject), ...Object.values(byTopic)]) v.accuracy = pct(v.correct, v.total);
  const correct = results.filter((r) => r.isCorrect).length;
  const total = issued.q.length;
  const topics = Object.values(byTopic);
  const weak = topics.filter((x) => x.total >= 2 && x.accuracy < WEAK_BELOW).sort((a, b) => a.accuracy - b.accuracy);
  const strong = topics.filter((x) => x.total >= 2 && x.accuracy >= STRONG_FROM);
  const negative = issued.k === 'full_mock' ? plan.FULL_MOCK.negative : 0;
  const summary = {
    kind: issued.k,
    correct,
    total,
    wrong,
    skipped: total - correct - wrong,
    accuracy: pct(correct, total),
    marks: negative ? Math.round((correct - negative * wrong) * 100) / 100 : correct,
    timeSec: Math.round(answers.reduce((a, x) => a + (x.timeSpentSec || 0), 0)),
    bySubject,
    weakTopics: weak.map(({ subject, topic, name, accuracy }) => ({ subject, topic, name, accuracy })),
    strongTopics: strong.map(({ subject, topic, name, accuracy }) => ({ subject, topic, name, accuracy })),
    at: new Date().toISOString(),
  };

  if (userId) {
    const task = studyPlan.testTaskOf(day);
    if (task && (await hasPlan(userId))) await studyPlan.recordTest(userId, day, summary, task.id);
  }
  return { day, summary, byTopic: topics, results };
}

async function hasPlan(userId) {
  try {
    await studyPlan.requireStarted(userId);
    return true;
  } catch {
    return false;
  }
}

/**
 * "Check answer" for one question of an issued test: its answer and explanation, not recorded
 * (the test is recorded when submitted). Not offered in a full mock, which runs like the exam.
 */
async function peekTest(day, { testToken, questionId, selectedOptionId }) {
  const issued = verifySignedToken(PURPOSE, testToken);
  if (!issued || issued.d !== day) throw new AppError(403, 'TEST_TOKEN_INVALID', 'This test has expired or was not issued by the server. Start it again.');
  if (issued.k === 'full_mock') throw new AppError(403, 'CHECK_NOT_IN_MOCK', 'Answers are shown after a full mock is submitted.');
  if (!issued.q.includes(questionId)) throw new AppError(403, 'QUESTION_NOT_IN_TEST', 'This question is not part of this test');
  const result = await peekAnswer({ questionId, selectedOptionId });
  if (!result) throw new AppError(404, 'QUESTION_NOT_FOUND', 'Question not found');
  return result;
}

module.exports = { createTest, checkTest, peekTest, WEAK_BELOW, STRONG_FROM };
