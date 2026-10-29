'use strict';

const crypto = require('node:crypto');
const config = require('../config');
const { Question, MockSession } = require('../models');
const AppError = require('../utils/AppError');
const statsBuffer = require('./questionStats.buffer');
const review = require('./review.service');
const { scoreSession } = require('./scoring');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { resolveMarking } = require('./markingScheme');
const { mockQuestionAlias } = require('./signedToken');
const {
  buildMockGenerationPipeline,
  allocateQuotas,
  selectWithBackfill,
  DIFFICULTY_MIX,
} = require('./mockGenerator.pipeline');

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function recentlyServedQuestionIds(userId) {
  const sessions = await MockSession.find({ user_id: userId })
    .sort({ created_at: -1 })
    .limit(config.mock.recentSessionsToExclude)
    .select('questions.qid')
    .lean();
  return sessions.flatMap((s) => s.questions.map((q) => q.qid));
}

async function generateQuestionSet(params, questionCount) {
  const quotas = allocateQuotas(questionCount, DIFFICULTY_MIX);
  const run = async (excludeIds) => {
    const [facets] = await Question.aggregate(
      buildMockGenerationPipeline({ ...params, excludeIds, perBandLimit: questionCount }),
    );
    return selectWithBackfill(facets, quotas);
  };

  let selection = await run(params.excludeIds);
  // Small pools: freshness matters less than being able to build the test at all.
  if (selection.picked.length < questionCount && params.excludeIds.length) {
    selection = await run([]);
  }
  return { ...selection, quotas };
}

async function createSession(userId, body) {
  const {
    category, subject, topicIds, questionCount, timeLimitMinutes,
    perQuestionTimer, perQuestionSeconds, allowPause, examCode, language,
  } = body;
  // Official marks for this exam and subject; resolved before generating so a bad examCode fails fast.
  const marking = resolveMarking({ category, subject, examCode });

  const excludeIds = await recentlyServedQuestionIds(userId);
  const { picked, mix, quotas } = await generateQuestionSet(
    { category, subject, topicIds, language, excludeIds },
    questionCount,
  );

  if (picked.length < questionCount) {
    throw AppError.unprocessable(
      'INSUFFICIENT_QUESTIONS',
      `Only ${picked.length} questions match these filters; ${questionCount} requested`,
      { available: picked.length, requested: questionCount },
    );
  }

  // Second read: full content for exactly the chosen ids (_id index, ~1 ms for 50 docs).
  const docs = await Question.find({ _id: { $in: picked.map((p) => p._id) } })
    .select(`${PUBLIC_QUESTION_FIELDS} +correct_option_id`)
    .lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const ordered = shuffle(picked.map((p) => byId.get(String(p._id))).filter(Boolean));
  if (ordered.length < questionCount) {
    // A question was unpublished between the two reads; rare enough to just ask for a retry.
    throw new AppError(503, 'GENERATION_RACE', 'Question bank changed during generation, please retry');
  }

  const now = new Date();
  const perQuestionLimitSec = perQuestionTimer
    ? (perQuestionSeconds ?? Math.floor((timeLimitMinutes * 60) / questionCount))
    : null;
  const expiresAt = allowPause
    ? new Date(now.getTime() + config.mock.pausableSessionTtlHours * 3600_000)
    : new Date(now.getTime() + timeLimitMinutes * 60_000);

  // The id is fixed up front so question aliases can be derived from it.
  const sessionId = new MockSession()._id;
  const session = await MockSession.create({
    _id: sessionId,
    user_id: userId,
    config: {
      category,
      subject,
      topic_ids: topicIds,
      language,
      question_count: questionCount,
      time_limit_min: timeLimitMinutes,
      per_question_timer: perQuestionTimer,
      per_question_limit_sec: perQuestionLimitSec,
      allow_pause: allowPause,
      marking: { positive: marking.positive, negative: marking.negative, basis: marking.basis, exam_code: marking.examCode, source_url: marking.sourceUrl },
      question_aliases: true,
    },
    questions: ordered.map((q, i) => ({ qid: q._id, seq: i + 1, topic: q.topic, difficulty: q.difficulty })),
    answer_key: Object.fromEntries(ordered.map((q) => [String(q._id), q.correct_option_id])),
    started_at: now,
    expires_at: expiresAt,
  });

  return {
    sessionId: String(session._id),
    status: session.status,
    config: presentConfig(session.config),
    startedAt: now,
    expiresAt,
    difficultyMix: { target: quotas, actual: mix },
    // presentQuestion whitelists fields, so correct_option_id never leaves the server.
    questions: ordered.map((q, i) => presentLiveQuestion(session, q, i + 1)),
  };
}

