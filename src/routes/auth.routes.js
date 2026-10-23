'use strict';

const { Router } = require('express');
const { z } = require('zod');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');
const config = require('../config');
const validate = require('../middleware/validate');
const auth = require('../services/auth.service');

const router = Router();

// Brute-force guard: per IP + email for login, per IP for registration.
const limiter = (limit, key) =>
  rateLimit({
    windowMs: 15 * 60_000,
    limit,
    keyGenerator: key,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({ success: false, error: { code: 'TOO_MANY_ATTEMPTS', message: 'Too many attempts. Try again in a few minutes.' } }),
  });
const loginLimiter = limiter(10, (req) => `login:${ipKeyGenerator(req.ip)}:${String(req.body?.email || '').toLowerCase()}`);
const registerLimiter = limiter(10, (req) => `register:${ipKeyGenerator(req.ip)}`);

const email = z.string().trim().toLowerCase().email('Enter a valid email').max(200);
const password = z.string().min(8, 'Password must be at least 8 characters').max(200);
// Optional Indian mobile; "+91", spaces and dashes are accepted and stripped. Empty means not provided.
const mobile = z.preprocess(
  (v) => {
    if (typeof v !== 'string') return v;
    const s = v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    return s === '' ? undefined : s;
  },
  z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number').optional(),
);
const registerBody = z.object({ name: z.string().trim().min(1, 'Enter your name').max(80), email, mobile, password });
const loginBody = z.object({ email, password: z.string().min(1).max(200) });

function setSession(req, res, token) {
  res.cookie(config.auth.cookieName, token, {
    httpOnly: true, // not readable by page scripts
    sameSite: 'lax',
    // Secure whenever the request came over HTTPS (behind a proxy: needs TRUST_PROXY_HOPS),
    // so a production build on plain http://localhost can still sign in.
    secure: req.secure,
    path: '/',
    maxAge: config.auth.sessionDays * 86400_000,
  });
}

router.post('/register', registerLimiter, validate({ body: registerBody }), async (req, res) => {
  const { user, token } = await auth.register(req.valid.body);
  setSession(req, res, token);
  res.status(201).json({ success: true, data: { user, token } });
});

router.post('/login', loginLimiter, validate({ body: loginBody }), async (req, res) => {
  const { user, token } = await auth.login(req.valid.body);
  setSession(req, res, token);
  res.json({ success: true, data: { user, token } });
});

router.post('/logout', (_req, res) => {
  res.clearCookie(config.auth.cookieName, { path: '/' });
  res.json({ success: true, data: { loggedOut: true } });
});

// Signed-in user, or { user: null }. Only real sessions count here, not dev headers.
router.get('/me', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const user = req.user?.viaSession ? await auth.getUser(req.user.id) : null;
  res.json({ success: true, data: { user } });
});

module.exports = router;
