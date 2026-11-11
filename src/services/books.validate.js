'use strict';

/**
 * Checks one study-book chapter (db/books/<book>/*.json) against the format in db/books/README.md.
 * Returns a list of { field, code, message }; an empty list means the chapter is valid.
 */

const { CARDS } = require('./gkTaxonomy');

const SLUG = /^[a-z][a-z0-9_]{1,40}$/;
const CODE = /^HIS-\d{2}$/;
const QID = /^q\d{2}$/;
const CLAIM = /^c\d{2,3}$/;
const PARTS = ['intro', 'ancient', 'medieval', 'modern_company', 'modern_national', 'post_independence'];
const LEVELS = ['basic', 'moderate', 'difficult', 'exam'];
const FORMATS = ['DIRECT', 'STATEMENT', 'MATCH', 'CHRONOLOGY', 'PAIRS', 'ASSERTION_REASON'];
const BOX_KINDS = ['exam_note', 'dont_confuse', 'did_you_know', 'bengal', 'remember'];
const MIN_QUESTIONS = 30;
const BENGALI = /[ঀ-৿]/;
const BANNED_OPTIONS = /^(all of the above|none of (the above|these)|উপরের সবকটি|উপরের সবগুলি|উপরের কোনোটিই নয়|কোনোটিই নয়)$/i;
/**
 * Allowed sources (owner decisions of 2026-11-11): NCERT textbooks for the all-India foundation, and the official
 * West Bengal school textbooks (WBBSE / Banglar Shiksha e-Text Books) as the West Bengal-specific foundation.
 */
