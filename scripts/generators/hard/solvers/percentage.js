'use strict';

/** Independent solvers for the Percentage hard bank: (variant, given) -> answer. */

const { bisect, scan, near } = require('./util');

const after = (x, ...rates) => rates.reduce((v, r) => v + (v * r) / 100, x);

module.exports = {
  pct_three_step_net(_v, { a, b, c }) {
    const start = 1_000_000;
    return ((after(start, a, -b, c) - start) / start) * 100;
  },

  pct_comparison_chain(variant, g) {
    if (variant === 'two_links') {
      const C = 1000;
      const A = after(after(C, -g.b), g.a);
      return ((A - C) / C) * 100;
    }
    const wheat = 1000;
    const rice = after(wheat, g.a);
    const maize = after(wheat, -g.c);
    return ((rice - maize) / rice) * 100;
  },

  pct_expenditure_consumption(_v, { a, b = 0 }) {
    const price = 50;
    const qty = 40;
    const allowed = after(price * qty, b);
    const newQty = allowed / after(price, a);
    return ((qty - newQty) / qty) * 100;
  },

  pct_reverse_successive(variant, g) {
    if (variant === 'final_value') return bisect((x) => after(x, g.a, -g.b), g.final, 0, 1e8);
    return bisect((x) => Math.abs(after(x, g.a, -g.b) - x), g.diff, 0, 1e9);
  },

  pct_election(variant, g) {
    const tally = (N) => {
      const cast = after(N, -g.n);
      const valid = after(cast, -g.i);
      const winner = (valid * g.w) / 100;
      return { winner, loser: valid - winner };
    };
    if (variant === 'margin_to_total') return bisect((N) => tally(N).winner - tally(N).loser, g.margin, 0, 1e9);
    return tally(g.N).loser;
  },

  pct_income_savings(variant, g) {
    const savingsChange = (b) => {
      const income = 5000;
      const spend = income - (income * g.s) / 100;
      const saved = income - spend;
      return ((after(income, g.a) - after(spend, b) - saved) / saved) * 100;
    };
    if (variant === 'savings_change') return savingsChange(g.b);
    return bisect(savingsChange, g.c, -99, 500);
  },

  pct_pass_marks(variant, { a, b, m, n }) {
    const M = scan(1, 100_000, (x) => near((a * x) / 100 + m, (b * x) / 100 - n));
    return variant === 'max_marks' ? M : (((a * M) / 100 + m) / M) * 100;
  },

  pct_overlap_fail(variant, g) {
    const regions = (N) => {
      const both = (N * g.z) / 100;
      const onlyE = (N * g.x) / 100 - both;
      const onlyM = (N * g.y) / 100 - both;
      return { passedBoth: N - onlyE - onlyM - both, exactlyOne: onlyE + onlyM };
    };
    if (variant === 'total_from_passed') return bisect((N) => regions(N).passedBoth, g.P, 0, 1e9);
    return regions(g.N).exactlyOne;
  },

  pct_dimension_reverse(_v, { a, c, _cSign }) {
    return bisect((b) => after(after(100, a), b) - 100, _cSign * c, -99.99, 1000);
  },

  pct_population_groups(variant, g) {
    if (variant === 'find_men') return scan(0, g.N, (M) => near(after(M, g.m) + after(g.N - M, g.w), after(g.N, g.o)));
    const W = scan(0, g.N, (w) => near(after(g.N - w, g.m) + after(w, -g.w), g.N) && w > 0);
    return after(W, -g.w);
  },

  pct_salary_chain(variant, g) {
    const salaries = (C) => {
      const B = after(C, -g.b);
      return { A: after(B, g.a), B, C };
    };
    if (variant === 'total_known') {
      const C = bisect((c) => { const s = salaries(c); return s.A + s.B + s.C; }, g.total, 0, 1e9);
      return salaries(C).A;
    }
    return bisect((c) => Math.abs(salaries(c).A - c), g.d, 0, 1e10);
  },
};
