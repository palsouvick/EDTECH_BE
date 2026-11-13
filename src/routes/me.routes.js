'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { getPerformance } = require('../services/performance.service');
const { getInsights, getLeaderboard, setLeaderboardOptIn } = require('../services/insights.service');
const { pyqProgress } = require('../services/pyqProgress.service');
const analysis = require('../services/analysis.service');
const skips = require('../services/skips.service');
const { ANALYSIS_SUBJECTS } = require('../services/analysis.logic');
const { language, slug, objectId } = require('../validators/common');

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

// ---- My learning analysis (Mathematics and English) ----
const analysisQuery = performanceQuery.extend({ language: language.default('en') });
const analysisParams = z.object({ subject: z.enum(ANALYSIS_SUBJECTS) });

// Both subjects side by side and the current focus across them.
router.get('/analysis', validate({ query: analysisQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.overview(req.user.id, req.valid.query) });
});

// One subject in full: chapters, focus, why, plans, trends, skips, weak questions, next Smart Quiz.
router.get('/analysis/:subject', validate({ params: analysisParams, query: analysisQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.analyseSubject(req.user.id, req.valid.params.subject, req.valid.query) });
});

// Reading heartbeat from a Learn chapter page (at most ~1 a minute of visible time).
const studyLogBody = z.object({
  subject: z.enum(ANALYSIS_SUBJECTS),
  topic: slug,
  kind: z.enum(['read', 'revise']).default('read'),
  seconds: z.number().int().min(0).max(120),
  section: z.string().regex(/^[a-zA-Z0-9_-]{1,40}$/).optional(),
  sectionsTotal: z.number().int().min(1).max(30).optional(),
});
router.post('/study-log', validate({ body: studyLogBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.logStudy(req.user.id, req.valid.body) });
});

// The student's own reason for a skipped question (null clears it).
router.put(
  '/skips/:questionId',
  validate({ params: z.object({ questionId: objectId }), body: z.object({ reason: z.enum(skips.REASONS).nullable() }) }),
  async (req, res) => {
    res.set('Cache-Control', 'private, no-store');
    res.json({ success: true, data: await skips.setReason(req.user.id, req.valid.params.questionId, req.valid.body.reason) });
  },
);

module.exports = router;
