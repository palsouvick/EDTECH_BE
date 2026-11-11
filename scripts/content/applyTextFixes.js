'use strict';

/**
 * Applies exact text replacements to a study-book chapter (prose, boxes, blocks; never to claims or quotes),
 * failing if any replacement is not found exactly once. Used after a blind check.
 *
 *   node scripts/content/applyTextFixes.js <chapter.json> <fixes.json>
 *
 * fixes.json: [{ "find": "...", "replace": "..." }, ...]
 */

const fs = require('node:fs');

const [file, fixesFile] = process.argv.slice(2);
const ch = JSON.parse(fs.readFileSync(file, 'utf8'));
const fixes = JSON.parse(fs.readFileSync(fixesFile, 'utf8'));
const used = fixes.map(() => 0);
const walk = (v, key) => {
  if (['claims', 'quote', 'claim'].includes(key)) return v;
  if (typeof v === 'string') {
    let s = v;
    fixes.forEach((f, i) => {
      const n = s.split(f.find).length - 1;
      if (n) {
        used[i] += n;
        s = s.split(f.find).join(f.replace);
      }
    });
    return s;
  }
  if (Array.isArray(v)) return v.map((x) => walk(x, key));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
  return v;
};
const out = walk(ch);
const bad = fixes.map((f, i) => [f.find, used[i]]).filter(([, n]) => n !== 1);
if (bad.length) {
  console.error('Each fix must match exactly once:\n' + bad.map(([f, n]) => `  ${n}x  ${f.slice(0, 80)}`).join('\n'));
  process.exit(1);
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
console.log(`${fixes.length} fixes applied`);
