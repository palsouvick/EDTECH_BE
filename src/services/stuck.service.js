'use strict';

/**
 * Math "I'm Stuck" learning loop: My Stuck Problems, the skill-gap diagnosis, Practice My
 * Weakness and progress. Built on what already exists, nothing duplicated:
 *
 *   stuck events      result.per_question[].stuck of submitted Math mocks / tests (mock.service)
 *   revision status   the revision queue (review_items, from_stuck), spaced repetition as usual
 *   answers           insights.answersOf (practice, quizzes, revision, mock and custom tests)
 *   learning content  lessons + learn links (learnLinks.service) and question patterns (db/patterns)
 *   practice quiz     a custom test, preset 'stuck' (customTest.service): bank questions of the
 *                     same pattern, never the stuck question itself
 *   rules             stuck.logic.js (pure)
 *
 * The official mock score is never touched: stuck is a learning signal, shown separately.
 */

const { Question, MockSession, ReviewItem, QuestionSkip } = require('../models');
const { PUBLIC_QUESTION_FIELDS, compactLocalized, presentQuestion } = require('./presenters');
const { topicName } = require('./catalogNames');
const { learnLinksSafe } = require('./learnLinks.service');
const { getPatterns } = require('./patterns.service');
const insights = require('./insights.service');
const { SUBJECT_CONFIG } = require('./analysis.logic');
const S = require('./stuck.logic');

const SUBJECT = 'quant';
const SESSIONS = 60; // latest submitted Math tests looked at
const PROBLEMS_LIMIT = 40;
const DEFAULT_TARGET_SEC = SUBJECT_CONFIG?.quant?.targetSec ?? 75;

const asObject = (m) => (m instanceof Map ? Object.fromEntries(m) : m || {});
const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);

/** Planned seconds per question in one test. */
function targetSecOf(session) {
  const c = session.config || {};
  if (c.per_question_limit_sec) return c.per_question_limit_sec;
  if (c.time_limit_min && c.question_count) return Math.round((c.time_limit_min * 60) / c.question_count);
  return DEFAULT_TARGET_SEC;
}

/** Every piece of evidence for one student, newest first. */
async function loadEvidence(userId) {
  const [sessions, skipTags, all, stuckItems] = await Promise.all([
    MockSession.find({ user_id: userId, status: 'SUBMITTED', 'config.subject': SUBJECT })
      .sort({ submitted_at: -1 })
      .limit(SESSIONS)
      .select('submitted_at config.time_limit_min config.question_count config.per_question_limit_sec custom.preset custom.stuck result.per_question loss_reasons')
      .lean(),
    QuestionSkip.find({ user_id: userId, subject: SUBJECT, reason: { $ne: null } }).select('question_id reason').lean(),
    insights.answersOf(userId),
    ReviewItem.find({ user_id: userId, subject: SUBJECT, from_stuck: true }).select('question_id topic status stage streak reviews due_at stuck_count last_stuck_at last_stuck_reason mastered_at').lean(),
  ]);
  const skipReason = new Map(skipTags.map((s) => [String(s.question_id), s.reason]));
  const answers = all.filter((a) => a.subject === SUBJECT);

  const qids = new Set();
  for (const s of sessions) for (const p of s.result?.per_question || []) qids.add(String(p.qid));
  const facts = qids.size ? await Question.find({ _id: { $in: [...qids] } }).select('topic subtopic pattern difficulty').lean() : [];
  const factOf = new Map(facts.map((q) => [String(q._id), q]));

  const events = [];
  const quizzes = [];
  for (const s of sessions) {
    const loss = asObject(s.loss_reasons);
    const targetSec = targetSecOf(s);
    const rows = [...(s.result?.per_question || [])].sort((a, b) => b.seq - a.seq);
    for (const p of rows) {
      const q = factOf.get(String(p.qid));
      events.push({
        qid: String(p.qid),
        sessionId: String(s._id),
        seq: p.seq,
        at: s.submitted_at,
        topic: p.topic,
        pattern: q?.pattern ?? null,
        subtopic: q?.subtopic ?? null,
        difficulty: p.difficulty ?? q?.difficulty ?? 3,
        outcome: p.outcome,
        selectedOptionId: p.selected_option_id ?? null,
        correctOptionId: p.correct_option_id ?? null,
        timeSec: p.time_spent_sec ?? 0,
        targetSec,
        stuck: Boolean(p.stuck),
        stuckReason: p.stuck?.reason ?? null,
        timeBeforeSec: p.stuck?.time_before_sec ?? null,
        markedAt: p.stuck?.marked_at ?? null,
        lossReason: loss[String(p.seq)] ?? null,
        skipReason: skipReason.get(String(p.qid)) ?? null,
        preset: s.custom?.preset ?? null,
      });
    }
    if (s.custom?.preset === 'stuck') {
      const topics = {};
      for (const p of s.result?.per_question || []) {
        const t = (topics[p.topic] ||= { correct: 0, total: 0 });
        t.total += 1;
        if (p.outcome === 'CORRECT') t.correct += 1;
      }
      quizzes.push({ sessionId: String(s._id), at: s.submitted_at, level: s.custom.stuck?.level ?? null, mode: s.custom.stuck?.mode ?? null, topics });
    }
  }
  return { events, answers, stuckItems, quizzes: quizzes.reverse() };
}

