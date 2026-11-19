'use strict';

/**
 * Table of contents of the শিল্প নিরাপত্তা ও দূষণ নিয়ন্ত্রণ book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/industrial_safety/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'workplace', title: 'কর্মস্থল' },
  { code: 'hazards_environment', title: 'বিপদ ও পরিবেশ' },
  { code: 'mixed', title: 'মিশ্র' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `SAF-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'workplace', 'কারখানা নিরাপত্তা ও আইন', { subtopics: ['factory_safety'] }),
  c(2, 'workplace', 'পেশাগত স্বাস্থ্য ও PPE', { subtopics: ['occupational_health'] }),
  c(3, 'workplace', 'অগ্নি নিরাপত্তা', { subtopics: ['fire_safety'] }),
  c(4, 'workplace', 'বৈদ্যুতিক নিরাপত্তা', { subtopics: ['electrical_safety'] }),
  c(5, 'hazards_environment', 'রাসায়নিক ও বিপর্যয় নিরাপত্তা', { subtopics: ['chemical_safety'] }),
  c(6, 'hazards_environment', 'দূষণ নিয়ন্ত্রণ', { subtopics: ['pollution_control'] }),
  c(7, 'mixed', 'মিশ্র অনুশীলনী', { subtopics: ['mixed'] })
]);

module.exports = { book: 'industrial_safety', title: 'শিল্প নিরাপত্তা ও দূষণ নিয়ন্ত্রণ', PARTS, CHAPTERS };
