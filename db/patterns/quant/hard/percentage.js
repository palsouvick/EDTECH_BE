'use strict';

/**
 * Hard-bank pattern matrix for Percentage (generator: scripts/generators/hard/percentage.js).
 *
 * difficulty 3 = two steps with one twist; 4 = three or more steps, a reverse
 * calculation or interacting conditions; 5 = several concepts at once, with the
 * method not obvious from the wording. Larger numbers never raise a level.
 * clerkship: inside the WBPSC Clerkship Part-I Arithmetic syllabus (Advt 12/2024).
 */

const t = (en, bn) => ({ en, bn });

module.exports = [
  {
    id: 'pct_three_step_net', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['multi_step', 'trap'], variants: ['price', 'population'],
    concepts: ['successive_percentage', 'net_change'],
    generationRule: 'Three successive changes (up, down, up) on the same quantity; ask the net change.',
    solutionMethod: 'Multiply the three factors (1 ± r/100) and compare with 1.',
    hardBecause: 'Adding the rates is the trap; each change acts on a new base.',
    name: t('Net effect of three successive changes', 'পরপর তিনটি পরিবর্তনের মোট ফল'),
  },
  {
    id: 'pct_comparison_chain', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['comparison', 'trap'], variants: ['two_links', 'common_base'],
    concepts: ['percentage_comparison', 'change_of_base'],
    generationRule: 'Compare two quantities that are each described relative to a third.',
    solutionMethod: 'Give the common quantity the value 100, express both others, then compare on the asked base.',
    hardBecause: 'The answer must be measured on the base the question names, not the one in the data.',
    name: t('Comparison through a third quantity', 'তৃতীয় রাশির মাধ্যমে তুলনা'),
  },
  {
    id: 'pct_expenditure_consumption', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'trap'], variants: ['same_spend', 'limited_rise'],
    concepts: ['price_consumption', 'expenditure'],
    generationRule: 'A price rises; expenditure must stay the same or rise by less; ask the cut in consumption.',
    solutionMethod: 'Expenditure = price × consumption, so new consumption = new spend ÷ new price.',
    hardBecause: 'The cut is not equal to the rise; it is measured on the new price.',
    name: t('Price rise and consumption cut', 'দাম বৃদ্ধি ও ব্যবহার কমানো'),
  },
  {
    id: 'pct_reverse_successive', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['reverse', 'multi_step', 'trap'], variants: ['final_value', 'net_amount'],
    concepts: ['reverse_percentage', 'successive_percentage'],
    generationRule: 'After a rise and a fall, the final value (or the net gain/loss in rupees) is known; find the original.',
    solutionMethod: 'Final = original × (1 + a/100)(1 − b/100); divide back, or equate the net factor to the given difference.',
    hardBecause: 'Undoing the changes with the opposite percentages gives a wrong original.',
    name: t('Original value after two changes', 'দুটি পরিবর্তনের পর মূল মান'),
  },
  {
    id: 'pct_election', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'reverse', 'conditional'], variants: ['margin_to_total', 'total_to_votes'],
    concepts: ['percentage_of_percentage', 'election'],
    generationRule: 'Non-voters, invalid votes and a winner’s share of valid votes combine to give a margin.',
    solutionMethod: 'Peel the layers: electorate → votes cast → valid votes → winner and loser.',
    hardBecause: 'Each percentage is of a different total; mixing the totals is the usual mistake.',
    name: t('Election with invalid votes', 'অবৈধ ভোটসহ নির্বাচন'),
  },
  {
    id: 'pct_income_savings', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'reverse', 'conditional'], variants: ['savings_change', 'expense_rise'],
    concepts: ['income_expenditure_savings', 'percentage_change'],
    generationRule: 'Income and expenditure change by different rates; find the change in savings, or the expenditure rise that produced a given savings change.',
    solutionMethod: 'Take income = 100; work out expenditure and savings before and after.',
    hardBecause: 'Savings is a difference, so its percentage change is not the difference of the rates.',
    name: t('Income, expenditure and savings', 'আয়, ব্যয় ও সঞ্চয়'),
  },
  {
    id: 'pct_pass_marks', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'conditional'], variants: ['max_marks', 'pass_percent'],
    concepts: ['marks_percentage', 'linear_equation'],
    generationRule: 'One candidate fails by some marks, another passes by some marks; find the maximum marks or the pass percentage.',
    solutionMethod: 'The gap between the two scores equals the difference of their percentages of the maximum.',
    hardBecause: 'The two conditions must be combined; neither alone fixes the maximum.',
    name: t('Two candidates and the pass mark', 'দুই পরীক্ষার্থী ও পাস নম্বর'),
  },
  {
    id: 'pct_overlap_fail', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['conditional', 'trap'], variants: ['total_from_passed', 'failed_one_subject'],
    concepts: ['sets_overlap', 'percentage_of_number'],
    generationRule: 'Failures in two subjects with an overlap; find the total, or those who failed exactly one subject.',
    solutionMethod: 'Failed in at least one = x + y − z; passed in both = 100 − that; exactly one = x + y − 2z.',
    hardBecause: 'Forgetting the overlap counts some students twice.',
    name: t('Failures in two subjects (overlap)', 'দুই বিষয়ে অকৃতকার্য (সাধারণ অংশ)'),
  },
  {
    id: 'pct_dimension_reverse', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['reverse', 'multi_step', 'trap'], variants: ['rectangle', 'revenue'],
    concepts: ['product_percentage', 'reverse_percentage'],
    generationRule: 'A product (area, revenue) changes by a known rate after one factor changes; find the change in the other factor.',
    solutionMethod: '(1 + a/100)(1 + b/100) = 1 + c/100, so 1 + b/100 = (100 + c)/(100 + a).',
    hardBecause: 'Rates of a product multiply; subtracting them looks right but is wrong.',
    name: t('Missing change in a product', 'গুণফলে অজানা পরিবর্তন'),
  },
  {
    id: 'pct_population_groups', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['weighted', 'reverse', 'conditional'], variants: ['find_men', 'unchanged_total'],
    concepts: ['weighted_percentage', 'population_change'],
    generationRule: 'Two groups change by different rates; the overall change (or no change) is known; find a group.',
    solutionMethod: 'The overall rate is the weighted average of the group rates (alligation on rates).',
    hardBecause: 'The overall rate depends on group sizes, which are the unknowns.',
    name: t('Two groups, different growth rates', 'দুটি দল, ভিন্ন বৃদ্ধির হার'),
  },
  {
    id: 'pct_salary_chain', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['multi_step', 'reverse', 'comparison'], variants: ['total_known', 'difference_known'],
    concepts: ['percentage_comparison', 'linear_equation'],
    generationRule: 'Three salaries linked by two percentage relations, with their total (or a difference) given.',
    solutionMethod: 'Express all three in terms of one salary, then use the total or difference.',
    hardBecause: 'Two relations on different bases must be chained before the total can be used.',
    name: t('Three salaries linked by percentages', 'শতাংশে যুক্ত তিনটি বেতন'),
  },
];
