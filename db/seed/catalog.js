'use strict';

/**
 * Exam catalogue + syllabus taxonomy for the four categories, in the
 * ExamCategory model's shape. Seeded by `npm run db:seed`.
 *
 * Subject and topic codes are global: "quant.profit_loss" is the same pool of
 * questions whether a student arrives from SSC or from WBPSC, and each
 * question's exam_targets decides which categories it is served to.
 *
 * Exam details (pattern, past dates, vacancies, sources) live in exams.js,
 * taken from the official notices; exams without a verified pattern have none.
 */

const EXAM_DETAILS = require('./exams');

const L = (en, bn, hi) => ({ en, bn, hi });

const T = {
  // Quantitative Aptitude
  percentage: L('Percentage', 'শতকরা', 'प्रतिशत'),
  profit_loss: L('Profit, Loss & Discount', 'লাভ, ক্ষতি ও ছাড়', 'लाभ, हानि और छूट'),
  ratio_proportion: L('Ratio & Proportion', 'অনুপাত ও সমানুপাত', 'अनुपात और समानुपात'),
  time_work: L('Time & Work', 'সময় ও কার্য', 'समय और कार्य'),
  interest: L('Simple & Compound Interest', 'সরল ও চক্রবৃদ্ধি সুদ', 'साधारण और चक्रवृद्धि ब्याज'),
  average: L('Average', 'গড়', 'औसत'),
  number_system: L('Number System', 'সংখ্যা পদ্ধতি', 'संख्या पद्धति'),
  time_speed_distance: L('Time, Speed & Distance', 'সময়, গতি ও দূরত্ব', 'समय, चाल और दूरी'),
  mixture_alligation: L('Mixture & Alligation', 'মিশ্রণ ও অ্যালিগেশন', 'मिश्रण और एलीगेशन'),
  simplification: L('Simplification & BODMAS', 'সরলীকরণ ও BODMAS', 'सरलीकरण और BODMAS'),
  algebra: L('Algebra', 'বীজগণিত', 'बीजगणित'),
  mensuration: L('Mensuration', 'পরিমিতি', 'क्षेत्रमिति'),
  partnership: L('Partnership', 'অংশীদারি কারবার', 'साझेदारी'),
  pipes_cistern: L('Pipes & Cistern', 'নল ও চৌবাচ্চা', 'पाइप और टंकी'),
  ages: L('Problems on Ages', 'বয়স সংক্রান্ত সমস্যা', 'आयु संबंधी प्रश्न'),
  // Reasoning
  analogy: L('Analogy', 'সাদৃশ্য', 'सादृश्यता'),
  coding_decoding: L('Coding-Decoding', 'কোডিং-ডিকোডিং', 'कोडिंग-डिकोडिंग'),
  series: L('Number & Letter Series', 'সংখ্যা ও অক্ষর শ্রেণি', 'संख्या और अक्षर श्रृंखला'),
  blood_relations: L('Blood Relations', 'রক্তের সম্পর্ক', 'रक्त संबंध'),
  direction_sense: L('Direction Sense', 'দিক নির্ণয়', 'दिशा ज्ञान'),
  syllogism: L('Syllogism', 'সিলোজিজম (ন্যায় অনুমান)', 'न्याय निगमन (सिलोजिज्म)'),
  seating_arrangement: L('Seating Arrangement', 'বসার বিন্যাস', 'बैठक व्यवस्था'),
  // English
  reading_comprehension: L('Reading Comprehension', 'পাঠ বোধগম্যতা', 'पठन बोध'),
  error_spotting: L('Error Spotting', 'ভুল শনাক্তকরণ', 'त्रुटि पहचान'),
  sentence_improvement: L('Sentence Improvement', 'বাক্য সংশোধন', 'वाक्य सुधार'),
  grammar: L('Grammar', 'ব্যাকরণ', 'व्याकरण'),
  fill_blanks: L('Fill in the Blanks', 'শূন্যস্থান পূরণ', 'रिक्त स्थान भरें'),
  synonyms_antonyms: L('Synonyms & Antonyms', 'সমার্থক ও বিপরীত শব্দ', 'पर्यायवाची और विलोम'),
  idioms_phrases: L('Idioms & Phrases', 'বাগধারা ও শব্দগুচ্ছ', 'मुहावरे और वाक्यांश'),
  one_word_substitution: L('One-Word Substitution', 'এক কথায় প্রকাশ', 'एक शब्द प्रतिस्थापन'),
  // General Studies
  indian_history: L('Indian History', 'ভারতের ইতিহাস', 'भारतीय इतिहास'),
  geography: L('Geography', 'ভূগোল', 'भूगोल'),
  polity: L('Indian Polity', 'ভারতীয় রাষ্ট্রব্যবস্থা', 'भारतीय राजव्यवस्था'),
  economy: L('Indian Economy', 'ভারতীয় অর্থনীতি', 'भारतीय अर्थव्यवस्था'),
  general_science: L('General Science', 'সাধারণ বিজ্ঞান', 'सामान्य विज्ञान'),
  current_affairs: L('Current Affairs', 'সাম্প্রতিক ঘটনাবলি', 'समसामयिकी'),
  banking_awareness: L('Banking Awareness', 'ব্যাংকিং সচেতনতা', 'बैंकिंग जागरूकता'),
  west_bengal_gk: L('West Bengal GK', 'পশ্চিমবঙ্গ সাধারণ জ্ঞান', 'पश्चिम बंगाल सामान्य ज्ञान'),
};

