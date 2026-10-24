'use strict';

/**
 * Where a student stands, chapter by chapter and pattern by pattern:
 *
 *   mastery       every catalogue chapter as not_started / started / weak / improving / strong,
 *                 from the last RECENT answers in it (practice, quizzes, revision and mock tests),
 *                 with harder questions (difficulty >= 3) weighed separately
 *   weakPatterns  question patterns answered much worse than their chapter
 *                 ("Percentage 80%, but successive % change 30%")
 *   badges        earned once and kept (chapter mastered, streaks, milestones)
 */

const mongoose = require('mongoose');
const catalog = require('../../db/seed/catalog');
const { loadPatterns } = require('../../db/patterns');
const { PracticeAttempt, MockSession, Question, ReviewItem, User, UserBadge, DailyChallengeResult } = require('../models');
const { subjectName, topicName } = require('./catalogNames');
const { getPerformance } = require('./performance.service');

const RECENT = 30; // answers per chapter that count for its mastery
const MIN_FOR_STATUS = 5;
const MIN_FOR_PATTERN = 5;

const STATUS_ORDER = ['weak', 'improving', 'started', 'not_started', 'strong'];

/** Pure: chapter status from its recent answers [{ correct, difficulty }]. */
function masteryStatus(answers) {
  const n = answers.length;
  if (!n) return 'not_started';
  if (n < MIN_FOR_STATUS) return 'started';
  const acc = answers.filter((a) => a.correct).length / n;
  const hard = answers.filter((a) => a.difficulty >= 3);
  const hardAcc = hard.length ? hard.filter((a) => a.correct).length / hard.length : null;
  if (n >= 10 && acc >= 0.75 && (hard.length < 3 || hardAcc >= 0.6)) return 'strong';
  if (acc < 0.5) return 'weak';
  return 'improving';
}

const pct = (c, n) => (n ? Math.round((c / n) * 100) : null);

// Chapters in display order, each with the categories whose syllabus has it.
const CHAPTERS = (() => {
  const map = new Map();
  for (const c of catalog) {
    for (const s of c.subjects) {
      for (const t of s.topics) {
        const k = `${s.code}.${t.code}`;
        if (!map.has(k)) map.set(k, { subject: s.code, topic: t.code, categories: [] });
        map.get(k).categories.push(c.code);
      }
    }
  }
  return [...map.values()];
})();

let patternNames;
function patternName(subject, topic, key) {
  if (!patternNames) {
    patternNames = new Map();
    for (const { doc } of loadPatterns()) for (const p of doc.patterns) patternNames.set(`${doc.subject}.${doc.topic}.${p.key}`, { name: p.name, emoji: p.emoji });
  }
  return patternNames.get(`${subject}.${topic}.${key}`) ?? null;
}

/** Every answer of the student, newest first, with each question's difficulty and pattern. */
async function answersOf(userId) {
  const [practice, mocks] = await Promise.all([
    PracticeAttempt.find({ user_id: userId }).sort({ created_at: -1 }).limit(5000).select('question_id subject topic correct category created_at').lean(),
    MockSession.find({ user_id: userId, status: 'SUBMITTED' }).sort({ submitted_at: -1 }).limit(50).select('config.subject config.category submitted_at result.per_question').lean(),
  ]);
  const answers = practice.map((a) => ({ qid: String(a.question_id), subject: a.subject, topic: a.topic, correct: a.correct, category: a.category, at: a.created_at }));
  for (const m of mocks) {
    for (const p of m.result?.per_question || []) {
      if (p.outcome !== 'CORRECT' && p.outcome !== 'INCORRECT') continue;
      answers.push({ qid: String(p.qid), subject: m.config.subject, topic: p.topic, correct: p.outcome === 'CORRECT', category: m.config.category, at: m.submitted_at, difficulty: p.difficulty });
    }
  }
  answers.sort((a, b) => b.at - a.at);
  const ids = [...new Set(answers.map((a) => a.qid))].map((id) => new mongoose.Types.ObjectId(id));
  const qs = await Question.find({ _id: { $in: ids } }).select('difficulty pattern').lean();
  const meta = new Map(qs.map((q) => [String(q._id), q]));
  for (const a of answers) {
    const q = meta.get(a.qid);
    a.difficulty ??= q?.difficulty ?? 3;
    a.pattern = q?.pattern ?? null;
  }
  return answers;
}

