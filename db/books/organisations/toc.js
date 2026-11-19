'use strict';

/**
 * Table of contents of the সদর দপ্তর ও সংস্থা book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/organisations/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'world', title: 'বিশ্ব' },
  { code: 'india', title: 'ভারত' },
  { code: 'heads_mixed', title: 'প্রধান ও মিশ্র' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `ORG-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'world', 'জাতিসংঘ ও বিশেষায়িত সংস্থা', { subtopics: ['un_system'] }),
  c(2, 'world', 'আর্থিক ও বাণিজ্য সংস্থা', { subtopics: ['financial_bodies'] }),
  c(3, 'world', 'বৈশ্বিক গোষ্ঠী ও জোট', { subtopics: ['global_groups'] }),
  c(4, 'india', 'ভারতীয় প্রতিষ্ঠান ও নিয়ন্ত্রক', { subtopics: ['indian_bodies'] }),
  c(5, 'heads_mixed', 'বর্তমান প্রধানগণ', { subtopics: ['current_heads'] }),
  c(6, 'heads_mixed', 'মিশ্র অনুশীলনী', { subtopics: ['mixed'] })
]);

module.exports = { book: 'organisations', title: 'সদর দপ্তর ও সংস্থা', PARTS, CHAPTERS };
