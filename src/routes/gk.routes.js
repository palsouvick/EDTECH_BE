'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const gk = require('../services/gk.service');
const { CARDS, SUBTOPICS, EXAM_RELEVANCE } = require('../services/gkTaxonomy');

// Open to everyone; a signed-in student also gets their own progress on the cards.
const router = Router();

const card = z.enum(CARDS.map((c) => c.code));
const subtopic = z.enum([...new Set(Object.values(SUBTOPICS).flat())]);

router.get('/cards', async (req, res) => {
  res.set('Cache-Control', req.user ? 'private, no-store' : 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data: await gk.listCards(req.user?.id) });
});

router.get('/facts', validate({
  query: z.object({
    card: card.optional(),
    subtopic: subtopic.optional(),
    q: z.string().trim().min(1).max(80).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    exam: z.enum(EXAM_RELEVANCE).optional(),
    year: z.coerce.number().int().min(1990).max(2100).optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
    offset: z.coerce.number().int().min(0).max(10_000).default(0),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }).refine((v) => !v.month || v.year, { message: 'month needs year', path: ['month'] }),
}), async (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data: await gk.listFacts(req.valid.query) });
});

router.get('/facts/:code', validate({ params: z.object({ code: z.string().regex(/^gk-[a-z]{2,4}-\d{3,5}$/i) }) }), async (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data: await gk.getFact(req.valid.params.code) });
});

router.get('/current-affairs/months', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  res.json({ success: true, data: { months: await gk.currentAffairsMonths() } });
});

module.exports = router;
