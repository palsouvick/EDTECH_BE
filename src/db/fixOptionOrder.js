'use strict';

/**
 * One-time (and safe to repeat) repair: GK library and book questions were stored with the
 * correct option first, so every answer showed as "A". Moves each correct option to its
 * position from utils/optionOrder (the seeders now do the same for new questions).
 * Option ids do not change, so answers, revision items and trap notes stay valid.
 */

const { Question } = require('../models');
const { placeCorrect, correctPosition } = require('../utils/optionOrder');

const SOURCES = ['gk_library', 'book_library'];

async function fixOptionOrder({ log = console.log } = {}) {
  const rows = await Question.find({ authored_by: { $in: SOURCES } }).select('code options +correct_option_id').lean();
  const ops = [];
  for (const q of rows) {
    const at = q.options.findIndex((o) => o.oid === q.correct_option_id);
    if (at < 0 || at === correctPosition(q.code, q.options.length)) continue;
    ops.push({ updateOne: { filter: { _id: q._id }, update: { $set: { options: placeCorrect(q.options, q.correct_option_id, q.code) } } } });
  }
  for (let i = 0; i < ops.length; i += 500) await Question.bulkWrite(ops.slice(i, i + 500), { ordered: false });
  if (ops.length) log(`[options] moved the correct option off position A in ${ops.length} GK/book questions`);
  return { checked: rows.length, moved: ops.length };
}

module.exports = { fixOptionOrder, SOURCES };
