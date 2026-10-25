'use strict';

const { Schema, model } = require('mongoose');

const VocabularyDailyWordSchema = new Schema(
  {
    user_id: { type: String, required: true },
    day: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    word_id: { type: Schema.Types.ObjectId, ref: 'VocabularyWord', required: true },
  },
  { collection: 'vocabulary_daily_words', timestamps: { createdAt: 'created_at', updatedAt: false } },
);

VocabularyDailyWordSchema.index({ user_id: 1, day: 1, word_id: 1 }, { name: 'uniq_vocabulary_daily_word', unique: true });
VocabularyDailyWordSchema.index({ user_id: 1, day: 1 }, { name: 'vocabulary_daily_target' });

module.exports = model('VocabularyDailyWord', VocabularyDailyWordSchema);
