'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { category, slug, language } = require('../validators/common');
const catalog = require('../services/catalog.service');

const router = Router();
const langQuery = z.object({ language: language.default('en') });

// Public, identical for every student: cacheable at the CDN.
const cacheable = (res) => res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

router.get('/categories', validate({ query: langQuery }), async (req, res) => {
  cacheable(res);
  res.json({ success: true, data: await catalog.listCategories(req.valid.query.language) });
});

router.get(
  '/categories/:category',
  validate({ params: z.object({ category }), query: langQuery }),
  async (req, res) => {
    cacheable(res);
    res.json({ success: true, data: await catalog.getCategory(req.valid.params.category, req.valid.query.language) });
  },
);

router.get(
  '/categories/:category/subjects/:subject',
  validate({ params: z.object({ category, subject: slug }), query: langQuery }),
  async (req, res) => {
    const { category: cat, subject } = req.valid.params;
    cacheable(res);
    res.json({ success: true, data: await catalog.getSubject(cat, subject, req.valid.query.language) });
  },
);

module.exports = router;
