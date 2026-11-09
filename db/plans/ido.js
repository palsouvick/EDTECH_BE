'use strict';

/**
 * WBPSC IDO (Industrial Development Officer) preparation plan, Advt 15/2024.
 *
 * The student picks the preparation length — 30, 45 or 60 days — and a daily
 * study budget; src/services/idoPlan.service.js lays the same syllabus over the
 * chosen length (a shorter plan packs more sessions into a day; it never drops
 * a chapter). Session counts follow the official Part-I marks (detailed
 * advertisement, 5 Nov 2026): English 15, Industrial Safety & Pollution Control
 * 10, Environment & Energy 15, Physical Science 15, Computer Knowledge 10,
 * Industrial Scenario of West Bengal 15, Mental Ability & Arithmetic 20.
 *
 * The advertisement prints no topic-wise syllabus, only those seven headings;
 * the chapter lists below are preparation choices mapped onto the app's
 * existing chapters, not an official syllabus. Physical Science is served by
 * the General Science chapter (its physics subtopics carry most sessions).
 * Mental Ability & Arithmetic is split here as Arithmetic 12 + Mental Ability
 * 8 sessions/questions; the notice gives only the combined 20.
 *
 * Edit this file, not the generator, to change what is studied.
 */

const t = (en, bn) => ({ en, bn });

const VERSION = 1;

// Preparation lengths a student can choose, and the study budgets (minutes/day).
const DURATIONS = [30, 45, 60];
const BUDGETS = [120, 180, 240, 360];
const BASE_BUDGET = 180;

// Phase shares of the chosen length (the generator turns them into day ranges).
const PHASE_SHARES = [
  { code: 'FOUNDATION', share: 0.25, title: t('Phase 1 · Foundation', 'পর্ব ১ · ভিত্তি'), goal: t('Basic ideas and terms in every section. Nothing is assumed: start from zero.', 'প্রতিটি বিভাগের মূল ধারণা ও পরিভাষা। কিছুই জানা ধরে নেওয়া হয়নি: শূন্য থেকে শুরু।') },
  { code: 'CORE', share: 0.38, title: t('Phase 2 · Core preparation', 'পর্ব ২ · মূল প্রস্তুতি'), goal: t('Every chapter of the seven sections: concept → example → practice → mistakes → revision, getting harder step by step.', 'সাতটি বিভাগের প্রতিটি অধ্যায়: ধারণা → উদাহরণ → অনুশীলন → ভুল → রিভিশন, ধাপে ধাপে কঠিন।') },
  { code: 'PYQ', share: 0.2, title: t('Phase 3 · PYQ + exam practice', 'পর্ব ৩ · আগের প্রশ্ন + পরীক্ষার অনুশীলন'), goal: t('The real IDO 2019 paper, topic-wise previous questions and timed mixed sets in the official pattern.', 'আসল IDO ২০১৯ প্রশ্নপত্র, বিষয়ভিত্তিক আগের প্রশ্ন ও অফিসিয়াল ধাঁচে সময় ধরে মিশ্র সেট।') },
  { code: 'CAMP', share: 0.17, title: t('Phase 4 · Final exam camp', 'পর্ব ৪ · চূড়ান্ত পরীক্ষা-শিবির'), goal: t('Full mocks in the official pattern, revision, mistake correction, speed and accuracy. No new chapters.', 'অফিসিয়াল ধাঁচে পূর্ণ মক, রিভিশন, ভুল সংশোধন, গতি ও নির্ভুলতা। নতুন অধ্যায় নয়।') },
];

// Minutes per block on a normal day at the base budget (the generator also
// shrinks a day to the chosen budget, like the Clerkship plan does).
const BLOCKS = {
  FOUNDATION: { learn: 50, test: 25, spaced: 15 },
  CORE: { learn: 50, test: 25, spaced: 15 },
};
// Practice questions per learn session at the base budget, and the accuracy to aim for.
const PRACTICE = { quant: 15, english: 10, gs: 10, reasoning: 10 };
const ACCURACY = { FOUNDATION: 70, CORE: 75, PYQ: 70, CAMP: 80 };
// Daily mixed test at each budget: questions per subject block (a PYQ block on top).
const DAILY_TEST = { 120: 5, 180: 10, 240: 10, 360: 15 };
// Spaced revision: days after learning, and what happens then.
const SPACED = [
  { after: 2, kind: 'quick' },
  { after: 6, kind: 'test' },
  { after: 14, kind: 'revise' },
  { after: 29, kind: 'revise' },
];

