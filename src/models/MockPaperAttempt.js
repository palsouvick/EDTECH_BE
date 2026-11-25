'use strict';

const { Schema, model } = require('mongoose');

/**
 * One student's attempt at a MockPaper. The question order is frozen at
 * start (a permutation of indexes into the paper's questions array), so a
 * later edit to the paper can never change an in-flight attempt. This flow
 * touches only MockPaper + MockPaperAttempt — never MockSession or
 * ReviewItem — so mock-paper results feed no analysis, stuck or
 * leaderboard system.
 */
const AttemptAnswerSchema = new Schema(
  {
    question_index: { type: Number, required: true },
    selected: { type: Number, default: null },
  },
  { _id: false },
);

const MockPaperAttemptSchema = new Schema(
  {
    paper_id: { type: Schema.Types.ObjectId, ref: 'MockPaper', required: true },
    user_id: { type: String, required: true },
    order: { type: [Number], required: true },
    answers: { type: [AttemptAnswerSchema], default: [] },
    status: { type: String, enum: ['ACTIVE', 'SUBMITTED'], default: 'ACTIVE' },
    score: { type: Number, default: null },
    total: { type: Number, required: true },
    time_limit_min: { type: Number, required: true },
    started_at: { type: Date, default: Date.now },
    submitted_at: { type: Date, default: null },
  },
  {
    collection: 'mock_paper_attempts',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

MockPaperAttemptSchema.index({ paper_id: 1, user_id: 1, started_at: -1 }, { name: 'paper_user_recent' });
MockPaperAttemptSchema.index({ user_id: 1, started_at: -1 }, { name: 'user_recent' });

module.exports = model('MockPaperAttempt', MockPaperAttemptSchema);
