'use strict';

/**
 * Revision queue (spaced repetition) and mistake notebook.
 *
 * In:  a signed-in student's wrong answer (practice, Learn Basics quiz, mock test)
 *      or bookmark adds the question, due the next day.
 * Review: right -> next review after 1, 3, 7, 21 days; MASTER_AFTER right in a
 *      row -> mastered (out of the queue). Wrong -> back to the start, due tomorrow.
 * "Due today" is everything due before the end of the student's local day.
 */

const { Question, ReviewItem, PracticeAttempt, GkFact, GkFactProgress } = require('../models');
const { REVIEW_INTERVALS_DAYS, MASTER_AFTER } = require('../models/ReviewItem');
const AppError = require('../utils/AppError');
const statsBuffer = require('./questionStats.buffer');
const { PUBLIC_QUESTION_FIELDS, compactLocalized, presentQuestion } = require('./presenters');
const { topicName } = require('./catalogNames');
const { safeLearnLinkFor, learnLinksSafe } = require('./learnLinks.service');

const DAY_MS = 86_400_000;
const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);

/** End of the student's local day; tz = minutes east of UTC (India: 330). */
function endOfLocalDay(tz = 0, now = new Date()) {
  const local = new Date(now.getTime() + tz * 60_000);
  local.setUTCHours(23, 59, 59, 999);
  return new Date(local.getTime() - tz * 60_000);
}

const logFailure = (what) => (err) => console.error(`[review] ${what} not recorded:`, err.message);

/** A wrong answer: (re)queue the question from the start, due tomorrow. Never throws. */
function recordMistake(userId, { questionId, subject, topic, selectedOptionId, source }, now = new Date()) {
  if (!userId) return Promise.resolve();
  return ReviewItem.updateOne(
    { user_id: userId, question_id: questionId },
    {
      $set: {
        subject,
        topic,
        from_mistake: true,
        last_wrong_option_id: selectedOptionId ?? null,
        last_wrong_at: now,
        last_wrong_source: source,
        stage: 0,
        streak: 0,
        due_at: addDays(now, REVIEW_INTERVALS_DAYS[0]),
        status: 'active',
        mastered_at: null,
      },
      $inc: { wrong_count: 1 },
    },
    { upsert: true },
  )
    .then(() => (subject === 'gs' ? requeueFacts(userId, questionId, now) : null))
    .catch(logFailure('mistake'));
}

/**
 * A wrong answer on a GK library question also sends its fact (the card with the statement,
 * table and "don't confuse" lines) back to GK revision, due tomorrow from the first step.
 */
async function requeueFacts(userId, questionId, now) {
  const q = await Question.findById(questionId).select('fact_ids').lean();
  const facts = q?.fact_ids || [];
  if (!facts.length) return;
  const rows = await GkFact.find({ _id: { $in: facts } }).select('topic').lean();
  await Promise.all(rows.map((f) => GkFactProgress.updateOne(
    { user_id: userId, fact_id: f._id },
    {
      $set: { status: 'learning', stage: 0, last_result: 'again', due_at: addDays(now, REVIEW_INTERVALS_DAYS[0]) },
      $setOnInsert: { topic: f.topic, bookmarked: false, seen_at: now },
    },
    { upsert: true },
  )));
}

/**
 * GK facts usually have several questions (asked both ways: "Who created Byomkesh?" and
 * "Sharadindu created which detective?"). Reviewing the very question you got wrong tests
 * whether you remember the option, so each review asks the fact a different way, in turn.
 * Returns Map(queued question id -> question id to ask).
 */
async function askedInstead(items) {
  const asked = new Map();
  const queued = await Question.find({ _id: { $in: items.map((i) => i.question_id) }, fact_ids: { $type: 'objectId' } }).select('fact_ids').lean();
  if (!queued.length) return asked;
  const siblings = await Question.find({ fact_ids: { $in: queued.flatMap((q) => q.fact_ids) }, status: 'PUBLISHED' }).select('fact_ids').sort({ code: 1 }).lean();
  const reviews = new Map(items.map((i) => [String(i.question_id), i.reviews || 0]));
  for (const q of queued) {
    const facts = new Set(q.fact_ids.map(String));
    const others = siblings.filter((s) => String(s._id) !== String(q._id) && s.fact_ids.some((f) => facts.has(String(f))));
    if (!others.length) continue;
    const ring = [q._id, ...others.map((s) => s._id)];
    const pick = ring[(reviews.get(String(q._id)) + 1) % ring.length]; // first review: another question
    if (String(pick) !== String(q._id)) asked.set(String(q._id), String(pick));
  }
  return asked;
}

/** The asked question may stand in for the queued one only if they test the same GK fact. */
async function sameFact(queuedId, askedId) {
  const rows = await Question.find({ _id: { $in: [queuedId, askedId] } }).select('fact_ids').lean();
  if (rows.length !== 2) return false;
  const [a, b] = rows.map((r) => (r.fact_ids || []).map(String));
  return a.some((f) => b.includes(f));
}

