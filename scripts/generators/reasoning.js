'use strict';

const { ri, pick, sample, shuffle, T, same, NAMES_M, NAMES_F, NAMES_ALL, names, build, numOptions, textOptions } = require('./common');

const S = same;
const num = (v) => S(String(v));
const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const pos = (c) => A.indexOf(c) + 1;
const letter = (p) => A[((p - 1) % 26 + 26) % 26];
const shiftWord = (w, k) => [...w].map((c) => letter(pos(c) + k)).join('');
const altShift = (w, k) => [...w].map((c, i) => letter(pos(c) + (i % 2 === 0 ? k : -k))).join('');
const rev = (w) => [...w].reverse().join('');
const opp = (w) => [...w].map((c) => letter(27 - pos(c))).join('');
const sumPos = (w) => [...w].reduce((s, c) => s + pos(c), 0);

// ---------------------------------------------------------------- Coding-Decoding (সংকেতায়ন ও সংকেতমোচন)
const WORDS = [
  'PLANT', 'TRAIN', 'HOUSE', 'RIVER', 'MONEY', 'LIGHT', 'WATER', 'BREAD', 'STONE', 'CLOUD', 'SMILE', 'PAPER',
  'CHAIR', 'TABLE', 'GRAPE', 'HEART', 'MOUSE', 'OCEAN', 'PLANE', 'QUEEN', 'TIGER', 'WORLD', 'YOUTH', 'BRAIN',
  'CLOCK', 'DREAM', 'EARTH', 'FIELD', 'GLASS', 'HORSE', 'JUICE', 'KNIFE', 'LEMON', 'MANGO', 'NURSE', 'PIANO',
  'ROUND', 'SUGAR', 'TOAST', 'UNCLE', 'VOICE', 'WHEAT', 'BRAVE', 'CANDY', 'DAISY', 'EAGLE', 'FLAME', 'GREEN',
  'HAPPY', 'IVORY', 'MARKET', 'GARDEN', 'BRIDGE', 'FOREST', 'SCHOOL', 'FRIEND', 'WINDOW', 'ORANGE', 'SILVER', 'PLANET',
];

function codeQ(kind) {
  return () => {
    const [w1, w2] = sample(WORDS, 2);
    const head = (c1, w) => ({
      en: `In a certain code language, "${w1}" is written as "${c1}". How will "${w}" be written in that code?`,
      bn: `একটি সংকেত ভাষায় "${w1}"-কে "${c1}" লেখা হয়। ওই সংকেতে "${w}"-কে কীভাবে লেখা হবে?`,
    });
    if (kind === 'shift') {
      const k = pick([1, 2, 3, 4, 5, -1, -2, -3]);
      const c1 = shiftWord(w1, k);
      const dirEn = k > 0 ? 'forward' : 'backward';
      const dirBn = k > 0 ? 'এগিয়ে' : 'পিছিয়ে';
      return build({
        topic: 'coding_decoding', subtopic: 'letter_shifting', tags: ['coding', 'letter_shift'], difficulty: ri(1, 3), time: 45,
        stem: T(head(c1, w2).en, head(c1, w2).bn),
        correct: S(shiftWord(w2, k)),
        wrong: [{ ...S(shiftWord(w2, k > 0 ? k + 1 : k - 1)), trap: T('Shift miscounted by one place.', 'অক্ষরের ঘর গণনায় একটি ঘর ভুল হয়েছে।') }, { ...S(shiftWord(w2, -k)), trap: T('Direction of the shift reversed.', 'শিফটের দিক উল্টে গেছে।') }, S(rev(shiftWord(w2, k)))],
        steps: [
          T(`Compare ${w1} → ${c1}: every letter moves ${Math.abs(k)} place(s) ${dirEn}.`, `${w1} → ${c1} মিলিয়ে দেখো: প্রতিটি অক্ষর ${Math.abs(k)} ঘর ${dirBn} গেছে।`),
          T(`Apply the same shift to ${w2}: ${shiftWord(w2, k)}.`, `${w2}-এ একই নিয়ম প্রয়োগ করলে: ${shiftWord(w2, k)}।`),
        ],
        shortcut: T('Check the first letter shift and verify it on the last letter.', 'প্রথম অক্ষরের ব্যবধান দেখে শেষ অক্ষরে যাচাই করো।'),
      });
    }
    if (kind === 'reverse') {
      const c1 = rev(w1);
      return build({
        topic: 'coding_decoding', subtopic: 'reverse_order', tags: ['coding', 'reverse'], difficulty: 1, time: 30,
        stem: T(head(c1, w2).en, head(c1, w2).bn),
        correct: S(rev(w2)),
        wrong: [S(shiftWord(w2, 1)), S(w2[w2.length - 1] + w2.slice(1, -1) + w2[0]), S(opp(w2))],
        steps: [
          T(`${w1} is written backwards as ${c1}.`, `${w1}-কে উল্টো দিক থেকে লিখলে ${c1} হয়।`),
          T(`So ${w2} → ${rev(w2)}.`, `সুতরাং ${w2} → ${rev(w2)}।`),
        ],
        shortcut: T('If the code has the same letters in reverse, simply reverse the new word.', 'সংকেতে একই অক্ষর উল্টো ক্রমে থাকলে নতুন শব্দটিও উল্টে লেখো।'),
      });
    }
    if (kind === 'alt') {
      const k = ri(1, 3);
      const c1 = altShift(w1, k);
      return build({
        topic: 'coding_decoding', subtopic: 'alternate_shifting', tags: ['coding', 'alternate_shift'], difficulty: ri(3, 4), time: 60,
        stem: T(head(c1, w2).en, head(c1, w2).bn),
        correct: S(altShift(w2, k)),
        wrong: [{ ...S(altShift(w2, -k)), trap: T('Started with the wrong sign.', 'শুরুর চিহ্ন (+/−) উল্টে গেছে।') }, S(shiftWord(w2, k)), S(altShift(w2, k + 1))],
        steps: [
          T(`Odd-position letters move +${k}, even-position letters move −${k} (${w1} → ${c1}).`, `বিজোড় স্থানের অক্ষর +${k}, জোড় স্থানের অক্ষর −${k} (${w1} → ${c1})।`),
          T(`Apply to ${w2}: ${altShift(w2, k)}.`, `${w2}-এ প্রয়োগ করলে: ${altShift(w2, k)}।`),
        ],
        shortcut: T('Compare the first two letters separately to detect alternating signs.', 'প্রথম দুটি অক্ষরের ব্যবধান আলাদা করে দেখলে পর্যায়ক্রমিক চিহ্ন ধরা যায়।'),
      });
    }
    if (kind === 'opposite') {
      return build({
        topic: 'coding_decoding', subtopic: 'opposite_letters', tags: ['coding', 'mirror_letters'], difficulty: ri(2, 3), time: 40,
        stem: T(`If each letter of the word "${w1}" is replaced by its opposite letter in the English alphabet (A↔Z, B↔Y …), what will the new word be?`, `"${w1}" শব্দটির প্রতিটি অক্ষরকে ইংরেজি বর্ণমালার বিপরীত অক্ষর (A↔Z, B↔Y …) দিয়ে বদলালে নতুন শব্দটি কী হবে?`),
        correct: S(opp(w1)),
        wrong: [S(rev(opp(w1))), S(shiftWord(w1, 1)), S(rev(w1))],
        steps: [
          T('Opposite letter position = 27 − (position of the letter).', 'বিপরীত অক্ষরের ক্রমিক সংখ্যা = ২৭ − (অক্ষরটির ক্রমিক সংখ্যা)।'),
          T(`${w1} → ${opp(w1)}.`, `${w1} → ${opp(w1)}।`),
        ],
        shortcut: T('Pairs add up to 27: A-Z, B-Y, C-X, M-N.', 'জোড়ার যোগফল ২৭: A-Z, B-Y, C-X, M-N।'),
      });
    }
    // position sum
    const ans = sumPos(w1);
    const { correct, wrong } = numOptions(ans, num, [[ans + 1, 'Missed one letter value.', 'একটি অক্ষরের মান বাদ গেছে।'], [ans - 2, 'Misread a letter position.', 'একটি অক্ষরের ক্রমিক সংখ্যা ভুল ধরা হয়েছে।']]);
    return build({
      topic: 'coding_decoding', subtopic: 'letter_position_sum', tags: ['coding', 'alphabet_position'], difficulty: ri(2, 3), time: 45,
      stem: T(`If A = 1, B = 2, C = 3 … Z = 26, what is the sum of the values of all letters in the word "${w1}"?`, `যদি A = 1, B = 2, C = 3 … Z = 26 হয়, তবে "${w1}" শব্দটির সব অক্ষরের মানের যোগফল কত?`),
      correct, wrong,
      steps: [
        T([...w1].map((c) => `${c}=${pos(c)}`).join(', '), [...w1].map((c) => `${c}=${pos(c)}`).join(', ')),
        T(`Sum = ${[...w1].map(pos).join(' + ')} = ${ans}.`, `যোগফল = ${[...w1].map(pos).join(' + ')} = ${ans}।`),
      ],
      shortcut: T('Memorise key positions: E=5, J=10, O=15, T=20, Y=25.', 'মনে রাখো: E=5, J=10, O=15, T=20, Y=25।'),
    });
  };
}

