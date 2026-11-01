'use strict';

/**
 * GK section (Learn → General Knowledge): the dashboard (sections and cards),
 * the fact library, and a student's fact bookmarks, fact revision and Daily GK.
 * Practice, quizzes, mocks, question bookmarks, the mistake notebook and question
 * revision are the existing question-bank features (subject gs).
 *
 * Every number here is counted from the database. Progress figures exist only for
 * a signed-in student and come from their own recorded answers (practice, Learn
 * quizzes and revision: practice_attempts).
 */

const { GkFact, Question, PracticeAttempt, GkFactProgress, GkDailySet } = require('../models');
const { REVIEW_INTERVALS_DAYS } = require('../models/ReviewItem');
const { langSetsContaining } = require('../models/schemas/localized');
const { CARDS, SECTIONS, GK_TOPICS, cardOf, cardForTopic, storedSubtopics, subtopicFor } = require('./gkTaxonomy');
const { compactLocalized } = require('./presenters');
const AppError = require('../utils/AppError');

const BILINGUAL_SETS = langSetsContaining(['en', 'bn']);
const COUNTS_TTL_MS = 2 * 60_000;
const DAY_MS = 86_400_000;
const DAILY_SIZE = 10;
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WB_TAG = 'west_bengal';
const OTHER = '_other'; // questions whose subtopic is not a GK subcategory

let countsCache = { at: 0, data: null };
function clearGkCache() {
  countsCache = { at: 0, data: null };
}

const bump = (obj, key, n = 1) => {
  obj[key] = (obj[key] || 0) + n;
};

/** Published facts and student-facing questions per card and subcategory, cached briefly. */
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
      { $group: { _id: { t: '$topic', s: '$subtopic', c: { $ifNull: ['$source_check.status', 'SOURCE_PENDING'] } }, n: { $sum: 1 } } },
    ]),
  ]);
  const data = { facts: {}, subtopics: {}, bengaliPending: {}, questions: {}, verifiedQuestions: {}, subtopicQuestions: {}, wbTagged };
  for (const { _id, n } of facts) {
    bump(data.facts, _id.t, n);
    bump(data.subtopics, `${_id.t}.${_id.s}`, n);
    if (_id.bn !== 'REVIEWED') bump(data.bengaliPending, _id.t, n);
  }
  for (const { _id, n } of questions) {
    bump(data.questions, _id.t, n);
    if (_id.c === 'SOURCE_VERIFIED') bump(data.verifiedQuestions, _id.t, n);
    const card = cardForTopic(_id.t);
    bump(data.subtopicQuestions, `${card.code}.${subtopicFor(_id.t, _id.s) ?? OTHER}`, n);
  }
  countsCache = { at: Date.now(), data };
  return data;
}

/**
 * A student's answers in GK chapters, per card and per subcategory: distinct questions
 * attempted, distinct questions answered right at least once, and answer totals.
 */
async function userProgress(userId) {
  if (!userId) return null;
  const rows = await PracticeAttempt.aggregate([
    { $match: { user_id: userId, subject: 'gs', topic: { $in: GK_TOPICS } } },
    { $group: { _id: '$question_id', topic: { $first: '$topic' }, answers: { $sum: 1 }, right: { $sum: { $cond: ['$correct', 1, 0] } } } },
    { $lookup: { from: 'questions', localField: '_id', foreignField: '_id', as: 'q', pipeline: [{ $project: { subtopic: 1 } }] } },
    { $project: { topic: 1, answers: 1, right: 1, subtopic: { $first: '$q.subtopic' } } },
  ]);
  const byCard = new Map();
  const bySub = new Map();
  const add = (map, key, r) => {
    const cur = map.get(key) || { attempted: 0, completedCorrectly: 0, answers: 0, correctAnswers: 0 };
    cur.attempted += 1;
    if (r.right > 0) cur.completedCorrectly += 1;
    cur.answers += r.answers;
    cur.correctAnswers += r.right;
    map.set(key, cur);
  };
  for (const r of rows) {
    const card = cardForTopic(r.topic);
    if (!card) continue;
    add(byCard, card.code, r);
    add(bySub, `${card.code}.${subtopicFor(r.topic, r.subtopic) ?? OTHER}`, r);
  }
  return { byCard, bySub };
}

const accuracy = (p) => (p?.answers ? Math.round((p.correctAnswers / p.answers) * 100) : null);
const presentProgress = (p) => (p
  ? { questionsAttempted: p.attempted, completedCorrectly: p.completedCorrectly, answers: p.answers, correctAnswers: p.correctAnswers, accuracy: accuracy(p) }
  : { questionsAttempted: 0, completedCorrectly: 0, answers: 0, correctAnswers: 0, accuracy: null });

