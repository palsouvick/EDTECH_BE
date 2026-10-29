'use strict';

const { LANGUAGES } = require('../models/constants');
const { pickLanguage } = require('../models/schemas/localized');
const { isVerifiedPaperRef } = require('./questionProvenance');
const { hardPattern } = require('./hardBanks');
const DIFFICULTY_LABELS = {
  1: { en: 'Easy', bn: 'সহজ' },
  2: { en: 'Easy', bn: 'সহজ' },
  3: { en: 'Medium-Hard', bn: 'মাঝারি-কঠিন' },
  4: { en: 'Hard', bn: 'কঠিন' },
  5: { en: 'Advanced Hard', bn: 'উন্নত কঠিন' },
};

/**
 * Shape DB documents into API responses. Every field is whitelisted, so an
 * answer field added to the schema later cannot leak through a response.
 */

/** Drop empty languages: { en: 'x', bn: undefined } -> { en: 'x' }. */
function compactLocalized(value) {
  if (!value) return null;
  const out = {};
  for (const l of LANGUAGES) if (value[l]) out[l] = value[l];
  return Object.keys(out).length ? out : null;
}

/** Fields the exam-facing read needs. Contains nothing that reveals the answer. */
const PUBLIC_QUESTION_FIELDS =
  'code subject topic subtopic difficulty pattern provenance source_reference lang_set stem options media pyq.is_pyq pyq.refs.exam_name pyq.refs.year pyq.refs.shift pyq.refs.tier pyq.refs.question_code pyq.refs.source_url pyq.refs.answer_key_url +duplicate_keys';

/**
 * Questions keep every available language so the client can toggle language
 * instantly; stems and options are small, so this costs little.
 */
function presentQuestion(q, extra = {}) {
  return {
    questionId: String(q._id),
    ...extra,
    topic: q.topic,
    subtopic: q.subtopic ?? null,
    difficulty: q.difficulty,
    difficultyLabel: DIFFICULTY_LABELS[q.difficulty] ?? null,
    pattern: q.pattern ?? null,
    patternName: hardPattern(q.topic, q.pattern)?.name ?? null,
    // Hard-bank patterns say whether they are inside the WBPSC Clerkship Part-I syllabus;
    // null for questions without that information.
    inClerkshipSyllabus: hardPattern(q.topic, q.pattern)?.clerkship ?? null,
    fingerprint: q.duplicate_keys?.[0] ?? null,
    provenance: q.provenance ?? 'UNCLASSIFIED',
    sourceReference: q.source_reference ?? null,
    languages: q.lang_set.split('_'),
    stem: compactLocalized(q.stem),
    media: (q.media || []).map((m) => ({ url: m.url, kind: m.kind, alt: compactLocalized(m.alt) })),
    options: q.options.map((o) => ({ optionId: o.oid, text: compactLocalized(o.text) })),
    // Students see a PYQ badge only for a reference backed by the commission's own
    // paper and answer key (see questionProvenance.js); other refs stay editor-only.
    pyq: q.pyq?.is_pyq
      ? q.pyq.refs.filter(isVerifiedPaperRef).map((r) => ({ examName: r.exam_name, year: r.year, tier: r.tier ?? null, shift: r.shift ?? null, sourceUrl: r.source_url }))
      : [],
  };
}

/**
 * Topic sheets are long Markdown, so only one language is returned (with
 * English fallback). `fallbackUsed` tells the client some blocks are not in
 * the requested language yet.
 */
function presentTopicSummary(summary, lang, category) {
  if (!summary) return null;
  let fallbackUsed = false;
  const pick = (v) => {
    const p = pickLanguage(v, lang);
    if (!p) return null;
    if (p.lang !== lang) fallbackUsed = true;
    return p.text;
  };

  const result = {
    slug: summary.slug,
    title: pick(summary.title),
    overview: pick(summary.overview),
    formulas: (summary.formulas || []).map((f) => ({
      key: f.key,
      label: pick(f.label),
      latex: f.latex,
      variables: (f.variables || []).map((v) => ({ symbol: v.symbol, meaning: pick(v.meaning) })),
      explanation: pick(f.explanation),
    })),
    derivationRules: (summary.derivation_rules || []).map((r) => ({ title: pick(r.title), body: pick(r.body) })),
    speedTricks: (summary.speed_tricks || []).map((t) => ({
      title: pick(t.title),
      body: pick(t.body),
      approxTimeSavedSec: t.approx_time_saved_sec ?? null,
    })),
    commonTraps: (summary.common_traps || []).map(pick).filter(Boolean),
    syllabus: (summary.syllabus_map || [])
      .filter((s) => s.category === category)
      .map((s) => ({
        tier: s.tier,
        examCodes: s.exam_codes,
        section: pick(s.section),
        avgQuestionsPerPaper: s.avg_questions_per_paper ?? null,
      })),
  };
  return { language: lang, fallbackUsed, ...result };
}

/**
 * Same sheet with every available language kept, for clients that switch
 * language instantly on-device (the study page concept hub).
 */
function presentTopicSummaryAllLanguages(summary, category) {
  if (!summary) return null;
  const L = compactLocalized;
  return {
    slug: summary.slug,
    title: L(summary.title),
    overview: L(summary.overview),
    formulas: (summary.formulas || []).map((f) => ({
      key: f.key,
      label: L(f.label),
      latex: f.latex,
      variables: (f.variables || []).map((v) => ({ symbol: v.symbol, meaning: L(v.meaning) })),
      explanation: L(f.explanation),
    })),
    derivationRules: (summary.derivation_rules || []).map((r) => ({ title: L(r.title), body: L(r.body) })),
    speedTricks: (summary.speed_tricks || []).map((t) => ({
      title: L(t.title),
      body: L(t.body),
      approxTimeSavedSec: t.approx_time_saved_sec ?? null,
    })),
    commonTraps: (summary.common_traps || []).map(L).filter(Boolean),
    syllabus: (summary.syllabus_map || [])
      .filter((s) => s.category === category)
      .map((s) => ({
        tier: s.tier,
        examCodes: s.exam_codes,
        section: L(s.section),
        avgQuestionsPerPaper: s.avg_questions_per_paper ?? null,
      })),
  };
}

module.exports = {
  PUBLIC_QUESTION_FIELDS,
  compactLocalized,
  presentQuestion,
  presentTopicSummary,
  presentTopicSummaryAllLanguages,
};