// ---------------------------------------------------------------- Blood Relations (রক্তের সম্পর্ক)
const REL = [
  ['my mother’s brother', 'M', null, 'Maternal uncle', 'মামা', 'আমার মায়ের ভাই'],
  ['my father’s sister', 'F', null, 'Paternal aunt', 'পিসি', 'আমার বাবার বোন'],
  ['my father’s father', 'M', null, 'Paternal grandfather', 'ঠাকুরদা', 'আমার বাবার বাবা'],
  ['my father’s mother', 'F', null, 'Paternal grandmother', 'ঠাকুমা', 'আমার বাবার মা'],
  ['my mother’s father', 'M', null, 'Maternal grandfather', 'দাদু', 'আমার মায়ের বাবা'],
  ['my mother’s mother', 'F', null, 'Maternal grandmother', 'দিদিমা', 'আমার মায়ের মা'],
  ['my father’s brother’s son', 'M', null, 'Cousin', 'খুড়তুতো/জ্যাঠতুতো ভাই', 'আমার বাবার ভাইয়ের ছেলে'],
  ['my mother’s sister’s husband', 'M', null, 'Uncle (mother’s sister’s husband)', 'মেসোমশাই', 'আমার মায়ের বোনের স্বামী'],
  ['my father’s brother’s wife', 'F', null, 'Aunt (father’s brother’s wife)', 'কাকিমা/জেঠিমা', 'আমার বাবার ভাইয়ের স্ত্রী'],
  ['my sister’s husband', 'M', null, 'Brother-in-law (sister’s husband)', 'ভগ্নীপতি', 'আমার বোনের স্বামী'],
  ['my brother’s wife', 'F', null, 'Sister-in-law', 'ভাবি/বউদি', 'আমার ভাইয়ের স্ত্রী'],
  ['my brother’s son', 'M', null, 'Nephew', 'ভাইপো/ভাগ্নে', 'আমার ভাইয়ের ছেলে'],
  ['my brother’s daughter', 'F', null, 'Niece', 'ভাইঝি/ভাগ্নি', 'আমার ভাইয়ের মেয়ে'],
  ['my son’s wife', 'F', null, 'Daughter-in-law', 'পুত্রবধূ', 'আমার ছেলের স্ত্রী'],
  ['my daughter’s husband', 'M', null, 'Son-in-law', 'জামাই', 'আমার মেয়ের স্বামী'],
  ['my son’s son', 'M', null, 'Grandson', 'নাতি', 'আমার ছেলের ছেলে'],
  ['my daughter’s daughter', 'F', null, 'Granddaughter', 'নাতনি', 'আমার মেয়ের মেয়ে'],
  ['my mother’s only son', 'M', 'F', 'Brother', 'ভাই', 'আমার মায়ের একমাত্র ছেলে'],
  ['my husband’s mother', 'F', 'F', 'Mother-in-law', 'শাশুড়ি', 'আমার স্বামীর মা'],
  ['my wife’s father', 'M', 'M', 'Father-in-law', 'শ্বশুর', 'আমার স্ত্রীর বাবা'],
  ['my wife’s brother', 'M', 'M', 'Brother-in-law (wife’s brother)', 'শ্যালক', 'আমার স্ত্রীর ভাই'],
  ['my husband’s sister', 'F', 'F', 'Sister-in-law (husband’s sister)', 'ননদ', 'আমার স্বামীর বোন'],
];

function relPhraseQ() {
  const [phrase, g, sp, ansEn, ansBn, phraseBn] = pick(REL);
  const spPool = sp === 'F' ? NAMES_F : sp === 'M' ? NAMES_M : NAMES_ALL;
  const who = pick(spPool);
  const person = g === 'M' ? 'man' : 'woman';
  const pronoun = g === 'M' ? 'He' : 'She';
  const pool = REL.filter((r) => r[1] === g && r[3] !== ansEn).map((r) => T(r[3], r[4]));
  const { correct, wrong } = textOptions(T(ansEn, ansBn), pool);
  return build({
    topic: 'blood_relations', subtopic: 'relation_statement', tags: ['blood_relation', 'family_tree'], difficulty: ri(2, 4), time: 40,
    stem: T(`Pointing to a ${person}, ${who.en} said, "${pronoun} is ${phrase}." How is the ${person} related to ${who.en}?`, `একজন ${g === 'M' ? 'পুরুষ' : 'মহিলা'}কে দেখিয়ে ${who.bn} বলল, "${g === 'M' ? 'ইনি' : 'ইনি'} ${phraseBn}।" ${g === 'M' ? 'ওই পুরুষটি' : 'ওই মহিলাটি'} ${who.bn}-এর কী হন?`),
    correct, wrong,
    steps: [
      T(`The ${person} is "${phrase}", so the relation is ${ansEn}.`, `${g === 'M' ? 'পুরুষটি' : 'মহিলাটি'} "${phraseBn}", অতএব সম্পর্ক: ${ansBn}।`),
    ],
    shortcut: T('Draw a quick family tree: use □ for males, ○ for females.', 'দ্রুত বংশলতিকা আঁকো: পুরুষের জন্য □, মহিলার জন্য ○।'),
  });
}

