'use strict';

/**
 * Pure scoring: no I/O, so it is unit-testable and deterministic.
 */

const round2 = (x) => Math.round(x * 100) / 100;
const pct = (num, den) => (den > 0 ? round2((num / den) * 100) : 0);

// Clock drift between client and server: tolerate a little before calling a question timed out.
const PER_QUESTION_TOLERANCE_SEC = 2;
// Need at least this many attempts in a topic before labelling it a strength or weakness.
const MIN_ATTEMPTS_FOR_SIGNAL = 2;
const STRENGTH_ACCURACY = 75;
const WEAKNESS_ACCURACY = 50;
const WEAK_ATTEMPT_RATE = 50;

function difficultyBand(d) {
  if (d <= 2) return 'EASY';
  if (d === 3) return 'MEDIUM';
  return 'HARD';
}

/**
 * Client-reported times cannot be trusted as-is:
 *  - per-question timer: anything past the limit is TIMED_OUT and capped;
 *  - non-pausable sessions: the total cannot exceed real elapsed time, so
 *    inflated totals are scaled down proportionally.
 */
function normaliseTimes(rows, { perQuestionLimitSec, timeBudgetSec }) {
  for (const r of rows) {
    r.timedOut = false;
    if (perQuestionLimitSec && r.rawTime > perQuestionLimitSec + PER_QUESTION_TOLERANCE_SEC) {
      r.timedOut = true;
    }
    r.time = perQuestionLimitSec ? Math.min(r.rawTime, perQuestionLimitSec) : r.rawTime;
  }
  const total = rows.reduce((s, r) => s + r.time, 0);
  let adjusted = false;
  if (timeBudgetSec && total > timeBudgetSec * 1.05) {
    const factor = timeBudgetSec / total;
    for (const r of rows) r.time *= factor;
    adjusted = true;
  }
  for (const r of rows) r.time = round2(r.time);
  return adjusted;
}

function emptyBucket(key) {
  return { key, total: 0, attempted: 0, correct: 0, incorrect: 0, unattempted: 0, score: 0, time: 0 };
}

function finaliseBucket(b) {
  return {
    total: b.total,
    attempted: b.attempted,
    correct: b.correct,
    incorrect: b.incorrect,
    unattempted: b.unattempted,
    accuracy_pct: pct(b.correct, b.attempted),
    attempt_rate_pct: pct(b.attempted, b.total),
    score: round2(b.score),
    avg_time_sec: b.attempted ? round2(b.time / b.attempted) : 0,
  };
}

/**
 * @param {object} p
 * @param {Array<{qid, seq, topic, difficulty}>} p.questions  frozen session questions
 * @param {Record<string,string>} p.answerKey                  qid(hex) -> correct option id
 * @param {Array<{questionId, selectedOptionId, timeSpentSec}>} p.responses
 * @param {{positive:number, negative:number}} p.marking
 * @param {number|null} p.perQuestionLimitSec
 * @param {number|null} p.timeBudgetSec  max believable total time; null for pausable sessions
 */
function scoreSession({ questions, answerKey, responses, marking, perQuestionLimitSec, timeBudgetSec }) {
  const byQid = new Map(responses.map((r) => [r.questionId, r]));

  const rows = questions.map((q) => {
    const id = String(q.qid);
    const resp = byQid.get(id);
    return {
      q,
      id,
      selected: resp?.selectedOptionId ?? null,
      correctId: answerKey[id],
      rawTime: resp?.timeSpentSec ?? 0,
      marked: Boolean(resp?.markedForReview),
    };
  });

  const timeAdjusted = normaliseTimes(rows, { perQuestionLimitSec, timeBudgetSec });

  const topics = new Map();
  const bands = new Map(['EASY', 'MEDIUM', 'HARD'].map((b) => [b, emptyBucket(b)]));
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;
  let timedOut = 0;

  const perQuestion = rows.map((r) => {
    let outcome;
    let marks = 0;
    if (r.timedOut && r.selected) {
      outcome = 'TIMED_OUT';
      timedOut += 1;
    } else if (!r.selected) {
      outcome = 'UNATTEMPTED';
      unattempted += 1;
    } else if (r.selected === r.correctId) {
      outcome = 'CORRECT';
      marks = marking.positive;
      correct += 1;
    } else {
      outcome = 'INCORRECT';
      marks = -marking.negative;
      incorrect += 1;
    }

    if (!topics.has(r.q.topic)) topics.set(r.q.topic, emptyBucket(r.q.topic));
    for (const b of [topics.get(r.q.topic), bands.get(difficultyBand(r.q.difficulty))]) {
      b.total += 1;
      b.score += marks;
      if (outcome === 'CORRECT' || outcome === 'INCORRECT') {
        b.attempted += 1;
        b.time += r.time;
        b[outcome === 'CORRECT' ? 'correct' : 'incorrect'] += 1;
      } else {
        b.unattempted += 1;
      }
    }

    return {
      qid: r.q.qid,
      seq: r.q.seq,
      topic: r.q.topic,
      difficulty: r.q.difficulty,
      selected_option_id: r.selected,
      correct_option_id: r.correctId,
      outcome,
      marks: round2(marks),
      time_spent_sec: r.time,
      marked_for_review: r.marked,
    };
  });

  const topicBreakdown = [...topics.values()].map((b) => ({ topic: b.key, ...finaliseBucket(b) }));
  const difficultyBreakdown = [...bands.values()]
    .filter((b) => b.total > 0)
    .map((b) => ({ band: b.key, ...finaliseBucket(b) }));

  const strengths = [];
  const weaknesses = [];
  for (const t of topicBreakdown) {
    if (t.attempted >= MIN_ATTEMPTS_FOR_SIGNAL && t.accuracy_pct >= STRENGTH_ACCURACY) {
      strengths.push({ topic: t.topic, accuracy_pct: t.accuracy_pct, attempted: t.attempted });
    } else if (t.attempted >= MIN_ATTEMPTS_FOR_SIGNAL && t.accuracy_pct < WEAKNESS_ACCURACY) {
      weaknesses.push({ topic: t.topic, reason: 'LOW_ACCURACY', accuracy_pct: t.accuracy_pct, attempted: t.attempted });
    } else if (t.total >= MIN_ATTEMPTS_FOR_SIGNAL && t.attempt_rate_pct < WEAK_ATTEMPT_RATE) {
      weaknesses.push({ topic: t.topic, reason: 'LOW_ATTEMPT_RATE', attempt_rate_pct: t.attempt_rate_pct, total: t.total });
    }
  }
  strengths.sort((a, b) => b.accuracy_pct - a.accuracy_pct);
  weaknesses.sort((a, b) => (a.accuracy_pct ?? a.attempt_rate_pct) - (b.accuracy_pct ?? b.attempt_rate_pct));

  const attempted = correct + incorrect;
  const negativeMarks = round2(incorrect * marking.negative);

  return {
    score: round2(correct * marking.positive - negativeMarks),
    max_score: round2(questions.length * marking.positive),
    correct,
    incorrect,
    unattempted,
    timed_out: timedOut,
    accuracy_pct: pct(correct, attempted),
    attempt_rate_pct: pct(attempted, questions.length),
    negative_marks: negativeMarks,
    total_time_sec: round2(rows.reduce((s, r) => s + r.time, 0)),
    time_adjusted: timeAdjusted,
    per_question: perQuestion,
    topic_breakdown: topicBreakdown,
    difficulty_breakdown: difficultyBreakdown,
    strengths,
    weaknesses,
  };
}

module.exports = { scoreSession, difficultyBand };
