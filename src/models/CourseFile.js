'use strict';

const { Schema, model } = require('mongoose');

/**
 * "My course": one PDF a student uploaded (purchased course material). Private to that
 * student: every query is by user_id. The file itself lives on disk (config.course.storageDir);
 * pages and sections are in CoursePage / CourseSection.
 *
 * status: queued -> processing -> ready (or failed). kind is decided while processing:
 * text (the PDF has a text layer), scanned (images, read by OCR), handwritten (OCR finds little;
 * chapters come from the file name), mixed.
 */
const CourseFileSchema = new Schema(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    original_name: { type: String, required: true, maxlength: 300 },
    stored_name: { type: String, required: true },
    size: { type: Number, required: true },
    // SHA-256 of the file's bytes: the same PDF uploaded again under another name is caught.
    content_hash: { type: String, default: null },
    pages: { type: Number, default: 0 },
    subject: { type: String, default: null }, // best guess: quant | english | gs | reasoning
    kind: { type: String, enum: ['text', 'scanned', 'handwritten', 'mixed', null], default: null },
    status: { type: String, enum: ['queued', 'processing', 'ready', 'failed'], default: 'queued' },
    progress: { done: { type: Number, default: 0 }, total: { type: Number, default: 0 } },
    ocr_available: { type: Boolean, default: true },
    error: { type: String, default: null },
    last_page: { type: Number, default: 1 }, // where the student stopped reading
    processed_at: { type: Date, default: null },
    // The worker reading the file reports here; a silent worker (90 s) is treated as gone.
    heartbeat_at: { type: Date, default: null },
    worker_token: { type: String, default: null },
  },
  { collection: 'course_files', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

CourseFileSchema.index({ user_id: 1, created_at: -1 }, { name: 'user_course_files' });
CourseFileSchema.index({ user_id: 1, content_hash: 1 }, { name: 'user_course_hash', partialFilterExpression: { content_hash: { $type: 'string' } } });

module.exports = model('CourseFile', CourseFileSchema);