function relChainQ() {
  const kind = ri(0, 5);
  const [a, b, c, d] = names(4).map((n) => n);
  if (kind === 0) {
    const parent = pick([['father', 'বাবা', 'Paternal uncle (father’s brother)', 'কাকা/জ্যাঠা'], ['mother', 'মা', 'Maternal uncle', 'মামা']]);
    const { correct, wrong } = textOptions(T(parent[2], parent[3]), [T('Nephew', 'ভাইপো/ভাগ্নে'), T('Cousin', 'ভাই-বোন (খুড়তুতো/জ্যাঠতুতো)'), T('Brother', 'ভাই'), T('Grandfather', 'ঠাকুরদা/দাদু')]);
    return build({
      topic: 'blood_relations', subtopic: 'chain_relation', tags: ['blood_relation', 'chain'], difficulty: 3, time: 50,
      stem: T(`${a.en} is the brother of ${b.en}. ${b.en} is the sister of ${c.en}. ${c.en} is the ${parent[0]} of ${d.en}. How is ${a.en} related to ${d.en}?`, `${a.bn} ${b.bn}-এর ভাই। ${b.bn} ${c.bn}-এর বোন। ${c.bn} ${d.bn}-এর ${parent[1]}। ${a.bn} ${d.bn}-এর কী হন?`),
      correct, wrong,
      steps: [
        T(`${a.en} and ${c.en} are siblings (${a.en} is male), and ${c.en} is the ${parent[0]} of ${d.en}.`, `${a.bn} ও ${c.bn} ভাই-বোন (${a.bn} পুরুষ), আর ${c.bn} ${d.bn}-এর ${parent[1]}।`),
        T(`So ${a.en} is ${d.en}'s ${parent[2]}.`, `সুতরাং ${a.bn}, ${d.bn}-এর ${parent[3]}।`),
      ],
      shortcut: T('Convert each statement into sibling/parent links and chain them.', 'প্রতিটি বিবৃতিকে ভাই-বোন/অভিভাবক সম্পর্কে রূপান্তর করে শিকল তৈরি করো।'),
    });
  }
  if (kind === 1) {
    const ch = pick([['son', 'ছেলে'], ['daughter', 'মেয়ে']]);
    const { correct, wrong } = textOptions(T('Maternal grandfather', 'দাদু'), [T('Paternal grandfather', 'ঠাকুরদা'), T('Father', 'বাবা'), T('Uncle', 'কাকা/মামা'), T('Brother', 'ভাই')]);
    return build({
      topic: 'blood_relations', subtopic: 'chain_relation', tags: ['blood_relation', 'chain'], difficulty: 3, time: 50,
      stem: T(`${a.en} is the father of ${b.en}. ${c.en} is the sister of ${b.en}. ${d.en} is the ${ch[0]} of ${c.en}. How is ${a.en} related to ${d.en}?`, `${a.bn} ${b.bn}-এর বাবা। ${c.bn} ${b.bn}-এর বোন। ${d.bn} ${c.bn}-এর ${ch[1]}। ${a.bn} ${d.bn}-এর কী হন?`),
      correct, wrong,
      steps: [
        T(`${c.en} is also ${a.en}'s daughter (sister of ${b.en}).`, `${c.bn}-ও ${a.bn}-এর মেয়ে (${b.bn}-এর বোন)।`),
        T(`${d.en} is ${c.en}'s child, so ${a.en} is the maternal grandfather.`, `${d.bn} ${c.bn}-এর সন্তান, তাই ${a.bn} মাতামহ (দাদু)।`),
      ],
      shortcut: T('A daughter’s child calls the daughter’s father “maternal grandfather”.', 'মেয়ের সন্তানের কাছে মেয়ের বাবা মাতামহ।'),
    });
  }
  if (kind === 2) {
    const { correct, wrong } = textOptions(T('Grandson', 'নাতি'), [T('Son', 'ছেলে'), T('Nephew', 'ভাইপো/ভাগ্নে'), T('Brother', 'ভাই'), T('Father', 'বাবা')]);
    const [x, y, z] = names(3, NAMES_M).concat([]);
    return build({
      topic: 'blood_relations', subtopic: 'chain_relation', tags: ['blood_relation', 'chain'], difficulty: 3, time: 50,
      stem: T(`${x.en} is the brother of ${y.en}. ${z.en} is the mother of ${y.en}. ${d.en} is the father of ${z.en}. How is ${x.en} related to ${d.en}?`, `${x.bn} ${y.bn}-এর ভাই। ${z.bn} ${y.bn}-এর মা। ${d.bn} ${z.bn}-এর বাবা। ${x.bn} ${d.bn}-এর কী হন?`),
      correct, wrong,
      steps: [
        T(`${x.en} is the son of ${z.en}, and ${d.en} is ${z.en}'s father.`, `${x.bn} ${z.bn}-এর ছেলে, আর ${d.bn} ${z.bn}-এর বাবা।`),
        T(`Hence ${x.en} is ${d.en}'s grandson.`, `অতএব ${x.bn} ${d.bn}-এর নাতি।`),
      ],
      shortcut: T('Go up one generation at a time: sibling → parent → grandparent.', 'প্রজন্ম ধরে ধরে ওঠো: ভাই-বোন → অভিভাবক → ঠাকুরদা/দাদু।'),
    });
  }
  if (kind === 3) {
    const [m, f] = [pick(NAMES_M), pick(NAMES_F)];
    const isM = ri(0, 1) === 0;
    const sp = isM ? m : f;
    const { correct, wrong } = textOptions(isM ? T('Son', 'ছেলে') : T('Daughter', 'মেয়ে'), [T('Brother', 'ভাই'), T('Nephew', 'ভাইপো/ভাগ্নে'), T('Cousin', 'ভাই-বোন (খুড়তুতো/জ্যাঠতুতো)'), T('Father', 'বাবা'), T('Husband', 'স্বামী'), T('Sister', 'বোন')]);
    return build({
      topic: 'blood_relations', subtopic: 'puzzle_statement', tags: ['blood_relation', 'photograph'], difficulty: 4, time: 60,
      stem: isM
        ? T(`Pointing to a man in a photograph, ${sp.en} said, "I have no brother or sister, but that man's father is my father's son." How is the man related to ${sp.en}?`, `একটি ছবিতে একজন পুরুষকে দেখিয়ে ${sp.bn} বলল, "আমার কোনো ভাই বা বোন নেই, কিন্তু ওই পুরুষটির বাবা আমার বাবার ছেলে।" ওই পুরুষটি ${sp.bn}-এর কী হন?`)
        : T(`Pointing to a woman in a photograph, ${sp.en} said, "I have no brother or sister, but that woman's mother is my mother's daughter." How is the woman related to ${sp.en}?`, `একটি ছবিতে একজন মহিলাকে দেখিয়ে ${sp.bn} বলল, "আমার কোনো ভাই বা বোন নেই, কিন্তু ওই মহিলাটির মা আমার মায়ের মেয়ে।" ওই মহিলাটি ${sp.bn}-এর কী হন?`),
      correct, wrong,
      steps: [
        T(`With no siblings, "my ${isM ? "father's son" : "mother's daughter"}" is ${sp.en} himself/herself.`, `কোনো ভাই-বোন না থাকায় "আমার ${isM ? 'বাবার ছেলে' : 'মায়ের মেয়ে'}" মানে বক্তা নিজেই।`),
        T(`So the person in the photograph is ${sp.en}'s ${isM ? 'son' : 'daughter'}.`, `সুতরাং ছবির ব্যক্তি ${sp.bn}-এর ${isM ? 'ছেলে' : 'মেয়ে'}।`),
      ],
      shortcut: T('“My father’s son” with no brother = myself.', 'ভাই না থাকলে "আমার বাবার ছেলে" = আমি নিজে।'),
    });
  }
  if (kind === 4) {
    const { correct, wrong } = textOptions(T('Brother', 'ভাই'), [T('Uncle', 'কাকা/মামা'), T('Nephew', 'ভাইপো/ভাগ্নে'), T('Father', 'বাবা'), T('Cousin', 'ভাই-বোন (খুড়তুতো/জ্যাঠতুতো)')]);
    const s1 = pick(NAMES_F);
    const s2 = pick(NAMES_F.filter((x) => x.en !== s1.en));
    const [m1, m2] = names(2, NAMES_M);
    return build({
      topic: 'blood_relations', subtopic: 'chain_relation', tags: ['blood_relation', 'chain'], difficulty: 4, time: 55,
      stem: T(`${s1.en} and ${s2.en} are sisters. ${m1.en} is the son of ${s2.en}. ${m2.en} is the maternal uncle of ${m1.en}. How is ${m2.en} related to ${s1.en}?`, `${s1.bn} ও ${s2.bn} দুই বোন। ${m1.bn} ${s2.bn}-এর ছেলে। ${m2.bn} ${m1.bn}-এর মামা। ${m2.bn} ${s1.bn}-এর কী হন?`),
      correct, wrong,
      steps: [
        T(`A maternal uncle is the mother's brother, so ${m2.en} is ${s2.en}'s brother.`, `মামা হলেন মায়ের ভাই, তাই ${m2.bn} ${s2.bn}-এর ভাই।`),
        T(`${s1.en} is ${s2.en}'s sister, hence ${m2.en} is ${s1.en}'s brother.`, `${s1.bn} ${s2.bn}-এর বোন, অতএব ${m2.bn} ${s1.bn}-এরও ভাই।`),
      ],
      shortcut: T('Maternal uncle = mother’s brother; siblings share the same brothers.', 'মামা = মায়ের ভাই; ভাই-বোনদের ভাই একই।'),
    });
  }
  const { correct, wrong } = textOptions(T('Husband', 'স্বামী'), [T('Brother', 'ভাই'), T('Father', 'বাবা'), T('Son', 'ছেলে'), T('Uncle', 'কাকা/মামা')]);
  const w = pick(NAMES_F);
  const h = pick(NAMES_M);
  const k = pick(NAMES_ALL);
  return build({
    topic: 'blood_relations', subtopic: 'chain_relation', tags: ['blood_relation', 'chain'], difficulty: 3, time: 45,
    stem: T(`${w.en} is the mother of ${k.en}. ${h.en} is the father of ${k.en}. ${h.en} is married to ${w.en}. How is ${h.en} related to ${w.en}?`, `${w.bn} ${k.bn}-এর মা। ${h.bn} ${k.bn}-এর বাবা। ${h.bn}-এর বিয়ে ${w.bn}-এর সঙ্গে হয়েছে। ${h.bn} ${w.bn}-এর কী হন?`),
    correct, wrong,
    steps: [T(`${h.en} is ${w.en}'s spouse and is male, so he is her husband.`, `${h.bn}, ${w.bn}-এর বিবাহিত সঙ্গী এবং পুরুষ, তাই স্বামী।`)],
    shortcut: T('Identify the gender of each person first.', 'প্রথমে প্রতিটি ব্যক্তির লিঙ্গ চিহ্নিত করো।'),
  });
}

