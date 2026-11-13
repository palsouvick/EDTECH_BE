'use strict';

/**
 * My learning analysis (Mathematics and English): pure rules (mastery, focus score, skip
 * reasons, trends, Smart Quiz shares) and the API (/me/analysis, /me/study-log, /me/skips,
 * /custom-tests preset "smart") against a real mongod.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const A = require('../src/services/analysis.logic');
const { likelyReason, mergeSkips } = require('../src/services/skips.service');
const L = require('../src/services/customTest.logic');
const { createApp } = require('../src/app');
const { Question, ExamCategory, MockSession, ReviewItem, PracticeAttempt, QuestionSkip, ChapterStudy, StudyPlanProgress } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { gradeAnswers } = require('../src/services/grading');
const catalog = require('../db/seed/catalog');

const DAY = 86400_000;
const NOW = new Date('2026-11-13T06:00:00Z');

/* ------------------------------------------------------------------ pure rules */

test('mastery needs 5 answers, is shrunk for few answers, and fades after 14 idle days', () => {
  assert.equal(A.masteryPct({ answers: 4, recentAccuracy: 100 }), null);
  const full = A.masteryPct({ answers: 30, recentAccuracy: 80, hardAccuracy: 60, practicePct: 100, pyqPct: 50, daysSinceActivity: 1 });
  assert.equal(full, Math.round(0.6 * 80 + 0.15 * 60 + 0.15 * 100 + 0.1 * 50));
  const few = A.masteryPct({ answers: 5, recentAccuracy: 80, hardAccuracy: 60, practicePct: 100, pyqPct: 50, daysSinceActivity: 1 });
  assert.equal(few, Math.round(full / 3));
  const idle = A.masteryPct({ answers: 30, recentAccuracy: 80, hardAccuracy: 60, practicePct: 100, pyqPct: 50, daysSinceActivity: 34 });
  assert.ok(idle < full && idle >= Math.round(full * 0.7));
});

test('focus weights sum to 100 and a weak, skipped, mistake-heavy chapter outranks a strong one', () => {
  assert.equal(Object.values(A.FOCUS_WEIGHTS).reduce((a, b) => a + b, 0), 100);
  const weak = A.focusScore({ answers: 35, skipped: 6, recentAccuracy: 40, openMistakes: 8, repeatedMistakes: 3, readingPct: 100, practicePct: 50, pyqPct: 20, revisionPct: 10, priority: 'MUST', daysSinceTouched: 18, trend: { recentDelta: -15 }, hardAccuracy: 20, mastery: 35 });
  const strong = A.focusScore({ answers: 60, skipped: 0, recentAccuracy: 92, openMistakes: 0, repeatedMistakes: 0, readingPct: 100, practicePct: 100, pyqPct: 90, revisionPct: 100, priority: null, daysSinceTouched: 1, trend: { recentDelta: 2 }, hardAccuracy: 85, mastery: 88 });
  assert.equal(weak.band, 'high');
  assert.equal(strong.band, 'strong');
  assert.ok(weak.score > 65 && strong.score < 20, `${weak.score} / ${strong.score}`);
  assert.equal(A.focusScore({ answers: 0, skipped: 0, practicePct: 0, readingPct: 0 }).band, 'not_started');
});

test('subject summary: needs-attention counts medium and high chapters, weak counts high only', () => {
  const ch = (band, mastery = null, started = true) => ({ started, mastery, focus: { band }, complete: false, openMistakes: 0, openSkips: 0, revision: { due: false }, time: { totalSec: 0 } });
  const s = A.subjectSummary([ch('high', 40), ch('medium', 55), ch('low', 70), ch('strong', 90), ch('not_started', null, false)], []);
  assert.equal(s.weakChapters, 1);
  assert.equal(s.needsAttentionChapters, 2);
  assert.equal(s.masteryPct, Math.round((40 + 55 + 70 + 90) / 4));
  assert.equal(s.syllabusMasteryPct, Math.round((40 + 55 + 70 + 90) / 5));
});

