'use strict';

/**
 * Retires published questions whose four options are only part labels ("A", "B", "C",
 * "No error"). Seeding shuffles options, so students saw e.g. "Option B: A". The fixed
 * versions (options = the sentence parts) are new questions added by the next bank top-up;
 * the old ones are set to ARCHIVED with a reason. Nothing is deleted.
 *
 *   npm run db:retire-letter-options              dry run: counts only
 *   npm run db:retire-letter-options -- --apply   write
 */

const { connect, disconnect } = require('../src/db/connection');
const { Question } = require('../src/models');

const LABEL = /^\(?[A-D]\)?$|^no error$/i;
const REASON = 'Error-spotting options were only part labels (A/B/C/No error), shown shuffled; replaced by a version whose options are the sentence parts.';

async function retireLetterOptionQuestions({ apply = false, log = console.log } = {}) {
  const rows = await Question.find({ status: 'PUBLISHED' }).select('code subject topic options').lean();
  // Error-spotting sets only: they always include "No error". (Reasoning puzzles legitimately
  // answer with person labels A/B/C/D, so letters alone are not enough.)
  const text = (o) => String(o.text?.en ?? '').trim();
  const bad = rows.filter((q) => q.options.length && q.options.every((o) => LABEL.test(text(o))) && q.options.some((o) => /^no error$/i.test(text(o))));
  const byTopic = {};
  for (const q of bad) byTopic[`${q.subject}.${q.topic}`] = (byTopic[`${q.subject}.${q.topic}`] || 0) + 1;
  if (apply && bad.length) {
    await Question.updateMany({ _id: { $in: bad.map((q) => q._id) }, status: 'PUBLISHED' }, { $set: { status: 'ARCHIVED', retired_reason: REASON } });
  }
  log(`${apply ? 'Retired' : 'Dry run (use --apply to write)'}: ${bad.length} ${JSON.stringify(byTopic)}`);
  return { count: bad.length, byTopic };
}

if (require.main === module) {
  connect()
    .then(() => retireLetterOptionQuestions({ apply: process.argv.includes('--apply') }))
    .catch((error) => {
      console.error('Retire letter-option questions failed:', error);
      process.exitCode = 1;
    })
    .finally(disconnect);
}

module.exports = { retireLetterOptionQuestions };
