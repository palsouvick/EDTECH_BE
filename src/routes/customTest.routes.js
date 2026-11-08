'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { createSessionLimiter, verifyAnswerLimiter } = require('../middleware/rateLimiters');
const { testBody, optionsQuery, historyQuery, sessionParams, checkBody } = require('../validators/customTest.schemas');
const service = require('../services/customTest.service');

// Custom chapter tests are built from the student's own progress and mistakes, and stored
// with their history, so they need a signed-in student (like mock tests).
const router = Router();
router.use(requireAuth);
router.use((_req, res, next) => {
  res.set('Cache-Control', 'private, no-store');
  next();
});

router.get('/options', validate({ query: optionsQuery }), async (req, res) => {
  res.json({ success: true, data: await service.getOptions(req.user.id, req.valid.query) });
});

router.post('/preview', validate({ body: testBody }), async (req, res) => {
  res.json({ success: true, data: await service.previewTest(req.user.id, req.valid.body) });
});

router.post('/', createSessionLimiter, validate({ body: testBody }), async (req, res) => {
  res.status(201).json({ success: true, data: await service.createTest(req.user.id, req.valid.body) });
});

router.get('/history', validate({ query: historyQuery }), async (req, res) => {
  res.json({ success: true, data: await service.getHistory(req.user.id, req.valid.query) });
});

// One answer per question, only for the student's own practice test; same ceiling as verify-answer.
router.post('/:sessionId/check', verifyAnswerLimiter, validate({ params: sessionParams, body: checkBody }), async (req, res) => {
  res.json({ success: true, data: await service.checkAnswer(req.user.id, req.valid.params.sessionId, req.valid.body) });
});

router.get('/:sessionId/report', validate({ params: sessionParams }), async (req, res) => {
  res.json({ success: true, data: await service.getReport(req.user.id, req.valid.params.sessionId) });
});

module.exports = router;
