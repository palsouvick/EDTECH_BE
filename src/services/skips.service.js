'use strict';

/**
 * Skipped questions of one student in one subject, from every place a question can be left
 * unanswered:
 *   Learn quizzes, daily challenge, plan tests   question_skips (grading.js -> recordSkip)
 *   mock and custom tests                        result.per_question outcome UNATTEMPTED / TIMED_OUT
 *
 * A skip is "open" until the student answers that question correctly after the last skip.
 * A skip is never taken to mean "does not know": each one gets a LIKELY reason from how it
 * happened (likelyReason), which the student can replace with their own (setReason).
 * Used by the learning analysis and the smart quiz (customTest preset "smart").
 */

const { QuestionSkip, MockSession, Question } = require('../models');
const AppError = require('../utils/AppError');

const MOCK_SKIP = new Set(['UNATTEMPTED', 'TIMED_OUT']);
const REASONS = Object.freeze(['too_difficult', 'unsure', 'forgot_concept', 'time_pressure', 'did_not_understand', 'ran_out_of_time']);

/**
 * Pure: the most likely reason for one skip, from facts only. Rules, first match wins:
 *   ran_out_of_time   the test's time ran out on it (TIMED_OUT)
 *   time_pressure     a timed test, among its last 15% of questions, under 15 s on it
 *   unsure            spent at least the planned time on it, then left it (worked on it, not sure)
 *   too_difficult     a hard question (difficulty >= 4) left quickly (under 15 s)
 *   did_not_understand  left within 15 s: not tried, often not read through
 *   unsure            anything else
 * `null` time (older data) skips the time rules.
 */
function likelyReason({ outcome, timed, seq, count, timeSec, difficulty, targetSec }) {
  if (outcome === 'TIMED_OUT') return 'ran_out_of_time';
  const quick = timeSec != null && timeSec < 15;
  if (timed && seq && count && seq > count * 0.85 && quick) return 'time_pressure';
  if (timeSec != null && targetSec && timeSec >= targetSec) return 'unsure';
  if (quick && difficulty >= 4) return 'too_difficult';
  if (quick) return 'did_not_understand';
  return 'unsure';
}

/** Every skip event: [{ qid, topic, at, count, source, timeSec, outcome, timed, seq, total }] plus the student's reasons. */
async function skipEvents(userId, subject) {
  const [stored, mocks] = await Promise.all([
    QuestionSkip.find({ user_id: userId, subject }).sort({ last_skipped_at: -1 }).limit(2000).select('question_id topic skip_count last_skipped_at last_time_sec source reason').lean(),
    // Tests of any subject: a full paper mixes subjects, so the question's own subject decides (below).
    MockSession.find({ user_id: userId, status: 'SUBMITTED' })
      .sort({ submitted_at: -1 })
      .limit(50)
      .select('submitted_at config.subject config.time_limit_min config.question_count result.per_question.qid result.per_question.topic result.per_question.outcome result.per_question.seq result.per_question.time_spent_sec')
      .lean(),
  ]);
  const reasons = new Map(stored.filter((s) => s.reason).map((s) => [String(s.question_id), s.reason]));
  const events = stored
    .filter((s) => s.skip_count > 0 && s.last_skipped_at)
    .map((s) => ({ qid: String(s.question_id), topic: s.topic, at: s.last_skipped_at, count: s.skip_count, source: s.source, timeSec: s.last_time_sec ?? null, outcome: 'UNATTEMPTED', timed: false }));

  const mockSkips = [];
  mocks.forEach((m, testIndex) => {
    for (const p of m.result?.per_question || []) {
      if (!MOCK_SKIP.has(p.outcome)) continue;
      mockSkips.push({
        qid: String(p.qid),
        topic: p.topic,
        at: m.submitted_at,
        count: 1,
        source: 'test',
        testId: String(m._id),
        testIndex, // 0 = the latest test
        timeSec: p.time_spent_sec ?? null,
        outcome: p.outcome,
        timed: m.config.time_limit_min != null,
        seq: p.seq,
        total: m.config.question_count,
        mockSubject: m.config.subject,
      });
    }
  });
  // Keep only this subject's questions (single-subject tests are known; mixed papers are looked up).
  const unknown = [...new Set(mockSkips.filter((e) => e.mockSubject !== subject).map((e) => e.qid))];
  const ofSubject = new Set(
    unknown.length ? (await Question.find({ _id: { $in: unknown }, subject }).select('_id').lean()).map((q) => String(q._id)) : [],
  );
  for (const e of mockSkips) if (e.mockSubject === subject || ofSubject.has(e.qid)) events.push(e);
  return { events, reasons };
}

/**
 * Pure: skips merged per question, with `open` = not answered correctly since the last skip.
 * @param {Array<{qid, topic, at: Date, count}>} events
 * @param {Array<{qid, correct: boolean, at: Date}>} answers
 * @returns {Map<string, {qid, topic, count, lastAt: Date, open: boolean, events: object[]}>}
 */
function mergeSkips(events, answers) {
  const byQ = new Map();
  for (const e of events) {
    const s = byQ.get(e.qid) || { qid: e.qid, topic: e.topic, count: 0, lastAt: e.at, events: [] };
    s.count += e.count;
    s.events.push(e);
    if (e.at > s.lastAt) s.lastAt = e.at;
    byQ.set(e.qid, s);
  }
  const lastCorrect = new Map();
  for (const a of answers) {
    if (!a.correct) continue;
    const prev = lastCorrect.get(a.qid);
    if (!prev || a.at > prev) lastCorrect.set(a.qid, a.at);
  }
  for (const s of byQ.values()) {
    const fixedAt = lastCorrect.get(s.qid);
    s.open = !fixedAt || fixedAt < s.lastAt;
  }
  return byQ;
}

/** The student's own reason for a skipped question (null clears it). */
async function setReason(userId, questionId, reason) {
  const q = await Question.findOne({ _id: questionId, status: 'PUBLISHED' }).select('subject topic').lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  await QuestionSkip.updateOne(
    { user_id: userId, question_id: q._id },
    { $set: { reason }, $setOnInsert: { subject: q.subject, topic: q.topic, source: 'tag', skip_count: 0 } },
    { upsert: true },
  );
  return { questionId: String(q._id), reason };
}

module.exports = { skipEvents, mergeSkips, likelyReason, setReason, REASONS };
