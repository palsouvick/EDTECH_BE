'use strict';

/**
 * Table of contents of the জাতীয় প্রতীক, প্রথম ও প্রতিষ্ঠান book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/indian_gk/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'symbols_firsts', title: 'প্রতীক ও প্রথম' },
  { code: 'india_map', title: 'ভারতের মানচিত্র' },
  { code: 'institutions', title: 'প্রতিষ্ঠান' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `IGK-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'symbols_firsts', 'জাতীয় প্রতীক', { subtopics: ['national_symbols'] }),
  c(2, 'symbols_firsts', 'ভারতের প্রথমগুলি', { subtopics: ['important_firsts'] }),
  c(3, 'india_map', 'রাজ্য ও রাজধানী', { subtopics: ['states_capitals'] }),
  c(4, 'india_map', 'কেন্দ্রশাসিত অঞ্চল', { subtopics: ['union_territories'] }),
  c(5, 'institutions', 'প্রতিষ্ঠান ও সদর দপ্তর (সারাংশ)', { subtopics: ['institutions_hq'] }),
  c(6, 'institutions', 'জাতীয় উদ্যান ও বাঁধ (সারাংশ)', { subtopics: ['national_parks_dams'] }),
  c(7, 'institutions', 'বিবিধ: ভারত এক নজরে', { subtopics: ['misc'] })
]);

module.exports = { book: 'indian_gk', title: 'জাতীয় প্রতীক, প্রথম ও প্রতিষ্ঠান', PARTS, CHAPTERS };
