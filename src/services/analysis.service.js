'use strict';

/**
 * "My learning analysis" for Mathematics and English: one framework, one subject at a time.
 * Loads the student's data and hands it to the pure rules (analysis.logic.js):
 *
 *   answers     practice / Learn quizzes / revision (practice_attempts) + mock and custom tests
 *               (result.per_question), each with the question's difficulty, sub-topic, pattern, PYQ flag
 *   skips       skips.service.js (Learn quizzes + tests), each with a likely or student-given reason
 *   mistakes    review_items (mistake notebook and its revision)
 *   reading     chapter_study (lesson sections read, reading and re-reading time)
 *   bank        published questions per chapter, PYQ progress, WBPSC chapter priorities
 *
 * Nothing here generates questions; the Smart Quiz picks from the published bank
 * (customTest.service.js, preset "smart", using smartPlan below).
 */

const mongoose = require('mongoose');
const { PracticeAttempt, MockSession, Question, ReviewItem, ChapterStudy, StudyPlanProgress } = require('../models');
const plan = require('../../db/plans/clerkship60');
const { streakDaysFor } = require('./performance.service');
const { MAX_SECTIONS } = require('../models/ChapterStudy');
const { compactLocalized } = require('./presenters');
const { availability, REAL_PAPER } = require('./bankAvailability');
const { pyqProgress } = require('./pyqProgress.service');
const { getPriorities } = require('./priority.service');
const { patternName } = require('./insights.service');
const skips = require('./skips.service');
const learn = require('./learn.service');
const A = require('./analysis.logic');
const AppError = require('../utils/AppError');

const ANSWERED = new Set(['CORRECT', 'INCORRECT']);
const SKIPPED = new Set(['UNATTEMPTED', 'TIMED_OUT']);

const prettySlug = (s) => {
  const t = s.replace(/_/g, ' ');
  return { en: t.charAt(0).toUpperCase() + t.slice(1) };
};

function assertSubject(subject) {
  if (!A.ANALYSIS_SUBJECTS.includes(subject)) throw AppError.unprocessable('SUBJECT_NOT_ANALYSED', 'Learning analysis is for Mathematics and English');
}

/** All answers of one subject, newest first, with question facts. Also the latest test in it. */
async function loadAnswers(userId, subject) {
  const [practice, mocks] = await Promise.all([
    PracticeAttempt.find({ user_id: userId, subject }).sort({ created_at: -1 }).limit(5000).select('question_id topic correct created_at time_spent_sec source').lean(),
    MockSession.find({ user_id: userId, status: 'SUBMITTED' })
      .sort({ submitted_at: -1 })
      .limit(50)
      .select('submitted_at config.subject custom.preset result.per_question.qid result.per_question.topic result.per_question.outcome result.per_question.time_spent_sec result.per_question.difficulty')
      .lean(),
  ]);
  const answers = practice.map((a) => ({ qid: String(a.question_id), topic: a.topic, correct: a.correct, at: a.created_at, timeSec: a.time_spent_sec ?? null, source: a.source ?? 'practice' }));
  const testRows = [];
  for (const m of mocks) {
    for (const p of m.result?.per_question || []) {
      testRows.push({ m, p });
    }
  }
  // Which test questions belong to this subject (a full paper mixes subjects).
  const mixedIds = [...new Set(testRows.filter((r) => r.m.config.subject !== subject).map((r) => String(r.p.qid)))];
  const mixedOfSubject = new Set(mixedIds.length ? (await Question.find({ _id: { $in: mixedIds }, subject }).select('_id').lean()).map((q) => String(q._id)) : []);
  let latestTest = null;
  for (const { m, p } of testRows) {
    if (m.config.subject !== subject && !mixedOfSubject.has(String(p.qid))) continue;
    if (!latestTest) latestTest = { id: String(m._id), at: m.submitted_at, preset: m.custom?.preset ?? null, rows: [] };
    if (String(m._id) === latestTest.id) latestTest.rows.push(p);
    if (!ANSWERED.has(p.outcome)) continue;
    answers.push({ qid: String(p.qid), topic: p.topic, correct: p.outcome === 'CORRECT', at: m.submitted_at, timeSec: p.time_spent_sec ?? null, source: 'test', difficulty: p.difficulty });
  }
  answers.sort((a, b) => b.at - a.at);
  return { answers, latestTest };
}

/** difficulty / pattern / subtopic / PYQ flag for a set of question ids. */
async function questionFacts(ids, extra = '') {
  if (!ids.length) return new Map();
  const qs = await Question.find({ _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) } })
    .select(`difficulty pattern subtopic topic provenance pyq.is_pyq ${extra}`)
    .lean();
  return new Map(qs.map((q) => [String(q._id), q]));
}

