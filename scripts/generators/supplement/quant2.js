'use strict';

/**
 * More Quantitative Aptitude chapters: simplification, algebra, mensuration,
 * partnership, pipes & cistern and problems on ages. Every generator builds the
 * answer from clean integers, so the key is exact. π = 22/7 wherever a circle appears.
 */
const { ri, pick, gcd, n2, T, numOptions, build } = require('./../common');

const plain = (v) => T(n2(v), n2(v));
const unit = (en, bn) => (v) => T(`${n2(v)} ${en}`, `${n2(v)} ${bn}`);
const hint = (v, en, bn) => [v, en, bn];
const rupee = (v) => T(`₹${n2(v)}`, `₹${n2(v)}`);

// ---------------------------------------------------------------- Simplification (সরলীকরণ)
function simBodmas() {
  const e = ri(2, 9), k = ri(2, 12), d = e * k;
  const a = ri(10, 60), b = ri(2, 12), c = ri(2, 12);
  const ans = a + b * c - k;
  const o = numOptions(ans, plain, [
    hint(((a + b) * c - d) / e, 'Operations were done left to right; BODMAS does × and ÷ before + and −.', 'বাম থেকে ডানে হিসাব করা হয়েছে; BODMAS অনুযায়ী আগে × ও ÷, পরে + ও −।'),
    hint(a + b * c - d, 'The division by ' + e + ' was skipped.', e + ' দিয়ে ভাগ করা বাদ পড়েছে।'),
  ], { neg: true });
  return build({
    topic: 'simplification', subtopic: 'bodmas', tags: ['bodmas'], difficulty: 1, time: 35,
    stem: T(`Simplify: ${a} + ${b} × ${c} − ${d} ÷ ${e}`, `সরল করো: ${a} + ${b} × ${c} − ${d} ÷ ${e}`),
    ...o,
    steps: [
      T(`Multiplication and division first: ${b} × ${c} = ${b * c}, ${d} ÷ ${e} = ${k}`, `আগে গুণ ও ভাগ: ${b} × ${c} = ${b * c}, ${d} ÷ ${e} = ${k}`),
      T(`${a} + ${b * c} − ${k} = ${ans}`, `${a} + ${b * c} − ${k} = ${ans}`),
    ],
    shortcut: T('BODMAS: Brackets, Of, Division, Multiplication, Addition, Subtraction.', 'BODMAS: বন্ধনী, এর, ভাগ, গুণ, যোগ, বিয়োগ — এই ক্রমে।'),
  });
}

function simSquareDiff() {
  const a = ri(31, 99), b = ri(11, 29);
  const ans = a * a - b * b;
  const o = numOptions(ans, plain, [
    hint((a - b) * (a - b), 'a² − b² is (a − b)(a + b), not (a − b)².', 'a² − b² = (a − b)(a + b), (a − b)² নয়।'),
    hint(a * a + b * b, 'The sign between the squares is minus.', 'বর্গ দুটির মাঝে বিয়োগ চিহ্ন।'),
  ]);
  return build({
    topic: 'simplification', subtopic: 'square_difference', tags: ['algebraic_identity'], difficulty: 2, time: 40,
    stem: T(`Find the value of ${a}² − ${b}².`, `${a}² − ${b}²-এর মান নির্ণয় করো।`),
    ...o,
    steps: [
      T('a² − b² = (a − b)(a + b)', 'a² − b² = (a − b)(a + b)'),
      T(`= (${a} − ${b})(${a} + ${b}) = ${a - b} × ${a + b} = ${ans}`, `= (${a} − ${b})(${a} + ${b}) = ${a - b} × ${a + b} = ${ans}`),
    ],
    shortcut: T('Use (a − b)(a + b) instead of squaring both numbers.', 'দুটি সংখ্যার বর্গ না করে (a − b)(a + b) ব্যবহার করো।'),
  });
}

function simDecimal() {
  const a = ri(12, 99) / 10, b = ri(2, 9) / 10, c = ri(2, 40);
  const ans = Math.round((a * b + c) * 100) / 100;
  const o = numOptions(ans, plain, [
    hint(a * b * 10 + c, 'Decimal point misplaced: one decimal place × one decimal place gives two places.', 'দশমিক বিন্দু ভুল বসেছে: এক ঘর × এক ঘর = দুই ঘর দশমিক।'),
    hint(a * b + c + 1, 'Check the addition at the last step.', 'শেষ ধাপের যোগটি আবার দেখো।'),
  ]);
  return build({
    topic: 'simplification', subtopic: 'decimals', tags: ['decimals'], difficulty: 2, time: 45,
    stem: T(`Evaluate: ${a} × ${b} + ${c}`, `মান নির্ণয় করো: ${a} × ${b} + ${c}`),
    ...o,
    steps: [
      T(`${a} × ${b} = ${n2(a * b)} (multiply as whole numbers, then place 2 decimal places)`, `${a} × ${b} = ${n2(a * b)} (পূর্ণসংখ্যার মতো গুণ করে 2 ঘর দশমিক বসাও)`),
      T(`${n2(a * b)} + ${c} = ${n2(ans)}`, `${n2(a * b)} + ${c} = ${n2(ans)}`),
    ],
    shortcut: T('Decimal places in the product = sum of decimal places in the factors.', 'গুণফলে দশমিক ঘর = গুণ্য ও গুণকের দশমিক ঘরের যোগফল।'),
  });
}