test('subject summary: PYQ totals, last-7-days activity and the practice-bank pace', () => {
  const ch = (extra = {}) => ({ started: true, mastery: 50, focus: { band: 'low' }, complete: false, openMistakes: 0, openSkips: 0, revision: { due: false }, time: { totalSec: 0 }, remaining: 0, pyqSolved: 0, pyqTotal: 0, ...extra });
  const now = new Date('2026-11-13T06:00:00Z');
  const ans = (agoDays, timeSec) => ({ at: new Date(now.getTime() - agoDays * DAY), timeSec, correct: true });
  const answers = [
    ...Array.from({ length: 14 }, () => ans(1, 60)), // yesterday: 14 answers, 14 solving minutes
    ...Array.from({ length: 7 }, () => ans(6, 30)), // 6 days ago: 7 answers, 3.5 solving minutes
    ans(20, 60), // outside the 14-day pace window
  ];
  const s = A.subjectSummary(
    [ch({ remaining: 40, pyqSolved: 5, pyqTotal: 10 }), ch({ remaining: 20, pyqSolved: 0, pyqTotal: 5 })],
    answers,
    { now, tzMin: 330 },
  );
  assert.equal(s.pyqSolved, 5);
  assert.equal(s.pyqTotal, 15);
  assert.equal(s.weekAnswered, 21);
  assert.equal(s.weekMinutes, 18); // 14×60s + 7×30s = 1050s ≈ 18 min
  assert.equal(s.weekActiveDays, 2);
  assert.equal(s.remainingQuestions, 60);
  assert.equal(s.answersPerDay, 1.5); // 21 answers in the last 14 days
  assert.equal(s.paceDays, 40); // 60 remaining at 1.5/day
  // Without `now` there is no week or pace, but the totals still hold.
  const noNow = A.subjectSummary([ch({ remaining: 40 })], answers);
  assert.equal(noNow.weekMinutes, null);
  assert.equal(noNow.weekActiveDays, null);
  assert.equal(noNow.answersPerDay, null);
  assert.equal(noNow.paceDays, null);
  assert.equal(noNow.remainingQuestions, 40);
});

test('why reasons carry the facts, and the action plan follows the accuracy', () => {
  const c = { answers: 35, wrong: 14, skipped: 6, recentAccuracy: 50, openMistakes: 5, repeatedMistakes: 3, readingPct: 100, practicePct: 60, unique: 36, practiceGoal: 60, pyqPct: 35, pyqSolved: 7, pyqTotal: 20, revisionPct: 20, daysSinceRevision: 18, daysSinceTouched: 18, priority: 'MUST', trend: {}, hardAccuracy: null, mastery: 45 };
  const why = A.whyReasons(c, A.focusScore(c));
  assert.deepEqual(why[0], { key: 'low_accuracy', wrong: 14, answered: 35, accuracy: 50 });
  assert.ok(why.some((r) => r.key === 'mistakes' && r.repeated === 3));
  assert.ok(why.some((r) => r.key === 'skips' && r.skipped === 6));
  const plan = A.actionPlan(c, { targetSec: 75 });
  assert.deepEqual(plan.steps.map((s) => s.level ?? s.kind), ['read', 'mistakes', 'beginner', 'intermediate', 'advanced', 'pyq', 'smart_quiz']);
  assert.equal(plan.questions, 5 + 15 + 5 + 10);
  assert.deepEqual(A.actionPlan({ ...c, recentAccuracy: 90, mastery: 85, openMistakes: 0, pyqPct: 80 }, { targetSec: 75 }).steps.map((s) => s.level ?? s.kind), ['advanced', 'smart_quiz']);
});

test('skips are never simply "does not know": a likely reason from how it happened', () => {
  assert.equal(likelyReason({ outcome: 'TIMED_OUT' }), 'ran_out_of_time');
  assert.equal(likelyReason({ outcome: 'UNATTEMPTED', timed: true, seq: 95, count: 100, timeSec: 5, difficulty: 2, targetSec: 75 }), 'time_pressure');
  assert.equal(likelyReason({ outcome: 'UNATTEMPTED', timed: true, seq: 10, count: 100, timeSec: 90, difficulty: 3, targetSec: 75 }), 'unsure');
  assert.equal(likelyReason({ outcome: 'UNATTEMPTED', timeSec: 6, difficulty: 5, targetSec: 75 }), 'too_difficult');
  assert.equal(likelyReason({ outcome: 'UNATTEMPTED', timeSec: 6, difficulty: 2, targetSec: 75 }), 'did_not_understand');
  assert.equal(likelyReason({ outcome: 'UNATTEMPTED', timeSec: null, difficulty: 3, targetSec: 75 }), 'unsure');
});

