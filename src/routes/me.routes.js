'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { getPerformance } = require('../services/performance.service');

const router = Router();
router.use(requireAuth);

// tz = minutes east of UTC, for "today" and the streak (India: 330).
const performanceQuery = z.object({ tz: z.coerce.number().int().min(-720).max(840).default(330) });

router.get('/performance', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getPerformance(req.user.id, req.valid.query.tz) });
});

module.exports = router;
