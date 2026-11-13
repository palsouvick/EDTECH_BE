'use strict';

/**
 * Tests for the IDO track: plan daily/weekly tests, sectional tests (one
 * official Part-I section at a time) and the full mock in the official pattern
 * (db/plans/ido.js SECTIONS; Advt 15/2024: 100 questions, 90 minutes, −0.25
 * per wrong answer). Modeled on services/planTests.service.js: questions come
 * from the published bank only, answers stay on the server (signed token),
 * grading records attempts and sends mistakes to the Mistake Notebook, and a
 * signed-in student's plan test results are kept on their IDO plan progress.
 */

const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { gradeAnswers, peekAnswer } = require('./grading');
const { signToken, verifySignedToken } = require('./signedToken');
const { topicName } = require('./catalogNames');
const idoPlan = require('./idoPlan.service');
const plan = require('../../db/plans/ido');
const AppError = require('../utils/AppError');

const PURPOSE = 'ido-test';
const TTL_SEC = 6 * 3600;
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const NEGATIVE = plan.FULL_MOCK.negative;
const WEAK_BELOW = 50;
const STRONG_FROM = 90;

const baseMatch = (language) => ({ status: 'PUBLISHED', lang_set: { $in: langSetsContaining(language) }, 'exam_targets.category': 'WBPSC' });

async function sample(match, size, exclude) {
  if (size <= 0) return [];
  const ids = await Question.aggregate([{ $match: { ...match, _id: { $nin: exclude } } }, { $sample: { size } }, { $project: { _id: 1 } }]);
  return ids.map((d) => d._id);
}

/** Up to n ids for one subject block: today's topics first, then learned topics, then the subject. */
async function pickBlock(subject, n, { today, learned, language, exclude, pyqOnly }) {
  const picked = [];
  const tiers = [
    today.filter((x) => x.subject === subject).map((x) => x.topic),
    learned.filter((x) => x.subject === subject).map((x) => x.topic),
    null,
  ];
  for (const topics of tiers) {
    if (picked.length >= n || (topics && !topics.length)) continue;
    const match = { ...baseMatch(language), subject, ...(topics && { topic: { $in: [...new Set(topics)] } }), ...(pyqOnly && { provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true }) };
    picked.push(...(await sample(match, n - picked.length, [...exclude, ...picked])));
  }
  return picked;
}

/** Sample one official section's pool; tops up from the whole subject if the pool is short. */
async function pickSection(section, language, exclude) {
  const match = { ...baseMatch(language), subject: section.subject, ...(section.topic && { topic: section.topic }) };
  const ids = await sample(match, section.count, exclude);
  if (ids.length < section.count && section.topic) {
    ids.push(...(await sample({ ...baseMatch(language), subject: section.subject }, section.count - ids.length, [...exclude, ...ids])));
  }
  return ids;
}

async function present(ids, language) {
  const docs = await Question.find({ _id: { $in: ids } }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  return ids.map((id) => byId.get(String(id))).filter(Boolean)
    .map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty }));
}

/** The full mock: every official section at its official count, in paper order. */
async function createFullMock({ language = 'en' } = {}, day = null) {
  const picked = {};
  const all = [];
  for (const section of plan.SECTIONS) {
    picked[section.key] = await pickSection(section, language, all);
    all.push(...picked[section.key]);
  }
  const sections = [];
  for (const section of plan.SECTIONS) {
    if (!picked[section.key].length) continue;
    sections.push({ section: section.key, title: section.title, questions: await present(picked[section.key], language) });
  }
  const ids = sections.flatMap((s) => s.questions.map((q) => q.questionId));
  return {
    kind: 'full_mock',
    day,
    minutes: plan.FULL_MOCK.minutes,
    timed: true,
    negativeMarking: NEGATIVE,
    sections,
    testToken: signToken(PURPOSE, { k: 'full_mock', d: day, q: ids, neg: NEGATIVE }, TTL_SEC),
  };
}

/** One official section as a timed sectional test, with the official negative marking. */
async function createSectional(sectionKey, { language = 'en' } = {}) {
  const section = plan.SECTIONS.find((s) => s.key === sectionKey);
  if (!section) throw AppError.notFound('UNKNOWN_SECTION', `No IDO section "${sectionKey}"`);
  const ids = await pickSection(section, language, []);
  if (!ids.length) throw AppError.unprocessable('NO_QUESTIONS', 'No questions published for this section yet');
  const questions = await present(ids, language);
  return {
    kind: 'sectional',
    section: section.key,
    title: section.title,
    minutes: Math.max(5, Math.round(section.count * (plan.FULL_MOCK.minutes / 100))),
    timed: true,
    negativeMarking: NEGATIVE,
    sections: [{ section: section.key, title: section.title, questions }],
    testToken: signToken(PURPOSE, { k: 'sectional', s: section.key, q: questions.map((q) => q.questionId), neg: NEGATIVE }, TTL_SEC),
  };
}

