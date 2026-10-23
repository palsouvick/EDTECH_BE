'use strict';

/**
 * Seed the exam catalogue and import authored question files.
 *
 *   npm run db:seed                                   # catalogue + db/seed/pyq-sample-25.json
 *   node --env-file-if-exists=.env scripts/seed.js --dry-run
 *   node --env-file-if-exists=.env scripts/seed.js --status IN_REVIEW path/to/more.json
 *   node --env-file-if-exists=.env scripts/seed.js --overwrite-summaries   # replace existing concept sheets too
 *
 * The server already does the default run (catalogue, cut-offs, concept sheets,
 * sample questions) on startup, see src/db/bootstrap.js. Use this script to
 * import more files, re-apply the sample questions, or overwrite concept sheets.
 *
 * Idempotent: categories are upserted by code, questions by a code derived
 * from their English stem. Concept sheets (db/seed/topic-summaries) are only
 * inserted where a topic has none, so sheets edited in the database are kept
 * unless --overwrite-summaries is passed.
 */

const { connect, disconnect } = require('../src/db/connection');
const { DEFAULT_QUESTION_FILE, seedReferenceData, importQuestionFile } = require('../src/db/seedData');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const overwriteSummaries = args.includes('--overwrite-summaries');
const statusIdx = args.indexOf('--status');
const status = statusIdx >= 0 ? args[statusIdx + 1] : 'PUBLISHED';
const files = args.filter((a, i) => !a.startsWith('--') && i !== statusIdx + 1);
if (!files.length) files.push(DEFAULT_QUESTION_FILE);

async function main() {
  if (!dryRun) await connect();

  await seedReferenceData({ dryRun, overwriteSummaries });

  for (const file of files) {
    const { errors } = await importQuestionFile(file, { status, dryRun });
    errors.forEach((e) => console.error(`  error ${e}`));
    if (errors.length) process.exitCode = 1;
  }

  if (!dryRun) await disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
