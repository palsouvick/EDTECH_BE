'use strict';

/**
 * "📖 Learn this topic" back-links (Feature F6): for a question, the one place the student should go to
 * learn what it tests, with a Subject → Chapter → Topic breadcrumb.
 *
 * Nothing here is guessed from keywords. Every link comes from a relationship that already exists in the
 * content, strongest first; the first that resolves to something a student can open wins:
 *
 *   1. book section    a study-book question's own section tag (book:<CHAPTER>:<section>, set by seedBooks)
 *   2. PYQ map         a real PYQ that db/books/<book>/pyq_map.json records as taught in a section (checked
 *                      by hand; entries marked taught:false are never used)
 *   3. GK fact         a fact the question is linked to (Question.fact_ids — the fact's own questions and its
 *                      linked_existing stems, matched by seedGkFacts)
 *   3b. family         a generated question family listed in FAMILY_SECTIONS (hand-checked: the section
 *                      teaches every pair the family generates)
 *   4. book chapter   a GS question whose subtopic is covered by exactly ONE published chapter of the
 *                      matching book (the chapter's declared `subtopics`); two or more candidates → no link,
 *                      and never for a PYQ that chapter's pyq_map entry marks taught:false
 *   5. lesson          a Math / English question whose chapter has a lesson (db/lessons)
 *   6. concept sheet   a Reasoning / Math / English question whose chapter has a published concept sheet
 *                      (TopicSummary), shown on the /exams/... study page. Not used for GS: a GS sheet is a
 *                      chapter-wide study tip, not a place to learn a fact.
 *
 * A book link is offered only while the chapter is published (books.isPublished, admin overrides
 * included); a fact only while it is PUBLISHED. When nothing resolves the question has no link (null).
 *
 * The result is a target, not a URL — the client owns its routes:
 *   { kind: 'book',   card, book, chapter, section|null, crumbs }
 *   { kind: 'fact',   code, card, crumbs }
 *   { kind: 'lesson', subject, topic, crumbs }
 *   { kind: 'sheet',  category, subject, topic, crumbs }
 * crumbs: 2–3 localized labels, Subject → Chapter → Topic.
 */

const { Question, GkFact, TopicSummary } = require('../models');
const books = require('./books');
const { cardForTopic } = require('./gkTaxonomy');
const { subjectName, topicName } = require('./catalogNames');
const { patternName } = require('./insights.service');
const { compactLocalized } = require('./presenters');
const { loadLessons } = require('../../db/lessons');

const BOOK_TAG = /^book:([A-Z]{3}-\d{2}):([a-z0-9_]+)$/;
const LINK_FIELDS = 'subject topic subtopic pattern concept_tags fact_ids exam_targets.category pyq.refs.question_code';
const SHEET_SUBJECTS = new Set(['reasoning', 'quant', 'english']);
const SHEET_TTL_MS = 5 * 60_000;

/* ------------------------------------------------------------------ static indexes */

let bookIndex = null; // rebuilt when any book's files change (fingerprint)
function bookIndexes() {
  const loaded = Object.keys(books.BOOKS).map((b) => books.loadBook(b)).filter(Boolean);
  const fingerprint = loaded.map((l) => l.fingerprint).join('|');
  if (bookIndex?.fingerprint === fingerprint) return bookIndex;
  const byPrefix = new Map(); // HIS -> loaded book
  const byTopic = new Map(); // indian_history -> loaded book
  const pyq = new Map(); // pyq question code -> [{ loaded, chapter, section }]
  const untaught = new Map(); // pyq question code -> Set of chapter codes that checked it and do NOT teach it
  for (const l of loaded) {
    byPrefix.set(l.meta.prefix, l);
    byTopic.set(l.meta.topic, l);
    for (const [chapter, entries] of Object.entries(l.pyqMap || {})) {
      const ch = l.chapters.get(chapter);
      if (!ch || !Array.isArray(entries)) continue;
      const sectionIds = new Set(ch.sections.map((s) => s.id));
      for (const x of entries) {
        if (!x?.pyq_code) continue;
        if (!x.taught) {
          if (!untaught.has(x.pyq_code)) untaught.set(x.pyq_code, new Set());
          untaught.get(x.pyq_code).add(chapter);
          continue;
        }
        // Only checked "taught" entries whose section is a real section of this chapter (not a pointer to another chapter).
        if (!sectionIds.has(x.section)) continue;
        if (!pyq.has(x.pyq_code)) pyq.set(x.pyq_code, []);
        pyq.get(x.pyq_code).push({ loaded: l, chapter, section: x.section });
      }
    }
  }
  bookIndex = { fingerprint, byPrefix, byTopic, pyq, untaught };
  return bookIndex;
}

