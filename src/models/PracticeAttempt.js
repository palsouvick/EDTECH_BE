'use strict';

const { Schema, model } = require('mongoose');

/**
 * One checked answer in practice by a signed-in student. Feeds "My
 * performance" (accuracy by subject/topic, daily activity, streak). Mock-test
 * answers live in their MockSession and are combined at read time.
 */
const PracticeAttemptSchema = new Schema(
  {
    user_id: { type: String, required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    category: { type: String }, // exam category the student practised under, when the client sent it
    correct: { type: Boolean, required: true },
    time_spent_sec: { type: Number, min: 0 },
  },
  { collection: 'practice_attempts', timestamps: { createdAt: 'created_at', updatedAt: false } },
);

PracticeAttemptSchema.index({ user_id: 1, created_at: -1 }, { name: 'user_recent' });
PracticeAttemptSchema.index({ user_id: 1, subject: 1, topic: 1 }, { name: 'user_topic' });
// Weekly leaderboard: everyone's answers in the last 7 days.
PracticeAttemptSchema.index({ created_at: -1 }, { name: 'recent_attempts' });

module.exports = model('PracticeAttempt', PracticeAttemptSchema);
