'use strict';

const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const { objectId } = require('../validators/common');
const { Question, QuestionReport, User } = require('../models');
const { QUESTION_STATUS, TIERS } = require('../models/constants');
const { compactLocalized } = require('../services/presenters');
const { clearCatalogCache } = require('../services/catalog.service');
const AppError = require('../utils/AppError');
const multer = require('multer');
const bulkImport = require('../services/questionBulkImport.service');
const { classifyLegacyQuestion, hasVerifiedPaperReference, isOfficialSource } = require('../services/questionProvenance');

/** Review portal API. Everything here requires an admin session (see middleware/admin.js). */
const router = Router();
router.use(requireAdmin);

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const page = z.coerce.number().int().min(1).default(1);
const idParams = z.object({ id: objectId });
const batchParams = z.object({ batchId: objectId });
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: bulkImport.MAX_FILE_BYTES, files: 1, fields: 8, parts: 10 },
});
function parseImportUpload(req, res, next) {
  upload.single('file')(req, res, (error) => {
    if (!error) return next();
    if (error instanceof multer.MulterError) {
      const tooLarge = error.code === 'LIMIT_FILE_SIZE';
      return next(new AppError(tooLarge ? 413 : 400, tooLarge ? 'FILE_TOO_LARGE' : 'INVALID_UPLOAD', tooLarge ? 'Upload must be 2 MB or smaller' : 'Upload must contain one .xlsx or .csv file'));
    }
    next(error);
  });
}

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
const officialUrl = z.string().trim().max(1024).refine(isOfficialSource, {
  message: "must be an https link on a commission's own website (psc.wb.gov.in, ssc.gov.in, ...)",
});
// A PYQ tag must cite the commission's published question paper and its answer key:
// without both, the question is not a verified previous-year question.
const pyqBody = z.object({
  examName: z.string().trim().min(2).max(120),
  year: z.coerce.number().int().min(1990).max(2100),
  tier: z.enum(TIERS).optional(),
  shift: z.string().trim().max(40).optional(),
  sourceUrl: officialUrl,
  answerKeyUrl: officialUrl,
});

/** Keeps is_pyq, latest_pyq_year and provenance in step with the refs. */
async function syncPyqFlags(id) {
  const q = await Question.findById(id).select('pyq.refs provenance authored_by').lean();
  if (!q) return;
  const refs = q.pyq?.refs || [];
  let provenance = q.provenance;
  if (hasVerifiedPaperReference(q)) provenance = 'OFFICIAL_VERIFIED';
  else if (provenance === 'OFFICIAL_VERIFIED') provenance = classifyLegacyQuestion(q);
  await Question.updateOne({ _id: id }, { $set: { 'pyq.is_pyq': refs.length > 0, latest_pyq_year: refs.length ? Math.max(...refs.map((r) => r.year)) : null, provenance } });
}

// Tag a question as a verified previous-year question. Only editors who checked the real paper should do this.
router.put('/questions/:id/pyq', validate({ params: idParams, body: pyqBody }), async (req, res) => {
  const { examName, year, tier, shift, sourceUrl, answerKeyUrl } = req.valid.body;
  const q = await Question.findById(req.valid.params.id).select('code').lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  const question_code = [slugPart(examName), year, tier, shift && slugPart(shift), q.code].filter(Boolean).join('-').slice(0, 80);
  await Question.updateOne(
    { _id: q._id, 'pyq.refs.question_code': { $ne: question_code } },
    { $push: { 'pyq.refs': { exam_name: examName, year, ...(tier && { tier }), ...(shift && { shift }), question_code, source_url: sourceUrl, answer_key_url: answerKeyUrl } } },
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

router.get('/import/template.xlsx', async (_req, res) => {
  const buffer = await bulkImport.createTemplate();
  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename="question-import-template.xlsx"',
    'Cache-Control': 'private, no-store',
  });
  res.send(Buffer.from(buffer));
});

router.get('/import/template.csv', (_req, res) => {
  res.set({
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': 'attachment; filename="question-import-template.csv"',
    'Cache-Control': 'private, no-store',
  });
  res.send(bulkImport.createCsvTemplate());
});

router.get('/import/catalog.csv', async (_req, res) => {
  res.set({
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': 'attachment; filename="question-import-catalog.csv"',
    'Cache-Control': 'private, no-store',
  });
  res.send(await bulkImport.createCatalogCsv());
});

const previewBody = z.object({
  category: z.enum(require('../models/constants').EXAM_CATEGORIES),
  examCode: z.string().regex(/^[A-Z0-9_]{1,40}$/),
  defaultSubject: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/).optional().or(z.literal('')),
  defaultTopic: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/).optional().or(z.literal('')),
});
router.post('/import/preview', parseImportUpload, validate({ body: previewBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.status(201).json({
    success: true,
    data: await bulkImport.previewImport({
      file: req.file,
      ...req.valid.body,
      userId: req.admin.id,
    }),
  });
});

const historyQuery = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
router.get('/import/batches', validate({ query: historyQuery }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({ success: true, data: await bulkImport.listHistory({ ...req.valid.query, userId: req.admin.id }) });
});

router.get('/import/batches/:batchId/errors.csv', validate({ params: batchParams }), async (req, res) => {
  const report = await bulkImport.errorReport(req.valid.params.batchId, req.admin.id);
  res.set({
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': `attachment; filename="${report.fileName.replace(/["\r\n]/g, '')}"`,
    'Cache-Control': 'private, no-store',
  });
  res.send(report.csv);
});

const confirmBody = z.object({
  duplicateDecisions: z.array(z.object({
    rowNumber: z.number().int().min(2).max(bulkImport.MAX_ROWS + 1),
    decision: z.enum(['IMPORT_AS_NEW', 'SKIP']),
  }).strict()).max(bulkImport.MAX_ROWS).default([]),
}).strict();
router.post('/import/batches/:batchId/confirm', validate({ params: batchParams, body: confirmBody }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  res.json({
    success: true,
    data: await bulkImport.confirmImport({
      batchId: req.valid.params.batchId,
      userId: req.admin.id,
      duplicateDecisions: req.valid.body.duplicateDecisions,
    }),
  });
});

router.post('/import/batches/:batchId/publish', validate({ params: batchParams, body: z.object({}).strict() }), async (req, res) => {
  res.set('Cache-Control', 'private, no-store');
  const result = await bulkImport.publishBatch({
    batchId: req.valid.params.batchId,
    userId: req.admin.id,
    reviewedBy: req.admin.email,
  });
  if (result.publishedCount > 0) clearCatalogCache();
  res.json({ success: true, data: result });
});

module.exports = router;
