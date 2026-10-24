'use strict';

const mongoose = require('mongoose');
const config = require('../src/config');
const { Question } = require('../src/models');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');

const BATCH_SIZE = 500;
const MIGRATION_ID = 'question_duplicate_keys_v1';

async function main() {
  await mongoose.connect(config.mongoUri);
  const collection = Question.collection;
  await collection.createIndex({ duplicate_keys: 1 }, { name: 'question_duplicate_keys' });

  const cursor = collection.find(
    { duplicate_keys: { $exists: false } },
    { projection: { _id: 1, stem: 1 }, batchSize: BATCH_SIZE },
  );
  let operations = [];
  let updated = 0;
  for await (const question of cursor) {
    operations.push({
      updateOne: {
        filter: { _id: question._id, duplicate_keys: { $exists: false } },
        update: { $set: { duplicate_keys: questionDuplicateKeys(question.stem) } },
      },
    });
    if (operations.length === BATCH_SIZE) {
      const result = await collection.bulkWrite(operations, { ordered: false });
      updated += result.modifiedCount;
      operations = [];
    }
  }
  if (operations.length) {
    const result = await collection.bulkWrite(operations, { ordered: false });
    updated += result.modifiedCount;
  }

  const missing = await collection.countDocuments({ duplicate_keys: { $exists: false } });
  if (missing) throw new Error(`Duplicate-key backfill incomplete: ${missing} questions remain`);
  await mongoose.connection.collection('question_import_migrations').updateOne(
    { _id: MIGRATION_ID },
    { $set: { completed_at: new Date(), question_count: await collection.countDocuments() } },
    { upsert: true },
  );
  console.log(`Question duplicate-key backfill complete; updated ${updated} existing records.`);
}

main()
  .catch((error) => {
    console.error('Question duplicate-key backfill failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
