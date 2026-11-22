'use strict';

const { Schema, model } = require('mongoose');

/**
 * A run of pages in a student's course PDF that covers one chapter ("Profit & Loss: pages
 * 412-447"). Made automatically after processing (source auto / filename); the student can
 * fix the chapter or the page range (source manual), and manual sections survive reprocessing.
 * subject/topic null = a part that matches no syllabus chapter ("Other").
 */
const CourseSectionSchema = new Schema(
  {
    user_id: { type: String, required: true },
    file_id: { type: Schema.Types.ObjectId, ref: 'CourseFile', required: true },
    subject: { type: String, default: null },
    topic: { type: String, default: null },
    label: { type: String, default: null, maxlength: 120 }, // the student's own name for an "Other" part
    from: { type: Number, required: true },
    to: { type: Number, required: true },
    // toc: from the book's contents page; auto: page by page; filename: from the file name.
    source: { type: String, enum: ['auto', 'toc', 'filename', 'manual'], default: 'auto' },
    confidence: { type: Number, default: 0 }, // share of pages in the run that matched the chapter
  },
  { collection: 'course_sections', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

CourseSectionSchema.index({ file_id: 1, from: 1 }, { name: 'file_sections' });
CourseSectionSchema.index({ user_id: 1, subject: 1, topic: 1 }, { name: 'user_topic_sections' });

module.exports = model('CourseSection', CourseSectionSchema);
