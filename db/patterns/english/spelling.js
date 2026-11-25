'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'spelling',
  patterns: [
    {
      key: 'choose_correct_spelling',
      emoji: '🔤',
      name: t('Choose the correctly spelt word', 'সঠিক বানানের শব্দটি বাছো'),
      spot: t(
        'Four spellings of one word are given, and you must pick the correct one.',
        'একটি শব্দের চারটি বানান দেওয়া আছে, সঠিকটি বেছে নিতে হবে।',
      ),
      method: [
        t('Cover the options, spell the word yourself first, then match. Do not pick the one that merely "looks right".', 'Option ঢেকে দাও, আগে নিজে বানান করো, তারপর মেলাও। "দেখতে ঠিক লাগছে" বলে বেছো না।'),
        t('Check in order: (1) ie / ei — is there a c before it? (2) double letters. (3) silent letters.', 'এই ক্রমে পরীক্ষা করো: (1) ie / ei — তার আগে c আছে কি? (2) দ্বিত্ব অক্ষর। (3) নীরব অক্ষর।'),
        t('Say the word slowly in parts: ac-com-mo-da-tion, def-i-nite-ly, ne-ce-ssa-ry.', 'শব্দটি ধীরে ধীরে অংশে ভাগ করে বলো: ac-com-mo-da-tion, def-i-nite-ly, ne-ce-ssa-ry।'),
      ],
      example: {
        question: t('Choose the correctly spelt word: (a) accomodation (b) accommodation (c) acommodation (d) accomodotion', 'সঠিক বানান বাছো: (a) accomodation (b) accommodation (c) acommodation (d) accomodotion'),
        steps: [
          t('Split it into parts: ac-com-mo-da-tion.', 'অংশে ভাগ করো: ac-com-mo-da-tion।'),
          t('"Accommodation" has a double c (ac-) and a double m (-mm-). Saying it fast hides both doubles.', '"Accommodation"-এ দুটি c (ac-) আর দুটি m (-mm-) আছে। জোরে বললে দুটি দ্বিত্বই ঢাকা পড়ে।'),
        ],
        answer: t('(b) accommodation', 'উত্তর: (b) accommodation'),
      },
      tryIt: {
        question: t('Choose the correctly spelt word.', 'সঠিক বানান বাছো।'),
        options: [t('seperate', 'seperate'), t('separate', 'separate'), t('separete', 'separete'), t('saparate', 'saparate')],
        correct: 1,
        explanation: [
          t('"Separate" hides a rat: sep-A-RAT-e.', '"Separate"-এর ভেতরে একটি rat আছে: sep-A-RAT-e।'),
          t('The middle is "a" + "rat", not "e": "seperate" and "separete" are both wrong.', 'মাঝখানে "a" + "rat", "e" নয়: "seperate" ও "separete" দুটোই ভুল।'),
        ],
      },
    },
    {
      key: 'ie_ei_rule',
      emoji: '👀',
      name: t('i before e, except after c', 'i before e, শুধু c-এর পরে ব্যতিক্রম'),
      spot: t(
        'The options differ in ie / ei, or a blank comes where ie / ei belongs (bel__ve, rec__ve).',
        'Option-গুলো ie / ei-তে আলাদা, বা ie / ei-এর জায়গায় শূন্যস্থান (bel__ve, rec__ve)।',
      ),
      method: [
        t('Sound "ee" → IE: believe, field, piece, chief, friend.', 'উচ্চারণ "ee" হলে → IE: believe, field, piece, chief, friend।'),
        t('After C → EI: receive, deceive, ceiling, conceive.', 'C-এর পরে → EI: receive, deceive, ceiling, conceive।'),
        t('Exceptions to learn by heart: weird, seize, protein, height, foreign, neither, leisure.', 'মুখস্থ করার ব্যতিক্রম: weird, seize, protein, height, foreign, neither, leisure।'),
      ],
      example: {
        question: t('Choose the correct spelling: (a) beleive (b) believe (c) belive (d) bileive', 'সঠিক বানান বাছো: (a) beleive (b) believe (c) belive (d) bileive'),
        steps: [
          t('The sound is "ee" and there is no c before it, so the rule gives "ie".', 'উচ্চারণ "ee", আর আগে কোনো c নেই, তাই নিয়মে "ie" হবে।'),
          t('"Beleive" breaks the rule; "belive" drops a letter.', '"Beleive" নিয়ম ভাঙে; "belive" একটি অক্ষর বাদ দিয়েছে।'),
        ],
        answer: t('(b) believe', 'উত্তর: (b) believe'),
      },
      tryIt: {
        question: t('Choose the correct spelling.', 'সঠিক বানান বাছো।'),
        options: [t('recieve', 'recieve'), t('receive', 'receive'), t('receeve', 'receeve'), t('riceive', 'riceive')],
        correct: 1,
        explanation: [
          t('The "c" comes before the pair, so the rule gives "ei": re-ceive.', '"C" জোড়ার আগে আছে, তাই নিয়মে "ei" হবে: re-ceive।'),
          t('"Recieve" puts "ie" after c, which is exactly what the rule forbids.', '"Recieve" c-এর পরে "ie" বসিয়েছে, নিয়ম ঠিক এটাই নিষেধ করে।'),
        ],
      },
    },
    {
      key: 'doubling_rule',
      emoji: '🔁',
      name: t('Doubling the last consonant', 'শেষ ব্যঞ্জনবর্ণের দ্বিত্ব'),
      spot: t(
        'The options differ in a doubled or single consonant before -ed / -ing / -er (runing / running, begining / beginning).',
        'Option-গুলো -ed / -ing / -er-এর আগে দ্বিত্ব বা একক ব্যঞ্জনবর্ণে আলাদা (runing / running, begining / beginning)।',
      ),
      method: [
        t('One vowel + one consonant at the end → DOUBLE before -ed / -ing / -er: big → bigger, run → running, occur → occurred.', 'শেষে একটি স্বরবর্ণ + একটি ব্যঞ্জনবর্ণ → -ed / -ing / -er-এর আগে দ্বিত্ব: big → bigger, run → running, occur → occurred।'),
        t('No doubling after two vowels (read → reading), after two consonants (help → helped), or after x, w, y (fix → fixed, play → played).', 'দুটি স্বরবর্ণের পরে (read → reading), দুটি ব্যঞ্জনবর্ণের পরে (help → helped), বা x, w, y-এর পরে দ্বিত্ব হয় না (fix → fixed, play → played)।'),
        t('Watch the exam favourites: beginning (double n), occurrence (double c, double r), embarrass (double r, double s).', 'পরীক্ষার প্রিয় শব্দগুলো দেখো: beginning (দুটি n), occurrence (দুটি c, দুটি r), embarrass (দুটি r, দুটি s)।'),
      ],
      example: {
        question: t('Choose the correct spelling: (a) runing (b) running (c) runnig (d) runingg', 'সঠিক বানান বাছো: (a) runing (b) running (c) runnig (d) runingg'),
        steps: [
          t('"Run" ends in one vowel (u) + one consonant (n), so the n doubles before -ing.', '"Run" শেষ হয়েছে একটি স্বরবর্ণ (u) + একটি ব্যঞ্জনবর্ণ (n) দিয়ে, তাই -ing-এর আগে n দ্বিত্ব হয়।'),
          t('"Runing" has one n; "runnig" doubles the wrong letter.', '"Runing"-এ একটি n; "runnig" ভুল অক্ষর দ্বিত্ব করেছে।'),
        ],
        answer: t('(b) running', 'উত্তর: (b) running'),
      },
      tryIt: {
        question: t('Choose the correct spelling.', 'সঠিক বানান বাছো।'),
        options: [t('begining', 'begining'), t('beginning', 'beginning'), t('beggining', 'beggining'), t('biginning', 'biginning')],
        correct: 1,
        explanation: [
          t('"Begin" ends in one vowel (e) + one consonant (n), so the n doubles before -ing.', '"Begin" শেষ হয়েছে একটি স্বরবর্ণ (e) + একটি ব্যঞ্জনবর্ণ (n) দিয়ে, তাই -ing-এর আগে n দ্বিত্ব হয়।'),
          t('"Begining" has only one n; the double letter is n, not g.', '"Begining"-এ একটি মাত্র n; দ্বিত্ব হবে n-এর, g-এর নয়।'),
        ],
      },
    },
    {
      key: 'drop_e_rule',
      emoji: '✂️',
      name: t('Dropping the e', 'e বাদ দেওয়া'),
      spot: t(
        'The options differ in a kept or dropped final e before -ing or another suffix (makeing / making, writeing / writing).',
        'Option-গুলো -ing বা অন্য প্রত্যয়ের আগে শেষের e রাখা বা বাদ দেওয়ায় আলাদা (makeing / making, writeing / writing)।',
      ),
      method: [
        t('Silent final E drops before a suffix starting with a vowel: make → making, hope → hoping, write → writing.', 'শেষের নীরব E স্বরবর্ণ দিয়ে শুরু প্রত্যয়ের আগে বাদ যায়: make → making, hope → hoping, write → writing।'),
        t('Before a consonant suffix the e stays: hope → hopeful, care → careful.', 'ব্যঞ্জনবর্ণের প্রত্যয়ের আগে e থাকে: hope → hopeful, care → careful।'),
        t('Keep the e after ce / ge before a / o: noticeable, courageous, changeable. Keep it in dyeing and singeing, or the meaning changes.', 'Ce / ge-এর পরে a / o এলে e থাকে: noticeable, courageous, changeable। Dyeing ও singeing-এ e থাকে, না হলে অর্থ বদলে যায়।'),
      ],
      example: {
        question: t('Choose the correct spelling: (a) makeing (b) making (c) makking (d) maiking', 'সঠিক বানান বাছো: (a) makeing (b) making (c) makking (d) maiking'),
        steps: [
          t('"Make" ends in a silent e, and "-ing" starts with a vowel, so the e drops.', '"Make" শেষ হয়েছে নীরব e দিয়ে, আর "-ing" স্বরবর্ণ দিয়ে শুরু, তাই e বাদ যায়।'),
          t('"Makking" wrongly doubles the k; "maiking" changes the vowel.', '"Makking" ভুলভাবে k দ্বিত্ব করেছে; "maiking" স্বরবর্ণ বদলে দিয়েছে।'),
        ],
        answer: t('(b) making', 'উত্তর: (b) making'),
      },
      tryIt: {
        question: t('Choose the correct spelling.', 'সঠিক বানান বাছো।'),
        options: [t('writeing', 'writeing'), t('writing', 'writing'), t('writting', 'writting'), t('wrighting', 'wrighting')],
        correct: 1,
        explanation: [
          t('"Write" drops its final e before "-ing": write → writing.', '"Write" "-ing"-এর আগে শেষের e বাদ দেয়: write → writing।'),
          t('"Writting" has two t\'s — the t never doubles, because "write" does not end in one vowel + one consonant.', '"Writting"-এ দুটি t — t কখনও দ্বিত্ব হয় না, কারণ "write" একটি স্বরবর্ণ + একটি ব্যঞ্জনবর্ণ দিয়ে শেষ হয়নি।'),
        ],
      },
    },
    {
      key: 'y_to_i_rule',
      emoji: '🔀',
      name: t('Consonant + y becomes i', 'ব্যঞ্জনবর্ণ + y হয়ে যায় i'),
      spot: t(
        'The options differ in y / i before -ed, -es, -ness or -ly (studyed / studyed, happyness / happiness).',
        'Option-গুলো -ed, -es, -ness বা -ly-এর আগে y / i-তে আলাদা (studyed / studyed, happyness / happiness)।',
      ),
      method: [
        t('Consonant + Y → I before most endings: happy → happiness, carry → carried, baby → babies, easy → easily.', 'ব্যঞ্জনবর্ণ + Y → I হয় বেশিরভাগ প্রত্যয়ের আগে: happy → happiness, carry → carried, baby → babies, easy → easily।'),
        t('Vowel + Y stays: play → played, enjoy → enjoyed, key → keys.', 'স্বরবর্ণ + Y থাকলে y থাকে: play → played, enjoy → enjoyed, key → keys।'),
        t('Before -ING, y ALWAYS stays: study → studying, carry → carrying, try → trying.', '-ING-এর আগে y সবসময় থাকে: study → studying, carry → carrying, try → trying।'),
      ],
      example: {
        question: t('Choose the correct spelling: (a) happyness (b) happiness (c) happines (d) happyniss', 'সঠিক বানান বাছো: (a) happyness (b) happiness (c) happines (d) happyniss'),
        steps: [
          t('"Happy" ends in a consonant (p) + y, so the y becomes i before "-ness".', '"Happy" শেষ হয়েছে ব্যঞ্জনবর্ণ (p) + y দিয়ে, তাই "-ness"-এর আগে y হয়ে যায় i।'),
          t('"Happyness" keeps the y; "happines" drops a letter.', '"Happyness" y রেখে দিয়েছে; "happines" একটি অক্ষর বাদ দিয়েছে।'),
        ],
        answer: t('(b) happiness', 'উত্তর: (b) happiness'),
      },
      tryIt: {
        question: t('Choose the correct spelling.', 'সঠিক বানান বাছো।'),
        options: [t('studyed', 'studyed'), t('studied', 'studied'), t('studyd', 'studyd'), t('studeid', 'studeid')],
        correct: 1,
        explanation: [
          t('"Study" ends in a consonant (d) + y, so the y becomes i before "-ed".', '"Study" শেষ হয়েছে ব্যঞ্জনবর্ণ (d) + y দিয়ে, তাই "-ed"-এর আগে y হয়ে যায় i।'),
          t('Before "-ing" the y would stay ("studying"), but "-ed" takes the i form: "studied".', '"-ing"-এর আগে y থাকত ("studying"), কিন্তু "-ed" i রূপ নেয়: "studied"।'),
        ],
      },
    },
    {
      key: 'able_ible',
      emoji: '🧩',
      name: t('-able or -ible?', '-able না -ible?'),
      spot: t(
        'The options differ in -able / -ible at the end (responsable / responsible, comfortible / comfortable).',
        'Option-গুলো শেষে -able / -ible-তে আলাদা (responsable / responsible, comfortible / comfortable)।',
      ),
      method: [
        t('If the part before the ending is a WHOLE WORD, use -ABLE: enjoy → enjoyable, comfort → comfortable, break → breakable.', 'শেষাংশের আগের অংশ পুরো শব্দ হলে -ABLE বসে: enjoy → enjoyable, comfort → comfortable, break → breakable।'),
        t('If the root CANNOT stand alone as a word, use -IBLE: vis-ible, respons-ible, poss-ible, terr-ible, aud-ible.', 'মূল অংশ একা শব্দ নয় হলে -IBLE বসে: vis-ible, respons-ible, poss-ible, terr-ible, aud-ible।'),
        t('Test it: can you remove the ending and still have a word? "Comfort" is a word, so comfortable. "Respons" is not, so responsible.', 'পরীক্ষা করো: শেষাংশ বাদ দিলেও কি শব্দ থাকে? "Comfort" একটি শব্দ, তাই comfortable। "Respons" শব্দ নয়, তাই responsible।'),
      ],
      example: {
        question: t('Choose the correctly spelt word: (a) responsable (b) responsible (c) responsibal (d) risponsible', 'সঠিক বানান বাছো: (a) responsable (b) responsible (c) responsibal (d) risponsible'),
        steps: [
          t('The ending is "-able" or "-ible".', 'শেষাংশটি "-able" না "-ible", সেটিই প্রশ্ন।'),
          t('"Respons-" cannot stand alone as a word, so the ending is "-ible".', '"Respons-" একা কোনো শব্দ নয়, তাই শেষাংশ হবে "-ible"।'),
        ],
        answer: t('(b) responsible', 'উত্তর: (b) responsible'),
      },
      tryIt: {
        question: t('Choose the correctly spelt word.', 'সঠিক বানান বাছো।'),
        options: [t('comfortible', 'comfortible'), t('comfortable', 'comfortable'), t('comfortabel', 'comfortabel'), t('cumfortable', 'cumfortable')],
        correct: 1,
        explanation: [
          t('"Comfort" is a whole word on its own, so the ending is "-able".', '"Comfort" নিজে একটি পুরো শব্দ, তাই শেষাংশ হবে "-able"।'),
          t('"Comfortible" uses the wrong ending; "comfortabel" and "cumfortable" misspell the root.', '"Comfortible" ভুল শেষাংশ ব্যবহার করেছে; "comfortabel" ও "cumfortable" মূল শব্দের বানান ভুল করেছে।'),
        ],
      },
    },
    {
      key: 'ful_fully',
      emoji: '✨',
      name: t('-ful one l, -fully two', '-ful-এ একটি l, -fully-তে দুটি'),
      spot: t(
        'The options differ in one l or two l\'s in -ful / -fully (carefuly / carefully, beautifull / beautiful).',
        'Option-গুলো -ful / -fully-তে একটি l না দুটি l-এ আলাদা (carefuly / carefully, beautifull / beautiful)।',
      ),
      method: [
        t('-FUL has ONE l: beautiful, careful, wonderful, powerful.', '-FUL-এ একটি l: beautiful, careful, wonderful, powerful।'),
        t('-FULLY has TWO l\'s: one from -ful and one from -ly: carefully, beautifully.', '-FULLY-তে দুটি l: একটি -ful-এর, একটি -ly-এর: carefully, beautifully।'),
        t('-IC adjectives take -ICALLY: basically, logically. Exception: publicly (one l after i).', '-IC adjective -ICALLY নেয়: basically, logically। ব্যতিক্রম: publicly (i-এর পরে একটি l)।'),
      ],
      example: {
        question: t('Choose the correctly spelt word: (a) carefuly (b) carefully (c) care fully (d) carefuley', 'সঠিক বানান বাছো: (a) carefuly (b) carefully (c) care fully (d) carefuley'),
        steps: [
          t('The word is "careful" + "-ly".', 'শব্দটি "careful" + "-ly"।'),
          t('"-Fully" keeps two l\'s: one from "-ful" and one from "-ly".', '"-Fully" দুটি l রাখে: একটি "-ful"-এর, একটি "-ly"-এর।'),
        ],
        answer: t('(b) carefully', 'উত্তর: (b) carefully'),
      },
      tryIt: {
        question: t('Choose the correctly spelt word.', 'সঠিক বানান বাছো।'),
        options: [t('beautifully', 'beautifully'), t('beautifullly', 'beautifullly'), t('beautifuly', 'beautifuly'), t('beautifly', 'beautifly')],
        correct: 0,
        explanation: [
          t('"Beautiful" + "-ly" gives two l\'s in total: one from "-ful", one from "-ly".', '"Beautiful" + "-ly" মোট দুটি l দেয়: একটি "-ful"-এর, একটি "-ly"-এর।'),
          t('Three l\'s ("beautifullly") and one l ("beautifuly") are both wrong.', 'তিনটি l ("beautifullly") ও একটি l ("beautifuly") দুটোই ভুল।'),
        ],
      },
    },
    {
      key: 'silent_letters',
      emoji: '🤫',
      name: t('Silent letters: written, not heard', 'নীরব অক্ষর: লেখা হয়, শোনা যায় না'),
      spot: t(
        'The options differ in a letter that is not pronounced (honest / onest, knife / nife, knowledge / nowledge).',
        'Option-গুলো এমন অক্ষরে আলাদা, যা উচ্চারিত হয় না (honest / onest, knife / nife, knowledge / nowledge)।',
      ),
      method: [
        t('Silent letters are WRITTEN but not heard: knowledge (k), honest (h), psychology (p), doubt (b), write (w), island (s), Wednesday (d).', 'নীরব অক্ষর লেখা হয়, কিন্তু শোনা যায় না: knowledge (k), honest (h), psychology (p), doubt (b), write (w), island (s), Wednesday (d)।'),
        t('Learn them as pictures, not by sound: the ear will always try to drop the silent letter.', 'এগুলো ছবির মতো শেখো, উচ্চারণ দিয়ে নয়: কান সবসময় নীরব অক্ষর বাদ দিতে চাইবে।'),
        t('In the exam, if one option drops a letter that the others keep, suspect the dropped one — the silent letter belongs in the word.', 'পরীক্ষায় কোনো option একটি অক্ষর বাদ দিলে সেটিকে সন্দেহ করো — নীরব অক্ষরটি শব্দেরই অংশ।'),
      ],
      example: {
        question: t('Choose the correct spelling: (a) onest (b) honest (c) honnest (d) honestt', 'সঠিক বানান বাছো: (a) onest (b) honest (c) honnest (d) honestt'),
        steps: [
          t('The "h" in "honest" is silent but it is written.', '"Honest"-এর "h" নীরব, কিন্তু লেখা হয়।'),
          t('"Onest" drops it; "honnest" and "honestt" add doubles that do not exist.', '"Onest" সেটি বাদ দিয়েছে; "honnest" ও "honestt" নেই এমন দ্বিত্ব যোগ করেছে।'),
        ],
        answer: t('(b) honest', 'উত্তর: (b) honest'),
      },
      tryIt: {
        question: t('Choose the correct spelling.', 'সঠিক বানান বাছো।'),
        options: [t('nife', 'nife'), t('knife', 'knife'), t('kniffe', 'kniffe'), t('knif', 'knif')],
        correct: 1,
        explanation: [
          t('The "k" in "knife" is silent but it is written.', '"Knife"-এর "k" নীরব, কিন্তু লেখা হয়।'),
          t('"Nife" drops the silent k; "kniffe" adds a double f that the word does not have.', '"Nife" নীরব k বাদ দিয়েছে; "kniffe" এমন দ্বিত্ব f যোগ করেছে যা শব্দে নেই।'),
        ],
      },
    },
  ],
};
