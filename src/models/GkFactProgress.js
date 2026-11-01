'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's state for one GK fact: bookmarked, and where it is in
 * fact revision. Revision uses the same intervals as question revision
 * (ReviewItem: 1, 3, 7, 21 days): "I knew it" moves the fact one step on,
 * "Revise again" sends it back to tomorrow, and knowing it at the last step
 * marks it mastered. One row per student and fact, always queried by user_id.
 */
const GkFactProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    fact_id: { type: Schema.Types.ObjectId, ref: 'GkFact', required: true },
    topic: { type: String, required: true }, // the fact's card, for per-card counts without a join
    bookmarked: { type: Boolean, default: false },
    seen_at: { type: Date, default: null },
    last_result: { type: String, enum: ['known', 'again', null], default: null },
    stage: { type: Number, default: 0 }, // index into the revision intervals for the next "known"
    reviews: { type: Number, default: 0 },
    due_at: { type: Date, default: null }, // null until the fact is first reviewed
    status: { type: String, enum: ['new', 'learning', 'mastered'], default: 'new' },
  },
  { collection: 'gk_fact_progress', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

GkFactProgressSchema.index({ user_id: 1, fact_id: 1 }, { name: 'uniq_user_gk_fact', unique: true });
// Revision centre: a student's facts due for revision, soonest first.
GkFactProgressSchema.index({ user_id: 1, status: 1, due_at: 1 }, { name: 'user_gk_fact_due' });
// Bookmarks, newest first.
GkFactProgressSchema.index({ user_id: 1, bookmarked: 1, updated_at: -1 }, { name: 'user_gk_fact_bookmarks' });

module.exports = model('GkFactProgress', GkFactProgressSchema);
