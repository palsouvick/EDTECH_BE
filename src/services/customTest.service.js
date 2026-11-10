'use strict';

/**
 * Custom chapter test: the student picks the chapters they have studied, the number of
 * questions, the difficulty, the time and the mode, and gets a test built ONLY from those
 * chapters.
 *
 *   exam mode      the CBT exam screen (/mock/:id): countdown, palette, mark for review,
 *                  answers and explanations only after submitting; official WBPSC Clerkship
 *                  marking for the subject (services/markingScheme.js)
 *   practice mode  one question at a time; each answer is checked straight away (and locked)
 *                  with its explanation, shortcut and related concept; +1, no negative marks
 *
 * A custom test is stored as a MockSession with a `custom` block, so submitting, the Mistake
 * Notebook, revision and chapter mastery (insights) work exactly as for a mock. Peers and
 * official cut-offs are not shown for it (mockAnalytics.service.js): it is not the full paper.
 *
 * Presets: custom, weak (my weak chapters), mistakes (retry my mistakes: mostly NEW questions
 * on the same patterns), quick10, mastery (one chapter, exam level), challenge (hard),
 * followup (practice again: same chapters, weak ones weighted, no repeated questions).
 * Questions come only from the published bank; nothing is generated.
 */

const { Question, MockSession, ReviewItem } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, compactLocalized } = require('./presenters');
const { resolveMarking } = require('./markingScheme');
const { mockQuestionAlias } = require('./signedToken');
const { topicName } = require('./catalogNames');
const { getPriorities } = require('./priority.service');
const insights = require('./insights.service');
const learn = require('./learn.service');
const mock = require('./mock.service');
const config = require('../config');
const AppError = require('../utils/AppError');
const L = require('./customTest.logic');

const CATEGORY = 'WBPSC';
const PRACTICE_MARKING = Object.freeze({ positive: 1, negative: 0, basis: 'PRACTICE', examCode: null, sourceUrl: null });
const WEAK_BELOW = 60;
const WEAK_MIN_ANSWERS = 5;
const MAX_WEAK_CHAPTERS = 4;

/* ------------------------------------------------------------------ data loading */

/** Chapters of a subject in Learn order, with their titles. */
async function chaptersOf(subject) {
  const { chapters } = await learn.getSubject(subject);
  return chapters.map((c) => ({ topic: c.topic, title: c.title ?? topicName(subject, c.topic), emoji: c.emoji }));
}

/** Published questions per chapter in the student's language: total, per band, real PYQs. */
async function availability(subject, language) {
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', subject, lang_set: { $in: langSetsContaining(language) } } },
    {
      $group: {
        _id: { t: '$topic', d: '$difficulty', p: { $and: [{ $eq: ['$pyq.is_pyq', true] }, { $in: ['$provenance', L.REAL_PAPER] }] } },
        n: { $sum: 1 },
      },
    },
  ]);
  const out = new Map();
  for (const { _id, n } of rows) {
    const a = out.get(_id.t) || { total: 0, easy: 0, moderate: 0, hard: 0, pyq: 0 };
    a.total += n;
    a[{ EASY: 'easy', MEDIUM: 'moderate', HARD: 'hard' }[L.bandOf(_id.d)]] += n;
    if (_id.p) a.pyq += n;
    out.set(_id.t, a);
  }
  return out;
}

