'use strict';

/**
 * Pattern-tagging rules for the English chapters (see src/services/patternTagger.js).
 * Key order = priority. Subtopic rules win over stem rules.
 *
 * Precision first: a question is only tagged when the stem really shows the
 * pattern. Several bank formats cannot be told apart from the stem alone
 * (e.g. fill-in-the-blank vocabulary where only the options reveal look-alike
 * words), so those stay untagged on purpose.
 */

// The question part of a reading-comprehension stem is the trailing **bold** text.
const rcQ = (body, flags = 'i') => new RegExp(`\\*\\*${body}\\*\\*\\s*$`, flags);

// Matches words inside the quoted idiom right after "idiom", "phrase" or
// "expression" (double or single quotes), not in the rest of the stem.
const inIdiom = (words) => [
  new RegExp(`(?:idiom|phrase|expression)[^"']{0,20}"[^"]*\\b(?:${words})\\b[^"]*"`, 'i'),
  new RegExp(`(?:idiom|phrase|expression)[^"']{0,20}'[^']*\\b(?:${words})\\b[^']*'`, 'i'),
];

// Bold part of a sentence-improvement stem.
const bold = (body, flags = 'i') => new RegExp(`\\*\\*${body}\\*\\*`, flags);

// One blank only (several-blank items mix patterns).
const ONE_BLANK = '^(?!.*_{2,}.*_{2,})';