const GRAMMAR_SUBTOPICS = [
  { code: 'parts_of_speech', name: L('Parts of Speech', 'পদ-প্রকরণ', 'शब्द-भेद'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'nouns', name: L('Nouns', 'বিশেষ্য', 'संज्ञा'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'pronouns', name: L('Pronouns', 'সর্বনাম', 'सर्वनाम'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'verb_forms', name: L('Verb Forms', 'ক্রিয়ার রূপ', 'क्रिया के रूप'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'tenses', name: L('Tenses', 'কাল', 'काल'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'articles_determiners', name: L('Articles & Determiners', 'Article ও Determiner'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'prepositions', name: L('Prepositions', 'পদান্বয়ী অব্যয় (Preposition)', 'पूर्वसर्ग (Preposition)') },
  { code: 'subject_verb_agreement', name: L('Subject-Verb Agreement', 'কর্তা-ক্রিয়ার সঙ্গতি', 'कर्ता-क्रिया सामंजस्य') },
  { code: 'conjunctions', name: L('Conjunctions & Correlatives', 'সংযোজক অব্যয়', 'समुच्चयबोधक') },
  { code: 'comparison', name: L('Degrees of Comparison', 'তুলনার মাত্রা', 'तुलना की अवस्थाएँ') },
  { code: 'voice', name: L('Active & Passive Voice', 'Active ও Passive Voice', 'कर्तृवाच्य और कर्मवाच्य'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'direct_indirect_speech', name: L('Direct & Indirect Speech', 'Direct ও Indirect Speech', 'प्रत्यक्ष और अप्रत्यक्ष कथन'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'sentence_transformation', name: L('Sentence Transformation', 'বাক্য রূপান্তর', 'वाक्य रूपांतरण'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'conditional_sentences', name: L('Conditional Sentences', 'শর্তসূচক বাক্য', 'सशर्त वाक्य'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'modifiers', name: L('Modifiers', 'বর্ণনাকারী পদ', 'विशेषक'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'punctuation', name: L('Punctuation', 'বিরামচিহ্ন', 'विराम चिह्न'), syllabus_status: 'SUPPLEMENTARY' },
  { code: 'question_tags', name: L('Question Tags', 'Question Tag', 'Question Tags'), syllabus_status: 'SUPPLEMENTARY' },
];

const VOCABULARY_SUBTOPICS = {
  synonyms_antonyms: [
    { code: 'synonyms', name: L('Synonyms', 'সমার্থক শব্দ', 'पर्यायवाची शब्द') },
    { code: 'antonyms', name: L('Antonyms', 'বিপরীত শব্দ', 'विलोम शब्द') },
    { code: 'vocabulary_in_context', name: L('Vocabulary in Context', 'প্রসঙ্গ অনুযায়ী শব্দার্থ', 'संदर्भ में शब्दावली'), syllabus_status: 'SUPPLEMENTARY' },
    { code: 'multiple_meanings', name: L('Multiple-Meaning Words', 'একাধিক অর্থের শব্দ', 'अनेक अर्थ वाले शब्द'), syllabus_status: 'SUPPLEMENTARY' },
    { code: 'appropriate_word_usage', name: L('Appropriate Word Usage', 'উপযুক্ত শব্দের ব্যবহার', 'उचित शब्द प्रयोग'), syllabus_status: 'SUPPLEMENTARY' },
    { code: 'spelling_confusables', name: L('Spelling & Commonly Confused Words', 'বানান ও বিভ্রান্তিকর শব্দ', 'वर्तनी और भ्रमित करने वाले शब्द'), syllabus_status: 'SUPPLEMENTARY' },
  ],
  idioms_phrases: [
    { code: 'phrasal_verbs', name: L('Phrasal Verbs', 'Phrasal Verb', 'Phrasal Verbs'), syllabus_status: 'SUPPLEMENTARY' },
  ],
};

const PERCENTAGE_SUBTOPICS = [
  { code: 'percentage_of_number', name: L('Percentage of a Number', 'কোনো সংখ্যার শতকরা অংশ', 'किसी संख्या का प्रतिशत') },
  { code: 'what_percent', name: L('Finding What Percent', 'কত শতাংশ নির্ণয়', 'कितना प्रतिशत ज्ञात करना') },
  { code: 'percentage_change', name: L('Reverse Percentage (Original Value)', 'বিপরীত শতকরা (মূল মান নির্ণয়)', 'उल्टा प्रतिशत (मूल मान)') },
  { code: 'percentage_increase', name: L('Percentage Increase', 'শতকরা বৃদ্ধি', 'प्रतिशत वृद्धि') },
  { code: 'percentage_decrease', name: L('Percentage Decrease', 'শতকরা হ্রাস', 'प्रतिशत कमी') },
  { code: 'percentage_comparison', name: L('Percentage Comparison', 'শতকরা তুলনা', 'प्रतिशत तुलना') },
  { code: 'successive_percentage_change', name: L('Successive Percentage Change', 'ক্রমিক শতকরা পরিবর্তন', 'क्रमिक प्रतिशत परिवर्तन') },
  { code: 'compound_growth', name: L('Compound Growth', 'চক্রবৃদ্ধি বৃদ্ধি', 'चक्रवृद्धि वृद्धि') },
  { code: 'population_growth', name: L('Population Growth', 'জনসংখ্যা বৃদ্ধি', 'जनसंख्या वृद्धि') },
  { code: 'population_change', name: L('Population Percentage Change', 'জনসংখ্যার শতকরা পরিবর্তন', 'जनसंख्या में प्रतिशत परिवर्तन') },
  { code: 'finding_whole_from_percentage', name: L('Finding the Whole from a Percentage', 'শতকরা থেকে সম্পূর্ণ মান নির্ণয়', 'प्रतिशत से पूर्ण मान ज्ञात करना') },
  { code: 'marks_percentage', name: L('Percentage from Exam Marks', 'পরীক্ষার নম্বর থেকে শতকরা', 'परीक्षा अंकों से प्रतिशत') },
  { code: 'income_expenditure_savings', name: L('Income, Expenditure & Savings', 'আয়, ব্যয় ও সঞ্চয়', 'आय, व्यय और बचत') },
];

const PROFIT_LOSS_SUBTOPICS = [
  { code: 'profit_percent', name: L('Profit Percentage', 'লাভের শতকরা হার', 'लाभ प्रतिशत') },
  { code: 'loss_percent', name: L('Loss Percentage', 'ক্ষতির শতকরা হার', 'हानि प्रतिशत') },
  { code: 'find_cost_price', name: L('Find Cost Price', 'ক্রয়মূল্য নির্ণয়', 'क्रय मूल्य ज्ञात करना') },
  { code: 'marked_price_discount', name: L('Marked Price & Discount', 'চিহ্নিত মূল্য ও ছাড়', 'अंकित मूल्य और छूट') },
  { code: 'two_articles_same_price', name: L('Two Articles Sold at the Same Price', 'একই দামে দুটি জিনিস বিক্রি', 'एक ही मूल्य पर दो वस्तुओं की बिक्री') },
  { code: 'cp_sp_articles', name: L('Cost Price and Selling Price of Articles', 'জিনিসের ক্রয়মূল্য ও বিক্রয়মূল্য', 'वस्तुओं का क्रय मूल्य और विक्रय मूल्य') },
];

const topics = (...codes) =>
  codes.map((code) => ({
    code,
    name: T[code],
    syllabus_status: 'UNVERIFIED',
    subtopics: code === 'grammar'
      ? GRAMMAR_SUBTOPICS
      : code === 'percentage'
        ? PERCENTAGE_SUBTOPICS
        : code === 'profit_loss'
          ? PROFIT_LOSS_SUBTOPICS
          : VOCABULARY_SUBTOPICS[code] || [],
  }));

const QUANT = topics(
  'percentage', 'profit_loss', 'ratio_proportion', 'time_work', 'interest',
  'average', 'number_system', 'time_speed_distance', 'mixture_alligation',
  'simplification', 'algebra', 'mensuration', 'partnership', 'pipes_cistern', 'ages',
);
const REASONING = topics(
  'analogy', 'coding_decoding', 'series', 'blood_relations', 'direction_sense', 'syllogism', 'seating_arrangement',
);
const ENGLISH = topics(
  'reading_comprehension', 'error_spotting', 'sentence_improvement', 'grammar',
  'fill_blanks', 'synonyms_antonyms', 'idioms_phrases', 'one_word_substitution',
);
const GS_CORE = ['indian_history', 'geography', 'polity', 'economy', 'general_science', 'current_affairs'];

const quant = { code: 'quant', name: L('Quantitative Aptitude', 'পরিমাণগত দক্ষতা', 'मात्रात्मक योग्यता'), topics: QUANT };
const english = { code: 'english', name: L('English Language', 'ইংরেজি ভাষা', 'अंग्रेज़ी भाषा'), topics: ENGLISH };
const reasoning = (name) => ({ code: 'reasoning', name, topics: REASONING });
const gs = (name, extra = []) => ({ code: 'gs', name, topics: topics(...GS_CORE, ...extra) });

const exam = (code, en, bn = en, hi = en) => ({ code, name: L(en, bn, hi), stages: [], ...EXAM_DETAILS[code] });

module.exports = [
  {
    code: 'SSC',
    name: L('SSC', 'SSC', 'SSC'),
    conducting_body: L('Staff Selection Commission', 'স্টাফ সিলেকশন কমিশন', 'कर्मचारी चयन आयोग'),
    website: 'https://ssc.gov.in',
    display_order: 1,
    exams: [exam('SSC_CGL', 'CGL'), exam('SSC_CHSL', 'CHSL'), exam('SSC_MTS', 'MTS')],
    subjects: [
      quant,
      reasoning(L('General Intelligence & Reasoning', 'সাধারণ বুদ্ধিমত্তা ও যুক্তি', 'सामान्य बुद्धि और तर्क')),
      english,
      gs(L('General Awareness', 'সাধারণ সচেতনতা', 'सामान्य जागरूकता')),
    ],
  },
  {
    code: 'BANK',
    name: L('Banking', 'ব্যাংকিং', 'बैंकिंग'),
    conducting_body: L('IBPS & SBI', 'IBPS ও SBI', 'IBPS और SBI'),
    display_order: 2,
    exams: [exam('IBPS_PO', 'IBPS PO'), exam('IBPS_CLERK', 'IBPS Clerk'), exam('SBI_PO', 'SBI PO'), exam('SBI_CLERK', 'SBI Clerk')],
    subjects: [
      quant,
      reasoning(L('Reasoning Ability', 'যুক্তি ক্ষমতা', 'तर्क क्षमता')),
      english,
      gs(L('General & Banking Awareness', 'সাধারণ ও ব্যাংকিং সচেতনতা', 'सामान्य और बैंकिंग जागरूकता'), ['banking_awareness']),
    ],
  },
  {
    code: 'WBPSC',
    name: L('WBPSC', 'WBPSC', 'WBPSC'),
    conducting_body: L('West Bengal Public Service Commission', 'পশ্চিমবঙ্গ পাবলিক সার্ভিস কমিশন', 'पश्चिम बंगाल लोक सेवा आयोग'),
    website: 'https://psc.wb.gov.in',
    display_order: 3,
    exams: [
      exam('WBCS', 'WBCS'),
      exam('WBPSC_CLERKSHIP', 'Clerkship', 'ক্লার্কশিপ', 'क्लर्कशिप'),
      exam('WBPSC_MISC', 'Miscellaneous', 'মিসলেনিয়াস', 'मिसलेनियस'),
    ],
    subjects: [
      quant,
      reasoning(L('Reasoning & Mental Ability', 'যুক্তি ও মানসিক দক্ষতা', 'तर्क और मानसिक क्षमता')),
      english,
      gs(L('General Studies', 'সাধারণ পাঠ', 'सामान्य अध्ययन'), ['west_bengal_gk']),
    ],
  },
  {
    code: 'WB_POST',
    name: L('WB Post Office', 'পশ্চিমবঙ্গ ডাক বিভাগ', 'पश्चिम बंगाल डाक विभाग'),
    conducting_body: L('India Post, West Bengal Circle', 'ভারতীয় ডাক, পশ্চিমবঙ্গ সার্কেল', 'भारतीय डाक, पश्चिम बंगाल सर्कल'),
    display_order: 4,
    exams: [
      exam('WB_POST_GDS', 'GDS'),
      exam('WB_POST_POSTMAN', 'Postman', 'পোস্টম্যান', 'पोस्टमैन'),
      exam('WB_POST_MTS', 'MTS'),
    ],
    subjects: [
      quant,
      reasoning(L('Reasoning', 'যুক্তি', 'तर्क')),
      english,
      gs(L('General Knowledge', 'সাধারণ জ্ঞান', 'सामान्य ज्ञान'), ['west_bengal_gk']),
    ],
  },
];
