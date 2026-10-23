'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { verifyAnswerLimiter, reportErrorLimiter } = require('../middleware/rateLimiters');
const {
  topicViewQuery,
  topicSummaryQuery,
  questionStreamQuery,
  verifyAnswerBody,
  questionIdParams,
  reportErrorBody,
} = require('../validators/practice.schemas');
const controller = require('../controllers/practice.controller');
const { z } = require('zod');
const { slug } = require('../validators/common');
const { getPatterns } = require('../services/patterns.service');

// Practice is open to anonymous users; identity (if any) is resolved in routes/index.js.
const router = Router();

router.get('/topic-view', validate({ query: topicViewQuery }), controller.topicView);
// All languages in one payload, for instant on-device language switching.
router.get('/topic-summary', validate({ query: topicSummaryQuery }), controller.topicSummary);
// Question patterns: worked example + "your turn" question per pattern (db/patterns).
router.get('/patterns', validate({ query: z.object({ subject: slug, topic: slug }) }), (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
  res.json({ success: true, data: getPatterns(req.valid.query) });
});
// Cursor-paginated stream for the one-question-at-a-time Practice Arena.
router.get('/questions', validate({ query: questionStreamQuery }), controller.questionStream);
router.post('/verify-answer', verifyAnswerLimiter, validate({ body: verifyAnswerBody }), controller.verifyAnswer);

// Revision list: everything the student bookmarked, newest first.
const bookmarksQuery = z.object({
  subject: slug.optional(),
  topic: slug.optional(),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
router.get('/bookmarks', requireAuth, validate({ query: bookmarksQuery }), controller.listBookmarks);
router.put('/bookmarks/:questionId', requireAuth, validate({ params: questionIdParams }), controller.addBookmark);
router.delete('/bookmarks/:questionId', requireAuth, validate({ params: questionIdParams }), controller.removeBookmark);
router.post('/report-error', reportErrorLimiter, validate({ body: reportErrorBody }), controller.reportError);

module.exports = router;
