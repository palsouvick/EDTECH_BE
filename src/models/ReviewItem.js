'use strict';

const { Schema, model } = require('mongoose');

/**
 * One question in a student's revision queue (spaced repetition).
 *
 * A wrong answer or a bookmark puts the question in the queue, due the next
 * day. Each review moves it along REVIEW_INTERVALS_DAYS when answered right,
 * or back to the start when answered wrong; MASTER_AFTER correct answers in a
 * row retire it ("mastered"). A new mistake on a mastered question brings it back.
 * Taxonomy is denormalised so the queue and the mistake notebook need no join.
 */
const REVIEW_INTERVALS_DAYS = Object.freeze([1, 3, 7, 21]);
const MASTER_AFTER = 2;

const ReviewItemSchema = new Schema(
  {
    user_id: { type: String, required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    // Why it is here: a mistake, a bookmark, or both.
    from_mistake: { type: Boolean, default: false },
    from_bookmark: { type: Boolean, default: false },
    // Where the latest mistake was made, and the option chosen (for the notebook).
    last_wrong_option_id: { type: String, default: null },
    last_wrong_at: { type: Date, default: null },
    last_wrong_source: { type: String, enum: ['practice', 'learn', 'mock', 'review', null], default: null },
    wrong_count: { type: Number, default: 0 },
    // Spaced repetition state.
    stage: { type: Number, default: 0 }, // index into REVIEW_INTERVALS_DAYS for the next correct answer
    streak: { type: Number, default: 0 }, // correct reviews in a row
    reviews: { type: Number, default: 0 },
    due_at: { type: Date, required: true },
    status: { type: String, enum: ['active', 'mastered'], default: 'active' },
    mastered_at: { type: Date, default: null },
  },
  {
    collection: 'review_items',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

ReviewItemSchema.index({ user_id: 1, question_id: 1 }, { name: 'uniq_user_question', unique: true });
// "What is due today": active items by due date.
ReviewItemSchema.index({ user_id: 1, status: 1, due_at: 1 }, { name: 'user_status_due' });
// Mistake notebook: by chapter, newest mistake first.
ReviewItemSchema.index({ user_id: 1, from_mistake: 1, subject: 1, topic: 1, last_wrong_at: -1 }, { name: 'user_mistakes_topic' });

module.exports = model('ReviewItem', ReviewItemSchema);
module.exports.REVIEW_INTERVALS_DAYS = REVIEW_INTERVALS_DAYS;
module.exports.MASTER_AFTER = MASTER_AFTER;