/** Stuck events grouped per question, newest first. */
function stuckProblems(events) {
  const byQ = new Map();
  for (const e of events) {
    if (!e.stuck) continue;
    const p = byQ.get(e.qid);
    if (!p) byQ.set(e.qid, { ...e, times: 1, firstAt: e.at, reasons: e.stuckReason ? [e.stuckReason] : [] });
    else {
      p.times += 1;
      p.firstAt = e.at;
      if (e.stuckReason && !p.reasons.includes(e.stuckReason)) p.reasons.push(e.stuckReason);
    }
  }
  return [...byQ.values()];
}

/** The level for the next practice set in a chapter: the latest quiz there decides, else startLevel. */
function levelPlanner(quizzes, answers, gaps) {
  return (topic, gap) => {
    const last = [...quizzes].reverse().find((q) => topic && q.topics[topic]);
    if (last && last.level) {
      const t = last.topics[topic];
      return S.nextLevel(last.level, t.correct, t.total).level;
    }
    const basic = S.levelAccuracy(answers.filter((a) => a.topic === topic)).basic;
    return S.startLevel({ gap: gap ?? gaps.find((g) => g.topics.some((x) => x.topic === topic))?.gap ?? null, basic });
  };
}

/** Chapter accuracy before the first practice quiz in it (baseline for improvement). */
function baselines(quizzes, answers) {
  const out = new Map();
  for (const q of quizzes) {
    for (const topic of Object.keys(q.topics)) {
      if (out.has(topic)) continue;
      const before = answers.filter((a) => a.topic === topic && a.at < q.at && a.source !== 'test').slice(0, 30);
      const tests = answers.filter((a) => a.topic === topic && a.at < q.at).slice(0, 30);
      const rows = before.length >= 5 ? before : tests;
      out.set(topic, rows.length >= 3 ? pct(rows.filter((a) => a.correct).length, rows.length) : null);
    }
  }
  return out;
}

const named = (topic) => topicName(SUBJECT, topic);
const withNames = (rows) => rows.map((r) => ({ ...r, name: named(r.topic) }));

/** Pattern learning content (concept, formula, method, worked example) for a chapter pattern. */
function patternContent(topic, key) {
  if (!key) return null;
  const p = getPatterns({ subject: SUBJECT, topic }).patterns.find((x) => x.key === key);
  if (!p) {
    const n = insights.patternName(SUBJECT, topic, key);
    return n ? { key, name: n.name, emoji: n.emoji ?? null } : { key, name: { en: key.replace(/_/g, ' ') }, emoji: null };
  }
  return {
    key,
    name: p.name,
    emoji: p.emoji ?? null,
    spot: p.spot ?? null,
    formula: p.formula ?? null,
    method: p.method ?? [],
    shortcut: p.shortcut ?? null,
    trap: p.trap ?? null,
    example: p.example ?? null,
  };
}

function revisionStatusOf(item) {
  if (!item) return { status: 'none' };
  if (item.status === 'mastered') return { status: 'mastered', masteredAt: item.mastered_at ?? null };
  return { status: item.reviews > 0 ? 'revising' : 'due', dueAt: item.due_at, stage: item.stage ?? 0 };
}

function diagnosisOf(d) {
  const gaps = S.diagnose(d.events, d.answers).map((g) => ({ ...g, topics: withNames(g.topics), practice: { ...g.practice, topicName: g.practice.topic ? named(g.practice.topic) : null } }));
  const problems = stuckProblems(d.events);
  const chapters = withNames(S.chapterTable(problems, d.answers));
  const levelFor = levelPlanner(d.quizzes, d.answers, gaps);
  const improvement = withNames(S.improvementOf(d.quizzes, baselines(d.quizzes, d.answers)));
  const next = S.nextAction({ gaps, chapters, levelFor });
  if (next?.topic) next.topicName = named(next.topic);
  return { gaps, problems, chapters, improvement, next, levelFor };
}

