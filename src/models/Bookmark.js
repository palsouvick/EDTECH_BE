'use strict';

const { Schema, model } = require('mongoose');

/**
 * "Bookmark for revision". One row per (user, question); taxonomy is
 * denormalised so a revision list per topic needs no join.
 */
const BookmarkSchema = new Schema(
  {
    user_id: { type: String, required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
  },
  {
    collection: 'bookmarks',
    timestamps: { createdAt: 'created_at', updatedAt: false },
  },
);

BookmarkSchema.index({ user_id: 1, question_id: 1 }, { name: 'uniq_user_question', unique: true });
// Revision list: "my bookmarks in Profit & Loss, newest first".
BookmarkSchema.index({ user_id: 1, subject: 1, topic: 1, created_at: -1 }, { name: 'user_topic_recent' });

module.exports = model('Bookmark', BookmarkSchema);