/** What the generator knows about this student in one subject. */
async function loadSignals(userId, subject) {
  const [all, open, recent, priorities] = await Promise.all([
    insights.answersOf(userId),
    ReviewItem.find({ user_id: userId, subject, from_mistake: true, status: 'active' }).select('question_id topic').lean(),
    mock.recentlyServedQuestionIds(userId),
    getPriorities().catch(() => ({ subjects: {} })),
  ]);
  const answers = all.filter((a) => a.subject === subject);
  const mastery = new Map(insights.buildMastery(answers).filter((m) => m.subject === subject).map((m) => [m.topic, m]));

  const byPattern = new Map();
  for (const a of answers) {
    if (!a.pattern) continue;
    const k = `${a.topic}.${a.pattern}`;
    const p = byPattern.get(k) || { n: 0, c: 0 };
    p.n += 1;
    if (a.correct) p.c += 1;
    byPattern.set(k, p);
  }
  const weakPatterns = new Set([...byPattern].filter(([, p]) => p.n >= 3 && p.c / p.n < 0.5).map(([k]) => k));

  const mistakeQs = open.length
    ? await Question.find({ _id: { $in: open.map((m) => m.question_id) } }).select('topic pattern subtopic').lean()
    : [];
  const mistakesByTopic = new Map();
  for (const m of open) mistakesByTopic.set(m.topic, (mistakesByTopic.get(m.topic) || 0) + 1);

  return {
    seen: new Set(answers.map((a) => a.qid)),
    recent: new Set(recent.map(String)),
    mistakeQids: new Set(open.map((m) => String(m.question_id))),
    mistakePatterns: new Set(mistakeQs.filter((q) => q.pattern).map((q) => `${q.topic}.${q.pattern}`)),
    mistakeSubtopics: new Set(mistakeQs.filter((q) => q.subtopic).map((q) => `${q.topic}.${q.subtopic}`)),
    weakPatterns,
    mastery,
    mistakesByTopic,
    priority: priorities.subjects?.[subject]?.topics ?? {},
  };
}

/** Weak chapters: at least 5 recent answers and under 60% (worst first, up to 4). */
function weakChapters(topics, signals) {
  return topics
    .map((t) => signals.mastery.get(t))
    .filter((m) => m && m.recentAnswers >= WEAK_MIN_ANSWERS && m.accuracyPct != null && m.accuracyPct < WEAK_BELOW)
    .sort((a, b) => a.accuracyPct - b.accuracyPct)
    .slice(0, MAX_WEAK_CHAPTERS)
    .map((m) => m.topic);
}

async function customSessionOr404(userId, sessionId, select = '') {
  const s = await MockSession.findOne({ _id: sessionId, user_id: userId }).select(select).lean();
  if (!s || !s.custom) throw AppError.notFound('CUSTOM_TEST_NOT_FOUND', 'Custom test not found');
  return s;
}

const scorePctOf = (r) => (r?.max_score ? Math.max(0, Math.round((r.score / r.max_score) * 100)) : 0);
const accuracyOf = (r) => (r?.per_question?.length ? Math.round((r.correct / r.per_question.length) * 100) : 0);

/* ------------------------------------------------------------------ options */

/** Everything the setup popup needs: chapters with availability and the student's standing. */
async function getOptions(userId, { subject, language }) {
  const [chapters, avail, signals, history] = await Promise.all([
    chaptersOf(subject),
    availability(subject, language),
    loadSignals(userId, subject),
    getHistory(userId, { subject }),
  ]);
  const topics = chapters.map((c) => c.topic);
  return {
    subject,
    chapters: chapters.map((c) => {
      const m = signals.mastery.get(c.topic);
      return {
        ...c,
        available: avail.get(c.topic) ?? { total: 0, easy: 0, moderate: 0, hard: 0, pyq: 0 },
        accuracyPct: m?.recentAnswers ? m.accuracyPct : null,
        answers: m?.recentAnswers ?? 0,
        status: m?.status ?? 'not_started',
        mistakes: signals.mistakesByTopic.get(c.topic) || 0,
        priority: signals.priority[c.topic]?.level ?? null,
      };
    }),
    weakTopics: weakChapters(topics, signals),
    mistakesTotal: [...signals.mistakesByTopic.values()].reduce((a, n) => a + n, 0),
    secondsPerQuestion: L.SECONDS_PER_QUESTION[subject],
    limits: { min: L.MIN_QUESTIONS, max: L.MAX_QUESTIONS },
    history: { testsTaken: history.testsTaken, challengeUnlocked: history.challengeUnlocked, lastScores: history.recent.slice(0, 3).map((t) => t.scorePct) },
  };
}

/* ------------------------------------------------------------------ planning */

/**
 * Turns the request (with its preset) into concrete settings: chapters, count, difficulty,
 * distribution, mode, chapters to focus on and questions to leave out.
 */
