'use strict';

const { Schema, model } = require('mongoose');
const { EXAM_CATEGORIES, TIERS } = require('./constants');

/**
 * Official historical cut-offs, entered by editors from published results.
 * `source_url` is required: a cut-off shown to students must be traceable to
 * the commission's own notice, never estimated.
 */
const ExamCutoffSchema = new Schema(
  {
    category: { type: String, enum: EXAM_CATEGORIES, required: true }, // WBPSC
    exam_code: { type: String, required: true, uppercase: true }, // WBCS
    exam_name: { type: String, required: true }, // "WBCS"
    stage: { type: String, enum: TIERS, required: true }, // PRELIMS
    year: { type: Number, required: true, min: 1990, max: 2100 },
    reservation: { type: String, required: true, trim: true }, // "General", "OBC-A", "SC"
    score: { type: Number, required: true, min: 0 },
    max_score: { type: Number, required: true, min: 1 },
    source_url: { type: String, required: true, match: /^https?:\/\// },
    notes: { type: String, maxlength: 300 },
  },
  { collection: 'exam_cutoffs', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

ExamCutoffSchema.index(
  { category: 1, exam_code: 1, stage: 1, year: -1, reservation: 1 },
  { name: 'uniq_cutoff', unique: true },
);

module.exports = model('ExamCutoff', ExamCutoffSchema);
