'use strict';

const { Schema, model } = require('mongoose');

/**
 * A question a signed-in student left unanswered in a submitted Learn quiz or
 * daily challenge. Mock and custom tests keep their own skips (UNATTEMPTED /
 * TIMED_OUT in result.per_question) and are combined at read time
 * (services/tracker.service.js). A skip counts as "open" until the student
 * later answers that question correctly. The student may tag the reason.
 */
const QuestionSkipSchema = new Schema(
  {
    user_id: { type: String, required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    // learn / practice: a recorded skip. tag: only the student's reason for a mock/custom-test skip
    // (that skip itself lives in the MockSession), so skip_count stays 0 and it is not counted twice.
    source: { type: String, enum: ['learn', 'practice', 'tag'], default: 'learn' },
    skip_count: { type: Number, min: 0 }, // set by $inc on every recorded skip
    last_skipped_at: { type: Date },
    last_time_sec: { type: Number, min: 0, default: null }, // time on the question before skipping
    // Why, in the student's own words (optional): the tracker otherwise shows a likely reason.
    reason: { type: String, enum: ['too_difficult', 'unsure', 'forgot_concept', 'time_pressure', 'did_not_understand', 'ran_out_of_time', null], default: null },
  },
  { collection: 'question_skips', timestamps: { createdAt: 'created_at', updatedAt: false } },
);

QuestionSkipSchema.index({ user_id: 1, question_id: 1 }, { name: 'uniq_user_question', unique: true });
// The tracker: one student's skips in a subject.
QuestionSkipSchema.index({ user_id: 1, subject: 1, last_skipped_at: -1 }, { name: 'user_subject_recent' });

module.exports = model('QuestionSkip', QuestionSkipSchema);
