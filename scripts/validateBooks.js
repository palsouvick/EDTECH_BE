'use strict';

/**
 * Checks study-book chapter files against db/books/README.md.
 *   node scripts/validateBooks.js                      # every chapter in db/books/*
 *   node scripts/validateBooks.js <file.json> [...]    # specific files (drafts too)
 * Exits 1 when any chapter has errors.
 */

const fs = require('node:fs');
const path = require('node:path');
const { validateChapter } = require('../src/services/books.validate');
const books = require('../src/services/books');

let failed = 0;
const files = process.argv.slice(2);
if (files.length) {
  for (const f of files) {
    let errs;
    try {
      errs = validateChapter(JSON.parse(fs.readFileSync(f, 'utf8')));
    } catch (e) {
      errs = [{ field: '', code: 'INVALID_JSON', message: e.message }];
    }
    console.log(`${path.basename(f)}: ${errs.length ? `${errs.length} error(s)` : 'OK'}`);
    for (const e of errs) console.log(`  ${e.field} ${e.code}: ${e.message}`);
    if (errs.length) failed += 1;
  }
} else {
  for (const name of Object.keys(books.BOOKS)) {
    const b = books.loadBook(name, { fresh: true });
    console.log(`${name}: ${b.chapters.size} valid chapter(s)`);
    for (const e of b.errors) console.log(`  ${e.file} ${e.field} ${e.code}: ${e.message}`);
    if (b.errors.length) failed += 1;
  }
}
process.exit(failed ? 1 : 0);
