'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { learnQuizLimiter, verifyAnswerLimiter } = require('../middleware/rateLimiters');
const { objectId } = require('../validators/common');
const vocabulary = require('../services/vocabulary.service');

const router = Router();
const slug = z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/);
const difficulty = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);

router.get('/words', validate({
  query: z.object({
    q: z.string().trim().max(80).optional(),
    category: slug.optional(),
    difficulty: difficulty.optional(),
    status: z.enum(['new', 'learned', 'difficult', 'favourite']).optional(),
    offset: z.coerce.number().int().min(0).max(10_000).default(0),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
}), async (req, res) => {
  res.set('Cache-Control', req.user ? 'private, no-store' : 'public, max-age=60, stale-while-revalidate=300');
  res.json({ success: true, data: await vocabulary.listWords({ ...req.valid.query, userId: req.user?.id }) });
});

router.get('/word-of-day', validate({
  query: z.object({ tz: z.coerce.number().int().min(-720).max(840).default(330) }),
}), async (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
  res.json({ success: true, data: await vocabulary.wordOfDay({ offsetMin: req.valid.query.tz }) });
});

router.post('/practice/sessions', learnQuizLimiter, validate({
  body: z.object({
    mode: z.enum(['meaning', 'synonym', 'antonym', 'fill_blank', 'context', 'identify', 'match']),
    category: slug.optional(),
    difficulty: difficulty.optional(),
    count: z.number().int().min(1).max(20).default(10),
  }).strict(),
}), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(201).json({
    success: true,
    data: await vocabulary.createPracticeSession({ ...req.valid.body, userId: req.user?.id }),
  });
});

router.post('/practice/sessions/:token/answers', verifyAnswerLimiter, validate({
  params: z.object({ token: z.string().regex(/^[A-Za-z0-9_-]{40,50}$/) }),
  body: z.object({
    questionId: z.string().regex(/^[a-f0-9]{20}$/),
    selectedOptionId: z.string().regex(/^vopt_[0-9]+_[a-f0-9]{6}$/),
  }).strict(),
}), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({
    success: true,
    data: await vocabulary.answerPractice({
      token: req.valid.params.token,
      ...req.valid.body,
      userId: req.user?.id,
    }),
  });
});

router.use('/progress', requireAuth);
router.get('/progress/summary', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await vocabulary.getProgressSummary(req.user.id) });
});

router.put('/progress/settings', validate({
  body: z.object({
    dailyTarget: z.union([z.literal(10), z.literal(15), z.literal(20)]),
    timezoneOffsetMin: z.number().int().min(-720).max(840).optional(),
  }).strict(),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await vocabulary.setSettings(req.user.id, req.valid.body) });
});

router.patch('/progress/words/:wordId', validate({
  params: z.object({ wordId: objectId }),
  body: z.object({
    state: z.enum(['learned', 'difficult', 'favourite']),
    value: z.boolean(),
  }).strict(),
}), async (req, res) => {
  const field = { learned: 'learned', difficult: 'difficult', favourite: 'favourite' }[req.valid.body.state];
  res.set('Cache-Control', 'private, no-store');
  res.json({
    success: true,
    data: await vocabulary.updateWordProgress(req.user.id, req.valid.params.wordId, { field, value: req.valid.body.value }),
  });
});

router.get('/progress/review', validate({
  query: z.object({
    type: z.enum(['due', 'missed']).default('due'),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({
    success: true,
    data: { words: await vocabulary.reviewWords(req.user.id, { dueOnly: req.valid.query.type === 'due', limit: req.valid.query.limit }) },
  });
});

router.post('/progress/review', validate({
  body: z.object({ wordId: objectId, known: z.boolean() }).strict(),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await vocabulary.answerReview(req.user.id, req.valid.body) });
});

module.exports = router;