async function listCards(userId) {
  const [c, progress] = await Promise.all([libraryCounts(), userProgress(userId)]);
  const sum = (obj, topics) => topics.reduce((a, t) => a + (obj[t] || 0), 0);
  const cards = CARDS.map((card) => {
    const subtopics = Object.entries(card.subtopics).map(([code, title]) => ({
      code,
      title,
      factCount: c.subtopics[`${card.code}.${code}`] || 0,
      questionCount: c.subtopicQuestions[`${card.code}.${code}`] || 0,
      progress: progress ? presentProgress(progress.bySub.get(`${card.code}.${code}`)) : null,
    }));
    const otherCount = c.subtopicQuestions[`${card.code}.${OTHER}`] || 0;
    return {
      code: card.code,
      section: card.section,
      emoji: card.emoji,
      title: card.title,
      description: card.description,
      topics: card.topics,
      dated: Boolean(card.dated),
      factCount: c.facts[card.code] || 0,
      // Facts from other cards tagged West Bengal, also listed on the West Bengal card.
      crossListedFactCount: card.code === 'west_bengal_gk' ? c.wbTagged : 0,
      bengaliPendingCount: c.bengaliPending[card.code] || 0,
      questionCount: sum(c.questions, card.topics),
      sourceVerifiedQuestionCount: sum(c.verifiedQuestions, card.topics),
      subtopics,
      // Questions with no GK subcategory yet (shown as "Other" on topic-wise progress).
      otherQuestions: { questionCount: otherCount, progress: progress ? presentProgress(progress.bySub.get(`${card.code}.${OTHER}`)) : null },
      progress: progress ? presentProgress(progress.byCard.get(card.code)) : null,
    };
  });
  const sections = SECTIONS.map((s) => {
    const inSection = cards.filter((card) => card.section === s.code);
    const totals = inSection.reduce(
      (a, card) => ({
        questionCount: a.questionCount + card.questionCount,
        sourceVerifiedQuestionCount: a.sourceVerifiedQuestionCount + card.sourceVerifiedQuestionCount,
        factCount: a.factCount + card.factCount,
      }),
      { questionCount: 0, sourceVerifiedQuestionCount: 0, factCount: 0 },
    );
    let mine = null;
    if (progress) {
      const p = inSection.reduce((a, card) => {
        const x = progress.byCard.get(card.code);
        if (x) for (const k of Object.keys(a)) a[k] += x[k];
        return a;
      }, { attempted: 0, completedCorrectly: 0, answers: 0, correctAnswers: 0 });
      mine = presentProgress(p);
    }
    return { ...s, cards: inSection.map((card) => card.code), topics: [...new Set(inSection.flatMap((card) => card.topics))], ...totals, progress: mine };
  });
  return { signedIn: Boolean(userId), sections, cards };
}

const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

function presentState(p) {
  if (!p) return { bookmarked: false, status: 'new', dueAt: null, lastResult: null };
  return { bookmarked: Boolean(p.bookmarked), status: p.status, dueAt: p.due_at ? new Date(p.due_at).toISOString() : null, lastResult: p.last_result ?? null };
}

function presentFact(f, state) {
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
    ...(state !== undefined && { mine: presentState(state) }),
  };
}

/** The student's state for these facts, keyed by fact id (empty for guests). */
async function statesFor(userId, factIds) {
  if (!userId || !factIds.length) return null;
  const rows = await GkFactProgress.find({ user_id: userId, fact_id: { $in: factIds } }).lean();
  return new Map(rows.map((r) => [String(r.fact_id), r]));
}

/**
 * Published facts, newest first for current affairs and by code elsewhere, one page
 * at a time (never the whole library). `card: 'west_bengal_gk'` also includes facts
 * from other cards tagged west_bengal. A signed-in student can also filter by their
 * own state: bookmarked, due for revision, not yet seen, or known.
 */