module.exports = {
  reading_comprehension: {
    not_true: {
      stem: [
        // capital NOT / EXCEPT inside the question (case-sensitive on purpose)
        rcQ('[^*]*\\b(?:NOT|EXCEPT)\\b[^*]*', ''),
      ],
    },
    word_meaning: {
      stem: [
        rcQ('The word "[^"]+" (?:in|as used in) the passage[^*]*'),
        rcQ('According to the passage, what does the word "[^"]+" mean\\?'),
        rcQ('In the passage[^*]*, what does the word "[^"]+" (?:mean|refer to)\\?'),
      ],
    },
    main_idea_title: {
      stem: [
        rcQ('[^*]*\\btitle (?:best )?(?:suits|fits)[^*]*'),
        rcQ('[^*]*\\bmost suitable title\\b[^*]*'),
        rcQ('[^*]*\\b(?:main|central) idea of the passage[^*]*'),
        rcQ('[^*]*\\bmain (?:point|purpose) of the passage[^*]*'),
        rcQ('[^*]*\\bpassage[^*]*\\bmainly (?:about|concerned with|highlight)[^*]*'),
        rcQ('[^*]*\\bbest sums up the passage[^*]*'),
        rcQ('[^*]*\\bpassage[^*]*\\bmainly trying to convey[^*]*'),
      ],
    },
    inference: {
      stem: [
        rcQ('[^*]*\\bcan be inferred\\b[^*]*'),
        rcQ('[^*]*\\bdoes the passage (?:suggest|imply)\\b[^*]*'),
        rcQ('[^*]*\\bWhat does this imply\\?'),
        rcQ('[^*]*\\b(?:suggest|reveal)s? about (?:him|her|his|Gutenberg|the)\\b[^*]*'),
        rcQ('[^*]*\\bwould the (?:author|scientists)[^*]*\\b(?:agree|support)[^*]*'),
        rcQ('[^*]*\\bmost likely (?:support|happen)[^*]*'),
        rcQ('What does the last sentence of the passage[^*]* suggest\\?'),
      ],
    },
    direct_fact: {
      stem: [
        // "According to the passage, who/what/where/when/which/how/why ..." – the answer is stated in the passage
        rcQ('(?:According to the passage(?: on [^,*]+)?, )(?:who|what|where|when|which|how|why|in which)\\b(?![^*]*\\b(?:mean|means|suggest|imply|infer|author|tone|attitude)\\b)[^*]*'),
        // plain wh-question that names a detail, with no opinion/meaning words
        rcQ('(?:Who|Where|When|How many|How much|How often|How far|On which|In which year)\\b(?![^*]*\\b(?:author|tone|attitude|mean|suggest|imply|infer|title)\\b)[^*]*'),
        // "..., according to the passage?" / "According to the passage, the word X comes from ..."
        rcQ('(?![^*]*\\b(?:mean|means|suggest|imply|infer|author|tone|attitude)\\b)[^*]*\\baccording to the passage\\b[^*]*'),
        rcQ('According to the passage, (?![^*]*\\b(?:mean|means|suggest|imply|infer|author|tone|attitude)\\b)[^*]*'),
        rcQ('(?:Which|What) [a-z ]+ (?:is|are) mentioned (?:as [^*]+ )?in the passage[^*]*'),
        rcQ('Which (?:of the following|factor|effect|advantage|limitation|quality|measure|group)\\b[^*]*\\b(?:mentioned|according to the passage|does the passage identify)\\b[^*]*'),
      ],
    },
  },

  error_spotting: {
    subject_verb_agreement: {
      subtopics: ['subject_verb'],
      stem: [/^Find the part of the sentence that has an error: '(?:Neither|Either|Each|One|Every) of\b/i],
    },
    uncountable_nouns: { subtopics: ['nouns'] },
    degree_of_comparison: { subtopics: ['comparison'] },
    wrong_preposition: { subtopics: ['prepositions'] },
    // "have been knowing ... since", "is knowing" – a wrong tense form of the verb
    tense_errors: { subtopics: ['tenses'] },
    // not tagged: plurals ("one of the best player"), conditionals, conjunctions
    // and verb_forms ("did not went", "said me") – no error-spotting pattern describes them
  },

  sentence_improvement: {
    conditionals: {
      stem: [
        // the sentence (in quotes) starts with an if-type clause
        /"(?:\*\*)?(?:If|Had (?:I|you|he|she|we|they)|Were (?:I|he|she|it|you|we|they)|Should (?:you|he|she|we|they)|Supposing)\b/,
        /"[^"]*\*\*if\b/i,
        /^Select the best replacement[^']*'If\b/,
      ],
    },
    perfect_tense: {
      stem: [
        // bold verb, then since/for + a time (action still going on)
        /\*\*[^*]+\*\*[^"]*\b(?:since (?:\d{4}|morning|childhood|we\b)|for (?:\d+|two|three|four|five|ten|twenty|many) (?:years|months|weeks|days|hours))/i,
        bold('[^*]+ since'),
      ],
    },
    redundancy: {
      stem: [
        bold('[^*]*\\b(?:return(?:ed)? back|repeat(?:ed)? again|revert(?:ed)? back|each and every|cousin (?:brother|sister)|true fact|own personal|free gift|both alike|two twins|past history|final outcome|consensus of opinion|again reiterated|descended down|cooperate together|unexpected surprise|necessary requisites|postponed to a later date|reason why[^*]*because|was due to|at this present moment|because of the reason that|equally as)\\b[^*]*'),
      ],
    },
    verb_agreement: {
      stem: [
        bold("(?:is|are|was|were|has|have|has been|have been|don't|doesn't|plays|rise|does not bring)"),
      ],
    },
    wrong_preposition: {
      stem: [
        // bold part ends in a preposition ("married with", "angry on", "comprises of")
        // (not "must to", "need not to", "can able to", "lot of": those are not preposition errors)
        bold('(?!more\\b|lot of\\b|usually\\b)(?![^*]*\\b(?:must|not|able|ought) to\\*\\*)[^*]{0,30}\\b(?:of|on|with|from|into|for|to|at|in|about|by|upon)'),
        // "senior than", "prefer ... than", "different than"
        /\b(?:prefer\w*|senior|junior|superior|inferior)\b[^"]*\*\*than\*\*/i,
        bold('[^*]*\\b(?:different than|entered into|abstain to|insisted to|succeeded to|prevented \\w+ to|reply the|explain me)\\b[^*]*'),
        // verbs that take no preposition: "discussed about", "reached at", "emphasised on"
        bold('[^*]*\\b(?:discuss(?:ed)?|reach(?:ed)?|emphasi[sz]ed?|comprises?|ordered) (?:about|at|on|of|for)\\b[^*]*'),
      ],
    },
  },

  grammar: {
    active_passive: { stem: [/\bpassive (?:form|voice)\b/i, /\bChange the voice\b/i, /\bactive (?:form|voice)\b/i] },
    direct_indirect: { stem: [/\b(?:indirect|reported) speech\b/i, /\bnarration\b/i] },
    question_tags: { stem: [/\bquestion tag\b/i, /,\s*_{2,}\s*\?/] },
    articles: { stem: [/\barticles?\b/i] },
    prepositions_time_place: {
      stem: [
        /_{2,}\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|night|noon|midnight|dawn|\d{4}\b|\d{1,2}(?::\d\d)?\s*(?:a\.m|p\.m|o'clock))/,
      ],
    },
    // not tagged: the bank's 151 "subject_verb_agreement" and 151 fixed-preposition
    // ("addicted ___", "applied ___ leave") questions – no grammar pattern covers them
  },

  fill_blanks: {
    fixed_preposition: {
      stem: [
        new RegExp(`${ONE_BLANK}.*\\b(?:acquitted \\w+|abstain|congratulated \\w+|died|addicted|junior|senior|absorbed|accused|averse|tired|prides \\w+|insist(?:s|ed)?|habit|capable|famous|fond|prefers \\w+|pleaded|sentenced (?:the )?\\w+|applicable|pride|deprived|angry|binding|crowded|ban|divided|rise|objected|afraid|married|cured \\w+ \\w+|absent|agreed|liking|aversion|apologised|complained|depends) _{2,}(?! (?:he|she|I|we|they|it)\\b)`),
        /^Fill in the blanks: .*\b(?:liking|insisted|agreed|married|cured \w+ \w+|absent) _{2,}/,
      ],
    },
    connectors: {
      stem: [
        new RegExp(`${ONE_BLANK}.*; _{2,},`),
        new RegExp(`${ONE_BLANK}.*[,;] _{2,} (?:he|she|I|you|we|they|it|others)\\b`),
        new RegExp(`${ONE_BLANK}^Fill in the blank: _{2,} (?:he|she|it|the|I|we|they)\\b[^,]*,`),
        new RegExp(`${ONE_BLANK}.*\\b(?:Hardly|Scarcely|No sooner) had [^_]+ _{2,} `),
        new RegExp(`${ONE_BLANK}.*\\b(?:so \\w+|Such was \\w+ \\w+) _{2,} (?:he|she|they|we|I|it)\\b`),
        new RegExp(`${ONE_BLANK}.*(?<!\\bto) _{2,} (?:he|she|I|you|we|they|it) \\w+`),
      ],
    },
    collocations: {
      stem: [
        /_{2,} (?:a |an |the |any |his |her )?(?:noise|homework|mistake|crime|notice|attention|advantage|decision|promise|havoc|speech|case|raid|(?:no-confidence )?motion|lasting impression|narrow escape|blame|key role|asleep|chance|visit|truth|to conclusions)\b/,
        /\bcup of _{2,} tea\b/,
        /\brain was so _{2,}/,
        /\bspread like _{2,}/,
      ],
    },
    phrasal_verbs: {
      stem: [
        /\b(?:went|gave|give|taken|takes|take|took|hand|broke|break|turned|turn|came|come|ran|run|get|got|dying|brought|bring|let|made|make|carried|carry|look|fell|fall|switch|set|stood|stand|kept|keep) _{2,}(?! (?:time|hour|day)\b| [a-z]+ (?:decision|view)\b)/,
        /\bhold _{2,} in\b/,
      ],
    },
    // not tagged: vocabulary / look-alike-word items ("imminent / eminent"), articles,
    // tenses and subject-verb items – the stem alone cannot show the pattern
  },

  synonyms_antonyms: {
    direct_synonym: {
      subtopics: ['synonyms'],
      stem: [/\bsynonym\b/i, /\bsimilar in meaning\b/i, /^'[^']+' means\b/i],
    },
    direct_antonym: {
      subtopics: ['antonyms'],
      stem: [/\bantonym\b/i, /\bopposite in meaning\b/i],
    },
  },

  idioms_phrases: {
    // The idiom itself must be in the stem (meaning questions). For "which idiom
    // means ..." and fill-the-blank items the idiom is only in the options.
    animal_idioms: {
      stem: inIdiom(
        "cats?|dogs?|horses?|bull|lion(?:'s)?|elephant|crocodile|fish|goose|wolf|bee|birds?|snail(?:'s)?|rat|cock|donkey|monkey|fox|pig|sheep|lamb|cow|goat|bat|crow|swan|hen|chicken|duck|tiger|mouse|ant|worm",
      ),
    },
    body_part_idioms: {
      stem: inIdiom(
        "ears?|eyes?|hand|hands|shoulder|nose|heart|head|feet|foot|heels?|leg|arm|tooth|teeth|lip|mouth|neck|bone|fingers?|thumb|wrist|tongue|hair|skin|chin|knee|elbow|brain",
      ),
    },
    number_colour_idioms: {
      stem: inIdiom(
        "one(?!['’]s)|two|three|four|five|six|sixes|seven|sevens|nine|eleventh|hundred|thousand|second|blue|red|black|white|green|yellow|pink|grey|gray|purple",
      ),
    },
    idiom_in_sentence: {
      stem: [/\bmean in the sentence\b/i],
    },
  },

  one_word_substitution: {
    phobia_words: {
      stem: [/"(?:Abnormal )?[Ff]ear (?:or (?:dislike|hatred) )?of\b/, /"\w+phobia"/i],
    },
    cide_words: {
      stem: [
        /"(?:Deliberate )?(?:Killing|Murder) of\b/,
        /"The act of killing oneself"/i,
        /"A substance (?:used to (?:destroy|kill)|that destroys)\b/,
        /"\w+cide"/i,
      ],
    },
    government_words: {
      stem: [
        /"(?:Government|Rule) (?:by|of)\b/,
        /"A government run by\b/i,
        /"A state of society without government\b/i,
        /"A (?:social system|society or family system|system) in which\b[^"]*\b(?:head|power)\b/i,
        /"\w+(?:cracy|archy)"/i,
      ],
    },
    cannot_be_words: {
      stem: [
        /"(?:\([^)]*\) )?(?:That which|that|One who) cannot be\b/i,
        /"One who cannot (?:die|pay)\b/i,
        /"That which is not fit to be\b/i,
      ],
    },
    ologist_people: {
      stem: [
        /"(?:A person|One) who (?:studies|collects)\b/i,
        /"(?:Scientific )?[Ss]tudy (?:or collection )?of\b/,
        /"Branch of medicine dealing with\b/,
        /"(?!anthology")\w+olog(?:y|ist)"/i,
      ],
    },
  },
};