/** Everything the analysis of one subject needs, loaded in parallel. */
async function loadSubject(userId, subject, language) {
  const [{ chapters }, avail, { answers, latestTest }, mistakes, { events, reasons }, pyq, study, priorities] = await Promise.all([
    learn.getSubject(subject),
    availability(subject, language),
    loadAnswers(userId, subject),
    ReviewItem.find({ user_id: userId, subject, from_mistake: true }).select('question_id topic status wrong_count reviews last_wrong_at').lean(),
    skips.skipEvents(userId, subject),
    pyqProgress(userId, subject),
    ChapterStudy.find({ user_id: userId, subject }).lean(),
    getPriorities().catch(() => ({ subjects: {} })),
  ]);
  const facts = await questionFacts([...new Set([...answers.map((a) => a.qid), ...events.map((e) => e.qid)])]);
  for (const a of answers) {
    const q = facts.get(a.qid);
    a.difficulty ??= q?.difficulty ?? 3;
    a.pattern = q?.pattern ?? null;
    a.subtopic = q?.subtopic ?? null;
    a.pyq = Boolean(q?.pyq?.is_pyq && REAL_PAPER.includes(q.provenance));
  }
  // Skips per question with a likely reason (or the student's own).
  const merged = [...skips.mergeSkips(events, answers).values()];
  for (const s of merged) {
    const q = facts.get(s.qid);
    s.difficulty = q?.difficulty ?? 3;
    const last = s.events.sort((a, b) => b.at - a.at)[0];
    s.lastTimeSec = last.timeSec;
    s.reason = skips.likelyReason({ outcome: last.outcome, timed: last.timed, seq: last.seq, count: last.total, timeSec: last.timeSec, difficulty: s.difficulty, targetSec: A.SUBJECT_CONFIG[subject].targetSec });
    s.ownReason = reasons.get(s.qid) ?? null;
  }
  return { chapters, avail, answers, latestTest, mistakes, skips: merged, pyq: pyq.topics, study: new Map(study.map((s) => [s.topic, s])), priority: priorities.subjects?.[subject]?.topics ?? {} };
}

