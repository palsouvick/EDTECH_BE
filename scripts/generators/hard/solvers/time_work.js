'use strict';

/**
 * Independent solvers for the Time & Work hard bank: (variant, given) -> answer.
 * Work is simulated one day at a time (fraction of the job per day), with a
 * fractional last day, instead of using the generators' LCM-unit formulas.
 */

const { bisect, scan, near } = require('./util');

/** Days until the whole job (1) is done, when day i (from 0) does rate(i) of it. */
function daysToFinish(rate, done = 0, startDay = 0) {
  let left = 1 - done;
  for (let day = startDay; day < startDay + 100_000; day++) {
    const r = rate(day);
    if (r >= left - 1e-12) return day - startDay + left / r;
    left -= r;
  }
  throw new Error('daysToFinish: job never finishes');
}

module.exports = {
  w_together_then_leave(variant, g) {
    const [A, B] = [1 / g.a, 1 / g.b];
    if (variant === 'a_leaves') return daysToFinish(() => B, g.k * (A + B));
    return daysToFinish(() => A + B, g.k * A);
  },

  w_efficiency_percent(variant, g) {
    // Try B's time alone; A is p% more efficient. Find the time that gives d days together.
    const bAlone = bisect((tb) => daysToFinish(() => 1 / tb + (1 / tb) * (1 + g.p / 100)), g.d, g.d, 10 * g.d);
    return variant === 'find_slower' ? bAlone : bAlone / (1 + g.p / 100);
  },

  w_men_days_hours(variant, g) {
    const perManHour = g.W1 / (g.M1 * g.H1 * g.D1); // km of road per man-hour
    if (variant === 'find_days') return daysToFinish(() => (g.M2 * g.H2 * perManHour) / g.W2);
    return scan(1, 100_000, (men) => near(daysToFinish(() => (men * g.H2 * perManHour) / g.W2), g.D2));
  },

  w_alternate_days(variant, g) {
    const [A, B] = [1 / g.a, 1 / g.b];
    const [first, second] = variant === 'a_first' ? [A, B] : [B, A];
    return daysToFinish((day) => (day % 2 === 0 ? first : second));
  },

  w_leaves_before_end(variant, g) {
    const [A, B] = [1 / g.a, 1 / g.b];
    const workBy = (T) => (variant === 'first_leaves' ? A * (T - g.k) + B * T : A * T + B * (T - g.k));
    return bisect(workBy, 1, g.k, g.k + g.a + g.b);
  },

  w_men_women_equivalence(variant, g) {
    const man = 1 / (g.m1 * g.D);
    const woman = 1 / (g.w1 * g.D);
    if (variant === 'find_days') return daysToFinish(() => g.m2 * man + g.w2 * woman);
    return scan(1, 10_000, (w) => near(daysToFinish(() => g.m2 * man + w * woman), g.D2));
  },

  w_wages_share(variant, g) {
    if (variant === 'helper') {
      // Work done by each in d days; whatever is left was Raju's.
      const raju = 1 - g.d / g.a - g.d / g.b;
      return g.W * raju;
    }
    const [A, B, C] = [1 / g.a, 1 / g.b, 1 / g.c];
    const days = daysToFinish(() => A + B + C);
    return g.W * B * days;
  },

  w_group_join_midway(variant, g) {
    if (variant === 'days_saved') {
      const perMan = 1 / (g.M * g.D);
      const finish = g.k + daysToFinish(() => (g.M + g.X) * perMan, g.k * g.M * perMan);
      return g.D - finish;
    }
    return scan(1, 100_000, (M) => {
      const perMan = 1 / (M * g.D);
      return near(g.k + daysToFinish(() => (M + g.X) * perMan, g.k * M * perMan), g.D - g.saved);
    });
  },

  w_pairwise_rates(variant, g) {
    // Solve the three pair equations for the individual rates by bisection on A's rate.
    const AB = 1 / g.xAB;
    const BC = 1 / g.yBC;
    const CA = 1 / g.zCA;
    const A = bisect((a) => (AB - a) + (CA - a), BC, 0, AB);
    const B = AB - A;
    const C = CA - A;
    if (variant === 'one_alone') return daysToFinish(() => A);
    return daysToFinish(() => A + B, g.k * (A + B + C));
  },

  w_efficiency_change(variant, g) {
    const factor = variant === 'slows_down' ? g.p / 100 : 1 + g.p / 100;
    return daysToFinish((day) => (day < g.k ? 1 / g.a : factor / g.a));
  },
};
