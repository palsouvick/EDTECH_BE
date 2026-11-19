'use strict';

const { Schema, model } = require('mongoose');

/**
 * F7 — a student's "Find My Starting Level" diagnostic for one exam: either
 * skipped (the offer is not shown again for that exam) or the latest
 * completed result. One document per student and exam; a retake replaces
 * the result and bumps `attempts`.
 *
 * This is deliberately NOT practice history: diagnostic answers are never
 * written as PracticeAttempts, mistakes or mastery, so a single short test
 * cannot permanently label a student. Recommendations read it only as a
 * starting signal (services/diagnostic.logic.js signalIsActive / OWN_DATA_MIN).
 */
const CountSchema = {
  total: Number,
  attempted: Number,
  unattempted: Number,
  correct: Number,
  wrong: Number,
  accuracy: { type: Number, default: null },
  score: { type: Number, default: null },
};

const TopicRowSchema = new Schema(
  { subject: String, topic: String, ...CountSchema, signal: String },
  { _id: false },
);

const DiagnosticResultSchema = new Schema(
  {
    user_id: { type: String, required: true },
    exam_code: { type: String, required: true, uppercase: true, match: /^[A-Z0-9_]+$/ },
    status: { type: String, enum: ['skipped', 'completed'], required: true },
    skipped_at: { type: Date, default: null },
    taken_at: { type: Date, default: null },
    attempts: { type: Number, default: 0 },
    basis: { type: String, enum: ['pattern', 'plan_notice', 'equal'] },
    starting_mastery: { type: Number, default: null },
    level: { type: String, default: null },
    summary: { type: Schema.Types.Mixed, default: null },
    sections: { type: [Schema.Types.Mixed], default: undefined },
    subjects: { type: [Schema.Types.Mixed], default: undefined },
    topics: { type: [TopicRowSchema], default: undefined },
  },
  { collection: 'diagnostic_results', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, minimize: false },
);

DiagnosticResultSchema.index({ user_id: 1, exam_code: 1 }, { name: 'uniq_user_exam', unique: true });

module.exports = model('DiagnosticResult', DiagnosticResultSchema);