const SOURCE_PUBLISHERS = Object.freeze({
  NCERT: /^https:\/\/ncert\.nic\.in\/textbook\/pdf\/[a-z0-9]+\.pdf$/i,
  WBBSE: /^https:\/\/(banglarshiksha\.wb\.gov\.in\/readwrite\/etextbook\/[^?#]+\.pdf|wbbse\.wb\.gov\.in\/\S+)$/i,
});
const publisherOf = (url = '') => Object.keys(SOURCE_PUBLISHERS).find((p) => SOURCE_PUBLISHERS[p].test(url)) || null;

const HISTORY_SUBTOPICS = new Set(Object.keys(CARDS.find((c) => c.code === 'indian_history').subtopics));

const str = (v) => typeof v === 'string' && v.trim().length > 0;

function validateChapter(ch) {
  const errors = [];
  const err = (field, code, message) => errors.push({ field, code, message });
  if (!ch || typeof ch !== 'object') return [{ field: '', code: 'NOT_OBJECT', message: 'chapter must be an object' }];

  if (ch.book !== 'history') err('book', 'BAD_BOOK', 'book must be "history"');
  if (!CODE.test(ch.code || '')) err('code', 'BAD_CODE', 'code must look like HIS-02');
  if (!Number.isInteger(ch.number) || ch.number < 0 || ch.number > 28) err('number', 'BAD_NUMBER', 'number must be 0-28');
  else if (CODE.test(ch.code || '') && Number(ch.code.slice(4)) !== ch.number) err('number', 'CODE_MISMATCH', 'number must match the code');
  if (!PARTS.includes(ch.part)) err('part', 'BAD_PART', `part must be one of ${PARTS.join(', ')}`);
  for (const f of ['title', 'subtitle']) if (!str(ch[f]) || !BENGALI.test(ch[f])) err(f, 'NOT_BENGALI', `${f} must be Bengali text`);
  for (const s of ch.subtopics || []) if (!HISTORY_SUBTOPICS.has(s)) err('subtopics', 'UNKNOWN_SUBTOPIC', `unknown History subtopic "${s}"`);
  if (!Array.isArray(ch.subtopics) || !ch.subtopics.length) err('subtopics', 'REQUIRED', 'at least one subtopic');
  for (const p of ch.prerequisites || []) if (!CODE.test(p)) err('prerequisites', 'BAD_CODE', `"${p}" is not a chapter code`);
  for (const k of ['quick', 'standard']) if (!(ch.reading_minutes?.[k] > 0)) err(`reading_minutes.${k}`, 'REQUIRED', 'reading time in minutes');

  if (!['DRAFT', 'PUBLISHED'].includes(ch.status)) err('status', 'BAD_STATUS', 'status must be DRAFT or PUBLISHED');
  const vStatus = ch.verification?.status;
  if (!['UNVERIFIED', 'NEEDS_REVIEW', 'VERIFIED'].includes(vStatus)) err('verification.status', 'BAD_STATUS', 'UNVERIFIED | NEEDS_REVIEW | VERIFIED');
  if (ch.status === 'PUBLISHED' && vStatus !== 'VERIFIED') err('status', 'NOT_VERIFIED', 'a PUBLISHED chapter must be VERIFIED');

  // Sources and claims
  const sources = new Map();
  for (const [i, s] of (ch.sources || []).entries()) {
    if (!str(s.id) || sources.has(s.id)) err(`sources[${i}].id`, 'BAD_ID', 'unique source id required');
    const publisher = publisherOf(s.url);
    if (!publisher) err(`sources[${i}].url`, 'SOURCE_NOT_ALLOWED', 'sources must be NCERT textbook PDFs (https://ncert.nic.in/textbook/pdf/…) or WBBSE / Banglar Shiksha e-Text Books (https://banglarshiksha.wb.gov.in/readwrite/etextbook/…)');
    else if (s.publisher && s.publisher !== publisher) err(`sources[${i}].publisher`, 'PUBLISHER_MISMATCH', `the URL is a ${publisher} book`);
    if (!str(s.title)) err(`sources[${i}].title`, 'REQUIRED', 'title required');
    sources.set(s.id, s);
  }
  if (!sources.size) err('sources', 'REQUIRED', 'at least one source');
  const claims = new Set();
  for (const [i, c] of (ch.claims || []).entries()) {
    if (!CLAIM.test(c.id || '') || claims.has(c.id)) err(`claims[${i}].id`, 'BAD_ID', 'unique claim id like c01 required');
    claims.add(c.id);
    if (!str(c.claim)) err(`claims[${i}].claim`, 'REQUIRED', 'claim text required');
    if (!str(c.quote)) err(`claims[${i}].quote`, 'REQUIRED', 'verbatim source quote required');
    if (!sources.has(c.source)) err(`claims[${i}].source`, 'UNKNOWN_SOURCE', `unknown source "${c.source}"`);
  }
  const usedClaims = new Set();
  const checkClaims = (field, list, { required = false } = {}) => {
    if (list === undefined && !required) return;
    if (!Array.isArray(list) || (required && !list.length)) return err(field, 'CLAIMS_REQUIRED', 'list the claims this relies on');
    for (const id of list) {
      if (!claims.has(id)) err(field, 'UNKNOWN_CLAIM', `unknown claim "${id}"`);
      usedClaims.add(id);
    }
  };

  // Overview and sections
  if (!str(ch.overview?.intro) || !BENGALI.test(ch.overview.intro)) err('overview.intro', 'REQUIRED', 'Bengali introduction required');
  if (!Array.isArray(ch.overview?.you_will_learn) || ch.overview.you_will_learn.length < 3) err('overview.you_will_learn', 'REQUIRED', 'at least 3 points');
  const sections = new Set();
  const list = Array.isArray(ch.sections) ? ch.sections : [];
  if (list.length < 4 || list.length > 8) err('sections', 'COUNT', `4-8 sections required (has ${list.length})`);
  for (const [i, s] of list.entries()) {
    const f = `sections[${i}]`;
    if (!SLUG.test(s.id || '') || sections.has(s.id)) err(`${f}.id`, 'BAD_ID', 'unique lowercase slug id required');
    sections.add(s.id);
    if (!str(s.heading) || !BENGALI.test(s.heading)) err(`${f}.heading`, 'NOT_BENGALI', 'Bengali heading required');
    for (const k of ['quick', 'standard']) if (!str(s[k]) || !BENGALI.test(s[k])) err(`${f}.${k}`, 'NOT_BENGALI', `Bengali ${k} text required`);
    if (s.deep !== null && s.deep !== undefined && !str(s.deep)) err(`${f}.deep`, 'BAD_DEEP', 'deep must be text or null');
    for (const [j, b] of (s.boxes || []).entries()) {
      if (!BOX_KINDS.includes(b.kind)) err(`${f}.boxes[${j}].kind`, 'BAD_KIND', `kind must be one of ${BOX_KINDS.join(', ')}`);
      if (!str(b.body)) err(`${f}.boxes[${j}].body`, 'REQUIRED', 'box body required');
    }
    checkClaims(`${f}.claims`, s.claims, { required: true });
  }
  const sectionRef = (field, id) => {
    if (!sections.has(id)) err(field, 'UNKNOWN_SECTION', `unknown section "${id}"`);
  };

  // Learning blocks
  const blocks = [
    ['events', ['title', 'when', 'what', 'why_it_matters'], true],
    ['people', ['name', 'role', 'contribution'], true],
    ['terms', ['term', 'meaning'], false],
    ['cause_effect', ['title', 'event'], true],
    ['exam_focus', ['point'], false],
  ];
  for (const [key, fields, hasClaims] of blocks) {
    if (!Array.isArray(ch[key])) {
      err(key, 'REQUIRED', `${key} must be a list`);
      continue;
    }
    for (const [i, x] of ch[key].entries()) {
      for (const k of fields) if (!str(x[k])) err(`${key}[${i}].${k}`, 'REQUIRED', `${k} required`);
      if (x.section !== undefined) sectionRef(`${key}[${i}].section`, x.section);
      if (hasClaims) checkClaims(`${key}[${i}].claims`, x.claims, { required: true });
      if (key === 'cause_effect' && (!x.causes?.length || !x.results?.length)) err(`${key}[${i}]`, 'REQUIRED', 'causes and results required');
    }
  }
  for (const key of ['events', 'people', 'terms', 'exam_focus']) if (Array.isArray(ch[key]) && !ch[key].length) err(key, 'EMPTY', `${key} must not be empty`);
  if (!Array.isArray(ch.timeline) || !ch.timeline.length) err('timeline', 'REQUIRED', 'timeline required');
  else {
    for (const [i, t] of ch.timeline.entries()) {
      if (!Number.isFinite(t.sort_year)) err(`timeline[${i}].sort_year`, 'REQUIRED', 'numeric sort_year required');
      if (!str(t.when) || !str(t.label)) err(`timeline[${i}]`, 'REQUIRED', 'when and label required');
      checkClaims(`timeline[${i}].claims`, t.claims, { required: true });
    }
    const years = ch.timeline.map((t) => t.sort_year);
    if (years.some((y, i) => i && y < years[i - 1])) err('timeline', 'NOT_SORTED', 'timeline must be in date order');
  }
  if (!str(ch.bengal_connection?.body)) err('bengal_connection.body', 'REQUIRED', 'Bengal connection required');
  checkClaims('bengal_connection.claims', ch.bengal_connection?.claims);
  if (!Array.isArray(ch.quick_revision) || ch.quick_revision.length < 6) err('quick_revision', 'REQUIRED', 'at least 6 revision points');

  // Questions
  const qs = Array.isArray(ch.questions) ? ch.questions : [];
  if (qs.length < MIN_QUESTIONS) err('questions', 'COUNT', `at least ${MIN_QUESTIONS} questions (has ${qs.length})`);
  const qids = new Set();
  const stems = new Set();
  for (const [i, q] of qs.entries()) {
    const f = `questions[${i}]`;
    if (!QID.test(q.id || '') || qids.has(q.id)) err(`${f}.id`, 'BAD_ID', 'unique id like q01 required');
    qids.add(q.id);
    sectionRef(`${f}.section`, q.section);
    if (!LEVELS.includes(q.level)) err(`${f}.level`, 'BAD_LEVEL', `level must be one of ${LEVELS.join(', ')}`);
    if (!FORMATS.includes(q.format)) err(`${f}.format`, 'BAD_FORMAT', `format must be one of ${FORMATS.join(', ')}`);
    if (!str(q.q) || !BENGALI.test(q.q)) err(`${f}.q`, 'NOT_BENGALI', 'Bengali question required');
    if (!str(q.e) || !BENGALI.test(q.e)) err(`${f}.e`, 'NOT_BENGALI', 'Bengali explanation required');
    const opts = [q.a, ...(Array.isArray(q.w) ? q.w : [])];
    if (!Array.isArray(q.w) || q.w.length !== 3) err(`${f}.w`, 'OPTIONS', 'exactly 3 wrong options');
    if (opts.some((o) => !str(o))) err(`${f}.a`, 'OPTIONS', 'options must be non-empty text');
    else {
      if (new Set(opts.map((o) => o.trim().toLowerCase())).size !== opts.length) err(`${f}.w`, 'DUPLICATE_OPTION', 'options must be distinct');
      if (opts.some((o) => BANNED_OPTIONS.test(o.trim()))) err(`${f}.w`, 'BANNED_OPTION', '"All/None of the above" options are not allowed');
    }
    const key = (q.q || '').replace(/\s+/g, ' ').trim();
    if (stems.has(key)) err(`${f}.q`, 'DUPLICATE_STEM', 'question repeats another question in this chapter');
    stems.add(key);
    checkClaims(`${f}.claims`, q.claims, { required: true });
  }
  for (const level of LEVELS) if (qs.length && !qs.some((q) => q.level === level)) err('questions', 'LEVEL_MISSING', `no ${level} questions`);
  for (const s of sections) if (qs.length && !qs.some((q) => q.section === s)) err('questions', 'SECTION_UNTESTED', `section "${s}" has no questions`);
  for (const id of claims) if (!usedClaims.has(id)) err('claims', 'UNUSED_CLAIM', `claim "${id}" is not used anywhere`);

  return errors;
}

module.exports = { validateChapter, publisherOf, SOURCE_PUBLISHERS, MIN_QUESTIONS, LEVELS };
