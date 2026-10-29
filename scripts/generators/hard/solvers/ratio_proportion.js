'use strict';

/** Independent solvers for the Ratio & Proportion hard bank: (variant, given) -> answer. */

const { bisect, scan, smallest, near } = require('./util');

const after = (x, r) => x + (x * r) / 100;

module.exports = {
  // Smallest whole-number holdings that satisfy every given ratio, found by search.
  r_compound_chain(variant, g) {
    if (variant === 'a_to_c') {
      const B = smallest(1, 10_000, (b) => (b * g.p) % g.q1 === 0 && (b * g.s) % g.r === 0);
      return [(B * g.p) / g.q1, (B * g.s) / g.r];
    }
    const B = smallest(1, 1_000_000, (b) => (b * g.p) % g.q1 === 0 && ((b * g.s) % g.r === 0) && (((b * g.s) / g.r) * g.v) % g.u === 0);
    const C = (B * g.s) / g.r;
    return [(B * g.p) / g.q1, (C * g.v) / g.u];
  },

  r_add_to_change(variant, g) {
    const d = variant === 'add_same' ? g.x : -g.x;
    const k = scan(1, 100_000, (k) => (g.p * k + d) * g.s === (g.q1 * k + d) * g.r);
    return g.q1 * k;
  },

  r_coins(variant, g) {
    if (variant === 'by_count') {
      const k = scan(1, 100_000, (k) => near(g.a * k * 1 + g.b * k * 0.5 + g.c * k * 0.25, g.V));
      return g.b * k;
    }
    // t = rupees per value unit; counts follow from value ÷ coin value.
    const t = bisect((t) => (g.a * t) / 1 + (g.b * t) / 0.5 + (g.c * t) / 0.25, g.N, 0, 1e7);
    return (g.c * t) / 0.25;
  },

  r_income_expense(variant, g) {
    if (variant === 'find_income') {
      // Savings gap between the two people as a function of k; m is fixed by the first saving.
      const gap = (k) => { const m = (g.p * k - g.S) / g.r; return g.q1 * k - g.s * m - g.S; };
      return g.p * bisect(gap, 0, g.S / g.p, 1e9);
    }
    const k = g.IA / g.p;
    const m = bisect((m) => (g.p * k - g.r * m) - (g.q1 * k - g.s * m), 0, 0, 1e9);
    return g.p * k - g.r * m;
  },

  r_mixture_change(variant, g) {
    if (variant === 'add_water') {
      const milk = (g.V * g.p) / (g.p + g.q1);
      const water = g.V - milk;
      return bisect((w) => milk / (water + w), g.r / g.s, 0, 1e7);
    }
    const original = bisect((V) => {
      const milk = (V * g.p) / (g.p + g.q1);
      return milk / (V - milk + g.x);
    }, g.r / g.s, 1e-9, 1e7);
    return original;
  },

  r_percent_increments(variant, g) {
    if (variant === 'new_ratio') return [g.p * (100 + g.a), g.q1 * (100 + g.b)];
    const k = bisect((k) => after(g.p * k, g.a) + after(g.q1 * k, g.b), g.total, 0, 1e9);
    return g.p * k;
  },

  r_variation(variant, g) {
    if (variant === 'direct_inverse') {
      const c = bisect((c) => (c * g.y1) / g.z1, g.x1, 0, 1e6);
      return (c * g.y2) / g.z2;
    }
    const rate = bisect((c) => c * g.l1 * g.b1, g.C1, 0, 1e9);
    return bisect((b) => rate * g.l2 * b, g.C2, 0, 1e6);
  },

  r_partition_conditions(variant, g) {
    if (variant === 'two_conditions') {
      const A = scan(0, g.N, (a) => a * g.q1 === g.p * (g.N - a));
      const B = scan(0, g.N, (b) => b * g.s === g.r * (g.N - b));
      return g.N - A - B;
    }
    return bisect((B) => (g.v * B) / g.u + B + (g.v * B) / g.w, g.N, 0, 1e9);
  },

  r_transfer(variant, g) {
    if (variant === 'find_total') {
      const u = scan(1, 100_000, (u) => (g.p * u - g.k) * g.s === (g.q1 * u + g.k) * g.r);
      return (g.p + g.q1) * u;
    }
    const first = (g.T0 * g.p) / (g.p + g.q1);
    return scan(1, g.T0, (k) => (first - k) * g.s === (g.T0 - first + k) * g.r);
  },

  r_share_change(variant, g) {
    if (variant === 'new_ratio') return [g.a * (100 + g.x), g.b * (100 - g.y), g.c * 100];
    const total = (N) => {
      const k = N / (g.a + g.b + g.c);
      return after(g.a * k, g.x) + after(g.b * k, -g.y) + after(g.c * k, g.z);
    };
    return bisect(total, g.N2, 0, 1e10);
  },
};
