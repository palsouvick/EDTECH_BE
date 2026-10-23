'use strict';

const { PracticeAttempt, MockSession } = require('../models');
const catalog = require('../../db/seed/catalog');

const round1 = (x) => Math.round(x * 10) / 10;
const pct = (a, b) => (b ? round1((a / b) * 100) : 0);

// Display names for subjects/topics, merged across categories (first wins).
const NAMES = (() => {
  const subjects = {};
  const topics = {};
  for (const c of catalog) {
    for (const s of c.subjects) {
      subjects[s.code] ??= s.name;
      for (const t of s.topics) topics[`${s.code}.${t.code}`] ??= t.name;
    }
  }
  return { subjects, topics };
})();

/** "+05:30" from minutes east of UTC (330 for India). */
function tzString(offsetMin) {
  const sign = offsetMin < 0 ? '-' : '+';
  const m = Math.abs(offsetMin);
  return `${sign}${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

function dayKey(date, offsetMin) {
  return new Date(date.getTime() + offsetMin * 60_000).toISOString().slice(0, 10);
}

/** Consecutive active days ending today (or yesterday, if today has no activity yet). */
function streakFrom(daysSet, todayKey) {
  const prev = (k) => new Date(Date.parse(`${k}T00:00:00Z`) - 86400_000).toISOString().slice(0, 10);
  let cursor = daysSet.has(todayKey) ? todayKey : prev(todayKey);
  let n = 0;
  while (daysSet.has(cursor)) {
    n += 1;
    cursor = prev(cursor);
  }
  return n;
}

const MIN_ATTEMPTS_FOR_WEAK = 5;

/**
 * "My performance": practice accuracy by subject and topic, weak topics, mock
 * history and trend, daily activity and streak.
 * @param {number} tzOffsetMin  the student's UTC offset in minutes (India: 330), for "today"
 */
async function getPerformance(userId, tzOffsetMin = 330) {
  const tz = tzString(tzOffsetMin);
  const since = new Date(Date.now() - 60 * 86400_000);

  const [byTopic, activity, mocks] = await Promise.all([
    PracticeAttempt.aggregate([
      { $match: { user_id: userId } },
      { $sort: { created_at: 1 } }, // so $last is the most recent category
      {
        $group: {
          _id: { subject: '$subject', topic: '$topic' },
          category: { $last: '$category' },
          attempts: { $sum: 1 },
          correct: { $sum: { $cond: ['$correct', 1, 0] } },
          time: { $sum: { $ifNull: ['$time_spent_sec', 0] } },
        },
      },
    ]),
    PracticeAttempt.aggregate([
      { $match: { user_id: userId, created_at: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at', timezone: tz } }, count: { $sum: 1 } } },
    ]),
    MockSession.find({ user_id: userId, status: 'SUBMITTED' })
      .sort({ submitted_at: -1 })
      .limit(50)
      .select('config.category config.subject config.question_count submitted_at result.score result.max_score result.accuracy_pct result.correct result.incorrect')
      .lean(),
  ]);

  // Practice, by subject and topic.
  const subjects = new Map();
  for (const t of byTopic) {
    const s = subjects.get(t._id.subject) || { subject: t._id.subject, attempts: 0, correct: 0 };
    s.attempts += t.attempts;
    s.correct += t.correct;
    subjects.set(t._id.subject, s);
  }
  const subjectRows = [...subjects.values()]
    .map((s) => ({ ...s, name: NAMES.subjects[s.subject] ?? null, accuracyPct: pct(s.correct, s.attempts) }))
    .sort((a, b) => b.attempts - a.attempts);
  const weakTopics = byTopic
    .filter((t) => t.attempts >= MIN_ATTEMPTS_FOR_WEAK)
    .map((t) => ({
      subject: t._id.subject,
      topic: t._id.topic,
      category: t.category ?? null,
      name: NAMES.topics[`${t._id.subject}.${t._id.topic}`] ?? null,
      attempts: t.attempts,
      accuracyPct: pct(t.correct, t.attempts),
    }))
    .sort((a, b) => a.accuracyPct - b.accuracyPct || b.attempts - a.attempts)
    .slice(0, 5);
  // Topics practised without a category (older clients) link under the latest mock's category.
  const fallbackCategory = mocks[0]?.config.category ?? null;
  for (const w of weakTopics) w.category ??= fallbackCategory;

  // Activity: practice answers + mock submissions per local day.
  const perDay = new Map(activity.map((d) => [d._id, d.count]));
  for (const m of mocks) {
    if (m.submitted_at >= since) {
      const k = dayKey(m.submitted_at, tzOffsetMin);
      perDay.set(k, (perDay.get(k) || 0) + (m.config.question_count || 0));
    }
  }
  const today = dayKey(new Date(), tzOffsetMin);

  const totalAttempts = subjectRows.reduce((n, s) => n + s.attempts, 0);
  const totalCorrect = subjectRows.reduce((n, s) => n + s.correct, 0);
  const mockPcts = mocks.map((m) => pct(m.result?.score ?? 0, m.result?.max_score ?? 0));

  return {
    summary: {
      practiceAttempts: totalAttempts,
      practiceAccuracyPct: pct(totalCorrect, totalAttempts),
      mocksTaken: mocks.length,
      avgMockScorePct: mockPcts.length ? round1(mockPcts.reduce((a, b) => a + b, 0) / mockPcts.length) : null,
      bestMockScorePct: mockPcts.length ? Math.max(...mockPcts) : null,
      attemptedToday: perDay.get(today) || 0,
      streakDays: streakFrom(new Set(perDay.keys()), today),
    },
    subjects: subjectRows,
    weakTopics,
    minAttemptsForWeak: MIN_ATTEMPTS_FOR_WEAK,
    mockTrend: mocks
      .slice(0, 20)
      .reverse()
      .map((m, i, arr) => ({ sessionId: String(m._id), submittedAt: m.submitted_at, pct: mockPcts[arr.length - 1 - i] })),
    recentMocks: mocks.slice(0, 10).map((m, i) => ({
      sessionId: String(m._id),
      submittedAt: m.submitted_at,
      category: m.config.category,
      subject: m.config.subject,
      subjectName: NAMES.subjects[m.config.subject] ?? null,
      questionCount: m.config.question_count,
      score: m.result?.score ?? 0,
      maxScore: m.result?.max_score ?? 0,
      scorePct: mockPcts[i],
      accuracyPct: m.result?.accuracy_pct ?? 0,
    })),
    activity: [...perDay.entries()].sort().map(([day, count]) => ({ day, count })),
  };
}

module.exports = { getPerformance, streakFrom, tzString };
