'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const studyPlan = require('../services/studyPlan.service');

// The 60-day Clerkship plan is the same for everyone; progress is per signed-in student.
const router = Router();

const localDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => !Number.isNaN(Date.parse(d)), 'not a date');
const taskIds = z.array(z.string().regex(/^d\d{1,2}-\d{1,2}$/)).max(1000).default([]);

router.get('/clerkship-60', (_req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ success: true, data: studyPlan.getPlan() });
});

router.get('/clerkship-60/progress', requireAuth, async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { progress: await studyPlan.getProgress(req.user.id) } });
});

router.put('/clerkship-60/progress', requireAuth, validate({ body: z.object({ startDate: localDate, reset: z.boolean().default(false) }) }), async (req, res) => {
  res.json({ success: true, data: { progress: await studyPlan.startPlan(req.user.id, req.valid.body) } });
});

router.post('/clerkship-60/tasks', requireAuth, validate({ body: z.object({ done: taskIds, undone: taskIds }) }), async (req, res) => {
  res.json({ success: true, data: { progress: await studyPlan.setTasks(req.user.id, req.valid.body) } });
});

module.exports = router;