test('a skip stays open until the question is answered right after it', () => {
  const t0 = new Date(NOW - 3 * DAY);
  const ev = [{ qid: 'a', topic: 't', at: t0, count: 1 }, { qid: 'b', topic: 't', at: t0, count: 2 }];
  const m = mergeSkips(ev, [{ qid: 'a', correct: true, at: new Date(NOW - DAY) }, { qid: 'b', correct: true, at: new Date(NOW - 5 * DAY) }]);
  assert.equal(m.get('a').open, false);
  assert.equal(m.get('b').open, true);
  assert.equal(m.get('b').count, 2);
});

test('trend: weekly accuracy, change over the window, and a recent drop', () => {
  const answers = [];
  // 4 weeks ago 40%, then 3 weeks 60%, last 2 weeks 80% and 50%.
  const week = (ago, right, n) => {
    for (let i = 0; i < n; i++) answers.push({ correct: i < right, at: new Date(NOW - (ago * 7 + 1) * DAY - i * 1000) });
  };
  week(3, 4, 10);
  week(2, 6, 10);
  week(1, 8, 10);
  week(0, 5, 10);
  answers.sort((a, b) => b.at - a.at);
  const t = A.trendOf(answers, NOW, 330);
  assert.equal(t.weeks.length, 8);
  assert.equal(t.firstAccuracy, 40);
  assert.equal(t.lastAccuracy, 50);
  assert.equal(t.deltaPts, 10);
  assert.equal(t.recentAccuracy, 65); // last 14 days: weeks 0 and 1
  assert.equal(t.previousAccuracy, 50);
  assert.equal(t.direction, 'up');
});

test('month report: this month vs last, strongest improvement and the chapter that needs attention', () => {
  const answers = [];
  const add = (topic, monthAgo, right, n) => {
    for (let i = 0; i < n; i++) answers.push({ topic, correct: i < right, at: new Date(Date.UTC(2026, 10 - monthAgo, 5, 6, 0, i)) });
  };
  add('percentage', 1, 4, 10);
  add('percentage', 0, 9, 10);
  add('time_work', 1, 8, 10);
  add('time_work', 0, 5, 10);
  const r = A.monthReport(answers, NOW, 330, (t) => ({ en: t }));
  assert.equal(r.attempted, 20);
  assert.equal(r.accuracyPct, 70);
  assert.equal(r.lastMonth.accuracyPct, 60);
  assert.equal(r.deltaPts, 10);
  assert.equal(r.strongestImprovement.topic, 'percentage');
  assert.equal(r.strongestImprovement.deltaPts, 50);
  assert.equal(r.needsAttention.topic, 'time_work');
});

test('concept levels expose a weak skill hidden inside a fine-looking chapter', () => {
  const answers = [
    ...Array.from({ length: 20 }, (_, i) => ({ pattern: 'simple', correct: i < 18 })),
    ...Array.from({ length: 10 }, (_, i) => ({ pattern: 'successive', correct: i < 3 })),
  ];
  const skills = A.conceptBreakdown(answers, 'pattern', 70, (k) => ({ en: k }));
  assert.equal(skills[0].key, 'successive');
  assert.equal(skills[0].accuracyPct, 30);
  assert.equal(skills[0].hidden, true);
  assert.equal(skills[1].hidden, false);
});

test('skip patterns: "you skipped N <chapter> questions in the last 3 tests" leads to revise + practise 10', () => {
  const ev = (topic, testIndex) => ({ qid: `${topic}${testIndex}${Math.random()}`, topic, open: true, count: 1, difficulty: 3, reason: 'unsure', events: [{ at: new Date(NOW - DAY), testIndex, timeSec: 20, count: 1 }] });
  const skips = [ev('time_work', 0), ev('time_work', 1), ev('time_work', 2), ev('time_work', 4), ev('average', 0)];
  const r = A.skipAnalysis(skips, NOW, (t) => ({ en: t }));
  assert.equal(r.chapters[0].topic, 'time_work');
  assert.equal(r.chapters[0].avgTimeSec, 20);
  const p = r.patterns.find((x) => x.topic === 'time_work');
  assert.equal(p.kind, 'last_tests');
  assert.equal(p.count, 3);
  assert.deepEqual(p.action, { revise: true, practice: 10 });
});

