'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { verifyAnswerLimiter } = require('../middleware/rateLimiters');
const { objectId, optionId } = require('../validators/common');
const challenge = require('../services/challenge.service');

// Open to everyone; a signed-in student's first attempt of the day is saved.
const router = Router();
// Minutes east of UTC: the challenge day follows the student's clock.
const tz = z.coerce.number().int().min(-720).max(840).default(330);

router.get('/today', validate({ query: z.object({ tz }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await challenge.getToday(req.valid.query, req.user?.id) });
});

const submitBody = z.object({
  tz,
  answers: z.array(z.object({ questionId: objectId, selectedOptionId: optionId.nullable(), timeSpentSec: z.number().min(0).max(3600).optional() })).min(1).max(5),
});
router.post('/today', verifyAnswerLimiter, validate({ body: submitBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await challenge.submitToday(req.valid.body, req.user?.id) });
});

module.exports = router;
