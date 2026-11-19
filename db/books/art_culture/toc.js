'use strict';

/**
 * Table of contents of the শিল্প ও সংস্কৃতি book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/art_culture/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'performing', title: 'পরিবেশন শিল্প' },
  { code: 'visual_heritage', title: 'দৃশ্য ও ঐতিহ্য' },
  { code: 'living', title: 'জীবন্ত সংস্কৃতি' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `ART-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'performing', 'ভারতীয় নৃত্য', { subtopics: ['dance'] }),
  c(2, 'performing', 'ভারতীয় সংগীত', { subtopics: ['music'] }),
  c(3, 'visual_heritage', 'চিত্রকলা ও হস্তশিল্প', { subtopics: ['painting'] }),
  c(4, 'visual_heritage', 'স্থাপত্য ও স্মৃতিস্তম্ভ', { subtopics: ['architecture'] }),
  c(5, 'living', 'উৎসব', { subtopics: ['festivals'] }),
  c(6, 'visual_heritage', 'ইউনেস্কো বিশ্ব ঐতিহ্য', { subtopics: ['unesco_sites'] })
]);

module.exports = { book: 'art_culture', title: 'শিল্প ও সংস্কৃতি', PARTS, CHAPTERS };
