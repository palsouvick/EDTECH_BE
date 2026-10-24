'use strict';

/**
 * How well db/patterns/match/*.js rules cover the question bank.
 *
 *   node --env-file-if-exists=.env scripts/patternCoverage.js            # report only
 *   node --env-file-if-exists=.env scripts/patternCoverage.js --write    # also tag the questions
 *   node --env-file-if-exists=.env scripts/patternCoverage.js --subject gs
 */

const { connect, disconnect } = require('../src/db/connection');
const { checkRules, loadRules, tagAll } = require('../src/services/patternTagger');

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes('--subject') ? args[args.indexOf('--subject') + 1] : null;
  const problems = checkRules();
  problems.forEach((p) => console.error(`  ✗ ${p}`));
  const all = loadRules();
  const rules = only ? { [only]: all[only] || {} } : all;
  await connect();
  const coverage = await tagAll({ rules, write: args.includes('--write') });
  for (const c of coverage) {
    const pct = c.total ? Math.round((c.tagged / c.total) * 100) : 0;
    console.log(`${c.chapter.padEnd(36)} ${String(pct).padStart(3)}% of ${c.total}  ${JSON.stringify(c.counts)}`);
    c.untaggedSamples.forEach((s) => console.log(`      untagged: ${s}`));
  }
  await disconnect();
  if (problems.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
