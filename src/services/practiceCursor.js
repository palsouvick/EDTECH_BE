'use strict';

const { Types } = require('mongoose');

/**
 * Keyset ("cursor") pagination over the practice order
 *   { difficulty: 1, latest_pyq_year: -1, _id: 1 }
 * which is the tail of the qb_cat_subj_topic_lang_diff index.
 *
 * Unlike skip/limit, each page costs the same however deep the student goes,
 * and questions published mid-session cannot shift the window and cause
 * repeats or gaps.
 *
 * The cursor is the sort key of the last question served, base64url-encoded
 * JSON. It is opaque to clients and carries nothing secret.
 */

function encodeCursor(q) {
  const key = { d: q.difficulty, y: q.latest_pyq_year ?? null, id: String(q._id) };
  return Buffer.from(JSON.stringify(key)).toString('base64url');
}

/** Returns the decoded key, or null if the cursor is malformed. */
function decodeCursor(cursor) {
  try {
    const k = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
    const ok =
      Number.isInteger(k.d) && k.d >= 1 && k.d <= 5 &&
      (k.y === null || Number.isInteger(k.y)) &&
      Types.ObjectId.isValid(k.id) && String(new Types.ObjectId(k.id)) === k.id;
    return ok ? k : null;
  } catch {
    return null;
  }
}

/**
 * Filter for "strictly after key" in the practice order. latest_pyq_year sorts
 * descending with nulls last (null is the lowest BSON value), so after a
 * numeric year come smaller years, then nulls.
 */
function afterKey({ d, y, id }) {
  const oid = new Types.ObjectId(id);
  const sameDifficulty =
    y === null
      ? [{ difficulty: d, latest_pyq_year: null, _id: { $gt: oid } }]
      : [
          { difficulty: d, latest_pyq_year: y, _id: { $gt: oid } },
          { difficulty: d, latest_pyq_year: { $lt: y } },
          { difficulty: d, latest_pyq_year: null },
        ];
  return { $or: [{ difficulty: { $gt: d } }, ...sameDifficulty] };
}

module.exports = { encodeCursor, decodeCursor, afterKey };
