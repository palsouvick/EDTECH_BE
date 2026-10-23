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
  ],
};
