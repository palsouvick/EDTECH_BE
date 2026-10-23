'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { language } = require('../validators/common');
const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('../services/presenters');

/**
 * Previous-year questions, read on screen only. There is no export: pages of at most
 * 20 questions, and answers are revealed one question at a time through
 * /practice/verify-answer (which is rate limited). Pattern-based "-SYN-" refs are
 * not real papers, so they are never listed here.
 */
const router = Router();

const GENUINE = { $elemMatch: { question_code: { $not: /-SYN-/ } } };
const base = { status: 'PUBLISHED', 'pyq.refs': GENUINE };

router.get('/filters', async (_req, res) => {
  const rows = await Question.aggregate([
    { $match: base },
    { $unwind: '$pyq.refs' },
    { $match: { 'pyq.refs.question_code': { $not: /-SYN-/ } } },
    { $group: { _id: { exam: '$pyq.refs.exam_name', year: '$pyq.refs.year' }, n: { $sum: 1 } } },
  ]);
  const exams = new Map();
  for (const r of rows) {
    const e = exams.get(r._id.exam) ?? { name: r._id.exam, years: [], count: 0 };
    e.years.push(r._id.year);
    e.count += r.n;
    exams.set(r._id.exam, e);
  }
  const list = [...exams.values()].map((e) => ({ ...e, years: e.years.sort((a, b) => b - a) })).sort((a, b) => a.name.localeCompare(b.name));
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data: { exams: list } });
});

const listQuery = z.object({
  exam: z.string().trim().max(120).optional(),
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  subject: z.string().trim().toLowerCase().max(40).optional(),
  language: language.default('en'),
  page: z.coerce.number().int().min(1).max(500).default(1),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

router.get('/', validate({ query: listQuery }), async (req, res) => {
  const { exam, year, subject, language: lang, page, limit } = req.valid.query;
  const ref = { question_code: { $not: /-SYN-/ } };
  if (exam) ref.exam_name = exam;
  if (year) ref.year = year;
  const filter = { status: 'PUBLISHED', 'pyq.refs': { $elemMatch: ref }, lang_set: { $in: langSetsContaining(lang) } };
  if (subject) filter.subject = subject;

  const [rows, total] = await Promise.all([
    Question.find(filter)
      .select(PUBLIC_QUESTION_FIELDS)
      .sort({ latest_pyq_year: -1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ]);
  const questions = rows.map((q) => {
    const refs = (q.pyq?.refs || []).filter((r) => !/-SYN-/.test(r.question_code || ''));
    return presentQuestion({ ...q, pyq: { is_pyq: refs.length > 0, refs } }, { subject: q.subject, difficulty: q.difficulty });
  });
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { questions, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
});

module.exports = router;
