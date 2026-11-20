'use strict';

/**
 * F9/F10 — the unified mastery service: gathers each chapter's evidence once
 * and runs the ONE definition in mastery.logic.js over it. Every screen reads
 * from here (insights → Home + Mastery page, the Math/English analysis pages,
 * the syllabus map, Today's Study, custom-test signals and Readiness), so a
 * chapter has the same stage everywhere.
 *
 * Evidence per catalogue chapter (subject.topic):
 *   answers        practice, Learn quizzes, revision and mock/custom tests
 *                  (insights.answersOf), with difficulty, source and PYQ flag
 *   content        Math/English: lesson sections read (ChapterStudy);
 *                  GS: the study book's published sections read
 *                  (BookProgress) or GK fact cards seen (GkFactProgress),
 *                  whichever is further; Reasoning: none exists yet → null
 *   PYQ            real-paper questions in the bank and the student's answers to them
 *   mistakes       the student's mistake-notebook items (ReviewItem from_mistake)
 *   revision       answers given while revising (source 'review')
 *   mastery test   Math/English: the chapter's Advanced Learn quiz (LearnProgress);
 *                  GS: the book's chapter mini tests (BookProgress), averaged
 *                  over the book's published chapters
 *
 * Opening a chapter is never evidence: content counts only for sections the
 * reading heartbeat or book reader recorded as read.
 */

const { Question, ReviewItem, ChapterStudy, BookProgress, GkFact, GkFactProgress, LearnProgress } = require('../models');
const catalog = require('../../db/seed/catalog');
const { loadLessons } = require('../../db/lessons');
const books = require('./books');
const { subjectName, topicName } = require('./catalogNames');
const M = require('./mastery.logic');
const { memo, inRequestScope } = require('../utils/requestScope');

const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const TTL_MS = 5 * 60_000;

/** Every catalogue chapter once, in catalogue order. */
const CHAPTERS = (() => {
  const seen = new Map();
  for (const c of catalog) for (const s of c.subjects) for (const t of s.topics) {
    const k = `${s.code}.${t.code}`;
    if (!seen.has(k)) seen.set(k, { subject: s.code, topic: t.code });
  }
  return [...seen.values()];
})();

const BOOK_OF_TOPIC = new Map(Object.entries(books.BOOKS).map(([book, meta]) => [`gs.${meta.topic}`, book]));

let bankCache = { at: 0, data: null };
let factCache = { at: 0, data: null };
let lessonKeys = null;
const clearMasteryCache = () => {
  bankCache = { at: 0, data: null };
  factCache = { at: 0, data: null };
  lessonKeys = null;
};

/** Published questions and real-paper PYQs per chapter. */
async function bankCounts() {
  if (bankCache.data && Date.now() - bankCache.at < TTL_MS) return bankCache.data;
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED' } },
    {
      $group: {
        _id: { s: '$subject', t: '$topic' },
        n: { $sum: 1 },
        pyq: { $sum: { $cond: [{ $and: [{ $eq: ['$pyq.is_pyq', true] }, { $in: ['$provenance', REAL_PAPER] }] }, 1, 0] } },
      },
    },
  ]);
  const data = new Map(rows.map((r) => [`${r._id.s}.${r._id.t}`, { n: r.n, pyq: r.pyq }]));
  bankCache = { at: Date.now(), data };
  return data;
}

/** Published GK facts per card (fact topic). */
async function factCounts() {
  if (factCache.data && Date.now() - factCache.at < TTL_MS) return factCache.data;
  const rows = await GkFact.aggregate([{ $match: { status: 'PUBLISHED' } }, { $group: { _id: '$topic', n: { $sum: 1 } } }]);
  const data = new Map(rows.map((r) => [r._id, r.n]));
  factCache = { at: Date.now(), data };
  return data;
}

function lessons() {
  if (!lessonKeys) lessonKeys = new Set(loadLessons().map(({ lesson }) => `${lesson.subject}.${lesson.topic}`));
  return lessonKeys;
}

/** A study book's published sections read and its mini-test average, for one student. */
function bookEvidence(book, progress) {
  const loaded = books.loadBook(book);
  if (!loaded) return null;
  const published = [...loaded.chapters.values()].filter((ch) => books.isPublished(ch));
  if (!published.length) return null;
  let total = 0;
  let read = 0;
  let testSum = 0;
  let testAt = null;
  for (const ch of published) {
    const p = progress?.chapters?.[ch.code];
    const sections = new Set((ch.sections || []).map((s) => s.id));
    total += sections.size;
    read += (p?.read || []).filter((id) => sections.has(id)).length;
    const best = p?.mini?.best;
    if (best?.total) {
      testSum += (best.correct / best.total) * 100;
      const at = best.at ? new Date(best.at) : null;
      if (at && (!testAt || at > testAt)) testAt = at;
    }
  }
  return {
    contentPct: total ? (read / total) * 100 : null,
    // A topic's mastery test = every published chapter's mini test (missing = 0).
    test: { available: true, bestPct: Math.round(testSum / published.length), at: testAt },
  };
}

/**
 * Unified mastery for every catalogue chapter (or only `subjects`).
 * @returns {Promise<Map<string, object>>} 'subject.topic' -> { subject, topic, name, stage, score, accuracy, needsWork, status, next, evidence }
 */
async function chapterMastery(userId, opts = {}) {
  const uid = String(userId);
  if (!inRequestScope() || opts.now !== undefined) return computeChapterMastery(uid, opts);
  // In a request, several services ask for this (GET /me/today: insights, the
  // syllabus and the syllabus map). Compute every chapter once from the
  // student's shared answers and hand each caller its subjects' rows.
  const { answersOf } = require('./insights.service');
  if (opts.answers && opts.answers !== (await answersOf(uid))) return computeChapterMastery(uid, opts);
  const all = await memo(`chapterMastery:${uid}`, () => computeChapterMastery(uid, {}));
  if (!opts.subjects) return all;
  return new Map([...all].filter(([, v]) => opts.subjects.includes(v.subject)));
}

