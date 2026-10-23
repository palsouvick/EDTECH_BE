'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { slug, objectId, optionId } = require('../validators/common');
const { learnQuizLimiter, verifyAnswerLimiter } = require('../middleware/rateLimiters');
const learn = require('../services/learn.service');

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
  // Ids this student has already seen at this level, so a repeat attempt gets new questions.
  exclude: z.array(objectId).max(500).default([]),
});
router.post('/quiz', learnQuizLimiter, validate({ body: quizBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await learn.createQuiz(req.valid.body) });
});

const checkBody = z.object({
  subject,
  topic: slug,
  answers: z
    .array(z.object({ questionId: objectId, selectedOptionId: optionId.nullable(), timeSpentSec: z.number().min(0).max(3600).optional() }))
    .min(1)
    .max(learn.QUIZ_SIZE),
});
router.post('/quiz/check', verifyAnswerLimiter, validate({ body: checkBody }), async (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, data: await learn.checkQuiz(req.valid.body, req.user?.id) });
});

module.exports = router;