// ---------------------------------------------------------------- Number Series (সংখ্যা ধারা)
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

function seriesQ(subtopic, terms, h, rule, hints, difficulty, shortcut) {
  const ans = terms[h];
  const shown = terms.map((t, i) => (i === h ? '?' : t)).join(', ');
  const { correct, wrong } = numOptions(ans, num, hints);
  return build({
    topic: 'number_series', subtopic, tags: ['series', subtopic], difficulty, time: 45,
    stem: T(`Find the missing number (?) in the series:\n${shown}`, `সংখ্যাধারাটির (?) স্থানে কোন সংখ্যাটি বসবে:\n${shown}`),
    correct, wrong,
    steps: [rule, T(`Applying the rule, ? = ${ans}.`, `নিয়ম প্রয়োগ করে পাই, ? = ${ans}।`)],
    shortcut,
  });
}
const wrongRule = (v) => [v, 'Applied only the first difference/ratio.', 'শুধু প্রথম ব্যবধান/অনুপাত ধরে নেওয়া হয়েছে।'];

const SERIES = {
  ap: () => {
    const up = ri(0, 1) === 0;
    const a = up ? ri(2, 40) : ri(60, 150);
    const d = up ? ri(2, 15) : -ri(3, 12);
    const terms = Array.from({ length: 6 }, (_, i) => a + d * i);
    const h = ri(2, 5);
    return seriesQ('arithmetic_progression', terms, h, T(`Common difference = ${d}.`, `সাধারণ ব্যবধান = ${d}।`), [], ri(1, 2), T('Subtract consecutive terms to find the constant difference.', 'পরপর পদের বিয়োগফল ধ্রুবক কি না দেখো।'));
  },
  gp: () => {
    const a = ri(1, 6);
    const r = ri(2, 4);
    const terms = Array.from({ length: 6 }, (_, i) => a * r ** i);
    const h = ri(2, 5);
    return seriesQ('geometric_progression', terms, h, T(`Each term is multiplied by ${r}.`, `প্রতিটি পদকে ${r} দিয়ে গুণ করা হয়েছে।`), [[terms[h - 1] + (terms[1] - terms[0]), 'Added the first difference instead of multiplying.', 'গুণের বদলে প্রথম ব্যবধান যোগ করা হয়েছে।']], 2, T('Divide a term by the previous one to check for a constant ratio.', 'পূর্ববর্তী পদ দিয়ে ভাগ করে ধ্রুবক অনুপাত আছে কি না দেখো।'));
  },
  squares: () => {
    const n = ri(2, 15);
    const k = ri(-3, 5);
    const terms = Array.from({ length: 6 }, (_, i) => (n + i) ** 2 + k);
    const h = ri(2, 5);
    return seriesQ('squares', terms, h, T(`Terms follow n² ${k >= 0 ? '+' : '−'} ${Math.abs(k)} for n = ${n}, ${n + 1}, ${n + 2}, …`, `পদগুলি n² ${k >= 0 ? '+' : '−'} ${Math.abs(k)} নিয়মে, n = ${n}, ${n + 1}, ${n + 2}, …`), [[((n + h) ** 2) + k + 1, 'Right pattern, small calculation slip.', 'নিয়ম ঠিক, কিন্তু গণনায় সামান্য ভুল।']], 2, T('Memorise squares up to 30 and cubes up to 15.', '৩০ পর্যন্ত বর্গ এবং ১৫ পর্যন্ত ঘন মুখস্থ রাখো।'));
  },
  cubes: () => {
    const n = ri(1, 8);
    const k = ri(-2, 4);
    const terms = Array.from({ length: 5 }, (_, i) => (n + i) ** 3 + k);
    const h = ri(2, 4);
    return seriesQ('cubes', terms, h, T(`Terms follow n³ ${k >= 0 ? '+' : '−'} ${Math.abs(k)} for n = ${n}, ${n + 1}, …`, `পদগুলি n³ ${k >= 0 ? '+' : '−'} ${Math.abs(k)} নিয়মে, n = ${n}, ${n + 1}, …`), [[((n + h) ** 2) + k, 'Used squares instead of cubes.', 'ঘনের বদলে বর্গ ধরা হয়েছে।']], 3, T('If terms grow fast but not by a constant ratio, test cubes.', 'পদগুলি দ্রুত বাড়ে কিন্তু অনুপাত ধ্রুবক নয় — ঘন পরীক্ষা করো।'));
  },
  incDiff: () => {
    const a = ri(1, 30);
    const s = ri(1, 5);
    const inc = ri(1, 3);
    const terms = [a];
    for (let i = 0; i < 5; i++) terms.push(terms[i] + s + inc * i);
    const h = ri(3, 5);
    return seriesQ('increasing_difference', terms, h, T(`Differences are ${terms.slice(1).map((t, i) => t - terms[i]).join(', ')}: they increase by ${inc} each time.`, `ব্যবধানগুলি ${terms.slice(1).map((t, i) => t - terms[i]).join(', ')}: প্রতিবার ${inc} করে বাড়ছে।`), [wrongRule(terms[h - 1] + (terms[1] - terms[0]))], 3, T('Write the differences; if they are not constant, take the second difference.', 'ব্যবধান লিখে ফেলো; ধ্রুবক না হলে দ্বিতীয় ব্যবধান দেখো।'));
  },
  squareDiff: () => {
    const m = ri(1, 4);
    const a = ri(1, 20);
    const terms = [a];
    for (let i = 0; i < 5; i++) terms.push(terms[i] + (m + i) ** 2);
    const h = ri(3, 5);
    return seriesQ('difference_squares', terms, h, T(`Differences are consecutive squares: ${Array.from({ length: 5 }, (_, i) => (m + i) ** 2).join(', ')}.`, `ব্যবধানগুলি ক্রমিক বর্গসংখ্যা: ${Array.from({ length: 5 }, (_, i) => (m + i) ** 2).join(', ')}।`), [wrongRule(terms[h - 1] + (terms[1] - terms[0]))], 4, T('Look for squares/cubes in the differences.', 'ব্যবধানগুলিতে বর্গ/ঘন সংখ্যা আছে কি না দেখো।'));
  },
  alt: () => {
    const a1 = ri(2, 20), d1 = ri(2, 6), a2 = ri(30, 60), d2 = ri(2, 8) * (ri(0, 1) ? 1 : -1);
    const terms = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? a1 + d1 * (i / 2) : a2 + d2 * ((i - 1) / 2)));
    const h = ri(2, 5);
    return seriesQ('alternating_series', terms, h, T(`Two interleaved series: odd places add ${d1}, even places ${d2 >= 0 ? 'add' : 'subtract'} ${Math.abs(d2)}.`, `দুটি পর্যায়ক্রমিক ধারা: বিজোড় স্থানে +${d1}, জোড় স্থানে ${d2 >= 0 ? '+' : '−'}${Math.abs(d2)}।`), [], 4, T('If neighbours look unrelated, split odd and even positions.', 'পাশাপাশি পদের সম্পর্ক না মিললে বিজোড় ও জোড় স্থান আলাদা করো।'));
  },
  mulAdd: () => {
    const x0 = ri(1, 6), m = ri(2, 4);
    const c = pick([-3, -2, -1, 1, 2, 3, 4, 5]);
    const terms = [x0];
    for (let i = 0; i < 5; i++) terms.push(terms[i] * m + c);
    if (terms.some((t) => t <= 0)) return null;
    const h = ri(3, 5);
    return seriesQ('multiply_and_add', terms, h, T(`Each term = previous × ${m} ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`, `প্রতিটি পদ = আগের পদ × ${m} ${c >= 0 ? '+' : '−'} ${Math.abs(c)}।`), [[terms[h - 1] * m, `Forgot to ${c >= 0 ? 'add' : 'subtract'} ${Math.abs(c)}.`, `${Math.abs(c)} ${c >= 0 ? 'যোগ' : 'বিয়োগ'} করতে ভুলে গেছে।`]], 4, T('Compare ratio of terms first, then the leftover constant.', 'আগে অনুপাত দেখো, তারপর অবশিষ্ট ধ্রুবকটি দেখো।'));
  },
  primes: () => {
    const s = ri(0, 18);
    const terms = PRIMES.slice(s, s + 6);
    const h = ri(2, 5);
    return seriesQ('prime_numbers', terms, h, T('The series lists consecutive prime numbers.', 'ধারাটি ক্রমিক মৌলিক সংখ্যার তালিকা।'), [[terms[h] + 1, 'Chose a composite number.', 'একটি যৌগিক সংখ্যা বাছা হয়েছে।']], 2, T('Memorise primes up to 100.', '১০০ পর্যন্ত মৌলিক সংখ্যা মুখস্থ রাখো।'));
  },
  fib: () => {
    const a = ri(1, 5), b = ri(2, 8);
    const terms = [a, b];
    for (let i = 2; i < 7; i++) terms.push(terms[i - 1] + terms[i - 2]);
    const h = ri(4, 6);
    return seriesQ('fibonacci_type', terms, h, T('Each term is the sum of the two preceding terms.', 'প্রতিটি পদ আগের দুটি পদের যোগফল।'), [[terms[h - 1] + (terms[h - 1] - terms[h - 2]), 'Treated it as an arithmetic progression.', 'এটিকে সমান্তর ধারা ধরা হয়েছে।']], 3, T('If growth is neither constant nor multiplicative, check the sum of two previous terms.', 'বৃদ্ধি ধ্রুবকও নয়, গুণিতকও নয় — আগের দুই পদের যোগফল দেখো।'));
  },
  nn1: () => {
    const n = ri(1, 9);
    const k = ri(0, 3);
    const terms = Array.from({ length: 6 }, (_, i) => (n + i) * (n + i + 1) + k);
    const h = ri(2, 5);
    return seriesQ('n_into_n_plus_1', terms, h, T(`Terms follow n(n+1)${k ? ` + ${k}` : ''} for n = ${n}, ${n + 1}, …`, `পদগুলি n(n+1)${k ? ` + ${k}` : ''} নিয়মে, n = ${n}, ${n + 1}, …`), [wrongRule(terms[h - 1] + (terms[1] - terms[0]))], 4, T('Differences 4, 6, 8… point to n(n+1).', 'ব্যবধান ৪, ৬, ৮… হলে n(n+1) নিয়ম সম্ভব।'));
  },
};

