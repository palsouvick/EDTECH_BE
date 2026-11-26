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
const MAX_PER_TABLE = 80;
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

// A long cell is never an option, but it can be the clue of a reverse question (it sits in the stem).
const MAX_CLUE_LEN = 220;
const clue = (c) => !blank(c) && !empty(c) && c.en.length <= MAX_CLUE_LEN;
const mentions = (text, name) => text.toLowerCase().includes(name.toLowerCase());

/**
 * Puts a pack table into the one-row-per-item shape the generator needs:
 *  - headers repeated side by side ("Element | Symbol | Element | Symbol") are stacked into one pair;
 *  - rows with a blank first cell (continuation lines) are left out of the questions;
 *  - a first column that repeats ("G7" for 2025 and 2026) is joined with the next column ("G7 · 2025")
 *    when that pair is unique.
 */
function normalizeTable({ caption, columns, rows }) {
  let cols = columns;
  let rs = rows;
  for (let p = 1; p <= cols.length / 2; p += 1) {
    if (cols.length % p || !cols.every((c, i) => c.en === cols[i % p].en)) continue;
    if (p === cols.length) break;
    rs = rs.flatMap((r) => Array.from({ length: cols.length / p }, (_, b) => r.slice(b * p, b * p + p)));
    cols = cols.slice(0, p);
    break;
  }
  const seen = new Set();
  rs = rs.filter((r) => !blank(r[0]) && r.slice(1).some((c) => !blank(c)) && !seen.has(JSON.stringify(r)) && seen.add(JSON.stringify(r)));
  const uniq = (xs) => new Set(xs).size === xs.length;
  if (!uniq(rs.map((r) => r[0].en)) && cols.length > 2 && rs.every((r) => !blank(r[1])) && uniq(rs.map((r) => `${r[0].en}|${r[1].en}`))) {
    const join = (a, b) => ({ en: `${a.en} · ${b.en}`, bn: `${a.bn} · ${b.bn}` });
    cols = [join(cols[0], cols[1]), ...cols.slice(2)];
    rs = rs.map((r) => [join(r[0], r[1]), ...r.slice(2)]);
  }
  return { caption, columns: cols, rows: rs };
}

/**
 * The questions of one table. `columns` are its headers, or null for rows found in a statement
 * (then the stems use neutral wording). Returns question bodies without codes.
 */