/** A bookmark joins the queue (due tomorrow) unless it is already there. Never throws. */
function recordBookmark(userId, { questionId, subject, topic }, now = new Date()) {
  return ReviewItem.updateOne(
    { user_id: userId, question_id: questionId },
    {
      $set: { from_bookmark: true },
      $setOnInsert: { subject, topic, due_at: addDays(now, REVIEW_INTERVALS_DAYS[0]), status: 'active' },
    },
    { upsert: true },
  ).catch(logFailure('bookmark'));
}

/** Un-bookmarking means "I know this one": it leaves the queue unless it was also a mistake. */
async function removeBookmark(userId, questionId) {
  await ReviewItem.deleteOne({ user_id: userId, question_id: questionId, from_mistake: false }).catch(logFailure('unbookmark'));
  await ReviewItem.updateOne({ user_id: userId, question_id: questionId }, { $set: { from_bookmark: false } }).catch(logFailure('unbookmark'));
}

async function summary(userId, { tz }) {
  const dueBefore = endOfLocalDay(tz);
  const [dueToday, active, mastered, mistakesActive, next] = await Promise.all([
    ReviewItem.countDocuments({ user_id: userId, status: 'active', due_at: { $lte: dueBefore } }),
    ReviewItem.countDocuments({ user_id: userId, status: 'active' }),
    ReviewItem.countDocuments({ user_id: userId, status: 'mastered' }),
    ReviewItem.countDocuments({ user_id: userId, status: 'active', from_mistake: true }),
    ReviewItem.findOne({ user_id: userId, status: 'active', due_at: { $gt: dueBefore } }).sort({ due_at: 1 }).select('due_at').lean(),
  ]);
  return { dueToday, active, mastered, mistakesActive, nextDueAt: next?.due_at ?? null, masterAfter: MASTER_AFTER };
}

const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
/** Which of these question ids are published real previous-year questions. */
async function realPyqIds(ids) {
  if (!ids.length) return new Set();
  const rows = await Question.find({ _id: { $in: ids }, 'pyq.is_pyq': true, provenance: { $in: REAL_PAPER } }).select('_id').lean();
  return new Set(rows.map((q) => String(q._id)));
}

const reasonOf = (item) => (item.from_mistake && item.from_bookmark ? 'both' : item.from_mistake ? 'mistake' : 'bookmark');