async function resolveRequest(userId, body, signals, allTopics) {
  // Unset fields take the defaults (20 questions, exam level, smart split, exam mode); a preset may override them.
  const r = {
    ...body,
    questionCount: body.questionCount ?? 20,
    difficulty: body.difficulty ?? 'exam',
    distribution: body.distribution ?? 'smart',
    mode: body.mode ?? 'exam',
    focus: new Set(),
    exclude: new Set(),
    followUp: null,
  };
  const chosen = body.topics.filter((t) => allTopics.includes(t));
  switch (body.preset) {
    case 'weak': {
      r.topics = weakChapters(chosen.length ? chosen : allTopics, signals);
      if (!r.topics.length) throw AppError.unprocessable('NO_WEAK_TOPICS', 'No weak chapters yet: answer at least 5 questions in a chapter first');
      r.distribution = 'smart';
      break;
    }
    case 'mistakes': {
      r.topics = (chosen.length ? chosen : allTopics).filter((t) => signals.mistakesByTopic.get(t));
      if (!r.topics.length) throw AppError.unprocessable('NO_MISTAKES', 'No open mistakes in these chapters');
      r.distribution = 'mistakes';
      break;
    }
    case 'quick10':
      r.topics = chosen;
      r.questionCount = 10;
      r.difficulty = body.difficulty ?? 'mixed';
      break;
    case 'mastery':
      if (chosen.length !== 1) throw AppError.unprocessable('ONE_CHAPTER', 'A mastery test is for exactly one chapter');
      r.topics = chosen;
      r.difficulty = body.difficulty ?? 'exam';
      break;
    case 'challenge':
      r.topics = chosen;
      r.difficulty = 'hard';
      break;
    case 'followup': {
      if (!body.followUpOf) throw AppError.unprocessable('FOLLOW_UP_REQUIRED', 'followUpOf is required to practise again');
      const prev = await customSessionOr404(userId, body.followUpOf, 'status custom config result.per_question result.score result.max_score result.correct');
      if (prev.status !== 'SUBMITTED') throw AppError.conflict('SESSION_NOT_SUBMITTED', 'Finish that test first');
      const byTopic = new Map();
      for (const p of prev.result.per_question) {
        const t = byTopic.get(p.topic) || { c: 0, n: 0 };
        t.n += 1;
        if (p.outcome === 'CORRECT') t.c += 1;
        byTopic.set(p.topic, t);
      }
      r.topics = prev.custom.topics.filter((t) => allTopics.includes(t));
      for (const [t, v] of byTopic) if (v.c / v.n < L.STRONG_FROM / 100) r.focus.add(t);
      for (const p of prev.result.per_question) r.exclude.add(String(p.qid));
      const acc = accuracyOf(prev.result);
      r.difficulty = acc >= 85 ? L.stepUp(prev.custom.difficulty) : prev.custom.difficulty;
      r.mode = body.mode ?? prev.custom.mode;
      r.questionCount = body.questionCount ?? prev.result.per_question.length;
      r.distribution = 'smart';
      r.followUp = { sessionId: String(prev._id), accuracy: acc };
      break;
    }
    default:
      r.topics = chosen;
  }
  if (!r.topics.length) throw AppError.unprocessable('NO_CHAPTERS', 'Choose at least one chapter');
  return r;
}

function planFor(req, avail, signals) {
  const chapters = req.topics.map((t) => {
    const m = signals.mastery.get(t);
    return {
      topic: t,
      available: Math.max(0, (avail.get(t)?.total ?? 0)),
      accuracyPct: m?.recentAnswers ? m.accuracyPct : null,
      answers: m?.recentAnswers ?? 0,
      mistakes: signals.mistakesByTopic.get(t) || 0,
      priority: signals.priority[t]?.level ?? null,
      focus: req.focus.has(t),
    };
  });
  return L.planDistribution({ chapters, questionCount: req.questionCount, distribution: req.distribution });
}

