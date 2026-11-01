'use strict';

/**
 * GK section (Learn → General Knowledge): the dashboard cards and the fact
 * library. Practice, quizzes, bookmarks, mistakes and revision are the existing
 * question-bank features (subject gs); this service adds only what is new.
 *
 * Every number here is counted from the database. Progress figures exist only for
 * a signed-in student and come from their own practice attempts.
 */

const { GkFact, Question, PracticeAttempt } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { CARDS, GK_TOPICS, cardOf } = require('./gkTaxonomy');
const { compactLocalized } = require('./presenters');
const AppError = require('../utils/AppError');

const BILINGUAL_SETS = langSetsContaining(['en', 'bn']);
const COUNTS_TTL_MS = 2 * 60_000;
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WB_TAG = 'west_bengal';

let countsCache = { at: 0, data: null };
function clearGkCache() {
  countsCache = { at: 0, data: null };
}

/** Published facts and student-facing questions per card, cached briefly. */
async function libraryCounts() {
  if (countsCache.data && Date.now() - countsCache.at < COUNTS_TTL_MS) return countsCache.data;
  const [facts, wbTagged, questions] = await Promise.all([
    GkFact.aggregate([
      { $match: { status: 'PUBLISHED' } },
      { $group: { _id: { t: '$topic', s: '$subtopic', bn: '$bengali_review.status' }, n: { $sum: 1 } } },
    ]),
    GkFact.countDocuments({ status: 'PUBLISHED', tags: WB_TAG, topic: { $ne: 'west_bengal_gk' } }),
    Question.aggregate([
      { $match: { status: 'PUBLISHED', subject: 'gs', topic: { $in: GK_TOPICS }, lang_set: { $in: BILINGUAL_SETS } } },
      { $group: { _id: { t: '$topic', c: { $ifNull: ['$source_check.status', 'SOURCE_PENDING'] } }, n: { $sum: 1 } } },
    ]),
  ]);
  const data = { facts: {}, subtopics: {}, bengaliPending: {}, questions: {}, verifiedQuestions: {}, wbTagged };
  for (const { _id, n } of facts) {
    data.facts[_id.t] = (data.facts[_id.t] || 0) + n;
    data.subtopics[`${_id.t}.${_id.s}`] = (data.subtopics[`${_id.t}.${_id.s}`] || 0) + n;
    if (_id.bn !== 'REVIEWED') data.bengaliPending[_id.t] = (data.bengaliPending[_id.t] || 0) + n;
  }
  for (const { _id, n } of questions) {
    data.questions[_id.t] = (data.questions[_id.t] || 0) + n;
    if (_id.c === 'SOURCE_VERIFIED') data.verifiedQuestions[_id.t] = (data.verifiedQuestions[_id.t] || 0) + n;
  }
  countsCache = { at: Date.now(), data };
  return data;
}

/** A student's practice in GK chapters: distinct questions attempted and answered right at least once. */
async function userProgress(userId) {
  if (!userId) return null;
  const rows = await PracticeAttempt.aggregate([
    { $match: { user_id: userId, subject: 'gs', topic: { $in: GK_TOPICS } } },
    { $group: { _id: { t: '$topic', q: '$question_id' }, answers: { $sum: 1 }, right: { $sum: { $cond: ['$correct', 1, 0] } } } },
    { $group: { _id: '$_id.t', attempted: { $sum: 1 }, answers: { $sum: '$answers' }, correctAnswers: { $sum: '$right' } } },
  ]);
  return new Map(rows.map((r) => [r._id, r]));
}

async function listCards(userId) {
  const [c, progress] = await Promise.all([libraryCounts(), userProgress(userId)]);
  const sum = (obj, topics) => topics.reduce((a, t) => a + (obj[t] || 0), 0);
  return {
    signedIn: Boolean(userId),
    cards: CARDS.map((card) => {
      const own = c.facts[card.code] || 0;
      let mine = null;
      if (progress) {
        const rows = card.topics.map((t) => progress.get(t)).filter(Boolean);
        const answers = rows.reduce((a, r) => a + r.answers, 0);
        const correct = rows.reduce((a, r) => a + r.correctAnswers, 0);
        mine = {
          questionsAttempted: rows.reduce((a, r) => a + r.attempted, 0),
          answers,
          correctAnswers: correct,
          accuracy: answers ? Math.round((correct / answers) * 100) : null,
        };
      }
      return {
        code: card.code,
        emoji: card.emoji,
        title: card.title,
        description: card.description,
        topics: card.topics,
        dated: Boolean(card.dated),
        factCount: own,
        // Facts from other cards tagged West Bengal, also listed on the West Bengal card.
        crossListedFactCount: card.code === 'west_bengal_gk' ? c.wbTagged : 0,
        bengaliPendingCount: c.bengaliPending[card.code] || 0,
        questionCount: sum(c.questions, card.topics),
        sourceVerifiedQuestionCount: sum(c.verifiedQuestions, card.topics),
        subtopics: Object.entries(card.subtopics).map(([code, title]) => ({ code, title, factCount: c.subtopics[`${card.code}.${code}`] || 0 })),
        progress: mine,
      };
    }),
  };
}

