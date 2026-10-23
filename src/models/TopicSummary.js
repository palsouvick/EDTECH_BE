'use strict';

const { Schema, model } = require('mongoose');
const { LocalizedText, LocalizedMarkdown, hasAnyLanguage } = require('./schemas/localized');
const { EXAM_CATEGORIES, TIERS, CONTENT_STATUS, SLUG_RE } = require('./constants');

/**
 * One document per (subject, topic[, subtopic]): the "read this before you
 * practise" sheet. All bodies are Markdown with KaTeX ($...$ / $$...$$).
 */

const FormulaSchema = new Schema(
  {
    key: { type: String, required: true, match: SLUG_RE }, // "profit_percent"
    label: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    // LaTeX is language-neutral, so it is stored once rather than per language.
    latex: { type: String, required: true, maxlength: 2000 },
    variables: {
      type: [
        new Schema(
          { symbol: { type: String, required: true }, meaning: { type: LocalizedText } },
          { _id: false },
        ),
      ],
      default: [],
    },
    explanation: { type: LocalizedMarkdown },
  },
  { _id: false },
);

const RuleSchema = new Schema(
  {
    title: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    body: { type: LocalizedMarkdown, required: true, validate: hasAnyLanguage },
  },
  { _id: false },
);

const SpeedTrickSchema = new Schema(
  {
    title: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    body: { type: LocalizedMarkdown, required: true, validate: hasAnyLanguage },
    // Worked examples live in the question bank, not duplicated here.
    example_question_ids: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    approx_time_saved_sec: { type: Number, min: 0 },
  },
  { _id: false },
);

/** Where this topic sits in each exam syllabus, plus observed weightage. */
const SyllabusMapSchema = new Schema(
  {
    category: { type: String, enum: EXAM_CATEGORIES, required: true },
    tier: { type: String, enum: TIERS, required: true },
    exam_codes: { type: [String], default: [] }, // ["SSC_CGL", "SSC_CHSL"]
    section: { type: LocalizedText }, // "Quantitative Aptitude"
    syllabus_text: { type: LocalizedMarkdown }, // wording from the official notification
    avg_questions_per_paper: { type: Number, min: 0 },
    years_analyzed: { type: [Number], default: [] },
  },
  { _id: false },
);

const TopicSummarySchema = new Schema(
  {
    slug: { type: String, required: true, lowercase: true, trim: true }, // "quant.profit_loss"
    subject: { type: String, required: true, match: SLUG_RE },
    topic: { type: String, required: true, match: SLUG_RE },
    subtopic: { type: String, match: SLUG_RE, default: null }, // null = topic-level sheet

    title: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    overview: { type: LocalizedMarkdown },
    formulas: { type: [FormulaSchema], default: [] },
    derivation_rules: { type: [RuleSchema], default: [] },
    speed_tricks: { type: [SpeedTrickSchema], default: [] },
    common_traps: { type: [LocalizedMarkdown], default: [] },
    syllabus_map: { type: [SyllabusMapSchema], default: [] },

    prerequisites: { type: [String], default: [] }, // topic slugs, e.g. "percentage"
    related_topics: { type: [String], default: [] },
    reading_time_min: { type: Number, min: 0 },

    status: { type: String, enum: CONTENT_STATUS, default: 'DRAFT' },
    version: { type: Number, default: 1 },
  },
  {
    collection: 'topic_summaries',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

TopicSummarySchema.index({ slug: 1 }, { name: 'uniq_slug', unique: true });
// Unique per node; subtopic:null is the topic-level sheet, so there is exactly one.
TopicSummarySchema.index(
  { subject: 1, topic: 1, subtopic: 1 },
  { name: 'uniq_subject_topic_subtopic', unique: true },
);
TopicSummarySchema.index(
  { 'syllabus_map.category': 1, 'syllabus_map.tier': 1, subject: 1 },
  { name: 'syllabus_category_tier_subject' },
);

module.exports = model('TopicSummary', TopicSummarySchema);
