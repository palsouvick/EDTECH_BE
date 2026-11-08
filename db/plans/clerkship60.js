'use strict';

/**
 * WBPSC Clerkship Part-I: 60-day plan, version 2 (English 30 + General Studies 40 +
 * Arithmetic 30 questions; Clerkship 2024 scheme, db/seed/exams.js).
 *
 * Four phases: Foundation (1–15), Core (16–35), PYQ + exam practice (36–50) and a final
 * exam camp (51–60) with a fixed theme per day. Every 7th day up to Day 49 is a weekly test.
 * Sessions per chapter follow the WBPSC past-paper priorities (GET /pyq/priorities, 10 papers,
 * checked 5 Nov 2026): Must know 3, Important 2, Additional 1; in General Studies, roughly the
 * PYQ share (Indian History carries 34%). Chapters are ordered easiest-first in each subject.
 *
 * Minutes and question counts are written for a 3-hour day and scaled by the generator
 * (src/services/studyPlan.service.js) for 2, 4 or 6 hours. The syllabus pace never changes
 * with the budget: a longer day means more practice, not more chapters.
 *
 * Edit this file, not the generator, to change what is studied.
 */

const t = (en, bn) => ({ en, bn });

const VERSION = 2;

const PHASES = [
  { code: 'FOUNDATION', from: 1, to: 15, title: t('Phase 1 · Foundation', 'পর্ব ১ · ভিত্তি'), goal: t('Basic ideas and terms in every subject. Nothing is assumed: start from zero.', 'প্রতিটি বিষয়ের মূল ধারণা ও পরিভাষা। কিছুই জানা ধরে নেওয়া হয়নি: শূন্য থেকে শুরু।') },
  { code: 'CORE', from: 16, to: 35, title: t('Phase 2 · Core preparation', 'পর্ব ২ · মূল প্রস্তুতি'), goal: t('Every important chapter: concept → example → practice → mistakes → revision → PYQ, getting harder step by step.', 'প্রতিটি গুরুত্বপূর্ণ অধ্যায়: ধারণা → উদাহরণ → অনুশীলন → ভুল → রিভিশন → আগের প্রশ্ন, ধাপে ধাপে কঠিন।') },
  { code: 'PYQ', from: 36, to: 50, title: t('Phase 3 · PYQ + exam practice', 'পর্ব ৩ · আগের প্রশ্ন + পরীক্ষার অনুশীলন'), goal: t('How WBPSC actually asks: real papers, topic-wise PYQs, timed mixed sets, repeated traps.', 'WBPSC আসলে কীভাবে প্রশ্ন করে: আসল প্রশ্নপত্র, বিষয়ভিত্তিক আগের প্রশ্ন, সময় ধরে মিশ্র সেট, বারবার আসা ফাঁদ।') },
  { code: 'CAMP', from: 51, to: 60, title: t('Phase 4 · Final exam camp', 'পর্ব ৪ · চূড়ান্ত পরীক্ষা-শিবির'), goal: t('Revision, full mock tests, mistake correction, speed and accuracy. No new chapters.', 'রিভিশন, পূর্ণ মক টেস্ট, ভুল সংশোধন, গতি ও নির্ভুলতা। নতুন অধ্যায় নয়।') },
];

const WEEKLY_TEST_DAYS = [7, 14, 21, 28, 35, 42, 49];

// Study time a student can choose (minutes a day); the plan is written for 180.
const BUDGETS = [120, 180, 240, 360];
const BASE_BUDGET = 180;

// Minutes per block on a normal day at the base budget.
const BLOCKS = {
  FOUNDATION: { quant: 50, english: 45, gs: 45, test: 25, spaced: 15 },
  CORE: { quant: 50, english: 40, gs: 50, test: 25, spaced: 15 },
};
// Practice questions per learn session at the base budget, and the accuracy to aim for.
const PRACTICE = { quant: 15, english: 10, gs: 10 };
const ACCURACY = { FOUNDATION: 70, CORE: 75, PYQ: 70, CAMP: 80 };
// Daily mixed test at each budget: questions per block (Math, English, GS, real PYQs).
const DAILY_TEST = { 120: 5, 180: 10, 240: 10, 360: 15 };
// Spaced revision: days after learning, and what happens then.
const SPACED = [
  { after: 2, kind: 'quick' },
  { after: 6, kind: 'test' },
  { after: 14, kind: 'revise' },
  { after: 29, kind: 'revise' },
];

