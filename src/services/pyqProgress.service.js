'use strict';

/**
 * A student's progress on real WBPSC past-paper questions, chapter by chapter (the "PYQ"
 * step of the Learn ladder). Counts only published real-paper questions (the same set as
 * /pyq) and the student's own recorded answers to them: a question counts as solved when
 * the student's latest answer to it was correct.
 */

const mongoose = require('mongoose');
const { Question, PracticeAttempt } = require('../models');

const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];

async function pyqProgress(userId, subject) {
  const pyqs = await Question.find({ status: 'PUBLISHED', subject, provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true }).select('_id topic').lean();
  const topicOf = new Map(pyqs.map((q) => [String(q._id), q.topic]));
  const latest = topicOf.size
    ? await PracticeAttempt.aggregate([
      { $match: { user_id: userId, subject, question_id: { $in: pyqs.map((q) => new mongoose.Types.ObjectId(q._id)) } } },
      { $sort: { created_at: -1 } },
      { $group: { _id: '$question_id', correct: { $first: '$correct' } } },
    ])
    : [];
  const topics = {};
  for (const topic of topicOf.values()) (topics[topic] ??= { total: 0, attempted: 0, solved: 0 }).total += 1;
  for (const a of latest) {
    const t = topics[topicOf.get(String(a._id))];
    if (!t) continue;
    t.attempted += 1;
    if (a.correct) t.solved += 1;
  }
  return { subject, topics };
}

module.exports = { pyqProgress };
