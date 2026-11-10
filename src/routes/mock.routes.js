'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { createSessionLimiter, submitSessionLimiter, lossReasonLimiter } = require('../middleware/rateLimiters');
const { createSessionBody, submitSessionBody, sessionIdParams, lossReasonBody } = require('../validators/mock.schemas');
const controller = require('../controllers/mock.controller');

const router = Router();

// Sessions belong to a user, so the whole engine requires identity.
// Auth runs before the limiters so they key on user id, not IP.
router.use(requireAuth);

router.post('/create-session', createSessionLimiter, validate({ body: createSessionBody }), controller.createSession);
router.post('/submit-session', submitSessionLimiter, validate({ body: submitSessionBody }), controller.submitSession);
router.get('/session/:sessionId', validate({ params: sessionIdParams }), controller.getSession);
// Result dashboard: review with answers + explanations, topic breakdown, percentile, cut-offs. Submitted sessions only.
router.get('/session/:sessionId/analytics', validate({ params: sessionIdParams }), controller.getAnalytics);
// "Why did I lose marks?": the student's own reason for one lost question (submitted tests only).
router.put('/session/:sessionId/loss-reason', lossReasonLimiter, validate({ params: sessionIdParams, body: lossReasonBody }), controller.setLossReason);

module.exports = router;
