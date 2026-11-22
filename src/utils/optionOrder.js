'use strict';

/**
 * Where the correct option sits. Content files list the answer first (`a`, then `w`), and some
 * screens show options in stored order, so without this the answer is always "A".
 *
 * The position comes from a hash of the question code: spread evenly over A-D, the same on
 * every reseed (no reshuffling between visits), and idempotent: the wrong options keep their
 * relative order and only the correct one moves, so applying it twice changes nothing.
 */

const crypto = require('node:crypto');

/** 0-based display position of the correct option for this question code. */
function correctPosition(code, n) {
  return crypto.createHash('sha256').update(String(code)).digest().readUInt32BE(0) % n;
}

/** The options with the correct one moved to its position; the others keep their order. */
function placeCorrect(options, correctId, code) {
  const correct = options.find((o) => o.oid === correctId);
  if (!correct) return options;
  const rest = options.filter((o) => o !== correct);
  rest.splice(correctPosition(code, options.length), 0, correct);
  return rest;
}

module.exports = { correctPosition, placeCorrect };
