'use strict';

const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

/**
 * Default MemoryStore is per-process. With more than one instance behind a load
 * balancer, pass `store: new RedisStore(...)` (rate-limit-redis) to each limiter
 * so limits are global.
 */

// Authenticated users are limited per account (shared NAT on mobile networks in
// India puts thousands of students behind one IP); anonymous traffic per IP.
// ipKeyGenerator collapses IPv6 to a /56 so one host cannot rotate addresses.
const userOrIp = (req) => (req.user?.id ? `u:${req.user.id}` : `ip:${ipKeyGenerator(req.ip)}`);

function limiter({ windowMs, limit, code }) {
  return rateLimit({
    windowMs,
    limit,
    keyGenerator: userOrIp,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, _next, options) => {
      res.status(options.statusCode).json({
        success: false,
        error: {
          code,
          message: 'Too many requests, please slow down',
          retryAfterSec: Math.ceil(options.windowMs / 1000),
        },
      });
    },
  });
}

module.exports = {
  // Coarse ceiling for the whole API.
  apiLimiter: limiter({ windowMs: 60_000, limit: 300, code: 'RATE_LIMITED' }),
  // Each call reveals a correct answer, so this endpoint is the bank-scraping vector.
  verifyAnswerLimiter: limiter({ windowMs: 60_000, limit: 40, code: 'VERIFY_RATE_LIMITED' }),
  // Each quiz draws random questions from a chapter pool.
  learnQuizLimiter: limiter({ windowMs: 10 * 60_000, limit: 60, code: 'QUIZ_RATE_LIMITED' }),
  // Reports land in an editor queue; keep one person from flooding it.
  reportErrorLimiter: limiter({ windowMs: 10 * 60_000, limit: 10, code: 'REPORT_RATE_LIMITED' }),
  // Generation runs an aggregation over the question pool; the most expensive call we serve.
  createSessionLimiter: limiter({ windowMs: 10 * 60_000, limit: 10, code: 'MOCK_CREATE_RATE_LIMITED' }),
  submitSessionLimiter: limiter({ windowMs: 10 * 60_000, limit: 30, code: 'MOCK_SUBMIT_RATE_LIMITED' }),
};
