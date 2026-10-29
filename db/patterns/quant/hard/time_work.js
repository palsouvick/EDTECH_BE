'use strict';

/**
 * Hard-bank pattern matrix for Time & Work (generator: scripts/generators/hard/time_work.js).
 * Levels as in ./percentage.js.
 *
 * Time & Work is not in the WBPSC Clerkship Part-I Arithmetic syllabus (Advt 12/2024),
 * so every pattern is clerkship: false; the chapter serves SSC, Banking and WB Post.
 */

const t = (en, bn) => ({ en, bn });

module.exports = [
  {
    id: 'w_together_then_leave', difficulty: 3, band: 'medium_hard', clerkship: false,
    skills: ['multi_step', 'conditional'], variants: ['a_leaves', 'b_joins_later'],
    concepts: ['work_rate', 'lcm_units'],
    generationRule: 'Two workers share the work for part of the time; one leaves (or joins late).',
    solutionMethod: 'Take the work as LCM units; subtract the work done together, then divide the rest by the remaining rate.',
    hardBecause: 'The work done in each phase must be tracked separately.',
    name: t('One worker leaves or joins midway', 'মাঝপথে একজনের চলে যাওয়া বা যোগ দেওয়া'),
  },
  {
    id: 'w_efficiency_percent', difficulty: 3, band: 'medium_hard', clerkship: false,
    skills: ['ratio_reasoning', 'trap'], variants: ['find_faster', 'find_slower'],
    concepts: ['efficiency', 'percentage'],
    generationRule: 'One worker is p% more efficient; together they finish in d days; find one worker alone.',
    solutionMethod: 'Rates 100 : (100 + p); total work = d × combined rate; divide by one rate.',
    hardBecause: 'Efficiency and time are inversely related, so the times do not differ by p%.',
    name: t('Efficiency given as a percentage', 'শতাংশে দেওয়া দক্ষতা'),
  },
  {
    id: 'w_men_days_hours', difficulty: 3, band: 'medium_hard', clerkship: false,
    skills: ['ratio_reasoning', 'multi_step'], variants: ['find_days', 'find_men'],
    concepts: ['man_hours', 'proportion'],
    generationRule: 'Men, hours per day, days and amount of work all change; find days or men.',
    solutionMethod: 'Work ∝ men × hours × days: M₁H₁D₁/W₁ = M₂H₂D₂/W₂.',
    hardBecause: 'Four quantities change at once; each must be placed directly or inversely.',
    name: t('Men, hours and days', 'লোক, ঘণ্টা ও দিন'),
  },
  {
    id: 'w_alternate_days', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['multi_step', 'trap'], variants: ['a_first', 'b_first'],
    concepts: ['work_rate', 'cycles'],
    generationRule: 'Two workers work on alternate days; find when the work is finished.',
    solutionMethod: 'Work per 2-day cycle; finish whole cycles, then complete the remainder day by day.',
    hardBecause: 'The last cycle is usually incomplete, and who starts matters.',
    name: t('Working on alternate days', 'একদিন অন্তর কাজ'),
  },
  {
    id: 'w_leaves_before_end', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['reverse', 'conditional'], variants: ['first_leaves', 'second_leaves'],
    concepts: ['work_rate', 'linear_equation'],
    generationRule: 'Two workers start together; one leaves some days before the work is completed.',
    solutionMethod: 'Let the total time be T: one works T days, the other T − k days; their work adds to 1.',
    hardBecause: 'The time is counted backwards from the end, which is unknown.',
    name: t('Leaving before the work is completed', 'কাজ শেষ হওয়ার আগে চলে যাওয়া'),
  },
  {
    id: 'w_men_women_equivalence', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['ratio_reasoning', 'multi_step'], variants: ['find_days', 'find_women'],
    concepts: ['equivalent_workers', 'work_rate'],
    generationRule: 'm men or w women can do a job in D days; a mixed team works together.',
    solutionMethod: 'Convert everyone to one type (1 man = w/m women), then use the inverse proportion.',
    hardBecause: 'Workers of different efficiency must first be put in one unit.',
    name: t('Men and women of different efficiency', 'ভিন্ন দক্ষতার পুরুষ ও মহিলা'),
  },
  {
    id: 'w_wages_share', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['multi_step', 'ratio_reasoning', 'trap'], variants: ['helper', 'three_workers'],
    concepts: ['wages', 'work_share'],
    generationRule: 'A wage is shared in proportion to work done, including a helper whose own time is unknown.',
    solutionMethod: 'Each share = wage × fraction of work done by that worker.',
    hardBecause: 'Wages follow work done, not days worked or time taken alone.',
    name: t('Sharing wages by work done', 'কাজ অনুযায়ী মজুরি ভাগ'),
  },
  {
    id: 'w_group_join_midway', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['reverse', 'multi_step', 'conditional'], variants: ['days_saved', 'find_original_men'],
    concepts: ['man_days', 'work_rate'],
    generationRule: 'More workers join a group partway; find the days saved, or the original group size.',
    solutionMethod: 'Total man-days are fixed; split them into before and after the joining.',
    hardBecause: 'The remaining work, not the whole job, is shared by the bigger group.',
    name: t('Extra workers join partway', 'মাঝপথে আরও লোকের যোগদান'),
  },
  {
    id: 'w_pairwise_rates', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['multi_step', 'reverse'], variants: ['one_alone', 'all_then_one_leaves'],
    concepts: ['work_rate', 'simultaneous_equations'],
    generationRule: 'Only the times of pairs are known; find one worker alone, or finish after one leaves.',
    solutionMethod: 'Adding the three pair rates counts each worker twice: half of it is the rate of all three.',
    hardBecause: 'No single rate is given; it must be extracted from overlapping pairs.',
    name: t('Pairs of workers', 'জোড়ায় জোড়ায় কাজ'),
  },
  {
    id: 'w_efficiency_change', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['multi_step', 'conditional', 'trap'], variants: ['slows_down', 'improves'],
    concepts: ['efficiency', 'work_rate'],
    generationRule: 'A worker’s efficiency changes after some days; find the total time.',
    solutionMethod: 'Work done before the change at the old rate; the rest at the new rate.',
    hardBecause: 'Only the remaining work is done at the new efficiency.',
    name: t('Efficiency changes midway', 'মাঝপথে দক্ষতার পরিবর্তন'),
  },
];
