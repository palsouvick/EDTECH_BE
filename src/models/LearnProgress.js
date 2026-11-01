'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's Learn quiz progress for one chapter level, so it follows
 * them across devices and logins. Mirrors the browser's local copy
 * (frontend lib/learnProgress.js): best score, the question ids already seen
 * (so a repeat attempt gets new questions) and recent hard-bank patterns.
 * Merging keeps the better best score and the union of seen ids.
 */
const MAX_SEEN = 500;

const LearnProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    best: {
      correct: { type: Number, min: 0 },
      total: { type: Number, min: 1 },
    },
    seen: { type: [String], default: [] },
    fingerprints: { type: [String], default: [] },
    patterns: { type: [String], default: [] },
  },
  { collection: 'learn_progress', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

LearnProgressSchema.index({ user_id: 1, subject: 1, topic: 1, level: 1 }, { name: 'uniq_user_learn_level', unique: true });

module.exports = model('LearnProgress', LearnProgressSchema);
module.exports.MAX_SEEN = MAX_SEEN;
