'use strict';

const { Schema, model } = require('mongoose');

const VocabularyDailyActivitySchema = new Schema(
  {
    user_id: { type: String, required: true },
    day: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    reviews: { type: Number, default: 0, min: 0 },
    questions_answered: { type: Number, default: 0, min: 0 },
    questions_correct: { type: Number, default: 0, min: 0 },
  },
  { collection: 'vocabulary_daily_activity', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

VocabularyDailyActivitySchema.index({ user_id: 1, day: 1 }, { name: 'uniq_vocabulary_daily_activity', unique: true });
VocabularyDailyActivitySchema.index({ user_id: 1, day: -1 }, { name: 'vocabulary_activity_history' });

module.exports = model('VocabularyDailyActivity', VocabularyDailyActivitySchema);
