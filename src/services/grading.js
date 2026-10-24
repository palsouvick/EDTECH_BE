'use strict';

const { Question, PracticeAttempt } = require('../models');
const statsBuffer = require('./questionStats.buffer');
const review = require('./review.service');
const { compactLocalized } = require('./presenters');

/**
 * Marks a batch of answers (a quiz or the daily challenge) and returns every
 * question's answer and explanation. A signed-in student's answers count
 * towards "My performance", and their mistakes join the revision queue.
 * Skipped questions (selectedOptionId null) count as wrong but are not recorded.
 *
 * @param {Array<{ questionId, selectedOptionId, timeSpentSec? }>} answers
 * @param {{ userId?: string, source: 'learn'|'practice' }} opts
 */
async function gradeAnswers(answers, { userId, source }) {
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
    if (answered) {
      statsBuffer.record(q._id, { correct: isCorrect, timeSpentSec });
      if (userId) {
        PracticeAttempt.create({ user_id: userId, question_id: q._id, subject: q.subject, topic: q.topic, correct: isCorrect, time_spent_sec: timeSpentSec })
          .catch((err) => console.error(`[${source}] attempt not recorded:`, err.message));
        if (!isCorrect) review.recordMistake(userId, { questionId: q._id, subject: q.subject, topic: q.topic, selectedOptionId, source });
      }
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

module.exports = { gradeAnswers };
