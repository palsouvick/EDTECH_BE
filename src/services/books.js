'use strict';

/**
 * Study books ("Learn like a book"): loads the chapter files in db/books/<book>/*.json, checks them
 * (books.validate.js) and builds what students see. Drafts (db/books/<book>/drafts/) are never loaded.
 * A chapter reaches students only when it is PUBLISHED (and therefore VERIFIED); an admin can preview a
 * DRAFT chapter.
 *
 * PYQ evidence for "Exam focus" and "Previous-year connection" comes from db/books/<book>/pyq_map.json
 * ({ "HIS-02": [{ pyq_code, section, taught }] }), checked by hand, never guessed from keywords at run time.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { validateChapter, publisherOf } = require('./books.validate');

// BOOKS_DIR lets tests point at a fixture folder.
const ROOT = process.env.BOOKS_DIR || path.join(__dirname, '../../db/books');
const BOOKS = Object.freeze({
  history: { dir: 'history', topic: 'indian_history', prefix: 'HIS' },
  geography: { dir: 'geography', topic: 'geography', prefix: 'GEO' },
});
/** Any book's chapter code (HIS-02, GEO-03). */
const CHAPTER_CODE = /^[A-Z]{3}-\d{2}$/;

const questionCode = (chapterCode, qid) => `BK-${chapterCode}-${qid.toUpperCase()}`; // BK-HIS-02-Q01
const sectionTag = (chapterCode, sectionId) => `book:${chapterCode}:${sectionId}`;
const chapterTag = (chapterCode) => `book:${chapterCode}`;

const cache = new Map();

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Short exam label for a PYQ reference ("WBCS (Exe.) Prelims" → "WBCS"). */
function examGroup(examName = '') {
  if (/clerk/i.test(examName)) return 'WBPSC Clerkship';
  if (/wbcs/i.test(examName)) return 'WBCS';
  if (/ido|industrial development/i.test(examName)) return 'WBPSC IDO';
  return examName.trim() || 'Other';
}

/**
 * Loads one book: its table of contents, the chapter files that pass validation and the PYQ map.
 * Invalid chapter files are reported in `errors` and left out, so one bad file never hides the others.
 */
function loadBook(book, { dir = ROOT, fresh = false } = {}) {
  const meta = BOOKS[book];
  if (!meta) return null;
  const key = `${dir}:${book}`;
  if (!fresh && cache.has(key)) return cache.get(key);
  const bookDir = path.join(dir, meta.dir);
  const tocFile = path.join(bookDir, 'toc.js');
  if (!fs.existsSync(tocFile)) return null;
  const toc = require(tocFile);
  const chapters = new Map();
  const errors = [];
  // Chapter files only (chNN-*.json); pyq_map.json and pyq_chapters.json are data files.
  const files = fs.existsSync(bookDir) ? fs.readdirSync(bookDir).filter((f) => /^ch\d{2}-[a-z0-9-]+\.json$/.test(f)).sort() : [];
  const hash = crypto.createHash('sha1');
  for (const file of files) {
    const raw = fs.readFileSync(path.join(bookDir, file));
    hash.update(`${file}:${crypto.createHash('sha256').update(raw).digest('hex')};`);
    let ch;
    try {
      ch = JSON.parse(raw.toString('utf8'));
    } catch (e) {
      errors.push({ file, field: '', code: 'INVALID_JSON', message: e.message });
      continue;
    }
    const errs = ch && ch.book !== book ? [{ field: 'book', code: 'WRONG_BOOK', message: `this folder holds the ${book} book` }] : validateChapter(ch);
    if (!toc.CHAPTERS.some((c) => c.code === ch.code)) errs.push({ field: 'code', code: 'NOT_IN_TOC', message: `${ch.code} is not in the table of contents` });
    if (chapters.has(ch.code)) errs.push({ field: 'code', code: 'DUPLICATE_CHAPTER', message: `${ch.code} appears twice` });
    if (errs.length) {
      errors.push(...errs.map((e) => ({ file, ...e })));
      continue;
    }
    chapters.set(ch.code, { ...ch, file });
  }
  // The question bank de-duplicates by stem, so the same stem in two chapters would silently drop one question.
  const stemOwner = new Map();
  for (const ch of chapters.values()) {
    for (const q of ch.questions) {
      const key = q.q.replace(/\s+/g, ' ').trim();
      const owner = stemOwner.get(key);
      if (owner && owner !== ch.code) errors.push({ file: ch.file, field: `questions.${q.id}`, code: 'DUPLICATE_STEM_ACROSS_CHAPTERS', message: `same question text as a question in ${owner}` });
      else stemOwner.set(key, ch.code);
    }
  }
  const mapFile = path.join(bookDir, 'pyq_map.json');
  const pyqMap = fs.existsSync(mapFile) ? readJson(mapFile) : {};
  if (fs.existsSync(mapFile)) hash.update(`pyq_map:${crypto.createHash('sha256').update(fs.readFileSync(mapFile)).digest('hex')}`);
  const loaded = { book, meta, toc, chapters, pyqMap, errors, fingerprint: hash.digest('hex') };
  cache.set(key, loaded);
  return loaded;
}

