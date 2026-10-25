'use strict';

const { Schema, model } = require('mongoose');

const VocabularySettingsSchema = new Schema(
  {
    user_id: { type: String, required: true },
    daily_target: { type: Number, enum: [10, 15, 20], default: 10 },
    timezone_offset_min: { type: Number, min: -720, max: 840, default: 330 },
  },
  { collection: 'vocabulary_settings', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

VocabularySettingsSchema.index({ user_id: 1 }, { name: 'uniq_vocabulary_settings', unique: true });

module.exports = model('VocabularySettings', VocabularySettingsSchema);
