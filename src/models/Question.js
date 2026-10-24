'use strict';

const crypto = require('node:crypto');
const { Schema, model } = require('mongoose');
const {
  LocalizedText,
  LocalizedMarkdown,
  languagesOf,
  hasAnyLanguage,
  langSetKey,
} = require('./schemas/localized');
const { EXAM_CATEGORIES, TIERS, QUESTION_STATUS, SLUG_RE } = require('./constants');
const { questionDuplicateKeys } = require('../utils/questionDuplicateKeys');

/**
 * Option ids are stable random strings, not "A/B/C/D": options are shuffled per
 * candidate, so the id must be independent of display position. Responses,
 * answer keys and trap notes all reference options by this id.
 */
const newOptionId = () => `opt_${crypto.randomBytes(4).toString('hex')}`;
const OPTION_ID_RE = /^opt_[a-z0-9]{4,16}$/;

const MediaSchema = new Schema(
  {
    url: { type: String, required: true, maxlength: 1024 },
    kind: { type: String, enum: ['image', 'svg', 'table'], default: 'image' },
    alt: { type: LocalizedText },
    width: Number,
    height: Number,
  },
  { _id: false },
);

const OptionSchema = new Schema(
  {
    oid: { type: String, required: true, default: newOptionId, match: OPTION_ID_RE },
    text: { type: LocalizedText, required: true, validate: hasAnyLanguage },
    media: { type: MediaSchema, default: undefined },
  },
  { _id: false },
);

/** A distractor and why candidates fall for it. option_id links it to the wrong option. */
const TrapSchema = new Schema(
  {
    option_id: { type: String, match: OPTION_ID_RE },
    note: { type: LocalizedMarkdown, required: true, validate: hasAnyLanguage },
  },
  { _id: false },
);

const SolutionSchema = new Schema(
  {
    // Ordered steps; each step carries all languages so steps stay aligned across translations.
    steps: { type: [LocalizedMarkdown], default: [] },
    shortcut: { type: LocalizedMarkdown, default: undefined },
    traps: { type: [TrapSchema], default: [] },
    video_url: { type: String, maxlength: 1024 },
  },
  { _id: false },
);

const ExamTargetSchema = new Schema(
  {
    category: { type: String, enum: EXAM_CATEGORIES, required: true },
    tier: { type: String, enum: TIERS, required: true },
  },
  { _id: false },
);

const PyqRefSchema = new Schema(
  {
    exam_name: { type: String, required: true, trim: true, maxlength: 120 }, // "SSC CGL", "WBCS"
    tier: { type: String, enum: TIERS }, // stage the question appeared in: TIER_1, PRELIMS...
    year: { type: Number, required: true, min: 1990, max: 2100 },
    shift: { type: String, trim: true, maxlength: 40 }, // "Shift 2" / "Morning"
    exam_date: { type: Date },
    question_code: { type: String, required: true, trim: true, maxlength: 80 }, // "SSC-CGL-2023-T1-S2-Q47"
    // The commission's own published paper (and answer key) this question was taken from.
    source_url: { type: String, trim: true, maxlength: 1024 },
    answer_key_url: { type: String, trim: true, maxlength: 1024 },
  },
  { _id: false },
);

const QuestionSchema = new Schema(
  {
    // Human-readable, editor-facing id: "QA-PL-000123".
    code: { type: String, required: true, trim: true, uppercase: true, maxlength: 40 },

    // ---- Taxonomy -------------------------------------------------------
    // A question is often valid for several exams (a P&L sum fits SSC, BANK and WB_POST).
    exam_targets: {
      type: [ExamTargetSchema],
      validate: { validator: (v) => v.length > 0, message: 'At least one exam target is required' },
    },
    subject: { type: String, required: true, match: SLUG_RE }, // "quant"
    topic: { type: String, required: true, match: SLUG_RE }, // "profit_loss"
    subtopic: { type: String, match: SLUG_RE }, // "marked_price_discount"
    concept_tags: { type: [String], default: [] }, // "successive_percentage"
    source_reference: { type: String, trim: true, maxlength: 1024 },
    source_year: { type: Number, min: 1990, max: 2100, validate: Number.isInteger },
    import_fingerprint: { type: String, match: /^[a-f\d]{64}$/i, select: false },
    duplicate_keys: { type: [String], default: undefined, select: false },
    difficulty: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger },
    // Question pattern within the chapter (a key from db/patterns/<subject>/<topic>.js),
    // set by src/services/patternTagger.js; absent when no pattern fits.
    pattern: { type: String, match: SLUG_RE },
    expected_time_sec: { type: Number, min: 5, max: 600, default: 60 },

    // Derived in pre('validate'); never written by clients. See langSetKey().
    lang_set: { type: String, required: true },

    // ---- Content --------------------------------------------------------
    stem: { type: LocalizedMarkdown, required: true, validate: hasAnyLanguage },
    media: { type: [MediaSchema], default: undefined },
    options: { type: [OptionSchema], required: true },

    // select:false on everything that reveals the answer. An API that forgets a
    // projection then leaks nothing; graders must opt in with .select('+correct_option_id').
    correct_option_id: { type: String, required: true, match: OPTION_ID_RE, select: false },
    solution: { type: SolutionSchema, default: () => ({}), select: false },

    // ---- PYQ ------------------------------------------------------------
    pyq: {
      is_pyq: { type: Boolean, default: false },
      refs: { type: [PyqRefSchema], default: [] },
    },
    // Denormalised max(pyq.refs.year). Scalar, so it can sit in the compound index
    // and drive recency weighting in mock generation without unwinding refs.
    latest_pyq_year: { type: Number, default: null },

    // ---- Aggregated performance ----------------------------------------
    // Written only by the batched stats flusher ($inc), never per-request.
    stats: {
      attempts: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
      total_time_ms: { type: Number, default: 0 },
    },

    // ---- Lifecycle ------------------------------------------------------
    status: { type: String, enum: QUESTION_STATUS, default: 'DRAFT' },
    version: { type: Number, default: 1 },
    authored_by: { type: String },
    reviewed_by: { type: String },
  },
  {
    collection: 'questions',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    minimize: false,
  },
);

