'use strict';

const t = (en, bn) => ({ en, bn });
const opts = (...s) => s.map((x) => t(x, x));

module.exports = {
  subject: 'english',
  topic: 'articles',
  patterns: [
    {
      key: 'a_an_by_sound',
      emoji: '🔤',
      name: t('a or an: go by the sound', 'a না an: অক্ষর নয়, উচ্চারণ দেখো'),
      spot: t(
        'A blank comes right before a noun, an adjective or an abbreviation, and the options include a and an.',
        'Noun, adjective বা abbreviation-এর ঠিক আগে শূন্যস্থান, আর option-এ a ও an আছে।',
      ),
      method: [
        t('Say the next word aloud and listen to its first sound, not its first letter.', 'পরের শব্দটা জোরে বলে প্রথম উচ্চারণ শোনো, প্রথম অক্ষর নয়।'),
        t('Vowel sound takes an: an hour, an honest man, an MLA, an MBA.', 'স্বরধ্বনির আগে an: an hour, an honest man, an MLA, an MBA।'),
        t('Consonant sound takes a: a university, a uniform, a one-rupee coin.', 'ব্যঞ্জনধ্বনির আগে a: a university, a uniform, a one-rupee coin।'),
        t('For abbreviations, use the sound of the first letter name: M is "em", so an MBA.', 'Abbreviation-এ প্রথম অক্ষরের নামের উচ্চারণ ধরো: M হল "এম", তাই an MBA।'),
      ],
      example: {
        question: t('Fill in the blank: "The interview lasted ___ hour." (a / an / the / no article)', 'শূন্যস্থান পূরণ করো: "The interview lasted ___ hour." (a / an / the / no article)'),
        steps: [
          t('The letter h looks like a consonant, but in "hour" it is silent.', 'h দেখতে ব্যঞ্জন, কিন্তু "hour"-এ এটা উচ্চারিত হয় না।'),
          t('"Hour" sounds like "our", a vowel sound, so it takes "an".', '"Hour" শোনায় "আওয়ার", অর্থাৎ স্বরধ্বনি, তাই "an"।'),
        ],
        answer: t('an — "The interview lasted an hour."', 'উত্তর: an — "The interview lasted an hour."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Mr Sen is ___ MBA from Calcutta University."', 'শূন্যস্থান পূরণ করো: "Mr Sen is ___ MBA from Calcutta University."'),
        options: opts('a', 'an', 'the', 'no article'),
        correct: 1,
        explanation: [
          t('MBA is spoken by its letter names: "em-bee-ay". The first sound is "em", a vowel sound.', 'MBA অক্ষরের নামে বলা হয়: "এম-বি-এ"। প্রথম উচ্চারণ "এম", স্বরধ্বনি।'),
          t('A vowel sound takes "an": "Mr Sen is an MBA from Calcutta University."', 'স্বরধ্বনির আগে "an": "Mr Sen is an MBA from Calcutta University."'),
        ],
      },
    },
    {
      key: 'a_an_you_sound',
      emoji: '🎓',
      name: t('Honest, university, one-rupee: letter vs sound traps', 'Honest, university, one-rupee: অক্ষর আর উচ্চারণের ফাঁদ'),
      spot: t(
        'The next word starts with h, u, eu or o, which are the letters that most often mislead.',
        'পরের শব্দ h, u, eu বা o দিয়ে শুরু, এই অক্ষরগুলোই সবচেয়ে বেশি বিভ্রান্ত করে।',
      ),
      method: [
        t('Silent h gives a vowel sound: an hour, an honest man, an heir.', 'h উচ্চারিত না হলে স্বরধ্বনি: an hour, an honest man, an heir।'),
        t('"U" or "eu" sounding like "you" gives a consonant sound: a university, a uniform, a European.', '"U" বা "eu" যদি "ইউ" শোনায় তাহলে ব্যঞ্জনধ্বনি: a university, a uniform, a European।'),
        t('"O" sounding like "wa" gives a consonant sound: a one-rupee coin.', '"O" যদি "ওয়া" শোনায় তাহলে ব্যঞ্জনধ্বনি: a one-rupee coin।'),
      ],
      example: {
        question: t('Fill in the blank: "My brother studies in ___ university in Kolkata." (a / an / the / no article)', 'শূন্যস্থান পূরণ করো: "My brother studies in ___ university in Kolkata." (a / an / the / no article)'),
        steps: [
          t('"University" starts with the letter u, a vowel letter.', '"University" u অক্ষর দিয়ে শুরু, যা স্বরবর্ণ।'),
          t('But the sound is "you", a consonant sound, so it takes "a", not "an".', 'কিন্তু উচ্চারণ "ইউ", ব্যঞ্জনধ্বনি, তাই "a" বসবে, "an" নয়।'),
        ],
        answer: t('a — "My brother studies in a university in Kolkata."', 'উত্তর: a — "My brother studies in a university in Kolkata."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Ravi is ___ honest boy."', 'শূন্যস্থান পূরণ করো: "Ravi is ___ honest boy."'),
        options: opts('a', 'the', 'no article', 'an'),
        correct: 3,
        explanation: [
          t('In "honest" the h is silent: it is spoken "onest".', '"Honest"-এ h উচ্চারিত হয় না: বলা হয় "অনেস্ট"।'),
          t('A vowel sound takes "an": "Ravi is an honest boy."', 'স্বরধ্বনির আগে "an": "Ravi is an honest boy."'),
        ],
      },
    },
    {
      key: 'the_known_or_unique',
      emoji: '👆',
      name: t('The for something known, unique or superlative', 'জানা, একমাত্র বা superlative জিনিসের আগে the'),
      spot: t(
        'The noun was already mentioned, is the only one of its kind, or follows best / most / first.',
        'Noun-টা আগেই বলা হয়েছে, বা সেটাই একমাত্র, বা তার আগে best / most / first আছে।',
      ),
      method: [
        t('First mention takes a / an; the same thing mentioned again takes the.', 'প্রথমবার বললে a / an; একই জিনিস আবার বললে the।'),
        t('Take "the" for one-of-a-kind things: the sun, the moon, the earth.', 'একমাত্র জিনিসের আগে "the": the sun, the moon, the earth।'),
        t('A superlative or an ordinal always takes "the": the best bowler, the first time.', 'Superlative বা ordinal-এর আগে সবসময় "the": the best bowler, the first time।'),
      ],
      example: {
        question: t('Fill in the blank: "I bought a new bag. ___ bag is very light." (A / An / The / No article)', 'শূন্যস্থান পূরণ করো: "I bought a new bag. ___ bag is very light." (A / An / The / No article)'),
        steps: [
          t('The bag was already mentioned in the first sentence.', 'ব্যাগটার কথা প্রথম বাক্যেই বলা হয়েছে।'),
          t('A thing that is already known takes "the". Repeating "a" would suggest a second, different bag.', 'যা আগে থেকে জানা তার আগে "the"। "a" আবার বললে মনে হত আরেকটা আলাদা ব্যাগ।'),
        ],
        answer: t('The — "The bag is very light."', 'উত্তর: The — "The bag is very light."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Rahul is ___ best bowler in our team."', 'শূন্যস্থান পূরণ করো: "Rahul is ___ best bowler in our team."'),
        options: opts('a', 'an', 'the', 'no article'),
        correct: 2,
        explanation: [
          t('"Best" is a superlative: it compares one bowler with all the others.', '"Best" superlative: এটা একজন bowler-কে বাকি সবার সঙ্গে তুলনা করছে।'),
          t('A superlative always takes "the": "Rahul is the best bowler in our team."', 'Superlative-এর আগে সবসময় "the": "Rahul is the best bowler in our team."'),
        ],
      },
    },
    {
      key: 'the_with_names',
      emoji: '🌊',
      name: t('Names that take the (rivers, ranges, seas) and names that take none', 'যেসব নামের আগে the বসে (নদী, পর্বতমালা, সাগর) আর যেসব নামের আগে বসে না'),
      spot: t(
        'The noun is a river, sea, mountain range, newspaper, game, meal, language or a person or city name.',
        'Noun-টা নদী, সাগর, পর্বতমালা, সংবাদপত্র, খেলা, খাবারের বেলা, ভাষা, বা কোনো মানুষ বা শহরের নাম।',
      ),
      method: [
        t('"The" goes before rivers, seas, oceans, mountain ranges and newspapers: the Ganga, the Arabian Sea, the Himalayas, the Hindu.', 'নদী, সাগর, মহাসাগর, পর্বতমালা আর সংবাদপত্রের আগে "the": the Ganga, the Arabian Sea, the Himalayas, the Hindu।'),
        t('No article before names of people and cities, meals, languages and games: Rahul, Kolkata, breakfast, Bengali, cricket.', 'মানুষ ও শহরের নাম, খাবারের বেলা, ভাষা আর খেলার আগে article নেই: Rahul, Kolkata, breakfast, Bengali, cricket।'),
        t('A single mountain takes no article: Mount Everest.', 'একটি পাহাড়ের আগে article নেই: Mount Everest।'),
      ],
      example: {
        question: t('Fill in the blank: "Sourav plays ___ cricket every evening." (a / an / the / no article)', 'শূন্যস্থান পূরণ করো: "Sourav plays ___ cricket every evening." (a / an / the / no article)'),
        steps: [
          t('"Cricket" is the name of a game.', '"Cricket" একটা খেলার নাম।'),
          t('Games take no article, so "the cricket" is wrong here.', 'খেলার আগে article বসে না, তাই এখানে "the cricket" ভুল।'),
        ],
        answer: t('No article — "Sourav plays cricket every evening."', 'উত্তর: No article — "Sourav plays cricket every evening."'),
      },
      tryIt: {
        question: t('Fill in the blank: "___ Himalayas are in the north of India."', 'শূন্যস্থান পূরণ করো: "___ Himalayas are in the north of India."'),
        options: opts('A', 'An', 'No article', 'The'),
        correct: 3,
        explanation: [
          t('"Himalayas" is a mountain range, and the verb "are" shows it is plural.', '"Himalayas" একটা পর্বতমালা, আর "are" দেখাচ্ছে এটা বহুবচন।'),
          t('Mountain ranges take "the": "The Himalayas are in the north of India."', 'পর্বতমালার আগে "the": "The Himalayas are in the north of India."'),
        ],
      },
    },
    {
      key: 'place_purpose_or_building',
      emoji: '🏫',
      name: t('go to school or go to the school', 'go to school না go to the school'),
      spot: t(
        'The noun is school, college, hospital, church, prison, court or bed, and the choice is between no article and the.',
        'Noun-টা school, college, hospital, church, prison, court বা bed, আর বাছতে হবে article না থাকা আর the-এর মধ্যে।',
      ),
      method: [
        t('Ask why the person goes there: for the usual purpose (study, pray, sleep) or for some other reason.', 'ভাবো মানুষটা কেন যাচ্ছে: স্বাভাবিক উদ্দেশ্যে (পড়া, প্রার্থনা, ঘুম) না অন্য কাজে।'),
        t('Usual purpose: no article. Ravi goes to school (he is a student).', 'স্বাভাবিক উদ্দেশ্য হলে article নেই। Ravi goes to school (সে ছাত্র)।'),
        t('Only the building matters (repair, visit, deliver): use "the". The electrician went to the school.', 'শুধু বাড়িটা গুরুত্বপূর্ণ হলে (মেরামত, দেখা, পৌঁছে দেওয়া) "the"। The electrician went to the school।'),
      ],
      example: {
        question: t('Fill in the blank: "The electrician went to ___ school to repair the fans." (the / an / no article / one)', 'শূন্যস্থান পূরণ করো: "The electrician went to ___ school to repair the fans." (the / an / no article / one)'),
        steps: [
          t('He did not go to study. He went to the building for a job.', 'সে পড়তে যায়নি। কাজের জন্য বাড়িটায় গিয়েছিল।'),
          t('The building meaning needs "the". "Go to school" with no article would mean he is a student.', 'বাড়ি বোঝাতে "the" লাগে। Article ছাড়া "go to school" মানে সে ছাত্র।'),
        ],
        answer: t('the — "The electrician went to the school to repair the fans."', 'উত্তর: the — "The electrician went to the school to repair the fans."'),
      },
      tryIt: {
        question: t('Fill in the blank: "Ravi is a student; he goes to ___ school every morning."', 'শূন্যস্থান পূরণ করো: "Ravi is a student; he goes to ___ school every morning."'),
        options: opts('a', 'an', 'the', 'no article'),
        correct: 3,
        explanation: [
          t('Ravi goes there for the usual purpose of a school: to study.', 'Ravi স্কুলের স্বাভাবিক উদ্দেশ্যে যাচ্ছে: পড়তে।'),
          t('That purpose meaning takes no article: "he goes to school every morning."', 'এই উদ্দেশ্য বোঝাতে article বসে না: "he goes to school every morning."'),
        ],
      },
    },
  ],
};
