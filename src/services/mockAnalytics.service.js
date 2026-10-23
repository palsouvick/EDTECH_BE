'use strict';

const { Question, MockSession, ExamCategory, ExamCutoff } = require('../models');
const AppError = require('../utils/AppError');
const { PUBLIC_QUESTION_FIELDS, compactLocalized, presentQuestion } = require('./presenters');
const { presentResult } = require('./mock.service');

// Below this many comparable submissions, a percentile is noise: don't show one.
const MIN_PEERS = 5;
const PEER_SAMPLE = 5000;
const round1 = (x) => Math.round(x * 10) / 10;

/**
 * Percentile among submitted tests of the same kind: same category, subject
 * and length. Mocks are generated per student, so papers differ; comparing
 * score percentages within that cohort is the fair basis available.
 */
async function peerStanding(session) {
  const c = session.config;
  const peers = await MockSession.find({
    status: 'SUBMITTED',
    'config.category': c.category,
    'config.subject': c.subject,
    'config.question_count': c.question_count,
    _id: { $ne: session._id },
  })
    .sort({ submitted_at: -1 })
    .limit(PEER_SAMPLE)
    .select('result.score result.max_score')
    .lean();

  const pct = (r) => (r?.max_score ? r.score / r.max_score : 0);
  const mine = pct(session.result);
  const scores = peers.map((p) => pct(p.result));
  const basis = { category: c.category, subject: c.subject, questionCount: c.question_count };
  if (scores.length < MIN_PEERS) return { available: false, peers: scores.length, minPeers: MIN_PEERS, basis };

  const below = scores.filter((s) => s < mine).length;
  const equal = scores.filter((s) => s === mine).length;
  return {
    available: true,
    peers: scores.length,
    percentile: round1(((below + equal / 2) / scores.length) * 100),
    rank: scores.filter((s) => s > mine).length + 1,
    of: scores.length + 1,
    basis,
  };
}

/** Latest official cut-offs per exam stage in this category (all reservation classes of that year). */
async function cutoffsFor(category) {
  const rows = await ExamCutoff.find({ category }).sort({ year: -1 }).lean();
  const latestYear = new Map();
  for (const r of rows) {
    const k = `${r.exam_code}:${r.stage}`;
    if (!latestYear.has(k)) latestYear.set(k, r.year);
  }
  return rows
    .filter((r) => latestYear.get(`${r.exam_code}:${r.stage}`) === r.year)
    .map((r) => ({
      examCode: r.exam_code,
      examName: r.exam_name,
      stage: r.stage,
      year: r.year,
      reservation: r.reservation,
      score: r.score,
      maxScore: r.max_score,
      pct: round1((r.score / r.max_score) * 100),
      sourceUrl: r.source_url,
    }));
}

/**
 * Everything the result dashboard needs, in one call, for a submitted session:
 * result, question-by-question review (with answers and explanations), topic
 * breakdown with marks lost, peer standing and official cut-offs.
 */
async function getAnalytics(userId, sessionId) {
  const session = await MockSession.findOne({ _id: sessionId, user_id: userId }).lean();
  if (!session) throw AppError.notFound('SESSION_NOT_FOUND', 'Mock session not found');
  if (session.status !== 'SUBMITTED') {
    throw AppError.conflict('SESSION_NOT_SUBMITTED', 'Answers and explanations are available after submission');
  }

  const result = presentResult(session, { alreadySubmitted: true });
  const { positive } = session.config.marking;

  const [docs, category, peers, cutoffs] = await Promise.all([
    Question.find({ _id: { $in: session.questions.map((q) => q.qid) } })
      .select(`${PUBLIC_QUESTION_FIELDS} expected_time_sec +solution`)
      .lean(),
    ExamCategory.findOne({ code: session.config.category }).select('name subjects').lean(),
    peerStanding(session),
    cutoffsFor(session.config.category),
  ]);
  const byId = new Map(docs.map((d) => [String(d._id), d]));

  const review = result.perQuestion.map((p) => {
    const q = byId.get(p.questionId);
    const base = {
      ...p,
      expectedTimeSec: q?.expected_time_sec ?? null,
      marksLost: Math.round((positive - p.marks) * 100) / 100,
    };
    if (!q) return { ...base, unavailable: true }; // question removed from the bank since
    return {
      ...base,
      ...presentQuestion(q, { seq: p.seq }),
      explanation: {
        steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
        shortcut: compactLocalized(q.solution?.shortcut),
        traps: (q.solution?.traps || []).map((t) => ({ optionId: t.option_id ?? null, note: compactLocalized(t.note) })),
      },
    };
  });

  // Per topic: what the student would have gained with every question right.
  const topics = new Map();
  for (const r of review) {
    const t = topics.get(r.topic) || { topic: r.topic, total: 0, correct: 0, incorrect: 0, unattempted: 0, marksLost: 0, time: 0 };
    t.total += 1;
    if (r.outcome === 'CORRECT') t.correct += 1;
    else if (r.outcome === 'INCORRECT') t.incorrect += 1;
    else t.unattempted += 1;
    t.marksLost += r.marksLost;
    t.time += r.timeSpentSec || 0;
    topics.set(r.topic, t);
  }
  const topicBreakdown = [...topics.values()]
    .map((t) => {
      const attempted = t.correct + t.incorrect;
      return {
        ...t,
        marksLost: Math.round(t.marksLost * 100) / 100,
        accuracyPct: attempted ? round1((t.correct / attempted) * 100) : 0,
        avgTimeSec: round1(t.time / t.total),
      };
    })
    .sort((a, b) => b.marksLost - a.marksLost || b.incorrect - a.incorrect);

  const subject = category?.subjects.find((s) => s.code === session.config.subject);
  return {
    sessionId: String(session._id),
    category: { code: session.config.category, name: compactLocalized(category?.name) },
    subject: { code: session.config.subject, name: compactLocalized(subject?.name) },
    topicNames: Object.fromEntries((subject?.topics || []).map((t) => [t.code, compactLocalized(t.name)])),
    marking: session.config.marking,
    result,
    review,
    topicBreakdown,
    weakestTopic: topicBreakdown[0]?.marksLost > 0 ? topicBreakdown[0] : null,
    peers,
    cutoffs,
  };
}

module.exports = { getAnalytics, MIN_PEERS };
