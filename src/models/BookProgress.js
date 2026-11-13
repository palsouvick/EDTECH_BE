'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's reading progress in one study book (db/books): which sections of each chapter they
 * have read, where they stopped, their reading depth, and their practice / mini-test results per chapter and
 * section. Guests keep the same shape in the browser (frontend lib/bookProgress.js), merged in at login.
 *
 * chapters: { "HIS-02": { read: ["town_planning"], last_section, read_at, practice: {...}, mini: {...}, sections: { sid: { correct, total } } } }
 */
const BookProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    book: { type: String, required: true, enum: ['history', 'geography'] },
    depth: { type: String, enum: ['quick', 'standard', 'deep'], default: 'standard' },
    last: {
      chapter: { type: String, default: null },
      section: { type: String, default: null },
      at: { type: Date, default: null },
    },
    chapters: { type: Schema.Types.Mixed, default: {} },
  },
  { collection: 'book_progress', minimize: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

BookProgressSchema.index({ user_id: 1, book: 1 }, { name: 'uniq_user_book', unique: true });

module.exports = model('BookProgress', BookProgressSchema);
