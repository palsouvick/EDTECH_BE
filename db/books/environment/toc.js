'use strict';

/**
 * Table of contents of the পরিবেশ ও বাস্তুতন্ত্র book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/environment/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'ecology', title: 'বাস্তুতন্ত্র' },
  { code: 'threats', title: 'ঝুঁকি' },
  { code: 'protection', title: 'সংরক্ষণ' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `ENV-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'ecology', 'বাস্তুতন্ত্র', { subtopics: ['ecosystems'] }),
  c(2, 'ecology', 'জীববৈচিত্র্য', { subtopics: ['biodiversity'] }),
  c(3, 'threats', 'দূষণ', { subtopics: ['pollution'] }),
  c(4, 'threats', 'জলবায়ু পরিবর্তন', { subtopics: ['climate_change'] }),
  c(5, 'protection', 'আন্তর্জাতিক চুক্তি ও সম্মেলন', { subtopics: ['conventions'] }),
  c(6, 'protection', 'সংরক্ষিত এলাকা ও পরিবেশ আইন', { subtopics: ['protected_areas'] }),
  c(7, 'protection', 'শক্তি সংরক্ষণ ও নবায়নযোগ্য শক্তি', { subtopics: ['energy'] })
]);

module.exports = { book: 'environment', title: 'পরিবেশ ও বাস্তুতন্ত্র', PARTS, CHAPTERS };
