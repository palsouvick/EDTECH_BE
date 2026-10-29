'use strict';

/**
 * Independent solvers for the Interest hard bank: (variant, given) -> answer.
 * Interest is simulated period by period (a ledger), never taken from a formula.
 */

const { bisect, smallest, near } = require('./util');

/** Balance after `years` at simple interest, added up one year at a time. */
function simple(P, rate, years) {
  let interest = 0;
  for (let y = 0; y < years; y++) interest += (P * rate) / 100;
  return P + interest;
}
/** Balance after `periods` of compounding at `ratePerPeriod` %. */
function compound(P, ratePerPeriod, periods) {
  let balance = P;
  for (let i = 0; i < periods; i++) balance += (balance * ratePerPeriod) / 100;
  return balance;
}

module.exports = {
  i_si_two_amounts(variant, g) {
    // Search rate and principal together: the principal follows from A1 for any trial rate.
    const principalFor = (rate) => bisect((P) => simple(P, rate, g.t1), g.A1, 0, 1e9);
    const rate = bisect((rate) => simple(principalFor(rate), rate, g.t2), g.A2, 0.01, 200);
    return variant === 'find_rate' ? rate : principalFor(rate);
  },

  i_si_rate_change(variant, g) {
    if (variant === 'rate_up') return bisect((P) => simple(P, 10 + g.d, g.t) - simple(P, 10, g.t), g.D, 0, 1e9);
    return bisect((P) => simple(P, g.r, 5 + g.dt) - simple(P, g.r, 5), g.D, 0, 1e9);
  },

  i_si_multiple_times(variant, g) {
    if (variant === 'times_to_times') {
      const rate = bisect((r) => simple(100, r, g.t1), 100 * g.k1, 0, 1000);
      return bisect((t) => 100 + ((100 * rate) / 100) * t, 100 * g.k2, 0, 10_000);
    }
    return bisect((r) => (100 * r * r) / 100, (100 * g.a) / g.b, 0, 100);
  },

  i_si_split_two_rates(variant, g) {
    if (variant === 'total_interest') {
      return bisect((x) => simple(x, g.r1, g.t) - x + simple(g.P - x, g.r2, g.t) - (g.P - x), g.I, 0, g.P);
    }
    return bisect((x) => (simple(x, g.r1, g.t1) - x) - (simple(g.P - x, g.r2, g.t2) - (g.P - x)), 0, 0, g.P);
  },

  i_si_equal_amounts(variant, g) {
    const [t1, t2] = [18 - g.a1, 18 - g.a2];
    if (variant === 'share_ratio') {
      // Smallest whole-rupee shares that grow to the same amount.
      const x = smallest(1, 1_000_000, (x) => {
        const y = bisect((y) => simple(y, g.r, t2), simple(x, g.r, t1), 0, 1e9);
        return near(y, Math.round(y)) && Math.round(y) > 0;
      });
      const y = Math.round(bisect((y) => simple(y, g.r, t2), simple(x, g.r, t1), 0, 1e9));
      return [x, y];
    }
    return bisect((x) => simple(x, g.r, t1) - simple(g.P - x, g.r, t2), 0, 0, g.P);
  },

  i_ci_si_difference(variant, g) {
    const years = variant === 'two_years' ? 2 : 3;
    return bisect((P) => (compound(P, g.r, years) - P) - (simple(P, g.r, years) - P), g.D, 0, 1e10);
  },

  i_ci_consecutive_amounts(variant, g) {
    if (variant === 'find_rate') return bisect((r) => compound(g.M, r, 1), g.M2, 0, 500);
    const rate = bisect((r) => compound(g.A2, r, 1), g.A3, 0, 500);
    return bisect((P) => compound(P, rate, 2), g.A2, 0, 1e10);
  },

  // Ledger: the loan grows at simple interest; each instalment, once paid, also earns
  // simple interest to the end. The instalment that makes the two equal is the answer.
  i_si_instalments(variant, g) {
    const due = simple(g.P, g.r, g.n);
    const valueOfPayments = (x) => {
      let total = 0;
      for (let year = 1; year <= g.n; year++) total += simple(x, g.r, g.n - year);
      return total;
    };
    const x = bisect(valueOfPayments, due, 0, due);
    return variant === 'instalment' ? x : g.n * x;
  },

  i_ci_half_yearly(variant, g) {
    if (variant === 'difference') return (compound(g.P, g.r / 2, 2) - g.P) - (compound(g.P, g.r, 1) - g.P);
    return compound(g.P, g.r / 2, 3) - g.P;
  },

  i_si_ci_two_conditions(variant, g) {
    const principalFor = (rate) => bisect((P) => simple(P, rate, 2) - P, g.S, 0, 1e10);
    const rate = bisect((rate) => compound(principalFor(rate), rate, 2) - principalFor(rate), g.C, 0.01, 500);
    return variant === 'find_rate' ? rate : principalFor(rate);
  },
};