/**
 * Admin publish decisions (book_chapter_state, Admin Console → Books), keyed "<book>:<code>". They override the
 * file's `status`; they are loaded by bookAdmin.service (at start-up, after each change and at most a minute old).
 */
let overrides = new Map();
function setOverrides(map) {
  overrides = map;
}

/** The status in force: the admin's decision if there is one, otherwise the file's. */
const effectiveStatus = (ch) => overrides.get(`${ch.book}:${ch.code}`) ?? ch.status;
const isPublished = (ch) => effectiveStatus(ch) === 'PUBLISHED' && ch.verification?.status === 'VERIFIED';
const visible = (ch, preview) => Boolean(ch) && (isPublished(ch) || preview);

/** The PYQs mapped to a chapter (taught ones only), each with its section. */
function taughtPyqs(loaded, code) {
  return (loaded.pyqMap[code] || []).filter((x) => x.taught && x.pyq_code);
}

/** Table of contents with each chapter's availability (and, in preview, drafts as available). */
function getBook(book, { preview = false } = {}) {
  const loaded = loadBook(book);
  if (!loaded) return null;
  const { toc, chapters } = loaded;
  return {
    book,
    title: toc.title,
    parts: toc.PARTS,
    chapters: toc.CHAPTERS.map((c) => {
      const ch = chapters.get(c.code);
      const available = visible(ch, preview);
      return {
        code: c.code,
        number: c.number,
        part: c.part,
        title: available ? ch.title : c.title,
        subtitle: available ? ch.subtitle : null,
        weight: c.weight,
        bengal: c.bengal,
        available,
        draft: available && !isPublished(ch),
        readingMinutes: available ? ch.reading_minutes : null,
        sections: available ? ch.sections.map((s) => ({ id: s.id, heading: s.heading })) : [],
        questionCount: available ? ch.questions.length : 0,
        pyqCount: available ? taughtPyqs(loaded, c.code).length : 0,
      };
    }),
  };
}

/**
 * PYQ evidence per section, from the checked map and the questions in the database:
 * { bySection: { sid: [{ exam, year }] }, byExam: [{ exam, count, years }] }.
 */
async function pyqEvidence(loaded, code) {
  const { Question } = require('../models');
  const taught = taughtPyqs(loaded, code);
  if (!taught.length) return { total: 0, bySection: {}, byExam: [] };
  const docs = await Question.find({ 'pyq.refs.question_code': { $in: taught.map((x) => x.pyq_code) }, status: 'PUBLISHED' })
    .select('pyq.refs.question_code pyq.refs.exam_name pyq.refs.year')
    .lean();
  const refOf = new Map();
  for (const d of docs) for (const r of d.pyq?.refs || []) refOf.set(r.question_code, r);
  const bySection = {};
  const exams = new Map();
  let total = 0;
  for (const x of taught) {
    const r = refOf.get(x.pyq_code);
    if (!r) continue;
    total += 1;
    const exam = examGroup(r.exam_name);
    (bySection[x.section] ||= []).push({ exam, year: r.year });
    const e = exams.get(exam) || { exam, count: 0, years: new Set() };
    e.count += 1;
    e.years.add(r.year);
    exams.set(exam, e);
  }
  const byExam = [...exams.values()].map((e) => ({ exam: e.exam, count: e.count, years: [...e.years].sort((a, b) => a - b) })).sort((a, b) => b.count - a.count);
  return { total, bySection, byExam };
}