let lessonIndex = null;
function lessons() {
  if (!lessonIndex) lessonIndex = new Map(loadLessons().map(({ lesson }) => [`${lesson.subject}.${lesson.topic}`, lesson]));
  return lessonIndex;
}

let sheetCache = { at: 0, data: null };
async function sheets() {
  if (sheetCache.data && Date.now() - sheetCache.at < SHEET_TTL_MS) return sheetCache.data;
  const rows = await TopicSummary.find({ status: 'PUBLISHED', subtopic: null, subject: { $in: [...SHEET_SUBJECTS] } })
    .select('subject topic syllabus_map.category')
    .lean();
  const data = new Map(rows.map((r) => [`${r.subject}.${r.topic}`, (r.syllabus_map || []).map((m) => m.category)]));
  sheetCache = { at: Date.now(), data };
  return data;
}

function clearLearnLinksCache() {
  bookIndex = null;
  lessonIndex = null;
  sheetCache = { at: 0, data: null };
}

/* ------------------------------------------------------------------ targets */

const bn = (text) => (text ? { bn: text } : null); // book text is Bengali only
const crumbsOf = (...parts) => parts.filter(Boolean);
const cardTitle = (topic) => cardForTopic(topic)?.title ?? null;

function bookTarget(loaded, chapterCode, sectionId) {
  const ch = loaded.chapters.get(chapterCode);
  if (!ch || !books.isPublished(ch)) return null;
  const section = sectionId ? ch.sections.find((s) => s.id === sectionId) : null;
  if (sectionId && !section) return null;
  return {
    kind: 'book',
    card: loaded.meta.topic,
    book: loaded.book,
    chapter: ch.code,
    section: section?.id ?? null,
    crumbs: crumbsOf(cardTitle(loaded.meta.topic) ?? { en: loaded.book }, bn(ch.title), section && bn(section.heading)),
  };
}

function fromBookTag(q, idx) {
  for (const tag of q.concept_tags || []) {
    const m = BOOK_TAG.exec(tag);
    if (!m) continue;
    const loaded = idx.byPrefix.get(m[1].slice(0, 3));
    const t = loaded && bookTarget(loaded, m[1], m[2]);
    if (t) return t;
  }
  return null;
}

function fromPyqMap(q, idx) {
  for (const ref of q.pyq?.refs || []) {
    for (const x of idx.pyq.get(ref.question_code) || []) {
      const t = bookTarget(x.loaded, x.chapter, x.section);
      if (t) return t;
    }
  }
  return null;
}

/**
 * Generated question families taught by one book section, checked by hand: every pair the family
 * generates appears in that section (test/learnLinks.test.js checks this against the generator rows).
 * Matched on topic + all listed concept tags, never on stem keywords.
 */
const FAMILY_SECTIONS = [
  // scripts/generators/supplement/gs.js WB_DISTRICTS: "headquarters of X district" both ways → the 23-district HQ table.
  { topic: 'west_bengal_gk', tags: ['gs-pairs', 'districts'], book: 'GEO', chapter: 'GEO-11', section: 'districts' },
];

function fromFamily(q, idx) {
  const tags = new Set(q.concept_tags || []);
  for (const f of FAMILY_SECTIONS) {
    if (q.topic !== f.topic || !f.tags.every((t) => tags.has(t))) continue;
    const loaded = idx.byPrefix.get(f.book);
    const t = loaded && bookTarget(loaded, f.chapter, f.section);
    if (t) return t;
  }
  return null;
}

