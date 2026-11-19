'use strict';

/**
 * Table of contents of the স্ট্যাটিক জিকে book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/static_gk/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'knowledge', title: 'জ্ঞান' },
  { code: 'world_sport', title: 'বিশ্ব ও খেলা' },
  { code: 'links', title: 'সংযোগ' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `STG-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'knowledge', 'বই ও লেখক', { subtopics: ['books_authors'] }),
  c(2, 'knowledge', 'পুরস্কার ও সম্মান', { subtopics: ['awards_honours'] }),
  c(3, 'knowledge', 'আদমশুমারি ও পরিসংখ্যান', { subtopics: ['census_statistics'] }),
  c(4, 'world_sport', 'খেলাধুলা', { subtopics: ['sports_games'] }),
  c(5, 'world_sport', 'দেশ, রাজধানী ও মুদ্রা', { subtopics: ['countries_capitals'] }),
  c(6, 'links', 'গুরুত্বপূর্ণ দিবস (সারাংশ)', { subtopics: ['important_days'] }),
  c(7, 'links', 'আন্তর্জাতিক সংস্থা (সারাংশ)', { subtopics: ['international_orgs'] })
]);

module.exports = { book: 'static_gk', title: 'স্ট্যাটিক জিকে', PARTS, CHAPTERS };
