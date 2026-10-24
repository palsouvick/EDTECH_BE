'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { verifyAnswerLimiter } = require('../middleware/rateLimiters');
const { slug, objectId, optionId } = require('../validators/common');
const review = require('../services/review.service');

// The revision queue and mistake notebook belong to an account.
const router = Router();
router.use(requireAuth);

// Minutes east of UTC, so "today" follows the student's clock (India: 330).
const tz = z.coerce.number().int().min(-720).max(840).default(0);
const noStore = (res) => res.set('Cache-Control', 'private, no-store');

router.get('/summary', validate({ query: z.object({ tz }) }), async (req, res) => {
  noStore(res);
  res.json({ success: true, data: await review.summary(req.user.id, req.valid.query) });
});

router.get('/due', validate({ query: z.object({ tz, limit: z.coerce.number().int().min(1).max(30).default(20) }) }), async (req, res) => {
  noStore(res);
  res.json({ success: true, data: await review.due(req.user.id, req.valid.query) });
});

const answerBody = z.object({ questionId: objectId, selectedOptionId: optionId, timeSpentSec: z.number().min(0).max(3600).optional() });
router.post('/answer', verifyAnswerLimiter, validate({ body: answerBody }), async (req, res) => {
  noStore(res);
  res.json({ success: true, data: await review.answer(req.user.id, req.valid.body) });
});

const mistakesQuery = z.object({
  status: z.enum(['active', 'mastered', 'all']).default('active'),
  subject: slug.optional(),
  topic: slug.optional(),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
router.get('/mistakes', validate({ query: mistakesQuery }), async (req, res) => {
  noStore(res);
  res.json({ success: true, data: await review.mistakes(req.user.id, req.valid.query) });
});

module.exports = router;
