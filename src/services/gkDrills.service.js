'use strict';

/**
 * GK confusion drills (db/gk/drills.json): short mixed quizzes built from facts students mix
 * up: look-alike symbols, detective and creator, pen name and writer. A drill is only a
 * grouping of library facts, so every question in it is an ordinary verified library question.
 * Questions from all the drill's facts are interleaved, because the confusion only shows when
 * P and K are asked next to each other.
 */

const path = require('node:path');
const { GkFact, Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, presentQuestion, compactLocalized } = require('./presenters');
const AppError = require('../utils/AppError');

const DRILLS_FILE = path.join(__dirname, '../../db/gk/drills.json');
const MIN_QUESTIONS = 4; // a drill with fewer published questions is hidden
const MAX_QUESTIONS = 20;
const MIX_QUESTIONS = 30; // a section's mixed test
const MIX_PREFIX = 'mix_';

/** Sections of the drills page, in display order. Every drill names one. */
const GROUPS = [
  { id: 'current', title: { en: 'Current affairs 2025–26', bn: 'সাম্প্রতিক ঘটনা ২০২৫–২৬' } },
  { id: 'static', title: { en: 'Static GK: days, firsts, symbols, headquarters', bn: 'স্ট্যাটিক জিকে: দিবস, প্রথম, প্রতীক, সদর দপ্তর' } },
  { id: 'polity', title: { en: 'Polity and Constitution', bn: 'রাষ্ট্রব্যবস্থা ও সংবিধান' } },
  { id: 'history', title: { en: 'History', bn: 'ইতিহাস' } },
  { id: 'geography', title: { en: 'Geography and environment', bn: 'ভূগোল ও পরিবেশ' } },
  { id: 'economy', title: { en: 'Economy and schemes', bn: 'অর্থনীতি ও প্রকল্প' } },
  { id: 'science', title: { en: 'Science and computers', bn: 'বিজ্ঞান ও কম্পিউটার' } },
  { id: 'culture', title: { en: 'Books, awards, music and sports', bn: 'বই, পুরস্কার, সংগীত ও খেলা' } },
  { id: 'west_bengal', title: { en: 'West Bengal', bn: 'পশ্চিমবঙ্গ' } },
];
const GROUP_IDS = new Set(GROUPS.map((g) => g.id));
const ID_RE = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;
const CODE_RE = /^GK-[A-Z]{2,4}-\d{3,5}$/;
const BN = /[ঀ-৿]/;

let drills = null;
function loadDrills() {
  if (!drills) drills = JSON.parse(require('node:fs').readFileSync(DRILLS_FILE, 'utf8'));
  return drills;
}
/** Tests: use these drills instead of the file (null = back to the file). */
function useDrills(list) {
  drills = list;
}

/** Shape check for drills.json; knownCodes (optional) also checks that every fact exists. */
function validateDrills(list, knownCodes = null) {
  const errors = [];
  const err = (at, message) => errors.push({ at, message });
  if (!Array.isArray(list)) return [{ at: 'drills', message: 'drills.json must be an array' }];
  const ids = new Set();
  list.forEach((d, i) => {
    const at = d?.id || `#${i}`;
    if (!ID_RE.test(d?.id || '')) err(at, 'id must be a lowercase slug');
    if (ids.has(d.id)) err(at, 'duplicate id');
    if (d?.id?.startsWith(MIX_PREFIX)) err(at, `ids starting with ${MIX_PREFIX} are reserved for section tests`);
    ids.add(d.id);
    if (!Number.isInteger(d.order)) err(at, 'order must be an integer');
    if (d.group !== undefined && !GROUP_IDS.has(d.group)) err(at, `unknown group ${d.group}`);
    for (const k of ['title', 'intro']) {
      if (!d[k]?.en?.trim() || !d[k]?.bn?.trim()) err(at, `${k} needs en and bn`);
      else if (!BN.test(d[k].bn)) err(at, `${k}.bn has no Bengali text`);
    }
    if (!Array.isArray(d.facts) || d.facts.length < 2) err(at, 'a drill needs at least 2 facts');
    for (const c of d.facts || []) {
      if (!CODE_RE.test(c)) err(at, `bad fact code ${c}`);
      else if (knownCodes && !knownCodes.has(c)) err(at, `unknown fact ${c}`);
    }
    if (new Set(d.facts || []).size !== (d.facts || []).length) err(at, 'repeated fact code');
  });
  return errors;
}

