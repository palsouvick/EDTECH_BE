'use strict';

/**
 * F13 — ONE revision place. GET /me/revision gathers everything a student
 * can revise into the six sections of the Revision page:
 *
 *   dueToday     questions due in the revision queue + GK facts due + vocabulary words due
 *   mistakes     the mistake notebook (open / repeating / mastered, by subject)
 *   bookmarked   bookmarked questions + bookmarked GK facts + favourite words
 *   weakTopics   chapters that need work, from the unified mastery definition (F9)
 *   pyq          previous-year questions in the revision queue (mistakes / bookmarks)
 *   vocabulary   words due, difficult and missed
 *
 * No new algorithm and no data moves: each section reads the store and the
 * spaced-repetition schedule that already exists — the question queue
 * (ReviewItem, review.service: 1-3-7-21-day intervals), GK facts
 * (GkFactProgress, gk.service) and vocabulary (VocabularyProgress,
 * vocabulary.service) — and links to the screen that already revises it
 * (/revise, /mistakes, /revision/bookmarks, /learn/gk/revision, /vocabulary).
 */

const { ReviewItem, Bookmark, GkFactProgress, VocabularyProgress } = require('../models');
const review = require('./review.service');
const gk = require('./gk.service');
const vocabulary = require('./vocabulary.service');
const { chapterMastery } = require('./mastery.service');
const { subjectName } = require('./catalogNames');

const WEAK_LIMIT = 6;

/** Each part fails soft: one store being down must not hide the others. */
const soft = (p, fallback) => p.catch((err) => {
  console.error('[revision] part not loaded:', err.message);
  return fallback;
});

async function mistakesPart(userId) {
  const rows = await ReviewItem.aggregate([
    { $match: { user_id: userId, from_mistake: true } },
    {
      $group: {
        _id: '$subject',
        open: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
        repeating: { $sum: { $cond: [{ $and: [{ $eq: ['$status', 'active'] }, { $gte: ['$wrong_count', 2] }] }, 1, 0] } },
        mastered: { $sum: { $cond: [{ $eq: ['$status', 'mastered'] }, 1, 0] } },
      },
    },
  ]);
  const bySubject = rows
    .map((r) => ({ subject: r._id, name: subjectName(r._id), open: r.open, repeating: r.repeating, mastered: r.mastered }))
    .sort((a, b) => b.open - a.open);
  const sum = (k) => bySubject.reduce((n, r) => n + r[k], 0);
  return { open: sum('open'), repeating: sum('repeating'), mastered: sum('mastered'), bySubject };
}

async function pyqPart(userId, dueBefore) {
  const items = await ReviewItem.find({ user_id: userId, status: 'active' }).select('question_id due_at').lean();
  const pyqIds = await review.realPyqIds(items.map((i) => i.question_id));
  const pyqItems = items.filter((i) => pyqIds.has(String(i.question_id)));
  return { inQueue: pyqItems.length, dueToday: pyqItems.filter((i) => i.due_at <= dueBefore).length };
}

async function getRevision(userId, { tz = 330 } = {}) {
  const uid = String(userId);
  const dueBefore = review.endOfLocalDay(tz);
  const [queue, gkRev, vocab, mistakes, bookmarks, gkBookmarks, pyq, mastery] = await Promise.all([
    soft(review.summary(uid, { tz }), null),
    soft(gk.revision(uid, { limit: 1 }), null),
    soft(vocabulary.getProgressSummary(uid), null),
    soft(mistakesPart(uid), { open: 0, repeating: 0, mastered: 0, bySubject: [] }),
    soft(Bookmark.countDocuments({ user_id: uid }), 0),
    soft(GkFactProgress.countDocuments({ user_id: uid, bookmarked: true }), 0),
    soft(pyqPart(uid, dueBefore), { inQueue: 0, dueToday: 0 }),
    soft(chapterMastery(uid), new Map()),
  ]);

  const questionsDue = queue?.dueToday ?? 0;
  const factsDue = gkRev?.counts?.due ?? 0;
  const wordsDue = vocab?.due ?? 0;

  // Weak topics: measured chapters that need work, worst first; then
  // practising chapters (enough answers, low score). Same definition as Home/Today.
  const rows = [...mastery.values()];
  const weakTopics = rows
    .filter((r) => r.needsWork || r.stage === 'practising')
    .sort((a, b) => Number(b.needsWork) - Number(a.needsWork) || (a.accuracy ?? 100) - (b.accuracy ?? 100))
    .slice(0, WEAK_LIMIT)
    .map((r) => ({ subject: r.subject, topic: r.topic, name: r.name, stage: r.stage, score: r.score, accuracy: r.accuracy, openMistakes: r.evidence?.mistakes?.open ?? 0 }));

  return {
    dueToday: {
      total: questionsDue + factsDue + wordsDue,
      questions: questionsDue,
      gkFacts: factsDue,
      vocabulary: wordsDue,
      nextDueAt: queue?.nextDueAt ?? null,
    },
    mistakes,
    bookmarked: { questions: bookmarks, gkFacts: gkBookmarks, words: vocab?.favourite ?? 0 },
    weakTopics,
    pyq,
    vocabulary: vocab
      ? { due: vocab.due, difficult: vocab.difficult, missed: vocab.missed, learned: vocab.learned, favourite: vocab.favourite }
      : null,
    queue: queue ? { active: queue.active, mastered: queue.mastered, masterAfter: queue.masterAfter } : null,
    gk: gkRev ? gkRev.counts : null,
  };
}

module.exports = { getRevision };
