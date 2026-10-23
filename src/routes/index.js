'use strict';

const { Router } = require('express');
const { apiLimiter } = require('../middleware/rateLimiters');
const { optionalAuth } = require('../middleware/auth');

const router = Router();

// Resolve identity first so the global limiter can key by user.
router.use(optionalAuth, apiLimiter);
router.use('/auth', require('./auth.routes'));
router.use('/me', require('./me.routes'));
router.use('/catalog', require('./catalog.routes'));
router.use('/practice', require('./practice.routes'));
router.use('/learn', require('./learn.routes'));
router.use('/mock', require('./mock.routes'));
router.use('/pyq', require('./pyq.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
