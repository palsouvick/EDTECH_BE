'use strict';

/**
 * Chapter lessons for the Learn section (Math and English), one file per
 * chapter: db/lessons/<subject>/<topic>.js. Content lives in code and ships
 * with each deploy; src/services/learn.service.js serves it.
 *
 * Format and rules: see ./validate.js.
 *
 *   node db/lessons/validate.js            # check every lesson
 */

const fs = require('node:fs');
const path = require('node:path');

const SUBJECTS = ['quant', 'english'];

function loadLessons() {
  const out = [];
  for (const subject of SUBJECTS) {
    const dir = path.join(__dirname, subject);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
      out.push({ file: path.join(dir, file), lesson: require(path.join(dir, file)) });
    }
  }
  return out;
}

module.exports = { SUBJECTS, loadLessons };