const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

function presentFact(f) {
  return {
    id: String(f._id),
    code: f.code,
    topic: f.topic,
    subtopic: f.subtopic,
    tags: f.tags || [],
    factKind: f.fact_kind,
    title: compactLocalized(f.title),
    statement: compactLocalized(f.statement),
    explanation: compactLocalized(f.explanation),
    milestones: (f.milestones || []).map((m) => ({ kind: m.kind, date: m.date, note: compactLocalized(m.note) })),
    dates: {
      eventDate: iso(f.dates?.event_date),
      validFrom: iso(f.dates?.valid_from),
      validTo: iso(f.dates?.valid_to),
      reviewBy: iso(f.dates?.review_by),
    },
    referenceYear: f.reference_year ?? null,
    difficulty: f.difficulty,
    examRelevance: f.exam_relevance || [],
    sources: (f.sources || []).map((s) => ({ title: s.title, url: s.url, publisher: s.publisher ?? null, publisherType: s.publisher_type, accessedAt: iso(s.accessed_at) })),
    verification: { status: f.verification?.status ?? 'UNVERIFIED', verifiedAt: iso(f.verification?.verified_at) },
    // PENDING means the Bengali wording has not been checked by a person yet.
    bengaliReview: f.bengali_review?.status ?? 'PENDING',
    questionCount: (f.question_ids || []).length,
  };
}

/**
 * Published facts, newest-first for current affairs and by code elsewhere, one page
 * at a time (never the whole library). `card: 'west_bengal_gk'` also includes facts
 * from other cards tagged west_bengal.
 */
async function listFacts({ card, subtopic, q, difficulty, exam, year, month, offset = 0, limit = 20 }) {
  const filter = { status: 'PUBLISHED' };
  if (card) {
    if (!cardOf(card)) throw AppError.notFound('GK_CARD_NOT_FOUND', `Unknown GK card ${card}`);
    filter.$or = card === 'west_bengal_gk' ? [{ topic: card }, { tags: WB_TAG }] : [{ topic: card }];
  }
  if (subtopic) filter.subtopic = subtopic;
  if (difficulty) filter.difficulty = { $in: difficulty === 'easy' ? [1, 2] : difficulty === 'medium' ? [3] : [4, 5] };
  if (exam) filter.exam_relevance = exam;
  if (year) {
    const from = new Date(Date.UTC(year, month ? month - 1 : 0, 1));
    const to = new Date(Date.UTC(month ? year : year + 1, month ? month : 0, 1));
    filter['dates.event_date'] = { $gte: from, $lt: to };
  }
  if (q) {
    const re = new RegExp(escapeRegex(q.trim()), 'i');
    const text = [{ 'title.en': re }, { 'title.bn': re }, { 'statement.en': re }, { 'statement.bn': re }, { code: re }];
    filter.$and = [...(filter.$and || []), { $or: text }];
  }
  const sort = card === 'current_affairs' ? { 'dates.event_date': -1, code: 1 } : { code: 1 };
  const [rows, total] = await Promise.all([
    GkFact.find(filter).sort(sort).skip(offset).limit(limit).lean(),
    GkFact.countDocuments(filter),
  ]);
  return { facts: rows.map(presentFact), pagination: { offset, limit, total, hasMore: offset + rows.length < total } };
}

async function getFact(code) {
  const f = await GkFact.findOne({ code: code.toUpperCase(), status: 'PUBLISHED' }).lean();
  if (!f) throw AppError.notFound('GK_FACT_NOT_FOUND', 'Fact not found');
  return presentFact(f);
}

/** Months that have current-affairs facts, for the month/year filter. */
async function currentAffairsMonths() {
  const rows = await GkFact.aggregate([
    { $match: { status: 'PUBLISHED', topic: 'current_affairs', 'dates.event_date': { $type: 'date' } } },
    { $group: { _id: { y: { $year: '$dates.event_date' }, m: { $month: '$dates.event_date' } }, n: { $sum: 1 } } },
    { $sort: { '_id.y': -1, '_id.m': -1 } },
  ]);
  return rows.map((r) => ({ year: r._id.y, month: r._id.m, factCount: r.n }));
}

module.exports = { listCards, listFacts, getFact, currentAffairsMonths, presentFact, clearGkCache };
