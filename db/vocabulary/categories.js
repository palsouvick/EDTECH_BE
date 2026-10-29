'use strict';

/**
 * Vocabulary Bank categories. Words may belong to several. Every file in this folder
 * uses only these codes (the seed rejects unknown ones).
 */

const t = (en, bn) => ({ en, bn });

module.exports = Object.freeze({
  common_exam: t('Commonly tested', 'পরীক্ষায় প্রায়ই আসে'),
  character_behaviour: t('People and behaviour', 'মানুষ ও আচরণ'),
  emotions_attitudes: t('Emotions and attitudes', 'অনুভূতি ও মনোভাব'),
  positive_quality: t('Positive qualities', 'ইতিবাচক গুণ'),
  negative_quality: t('Negative qualities', 'নেতিবাচক গুণ'),
  actions_verbs: t('Actions and activities', 'কাজ ও ক্রিয়া'),
  academic_formal: t('Academic and formal', 'শিক্ষাগত ও আনুষ্ঠানিক'),
  confusable_pairs: t('Frequently confused words', 'প্রায়ই গুলিয়ে যাওয়া শব্দ'),
  idiomatic: t('Idioms and phrasal verbs', 'বাগ্‌ধারা ও ফ্রেজাল ভার্ব'),
  advanced_exam: t('Advanced exam words', 'উচ্চতর পরীক্ষার শব্দ'),
});