function fromSubtopicChapter(q, idx) {
  if (q.subject !== 'gs' || !q.subtopic) return null;
  const loaded = idx.byTopic.get(q.topic);
  if (!loaded) return null;
  const matches = [...loaded.chapters.values()].filter((ch) => books.isPublished(ch) && (ch.subtopics || []).includes(q.subtopic));
  if (matches.length !== 1) return null;
  // A PYQ the chapter's own PYQ check found it does not teach is never sent there.
  const code = matches[0].code;
  if ((q.pyq?.refs || []).some((r) => idx.untaught.get(r.question_code)?.has(code))) return null;
  return bookTarget(loaded, code, null);
}

function factTarget(f) {
  const card = cardForTopic(f.topic);
  const sub = card?.subtopics?.[f.subtopic] ?? null;
  return { kind: 'fact', code: f.code, card: card?.code ?? f.topic, crumbs: crumbsOf(card?.title ?? { en: f.topic }, sub, compactLocalized(f.title)) };
}

function patternCrumb(q) {
  return q.pattern ? patternName(q.subject, q.topic, q.pattern)?.name ?? null : null;
}

function fromLesson(q) {
  const lesson = lessons().get(`${q.subject}.${q.topic}`);
  if (!lesson) return null;
  return { kind: 'lesson', subject: q.subject, topic: q.topic, crumbs: crumbsOf(subjectName(q.subject), lesson.title ?? topicName(q.subject, q.topic), patternCrumb(q)) };
}

function fromSheet(q, sheetMap) {
  if (!SHEET_SUBJECTS.has(q.subject)) return null;
  const categories = sheetMap.get(`${q.subject}.${q.topic}`);
  if (!categories?.length) return null;
  // A category the question is set for whose syllabus has the chapter, so the study page exists there.
  const own = (q.exam_targets || []).map((t) => t.category);
  const category = own.find((c) => categories.includes(c)) ?? categories[0];
  return { kind: 'sheet', category, subject: q.subject, topic: q.topic, crumbs: crumbsOf(subjectName(q.subject), topicName(q.subject, q.topic), patternCrumb(q)) };
}

/* ------------------------------------------------------------------ public API */

/**
 * Learn links for many questions in one go: Map<questionId string, target|null>.
 * Reads the link fields itself, so callers need not widen their own projections.
 */
async function learnLinksFor(questionIds) {
  const ids = [...new Set((questionIds || []).map(String).filter(Boolean))];
  const out = new Map(ids.map((id) => [id, null]));
  if (!ids.length) return out;
  const qs = await Question.find({ _id: { $in: ids } }).select(LINK_FIELDS).lean();
  const idx = bookIndexes();

  const factIds = [...new Set(qs.flatMap((q) => (q.fact_ids || []).map(String)))];
  const needSheets = qs.some((q) => SHEET_SUBJECTS.has(q.subject));
  const [facts, sheetMap] = await Promise.all([
    factIds.length ? GkFact.find({ _id: { $in: factIds }, status: 'PUBLISHED' }).select('code topic subtopic title').lean() : [],
    needSheets ? sheets() : new Map(),
  ]);
  const factById = new Map(facts.map((f) => [String(f._id), f]));

  for (const q of qs) {
    const fact = (q.fact_ids || []).map((id) => factById.get(String(id))).find(Boolean);
    const target = fromBookTag(q, idx)
      ?? fromPyqMap(q, idx)
      ?? (fact ? factTarget(fact) : null)
      ?? fromFamily(q, idx)
      ?? fromSubtopicChapter(q, idx)
      ?? fromLesson(q)
      ?? fromSheet(q, sheetMap);
    out.set(String(q._id), target);
  }
  return out;
}

/** The learn link for one question, or null. */
async function learnLinkFor(questionId) {
  if (!questionId) return null;
  return (await learnLinksFor([questionId])).get(String(questionId)) ?? null;
}

/** learnLinksFor that never throws: an empty map on failure. */
async function learnLinksSafe(questionIds) {
  try {
    return await learnLinksFor(questionIds);
  } catch (err) {
    console.error('[learn-links] not resolved:', err.message);
    return new Map();
  }
}

/** learnLinkFor that never throws: null on failure. */
async function safeLearnLinkFor(questionId) {
  try {
    return await learnLinkFor(questionId);
  } catch (err) {
    console.error('[learn-links] not resolved:', err.message);
    return null;
  }
}

module.exports = { learnLinksFor, learnLinkFor, learnLinksSafe, safeLearnLinkFor, clearLearnLinksCache };
