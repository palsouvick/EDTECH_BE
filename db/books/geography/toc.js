'use strict';

/**
 * Table of contents of the Geography book (docs/GEOGRAPHY_BOOK_PLAN.md §3). On 2026-11-13 the owner asked for
 * only the chapters exams ask most about, so world physical geography is one chapter and India and West Bengal
 * carry the book. A chapter is "available" when its file (db/books/geography/<file>.json) exists and is
 * PUBLISHED; the others are listed as "coming soon". `weight` = many PYQs (★), `bengal` = West Bengal (🐅).
 */

const PARTS = Object.freeze([
  { code: 'india_land', title: 'ভারত: ভূপ্রকৃতি ও জলবায়ু' },
  { code: 'india_resources', title: 'ভারত: সম্পদ, অর্থনীতি ও জনসংখ্যা' },
  { code: 'west_bengal', title: 'পশ্চিমবঙ্গ' },
  { code: 'earth_world', title: 'পৃথিবী ও বিশ্ব' },
]);

const c = (number, part, title, { weight = false, bengal = false, subtopics = [] } = {}) => ({
  code: `GEO-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  weight,
  bengal,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'india_land', 'ভারত: অবস্থান, আয়তন, প্রতিবেশী দেশ, রাজ্য ও রাজধানী', { weight: true, subtopics: ['physical_india', 'states_capitals'] }),
  c(2, 'india_land', 'ভারতের প্রাকৃতিক বিভাগ: হিমালয়, সমভূমি, মালভূমি, মরুভূমি, উপকূল ও দ্বীপ', { weight: true, subtopics: ['physical_india', 'mountains_plateaus'] }),
  c(3, 'india_land', 'ভারতের নদনদী ও হ্রদ', { weight: true, subtopics: ['rivers'] }),
  c(4, 'india_land', 'ভারতের জলবায়ু: মৌসুমি বায়ু ও ঋতু', { weight: true, subtopics: ['climate_soil'] }),
  c(5, 'india_land', 'মৃত্তিকা, স্বাভাবিক উদ্ভিদ, জাতীয় উদ্যান ও অভয়ারণ্য', { weight: true, subtopics: ['climate_soil', 'parks_sanctuaries'] }),
  c(6, 'india_resources', 'জলসম্পদ, বাঁধ ও বহুমুখী নদী পরিকল্পনা', { weight: true, subtopics: ['dams_projects'] }),
  c(7, 'india_resources', 'ভারতের কৃষি', { weight: true, subtopics: ['agriculture'] }),
  c(8, 'india_resources', 'খনিজ ও শক্তি সম্পদ', { weight: true, subtopics: ['minerals_resources'] }),
  c(9, 'india_resources', 'ভারতের শিল্প', { weight: true, subtopics: ['minerals_resources'] }),
  c(10, 'india_resources', 'পরিবহণ, যোগাযোগ ও জনসংখ্যা', { subtopics: ['transport_population'] }),
  c(11, 'west_bengal', 'পশ্চিমবঙ্গ: অবস্থান, ভূপ্রকৃতি ও জেলা', { weight: true, bengal: true, subtopics: ['west_bengal_geography'] }),
  c(12, 'west_bengal', 'পশ্চিমবঙ্গের নদনদী', { weight: true, bengal: true, subtopics: ['west_bengal_geography', 'rivers'] }),
  c(13, 'west_bengal', 'পশ্চিমবঙ্গের জলবায়ু, মৃত্তিকা, অরণ্য ও সুন্দরবন', { bengal: true, subtopics: ['west_bengal_geography'] }),
  c(14, 'west_bengal', 'পশ্চিমবঙ্গের কৃষি, খনিজ, শিল্প ও পরিবহণ', { weight: true, bengal: true, subtopics: ['west_bengal_geography'] }),
  c(15, 'earth_world', 'পৃথিবী: সৌরজগৎ, অক্ষাংশ-দ্রাঘিমাংশ, গতি, বায়ুমণ্ডল, শিলা ও মহাসাগর', { subtopics: ['physical_geography'] }),
  c(16, 'earth_world', 'বিশ্ব: মহাদেশ, দেশ, প্রণালী, খাল, হ্রদ ও শৃঙ্গ', { weight: true, subtopics: ['world_geography', 'world_features'] }),
]);

module.exports = { book: 'geography', title: 'ভূগোল', PARTS, CHAPTERS };
