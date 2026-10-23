'use strict';

/**
 * Question patterns per chapter (db/patterns/<subject>/<topic>.js), served by
 * GET /api/v1/practice/patterns. Content ships with the code; nothing to seed.
 * Format and rules: see ./validate.js.
 */

const fs = require('node:fs');
const path = require('node:path');

const SUBJECTS = ['quant', 'reasoning', 'english', 'gs'];

/** With `onError`, a file that fails to load is reported and skipped instead of throwing. */
function loadPatterns({ onError } = {}) {
  const out = [];
  for (const subject of SUBJECTS) {
    const dir = path.join(__dirname, subject);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
      try {
        out.push({ file: path.join(dir, file), doc: require(path.join(dir, file)) });
      } catch (e) {
        if (!onError) throw e;
        onError(file, e);
      }
    }
  }
  return out;
}

module.exports = { SUBJECTS, loadPatterns };
