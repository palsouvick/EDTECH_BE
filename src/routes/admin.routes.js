'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const { objectId } = require('../validators/common');
const { Question, QuestionReport, User } = require('../models');
const { QUESTION_STATUS, TIERS } = require('../models/constants');
const { compactLocalized } = require('../services/presenters');
const AppError = require('../utils/AppError');

/** Review portal API. Everything here requires an admin session (see middleware/admin.js). */
const router = Router();
router.use(requireAdmin);

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const page = z.coerce.number().int().min(1).default(1);
const idParams = z.object({ id: objectId });

function presentAdminQuestion(q) {
  return {
    id: String(q._id),
    code: q.code,
    status: q.status,
    subject: q.subject,
    topic: q.topic,
    difficulty: q.difficulty,
    categories: [...new Set((q.exam_targets || []).map((t) => t.category))],
    stem: compactLocalized(q.stem),
    options: (q.options || []).map((o) => ({ optionId: o.oid, text: compactLocalized(o.text) })),
    correctOptionId: q.correct_option_id ?? null,
    steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
    shortcut: compactLocalized(q.solution?.shortcut),
    pyq: (q.pyq?.refs || []).map((r) => ({ examName: r.exam_name, year: r.year, tier: r.tier ?? null, shift: r.shift ?? null, code: r.question_code })),
    authoredBy: q.authored_by ?? null,
    reviewedBy: q.reviewed_by ?? null,
    updatedAt: q.updated_at,
  };
}

router.get('/overview', async (_req, res) => {
  const [byStatus, openReports, users, pyq] = await Promise.all([
    Question.aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]),
    QuestionReport.countDocuments({ status: 'OPEN' }),
    User.estimatedDocumentCount(),
    Question.countDocuments({ status: 'PUBLISHED', 'pyq.refs': { $elemMatch: { question_code: { $not: /-SYN-/ } } } }),
  ]);
  const questions = Object.fromEntries(QUESTION_STATUS.map((s) => [s, 0]));
  for (const r of byStatus) questions[r._id] = r.n;
  res.json({ success: true, data: { questions, openReports, users, verifiedPyqs: pyq } });
});

const listQuery = z.object({
  status: z.enum(QUESTION_STATUS).optional(),
  subject: z.string().trim().max(40).optional(),
  q: z.string().trim().max(100).optional(),
  page,
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

router.get('/questions', validate({ query: listQuery }), async (req, res) => {
  const { status, subject, q, page: pg, limit } = req.valid.query;
  const filter = {};
  if (status) filter.status = status;
  if (subject) filter.subject = subject;
  if (q) filter.$or = [{ code: new RegExp(escapeRegex(q), 'i') }, { 'stem.en': new RegExp(escapeRegex(q), 'i') }];
  const [rows, total] = await Promise.all([
    Question.find(filter)
      .select('+correct_option_id +solution')
      .sort({ updated_at: -1, _id: 1 })
      .skip((pg - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ]);
  res.json({ success: true, data: { questions: rows.map(presentAdminQuestion), pagination: { page: pg, limit, total, totalPages: Math.ceil(total / limit) } } });
});

router.patch('/questions/:id/status', validate({ params: idParams, body: z.object({ status: z.enum(QUESTION_STATUS) }) }), async (req, res) => {
  const updated = await Question.findByIdAndUpdate(req.valid.params.id, { $set: { status: req.valid.body.status, reviewed_by: req.admin.email } }, { new: true }).select('code status').lean();
  if (!updated) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  res.json({ success: true, data: { id: req.valid.params.id, code: updated.code, status: updated.status } });
});

const slugPart = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
const pyqBody = z.object({
  examName: z.string().trim().min(2).max(120),
  year: z.coerce.number().int().min(1990).max(2100),
  tier: z.enum(TIERS).optional(),
  shift: z.string().trim().max(40).optional(),
});

async function syncPyqFlags(id) {
  const q = await Question.findById(id).select('pyq.refs').lean();
  const refs = q?.pyq?.refs || [];
  await Question.updateOne({ _id: id }, { $set: { 'pyq.is_pyq': refs.length > 0, latest_pyq_year: refs.length ? Math.max(...refs.map((r) => r.year)) : null } });
}

// Tag a question as a verified previous-year question. Only editors who checked the real paper should do this.
router.put('/questions/:id/pyq', validate({ params: idParams, body: pyqBody }), async (req, res) => {
  const { examName, year, tier, shift } = req.valid.body;
  const q = await Question.findById(req.valid.params.id).select('code').lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  const question_code = [slugPart(examName), year, tier, shift && slugPart(shift), q.code].filter(Boolean).join('-').slice(0, 80);
  await Question.updateOne(
    { _id: q._id, 'pyq.refs.question_code': { $ne: question_code } },
    { $push: { 'pyq.refs': { exam_name: examName, year, ...(tier && { tier }), ...(shift && { shift }), question_code } } },
  );
  await syncPyqFlags(q._id);
  res.json({ success: true, data: { id: String(q._id), questionCode: question_code } });
});

router.delete('/questions/:id/pyq', validate({ params: idParams, query: z.object({ code: z.string().min(1).max(80) }) }), async (req, res) => {
  await Question.updateOne({ _id: req.valid.params.id }, { $pull: { 'pyq.refs': { question_code: req.valid.query.code } } });
  await syncPyqFlags(req.valid.params.id);
  res.json({ success: true, data: { removed: true } });
});

const reportsQuery = z.object({ status: z.enum(['OPEN', 'RESOLVED', 'REJECTED']).default('OPEN'), page, limit: z.coerce.number().int().min(1).max(50).default(20) });

router.get('/reports', validate({ query: reportsQuery }), async (req, res) => {
  const { status, page: pg, limit } = req.valid.query;
  const [reports, total] = await Promise.all([
    QuestionReport.find({ status }).sort({ created_at: -1 }).skip((pg - 1) * limit).limit(limit).lean(),
    QuestionReport.countDocuments({ status }),
  ]);
  const questions = await Question.find({ _id: { $in: reports.map((r) => r.question_id) } })
    .select('+correct_option_id +solution')
    .lean();
  const byId = new Map(questions.map((q) => [String(q._id), presentAdminQuestion(q)]));
  res.json({
    success: true,
    data: {
      reports: reports.map((r) => ({
        id: String(r._id),
        reason: r.reason,
        message: r.message ?? null,
        language: r.language ?? null,
        status: r.status,
        createdAt: r.created_at,
        question: byId.get(String(r.question_id)) ?? null,
      })),
      pagination: { page: pg, limit, total, totalPages: Math.ceil(total / limit) },
    },
  });
});

router.patch('/reports/:id', validate({ params: idParams, body: z.object({ status: z.enum(['OPEN', 'RESOLVED', 'REJECTED']) }) }), async (req, res) => {
  const updated = await QuestionReport.findByIdAndUpdate(req.valid.params.id, { $set: { status: req.valid.body.status } }, { new: true }).select('status').lean();
  if (!updated) throw AppError.notFound('REPORT_NOT_FOUND', 'Report not found');
  res.json({ success: true, data: { id: req.valid.params.id, status: updated.status } });
});

module.exports = router;