function simSquareRoot() {
  const x = ri(12, 60), y = ri(3, 25);
  const ans = x + y;
  const o = numOptions(ans, plain, [
    hint(x * x + y, 'The square root applies to the whole of x² + 2xy + y² as (x + y)².', 'x² + 2xy + y² = (x + y)², পুরোটার বর্গমূল নিতে হবে।'),
    hint(x - y, 'The middle term is +2xy, so it is (x + y)², not (x − y)².', 'মাঝের পদ +2xy, তাই (x + y)², (x − y)² নয়।'),
  ]);
  const N = x * x + 2 * x * y + y * y;
  return build({
    topic: 'simplification', subtopic: 'square_root', tags: ['square_root'], difficulty: 3, time: 50,
    stem: T(`Find the value of √(${x}² + 2 × ${x} × ${y} + ${y}²).`, `√(${x}² + 2 × ${x} × ${y} + ${y}²)-এর মান কত?`),
    ...o,
    steps: [
      T(`x² + 2xy + y² = (x + y)² with x = ${x}, y = ${y}`, `x² + 2xy + y² = (x + y)², যেখানে x = ${x}, y = ${y}`),
      T(`√${N} = ${x} + ${y} = ${ans}`, `√${N} = ${x} + ${y} = ${ans}`),
    ],
    shortcut: T('Spot the perfect square pattern before calculating.', 'হিসাব করার আগে পূর্ণবর্গের গঠনটি চিনে নাও।'),
  });
}

// ---------------------------------------------------------------- Algebra (বীজগণিত)
function algSumProduct() {
  const x = ri(2, 15), y = ri(2, 15);
  const s = x + y, p = x * y, ans = x * x + y * y;
  const o = numOptions(ans, plain, [
    hint(s * s, 'x² + y² = (x + y)² − 2xy; the 2xy term was forgotten.', 'x² + y² = (x + y)² − 2xy; 2xy বাদ পড়েছে।'),
    hint(s * s + 2 * p, 'The sign is wrong: it is minus 2xy.', 'চিহ্ন ভুল: এটি −2xy।'),
  ]);
  return build({
    topic: 'algebra', subtopic: 'sum_product_identity', tags: ['algebraic_identity'], difficulty: 2, time: 40,
    stem: T(`If x + y = ${s} and xy = ${p}, find x² + y².`, `x + y = ${s} এবং xy = ${p} হলে x² + y²-এর মান কত?`),
    ...o,
    steps: [
      T('x² + y² = (x + y)² − 2xy', 'x² + y² = (x + y)² − 2xy'),
      T(`= ${s}² − 2 × ${p} = ${s * s} − ${2 * p} = ${ans}`, `= ${s}² − 2 × ${p} = ${s * s} − ${2 * p} = ${ans}`),
    ],
    shortcut: T('Memorise (x + y)² − 2xy = x² + y².', '(x + y)² − 2xy = x² + y² সূত্রটি মুখস্থ রাখো।'),
  });
}

function algCubeSum() {
  const x = ri(2, 9), y = ri(2, 9);
  const s = x + y, p = x * y, ans = x ** 3 + y ** 3;
  const o = numOptions(ans, plain, [
    hint(s ** 3, 'x³ + y³ = (x + y)³ − 3xy(x + y); the second part was left out.', 'x³ + y³ = (x + y)³ − 3xy(x + y); দ্বিতীয় অংশ বাদ পড়েছে।'),
    hint(s ** 3 + 3 * p * s, 'The sign of 3xy(x + y) is minus.', '3xy(x + y)-এর চিহ্ন বিয়োগ।'),
  ]);
  return build({
    topic: 'algebra', subtopic: 'cube_identity', tags: ['algebraic_identity'], difficulty: 3, time: 55,
    stem: T(`If x + y = ${s} and xy = ${p}, find x³ + y³.`, `x + y = ${s} এবং xy = ${p} হলে x³ + y³-এর মান নির্ণয় করো।`),
    ...o,
    steps: [
      T('x³ + y³ = (x + y)³ − 3xy(x + y)', 'x³ + y³ = (x + y)³ − 3xy(x + y)'),
      T(`= ${s}³ − 3 × ${p} × ${s} = ${s ** 3} − ${3 * p * s} = ${ans}`, `= ${s}³ − 3 × ${p} × ${s} = ${s ** 3} − ${3 * p * s} = ${ans}`),
    ],
    shortcut: T('Put the numbers straight into (x + y)³ − 3xy(x + y).', 'সরাসরি (x + y)³ − 3xy(x + y)-এ মান বসাও।'),
  });
}

function algReciprocal() {
  const k = ri(3, 14);
  const ans = k * k - 2;
  const o = numOptions(ans, plain, [
    hint(k * k, 'x² + 1/x² = (x + 1/x)² − 2; the 2 was not subtracted.', 'x² + 1/x² = (x + 1/x)² − 2; 2 বিয়োগ করা হয়নি।'),
    hint(k * k + 2, 'It is (x + 1/x)² minus 2, not plus 2.', 'এটি (x + 1/x)² − 2, +2 নয়।'),
  ]);
  return build({
    topic: 'algebra', subtopic: 'reciprocal_identity', tags: ['algebraic_identity'], difficulty: 2, time: 35,
    stem: T(`If x + 1/x = ${k}, find the value of x² + 1/x².`, `x + 1/x = ${k} হলে x² + 1/x²-এর মান কত?`),
    ...o,
    steps: [
      T('(x + 1/x)² = x² + 2 + 1/x²', '(x + 1/x)² = x² + 2 + 1/x²'),
      T(`x² + 1/x² = ${k}² − 2 = ${k * k} − 2 = ${ans}`, `x² + 1/x² = ${k}² − 2 = ${k * k} − 2 = ${ans}`),
    ],
    shortcut: T('Square the given value and subtract 2.', 'প্রদত্ত মানের বর্গ করে 2 বিয়োগ করো।'),
  });
}

