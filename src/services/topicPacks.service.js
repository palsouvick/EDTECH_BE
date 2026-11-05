'use strict';

/**
 * GK topic packs (db/gk/README.md, "Topic packs"): facts that gather a whole topic for
 * one-place revision. This module finds the packs connected to any fact ("You should also
 * learn"), lists a chapter's packs in knowledge-map order, serves a fact's own practice
 * questions, and finds the real past-paper questions a pack's terms appear in.
 */

const { GkFact, Question } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const { PUBLIC_QUESTION_FIELDS, presentQuestion, compactLocalized } = require('./presenters');
const AppError = require('../utils/AppError');

const TTL_MS = 2 * 60_000;
const MAX_RELATED = 3;
const REAL_PAPER = ['OFFICIAL_VERIFIED', 'ADAPTED_PYQ'];
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let cache = { at: 0, packs: null };
function clearPackCache() {
  cache = { at: 0, packs: null };
}

/** Published packs with what is needed to match and list them, cached briefly. */
async function packs() {
  if (cache.packs && Date.now() - cache.at < TTL_MS) return cache.packs;
  const rows = await GkFact.find({ status: 'PUBLISHED', pack: { $exists: true } })
    .select('code topic subtopic title pack.keywords pack.order pack.related')
    .lean();
  const list = rows.map((r) => ({
    code: r.code,
    topic: r.topic,
    subtopic: r.subtopic,
    title: compactLocalized(r.title),
    order: r.pack?.order ?? 0,
    related: r.pack?.related || [],
    // English keywords match whole words, any case; Bengali keywords match as written.
    en: (r.pack?.keywords?.en || []).map((w) => new RegExp(`\\b${escapeRegex(w)}\\b`, 'i')),
    bn: r.pack?.keywords?.bn || [],
  }));
  cache = { at: Date.now(), packs: list };
  return list;
}

const brief = (p) => ({ code: p.code, topic: p.topic, title: p.title });

/**
 * For each fact, the packs it connects to (at most 3): packs whose keywords appear in the
 * fact's title, statement or explanation, and packs that list the fact as related.
 * @returns {Map<string, {code, topic, title}[]>} by fact id
 */
async function relatedPacksFor(facts) {
  const all = await packs();
  const out = new Map();
  if (!all.length) return out;
  for (const f of facts) {
    const en = [f.title?.en, f.statement?.en, f.explanation?.en].filter(Boolean).join(' ');
    const bn = [f.title?.bn, f.statement?.bn, f.explanation?.bn].filter(Boolean).join(' ');
    const hits = all.filter((p) => p.code !== f.code && (p.related.includes(f.code) || p.en.some((re) => re.test(en)) || p.bn.some((w) => bn.includes(w))));
    out.set(String(f._id), hits.slice(0, MAX_RELATED).map(brief));
  }
  return out;
}

/** A chapter's packs in knowledge-map order, for the chapter page. */
async function packsForCard(topics) {
  return (await packs())
    .filter((p) => topics.includes(p.topic))
    .sort((a, b) => a.order - b.order || a.code.localeCompare(b.code))
    .map((p) => ({ ...brief(p), subtopic: p.subtopic, order: p.order }));
}

async function publishedFact(code, select) {
  const f = await GkFact.findOne({ code: code.toUpperCase(), status: 'PUBLISHED' }).select(select).lean();
  if (!f) throw AppError.notFound('GK_FACT_NOT_FOUND', 'Fact not found');
  return f;
}

/** The practice questions written for one fact (no answers: they come from verify-answer). */
async function factQuestions(code, language = 'en') {
  const f = await publishedFact(code, 'question_ids');
  const rows = await Question.find({ _id: { $in: f.question_ids || [] }, status: 'PUBLISHED', lang_set: { $in: langSetsContaining(language) } })
    .select(PUBLIC_QUESTION_FIELDS)
    .lean();
  return { questions: rows.map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty })) };
}

/** Mongo filter for the real past-paper questions that mention any of a pack's terms (stem, options or explanation). */
async function pyqFilterFor(code) {
  const f = await publishedFact(code, 'pack.pyq_terms');
  const terms = f.pack?.pyq_terms || [];
  if (!terms.length) return null;
  const re = new RegExp(`\\b(?:${terms.map(escapeRegex).join('|')})`, 'i');
  // The explanation counts too: "Who first used tulughma in India?" is a Panipat question
  // although only its explanation names the battle.
  return { status: 'PUBLISHED', provenance: { $in: REAL_PAPER }, 'pyq.is_pyq': true, $or: [{ 'stem.en': re }, { 'options.text.en': re }, { 'solution.steps.en': re }] };
}

/** Up to 20 related real PYQs (newest paper first) and how many there are in all. */
async function relatedPyqs(code, language = 'en') {
  const filter = await pyqFilterFor(code);
  if (!filter) return { total: 0, questions: [] };
  filter.lang_set = { $in: langSetsContaining(language) };
  const [rows, total] = await Promise.all([
    Question.find(filter).select(PUBLIC_QUESTION_FIELDS).sort({ latest_pyq_year: -1, _id: 1 }).limit(20).lean(),
    Question.countDocuments(filter),
  ]);
  return { total, questions: rows.map((q) => presentQuestion(q, { subject: q.subject, difficulty: q.difficulty })) };
}

module.exports = { relatedPacksFor, packsForCard, factQuestions, relatedPyqs, pyqFilterFor, clearPackCache };
