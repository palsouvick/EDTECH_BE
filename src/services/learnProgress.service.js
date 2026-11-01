'use strict';

/**
 * Account copy of Learn quiz progress (models/LearnProgress.js). The browser keeps
 * its own copy for guests; when a student is signed in the two are merged:
 * the better best score wins and seen ids are unioned (newest kept, capped).
 */

const { LearnProgress } = require('../models');
const { MAX_SEEN } = require('../models/LearnProgress');

const MAX_PATTERNS = 30;
const keyOf = (r) => `${r.subject}.${r.topic}.${r.level}`;
const better = (a, b) => {
  if (!a) return b || null;
  if (!b) return a;
  const ra = a.correct / a.total;
  const rb = b.correct / b.total;
  return rb > ra || (rb === ra && b.total > a.total) ? b : a;
};
const union = (a = [], b = [], max) => [...new Set([...a, ...b])].slice(-max);

function present(rows) {
  const out = {};
  for (const r of rows) {
    out[keyOf(r)] = {
      best: r.best?.total ? { correct: r.best.correct, total: r.best.total } : null,
      seen: r.seen || [],
      fingerprints: r.fingerprints || [],
      patterns: r.patterns || [],
    };
  }
  return out;
}

async function getAll(userId) {
  return { progress: present(await LearnProgress.find({ user_id: userId }).lean()) };
}

/** Merges the given entries into the account copy and returns the merged whole. */
async function merge(userId, entries) {
  const existing = new Map((await LearnProgress.find({ user_id: userId }).lean()).map((r) => [keyOf(r), r]));
  const ops = [];
  for (const e of entries) {
    const cur = existing.get(keyOf(e));
    const best = better(cur?.best?.total ? cur.best : null, e.best || null);
    ops.push({
      updateOne: {
        filter: { user_id: userId, subject: e.subject, topic: e.topic, level: e.level },
        update: {
          $set: {
            ...(best && { best }),
            seen: union(cur?.seen, e.seen, MAX_SEEN),
            fingerprints: union(cur?.fingerprints, e.fingerprints, MAX_SEEN),
            patterns: union(cur?.patterns, e.patterns, MAX_PATTERNS),
          },
        },
        upsert: true,
      },
    });
  }
  if (ops.length) await LearnProgress.bulkWrite(ops, { ordered: false });
  return getAll(userId);
}

module.exports = { getAll, merge, better };
