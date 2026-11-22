'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Router } = require('express');
const multer = require('multer');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { objectId, slug } = require('../validators/common');
const config = require('../config');
const course = require('../services/course.service');
const AppError = require('../utils/AppError');

// "My course": a signed-in student's own PDFs. Everything is private to that student.
const router = Router();
router.use(requireAuth);
router.use((_req, res, next) => {
  res.set('Cache-Control', 'private, no-store');
  next();
});

// Streamed to a temp file (books can be hundreds of MB), then moved into the student's folder.
// The temp folder sits next to the storage, on the same drive: a move across drives (C: temp
// -> E: storage) fails on Windows with EXDEV.
const incoming = path.join(config.course.storageDir, '_incoming');
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => fs.mkdir(incoming, { recursive: true }, (err) => cb(err, incoming)),
  }),
  limits: { fileSize: config.course.maxUploadMb * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => cb(null, /pdf$/i.test(file.mimetype) || /\.pdf$/i.test(file.originalname)),
});

const idParams = z.object({ id: objectId });
const subject = z.enum(['quant', 'english', 'gs', 'reasoning']);
const page = z.coerce.number().int().min(1).max(100000);
const sectionBody = z.object({
  subject: subject.nullable().optional(),
  topic: slug.nullable().optional(),
  label: z.string().trim().max(120).nullable().optional(),
  from: page.optional(),
  to: page.optional(),
});

router.post('/files', (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) return next(err.code === 'LIMIT_FILE_SIZE' ? new AppError(413, 'FILE_TOO_LARGE', `The file is larger than ${config.course.maxUploadMb} MB`) : AppError.badRequest(err.message));
    try {
      res.status(201).json({ success: true, data: await course.addFile(req.user.id, req.file) });
    } catch (e) {
      next(e);
    }
  });
});

router.get('/files', async (req, res) => {
  res.json({ success: true, data: await course.listFiles(req.user.id) });
});

router.get('/files/:id', validate({ params: idParams }), async (req, res) => {
  res.json({ success: true, data: await course.getFile(req.user.id, req.valid.params.id) });
});

// The original PDF, with Range support so the reader loads only the pages it shows.
router.get('/files/:id/pdf', validate({ params: idParams }), async (req, res, next) => {
  const file = await course.pdfPath(req.user.id, req.valid.params.id);
  res.sendFile(file, { headers: { 'Content-Type': 'application/pdf', 'Cache-Control': 'private, max-age=3600' }, acceptRanges: true }, (err) => err && !res.headersSent && next(err));
});

router.patch('/files/:id', validate({ params: idParams, body: z.object({ title: z.string().trim().min(1).max(200) }) }), async (req, res) => {
  res.json({ success: true, data: await course.renameFile(req.user.id, req.valid.params.id, req.valid.body.title) });
});

router.put('/files/:id/last-page', validate({ params: idParams, body: z.object({ page }) }), async (req, res) => {
  res.json({ success: true, data: await course.setLastPage(req.user.id, req.valid.params.id, req.valid.body.page) });
});

router.post('/files/:id/reprocess', validate({ params: idParams, body: z.object({ keepManual: z.boolean().default(true), reread: z.boolean().default(false) }) }), async (req, res) => {
  res.json({ success: true, data: await course.reprocess(req.user.id, req.valid.params.id, req.valid.body) });
});

router.delete('/files/:id', validate({ params: idParams }), async (req, res) => {
  res.json({ success: true, data: await course.deleteFile(req.user.id, req.valid.params.id) });
});

// The student's marks: a page read, ⭐ bookmarked, a note; a whole chapter read at once.
router.put('/files/:id/pages/:page', validate({
  params: z.object({ id: objectId, page }),
  body: z.object({ read: z.boolean().optional(), bookmarked: z.boolean().optional(), note: z.string().max(1000).optional() }).refine((b) => Object.keys(b).length > 0, 'nothing to change'),
}), async (req, res) => {
  res.json({ success: true, data: await course.markPage(req.user.id, req.valid.params.id, req.valid.params.page, req.valid.body) });
});

router.post('/files/:id/read', validate({ params: idParams, body: z.object({ from: page, to: page, read: z.boolean().default(true) }) }), async (req, res) => {
  res.json({ success: true, data: await course.markRange(req.user.id, req.valid.params.id, req.valid.body) });
});

router.get('/bookmarks', async (req, res) => {
  res.json({ success: true, data: await course.bookmarks(req.user.id) });
});

router.post('/files/:id/sections', validate({ params: idParams, body: sectionBody.extend({ from: page, to: page }) }), async (req, res) => {
  res.status(201).json({ success: true, data: await course.addSection(req.user.id, req.valid.params.id, req.valid.body) });
});

router.patch('/sections/:id', validate({ params: idParams, body: sectionBody }), async (req, res) => {
  res.json({ success: true, data: await course.updateSection(req.user.id, req.valid.params.id, req.valid.body) });
});

router.delete('/sections/:id', validate({ params: idParams }), async (req, res) => {
  res.json({ success: true, data: await course.deleteSection(req.user.id, req.valid.params.id) });
});

router.get('/chapters', (_req, res) => {
  res.json({ success: true, data: course.chapterChoices() });
});

router.get('/search', validate({ query: z.object({ q: z.string().trim().min(2).max(100) }) }), async (req, res) => {
  res.json({ success: true, data: await course.search(req.user.id, req.valid.query.q) });
});

router.get('/topics/:subject/:topic', validate({ params: z.object({ subject, topic: slug }) }), async (req, res) => {
  res.json({ success: true, data: await course.sectionsForTopic(req.user.id, req.valid.params.subject, req.valid.params.topic) });
});

module.exports = router;
