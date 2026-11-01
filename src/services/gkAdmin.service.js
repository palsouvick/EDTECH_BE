'use strict';

/**
 * Admin console for the GK library. Every change is written to content_revisions
 * with the admin's email, so a corrected answer or a changed source can always be
 * traced. Rules that keep student-facing content honest:
 *  - only a VERIFIED fact is PUBLISHED; changing a fact's statement or sources
 *    sends it back to NEEDS_REVIEW (and DRAFT) until someone verifies it again;
 *  - changing Bengali text resets the Bengali review to PENDING;
 *  - only the explicit Bengali-review action sets REVIEWED, recording who and when;
 *  - retiring a fact archives the questions written for it (not other linked questions).
 */

const { GkFact, Question } = require('../models');
const AppError = require('../utils/AppError');
const { validateFact, validateLibrary } = require('./gkFacts.validate');
const { questionDuplicateKeys } = require('../utils/questionDuplicateKeys');
const revisions = require('./contentRevision');
const { presentFact, clearGkCache } = require('./gk.service');
const { compactLocalized } = require('./presenters');
const { applyRecords, sourceCheckFor, AUTHOR } = require('../../scripts/seedGkFacts');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const EDITABLE = ['title', 'statement', 'explanation', 'subtopic', 'tags', 'difficulty', 'exam_relevance', 'sources', 'dates', 'milestones', 'fact_kind', 'reference_year'];
// Changing any of these changes what the fact claims, so it must be verified again.
const CLAIM_FIELDS = ['statement.en', 'statement.bn', 'sources', 'dates', 'milestones', 'reference_year'];
const BENGALI_FIELDS = ['title.bn', 'statement.bn', 'explanation.bn'];
const DIFF_FIELDS = ['title.en', 'title.bn', 'statement.en', 'statement.bn', 'explanation.en', 'explanation.bn', 'subtopic', 'tags', 'difficulty', 'exam_relevance', 'sources', 'dates', 'milestones', 'fact_kind', 'reference_year'];

const day = (s) => (s ? new Date(`${s}T00:00:00Z`) : null);
const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

function adminFact(f) {
  return {
    ...presentFact(f),
    status: f.status,
    origin: f.origin,
    adminEdited: Boolean(f.admin_edited),
    version: f.version,
    retiredReason: f.retired_reason ?? null,
    verification: {
      status: f.verification?.status ?? 'UNVERIFIED',
      method: f.verification?.method ?? null,
      verifiedAt: iso(f.verification?.verified_at),
      verifiedBy: f.verification?.verified_by ?? null,
      notes: f.verification?.notes ?? '',
    },
    bengaliReview: {
      status: f.bengali_review?.status ?? 'PENDING',
      reviewedBy: f.bengali_review?.reviewed_by ?? null,
      reviewedAt: iso(f.bengali_review?.reviewed_at),
    },
    sources: (f.sources || []).map((s) => ({ title: s.title, url: s.url, publisher: s.publisher ?? null, publisherType: s.publisher_type, accessedAt: iso(s.accessed_at), quote: s.quote ?? null })),
    updatedAt: f.updated_at,
  };
}

async function summary() {
  const now = new Date();
  const [byTopic, staleFacts, staleQuestions, questionChecks] = await Promise.all([
    GkFact.aggregate([{ $group: { _id: { t: '$topic', s: '$status', v: '$verification.status', b: '$bengali_review.status' }, n: { $sum: 1 } } }]),
    GkFact.countDocuments({ status: { $ne: 'RETIRED' }, 'dates.review_by': { $lt: now } }),
    Question.countDocuments({ status: 'PUBLISHED', review_by: { $lt: now } }),
    Question.aggregate([
      { $match: { subject: 'gs' } },
      { $group: { _id: { s: '$status', c: { $ifNull: ['$source_check.status', 'SOURCE_PENDING'] } }, n: { $sum: 1 } } },
    ]),
  ]);
  const topics = {};
  for (const { _id, n } of byTopic) {
    const t = (topics[_id.t] ||= { total: 0, published: 0, draft: 0, retired: 0, verified: 0, needsReview: 0, unverified: 0, bengaliPending: 0 });
    t.total += n;
    t[_id.s === 'PUBLISHED' ? 'published' : _id.s === 'RETIRED' ? 'retired' : 'draft'] += n;
    t[_id.v === 'VERIFIED' ? 'verified' : _id.v === 'NEEDS_REVIEW' ? 'needsReview' : 'unverified'] += n;
    if (_id.b !== 'REVIEWED') t.bengaliPending += n;
  }
  const gsQuestions = { SOURCE_VERIFIED: 0, SOURCE_PENDING: 0, NEEDS_REVIEW: 0, RETIRED: 0 };
  for (const { _id, n } of questionChecks) {
    if (_id.s === 'ARCHIVED') gsQuestions.RETIRED += n;
    else if (_id.s === 'PUBLISHED') gsQuestions[_id.c] += n;
  }
  return { topics, staleFacts, staleQuestions, gsQuestions };
}