function algLinear() {
  let a = ri(3, 12), c = ri(1, a - 1);
  const x = ri(2, 20), b = ri(1, 30);
  const d = (a - c) * x + b;
  const o = numOptions(x, plain, [
    hint((d + b) / (a - c), 'Constant moved across with the wrong sign.', 'ধ্রুবক পদ পক্ষান্তরে চিহ্ন বদলানো হয়নি।'),
    hint((d - b) / (a + c), 'The x terms should be subtracted: ' + a + 'x − ' + c + 'x.', 'x-এর পদগুলি বিয়োগ হবে: ' + a + 'x − ' + c + 'x।'),
  ]);
  return build({
    topic: 'algebra', subtopic: 'linear_equation', tags: ['linear_equation'], difficulty: 1, time: 35,
    stem: T(`Solve for x: ${a}x + ${b} = ${c}x + ${d}`, `x-এর মান নির্ণয় করো: ${a}x + ${b} = ${c}x + ${d}`),
    ...o,
    steps: [
      T(`${a}x − ${c}x = ${d} − ${b}`, `${a}x − ${c}x = ${d} − ${b}`),
      T(`${a - c}x = ${d - b} ⇒ x = ${x}`, `${a - c}x = ${d - b} ⇒ x = ${x}`),
    ],
    shortcut: T('Put the answer back in both sides to check in 10 seconds.', 'উত্তরটি দুই পক্ষে বসিয়ে 10 সেকেন্ডে মিলিয়ে নাও।'),
  });
}