/** Today's revision: due questions, oldest first, without answers. */
async function due(userId, { tz, limit, pyqOnly = false }) {
  let items;
  if (pyqOnly) {
    // F13 PYQ revision: the same queue and schedule, narrowed to real previous-year questions.
    const all = await ReviewItem.find({ user_id: userId, status: 'active', due_at: { $lte: endOfLocalDay(tz) } }).sort({ due_at: 1, _id: 1 }).lean();
    const pyqIds = await realPyqIds(all.map((i) => i.question_id));
    items = all.filter((i) => pyqIds.has(String(i.question_id))).slice(0, limit);
  } else {
    items = await ReviewItem.find({ user_id: userId, status: 'active', due_at: { $lte: endOfLocalDay(tz) } })
      .sort({ due_at: 1, _id: 1 })
      .limit(limit)
      .lean();
  }
  const asked = await askedInstead(items);
  const ids = [...items.map((i) => i.question_id), ...asked.values()];
  const questions = await Question.find({ _id: { $in: ids }, status: 'PUBLISHED' }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byId = new Map(questions.map((q) => [String(q._id), q]));
  const shown = (i) => byId.get(asked.get(String(i.question_id))) || byId.get(String(i.question_id));
  return {
    masterAfter: MASTER_AFTER,
    items: items
      .filter((i) => byId.has(String(i.question_id)))
      .map((i) => ({
        reason: reasonOf(i),
        streak: i.streak,
        wrongCount: i.wrong_count,
        topicName: topicName(i.subject, i.topic),
        // itemQuestionId: the queued question; question: the one asked today (may be a sibling).
        itemQuestionId: String(i.question_id),
        askedAnotherWay: shown(i) !== byId.get(String(i.question_id)),
        question: presentQuestion(shown(i)),
      })),
  };
}

/** Answer a queued question: marks it and moves it along the schedule. */
async function answer(userId, { questionId, askedQuestionId, selectedOptionId, timeSpentSec }, now = new Date()) {
  const item = await ReviewItem.findOne({ user_id: userId, question_id: questionId, status: 'active' }).lean();
  if (!item) throw AppError.notFound('NOT_IN_QUEUE', 'This question is not in your revision queue');
  const gradeId = askedQuestionId && askedQuestionId !== questionId ? askedQuestionId : questionId;
  if (gradeId !== questionId && !(await sameFact(questionId, gradeId))) throw AppError.unprocessable('NOT_SAME_FACT', 'askedQuestionId does not test the same fact');
  const q = await Question.findOne({ _id: gradeId, status: 'PUBLISHED' }).select('+correct_option_id +solution options.oid subject topic').lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found');
  if (!q.options.some((o) => o.oid === selectedOptionId)) throw AppError.unprocessable('UNKNOWN_OPTION', 'selectedOptionId does not belong to this question');

  const isCorrect = selectedOptionId === q.correct_option_id;
  statsBuffer.record(q._id, { correct: isCorrect, timeSpentSec });
  PracticeAttempt.create({ user_id: userId, question_id: q._id, subject: q.subject, topic: q.topic, correct: isCorrect, time_spent_sec: timeSpentSec, source: 'review' }).catch(logFailure('attempt'));

  let next;
  if (isCorrect) {
    const streak = item.streak + 1;
    if (streak >= MASTER_AFTER) {
      next = { streak, status: 'mastered', mastered_at: now };
    } else {
      const stage = Math.min(item.stage + 1, REVIEW_INTERVALS_DAYS.length - 1);
      next = { streak, stage, due_at: addDays(now, REVIEW_INTERVALS_DAYS[stage]) };
    }
  } else {
    next = {
      streak: 0,
      stage: 0,
      due_at: addDays(now, REVIEW_INTERVALS_DAYS[0]),
      from_mistake: true,
      // A wrong option of the question asked instead belongs to that question, not the queued one.
      last_wrong_option_id: gradeId === questionId ? selectedOptionId : item.last_wrong_option_id ?? null,
      last_wrong_at: now,
      last_wrong_source: 'review',
    };
  }
  await ReviewItem.updateOne({ _id: item._id }, { $set: next, $inc: { reviews: 1, ...(isCorrect ? {} : { wrong_count: 1 }) } });

  const traps = q.solution?.traps || [];
  const trap = isCorrect ? null : traps.find((t) => t.option_id === selectedOptionId);
  return {
    questionId: String(q._id),
    selectedOptionId,
    isCorrect,
    correctOptionId: q.correct_option_id,
    explanation: { items: (q.solution?.steps || []).map(compactLocalized).filter(Boolean) },
    shortcut: compactLocalized(q.solution?.shortcut),
    trapForSelected: trap ? compactLocalized(trap.note) : null,
    learn: await safeLearnLinkFor(q._id),
    review: {
      status: next.status ?? 'active',
      streak: next.streak,
      masterAfter: MASTER_AFTER,
      nextDueAt: next.due_at ?? null,
    },
  };
}

/**
 * Mistake notebook: every question answered wrong, with the student's answer,
 * the correct one and the explanation (all already shown when they answered).
 * status: 'active' = still being revised, 'mastered' = fixed.
 */
async function mistakes(userId, { status, subject, topic, offset, limit }) {
  const base = { user_id: userId, from_mistake: true };
  const filter = { ...base, ...(status !== 'all' && { status }), ...(subject && { subject }), ...(topic && { topic }) };
  const [groups, counts, total, rows] = await Promise.all([
    ReviewItem.aggregate([
      { $match: { ...base, ...(status !== 'all' && { status }) } },
      { $group: { _id: { subject: '$subject', topic: '$topic' }, count: { $sum: 1 } } },
      { $sort: { count: -1, '_id.topic': 1 } },
    ]),
    ReviewItem.aggregate([{ $match: base }, { $group: { _id: '$status', n: { $sum: 1 } } }]),
    ReviewItem.countDocuments(filter),
    ReviewItem.find(filter).sort({ last_wrong_at: -1, _id: -1 }).skip(offset).limit(limit).lean(),
  ]);
  const questions = await Question.find({ _id: { $in: rows.map((r) => r.question_id) }, status: 'PUBLISHED' })
    .select(`${PUBLIC_QUESTION_FIELDS} +correct_option_id +solution`)
    .lean();
  const byId = new Map(questions.map((q) => [String(q._id), q]));
  const count = Object.fromEntries(counts.map((c) => [c._id, c.n]));
  const links = await learnLinksSafe(questions.map((q) => q._id));
  return {
    counts: { active: count.active ?? 0, mastered: count.mastered ?? 0 },
    total,
    hasMore: offset + rows.length < total,
    groups: groups.map(({ _id, count: n }) => ({ subject: _id.subject, topic: _id.topic, topicName: topicName(_id.subject, _id.topic), count: n })),
    items: rows
      .filter((r) => byId.has(String(r.question_id)))
      .map((r) => {
        const q = byId.get(String(r.question_id));
        const trap = (q.solution?.traps || []).find((t) => t.option_id === r.last_wrong_option_id);
        return {
          status: r.status,
          wrongCount: r.wrong_count,
          lastWrongAt: r.last_wrong_at,
          source: r.last_wrong_source,
          dueAt: r.status === 'active' ? r.due_at : null,
          topicName: topicName(r.subject, r.topic),
          yourOptionId: r.last_wrong_option_id,
          correctOptionId: q.correct_option_id,
          steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
          shortcut: compactLocalized(q.solution?.shortcut),
          trapForSelected: trap ? compactLocalized(trap.note) : null,
          learn: links.get(String(q._id)) ?? null,
          question: presentQuestion(q),
        };
      }),
  };
}

module.exports = { recordMistake, recordBookmark, removeBookmark, summary, due, answer, mistakes, endOfLocalDay, realPyqIds };
