'use strict';

/**
 * Rewrites only the last explanation step ("📄 Previous-year question: ...") of imported
 * PYQs to the wording for their answer basis (importers/examStyleJson.pyqSourceLine):
 * WBCS 2023 was labelled "Official paper" although it links an unofficial copy, and the
 * keyless WBCS 2015–2019 answers did not say they were cross-checked. Nothing else on the
 * question changes, so stats and attempts are kept (unlike a full re-seed).
 *
 *   npm run db:pyq-source-lines            dry run: counts only
 *   npm run db:pyq-source-lines -- --apply write the changes
 */

const fs = require('node:fs');
const path = require('node:path');
const { connect, disconnect } = require('../src/db/connection');
const { Question } = require('../src/models');
const { PYQ_DIR, pyqFiles } = require('../src/db/seedData');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');

/** @returns counts; writes only with apply. */
async function relabelPyqSourceLines({ apply = false, log = console.log } = {}) {
  const counts = { checked: 0, changed: 0, unchanged: 0, missing: 0, notSourceLine: 0 };
  const operations = [];

  for (const file of pyqFiles()) {
    const items = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const [index, item] of items.entries()) {
      const { doc, error } = convertExamStyleQuestion(item, { index });
      if (error || !doc.pyq) continue;
      counts.checked += 1;
      const wanted = doc.solution.steps.at(-1);
      const q = await Question.findOne({ code: doc.code }).select('+solution pyq.refs').lean();
      // A stem shared by two papers is one document (a known importer limit): only touch
      // the document whose ref is this paper's question.
      if (!q || !q.pyq?.refs?.some((r) => r.question_code === doc.pyq.refs[0].question_code)) {
        counts.missing += 1;
        continue;
      }
      const steps = q.solution?.steps || [];
      const last = steps.length - 1;
      if (last < 0 || !String(steps[last].en || steps[last].bn || '').startsWith('📄')) {
        counts.notSourceLine += 1;
        continue;
      }
      if (['en', 'bn', 'hi'].every((l) => (steps[last][l] ?? null) === (wanted[l] ?? null))) {
        counts.unchanged += 1;
        continue;
      }
      counts.changed += 1;
      operations.push({ updateOne: { filter: { _id: q._id }, update: { $set: { [`solution.steps.${last}`]: wanted } } } });
    }
    log(`${path.relative(PYQ_DIR, file)}: checked`);
  }

  if (apply) {
    for (let i = 0; i < operations.length; i += 500) await Question.bulkWrite(operations.slice(i, i + 500), { ordered: false });
  }
  log(`${apply ? 'Applied' : 'Dry run (use --apply to write)'}: ${JSON.stringify(counts)}`);
  return counts;
}

if (require.main === module) {
  connect()
    .then(() => relabelPyqSourceLines({ apply: process.argv.includes('--apply') }))
    .catch((error) => {
      console.error('PYQ source-line relabel failed:', error);
      process.exitCode = 1;
    })
    .finally(disconnect);
}

module.exports = { relabelPyqSourceLines };
