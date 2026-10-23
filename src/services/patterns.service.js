'use strict';

const config = require('../config');
const { loadPatterns } = require('../../db/patterns');

/**
 * Question patterns per chapter (db/patterns): how each kind of question is
 * spotted and solved, a worked example and a "your turn" question. Learning
 * content, so the try-it answers are public; the question bank's answers stay
 * behind verify-answer.
 */
let cache;
function byChapter() {
  // Cached in production (content changes only with a deploy). In development the
  // folder is re-read, so files added while the server runs show up without a restart.
  if (!cache || !config.isProd) {
    // One broken file must not take every chapter's patterns down with it.
    const docs = loadPatterns({ onError: (file, e) => console.error(`[patterns] ${file} skipped: ${e.message}`) });
    cache = new Map(docs.map(({ doc }) => [`${doc.subject}.${doc.topic}`, doc.patterns]));
  }
  return cache;
}

/** Topics without patterns yet return an empty list, not a 404: the page simply hides the section. */
function getPatterns({ subject, topic }) {
  return { subject, topic, patterns: byChapter().get(`${subject}.${topic}`) ?? [] };
}

module.exports = { getPatterns };