/**
 * My Stuck Problems: totals, the chapter table, the probable gaps with their evidence, every
 * stuck question with its solution and learning content, and the next practice.
 */
async function overview(userId) {
  const d = await loadEvidence(userId);
  const { gaps, problems, chapters, improvement, next } = diagnosisOf(d);
  const shown = problems.slice(0, PROBLEMS_LIMIT);
  const ids = shown.map((p) => p.qid);

  const [questions, links, similar] = await Promise.all([
    ids.length ? Question.find({ _id: { $in: ids }, status: 'PUBLISHED' }).select(`${PUBLIC_QUESTION_FIELDS} +correct_option_id +solution`).lean() : [],
    learnLinksSafe(ids),
    similarCounts(shown),
  ]);
  const qOf = new Map(questions.map((q) => [String(q._id), q]));
  const itemOf = new Map(d.stuckItems.map((i) => [String(i.question_id), i]));

  // How often the student was stuck in the same chapter before each problem, and how they did later.
  const stuckEvents = d.events.filter((e) => e.stuck);
  const items = shown
    .filter((p) => qOf.has(p.qid))
    .map((p) => {
      const q = qOf.get(p.qid);
      const before = stuckEvents.filter((e) => e.topic === p.topic && e.at < p.firstAt).length;
      const later = d.answers.filter((a) => a.at > p.at && a.topic === p.topic && (p.pattern ? a.pattern === p.pattern : true));
      return {
        questionId: p.qid,
        topic: p.topic,
        topicName: named(p.topic),
        subtopic: p.subtopic,
        difficulty: p.difficulty,
        times: p.times,
        lastStuckAt: p.at,
        reason: p.stuckReason,
        reasons: p.reasons,
        timeBeforeSec: p.timeBeforeSec,
        outcome: p.outcome, // final answer in that test: CORRECT / INCORRECT / UNATTEMPTED / TIMED_OUT
        yourOptionId: p.selectedOptionId,
        correctOptionId: q.correct_option_id,
        previousStuckInChapter: before,
        later: { answered: later.length, correct: later.filter((a) => a.correct).length },
        revision: revisionStatusOf(itemOf.get(p.qid)),
        concept: patternContent(p.topic, p.pattern),
        similarCount: similar.get(`${p.topic}.${p.pattern}`) ?? 0,
        steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
        shortcut: compactLocalized(q.solution?.shortcut),
        learn: links.get(p.qid) ?? null,
        question: presentQuestion(q),
      };
    });

  const reasons = {};
  for (const p of problems) if (p.stuckReason) reasons[p.stuckReason] = (reasons[p.stuckReason] || 0) + 1;
  const answeredAfter = problems.filter((p) => p.outcome === 'CORRECT' || p.outcome === 'INCORRECT');
  return {
    total: problems.length,
    events: stuckEvents.length,
    solvedAfterStuck: answeredAfter.filter((p) => p.outcome === 'CORRECT').length,
    wrongAfterStuck: answeredAfter.filter((p) => p.outcome === 'INCORRECT').length,
    leftAfterStuck: problems.length - answeredAfter.length,
    reasons,
    chapters,
    gaps,
    improvement,
    next,
    quizzes: d.quizzes.slice(-10).reverse().map((q) => ({ ...q, topics: Object.entries(q.topics).map(([topic, v]) => ({ topic, name: named(topic), ...v, accuracy: pct(v.correct, v.total) })) })),
    items,
    hasMore: problems.length > shown.length,
  };
}

/** Published questions per chapter pattern (the ones a similar-pattern quiz can draw from). */
async function similarCounts(problems) {
  const keys = problems.filter((p) => p.pattern).map((p) => ({ topic: p.topic, pattern: p.pattern }));
  if (!keys.length) return new Map();
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', subject: SUBJECT, $or: keys } },
    { $group: { _id: { topic: '$topic', pattern: '$pattern' }, n: { $sum: 1 } } },
  ]);
  // The stuck question itself does not count as a "similar" one.
  return new Map(rows.map((r) => [`${r._id.topic}.${r._id.pattern}`, Math.max(0, r.n - 1)]));
}

/** Home / dashboard card: the top gap, its evidence, the most stuck chapters, improvement, next action. */
async function summary(userId) {
  const d = await loadEvidence(userId);
  const { gaps, problems, chapters, improvement, next } = diagnosisOf(d);
  return {
    total: problems.length,
    topGap: gaps[0] ?? null,
    mostStuck: chapters.slice(0, 3),
    improvement: improvement.filter((i) => i.change != null).slice(0, 3),
    next,
  };
}

