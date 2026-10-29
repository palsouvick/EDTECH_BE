'use strict';

/**
 * Safe migration for users.uniq_mobile (unique mobile number, partial on string values).
 *
 *   npm run db:check-mobile-index              # report only: duplicates and current index state
 *   npm run db:check-mobile-index -- --create  # create the index, only if there are no duplicates
 *
 * It never edits or deletes user data. Duplicate numbers are listed (masked) so an
 * administrator can contact the owners and resolve them by hand; until then the index
 * is not created and the app keeps its existing check at registration.
 */

const mongoose = require('mongoose');
const config = require('../src/config');

const INDEX = {
  keys: { mobile: 1 },
  options: { name: 'uniq_mobile', unique: true, partialFilterExpression: { mobile: { $type: 'string' } } },
};

const mask = (mobile) => `${mobile.slice(0, 2)}******${mobile.slice(-2)}`;

async function findDuplicateMobiles(users) {
  return users
    .aggregate([
      { $match: { mobile: { $type: 'string' } } },
      { $group: { _id: '$mobile', count: { $sum: 1 }, ids: { $push: '$_id' } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { count: -1 } },
    ])
    .toArray();
}

async function ensureMobileIndex(db, { create = false, log = console.log } = {}) {
  const users = db.collection('users');
  const existing = (await users.indexes()).find((i) => i.name === INDEX.options.name);
  if (existing) {
    log(`uniq_mobile already exists: ${JSON.stringify(existing.key)} unique=${Boolean(existing.unique)}`);
    return { status: 'exists', duplicates: [] };
  }
  const duplicates = await findDuplicateMobiles(users);
  if (duplicates.length) {
    log(`${duplicates.length} mobile number(s) are used by more than one account; the index was NOT created:`);
    for (const d of duplicates) log(`  ${mask(d._id)}  ${d.count} accounts: ${d.ids.join(', ')}`);
    return { status: 'duplicates', duplicates };
  }
  if (!create) {
    log('No duplicate mobile numbers. Run again with --create to build uniq_mobile.');
    return { status: 'ready', duplicates: [] };
  }
  await users.createIndex(INDEX.keys, INDEX.options);
  log('uniq_mobile created.');
  return { status: 'created', duplicates: [] };
}

if (require.main === module) {
  (async () => {
    await mongoose.connect(config.mongoUri);
    try {
      const { status } = await ensureMobileIndex(mongoose.connection.db, { create: process.argv.includes('--create') });
      process.exitCode = status === 'duplicates' ? 1 : 0;
    } finally {
      await mongoose.disconnect();
    }
  })().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { ensureMobileIndex, findDuplicateMobiles };
