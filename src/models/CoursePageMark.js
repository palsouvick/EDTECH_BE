'use strict';

const { Schema, model } = require('mongoose');

/**
 * A student's own marks on one page of their course PDF: read, bookmarked (⭐), and a short note.
 * One row per student, file and page; rows exist only for pages the student touched.
 */
const CoursePageMarkSchema = new Schema(
  {
    user_id: { type: String, required: true },
    file_id: { type: Schema.Types.ObjectId, ref: 'CourseFile', required: true },
    page: { type: Number, required: true },
    read: { type: Boolean, default: false },
    read_at: { type: Date, default: null },
    bookmarked: { type: Boolean, default: false },
    note: { type: String, default: '', maxlength: 1000 },
  },
  { collection: 'course_page_marks', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

CoursePageMarkSchema.index({ user_id: 1, file_id: 1, page: 1 }, { name: 'user_file_page', unique: true });
// "Bookmarks & notes": a student's marked pages, newest first.
CoursePageMarkSchema.index({ user_id: 1, updated_at: -1 }, { name: 'user_marks_recent' });

module.exports = model('CoursePageMark', CoursePageMarkSchema);