/** A plan day's test (daily mixed, weekly, or the full mock on mock days). */
async function createPlanTest(day, { days = 60, budget = plan.BASE_BUDGET, language = 'en' } = {}) {
  const task = idoPlan.testTaskOf(day, days, budget);
  if (!task) throw AppError.notFound('NO_TEST_TODAY', `Day ${day} has no test`);
  if (task.kind === 'full_mock') return createFullMock({ language }, day);
  const today = task.topics || [];
  const learned = idoPlan.learnedBefore(day, days);
  const picked = {};
  const all = [];
  for (const subject of ['english', 'gs', 'quant', 'reasoning']) {
    const n = task.sizes[subject] || 0;
    if (!n) continue;
    picked[subject] = await pickBlock(subject, n, { today, learned, language, exclude: all, pyqOnly: false });
    all.push(...picked[subject]);
  }
  const pyqN = task.sizes.pyq || 0;
  if (pyqN) {
    const per = Math.ceil(pyqN / 3);
    const ids = [];
    for (const subject of ['gs', 'quant', 'english']) ids.push(...(await pickBlock(subject, Math.min(per, pyqN - ids.length), { today, learned, language, exclude: all, pyqOnly: true })));
    picked.pyq = ids;
    all.push(...ids);
  }
  const order = ['english', 'gs', 'quant', 'reasoning', 'pyq'];
  const sections = [];
  for (const key of order) {
    if (!picked[key]?.length) continue;
    sections.push({ section: key, questions: await present(picked[key], language) });
  }
  const ids = sections.flatMap((s) => s.questions.map((q) => q.questionId));
  return {
    day,
    kind: task.kind,
    taskId: task.id,
    minutes: task.minutes,
    timed: false,
    negativeMarking: 0,
    sections,
    testToken: signToken(PURPOSE, { k: task.kind, d: day, days, q: ids, neg: 0 }, TTL_SEC),
  };
}

const pct = (c, t) => (t ? Math.round((c / t) * 100) : null);

/**
 * Marks any IDO test. Unanswered questions count as not correct and carry no
 * negative mark. Returns per-answer explanations, totals per section pool,
 * subject and topic, weak/strong topics, and the next action data the UI needs.
 */
async function checkTest({ testToken, answers }, userId) {
  const issued = verifySignedToken(PURPOSE, testToken);
  if (!issued) throw new AppError(403, 'TEST_TOKEN_INVALID', 'This test has expired or was not issued by the server. Start it again.');
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
  const negative = issued.neg || 0;
  const summary = {
    kind: issued.k,
    correct,
    total,
    wrong,
    skipped: total - correct - wrong,
    accuracy: pct(correct, total),
    marks: negative ? Math.round((correct - negative * wrong) * 100) / 100 : correct,
    maxMarks: total,
    timeSec: Math.round(answers.reduce((a, x) => a + (x.timeSpentSec || 0), 0)),
    bySubject,
    weakTopics: weak.map(({ subject, topic, name, accuracy }) => ({ subject, topic, name, accuracy })),
    strongTopics: strong.map(({ subject, topic, name, accuracy }) => ({ subject, topic, name, accuracy })),
    at: new Date().toISOString(),
  };

  if (userId && issued.d) {
    try {
      const task = idoPlan.testTaskOf(issued.d, issued.days ?? 60);
      if (task) await idoPlan.recordTest(userId, issued.d, summary, task.id);
    } catch { /* no plan started: the result simply is not kept on a plan */ }
  }
  return { day: issued.d ?? null, section: issued.s ?? null, summary, byTopic: topics, results };
}

/**
 * "Check answer" for one question of an issued test: its answer and explanation, not recorded
 * (the test is recorded when submitted). Not offered in a full mock, which runs like the exam.
 */
async function peekTest({ testToken, questionId, selectedOptionId }) {
  const issued = verifySignedToken(PURPOSE, testToken);
  if (!issued) throw new AppError(403, 'TEST_TOKEN_INVALID', 'This test has expired or was not issued by the server. Start it again.');
  if (issued.k === 'full_mock') throw new AppError(403, 'CHECK_NOT_IN_MOCK', 'Answers are shown after a full mock is submitted.');
  if (!issued.q.includes(questionId)) throw new AppError(403, 'QUESTION_NOT_IN_TEST', 'This question is not part of this test');
  const result = await peekAnswer({ questionId, selectedOptionId });
  if (!result) throw new AppError(404, 'QUESTION_NOT_FOUND', 'Question not found');
  return result;
}

module.exports = { createFullMock, createSectional, createPlanTest, checkTest, peekTest, WEAK_BELOW, STRONG_FROM };
