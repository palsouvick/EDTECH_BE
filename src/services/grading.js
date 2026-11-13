'use strict';

const { Question, PracticeAttempt, QuestionSkip } = require('../models');
const statsBuffer = require('./questionStats.buffer');
const review = require('./review.service');
const { compactLocalized } = require('./presenters');

/**
 * Marks a batch of answers (a quiz or the daily challenge) and returns every
 * question's answer and explanation. A signed-in student's answers count
 * towards "My performance", and their mistakes join the revision queue.
 * Skipped questions (selectedOptionId null) count as wrong; they are not an attempt, but a
 * signed-in student's skip is kept (QuestionSkip) for the Math/English tracker and its smart quiz.
 *
 * @param {Array<{ questionId, selectedOptionId, timeSpentSec? }>} answers
 * @param {{ userId?: string, source: 'learn'|'practice', record?: boolean }} opts
 *   record: false marks without counting anything (a mid-test "Check answer").
 */
/** Keeps one skip per student and question (count + latest time). Never blocks marking. */
function recordSkip(userId, q, source, timeSpentSec) {
  const sec = Number.isFinite(timeSpentSec) && timeSpentSec >= 0 ? Math.min(Math.round(timeSpentSec), 3600) : null;
  return QuestionSkip.updateOne(
    { user_id: userId, question_id: q._id },
    {
      $set: { subject: q.subject, topic: q.topic, source: source === 'practice' ? 'practice' : 'learn', last_skipped_at: new Date(), last_time_sec: sec },
      $inc: { skip_count: 1 },
    },
    { upsert: true },
  ).catch((err) => console.error(`[${source}] skip not recorded:`, err.message));
}

async function gradeAnswers(answers, { userId, source, record = true }) {
  const docs = await Question.find({ _id: { $in: answers.map((a) => a.questionId) }, status: 'PUBLISHED' })
    .select('+correct_option_id +solution options.oid subject topic')
    .lean();
  const byId = new Map(docs.map((q) => [String(q._id), q]));

  const results = [];
  for (const { questionId, selectedOptionId, timeSpentSec } of answers) {
    const q = byId.get(questionId);
    if (!q) continue;
    const answered = Boolean(selectedOptionId) && q.options.some((o) => o.oid === selectedOptionId);
    const isCorrect = answered && selectedOptionId === q.correct_option_id;
    if (answered && record) {
      statsBuffer.record(q._id, { correct: isCorrect, timeSpentSec });
      if (userId) {
        PracticeAttempt.create({ user_id: userId, question_id: q._id, subject: q.subject, topic: q.topic, correct: isCorrect, time_spent_sec: timeSpentSec, source: source === 'learn' ? 'learn' : 'practice' })
          .catch((err) => console.error(`[${source}] attempt not recorded:`, err.message));
        if (!isCorrect) review.recordMistake(userId, { questionId: q._id, subject: q.subject, topic: q.topic, selectedOptionId, source });
      }
    } else if (!answered && record && userId) {
      recordSkip(userId, q, source, timeSpentSec);
    }
    const trap = answered && !isCorrect ? (q.solution?.traps || []).find((t) => t.option_id === selectedOptionId) : null;
    results.push({
      questionId,
      selectedOptionId: answered ? selectedOptionId : null,
      isCorrect,
      correctOptionId: q.correct_option_id,
      steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
      shortcut: compactLocalized(q.solution?.shortcut),
      trapForSelected: trap ? compactLocalized(trap.note) : null,
    });
  }
  return { results, score: { correct: results.filter((r) => r.isCorrect).length, total: results.length } };
}

/**
 * "Check answer" during a test: one question's answer and explanation, marked
 * but not recorded — the whole test is recorded once, when it is submitted.
 * Callers first make sure the question belongs to the student's signed test.
 */
async function peekAnswer({ questionId, selectedOptionId }) {
  const { results } = await gradeAnswers([{ questionId, selectedOptionId: selectedOptionId ?? null }], { source: 'learn', record: false });
  return results[0] ?? null;
}

module.exports = { gradeAnswers, peekAnswer, recordSkip };
