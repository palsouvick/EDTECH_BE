'use strict';

/**
 * Admin edits to a question, with history. Every save bumps `version` and writes
 * a content_revisions row listing each changed field (old and new value); a change
 * of the correct option is flagged `answer_changed`. Option ids never change, so
 * past attempts and the mistake notebook still point at the right options.
 */

const { Question, GkFact } = require('../models');
const AppError = require('../utils/AppError');
const revisions = require('./contentRevision');
const { compactLocalized } = require('./presenters');
const { clearGkCache } = require('./gk.service');

const HTTPS = /^https:\/\/[^\s/]+\.\S+$/;

async function questionOr404(id) {
  const q = await Question.findById(id).select('+correct_option_id +solution');
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  return q;
}

function presentFull(q) {
  return {
    id: String(q._id),
    code: q.code,
    status: q.status,
    version: q.version,
    subject: q.subject,
    topic: q.topic,
    subtopic: q.subtopic ?? null,
    difficulty: q.difficulty,
    provenance: q.provenance,
    questionFormat: q.question_format ?? null,
    stem: compactLocalized(q.stem),
    options: q.options.map((o) => ({ optionId: o.oid, text: compactLocalized(o.text) })),
    correctOptionId: q.correct_option_id,
    steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
    sourceCheck: q.source_check?.status
      ? { status: q.source_check.status, sourceUrl: q.source_check.source_url ?? null, sourceTitle: q.source_check.source_title ?? null, note: q.source_check.note ?? null, checkedBy: q.source_check.checked_by ?? null, checkedAt: q.source_check.checked_at ?? null }
      : { status: q.subject === 'gs' ? 'SOURCE_PENDING' : null },
    retiredReason: q.retired_reason ?? null,
    reviewBy: q.review_by ?? null,
    factIds: (q.fact_ids || []).map(String),
  };
}

async function getQuestion(id) {
  const q = await questionOr404(id);
  const facts = q.fact_ids?.length ? await GkFact.find({ _id: { $in: q.fact_ids } }).select('code title verification.status').lean() : [];
  return {
    question: presentFull(q.toObject()),
    facts: facts.map((f) => ({ id: String(f._id), code: f.code, title: compactLocalized(f.title), verification: f.verification?.status })),
    history: await revisions.history('question', q._id),
  };
}

/**
 * changes: { stem?: {en,bn}, options?: [{ optionId, text: {en,bn} }], correctOptionId?, steps?: [{en,bn}],
 *            difficulty?, subtopic? }
 */
async function editQuestion(id, { changes, reason }, by) {
  const q = await questionOr404(id);
  const before = q.toObject();
  if (changes.stem) q.stem = { ...before.stem, ...changes.stem };
  if (changes.options) {
    const byId = new Map(changes.options.map((o) => [o.optionId, o.text]));
    for (const optionId of byId.keys()) {
      if (!q.options.some((o) => o.oid === optionId)) throw AppError.unprocessable('UNKNOWN_OPTION', `Option ${optionId} is not part of this question`);
    }
    q.options = q.options.map((o) => ({ oid: o.oid, text: byId.has(o.oid) ? { ...o.text.toObject?.() ?? o.text, ...byId.get(o.oid) } : o.text, media: o.media }));
  }
  if (changes.correctOptionId) q.correct_option_id = changes.correctOptionId; // validated against option ids by the model
  if (changes.steps) q.solution.steps = changes.steps;
  if (changes.difficulty) q.difficulty = changes.difficulty;
  if (changes.subtopic !== undefined) q.subtopic = changes.subtopic || undefined;

  const after = q.toObject();
  const opts = (d) => d.options.map((o) => ({ optionId: o.oid, text: o.text }));
  const changed = [
    ...revisions.diff(before, after, ['stem', 'correct_option_id', 'solution.steps', 'difficulty', 'subtopic']),
    ...revisions.diff({ options: opts(before) }, { options: opts(after) }, ['options']),
  ];
  if (!changed.length) return getQuestion(id);
  const answerChanged = changed.some((c) => c.field === 'correct_option_id');
  // A changed question is no longer what was source-checked: the check must be done again.
  if (q.source_check?.status === 'SOURCE_VERIFIED' && changed.some((c) => ['stem', 'options', 'correct_option_id'].includes(c.field))) {
    q.source_check = { status: 'NEEDS_REVIEW', note: `Edited by ${by}: check the source again. ${reason}`, checked_by: by, checked_at: new Date() };
  }
  q.version += 1;
  q.reviewed_by = by;
  await q.save();
  await revisions.record({ entity: 'question', doc: q, version: q.version, action: 'EDIT', by, reason, changes: changed, answerChanged });
  clearGkCache();
  return getQuestion(id);
}

async function setSourceCheck(id, { status, sourceUrl, sourceTitle, note }, by) {
  const q = await questionOr404(id);
  if (status === 'SOURCE_VERIFIED' && (!HTTPS.test(sourceUrl || '') || !sourceTitle)) {
    throw AppError.unprocessable('SOURCE_REQUIRED', 'SOURCE_VERIFIED needs the https link and title of the page that supports the answer');
  }
  const before = q.source_check?.status ?? null;
  q.source_check = { status, source_url: sourceUrl, source_title: sourceTitle, note, checked_by: by, checked_at: new Date() };
  q.version += 1;
  await q.save();
  await revisions.record({ entity: 'question', doc: q, version: q.version, action: 'SOURCE_STATUS', by, reason: note, changes: [{ field: 'source_check.status', from: before, to: status }] });
  clearGkCache();
  return getQuestion(id);
}

async function retireQuestion(id, { reason }, by) {
  const q = await questionOr404(id);
  const from = q.status;
  q.status = 'ARCHIVED';
  q.retired_reason = reason;
  q.version += 1;
  await q.save();
  await revisions.record({ entity: 'question', doc: q, version: q.version, action: 'RETIRE', by, reason, changes: [{ field: 'status', from, to: 'ARCHIVED' }] });
  clearGkCache();
  return getQuestion(id);
}

async function restoreQuestion(id, { reason }, by) {
  const q = await questionOr404(id);
  if (q.status !== 'ARCHIVED') throw AppError.unprocessable('QUESTION_NOT_RETIRED', 'Only a retired question can be restored');
  q.status = 'PUBLISHED';
  q.retired_reason = undefined;
  q.version += 1;
  await q.save();
  await revisions.record({ entity: 'question', doc: q, version: q.version, action: 'RESTORE', by, reason, changes: [{ field: 'status', from: 'ARCHIVED', to: 'PUBLISHED' }] });
  clearGkCache();
  return getQuestion(id);
}

module.exports = { getQuestion, editQuestion, setSourceCheck, retireQuestion, restoreQuestion };
