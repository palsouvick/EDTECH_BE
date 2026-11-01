'use strict';

// Question patterns: Number System. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'number_system',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'missing_digit_divisibility',
      emoji: '🔢',
      name: t('Find the missing digit for divisibility', 'বিভাজ্যতার জন্য হারানো অঙ্ক খোঁজা'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“Find the smallest digit $*$ so that the number is divisible by 3 / 9.”', '“ক্ষুদ্রতম কোন অঙ্ক $*$ বসালে সংখ্যাটি 3 / 9 দিয়ে বিভাজ্য হবে?”'),
      formula: t(r`A number is divisible by $3$ (or $9$) exactly when the sum of its digits is divisible by $3$ (or $9$).`, r`একটি সংখ্যা ঠিক তখনই $3$ (বা $9$) দিয়ে বিভাজ্য হয়, যখন তার অঙ্কগুলোর যোগফল $3$ (বা $9$) দিয়ে বিভাজ্য হয়।`),
      shortcut: t('Add the known digits first, then jump to the next multiple of 3 or 9 — the gap is the digit, no trial division needed.', 'আগে জানা অঙ্কগুলো যোগ করো, তারপর 3 বা 9-এর পরের গুণিতকে লাফ দাও — ফারাকটাই অঙ্ক, আলাদা করে ভাগ করে দেখতে হয় না।'),
      trap: t('A digit sum that works for 3 may fail for 9. Also check whether the question asks for the smallest or the largest possible digit.', 'অঙ্কের যোগফল 3-এর জন্য চললেও 9-এর জন্য নাও চলতে পারে। প্রশ্নে ক্ষুদ্রতম না বৃহত্তম অঙ্ক চাওয়া হয়েছে, সেটাও দেখে নাও।'),
      spot: t(
        'A number has a blank or a $*$ in it, and the question asks for the smallest digit that makes it divisible by 3, 9, 11 and so on.',
        'সংখ্যার মধ্যে একটা ফাঁকা ঘর বা $*$ চিহ্ন থাকে, আর জানতে চাওয়া হয় কোন ক্ষুদ্রতম অঙ্ক বসালে সংখ্যাটি 3, 9, 11 ইত্যাদি দিয়ে বিভাজ্য হবে।',
      ),
      method: [
        t('Recall the rule: for 3 or 9, the **sum of digits** must be divisible by 3 or 9.', 'নিয়মটা মনে করো: 3 বা 9-এর জন্য **অঙ্কগুলোর যোগফল** 3 বা 9 দিয়ে বিভাজ্য হতে হবে।'),
        t('Add all the known digits.', 'জানা অঙ্কগুলো সব যোগ করো।'),
        t('Find the next multiple of 3 or 9 above that sum. The gap is the missing digit.', 'ওই যোগফলের ঠিক পরের 3 বা 9-এর গুণিতক বের করো। ফারাকটাই হারানো অঙ্ক।'),
      ],
      example: {
        question: t('Find the smallest digit $*$ so that $3*56$ is divisible by $9$.', '$3*56$ সংখ্যাটি $9$ দিয়ে বিভাজ্য হতে হলে $*$-এর জায়গায় ক্ষুদ্রতম কোন অঙ্ক বসবে?'),
        steps: [
          t('Sum of known digits: $3 + 5 + 6 = 14$.', 'জানা অঙ্কগুলোর যোগফল: $3 + 5 + 6 = 14$।'),
          t('The next multiple of $9$ after $14$ is $18$.', '$14$-এর পরের $9$-এর গুণিতক হল $18$।'),
          t('Missing digit $= 18 - 14 = 4$. Check: $3456$ has digit sum $18$.', 'হারানো অঙ্ক $= 18 - 14 = 4$। যাচাই: $3456$-এর অঙ্কের যোগফল $18$।'),
        ],
        answer: t('The missing digit is $4$.', 'হারানো অঙ্কটি $4$।'),
      },
      tryIt: {
        question: t('Find the smallest digit $*$ so that $47*2$ is divisible by $9$.', '$47*2$ সংখ্যাটি $9$ দিয়ে বিভাজ্য হতে হলে $*$-এর জায়গায় ক্ষুদ্রতম কোন অঙ্ক বসবে?'),
        options: [t('2', '2'), t('4', '4'), t('5', '5'), t('6', '6')],
        correct: 2,
        explanation: [
          t('Sum of known digits: $4 + 7 + 2 = 13$.', 'জানা অঙ্কগুলোর যোগফল: $4 + 7 + 2 = 13$।'),
          t('Next multiple of $9$ is $18$, so $* = 18 - 13 = 5$.', 'পরের $9$-এর গুণিতক $18$, তাই $* = 18 - 13 = 5$।'),
          t('Careful: $2$ makes the sum $15$, which works for $3$ but not for $9$.', 'সাবধান: $2$ বসালে যোগফল $15$ হয়, যা $3$-এর জন্য চলে কিন্তু $9$-এর জন্য নয়।'),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'unit_digit_power',
      emoji: '🔁',
      name: t('Unit digit of a big power', 'বড়ো ঘাতের একক অঙ্ক'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“Find the unit digit of $7^{95}$.”', '“$7^{95}$-এর একক অঙ্ক কত?”'),
      formula: t(r`Unit digits of powers repeat in a cycle of length $4$ (for bases ending in $2, 3, 7, 8$); use the exponent $\bmod 4$, with remainder $0$ meaning the 4th place.`, r`ঘাতের একক অঙ্ক $4$ দৈর্ঘ্যের চক্রে ঘোরে ($2, 3, 7, 8$ দিয়ে শেষ হওয়া ভিত্তির ক্ষেত্রে); ঘাতের $\bmod 4$ নাও, ভাগশেষ $0$ হলে চক্রের চতুর্থ স্থান ধরো।`),
      shortcut: t('Never compute the power: reduce the exponent mod 4 and read off that place in the cycle for the base\'s last digit.', 'ঘাতের মান কখনোই হিসাব করো না: ঘাতকে 4 দিয়ে ভাগশেষ নিয়ে ভিত্তির শেষ অঙ্কের চক্রের সেই স্থানটি পড়ে নাও।'),
      trap: t('Remainder 0 does not mean unit digit 0 or 1 — it means the 4th term of the cycle.', 'ভাগশেষ 0 মানে একক অঙ্ক 0 বা 1 নয় — মানে চক্রের চতুর্থ পদটি।'),
      spot: t(
        'The question asks for the **unit digit** (last digit) of something like $7^{95}$ or $2^{43}$.',
        'প্রশ্নে $7^{95}$ বা $2^{43}$-এর মতো কোনো বড়ো ঘাতের **একক অঙ্ক** (শেষ অঙ্ক) জানতে চাওয়া হয়।',
      ),
      method: [
        t('Only the last digit of the base matters.', 'ভিত্তির শুধু শেষ অঙ্কটাই দরকার।'),
        t('Unit digits of 2, 3, 7, 8 repeat in a cycle of $4$ (for example $7 \to 9 \to 3 \to 1$).', '2, 3, 7, 8-এর ঘাতের একক অঙ্ক $4$টি করে ঘুরে ঘুরে আসে (যেমন $7 \\to 9 \\to 3 \\to 1$)।'),
        t('Divide the power by $4$ and take the remainder. Remainder $0$ means the 4th place in the cycle.', 'ঘাতকে $4$ দিয়ে ভাগ করে ভাগশেষ নাও। ভাগশেষ $0$ হলে চক্রের চতুর্থ অঙ্কটি নেবে।'),
      ],
      example: {
        question: t('Find the unit digit of $7^{95}$.', '$7^{95}$-এর একক অঙ্ক কত?'),
        steps: [
          t(r`Cycle of $7$: $7^1 \to 7$, $7^2 \to 9$, $7^3 \to 3$, $7^4 \to 1$.`, r`$7$-এর চক্র: $7^1 \to 7$, $7^2 \to 9$, $7^3 \to 3$, $7^4 \to 1$।`),
          t(r`$95 \div 4$ gives remainder $3$.`, r`$95 \div 4$ করলে ভাগশেষ $3$।`),
          t('So the unit digit is the 3rd in the cycle, which is $3$.', 'তাই একক অঙ্ক চক্রের তৃতীয়টি, অর্থাৎ $3$।'),
        ],
        answer: t('The unit digit is $3$.', 'একক অঙ্ক $3$।'),
      },
      tryIt: {
        question: t('Find the unit digit of $2^{43}$.', '$2^{43}$-এর একক অঙ্ক কত?'),
        options: [t('2', '2'), t('4', '4'), t('6', '6'), t('8', '8')],
        correct: 3,
        explanation: [
          t(r`Cycle of $2$: $2 \to 4 \to 8 \to 6$.`, r`$2$-এর চক্র: $2 \to 4 \to 8 \to 6$।`),
          t(r`$43 \div 4$ gives remainder $3$, so take the 3rd digit: $8$.`, r`$43 \div 4$ করলে ভাগশেষ $3$, তাই তৃতীয় অঙ্কটি নাও: $8$।`),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'remainder_by_factor',
      emoji: '➗',
      name: t('Remainder when divided by a factor', 'উৎপাদক দিয়ে ভাগ করলে ভাগশেষ'),
      difficulty: 'intermediate',
      typicalWording: t('“A number divided by 36 leaves remainder 19. What remainder does it leave when divided by 12?”', '“একটি সংখ্যাকে 36 দিয়ে ভাগ করলে ভাগশেষ 19 থাকে। 12 দিয়ে ভাগ করলে ভাগশেষ কত?”'),
      formula: t(r`If $N$ divided by $d$ leaves remainder $r$ and $k$ divides $d$, then the remainder of $N$ on division by $k$ is the remainder of $r$ on division by $k$.`, r`$N$-কে $d$ দিয়ে ভাগ করলে ভাগশেষ $r$ হলে এবং $k$ যদি $d$-কে ভাগ করে, তবে $N$-কে $k$ দিয়ে ভাগ করলে ভাগশেষ হবে $r$-কে $k$ দিয়ে ভাগ করার ভাগশেষ।`),
      shortcut: t('Do not rebuild the number at all — just reduce the old remainder by the new divisor.', 'সংখ্যাটা আবার তৈরি করার দরকার নেই — শুধু পুরোনো ভাগশেষকে নতুন ভাজক দিয়ে ছোট করো।'),
      trap: t('The trick works only when the new divisor is a factor of the old divisor, and the final remainder must be smaller than the new divisor.', 'কৌশলটা তখনই খাটে যখন নতুন ভাজক পুরোনো ভাজকের উৎপাদক হয়, আর শেষ ভাগশেষ অবশ্যই নতুন ভাজকের চেয়ে ছোট হতে হবে।'),
      spot: t(
        'A number divided by one divisor leaves a known remainder; you must find the remainder when the **same number** is divided by a factor of that divisor.',
        'একটা সংখ্যাকে কোনো ভাজক দিয়ে ভাগ করলে ভাগশেষ জানা আছে; ওই **একই সংখ্যাকে** সেই ভাজকের কোনো উৎপাদক দিয়ে ভাগ করলে ভাগশেষ কত, তা বের করতে হবে।',
      ),
      method: [
        t('Check that the new divisor is a factor of the first divisor.', 'দেখে নাও নতুন ভাজকটি প্রথম ভাজকের উৎপাদক কি না।'),
        t('Divide the **old remainder** by the new divisor.', '**পুরোনো ভাগশেষকে** নতুন ভাজক দিয়ে ভাগ করো।'),
        t('That remainder is the answer.', 'এই ভাগশেষটাই উত্তর।'),
      ],
      example: {
        question: t('A number divided by $36$ leaves remainder $19$. What is the remainder when the same number is divided by $12$?', 'একটি সংখ্যাকে $36$ দিয়ে ভাগ করলে ভাগশেষ $19$ থাকে। ওই সংখ্যাকে $12$ দিয়ে ভাগ করলে ভাগশেষ কত হবে?'),
        steps: [
          t('$12$ is a factor of $36$, so the trick works.', '$12$ হল $36$-এর উৎপাদক, তাই কৌশলটা খাটবে।'),
          t(r`$19 \div 12 = 1$, remainder $7$.`, r`$19 \div 12 = 1$, ভাগশেষ $7$।`),
          t('Check with a real number: $36 + 19 = 55$, and $55 = 4 \\times 12 + 7$.', 'একটা আসল সংখ্যায় যাচাই: $36 + 19 = 55$, আর $55 = 4 \\times 12 + 7$।'),
        ],
        answer: t('Remainder $= 7$', 'ভাগশেষ $= 7$'),
      },
      tryIt: {
        question: t('A number divided by $45$ leaves remainder $31$. What is the remainder when it is divided by $15$?', 'একটি সংখ্যাকে $45$ দিয়ে ভাগ করলে ভাগশেষ $31$ থাকে। ওই সংখ্যাকে $15$ দিয়ে ভাগ করলে ভাগশেষ কত?'),
        options: [t('1', '1'), t('14', '14'), t('16', '16'), t('31', '31')],
        correct: 0,
        explanation: [
          t('$15$ is a factor of $45$, so divide the old remainder $31$ by $15$.', '$15$ হল $45$-এর উৎপাদক, তাই পুরোনো ভাগশেষ $31$-কে $15$ দিয়ে ভাগ করো।'),
          t(r`$31 = 2 \times 15 + 1$, so the remainder is $1$ (not $16$; a remainder must be less than $15$).`, r`$31 = 2 \times 15 + 1$, তাই ভাগশেষ $1$ ($16$ নয়; ভাগশেষ সবসময় $15$-এর চেয়ে ছোট হয়)।`),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'hcf_lcm_product',
      emoji: '🤝',
      name: t('HCF × LCM = product of the two numbers', 'গসাগু × লসাগু = দুই সংখ্যার গুণফল'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The HCF and LCM of two numbers are given and one number is known. Find the other.”', '“দুটি সংখ্যার গসাগু ও লসাগু এবং একটি সংখ্যা দেওয়া আছে। অন্যটি বের করো।”'),
      formula: t(r`For two numbers $a$ and $b$: $\text{HCF} \times \text{LCM} = a \times b$.`, r`দুটি সংখ্যা $a$ ও $b$-এর জন্য: $\text{গসাগু} \times \text{লসাগু} = a \times b$।`),
      shortcut: t('Other number = (HCF × LCM) ÷ given number — one multiplication and one division, no factorisation.', 'অন্য সংখ্যা = (গসাগু × লসাগু) ÷ দেওয়া সংখ্যা — একটা গুণ আর একটা ভাগ, উৎপাদকে ভাঙার দরকার নেই।'),
      trap: t('This identity holds for two numbers only. It fails for three or more numbers.', 'এই সূত্র শুধু দুটি সংখ্যার জন্য খাটে। তিন বা তার বেশি সংখ্যায় এটি খাটে না।'),
      spot: t(
        'The HCF and LCM of two numbers are given along with one number, and the other number is asked.',
        'দুটি সংখ্যার গসাগু ও লসাগু আর একটি সংখ্যা দেওয়া থাকে, অন্য সংখ্যাটি জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Use: $\text{first} \times \text{second} = \text{HCF} \times \text{LCM}$.`, r`সূত্র: $\text{প্রথম} \times \text{দ্বিতীয়} = \text{গসাগু} \times \text{লসাগু}$।`),
        t(r`So $\text{other number} = \dfrac{\text{HCF} \times \text{LCM}}{\text{given number}}$.`, r`তাই $\text{অন্য সংখ্যা} = \dfrac{\text{গসাগু} \times \text{লসাগু}}{\text{দেওয়া সংখ্যা}}$।`),
      ],
      example: {
        question: t('The HCF of two numbers is $12$ and their LCM is $360$. If one number is $72$, find the other.', 'দুটি সংখ্যার গসাগু $12$ এবং লসাগু $360$। একটি সংখ্যা $72$ হলে অন্যটি কত?'),
        steps: [
          t(r`HCF $\times$ LCM $= 12 \times 360 = 4320$.`, r`গসাগু $\times$ লসাগু $= 12 \times 360 = 4320$।`),
          t(r`Other number $= 4320 \div 72 = 60$.`, r`অন্য সংখ্যা $= 4320 \div 72 = 60$।`),
        ],
        answer: t('The other number is $60$.', 'অন্য সংখ্যাটি $60$।'),
      },
      tryIt: {
        question: t('The HCF of two numbers is $8$ and their LCM is $240$. One number is $48$. Find the other.', 'দুটি সংখ্যার গসাগু $8$ এবং লসাগু $240$। একটি সংখ্যা $48$ হলে অন্যটি কত?'),
        options: [t('5', '5'), t('30', '30'), t('40', '40'), t('80', '80')],
        correct: 2,
        explanation: [
          t(r`HCF $\times$ LCM $= 8 \times 240 = 1920$.`, r`গসাগু $\times$ লসাগু $= 8 \times 240 = 1920$।`),
          t(r`Other number $= 1920 \div 48 = 40$.`, r`অন্য সংখ্যা $= 1920 \div 48 = 40$।`),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'lcm_with_same_remainder',
      emoji: '🧮',
      name: t('Least number leaving the same remainder', 'একই ভাগশেষ রেখে ক্ষুদ্রতম সংখ্যা'),
      difficulty: 'advanced',
      typicalWording: t('“Find the least number which when divided by 12, 15 and 20 leaves remainder 5 in each case.”', '“কোন ক্ষুদ্রতম সংখ্যাকে 12, 15 ও 20 দিয়ে ভাগ করলে প্রতিবার ভাগশেষ 5 থাকে?”'),
      formula: t(r`Least such number $= \text{LCM of the divisors} + \text{common remainder}$.`, r`এমন ক্ষুদ্রতম সংখ্যা $= \text{ভাজকগুলোর লসাগু} + \text{সাধারণ ভাগশেষ}$।`),
      shortcut: t('The direct LCM + remainder step is already the fastest route; spend the time on getting the LCM right.', 'লসাগু + ভাগশেষ ধাপটাই সবচেয়ে দ্রুত উপায়; সময়টা লসাগু ঠিকমতো বের করায় দাও।'),
      trap: t('Add the remainder, do not subtract it. (Subtracting belongs to the “leaves remainders short by the same amount” pattern.)', 'ভাগশেষ যোগ করো, বিয়োগ করো না। (বিয়োগ লাগে “প্রতিবার একই পরিমাণ কম থাকে” ধরনের প্রশ্নে।)'),
      spot: t(
        'Find the **least number** which, when divided by several numbers, leaves the **same remainder** each time.',
        'এমন **ক্ষুদ্রতম সংখ্যা** বের করতে হবে যাকে কয়েকটি সংখ্যা দিয়ে ভাগ করলে প্রতিবার **একই ভাগশেষ** থাকে।',
      ),
      method: [
        t('Find the LCM of the divisors.', 'ভাজকগুলোর লসাগু বের করো।'),
        t(r`Answer $=$ LCM $+$ remainder.`, r`উত্তর $=$ লসাগু $+$ ভাগশেষ।`),
      ],
      example: {
        question: t('Find the least number which, when divided by $12$, $15$ and $20$, leaves remainder $5$ in each case.', 'কোন ক্ষুদ্রতম সংখ্যাকে $12$, $15$ ও $20$ দিয়ে ভাগ করলে প্রতিবার ভাগশেষ $5$ থাকে?'),
        steps: [
          t('LCM of $12, 15, 20$ is $60$.', '$12, 15, 20$-এর লসাগু $60$।'),
          t('Add the remainder: $60 + 5 = 65$.', 'ভাগশেষ যোগ করো: $60 + 5 = 65$।'),
          t('Check: $65 = 5\\times12+5 = 4\\times15+5 = 3\\times20+5$.', 'যাচাই: $65 = 5\\times12+5 = 4\\times15+5 = 3\\times20+5$।'),
        ],
        answer: t('The least number is $65$.', 'ক্ষুদ্রতম সংখ্যাটি $65$।'),
      },
      tryIt: {
        question: t('Find the least number which, when divided by $6$, $8$ and $12$, leaves remainder $3$ in each case.', 'কোন ক্ষুদ্রতম সংখ্যাকে $6$, $8$ ও $12$ দিয়ে ভাগ করলে প্রতিবার ভাগশেষ $3$ থাকে?'),
        options: [t('21', '21'), t('24', '24'), t('27', '27'), t('51', '51')],
        correct: 2,
        explanation: [
          t('LCM of $6, 8, 12$ is $24$.', '$6, 8, 12$-এর লসাগু $24$।'),
          t('Add the remainder (do not subtract): $24 + 3 = 27$.', 'ভাগশেষ যোগ করো (বিয়োগ নয়): $24 + 3 = 27$।'),
        ],
      },
    },
    // 6 ─────────────────────────────────────────────
    {
      key: 'divisibility_eleven_rule',
      emoji: '🔍',
      name: t('Test for divisibility by 11', '11 দিয়ে বিভাজ্যতার পরীক্ষা'),
      difficulty: 'beginner',
      typicalWording: t('“Which of the following numbers is divisible by 11?” or “Is 2728 divisible by 11?”', '“নিচের কোন সংখ্যাটি 11 দিয়ে বিভাজ্য?” বা “2728 কি 11 দিয়ে বিভাজ্য?”'),
      formula: t(r`Count places from the units side: (sum of digits in odd places) $-$ (sum of digits in even places) must be $0$ or a multiple of $11$.`, r`এককের দিক থেকে স্থান গুনে: (বিজোড় স্থানের অঙ্কগুলোর যোগফল) $-$ (জোড় স্থানের অঙ্কগুলোর যোগফল) হতে হবে $0$ অথবা $11$-এর গুণিতক।`),
      shortcut: t('Take alternate digits in two groups and subtract — a few seconds of mental addition replaces a full long division.', 'একটা করে অঙ্ক ছেড়ে দুই দলে ভাগ করে বিয়োগ করো — পুরো ভাগ না করে কয়েক সেকেন্ডের মানসিক যোগেই কাজ হয়ে যায়।'),
      trap: t('There is no digit-sum rule for 7 like there is for 3 and 9; do not invent one. For 11, a difference of 11, 22, ... also counts, not just 0.', '3 ও 9-এর মতো 7-এর কোনো অঙ্ক-যোগের নিয়ম নেই; নিজে বানিও না। 11-এর ক্ষেত্রে পার্থক্য শুধু 0 নয়, 11, 22, ... হলেও চলে।'),
      spot: t(
        'The question asks whether a largish number is divisible by **11**, or which of several numbers is divisible by 11.',
        'প্রশ্নে জানতে চাওয়া হয় কোনো বড়ো সংখ্যা **11** দিয়ে বিভাজ্য কি না, বা কয়েকটি সংখ্যার মধ্যে কোনটি 11 দিয়ে বিভাজ্য।',
      ),
      method: [
        t('Starting from the units digit, mark the digits in odd places and even places.', 'একক অঙ্ক থেকে শুরু করে বিজোড় স্থান ও জোড় স্থানের অঙ্কগুলো চিহ্নিত করো।'),
        t('Add the digits in odd places and, separately, the digits in even places.', 'বিজোড় স্থানের অঙ্কগুলো যোগ করো এবং আলাদাভাবে জোড় স্থানের অঙ্কগুলো যোগ করো।'),
        t('Subtract the smaller sum from the larger. If the result is 0 or a multiple of 11, the number is divisible by 11.', 'বড়ো যোগফল থেকে ছোটটি বিয়োগ করো। ফল 0 বা 11-এর গুণিতক হলে সংখ্যাটি 11 দিয়ে বিভাজ্য।'),
      ],
      example: {
        question: t('Is $2728$ divisible by $11$?', '$2728$ কি $11$ দিয়ে বিভাজ্য?'),
        steps: [
          t('From the units side, odd places hold $8$ and $7$: sum $= 8 + 7 = 15$.', 'এককের দিক থেকে বিজোড় স্থানে আছে $8$ ও $7$: যোগফল $= 8 + 7 = 15$।'),
          t('Even places hold $2$ and $2$: sum $= 2 + 2 = 4$.', 'জোড় স্থানে আছে $2$ ও $2$: যোগফল $= 2 + 2 = 4$।'),
          t(r`Difference $= 15 - 4 = 11$, a multiple of $11$, so $2728$ is divisible by $11$.`, r`পার্থক্য $= 15 - 4 = 11$, যা $11$-এর গুণিতক, তাই $2728$, $11$ দিয়ে বিভাজ্য।`),
          t(r`Check: $11 \times 248 = 2728$.`, r`যাচাই: $11 \times 248 = 2728$।`),
        ],
        answer: t('Yes, $2728$ is divisible by $11$.', 'হ্যাঁ, $2728$, $11$ দিয়ে বিভাজ্য।'),
      },
      tryIt: {
        question: t('Which of the following numbers is divisible by $11$?', 'নিচের কোন সংখ্যাটি $11$ দিয়ে বিভাজ্য?'),
        options: [t('4837', '4837'), t('1331', '1331'), t('9352', '9352'), t('6715', '6715')],
        correct: 1,
        explanation: [
          t('For $1331$: odd places (from units) $1 + 3 = 4$, even places $3 + 1 = 4$, difference $= 0$, so it is divisible by $11$.', '$1331$-এর জন্য: বিজোড় স্থান (একক থেকে) $1 + 3 = 4$, জোড় স্থান $3 + 1 = 4$, পার্থক্য $= 0$, তাই এটি $11$ দিয়ে বিভাজ্য।'),
          t('The others give differences $8$, $9$ and $5$ — none is $0$ or a multiple of $11$.', 'বাকিগুলোর পার্থক্য $8$, $9$ ও $5$ — কোনোটিই $0$ বা $11$-এর গুণিতক নয়।'),
        ],
      },
    },
    // 7 ─────────────────────────────────────────────
    {
      key: 'place_face_value',
      emoji: '📍',
      name: t('Place value and face value of a digit', 'একটি অঙ্কের স্থানীয় মান ও প্রকৃত মান'),
      difficulty: 'beginner',
      typicalWording: t('“In 4752, find the place value / face value of 7, or the difference (or sum) of the two.”', '“4752 সংখ্যায় 7-এর স্থানীয় মান / প্রকৃত মান, বা দুটির পার্থক্য (বা যোগফল) বের করো।”'),
      formula: t(r`Place value $=$ digit $\times$ value of its place $(1, 10, 100, \ldots)$; face value $=$ the digit itself.`, r`স্থানীয় মান $=$ অঙ্ক $\times$ তার স্থানের মান $(1, 10, 100, \ldots)$; প্রকৃত মান $=$ অঙ্কটি নিজেই।`),
      shortcut: t('Write the digit followed by as many zeros as there are digits after it — that is its place value, instantly.', 'অঙ্কটির পরে তার ডানদিকে যতগুলো অঙ্ক আছে ততগুলো শূন্য বসাও — সেটাই তার স্থানীয় মান, সঙ্গে সঙ্গে পাওয়া যায়।'),
      trap: t('The face value never changes with position, but the place value does. Also, the place value of 0 is 0 in every place.', 'প্রকৃত মান অবস্থান অনুযায়ী বদলায় না, কিন্তু স্থানীয় মান বদলায়। আর 0-এর স্থানীয় মান সব স্থানেই 0।'),
      spot: t(
        'A specific digit inside a number is pointed at, and the question asks for its **place value**, its **face value**, or the difference or sum of the two.',
        'একটি সংখ্যার নির্দিষ্ট কোনো অঙ্কের দিকে ইঙ্গিত করে তার **স্থানীয় মান**, **প্রকৃত মান**, বা দুটির পার্থক্য বা যোগফল জানতে চাওয়া হয়।',
      ),
      method: [
        t('Face value is simply the digit itself.', 'প্রকৃত মান হল অঙ্কটি নিজেই।'),
        t('For place value, multiply the digit by 1, 10, 100, ... according to its position from the right.', 'স্থানীয় মানের জন্য অঙ্কটিকে ডানদিক থেকে তার অবস্থান অনুযায়ী 1, 10, 100, ... দিয়ে গুণ করো।'),
        t('Then add or subtract the two values as the question asks.', 'তারপর প্রশ্ন অনুযায়ী দুটি মান যোগ বা বিয়োগ করো।'),
      ],
      example: {
        question: t('In the number $4752$, find the difference between the place value and the face value of $7$.', '$4752$ সংখ্যায় $7$-এর স্থানীয় মান ও প্রকৃত মানের পার্থক্য কত?'),
        steps: [
          t('The digit $7$ is in the hundreds place, so its place value is $7 \\times 100 = 700$.', '$7$ অঙ্কটি শতকের ঘরে আছে, তাই তার স্থানীয় মান $7 \\times 100 = 700$।'),
          t('Its face value is simply $7$.', 'তার প্রকৃত মান হল শুধু $7$।'),
          t(r`Difference $= 700 - 7 = 693$.`, r`পার্থক্য $= 700 - 7 = 693$।`),
        ],
        answer: t('The difference is $693$.', 'পার্থক্য $693$।'),
      },
      tryIt: {
        question: t('In the number $5839$, what is the difference between the place value and the face value of $8$?', '$5839$ সংখ্যায় $8$-এর স্থানীয় মান ও প্রকৃত মানের পার্থক্য কত?'),
        options: [t('800', '800'), t('792', '792'), t('8', '8'), t('808', '808')],
        correct: 1,
        explanation: [
          t('The digit $8$ is in the hundreds place, so its place value is $800$ and its face value is $8$.', '$8$ অঙ্কটি শতকের ঘরে আছে, তাই তার স্থানীয় মান $800$ এবং প্রকৃত মান $8$।'),
          t(r`Difference $= 800 - 8 = 792$. ($800$ alone is only the place value; $808$ is the sum, not the difference.)`, r`পার্থক্য $= 800 - 8 = 792$। ($800$ শুধু স্থানীয় মান; $808$ হল যোগফল, পার্থক্য নয়।)`),
        ],
      },
    },
    // 8 ─────────────────────────────────────────────
    {
      key: 'fraction_decimal_compare',
      emoji: '⚖️',
      name: t('Compare and arrange fractions and decimals', 'ভগ্নাংশ ও দশমিকের তুলনা ও সাজানো'),
      difficulty: 'beginner',
      typicalWording: t('“Arrange the fractions in ascending / descending order” or “Which fraction is the largest?”', '“ভগ্নাংশগুলোকে ঊর্ধ্বক্রমে / অধঃক্রমে সাজাও” বা “কোন ভগ্নাংশটি সবচেয়ে বড়ো?”'),
      formula: t(r`Fractions can be compared only on a common scale: rewrite each as $\dfrac{a}{b} = \dfrac{a \times k}{b \times k}$ with a common denominator, or convert each to a decimal.`, r`ভগ্নাংশের তুলনা একই মাপকাঠিতে হয়: প্রতিটিকে সাধারণ হর দিয়ে $\dfrac{a}{b} = \dfrac{a \times k}{b \times k}$ আকারে লেখো, অথবা প্রতিটিকে দশমিকে রূপান্তর করো।`),
      shortcut: t('For just two fractions, cross-multiply: compare $a \times d$ with $c \times b$ instead of finding a common denominator.', 'মাত্র দুটি ভগ্নাংশের ক্ষেত্রে বজ্রগুণন করো: সাধারণ হর না খুঁজে $a \\times d$-এর সঙ্গে $c \\times b$-এর তুলনা করো।'),
      trap: t('A bigger denominator does not mean a bigger fraction — with the same numerator, a bigger denominator means a smaller fraction.', 'হর বড়ো মানেই ভগ্নাংশ বড়ো নয় — লব একই থাকলে হর বড়ো হলে ভগ্নাংশ ছোট হয়।'),
      spot: t(
        'Three or four **fractions (or a mix of fractions and decimals)** are given and you must arrange them in order, or pick the largest or smallest.',
        'তিন-চারটি **ভগ্নাংশ (বা ভগ্নাংশ ও দশমিক মিশিয়ে)** দেওয়া থাকে এবং সেগুলোকে ক্রমে সাজাতে হয়, বা সবচেয়ে বড়ো বা ছোটটি বেছে নিতে হয়।',
      ),
      method: [
        t('Take the LCM of all the denominators.', 'সব হরের লসাগু নাও।'),
        t('Rewrite every fraction with that common denominator; only the numerators change.', 'প্রতিটি ভগ্নাংশকে ওই সাধারণ হর দিয়ে আবার লেখো; শুধু লবগুলো বদলায়।'),
        t('Order the fractions by their new numerators, then write the answer using the original fractions.', 'নতুন লব অনুযায়ী ভগ্নাংশগুলো সাজাও, তারপর উত্তরটা আসল ভগ্নাংশ দিয়ে লেখো।'),
      ],
      example: {
        question: t(r`Arrange $\frac{7}{12}$, $\frac{3}{5}$ and $\frac{2}{3}$ in ascending order.`, r`$\frac{7}{12}$, $\frac{3}{5}$ ও $\frac{2}{3}$-কে ঊর্ধ্বক্রমে সাজাও।`),
        steps: [
          t('LCM of $12, 5, 3$ is $60$.', '$12, 5, 3$-এর লসাগু $60$।'),
          t(r`$\frac{7}{12} = \frac{35}{60}$, $\frac{3}{5} = \frac{36}{60}$, $\frac{2}{3} = \frac{40}{60}$.`, r`সাধারণ হরে লিখলে: $\frac{7}{12} = \frac{35}{60}$, $\frac{3}{5} = \frac{36}{60}$, $\frac{2}{3} = \frac{40}{60}$।`),
          t(r`Numerators: $35 < 36 < 40$.`, r`লবগুলো: $35 < 36 < 40$।`),
        ],
        answer: t(r`Ascending order: $\frac{7}{12} < \frac{3}{5} < \frac{2}{3}$.`, r`ঊর্ধ্বক্রম: $\frac{7}{12} < \frac{3}{5} < \frac{2}{3}$।`),
      },
      tryIt: {
        question: t('Which of the following fractions is the largest?', 'নিচের কোন ভগ্নাংশটি সবচেয়ে বড়ো?'),
        options: [t(r`$\frac{5}{8}$`, r`$\frac{5}{8}$`), t(r`$\frac{7}{10}$`, r`$\frac{7}{10}$`), t(r`$\frac{3}{5}$`, r`$\frac{3}{5}$`), t(r`$\frac{2}{3}$`, r`$\frac{2}{3}$`)],
        correct: 1,
        explanation: [
          t(r`As decimals: $\frac{5}{8} = 0.625$, $\frac{7}{10} = 0.7$, $\frac{3}{5} = 0.6$, $\frac{2}{3} \approx 0.667$.`, r`দশমিকে: $\frac{5}{8} = 0.625$, $\frac{7}{10} = 0.7$, $\frac{3}{5} = 0.6$, $\frac{2}{3} \approx 0.667$।`),
          t(r`The greatest decimal is $0.7$, so $\frac{7}{10}$ is the largest.`, r`সবচেয়ে বড়ো দশমিক $0.7$, তাই $\frac{7}{10}$ সবচেয়ে বড়ো।`),
        ],
      },
    },
    // 9 ─────────────────────────────────────────────
    {
      key: 'least_number_add_remove',
      emoji: '➕',
      name: t('Smallest number to add or subtract for exact divisibility', 'ঠিক বিভাজ্য করতে ক্ষুদ্রতম সংখ্যা যোগ বা বিয়োগ'),
      difficulty: 'intermediate',
      typicalWording: t('“What is the smallest number that should be added to (or subtracted from) N to make it exactly divisible by d?”', '“N-এর সঙ্গে ক্ষুদ্রতম কোন সংখ্যা যোগ করলে (বা N থেকে বিয়োগ করলে) তা d দিয়ে ঠিক বিভাজ্য হবে?”'),
      formula: t(r`If $N$ divided by $d$ leaves remainder $r$ (with $r > 0$): subtract $r$ to come down, or add $d - r$ to go up to the next multiple.`, r`$N$-কে $d$ দিয়ে ভাগ করলে ভাগশেষ $r$ হলে ($r > 0$ ধরে): নিচে নামতে $r$ বিয়োগ করো, বা পরের গুণিতকে উঠতে $d - r$ যোগ করো।`),
      shortcut: t('One division gives both answers: the remainder itself is the subtraction, and divisor minus remainder is the addition.', 'একটাই ভাগে দুটি উত্তর পাওয়া যায়: ভাগশেষটাই বিয়োগের সংখ্যা, আর ভাজক বিয়োগ ভাগশেষ হল যোগের সংখ্যা।'),
      trap: t('If the remainder is already 0, the number to add or subtract is 0, not the divisor itself.', 'ভাগশেষ আগে থেকেই 0 হলে যোগ বা বিয়োগ করার সংখ্যা 0, ভাজকটি নিজে নয়।'),
      spot: t(
        'A number is **almost** divisible by a given divisor, and the question asks for the **smallest number to add or subtract** to make the division exact.',
        'একটি সংখ্যা কোনো ভাজক দিয়ে **প্রায়** বিভাজ্য, আর জানতে চাওয়া হয় ভাগ ঠিকমতো মেলাতে **ক্ষুদ্রতম কোন সংখ্যা যোগ বা বিয়োগ** করতে হবে।',
      ),
      method: [
        t('Divide the given number by the divisor and note the remainder.', 'দেওয়া সংখ্যাকে ভাজক দিয়ে ভাগ করে ভাগশেষটা লক্ষ করো।'),
        t('To subtract: the remainder itself is the least number to remove.', 'বিয়োগের ক্ষেত্রে: ভাগশেষটাই সরানোর ক্ষুদ্রতম সংখ্যা।'),
        t('To add: the least number is divisor − remainder.', 'যোগের ক্ষেত্রে: ক্ষুদ্রতম সংখ্যা হল ভাজক − ভাগশেষ।'),
        t('Check by dividing the adjusted number.', 'বদলানো সংখ্যাটিকে ভাগ করে যাচাই করো।'),
      ],
      example: {
        question: t('What is the smallest number that should be added to $1052$ to make it exactly divisible by $23$?', '$1052$-এর সঙ্গে ক্ষুদ্রতম কোন সংখ্যা যোগ করলে যোগফল $23$ দিয়ে ঠিক বিভাজ্য হবে?'),
        steps: [
          t(r`$1052 = 23 \times 45 + 17$, so the remainder is $17$.`, r`$1052 = 23 \times 45 + 17$, তাই ভাগশেষ $17$।`),
          t(r`Number to add $= 23 - 17 = 6$.`, r`যোগ করার সংখ্যা $= 23 - 17 = 6$।`),
          t(r`Check: $1052 + 6 = 1058 = 23 \times 46$.`, r`যাচাই: $1052 + 6 = 1058 = 23 \times 46$।`),
        ],
        answer: t('Add $6$.', '$6$ যোগ করতে হবে।'),
      },
      tryIt: {
        question: t('What is the smallest number that should be subtracted from $1200$ to make it exactly divisible by $17$?', '$1200$ থেকে ক্ষুদ্রতম কোন সংখ্যা বিয়োগ করলে বিয়োগফল $17$ দিয়ে ঠিক বিভাজ্য হবে?'),
        options: [t('6', '6'), t('10', '10'), t('17', '17'), t('7', '7')],
        correct: 1,
        explanation: [
          t(r`$1200 = 17 \times 70 + 10$, so the remainder is $10$.`, r`$1200 = 17 \times 70 + 10$, তাই ভাগশেষ $10$।`),
          t(r`Subtract the remainder itself: $1200 - 10 = 1190 = 17 \times 70$. ($7$ would be the number to add, not subtract.)`, r`ভাগশেষটাই বিয়োগ করো: $1200 - 10 = 1190 = 17 \times 70$। ($7$ হল যোগ করার সংখ্যা, বিয়োগের নয়।)`),
        ],
      },
    },
    // 10 ─────────────────────────────────────────────
    {
      key: 'digit_reverse_sum_diff',
      emoji: '🔄',
      name: t('Two-digit number and its reverse', 'দুই অঙ্কের সংখ্যা ও তার উল্টো সংখ্যা'),
      difficulty: 'intermediate',
      typicalWording: t('“The sum of the digits is s. On reversing the digits the number increases by d. Find the number.”', '“অঙ্কদ্বয়ের যোগফল s। অঙ্ক দুটি উল্টে দিলে সংখ্যাটি d বেড়ে যায়। সংখ্যাটি বের করো।”'),
      formula: t(r`For digits $a$ (tens) and $b$ (units): number $= 10a + b$, reverse $= 10b + a$; their sum $= 11(a + b)$ and their difference $= 9(b - a)$.`, r`অঙ্ক $a$ (দশক) ও $b$ (একক) হলে: সংখ্যা $= 10a + b$, উল্টো সংখ্যা $= 10b + a$; তাদের যোগফল $= 11(a + b)$ এবং পার্থক্য $= 9(b - a)$।`),
      shortcut: t('Difference ÷ 9 gives (units digit − tens digit) directly; combine it with the digit sum to get both digits without algebra.', 'পার্থ্যককে 9 দিয়ে ভাগ করলেই (একক অঙ্ক − দশক অঙ্ক) সরাসরি পাওয়া যায়; অঙ্কের যোগফলের সঙ্গে মিলিয়ে বীজগণিত ছাড়াই দুটি অঙ্ক বেরিয়ে আসে।'),
      trap: t('If reversing decreases the number, the units digit is the smaller one — check the direction before assigning the digits.', 'উল্টালে সংখ্যা কমে গেলে একক অঙ্কটাই ছোট — অঙ্ক বসানোর আগে দিকটা দেখে নাও।'),
      spot: t(
        'A **two-digit number** is described through the **sum of its digits** and what happens when the digits are **reversed** (the number increases or decreases by a given amount).',
        'একটি **দুই অঙ্কের সংখ্যাকে** তার **অঙ্কদ্বয়ের যোগফল** এবং অঙ্ক **উল্টে দিলে** যা হয় (সংখ্যাটি নির্দিষ্ট পরিমাণ বাড়ে বা কমে) তা দিয়ে বর্ণনা করা হয়।',
      ),
      method: [
        t('Let the tens digit be $a$ and the units digit be $b$; the number is $10a + b$.', 'দশক অঙ্ক $a$ ও একক অঙ্ক $b$ ধরো; সংখ্যাটি $10a + b$।'),
        t('Use the digit sum: $a + b =$ given sum.', 'অঙ্কের যোগফল ব্যবহার করো: $a + b =$ দেওয়া যোগফল।'),
        t('Use the reversal change: difference $= 9 \times (b - a)$ if the number increases, so $b - a =$ difference $\\div 9$.', 'উল্টানোর পরিবর্তন ব্যবহার করো: সংখ্যা বাড়লে পার্থক্য $= 9 \\times (b - a)$, তাই $b - a =$ পার্থক্য $\\div 9$।'),
        t('Solve the two simple equations for $a$ and $b$ and rebuild the number.', 'দুটি সহজ সমীকরণ সমাধান করে $a$ ও $b$ বের করো এবং সংখ্যাটি গড়ো।'),
      ],
      example: {
        question: t('The sum of the digits of a two-digit number is $9$. On reversing the digits, the number increases by $27$. Find the number.', 'একটি দুই অঙ্কের সংখ্যার অঙ্কদ্বয়ের যোগফল $9$। অঙ্ক দুটি উল্টে দিলে সংখ্যাটি $27$ বেড়ে যায়। সংখ্যাটি কত?'),
        steps: [
          t(r`Let the digits be $a$ (tens) and $b$ (units): $a + b = 9$.`, r`অঙ্ক দুটি $a$ (দশক) ও $b$ (একক) ধরো: $a + b = 9$।`),
          t(r`Reversal increase $= 9(b - a) = 27$, so $b - a = 3$.`, r`উল্টালে বৃদ্ধি $= 9(b - a) = 27$, তাই $b - a = 3$।`),
          t(r`Adding: $2b = 12$, so $b = 6$ and $a = 3$.`, r`যোগ করে: $2b = 12$, তাই $b = 6$ এবং $a = 3$।`),
          t('Check: $36$ has digit sum $9$, and $63 - 36 = 27$.', 'যাচাই: $36$-এর অঙ্কের যোগফল $9$, আর $63 - 36 = 27$।'),
        ],
        answer: t('The number is $36$.', 'সংখ্যাটি $36$।'),
      },
      tryIt: {
        question: t('The sum of the digits of a two-digit number is $11$. On reversing the digits, the number increases by $45$. Find the number.', 'একটি দুই অঙ্কের সংখ্যার অঙ্কদ্বয়ের যোগফল $11$। অঙ্ক দুটি উল্টে দিলে সংখ্যাটি $45$ বেড়ে যায়। সংখ্যাটি কত?'),
        options: [t('47', '47'), t('38', '38'), t('83', '83'), t('29', '29')],
        correct: 1,
        explanation: [
          t(r`$b - a = 45 \div 9 = 5$ and $a + b = 11$.`, r`$b - a = 45 \div 9 = 5$ এবং $a + b = 11$।`),
          t(r`Adding: $2b = 16$, so $b = 8$ and $a = 3$, giving the number $38$.`, r`যোগ করে: $2b = 16$, তাই $b = 8$ এবং $a = 3$, অর্থাৎ সংখ্যাটি $38$।`),
          t('Check: $83 - 38 = 45$. ($83$ is the reversed number, not the original.)', 'যাচাই: $83 - 38 = 45$। ($83$ হল উল্টো সংখ্যা, আসল সংখ্যা নয়।)'),
        ],
      },
    },
    // 11 ─────────────────────────────────────────────
    {
      key: 'recurring_decimal_fraction',
      emoji: '🌀',
      name: t('Convert a recurring decimal to a fraction', 'পৌনঃপুনিক দশমিককে ভগ্নাংশে রূপান্তর'),
      difficulty: 'intermediate',
      typicalWording: t('“Express $0.\\overline{63}$ as a fraction in its lowest terms.”', '“$0.\\overline{63}$-কে লঘিষ্ঠ আকারে ভগ্নাংশে প্রকাশ করো।”'),
      formula: t(r`A purely recurring decimal with $k$ repeating digits equals the repeating block over $k$ nines: $0.\overline{ab} = \dfrac{ab}{99}$.`, r`$k$টি অঙ্ক পুনরাবৃত্ত হয় এমন বিশুদ্ধ পৌনঃপুনিক দশমিক হল পুনরাবৃত্ত অংশটি $k$টি 9-এর উপর: $0.\overline{ab} = \dfrac{ab}{99}$।`),
      shortcut: t('Write the repeating block over as many 9s as it has digits, then cancel — no need to set up $x$ and $100x$ every time.', 'পুনরাবৃত্ত অংশটি ঠিক ততগুলো 9-এর উপরে লিখে কাটাকুটি করো — প্রতিবার $x$ ও $100x$ সাজাতে হয় না।'),
      trap: t('Do not stop at 63/99 — the question usually wants lowest terms. Also count the repeating digits correctly: one digit repeats means one 9, not two.', '63/99-এ থেমে যেও না — প্রশ্নে সাধারণত লঘিষ্ঠ আকার চাওয়া হয়। পুনরাবৃত্ত অঙ্কও ঠিকমতো গুনো: একটি অঙ্ক পুনরাবৃত্ত হলে একটি 9, দুটি নয়।'),
      spot: t(
        'A decimal with a **bar (repeating block)** over one or two digits must be written as an ordinary fraction, usually in lowest terms.',
        'এক বা দুটি অঙ্কের উপর **দাগ (পুনরাবৃত্ত অংশ)** দেওয়া দশমিককে সাধারণ ভগ্নাংশে লিখতে হয়, সাধারণত লঘিষ্ঠ আকারে।',
      ),
      method: [
        t('Count the digits in the repeating block.', 'পুনরাবৃত্ত অংশে কটি অঙ্ক আছে গুনো।'),
        t('Write the block as the numerator and that many 9s as the denominator.', 'অংশটিকে লব হিসেবে এবং ততগুলো 9-কে হর হিসেবে লেখো।'),
        t('Cancel the fraction to its lowest terms.', 'ভগ্নাংশটিকে লঘিষ্ঠ আকারে কাটাকুটি করো।'),
      ],
      example: {
        question: t(r`Express $0.\overline{63}$ as a fraction in its lowest terms.`, r`$0.\overline{63}$-কে লঘিষ্ঠ আকারে ভগ্নাংশে প্রকাশ করো।`),
        steps: [
          t(r`Two digits repeat, so $0.\overline{63} = \frac{63}{99}$.`, r`দুটি অঙ্ক পুনরাবৃত্ত হয়, তাই $0.\overline{63} = \frac{63}{99}$।`),
          t(r`Divide numerator and denominator by $9$: $\frac{63}{99} = \frac{7}{11}$.`, r`লব ও হরকে $9$ দিয়ে ভাগ করো: $\frac{63}{99} = \frac{7}{11}$।`),
          t(r`Check: $7 \div 11 = 0.6363\ldots$`, r`যাচাই: $7 \div 11 = 0.6363\ldots$`),
        ],
        answer: t(r`$0.\overline{63} = \dfrac{7}{11}$.`, r`তাই $0.\overline{63} = \dfrac{7}{11}$।`),
      },
      tryIt: {
        question: t(r`Express $0.\overline{45}$ as a fraction in its lowest terms.`, r`$0.\overline{45}$-কে লঘিষ্ঠ আকারে ভগ্নাংশে প্রকাশ করো।`),
        options: [t('4/9', '4/9'), t('5/11', '5/11'), t('9/20', '9/20'), t('11/25', '11/25')],
        correct: 1,
        explanation: [
          t(r`Two digits repeat, so $0.\overline{45} = \frac{45}{99}$.`, r`দুটি অঙ্ক পুনরাবৃত্ত হয়, তাই $0.\overline{45} = \frac{45}{99}$।`),
          t(r`Divide by $9$: $\frac{45}{99} = \frac{5}{11}$. ($9/20 = 0.45$ exactly — it stops, so it is not the recurring value.)`, r`$9$ দিয়ে ভাগ করো: $\frac{45}{99} = \frac{5}{11}$। ($9/20 = 0.45$ ঠিকঠাক — তা থেমে যায়, তাই পৌনঃপুনিক মান নয়।)`),
        ],
      },
    },
    // 12 ─────────────────────────────────────────────
    {
      key: 'factorial_trailing_zeroes',
      emoji: '0️⃣',
      name: t('Trailing zeroes in a factorial', 'ফ্যাক্টোরিয়ালের শেষে শূন্যের সংখ্যা'),
      difficulty: 'advanced',
      typicalWording: t('“How many zeros are there at the end of $25!$?”', '“$25!$-এর শেষে কটি শূন্য আছে?”'),
      formula: t(r`Zeroes in $n! = \left\lfloor \frac{n}{5} \right\rfloor + \left\lfloor \frac{n}{25} \right\rfloor + \left\lfloor \frac{n}{125} \right\rfloor + \cdots$`, r`$n!$-এ শূন্যের সংখ্যা $= \left\lfloor \frac{n}{5} \right\rfloor + \left\lfloor \frac{n}{25} \right\rfloor + \left\lfloor \frac{n}{125} \right\rfloor + \cdots$`),
      shortcut: t('Divide by 5, then keep dividing the quotient by 5 and add all the quotients — much faster than expanding the sum term by term.', '5 দিয়ে ভাগ করো, তারপর ভাগফলকে আবার 5 দিয়ে ভাগ করে সব ভাগফল যোগ করো — পদ ধরে ধরে যোগফল বের করার চেয়ে অনেক দ্রুত।'),
      trap: t('Do not count factors of 2 — there are always more 2s than 5s, so only the 5s limit the zeroes. And do not forget the extra 5 hidden in 25, 50, 75, 100.', '2-এর উৎপাদক গুনো না — 2 সবসময় 5-এর চেয়ে বেশি থাকে, তাই শূন্য নির্ধারণ করে শুধু 5। আর 25, 50, 75, 100-এর মধ্যে লুকিয়ে থাকা বাড়তি 5 ভুলো না।'),
      spot: t(
        'The question asks how many **zeros at the end** of a factorial like $25!$ or $100!$ — the factorial itself is far too big to compute.',
        'প্রশ্নে $25!$ বা $100!$-এর মতো ফ্যাক্টোরিয়ালের **শেষে কটি শূন্য** আছে জানতে চাওয়া হয় — ফ্যাক্টোরিয়ালের মান নিজে হিসাব করা অসম্ভব বড়ো।',
      ),
      method: [
        t('Each trailing zero comes from one pair $2 \\times 5 = 10$, and 5s are the scarce factor.', 'প্রতিটি শেষের শূন্য আসে একটি $2 \\times 5 = 10$ জোড়া থেকে, আর 5 হল দুর্লভ উৎপাদক।'),
        t('Count the 5s: divide $n$ by $5$, then by $25$, then by $125$, keeping only whole quotients.', '5 গুনো: $n$-কে $5$ দিয়ে, তারপর $25$ দিয়ে, তারপর $125$ দিয়ে ভাগ করে শুধু পূর্ণ ভাগফলগুলো রাখো।'),
        t('Add all those quotients.', 'সব ভাগফল যোগ করো।'),
      ],
      example: {
        question: t('How many zeros are there at the end of $25!$?', '$25!$-এর শেষে কটি শূন্য আছে?'),
        steps: [
          t(r`$\left\lfloor 25 \div 5 \right\rfloor = 5$ (from $5, 10, 15, 20, 25$).`, r`$\left\lfloor 25 \div 5 \right\rfloor = 5$ ($5, 10, 15, 20, 25$ থেকে)।`),
          t(r`$\left\lfloor 25 \div 25 \right\rfloor = 1$ (the extra $5$ inside $25$ itself).`, r`$\left\lfloor 25 \div 25 \right\rfloor = 1$ ($25$-এর নিজের মধ্যে থাকা বাড়তি $5$)।`),
          t(r`Total zeroes $= 5 + 1 = 6$.`, r`মোট শূন্য $= 5 + 1 = 6$।`),
        ],
        answer: t('$25!$ ends with $6$ zeros.', '$25!$-এর শেষে $6$টি শূন্য আছে।'),
      },
      tryIt: {
        question: t('How many zeros are there at the end of $50!$?', '$50!$-এর শেষে কটি শূন্য আছে?'),
        options: [t('10', '10'), t('12', '12'), t('15', '15'), t('25', '25')],
        correct: 1,
        explanation: [
          t(r`$\left\lfloor 50 \div 5 \right\rfloor = 10$ and $\left\lfloor 50 \div 25 \right\rfloor = 2$.`, r`$\left\lfloor 50 \div 5 \right\rfloor = 10$ এবং $\left\lfloor 50 \div 25 \right\rfloor = 2$।`),
          t(r`Total $= 10 + 2 = 12$ zeros. (Stopping at $10$ misses the extra $5$s in $25$ and $50$.)`, r`মোট $= 10 + 2 = 12$টি শূন্য। ($10$-এ থামলে $25$ ও $50$-এর বাড়তি $5$ বাদ পড়ে যায়।)`),
        ],
      },
    },
    // 13 ─────────────────────────────────────────────
    {
      key: 'hcf_with_remainders',
      emoji: '🎯',
      name: t('Largest number dividing with given remainders', 'নির্দিষ্ট ভাগশেষ রেখে ভাগ করে এমন বৃহত্তম সংখ্যা'),
      difficulty: 'advanced',
      typicalWording: t('“Find the largest number which divides 148, 246 and 344 leaving remainders 4, 6 and 8 respectively.”', '“কোন বৃহত্তম সংখ্যা 148, 246 ও 344-কে ভাগ করলে যথাক্রমে ভাগশেষ 4, 6 ও 8 থাকে?”'),
      formula: t(r`Answer $= \text{HCF of } (N_1 - r_1), (N_2 - r_2), (N_3 - r_3)$.`, r`উত্তর $= (N_1 - r_1), (N_2 - r_2), (N_3 - r_3)$-এর $\text{গসাগু}$।`),
      shortcut: t('Subtract each remainder first, then take one HCF of the reduced numbers — no trial divisors needed.', 'আগে প্রতিটি ভাগশেষ বিয়োগ করো, তারপর ছোট হওয়া সংখ্যাগুলোর একবারে গসাগু নাও — ভাজক ধরে ধরে পরীক্ষা করতে হয় না।'),
      trap: t('Subtract each number\'s own remainder, not the same remainder from all three, and the answer must be larger than every remainder.', 'প্রতিটি সংখ্যা থেকে তার নিজের ভাগশেষ বিয়োগ করো, তিনটি থেকেই একই ভাগশেষ নয়, আর উত্তর অবশ্যই প্রতিটি ভাগশেষের চেয়ে বড়ো হতে হবে।'),
      spot: t(
        'Find the **largest number** that divides two or three given numbers leaving **specified remainders** (which may be different for each number).',
        'এমন **বৃহত্তম সংখ্যা** বের করতে হবে যা দুটি বা তিনটি দেওয়া সংখ্যাকে ভাগ করলে **নির্দিষ্ট ভাগশেষ** থাকে (প্রতিটি সংখ্যার জন্য ভাগশেষ আলাদা হতে পারে)।',
      ),
      method: [
        t('Subtract each remainder from its own number — the required divisor must divide these reduced numbers exactly.', 'প্রতিটি সংখ্যা থেকে তার নিজের ভাগশেষ বিয়োগ করো — নির্ণেয় ভাজক এই ছোট সংখ্যাগুলোকে ঠিকঠাক ভাগ করবে।'),
        t('Find the HCF of the reduced numbers.', 'ছোট হওয়া সংখ্যাগুলোর গসাগু বের করো।'),
        t('That HCF is the largest such divisor; check it against each original number if time allows.', 'ওই গসাগুই এমন বৃহত্তম ভাজক; সময় থাকলে প্রতিটি আসল সংখ্যায় যাচাই করো।'),
      ],
      example: {
        question: t('Find the largest number which divides $148$, $246$ and $344$ leaving remainders $4$, $6$ and $8$ respectively.', 'কোন বৃহত্তম সংখ্যা $148$, $246$ ও $344$-কে ভাগ করলে যথাক্রমে ভাগশেষ $4$, $6$ ও $8$ থাকে?'),
        steps: [
          t('Subtract the remainders: $148 - 4 = 144$, $246 - 6 = 240$, $344 - 8 = 336$.', 'ভাগশেষ বিয়োগ করো: $148 - 4 = 144$, $246 - 6 = 240$, $344 - 8 = 336$।'),
          t(r`$\gcd(144, 240) = 48$ and $\gcd(48, 336) = 48$, so the HCF is $48$.`, r`$\gcd(144, 240) = 48$ এবং $\gcd(48, 336) = 48$, তাই গসাগু $48$।`),
          t('Check: $148 = 48 \\times 3 + 4$, $246 = 48 \\times 5 + 6$, $344 = 48 \\times 7 + 8$.', 'যাচাই: $148 = 48 \\times 3 + 4$, $246 = 48 \\times 5 + 6$, $344 = 48 \\times 7 + 8$।'),
        ],
        answer: t('The largest number is $48$.', 'বৃহত্তম সংখ্যাটি $48$।'),
      },
      tryIt: {
        question: t('Find the largest number which divides $165$, $297$ and $429$ leaving remainders $5$, $9$ and $13$ respectively.', 'কোন বৃহত্তম সংখ্যা $165$, $297$ ও $429$-কে ভাগ করলে যথাক্রমে ভাগশেষ $5$, $9$ ও $13$ থাকে?'),
        options: [t('16', '16'), t('32', '32'), t('48', '48'), t('64', '64')],
        correct: 1,
        explanation: [
          t('Subtract the remainders: $165 - 5 = 160$, $297 - 9 = 288$, $429 - 13 = 416$.', 'ভাগশেষ বিয়োগ করো: $165 - 5 = 160$, $297 - 9 = 288$, $429 - 13 = 416$।'),
          t(r`HCF of $160, 288, 416$ is $32$ (each is $32 \times 5$, $32 \times 9$, $32 \times 13$).`, r`$160, 288, 416$-এর গসাগু $32$ (প্রতিটি যথাক্রমে $32 \times 5$, $32 \times 9$, $32 \times 13$)।`),
          t('Check: $165 = 32 \\times 5 + 5$, and $32$ is larger than each remainder, as it must be.', 'যাচাই: $165 = 32 \\times 5 + 5$, আর $32$ প্রতিটি ভাগশেষের চেয়ে বড়ো, যেমনটা হওয়া উচিত।'),
        ],
      },
    },
    // 14 ─────────────────────────────────────────────
    {
      key: 'remainder_power_cycle',
      emoji: '⚡',
      name: t('Remainder of a large power', 'বড়ো ঘাতের ভাগশেষ'),
      difficulty: 'advanced',
      typicalWording: t('“Find the remainder when $2^{96}$ is divided by 7.”', '“$2^{96}$-কে 7 দিয়ে ভাগ করলে ভাগশেষ কত?”'),
      formula: t(r`Reduce the base modulo the divisor, list the remainders of its successive powers until they repeat, then reduce the exponent modulo the cycle length.`, r`ভিত্তিকে ভাজক দিয়ে ছোট করো, তার পরপর ঘাতের ভাগশেষগুলো পুনরাবৃত্ত না হওয়া পর্যন্ত লেখো, তারপর ঘাতকে চক্রের দৈর্ঘ্য দিয়ে ছোট করো।`),
      shortcut: t('Stop listing remainders the moment 1 appears — from there the cycle restarts, so a power that is an exact multiple of the cycle length has remainder 1.', 'ভাগশেষে 1 এলেই তালিকা থামাও — সেখান থেকে চক্র আবার শুরু হয়, তাই ঘাত চক্রের দৈর্ঘ্যের ঠিক গুণিতক হলে ভাগশেষ 1।'),
      trap: t('Reduce the base first: work with 17 mod 5 = 2, not with 17 itself. And an exponent remainder of 0 means the last term of the cycle, not remainder 0.', 'আগে ভিত্তিকে ছোট করো: 17 নিয়ে নয়, 17 mod 5 = 2 নিয়ে কাজ করো। আর ঘাতের ভাগশেষ 0 মানে চক্রের শেষ পদ, ভাগশেষ 0 নয়।'),
      spot: t(
        'A **huge power** must be divided by a small number and only the **remainder** is asked — computing the power is impossible, so the remainders themselves must be cycling.',
        'একটি **বিশাল ঘাতকে** ছোট সংখ্যা দিয়ে ভাগ করে শুধু **ভাগশেষ** জানতে চাওয়া হয় — ঘাতের মান হিসাব করা অসম্ভব, তাই ভাগশেষগুলোর চক্রই কাজে লাগাতে হয়।',
      ),
      method: [
        t('Reduce the base modulo the divisor.', 'ভিত্তিকে ভাজক দিয়ে ছোট করো (মডুলো নাও)।'),
        t('Write the remainders for powers $1, 2, 3, \\ldots$ until the sequence starts repeating; note the cycle length.', 'ঘাত $1, 2, 3, \\ldots$-এর ভাগশেষগুলো লেখো যতক্ষণ না ধারাটা আবার শুরু হয়; চক্রের দৈর্ঘ্য লক্ষ করো।'),
        t('Divide the given exponent by the cycle length and use its remainder (0 means the last term of the cycle).', 'দেওয়া ঘাতকে চক্রের দৈর্ঘ্য দিয়ে ভাগ করে ভাগশেষ ব্যবহার করো (0 মানে চক্রের শেষ পদ)।'),
      ],
      example: {
        question: t(r`Find the remainder when $2^{96}$ is divided by $7$.`, r`$2^{96}$-কে $7$ দিয়ে ভাগ করলে ভাগশেষ কত?`),
        steps: [
          t(r`Powers of $2$ modulo $7$: $2^1 \to 2$, $2^2 \to 4$, $2^3 \to 1$, then the cycle repeats.`, r`$7$ দিয়ে মডুলোতে $2$-এর ঘাত: $2^1 \to 2$, $2^2 \to 4$, $2^3 \to 1$, তারপর চক্র আবার শুরু হয়।`),
          t('The cycle length is $3$.', 'চক্রের দৈর্ঘ্য $3$।'),
          t(r`$96 \div 3$ gives remainder $0$, so take the last term of the cycle.`, r`$96 \div 3$ করলে ভাগশেষ $0$, তাই চক্রের শেষ পদটি নাও।`),
        ],
        answer: t('The remainder is $1$.', 'ভাগশেষ $1$।'),
      },
      tryIt: {
        question: t(r`Find the remainder when $3^{100}$ is divided by $5$.`, r`$3^{100}$-কে $5$ দিয়ে ভাগ করলে ভাগশেষ কত?`),
        options: [t('3', '3'), t('4', '4'), t('1', '1'), t('2', '2')],
        correct: 2,
        explanation: [
          t(r`Powers of $3$ modulo $5$: $3, 4, 2, 1$ — a cycle of length $4$.`, r`$5$ দিয়ে মডুলোতে $3$-এর ঘাত: $3, 4, 2, 1$ — দৈর্ঘ্য $4$-এর চক্র।`),
          t(r`$100 \div 4$ gives remainder $0$, so take the last term of the cycle, which is $1$.`, r`$100 \div 4$ করলে ভাগশেষ $0$, তাই চক্রের শেষ পদটি নাও, যা $1$।`),
        ],
      },
    },
  ],
};