test('Smart Quiz shares are not equal: weak chapters get most, strong ones keep a retention share', () => {
  const ch = (topic, score, band, extra = {}) => ({ topic, focus: { score, band }, available: 50, ...extra });
  const plan = A.smartQuizPlan([ch('percentage', 80, 'high'), ch('time_work', 60, 'medium'), ch('ratio_proportion', 35, 'low'), ch('average', 15, 'strong', { daysSinceTouched: 20 })], 20);
  const n = Object.fromEntries(plan.map((p) => [p.topic, p.count]));
  assert.equal(plan.reduce((a, p) => a + p.count, 0), 20);
  assert.ok(n.percentage > n.time_work && n.time_work > n.ratio_proportion, JSON.stringify(n));
  assert.equal(n.average, 2);
  assert.equal(plan.find((p) => p.topic === 'average').role, 'retention');
  // A small chapter gives its share away; mistakes in the latest test add weight.
  const capped = A.smartQuizPlan([ch('percentage', 80, 'high', { available: 3 }), ch('time_work', 40, 'medium', { latestWrong: 5 })], 15);
  assert.deepEqual(capped.map((p) => [p.topic, p.count]).sort(), [['percentage', 3], ['time_work', 12]]);
  // A brand-new student still gets a starter quiz from the first chapters.
  assert.equal(A.smartQuizPlan([ch('a', 30, 'not_started'), ch('b', 30, 'not_started')], 10).reduce((a, p) => a + p.count, 0), 10);
});

test('Smart Quiz picking: skipped questions first, same concept over exact repeats (max 15%)', () => {
  const pool = Array.from({ length: 40 }, (_, i) => ({ _id: `q${i}`, topic: 't', difficulty: 3, pattern: `p${i % 4}`, duplicate_keys: [] }));
  const signals = {
    seen: new Set(pool.slice(0, 20).map((q) => q._id)),
    recent: new Set(),
    mistakeQids: new Set(['q0', 'q4', 'q8', 'q12']),
    mistakePatterns: new Set(['t.p0']),
    mistakeSubtopics: new Set(),
    weakPatterns: new Set(),
    skipQids: new Set(['q21', 'q22', 'q23']),
  };
  let seed = 7;
  const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 10; i++) {
    const res = L.pickChapter(pool, 10, { mix: { MEDIUM: 1 }, signals, preset: 'smart', rng });
    assert.ok(res.originals <= 1, `exact repeats ${res.originals}`);
    assert.ok(res.skipped >= 2, `skipped picked ${res.skipped}`);
    assert.ok(res.siblings >= 2, `same-concept questions ${res.siblings}`);
  }
});

/* ------------------------------------------------------------------ API */

let mongod;
let server;
let base;

async function api(method, url, body, user) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

let n = 0;
function Q(subject, topic, difficulty, extra = {}) {
  n += 1;
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_${String(n).padStart(5, '0')}${c}`);
  return {
    code: `AN-${n}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty,
    pattern: `${topic}_p${n % 2}`,
    stem: { en: `Analysis question ${n} on ${topic}`, bn: `প্রশ্ন ${n}` },
    options: ids.map((oid, k) => ({ oid, text: { en: `${n}-${k}`, bn: `${n}-${k}` } })),
    correct_option_id: ids[0],
    solution: { steps: [{ en: `Step for ${n}`, bn: 'ধাপ' }] },
    status: 'PUBLISHED',
    ...extra,
  };
}

const byTopic = {};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('analysis_test'));
  await Promise.all([Question.init(), ExamCategory.init(), MockSession.init(), ReviewItem.init(), PracticeAttempt.init(), QuestionSkip.init(), ChapterStudy.init(), StudyPlanProgress.init()]);
  await ExamCategory.insertMany(catalog);
  const docs = [];
  for (const topic of ['percentage', 'time_work', 'average']) for (let i = 0; i < 30; i++) docs.push(Q('quant', topic, (i % 5) + 1));
  for (const topic of ['tenses', 'synonyms_antonyms']) for (let i = 0; i < 20; i++) docs.push(Q('english', topic, (i % 5) + 1));
  const saved = await Question.insertMany(docs);
  for (const q of saved) (byTopic[q.topic] ??= []).push(q);
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