function fromTable(rec, { caption, columns, rows }) {
  const width = Math.max(...rows.map((r) => r.length));
  if (rows.length < 4 || width < 2) return [];
  if (columns && new Set(columns.map((c) => c.en)).size !== columns.length) return [];
  // The key is the first column, unless it is only serial numbers ("No."): then the next one.
  const unique = (j) => rows.every((r) => !blank(r[j])) && new Set(rows.map((r) => r[j].en)).size === rows.length;
  const k = rows.every((r) => numeric(r[0])) && width > 2 && unique(1) ? 1 : 0;
  if (!unique(k)) return [];
  const keys = rows.map((r) => r[k]);
  const keyPool = keys.filter(short);
  const explain = (row) => (columns
    ? rowExplanation(caption, columns, row)
    : { en: `${caption.en}: ${row.filter((c) => !blank(c)).map((c) => c.en).join(' – ')}.`, bn: `${caption.bn}: ${row.filter((c) => !blank(c)).map((c) => c.bn).join(' – ')}।` });

  const forward = [];
  const reverse = [];
  for (let j = 0; j < width; j += 1) {
    if (j === k) continue;
    const col = columns?.[j];
    const keyCol = columns?.[k];
    const cells = rows.map((r) => r[j]).filter(Boolean);
    const pool = cells.filter(short);
    const counts = new Map();
    for (const c of cells) if (!blank(c)) counts.set(c.en, (counts.get(c.en) || 0) + 1);
    rows.forEach((row, i) => {
      const key = row[k];
      const value = row[j];
      if (!value || key.en.length > MAX_KEY_LEN) return;
      const e = explain(row);
      // Forward: the key in the stem, this column's values as options.
      const w = short(value) && new Set(pool.map((c) => c.en)).size >= 4 && pickWrong(value, pool, `${rec.code}|f|${i}|${j}`);
      if (w) {
        forward.push({
          q: col
            ? [`${caption.en}: which ${lc(col.en)} goes with "${key.en}"?`, `${caption.bn}: "${key.bn}"-এর ${col.bn} কোনটি?`]
            : [`${caption.en}: what goes with "${key.en}"?`, `${caption.bn}: "${key.bn}"-এর সঙ্গে কোনটি মেলে?`],
          a: [value.en, value.bn], w: w.map((c) => [c.en, c.bn]), e: [e.en, e.bn],
        });
      }
      // Reverse: this cell as the clue, the keys as options. Only an unshared cell that does not
      // already name its answer.
      if (short(key) && clue(value) && counts.get(value.en) === 1 && keyPool.length >= 4 && !mentions(value.en, key.en)) {
        const wk = pickWrong(key, keyPool, `${rec.code}|r|${i}|${j}`);
        if (wk) {
          reverse.push({
            q: col
              ? [`${caption.en}: which ${lc(keyCol.en)} has ${lc(col.en)} "${value.en}"?`, `${caption.bn}: ${col.bn} "${value.bn}" — ${keyCol.bn} কোনটি?`]
              : [`${caption.en}: "${value.en}" — which one is this?`, `${caption.bn}: "${value.bn}" — কোনটি?`],
            a: [key.en, key.bn], w: wk.map((c) => [c.en, c.bn]), e: [e.en, e.bn],
          });
        }
      }
    });
  }
  // Forward first (the usual exam direction), then reverse.
  return [...forward, ...reverse];
}

// A statement row: "Strait of Hormuz — between Iran and Oman" (spaced en or em dash, short label).
const DASH = /\s+[–—]\s+/;
const MAX_LABEL = 60;

/**
 * Tables written as lines of a fact's statement (what the topic page shows as a table): runs of
 * at least 4 dash rows, read in English and Bengali side by side. Lines must pair up one to one;
 * a statement whose languages do not line up gives nothing.
 */
function statementTables(rec) {
  const en = String(rec.statement?.en ?? '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bn = String(rec.statement?.bn ?? '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (en.length < 4 || en.length !== bn.length) return [];
  const tables = [];
  let run = [];
  const flush = () => {
    if (run.length >= 4) {
      const n = Math.max(...run.map((r) => r.length));
      tables.push({ caption: rec.title, columns: null, rows: run.map((r) => (r.length === n ? r : [...r.slice(0, -1), ...Array(n - r.length).fill(null), r[r.length - 1]])) });
    }
    run = [];
  };
  en.forEach((line, i) => {
    const pe = line.split(DASH);
    const pb = bn[i].split(DASH);
    if (pe.length >= 2 && pe[0].length <= MAX_LABEL && pb.length === pe.length) run.push(pe.map((c, j) => ({ en: c, bn: pb[j] })));
    else flush();
  });
  flush();
  return tables;
}

/**
 * Questions in the library's question shape ({ format, d, q, a, w, e }) plus a code suffix:
 * T1, T2… from the pack table, S1, S2… from the statement's rows.
 */
function tableQuestions(rec) {
  const shape = (qs, prefix) => qs.slice(0, MAX_PER_TABLE).map((q, i) => ({ format: 'DIRECT', d: rec.difficulty ?? 2, code_suffix: `${prefix}${i + 1}`, ...q }));
  const t = rec.pack?.table;
  const fromPack = t && Array.isArray(t.rows) && t.columns?.length >= 2 ? fromTable(rec, normalizeTable({ caption: t.caption || rec.title, columns: t.columns, rows: t.rows })) : [];
  const fromStatement = statementTables(rec).flatMap((st) => fromTable(rec, st));
  return [...shape(fromPack, 'T'), ...shape(fromStatement, 'S')];
}

module.exports = { tableQuestions, statementTables, normalizeTable, MAX_PER_TABLE };
