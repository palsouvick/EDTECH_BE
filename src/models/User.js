'use strict';

const { Schema, model } = require('mongoose');

/** A student account. Passwords are stored only as a scrypt hash (see services/auth.service.js). */
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    mobile: { type: String, trim: true, match: /^[6-9]\d{9}$/ },
    password_hash: { type: String, required: true, select: false },
    last_login_at: { type: Date },
  },
  { collection: 'users', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

UserSchema.index({ email: 1 }, { name: 'uniq_email', unique: true });
// Partial, so accounts without a mobile number do not collide on a missing value.
UserSchema.index({ mobile: 1 }, { name: 'uniq_mobile', unique: true, partialFilterExpression: { mobile: { $type: 'string' } } });

module.exports = model('User', UserSchema);