/** The plan without creating a test: shown on the summary step. */
async function previewTest(userId, body) {
  const [chapters, avail, signals] = await Promise.all([chaptersOf(body.subject), availability(body.subject, body.language), loadSignals(userId, body.subject)]);
  const req = await resolveRequest(userId, body, signals, chapters.map((c) => c.topic));
  const { plan, total, shortBy } = planFor(req, avail, signals);
  return {
    subject: body.subject,
    preset: req.preset,
    topics: req.topics,
    questionCount: total,
    requested: req.questionCount,
    shortBy,
    difficulty: req.difficulty,
    distribution: req.distribution,
    mode: req.mode,
    plan,
    recommendedMinutes: L.smartMinutes(body.subject, req.difficulty, total),
    followUp: req.followUp,
  };
}

/* ------------------------------------------------------------------ create */

const CANDIDATE_FIELDS = '_id topic subtopic difficulty pattern provenance pyq.is_pyq latest_pyq_year +duplicate_keys';

async function createTest(userId, body) {
  const { subject, language } = body;
  const [chapters, avail, signals] = await Promise.all([chaptersOf(subject), availability(subject, language), loadSignals(userId, subject)]);
  const req = await resolveRequest(userId, body, signals, chapters.map((c) => c.topic));
  const { plan, total } = planFor(req, avail, signals);
  if (total < L.MIN_QUESTIONS) {
    throw AppError.unprocessable('INSUFFICIENT_QUESTIONS', `Only ${total} questions are available in these chapters; choose more chapters`, { available: total, requested: req.questionCount });
  }

  const rule = L.DIFFICULTY_RULES[req.difficulty];
  const topicsUsed = plan.filter((p) => p.count > 0).map((p) => p.topic);
  const candidates = await Question.find({
    status: 'PUBLISHED',
    subject,
    topic: { $in: topicsUsed },
    lang_set: { $in: langSetsContaining(language) },
    ...(req.exclude.size && { _id: { $nin: [...req.exclude] } }),
  }).select(CANDIDATE_FIELDS).lean();
  const byTopic = new Map();
  for (const q of candidates) {
    q.realPyq = Boolean(q.pyq?.is_pyq && L.REAL_PAPER.includes(q.provenance));
    if (!byTopic.has(q.topic)) byTopic.set(q.topic, []);
    byTopic.get(q.topic).push(q);
  }

  const picked = [];
  const notes = { borrowed: 0, pyq: 0, siblings: 0, originals: 0, mix: { EASY: 0, MEDIUM: 0, HARD: 0 } };
  const finalPlan = [];
  const dupSeen = new Set();
  for (const p of plan) {
    if (!p.count) {
      finalPlan.push(p);
      continue;
    }
    // A question that is a duplicate of one already chosen for another chapter is skipped.
    const pool = (byTopic.get(p.topic) || []).filter((q) => !(q.duplicate_keys || []).some((d) => dupSeen.has(d)));
    const res = L.pickChapter(pool, p.count, { mix: rule.mix, signals, preset: req.preset, pyqBoost: rule.pyqBoost });
    for (const q of res.picked) for (const d of q.duplicate_keys || []) dupSeen.add(d);
    picked.push(...res.picked);
    finalPlan.push({ ...p, count: res.picked.length });
    notes.borrowed += res.borrowed;
    notes.pyq += res.pyq;
    notes.siblings += res.siblings;
    notes.originals += res.originals;
    for (const b of Object.keys(notes.mix)) notes.mix[b] += res.mix[b];
  }
  if (picked.length < L.MIN_QUESTIONS) {
    throw AppError.unprocessable('INSUFFICIENT_QUESTIONS', `Only ${picked.length} questions are available in these chapters; choose more chapters`, { available: picked.length, requested: req.questionCount });
  }

  const docs = await Question.find({ _id: { $in: picked.map((q) => q._id) } }).select(`${PUBLIC_QUESTION_FIELDS} +correct_option_id`).lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const ordered = mock.shuffle(picked.map((q) => byId.get(String(q._id))).filter(Boolean));
  if (ordered.length < picked.length) throw new AppError(503, 'GENERATION_RACE', 'Question bank changed during generation, please retry');

  const n = ordered.length;
  const recommended = L.smartMinutes(subject, req.difficulty, n);
  const untimed = req.timeLimitMinutes === null;
  const minutes = untimed ? null : (req.timeLimitMinutes ?? recommended);
  if (!untimed && minutes * 60 < n * 10) throw AppError.unprocessable('TIME_TOO_SHORT', 'The time must allow at least 10 seconds per question');
  const practice = req.mode === 'practice';
  const marking = practice ? PRACTICE_MARKING : resolveMarking({ category: CATEGORY, subject });

  const now = new Date();
  // Both modes can be paused and resumed (beginners need the pause even in
  // exam mode), so the session lives for the pausable TTL; the countdown
  // itself still ends the test when its time is up.
  const expiresAt = new Date(now.getTime() + config.mock.pausableSessionTtlHours * 3600_000);
  const sessionId = new MockSession()._id;
  const session = await MockSession.create({
    _id: sessionId,
    user_id: userId,
    config: {
      category: CATEGORY,
      subject,
      topic_ids: req.topics,
      language,
      question_count: n,
      time_limit_min: minutes,
      per_question_timer: false,
      per_question_limit_sec: null,
      allow_pause: true,
      marking: { positive: marking.positive, negative: marking.negative, basis: marking.basis, exam_code: marking.examCode ?? undefined, source_url: marking.sourceUrl ?? undefined },
      question_aliases: true,
    },
    custom: {
      preset: req.preset,
      mode: req.mode,
      difficulty: req.difficulty,
      distribution: req.distribution,
      topics: req.topics,
      plan: finalPlan,
      recommended_min: recommended,
      follow_up_of: req.followUp?.sessionId ?? null,
    },
    questions: ordered.map((q, i) => ({ qid: q._id, seq: i + 1, topic: q.topic, difficulty: q.difficulty })),
    answer_key: Object.fromEntries(ordered.map((q) => [String(q._id), q.correct_option_id])),
    started_at: now,
    expires_at: expiresAt,
  });
  const lean = session.toObject();
  return {
    sessionId: String(session._id),
    status: session.status,
    config: mock.presentConfig(lean.config),
    custom: mock.presentCustom(lean),
    startedAt: now,
    expiresAt,
    notes: { ...notes, requested: req.questionCount, shortBy: Math.max(0, req.questionCount - n) },
    questions: ordered.map((q, i) => mock.presentLiveQuestion(lean, q, i + 1)),
  };
}

