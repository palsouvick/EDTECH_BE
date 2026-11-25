'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { createSessionLimiter, submitSessionLimiter } = require('../middleware/rateLimiters');
const { paperIdParams, attemptIdParams, submitAttemptBody } = require('../validators/mockPapers.schemas');
const service = require('../services/mockPapers.service');

/** Student mock papers: published papers only, never with answers before submit. */
const router = Router();

// Attempts belong to a user, so the whole section requires identity.
// Auth runs before the limiters so they key on user id, not IP.
router.use(requireAuth);

router.get('/', async (req, res) => {
  res.json({ success: true, data: await service.listPapers(req.user.id) });
});

router.get('/attempts/:attemptId', validate({ params: attemptIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.getAttempt(req.valid.params.attemptId, req.user.id) });
});

router.post('/attempts/:attemptId/submit', submitSessionLimiter, validate({ params: attemptIdParams, body: submitAttemptBody }), async (req, res) => {
  res.json({ success: true, data: await service.submitAttempt(req.valid.params.attemptId, req.user.id, req.valid.body.answers) });
});

router.get('/:paperId', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.getPaper(req.valid.params.paperId, req.user.id) });
});

router.get('/:paperId/attempts', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.listMyAttempts(req.valid.params.paperId, req.user.id) });
});

router.post('/:paperId/attempts', createSessionLimiter, validate({ params: paperIdParams }), async (req, res) => {
  res.status(201).json({ success: true, data: await service.startAttempt(req.valid.params.paperId, req.user.id) });
});

module.exports = router;
