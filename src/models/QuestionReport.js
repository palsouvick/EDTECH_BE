'use strict';

const { Schema, model } = require('mongoose');
const { LANGUAGES } = require('./constants');

const REPORT_REASONS = Object.freeze([
  'WRONG_ANSWER', // the marked answer key is incorrect
  'WRONG_EXPLANATION',
  'TRANSLATION', // Bengali/Hindi text does not match the English
  'TYPO',
  'UNCLEAR',
  'OTHER',
]);

/** Student-reported content errors, triaged by editors in the CMS. */
const QuestionReportSchema = new Schema(
  {
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    user_id: { type: String, default: null }, // null for anonymous practice
    reason: { type: String, enum: REPORT_REASONS, required: true },
    message: { type: String, trim: true, maxlength: 1000 },
    language: { type: String, enum: LANGUAGES }, // language the student was reading in
    status: { type: String, enum: ['OPEN', 'RESOLVED', 'REJECTED'], default: 'OPEN' },
  },
  {
    collection: 'question_reports',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

// Editor triage queue: most-reported questions first is an aggregation over this.
QuestionReportSchema.index({ status: 1, question_id: 1, created_at: -1 }, { name: 'triage_queue' });
// One open report per user, question and reason; repeat taps are idempotent.
QuestionReportSchema.index(
  { question_id: 1, user_id: 1, reason: 1 },
  {
    name: 'uniq_open_user_report',
    unique: true,
    partialFilterExpression: { status: 'OPEN', user_id: { $type: 'string' } },
  },
);

module.exports = model('QuestionReport', QuestionReportSchema);
module.exports.REPORT_REASONS = REPORT_REASONS;
