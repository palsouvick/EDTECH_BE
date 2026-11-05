'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { getPerformance } = require('../services/performance.service');
const { getInsights, getLeaderboard, setLeaderboardOptIn } = require('../services/insights.service');
const { pyqProgress } = require('../services/pyqProgress.service');

const router = Router();
router.use(requireAuth);

// tz = minutes east of UTC, for "today" and the streak (India: 330).
const performanceQuery = z.object({ tz: z.coerce.number().int().min(-720).max(840).default(330) });

router.get('/performance', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getPerformance(req.user.id, req.valid.query.tz) });
});

// Mastery map, weak question patterns, badges and the protected streak.
router.get('/insights', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getInsights(req.user.id, req.valid.query.tz) });
});

// Weekly leaderboard: opt-in only (shown with "First L." names).
router.get('/leaderboard', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getLeaderboard(req.user.id) });
});
router.put('/leaderboard', validate({ body: z.object({ optIn: z.boolean() }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await setLeaderboardOptIn(req.user.id, req.valid.body.optIn) });
});

// Past-paper questions answered per chapter of a subject (the Learn ladder's PYQ step).
router.get('/pyq-progress', validate({ query: z.object({ subject: z.enum(['quant', 'english', 'gs', 'reasoning']) }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await pyqProgress(req.user.id, req.valid.query.subject) });
});

module.exports = router;
