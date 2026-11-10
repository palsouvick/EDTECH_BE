'use strict';

/**
 * The logical version of the question-bank dataset shipped with this code
 * (file imports in db/seed + db/pyq, the generators in scripts/generators,
 * the GK library and the hard banks), as opposed to the source fingerprint,
 * which is a mechanical hash of the generator files.
 *
 * Bump this when a release intentionally changes question content in a way
 * admins should be able to see and report ("the bank is on 1.1.0"), following
 * semver-ish rules:
 *   major — taxonomy/catalogue restructure or a wholesale bank replacement
 *   minor — new chapters, papers or a large batch of new/corrected questions
 *   patch — small corrections to existing questions
 *
 * The fingerprint keeps doing the mechanical change detection; the version is
 * the human-meaningful label stored next to it in seed_state and shown by the
 * status endpoints. A version change on its own re-runs the (idempotent,
 * top-up) synchronisation once and re-stamps the state.
 */
const QUESTION_BANK_VERSION = '1.0.0';

module.exports = { QUESTION_BANK_VERSION };
