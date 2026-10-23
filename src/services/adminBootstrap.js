'use strict';

const crypto = require('node:crypto');
const config = require('../config');
const { User } = require('../models');
const { hashPassword } = require('./auth.service');

/**
 * Creates the first admin account on startup when it does not exist yet.
 * Email = first ADMIN_EMAILS entry. Password = ADMIN_PASSWORD (min 8 chars), or a
 * random one printed once. An existing account is never modified.
 */
async function ensureAdmin() {
  const email = config.auth.adminEmails[0];
  if (!email) return;
  if (await User.exists({ email })) return;

  const supplied = process.env.ADMIN_PASSWORD;
  if (supplied && supplied.length < 8) {
    console.warn('ADMIN_PASSWORD is shorter than 8 characters; admin account not created');
    return;
  }
  const password = supplied || crypto.randomBytes(12).toString('base64url');
  try {
    await User.create({ name: 'Admin', email, password_hash: await hashPassword(password) });
  } catch (e) {
    if (e.code === 11000) return; // another instance created it first
    throw e;
  }
  console.log(`Created initial admin account: ${email}`);
  if (!supplied) console.log(`Initial admin password (shown once, change it later): ${password}`);
}

module.exports = { ensureAdmin };
