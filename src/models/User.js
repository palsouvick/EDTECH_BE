'use strict';

const { Schema, model } = require('mongoose');

/** A student account. Passwords are stored only as a scrypt hash (see services/auth.service.js). */
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    // Weekly leaderboard: off unless the student turns it on (rankings can discourage weaker students).
    leaderboard_opt_in: { type: Boolean, default: false },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    mobile: { type: String, trim: true, match: /^[6-9]\d{9}$/ },
    password_hash: { type: String, required: true, select: false },
    last_login_at: { type: Date },
    // The exam the student is preparing for (a catalogue code such as
    // 'WBPSC_CLERKSHIP', or null). Changing it never deletes progress,
    // attempts, mistakes or plans — it only re-scopes what is shown.
    target_exam: { type: String, default: null },
    target_exam_date: { type: Date, default: null },
    target_exam_set_at: { type: Date, default: null },
    // Daily available study time, minutes a day. The same budget set both
    // study plans offer (db/plans/clerkship60.js and db/plans/ido.js);
    // null = the student has not chosen one yet. A profile field, not an
    // exam field — changing or clearing the target exam leaves it alone.
    daily_study_minutes: { type: Number, enum: [120, 180, 240, 360], default: null },
    // Preferred study language (medium). Live UI languages only — Hindi
    // strings exist in content, but 'hi' is not a live UI language
    // (FE hooks/useLanguagePreference.js offers en/bn only). Null = not
    // chosen yet; the device language applies until it is set.
    preferred_language: { type: String, enum: ['en', 'bn'], default: null },
  },
  { collection: 'users', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

UserSchema.index({ email: 1 }, { name: 'uniq_email', unique: true });
// Partial, so accounts without a mobile number do not collide on a missing value.
UserSchema.index({ mobile: 1 }, { name: 'uniq_mobile', unique: true, partialFilterExpression: { mobile: { $type: 'string' } } });

module.exports = model('User', UserSchema);