// [topic, sessions, priority]. Order = study order within the subject queue.
// General Studies carries five of the seven official sections.
const GS = [
  ['industrial_safety', 3, 'MUST'], ['environment', 3, 'MUST'], ['general_science', 4, 'MUST'],
  ['wb_industry', 4, 'MUST'], ['computer_awareness', 3, 'IMPORTANT'],
  ['industrial_safety', 3, 'MUST'], ['environment', 3, 'MUST'], ['general_science', 3, 'MUST'],
  ['wb_industry', 3, 'MUST'], ['computer_awareness', 2, 'IMPORTANT'],
  ['economy', 2, 'ADDITIONAL'], ['west_bengal_gk', 2, 'ADDITIONAL'],
];
const ENGLISH = [
  ['grammar', 2, 'MUST'], ['one_word_substitution', 2, 'MUST'], ['synonyms_antonyms', 2, 'MUST'],
  ['fill_blanks', 1, 'IMPORTANT'], ['idioms_phrases', 1, 'IMPORTANT'], ['error_spotting', 1, 'IMPORTANT'],
  ['sentence_improvement', 1, 'IMPORTANT'], ['reading_comprehension', 1, 'ADDITIONAL'],
];
const ARITHMETIC = [
  ['number_system', 2, 'MUST'], ['percentage', 2, 'MUST'], ['simplification', 1, 'IMPORTANT'],
  ['ratio_proportion', 1, 'IMPORTANT'], ['average', 1, 'IMPORTANT'], ['profit_loss', 1, 'IMPORTANT'],
  ['interest', 1, 'ADDITIONAL'], ['time_work', 1, 'ADDITIONAL'], ['time_speed_distance', 1, 'ADDITIONAL'],
  ['algebra', 1, 'ADDITIONAL'],
];
const MENTAL_ABILITY = [
  ['series', 2, 'MUST'], ['coding_decoding', 2, 'MUST'], ['analogy', 1, 'IMPORTANT'],
  ['blood_relations', 1, 'IMPORTANT'], ['direction_sense', 1, 'IMPORTANT'], ['syllogism', 1, 'ADDITIONAL'],
];

// The seven official Part-I sections and the question-bank pools that serve them.
// Counts are the official marks; Mental Ability & Arithmetic (20) is split
// 12 Arithmetic + 8 Mental Ability here — the notice does not split it.
const SECTIONS = [
  { key: 'english', subject: 'english', topic: null, count: 15, title: t('English', 'ইংরেজি') },
  { key: 'safety', subject: 'gs', topic: 'industrial_safety', count: 10, title: t('Industrial Safety & Pollution Control', 'শিল্প নিরাপত্তা ও দূষণ নিয়ন্ত্রণ') },
  { key: 'environment', subject: 'gs', topic: 'environment', count: 15, title: t('Environment & Energy', 'পরিবেশ ও শক্তি') },
  { key: 'physical_science', subject: 'gs', topic: 'general_science', count: 15, title: t('Physical Science', 'ভৌত বিজ্ঞান') },
  { key: 'computer', subject: 'gs', topic: 'computer_awareness', count: 10, title: t('Elementary Computer Knowledge', 'প্রাথমিক কম্পিউটার জ্ঞান') },
  { key: 'wb_industry', subject: 'gs', topic: 'wb_industry', count: 15, title: t('Industrial Scenario of West Bengal', 'পশ্চিমবঙ্গের শিল্প পরিস্থিতি') },
  { key: 'arithmetic', subject: 'quant', topic: null, count: 12, title: t('Arithmetic', 'পাটিগণিত') },
  { key: 'mental_ability', subject: 'reasoning', topic: null, count: 8, title: t('Mental Ability', 'মানসিক দক্ষতা') },
];

const FULL_MOCK = {
  sizes: Object.fromEntries(SECTIONS.map((s) => [s.key, s.count])),
  minutes: 90,
  negative: 0.25,
};

// Phase 3: the only official IDO paper the Commission has published (2019),
// then topic-wise PYQ days on the chapters this exam weights most.
const PYQ_PAPERS = [['Industrial Development Officer', 2019]];
const PYQ_TOPIC_DAYS = [
  [['gs', 'industrial_safety'], ['gs', 'wb_industry']],
  [['gs', 'general_science'], ['gs', 'environment']],
  [['english', 'grammar'], ['quant', 'percentage']],
  [['gs', 'computer_awareness'], ['reasoning', 'series']],
];

// Final camp themes, in rotation; the last camp day is always 'strategy'.
const CAMP_THEMES = ['mock', 'gs_core', 'mistakes', 'mock', 'english_mental', 'weak'];
const CAMP_SUBJECTS = {
  gs_core: [['gs', 'industrial_safety'], ['gs', 'wb_industry'], ['gs', 'environment'], ['gs', 'general_science']],
  english_mental: [['english', null], ['reasoning', null], ['quant', null]],
};

module.exports = {
  code: 'IDO', version: VERSION, exam: 'WBPSC_IDO',
  DURATIONS, BUDGETS, BASE_BUDGET, PHASE_SHARES, BLOCKS, PRACTICE, ACCURACY, DAILY_TEST, SPACED,
  GS, ENGLISH, ARITHMETIC, MENTAL_ABILITY, SECTIONS, FULL_MOCK, PYQ_PAPERS, PYQ_TOPIC_DAYS,
  CAMP_THEMES, CAMP_SUBJECTS,
};
