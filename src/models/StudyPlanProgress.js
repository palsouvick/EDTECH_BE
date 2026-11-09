'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's place in a study plan (db/plans): the day they started, their study
 * time and exam date, the tasks they ticked and their test results. The plan's days are fixed (services/studyPlan.service.js), so only
 * the start date and task ids are stored. One row per student and plan.
 */
const StudyPlanProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    plan: { type: String, required: true, enum: ['CLERKSHIP_60', 'IDO'] },
    start_date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // the student's local date
    done: { type: [String], default: [] }, // task ids, "d12-3"
    // Chosen length of a variable-length plan (IDO: 30/45/60 days); null for fixed plans.
    plan_days: { type: Number, enum: [30, 45, 60], default: null },
    // Layout version the ticks were made against (db/plans clerkship60 VERSION); older ticks are cleared.
    plan_version: { type: Number, default: 1 },
    daily_minutes: { type: Number, enum: [120, 180, 240, 360], default: 180 },
    exam_date: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, default: null },
    // Best daily/weekly/full-mock result per plan day: { correct, total, accuracy, bySubject, byTopic, ... }.
    tests: { type: Schema.Types.Mixed, default: {} },
  },
  { collection: 'study_plan_progress', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

StudyPlanProgressSchema.index({ user_id: 1, plan: 1 }, { name: 'uniq_user_study_plan', unique: true });

module.exports = model('StudyPlanProgress', StudyPlanProgressSchema);
