'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { slug, objectId, optionId, timeSpent } = require('../validators/common');
const { learnQuizLimiter, verifyAnswerLimiter } = require('../middleware/rateLimiters');
const learn = require('../services/learn.service');
const learnProgress = require('../services/learnProgress.service');
const { requireAuth } = require('../middleware/auth');

// Open to everyone; a signed-in student's answers also feed "My performance".
const router = Router();

const subject = z.enum(learn.SUBJECTS.map((s) => s.code));
const level = z.enum(['beginner', 'intermediate', 'advanced']);
const cacheable = (res) => res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

router.get('/subjects', async (_req, res) => {
  cacheable(res);
  res.json({ success: true, data: await learn.listSubjects() });
});

router.get('/subjects/:subject', validate({ params: z.object({ subject }) }), async (req, res) => {
  cacheable(res);
  res.json({ success: true, data: await learn.getSubject(req.valid.params.subject) });
});

router.get('/subjects/:subject/chapters/:topic', validate({ params: z.object({ subject, topic: slug }) }), async (req, res) => {
  cacheable(res);
  res.json({ success: true, data: await learn.getChapter(req.valid.params.subject, req.valid.params.topic) });
});

const quizBody = z.object({
  subject,
  topic: slug,
  level,
  pattern: slug.optional(),
  // Ids this student has already seen at this level, so a repeat attempt gets new questions.
  exclude: z.array(objectId).max(500).default([]),
  excludeFingerprints: z.array(z.string().regex(/^[a-f\d]{64}$/i)).max(500).default([]),
  recentPatterns: z.array(slug).max(30).default([]),
});
router.post('/quiz', learnQuizLimiter, validate({ body: quizBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await learn.createQuiz(req.valid.body) });
});

const checkBody = z.object({
  subject,
  topic: slug,
  // Issued with the quiz by POST /quiz; only that quiz's questions can be checked.
  quizToken: z.string().min(1).max(4096),
  answers: z
    .array(z.object({ questionId: objectId, selectedOptionId: optionId.nullable(), timeSpentSec: timeSpent().optional() }))
    .min(1)
    .max(learn.QUIZ_SIZE)
    .refine((as) => new Set(as.map((a) => a.questionId)).size === as.length, { message: 'each questionId may appear only once' }),
});
router.post('/quiz/check', verifyAnswerLimiter, validate({ body: checkBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await learn.checkQuiz(req.valid.body, req.user?.id) });
});

// "Check answer" for one question mid-quiz: its answer and explanation, not recorded.
const peekBody = z.object({ subject, topic: slug, quizToken: z.string().min(1).max(4096), questionId: objectId, selectedOptionId: optionId.nullable().default(null) });
router.post('/quiz/peek', verifyAnswerLimiter, validate({ body: peekBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await learn.peekQuiz(req.valid.body) });
});

// A signed-in student's quiz progress, kept on the account so it follows them across devices.
router.get('/progress', requireAuth, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await learnProgress.getAll(req.user.id) });
});

const progressEntry = z.object({
  subject,
  topic: slug,
  level,
  best: z.object({ correct: z.number().int().min(0).max(100), total: z.number().int().min(1).max(100) })
    .refine((b) => b.correct <= b.total, { message: 'correct cannot exceed total' })
    .nullable()
    .optional(),
  seen: z.array(objectId).max(500).default([]),
  fingerprints: z.array(z.string().regex(/^[a-f\d]{64}$/i)).max(500).default([]),
  patterns: z.array(slug).max(30).default([]),
});
router.put('/progress', requireAuth, validate({ body: z.object({ entries: z.array(progressEntry).min(1).max(200) }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await learnProgress.merge(req.user.id, req.valid.body.entries) });
});

module.exports = router;
