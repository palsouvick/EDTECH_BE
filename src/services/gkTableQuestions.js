'use strict';

/**
 * Questions made from a topic pack's table ("list questions"): each row is asked both ways.
 *   forward: "<caption>: which <column> goes with "<row key>"?"       options: that column's values
 *   reverse: "<caption>: which <key column> has <column> "<value>"?"  options: the key column's values
 * The table is part of the verified fact (every cell is backed by its quoted sources), so the
 * questions carry the fact's verification. Wrong options are other rows' cells of the same column,
 * picked deterministically so a re-seed of an unchanged table gives the same questions.
 *
 * Guards against ambiguous or unreadable questions:
 *  - the key column (the first) must be unique; tables with repeated column headers are skipped;
 *  - an option column needs at least 4 distinct values, none longer than MAX_OPTION_LEN;
 *  - a reverse question needs its value to be unique in the column (exactly one right key);
 *  - blank or "—" cells are never asked and never used as options.
 */

const crypto = require('node:crypto');

const MAX_OPTION_LEN = 70;
const MAX_KEY_LEN = 90;
const MAX_PER_TABLE = 40;
const BLANK = /^\s*[—–-]?\s*$/;

const h = (s) => crypto.createHash('sha1').update(s).digest('hex');
const blank = (cell) => !cell || BLANK.test(cell.en || '') || BLANK.test(cell.bn || '');
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);

/** Three wrong options: other cells of the column, distinct from the answer and each other (both languages). */
function pickWrong(answer, pool, seed) {
  const seenEn = new Set([answer.en]);
  const seenBn = new Set([answer.bn]);
  const out = [];
  for (const c of [...pool].sort((a, b) => h(seed + a.en).localeCompare(h(seed + b.en)))) {
    if (seenEn.has(c.en) || seenBn.has(c.bn)) continue;
    seenEn.add(c.en);
    seenBn.add(c.bn);
    out.push(c);
    if (out.length === 3) break;
  }
  return out.length === 3 ? out : null;
}

function rowExplanation(caption, columns, row) {
  return {
    en: `${caption.en}: ${columns.map((c, i) => `${c.en}: ${row[i].en}`).join('; ')}.`,
    bn: `${caption.bn}: ${columns.map((c, i) => `${c.bn}: ${row[i].bn}`).join('; ')}।`,
  };
}

// A cell that only says there is nothing ("No nickname in the textbooks", "None") is no answer or option.
const empty = (c) => /^(no|none|not|n\/a)\b/i.test(c.en.trim());
const short = (c) => !blank(c) && !empty(c) && c.en.length <= MAX_OPTION_LEN && c.bn.length <= MAX_OPTION_LEN * 2;
const numeric = (c) => /^\d+$/.test(c.en.trim());

/** Questions in the library's question shape ({ format, d, q, a, w, e }) plus a code suffix (T1, T2…). */
function tableQuestions(rec) {
  const t = rec.pack?.table;
  if (!t || !Array.isArray(t.rows) || t.rows.length < 4 || t.columns.length < 2) return [];
  const { columns, rows } = t;
  const caption = t.caption || rec.title;
  if (new Set(columns.map((c) => c.en)).size !== columns.length) return [];
  // The key is the first column, unless it is only serial numbers ("No."): then the next one.
  const unique = (j) => rows.every((r) => !blank(r[j])) && new Set(rows.map((r) => r[j].en)).size === rows.length;
  const k = rows.every((r) => numeric(r[0])) && columns.length > 2 && unique(1) ? 1 : 0;
  if (!unique(k)) return [];
  const keyCol = columns[k];
  const keys = rows.map((r) => r[k]);
  const keyPool = keys.filter(short);

  const forward = [];
  const reverse = [];
  for (let j = 0; j < columns.length; j += 1) {
    if (j === k) continue;
    const col = columns[j];
    const pool = rows.map((r) => r[j]).filter(short);
    if (new Set(pool.map((c) => c.en)).size < 4) continue;
    const counts = new Map();
    for (const c of rows.map((r) => r[j])) if (!blank(c)) counts.set(c.en, (counts.get(c.en) || 0) + 1);
    rows.forEach((row, i) => {
      const key = row[k];
      const value = row[j];
      if (!short(value) || key.en.length > MAX_KEY_LEN) return;
      const e = rowExplanation(caption, columns, row);
      const w = pickWrong(value, pool, `${rec.code}|f|${i}|${j}`);
      if (w) {
        forward.push({
          q: [`${caption.en}: which ${lc(col.en)} goes with "${key.en}"?`, `${caption.bn}: "${key.bn}"-এর ${col.bn} কোনটি?`],
          a: [value.en, value.bn], w: w.map((c) => [c.en, c.bn]), e: [e.en, e.bn],
        });
      }
      if (short(key) && counts.get(value.en) === 1 && keyPool.length >= 4) {
        const wk = pickWrong(key, keyPool, `${rec.code}|r|${i}|${j}`);
        if (wk) {
          reverse.push({
            q: [`${caption.en}: which ${lc(keyCol.en)} has ${lc(col.en)} "${value.en}"?`, `${caption.bn}: ${col.bn} "${value.bn}" — ${keyCol.bn} কোনটি?`],
            a: [key.en, key.bn], w: wk.map((c) => [c.en, c.bn]), e: [e.en, e.bn],
          });
        }
      }
    });
  }
  // Forward first (the usual exam direction), then reverse, up to the cap.
  return [...forward, ...reverse].slice(0, MAX_PER_TABLE).map((q, i) => ({ format: 'DIRECT', d: rec.difficulty ?? 2, code_suffix: `T${i + 1}`, ...q }));
}

module.exports = { tableQuestions, MAX_PER_TABLE };