async function listFacts({ card, subtopic, q, difficulty, exam, year, month, mine, offset = 0, limit = 20 }, userId) {
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
    filter.$and = [...(filter.$and || []), { $or: [{ 'title.en': re }, { 'title.bn': re }, { 'statement.en': re }, { 'statement.bn': re }, { code: re }] }];
  }
  if (mine) {
    if (!userId) throw new AppError(401, 'UNAUTHENTICATED', 'Sign in to see your own facts');
    const own = { user_id: userId };
    if (mine === 'bookmarked') own.bookmarked = true;
    if (mine === 'due') Object.assign(own, { status: { $ne: 'mastered' }, due_at: { $lte: new Date() } });
    if (mine === 'known') own.status = { $in: ['learning', 'mastered'] };
    const ids = (await GkFactProgress.find(mine === 'unseen' ? { user_id: userId, seen_at: { $ne: null } } : own).select('fact_id').lean()).map((r) => r.fact_id);
    filter._id = mine === 'unseen' ? { $nin: ids } : { $in: ids };
  }
  const sort = card === 'current_affairs' ? { 'dates.event_date': -1, code: 1 } : { code: 1 };
  const [rows, total] = await Promise.all([
    GkFact.find(filter).sort(sort).skip(offset).limit(limit).lean(),
    GkFact.countDocuments(filter),
  ]);
  const states = await statesFor(userId, rows.map((r) => r._id));
  return {
    facts: rows.map((f) => presentFact(f, states ? states.get(String(f._id)) ?? null : undefined)),
    pagination: { offset, limit, total, hasMore: offset + rows.length < total },
  };
}