const answer = (user, q, correct, ago = 1, source = 'practice') =>
  PracticeAttempt.create({ user_id: user, question_id: q._id, subject: q.subject, topic: q.topic, correct, time_spent_sec: 40, source, created_at: new Date(Date.now() - ago * DAY) });

test('analysis needs a signed-in student and a supported subject', async () => {
  assert.equal((await api('GET', '/me/analysis/quant')).status, 401);
  assert.equal((await api('GET', '/me/analysis/gs', null, 'u0')).status, 400);
});

test('a new student gets an empty but complete analysis and a starter Smart Quiz', async () => {
  const r = await api('GET', '/me/analysis/quant', null, 'fresh');
  assert.equal(r.status, 200, JSON.stringify(r.body));
  const d = r.body.data;
  assert.equal(d.summary.answered, 0);
  assert.ok(d.chapters.length >= 15, 'every Math chapter is listed');
  assert.ok(d.chapters.every((c) => c.focus.band === 'not_started' && c.mastery === null));
  assert.equal(d.nextTask, null);
  assert.ok(d.nextSmartQuiz.count > 0);
});

test('Mathematics: weak chapter, skips, mistakes, reading gap and the study-now list', async () => {
  const user = 'math_student';
  // Percentage: read fully, 20 answers at 40%, 4 open mistakes (2 repeated), 3 Learn skips.
  for (const [i, q] of byTopic.percentage.slice(0, 20).entries()) await answer(user, q, i % 5 < 2, 2);
  for (const [i, q] of byTopic.percentage.slice(0, 4).entries()) {
    await ReviewItem.create({ user_id: user, question_id: q._id, subject: 'quant', topic: 'percentage', from_mistake: true, wrong_count: i < 2 ? 2 : 1, due_at: new Date(), last_wrong_at: new Date() });
  }
  await gradeAnswers(byTopic.percentage.slice(25, 28).map((q) => ({ questionId: String(q._id), selectedOptionId: null, timeSpentSec: 4 })), { userId: user, source: 'learn' });
  await new Promise((r) => setTimeout(r, 200)); // skips are written in the background
  assert.equal(await QuestionSkip.countDocuments({ user_id: user }), 3);
  // Average: 20 answers at 95%.
  for (const [i, q] of byTopic.average.slice(0, 20).entries()) await answer(user, q, i !== 0, 2);
  // Reading heartbeats: every section of the percentage lesson.
  for (let s = 0; s < 8; s++) {
    const r = await api('POST', '/me/study-log', { subject: 'quant', topic: 'percentage', seconds: 60, section: `s${s}`, sectionsTotal: 8 }, user);
    assert.equal(r.status, 200, JSON.stringify(r.body));
  }
  const again = await api('POST', '/me/study-log', { subject: 'quant', topic: 'percentage', seconds: 60, section: 's0' }, user);
  assert.equal(again.body.data.sectionsRead, 8);
  assert.equal((await api('POST', '/me/study-log', { subject: 'quant', topic: 'nope', seconds: 60 }, user)).status, 404);

  const r = await api('GET', '/me/analysis/quant?tz=330', null, user);
  assert.equal(r.status, 200, JSON.stringify(r.body));
  const d = r.body.data;
  const pct = d.chapters.find((c) => c.topic === 'percentage');
  const avg = d.chapters.find((c) => c.topic === 'average');
  assert.equal(pct.answers, 20);
  assert.equal(pct.wrong, 12);
  assert.equal(pct.recentAccuracy, 40);
  assert.equal(pct.openMistakes, 4);
  assert.equal(pct.repeatedMistakes, 2);
  assert.equal(pct.skipped, 3);
  assert.equal(pct.progress.reading, 100);
  assert.equal(pct.time.readSec, 8 * 60);
  assert.equal(pct.time.reviseSec, 60); // re-reading after finishing counts as revision
  assert.equal(pct.readingMasteryGap, true, 'read it all, not mastered');
  assert.equal(pct.focus.band, 'high');
  assert.ok(pct.why.some((w) => w.key === 'low_accuracy'));
  assert.ok(pct.skills.length > 0 && pct.difficulty.HARD.answered >= 0);
  assert.equal(avg.recentAccuracy, 95);
  assert.ok(pct.focus.score > avg.focus.score);
  assert.equal(d.studyNow[0].topic, 'percentage');
  assert.equal(d.nextTask.topic, 'percentage');
  assert.equal(d.summary.weakChapters, 1);
  assert.equal(d.summary.needsAttentionChapters, 1, 'percentage (high) needs attention; average does not');
  assert.equal(d.summary.openSkips, 3);
  assert.ok(d.skippedQuestions.every((s) => s.likelyReason === 'did_not_understand' && s.timeBeforeSkipSec === 4));
  assert.equal(d.weakQuestions[0].wrongCount, 2);
  assert.ok(d.weakQuestions[0].stem.en.startsWith('Analysis question'));
  assert.equal(d.areas.find((a) => a.key === 'arithmetic').answered, 40);
  // Smart Quiz preview: most questions from percentage.
  const plan = Object.fromEntries(d.nextSmartQuiz.plan.map((p) => [p.topic, p.count]));
  assert.ok(plan.percentage >= Math.max(...Object.values(plan)), JSON.stringify(plan));

  // The student's own reason for a skip replaces the likely one.
  const skipped = d.skippedQuestions[0];
  assert.equal((await api('PUT', `/me/skips/${skipped.questionId}`, { reason: 'forgot_concept' }, user)).status, 200);
  assert.equal((await api('PUT', `/me/skips/${skipped.questionId}`, { reason: 'bored' }, user)).status, 400);
  const after = (await api('GET', '/me/analysis/quant', null, user)).body.data;
  assert.equal(after.skippedQuestions.find((s) => s.questionId === skipped.questionId).reason, 'forgot_concept');
  assert.equal(after.skips.chapters[0].reasons.forgot_concept, 1);
});

