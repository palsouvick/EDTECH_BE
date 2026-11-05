'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { category } = require('../validators/common');
const gk = require('../services/gk.service');
const importantDays = require('../services/importantDays.service');
const { CARDS, SUBTOPICS, EXAM_RELEVANCE, GK_TOPICS } = require('../services/gkTaxonomy');

// Open to everyone; a signed-in student also gets their own progress and fact state.
// The routes under "A student's facts" need a signed-in student.
const router = Router();

const card = z.enum(CARDS.map((c) => c.code));
const subtopic = z.enum([...new Set(Object.values(SUBTOPICS).flat())]);
const factCode = z.string().regex(/^gk-[a-z]{2,4}-\d{3,5}$/i);
const tz = z.coerce.number().int().min(-720).max(840).default(330);
const personal = (req, res) => res.set('Cache-Control', req.user ? 'private, no-store' : 'public, max-age=60, stale-while-revalidate=300');

router.get('/cards', async (req, res) => {
  personal(req, res);
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
    // The signed-in student's own facts.
    mine: z.enum(['bookmarked', 'due', 'unseen', 'known']).optional(),
    offset: z.coerce.number().int().min(0).max(10_000).default(0),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }).refine((v) => !v.month || v.year, { message: 'month needs year', path: ['month'] }),
}), async (req, res) => {
  personal(req, res);
  res.json({ success: true, data: await gk.listFacts(req.valid.query, req.user?.id) });
});

router.get('/facts/:code', validate({ params: z.object({ code: factCode }) }), async (req, res) => {
  personal(req, res);
  res.json({ success: true, data: await gk.getFact(req.valid.params.code, req.user?.id) });
});

// Important Days, January to December in one table, from the verified month facts.
router.get('/important-days', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  res.json({ success: true, data: await importantDays.yearCalendar() });
});

router.get('/current-affairs/months', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  res.json({ success: true, data: { months: await gk.currentAffairsMonths() } });
});

// How many questions a GK practice selection has (exam type, chapter, subcategory, difficulty).
router.get('/questions/count', validate({
  query: z.object({
    category,
    topic: z.enum(GK_TOPICS),
    subtopic: subtopic.optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    verifiedOnly: z.enum(['true', 'false']).optional().transform((v) => v === 'true'),
  }),
}), async (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data: { count: await gk.questionCount(req.valid.query) } });
});

// ---- A student's facts ---------------------------------------------------------
router.put('/facts/:code/bookmark', requireAuth, validate({ params: z.object({ code: factCode }), body: z.object({ on: z.boolean() }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await gk.setBookmark(req.user.id, req.valid.params.code, req.valid.body.on) });
});

router.post('/facts/:code/review', requireAuth, validate({
  params: z.object({ code: factCode }),
  body: z.object({ result: z.enum(['known', 'again']), tz: z.number().int().min(-720).max(840).default(330) }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await gk.reviewFact(req.user.id, req.valid.params.code, req.valid.body.result, { tz: req.valid.body.tz }) });
});

router.get('/revision', requireAuth, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await gk.revision(req.user.id) });
});

router.get('/daily', requireAuth, validate({ query: z.object({ tz }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await gk.daily(req.user.id, { tz: req.valid.query.tz }) });
});

module.exports = router;
