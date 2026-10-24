'use strict';

const config = require('../config');
const { Question, TopicSummary, ExamCategory, Bookmark, QuestionReport, PracticeAttempt } = require('../models');
const { langSetsContaining, languagesOf } = require('../models/schemas/localized');
const { LANGUAGES } = require('../models/constants');
const AppError = require('../utils/AppError');
const statsBuffer = require('./questionStats.buffer');
const {
  PUBLIC_QUESTION_FIELDS,
  compactLocalized,
  presentQuestion,
  presentTopicSummary,
  presentTopicSummaryAllLanguages,
} = require('./presenters');
const { encodeCursor, decodeCursor, afterKey } = require('./practiceCursor');
const { subjectName, topicName } = require('./catalogNames');
const review = require('./review.service');

// Easy first, then most recent PYQ, then a stable tiebreak. Matches the
// trailing keys of qb_cat_subj_topic_lang_diff, so the planner merges the
// per-lang_set index ranges (SORT_MERGE) instead of sorting in memory.
const PRACTICE_SORT = { difficulty: 1, latest_pyq_year: -1, _id: 1 };

const SUMMARY_FIELDS =
  'slug title overview formulas derivation_rules speed_tricks common_traps syllabus_map';

async function getTopicView({ category, subject, topic, language, page, limit }) {
  const filter = {
    status: 'PUBLISHED',
    'exam_targets.category': category,
    subject,
    topic,
    lang_set: { $in: langSetsContaining(language) },
  };

  const [summary, questions, total] = await Promise.all([
    TopicSummary.findOne({ subject, topic, subtopic: null, status: 'PUBLISHED' })
      .select(SUMMARY_FIELDS)
      .lean(),
    Question.find(filter)
      .select(PUBLIC_QUESTION_FIELDS)
      .sort(PRACTICE_SORT)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ]);

  if (!summary && total === 0) {
    throw AppError.notFound('TOPIC_NOT_FOUND', `No published content for ${subject}/${topic} in ${category}`);
  }

  const totalPages = Math.ceil(total / limit);
  return {
    category,
    subject,
    topic,
    language,
    summary: presentTopicSummary(summary, language, category),
    questions: questions.map((q, i) => presentQuestion(q, { index: (page - 1) * limit + i + 1 })),
    pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages },
  };
}

/** { en: [step1, step2], bn: [...] } - steps grouped per language for one-tap switching. */
function stepsByLanguage(steps = []) {
  const out = {};
  for (const lang of LANGUAGES) {
    const list = steps.map((s) => s?.[lang]).filter(Boolean);
    if (list.length) out[lang] = list;
  }
  return out;
}

function presentStats(stats) {
  const attempts = stats?.attempts || 0;
  const enough = attempts >= config.stats.minAttemptsForPercent;
  return {
    attempts,
    // null until there is enough data to be meaningful.
    percentCorrect: enough ? Math.round((stats.correct / attempts) * 1000) / 10 : null,
    avgTimeSec: enough ? Math.round(stats.total_time_ms / attempts / 100) / 10 : null,
  };
}

async function verifyAnswer({ questionId, selectedOptionId, timeSpentSec, category }, userId) {
  const q = await Question.findOne({ _id: questionId, status: 'PUBLISHED' })
    .select('+correct_option_id +solution options.oid stats subject topic')
    .lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');

  if (!q.options.some((o) => o.oid === selectedOptionId)) {
    throw AppError.unprocessable('UNKNOWN_OPTION', 'selectedOptionId does not belong to this question');
  }

  const isCorrect = selectedOptionId === q.correct_option_id;
  statsBuffer.record(q._id, { correct: isCorrect, timeSpentSec });
  if (userId) {
    // Signed-in students: keep the attempt for "My performance". Never blocks the answer.
    PracticeAttempt.create({ user_id: userId, question_id: q._id, subject: q.subject, topic: q.topic, category, correct: isCorrect, time_spent_sec: timeSpentSec })
      .catch((err) => console.error('[practice] attempt not recorded:', err.message));
    // A mistake joins the student's revision queue.
    if (!isCorrect) review.recordMistake(userId, { questionId: q._id, subject: q.subject, topic: q.topic, selectedOptionId, source: 'practice' });
  }

  const traps = q.solution?.traps || [];
  const selectedTrap = isCorrect ? null : traps.find((t) => t.option_id === selectedOptionId);

  return {
    questionId: String(q._id),
    selectedOptionId,
    isCorrect,
    correctOptionId: q.correct_option_id,
    explanation: {
      languages: languagesOf(q.solution?.steps?.[0]),
      steps: stepsByLanguage(q.solution?.steps),
      // Same steps, one localized object per step, for clients that switch language in place.
      items: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
    },
    shortcut: compactLocalized(q.solution?.shortcut),
    // Why this particular wrong option is tempting, when the editor wrote one.
    trapForSelected: selectedTrap ? compactLocalized(selectedTrap.note) : null,
    commonTraps: traps.map((t) => ({ optionId: t.option_id ?? null, note: compactLocalized(t.note) })),
    stats: presentStats(q.stats),
  };
}

/** Localized display names for Category > Subject > Topic, falling back to the codes. */
async function breadcrumbFor(category, subject, topic) {
  const cat = await ExamCategory.findOne({ code: category })
    .select('name subjects.code subjects.name subjects.topics.code subjects.topics.name')
    .lean();
  const subj = cat?.subjects?.find((s) => s.code === subject);
  const top = subj?.topics?.find((t) => t.code === topic);
  return {
    category: { code: category, name: compactLocalized(cat?.name) ?? { en: category } },
    subject: { code: subject, name: compactLocalized(subj?.name) ?? { en: subject } },
    topic: { code: topic, name: compactLocalized(top?.name) ?? null },
  };
}

