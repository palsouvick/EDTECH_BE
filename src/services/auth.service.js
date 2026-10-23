'use strict';

const crypto = require('node:crypto');
const { promisify } = require('node:util');
const config = require('../config');
const { User } = require('../models');
const AppError = require('../utils/AppError');

const scrypt = promisify(crypto.scrypt);
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };
const b64u = (buf) => Buffer.from(buf).toString('base64url');

// ---- Passwords: scrypt, per-user salt, "scrypt$N$r$p$salt$hash" ------------------
async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${b64u(salt)}$${b64u(hash)}`;
}

async function verifyPassword(password, stored) {
  const [alg, N, r, p, salt, hash] = String(stored).split('$');
  if (alg !== 'scrypt') return false;
  const expected = Buffer.from(hash, 'base64url');
  const actual = await scrypt(password, Buffer.from(salt, 'base64url'), expected.length, { N: +N, r: +r, p: +p });
  return crypto.timingSafeEqual(actual, expected);
}

// A real hash to compare against when the email is unknown, so response time
// does not reveal which emails are registered.
const DUMMY_HASH = hashPassword(crypto.randomBytes(16).toString('hex'));

// ---- Session tokens: compact HS256 JWT --------------------------------------------
function sign(payload) {
  const header = b64u(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64u(JSON.stringify(payload));
  const sig = b64u(crypto.createHmac('sha256', config.auth.secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${sig}`;
}

/** Returns the payload of a valid, unexpired token, else null. */
function verifyToken(token) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const expected = crypto.createHmac('sha256', config.auth.secret).update(`${header}.${body}`).digest();
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (typeof payload.sub !== 'string' || !(payload.exp > Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function issueToken(userId) {
  const now = Math.floor(Date.now() / 1000);
  return sign({ sub: String(userId), iat: now, exp: now + config.auth.sessionDays * 86400 });
}

const isAdminEmail = (email) => config.auth.adminEmails.includes(String(email || '').toLowerCase());

const presentUser = (u) => ({
  id: String(u._id),
  name: u.name,
  email: u.email,
  mobile: u.mobile ?? null,
  isAdmin: isAdminEmail(u.email),
  createdAt: u.created_at,
});

// ---- Use cases ------------------------------------------------------------------------
async function register({ name, email, mobile, password }) {
  const existing = await User.exists({ email });
  if (existing) throw AppError.conflict('EMAIL_TAKEN', 'An account with this email already exists');
  if (mobile && (await User.exists({ mobile }))) throw AppError.conflict('MOBILE_TAKEN', 'An account with this mobile number already exists');
  try {
    const user = await User.create({ name, email, ...(mobile && { mobile }), password_hash: await hashPassword(password), last_login_at: new Date() });
    return { user: presentUser(user), token: issueToken(user._id) };
  } catch (err) {
    if (err?.code === 11000) {
      const dupMobile = /mobile/.test(JSON.stringify(err.keyPattern ?? err.message));
      throw dupMobile
        ? AppError.conflict('MOBILE_TAKEN', 'An account with this mobile number already exists')
        : AppError.conflict('EMAIL_TAKEN', 'An account with this email already exists');
    }
    throw err;
  }
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password_hash');
  const ok = user ? await verifyPassword(password, user.password_hash) : (await verifyPassword(password, await DUMMY_HASH), false);
  // Same message for unknown email and wrong password.
  if (!ok) throw new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is incorrect');
  user.last_login_at = new Date();
  await user.save();
  return { user: presentUser(user), token: issueToken(user._id) };
}

async function getUser(userId) {
  if (!/^[a-f\d]{24}$/i.test(userId)) return null;
  const user = await User.findById(userId).lean();
  return user ? presentUser(user) : null;
}

module.exports = { register, login, getUser, verifyToken, issueToken, hashPassword, verifyPassword, isAdminEmail };
