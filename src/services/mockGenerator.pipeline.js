'use strict';

const { langSetsContaining } = require('../models/schemas/localized');
const { DIFFICULTY_BANDS } = require('../models/constants');

/**
 * Randomised mock-test generation as one aggregation round trip.
 *
 *   $match   index-backed pool filter (qb_cat_subj_topic_lang_diff)
 *   $project shrink to the 4 fields generation needs, before any heavy stage
 *   $facet   one branch per difficulty band, each:
 *              $sample  -> bounded uniform pre-sample (caps the sort cost on huge pools)
 *              $addFields w -> weight from PYQ recency
 *              $addFields k = rand^(1/w)   (Efraimidis–Spirakis weighted sampling)
 *              $sort k desc, $limit       -> weighted sample without replacement
 *
 * $sample alone cannot weight, and weighting alone would sort the whole pool;
 * the combination gives weighted randomness with bounded cost.
 *
 * Each band returns up to `perBandLimit` ranked candidates so the service can
 * backfill a short band from its neighbours without a second query.
 */

// Recent PYQs are the best signal of what the examiner asks now.
const PYQ_BASE_BONUS = 0.5; // any PYQ vs. a never-asked question
const PYQ_RECENCY_BONUS = 2.0; // extra for a PYQ from this year, decaying to 0
const PYQ_RECENCY_WINDOW_YEARS = 10;

/**
 * weight = 1                                            (not a PYQ)
 *        = 1 + 0.5 + 2.0 * max(0, 1 - yearsAgo / 10)    (PYQ)
 * so a current-year PYQ is 3.5x as likely to be picked as a non-PYQ.
 */
function weightExpression(currentYear) {
  const yearsAgo = { $max: [0, { $subtract: [currentYear, '$latest_pyq_year'] }] };
  const recency = { $max: [0, { $subtract: [1, { $divide: [yearsAgo, PYQ_RECENCY_WINDOW_YEARS] }] }] };
  return {
    $cond: [
      { $isNumber: '$latest_pyq_year' },
      { $add: [1, PYQ_BASE_BONUS, { $multiply: [PYQ_RECENCY_BONUS, recency] }] },
      1,
    ],
  };
}

function bandBranch(difficulties, { perBandLimit, sampleSize, currentYear }) {
  return [
    { $match: { difficulty: { $in: difficulties } } },
    { $sample: { size: sampleSize } },
    { $addFields: { w: weightExpression(currentYear) } },
    { $addFields: { k: { $pow: [{ $rand: {} }, { $divide: [1, '$w'] }] } } },
    { $sort: { k: -1 } },
    { $limit: perBandLimit },
    { $project: { _id: 1, topic: 1, difficulty: 1, w: 1 } },
  ];
}

/**
 * @param {object} p
 * @param {string}   p.category      SSC | BANK | WBPSC | WB_POST
 * @param {string}   p.subject       subject slug
 * @param {string[]} p.topicIds      topic slugs; empty = whole subject
 * @param {string}   p.language      questions must be fully available in this language
 * @param {import('mongoose').Types.ObjectId[]} p.excludeIds  recently served questions
 * @param {number}   p.perBandLimit  ranked candidates to return per band
 */
function buildMockGenerationPipeline({
  category,
  subject,
  topicIds = [],
  language,
  excludeIds = [],
  perBandLimit,
  currentYear = new Date().getUTCFullYear(),
}) {
  // Field order mirrors the index; status:'PUBLISHED' is what lets the planner use the partial index.
  const match = {
    status: 'PUBLISHED',
    'exam_targets.category': category,
    subject,
    lang_set: { $in: langSetsContaining(language) },
  };
  if (topicIds.length) match.topic = { $in: topicIds };
  if (excludeIds.length) match._id = { $nin: excludeIds };

  // Pre-sample generously so weighting still has room to prefer recent PYQs.
  const sampleSize = Math.max(perBandLimit * 8, 200);
  const opts = { perBandLimit, sampleSize, currentYear };

  return [
    { $match: match },
    { $project: { _id: 1, topic: 1, difficulty: 1, latest_pyq_year: 1 } },
    {
      $facet: {
        EASY: bandBranch(DIFFICULTY_BANDS.EASY, opts),
        MEDIUM: bandBranch(DIFFICULTY_BANDS.MEDIUM, opts),
        HARD: bandBranch(DIFFICULTY_BANDS.HARD, opts),
      },
    },
  ];
}

/** Target mix for every generated mock. */
const DIFFICULTY_MIX = Object.freeze({ EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 });

/** Largest-remainder split, so quotas always sum to n: 10 -> 3/5/2, 20 -> 6/10/4, 50 -> 15/25/10. */
function allocateQuotas(n, mix = DIFFICULTY_MIX) {
  const entries = Object.entries(mix).map(([band, share]) => {
    const exact = n * share;
    return { band, floor: Math.floor(exact), rem: exact - Math.floor(exact) };
  });
  let left = n - entries.reduce((s, e) => s + e.floor, 0);
  for (const e of [...entries].sort((a, b) => b.rem - a.rem)) {
    if (left-- <= 0) break;
    e.floor += 1;
  }
  return Object.fromEntries(entries.map((e) => [e.band, e.floor]));
}

// When a band runs short, borrow from the nearest difficulty first.
const BACKFILL_ORDER = Object.freeze({
  EASY: ['MEDIUM', 'HARD'],
  MEDIUM: ['EASY', 'HARD'],
  HARD: ['MEDIUM', 'EASY'],
});

/**
 * Take each band's quota from its ranked candidates, then fill any shortfall
 * from neighbouring bands' leftovers.
 * @returns {{ picked: Array<{_id, topic, difficulty}>, mix: Record<string, number> }}
 */
function selectWithBackfill(facets, quotas) {
  const leftovers = {};
  const picked = [];
  const shortfall = {};

  for (const band of Object.keys(quotas)) {
    const candidates = facets[band] || [];
    picked.push(...candidates.slice(0, quotas[band]));
    leftovers[band] = candidates.slice(quotas[band]);
    shortfall[band] = Math.max(0, quotas[band] - candidates.length);
  }

  for (const band of Object.keys(shortfall)) {
    for (const donor of BACKFILL_ORDER[band]) {
      if (shortfall[band] === 0) break;
      const take = leftovers[donor].splice(0, shortfall[band]);
      picked.push(...take);
      shortfall[band] -= take.length;
    }
  }

  const mix = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const q of picked) {
    const band = Object.keys(DIFFICULTY_BANDS).find((b) => DIFFICULTY_BANDS[b].includes(q.difficulty));
    mix[band] += 1;
  }
  return { picked, mix };
}

module.exports = {
  buildMockGenerationPipeline,
  allocateQuotas,
  selectWithBackfill,
  weightExpression,
  DIFFICULTY_MIX,
};
