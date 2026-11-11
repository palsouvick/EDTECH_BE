'use strict';

const OFFICIAL_HOSTS = [
  'psc.wb.gov.in',
  'wbpsc.gov.in',
  'ssc.gov.in',
  'ssc.nic.in',
  'ibps.in',
  'sbi.co.in',
  'bank.sbi',
  'indiapost.gov.in',
  'wbssc.gov.in',
  'wbsc.gov.in',
];

// Documented exception (db/pyq/SOURCES.md): WBPSC never published the WBCS
// Prelims 2023 paper, so that one paper is imported from a compilation of the
// booklet on the host below. Such a source is accepted ONLY when the entry
// also carries an official answer_key_url, so every answer still comes from
// the commission's final key. Do not add hosts here without a SOURCES.md note.
const EXCEPTION_PAPER_HOSTS = ['files.wbcs.in'];

// Documented exception (db/pyq/SOURCES.md): the Commission never published the
// Clerkship papers or answer keys for 2004–2009 at all — its own previous-year
// page starts at 2019. Those papers survive only as unofficial reproductions on
// the hosts below. Such a source is accepted ONLY with no answer_key_url cited
// and only for questions imported as ADAPTED_PYQ whose answers were
// cross-checked against independent sources; the student-facing label then
// shows both UNOFFICIAL_COPY (paper) and CROSS_CHECKED (answer). Do not add
// hosts here without a SOURCES.md note.
const UNOFFICIAL_PAPER_HOSTS = ['wbpscupsc.com', 'englishsahayak.blogspot.com'];

const onHost = (url, hosts) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && hosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
};

function isOfficialSource(url) {
  return onHost(url, OFFICIAL_HOSTS);
}

function isExceptionPaperSource(url) {
  return onHost(url, EXCEPTION_PAPER_HOSTS);
}

function isUnofficialPaperSource(url) {
  return onHost(url, UNOFFICIAL_PAPER_HOSTS);
}

/** A reference to a real paper: not synthetic, with the paper and answer key on a commission's own site. */
function isVerifiedPaperRef(ref) {
  return Boolean(ref)
    && !/-SYN-/i.test(ref.question_code || '')
    && isOfficialSource(ref.source_url)
    && isOfficialSource(ref.answer_key_url);
}

/**
 * How far a real-paper reference can be trusted, for the student-facing label:
 *   answerBasis  OFFICIAL_KEY  - the answer is the commission's final key
 *                CROSS_CHECKED - no official key survives (WBCS Prelims 2015–2019); the answer
 *                                was cross-checked against independent compilations
 *   paperBasis   OFFICIAL_PAPER  - the question text is from the commission's own PDF
 *                UNOFFICIAL_COPY - the commission never published the paper (WBCS 2023)
 * Returns null for refs students must not see as a PYQ: synthetic refs, unknown hosts,
 * and keyless refs on questions that were not imported as ADAPTED_PYQ.
 */
function pyqRefBasis(ref, provenance) {
  if (!ref || /-SYN-/i.test(ref.question_code || '')) return null;
  const officialKey = isOfficialSource(ref.answer_key_url);
  if (isOfficialSource(ref.source_url)) {
    if (officialKey) return { answerBasis: 'OFFICIAL_KEY', paperBasis: 'OFFICIAL_PAPER' };
    if (!ref.answer_key_url && provenance === 'ADAPTED_PYQ') return { answerBasis: 'CROSS_CHECKED', paperBasis: 'OFFICIAL_PAPER' };
    return null;
  }
  if (isExceptionPaperSource(ref.source_url) && officialKey) return { answerBasis: 'OFFICIAL_KEY', paperBasis: 'UNOFFICIAL_COPY' };
  if (isUnofficialPaperSource(ref.source_url) && !ref.answer_key_url && provenance === 'ADAPTED_PYQ') {
    return { answerBasis: 'CROSS_CHECKED', paperBasis: 'UNOFFICIAL_COPY' };
  }
  return null;
}

function hasVerifiedPaperReference(question) {
  return (question.pyq?.refs || []).some(isVerifiedPaperRef);
}

function classifyLegacyQuestion(question) {
  if (hasVerifiedPaperReference(question)) return 'OFFICIAL_VERIFIED';

  const refs = question.pyq?.refs || [];
  const hasSyntheticRef = refs.some((ref) => /-SYN-/i.test(ref.question_code || ''));
  const hasUnverifiedRef = refs.some((ref) => !/-SYN-/i.test(ref.question_code || ''));
  if (hasUnverifiedRef) return 'UNCLASSIFIED';

  const author = question.authored_by || '';
  if (
    hasSyntheticRef
    || author === 'seed_generator'
    || author.startsWith('bulk-import:')
    || author === 'import:exam-style-json'
  ) {
    return 'ORIGINAL_PRACTICE';
  }
  return 'UNCLASSIFIED';
}

module.exports = {
  EXCEPTION_PAPER_HOSTS, UNOFFICIAL_PAPER_HOSTS, classifyLegacyQuestion, hasVerifiedPaperReference, isExceptionPaperSource, isOfficialSource, isUnofficialPaperSource, isVerifiedPaperRef, pyqRefBasis,
};
