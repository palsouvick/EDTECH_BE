'use strict';

/**
 * Practice and progress for the study books: the questions of a chapter (all, a mini test, chosen weak sections,
 * or its real PYQs), answer checking limited to that chapter, and each student's reading progress and results.
 */

const { Question, BookProgress } = require('../models');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const practice = require('./practice.service');
const books = require('./books');
const AppError = require('../utils/AppError');

const MODES = ['practice', 'mini', 'weak', 'pyq'];
const MINI_SIZE = 15;
const LEVEL_ORDER = { basic: 0, moderate: 1, difficult: 2, exam: 3 };
const CATEGORY = 'WBPSC';

function chapterOrThrow(book, code, preview) {
  const loaded = books.loadBook(book);
  const ch = loaded?.chapters.get(code);
  if (!books.visible(ch, preview)) throw AppError.notFound('CHAPTER_NOT_FOUND', 'Chapter not found');
  return { loaded, ch };
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Up to `size` questions spread over the sections in turn, each section's own order shuffled. */
function spread(questions, size) {
  const bySection = new Map();
  for (const q of shuffle(questions)) {
    if (!bySection.has(q.section)) bySection.set(q.section, []);
    bySection.get(q.section).push(q);
  }
  const out = [];
  while (out.length < size && [...bySection.values()].some((l) => l.length)) {
    for (const l of bySection.values()) if (l.length && out.length < size) out.push(l.shift());
  }
  return out;
}

/**
 * The questions for one practice mode, without answers. Each carries `book: { section, level }`;
 * mapped PYQs carry their section and `level: 'pyq'`.
 */
async function chapterQuestions(book, code, { mode = 'practice', sections = [], preview = false } = {}) {
  if (!MODES.includes(mode)) throw AppError.unprocessable('BAD_MODE', `mode must be one of ${MODES.join(', ')}`);
  const { loaded, ch } = chapterOrThrow(book, code, preview);
  const statuses = preview ? ['PUBLISHED', 'DRAFT'] : ['PUBLISHED'];

  if (mode === 'pyq') {
    const taught = books.taughtPyqs(loaded, code);
    const sectionOf = new Map(taught.map((x) => [x.pyq_code, x.section]));
    const docs = await Question.find({ 'pyq.refs.question_code': { $in: [...sectionOf.keys()] }, status: 'PUBLISHED' }).select(PUBLIC_QUESTION_FIELDS).lean();
    const questions = docs
      .map((d) => {
        const ref = (d.pyq?.refs || []).find((r) => sectionOf.has(r.question_code));
        return { d, section: sectionOf.get(ref?.question_code), year: ref?.year ?? 0 };
      })
      .sort((a, b) => b.year - a.year)
      .map(({ d, section }) => presentQuestion(d, { subject: d.subject, book: { chapter: code, section, level: 'pyq' } }));
    return { mode, questions };
  }

  let picked = ch.questions;
  if (mode === 'weak') {
    const wanted = new Set(sections);
    picked = picked.filter((q) => wanted.has(q.section));
    if (!picked.length) throw AppError.unprocessable('NO_SECTIONS', 'Choose at least one section of this chapter');
    picked = shuffle(picked);
  } else if (mode === 'mini') {
    picked = spread(picked, MINI_SIZE);
  } else {
    if (sections.length) picked = picked.filter((q) => sections.includes(q.section));
    // Practice runs from basic to exam level, in book order within a level.
    picked = [...picked].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
  }
  const codes = picked.map((q) => books.questionCode(code, q.id));
  const docs = await Question.find({ code: { $in: codes }, status: { $in: statuses } }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byCode = new Map(docs.map((d) => [d.code, d]));
  const questions = picked
    .map((q) => {
      const d = byCode.get(books.questionCode(code, q.id));
      return d && presentQuestion(d, { subject: d.subject, book: { chapter: code, section: q.section, level: q.level } });
    })
    .filter(Boolean);
  return { mode, questions };
}

/** Checks an answer to one of this chapter's questions (its own questions or its mapped PYQs). */
async function verify(book, code, body, userId, { preview = false } = {}) {
  const { loaded, ch } = chapterOrThrow(book, code, preview);
  const q = await Question.findById(body.questionId).select('code pyq.refs.question_code').lean();
  const own = new Set(ch.questions.map((x) => books.questionCode(code, x.id)));
  const pyqs = new Set(books.taughtPyqs(loaded, code).map((x) => x.pyq_code));
  const belongs = q && (own.has(q.code) || (q.pyq?.refs || []).some((r) => pyqs.has(r.question_code)));
  if (!belongs) throw AppError.notFound('QUESTION_NOT_IN_CHAPTER', 'This question is not part of the chapter');
  return practice.verifyAnswer({ ...body, category: CATEGORY }, userId, { preview: preview && !books.isPublished(ch) });
}

// ---------------------------------------------------------------- progress

const blankChapter = () => ({ read: [], last_section: null, read_at: null, practice: null, mini: null, sections: {} });

function present(doc) {
  return {
    depth: doc?.depth || 'standard',
    last: doc?.last?.chapter ? { chapter: doc.last.chapter, section: doc.last.section, at: doc.last.at } : null,
    chapters: doc?.chapters || {},
  };
}

async function getProgress(userId, book) {
  return present(await BookProgress.findOne({ user_id: userId, book }).lean());
}

/** Section ids that exist in the chapter (unknown ids are dropped, so stale clients cannot store junk). */
function knownSections(book, chapter, ids) {
  const ch = books.loadBook(book)?.chapters.get(chapter);
  const valid = new Set((ch?.sections || []).map((s) => s.id));
  return [...new Set(ids)].filter((id) => valid.has(id));
}

/**
 * Records reading: sections read (merged, never removed), the place the student stopped and their depth.
 * Several chapters can be sent at once, which is how a guest's browser copy is merged at login.
 */
async function saveReading(userId, book, { chapters = [], depth, last } = {}) {
  const doc = (await BookProgress.findOne({ user_id: userId, book })) || new BookProgress({ user_id: userId, book });
  const all = { ...(doc.chapters || {}) };
  for (const { chapter, read = [] } of chapters) {
    if (!books.loadBook(book)?.chapters.has(chapter)) continue;
    const cur = { ...blankChapter(), ...(all[chapter] || {}) };
    const merged = knownSections(book, chapter, [...cur.read, ...read]);
    const total = books.loadBook(book).chapters.get(chapter).sections.length;
    all[chapter] = { ...cur, read: merged, read_at: cur.read_at || (merged.length >= total ? new Date() : null) };
  }
  if (last?.chapter && books.loadBook(book)?.chapters.has(last.chapter)) {
    const [section] = knownSections(book, last.chapter, [last.section].filter(Boolean));
    doc.last = { chapter: last.chapter, section: section || null, at: new Date() };
    if (all[last.chapter]) all[last.chapter].last_section = section || all[last.chapter].last_section;
  }
  if (depth) doc.depth = depth;
  doc.chapters = all;
  doc.markModified('chapters');
  await doc.save();
  return present(doc.toObject());
}

/**
 * Records a finished practice session or mini test: the best and last score, and per-section totals
 * (added up across sessions, so the weak-section analysis has more evidence over time).
 */
async function saveResult(userId, book, { chapter, mode, correct, total, bySection = {} }) {
  if (!books.loadBook(book)?.chapters.has(chapter)) throw AppError.notFound('CHAPTER_NOT_FOUND', 'Chapter not found');
  const doc = (await BookProgress.findOne({ user_id: userId, book })) || new BookProgress({ user_id: userId, book });
  const cur = { ...blankChapter(), ...((doc.chapters || {})[chapter] || {}) };
  const key = mode === 'mini' ? 'mini' : 'practice';
  const now = new Date();
  const prev = cur[key];
  const better = !prev?.best || correct / total > prev.best.correct / prev.best.total;
  cur[key] = { best: better ? { correct, total, at: now } : prev.best, last: { correct, total, at: now }, attempts: (prev?.attempts || 0) + 1 };
  const valid = new Set(knownSections(book, chapter, Object.keys(bySection)));
  const sections = { ...cur.sections };
  for (const [sid, r] of Object.entries(bySection)) {
    if (!valid.has(sid)) continue;
    const s = sections[sid] || { correct: 0, total: 0 };
    sections[sid] = { correct: s.correct + r.correct, total: s.total + r.total };
  }
  cur.sections = sections;
  doc.chapters = { ...(doc.chapters || {}), [chapter]: cur };
  doc.markModified('chapters');
  await doc.save();
  return present(doc.toObject());
}

module.exports = { chapterQuestions, verify, getProgress, saveReading, saveResult, MODES, MINI_SIZE };
