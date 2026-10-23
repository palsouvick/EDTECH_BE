'use strict';

/**
 * Official historical cut-offs shown on the result dashboard ("WBCS Prelims
 * 2023, General: X/200"). Seeded by `npm run db:seed`.
 *
 * Deliberately empty: add only figures copied from the commission's published
 * result notice, with that notice's URL in `source_url` (required by the
 * model). The dashboard hides the indicator for exams with no entries, rather
 * than showing an estimate.
 *
 * Shape (see src/models/ExamCutoff.js):
 *   {
 *     category: 'WBPSC', exam_code: 'WBCS', exam_name: 'WBCS', stage: 'PRELIMS',
 *     year: <year>, reservation: 'General', score: <official cut-off>, max_score: 200,
 *     source_url: 'https://psc.wb.gov.in/...', notes: 'Group A & B',
 *   },
 */
module.exports = [];
