'use strict';

const { Schema, model } = require('mongoose');
const { EXAM_CATEGORIES, LANGUAGES, SLUG_RE } = require('./constants');

/**
 * One generated mock attempt. The question list and its answer key are frozen
 * at creation, so later edits to the bank never change an in-flight test, and
 * submission needs exactly one document read.
 */

const SessionQuestionSchema = new Schema(
  {
    qid: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    seq: { type: Number, required: true },
    topic: { type: String, required: true },
    difficulty: { type: Number, required: true },
  },
  { _id: false },
);

const PerQuestionResultSchema = new Schema(
  {
    qid: Schema.Types.ObjectId,
    seq: Number,
    topic: String,
    difficulty: Number,
    selected_option_id: { type: String, default: null },
    correct_option_id: String,
    outcome: { type: String, enum: ['CORRECT', 'INCORRECT', 'UNATTEMPTED', 'TIMED_OUT'] },
    marks: Number,
    time_spent_sec: Number,
    marked_for_review: { type: Boolean, default: false },
  },
  { _id: false },
);

const MockSessionSchema = new Schema(
  {
    user_id: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'SUBMITTED', 'EXPIRED'], default: 'ACTIVE' },

    config: {
      category: { type: String, enum: EXAM_CATEGORIES, required: true },
      subject: { type: String, required: true, match: SLUG_RE },
      topic_ids: { type: [String], default: [] },
      language: { type: String, enum: LANGUAGES, default: 'en' },
      question_count: { type: Number, required: true },
      // Null only for untimed custom tests; every timed flow sets a number.
      time_limit_min: { type: Number, default: null },
      per_question_timer: { type: Boolean, default: false },
      per_question_limit_sec: { type: Number, default: null },
      allow_pause: { type: Boolean, default: true },
      marking: {
        positive: { type: Number, required: true },
        negative: { type: Number, required: true },
        // Where the marks came from (services/markingScheme.js): OFFICIAL, OFFICIAL_NO_NEGATIVE or PRACTICE.
        basis: { type: String, enum: ['OFFICIAL', 'OFFICIAL_NO_NEGATIVE', 'PRACTICE'] },
        exam_code: { type: String },
        source_url: { type: String },
      },
      // Live screens show per-session question aliases instead of real ids
      // (signedToken.mockQuestionAlias). Unset on sessions created before aliases existed.
      question_aliases: { type: Boolean, default: false },
    },

    // Set only on a student-built chapter test (services/customTest.service.js). Standard
    // mocks leave it unset, which is how the two are told apart (peers, history).
    custom: {
      type: new Schema(
        {
          preset: { type: String, enum: ['custom', 'weak', 'mistakes', 'quick10', 'mastery', 'challenge', 'followup'], required: true },
          mode: { type: String, enum: ['exam', 'practice'], required: true },
          difficulty: { type: String, enum: ['easy', 'moderate', 'hard', 'exam', 'mixed'], required: true },
          distribution: { type: String, enum: ['balanced', 'smart', 'mistakes'], required: true },
          topics: { type: [String], default: [] },
          plan: { type: [new Schema({ topic: String, count: Number, reasons: [String] }, { _id: false })], default: [] },
          recommended_min: Number,
          follow_up_of: { type: Schema.Types.ObjectId, default: null },
          // Practice mode: the first answer checked for each question (qid hex -> option id).
          // Locked once checked, so seeing the explanation cannot change the score.
          answers: { type: Map, of: String, default: undefined },
        },
        { _id: false },
      ),
      default: undefined,
    },

    questions: { type: [SessionQuestionSchema], required: true },
    // Frozen answer key, qid (hex) -> correct option id. Never selected by default.
    answer_key: { type: Map, of: String, select: false },

    started_at: { type: Date, required: true },
    expires_at: { type: Date, required: true },
    submitted_at: { type: Date },

    result: {
      type: new Schema(
        {
          score: Number,
          max_score: Number,
          correct: Number,
          incorrect: Number,
          unattempted: Number,
          timed_out: Number,
          accuracy_pct: Number,
          attempt_rate_pct: Number,
          negative_marks: Number,
          total_time_sec: Number,
          time_adjusted: Boolean,
          per_question: [PerQuestionResultSchema],
          topic_breakdown: [Schema.Types.Mixed],
          difficulty_breakdown: [Schema.Types.Mixed],
          strengths: [Schema.Types.Mixed],
          weaknesses: [Schema.Types.Mixed],
        },
        { _id: false },
      ),
      default: undefined,
    },
  },
  {
    collection: 'mock_sessions',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

// "My recent tests" + recently-served-question exclusion during generation.
MockSessionSchema.index({ user_id: 1, created_at: -1 }, { name: 'user_recent' });
// Peer percentile: submitted tests of the same kind (category, subject, length).
MockSessionSchema.index(
  { 'config.category': 1, 'config.subject': 1, 'config.question_count': 1, submitted_at: -1 },
  { name: 'peer_cohort', partialFilterExpression: { status: 'SUBMITTED' } },
);
// Custom practice history: a student's chapter tests, newest first.
MockSessionSchema.index(
  { user_id: 1, 'config.subject': 1, submitted_at: -1 },
  { name: 'user_custom_history', partialFilterExpression: { status: 'SUBMITTED', 'custom.mode': { $exists: true } } },
);
// Sweeper for abandoned sessions.
MockSessionSchema.index(
  { expires_at: 1 },
  { name: 'active_expiry', partialFilterExpression: { status: 'ACTIVE' } },
);

module.exports = model('MockSession', MockSessionSchema);
