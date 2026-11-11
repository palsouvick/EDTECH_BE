'use strict';

/**
 * Checks every claim quote of a study-book chapter against the text of its source book.
 *
 *   node scripts/content/checkQuotes.js <chapter.json> --text <sourceId>=<file-or-dir> [--text ...] [--min 0.85]
 *
 * NCERT PDFs have a text layer (pdftotext): the quote must appear exactly, ignoring spaces, punctuation, quote
 * marks and dashes. WBBSE / Banglar Shiksha e-Text Books are scanned, so their text comes from OCR
 * (scripts/content/ocrTextbook.py), which makes small mistakes in Bengali conjuncts. For those the best-matching
 * passage must reach a similarity of --min (default 0.85, on normalised text); anything lower is listed as
 * NEEDS_PAGE_CHECK, for the second reader to confirm against the page image, together with the page it was found on.
 *
 * A directory argument means an OCR folder (page_0001.txt …); a file is read whole (pages split by form feeds).
 * Exit code 1 when any quote fails or needs a page check.
 */

const fs = require('node:fs');
const path = require('node:path');
const { publisherOf } = require('../../src/services/books.validate');

/** Letters and digits only, lower case; Bengali digits as ASCII so "১৯০৫" and "1905" compare equal. */
function normalise(s) {
  return String(s || '')
    .normalize('NFC')
    .replace(/[০-৯]/g, (d) => String(d.charCodeAt(0) - 0x09e6))
    .replace(/[়‌‍]/g, '') // nukta and joiners vary between OCR and typing
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, '');
}

function loadPages(arg) {
  if (fs.statSync(arg).isDirectory()) {
    return fs
      .readdirSync(arg)
      .filter((f) => /^page_\d+\.txt$/.test(f))
      .sort()
      .map((f) => ({ page: Number(f.match(/\d+/)[0]), text: fs.readFileSync(path.join(arg, f), 'utf8') }));
  }
  return fs.readFileSync(arg, 'utf8').split('\f').map((text, i) => ({ page: i + 1, text }));
}

/** Levenshtein distance between two strings (two rows). */
function distance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const cur = [i];
    for (let j = 1; j <= b.length; j += 1) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Best similarity (1 - distance / length) of the quote against any passage of the text. Candidate places come from
 * shared 4-character pieces, so the edit distance is only computed around likely matches.
 */
function bestMatch(quote, pages) {
  const q = normalise(quote);
  if (!q) return { score: 0, page: null };
  let best = { score: 0, page: null };
  const K = 4;
  const grams = new Set();
  for (let i = 0; i + K <= q.length; i += 1) grams.add(q.slice(i, i + K));
  for (const { page, text } of pages) {
    const t = normalise(text);
    if (t.includes(q)) return { score: 1, page };
    // Count shared pieces in a sliding window the length of the quote.
    const hits = new Int32Array(Math.max(0, t.length - K + 1));
    for (let i = 0; i + K <= t.length; i += 1) hits[i] = grams.has(t.slice(i, i + K)) ? 1 : 0;
    const win = Math.max(1, q.length - K + 1);
    let sum = 0;
    let top = [];
    for (let i = 0; i < hits.length; i += 1) {
      sum += hits[i];
      if (i >= win) sum -= hits[i - win];
      if (i >= win - 1 && sum >= 0.5 * grams.size) top.push([sum, i - win + 1]);
    }
    top = top.sort((x, y) => y[0] - x[0]).slice(0, 5);
    for (const [, start] of top) {
      for (const slack of [0, -3, 3, -8, 8]) {
        const s = Math.max(0, start + Math.min(0, slack));
        const seg = t.slice(s, s + q.length + Math.abs(slack));
        const score = 1 - distance(q, seg) / Math.max(q.length, seg.length);
        if (score > best.score) best = { score, page };
      }
    }
  }
  return best;
}

function checkChapter(chapter, textBySource, { min = 0.85 } = {}) {
  const results = [];
  for (const c of chapter.claims) {
    const src = chapter.sources.find((s) => s.id === c.source);
    const pages = textBySource[c.source];
    const publisher = publisherOf(src?.url);
    if (!pages) {
      results.push({ id: c.id, source: c.source, status: 'NO_TEXT', publisher });
      continue;
    }
    const m = bestMatch(c.quote, pages);
    const exact = m.score === 1;
    let status = exact ? 'OK' : 'NOT_FOUND';
    if (!exact && publisher === 'WBBSE') status = m.score >= min ? 'OK_OCR' : 'NEEDS_PAGE_CHECK';
    results.push({ id: c.id, source: c.source, publisher, status, score: Math.round(m.score * 100) / 100, page: m.page, claimedPage: c.page || null });
  }
  return results;
}

module.exports = { normalise, bestMatch, checkChapter, loadPages };

if (require.main === module) {
  const args = process.argv.slice(2);
  const file = args.shift();
  const textBySource = {};
  let min = 0.85;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--text') {
      const [id, p] = args[++i].split(/=(.+)/);
      textBySource[id] = loadPages(p);
    } else if (args[i] === '--min') min = Number(args[++i]);
  }
  const results = checkChapter(JSON.parse(fs.readFileSync(file, 'utf8')), textBySource, { min });
  const counts = results.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {});
  console.log(JSON.stringify(counts));
  for (const r of results.filter((x) => !['OK', 'OK_OCR'].includes(x.status))) console.log(JSON.stringify(r));
  process.exit(results.every((r) => ['OK', 'OK_OCR'].includes(r.status)) ? 0 : 1);
}