/**
 * A question as shown during a live test: its id is the session alias, never
 * the real question id, so it cannot be looked up through verify-answer or a
 * quiz check before the test is submitted. Real ids appear only in results.
 */
function presentLiveQuestion(session, q, seq) {
  const p = presentQuestion(q, { seq });
  if (!session.config.question_aliases) return p;
  return { ...p, questionId: mockQuestionAlias(String(session._id), String(q._id)), fingerprint: null };
}

function presentConfig(c) {
  return {
    category: c.category,
    subject: c.subject,
    topicIds: c.topic_ids,
    language: c.language,
    questionCount: c.question_count,
    timeLimitMinutes: c.time_limit_min,
    perQuestionTimer: c.per_question_timer,
    perQuestionLimitSec: c.per_question_limit_sec,
    allowPause: c.allow_pause,
    markingScheme: {
      positive: c.marking.positive,
      negative: c.marking.negative,
      // Sessions created before server-side marking have no basis: their marks came from the client.
      basis: c.marking.basis ?? 'CLIENT_LEGACY',
      examCode: c.marking.exam_code ?? null,
      sourceUrl: c.marking.source_url ?? null,
    },
  };
}

function presentResult(session, { alreadySubmitted = false } = {}) {
  const r = session.result;
  return {
    sessionId: String(session._id),
    status: session.status,
    alreadySubmitted,
    submittedAt: session.submitted_at,
    score: r.score,
    maxScore: r.max_score,
    accuracyPct: r.accuracy_pct,
    attemptRatePct: r.attempt_rate_pct,
    negativeMarksDeducted: r.negative_marks,
    counts: { correct: r.correct, incorrect: r.incorrect, unattempted: r.unattempted, timedOut: r.timed_out },
    totalTimeSec: r.total_time_sec,
    timeAdjusted: r.time_adjusted,
    perQuestion: r.per_question.map((p) => ({
      questionId: String(p.qid),
      seq: p.seq,
      topic: p.topic,
      difficulty: p.difficulty,
      selectedOptionId: p.selected_option_id,
      correctOptionId: p.correct_option_id,
      outcome: p.outcome,
      marks: p.marks,
      timeSpentSec: p.time_spent_sec,
      markedForReview: Boolean(p.marked_for_review),
    })),
    topicBreakdown: r.topic_breakdown.map(camelBucket),
    difficultyBreakdown: r.difficulty_breakdown.map(camelBucket),
    strengths: r.strengths.map(camelBucket),
    weaknesses: r.weaknesses.map(camelBucket),
  };
}

const camelBucket = (b) =>
  Object.fromEntries(Object.entries(b).map(([k, v]) => [k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()), v]));

function deadlinePassed(session, now) {
  if (session.config.allow_pause) return now > session.expires_at;
  return now.getTime() > session.expires_at.getTime() + config.mock.submitGraceSec * 1000;
}