function buildMastery(answers) {
  const byChapter = new Map();
  for (const a of answers) {
    const k = `${a.subject}.${a.topic}`;
    if (!byChapter.has(k)) byChapter.set(k, []);
    byChapter.get(k).push(a);
  }
  return CHAPTERS.filter((c) => c.topic !== 'current_affairs' || byChapter.has(`${c.subject}.${c.topic}`)).map((c) => {
    const all = byChapter.get(`${c.subject}.${c.topic}`) || [];
    const recent = all.slice(0, RECENT);
    const hard = recent.filter((a) => a.difficulty >= 3);
    // Link under the category the student last used for this chapter, if its syllabus has it.
    const used = all.find((a) => a.category && c.categories.includes(a.category))?.category;
    return {
      subject: c.subject,
      topic: c.topic,
      name: topicName(c.subject, c.topic),
      subjectName: subjectName(c.subject),
      category: used ?? c.categories[0],
      status: masteryStatus(recent),
      answers: all.length,
      recentAnswers: recent.length,
      accuracyPct: pct(recent.filter((a) => a.correct).length, recent.length),
      hardAccuracyPct: pct(hard.filter((a) => a.correct).length, hard.length),
    };
  });
}

/** Patterns answered well below their chapter (or simply poorly), worst gap first. */
function buildWeakPatterns(answers, mastery) {
  const chapterAcc = new Map(mastery.map((m) => [`${m.subject}.${m.topic}`, m]));
  const groups = new Map();
  for (const a of answers) {
    if (!a.pattern) continue;
    const k = `${a.subject}.${a.topic}.${a.pattern}`;
    if (!groups.has(k)) groups.set(k, { subject: a.subject, topic: a.topic, pattern: a.pattern, n: 0, correct: 0 });
    const g = groups.get(k);
    if (g.n < RECENT) {
      g.n += 1;
      if (a.correct) g.correct += 1;
    }
  }
  const rows = [];
  for (const g of groups.values()) {
    if (g.n < MIN_FOR_PATTERN) continue;
    const accuracyPct = pct(g.correct, g.n);
    const chapter = chapterAcc.get(`${g.subject}.${g.topic}`);
    if (accuracyPct >= 70) continue; // fine
    const info = patternName(g.subject, g.topic, g.pattern);
    if (!info) continue;
    rows.push({
      subject: g.subject,
      topic: g.topic,
      pattern: g.pattern,
      patternName: info.name,
      emoji: info.emoji,
      chapterName: topicName(g.subject, g.topic),
      chapterAccuracyPct: chapter?.accuracyPct ?? null,
      category: chapter?.category ?? null,
      answers: g.n,
      accuracyPct,
    });
  }
  // Biggest gap below the chapter first (that is the surprise worth showing), then lowest accuracy.
  const gap = (r) => (r.chapterAccuracyPct ?? r.accuracyPct) - r.accuracyPct;
  return rows.sort((a, b) => gap(b) - gap(a) || a.accuracyPct - b.accuracyPct).slice(0, 6);
}

// ---- Badges ----------------------------------------------------------------
const BADGES = {
  first_steps: { emoji: '🌱', title: { en: 'First steps', bn: 'প্রথম পদক্ষেপ' }, body: { en: 'Answered your first 10 questions.', bn: 'প্রথম 10টি প্রশ্নের উত্তর দিয়েছ।' } },
  answers_100: { emoji: '💯', title: { en: 'Century', bn: 'সেঞ্চুরি' }, body: { en: '100 questions answered.', bn: '100টি প্রশ্নের উত্তর দেওয়া হয়েছে।' } },
  answers_500: { emoji: '🚀', title: { en: 'Unstoppable', bn: 'অদম্য' }, body: { en: '500 questions answered.', bn: '500টি প্রশ্নের উত্তর দেওয়া হয়েছে।' } },
  streak_7: { emoji: '🔥', title: { en: 'Week streak', bn: 'এক সপ্তাহ টানা' }, body: { en: 'Practised 7 days in a row.', bn: 'টানা 7 দিন অনুশীলন করেছ।' } },
  streak_30: { emoji: '🏅', title: { en: 'Month streak', bn: 'এক মাস টানা' }, body: { en: 'Practised 30 days in a row.', bn: 'টানা 30 দিন অনুশীলন করেছ।' } },
  fixed_10: { emoji: '🛠️', title: { en: 'Mistake fixer', bn: 'ভুল সংশোধক' }, body: { en: 'Mastered 10 questions you once got wrong.', bn: 'একসময় ভুল করা 10টি প্রশ্ন আয়ত্ত করেছ।' } },
  challenge_1: { emoji: '⚡', title: { en: 'Challenger', bn: 'চ্যালেঞ্জার' }, body: { en: 'Finished your first daily challenge.', bn: 'প্রথম দৈনিক চ্যালেঞ্জ শেষ করেছ।' } },
  challenge_perfect: { emoji: '🎯', title: { en: 'Perfect day', bn: 'নিখুঁত দিন' }, body: { en: 'Got all 5 right in a daily challenge.', bn: 'দৈনিক চ্যালেঞ্জে 5টিই ঠিক।' } },
  mock_1: { emoji: '📝', title: { en: 'Test taker', bn: 'পরীক্ষার্থী' }, body: { en: 'Finished your first mock test.', bn: 'প্রথম মক টেস্ট শেষ করেছ।' } },
};