async function getFact(code, userId) {
  const f = await GkFact.findOne({ code: code.toUpperCase(), status: 'PUBLISHED' }).lean();
  if (!f) throw AppError.notFound('GK_FACT_NOT_FOUND', 'Fact not found');
  const states = await statesFor(userId, [f._id]);
  return presentFact(f, states ? states.get(String(f._id)) ?? null : undefined);
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

// ---- A student's facts: bookmarks, revision, Daily GK -------------------------

async function publishedFactOr404(code) {
  const f = await GkFact.findOne({ code: code.toUpperCase(), status: 'PUBLISHED' }).select('_id topic').lean();
  if (!f) throw AppError.notFound('GK_FACT_NOT_FOUND', 'Fact not found');
  return f;
}

async function setBookmark(userId, code, on) {
  const f = await publishedFactOr404(code);
  const row = await GkFactProgress.findOneAndUpdate(
    { user_id: userId, fact_id: f._id },
    { $set: { bookmarked: on }, $setOnInsert: { topic: f.topic } },
    { upsert: true, new: true },
  ).lean();
  return presentState(row);
}

/**
 * Records one revision of a fact. "known" moves it a step along the intervals (1, 3, 7, 21
 * days) and marks it mastered after the last step; "again" brings it back tomorrow.
 */
async function reviewFact(userId, code, result, { tz = 330, now = new Date() } = {}) {
  const f = await publishedFactOr404(code);
  const cur = await GkFactProgress.findOne({ user_id: userId, fact_id: f._id }).lean();
  const stage = cur?.stage ?? 0;
  let next;
  if (result === 'known') {
    const mastered = stage >= REVIEW_INTERVALS_DAYS.length - 1;
    next = {
      stage: mastered ? stage : stage + 1,
      status: mastered ? 'mastered' : 'learning',
      due_at: mastered ? null : new Date(now.getTime() + REVIEW_INTERVALS_DAYS[stage] * DAY_MS),
    };
  } else {
    next = { stage: 0, status: 'learning', due_at: new Date(now.getTime() + REVIEW_INTERVALS_DAYS[0] * DAY_MS) };
  }
  const row = await GkFactProgress.findOneAndUpdate(
    { user_id: userId, fact_id: f._id },
    { $set: { ...next, last_result: result, seen_at: cur?.seen_at ?? now }, $inc: { reviews: 1 }, $setOnInsert: { topic: f.topic, bookmarked: false } },
    { upsert: true, new: true },
  ).lean();
  await GkDailySet.updateOne({ user_id: userId, day: localDay(now, tz), fact_ids: f._id }, { $addToSet: { done_ids: f._id } });
  return presentState(row);
}

/** Revision centre summary and the facts due now (soonest first). */
async function revision(userId, { limit = 20 } = {}) {
  const now = new Date();
  const [due, counts] = await Promise.all([
    GkFactProgress.find({ user_id: userId, status: 'learning', due_at: { $lte: now } }).sort({ due_at: 1 }).limit(limit).lean(),
    GkFactProgress.aggregate([
      { $match: { user_id: userId } },
      {
        $group: {
          _id: null,
          bookmarked: { $sum: { $cond: ['$bookmarked', 1, 0] } },
          learning: { $sum: { $cond: [{ $eq: ['$status', 'learning'] }, 1, 0] } },
          mastered: { $sum: { $cond: [{ $eq: ['$status', 'mastered'] }, 1, 0] } },
          due: { $sum: { $cond: [{ $and: [{ $eq: ['$status', 'learning'] }, { $lte: ['$due_at', now] }] }, 1, 0] } },
        },
      },
    ]),
  ]);
  const facts = due.length ? await GkFact.find({ _id: { $in: due.map((d) => d.fact_id) }, status: 'PUBLISHED' }).lean() : [];
  const byId = new Map(facts.map((f) => [String(f._id), f]));
  const c = counts[0] || { bookmarked: 0, learning: 0, mastered: 0, due: 0 };
  return {
    counts: { due: c.due, learning: c.learning, mastered: c.mastered, bookmarked: c.bookmarked },
    due: due.filter((d) => byId.has(String(d.fact_id))).map((d) => presentFact(byId.get(String(d.fact_id)), d)),
  };
}

/** The student's local date for a UTC offset in minutes (India: 330). */
function localDay(now, tzMinutes) {
  return new Date(now.getTime() + tzMinutes * 60_000).toISOString().slice(0, 10);
}

/** A stable pseudo-random order for one student and day, so the daily pick is reproducible. */
function dayOrder(userId, day, code) {
  let h = 2166136261;
  for (const ch of `${userId}|${day}|${code}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

/**
 * Today's Daily GK: facts due for revision first, then facts the student has not seen,
 * up to DAILY_SIZE. The set is stored, so it stays the same after a refresh or on
 * another device; reviewed facts are marked done.
 */
async function daily(userId, { tz = 330 } = {}) {
  const now = new Date();
  const day = localDay(now, tz);
  let set = await GkDailySet.findOne({ user_id: userId, day }).lean();
  if (!set) {
    const dueRows = await GkFactProgress.find({ user_id: userId, status: 'learning', due_at: { $lte: now } }).sort({ due_at: 1 }).limit(DAILY_SIZE).select('fact_id').lean();
    const picked = dueRows.map((r) => r.fact_id);
    if (picked.length < DAILY_SIZE) {
      const seen = (await GkFactProgress.find({ user_id: userId, seen_at: { $ne: null } }).select('fact_id').lean()).map((r) => r.fact_id);
      const fresh = await GkFact.find({ status: 'PUBLISHED', _id: { $nin: [...seen, ...picked] } }).select('_id code').lean();
      fresh.sort((a, b) => dayOrder(userId, day, a.code) - dayOrder(userId, day, b.code));
      picked.push(...fresh.slice(0, DAILY_SIZE - picked.length).map((f) => f._id));
    }
    try {
      set = (await GkDailySet.create({ user_id: userId, day, fact_ids: picked })).toObject();
    } catch (e) {
      if (e.code !== 11000) throw e; // created at the same moment by another request
      set = await GkDailySet.findOne({ user_id: userId, day }).lean();
    }
  }
  const [facts, states] = await Promise.all([
    GkFact.find({ _id: { $in: set.fact_ids }, status: 'PUBLISHED' }).lean(),
    statesFor(userId, set.fact_ids),
  ]);
  const byId = new Map(facts.map((f) => [String(f._id), f]));
  const done = new Set((set.done_ids || []).map(String));
  const items = set.fact_ids.map(String).filter((id) => byId.has(id)).map((id) => ({ done: done.has(id), fact: presentFact(byId.get(id), states?.get(id) ?? null) }));
  return { day, total: items.length, done: items.filter((i) => i.done).length, items };
}

/**
 * How many published questions match the practice filters (so the page can show it before
 * the student starts). Same filter as the practice stream.
 */
async function questionCount({ category, topic, subtopic, difficulty, verifiedOnly }) {
  return Question.countDocuments(practiceFilter({ category, topic, subtopic, difficulty, verifiedOnly }));
}

const DIFFICULTY_BANDS = Object.freeze({ easy: [1, 2], medium: [3], hard: [4, 5] });

/** Shared by the practice stream and the count: GS questions of a chapter, narrowed by the GK filters. */
function practiceFilter({ category, topic, subtopic, difficulty, verifiedOnly, language }) {
  return {
    status: 'PUBLISHED',
    'exam_targets.category': category,
    subject: 'gs',
    topic,
    lang_set: { $in: language ? langSetsContaining(language) : BILINGUAL_SETS },
    ...(subtopic && { subtopic: { $in: storedSubtopics(topic, subtopic) } }),
    ...(difficulty && { difficulty: { $in: DIFFICULTY_BANDS[difficulty] } }),
    ...(verifiedOnly && { 'source_check.status': 'SOURCE_VERIFIED' }),
  };
}

module.exports = {
  listCards,
  listFacts,
  getFact,
  currentAffairsMonths,
  presentFact,
  clearGkCache,
  setBookmark,
  reviewFact,
  revision,
  daily,
  questionCount,
  practiceFilter,
  DIFFICULTY_BANDS,
  localDay,
};
