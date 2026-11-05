'use strict';

/**
 * Important Days, the whole year in one view (Learn → GK → Important Days). Built only
 * from the published, verified month facts (GK-DAY-001…012) and the confusing-pairs fact,
 * so every date shown is one that went through the GK verification. Nothing is retyped:
 * each "12 January – National Youth Day (…)" line of a month fact becomes a row.
 */

const { GkFact } = require('../models');

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const fromBnDigits = (s) => Number(s.replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d)));

const EN_LINE = /^(\d{1,2}) ([A-Z][a-z]+) – (.+)$/;
const BN_LINE = /^([০-৯]{1,2}) \S+ – (.+)$/;
// The confusing-pairs fact: "National Voters' Day – 25 January (NOT Republic Day, 26 January)".
const PAIR_LINE = /\bNOT\b/;

/**
 * One month fact → its rows, or null when the text does not have the expected shape
 * (a header line, then one "D Month – name" line per day, the same count in English and
 * Bengali, every English month matching the fact's subtopic, days in ascending order).
 */
function parseMonthFact(fact) {
  const month = MONTHS.indexOf(fact.subtopic) + 1;
  if (!month) return null;
  const en = (fact.statement?.en || '').split('\n').slice(1);
  const bn = (fact.statement?.bn || '').split('\n').slice(1);
  if (!en.length || (bn.length && bn.length !== en.length)) return null;
  const rows = [];
  for (const [i, line] of en.entries()) {
    const m = EN_LINE.exec(line.trim());
    if (!m || m[2].toLowerCase() !== fact.subtopic) return null;
    const day = Number(m[1]);
    const b = bn.length ? BN_LINE.exec(bn[i].trim()) : null;
    if (bn.length && (!b || fromBnDigits(b[1]) !== day)) return null;
    if (rows.length && day <= rows.at(-1).day) return null;
    rows.push({ month, day, name: { en: m[3], ...(b && { bn: b[2] }) } });
  }
  return rows;
}

// Words that do not tell two observances apart ("World … Day", "birth anniversary").
const STOP = new Set(('day days world international national india indian in of the and for against to on diwas divas also an with '
  + 'persons person preservation elimination combat awareness united nations anniversary jayanti anti violence conservation rights peace').split(' '));
const keyWords = (name) => [...new Set(name.replace(/\(.*?\)/g, ' ').toLowerCase().replace(/['’]s\b/g, '').split(/[^a-z]+/).filter((w) => w.length > 2 && !STOP.has(w)))];

/**
 * Days whose names share a key word but fall on different dates: the pairs exam options are
 * built from (Teachers' Day 5 Sep vs World Teachers' Day 5 Oct). A group whose days all sit
 * inside a larger group is dropped ("girl" inside "child").
 */
function similarNameGroups(rows) {
  const byWord = new Map();
  for (const r of rows) for (const w of keyWords(r.name.en)) byWord.set(w, [...(byWord.get(w) || []), r]);
  const groups = [...byWord.entries()]
    .filter(([, rs]) => new Set(rs.map((r) => r.month * 100 + r.day)).size >= 2)
    .map(([word, rs]) => ({ word, rows: rs }));
  const contains = (big, small) => small.rows.every((r) => big.rows.includes(r));
  return groups
    .filter((g) => !groups.some((o) => o !== g && o.rows.length > g.rows.length && contains(o, g)))
    .sort((a, b) => a.rows[0].month - b.rows[0].month || a.rows[0].day - b.rows[0].day);
}

async function yearCalendar() {
  const facts = await GkFact.find({ topic: 'important_days', status: 'PUBLISHED', 'verification.status': 'VERIFIED' })
    .select('code subtopic title statement sources bengali_review')
    .lean();
  const months = [];
  const skipped = [];
  for (const f of facts.filter((x) => MONTHS.includes(x.subtopic)).sort((a, b) => MONTHS.indexOf(a.subtopic) - MONTHS.indexOf(b.subtopic))) {
    const rows = parseMonthFact(f);
    if (!rows) {
      skipped.push(f.code);
      continue;
    }
    months.push({
      month: MONTHS.indexOf(f.subtopic) + 1,
      subtopic: f.subtopic,
      factCode: f.code,
      bengaliReview: f.bengali_review?.status ?? f.bengali_review ?? null,
      sources: (f.sources || []).map((s) => ({ title: s.title, url: s.url, publisher: s.publisher ?? null })),
      rows,
    });
  }
  if (skipped.length) console.warn(`[important-days] month facts not in "D Month – name" form, left out of the year view: ${skipped.join(', ')}`);

  const pairsFact = facts.find((f) => f.subtopic === 'mixed' && PAIR_LINE.test(f.statement?.en || ''));
  const enPairs = pairsFact ? pairsFact.statement.en.split('\n').slice(1).filter((l) => PAIR_LINE.test(l)) : [];
  const bnLines = pairsFact?.statement?.bn ? pairsFact.statement.bn.split('\n').slice(1) : [];
  const allPairs = pairsFact ? pairsFact.statement.en.split('\n').slice(1) : [];
  const confusedPairs = enPairs.map((en) => {
    const bn = bnLines.length === allPairs.length ? bnLines[allPairs.indexOf(en)] : undefined;
    return { en, ...(bn && { bn }) };
  });

  const rows = months.flatMap((m) => m.rows);
  return {
    months,
    dayCount: rows.length,
    similarNames: similarNameGroups(rows),
    confusedPairs,
    confusedPairsFactCode: pairsFact?.code ?? null,
  };
}

module.exports = { yearCalendar, parseMonthFact, similarNameGroups, MONTHS };