// ---------------------------------------------------------------- Syllogism (ন্যায়/সিলোজিজম)
const NOUNS = [
  ['Pens', 'কলম'], ['Books', 'বই'], ['Tables', 'টেবিল'], ['Chairs', 'চেয়ার'], ['Cats', 'বিড়াল'], ['Dogs', 'কুকুর'],
  ['Birds', 'পাখি'], ['Flowers', 'ফুল'], ['Trees', 'গাছ'], ['Roads', 'রাস্তা'], ['Cars', 'গাড়ি'], ['Doctors', 'ডাক্তার'],
  ['Teachers', 'শিক্ষক'], ['Fruits', 'ফল'], ['Mangoes', 'আম'], ['Stones', 'পাথর'], ['Clocks', 'ঘড়ি'], ['Boats', 'নৌকা'],
].map(([en, bn]) => T(en, bn));

const KINDS = ['all', 'some', 'no', 'somenot'];
const present = (mask, r) => (mask >> (r - 1)) & 1;
function holds(kind, x, y, mask) {
  let anyBoth = false;
  let anyOnly = false;
  for (let r = 1; r <= 7; r++) {
    if (!present(mask, r)) continue;
    const inX = (r & x) !== 0;
    const inY = (r & y) !== 0;
    if (inX && inY) anyBoth = true;
    if (inX && !inY) anyOnly = true;
  }
  if (kind === 'all') return !anyOnly;
  if (kind === 'some') return anyBoth;
  if (kind === 'no') return !anyBoth;
  return anyOnly;
}
const stmt = (kind, X, Y) => {
  if (kind === 'all') return T(`All ${X.en} are ${Y.en}`, `সকল ${X.bn}ই ${Y.bn}`);
  if (kind === 'some') return T(`Some ${X.en} are ${Y.en}`, `কিছু ${X.bn} ${Y.bn}`);
  if (kind === 'no') return T(`No ${X.en} are ${Y.en}`, `কোনো ${X.bn}ই ${Y.bn} নয়`);
  return T(`Some ${X.en} are not ${Y.en}`, `কিছু ${X.bn} ${Y.bn} নয়`);
};
const randStmt = (pair) => {
  const [p, q] = ri(0, 1) ? pair : [pair[1], pair[0]];
  return { kind: pick(KINDS), x: p, y: q };
};

