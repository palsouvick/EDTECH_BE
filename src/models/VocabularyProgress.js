'use strict';

const { Schema, model } = require('mongoose');

const VocabularyProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    word_id: { type: Schema.Types.ObjectId, ref: 'VocabularyWord', required: true },
    learned: { type: Boolean, default: false },
    difficult: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    learned_at: { type: Date },
    next_review_at: { type: Date, default: null },
    interval_days: { type: Number, default: 0, min: 0, max: 365 },
    review_streak: { type: Number, default: 0, min: 0 },
    review_count: { type: Number, default: 0, min: 0 },
    miss_count: { type: Number, default: 0, min: 0 },
    last_reviewed_at: { type: Date },
  },
  { collection: 'vocabulary_progress', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

VocabularyProgressSchema.index({ user_id: 1, word_id: 1 }, { name: 'uniq_vocabulary_user_word', unique: true });
VocabularyProgressSchema.index({ user_id: 1, learned: 1, next_review_at: 1 }, { name: 'vocabulary_user_due' });
VocabularyProgressSchema.index({ user_id: 1, difficult: 1, favourite: 1, updated_at: -1 }, { name: 'vocabulary_user_filters' });

module.exports = model('VocabularyProgress', VocabularyProgressSchema);
