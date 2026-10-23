'use strict';

const env = process.env.NODE_ENV || 'development';

const int = (v, d) => (v === undefined || v === '' ? d : Number.parseInt(v, 10));

// Signs session tokens. Production must set a long random AUTH_SECRET: with a
// guessable secret anyone could forge a login. Dev falls back to a fixed value.
const authSecret = process.env.AUTH_SECRET || (env === 'production' ? null : 'dev-only-insecure-auth-secret');
if (!authSecret || authSecret.length < 32) {
  if (env === 'production') throw new Error('AUTH_SECRET (at least 32 characters) is required in production');
}

module.exports = Object.freeze({
  env,
  isProd: env === 'production',
  port: int(process.env.PORT, 3000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edtech',
  // Number of proxy hops in front of the app (load balancer, CDN). Needed so
  // req.ip, and therefore IP rate limiting, sees the real client address.
  trustProxy: int(process.env.TRUST_PROXY_HOPS, 1),

  mock: {
    // Grace window for network latency on submit after the deadline.
    submitGraceSec: int(process.env.MOCK_SUBMIT_GRACE_SEC, 60),
    // Sessions that allow pausing cannot be wall-clock bounded; cap their lifetime instead.
    pausableSessionTtlHours: int(process.env.MOCK_PAUSABLE_TTL_HOURS, 72),
    // Exclude questions served in the user's last N sessions.
    recentSessionsToExclude: int(process.env.MOCK_RECENT_EXCLUDE, 5),
  },

  auth: {
    secret: authSecret,
    sessionDays: int(process.env.AUTH_SESSION_DAYS, 30),
    cookieName: 'edtech_session',
    // Comma-separated emails that may open the admin portal. Empty = nobody.
    adminEmails: (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  },

  seed: {
    // On startup, build indexes and fill missing reference data (see src/db/bootstrap.js). Idempotent.
    auto: process.env.AUTO_SEED !== 'false',
    // Every chapter is topped up to this many generated questions. 0 = skip.
    questionsPerTopic: int(process.env.SEED_QUESTIONS_PER_TOPIC, 300),
  },

  stats: {
    flushIntervalMs: int(process.env.STATS_FLUSH_MS, 5000),
    maxBufferedQuestions: int(process.env.STATS_MAX_BUFFER, 2000),
    // Below this many attempts, "percent correct" is noise and is not shown.
    minAttemptsForPercent: int(process.env.STATS_MIN_ATTEMPTS, 30),
  },
});
