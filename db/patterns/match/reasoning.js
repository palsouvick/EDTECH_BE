'use strict';

/** Pattern rules for Reasoning (see src/services/patternTagger.js). */

// Syllogism stems read "Statements: ..." (one or more lines) then "Conclusions: ...":
// the syllogism rules look at the statements only.

module.exports = {
  analogy: {
    word_pair_relation: { subtopics: ['semantic_analogy'] },
    number_analogy: { subtopics: ['numerical_analogy'] },
    letter_shift_analogy: { subtopics: ['letter_analogy'] },
  },
  blood_relations: {
    pointing_photo: { subtopics: ['relation_statement'], stem: [/pointing|photograph|introduc/i] },
    direct_chain: { subtopics: ['chain_relation'] },
    family_tree_puzzle: { subtopics: ['puzzle_statement'] },
  },
  coding_decoding: {
    letter_shift: { subtopics: ['letter_shifting', 'alternate_shifting'] },
    reverse_alphabet: { subtopics: ['opposite_letters'] },
    letter_to_number: { subtopics: ['letter_position_sum'] },
    rearranging_letters: { subtopics: ['reverse_order'] },
  },
  direction_sense: {
    final_direction_after_turns: { subtopics: ['final_direction', 'turning_angles'] },
    shortest_distance_pythagoras: { subtopics: ['shortest_distance'] },
    shadow_direction: { subtopics: ['shadow'] },
  },
  seating_arrangement: {
    circular_facing_centre: { stem: [/circular|round table|facing the cent(re|er)/i] },
    linear_row_north: { subtopics: ['linear_row'], stem: [/row facing north/i] },
  },
  series: {
    difference_series: { subtopics: ['arithmetic_progression', 'increasing_difference', 'difference_squares'] },
    multiplication_series: { subtopics: ['geometric_progression', 'multiply_and_add', 'n_into_n_plus_1'] },
    square_cube_series: { subtopics: ['squares', 'cubes'] },
    alternating_series: { subtopics: ['alternating_series'] },
  },
  syllogism: {
    either_or: { stem: [/either/i] },
    possibility: { stem: [/possibility|is possible/i] },
    negative_no: { stem: [/Statements:(?:(?!Conclusions)[\s\S])*\bNo\b/i] },
    some_all: { stem: [/Statements:(?:(?!Conclusions)[\s\S])*\bSome\b(?:(?!Conclusions)[\s\S])*\bAll\b/i, /Statements:(?:(?!Conclusions)[\s\S])*\bAll\b(?:(?!Conclusions)[\s\S])*\bSome\b/i] },
    all_all: { stem: [/Statements:(?:(?!Conclusions)[\s\S])*\bAll\b(?:(?!Conclusions)[\s\S])*\bAll\b/i] },
  },
};