async function computeChapterMastery(userId, { subjects = null, now = new Date(), answers: given = null } = {}) {
  const uid = String(userId);
  // Lazy: insights requires this module too.
  const { answersOf } = require('./insights.service');
  const [answers, bank, facts, mistakes, studies, bookDocs, factRows, learnRows] = await Promise.all([
    given ?? answersOf(uid),
    bankCounts(),
    factCounts(),
    ReviewItem.find({ user_id: uid, from_mistake: true }).select('subject topic status wrong_count reviews').lean(),
    ChapterStudy.find({ user_id: uid }).select('subject topic sections_read sections_total').lean(),
    BookProgress.find({ user_id: uid }).select('book chapters').lean(),
    GkFactProgress.aggregate([{ $match: { user_id: uid, seen_at: { $ne: null } } }, { $group: { _id: '$topic', n: { $sum: 1 } } }]),
    LearnProgress.find({ user_id: uid, level: 'advanced' }).select('subject topic best updated_at').lean(),
  ]);

  const group = (list) => {
    const m = new Map();
    for (const x of list) {
      const k = `${x.subject}.${x.topic}`;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(x);
    }
    return m;
  };
  const answersBy = group(answers);
  const mistakesBy = group(mistakes);
  const studyBy = new Map(studies.map((s) => [`${s.subject}.${s.topic}`, s]));
  const bookBy = new Map(bookDocs.map((b) => [b.book, b]));
  const seenFacts = new Map(factRows.map((r) => [r._id, r.n]));
  const learnBy = new Map(learnRows.map((r) => [`${r.subject}.${r.topic}`, r]));
  const lessonSet = lessons();

  const out = new Map();
  for (const { subject, topic } of CHAPTERS) {
    if (subjects && !subjects.includes(subject)) continue;
    const key = `${subject}.${topic}`;

    // Content and mastery test: whatever exists for this chapter.
    let content = null;
    let test = null;
    if (lessonSet.has(key)) {
      const st = studyBy.get(key);
      content = { pct: st?.sections_total ? (Math.min(st.sections_read.length, st.sections_total) / st.sections_total) * 100 : 0, source: 'lesson' };
      const lp = learnBy.get(key);
      test = { available: true, bestPct: lp?.best?.total ? Math.round((lp.best.correct / lp.best.total) * 100) : null, at: lp?.updated_at ?? null };
    }
    if (subject === 'gs') {
      const book = BOOK_OF_TOPIC.get(key);
      const be = book ? bookEvidence(book, bookBy.get(book)) : null;
      const factTotal = facts.get(topic) ?? 0;
      const factPct = factTotal ? ((seenFacts.get(topic) ?? 0) / factTotal) * 100 : null;
      const options = [
        be?.contentPct != null ? { pct: be.contentPct, source: 'book' } : null,
        factPct != null ? { pct: factPct, source: 'facts' } : null,
      ].filter(Boolean);
      if (options.length) content = options.sort((a, b) => b.pct - a.pct)[0];
      if (be) test = be.test;
    }

    const b = bank.get(key) ?? { n: 0, pyq: 0 };
    const ev = M.evidenceFrom(answersBy.get(key) ?? [], {
      now,
      bank: b.n,
      pyqBank: b.pyq,
      content,
      mistakes: mistakesBy.get(key) ?? [],
      test,
    });
    const r = M.stageOf(ev, now);
    out.set(key, {
      subject,
      topic,
      name: topicName(subject, topic),
      subjectName: subjectName(subject),
      stage: r.stage,
      score: r.score,
      accuracy: r.accuracy,
      needsWork: r.needsWork,
      status: M.legacyStatus(r),
      next: r.next,
      evidence: {
        answers: ev.answers,
        unique: ev.unique,
        days: ev.days,
        practicePct: ev.practicePct,
        content: ev.content,
        pyq: ev.pyq,
        mistakes: { made: ev.mistakes.made, open: ev.mistakes.open, repeated: ev.mistakes.repeated, revisedPct: ev.mistakes.revisedPct },
        revision: ev.revision,
        test: ev.test ? { bestPct: ev.test.bestPct, at: ev.test.at ? ev.test.at.toISOString() : null } : null,
        lastActivityAt: ev.lastActivityAt ? ev.lastActivityAt.toISOString() : null,
      },
    });
  }
  return out;
}

/** Stage counts and per-subject summaries, for GET /me/mastery. */
async function masterySummary(userId, { subject = null } = {}) {
  const map = await chapterMastery(userId, { subjects: subject ? [subject] : null });
  const rows = [...map.values()];
  const counts = Object.fromEntries(M.STAGES.map((s) => [s, rows.filter((r) => r.stage === s).length]));
  const bySubject = {};
  for (const r of rows) {
    const s = (bySubject[r.subject] ??= { subject: r.subject, name: r.subjectName, chapters: 0, counts: Object.fromEntries(M.STAGES.map((x) => [x, 0])), scored: 0, scoreSum: 0 });
    s.chapters += 1;
    s.counts[r.stage] += 1;
    if (r.score != null) {
      s.scored += 1;
      s.scoreSum += r.score;
    }
  }
  const subjects = Object.values(bySubject).map(({ scoreSum, scored, ...s }) => ({ ...s, avgScore: scored ? Math.round(scoreSum / scored) : null }));
  return { stages: M.STAGES, rules: M.RULES, counts, subjects, chapters: rows };
}

module.exports = { chapterMastery, masterySummary, clearMasteryCache, bankCounts, CHAPTERS };
