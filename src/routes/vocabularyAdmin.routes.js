'use strict';

const { Router } = require('express');
const multer = require('multer');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const { objectId } = require('../validators/common');
const AppError = require('../utils/AppError');
const { VocabularyWord } = require('../models');
const vocabulary = require('../services/vocabulary.service');
const { parseJsonl } = require('../services/vocabularyImport');

const router = Router();
router.use(requireAdmin);
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_ROWS = 1000;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_FILE_BYTES, files: 1, fields: 0, parts: 1 } });

function parseUpload(req, _res, next) {
  upload.single('file')(req, _res, (error) => {
    if (!error) return next();
    if (error instanceof multer.MulterError) {
      const tooLarge = error.code === 'LIMIT_FILE_SIZE';
      return next(new AppError(tooLarge ? 413 : 400, tooLarge ? 'FILE_TOO_LARGE' : 'INVALID_UPLOAD', tooLarge ? 'Vocabulary import must be 2 MB or smaller' : 'Upload exactly one JSONL file'));
    }
    next(error);
  });
}

function readEntries(req) {
  if (!req.file || !/\.jsonl$/i.test(req.file.originalname)) {
    throw AppError.badRequest('JSONL_FILE_REQUIRED', 'Upload a .jsonl vocabulary file');
  }
  const parsed = parseJsonl(req.file.buffer);
  if (parsed.entries.length > MAX_ROWS) throw AppError.unprocessable('TOO_MANY_ROWS', `A vocabulary import may contain at most ${MAX_ROWS} words`);
  return parsed;
}

router.post('/import/preview', parseUpload, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const parsed = readEntries(req);
  const report = await vocabulary.previewImport(parsed.entries, parsed.entryRows);
  report.errors.unshift(...parsed.errors);
  res.json({ success: true, data: report });
});

router.post('/import/commit', parseUpload, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const parsed = readEntries(req);
  if (parsed.errors.length) {
    throw AppError.unprocessable('VOCABULARY_IMPORT_INVALID', 'Fix JSONL syntax errors before importing', { errors: parsed.errors });
  }
  res.status(201).json({
    success: true,
    data: await vocabulary.commitImport(parsed.entries, req.admin.email, parsed.entryRows),
  });
});

router.get('/drafts', validate({
  query: z.object({
    page: z.coerce.number().int().min(1).max(10_000).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const { page, limit } = req.valid.query;
  const filter = { status: 'DRAFT' };
  const [words, total] = await Promise.all([
    VocabularyWord.find(filter).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    VocabularyWord.countDocuments(filter),
  ]);
  res.json({
    success: true,
    data: {
      words: words.map((word) => ({
        ...vocabulary.presentWord(word),
        authoredBy: word.authored_by || null,
        createdAt: word.created_at,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    },
  });
});

router.patch('/words/:wordId/status', validate({
  params: z.object({ wordId: objectId }),
  body: z.object({
    status: z.enum(['PUBLISHED', 'ARCHIVED']),
    sourceStatus: z.enum(['UNVERIFIED', 'EDITORIAL_REVIEWED', 'DICTIONARY_CHECKED']).optional(),
  }).strict(),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({
    success: true,
    data: await vocabulary.setWordStatus(req.valid.params.wordId, req.valid.body.status, req.admin.email, req.valid.body.sourceStatus),
  });
});

module.exports = router;
