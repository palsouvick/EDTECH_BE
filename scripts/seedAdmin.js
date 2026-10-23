'use strict';

/**
 * Creates (or resets) the first admin account.
 *
 *   npm run admin:seed                     email = first entry of ADMIN_EMAILS
 *   npm run admin:seed -- --email a@b.com  explicit email (also add it to ADMIN_EMAILS)
 *   npm run admin:seed -- --password "..." choose the password (min 8 chars)
 *   npm run admin:seed -- --reset          overwrite the password of an existing account
 *
 * Without --password (or ADMIN_PASSWORD) a strong random password is generated and
 * printed ONCE. Existing accounts are left untouched unless --reset is given.
 */
const crypto = require('node:crypto');
const mongoose = require('mongoose');
const config = require('../src/config');
const { User } = require('../src/models');
const { hashPassword } = require('../src/services/auth.service');

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

async function main() {
  const email = (arg('email') || config.auth.adminEmails[0] || '').trim().toLowerCase();
  if (!email) throw new Error('No email: set ADMIN_EMAILS in .env or pass --email');
  const reset = process.argv.includes('--reset');
  const supplied = arg('password') || process.env.ADMIN_PASSWORD;
  if (supplied && supplied.length < 8) throw new Error('Password must be at least 8 characters');
  const generated = !supplied;
  const password = supplied || crypto.randomBytes(12).toString('base64url');

  await mongoose.connect(process.env.MONGODB_URI || config.mongoUri || 'mongodb://127.0.0.1:27017/edtech');
  const existing = await User.findOne({ email }).select('_id');
  if (existing && !reset) {
    console.log(`Admin account ${email} already exists. Use --reset to set a new password.`);
  } else {
    const password_hash = await hashPassword(password);
    if (existing) await User.updateOne({ _id: existing._id }, { $set: { password_hash } });
    else await User.create({ name: 'Admin', email, password_hash });
    console.log(`${existing ? 'Password reset for' : 'Created'} admin account: ${email}`);
    console.log(generated ? `Password (shown once, change it later): ${password}` : 'Password: the one you supplied');
  }
  if (!config.auth.adminEmails.includes(email)) console.log(`NOTE: add ${email} to ADMIN_EMAILS in .env, then restart the backend.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