test('Smart Quiz: built from the analysis, mostly the weak chapter, skipped questions included', async () => {
  const user = 'math_student';
  const r = await api('POST', '/custom-tests', { subject: 'quant', preset: 'smart', questionCount: 15 }, user);
  assert.equal(r.status, 201, JSON.stringify(r.body));
  const d = r.body.data;
  assert.equal(d.custom.preset, 'smart');
  assert.equal(d.custom.mode, 'practice');
  assert.equal(d.questions.length, 15);
  const session = await MockSession.findById(d.sessionId).lean();
  const perTopic = {};
  for (const q of session.questions) perTopic[q.topic] = (perTopic[q.topic] || 0) + 1;
  assert.ok(perTopic.percentage >= 8, JSON.stringify(perTopic));
  const skippedIds = new Set((await QuestionSkip.find({ user_id: user }).lean()).map((s) => String(s.question_id)));
  assert.ok(session.questions.filter((q) => skippedIds.has(String(q.qid))).length >= 2, 'skipped questions come back');
  assert.ok(d.notes.skipped >= 2);
  // Only chosen chapters when the student picks them.
  const one = await api('POST', '/custom-tests', { subject: 'quant', preset: 'smart', topics: ['time_work'], questionCount: 10 }, user);
  assert.equal(one.status, 201, JSON.stringify(one.body));
  assert.deepEqual(one.body.data.custom.topics, ['time_work']);
  // Not for GK.
  assert.equal((await api('POST', '/custom-tests', { subject: 'gs', preset: 'smart' }, user)).status, 422);
});

test('test skips count, with "ran out of time" for questions the clock ended', async () => {
  const user = 'test_taker';
  const t = (await api('POST', '/custom-tests', { subject: 'quant', topics: ['time_work'], questionCount: 10, mode: 'exam' }, user)).body.data;
  // Answer nothing: all 10 are skipped.
  assert.equal((await api('POST', '/mock/submit-session', { sessionId: t.sessionId, responses: [] }, user)).status, 200);
  const d = (await api('GET', '/me/analysis/quant', null, user)).body.data;
  const tw = d.chapters.find((c) => c.topic === 'time_work');
  assert.equal(tw.skipped, 10);
  assert.equal(tw.openSkips, 10);
  assert.equal(d.skips.patterns[0].topic, 'time_work');
  assert.equal(d.skips.patterns[0].kind, 'last_tests');
  assert.equal(d.nextSmartQuiz.basedOn.skipped[0].count, 10);
});

