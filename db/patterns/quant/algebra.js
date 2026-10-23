'use strict';

// Question patterns: Algebra. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'algebra',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'square_from_sum_product',
      emoji: '🟦',
      name: t(r`Find $a^2 + b^2$ from $a + b$ and $ab$`, r`$a + b$ ও $ab$ থেকে $a^2 + b^2$ নির্ণয়`),
      spot: t(
        r`The values of $a + b$ (or $a - b$) and $ab$ are given, and $a^2 + b^2$ is asked.`,
        r`$a + b$ (বা $a - b$) আর $ab$-এর মান দেওয়া থাকে, $a^2 + b^2$ জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $a^2 + b^2 = (a + b)^2 - 2ab$.`, r`সূত্র: $a^2 + b^2 = (a + b)^2 - 2ab$।`),
        t(r`If $a - b$ is given, use $a^2 + b^2 = (a - b)^2 + 2ab$.`, r`$a - b$ দেওয়া থাকলে: $a^2 + b^2 = (a - b)^2 + 2ab$।`),
        t('Put in the numbers and simplify.', 'মান বসিয়ে সরল করো।'),
      ],
      example: {
        question: t(r`If $a + b = 9$ and $ab = 20$, find $a^2 + b^2$.`, r`$a + b = 9$ এবং $ab = 20$ হলে $a^2 + b^2$ কত?`),
        steps: [
          t(r`$(a + b)^2 = 9^2 = 81$.`, r`এখানে $(a + b)^2 = 9^2 = 81$।`),
          t(r`$2ab = 2 \times 20 = 40$.`, r`এখানে $2ab = 2 \times 20 = 40$।`),
          t(r`$a^2 + b^2 = 81 - 40 = 41$. (Check: $a = 4, b = 5$ gives $16 + 25 = 41$.)`, r`$a^2 + b^2 = 81 - 40 = 41$। (যাচাই: $a = 4, b = 5$ নিলে $16 + 25 = 41$।)`),
        ],
        answer: t(r`$a^2 + b^2 = 41$`, r`নির্ণেয় মান $41$।`),
      },
      tryIt: {
        question: t(r`If $a + b = 10$ and $ab = 21$, find $a^2 + b^2$.`, r`$a + b = 10$ এবং $ab = 21$ হলে $a^2 + b^2$ কত?`),
        options: [t('58', '58'), t('79', '79'), t('121', '121'), t('142', '142')],
        correct: 0,
        explanation: [
          t(r`$(a + b)^2 = 100$ and $2ab = 42$.`, r`$(a + b)^2 = 100$ এবং $2ab = 42$।`),
          t(r`$a^2 + b^2 = 100 - 42 = 58$. (Subtracting only $21$, or adding $42$, are the usual slips.)`, r`$a^2 + b^2 = 100 - 42 = 58$। (শুধু $21$ বিয়োগ করা বা $42$ যোগ করা, এই দুটো সাধারণ ভুল।)`),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'x_plus_one_over_x_square',
      emoji: '🔄',
      name: t(r`Find $x^2 + \frac{1}{x^2}$ from $x + \frac{1}{x}$`, r`$x + \frac{1}{x}$ থেকে $x^2 + \frac{1}{x^2}$ নির্ণয়`),
      spot: t(
        r`The question gives $x + \frac{1}{x}$ and asks for $x^2 + \frac{1}{x^2}$.`,
        r`প্রশ্নে $x + \frac{1}{x}$ দেওয়া থাকে আর $x^2 + \frac{1}{x^2}$ চাওয়া হয়।`,
      ),
      method: [
        t(r`Square both sides: $\left(x + \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} + 2$.`, r`দুই দিক বর্গ করো: $\left(x + \frac{1}{x}\right)^2 = x^2 + \frac{1}{x^2} + 2$।`),
        t(r`So $x^2 + \frac{1}{x^2} = k^2 - 2$, where $k$ is the given value.`, r`তাই $x^2 + \frac{1}{x^2} = k^2 - 2$, যেখানে $k$ হল দেওয়া মান।`),
      ],
      example: {
        question: t(r`If $x + \frac{1}{x} = 5$, find $x^2 + \frac{1}{x^2}$.`, r`$x + \frac{1}{x} = 5$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        steps: [
          t(r`Square: $5^2 = 25$.`, r`বর্গ করো: $5^2 = 25$।`),
          t(r`Subtract $2$: $25 - 2 = 23$.`, r`$2$ বিয়োগ করো: $25 - 2 = 23$।`),
        ],
        answer: t(r`$x^2 + \frac{1}{x^2} = 23$`, r`নির্ণেয় মান $23$।`),
      },
      tryIt: {
        question: t(r`If $x + \frac{1}{x} = 4$, find $x^2 + \frac{1}{x^2}$.`, r`$x + \frac{1}{x} = 4$ হলে $x^2 + \frac{1}{x^2}$ কত?`),
        options: [t('12', '12'), t('14', '14'), t('16', '16'), t('18', '18')],
        correct: 1,
        explanation: [
          t(r`Square: $4^2 = 16$.`, r`বর্গ করো: $4^2 = 16$।`),
          t(r`Subtract $2$ (not add): $16 - 2 = 14$.`, r`$2$ বিয়োগ করো (যোগ নয়): $16 - 2 = 14$।`),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'cube_from_sum_product',
      emoji: '🧊',
      name: t(r`Find $a^3 + b^3$ from $a + b$ and $ab$`, r`$a + b$ ও $ab$ থেকে $a^3 + b^3$ নির্ণয়`),
      spot: t(
        r`The values of $a + b$ and $ab$ are given, and $a^3 + b^3$ is asked.`,
        r`$a + b$ আর $ab$-এর মান দেওয়া থাকে, $a^3 + b^3$ জানতে চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.`, r`সূত্র: $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$।`),
        t(r`Work out $(a + b)^3$ and $3ab(a + b)$ separately, then subtract.`, r`$(a + b)^3$ আর $3ab(a + b)$ আলাদা করে বের করে বিয়োগ করো।`),
      ],
      example: {
        question: t(r`If $a + b = 5$ and $ab = 6$, find $a^3 + b^3$.`, r`$a + b = 5$ এবং $ab = 6$ হলে $a^3 + b^3$ কত?`),
        steps: [
          t(r`$(a + b)^3 = 5^3 = 125$.`, r`এখানে $(a + b)^3 = 5^3 = 125$।`),
          t(r`$3ab(a + b) = 3 \times 6 \times 5 = 90$.`, r`এখানে $3ab(a + b) = 3 \times 6 \times 5 = 90$।`),
          t(r`$a^3 + b^3 = 125 - 90 = 35$. (Check: $2^3 + 3^3 = 8 + 27 = 35$.)`, r`$a^3 + b^3 = 125 - 90 = 35$। (যাচাই: $2^3 + 3^3 = 8 + 27 = 35$।)`),
        ],
        answer: t(r`$a^3 + b^3 = 35$`, r`নির্ণেয় মান $35$।`),
      },
      tryIt: {
        question: t(r`If $a + b = 7$ and $ab = 12$, find $a^3 + b^3$.`, r`$a + b = 7$ এবং $ab = 12$ হলে $a^3 + b^3$ কত?`),
        options: [t('307', '307'), t('331', '331'), t('595', '595'), t('91', '91')],
        correct: 3,
        explanation: [
          t(r`$(a + b)^3 = 7^3 = 343$ and $3ab(a + b) = 3 \times 12 \times 7 = 252$.`, r`$(a + b)^3 = 7^3 = 343$ এবং $3ab(a + b) = 3 \times 12 \times 7 = 252$।`),
          t(r`$a^3 + b^3 = 343 - 252 = 91$. (Check: $3^3 + 4^3 = 27 + 64 = 91$.)`, r`$a^3 + b^3 = 343 - 252 = 91$। (যাচাই: $3^3 + 4^3 = 27 + 64 = 91$।)`),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'x_plus_one_over_x_cube',
      emoji: '🎲',
      name: t(r`Find $x^3 + \frac{1}{x^3}$ from $x + \frac{1}{x}$`, r`$x + \frac{1}{x}$ থেকে $x^3 + \frac{1}{x^3}$ নির্ণয়`),
      spot: t(
        r`The question gives $x + \frac{1}{x}$ and asks for $x^3 + \frac{1}{x^3}$.`,
        r`প্রশ্নে $x + \frac{1}{x}$ দেওয়া থাকে আর $x^3 + \frac{1}{x^3}$ চাওয়া হয়।`,
      ),
      method: [
        t(r`Use $x^3 + \frac{1}{x^3} = k^3 - 3k$, where $k = x + \frac{1}{x}$.`, r`সূত্র: $x^3 + \frac{1}{x^3} = k^3 - 3k$, যেখানে $k = x + \frac{1}{x}$।`),
        t(r`This comes from $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ with $ab = x \cdot \frac{1}{x} = 1$.`, r`এটা আসে $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ থেকে, কারণ এখানে $ab = x \cdot \frac{1}{x} = 1$।`),
      ],
      example: {
        question: t(r`If $x + \frac{1}{x} = 3$, find $x^3 + \frac{1}{x^3}$.`, r`$x + \frac{1}{x} = 3$ হলে $x^3 + \frac{1}{x^3}$ কত?`),
        steps: [
          t(r`$k^3 = 3^3 = 27$.`, r`এখানে $k^3 = 3^3 = 27$।`),
          t(r`$3k = 3 \times 3 = 9$.`, r`এখানে $3k = 3 \times 3 = 9$।`),
          t(r`$x^3 + \frac{1}{x^3} = 27 - 9 = 18$.`, r`সুতরাং $x^3 + \frac{1}{x^3} = 27 - 9 = 18$।`),
        ],
        answer: t(r`$x^3 + \frac{1}{x^3} = 18$`, r`নির্ণেয় মান $18$।`),
      },
      tryIt: {
        question: t(r`If $x + \frac{1}{x} = 4$, find $x^3 + \frac{1}{x^3}$.`, r`$x + \frac{1}{x} = 4$ হলে $x^3 + \frac{1}{x^3}$ কত?`),
        options: [t('60', '60'), t('52', '52'), t('64', '64'), t('76', '76')],
        correct: 1,
        explanation: [
          t(r`$k^3 = 4^3 = 64$ and $3k = 12$.`, r`$k^3 = 4^3 = 64$ এবং $3k = 12$।`),
          t(r`$x^3 + \frac{1}{x^3} = 64 - 12 = 52$.`, r`সুতরাং $x^3 + \frac{1}{x^3} = 64 - 12 = 52$।`),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'sum_zero_cubes',
      emoji: '⚖️',
      name: t(r`If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$`, r`$a + b + c = 0$ হলে $a^3 + b^3 + c^3 = 3abc$`),
      spot: t(
        'Three cubes are added or subtracted, and the numbers inside (with their signs) add up to $0$.',
        'তিনটি ঘন যোগ-বিয়োগ করা আছে, আর ভেতরের সংখ্যাগুলো (চিহ্নসহ) যোগ করলে $0$ হয়।',
      ),
      method: [
        t(r`Write each term as a cube with its sign: $-15^3 = (-15)^3$.`, r`প্রতিটি পদকে চিহ্নসহ ঘন হিসেবে লেখো: $-15^3 = (-15)^3$।`),
        t(r`Check $a + b + c = 0$.`, r`দেখো $a + b + c = 0$ কি না।`),
        t(r`If yes, the answer is simply $3abc$. No need to cube big numbers.`, r`হলে উত্তর সোজা $3abc$। বড়ো সংখ্যার ঘন করার দরকার নেই।`),
      ],
      example: {
        question: t(r`Find the value of $25^3 - 15^3 - 10^3$.`, r`$25^3 - 15^3 - 10^3$-এর মান কত?`),
        steps: [
          t(r`Take $a = 25$, $b = -15$, $c = -10$. Then $a + b + c = 25 - 15 - 10 = 0$.`, r`ধরো $a = 25$, $b = -15$, $c = -10$। তাহলে $a + b + c = 25 - 15 - 10 = 0$।`),
          t(r`So the value $= 3abc = 3 \times 25 \times (-15) \times (-10)$.`, r`তাই মান $= 3abc = 3 \times 25 \times (-15) \times (-10)$।`),
          t(r`$= 3 \times 3750 = 11250$.`, r`অর্থাৎ $= 3 \times 3750 = 11250$।`),
        ],
        answer: t('The value is $11250$.', 'নির্ণেয় মান $11250$।'),
      },
      tryIt: {
        question: t(r`Find the value of $20^3 - 12^3 - 8^3$.`, r`$20^3 - 12^3 - 8^3$-এর মান কত?`),
        options: [t('0', '0'), t('1920', '1920'), t('2880', '2880'), t('5760', '5760')],
        correct: 3,
        explanation: [
          t(r`$20 - 12 - 8 = 0$, so the value is $3abc$.`, r`$20 - 12 - 8 = 0$, তাই মান $3abc$।`),
          t(r`$3 \times 20 \times (-12) \times (-8) = 3 \times 1920 = 5760$. (Forgetting the $3$ gives $1920$.)`, r`$3 \times 20 \times (-12) \times (-8) = 3 \times 1920 = 5760$। ($3$ গুণ করতে ভুলে গেলে $1920$ আসে।)`),
        ],
      },
    },
  ],
};
