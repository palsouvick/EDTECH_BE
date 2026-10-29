'use strict';

/**
 * Hard-bank pattern matrix for Average (generator: scripts/generators/hard/average.js).
 * Levels as in ./percentage.js.
 */

const t = (en, bn) => ({ en, bn });

module.exports = [
  {
    id: 'a_wrong_entry', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'trap'], variants: ['one_misread', 'two_misread'],
    concepts: ['average', 'correction'],
    generationRule: 'An average was computed with one or two values copied wrongly; find the correct average.',
    solutionMethod: 'Correct the total by (true − copied) values, then divide by the count again.',
    hardBecause: 'The error must be spread over all values, and its sign depends on which value was larger.',
    name: t('Correcting a wrongly copied value', 'ভুল লেখা মান সংশোধন'),
  },
  {
    id: 'a_replace_member', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'trap'], variants: ['increase', 'decrease'],
    concepts: ['average', 'replacement'],
    generationRule: 'A member is replaced and the average rises or falls by a known amount; find the newcomer.',
    solutionMethod: 'Change in total = count × change in average = newcomer − person who left.',
    hardBecause: 'The change in average is per member; it must be multiplied by the group size.',
    name: t('Replacing a member of a group', 'দলের একজন সদস্যের বদল'),
  },
  {
    id: 'a_batsman', difficulty: 3, band: 'medium_hard', clerkship: true,
    skills: ['reverse', 'multi_step'], variants: ['new_average', 'required_score'],
    concepts: ['average', 'running_average'],
    generationRule: 'One more innings changes a batsman’s average by a known amount.',
    solutionMethod: 'New score = old average + (innings after) × rise in average.',
    hardBecause: 'The old average is unknown; it must be recovered from the change.',
    name: t('Batting average after one more innings', 'আরও একটি ইনিংসের পর ব্যাটিং গড়'),
  },
  {
    id: 'a_overlap_middle', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['conditional', 'trap'], variants: ['results', 'temperature'],
    concepts: ['average', 'overlapping_groups'],
    generationRule: 'The first and last halves of an odd-sized list share the middle value; find it.',
    solutionMethod: 'Middle value = (sum of first half + sum of last half) − total sum.',
    hardBecause: 'The middle value is counted in both halves exactly once too often.',
    name: t('The value shared by two halves', 'দুই অর্ধের সাধারণ মান'),
  },
  {
    id: 'a_boys_girls', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['weighted', 'reverse'], variants: ['find_girls', 'find_total'],
    concepts: ['weighted_average', 'alligation'],
    generationRule: 'Group averages and the combined average are known; find a group size.',
    solutionMethod: 'Each group’s distance from the combined average balances the other’s.',
    hardBecause: 'Sizes are inversely related to distances from the combined average.',
    name: t('Group sizes from averages', 'গড় থেকে দলের সদস্যসংখ্যা'),
  },
  {
    id: 'a_family_newborn', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['multi_step', 'conditional'], variants: ['baby_age', 'years_ago'],
    concepts: ['average_age', 'time_shift'],
    generationRule: 'Ages move with time and a new member is added; use the averages at two times.',
    solutionMethod: 'Every member ages by the same years; compare totals, not averages.',
    hardBecause: 'Both the passage of time and the new member change the total.',
    name: t('Average age across years', 'বছরের ব্যবধানে গড় বয়স'),
  },
  {
    id: 'a_required_future', difficulty: 4, band: 'hard', clerkship: true,
    skills: ['conditional', 'reverse'], variants: ['remaining_average', 'max_possible'],
    concepts: ['average', 'target'],
    generationRule: 'Part of a series of tests is done; find the average needed later, or the best overall average possible.',
    solutionMethod: 'Target total − total so far, shared over the remaining tests.',
    hardBecause: 'Averages of unequal parts cannot simply be averaged.',
    name: t('Reaching a target average', 'লক্ষ্য গড়ে পৌঁছানো'),
  },
  {
    id: 'a_speed_equal_distances', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['trap', 'reverse', 'multi_step'], variants: ['three_legs', 'round_trip_find_speed'],
    concepts: ['average_speed', 'harmonic_mean'],
    generationRule: 'Equal distances at different speeds; find the average speed, or the missing speed for a target average.',
    solutionMethod: 'Average speed = total distance ÷ total time (never the mean of the speeds).',
    hardBecause: 'The arithmetic mean of the speeds is the classic wrong answer.',
    name: t('Average speed over equal distances', 'সমান দূরত্বে গড় গতিবেগ'),
  },
  {
    id: 'a_successive_joiners', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['multi_step', 'reverse', 'conditional'], variants: ['second_weight', 'difference'],
    concepts: ['average', 'replacement'],
    generationRule: 'Two people join one after the other, each changing the average; find a weight or their difference.',
    solutionMethod: 'Track the total after each joining: new member = new average × new count − old total.',
    hardBecause: 'The second change acts on the average already changed by the first.',
    name: t('Two people join one after another', 'পরপর দুজনের যোগদান'),
  },
  {
    id: 'a_missing_group', difficulty: 5, band: 'advanced_hard', clerkship: true,
    skills: ['weighted', 'reverse', 'multi_step'], variants: ['third_average', 'third_count'],
    concepts: ['weighted_average', 'linear_equation'],
    generationRule: 'Three sections with an overall average; find the third section’s average or size.',
    solutionMethod: 'Overall total = sum of section totals; solve for the missing quantity.',
    hardBecause: 'The overall average is weighted by section sizes, one of which may be unknown.',
    name: t('The missing section in a combined average', 'মিলিত গড়ে অজানা বিভাগ'),
  },
];