QuestionSchema.pre('validate', function deriveAndCheck() {
  const options = this.options || [];
  this.duplicate_keys = questionDuplicateKeys(this.stem);

  if (options.length < 3 || options.length > 4) {
    this.invalidate('options', 'A question must have 3 or 4 options');
  }

  const ids = options.map((o) => o.oid);
  if (new Set(ids).size !== ids.length) {
    this.invalidate('options', 'Option ids must be unique within a question');
  }
  if (this.correct_option_id && !ids.includes(this.correct_option_id)) {
    this.invalidate('correct_option_id', 'correct_option_id must match one of the option ids');
  }
  for (const trap of this.solution?.traps || []) {
    if (trap.option_id && !ids.includes(trap.option_id)) {
      this.invalidate('solution.traps', `Trap references unknown option ${trap.option_id}`);
    }
    if (trap.option_id && trap.option_id === this.correct_option_id) {
      this.invalidate('solution.traps', 'A trap cannot point at the correct option');
    }
  }

  // A language counts as available only if the stem AND every option have it,
  // so a candidate in that language never sees a half-translated question.
  let langs = languagesOf(this.stem);
  for (const o of options) {
    const optLangs = languagesOf(o.text);
    langs = langs.filter((l) => optLangs.includes(l));
  }
  if (langs.length === 0) {
    this.invalidate('stem', 'Stem and all options must share at least one language');
  } else {
    this.lang_set = langSetKey(langs);
  }

  const refs = this.pyq?.refs || [];
  this.pyq.is_pyq = refs.length > 0;
  this.latest_pyq_year = refs.length ? Math.max(...refs.map((r) => r.year)) : null;
});

// ---- Indexes ------------------------------------------------------------
// Mirrored verbatim in db/indexes.mongo.js. autoIndex is off in production, so
// that script (run at deploy) is the source of truth there.

// Primary read path for practice and mock generation. All filters are equality
// or $in, so ESR order is satisfied; trailing keys provide the practice sort
// (easy first, newest PYQ first, stable _id) and cover the mock pool scan.
QuestionSchema.index(
  {
    'exam_targets.category': 1,
    subject: 1,
    topic: 1,
    lang_set: 1,
    difficulty: 1,
    latest_pyq_year: -1,
    _id: 1,
  },
  { name: 'qb_cat_subj_topic_lang_diff', partialFilterExpression: { status: 'PUBLISHED' } },
);

QuestionSchema.index({ code: 1 }, { name: 'uniq_code', unique: true });
QuestionSchema.index(
  { import_fingerprint: 1 },
  { name: 'uniq_import_fingerprint', unique: true, partialFilterExpression: { import_fingerprint: { $type: 'string' } } },
);
QuestionSchema.index({ duplicate_keys: 1 }, { name: 'question_duplicate_keys' });

QuestionSchema.index(
  { 'pyq.refs.question_code': 1 },
  {
    name: 'uniq_pyq_question_code',
    unique: true,
    partialFilterExpression: { 'pyq.is_pyq': true },
  },
);

QuestionSchema.index(
  { 'pyq.refs.exam_name': 1, 'pyq.refs.year': -1, 'pyq.refs.shift': 1 },
  { name: 'pyq_exam_year_shift', partialFilterExpression: { 'pyq.is_pyq': true } },
);

// Editorial CMS: review queues and topic listings regardless of status.
QuestionSchema.index(
  { status: 1, subject: 1, topic: 1, updated_at: -1 },
  { name: 'cms_status_subject_topic' },
);

// Basic dedupe/search for editors. default_language 'none' because MongoDB has
// no Bengali/Hindi stemmer; use Atlas Search with a custom analyzer for real search.
QuestionSchema.index(
  { 'stem.en': 'text', 'stem.bn': 'text', 'stem.hi': 'text' },
  { name: 'stem_text', default_language: 'none', language_override: 'text_lang' },
);

module.exports = model('Question', QuestionSchema);
module.exports.newOptionId = newOptionId;
module.exports.OPTION_ID_RE = OPTION_ID_RE;
