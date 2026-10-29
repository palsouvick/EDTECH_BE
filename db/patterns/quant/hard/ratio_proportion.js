'use strict';

/**
 * Hard-bank pattern matrix for Ratio & Proportion
 * (generator: scripts/generators/hard/ratio_proportion.js). Levels as in ./percentage.js.
 */

const t = (en, bn) => ({ en, bn });

module.exports = [
  {
    id: 'r_compound_chain', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['multi_step', 'trap'], variants: ['a_to_c', 'four_terms'],
    concepts: ['compound_ratio', 'common_term'],
    generationRule: 'Ratios that share a middle term with different values; combine them.',
    solutionMethod: 'Make the common term equal (LCM), then read off the outer terms.',
    hardBecause: 'Multiplying across without matching the common term gives a wrong ratio.',
    name: t('Linking ratios through a common term', 'সাধারণ পদের মাধ্যমে অনুপাত যুক্ত করা'),
  },
  {
    id: 'r_add_to_change', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'conditional'], variants: ['add_same', 'subtract_same'],
    concepts: ['ratio_change', 'linear_equation'],
    generationRule: 'Adding (or taking away) the same amount from both terms changes the ratio; find the quantities.',
    solutionMethod: 'Write the quantities as pk and qk and solve (pk ± x) : (qk ± x) = r : s.',
    hardBecause: 'A ratio changes when the same amount is added; the scale k must be found first.',
    name: t('Same amount added to both terms', 'দুটি পদে সমান পরিমাণ যোগ'),
  },
  {
    id: 'r_coins', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['conditional', 'trap'], variants: ['by_count', 'by_value'],
    concepts: ['ratio_division', 'unit_value'],
    generationRule: 'Coins of different values in a ratio by number (or by value) with a known total.',
    solutionMethod: 'Convert the count ratio to a value ratio (or back) before dividing the total.',
    hardBecause: 'The ratio of counts is not the ratio of values.',
    name: t('Coins in a ratio', 'অনুপাতে মুদ্রা'),
  },
  {
    id: 'r_income_expense', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'conditional'], variants: ['find_income', 'find_saving'],
    concepts: ['ratio', 'savings', 'simultaneous_equations'],
    generationRule: 'Incomes in one ratio, expenses in another, equal savings; find an income or the saving.',
    solutionMethod: 'Income = pk, expense = rm; equal savings give pk − rm = qk − sm.',
    hardBecause: 'Two unknown scales must be linked through the equal savings.',
    name: t('Incomes, expenses and equal savings', 'আয়, ব্যয় ও সমান সঞ্চয়'),
  },
  {
    id: 'r_mixture_change', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['reverse', 'conditional'], variants: ['add_water', 'reverse_quantity'],
    concepts: ['mixture_ratio', 'invariant_component'],
    generationRule: 'Water is added to a milk-water mixture to change its ratio; find the water added or the original quantity.',
    solutionMethod: 'The milk does not change; compare it with the new ratio.',
    hardBecause: 'Only one component changes, so its partner fixes the scale.',
    name: t('Changing the ratio of a mixture', 'মিশ্রণের অনুপাত বদলানো'),
  },
  {
    id: 'r_percent_increments', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'comparison'], variants: ['new_ratio', 'find_salary'],
    concepts: ['ratio', 'percentage_change'],
    generationRule: 'Two salaries in a ratio receive different percentage rises; find the new ratio or a salary.',
    solutionMethod: 'Scale each term by its own factor (1 + r/100).',
    hardBecause: 'Each term grows at its own rate; adding the rates to the ratio terms is wrong.',
    name: t('Ratio after different increments', 'ভিন্ন বৃদ্ধির পর অনুপাত'),
  },
  {
    id: 'r_variation', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'ratio_reasoning'], variants: ['direct_inverse', 'joint'],
    concepts: ['direct_proportion', 'inverse_proportion'],
    generationRule: 'A quantity varies directly with one and inversely (or jointly) with another; use one case to find another.',
    solutionMethod: 'Find the constant from the first case, then substitute the second.',
    hardBecause: 'Direct and inverse parts must be applied in opposite directions.',
    name: t('Direct and inverse variation', 'সরল ও ব্যস্ত ভেদ'),
  },
  {
    id: 'r_partition_conditions', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['multi_step', 'conditional', 'trap'], variants: ['two_conditions', 'equal_multiples'],
    concepts: ['ratio_division', 'fractions'],
    generationRule: 'A sum is shared among three people by two relations (part of the others’ total, or equal multiples).',
    solutionMethod: 'Turn each relation into a fraction of the whole, or into a ratio of reciprocals.',
    hardBecause: 'The relations compare one share with a sum of shares, or need reciprocals.',
    name: t('Sharing under two conditions', 'দুটি শর্তে ভাগ'),
  },
  {
    id: 'r_transfer', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['reverse', 'conditional', 'multi_step'], variants: ['find_total', 'find_moved'],
    concepts: ['ratio_change', 'conservation_of_total'],
    generationRule: 'Some members move from one group to another, changing the ratio; find the total or the number moved.',
    solutionMethod: 'The total is unchanged; equate the new ratio with (pu − k) : (qu + k).',
    hardBecause: 'One side loses what the other gains, so both terms change in opposite directions.',
    name: t('Transfer between two groups', 'দুই দলের মধ্যে স্থানান্তর'),
  },
  {
    id: 'r_share_change', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['multi_step', 'comparison', 'trap'], variants: ['new_ratio', 'find_original_total'],
    concepts: ['three_term_ratio', 'percentage_change'],
    generationRule: 'Three shares in a ratio change by different percentages; find the new ratio or the original total.',
    solutionMethod: 'Apply each change to its own share, then simplify or compare totals.',
    hardBecause: 'Each share changes on its own base; the total changes by a weighted amount.',
    name: t('Three shares changed by different rates', 'ভিন্ন হারে বদলানো তিনটি অংশ'),
  },
];