function badgeInfo(key) {
  if (key.startsWith('chapter_master:')) {
    const [subject, topic] = key.slice('chapter_master:'.length).split('.');
    const name = topicName(subject, topic);
    return { emoji: '🏆', title: { en: `${name.en} master`, bn: `${name.bn ?? name.en}-এর মাস্টার` }, body: { en: `Strong in ${name.en}.`, bn: `${name.bn ?? name.en}-এ দক্ষ।` } };
  }
  return BADGES[key] ?? null;
}

/** Works out which badges are now deserved, stores the new ones, returns them all. */
async function syncBadges(userId, { answers, mastery, streakDays }) {
  const [fixed, challenges, perfect, mocks] = await Promise.all([
    ReviewItem.countDocuments({ user_id: userId, from_mistake: true, status: 'mastered' }),
    DailyChallengeResult.countDocuments({ user_id: userId }),
    DailyChallengeResult.countDocuments({ user_id: userId, $expr: { $eq: ['$correct', '$total'] } }),
    MockSession.countDocuments({ user_id: userId, status: 'SUBMITTED' }),
  ]);
  const deserved = [];
  if (answers >= 10) deserved.push('first_steps');
  if (answers >= 100) deserved.push('answers_100');
  if (answers >= 500) deserved.push('answers_500');
  if (streakDays >= 7) deserved.push('streak_7');
  if (streakDays >= 30) deserved.push('streak_30');
  if (fixed >= 10) deserved.push('fixed_10');
  if (challenges >= 1) deserved.push('challenge_1');
  if (perfect >= 1) deserved.push('challenge_perfect');
  if (mocks >= 1) deserved.push('mock_1');
  for (const m of mastery) if (m.status === 'strong') deserved.push(`chapter_master:${m.subject}.${m.topic}`);

  if (deserved.length) {
    await UserBadge.insertMany(deserved.map((key) => ({ user_id: userId, key })), { ordered: false }).catch((e) => {
      if (e.code !== 11000 && !e.writeErrors) throw e; // already earned
    });
  }
  const earned = await UserBadge.find({ user_id: userId }).sort({ earned_at: -1 }).lean();
  return earned.map((b) => ({ key: b.key, earnedAt: b.earned_at, ...badgeInfo(b.key) })).filter((b) => b.title);
}

async function getInsights(userId, tz = 330) {
  const answers = await answersOf(userId);
  const mastery = buildMastery(answers);
  const perf = await getPerformance(userId, tz);
  const badges = await syncBadges(userId, { answers: answers.length, mastery, streakDays: perf.summary.streakDays });
  const counts = Object.fromEntries(STATUS_ORDER.map((s) => [s, mastery.filter((m) => m.status === s).length]));
  return {
    mastery,
    counts,
    weakPatterns: buildWeakPatterns(answers, mastery),
    badges,
    allBadges: Object.keys(BADGES).length,
    today: { answered: perf.summary.attemptedToday },
    streak: { days: perf.summary.streakDays, freezes: perf.summary.streakFreezes, protectedDays: perf.summary.streakProtectedDays, freezeEvery: perf.summary.freezeEvery },
  };
}

// ---- Weekly leaderboard (opt-in) ----------------------------------------------

/** "Riya S." from "Riya Sen": enough to recognise yourself, not to identify others. */
const displayName = (name = '') => {
  const [first, ...rest] = name.trim().split(/\s+/);
  return rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first;
};

async function getLeaderboard(userId) {
  // Dev/test identities are not ObjectIds and have no user document.
  const me = mongoose.isValidObjectId(userId) ? await User.findById(userId).select('leaderboard_opt_in').lean() : null;
  const optedIn = await User.find({ leaderboard_opt_in: true }).select('name').lean();
  const names = new Map(optedIn.map((u) => [String(u._id), displayName(u.name)]));
  const since = new Date(Date.now() - 7 * 86400_000);
  const rows = names.size
    ? await PracticeAttempt.aggregate([
        { $match: { created_at: { $gte: since }, user_id: { $in: [...names.keys()] } } },
        { $group: { _id: '$user_id', correct: { $sum: { $cond: ['$correct', 1, 0] } }, answered: { $sum: 1 } } },
        { $match: { correct: { $gt: 0 } } },
        { $sort: { correct: -1, answered: 1 } },
      ])
    : [];
  const ranked = rows.map((r, i) => ({ rank: i + 1, name: names.get(r._id), correct: r.correct, isMe: r._id === userId }));
  return {
    optedIn: Boolean(me?.leaderboard_opt_in),
    top: ranked.slice(0, 20),
    me: ranked.find((r) => r.isMe) ?? null,
    participants: ranked.length,
  };
}

async function setLeaderboardOptIn(userId, optIn) {
  if (mongoose.isValidObjectId(userId)) await User.updateOne({ _id: userId }, { $set: { leaderboard_opt_in: optIn } });
  return getLeaderboard(userId);
}

module.exports = { getInsights, masteryStatus, getLeaderboard, setLeaderboardOptIn, displayName, BADGES };