const groupBy = (list, key) => {
  const m = new Map();
  for (const x of list) {
    const k = x[key];
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
};

/** The full analysis of one subject (Mathematics: quant, English: english). */
async function analyseSubject(userId, subject, { language = 'en', tz = 330, now = new Date(), detail = true } = {}) {
  assertSubject(subject);
  const d = await loadSubject(userId, subject, language);
  const cfg = A.SUBJECT_CONFIG[subject];
  const titles = new Map(d.chapters.map((c) => [c.topic, c.title]));
  const titleOf = (t) => titles.get(t) ?? prettySlug(t);
  const answersByTopic = groupBy(d.answers, 'topic');
  const skipsByTopic = groupBy(d.skips, 'topic');
  const mistakesByTopic = groupBy(d.mistakes, 'topic');

  // The latest test in this subject: wrong and skipped per chapter (for "Your next Smart Quiz").
  const latest = { wrong: new Map(), skipped: new Map() };
  for (const p of d.latestTest?.rows ?? []) {
    if (p.outcome === 'INCORRECT') latest.wrong.set(p.topic, (latest.wrong.get(p.topic) || 0) + 1);
    if (SKIPPED.has(p.outcome)) latest.skipped.set(p.topic, (latest.skipped.get(p.topic) || 0) + 1);
  }

  const chapters = d.chapters.map((ch) => {
    const answers = answersByTopic.get(ch.topic) || [];
    const c = A.analyseChapter(
      {
        topic: ch.topic,
        title: ch.title,
        answers,
        skips: skipsByTopic.get(ch.topic) || [],
        mistakes: mistakesByTopic.get(ch.topic) || [],
        available: d.avail.get(ch.topic)?.total ?? 0,
        pyq: d.pyq[ch.topic] ? { total: d.pyq[ch.topic].total, solved: d.pyq[ch.topic].solved } : null,
        study: d.study.get(ch.topic),
        hasLesson: ch.hasLesson,
        priority: d.priority[ch.topic]?.level ?? null,
      },
      { now, tzMin: tz, targetSec: cfg.targetSec, subject },
    );
    // Topic (sub-topic) and skill (pattern) levels of concept mastery.
    c.topics = A.conceptBreakdown(answers, 'subtopic', c.recentAccuracy, prettySlug);
    c.skills = A.conceptBreakdown(answers, 'pattern', c.recentAccuracy, (k) => (patternName(subject, ch.topic, k)?.name ?? prettySlug(k)));
    c.weakestSkill = c.skills.find((s) => s.answered >= 3 && s.accuracyPct < 70) ?? null;
    c.latestWrong = latest.wrong.get(ch.topic) || 0;
    c.latestSkipped = latest.skipped.get(ch.topic) || 0;
    c.emoji = ch.emoji;
    return c;
  });

  const summary = A.subjectSummary(chapters, d.answers, { now, tzMin: tz });
  const focus = A.focusList(chapters);
  const result = {
    subject,
    generatedAt: now,
    summary,
    trend: A.trendOf(d.answers, now, tz),
    month: A.monthReport(d.answers, now, tz, titleOf),
    areas: A.areaSummary(subject, chapters, answersByTopic),
    studyNow: focus.slice(0, 6).map(brief),
    nextTask: focus[0] ? { topic: focus[0].topic, title: focus[0].title, band: focus[0].focus.band, step: focus[0].plan.steps[0], why: focus[0].why.slice(0, 2) } : null,
    chapters,
    nextSmartQuiz: nextSmartQuiz(chapters, d.latestTest, latest, titleOf),
  };
  if (!detail) return result;

  result.skips = A.skipAnalysis(d.skips, now, titleOf);
  result.declining = chapters.filter((c) => c.trend.direction === 'down').map((c) => ({ topic: c.topic, title: c.title, from: c.trend.previousAccuracy, to: c.trend.recentAccuracy }));
  result.improving = chapters.filter((c) => c.trend.direction === 'up').map((c) => ({ topic: c.topic, title: c.title, from: c.trend.previousAccuracy, to: c.trend.recentAccuracy }));
  [result.weakQuestions, result.skippedQuestions] = await Promise.all([weakQuestionList(d, titleOf), skippedQuestionList(d, titleOf)]);
  return result;
}

const brief = (c) => ({
  topic: c.topic,
  title: c.title,
  band: c.focus.band,
  score: c.focus.score,
  mastery: c.mastery,
  accuracy: c.recentAccuracy,
  why: c.why.slice(0, 4),
  plan: c.plan,
  weakestSkill: c.weakestSkill ? { name: c.weakestSkill.name, accuracy: c.weakestSkill.accuracyPct } : null,
  revision: c.revision,
});

/** "Your next Smart Quiz": what the latest test showed, and the plan it leads to. */
function nextSmartQuiz(chapters, latestTest, latest, titleOf, count = 15) {
  const plan = A.smartQuizPlan(chapters, count).map((p) => {
    const c = chapters.find((x) => x.topic === p.topic);
    return { ...p, title: titleOf(p.topic), skill: c?.weakestSkill ? c.weakestSkill.name : null };
  });
  const top = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([topic, n]) => ({ topic, title: titleOf(topic), count: n }));
  const weakest = chapters.flatMap((c) => c.skills.filter((s) => s.answered >= 3).map((s) => ({ ...s, topic: c.topic }))).sort((a, b) => a.accuracyPct - b.accuracyPct)[0];
  return {
    basedOn: latestTest ? { sessionId: latestTest.id, at: latestTest.at, wrong: top(latest.wrong), skipped: top(latest.skipped) } : null,
    weakestSkill: weakest ? { name: weakest.name, topic: weakest.topic, accuracy: weakest.accuracyPct } : null,
    count: plan.reduce((a, p) => a + p.count, 0),
    plan,
  };
}

const stemOf = (q) => compactLocalized(q?.stem) ?? null;

/** Questions answered wrong, most repeated first (the open ones). */
async function weakQuestionList(d, titleOf, limit = 20) {
  const items = d.mistakes
    .filter((m) => m.status === 'active')
    .sort((a, b) => b.wrong_count - a.wrong_count || b.last_wrong_at - a.last_wrong_at)
    .slice(0, limit);
  const facts = await questionFacts(items.map((m) => String(m.question_id)), 'stem');
  return items.map((m) => {
    const q = facts.get(String(m.question_id));
    return {
      questionId: String(m.question_id),
      topic: m.topic,
      title: titleOf(m.topic),
      stem: stemOf(q),
      difficulty: q?.difficulty ?? null,
      subtopic: q?.subtopic ?? null,
      wrongCount: m.wrong_count,
      lastWrongAt: m.last_wrong_at,
      repeated: m.wrong_count >= 2,
    };
  });
}

