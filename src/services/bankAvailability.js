'use strict';

const { Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');

const REAL_PAPER = Object.freeze(['OFFICIAL_VERIFIED', 'ADAPTED_PYQ']);
const BANDS = { EASY: 'easy', MEDIUM: 'moderate', HARD: 'hard' };
const bandOf = (d) => (d <= 2 ? 'EASY' : d === 3 ? 'MEDIUM' : 'HARD');

/** Published questions per chapter in the student's language: total, per band, real PYQs. */
async function availability(subject, language) {
  const rows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', subject, lang_set: { $in: langSetsContaining(language) } } },
    {
      $group: {
        _id: { t: '$topic', d: '$difficulty', p: { $and: [{ $eq: ['$pyq.is_pyq', true] }, { $in: ['$provenance', REAL_PAPER] }] } },
        n: { $sum: 1 },
      },
    },
  ]);
  const out = new Map();
  for (const { _id, n } of rows) {
    const a = out.get(_id.t) || { total: 0, easy: 0, moderate: 0, hard: 0, pyq: 0 };
    a.total += n;
    a[BANDS[bandOf(_id.d)]] += n;
    if (_id.p) a.pyq += n;
    out.set(_id.t, a);
  }
  return out;
}

module.exports = { availability, REAL_PAPER };
