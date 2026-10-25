'use strict';

const { connect, disconnect } = require('../src/db/connection');
const { Question } = require('../src/models');
const { classifyLegacyQuestion } = require('../src/services/questionProvenance');

async function main() {
  await connect();
  const counts = {
    OFFICIAL_VERIFIED: 0,
    ORIGINAL_PRACTICE: 0,
    UNCLASSIFIED: 0,
  };
  const operations = [];

  for await (const question of Question.find({ provenance: { $exists: false } })
    .select('authored_by pyq.refs')
    .lean()
    .cursor()) {
    const provenance = classifyLegacyQuestion(question);
    counts[provenance] += 1;
    operations.push({
      updateOne: {
        filter: { _id: question._id, provenance: { $exists: false } },
        update: { $set: { provenance } },
      },
    });
    if (operations.length === 500) {
      await Question.bulkWrite(operations, { ordered: false });
      operations.length = 0;
    }
  }

  if (operations.length) await Question.bulkWrite(operations, { ordered: false });
  console.log(`Question provenance backfill complete: ${JSON.stringify(counts)}`);
  console.log('Adapted legacy questions cannot be inferred and remain UNCLASSIFIED for manual review.');
}

main()
  .catch((error) => {
    console.error('Question provenance backfill failed:', error);
    process.exitCode = 1;
  })
  .finally(disconnect);
