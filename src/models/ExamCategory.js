'use strict';

const { Schema, model } = require('mongoose');
const { LocalizedText, hasAnyLanguage } = require('./schemas/localized');
const { EXAM_CATEGORIES, TIERS, SLUG_RE } = require('./constants');

/**
 * Exam catalogue + syllabus taxonomy. One document per category (4 total, a few
 * KB each). Read once at boot and cached in memory; drives menus, mock
 * blueprints and taxonomy validation.
 *
 * Taxonomy codes (subject/topic/subtopic) are global slugs: "quant.profit_loss"
 * means the same thing under SSC and BANK, so questions can be shared.
 */

const SubtopicSchema = new Schema(
  {
    code: { type: String, required: true, match: SLUG_RE },
    name: { type: LocalizedText, required: true, validate: hasAnyLanguage },
  },
  { _id: false },
);

const TopicNodeSchema = new Schema(
  {
    code: { type: String, required: true, match: SLUG_RE },
    name: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    subtopics: { type: [SubtopicSchema], default: [] },
  },
  { _id: false },
);

const SubjectSchema = new Schema(
  {
    code: { type: String, required: true, match: SLUG_RE },
    name: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    topics: { type: [TopicNodeSchema], default: [] },
  },
  { _id: false },
);

/** One section of a paper, e.g. SSC CGL Tier-1 "Quantitative Aptitude": 25 Qs x 2 marks, -0.5. */
const SectionPatternSchema = new Schema(
  {
    subject: { type: String, required: true, match: SLUG_RE },
    title: { type: LocalizedText, required: true },
    num_questions: { type: Number, required: true, min: 1 },
    // Either marks per question, or the section's maximum when the notice gives only that
    // (IBPS PO prelims: Quantitative Aptitude is 35 questions for 30 marks).
    marks_per_question: { type: Number, min: 0, required: function needsMarks() { return this.max_marks == null; } },
    max_marks: { type: Number, min: 0 },
    // Marks deducted per wrong answer. Left unset when the notice says there is negative
    // marking without the amount; the stage's negative_note then says so.
    negative_marks: { type: Number, min: 0 },
    sectional_time_min: { type: Number, min: 0 }, // Banking prelims have sectional timers
    session: { type: Number, min: 1 }, // SSC MTS: two timed sessions within one sitting
    note: { type: LocalizedText }, // e.g. "includes arithmetic" when the section spans our subjects
  },
  { _id: false },
);

const StageSchema = new Schema(
  {
    tier: { type: String, enum: TIERS, required: true },
    name: { type: LocalizedText, required: true },
    mode: { type: String, enum: ['CBT', 'OMR', 'OFFLINE', 'DESCRIPTIVE'], default: 'CBT' }, // OFFLINE: pen and paper, OMR not stated
    negative_note: { type: LocalizedText }, // "¼ of the marks for that question"; shown when sections leave negative_marks unset
    duration_min: { type: Number, min: 1 },
    languages_note: { type: LocalizedText }, // languages the official paper is offered in, as the notice words it
    note: { type: LocalizedText },
    sections: { type: [SectionPatternSchema], default: [] },
  },
  { _id: false },
);

/**
 * One past exam cycle, as held. Every figure carries the notice or report it
 * came from; nothing here is estimated.
 */
const ExamCycleSchema = new Schema(
  {
    year: { type: Number, required: true, min: 2000, max: 2100 }, // the cycle's name ("CGL 2025"), not always the year it was held
    stage: { type: LocalizedText, required: true }, // "Tier-1"
    dates: { type: String, maxlength: 120 }, // "12 Sep - 26 Sep 2025", as held
    vacancies: { type: Number, min: 0 },
    vacancies_note: { type: LocalizedText }, // "tentative"
    note: { type: LocalizedText }, // "rescheduled from ..."
    source_url: { type: String, required: true, maxlength: 500 },
    source_type: { type: String, enum: ['official', 'news'], default: 'official' },
  },
  { _id: false },
);

const ExamSchema = new Schema(
  {
    code: { type: String, required: true, uppercase: true, match: /^[A-Z0-9_]+$/ }, // "SSC_CGL"
    name: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    full_name: { type: LocalizedText }, // "Combined Graduate Level Examination"
    // How candidates are selected when there is no written paper (GDS: Class 10 merit).
    selection_note: { type: LocalizedText },
    stages: { type: [StageSchema], default: [] }, // first stage in full; we prepare students for it
    next_stages: { type: [LocalizedText], default: [] }, // names only: "Tier-2", "Mains", "Interview"
    pattern_as_of: { type: String, maxlength: 60 }, // "2025 notification"
    source_url: { type: String, maxlength: 500 }, // where the stage pattern was taken from
    cycles: { type: [ExamCycleSchema], default: [] }, // most recent first
    notes: { type: LocalizedText },
    is_active: { type: Boolean, default: true },
  },
  { _id: false },
);

const ExamCategorySchema = new Schema(
  {
    code: { type: String, enum: EXAM_CATEGORIES, required: true },
    name: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    conducting_body: { type: LocalizedText }, // "Staff Selection Commission"
    website: { type: String, maxlength: 300 },
    exams: { type: [ExamSchema], default: [] },
    subjects: { type: [SubjectSchema], default: [] },
    display_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  {
    collection: 'exam_categories',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

ExamCategorySchema.index({ code: 1 }, { name: 'uniq_code', unique: true });
ExamCategorySchema.index({ 'exams.code': 1 }, { name: 'uniq_exam_code', unique: true });

module.exports = model('ExamCategory', ExamCategorySchema);
