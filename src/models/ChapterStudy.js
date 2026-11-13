'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's reading of one Math/English Learn chapter: which lesson sections they
 * have read and how long they spent reading (first time) and revising (re-reading a chapter they
 * had already finished). Question-solving time is not kept here: it comes from the answers
 * themselves (practice_attempts.time_spent_sec, mock per-question time).
 *
 * Filled by POST /me/study-log heartbeats from the chapter page (at most one per minute of
 * visible time), so it measures time with the page open in front of the student.
 */
const MAX_SECTIONS = 30;

const ChapterStudySchema = new Schema(
  {
    user_id: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    sections_read: { type: [String], default: [] },
    sections_total: { type: Number, min: 1, max: MAX_SECTIONS, default: null },
    read_sec: { type: Number, min: 0, default: 0 },
    revise_sec: { type: Number, min: 0, default: 0 },
    completed_at: { type: Date, default: null }, // every section read once
    last_read_at: { type: Date, default: null },
    last_revised_at: { type: Date, default: null },
  },
  { collection: 'chapter_study', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

ChapterStudySchema.index({ user_id: 1, subject: 1, topic: 1 }, { name: 'uniq_user_chapter', unique: true });

module.exports = model('ChapterStudy', ChapterStudySchema);
module.exports.MAX_SECTIONS = MAX_SECTIONS;