// [topic, sessions, priority]. Order = study order.
const ARITHMETIC = [
  ['number_system', 3, 'MUST'], ['simplification', 2, 'IMPORTANT'], ['percentage', 3, 'MUST'], ['ratio_proportion', 3, 'MUST'],
  ['average', 2, 'IMPORTANT'], ['profit_loss', 2, 'IMPORTANT'], ['interest', 1, 'ADDITIONAL'], ['time_work', 2, 'IMPORTANT'],
  ['time_speed_distance', 2, 'IMPORTANT'], ['algebra', 2, 'IMPORTANT'], ['mixture_alligation', 1, 'ADDITIONAL'],
  ['partnership', 1, 'ADDITIONAL'], ['ages', 1, 'ADDITIONAL'], ['pipes_cistern', 1, 'ADDITIONAL'], ['mensuration', 1, 'ADDITIONAL'],
];
// Foundation grammar first (not separately counted in PYQs: no tag), then the PYQ-heavy chapters.
const ENGLISH = [
  ['parts_of_speech', 2, null], ['articles', 2, null], ['tenses', 3, null], ['grammar', 3, 'MUST'],
  ['synonyms_antonyms', 3, 'MUST'], ['fill_blanks', 2, 'MUST'], ['voice', 2, null], ['narration', 2, null],
  ['idioms_phrases', 2, 'MUST'], ['one_word_substitution', 2, 'MUST'], ['modals_conditionals', 2, null],
  ['error_spotting', 2, 'ADDITIONAL'], ['sentence_improvement', 1, 'ADDITIONAL'], ['reading_comprehension', 2, 'ADDITIONAL'],
];
// GS share of WBPSC PYQs: history 34%, science 16.5%, current affairs 14%, geography 12%,
// polity 10%, economy 7%, WB GK 6%. GK-only cards get one or two sessions as exam basics.
const GS = [
  ['polity', 1, 'MUST'], ['geography', 1, 'MUST'], ['indian_history', 1, 'MUST'], ['important_days', 1, null],
  ['general_science', 1, 'MUST'], ['west_bengal_gk', 1, 'IMPORTANT'], ['indian_history', 2, 'MUST'], ['polity', 2, 'MUST'],
  ['geography', 2, 'MUST'], ['general_science', 2, 'MUST'], ['current_affairs', 2, 'MUST'], ['economy', 2, 'IMPORTANT'],
  ['indian_history', 2, 'MUST'], ['west_bengal_gk', 1, 'IMPORTANT'], ['organisations', 1, null], ['general_science', 1, 'MUST'],
  ['indian_history', 1, 'MUST'], ['geography', 1, 'MUST'], ['polity', 1, 'MUST'], ['important_days', 1, null],
  ['current_affairs', 1, 'MUST'], ['static_gk', 1, null], ['west_bengal_gk', 1, 'IMPORTANT'],
];
// Connected topic pages (GK topic packs) studied with a chapter's sessions, in session order.
const GS_PACKS = {
  // Each list sits on the session whose GK subcategories it belongs to (sessions split the
  // card's subcategories in order): history 1 = IVC, Vedic, Buddhism/Jainism; 2 = mahajanapadas,
  // Mauryas/Guptas; 3 = Marathas, Sultanate, Mughals. Geography 2 = rivers. Polity 2 = Union
  // executive. Science 3 = nutrition.
  indian_history: [['GK-HIS-104', 'GK-HIS-101', 'GK-HIS-105'], ['GK-HIS-106', 'GK-HIS-103', 'GK-HIS-107'], ['GK-HIS-102'], [], [], []],
  geography: [[], ['GK-GEO-101'], [], []],
  polity: [[], ['GK-POL-101'], [], []],
  general_science: [[], [], ['GK-SCI-101'], []],
};
// Read if time permits: offered on weekly test days, never required.
const GS_OPTIONAL = ['art_culture', 'environment', 'computer_awareness'];