async function submitSession(userId, { sessionId, responses: submitted }) {
  let responses = submitted;
  const session = await MockSession.findOne({ _id: sessionId, user_id: userId })
    .select('+answer_key')
    .lean();
  if (!session) throw AppError.notFound('SESSION_NOT_FOUND', 'Mock session not found');

  // Idempotent: a retried submit (flaky mobile network) gets the same result back.
  if (session.status === 'SUBMITTED') return presentResult(session, { alreadySubmitted: true });
  if (session.status === 'EXPIRED') throw AppError.conflict('SESSION_EXPIRED', 'This session has expired');

  const now = new Date();
  if (deadlinePassed(session, now)) {
    await MockSession.updateOne({ _id: session._id, status: 'ACTIVE' }, { $set: { status: 'EXPIRED' } });
    throw AppError.conflict('SESSION_EXPIRED', 'Submission received after the time limit');
  }

  // Live screens send aliases; real ids are still accepted (sessions created before aliases).
  const toQid = new Map();
  for (const q of session.questions) {
    const qid = String(q.qid);
    toQid.set(qid, qid);
    if (session.config.question_aliases) toQid.set(mockQuestionAlias(String(session._id), qid), qid);
  }
  const unknown = responses.filter((r) => !toQid.has(r.questionId)).map((r) => r.questionId);
  if (unknown.length) {
    throw AppError.unprocessable('UNKNOWN_QUESTION', 'Responses include questions not in this session', { unknown });
  }
  responses = responses.map((r) => ({ ...r, questionId: toQid.get(r.questionId) }));
  if (new Set(responses.map((r) => r.questionId)).size !== responses.length) {
    throw AppError.unprocessable('DUPLICATE_RESPONSE', 'A question was answered more than once');
  }

  const elapsedSec = (Math.min(now, session.expires_at) - session.started_at) / 1000;
  const result = scoreSession({
    questions: session.questions,
    answerKey: session.answer_key,
    responses,
    marking: session.config.marking,
    perQuestionLimitSec: session.config.per_question_limit_sec,
    // Paused time is not observable server-side, so only non-pausable sessions get a wall-clock budget.
    timeBudgetSec: session.config.allow_pause
      ? session.config.time_limit_min * 60
      : Math.min(elapsedSec, session.config.time_limit_min * 60) + config.mock.submitGraceSec,
  });

  // Conditional transition: of two concurrent submits, exactly one wins.
  const { modifiedCount } = await MockSession.updateOne(
    { _id: session._id, status: 'ACTIVE' },
    { $set: { status: 'SUBMITTED', submitted_at: now, result } },
  );
  if (modifiedCount === 0) {
    const winner = await MockSession.findById(session._id).lean();
    if (winner?.status === 'SUBMITTED') return presentResult(winner, { alreadySubmitted: true });
    throw AppError.conflict('SESSION_NOT_ACTIVE', 'Session is no longer active');
  }

  for (const p of result.per_question) {
    if (p.outcome === 'CORRECT' || p.outcome === 'INCORRECT') {
      statsBuffer.record(p.qid, { correct: p.outcome === 'CORRECT', timeSpentSec: p.time_spent_sec });
    }
    // Wrong answers join the revision queue (skipped ones do not: nothing was learnt wrong).
    if (p.outcome === 'INCORRECT') {
      review.recordMistake(userId, { questionId: p.qid, subject: session.config.subject, topic: p.topic, selectedOptionId: p.selected_option_id, source: 'mock' });
    }
  }

  return presentResult({ ...session, status: 'SUBMITTED', submitted_at: now, result });
}

/** Resume after a reload/app restart, or fetch the result of a finished session. */
async function getSession(userId, sessionId) {
  const session = await MockSession.findOne({ _id: sessionId, user_id: userId }).lean();
  if (!session) throw AppError.notFound('SESSION_NOT_FOUND', 'Mock session not found');
  if (session.status === 'SUBMITTED') return presentResult(session, { alreadySubmitted: true });

  const now = new Date();
  if (session.status === 'EXPIRED' || deadlinePassed(session, now)) {
    throw AppError.conflict('SESSION_EXPIRED', 'This session has expired');
  }

  const docs = await Question.find({ _id: { $in: session.questions.map((q) => q.qid) } })
    .select(PUBLIC_QUESTION_FIELDS)
    .lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));

  return {
    sessionId: String(session._id),
    status: session.status,
    config: presentConfig(session.config),
    startedAt: session.started_at,
    expiresAt: session.expires_at,
    remainingSec: session.config.allow_pause ? null : Math.max(0, Math.floor((session.expires_at - now) / 1000)),
    questions: session.questions
      .map((sq) => byId.get(String(sq.qid)) && presentLiveQuestion(session, byId.get(String(sq.qid)), sq.seq))
      .filter(Boolean),
  };
}

module.exports = { createSession, submitSession, getSession, presentResult };
