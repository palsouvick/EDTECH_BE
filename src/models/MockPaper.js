'use strict';

const { Schema, model } = require('mongoose');

const MOCK_PAPER_WARNINGS = Object.freeze(['option_count', 'duplicate_stem', 'figure_reference', 'answer_out_of_range']);
const MOCK_PAPER_LANGUAGES = Object.freeze(['en', 'bn', 'both']);
const MOCK_PAPER_STATUSES = Object.freeze(['DRAFT', 'PUBLISHED']);

/**
 * One question embedded in a MockPaper. Questions are never Question
 * documents: no code, pattern, subtopic, duplicate keys or provenance
 * fields exist here, and no bank validation ever runs on them.
 */
const MockPaperQuestionSchema = new Schema(
  {
    n: { type: Number, required: true },
    stem_en: { type: String, default: null },
    stem_bn: { type: String, default: null },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(v) {
          return Array.isArray(v) && v.length >= 2 && v.length <= 5 && v.every((s) => typeof s === 'string' && s.trim().length > 0);
        },
        message: 'options must be 2-5 non-empty strings',
      },
    },
    correct_index: { type: Number, default: null, min: 0 },
    explanation_en: { type: String, default: null },
    explanation_bn: { type: String, default: null },
    warnings: { type: [String], enum: MOCK_PAPER_WARNINGS, default: [] },
  },
  { _id: false },
);

const UnparsedBlockSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { _id: false },
);

const MockPaperSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    source_label: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, default: null },
    language: { type: String, enum: MOCK_PAPER_LANGUAGES, required: true },
    status: { type: String, enum: MOCK_PAPER_STATUSES, default: 'DRAFT' },
    created_by: { type: String, required: true },
    questions: { type: [MockPaperQuestionSchema], default: [] },
    unparsed: { type: [UnparsedBlockSchema], default: [] },
  },
  {
    collection: 'mock_papers',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

// Every stored question carries at least one non-empty stem.
MockPaperSchema.path('questions').validate(function (questions) {
  return (questions || []).every((q) => (q.stem_en && q.stem_en.trim()) || (q.stem_bn && q.stem_bn.trim()));
}, 'each question needs a non-empty stem_en and/or stem_bn');

MockPaperSchema.index({ status: 1, created_at: -1 }, { name: 'status_recent' });
MockPaperSchema.index({ created_by: 1, created_at: -1 }, { name: 'creator_recent' });

const MockPaper = model('MockPaper', MockPaperSchema);
MockPaper.MOCK_PAPER_WARNINGS = MOCK_PAPER_WARNINGS;
MockPaper.MOCK_PAPER_LANGUAGES = MOCK_PAPER_LANGUAGES;
MockPaper.MOCK_PAPER_STATUSES = MOCK_PAPER_STATUSES;

module.exports = MockPaper;