async function listFacts({ topic, status, verification, bengali, q, stale, page = 1, limit = 25 }) {
  const filter = {};
  if (topic) filter.topic = topic;
  if (status) filter.status = status;
  if (verification) filter['verification.status'] = verification;
  if (bengali) filter['bengali_review.status'] = bengali;
  if (stale) filter['dates.review_by'] = { $lt: new Date() };
  if (q) {
    const re = new RegExp(escapeRegex(q.trim()), 'i');
    filter.$or = [{ code: re }, { 'title.en': re }, { 'title.bn': re }, { 'statement.en': re }, { 'statement.bn': re }];
  }
  const [rows, total] = await Promise.all([
    GkFact.find(filter).sort({ topic: 1, code: 1 }).skip((page - 1) * limit).limit(limit).lean(),
    GkFact.countDocuments(filter),
  ]);
  return { facts: rows.map(adminFact), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

async function factOr404(id) {
  const f = await GkFact.findById(id);
  if (!f) throw AppError.notFound('GK_FACT_NOT_FOUND', 'Fact not found');
  return f;
}

async function getFact(id) {
  const f = (await factOr404(id)).toObject();
  const questions = await Question.find({ _id: { $in: f.question_ids } })
    .select('code status stem topic source_check question_format authored_by +correct_option_id options')
    .lean();
  return {
    fact: adminFact(f),
    questions: questions.map((q) => ({
      id: String(q._id),
      code: q.code,
      status: q.status,
      format: q.question_format ?? null,
      writtenForFact: q.authored_by === AUTHOR || String(q.authored_by || '').startsWith('admin:'),
      stem: compactLocalized(q.stem),
      correct: compactLocalized(q.options.find((o) => o.oid === q.correct_option_id)?.text),
      sourceCheck: q.source_check?.status ?? 'SOURCE_PENDING',
    })),
    history: await revisions.history('gk_fact', f._id),
  };
}

/** The fact's questions written for it (not other linked questions) follow its status. */
async function syncQuestions(fact, by) {
  const check = sourceCheckFor(fact, by);
  const own = { _id: { $in: fact.question_ids }, $or: [{ authored_by: AUTHOR }, { authored_by: /^admin:/ }] };
  const status = fact.status === 'PUBLISHED' ? 'PUBLISHED' : fact.status === 'RETIRED' ? 'ARCHIVED' : 'DRAFT';
  await Question.updateMany(own, { $set: { status, source_check: check, ...(fact.status === 'RETIRED' && { retired_reason: fact.retired_reason }) } });
  // Older questions linked to this fact: only their source check changes, never their status.
  if (fact.verification.status === 'VERIFIED') {
    // A check someone else set by hand (for example NEEDS_REVIEW on that wording) is left alone.
    await Question.updateMany(
      {
        _id: { $in: fact.question_ids },
        authored_by: { $not: /^(gk_library|admin:)/ },
        $or: [{ 'source_check.status': { $exists: false } }, { 'source_check.checked_by': { $in: [AUTHOR, by] } }],
      },
      { $set: { source_check: check } },
    );
  }
  clearGkCache();
}

/** Converts the admin form (file shape, YYYY-MM-DD dates) into model fields. */
function toModel(changes) {
  const out = { ...changes };
  if (changes.dates) out.dates = Object.fromEntries(Object.entries(changes.dates).map(([k, v]) => [k, day(v)]));
  if (changes.sources) out.sources = changes.sources.map((s) => ({ ...s, accessed_at: day(s.accessed_at) }));
  return out;
}

async function editFact(id, { changes, reason }, by) {
  const fact = await factOr404(id);
  const before = fact.toObject();
  const fileShape = { ...fileShapeOf(before), ...changes };
  const problems = validateFact({ ...fileShape, questions: [], linked_existing: ['x'] }).filter((e) => !['NO_QUESTIONS', 'BENGALI_REVIEW_IN_FILE'].includes(e.code));
  if (problems.length) throw AppError.unprocessable('INVALID_FACT', problems.map((p) => `${p.field}: ${p.message}`).join('; '));

  fact.set(toModel(Object.fromEntries(Object.entries(changes).filter(([k]) => EDITABLE.includes(k)))));
  const after = fact.toObject();
  const changed = revisions.diff(before, after, DIFF_FIELDS);
  if (!changed.length) return getFact(id);

  const fields = new Set(changed.map((c) => c.field));
  const claimChanged = CLAIM_FIELDS.some((f) => fields.has(f));
  if (claimChanged && fact.verification.status === 'VERIFIED') {
    fact.verification.status = 'NEEDS_REVIEW';
    fact.verification.notes = `Edited by ${by}: verify again. ${reason}`;
    if (fact.status === 'PUBLISHED') fact.status = 'DRAFT';
  }
  if (BENGALI_FIELDS.some((f) => fields.has(f))) fact.bengali_review = { status: 'PENDING', reviewed_by: null, reviewed_at: null };
  fact.admin_edited = true;
  fact.version += 1;
  await fact.save();
  await revisions.record({ entity: 'gk_fact', doc: fact, version: fact.version, action: 'EDIT', by, reason, changes: changed, answerChanged: fields.has('statement.en') || fields.has('statement.bn') });
  await syncQuestions(fact.toObject(), by);
  return getFact(id);
}

async function setVerification(id, { status, notes }, by) {
  const fact = await factOr404(id);
  if (fact.status === 'RETIRED') throw AppError.unprocessable('FACT_RETIRED', 'Restore the fact before changing its verification');
  const before = { status: fact.verification.status, notes: fact.verification.notes };
  fact.verification.status = status;
  fact.verification.notes = notes ?? fact.verification.notes;
  fact.verification.method = status === 'VERIFIED' ? 'ADMIN_REVIEW' : fact.verification.method;
  fact.verification.verified_at = status === 'VERIFIED' ? new Date() : fact.verification.verified_at;
  fact.verification.verified_by = status === 'VERIFIED' ? by : fact.verification.verified_by;
  fact.status = status === 'VERIFIED' ? 'PUBLISHED' : 'DRAFT';
  fact.version += 1;
  await fact.save(); // the model refuses VERIFIED without a quoted source
  await revisions.record({ entity: 'gk_fact', doc: fact, version: fact.version, action: 'VERIFY', by, reason: notes, changes: revisions.diff({ verification: before }, { verification: { status, notes: fact.verification.notes } }, ['verification.status', 'verification.notes']) });
  await syncQuestions(fact.toObject(), by);
  return getFact(id);
}

async function approveBengali(id, { note }, by) {
  const fact = await factOr404(id);
  fact.bengali_review = { status: 'REVIEWED', reviewed_by: by, reviewed_at: new Date() };
  fact.version += 1;
  await fact.save();
  await revisions.record({ entity: 'gk_fact', doc: fact, version: fact.version, action: 'BENGALI_REVIEW', by, reason: note, changes: [{ field: 'bengali_review.status', from: 'PENDING', to: 'REVIEWED' }] });
  clearGkCache();
  return getFact(id);
}

async function retire(id, { reason }, by) {
  const fact = await factOr404(id);
  const from = fact.status;
  fact.status = 'RETIRED';
  fact.retired_reason = reason;
  fact.version += 1;
  await fact.save();
  await revisions.record({ entity: 'gk_fact', doc: fact, version: fact.version, action: 'RETIRE', by, reason, changes: [{ field: 'status', from, to: 'RETIRED' }] });
  await syncQuestions(fact.toObject(), by);
  return getFact(id);
}

async function restore(id, { reason }, by) {
  const fact = await factOr404(id);
  if (fact.status !== 'RETIRED') throw AppError.unprocessable('FACT_NOT_RETIRED', 'Only a retired fact can be restored');
  fact.status = fact.verification.status === 'VERIFIED' ? 'PUBLISHED' : 'DRAFT';
  fact.retired_reason = undefined;
  fact.version += 1;
  await fact.save();
  await revisions.record({ entity: 'gk_fact', doc: fact, version: fact.version, action: 'RESTORE', by, reason, changes: [{ field: 'status', from: 'RETIRED', to: fact.status }] });
  await syncQuestions(fact.toObject(), by);
  return getFact(id);
}

/** A stored fact back in the JSONL file shape, for validation of edits. */
function fileShapeOf(f) {
  return {
    code: f.code,
    topic: f.topic,
    subtopic: f.subtopic,
    tags: f.tags,
    fact_kind: f.fact_kind,
    title: f.title,
    statement: f.statement,
    explanation: f.explanation,
    milestones: f.milestones,
    dates: Object.fromEntries(Object.entries(f.dates || {}).map(([k, v]) => [k, iso(v)])),
    reference_year: f.reference_year,
    difficulty: f.difficulty,
    exam_relevance: f.exam_relevance,
    sources: (f.sources || []).map((s) => ({ ...s, accessed_at: iso(s.accessed_at) })),
    verification: { ...f.verification, verified_at: iso(f.verification?.verified_at) },
  };
}

function parseJsonl(text) {
  const records = [];
  const errors = [];
  String(text).split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    try {
      records.push({ ...JSON.parse(line), __row: i + 1 });
    } catch (e) {
      errors.push({ row: i + 1, field: 'line', code: 'INVALID_JSON', message: e.message });
    }
  });
  return { records, errors };
}