function syllogismQ() {
  const target = ri(0, 3);
  const sets = sample(NOUNS, 3);
  const bit = [1, 2, 4];
  const pairs = [[0, 1], [1, 2], [0, 2]];
  for (let attempt = 0; attempt < 120; attempt++) {
    const [pa, pb] = sample(pairs, 2);
    const prem = [randStmt(pa), randStmt(pb)];
    const models = [];
    for (let m = 1; m < 128; m++) {
      let nonEmpty = true;
      for (const b of bit) {
        let ok = false;
        for (let r = 1; r <= 7; r++) if (present(m, r) && (r & b)) ok = true;
        if (!ok) nonEmpty = false;
      }
      if (nonEmpty && prem.every((p) => holds(p.kind, bit[p.x], bit[p.y], m))) models.push(m);
    }
    if (!models.length) continue;
    const concs = [randStmt(pick(pairs)), randStmt(pick(pairs))];
    if (concs[0].kind === concs[1].kind && concs[0].x === concs[1].x && concs[0].y === concs[1].y) continue;
    const follows = concs.map((c) => models.every((m) => holds(c.kind, bit[c.x], bit[c.y], m)));
    const cls = follows[0] && follows[1] ? 2 : follows[0] ? 0 : follows[1] ? 1 : 3;
    if (cls !== target) continue;
    const labels = [
      T('Only conclusion I follows', 'শুধুমাত্র সিদ্ধান্ত I অনুসরণ করে'),
      T('Only conclusion II follows', 'শুধুমাত্র সিদ্ধান্ত II অনুসরণ করে'),
      T('Both conclusions I and II follow', 'সিদ্ধান্ত I ও II উভয়ই অনুসরণ করে'),
      T('Neither conclusion I nor II follows', 'সিদ্ধান্ত I বা II কোনোটিই অনুসরণ করে না'),
    ];
    const ps = prem.map((p) => stmt(p.kind, sets[p.x], sets[p.y]));
    const cs = concs.map((c) => stmt(c.kind, sets[c.x], sets[c.y]));
    const verdict = (i) => (follows[i] ? { en: 'holds in every possible Venn diagram', bn: 'সম্ভাব্য প্রতিটি ভেন চিত্রে সত্য' } : { en: 'fails in at least one Venn diagram', bn: 'অন্তত একটি ভেন চিত্রে মেলে না' });
    return build({
      topic: 'syllogism', subtopic: 'two_statements_two_conclusions', tags: ['syllogism', 'venn'], difficulty: ri(3, 5), time: 60,
      stem: T(`Statements:\n1. ${ps[0].en}\n2. ${ps[1].en}\nConclusions:\nI. ${cs[0].en}\nII. ${cs[1].en}\nWhich of the following follows?`, `বিবৃতি:\n১. ${ps[0].bn}\n২. ${ps[1].bn}\nসিদ্ধান্ত:\nI. ${cs[0].bn}\nII. ${cs[1].bn}\nকোনটি অনুসরণ করে?`),
      correct: labels[cls],
      wrong: labels.filter((_, i) => i !== cls),
      steps: [
        T('Draw every Venn diagram consistent with both statements.', 'দুটি বিবৃতির সঙ্গে সামঞ্জস্যপূর্ণ সব সম্ভাব্য ভেন চিত্র আঁকো।'),
        T(`Conclusion I ${verdict(0).en}; Conclusion II ${verdict(1).en}.`, `সিদ্ধান্ত I ${verdict(0).bn}; সিদ্ধান্ত II ${verdict(1).bn}।`),
      ],
      shortcut: T('A conclusion follows only if it is true in all diagrams. All+All=All; All+No=No; Some+All=Some; No+All=Some-not.', 'সিদ্ধান্ত তখনই অনুসরণ করে যখন তা সব চিত্রে সত্য। সব+সব=সব; সব+কোনো-না=কোনো-না; কিছু+সব=কিছু; কোনো-না+সব=কিছু-নয়।'),
    });
  }
  return null;
}

// ---------------------------------------------------------------- Direction Sense (দিক নির্ণয়)
const D8 = [
  ['North', 'উত্তর'], ['North-East', 'উত্তর-পূর্ব'], ['East', 'পূর্ব'], ['South-East', 'দক্ষিণ-পূর্ব'],
  ['South', 'দক্ষিণ'], ['South-West', 'দক্ষিণ-পশ্চিম'], ['West', 'পশ্চিম'], ['North-West', 'উত্তর-পশ্চিম'],
].map(([en, bn]) => T(en, bn));
const VEC = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
const dirOptions = (idx) => ({ correct: D8[idx], wrong: sample(D8.filter((_, i) => i !== idx), 3) });
const LENS = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20];

function walkQ(askDirection) {
  return () => {
    const who = pick(NAMES_M);
    for (let attempt = 0; attempt < 300; attempt++) {
      const legsN = ri(3, 4);
      let d = pick([0, 2, 4, 6]);
      let x = 0;
      let y = 0;
      const legs = [];
      for (let i = 0; i < legsN; i++) {
        let turn = null;
        if (i > 0) {
          turn = ri(0, 1) ? 'right' : 'left';
          d = (d + (turn === 'right' ? 2 : 6)) % 8;
        }
        const len = pick(LENS);
        x += VEC[d][0] * len;
        y += VEC[d][1] * len;
        legs.push({ d, len, turn });
      }
      if (!x && !y) continue;
      const dist = Math.sqrt(x * x + y * y);
      if (askDirection) {
        if (!(x === 0 || y === 0 || Math.abs(x) === Math.abs(y))) continue;
      } else if (!Number.isInteger(dist)) continue;
      const enParts = legs.map((l, i) => (i === 0 ? `walks ${l.len} m towards ${D8[l.d].en}` : `turns ${l.turn} and walks ${l.len} m`));
      const bnParts = legs.map((l, i) => (i === 0 ? `${l.len} মিটার ${D8[l.d].bn} দিকে হাঁটে` : `${l.turn === 'right' ? 'ডান' : 'বাঁ'} দিকে ঘুরে ${l.len} মিটার হাঁটে`));
      const disp = T(`Net displacement: ${Math.abs(x)} m ${x >= 0 ? 'East' : 'West'}, ${Math.abs(y)} m ${y >= 0 ? 'North' : 'South'}.`, `মোট সরণ: ${Math.abs(x)} মিটার ${x >= 0 ? 'পূর্ব' : 'পশ্চিম'}, ${Math.abs(y)} মিটার ${y >= 0 ? 'উত্তর' : 'দক্ষিণ'}।`);
      if (askDirection) {
        const idx = VEC.findIndex((v) => Math.sign(x) === v[0] && Math.sign(y) === v[1]);
        const { correct, wrong } = dirOptions(idx);
        return build({
          topic: 'direction_sense', subtopic: 'final_direction', tags: ['direction', 'displacement'], difficulty: ri(3, 4), time: 60,
          stem: T(`Starting from his house, ${who.en} ${enParts.join(', then ')}. In which direction is he now with respect to his house?`, `${who.bn} বাড়ি থেকে রওনা দিয়ে ${bnParts.join(', তারপর ')}। এখন সে বাড়ির কোন দিকে আছে?`),
          correct, wrong,
          steps: [disp, T(`He is now in the ${D8[idx].en} of the starting point.`, `সে এখন শুরুর স্থানের ${D8[idx].bn} দিকে আছে।`)],
          shortcut: T('Mark coordinates: East/North positive, West/South negative.', 'স্থানাঙ্ক ধরো: পূর্ব/উত্তর ধনাত্মক, পশ্চিম/দক্ষিণ ঋণাত্মক।'),
        });
      }
      const { correct, wrong } = numOptions(dist, (v) => T(`${v} m`, `${v} মিটার`), [[Math.abs(x) + Math.abs(y), 'Added the distances instead of using Pythagoras.', 'পিথাগোরাসের বদলে দূরত্বগুলি যোগ করা হয়েছে।']]);
      return build({
        topic: 'direction_sense', subtopic: 'shortest_distance', tags: ['direction', 'pythagoras'], difficulty: ri(2, 4), time: 60,
        stem: T(`Starting from his house, ${who.en} ${enParts.join(', then ')}. How far is he from his house now?`, `${who.bn} বাড়ি থেকে রওনা দিয়ে ${bnParts.join(', তারপর ')}। এখন সে বাড়ি থেকে কত দূরে আছে?`),
        correct, wrong,
        steps: [disp, T(`Distance = √(${x}² + ${y}²) = ${dist} m.`, `দূরত্ব = √(${x}² + ${y}²) = ${dist} মিটার।`)],
        shortcut: T('Cancel opposite moves first, then use Pythagoras (3-4-5, 5-12-13, 8-15-17).', 'আগে বিপরীত দিকের চলন কাটাকাটি করো, তারপর পিথাগোরাস (৩-৪-৫, ৫-১২-১৩, ৮-১৫-১৭)।'),
      });
    }
    return null;
  };
}

