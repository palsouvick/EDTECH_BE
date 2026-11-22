'use strict';

/**
 * Practice order for General Studies: easy → medium → hard, with every GK subtopic spread evenly
 * through its band instead of arriving as one block.
 *
 * The plain order (difficulty, latest PYQ year, _id) put questions inserted together next to each
 * other, so a generated family (e.g. 26 "district headquarters" questions) filled the first 26 slots
 * of West Bengal GK. Here each subtopic's questions keep their own easy → hard order, and question i of
 * a subtopic with n questions sits at position (i + o) / n of the band, o a fixed
 * per-subtopic offset in (0, 1) — a 26-question subtopic in a
 * 200-question band shows up about once in every 8 questions.
 *
 * The order is deterministic, so paging is stable; the cursor carries the last question's sort key
 * { b, f, s, id } and the next page is everything after it.
 */

const { Types } = require('mongoose');

const bandOf = (d) => (d <= 2 ? 0 : d === 3 ? 1 : 2); // DIFFICULTY_BANDS easy / medium / hard
const KEY_FIELDS = '_id difficulty latest_pyq_year subtopic';

/** Inside one subtopic: easier first, then the most recent PYQ (no year last), then _id. */
function withinSubtopic(a, b) {
  if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
  const ya = a.latest_pyq_year ?? -Infinity;
  const yb = b.latest_pyq_year ?? -Infinity;
  if (ya !== yb) return yb - ya;
  return String(a._id) < String(b._id) ? -1 : String(a._id) > String(b._id) ? 1 : 0;
}

/**
 * A fixed offset in (0, 1) per subtopic name, so equal-sized subtopics do not all land on the same
 * positions and arrive as a run of one question from each.
 */
function offsetOf(subtopic) {
  let h = 2166136261;
  for (const ch of subtopic) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return 0.05 + 0.9 * (h / 2 ** 32);
}

function compareKeys(a, b) {
  if (a.b !== b.b) return a.b - b.b;
  if (a.f !== b.f) return a.f - b.f;
  if (a.s !== b.s) return a.s < b.s ? -1 : 1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** Sort keys in practice order for rows { _id, difficulty, latest_pyq_year, subtopic }. */
function mixedKeys(rows) {
  const buckets = new Map(); // "band|subtopic" -> rows
  for (const r of rows) {
    const k = `${bandOf(r.difficulty)}|${r.subtopic ?? ''}`;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(r);
  }
  const keys = [];
  for (const list of buckets.values()) {
    list.sort(withinSubtopic);
    const s = list[0].subtopic ?? '';
    const o = offsetOf(s);
    list.forEach((r, i) => keys.push({ b: bandOf(r.difficulty), f: (i + o) / list.length, s, id: String(r._id) }));
  }
  return keys.sort(compareKeys);
}

/** All matching question ids in practice order, as sort keys (cheap: key fields only). */
async function orderedKeys(Question, filter) {
  const rows = await Question.find(filter).select(KEY_FIELDS).lean();
  return mixedKeys(rows);
}

function encodeMixCursor(key) {
  return Buffer.from(JSON.stringify({ m: 1, ...key })).toString('base64url');
}

/** The decoded key, or null when the cursor is malformed or from the plain order. */
function decodeMixCursor(cursor) {
  try {
    const k = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
    const ok =
      k.m === 1 && [0, 1, 2].includes(k.b) && typeof k.f === 'number' && k.f > 0 && k.f < 1 &&
      typeof k.s === 'string' && Types.ObjectId.isValid(k.id) && String(new Types.ObjectId(k.id)) === k.id;
    return ok ? { b: k.b, f: k.f, s: k.s, id: k.id } : null;
  } catch {
    return null;
  }
}

/** Keys strictly after `after` (all keys when after is null). */
function keysAfter(keys, after) {
  if (!after) return keys;
  const i = keys.findIndex((k) => compareKeys(k, after) > 0);
  return i === -1 ? [] : keys.slice(i);
}

/** Full documents for keys, returned in the keys' order. */
async function docsInOrder(Question, keys, fields) {
  if (!keys.length) return [];
  const docs = await Question.find({ _id: { $in: keys.map((k) => new Types.ObjectId(k.id)) } }).select(fields).lean();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  return keys.map((k) => byId.get(k.id)).filter(Boolean);
}

/** Subjects whose practice uses the mixed order (the ones with GK subtopics). */
const usesMixedOrder = (subject) => subject === 'gs';

module.exports = { usesMixedOrder, mixedKeys, orderedKeys, encodeMixCursor, decodeMixCursor, keysAfter, docsInOrder, compareKeys };
