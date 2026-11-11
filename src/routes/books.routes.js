'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { isAdminRequest } = require('../middleware/admin');
const { learnQuizLimiter, verifyAnswerLimiter } = require('../middleware/rateLimiters');
const { objectId, optionId, timeSpent } = require('../validators/common');
const books = require('../services/books');
const study = require('../services/bookStudy.service');
const bookAdmin = require('../services/bookAdmin.service');
const AppError = require('../utils/AppError');

// Study books ("Learn like a book"). Reading and practice are open to everyone; progress is kept for
// signed-in students. `?preview=1` shows DRAFT chapters to admins only (for the owner's review).
const router = Router();
// Admin publish decisions (Admin Console → Books), refreshed at most once a minute.
router.use(async (_req, _res, next) => {
  await bookAdmin.ensureFresh().catch(() => {});
  next();
});

const bookParam = z.enum(Object.keys(books.BOOKS));
const chapterCode = z.string().regex(/^HIS-\d{2}$/);
const sectionId = z.string().regex(/^[a-z][a-z0-9_]{1,40}$/);
const previewQuery = z.object({ preview: z.enum(['0', '1']).optional() });

/** Preview only for admins; for anyone else the flag is ignored. */
async function previewOf(req) {
  return req.valid.query?.preview === '1' && (await isAdminRequest(req));
}

function noStoreIfPreview(res, preview) {
  res.set('Cache-Control', preview ? 'private, no-store' : 'public, max-age=300, stale-while-revalidate=900');
}

router.get('/:book', validate({ params: z.object({ book: bookParam }), query: previewQuery }), async (req, res) => {
  const preview = await previewOf(req);
  noStoreIfPreview(res, preview);
  res.json({ success: true, data: books.getBook(req.valid.params.book, { preview }) });
});

router.get('/:book/progress', requireAuth, validate({ params: z.object({ book: bookParam }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await study.getProgress(req.user.id, req.valid.params.book) });
});

router.put('/:book/progress', requireAuth, validate({
  params: z.object({ book: bookParam }),
  body: z.object({
    chapters: z.array(z.object({ chapter: chapterCode, read: z.array(sectionId).max(20).default([]) })).max(40).default([]),
    depth: z.enum(['quick', 'standard', 'deep']).optional(),
    last: z.object({ chapter: chapterCode, section: sectionId.nullable().optional() }).optional(),
  }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await study.saveReading(req.user.id, req.valid.params.book, req.valid.body) });
});

router.post('/:book/results', requireAuth, validate({
  params: z.object({ book: bookParam }),
  body: z.object({
    chapter: chapterCode,
    mode: z.enum(study.MODES),
    correct: z.number().int().min(0).max(200),
    total: z.number().int().min(1).max(200),
    bySection: z.record(sectionId, z.object({ correct: z.number().int().min(0).max(200), total: z.number().int().min(1).max(200) })).default({}),
  }).refine((b) => b.correct <= b.total, { message: 'correct cannot exceed total' }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await study.saveResult(req.user.id, req.valid.params.book, req.valid.body) });
});

const chapterParams = z.object({ book: bookParam, code: chapterCode });

router.get('/:book/chapters/:code', validate({ params: chapterParams, query: previewQuery }), async (req, res) => {
  const preview = await previewOf(req);
  const data = await books.getChapter(req.valid.params.book, req.valid.params.code, { preview });
  if (!data) throw AppError.notFound('CHAPTER_NOT_FOUND', 'Chapter not found');
  noStoreIfPreview(res, preview);
  res.json({ success: true, data });
});

router.get('/:book/chapters/:code/questions', learnQuizLimiter, validate({
  params: chapterParams,
  query: previewQuery.extend({
    mode: z.enum(study.MODES).default('practice'),
    sections: z.string().max(400).optional().transform((s) => (s ? s.split(',').filter(Boolean) : [])).pipe(z.array(sectionId).max(20)),
  }),
}), async (req, res) => {
  const preview = await previewOf(req);
  res.set('Cache-Control', 'private, no-store');
  const { book, code } = req.valid.params;
  res.json({ success: true, data: await study.chapterQuestions(book, code, { ...req.valid.query, preview }) });
});

router.post('/:book/chapters/:code/verify', verifyAnswerLimiter, validate({
  params: chapterParams,
  query: previewQuery,
  body: z.object({ questionId: objectId, selectedOptionId: optionId, timeSpentSec: timeSpent().optional() }),
}), async (req, res) => {
  const preview = await previewOf(req);
  res.set('Cache-Control', 'private, no-store');
  const { book, code } = req.valid.params;
  res.json({ success: true, data: await study.verify(book, code, req.valid.body, req.user?.id, { preview }) });
});

module.exports = router;