/** Open skips, most often skipped first, with the likely reason and the student's own. */
async function skippedQuestionList(d, titleOf, limit = 30) {
  const open = d.skips.filter((s) => s.open).sort((a, b) => b.count - a.count || b.lastAt - a.lastAt).slice(0, limit);
  const facts = await questionFacts(open.map((s) => s.qid), 'stem');
  return open.map((s) => ({
    questionId: s.qid,
    topic: s.topic,
    title: titleOf(s.topic),
    stem: stemOf(facts.get(s.qid)),
    difficulty: s.difficulty,
    times: s.count,
    lastAt: s.lastAt,
    timeBeforeSkipSec: s.lastTimeSec,
    likelyReason: s.reason,
    reason: s.ownReason,
  }));
}

/** One row of the overview's all-chapters list: enough to rank and show it, nothing more. */
const chapterBrief = (c) => ({
  topic: c.topic,
  title: c.title,
  emoji: c.emoji,
  mastery: c.mastery,
  accuracy: c.recentAccuracy,
  band: c.focus.band,
  score: c.focus.score,
  started: c.started,
  practicePct: c.practicePct,
  weakestSkill: c.weakestSkill ? { name: c.weakestSkill.name, accuracy: c.weakestSkill.accuracyPct } : null,
});

/** Both subjects side by side, with the current focus across them (#21 "learning health"). */
async function overview(userId, { language = 'en', tz = 330, now = new Date() } = {}) {
  const subjects = await Promise.all(A.ANALYSIS_SUBJECTS.map((s) => analyseSubject(userId, s, { language, tz, now, detail: false })));
  // The streak is user-level (same days and freeze rules as /me), and the target exam comes from
  // the 60-day plan: the exam is fixed (WBPSC Clerkship), only the date depends on the student.
  const [streakDays, planDoc] = await Promise.all([
    streakDaysFor(userId, tz, now).catch(() => 0),
    StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).select('exam_date start_date').lean().catch(() => null),
  ]);
  const focus = subjects
    .flatMap((s) => s.studyNow.filter((c) => c.band === 'high' || c.band === 'medium').slice(0, 3).map((c) => ({ subject: s.subject, ...c })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  return {
    subjects: subjects.map((s) => ({
      subject: s.subject,
      summary: s.summary,
      trend: { direction: s.trend.direction, recentDelta: s.trend.recentDelta, weeks: s.trend.weeks },
      month: s.month,
      nextTask: s.nextTask,
      areas: s.areas,
      chapters: s.chapters.map(chapterBrief),
    })),
    focus,
    streakDays,
    plan: { exam: plan.exam, examDate: planDoc?.exam_date ?? null, startDate: planDoc?.start_date ?? null },
  };
}

/**
 * The Smart Quiz plan for the custom-test generator: questions per chapter from the student's
 * data (analysis.logic smartQuizPlan). `topics` (optional) limits it to chosen chapters.
 */
async function smartPlan(userId, subject, { language, count, topics = [] }) {
  const a = await analyseSubject(userId, subject, { language, detail: false });
  const chapters = topics.length ? a.chapters.filter((c) => topics.includes(c.topic)) : a.chapters;
  // A chosen chapter the student has not started still gets questions.
  const usable = topics.length ? chapters.map((c) => (c.focus.band === 'not_started' ? { ...c, focus: { ...c.focus, band: 'low' } } : c)) : chapters;
  return A.smartQuizPlan(usable, count);
}

/** Heartbeat from a Learn chapter page: seconds of visible reading and the section being read. */
async function logStudy(userId, { subject, topic, kind, seconds, section, sectionsTotal }) {
  assertSubject(subject);
  const { chapters } = await learn.getSubject(subject);
  if (!chapters.some((c) => c.topic === topic)) throw AppError.notFound('CHAPTER_NOT_FOUND', 'Chapter not found');
  const now = new Date();
  const doc = await ChapterStudy.findOne({ user_id: userId, subject, topic }).lean();
  const read = new Set(doc?.sections_read ?? []);
  if (section && read.size < MAX_SECTIONS) read.add(section);
  const total = sectionsTotal ?? doc?.sections_total ?? null;
  // Re-reading a chapter already read through counts as revision.
  const revising = kind === 'revise' || Boolean(doc?.completed_at);
  const set = { sections_read: [...read], last_read_at: now };
  if (total) set.sections_total = total;
  if (!doc?.completed_at && total && read.size >= total) set.completed_at = now;
  if (revising && seconds > 0) set.last_revised_at = now;
  await ChapterStudy.updateOne(
    { user_id: userId, subject, topic },
    { $set: set, $inc: { [revising ? 'revise_sec' : 'read_sec']: seconds } },
    { upsert: true },
  );
  return { subject, topic, sectionsRead: read.size, sectionsTotal: total };
}

module.exports = { analyseSubject, overview, smartPlan, logStudy, nextSmartQuiz };