// Phase 3: one real paper on most days, the most relevant first (Clerkship, then the newest WBCS).
const PYQ_PAPERS = [
  ['WBPSC Clerkship (Part-I)', 2023], ['WBCS (Exe.) Prelims', 2024], ['WBCS (Exe.) Prelims', 2023], ['WBCS (Exe.) Prelims', 2022],
  ['WBCS (Exe.) Prelims', 2021], ['WBCS (Exe.) Prelims', 2019], ['WBCS (Exe.) Prelims', 2018], ['WBCS (Exe.) Prelims', 2017],
  ['WBCS (Exe.) Prelims', 2016], ['WBCS (Exe.) Prelims', 2015],
];
// Phase 3 topic-wise PYQ days: the chapters WBPSC asks most (GET /pyq/priorities).
const PYQ_TOPIC_DAYS = [
  [['gs', 'indian_history'], ['quant', 'number_system'], ['english', 'grammar']],
  [['gs', 'general_science'], ['quant', 'percentage'], ['english', 'fill_blanks']],
  [['gs', 'geography'], ['gs', 'polity'], ['english', 'synonyms_antonyms']],
];

// The Clerkship Part-I paper: 30 English, 40 GS, 30 Arithmetic in 90 minutes, −0.25 per wrong answer.
const FULL_MOCK = { sizes: { english: 30, gs: 40, quant: 30, pyq: 0 }, minutes: 90, negative: 0.25 };

// Days 51–60, in order.
const CAMP = [
  { theme: 'all', title: t('Full revision: every subject at a glance', 'পূর্ণ রিভিশন: এক নজরে সব বিষয়') },
  { theme: 'math_english', title: t('Math + English revision', 'গণিত + ইংরেজি রিভিশন') },
  { theme: 'gk_history', title: t('GK + History revision', 'সাধারণ জ্ঞান + ইতিহাস রিভিশন') },
  { theme: 'geo_polity', title: t('Geography + Polity revision', 'ভূগোল + রাষ্ট্রব্যবস্থা রিভিশন') },
  { theme: 'science_ca', title: t('Science + Current Affairs', 'বিজ্ঞান + সাম্প্রতিক ঘটনা') },
  { theme: 'mock', title: t('Full mock test (exam pattern)', 'পূর্ণ মক টেস্ট (পরীক্ষার ধাঁচে)') },
  { theme: 'mistakes', title: t('Mistake revision', 'ভুল সংশোধনের রিভিশন') },
  { theme: 'mock', title: t('Full mock test (exam pattern)', 'পূর্ণ মক টেস্ট (পরীক্ষার ধাঁচে)') },
  { theme: 'must_know', title: t('Final high-priority revision', 'শেষ উচ্চ-অগ্রাধিকারের রিভিশন') },
  { theme: 'strategy', title: t('Exam strategy + light revision', 'পরীক্ষার কৌশল + হালকা রিভিশন') },
];
const CAMP_SUBJECTS = {
  all: [['quant', null], ['english', null], ['gs', null]],
  math_english: [['quant', null], ['english', null]],
  gk_history: [['gs', 'indian_history'], ['gs', 'important_days'], ['gs', 'organisations'], ['gs', 'static_gk'], ['gs', 'west_bengal_gk']],
  geo_polity: [['gs', 'geography'], ['gs', 'polity'], ['gs', 'economy']],
  science_ca: [['gs', 'general_science'], ['gs', 'current_affairs']],
  must_know: [['quant', null], ['english', null], ['gs', null]],
};

module.exports = {
  code: 'CLERKSHIP_60', version: VERSION, exam: 'WBPSC_CLERKSHIP', days: 60,
  PHASES, WEEKLY_TEST_DAYS, BUDGETS, BASE_BUDGET, BLOCKS, PRACTICE, ACCURACY, DAILY_TEST, SPACED,
  ARITHMETIC, ENGLISH, GS, GS_PACKS, GS_OPTIONAL, PYQ_PAPERS, PYQ_TOPIC_DAYS, FULL_MOCK, CAMP, CAMP_SUBJECTS,
};
