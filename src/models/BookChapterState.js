'use strict';

const { Schema, model } = require('mongoose');

/**
 * An admin's publish decision for one study-book chapter (Admin Console → Books). When present it overrides the
 * `status` written in the chapter file (db/books/<book>/*.json), so the owner can publish or unpublish without
 * editing files. A chapter can only be published when its file says verification VERIFIED. Every change is kept in
 * `history`.
 */
const BookChapterStateSchema = new Schema(
  {
    book: { type: String, required: true },
    code: { type: String, required: true, match: /^HIS-\d{2}$/ },
    status: { type: String, enum: ['PUBLISHED', 'DRAFT'], required: true },
    set_by: { type: String, default: null }, // admin email
    set_at: { type: Date, default: null },
    history: {
      type: [{ _id: false, status: String, by: String, at: Date }],
      default: [],
    },
  },
  { collection: 'book_chapter_state', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

BookChapterStateSchema.index({ book: 1, code: 1 }, { name: 'uniq_book_chapter', unique: true });

module.exports = model('BookChapterState', BookChapterStateSchema);
