'use strict';

const crypto = require('node:crypto');
const config = require('../config');

/**
 * Small stateless tokens: base64url(JSON payload) + "." + HMAC-SHA256, keyed by
 * AUTH_SECRET and a purpose string, so a token minted for one purpose (a Learn
 * quiz) can never be replayed as another (a login session, a mock alias).
 */

const b64 = (buf) => Buffer.from(buf).toString('base64url');
const mac = (purpose, body) => crypto.createHmac('sha256', config.auth.secret).update(`${purpose}\n${body}`).digest();

function signToken(purpose, payload, ttlSec, now = Date.now()) {
  const body = b64(JSON.stringify({ ...payload, exp: Math.floor(now / 1000) + ttlSec }));
  return `${body}.${b64(mac(purpose, body))}`;
}

/** The payload, or null when the token is malformed, forged, for another purpose or expired. */
function verifySignedToken(purpose, token, now = Date.now()) {
  if (typeof token !== 'string' || token.length > 4096) return null;
  const [body, sig, extra] = token.split('.');
  if (!body || !sig || extra !== undefined) return null;
  const expected = mac(purpose, body);
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!payload || typeof payload.exp !== 'number' || payload.exp * 1000 < now) return null;
  return payload;
}

/**
 * A stable, unguessable stand-in for a question id inside one mock session.
 * Live mock screens show only these, so nothing a student sees mid-test can be
 * sent to an answer-revealing endpoint (verify-answer, quiz check). 24 hex
 * characters, so it passes the same ObjectId validation as a real id.
 */
function mockQuestionAlias(sessionId, questionId) {
  return mac('mock-question-alias', `${sessionId}:${questionId}`).toString('hex').slice(0, 24);
}

module.exports = { signToken, verifySignedToken, mockQuestionAlias };