/** Validation report for an import: format, duplicates in the file and against the database. */
async function previewImport(text) {
  const { records, errors } = parseJsonl(text);
  if (records.length > 500) errors.push({ row: null, field: 'file', code: 'TOO_MANY', message: 'Import at most 500 facts at a time' });
  errors.push(...validateLibrary(records).errors);
  const codes = records.map((r) => r.code).filter(Boolean);
  const taken = new Set((await GkFact.find({ code: { $in: codes } }).select('code').lean()).map((f) => f.code));
  for (const r of records) if (taken.has(r.code)) errors.push({ row: r.__row, factCode: r.code, field: 'code', code: 'CODE_EXISTS', message: 'A fact with this code already exists; edit it instead of importing' });
  for (const r of records) {
    for (const [j, q] of (Array.isArray(r.questions) ? r.questions : []).entries()) {
      if (!Array.isArray(q?.q)) continue;
      const clash = await Question.findOne({ duplicate_keys: { $in: questionDuplicateKeys({ en: q.q[0] }) } }).select('code').lean();
      if (clash) errors.push({ row: r.__row, factCode: r.code, field: `questions[${j}].q`, code: 'DUPLICATE_QUESTION', message: `repeats existing question ${clash.code}; link it in linked_existing instead` });
    }
  }
  return {
    valid: errors.length === 0,
    facts: records.length,
    verified: records.filter((r) => r.verification?.status === 'VERIFIED').length,
    questions: records.reduce((a, r) => a + (Array.isArray(r.questions) ? r.questions.length : 0), 0),
    errors: errors.slice(0, 200),
  };
}