/* ------------------------------------------------------------------ practice: check one answer */

function explanationOf(q) {
  return {
    steps: (q.solution?.steps || []).map(compactLocalized).filter(Boolean),
    shortcut: compactLocalized(q.solution?.shortcut),
    traps: (q.solution?.traps || []).map((t) => ({ optionId: t.option_id ?? null, note: compactLocalized(t.note) })),
  };
}

/**
 * Practice mode: marks one answer and returns its explanation. The first answer checked for a
 * question is stored and is final (a second check returns the stored one, `locked: true`), so
 * reading the explanation cannot raise the score.
 */
async function checkAnswer(userId, sessionId, { questionId, selectedOptionId }) {
  const session = await customSessionOr404(userId, sessionId, '+answer_key');
  if (session.custom.mode !== 'practice') throw AppError.conflict('NOT_PRACTICE_MODE', 'Answers are shown after an exam-mode test is submitted');
  if (session.status !== 'ACTIVE' || mock.deadlinePassed(session, new Date())) throw AppError.conflict('SESSION_NOT_ACTIVE', 'This test is no longer active');

  const sid = String(session._id);
  const entry = session.questions.find((q) => mockQuestionAlias(sid, String(q.qid)) === questionId || String(q.qid) === questionId);
  if (!entry) throw AppError.unprocessable('UNKNOWN_QUESTION', 'This question is not part of the test');
  const qid = String(entry.qid);
  const q = await Question.findById(qid).select('options.oid topic subject pattern +solution').lean();
  if (!q) throw AppError.notFound('QUESTION_NOT_FOUND', 'This question was removed from the bank');
  if (!q.options.some((o) => o.oid === selectedOptionId)) throw AppError.unprocessable('UNKNOWN_OPTION', 'That option is not part of this question');

  const path = `custom.answers.${qid}`;
  const { modifiedCount } = await MockSession.updateOne({ _id: session._id, status: 'ACTIVE', [path]: { $exists: false } }, { $set: { [path]: selectedOptionId } });
  let finalOption = selectedOptionId;
  if (!modifiedCount) {
    const again = await MockSession.findById(session._id).select('custom.answers').lean();
    finalOption = again?.custom?.answers?.[qid] ?? selectedOptionId;
  }
  const correct = session.answer_key[qid];
  const pattern = q.pattern ? insights.patternName(session.config.subject, entry.topic, q.pattern) : null;
  return {
    questionId,
    selectedOptionId: finalOption,
    correctOptionId: correct,
    isCorrect: finalOption === correct,
    locked: !modifiedCount,
    explanation: explanationOf(q),
    concept: { subject: session.config.subject, topic: entry.topic, name: topicName(session.config.subject, entry.topic), pattern: pattern?.name ?? null },
  };
}

