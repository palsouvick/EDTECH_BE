'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { getPerformance } = require('../services/performance.service');
const { getInsights, getLeaderboard, setLeaderboardOptIn } = require('../services/insights.service');
const { pyqProgress } = require('../services/pyqProgress.service');
const { getUser } = require('../services/auth.service');
const targetExam = require('../services/targetExam.service');
const AppError = require('../utils/AppError');
const analysis = require('../services/analysis.service');
const skips = require('../services/skips.service');
const { ANALYSIS_SUBJECTS } = require('../services/analysis.logic');
const { language, slug, objectId } = require('../validators/common');

const router = Router();
router.use(requireAuth);

// Math "I'm Stuck" learning loop (services/stuck.service.js): My Stuck Problems (stuck questions with
// solutions and learning content, chapter table, probable skill gaps with evidence, improvement,
// next practice) and the light dashboard card. Never changes any mock score.
const stuck = require('../services/stuck.service');
router.get('/stuck', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await stuck.overview(req.user.id) });
});
router.get('/stuck/summary', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await stuck.summary(req.user.id) });
});

// The signed-in student's own profile, including their target exam.
router.get('/', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const user = await getUser(req.user.id);
  if (!user) throw AppError.notFound('USER_NOT_FOUND', 'Account not found');
  res.json({ success: true, data: { user } });
});

// ---- Target exam ----
// Partial update: a field that is absent is left alone, null clears it.
// examCode null clears the exam and its date. Changing it never deletes
// progress, attempts, mistakes or plans — it only re-scopes what is shown.
// dailyStudyMinutes / preferredLanguage are profile fields: the plan
// budgets (minutes/day) and the live UI languages (en/bn).
const targetExamBody = z.object({
  examCode: z.string().trim().max(40).nullable().optional(),
  examDate: z.string().trim().max(40).nullable().optional(),
  dailyStudyMinutes: z.number().int().nullable().optional(),
  preferredLanguage: z.string().trim().max(10).nullable().optional(),
});
router.put('/target-exam', validate({ body: targetExamBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { user: await targetExam.setTargetExam(req.user.id, req.valid.body) } });
});

const targetExamQuery = z.object({ language: language.default('en') });
router.get('/target-exam/options', validate({ query: targetExamQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await targetExam.listTargetExams(req.valid.query.language) });
});

router.get('/target-exam/syllabus', validate({ query: targetExamQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const current = await targetExam.targetExamOf(req.user.id);
  if (!current) throw AppError.unprocessable('NO_TARGET_EXAM', 'Pick a target exam first');
  res.json({ success: true, data: await targetExam.getSyllabus(req.user.id, current.code, req.valid.query.language) });
});

// Exam Syllabus Map (F2): the full subject -> chapter -> topic map for ANY
// catalogue exam (not only the current target), with syllabus verdicts,
// priorities, weights, and this student's status/mastery per chapter.
const { getSyllabusMap } = require('../services/syllabusMap.service');
const syllabusMapParams = z.object({ examCode: z.string().trim().toUpperCase().regex(/^[A-Z0-9_]{2,40}$/) });
router.get('/target-exam/syllabus-map/:examCode', validate({ params: syllabusMapParams, query: targetExamQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getSyllabusMap(req.user.id, req.valid.params.examCode, req.valid.query.language) });
});

// Today's Study (F3): the ONE server-side "what should I study today?" list —
// due revision, the current plan day's tasks, weak and unfinished priorities
// from the F2 map, PYQ and the GK daily set, in a single priority order.
const { getToday } = require('../services/today.service');
const todayQuery = z.object({ tz: z.coerce.number().int().min(-720).max(840).default(330) });
router.get('/today', validate({ query: todayQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getToday(req.user.id, { tz: req.valid.query.tz }) });
});

