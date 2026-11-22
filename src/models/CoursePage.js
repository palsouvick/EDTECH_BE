'use strict';

const { Schema, model } = require('mongoose');

/**
 * The text of one page of a student's course PDF (from its text layer or OCR), kept for search
 * and for deciding which chapter the page belongs to. Never shown as the page itself: the reader
 * shows the original PDF page.
 */
const CoursePageSchema = new Schema(
  {
    user_id: { type: String, required: true },
    file_id: { type: Schema.Types.ObjectId, ref: 'CourseFile', required: true },
    page: { type: Number, required: true }, // 1-based
    text: { type: String, default: '' },
    // skipped: handwriting recognised early, so the page was not OCR'd.
    method: { type: String, enum: ['text', 'ocr', 'none', 'skipped'], default: 'none' },
    quality: { type: Number, default: null }, // OCR readability 0-1 (courseClassify textQuality)
    topic: { type: String, default: null }, // "quant/profit_loss" when the page alone says so
    score: { type: Number, default: 0 },
  },
  { collection: 'course_pages', versionKey: false },
);

CoursePageSchema.index({ file_id: 1, page: 1 }, { name: 'file_page', unique: true });
CoursePageSchema.index({ user_id: 1 }, { name: 'user_pages' });

module.exports = model('CoursePage', CoursePageSchema);