/* ------------------------------------------------------------------ result report */

async function recentScores(userId, subject, limit = 3) {
  const rows = await MockSession.find({ user_id: userId, 'config.subject': subject, status: 'SUBMITTED', 'custom.mode': { $exists: true } })
    .sort({ submitted_at: -1 })
    .limit(limit)
    .select('result.score result.max_score')
    .lean();
  return rows.map((r) => scorePctOf(r.result));
}

/**
 * The result of a custom test beyond the standard analytics: chapter table with strong /
 * needs practice / weak, pattern strengths (named concepts), what to do next per chapter,
 * the previous score (follow-up), and the settings for "Practice again" and "Challenge me".
 */
async function getReport(userId, sessionId) {
  const session = await customSessionOr404(userId, sessionId);
  if (session.status !== 'SUBMITTED') throw AppError.conflict('SESSION_NOT_SUBMITTED', 'The report is ready after the test is submitted');
  const { subject } = session.config;
  const r = session.result;
  const chapters = await chaptersOf(subject);
  const order = chapters.map((c) => c.topic);
  const titles = new Map(chapters.map((c) => [c.topic, c.title]));

  const byTopic = new Map();
  for (const p of r.per_question) {
    const t = byTopic.get(p.topic) || { topic: p.topic, correct: 0, wrong: 0, skipped: 0, total: 0 };
    t.total += 1;
    if (p.outcome === 'CORRECT') t.correct += 1;
    else if (p.outcome === 'INCORRECT') t.wrong += 1;
    else t.skipped += 1;
    byTopic.set(p.topic, t);
  }
  const chapterRows = [...byTopic.values()]
    .map((t) => {
      const accuracy = Math.round((t.correct / t.total) * 100);
      return { ...t, name: titles.get(t.topic) ?? topicName(subject, t.topic), accuracy, band: L.chapterBand(accuracy) };
    })
    .sort((a, b) => order.indexOf(a.topic) - order.indexOf(b.topic));

  // Concepts (question patterns) inside the chapters, e.g. "Successive percentage change".
  const qs = await Question.find({ _id: { $in: r.per_question.map((p) => p.qid) } }).select('pattern').lean();
  const patternOf = new Map(qs.map((q) => [String(q._id), q.pattern]));
  const byPattern = new Map();
  for (const p of r.per_question) {
    const key = patternOf.get(String(p.qid));
    if (!key) continue;
    const k = `${p.topic}.${key}`;
    const v = byPattern.get(k) || { topic: p.topic, pattern: key, correct: 0, total: 0 };
    v.total += 1;
    if (p.outcome === 'CORRECT') v.correct += 1;
    byPattern.set(k, v);
  }
  const concepts = [...byPattern.values()].map((v) => {
    const accuracy = Math.round((v.correct / v.total) * 100);
    const named = insights.patternName(subject, v.topic, v.pattern);
    // strong: all/most right on 2+ questions; weak: under half right; revise: some wrong.
    const status = v.total >= 2 && accuracy >= 80 ? 'strong' : accuracy < 50 ? 'weak' : accuracy < 100 ? 'revise' : 'strong';
    return { ...v, name: named?.name ?? { en: v.pattern.replace(/_/g, ' ') }, accuracy, status };
  });

  const strongTopics = new Set(chapterRows.filter((c) => c.accuracy >= 85).map((c) => c.topic));
  const nextChapterOf = (topic) => order.slice(order.indexOf(topic) + 1).find((t) => !session.custom.topics.includes(t) && !strongTopics.has(t)) ?? null;
  const recommendations = L.recommendationsFor(chapterRows, { nextChapterOf }).map((x) => ({ ...x, name: titles.get(x.topic), nextName: x.nextTopic ? titles.get(x.nextTopic) : null }));

  const accuracy = accuracyOf(r);
  let previous = null;
  if (session.custom.follow_up_of) {
    const prev = await MockSession.findOne({ _id: session.custom.follow_up_of, user_id: userId }).select('result').lean();
    if (prev?.result) previous = { sessionId: String(session.custom.follow_up_of), accuracy: accuracyOf(prev.result), scorePct: scorePctOf(prev.result) };
  }
  const focus = chapterRows.filter((c) => c.accuracy < L.STRONG_FROM);
  const scores = await recentScores(userId, subject);
  return {
    sessionId: String(session._id),
    subject,
    custom: mock.presentCustom(session),
    score: r.score,
    maxScore: r.max_score,
    scorePct: scorePctOf(r),
    accuracy,
    correct: r.correct,
    wrong: r.incorrect,
    skipped: r.unattempted + (r.timed_out || 0),
    total: r.per_question.length,
    timeSec: r.total_time_sec,
    timeLimitMinutes: session.config.time_limit_min,
    marking: { positive: session.config.marking.positive, negative: session.config.marking.negative, basis: session.config.marking.basis },
    chapters: chapterRows,
    masteryPct: session.custom.preset === 'mastery' ? accuracy : null,
    concepts,
    recommendations,
    previous,
    nextTest: {
      preset: 'followup',
      followUpOf: String(session._id),
      focusTopics: focus.map((c) => ({ topic: c.topic, name: c.name })),
      difficulty: accuracy >= 85 ? L.stepUp(session.custom.difficulty) : session.custom.difficulty,
      harder: accuracy >= 85,
    },
    challenge: { unlocked: L.challengeUnlocked(scores), lastScores: scores, threshold: L.CHALLENGE_FROM },
  };
}

