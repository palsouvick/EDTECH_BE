'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const books = require('../services/books');
const bookAdmin = require('../services/bookAdmin.service');

/** Admin Console → Books: chapter list and Publish / Unpublish. Everything here requires an admin session. */
const router = Router();
router.use(requireAdmin);

const params = z.object({ book: z.enum(Object.keys(books.BOOKS)), code: z.string().regex(books.CHAPTER_CODE) });

router.get('/', async (_req, res) => {
  res.json({ success: true, data: await bookAdmin.listChapters() });
});

router.post('/:book/:code/publish', validate({ params }), async (req, res) => {
  const { book, code } = req.valid.params;
  res.json({ success: true, data: await bookAdmin.setStatus(book, code, 'PUBLISHED', req.admin.email) });
});

router.post('/:book/:code/unpublish', validate({ params }), async (req, res) => {
  const { book, code } = req.valid.params;
  res.json({ success: true, data: await bookAdmin.setStatus(book, code, 'DRAFT', req.admin.email) });
});

module.exports = router;