/** A chapter as students read it. Claims and their quotes stay internal; each section lists its sources. */
async function getChapter(book, code, { preview = false } = {}) {
  const loaded = loadBook(book);
  const ch = loaded?.chapters.get(code);
  if (!visible(ch, preview)) return null;
  const claimSource = new Map(ch.claims.map((c) => [c.id, c.source]));
  const sourcesOf = (claims = []) => [...new Set(claims.map((id) => claimSource.get(id)).filter(Boolean))];
  const evidence = await pyqEvidence(loaded, code);
  const summarise = (list = []) => {
    const m = new Map();
    for (const { exam, year } of list) m.set(exam, [...new Set([...(m.get(exam) || []), year])].sort((a, b) => a - b));
    return [...m.entries()].map(([exam, years]) => ({ exam, years }));
  };
  const tocEntry = loaded.toc.CHAPTERS.find((c) => c.code === code);
  const idx = loaded.toc.CHAPTERS.indexOf(tocEntry);
  const neighbour = (c) => (c ? { code: c.code, number: c.number, title: c.title, available: visible(loaded.chapters.get(c.code), preview) } : null);
  return {
    book,
    code: ch.code,
    number: ch.number,
    part: ch.part,
    title: ch.title,
    subtitle: ch.subtitle,
    draft: !isPublished(ch),
    weight: tocEntry.weight,
    bengal: tocEntry.bengal,
    subtopics: ch.subtopics,
    relatedFacts: ch.related_facts || [],
    // Chapters to read first, with their titles; ones not written yet are listed too, marked unavailable.
    prerequisites: (ch.prerequisites || []).map((p) => neighbour(loaded.toc.CHAPTERS.find((c) => c.code === p))).filter(Boolean),
    readingMinutes: ch.reading_minutes,
    overview: ch.overview,
    sections: ch.sections.map((s) => ({
      id: s.id,
      heading: s.heading,
      quick: s.quick,
      standard: s.standard,
      deep: s.deep || null,
      boxes: s.boxes || [],
      sources: sourcesOf(s.claims),
      pyq: summarise(evidence.bySection[s.id]),
      questionCount: ch.questions.filter((q) => q.section === s.id).length,
    })),
    events: ch.events || [],
    people: ch.people || [],
    timeline: (ch.timeline || []).map(({ claims, ...t }) => t),
    locate: (ch.locate || []).map(({ claims, ...x }) => x),
    terms: ch.terms,
    causeEffect: ch.cause_effect.map(({ claims, ...x }) => x),
    examFocus: ch.exam_focus.map((x) => ({ ...x, pyq: summarise(evidence.bySection[x.section]) })),
    bengalConnection: { body: ch.bengal_connection.body },
    quickRevision: ch.quick_revision,
    sources: ch.sources.map(({ id, title, url, class: klass }) => ({ id, title, url, class: klass || null, publisher: publisherOf(url) })),
    pyq: { total: evidence.total, byExam: evidence.byExam },
    questionCount: ch.questions.length,
    levels: ['basic', 'moderate', 'difficult', 'exam'].map((level) => ({ level, count: ch.questions.filter((q) => q.level === level).length })),
    previous: neighbour(loaded.toc.CHAPTERS[idx - 1]),
    next: neighbour(loaded.toc.CHAPTERS[idx + 1]),
  };
}

module.exports = {
  BOOKS,
  CHAPTER_CODE,
  ROOT,
  loadBook,
  getBook,
  getChapter,
  isPublished,
  effectiveStatus,
  setOverrides,
  visible,
  taughtPyqs,
  questionCode,
  sectionTag,
  chapterTag,
  examGroup,
};
