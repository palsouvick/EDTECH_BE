'use strict';

/**
 * Independent solvers for the Average hard bank: (variant, given) -> answer.
 * Most of them build an explicit list of values and take its mean.
 */

const { bisect, scan, near } = require('./util');

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
/** A list of n values with the given mean that contains every value in `fixed`. */
function listWithMean(n, avg, fixed = []) {
  const rest = n - fixed.length;
  const filler = (n * avg - fixed.reduce((a, b) => a + b, 0)) / rest;
  return [...fixed, ...Array.from({ length: rest }, () => filler)];
}

module.exports = {
  a_wrong_entry(variant, g) {
    if (variant === 'one_misread') {
      const copied = listWithMean(g.n, g.A, [g.y]);
      copied[0] = g.x;
      return mean(copied);
    }
    const copied = listWithMean(g.n, g.A, [g.y1, g.y2]);
    copied[0] = g.x1;
    copied[1] = g.x2;
    return mean(copied);
  },

  a_replace_member(variant, g) {
    const before = listWithMean(g.n, 40, [g.x]);
    const target = mean(before) + (variant === 'increase' ? g.d : -g.d);
    return bisect((age) => mean([age, ...before.slice(1)]), target, -1000, 1000);
  },

  a_batsman(variant, g) {
    if (variant === 'new_average') {
      // Old average a must satisfy mean(n innings of a, then S) = a + d.
      const a = bisect((a) => mean([...Array(g.n).fill(a), g.S]) - a, g.d, -1000, 1000);
      return a + g.d;
    }
    return bisect((s) => mean([...Array(g.n).fill(g.A), s]), g.A + g.d, -10_000, 10_000);
  },

  a_overlap_middle(_v, g) {
    // First k-1 values all α, then the middle value m, then k-1 values all β.
    const k = g.k;
    const totalFor = (m) => {
      const alpha = (k * g.P - m) / (k - 1);
      const beta = (k * g.Q - m) / (k - 1);
      return mean([...Array(k - 1).fill(alpha), m, ...Array(k - 1).fill(beta)]);
    };
    return bisect(totalFor, g.M, -10_000, 10_000);
  },

  a_boys_girls(variant, g) {
    if (variant === 'find_girls') return scan(0, g.N, (girls) => near(mean([...Array(g.N - girls).fill(g.B), ...Array(girls).fill(g.G)]), g.A));
    const girls = scan(1, 10_000, (girls) => near(mean([...Array(g.nb).fill(g.B), ...Array(girls).fill(g.G)]), g.A));
    return g.nb + girls;
  },

  a_family_newborn(variant, g) {
    if (variant === 'baby_age') {
      const today = listWithMean(g.n, g.A).map((age) => age + g.t);
      return bisect((baby) => mean([...today, baby]), g.A, -1000, 1000);
    }
    // Simulate the years after the wedding one by one.
    return scan(0, 200, (years) => near(mean([g.A1 + years, g.A1 + years, g.c]), g.A2));
  },

  a_required_future(variant, g) {
    if (variant === 'remaining_average') {
      return bisect((x) => mean([...Array(g.k).fill(g.A1), ...Array(g.n - g.k).fill(x)]), g.A, -1000, 1000);
    }
    return mean([...Array(g.k).fill(g.a1), ...Array(g.n - g.k).fill(g.M)]);
  },

  a_speed_equal_distances(variant, g) {
    const D = 360_360; // any distance; the answer cannot depend on it
    if (variant === 'three_legs') return (3 * D) / (D / g.a + D / g.b + D / g.c);
    return bisect((w) => (2 * D) / (D / g.u + D / w), g.v, g.v / 2 + 1e-9, 1e6);
  },

  a_successive_joiners(variant, g) {
    const group = listWithMean(g.n, g.W);
    const ajay = bisect((a) => mean([...group, a]), g.W + g.p, -1000, 1000);
    const bablu = bisect((b) => mean([...group, ajay, b]), g.W + g.p - g.qd, -1000, 1000);
    return variant === 'second_weight' ? bablu : Math.abs(ajay - bablu);
  },

  a_missing_group(variant, g) {
    const marks = (n1, a1, n2, a2, n3, a3) => [...Array(n1).fill(a1), ...Array(n2).fill(a2), ...Array(n3).fill(a3)];
    if (variant === 'third_average') return bisect((a3) => mean(marks(g.n1, g.a1, g.n2c, g.a2, g.n3, a3)), g.A, -1000, 1000);
    return scan(1, 10_000, (n3) => near(mean(marks(g.n1, g.a1, g.n2c, g.a2, n3, g.a3)), g.A));
  },
};
