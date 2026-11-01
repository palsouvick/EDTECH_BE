'use strict';

/**
 * Validates GK fact records in the db/gk/*.jsonl shape (see db/gk/README.md).
 * Used by the seed script, the admin import preview and the tests, so a fact
 * that fails here can never reach students by any route.
 *
 *   validateFact(record)        -> [{ field, code, message }]
 *   validateLibrary(records)    -> { errors: [{ row, factCode, field, code, message }] }
 */

const { CARDS, SUBTOPICS, EXAM_RELEVANCE, QUESTION_FORMATS } = require('./gkTaxonomy');
const { MILESTONE_KINDS, VERIFICATION_STATUS } = require('../models/GkFact');
const { normalizeQuestionText } = require('../utils/questionDuplicateKeys');

const BN = /[ঀ-৿]/;
const CODE_RE = /^GK-([A-Z]{2,4})-\d{3,5}$/;
const SLUG = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MILESTONE_DATE_RE = /^-?\d{1,4}(-\d{2}(-\d{2})?)?$/;
const PREFIX = Object.fromEntries(CARDS.map((c) => [c.code, c.prefix]));

const isStr = (v, max = 4000) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const isLoc = (v, max) => v && typeof v === 'object' && isStr(v.en, max) && isStr(v.bn, max);
const isPair = (v, max) => Array.isArray(v) && v.length === 2 && isStr(v[0], max) && isStr(v[1], max);
const validDate = (s) => typeof s === 'string' && DATE_RE.test(s) && !Number.isNaN(Date.parse(s));

function validateQuestion(q, at) {
  const errors = [];
  const err = (field, code, message) => errors.push({ field: `${at}.${field}`, code, message });
  if (!q || typeof q !== 'object') return [{ field: at, code: 'INVALID', message: 'question must be an object' }];
  if (!QUESTION_FORMATS.includes(q.format)) err('format', 'INVALID_FORMAT', `format must be one of ${QUESTION_FORMATS.join(', ')}`);
  if (!Number.isInteger(q.d) || q.d < 1 || q.d > 5) err('d', 'INVALID_DIFFICULTY', 'd must be an integer 1-5');
  for (const k of ['q', 'a', 'e']) if (!isPair(q[k], k === 'q' ? 1500 : 1200)) err(k, 'MISSING_TEXT', `${k} must be [english, bengali]`);
  if (!Array.isArray(q.w) || q.w.length !== 3 || !q.w.every((w) => isPair(w, 600))) err('w', 'WRONG_OPTIONS', 'w must be exactly 3 [english, bengali] pairs (4 options in all)');
  if (errors.length) return errors;
  const opts = [q.a, ...q.w];
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  if (new Set(opts.map((o) => norm(o[0]))).size !== 4) err('w', 'DUPLICATE_OPTION', 'options must be distinct in English');
  if (new Set(opts.map((o) => norm(o[1]))).size !== 4) err('w', 'DUPLICATE_OPTION_BN', 'options must be distinct in Bengali');
  if (!BN.test(q.q[1])) err('q', 'BENGALI_MISSING', 'the Bengali stem has no Bengali text');
  if (!BN.test(q.e[1])) err('e', 'BENGALI_MISSING', 'the Bengali explanation has no Bengali text');
  // Numbers, codes and "1 only"-style answers may be identical in both languages; words may not.
  for (const o of opts) if (!BN.test(o[1]) && /[a-z]{4,}/i.test(o[1]) && !/^[A-Z0-9 ,.()&/-]+$/.test(o[1])) err('w', 'OPTION_NOT_BENGALI', `option "${o[1]}" is not in Bengali`);
  if (/\bPYQ\b|previous[- ]year/i.test(q.q[0])) err('q', 'PYQ_CLAIM', 'GK library questions are original practice; do not label them as previous-year questions');
  return errors;
}

