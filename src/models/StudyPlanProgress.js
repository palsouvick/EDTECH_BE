'use strict';

const { Schema, model } = require('mongoose');

/**
 * A signed-in student's place in a study plan (db/plans): the day they started and the
 * tasks they ticked. The plan's days are fixed (services/studyPlan.service.js), so only
 * the start date and task ids are stored. One row per student and plan.
 */
const StudyPlanProgressSchema = new Schema(
  {
    user_id: { type: String, required: true },
    plan: { type: String, required: true, enum: ['CLERKSHIP_60'] },
    start_date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // the student's local date
    done: { type: [String], default: [] }, // task ids, "d12-3"
  },
  { collection: 'study_plan_progress', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

StudyPlanProgressSchema.index({ user_id: 1, plan: 1 }, { name: 'uniq_user_study_plan', unique: true });

module.exports = model('StudyPlanProgress', StudyPlanProgressSchema);
