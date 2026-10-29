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

function isOfficialSource(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && OFFICIAL_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

/** A reference to a real paper: not synthetic, with the paper and answer key on a commission's own site. */
function isVerifiedPaperRef(ref) {
  return Boolean(ref)
    && !/-SYN-/i.test(ref.question_code || '')
    && isOfficialSource(ref.source_url)
    && isOfficialSource(ref.answer_key_url);
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

module.exports = { classifyLegacyQuestion, hasVerifiedPaperReference, isOfficialSource, isVerifiedPaperRef };