/** Errors for one record. Pure: no database access. */
function validateFact(f) {
  const errors = [];
  const err = (field, code, message) => errors.push({ field, code, message });
  if (!f || typeof f !== 'object' || Array.isArray(f)) return [{ field: 'record', code: 'INVALID', message: 'each line must be a JSON object' }];

  const m = CODE_RE.exec(f.code || '');
  if (!m) err('code', 'INVALID_CODE', 'code must look like GK-IGK-001');
  if (!PREFIX[f.topic]) err('topic', 'UNKNOWN_TOPIC', `topic must be one of ${Object.keys(PREFIX).join(', ')}`);
  else {
    if (m && m[1] !== PREFIX[f.topic]) err('code', 'CODE_PREFIX', `codes in ${f.topic} start with GK-${PREFIX[f.topic]}-`);
    if (!SUBTOPICS[f.topic].includes(f.subtopic)) err('subtopic', 'UNKNOWN_SUBTOPIC', `subtopic must be one of ${SUBTOPICS[f.topic].join(', ')}`);
  }
  if (f.tags != null && (!Array.isArray(f.tags) || !f.tags.every((t) => SLUG.test(t)))) err('tags', 'INVALID_TAGS', 'tags must be lowercase slugs');
  if (!['STATIC', 'CHANGING'].includes(f.fact_kind)) err('fact_kind', 'INVALID_KIND', 'fact_kind must be STATIC or CHANGING');
  for (const k of ['title', 'statement', 'explanation']) {
    if (!isLoc(f[k], k === 'title' ? 200 : 2000)) err(k, 'MISSING_TEXT', `${k} needs non-empty en and bn`);
    else if (!BN.test(f[k].bn)) err(k, 'BENGALI_MISSING', `${k}.bn has no Bengali text`);
  }
  if (!Number.isInteger(f.difficulty) || f.difficulty < 1 || f.difficulty > 5) err('difficulty', 'INVALID_DIFFICULTY', 'difficulty must be an integer 1-5');
  if (!Array.isArray(f.exam_relevance) || !f.exam_relevance.every((e) => EXAM_RELEVANCE.includes(e))) {
    err('exam_relevance', 'INVALID_EXAM', `exam_relevance values must be from ${EXAM_RELEVANCE.join(', ')}`);
  }

  const dates = f.dates || {};
  for (const k of ['event_date', 'valid_from', 'valid_to', 'review_by']) {
    if (dates[k] != null && !validDate(dates[k])) err(`dates.${k}`, 'INVALID_DATE', `dates.${k} must be YYYY-MM-DD or null`);
  }
  if (f.fact_kind === 'CHANGING' && (!dates.valid_from || !dates.review_by)) err('dates', 'CHANGING_NEEDS_DATES', 'a CHANGING fact needs dates.valid_from and dates.review_by');
  if (f.topic === 'current_affairs' && !dates.event_date) err('dates.event_date', 'EVENT_DATE_REQUIRED', 'current affairs facts need dates.event_date');
  if (f.reference_year != null && (!Number.isInteger(f.reference_year) || f.reference_year < 1800 || f.reference_year > 2100)) err('reference_year', 'INVALID_YEAR', 'reference_year must be a year');
  for (const [i, ms] of (f.milestones || []).entries()) {
    if (!MILESTONE_KINDS.includes(ms?.kind)) err(`milestones[${i}].kind`, 'INVALID_MILESTONE', `kind must be one of ${MILESTONE_KINDS.join(', ')}`);
    if (!MILESTONE_DATE_RE.test(ms?.date || '')) err(`milestones[${i}].date`, 'INVALID_DATE', 'milestone date must be YYYY, YYYY-MM or YYYY-MM-DD');
  }

  const sources = Array.isArray(f.sources) ? f.sources : [];
  sources.forEach((s, i) => {
    if (!isStr(s?.title, 300)) err(`sources[${i}].title`, 'SOURCE_TITLE', 'source title is required');
    if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(s?.url || '')) err(`sources[${i}].url`, 'SOURCE_URL', 'source url must be an https link');
    if (!['OFFICIAL', 'INSTITUTIONAL', 'REFERENCE'].includes(s?.publisher_type)) err(`sources[${i}].publisher_type`, 'SOURCE_TYPE', 'publisher_type must be OFFICIAL, INSTITUTIONAL or REFERENCE');
    if (s?.accessed_at != null && !validDate(s.accessed_at)) err(`sources[${i}].accessed_at`, 'INVALID_DATE', 'accessed_at must be YYYY-MM-DD');
  });

  const v = f.verification || {};
  if (!VERIFICATION_STATUS.includes(v.status)) err('verification.status', 'INVALID_STATUS', `verification.status must be one of ${VERIFICATION_STATUS.join(', ')}`);
  if (v.status === 'VERIFIED') {
    const backed = sources.filter((s) => isStr(s?.quote, 2000) && s.accessed_at && ['OFFICIAL', 'INSTITUTIONAL'].includes(s.publisher_type));
    if (!backed.length) err('sources', 'VERIFIED_NEEDS_SOURCE', 'a VERIFIED fact needs an OFFICIAL or INSTITUTIONAL source with a quote and an access date');
    if (!validDate(v.verified_at)) err('verification.verified_at', 'INVALID_DATE', 'a VERIFIED fact needs verified_at (YYYY-MM-DD)');
  }
  if (f.bengali_review != null && f.bengali_review !== 'PENDING') {
    // Only an admin action records a Bengali review (who and when); files cannot claim one.
    err('bengali_review', 'BENGALI_REVIEW_IN_FILE', 'bengali_review must be PENDING in library files');
  }

  if (f.linked_existing != null && (!Array.isArray(f.linked_existing) || !f.linked_existing.every((s) => isStr(s, 1500)))) {
    err('linked_existing', 'INVALID_LINKS', 'linked_existing must be a list of question stems');
  }
  const questions = Array.isArray(f.questions) ? f.questions : [];
  if (!questions.length && !(f.linked_existing || []).length) err('questions', 'NO_QUESTIONS', 'a fact needs at least one question or one linked existing question');
  questions.forEach((q, i) => errors.push(...validateQuestion(q, `questions[${i}]`)));
  return errors;
}

/** Whole-library checks on top of validateFact: unique codes and no repeated question stems. */
function validateLibrary(records) {
  const errors = [];
  const codes = new Map();
  const stems = new Map();
  records.forEach((f, i) => {
    const row = f?.__row ?? i + 1;
    for (const e of validateFact(f)) errors.push({ row, factCode: f?.code ?? null, ...e });
    if (f?.code) {
      if (codes.has(f.code)) errors.push({ row, factCode: f.code, field: 'code', code: 'DUPLICATE_CODE', message: `code also used on row ${codes.get(f.code)}` });
      else codes.set(f.code, row);
    }
    for (const [j, q] of (Array.isArray(f?.questions) ? f.questions : []).entries()) {
      if (!isPair(q?.q)) continue;
      const key = normalizeQuestionText(q.q[0]);
      if (stems.has(key)) errors.push({ row, factCode: f.code, field: `questions[${j}].q`, code: 'DUPLICATE_QUESTION', message: `same question as ${stems.get(key)}` });
      else stems.set(key, `${f.code} question ${j + 1}`);
    }
  });
  return { errors };
}

module.exports = { validateFact, validateQuestion, validateLibrary };