/* ------------------------------------------------------------------ history */

async function getHistory(userId, { subject }) {
  const rows = await MockSession.find({ user_id: userId, 'config.subject': subject, status: 'SUBMITTED', 'custom.mode': { $exists: true } })
    .sort({ submitted_at: -1 })
    .limit(100)
    .select('custom.preset custom.mode custom.difficulty custom.topics submitted_at result.score result.max_score result.correct result.total_time_sec result.per_question.topic result.per_question.outcome')
    .lean();
  const tests = rows.map((s) => ({
    sessionId: String(s._id),
    at: s.submitted_at,
    preset: s.custom.preset,
    mode: s.custom.mode,
    difficulty: s.custom.difficulty,
    topics: s.custom.topics,
    scorePct: scorePctOf(s.result),
    accuracy: accuracyOf(s.result),
    timeSec: s.result.total_time_sec || 0,
    total: s.result.per_question.length,
    perQuestion: s.result.per_question.map((p) => ({ topic: p.topic, correct: p.outcome === 'CORRECT' })),
  }));
  const summary = L.historySummary(tests);
  return {
    subject,
    ...summary,
    mastery: summary.mastery.map((m) => ({ ...m, name: topicName(subject, m.topic) })),
    recent: tests.slice(0, 10).map(({ perQuestion, ...t }) => ({ ...t, topicNames: t.topics.map((x) => topicName(subject, x)) })),
  };
}

module.exports = { getOptions, previewTest, createTest, checkAnswer, getReport, getHistory, weakChapters };