test('English uses the same framework with its own areas', async () => {
  const user = 'english_student';
  for (const [i, q] of byTopic.tenses.slice(0, 10).entries()) await answer(user, q, i < 4, 1);
  for (const [i, q] of byTopic.synonyms_antonyms.slice(0, 10).entries()) await answer(user, q, i < 9, 1);
  const d = (await api('GET', '/me/analysis/english', null, user)).body.data;
  assert.equal(d.subject, 'english');
  assert.equal(d.areas[0].key, 'grammar', 'weakest area first');
  assert.equal(d.areas[0].accuracyPct, 40);
  assert.equal(d.areas[0].weakestTopic.topic, 'tenses');
  assert.equal(d.studyNow[0].topic, 'tenses');
  const quiz = await api('POST', '/custom-tests', { subject: 'english', preset: 'smart', questionCount: 10 }, user);
  assert.equal(quiz.status, 201, JSON.stringify(quiz.body));

  // Overview: both subjects, focus across them, never mixed.
  const o = (await api('GET', '/me/analysis', null, user)).body.data;
  assert.deepEqual(o.subjects.map((s) => s.subject), ['quant', 'english']);
  assert.equal(o.subjects[0].summary.answered, 0);
  assert.equal(o.subjects[1].summary.answered, 20);
  assert.equal(o.focus[0].subject, 'english');
  assert.equal(o.focus[0].topic, 'tenses');
});

test('overview: weekly trend, all chapters, streak, pace and the plan exam', async () => {
  const user = 'overview_student';
  for (const [i, q] of byTopic.percentage.slice(0, 10).entries()) await answer(user, q, i % 2 === 0, 0);
  for (const [i, q] of byTopic.percentage.slice(10, 20).entries()) await answer(user, q, i % 2 === 0, 1);
  for (const [i, q] of byTopic.average.slice(0, 10).entries()) await answer(user, q, true, 1);
  const r = await api('GET', '/me/analysis?tz=330', null, user);
  assert.equal(r.status, 200, JSON.stringify(r.body));
  const d = r.body.data;
  assert.equal(d.streakDays, 2, 'today + yesterday');
  assert.deepEqual(d.plan, { exam: 'WBPSC_CLERKSHIP', examDate: null, startDate: null }, 'no plan started yet');
  const math = d.subjects.find((s) => s.subject === 'quant');
  assert.equal(math.trend.weeks.length, 8);
  assert.ok(math.trend.weeks.some((w) => w.answered > 0), 'this week has answers');
  assert.ok(math.chapters.length >= 15, 'every Math chapter is listed');
  const pct = math.chapters.find((c) => c.topic === 'percentage');
  assert.equal(pct.accuracy, 50);
  assert.ok(pct.mastery != null);
  assert.equal(pct.band, 'medium', '50% accuracy and a middling score: medium, not high');
  assert.equal(math.summary.weekAnswered, 30);
  assert.equal(math.summary.weekMinutes, 20); // 30 answers × 40s
  assert.equal(math.summary.weekActiveDays, 2);
  assert.equal(math.summary.answersPerDay, 2.1); // 30 answers in the last 14 days
  assert.ok(math.summary.remainingQuestions > 0);
  assert.equal(math.summary.paceDays, Math.ceil(math.summary.remainingQuestions / math.summary.answersPerDay));
  assert.equal(math.summary.pyqSolved, 0);
  assert.equal(math.summary.pyqTotal, 0);
});

test('overview: the plan exam date comes from the 60-day plan progress', async () => {
  const user = 'plan_student';
  await StudyPlanProgress.create({ user_id: user, plan: 'CLERKSHIP_60', plan_version: 2, start_date: '2026-10-01', exam_date: '2026-12-20', done: [], tests: {} });
  const d = (await api('GET', '/me/analysis?tz=330', null, user)).body.data;
  assert.equal(d.plan.exam, 'WBPSC_CLERKSHIP');
  assert.equal(d.plan.examDate, '2026-12-20');
  assert.equal(d.plan.startDate, '2026-10-01');
});
