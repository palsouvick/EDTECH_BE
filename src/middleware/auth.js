'use strict';

const config = require('../config');
const AppError = require('../utils/AppError');
const { verifyToken } = require('../services/auth.service');

/** Minimal Cookie header parser (no dependency): "a=1; b=2" -> { a: '1', b: '2' }. */
function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/**
 * Who is calling, in order:
 *  1. a session token: the httpOnly cookie set at login, or `Authorization: Bearer` (apps);
 *  2. req.user already set by an upstream gateway;
 *  3. non-production only: an `x-user-id` header, so tests and curl work without logging in.
 */
function resolveUser(req) {
  const bearer = /^Bearer (.+)$/i.exec(req.get('authorization') || '')?.[1];
  const payload = verifyToken(bearer || readCookie(req, config.auth.cookieName));
  if (payload) return { id: payload.sub, viaSession: true };
  if (req.user?.id) return req.user;
  if (!config.isProd) {
    const devId = req.get('x-user-id');
    if (devId && /^[\w-]{1,64}$/.test(devId)) return { id: devId };
  }
  return null;
}

function optionalAuth(req, _res, next) {
  req.user = resolveUser(req) || undefined;
  next();
}

function requireAuth(req, _res, next) {
  const user = resolveUser(req);
  if (!user) return next(new AppError(401, 'UNAUTHENTICATED', 'Please log in to continue'));
  req.user = user;
  next();
}

module.exports = { optionalAuth, requireAuth, readCookie };
