'use strict';

/**
 * Hard-bank pattern matrix for Simple & Compound Interest
 * (generator: scripts/generators/hard/interest.js). Levels as in ./percentage.js.
 *
 * The WBPSC Clerkship Part-I syllabus lists only "simple interest", so compound
 * interest and instalment patterns are marked clerkship: false (they serve SSC,
 * Banking and WB Post students).
 */

const t = (en, bn) => ({ en, bn });

module.exports = [
  {
    id: 'i_si_two_amounts', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'multi_step'], variants: ['find_rate', 'find_principal'],
    concepts: ['simple_interest', 'amount'],
    generationRule: 'The amounts after two different periods at the same simple interest are given; find the rate or principal.',
    solutionMethod: 'The difference of the amounts is the interest for the extra years; work back to the principal.',
    hardBecause: 'Neither amount is the principal; the yearly interest must be found first.',
    name: t('Simple interest from two amounts', 'দুটি সমূল-সুদ থেকে সরল সুদ'),
  },
  {
    id: 'i_si_rate_change', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'conditional'], variants: ['rate_up', 'time_up'],
    concepts: ['simple_interest', 'proportionality'],
    generationRule: 'A higher rate (or a longer time) would have given a known extra interest; find the principal.',
    solutionMethod: 'Extra interest = P × (extra rate × time, or rate × extra time) ÷ 100.',
    hardBecause: 'Only the change is given, so the principal must be found from the difference.',
    name: t('Extra interest from a change in rate or time', 'হার বা সময় বদলে অতিরিক্ত সুদ'),
  },
  {
    id: 'i_si_multiple_times', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['ratio_reasoning', 'trap'], variants: ['times_to_times', 'rate_equals_time'],
    concepts: ['simple_interest', 'multiples_of_principal'],
    generationRule: 'A sum becomes k times in t years; find the time to become m times. Or interest is a fraction of the sum with rate = time.',
    solutionMethod: 'Interest grows linearly: (k − 1)P in t years, so (m − 1)P takes t(m − 1)/(k − 1) years.',
    hardBecause: '“Becomes k times” includes the principal; the interest is only (k − 1) times.',
    name: t('Sum becomes several times itself', 'আসল কয়েক গুণ হওয়া'),
  },
  {
    id: 'i_si_split_two_rates', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['weighted', 'reverse'], variants: ['total_interest', 'equal_interest'],
    concepts: ['simple_interest', 'alligation'],
    generationRule: 'A sum is lent in two parts at two rates, with the total interest or equal interests known; find a part.',
    solutionMethod: 'Set the first part as x, write both interests, and solve the linear equation (or use alligation).',
    hardBecause: 'Two unknown parts are tied by one total and one interest condition.',
    name: t('Money lent in two parts', 'দুই অংশে টাকা ধার'),
  },
  {
    id: 'i_si_equal_amounts', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['conditional', 'ratio_reasoning'], variants: ['first_share', 'share_ratio'],
    concepts: ['simple_interest', 'amount', 'ratio'],
    generationRule: 'A sum is divided so that the two parts amount to the same after different periods.',
    solutionMethod: 'Shares are inversely proportional to (100 + r × t) for their periods.',
    hardBecause: 'Equal amounts, not equal interests: the principal is inside each amount.',
    name: t('Shares that grow to equal amounts', 'যে অংশগুলি সমান সমূল-সুদে পৌঁছায়'),
  },
  {
    id: 'i_ci_si_difference', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['multi_step', 'trap'], variants: ['two_years', 'three_years'],
    concepts: ['compound_interest', 'simple_interest'],
    generationRule: 'The difference between compound and simple interest over 2 or 3 years is given; find the principal.',
    solutionMethod: '2 years: D = P(r/100)²; 3 years: D = P(r/100)²(3 + r/100).',
    hardBecause: 'The 3-year difference has an extra interest-on-interest term.',
    name: t('CI − SI difference', 'চক্রবৃদ্ধি ও সরল সুদের পার্থক্য'),
  },
  {
    id: 'i_ci_consecutive_amounts', difficulty: 4, band: 'hard', clerkship: false,
    skills: ['reverse', 'ratio_reasoning'], variants: ['find_rate', 'find_principal'],
    concepts: ['compound_interest', 'growth_factor'],
    generationRule: 'Compound amounts after consecutive years are given; find the rate or the principal.',
    solutionMethod: 'Successive amounts differ by one year’s interest on the earlier amount: r = (A₂ − A₁)/A₁ × 100.',
    hardBecause: 'The interest is on the previous amount, not on the principal.',
    name: t('Compound amounts in consecutive years', 'পরপর বছরের চক্রবৃদ্ধি সমূল-সুদ'),
  },
  {
    id: 'i_si_instalments', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['multi_step', 'conditional', 'reverse'], variants: ['instalment', 'total_paid'],
    concepts: ['simple_interest', 'instalments'],
    generationRule: 'A loan at simple interest is cleared by equal yearly instalments; find the instalment or total paid.',
    solutionMethod: 'Each instalment earns interest for the years left; the instalments with their interest equal the amount due.',
    hardBecause: 'Every instalment is paid at a different time, so each carries a different interest.',
    name: t('Equal instalments at simple interest', 'সরল সুদে সমান কিস্তি'),
  },
  {
    id: 'i_ci_half_yearly', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['comparison', 'multi_step', 'trap'], variants: ['difference', 'amount_18_months'],
    concepts: ['compound_interest', 'compounding_frequency'],
    generationRule: 'Half-yearly compounding compared with yearly, or an amount over 18 months.',
    solutionMethod: 'Half-yearly: halve the rate and double the number of periods.',
    hardBecause: 'Rate and number of periods both change with the compounding period.',
    name: t('Half-yearly compounding', 'অর্ধবার্ষিক চক্রবৃদ্ধি'),
  },
  {
    id: 'i_si_ci_two_conditions', difficulty: 5, band: 'advanced_hard', clerkship: false,
    skills: ['multi_step', 'reverse', 'comparison'], variants: ['find_rate', 'find_principal'],
    concepts: ['compound_interest', 'simple_interest'],
    generationRule: 'SI and CI for two years on the same sum are both known; find the rate or the sum.',
    solutionMethod: 'CI − SI = interest on one year’s SI: r = 2(CI − SI) ÷ SI × 100.',
    hardBecause: 'Neither the rate nor the sum is given; both interests must be combined.',
    name: t('Rate and sum from SI and CI', 'সরল ও চক্রবৃদ্ধি সুদ থেকে হার ও আসল'),
  },
];