// ---------------------------------------------------------------- Mensuration (পরিমিতি)
function menRectangle() {
  const L = ri(8, 60), B = ri(4, L - 1);
  const P = 2 * (L + B), ans = L * B;
  const o = numOptions(ans, unit('cm²', 'বর্গ সেমি'), [
    hint(P, 'That is the perimeter, not the area.', 'এটি পরিসীমা, ক্ষেত্রফল নয়।'),
    hint(L + B, 'Half-perimeter, not the area.', 'এটি অর্ধ-পরিসীমা, ক্ষেত্রফল নয়।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'rectangle', tags: ['area', 'perimeter'], difficulty: 1, time: 40,
    stem: T(`The perimeter of a rectangle is ${P} cm and its length is ${L} cm. Find its area.`, `একটি আয়তক্ষেত্রের পরিসীমা ${P} সেমি এবং দৈর্ঘ্য ${L} সেমি। ক্ষেত্রফল কত?`),
    ...o,
    steps: [
      T(`Perimeter = 2(l + b) ⇒ l + b = ${P / 2}, so b = ${P / 2} − ${L} = ${B} cm`, `পরিসীমা = 2(দৈর্ঘ্য + প্রস্থ) ⇒ দৈর্ঘ্য + প্রস্থ = ${P / 2}, সুতরাং প্রস্থ = ${P / 2} − ${L} = ${B} সেমি`),
      T(`Area = l × b = ${L} × ${B} = ${ans} cm²`, `ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ = ${L} × ${B} = ${ans} বর্গ সেমি`),
    ],
    shortcut: T('Half the perimeter is l + b — subtract the known side first.', 'অর্ধ-পরিসীমা = l + b; আগে জানা বাহু বাদ দিয়ে অপরটি বের করো।'),
  });
}

function menCircle() {
  const k = ri(1, 9), r = 7 * k;
  const area = pick([true, false]);
  const ans = area ? 154 * k * k : 44 * k;
  const o = area
    ? numOptions(ans, unit('cm²', 'বর্গ সেমি'), [hint(44 * k, 'That is the circumference (2πr).', 'এটি পরিধি (2πr)।'), hint(2 * 154 * k * k, 'Area is πr², not 2πr².', 'ক্ষেত্রফল πr², 2πr² নয়।')])
    : numOptions(ans, unit('cm', 'সেমি'), [hint(154 * k * k, 'That is the area (πr²).', 'এটি ক্ষেত্রফল (πr²)।'), hint(22 * k, 'Circumference is 2πr; the factor 2 was missed.', 'পরিধি 2πr; 2 গুণ করা হয়নি।')]);
  return build({
    topic: 'mensuration', subtopic: area ? 'circle_area' : 'circumference', tags: ['circle'], difficulty: 2, time: 40,
    stem: area
      ? T(`Find the area of a circle of radius ${r} cm. (Take π = 22/7)`, `${r} সেমি ব্যাসার্ধবিশিষ্ট বৃত্তের ক্ষেত্রফল কত? (π = 22/7 ধরো)`)
      : T(`Find the circumference of a circle of radius ${r} cm. (Take π = 22/7)`, `${r} সেমি ব্যাসার্ধবিশিষ্ট বৃত্তের পরিধি কত? (π = 22/7 ধরো)`),
    ...o,
    steps: area
      ? [T(`Area = πr² = (22/7) × ${r} × ${r}`, `ক্ষেত্রফল = πr² = (22/7) × ${r} × ${r}`), T(`= 22 × ${k} × ${r} = ${ans} cm²`, `= 22 × ${k} × ${r} = ${ans} বর্গ সেমি`)]
      : [T(`Circumference = 2πr = 2 × (22/7) × ${r}`, `পরিধি = 2πr = 2 × (22/7) × ${r}`), T(`= 2 × 22 × ${k} = ${ans} cm`, `= 2 × 22 × ${k} = ${ans} সেমি`)],
    shortcut: T('When r is a multiple of 7, the 7 cancels with π = 22/7.', 'r যখন 7-এর গুণিতক, তখন π = 22/7-এর 7 কেটে যায়।'),
  });
}

function menCylinder() {
  const k = ri(1, 5), r = 7 * k, h = ri(3, 25);
  const ans = 154 * k * k * h;
  const o = numOptions(ans, unit('cm³', 'ঘন সেমি'), [
    hint(ans / 3, 'The 1/3 belongs to cones, not cylinders.', '1/3 শঙ্কুর সূত্রে থাকে, বেলনের নয়।'),
    hint(44 * k * h, 'That uses 2πrh (curved surface), not πr²h.', 'এটি 2πrh (বক্রতলের ক্ষেত্রফল), আয়তনের সূত্র πr²h।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'cylinder_volume', tags: ['volume', 'cylinder'], difficulty: 3, time: 55,
    stem: T(`A cylinder has base radius ${r} cm and height ${h} cm. Find its volume. (π = 22/7)`, `একটি বেলনের ভূমির ব্যাসার্ধ ${r} সেমি এবং উচ্চতা ${h} সেমি। এর আয়তন কত? (π = 22/7)`),
    ...o,
    steps: [
      T(`Volume = πr²h = (22/7) × ${r}² × ${h}`, `আয়তন = πr²h = (22/7) × ${r}² × ${h}`),
      T(`= 22 × ${k} × ${r} × ${h} = ${ans} cm³`, `= 22 × ${k} × ${r} × ${h} = ${ans} ঘন সেমি`),
    ],
    shortcut: T('Cylinder = πr²h; cone = ⅓πr²h.', 'বেলন = πr²h; শঙ্কু = ⅓πr²h।'),
  });
}

function menTriangle() {
  const [a0, b0, c0] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]);
  const k = ri(1, 6);
  const a = a0 * k, b = b0 * k, c = c0 * k;
  const ans = (a * b) / 2;
  const o = numOptions(ans, unit('cm²', 'বর্গ সেমি'), [
    hint(a * b, 'The ½ in ½ × base × height was dropped.', '½ × ভূমি × উচ্চতা থেকে ½ বাদ পড়েছে।'),
    hint(a + b + c, 'That is the perimeter.', 'এটি পরিসীমা।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'triangle_area', tags: ['triangle', 'pythagorean_triplet'], difficulty: 2, time: 45,
    stem: T(`The sides of a triangle are ${a} cm, ${b} cm and ${c} cm. Find its area.`, `একটি ত্রিভুজের বাহুগুলি ${a} সেমি, ${b} সেমি ও ${c} সেমি। এর ক্ষেত্রফল কত?`),
    ...o,
    steps: [
      T(`${a}² + ${b}² = ${a * a + b * b} = ${c}², so it is a right-angled triangle`, `${a}² + ${b}² = ${a * a + b * b} = ${c}², সুতরাং এটি সমকোণী ত্রিভুজ`),
      T(`Area = ½ × ${a} × ${b} = ${n2(ans)} cm²`, `ক্ষেত্রফল = ½ × ${a} × ${b} = ${n2(ans)} বর্গ সেমি`),
    ],
    shortcut: T('Recognise Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25, 20-21-29.', 'পীথাগোরীয় ত্রয়ী চিনে রাখো: 3-4-5, 5-12-13, 8-15-17, 7-24-25, 20-21-29।'),
  });
}

function menCube() {
  const s = ri(2, 15);
  const V = s ** 3, ans = 6 * s * s;
  const o = numOptions(ans, unit('cm²', 'বর্গ সেমি'), [
    hint(4 * s * s, 'That is the lateral surface area; total has 6 faces.', 'এটি পার্শ্বতলের ক্ষেত্রফল; সমগ্রতলে 6টি পৃষ্ঠ।'),
    hint(s * s, 'That is one face only.', 'এটি মাত্র একটি পৃষ্ঠ।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'cube', tags: ['cube', 'surface_area'], difficulty: 2, time: 45,
    stem: T(`The volume of a cube is ${V} cm³. Find its total surface area.`, `একটি ঘনকের আয়তন ${V} ঘন সেমি। এর সমগ্রতলের ক্ষেত্রফল কত?`),
    ...o,
    steps: [
      T(`Side = ∛${V} = ${s} cm`, `বাহু = ∛${V} = ${s} সেমি`),
      T(`Total surface area = 6a² = 6 × ${s * s} = ${ans} cm²`, `সমগ্রতলের ক্ষেত্রফল = 6a² = 6 × ${s * s} = ${ans} বর্গ সেমি`),
    ],
    shortcut: T('Know cubes up to 15³ to get the side instantly.', '15³ পর্যন্ত ঘন মুখস্থ থাকলে বাহু সঙ্গে সঙ্গে পাওয়া যায়।'),
  });
}

function menPath() {
  const L = ri(10, 50), B = ri(8, 40), w = ri(1, 4);
  const ans = (L + 2 * w) * (B + 2 * w) - L * B;
  const o = numOptions(ans, unit('m²', 'বর্গ মিটার'), [
    hint(2 * w * (L + B), 'The four corner squares (each w × w) were missed.', 'চার কোণের চারটি w × w বর্গক্ষেত্র বাদ পড়েছে।'),
    hint((L + w) * (B + w) - L * B, 'The path is on all sides, so add 2w to each dimension.', 'পথ চারদিকে, তাই প্রতি মাপে 2w যোগ হবে।'),
  ]);
  return build({
    topic: 'mensuration', subtopic: 'path_area', tags: ['area', 'rectangle'], difficulty: 3, time: 60,
    stem: T(`A rectangular park is ${L} m long and ${B} m wide. A path ${w} m wide runs around it on the outside. Find the area of the path.`, `একটি আয়তাকার পার্কের দৈর্ঘ্য ${L} মিটার ও প্রস্থ ${B} মিটার। এর বাইরের চারদিকে ${w} মিটার চওড়া একটি পথ আছে। পথের ক্ষেত্রফল কত?`),
    ...o,
    steps: [
      T(`Outer rectangle = (${L} + ${2 * w}) × (${B} + ${2 * w}) = ${(L + 2 * w) * (B + 2 * w)} m²`, `বাইরের আয়তক্ষেত্র = (${L} + ${2 * w}) × (${B} + ${2 * w}) = ${(L + 2 * w) * (B + 2 * w)} বর্গ মিটার`),
      T(`Path area = ${(L + 2 * w) * (B + 2 * w)} − ${L * B} = ${ans} m²`, `পথের ক্ষেত্রফল = ${(L + 2 * w) * (B + 2 * w)} − ${L * B} = ${ans} বর্গ মিটার`),
    ],
    shortcut: T('Path area = outer area − inner area.', 'পথের ক্ষেত্রফল = বাইরের ক্ষেত্রফল − ভিতরের ক্ষেত্রফল।'),
  });
}

// ---------------------------------------------------------------- Partnership (অংশীদারি কারবার)
function partSplit(shares, profit) {
  const total = shares.reduce((s, v) => s + v, 0);
  return shares.map((v) => (profit * v) / total);
}

function ptSameTime() {
  const r1 = ri(1, 9), r2 = ri(1, 9);
  if (r1 === r2) return null;
  const g = gcd(r1, r2), p1 = r1 / g, p2 = r2 / g;
  const k = ri(100, 900), A = p1 * k, B = p2 * k;
  const m = ri(2, 40), profit = (p1 + p2) * m * 100;
  const ans = partSplit([A, B], profit)[0];
  const o = numOptions(ans, rupee, [
    hint(profit / 2, 'Profit is shared in the ratio of investments, not equally.', 'লাভ বিনিয়োগের অনুপাতে ভাগ হয়, সমান নয়।'),
    hint(partSplit([B, A], profit)[0], "A's and B's shares are swapped.", 'A ও B-এর অংশ অদলবদল হয়ে গেছে।'),
  ]);
  return build({
    topic: 'partnership', subtopic: 'profit_share', tags: ['partnership', 'ratio'], difficulty: 1, time: 45,
    stem: T(`A and B invest ₹${A} and ₹${B} respectively in a business for the same period. Out of a total profit of ₹${profit}, find A's share.`, `A ও B একই সময়ের জন্য যথাক্রমে ₹${A} ও ₹${B} ব্যবসায় বিনিয়োগ করল। মোট লাভ ₹${profit} হলে A-এর অংশ কত?`),
    ...o,
    steps: [
      T(`Ratio of investments = ${A} : ${B} = ${p1} : ${p2}`, `বিনিয়োগের অনুপাত = ${A} : ${B} = ${p1} : ${p2}`),
      T(`A's share = ${p1}/${p1 + p2} × ${profit} = ₹${n2(ans)}`, `A-এর অংশ = ${p1}/${p1 + p2} × ${profit} = ₹${n2(ans)}`),
    ],
    shortcut: T('Same time ⇒ profit ratio = capital ratio. Reduce the ratio first.', 'সময় সমান হলে লাভের অনুপাত = মূলধনের অনুপাত। আগে অনুপাত লঘিষ্ঠ করো।'),
  });
}

function ptDifferentTime() {
  const X = ri(2, 9) * 1000, Y = ri(2, 9) * 1000;
  const t1 = pick([4, 6, 8, 12]), t2 = pick([3, 6, 9, 12]);
  const a = X * t1, b = Y * t2, g = gcd(a, b), p1 = a / g, p2 = b / g;
  if (p1 + p2 > 60) return null;
  const profit = (p1 + p2) * ri(2, 20) * 10;
  const ans = (profit * p2) / (p1 + p2);
  const o = numOptions(ans, rupee, [
    hint((profit * Y) / (X + Y), 'Time of investment was ignored; use capital × time.', 'বিনিয়োগের সময় ধরা হয়নি; মূলধন × সময় নিতে হবে।'),
    hint((profit * p1) / (p1 + p2), "That is A's share, not B's.", 'এটি A-এর অংশ, B-এর নয়।'),
  ]);
  return build({
    topic: 'partnership', subtopic: 'capital_time', tags: ['partnership', 'ratio'], difficulty: 3, time: 65,
    stem: T(`A invests ₹${X} for ${t1} months and B invests ₹${Y} for ${t2} months. If the total profit is ₹${profit}, what is B's share?`, `A ₹${X} ${t1} মাসের জন্য এবং B ₹${Y} ${t2} মাসের জন্য বিনিয়োগ করল। মোট লাভ ₹${profit} হলে B-এর অংশ কত?`),
    ...o,
    steps: [
      T(`A : B = ${X} × ${t1} : ${Y} × ${t2} = ${a} : ${b} = ${p1} : ${p2}`, `A : B = ${X} × ${t1} : ${Y} × ${t2} = ${a} : ${b} = ${p1} : ${p2}`),
      T(`B's share = ${p2}/${p1 + p2} × ${profit} = ₹${n2(ans)}`, `B-এর অংশ = ${p2}/${p1 + p2} × ${profit} = ₹${n2(ans)}`),
    ],
    shortcut: T('Profit ratio = (capital × time) ratio.', 'লাভের অনুপাত = (মূলধন × সময়)-এর অনুপাত।'),
  });
}

function ptJoinLater() {
  const X = ri(2, 9) * 1000, Y = ri(2, 9) * 1000, m = pick([2, 3, 4, 6]);
  const a = X * 12, b = Y * (12 - m), g = gcd(a, b), p1 = a / g, p2 = b / g;
  if (p1 + p2 > 60) return null;
  const profit = (p1 + p2) * ri(2, 20) * 10;
  const ans = (profit * p1) / (p1 + p2);
  const o = numOptions(ans, rupee, [
    hint((profit * X) / (X + Y), 'The late joining of B was not considered.', 'B দেরিতে যোগ দেওয়ার বিষয়টি ধরা হয়নি।'),
    hint((profit * X * 12) / (X * 12 + Y * m), 'B invested for 12 − ' + m + ' months, not ' + m + '.', 'B বিনিয়োগ করেছে 12 − ' + m + ' মাস, ' + m + ' মাস নয়।'),
  ]);
  return build({
    topic: 'partnership', subtopic: 'joining_later', tags: ['partnership'], difficulty: 3, time: 65,
    stem: T(`A starts a business with ₹${X}. After ${m} months B joins with ₹${Y}. At the end of the year the profit is ₹${profit}. Find A's share.`, `A ₹${X} নিয়ে ব্যবসা শুরু করল। ${m} মাস পর B ₹${Y} নিয়ে যোগ দিল। বছর শেষে লাভ ₹${profit} হলে A-এর অংশ কত?`),
    ...o,
    steps: [
      T(`A's capital-months = ${X} × 12, B's = ${Y} × ${12 - m}`, `A-এর মূলধন-মাস = ${X} × 12, B-এর = ${Y} × ${12 - m}`),
      T(`Ratio = ${p1} : ${p2}, so A's share = ${p1}/${p1 + p2} × ${profit} = ₹${n2(ans)}`, `অনুপাত = ${p1} : ${p2}, সুতরাং A-এর অংশ = ${p1}/${p1 + p2} × ${profit} = ₹${n2(ans)}`),
    ],
    shortcut: T('A partner who joins later invests for (12 − joining month) months.', 'যে অংশীদার দেরিতে যোগ দেয় সে (12 − যোগদানের মাস) মাস বিনিয়োগ করে।'),
  });
}

// ---------------------------------------------------------------- Pipes & Cistern (নল ও চৌবাচ্চা)
const FILL_FILL = [[12, 6], [20, 5], [15, 10], [30, 20], [12, 4], [24, 8], [18, 9], [36, 18], [45, 30], [60, 15]];
const FILL_DRAIN = [[6, 9], [10, 15], [12, 20], [8, 24], [12, 36], [20, 30], [15, 30], [9, 18], [4, 12], [16, 48]];

function pcTogether() {
  const [a, b] = pick(FILL_FILL);
  const ans = (a * b) / (a + b);
  const o = numOptions(ans, unit('hours', 'ঘণ্টা'), [
    hint((a + b) / 2, 'Taking the simple average of the two times is wrong; add the rates.', 'দুই সময়ের গড় নেওয়া ভুল; কাজের হার যোগ করতে হবে।'),
    hint(a + b, 'Pipes working together take less time than either one alone.', 'দুই নল একসঙ্গে চললে একটির চেয়ে কম সময় লাগে।'),
  ]);
  return build({
    topic: 'pipes_cistern', subtopic: 'filling_together', tags: ['pipes', 'time_work'], difficulty: 2, time: 45,
    stem: T(`Pipe A can fill a tank in ${a} hours and pipe B can fill it in ${b} hours. If both are opened together, in how many hours will the tank be full?`, `A নল ${a} ঘণ্টায় এবং B নল ${b} ঘণ্টায় একটি চৌবাচ্চা ভরতে পারে। দুটি নল একসঙ্গে খুললে চৌবাচ্চাটি কত ঘণ্টায় ভর্তি হবে?`),
    ...o,
    steps: [
      T(`Rate in 1 hour = 1/${a} + 1/${b} = ${a + b}/${a * b}`, `1 ঘণ্টায় ভরে = 1/${a} + 1/${b} = ${a + b}/${a * b}`),
      T(`Time = ${a * b}/${a + b} = ${n2(ans)} hours`, `সময় = ${a * b}/${a + b} = ${n2(ans)} ঘণ্টা`),
    ],
    shortcut: T('Together = (a × b) / (a + b).', 'একসঙ্গে = (a × b) / (a + b)।'),
  });
}

function pcFillDrain() {
  const [a, b] = pick(FILL_DRAIN);
  const ans = (a * b) / (b - a);
  const o = numOptions(ans, unit('hours', 'ঘণ্টা'), [
    hint((a * b) / (a + b), 'The outlet empties the tank, so subtract the rates.', 'নির্গম নল চৌবাচ্চা খালি করে, তাই হার বিয়োগ করতে হবে।'),
    hint(b - a, 'Time is ab/(b − a), not b − a.', 'সময় ab/(b − a), b − a নয়।'),
  ]);
  return build({
    topic: 'pipes_cistern', subtopic: 'inlet_outlet', tags: ['pipes'], difficulty: 3, time: 55,
    stem: T(`An inlet pipe fills a tank in ${a} hours and an outlet pipe empties it in ${b} hours. If both are opened together, in how many hours will the empty tank be full?`, `একটি প্রবেশ নল ${a} ঘণ্টায় চৌবাচ্চা ভরে এবং একটি নির্গম নল ${b} ঘণ্টায় তা খালি করে। দুটি নল একসঙ্গে খুললে খালি চৌবাচ্চা কত ঘণ্টায় ভর্তি হবে?`),
    ...o,
    steps: [
      T(`Net rate in 1 hour = 1/${a} − 1/${b} = ${b - a}/${a * b}`, `1 ঘণ্টায় নিট ভরে = 1/${a} − 1/${b} = ${b - a}/${a * b}`),
      T(`Time = ${a * b}/${b - a} = ${n2(ans)} hours`, `সময় = ${a * b}/${b - a} = ${n2(ans)} ঘণ্টা`),
    ],
    shortcut: T('Inlet and outlet: (a × b) / (b − a).', 'প্রবেশ ও নির্গম নল: (a × b) / (b − a)।'),
  });
}

function pcLeak() {
  const [a, b] = pick(FILL_DRAIN);
  const ans = (a * b) / (b - a);
  const o = numOptions(ans, unit('hours', 'ঘণ্টা'), [
    hint(b - a, 'Leak time is ab/(b − a), not the difference of times.', 'ফুটোর সময় ab/(b − a), সময়ের বিয়োগফল নয়।'),
    hint((a * b) / (a + b), 'The leak works against the pipe, so subtract the rates.', 'ফুটো নলের বিপরীতে কাজ করে, তাই হার বিয়োগ হবে।'),
  ]);
  return build({
    topic: 'pipes_cistern', subtopic: 'leak', tags: ['pipes', 'leak'], difficulty: 3, time: 60,
    stem: T(`A pipe can fill a tank in ${a} hours, but due to a leak at the bottom it takes ${b} hours. How long will the leak alone take to empty the full tank?`, `একটি নল ${a} ঘণ্টায় চৌবাচ্চা ভরতে পারে, কিন্তু তলায় ফুটো থাকায় ${b} ঘণ্টা লাগে। শুধু ফুটো দিয়ে পূর্ণ চৌবাচ্চা খালি হতে কত ঘণ্টা লাগবে?`),
    ...o,
    steps: [
      T(`Leak rate = 1/${a} − 1/${b} = ${b - a}/${a * b} per hour`, `ফুটোর হার = 1/${a} − 1/${b} = ${b - a}/${a * b} প্রতি ঘণ্টায়`),
      T(`Time to empty = ${a * b}/${b - a} = ${n2(ans)} hours`, `খালি হতে সময় = ${a * b}/${b - a} = ${n2(ans)} ঘণ্টা`),
    ],
    shortcut: T('Leak time = (normal time × time with leak) / (difference).', 'ফুটোর সময় = (স্বাভাবিক সময় × ফুটো সহ সময়) / (পার্থক্য)।'),
  });
}

function pcLitres() {
  const i = ri(10, 40), out = ri(2, i - 2), t = ri(5, 40);
  const C = (i - out) * t;
  const o = numOptions(t, unit('minutes', 'মিনিট'), [
    hint(C / i, 'The outlet was ignored; use the net rate (inlet − outlet).', 'নির্গম নল ধরা হয়নি; নিট হার (প্রবেশ − নির্গম) নিতে হবে।'),
    hint(C / (i + out), 'The outlet removes water, so subtract it from the inlet.', 'নির্গম নল জল বের করে, তাই প্রবেশ থেকে বিয়োগ করতে হবে।'),
  ]);
  return build({
    topic: 'pipes_cistern', subtopic: 'rate_capacity', tags: ['pipes', 'capacity'], difficulty: 2, time: 50,
    stem: T(`A tank of capacity ${C} litres is empty. An inlet pipe fills ${i} litres per minute while an outlet pipe drains ${out} litres per minute. How many minutes will it take to fill the tank when both are open?`, `${C} লিটার ধারণক্ষমতার একটি চৌবাচ্চা খালি আছে। প্রবেশ নল মিনিটে ${i} লিটার ভরে এবং নির্গম নল মিনিটে ${out} লিটার বের করে। দুটি নল খোলা থাকলে চৌবাচ্চা ভরতে কত মিনিট লাগবে?`),
    ...o,
    steps: [
      T(`Net filling = ${i} − ${out} = ${i - out} litres/min`, `নিট ভরে = ${i} − ${out} = ${i - out} লিটার/মিনিট`),
      T(`Time = ${C} / ${i - out} = ${t} minutes`, `সময় = ${C} / ${i - out} = ${t} মিনিট`),
    ],
    shortcut: T('Time = capacity / (inlet rate − outlet rate).', 'সময় = ধারণক্ষমতা / (প্রবেশ হার − নির্গম হার)।'),
  });
}

// ---------------------------------------------------------------- Problems on Ages (বয়স)
function ageRatioSum() {
  const a = ri(2, 7), b = ri(a + 1, 9);
  if (gcd(a, b) !== 1) return null;
  const k = ri(2, 9), n = ri(2, 10);
  const A = a * k, B = b * k, S = A + B + 2 * n;
  const o = numOptions(B, unit('years', 'বছর'), [
    hint(A, "That is A's present age.", 'এটি A-এর বর্তমান বয়স।'),
    hint(((S - n) / (a + b)) * b, 'Both ages grow by n, so the sum grows by 2n, not n.', 'দুজনেরই বয়স n বাড়ে, তাই যোগফল 2n বাড়ে, n নয়।'),
  ]);
  return build({
    topic: 'ages', subtopic: 'ratio_and_sum', tags: ['ages', 'ratio'], difficulty: 2, time: 55,
    stem: T(`The present ages of A and B are in the ratio ${a} : ${b}. After ${n} years the sum of their ages will be ${S} years. Find B's present age.`, `A ও B-এর বর্তমান বয়সের অনুপাত ${a} : ${b}। ${n} বছর পরে তাদের বয়সের যোগফল ${S} বছর হবে। B-এর বর্তমান বয়স কত?`),
    ...o,
    steps: [
      T(`Present sum = ${S} − 2 × ${n} = ${S - 2 * n}`, `বর্তমান বয়সের যোগফল = ${S} − 2 × ${n} = ${S - 2 * n}`),
      T(`B = ${b}/${a + b} × ${S - 2 * n} = ${B} years`, `B = ${b}/${a + b} × ${S - 2 * n} = ${B} বছর`),
    ],
    shortcut: T('After n years each person adds n, so the sum of two ages adds 2n.', 'n বছর পরে প্রত্যেকের বয়স n বাড়ে, তাই দুজনের যোগফল 2n বাড়ে।'),
  });
}

function ageTimes() {
  const m = ri(2, 6), s = ri(5, 20), y = ri(2, 10);
  const F = m * s, S = F + s;
  const ans = F + y;
  const o = numOptions(ans, unit('years', 'বছর'), [
    hint(F, "That is the father's present age; the question asks after " + y + ' years.', 'এটি পিতার বর্তমান বয়স; প্রশ্নে ' + y + ' বছর পরের বয়স চাওয়া হয়েছে।'),
    hint(s + y, "That is the son's age after " + y + ' years.', 'এটি ' + y + ' বছর পরে পুত্রের বয়স।'),
  ]);
  return build({
    topic: 'ages', subtopic: 'multiple_of_age', tags: ['ages'], difficulty: 2, time: 50,
    stem: T(`A father is ${m} times as old as his son. The sum of their present ages is ${S} years. What will be the father's age after ${y} years?`, `পিতার বয়স পুত্রের বয়সের ${m} গুণ। তাদের বর্তমান বয়সের যোগফল ${S} বছর। ${y} বছর পরে পিতার বয়স কত হবে?`),
    ...o,
    steps: [
      T(`Son = x, father = ${m}x, so ${m + 1}x = ${S} ⇒ x = ${s}`, `পুত্র = x, পিতা = ${m}x, সুতরাং ${m + 1}x = ${S} ⇒ x = ${s}`),
      T(`Father now = ${F}; after ${y} years = ${ans} years`, `পিতার বর্তমান বয়স = ${F}; ${y} বছর পরে = ${ans} বছর`),
    ],
    shortcut: T('Divide the sum by (m + 1) to get the younger age.', 'যোগফলকে (m + 1) দিয়ে ভাগ করলে ছোটজনের বয়স পাওয়া যায়।'),
  });
}

function agePast() {
  const m = ri(2, 5), b = ri(4, 18), y = ri(2, 9);
  const S = (m + 1) * b + 2 * y;
  const o = numOptions(S, unit('years', 'বছর'), [
    hint((m + 1) * b, `That is the sum ${y} years ago; add 2 × ${y} to get the present sum.`, `এটি ${y} বছর আগের যোগফল; বর্তমান যোগফলের জন্য 2 × ${y} যোগ করো।`),
    hint((m + 1) * b + y, 'Both persons are older now, so add y for each person (2y).', 'দুজনেরই বয়স বেড়েছে, তাই প্রত্যেকের জন্য y, মোট 2y যোগ হবে।'),
  ]);
  return build({
    topic: 'ages', subtopic: 'past_ages', tags: ['ages'], difficulty: 3, time: 60,
    stem: T(`${y} years ago, A was ${m} times as old as B. If B was ${b} years old then, what is the sum of their present ages?`, `${y} বছর আগে A-এর বয়স B-এর বয়সের ${m} গুণ ছিল। তখন B-এর বয়স ${b} বছর হলে তাদের বর্তমান বয়সের যোগফল কত?`),
    ...o,
    steps: [
      T(`${y} years ago: B = ${b}, A = ${m * b}`, `${y} বছর আগে: B = ${b}, A = ${m * b}`),
      T(`Present sum = (${b} + ${m * b}) + 2 × ${y} = ${S} years`, `বর্তমান যোগফল = (${b} + ${m * b}) + 2 × ${y} = ${S} বছর`),
    ],
    shortcut: T('Present sum = past sum + 2 × years passed.', 'বর্তমান যোগফল = অতীতের যোগফল + 2 × অতিবাহিত বছর।'),
  });
}

module.exports = {
  subject: 'quant',
  topics: [
    { topic: 'simplification', weight: 1, gens: [simBodmas, simSquareDiff, simDecimal, simSquareRoot] },
    { topic: 'algebra', weight: 1, gens: [algSumProduct, algCubeSum, algReciprocal, algLinear] },
    { topic: 'mensuration', weight: 1, gens: [menRectangle, menCircle, menCylinder, menTriangle, menCube, menPath] },
    { topic: 'partnership', weight: 1, gens: [ptSameTime, ptDifferentTime, ptJoinLater] },
    { topic: 'pipes_cistern', weight: 1, gens: [pcTogether, pcFillDrain, pcLeak, pcLitres] },
    { topic: 'ages', weight: 1, gens: [ageRatioSum, ageTimes, agePast] },
  ],
};
