'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const { objectId } = require('../validators/common');
const gkAdmin = require('../services/gkAdmin.service');
const { FACT_TOPICS, SUBTOPICS, EXAM_RELEVANCE } = require('../services/gkTaxonomy');

/** GK content management. Everything here requires an admin session. */
const router = Router();
router.use(requireAdmin);

const idParams = z.object({ id: objectId });
const reason = z.string().trim().min(3).max(500);
const loc = (max) => z.object({ en: z.string().trim().min(1).max(max), bn: z.string().trim().min(1).max(max) });
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable();

router.get('/summary', async (_req, res) => {
  res.json({ success: true, data: await gkAdmin.summary() });
});

router.get('/stale', async (_req, res) => {
  res.json({ success: true, data: await gkAdmin.stale() });
});

router.get('/facts', validate({
  query: z.object({
    topic: z.enum(FACT_TOPICS).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'RETIRED']).optional(),
    verification: z.enum(['VERIFIED', 'NEEDS_REVIEW', 'UNVERIFIED']).optional(),
    bengali: z.enum(['PENDING', 'REVIEWED']).optional(),
    stale: z.enum(['true']).optional().transform(Boolean),
    q: z.string().trim().min(1).max(80).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(25),
  }),
}), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.listFacts(req.valid.query) });
});

router.get('/facts/:id', validate({ params: idParams }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.getFact(req.valid.params.id) });
});

const sourceBody = z.object({
  title: z.string().trim().min(1).max(300),
  url: z.string().trim().url().max(1024).refine((u) => u.startsWith('https://'), 'must be https'),
  publisher: z.string().trim().max(200).optional(),
  publisher_type: z.enum(['OFFICIAL', 'INSTITUTIONAL', 'REFERENCE']),
  accessed_at: date.optional(),
  quote: z.string().trim().max(2000).optional(),
});
const allSubtopics = [...new Set(Object.values(SUBTOPICS).flat())];
const editBody = z.object({
  reason,
  changes: z.object({
    title: loc(200).optional(),
    statement: loc(2000).optional(),
    explanation: loc(2000).optional(),
    subtopic: z.enum(allSubtopics).optional(),
    tags: z.array(z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/)).max(20).optional(),
    difficulty: z.number().int().min(1).max(5).optional(),
    exam_relevance: z.array(z.enum(EXAM_RELEVANCE)).max(10).optional(),
    sources: z.array(sourceBody).min(1).max(10).optional(),
    dates: z.object({ event_date: date.optional(), valid_from: date.optional(), valid_to: date.optional(), review_by: date.optional() }).optional(),
    fact_kind: z.enum(['STATIC', 'CHANGING']).optional(),
    reference_year: z.number().int().min(1800).max(2100).nullable().optional(),
  }).strict().refine((c) => Object.keys(c).length > 0, { message: 'nothing to change' }),
});
router.patch('/facts/:id', validate({ params: idParams, body: editBody }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.editFact(req.valid.params.id, req.valid.body, req.admin.email) });
});

router.post('/facts/:id/verification', validate({
  params: idParams,
  body: z.object({ status: z.enum(['VERIFIED', 'NEEDS_REVIEW']), notes: z.string().trim().min(3).max(2000) }),
}), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.setVerification(req.valid.params.id, req.valid.body, req.admin.email) });
});

router.post('/facts/:id/bengali-review', validate({ params: idParams, body: z.object({ note: z.string().trim().max(500).optional() }) }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.approveBengali(req.valid.params.id, req.valid.body, req.admin.email) });
});

router.post('/facts/:id/retire', validate({ params: idParams, body: z.object({ reason }) }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.retire(req.valid.params.id, req.valid.body, req.admin.email) });
});

router.post('/facts/:id/restore', validate({ params: idParams, body: z.object({ reason }) }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.restore(req.valid.params.id, req.valid.body, req.admin.email) });
});

// Bulk import: JSONL in the db/gk format (see db/gk/README.md), checked before anything is written.
const importBody = z.object({ jsonl: z.string().min(2).max(2_000_000) });
router.post('/import/preview', validate({ body: importBody }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.previewImport(req.valid.body.jsonl) });
});
router.post('/import/commit', validate({ body: importBody }), async (req, res) => {
  res.json({ success: true, data: await gkAdmin.commitImport(req.valid.body.jsonl, req.admin.email) });
});

module.exports = router;
