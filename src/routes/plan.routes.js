'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { learnQuizLimiter } = require('../middleware/rateLimiters');
const { language, objectId, optionId, timeSpent } = require('../validators/common');
const studyPlan = require('../services/studyPlan.service');
const planTests = require('../services/planTests.service');
const plan = require('../../db/plans/clerkship60');
const idoPlan = require('../services/idoPlan.service');
const idoTest = require('../services/idoTest.service');
const ido = require('../../db/plans/ido');

// The 60-day Clerkship plan is the same for everyone with the same study time; progress is
// per signed-in student. Tests work for guests too, but only a signed-in student's results
// and mistakes are kept.
const router = Router();

const localDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => !Number.isNaN(Date.parse(d)), 'not a date');
const taskIds = z.array(z.string().regex(/^d\d{1,2}-\d{1,2}$/)).max(1000).default([]);
const budget = z.coerce.number().int().refine((b) => plan.BUDGETS.includes(b), `study time must be one of ${plan.BUDGETS.join(', ')} minutes`);
const dayParam = z.object({ day: z.coerce.number().int().min(1).max(plan.days) });

router.get('/clerkship-60', validate({ query: z.object({ budget: budget.default(plan.BASE_BUDGET) }) }), (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ success: true, data: studyPlan.getPlan(req.valid.query.budget) });
});

router.get('/clerkship-60/progress', requireAuth, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { progress: await studyPlan.getProgress(req.user.id) } });
});

router.put('/clerkship-60/progress', requireAuth, validate({
  body: z.object({ startDate: localDate, reset: z.boolean().default(false), budget: budget.optional(), examDate: localDate.nullable().optional() }),
}), async (req, res) => {
  res.json({ success: true, data: { progress: await studyPlan.startPlan(req.user.id, req.valid.body) } });
});

router.post('/clerkship-60/tasks', requireAuth, validate({ body: z.object({ done: taskIds, undone: taskIds }) }), async (req, res) => {
  res.json({ success: true, data: { progress: await studyPlan.setTasks(req.user.id, req.valid.body) } });
});

// A day's test (daily mixed test, weekly test or full mock), then its marking.
router.post('/clerkship-60/days/:day/test', learnQuizLimiter, validate({
  params: dayParam,
  body: z.object({ budget: budget.default(plan.BASE_BUDGET), language: language.default('en') }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await planTests.createTest(req.valid.params.day, req.valid.body) });
});

router.post('/clerkship-60/days/:day/test/check', learnQuizLimiter, validate({
  params: dayParam,
  body: z.object({
    testToken: z.string().min(10).max(8000),
    answers: z.array(z.object({ questionId: objectId, selectedOptionId: optionId.nullable(), timeSpentSec: timeSpent().optional() })).max(120),
  }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await planTests.checkTest(req.valid.params.day, req.valid.body, req.user?.id) });
});

// ------------------------------------------------------------- IDO plan
// The IDO plan (db/plans/ido.js) is the same shape at 30, 45 or 60 days; the
// student picks the length. Its tests also serve the IDO sectional tests and
// the full mock in the official pattern (services/idoTest.service.js).

const idoDays = z.coerce.number().int().refine((d) => ido.DURATIONS.includes(d), `plan length must be one of ${ido.DURATIONS.join(', ')} days`);
const idoBudget = z.coerce.number().int().refine((b) => ido.BUDGETS.includes(b), `study time must be one of ${ido.BUDGETS.join(', ')} minutes`);
const idoDayParam = z.object({ day: z.coerce.number().int().min(1).max(60) });
const idoAnswers = z.object({
  testToken: z.string().min(10).max(8000),
  answers: z.array(z.object({ questionId: objectId, selectedOptionId: optionId.nullable(), timeSpentSec: timeSpent().optional() })).max(120),
});

router.get('/ido', validate({ query: z.object({ days: idoDays.default(60), budget: idoBudget.default(ido.BASE_BUDGET) }) }), (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ success: true, data: idoPlan.getPlan(req.valid.query.days, req.valid.query.budget) });
});

router.get('/ido/progress', requireAuth, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { progress: await idoPlan.getProgress(req.user.id) } });
});

router.put('/ido/progress', requireAuth, validate({
  body: z.object({ startDate: localDate, reset: z.boolean().default(false), budget: idoBudget.optional(), examDate: localDate.nullable().optional(), days: idoDays.optional() }),
}), async (req, res) => {
  res.json({ success: true, data: { progress: await idoPlan.startPlan(req.user.id, req.valid.body) } });
});

router.post('/ido/tasks', requireAuth, validate({ body: z.object({ done: taskIds, undone: taskIds }) }), async (req, res) => {
  res.json({ success: true, data: { progress: await idoPlan.setTasks(req.user.id, req.valid.body) } });
});

router.post('/ido/days/:day/test', learnQuizLimiter, validate({
  params: idoDayParam,
  body: z.object({ days: idoDays.default(60), budget: idoBudget.default(ido.BASE_BUDGET), language: language.default('en') }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await idoTest.createPlanTest(req.valid.params.day, req.valid.body) });
});

router.post('/ido/test/full-mock', learnQuizLimiter, validate({
  body: z.object({ language: language.default('en') }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await idoTest.createFullMock(req.valid.body) });
});

router.post('/ido/test/section/:section', learnQuizLimiter, validate({
  params: z.object({ section: z.enum(ido.SECTIONS.map((s) => s.key)) }),
  body: z.object({ language: language.default('en') }),
}), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await idoTest.createSectional(req.valid.params.section, req.valid.body) });
});

// One check endpoint for every IDO test (plan day, sectional, full mock).
router.post('/ido/test/check', learnQuizLimiter, validate({ body: idoAnswers }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await idoTest.checkTest(req.valid.body, req.user?.id) });
});

module.exports = router;