/** Per drill fact (in drill order): its published question ids; plus the published facts' titles. */
async function publishedQuestionIds(codes) {
  const facts = await GkFact.find({ code: { $in: codes }, status: 'PUBLISHED' }).select('code title question_ids').lean();
  const byCode = new Map(facts.map((f) => [f.code, f]));
  const perFact = codes.map((c) => (byCode.get(c)?.question_ids || []).map(String));
  perFact.facts = codes.filter((c) => byCode.has(c)).map((c) => ({ code: c, title: compactLocalized(byCode.get(c).title) }));
  return perFact;
}

/** The drills that have enough published questions, in order, with their question counts. */
async function listDrills() {
  const out = [];
  for (const d of [...loadDrills()].sort((a, b) => a.order - b.order)) {
    const perFact = await publishedQuestionIds(d.facts);
    const ids = perFact.flat();
    const count = ids.length ? await Question.countDocuments({ _id: { $in: ids }, status: 'PUBLISHED' }) : 0;
    if (count >= MIN_QUESTIONS) out.push({ id: d.id, group: d.group ?? null, title: compactLocalized(d.title), intro: compactLocalized(d.intro), questionCount: Math.min(count, MAX_QUESTIONS), facts: perFact.facts });
  }
  // Sections that have at least one visible drill, each with its mixed test.
  const groups = GROUPS.filter((g) => out.some((d) => d.group === g.id)).map((g) => {
    const members = out.filter((d) => d.group === g.id);
    return { id: g.id, title: compactLocalized(g.title), mixId: `${MIX_PREFIX}${g.id}`, drillCount: members.length, questionCount: Math.min(MIX_QUESTIONS, members.reduce((s, d) => s + d.questionCount, 0)) };
  });
  return { drills: out, groups };
}

/** A section's mixed test: the drills of one group, as one virtual drill. */
function mixDrill(id) {
  const g = GROUPS.find((x) => `${MIX_PREFIX}${x.id}` === id);
  if (!g) return null;
  const members = loadDrills().filter((d) => d.group === g.id).sort((a, b) => a.order - b.order);
  if (!members.length) return null;
  return {
    id,
    title: g.title,
    intro: { en: `Mixed test: ${members.length} drills of this section together.`, bn: `মিশ্র টেস্ট: এই বিভাগের ${members.length}টি ড্রিল একসঙ্গে।` },
    facts: [...new Set(members.flatMap((d) => d.facts))],
    max: MIX_QUESTIONS,
  };
}

/** Round-robin across facts so neighbouring questions come from different facts. */
function interleave(groups, rng = Math.random) {
  const shuffled = groups.map((g) => [...g].sort(() => rng() - 0.5)).sort(() => rng() - 0.5);
  const out = [];
  for (let i = 0; shuffled.some((g) => i < g.length); i += 1) for (const g of shuffled) if (i < g.length) out.push(g[i]);
  return out;
}

/** A drill's questions (no answers: they come from verify-answer), interleaved across facts. */
async function drillQuestions(id, language = 'en', rng = Math.random) {
  const d = id.startsWith(MIX_PREFIX) ? mixDrill(id) : loadDrills().find((x) => x.id === id);
  if (!d) throw AppError.notFound('GK_DRILL_NOT_FOUND', 'Drill not found');
  const perFact = await publishedQuestionIds(d.facts);
  const rows = await Question.find({ _id: { $in: perFact.flat() }, status: 'PUBLISHED', lang_set: { $in: langSetsContaining(language) } })
    .select(PUBLIC_QUESTION_FIELDS)
    .lean();
  const byId = new Map(rows.map((q) => [String(q._id), q]));
  const groups = perFact.map((ids) => ids.map((x) => byId.get(x)).filter(Boolean)).filter((g) => g.length);
  const ordered = interleave(groups, rng).slice(0, d.max ?? MAX_QUESTIONS);
  return {
    drill: { id: d.id, title: compactLocalized(d.title), intro: compactLocalized(d.intro), facts: perFact.facts },
    questions: ordered.map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty })),
  };
}

module.exports = { listDrills, drillQuestions, validateDrills, interleave, loadDrills, useDrills, DRILLS_FILE, GROUPS };
