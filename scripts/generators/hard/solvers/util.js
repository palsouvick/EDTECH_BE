'use strict';

/**
 * Helpers for the independent solvers. Solvers deliberately avoid the closed-form
 * formulas the generators use: they search (bisection, integer scans) or simulate
 * (year by year, day by day), so a wrong formula in a generator shows up as a
 * mismatch in test/hardBanks.test.js.
 */

/** Root of fn(x) = target on [lo, hi] for a monotonic fn (either direction). */
function bisect(fn, target, lo, hi, iterations = 200) {
  let fLo = fn(lo) - target;
  const fHi = fn(hi) - target;
  if (fLo === 0) return lo;
  if (fHi === 0) return hi;
  if (Math.sign(fLo) === Math.sign(fHi)) throw new Error(`bisect: no sign change on [${lo}, ${hi}]`);
  for (let i = 0; i < iterations; i++) {
    const mid = (lo + hi) / 2;
    const fMid = fn(mid) - target;
    if (fMid === 0) return mid;
    if (Math.sign(fMid) === Math.sign(fLo)) {
      lo = mid;
      fLo = fMid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}

/**
 * The only integer in [from, to] that satisfies pred. Throws when there is none, and
 * also when there is more than one: a question with two valid answers is ambiguous.
 */
function scan(from, to, pred) {
  let found = null;
  for (let i = from; i <= to; i++) {
    if (!pred(i)) continue;
    if (found !== null) throw new Error(`scan: ambiguous, both ${found} and ${i} fit`);
    found = i;
  }
  if (found === null) throw new Error(`scan: nothing in [${from}, ${to}]`);
  return found;
}

/** Equal up to floating-point noise (absolute, so large counts never match a neighbour). */
/** The smallest integer in [from, to] that satisfies pred (for scale-free answers such as ratios). */
function smallest(from, to, pred) {
  for (let i = from; i <= to; i++) if (pred(i)) return i;
  throw new Error(`smallest: nothing in [${from}, ${to}]`);
}

const near = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps;

module.exports = { bisect, scan, smallest, near };
