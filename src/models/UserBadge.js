'use strict';

const { Schema, model } = require('mongoose');

/**
 * A badge a student has earned (see src/services/insights.service.js for the
 * list). Kept once earned, even if a chapter's accuracy later dips.
 */
const UserBadgeSchema = new Schema(
  {
    user_id: { type: String, required: true },
    key: { type: String, required: true, maxlength: 80 }, // "chapter_master:quant.percentage", "streak_7"
    earned_at: { type: Date, default: Date.now },
  },
  { collection: 'user_badges' },
);
UserBadgeSchema.index({ user_id: 1, key: 1 }, { name: 'uniq_user_badge', unique: true });

module.exports = model('UserBadge', UserBadgeSchema);