// Find My Starting Level (F7): an optional, skippable diagnostic for the
// target exam — sections from the exam's own pattern, easy → medium, no PYQs.
// Its result is a starting signal for Today's Study; it is never written as
// practice attempts, mistakes or mastery.
const diagnostic = require('../services/diagnostic.service');
const { optionId, timeSpent } = require('../validators/common');
router.get('/diagnostic', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await diagnostic.getStatus(req.user.id) });
});
router.post('/diagnostic/start', validate({ body: z.object({ language: language.default('en') }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await diagnostic.startTest(req.user.id, req.valid.body) });
});
const diagnosticSubmitBody = z.object({
  testToken: z.string().min(10).max(4096),
  answers: z.array(z.object({
    questionId: objectId,
    selectedOptionId: optionId.nullable().optional(),
    timeSpentSec: timeSpent().optional(),
  })).max(60),
});
router.post('/diagnostic/submit', validate({ body: diagnosticSubmitBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await diagnostic.submitTest(req.user.id, req.valid.body) });
});
router.post('/diagnostic/skip', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await diagnostic.skip(req.user.id) });
});

// tz = minutes east of UTC, for "today" and the streak (India: 330).
const performanceQuery = z.object({ tz: z.coerce.number().int().min(-720).max(840).default(330) });

router.get('/performance', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getPerformance(req.user.id, req.valid.query.tz) });
});

// Mastery map, weak question patterns, badges and the protected streak.
router.get('/insights', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getInsights(req.user.id, req.valid.query.tz) });
});

// Unified mastery (F9/F10): every chapter's stage (not_started → learning →
// practising → developing → strong → mastered), score, evidence and what the
// next stage needs — the one definition Home, subject pages, Today and
// Readiness share. Optional ?subject= narrows it to one subject.
const masterySvc = require('../services/mastery.service');
router.get('/mastery', validate({ query: z.object({ subject: z.enum(['quant', 'english', 'gs', 'reasoning']).optional() }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await masterySvc.masterySummary(req.user.id, { subject: req.valid.query.subject }) });
});

// One revision place (F13): due today (questions, GK facts, words), mistakes,
// bookmarks, weak topics, PYQ revision and vocabulary in one summary. Reads
// the existing stores and spaced-repetition schedules; moves no data.
const revisionSvc = require('../services/revision.service');
router.get('/revision', validate({ query: performanceQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await revisionSvc.getRevision(req.user.id, { tz: req.valid.query.tz }) });
});

// Weekly leaderboard: opt-in only (shown with "First L." names).
router.get('/leaderboard', async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await getLeaderboard(req.user.id) });
});
router.put('/leaderboard', validate({ body: z.object({ optIn: z.boolean() }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await setLeaderboardOptIn(req.user.id, req.valid.body.optIn) });
});

// Past-paper questions answered per chapter of a subject (the Learn ladder's PYQ step).
router.get('/pyq-progress', validate({ query: z.object({ subject: z.enum(['quant', 'english', 'gs', 'reasoning']) }) }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await pyqProgress(req.user.id, req.valid.query.subject) });
});

// ---- My learning analysis (Mathematics and English) ----
const analysisQuery = performanceQuery.extend({ language: language.default('en') });
const analysisParams = z.object({ subject: z.enum(ANALYSIS_SUBJECTS) });

// Both subjects side by side and the current focus across them.
router.get('/analysis', validate({ query: analysisQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.overview(req.user.id, req.valid.query) });
});

// One subject in full: chapters, focus, why, plans, trends, skips, weak questions, next Smart Quiz.
router.get('/analysis/:subject', validate({ params: analysisParams, query: analysisQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.analyseSubject(req.user.id, req.valid.params.subject, req.valid.query) });
});

// Reading heartbeat from a Learn chapter page (at most ~1 a minute of visible time).
const studyLogBody = z.object({
  subject: z.enum(ANALYSIS_SUBJECTS),
  topic: slug,
  kind: z.enum(['read', 'revise']).default('read'),
  seconds: z.number().int().min(0).max(120),
  section: z.string().regex(/^[a-zA-Z0-9_-]{1,40}$/).optional(),
  sectionsTotal: z.number().int().min(1).max(30).optional(),
});
router.post('/study-log', validate({ body: studyLogBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await analysis.logStudy(req.user.id, req.valid.body) });
});

// The student's own reason for a skipped question (null clears it).
router.put(
  '/skips/:questionId',
  validate({ params: z.object({ questionId: objectId }), body: z.object({ reason: z.enum(skips.REASONS).nullable() }) }),
  async (req, res) => {
    res.set('Cache-Control', 'private, no-store');
    res.json({ success: true, data: await skips.setReason(req.user.id, req.valid.params.questionId, req.valid.body.reason) });
  },
);

module.exports = router;