/**
 * The question targets of a "Practice My Weakness" quiz (customTest preset 'stuck'): chapters,
 * per-chapter difficulty mix, the patterns and sub-topics to stay on, and the stuck questions
 * themselves (left out of the quiz). The level is the adaptive level when not chosen.
 * With focusQuestionId (one stuck question's "Practise similar questions" button) the quiz is
 * that question's pattern only. A missing, unpublished or pattern-less focus question falls
 * back silently to the usual chapter behaviour: the quiz must never fail on it.
 */
async function practicePlan(userId, { mode = 'pattern', level = null, count = 10, topics = [], focusQuestionId = null } = {}) {
  const d = await loadEvidence(userId);
  const { gaps, levelFor } = diagnosisOf(d);
  const targets = [];
  const seen = new Set();
  for (const e of d.events) {
    const kind = e.stuck ? 'stuck' : e.outcome === 'INCORRECT' ? 'wrong' : e.outcome === 'UNATTEMPTED' || e.outcome === 'TIMED_OUT' ? 'skipped' : null;
    if (!kind || seen.has(`${kind}:${e.qid}`)) continue;
    seen.add(`${kind}:${e.qid}`);
    targets.push({ qid: e.qid, topic: e.topic, pattern: e.pattern, subtopic: e.subtopic, kind, reason: e.stuckReason });
  }
  const hasStuck = targets.some((t) => t.kind === 'stuck');
  if (!hasStuck) return null;
  const firstTopic = topics[0] ?? gaps[0]?.practice.topic ?? targets.find((t) => t.kind === 'stuck')?.topic;
  const lv = level ?? levelFor(firstTopic, gaps[0]?.gap ?? null);
  const gapTopics = [...new Set(gaps.slice(0, 3).flatMap((g) => g.topics.map((t) => t.topic)))];
  let focus = null;
  if (focusQuestionId) {
    const q = await Question.findById(focusQuestionId).select('subject topic subtopic pattern status').lean().catch(() => null);
    if (q?.status === 'PUBLISHED' && q.subject === SUBJECT && q.pattern) {
      focus = { topic: q.topic, pattern: q.pattern, subtopic: q.subtopic ?? null };
    }
  }
  return S.practiceTargets(targets, { mode, level: lv, count, topics, gapTopics, focus });
}

/**
 * The extra block on a "Practice My Weakness" result: accuracy now vs the previous practice in
 * the same chapters, weakest and strongest pattern, and the adaptive next step.
 * @param {object} session   the submitted stuck quiz (custom.stuck, result)
 * @param {object[]} concepts customTest getReport concepts (pattern accuracy in this quiz)
 */
async function quizReport(userId, session, concepts) {
  const level = session.custom?.stuck?.level ?? 'basic';
  const mode = session.custom?.stuck?.mode ?? 'pattern';
  const per = session.result.per_question;
  const correct = per.filter((p) => p.outcome === 'CORRECT').length;
  const now = pct(correct, per.length);
  const topics = [...new Set(per.map((p) => p.topic))];

  const prev = await MockSession.find({
    user_id: userId,
    status: 'SUBMITTED',
    'custom.preset': 'stuck',
    submitted_at: { $lt: session.submitted_at },
    'config.topic_ids': { $in: topics },
  })
    .sort({ submitted_at: -1 })
    .limit(1)
    .select('result.per_question')
    .lean();
  let previous = null;
  if (prev[0]) {
    const rows = prev[0].result.per_question.filter((p) => topics.includes(p.topic));
    previous = pct(rows.filter((p) => p.outcome === 'CORRECT').length, rows.length);
  } else {
    // First practice in these chapters: compare with how the student did on them before.
    const answers = (await insights.answersOf(userId)).filter((a) => a.subject === SUBJECT && topics.includes(a.topic) && a.at < session.started_at).slice(0, 30);
    previous = answers.length >= 3 ? pct(answers.filter((a) => a.correct).length, answers.length) : null;
  }
  const ranked = [...concepts].filter((c) => c.total >= 1).sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);
  const step = S.nextLevel(level, correct, per.length);
  return {
    mode,
    level,
    accuracy: now,
    previous,
    change: previous == null ? null : now - previous,
    weakestPattern: ranked.length > 1 && ranked[0].accuracy < 100 ? ranked[0] : null,
    strongestPattern: ranked.length > 1 && ranked[ranked.length - 1].accuracy > 0 ? ranked[ranked.length - 1] : null,
    next: { ...step, mode, topics: topics.map((topic) => ({ topic, name: named(topic) })) },
  };
}

module.exports = { overview, summary, practicePlan, quizReport, loadEvidence, stuckProblems };
