'use strict';

/**
 * Table of contents of the পশ্চিমবঙ্গের শিল্পচিত্র book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/wb_industry/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'heritage', title: 'ঐতিহ্য' },
  { code: 'present', title: 'বর্তমান' },
  { code: 'policy_support', title: 'নীতি ও সহায়তা' },
  { code: 'mixed', title: 'মিশ্র' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `WBI-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'heritage', 'শিল্পের শিকড় ও ঐতিহ্য', { subtopics: ['industrial_roots'] }),
  c(2, 'present', 'MSME ক্ষেত্র', { subtopics: ['msme_sector'] }),
  c(3, 'present', 'প্রধান শিল্প ও ক্লাস্টার', { subtopics: ['key_industries'] }),
  c(4, 'present', 'শিল্পাঞ্চল ও পার্ক', { subtopics: ['industrial_areas'] }),
  c(5, 'policy_support', 'শিল্পনীতি ও সংস্থা', { subtopics: ['industrial_policy'] }),
  c(6, 'policy_support', 'সহায়তা প্রকল্প ও পরিষেবা', { subtopics: ['support_schemes'] }),
  c(7, 'mixed', 'মিশ্র অনুশীলনী', { subtopics: ['mixed'] })
]);

module.exports = { book: 'wb_industry', title: 'পশ্চিমবঙ্গের শিল্পচিত্র', PARTS, CHAPTERS };