async function commitImport(text, by) {
  const report = await previewImport(text);
  if (!report.valid) throw AppError.unprocessable('IMPORT_INVALID', `${report.errors.length} problem(s); run the preview and fix them first`);
  const { records } = parseJsonl(text);
  const stats = await applyRecords(records, { origin: 'ADMIN', by });
  const facts = await GkFact.find({ code: { $in: records.map((r) => r.code) } });
  for (const f of facts) await revisions.record({ entity: 'gk_fact', doc: f, version: f.version, action: 'CREATE', by, reason: 'Admin import' });
  clearGkCache();
  return stats;
}

async function stale() {
  const now = new Date();
  const [facts, questions] = await Promise.all([
    GkFact.find({ status: { $ne: 'RETIRED' }, 'dates.review_by': { $lt: now } }).sort({ 'dates.review_by': 1 }).limit(200).lean(),
    Question.find({ status: 'PUBLISHED', review_by: { $lt: now } }).select('code topic stem review_by').sort({ review_by: 1 }).limit(200).lean(),
  ]);
  return {
    facts: facts.map(adminFact),
    questions: questions.map((q) => ({ id: String(q._id), code: q.code, topic: q.topic, stem: compactLocalized(q.stem), reviewBy: iso(q.review_by) })),
  };
}

module.exports = { summary, listFacts, getFact, editFact, setVerification, approveBengali, retire, restore, previewImport, commitImport, stale, EDITABLE };
