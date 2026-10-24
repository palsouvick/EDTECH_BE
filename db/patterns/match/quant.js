'use strict';

/**
 * Pattern rules for Math (see src/services/patternTagger.js). Generated
 * questions carry their template as `subtopic`; stems cover hand-written ones.
 * Subtopics with no matching pattern (e.g. weighted_average, wages_sharing,
 * linear_equation) are left untagged on purpose: a wrong tag would tell a
 * student they are weak at something they never practised.
 */
module.exports = {
  percentage: {
    successive_change: { subtopics: ['successive_percentage_change'], stem: [/successive|first (increased|decreased).*then/i] },
    original_value: { subtopics: ['percentage_change'], stem: [/original (number|price|value|salary)/i] },
    more_than_less_than: { stem: [/more than .*by what percent.* less|less than .*by what percent.* more/i] },
    price_consumption: { stem: [/consumption/i] },
    percent_of_number: { subtopics: ['percentage_of_number', 'what_percent'], stem: [/^what is \d+(\.\d+)?% of/i] },
  },
  profit_loss: {
    profit_loss_percent: { subtopics: ['profit_percent', 'loss_percent', 'cp_sp_articles'] },
    find_cp_or_sp: { subtopics: ['find_cost_price'] },
    markup_then_discount: { stem: [/mark(s|ed)? .*above .*discount/i] },
    discount_on_marked_price: { subtopics: ['marked_price_discount'] },
    false_weight: { stem: [/false weight|instead of (a|1) ?(kg|kilogram)/i] },
  },
  ratio_proportion: {
    divide_in_ratio: { subtopics: ['dividing_in_ratio', 'three_way_division', 'ratio_sum_difference'] },
    combine_ratios: { subtopics: ['compound_ratio'] },
    fourth_mean_proportional: { subtopics: ['fourth_proportional'], stem: [/(mean|third|fourth) proportional/i] },
  },
  average: {
    simple_average: { subtopics: ['average_natural_numbers', 'consecutive_numbers'] },
    join_leave_replace: { subtopics: ['new_member_added', 'average_age'] },
    wrong_entry: { stem: [/wrongly|by mistake|copied as/i] },
    average_speed: { stem: [/average speed/i] },
  },
  interest: {
    find_simple_interest: { subtopics: ['simple_interest', 'find_rate', 'find_principal'] },
    sum_becomes_n_times_si: { subtopics: ['doubling_time'] },
    ci_si_difference: { subtopics: ['ci_si_difference'] },
    ci_two_years: { subtopics: ['compound_interest'] },
  },
  mensuration: {
    rectangle_fencing: { subtopics: ['rectangle', 'path_area'] },
    triangle_heron: { subtopics: ['triangle_area'] },
    circle_wheel: { subtopics: ['circumference', 'circle_area'] },
    cuboid_surface: { subtopics: ['cube'] },
    cylinder_cone_sphere: { subtopics: ['cylinder_volume'] },
  },
  mixture_alligation: {
    mixture_price: { subtopics: ['mean_price'] },
    alligation_ratio: { subtopics: ['alligation_ratio', 'concentration'] },
    add_to_change_ratio: { subtopics: ['add_water'] },
    repeated_replacement: { subtopics: ['replacement'] },
  },
  number_system: {
    missing_digit_divisibility: { subtopics: ['divisibility_by_9', 'divisibility'] },
    hcf_lcm_product: { subtopics: ['hcf_lcm'] },
    unit_digit_power: { stem: [/unit('?s)? digit/i] },
  },
  partnership: {
    profit_by_capital: { subtopics: ['profit_share'] },
    capital_times_months: { subtopics: ['capital_time', 'joining_later'] },
  },
  pipes_cistern: {
    two_filling_pipes: { subtopics: ['filling_together'] },
    find_the_leak: { subtopics: ['leak'] },
    fill_and_leak: { subtopics: ['inlet_outlet', 'rate_capacity'] },
  },
  simplification: {
    bodmas_order: { subtopics: ['bodmas', 'decimals'] },
    algebraic_identities: { subtopics: ['square_difference', 'square_root'] },
  },
  time_speed_distance: {
    basic_units: { subtopics: ['basic_distance'] },
    train_crossing: { subtopics: ['train_crossing_platform', 'train_crossing_pole'] },
    relative_speed: { subtopics: ['relative_speed_trains', 'meeting_point'] },
    average_speed: { subtopics: ['average_speed'] },
    boats_streams: { stem: [/upstream|downstream|stream/i] },
  },
  time_work: {
    two_together: { subtopics: ['working_together', 'find_individual_time'] },
    one_leaves: { subtopics: ['partial_work'] },
    efficiency: { subtopics: ['efficiency_ratio'] },
  },
  ages: {
    ratio_and_sum: { subtopics: ['ratio_and_sum', 'multiple_of_age'] },
    times_now_and_then: { subtopics: ['past_ages'] },
    average_age_new_member: { stem: [/average age/i] },
  },
  algebra: {
    square_from_sum_product: { subtopics: ['sum_product_identity'] },
    cube_from_sum_product: { subtopics: ['cube_identity'] },
    x_plus_one_over_x_square: { subtopics: ['reciprocal_identity'] },
  },
};