function facingQ() {
  const who = pick(NAMES_ALL);
  const start = ri(0, 7);
  const n = ri(2, 3);
  let idx = start;
  const en = [];
  const bn = [];
  for (let i = 0; i < n; i++) {
    const deg = pick([45, 90, 135, 180]);
    const cw = ri(0, 1) === 0;
    idx = (idx + (cw ? 1 : -1) * (deg / 45) + 16) % 8;
    en.push(`turns ${deg}° ${cw ? 'clockwise' : 'anticlockwise'}`);
    bn.push(`${cw ? 'ঘড়ির কাঁটার দিকে' : 'ঘড়ির কাঁটার বিপরীত দিকে'} ${deg}° ঘোরে`);
  }
  const { correct, wrong } = dirOptions(idx);
  return build({
    topic: 'direction_sense', subtopic: 'turning_angles', tags: ['direction', 'compass'], difficulty: ri(2, 4), time: 45,
    stem: T(`${who.en} is facing ${D8[start].en}. ${who.en} ${en.join(', then ')}. Which direction is ${who.en} facing now?`, `${who.bn} ${D8[start].bn} দিকে মুখ করে আছে। ${who.bn} ${bn.join(', তারপর ')}। এখন ${who.bn} কোন দিকে মুখ করে আছে?`),
    correct, wrong,
    steps: [T('Each 45° clockwise step moves one place forward on the compass (N → NE → E …).', 'ঘড়ির কাঁটার দিকে প্রতি ৪৫° মানে কম্পাসে এক ঘর এগোনো (উ → উ-পূ → পূ …)।'), T(`Final direction: ${D8[idx].en}.`, `শেষ দিক: ${D8[idx].bn}।`)],
    shortcut: T('Convert turns into a total angle, take it mod 360°, and count in 45° steps.', 'ঘূর্ণনগুলিকে মোট কোণে রূপান্তর করে ৩৬০° দিয়ে ভাগশেষ নাও, তারপর ৪৫° ধাপে গোনো।'),
  });
}

function shadowQ() {
  const who = pick(NAMES_ALL);
  const morning = ri(0, 1) === 0;
  const shadow = morning ? 6 : 2;
  const side = pick(['right', 'left', 'front', 'back']);
  const facing = side === 'right' ? (shadow + 6) % 8 : side === 'left' ? (shadow + 2) % 8 : side === 'front' ? shadow : (shadow + 4) % 8;
  const sideBn = { right: 'ডান দিকে', left: 'বাঁ দিকে', front: 'সামনে', back: 'পিছনে' }[side];
  const { correct, wrong } = dirOptions(facing);
  return build({
    topic: 'direction_sense', subtopic: 'shadow', tags: ['direction', 'shadow'], difficulty: ri(2, 3), time: 40,
    stem: T(`One ${morning ? 'morning, just after sunrise' : 'evening, just before sunset'}, ${who.en} was standing facing a pole. The shadow of the pole fell to ${side === 'front' || side === 'back' ? `${who.en}'s ${side}` : `${who.en}'s ${side}`}. Which direction was ${who.en} facing?`, `এক ${morning ? 'সকালে সূর্যোদয়ের ঠিক পরে' : 'সন্ধ্যায় সূর্যাস্তের ঠিক আগে'} ${who.bn} একটি খুঁটির দিকে মুখ করে দাঁড়িয়ে ছিল। খুঁটির ছায়া ${who.bn}-এর ${sideBn} পড়েছিল। ${who.bn} কোন দিকে মুখ করে ছিল?`),
    correct, wrong,
    steps: [
      T(`In the ${morning ? 'morning' : 'evening'} the shadow falls towards the ${morning ? 'West' : 'East'}.`, `${morning ? 'সকালে ছায়া পশ্চিম' : 'সন্ধ্যায় ছায়া পূর্ব'} দিকে পড়ে।`),
      T(`With the shadow on the ${side}, ${who.en} faces ${D8[facing].en}.`, `ছায়া ${sideBn} থাকায় ${who.bn} ${D8[facing].bn} দিকে মুখ করে ছিল।`),
    ],
    shortcut: T('Sun rises in the East, so morning shadows point West; evening shadows point East.', 'সূর্য পূর্বে ওঠে, তাই সকালের ছায়া পশ্চিমে ও সন্ধ্যার ছায়া পূর্বে পড়ে।'),
  });
}

// ---------------------------------------------------------------- Analogy (সাদৃশ্য/উপমা)
const PAIRS = {
  capital: [
    [['India', 'ভারত'], ['New Delhi', 'নতুন দিল্লি']], [['Japan', 'জাপান'], ['Tokyo', 'টোকিও']], [['France', 'ফ্রান্স'], ['Paris', 'প্যারিস']],
    [['Italy', 'ইতালি'], ['Rome', 'রোম']], [['Egypt', 'মিশর'], ['Cairo', 'কায়রো']], [['Nepal', 'নেপাল'], ['Kathmandu', 'কাঠমান্ডু']],
    [['Bangladesh', 'বাংলাদেশ'], ['Dhaka', 'ঢাকা']], [['Germany', 'জার্মানি'], ['Berlin', 'বার্লিন']], [['China', 'চীন'], ['Beijing', 'বেইজিং']],
    [['Russia', 'রাশিয়া'], ['Moscow', 'মস্কো']], [['Canada', 'কানাডা'], ['Ottawa', 'অটোয়া']], [['Australia', 'অস্ট্রেলিয়া'], ['Canberra', 'ক্যানবেরা']],
    [['Sri Lanka', 'শ্রীলঙ্কা'], ['Colombo', 'কলম্বো']], [['Bhutan', 'ভুটান'], ['Thimphu', 'থিম্পু']], [['Spain', 'স্পেন'], ['Madrid', 'মাদ্রিদ']],
  ],
  young: [
    [['Cow', 'গরু'], ['Calf', 'বাছুর']], [['Dog', 'কুকুর'], ['Puppy', 'কুকুরছানা']], [['Cat', 'বিড়াল'], ['Kitten', 'বিড়ালছানা']],
    [['Horse', 'ঘোড়া'], ['Foal', 'ঘোড়ার বাচ্চা']], [['Sheep', 'ভেড়া'], ['Lamb', 'ভেড়ার বাচ্চা']], [['Goat', 'ছাগল'], ['Kid', 'ছাগলছানা']],
    [['Hen', 'মুরগি'], ['Chick', 'মুরগিছানা']], [['Duck', 'হাঁস'], ['Duckling', 'হাঁসছানা']], [['Deer', 'হরিণ'], ['Fawn', 'হরিণশাবক']],
    [['Lion', 'সিংহ'], ['Cub', 'সিংহশাবক']], [['Frog', 'ব্যাঙ'], ['Tadpole', 'ব্যাঙাচি']], [['Swan', 'রাজহাঁস'], ['Cygnet', 'রাজহাঁসের ছানা']],
  ],
  workplace: [
    [['Doctor', 'ডাক্তার'], ['Hospital', 'হাসপাতাল']], [['Teacher', 'শিক্ষক'], ['School', 'বিদ্যালয়']], [['Judge', 'বিচারক'], ['Court', 'আদালত']],
    [['Farmer', 'কৃষক'], ['Field', 'ক্ষেত']], [['Scientist', 'বিজ্ঞানী'], ['Laboratory', 'পরীক্ষাগার']], [['Pilot', 'বিমানচালক'], ['Cockpit', 'ককপিট']],
    [['Chef', 'পাচক'], ['Kitchen', 'রান্নাঘর']], [['Actor', 'অভিনেতা'], ['Stage', 'মঞ্চ']], [['Librarian', 'গ্রন্থাগারিক'], ['Library', 'গ্রন্থাগার']],
    [['Soldier', 'সৈনিক'], ['Barracks', 'সেনা-শিবির']], [['Carpenter', 'ছুতার'], ['Workshop', 'কারখানা']], [['Priest', 'পুরোহিত'], ['Temple', 'মন্দির']],
  ],
  tool: [
    [['Pen', 'কলম'], ['Write', 'লেখা']], [['Knife', 'ছুরি'], ['Cut', 'কাটা']], [['Brush', 'তুলি'], ['Paint', 'আঁকা']],
    [['Spoon', 'চামচ'], ['Eat', 'খাওয়া']], [['Needle', 'সুঁচ'], ['Sew', 'সেলাই করা']], [['Key', 'চাবি'], ['Unlock', 'তালা খোলা']],
    [['Pedal', 'প্যাডেল'], ['Cycle', 'সাইকেল চালানো']], [['Broom', 'ঝাঁটা'], ['Sweep', 'ঝাঁট দেওয়া']], [['Axe', 'কুড়াল'], ['Chop', 'কাটা (কোপানো)']],
    [['Telescope', 'দূরবীন'], ['Observe', 'পর্যবেক্ষণ করা']], [['Oven', 'চুল্লি'], ['Bake', 'সেঁকা']], [['Hammer', 'হাতুড়ি'], ['Strike', 'আঘাত করা']],
  ],
};
const PAIR_REL = {
  capital: [['country and its capital', 'দেশ ও তার রাজধানী'], 'দেশ ও তার রাজধানী'],
  young: [['animal and its young one', 'প্রাণী ও তার শাবক'], 'প্রাণী ও তার শাবক'],
  workplace: [['person and the place of work', 'পেশাজীবী ও তার কর্মস্থল'], 'পেশাজীবী ও তার কর্মস্থল'],
  tool: [['instrument and its function', 'যন্ত্র ও তার কাজ'], 'যন্ত্র ও তার কাজ'],
};

