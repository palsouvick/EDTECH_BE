'use strict';

const { Schema, model } = require('mongoose');

/**
 * The daily challenge: the same 5 mixed questions for everyone on a given
 * day (YYYY-MM-DD, the student's local date). Picked on the day's first
 * request and stored, so the set never changes during the day.
 */
const DailyChallengeSchema = new Schema(
  {
    _id: { type: String, match: /^\d{4}-\d{2}-\d{2}$/ }, // the day
    question_ids: { type: [Schema.Types.ObjectId], required: true },
  },
  { collection: 'daily_challenges', timestamps: { createdAt: 'created_at', updatedAt: false } },
);

/** One student's first attempt at a day's challenge (later attempts do not count). */
const DailyChallengeResultSchema = new Schema(
  {
    user_id: { type: String, required: true },
    day: { type: String, required: true },
    correct: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { collection: 'daily_challenge_results', timestamps: { createdAt: 'created_at', updatedAt: false } },
);
DailyChallengeResultSchema.index({ user_id: 1, day: 1 }, { name: 'uniq_user_day', unique: true });

module.exports = {
  DailyChallenge: model('DailyChallenge', DailyChallengeSchema),
  DailyChallengeResult: model('DailyChallengeResult', DailyChallengeResultSchema),
};
