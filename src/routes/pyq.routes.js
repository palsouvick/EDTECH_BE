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

const { pyqRefBasis } = require('../services/questionProvenance');
const { subjectName, topicName } = require('../services/catalogNames');
const { getPriorities } = require('../services/priority.service');
const { pyqFilterFor } = require('../services/topicPacks.service');

// Real papers only: the importer marks a question from a commission paper OFFICIAL_VERIFIED
// (official key) or ADAPTED_PYQ (official paper, key unavailable); the presenter then shows
// only refs that pyqRefBasis accepts. Pattern-based "-SYN-" refs are never listed.
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const GENUINE = { $elemMatch: { question_code: { $not: /-SYN-/ } } };
const base = { status: 'PUBLISHED', provenance: { $in: REAL_PAPER }, 'pyq.refs': GENUINE };

/**
 * Exams -> papers (one per year) with how the answers can be trusted and links to the paper
 * and key, plus question counts per subject and topic for topic-wise sets.
 */
router.get('/filters', async (_req, res) => {
  const rows = await Question.aggregate([
    { $match: base },
    { $unwind: '$pyq.refs' },
    { $match: { 'pyq.refs.question_code': { $not: /-SYN-/ } } },
    {
      $group: {
        _id: { exam: '$pyq.refs.exam_name', year: '$pyq.refs.year', subject: '$subject', topic: '$topic', provenance: '$provenance', src: '$pyq.refs.source_url', key: '$pyq.refs.answer_key_url' },
        n: { $sum: 1 },
      },
    },
  ]);
  const exams = new Map();
  const topics = new Map();
  for (const { _id: r, n } of rows) {
    const basis = pyqRefBasis({ question_code: '', source_url: r.src, answer_key_url: r.key }, r.provenance);
    if (!basis) continue;
    const exam = exams.get(r.exam) ?? { name: r.exam, count: 0, papers: new Map() };
    const paper = exam.papers.get(r.year) ?? {
      year: r.year, count: 0, paperUrl: r.src, answerKeyUrl: basis.answerBasis === 'OFFICIAL_KEY' ? r.key : null, ...basis,
    };
    paper.count += n;
    exam.count += n;
    exam.papers.set(r.year, paper);
    exams.set(r.exam, exam);
    const t = `${r.subject}.${r.topic}`;
    const topic = topics.get(t) ?? { subject: r.subject, subjectName: subjectName(r.subject), topic: r.topic, name: topicName(r.subject, r.topic), count: 0, byYear: {} };
    topic.count += n;
    topic.byYear[r.year] = (topic.byYear[r.year] || 0) + n;
    topics.set(t, topic);
  }
  const list = [...exams.values()]
    .map(({ papers, ...e }) => ({ ...e, years: [...papers.keys()].sort((a, b) => b - a), papers: [...papers.values()].sort((a, b) => b.year - a.year) }))
    .sort((a, b) => a.name.localeCompare(b.name));
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data: { exams: list, topics: [...topics.values()].sort((a, b) => b.count - a.count) } });
});

// Chapter priority (Must know / Important / Additional) from these papers, with the rule.
router.get('/priorities', async (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json({ success: true, data: await getPriorities() });
});

const listQuery = z.object({
  exam: z.string().trim().max(120).optional(),
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  subject: z.string().trim().toLowerCase().max(40).optional(),
  topic: z.string().trim().toLowerCase().regex(/^[a-z0-9_]+$/).max(60).optional(),
  // A GK topic pack's code: the real PYQs its terms appear in.
  pack: z.string().regex(/^gk-[a-z]{2,4}-\d{3,5}$/i).optional(),
  language: language.default('en'),
  page: z.coerce.number().int().min(1).max(500).default(1),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

router.get('/', validate({ query: listQuery }), async (req, res) => {
  const { exam, year, subject, topic, pack, language: lang, page, limit } = req.valid.query;
  const ref = { question_code: { $not: /-SYN-/ } };
  if (exam) ref.exam_name = exam;
  if (year) ref.year = year;
  const filter = { ...base, 'pyq.refs': { $elemMatch: ref }, lang_set: { $in: langSetsContaining(lang) } };
  if (subject) filter.subject = subject;
  if (topic) filter.topic = topic;
  if (pack) {
    const byPack = await pyqFilterFor(pack);
    if (!byPack) return res.json({ success: true, data: { questions: [], pagination: { page, limit, total: 0, totalPages: 0 } } });
    filter.$or = byPack.$or;
  }

  // Newest paper first; within a paper, import order, which is the paper's question order.
  const [rows, total] = await Promise.all([
    Question.find(filter)
      .select(PUBLIC_QUESTION_FIELDS)
      .sort({ latest_pyq_year: -1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ]);
  const questions = rows.map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty }));
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: { questions, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
});

module.exports = router;