async function getTopicSummary({ category, subject, topic }) {
  const [summary, breadcrumb] = await Promise.all([
    TopicSummary.findOne({ subject, topic, subtopic: null, status: 'PUBLISHED' }).select(SUMMARY_FIELDS).lean(),
    breadcrumbFor(category, subject, topic),
  ]);
  if (!summary) {
    throw AppError.notFound('TOPIC_NOT_FOUND', `No published topic sheet for ${subject}/${topic}`);
  }
  const data = presentTopicSummaryAllLanguages(summary, category);
  breadcrumb.topic.name ??= data.title;
  return { breadcrumb, summary: data };
}

/**
 * Cursor-paginated question stream for the one-at-a-time Practice Arena.
 * `language` filters to questions fully available in it; the cursor is a
 * position in the sort order, so the language may change between pages.
 */
async function getQuestionStream({ category, subject, topic, language, cursor, limit, pattern }, userId) {
  const filter = {
    status: 'PUBLISHED',
    'exam_targets.category': category,
    subject,
    topic,
    lang_set: { $in: langSetsContaining(language) },
    ...(pattern && { pattern }),
  };
  if (cursor) {
    const key = decodeCursor(cursor);
    if (!key) throw AppError.badRequest('Invalid or expired cursor');
    Object.assign(filter, afterKey(key));
  }

  // limit + 1 tells us whether another page exists without a count query.
  const docs = await Question.find(filter)
    .select(`${PUBLIC_QUESTION_FIELDS} latest_pyq_year`)
    .sort(PRACTICE_SORT)
    .limit(limit + 1)
    .lean();
  const hasMore = docs.length > limit;
  const page = hasMore ? docs.slice(0, limit) : docs;

  let bookmarked = new Set();
  if (userId && page.length) {
    const rows = await Bookmark.find({ user_id: userId, question_id: { $in: page.map((q) => q._id) } })
      .select('question_id')
      .lean();
    bookmarked = new Set(rows.map((r) => String(r.question_id)));
  }

  return {
    questions: page.map((q) => presentQuestion(q, { bookmarked: bookmarked.has(String(q._id)) })),
    nextCursor: hasMore ? encodeCursor(page[page.length - 1]) : null,
    hasMore,
  };
}

async function findPublishedOr404(questionId, fields) {
  const q = await Question.findOne({ _id: questionId, status: 'PUBLISHED' }).select(fields).lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  return q;
}

/** Idempotent: bookmarking twice is a no-op. */
async function addBookmark(userId, questionId) {
  const q = await findPublishedOr404(questionId, 'subject topic');
  await Bookmark.updateOne(
    { user_id: userId, question_id: q._id },
    { $setOnInsert: { subject: q.subject, topic: q.topic } },
    { upsert: true },
  );
  await review.recordBookmark(userId, { questionId: q._id, subject: q.subject, topic: q.topic });
  return { questionId: String(q._id), bookmarked: true };
}

async function removeBookmark(userId, questionId) {
  await Bookmark.deleteOne({ user_id: userId, question_id: questionId });
  await review.removeBookmark(userId, questionId);
  return { questionId: String(questionId), bookmarked: false };
}

/**
 * The signed-in student's revision list: bookmarked questions, newest first,
 * plus a count per chapter for the filters. Answers stay behind verify-answer.
 * Questions unpublished since they were bookmarked are left out.
 */
async function listBookmarks(userId, { subject, topic, offset, limit }) {
  const filter = { user_id: userId, ...(subject && { subject }), ...(topic && { topic }) };
  const [groups, total, rows] = await Promise.all([
    Bookmark.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: { subject: '$subject', topic: '$topic' }, count: { $sum: 1 } } },
      { $sort: { '_id.subject': 1, count: -1 } },
    ]),
    Bookmark.countDocuments(filter),
    Bookmark.find(filter).sort({ created_at: -1, _id: -1 }).skip(offset).limit(limit).lean(),
  ]);
  const questions = await Question.find({ _id: { $in: rows.map((r) => r.question_id) }, status: 'PUBLISHED' })
    .select(PUBLIC_QUESTION_FIELDS)
    .lean();
  const byId = new Map(questions.map((q) => [String(q._id), q]));
  return {
    total,
    // An offset, not a page: the client removes learnt questions as it goes,
    // so "load more" continues from however many it still shows.
    hasMore: offset + rows.length < total,
    groups: groups.map(({ _id, count }) => ({
      subject: _id.subject,
      topic: _id.topic,
      subjectName: subjectName(_id.subject),
      topicName: topicName(_id.subject, _id.topic),
      count,
    })),
    items: rows
      .filter((r) => byId.has(String(r.question_id)))
      .map((r) => ({
        bookmarkedAt: r.created_at,
        subject: r.subject,
        topic: r.topic,
        topicName: topicName(r.subject, r.topic),
        question: presentQuestion(byId.get(String(r.question_id))),
      })),
  };
}

async function reportError({ questionId, reason, message, language }, userId) {
  const q = await findPublishedOr404(questionId, '_id');
  try {
    const report = await QuestionReport.create({
      question_id: q._id,
      user_id: userId ?? null,
      reason,
      message,
      language,
    });
    return { reportId: String(report._id), duplicate: false };
  } catch (err) {
    // Same user already has an open report for this reason: acknowledge, don't error.
    if (err?.code === 11000) return { reportId: null, duplicate: true };
    throw err;
  }
}

module.exports = {
  getTopicView,
  getTopicSummary,
  getQuestionStream,
  verifyAnswer,
  addBookmark,
  listBookmarks,
  removeBookmark,
  reportError,
  PRACTICE_SORT,
};
