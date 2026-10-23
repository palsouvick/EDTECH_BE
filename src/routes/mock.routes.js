'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { createSessionLimiter, submitSessionLimiter } = require('../middleware/rateLimiters');
const { createSessionBody, submitSessionBody, sessionIdParams } = require('../validators/mock.schemas');
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

module.exports = router;
