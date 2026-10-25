'use strict';

const { Schema, model } = require('mongoose');

const OptionSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true, maxlength: 600 },
  },
  { _id: false },
);

const ItemSchema = new Schema(
  {
    question_id: { type: String, required: true },
    word_id: { type: Schema.Types.ObjectId, ref: 'VocabularyWord', required: true },
    mode: { type: String, required: true },
    prompt: { type: String, required: true, maxlength: 1000 },
    options: { type: [OptionSchema], required: true },
    correct_option_id: { type: String, required: true },
    selected_option_id: { type: String, default: null },
    is_correct: { type: Boolean, default: null },
  },
  { _id: false },
);

const VocabularyPracticeSessionSchema = new Schema(
  {
    token_hash: { type: String, required: true },
    user_id: { type: String, default: null },
    items: { type: [ItemSchema], required: true },
    expires_at: { type: Date, required: true },
  },
  { collection: 'vocabulary_practice_sessions', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

VocabularyPracticeSessionSchema.index({ token_hash: 1 }, { name: 'uniq_vocabulary_session_token', unique: true });
VocabularyPracticeSessionSchema.index({ expires_at: 1 }, { name: 'vocabulary_session_expiry', expireAfterSeconds: 0 });

module.exports = model('VocabularyPracticeSession', VocabularyPracticeSessionSchema);
