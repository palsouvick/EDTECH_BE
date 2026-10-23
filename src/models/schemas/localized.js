'use strict';

const { Schema } = require('mongoose');
const { LANGUAGES } = require('../constants');

/**
 * Parallel-language text: { en, bn, hi } in one sub-document, so the client
 * switches language without another round trip.
 *
 * Bengali/Hindi have multiple Unicode encodings for the same glyph (e.g. য় as
 * U+09DF vs U+09AF U+09BC). Normalising to NFC on write keeps search, dedupe
 * and content hashing consistent.
 */
const normalize = (v) => (typeof v === 'string' ? v.normalize('NFC').trim() : v);

function buildLocalized(maxlength) {
  const fields = {};
  for (const lang of LANGUAGES) {
    fields[lang] = { type: String, set: normalize, maxlength };
  }
  return new Schema(fields, { _id: false, id: false });
}

/** Short strings: option text, titles, labels. */
const LocalizedText = buildLocalized(2000);
/** Markdown + KaTeX ($...$) bodies: stems, solution steps, topic notes. */
const LocalizedMarkdown = buildLocalized(20000);

/** Languages that have non-empty content in a localized value. */
function languagesOf(value) {
  if (!value) return [];
  return LANGUAGES.filter((l) => typeof value[l] === 'string' && value[l].length > 0);
}

const hasAnyLanguage = {
  validator: (v) => languagesOf(v).length > 0,
  message: 'At least one language (en/bn/hi) must be provided',
};

/**
 * Canonical language-set key, e.g. ['en','bn'] -> "bn_en".
 *
 * Why a scalar instead of an array: the main compound index already contains
 * one array field (exam_targets.category), and MongoDB cannot index two arrays
 * in one compound index ("cannot index parallel arrays"). A scalar set key is
 * queried with $in over every set containing the wanted language.
 */
function langSetKey(langs) {
  return LANGUAGES.filter((l) => langs.includes(l)).join('_');
}

/** All lang_set values that contain `lang`: 'bn' -> ['bn','bn_en','bn_hi','bn_en_hi']. */
function langSetsContaining(lang) {
  const others = LANGUAGES.filter((l) => l !== lang);
  const sets = [];
  for (let mask = 0; mask < 1 << others.length; mask++) {
    const combo = others.filter((_, i) => mask & (1 << i));
    sets.push(langSetKey([lang, ...combo]));
  }
  return sets;
}

/** Pick one language with English fallback. Returns { text, lang } or null. */
function pickLanguage(value, lang) {
  if (!value) return null;
  if (value[lang]) return { text: value[lang], lang };
  if (value.en) return { text: value.en, lang: 'en' };
  const first = languagesOf(value)[0];
  return first ? { text: value[first], lang: first } : null;
}

module.exports = {
  LocalizedText,
  LocalizedMarkdown,
  languagesOf,
  hasAnyLanguage,
  langSetKey,
  langSetsContaining,
  pickLanguage,
};