function pairAnalogyQ() {
  const key = pick(Object.keys(PAIRS));
  const pool = PAIRS[key];
  const [p1, p2] = sample(pool, 2);
  const f = (a) => T(a[0], a[1]);
  const wrong = sample(pool.filter((p) => p !== p1 && p !== p2).map((p) => f(p[1])).concat(pool.filter((p) => p !== p2).map((p) => f(p[0]))), 3);
  const rel = PAIR_REL[key][0];
  return build({
    topic: 'analogy', subtopic: 'semantic_analogy', tags: ['analogy', key], difficulty: ri(1, 3), time: 30,
    stem: T(`${p1[0][0]} : ${p1[1][0]} :: ${p2[0][0]} : ?`, `${p1[0][1]} : ${p1[1][1]} :: ${p2[0][1]} : ?`),
    correct: f(p2[1]), wrong,
    steps: [
      T(`Relation: ${rel[0]}. ${p1[0][0]} → ${p1[1][0]}.`, `সম্পর্ক: ${rel[1]}। ${p1[0][1]} → ${p1[1][1]}।`),
      T(`Likewise ${p2[0][0]} → ${p2[1][0]}.`, `তেমনই ${p2[0][1]} → ${p2[1][1]}।`),
    ],
    shortcut: T('State the relation in one sentence and test every option against it.', 'সম্পর্কটি এক বাক্যে বলে প্রতিটি বিকল্প মিলিয়ে দেখো।'),
  });
}

function numberAnalogyQ() {
  const type = ri(0, 3);
  const a = ri(2, 15);
  let b = ri(2, 15);
  while (b === a) b = ri(2, 15);
  let f, rule;
  if (type === 0) { f = (n) => n * n; rule = T('square of the number', 'সংখ্যাটির বর্গ'); }
  else if (type === 1) { f = (n) => n ** 3; rule = T('cube of the number', 'সংখ্যাটির ঘন'); b = ri(2, 9); }
  else if (type === 2) { f = (n) => n * (n + 1); rule = T('n × (n + 1)', 'n × (n + 1)'); }
  else { f = (n) => n * n + 1; rule = T('square of the number plus 1', 'সংখ্যাটির বর্গ + ১'); }
  if (type === 1 && a > 9) return null;
  const ans = f(b);
  const { correct, wrong } = numOptions(ans, num, [[type === 1 ? b * b : b * 2, 'Applied the wrong operation.', 'ভুল প্রক্রিয়া প্রয়োগ করা হয়েছে।'], [f(b + 1), 'Used the next number.', 'পরের সংখ্যাটি ধরা হয়েছে।']]);
  return build({
    topic: 'analogy', subtopic: 'numerical_analogy', tags: ['analogy', 'number'], difficulty: ri(1, 3), time: 30,
    stem: T(`${a} : ${f(a)} :: ${b} : ?`, `${a} : ${f(a)} :: ${b} : ?`),
    correct, wrong,
    steps: [T(`Rule: ${rule.en}. ${a} → ${f(a)}.`, `নিয়ম: ${rule.bn}। ${a} → ${f(a)}।`), T(`${b} → ${ans}.`, `${b} → ${ans}।`)],
    shortcut: T('Test squares, cubes and n(n+1) on the first pair.', 'প্রথম জোড়ায় বর্গ, ঘন ও n(n+1) পরীক্ষা করো।'),
  });
}

function letterAnalogyQ() {
  const [w1, w2] = sample(WORDS.filter((w) => w.length === 5), 2);
  const k = ri(1, 4);
  const mode = ri(0, 1);
  const enc = (w) => (mode === 0 ? shiftWord(w, k) : altShift(w, k));
  return build({
    topic: 'analogy', subtopic: 'letter_analogy', tags: ['analogy', 'letters'], difficulty: ri(2, 4), time: 45,
    stem: T(`${w1} : ${enc(w1)} :: ${w2} : ?`, `${w1} : ${enc(w1)} :: ${w2} : ?`),
    correct: S(enc(w2)),
    wrong: [S(mode === 0 ? shiftWord(w2, k + 1) : altShift(w2, -k)), S(shiftWord(w2, -k)), S(rev(enc(w2)))],
    steps: [
      T(mode === 0 ? `Each letter moves ${k} place(s) forward.` : `Odd-position letters move +${k}, even-position letters move −${k}.`, mode === 0 ? `প্রতিটি অক্ষর ${k} ঘর এগিয়ে গেছে।` : `বিজোড় স্থানে +${k}, জোড় স্থানে −${k}।`),
      T(`${w2} → ${enc(w2)}.`, `${w2} → ${enc(w2)}।`),
    ],
    shortcut: T('Compare letter positions of the first pair one by one.', 'প্রথম জোড়ার অক্ষরের ক্রমিক সংখ্যা এক এক করে তুলনা করো।'),
  });
}

module.exports = {
  subject: 'reasoning',
  topics: [
    { topic: 'coding_decoding', weight: 5, gens: ['shift', 'reverse', 'alt', 'opposite', 'sum'].map(codeQ) },
    { topic: 'blood_relations', weight: 4, gens: [relPhraseQ, relChainQ] },
    { topic: 'number_series', weight: 5, gens: Object.values(SERIES) },
    { topic: 'syllogism', weight: 4, gens: [syllogismQ] },
    { topic: 'direction_sense', weight: 4, gens: [walkQ(false), walkQ(true), facingQ, shadowQ] },
    { topic: 'analogy', weight: 4, gens: [pairAnalogyQ, numberAnalogyQ, letterAnalogyQ] },
  ],
};
