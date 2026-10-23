'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const mongoose = require('mongoose');

const SCRIPT = path.join(__dirname, '../../db/indexes.mongo.js');

/**
 * Runs db/indexes.mongo.js through the app's own connection, so a deploy needs
 * no mongosh. The script only calls db.<collection>.createIndex(keys, options),
 * which is idempotent. An index that fails (e.g. a unique index over existing
 * duplicates) is logged and skipped, so one bad index does not stop the server.
 */
async function ensureIndexes(conn = mongoose.connection, { log = console.log, warn = console.warn } = {}) {
  const specs = [];
  const db = new Proxy({}, {
    get: (_, collection) => ({ createIndex: (keys, options = {}) => specs.push({ collection, keys, options }) }),
  });
  vm.runInNewContext(fs.readFileSync(SCRIPT, 'utf8'), { db, print: () => {} }, { filename: SCRIPT });

  let failed = 0;
  for (const { collection, keys, options } of specs) {
    try {
      await conn.db.collection(collection).createIndex(keys, options);
    } catch (e) {
      failed += 1;
      warn(`index ${collection}.${options.name || JSON.stringify(keys)} not created: ${e.message}`);
    }
  }
  log(`indexes: ${specs.length - failed}/${specs.length} ensured`);
}

module.exports = { ensureIndexes };
