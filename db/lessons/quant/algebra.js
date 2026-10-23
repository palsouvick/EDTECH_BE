'use strict';

// Chapter lesson: Algebra. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'algebra',
  title: t('Algebra', 'বীজগণিত'),
  emoji: '🧮',
  intro: t(
    'Algebra is arithmetic with a mystery box: we use a letter like x for a number we do not know yet, and then find it. We use the same idea when we work out "how many sweets did I start with?" or "what did each pen cost?".',
    'বীজগণিত হল একটা রহস্যের বাক্স নিয়ে পাটিগণিত: যে সংখ্যাটা এখনও জানি না, তার জায়গায় x-এর মতো একটা অক্ষর বসাই, তারপর সেটা খুঁজে বার করি। "আমার কাছে প্রথমে কটা মিষ্টি ছিল?" বা "একটা পেনের দাম কত?" — এমন হিসাবেও আমরা এই ভাবনাই কাজে লাগাই।',
  ),
  levels: [
    // ─────────────────────────── BASIC ───────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Letters that stand for numbers', 'অক্ষর যখন সংখ্যার হয়ে কথা বলে'),
          body: t(
            r`Imagine a closed box with some marbles inside. You do not know how many, so you call the number $x$. This letter is called a **variable** (or unknown).

- $x + 3$ means "the box, plus 3 more marbles".
- $3x$ means $3 \times x$: three such boxes.
- A mix of numbers and letters like $3x + 2$ is called an **expression**.
- Terms with the same letter are **like terms** and can be added: $2x + 5x = 7x$, just as 2 apples + 5 apples = 7 apples.`,
            r`ধরো, একটা বন্ধ বাক্সে কিছু মার্বেল আছে। কটা আছে জানো না, তাই সংখ্যাটার নাম দিলে $x$। এই অক্ষরকে বলে **চল** বা অজানা রাশি।

- $x + 3$ মানে "বাক্সের মার্বেল, আরও 3টা"।
- $3x$ মানে $3 \times x$: এমন তিনটে বাক্স।
- সংখ্যা আর অক্ষর মিশিয়ে লেখা $3x + 2$-এর মতো রাশিকে বলে **বীজগাণিতিক রাশি**।
- একই অক্ষরযুক্ত পদগুলিকে বলে **সদৃশ পদ**, এদের যোগ করা যায়: $2x + 5x = 7x$, ঠিক যেমন 2টা আপেল + 5টা আপেল = 7টা আপেল।`,
          ),
        },
        {
          heading: t('An equation is a balance', 'সমীকরণ মানে দাঁড়িপাল্লা'),
          body: t(
            r`An **equation** says two things are equal, like $x + 5 = 12$. Think of a shopkeeper's balance: the left pan and the right pan weigh the same.

To keep the balance level, **whatever you do to one side, do to the other side too**.

- $x + 5 = 12$: take $5$ away from both sides, so $x = 7$.
- $3x = 21$: divide both sides by $3$, so $x = 7$.

Always **check** by putting your answer back: $7 + 5 = 12$. Correct.`,
            r`**সমীকরণ** বলে দুটি জিনিস সমান, যেমন $x + 5 = 12$। দোকানের দাঁড়িপাল্লার কথা ভাবো: বাঁ দিকের পাল্লা আর ডান দিকের পাল্লার ওজন সমান।

পাল্লা সমান রাখতে হলে **এক দিকে যা করবে, অন্য দিকেও ঠিক তাই করবে**।

- $x + 5 = 12$: দুই দিক থেকেই $5$ বাদ দাও, তাহলে $x = 7$।
- $3x = 21$: দুই দিককেই $3$ দিয়ে ভাগ করো, তাহলে $x = 7$।

উত্তরটা বসিয়ে সবসময় **যাচাই** করো: $7 + 5 = 12$। ঠিক আছে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Solve: 2x + 3 = 11', 'সমাধান করো: 2x + 3 = 11'),
          steps: [
            t(r`Take $3$ from both sides: $2x = 11 - 3 = 8$.`, r`দুই দিক থেকে $3$ বাদ দাও: $2x = 11 - 3 = 8$।`),
            t(r`Divide both sides by $2$: $x = 8 \div 2 = 4$.`, r`দুই দিককে $2$ দিয়ে ভাগ করো: $x = 8 \div 2 = 4$।`),
            t(r`Check: $2 \times 4 + 3 = 11$. Correct.`, r`যাচাই: $2 \times 4 + 3 = 11$। ঠিক আছে।`),
          ],
          answer: t('x = 4', 'x-এর মান 4'),
        },
        {
          question: t(
            'Riya thinks of a number, multiplies it by 3 and adds 7. She gets 31. What was her number?',
            'রিয়া একটা সংখ্যা ভাবল, সেটাকে 3 দিয়ে গুণ করে 7 যোগ করল। পেল 31। সে কোন সংখ্যা ভেবেছিল?',
          ),
          steps: [
            t(r`Call the number $x$. Then $3x + 7 = 31$.`, r`সংখ্যাটি $x$ ধরো। তাহলে $3x + 7 = 31$।`),
            t(r`Take $7$ from both sides: $3x = 24$.`, r`দুই দিক থেকে $7$ বাদ দাও: $3x = 24$।`),
            t(r`Divide by $3$: $x = 8$. Check: $3 \times 8 + 7 = 31$.`, r`$3$ দিয়ে ভাগ করো: $x = 8$। যাচাই: $3 \times 8 + 7 = 31$।`),
          ],
          answer: t('Her number was 8.', 'সে 8 ভেবেছিল।'),
        },
      ],
    },
    // ─────────────────────── INTERMEDIATE ───────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('x on both sides', 'দুই দিকেই x'),
          body: t(
            r`In $11x + 18 = 6x + 73$, the unknown is on both sides. Collect all the $x$ terms on one side and all the plain numbers on the other.

- Moving a term to the other side **changes its sign**: $+$ becomes $-$ and $-$ becomes $+$. (This is the same as doing the same thing to both sides.)
- Then divide by the number in front of $x$ (its **coefficient**).`,
            r`$11x + 18 = 6x + 73$-এ অজানা রাশি দুই দিকেই আছে। সব $x$-যুক্ত পদ এক দিকে, আর শুধু সংখ্যাগুলো অন্য দিকে জড়ো করো।

- কোনো পদ অন্য দিকে নিয়ে গেলে (**পক্ষান্তর** করলে) তার **চিহ্ন বদলে যায়**: $+$ হয় $-$, আর $-$ হয় $+$। (এটা আসলে দুই দিকে একই কাজ করারই সংক্ষিপ্ত রূপ।)
- তারপর $x$-এর সামনের সংখ্যা (**সহগ**) দিয়ে ভাগ করো।`,
          ),
        },
        {
          heading: t('Three useful identities', 'তিনটি দরকারি অভেদ'),
          body: t(
            r`An **identity** is an equation that is true for **every** value of the letters. These three save a lot of time:

- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- $a^2 - b^2 = (a + b)(a - b)$

Quick use: $51^2 = (50 + 1)^2 = 2500 + 100 + 1 = 2601$.

From the first one we get a favourite exam formula: $x^2 + y^2 = (x + y)^2 - 2xy$. So if you know the **sum** and the **product** of two numbers, you know the sum of their squares without finding the numbers.`,
            r`**অভেদ** হল এমন সমীকরণ যা অক্ষরগুলির **যে কোনো** মানের জন্য সত্য। এই তিনটে অনেক সময় বাঁচায়:

- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- $a^2 - b^2 = (a + b)(a - b)$

চটজলদি ব্যবহার: $51^2 = (50 + 1)^2 = 2500 + 100 + 1 = 2601$।

প্রথমটা থেকেই পাই পরীক্ষার এক প্রিয় সূত্র: $x^2 + y^2 = (x + y)^2 - 2xy$। অর্থাৎ দুটি সংখ্যার **যোগফল** আর **গুণফল** জানলে সংখ্যা দুটো বের না করেই তাদের বর্গের যোগফল পাওয়া যায়।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Solve for x: 11x + 18 = 6x + 73', 'x-এর মান নির্ণয় করো: 11x + 18 = 6x + 73'),
          steps: [
            t(r`Move $6x$ to the left and $18$ to the right: $11x - 6x = 73 - 18$.`, r`$6x$-কে বাঁ দিকে আর $18$-কে ডান দিকে পক্ষান্তর করো: $11x - 6x = 73 - 18$।`),
            t(r`So $5x = 55$, which gives $x = 11$.`, r`অতএব $5x = 55$, তাই $x = 11$।`),
            t(r`Check: left $= 121 + 18 = 139$, right $= 66 + 73 = 139$. Equal.`, r`যাচাই: বাঁ দিক $= 121 + 18 = 139$, ডান দিক $= 66 + 73 = 139$। সমান।`),
          ],
          answer: t('x = 11', 'x-এর মান 11'),
        },
        {
          question: t('If x + y = 8 and xy = 15, find x² + y².', 'x + y = 8 এবং xy = 15 হলে x² + y²-এর মান কত?'),
          steps: [
            t(r`Use $x^2 + y^2 = (x + y)^2 - 2xy$.`, r`সূত্র: $x^2 + y^2 = (x + y)^2 - 2xy$।`),
            t(r`$= 8^2 - 2 \times 15 = 64 - 30 = 34$.`, r`মান বসিয়ে পাই $8^2 - 2 \times 15 = 64 - 30 = 34$।`),
            t(r`Check: the numbers are $3$ and $5$, and $9 + 25 = 34$.`, r`যাচাই: সংখ্যা দুটি $3$ ও $5$, আর $9 + 25 = 34$।`),
          ],
          answer: t('x² + y² = 34', 'x² + y²-এর মান 34'),
        },
        {
          question: t('Find the value of 103² − 97² without squaring.', 'বর্গ না করে 103² − 97²-এর মান বের করো।'),
          steps: [
            t(r`Use $a^2 - b^2 = (a + b)(a - b)$.`, r`সূত্র: $a^2 - b^2 = (a + b)(a - b)$।`),
            t(r`$= (103 + 97)(103 - 97) = 200 \times 6 = 1200$.`, r`তাহলে $(103 + 97)(103 - 97) = 200 \times 6 = 1200$।`),
          ],
          answer: t('1200', 'মান 1200'),
        },
      ],
    },
    // ───────────────────────── ADVANCED ─────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Cubes from sum and product', 'যোগফল আর গুণফল থেকে ঘন'),
          body: t(
            r`Exams love: "If $x + y = 6$ and $xy = 8$, find $x^3 + y^3$." Use

$$x^3 + y^3 = (x + y)^3 - 3xy(x + y)$$

and similarly $x^3 - y^3 = (x - y)^3 + 3xy(x - y)$.

If you need $x - y$, first use $(x - y)^2 = (x + y)^2 - 4xy$.`,
            r`পরীক্ষায় খুব আসে: "$x + y = 6$ ও $xy = 8$ হলে $x^3 + y^3$ কত?" এখানে লাগবে

$$x^3 + y^3 = (x + y)^3 - 3xy(x + y)$$

একইভাবে $x^3 - y^3 = (x - y)^3 + 3xy(x - y)$।

$x - y$ দরকার হলে আগে $(x - y)^2 = (x + y)^2 - 4xy$ ব্যবহার করো।`,
          ),
        },
        {
          heading: t('The x + 1/x family', 'x + 1/x পরিবার'),
          body: t(
            r`Put $y = \frac{1}{x}$ in the formulas above. Since $x \cdot \frac{1}{x} = 1$, they become very short:

- $x^2 + \dfrac{1}{x^2} = \left(x + \dfrac{1}{x}\right)^2 - 2$
- $x^3 + \dfrac{1}{x^3} = \left(x + \dfrac{1}{x}\right)^3 - 3\left(x + \dfrac{1}{x}\right)$

So if $x + \frac{1}{x} = k$, then $x^2 + \frac{1}{x^2} = k^2 - 2$ and $x^3 + \frac{1}{x^3} = k^3 - 3k$.`,
            r`ওপরের সূত্রে $y = \frac{1}{x}$ বসাও। যেহেতু $x \cdot \frac{1}{x} = 1$, সূত্রগুলো খুব ছোটো হয়ে যায়:

- $x^2 + \dfrac{1}{x^2} = \left(x + \dfrac{1}{x}\right)^2 - 2$
- $x^3 + \dfrac{1}{x^3} = \left(x + \dfrac{1}{x}\right)^3 - 3\left(x + \dfrac{1}{x}\right)$

অর্থাৎ $x + \frac{1}{x} = k$ হলে $x^2 + \frac{1}{x^2} = k^2 - 2$ এবং $x^3 + \frac{1}{x^3} = k^3 - 3k$।`,
          ),
        },
        {
          heading: t('Shortcut: test with easy numbers', 'কৌশল: সহজ সংখ্যা বসিয়ে দেখো'),
          body: t(
            r`In multiple-choice questions you can often **guess two numbers** that fit. For $x + y = 6$, $xy = 8$, the numbers are $2$ and $4$ (since $2 + 4 = 6$ and $2 \times 4 = 8$). Then $x^3 + y^3 = 8 + 64 = 72$ directly.

This also checks your formula work. If the numbers are not whole, go back to the formula.`,
            r`বহু বিকল্প প্রশ্নে প্রায়ই এমন **দুটি সংখ্যা আন্দাজ** করা যায় যা শর্ত মেনে চলে। $x + y = 6$, $xy = 8$ হলে সংখ্যা দুটি $2$ ও $4$ (কারণ $2 + 4 = 6$ আর $2 \times 4 = 8$)। তখন সরাসরি $x^3 + y^3 = 8 + 64 = 72$।

এতে সূত্রের হিসাবও যাচাই হয়ে যায়। সংখ্যাগুলো পূর্ণসংখ্যা না হলে সূত্রেই ফিরে যাও।`,
          ),
        },
      ],
      examples: [
        {
          question: t('If x + y = 6 and xy = 8, find x³ + y³.', 'x + y = 6 এবং xy = 8 হলে x³ + y³-এর মান কত?'),
          steps: [
            t(r`Use $x^3 + y^3 = (x + y)^3 - 3xy(x + y)$.`, r`সূত্র: $x^3 + y^3 = (x + y)^3 - 3xy(x + y)$।`),
            t(r`$= 6^3 - 3 \times 8 \times 6 = 216 - 144 = 72$.`, r`মান বসিয়ে পাই $6^3 - 3 \times 8 \times 6 = 216 - 144 = 72$।`),
            t(r`Check with $x = 2, y = 4$: $8 + 64 = 72$.`, r`$x = 2, y = 4$ দিয়ে যাচাই: $8 + 64 = 72$।`),
          ],
          answer: t('x³ + y³ = 72', 'x³ + y³-এর মান 72'),
        },
        {
          question: t('If x + 1/x = 5, find x² + 1/x² and x³ + 1/x³.', 'x + 1/x = 5 হলে x² + 1/x² এবং x³ + 1/x³-এর মান কত?'),
          steps: [
            t(r`$x^2 + \frac{1}{x^2} = 5^2 - 2 = 23$.`, r`প্রথমটি: $x^2 + \frac{1}{x^2} = 5^2 - 2 = 23$।`),
            t(r`$x^3 + \frac{1}{x^3} = 5^3 - 3 \times 5 = 125 - 15 = 110$.`, r`দ্বিতীয়টি: $x^3 + \frac{1}{x^3} = 5^3 - 3 \times 5 = 125 - 15 = 110$।`),
          ],
          answer: t('23 and 110', 'যথাক্রমে 23 ও 110'),
        },
        {
          question: t('If x + y = 11 and xy = 30, find x³ + y³.', 'x + y = 11 এবং xy = 30 হলে x³ + y³-এর মান কত?'),
          steps: [
            t(r`$(x + y)^3 = 11^3 = 1331$.`, r`প্রথমে $(x + y)^3 = 11^3 = 1331$।`),
            t(r`$3xy(x + y) = 3 \times 30 \times 11 = 990$.`, r`এরপর $3xy(x + y) = 3 \times 30 \times 11 = 990$।`),
            t(r`$x^3 + y^3 = 1331 - 990 = 341$. Check with $5$ and $6$: $125 + 216 = 341$.`, r`তাই $x^3 + y^3 = 1331 - 990 = 341$। $5$ ও $6$ দিয়ে যাচাই: $125 + 216 = 341$।`),
          ],
          answer: t('x³ + y³ = 341', 'x³ + y³-এর মান 341'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Square of a sum', 'যোগফলের বর্গ'),
      latex: r`(a + b)^2 = a^2 + 2ab + b^2`,
      explain: t('First squared, plus twice the product, plus second squared.', 'প্রথমটির বর্গ, যোগ দুটির গুণফলের দ্বিগুণ, যোগ দ্বিতীয়টির বর্গ।'),
    },
    {
      label: t('Square of a difference', 'বিয়োগফলের বর্গ'),
      latex: r`(a - b)^2 = a^2 - 2ab + b^2`,
      explain: t('Same as above, but the middle term is subtracted.', 'ওপরের মতোই, শুধু মাঝের পদটি বিয়োগ হয়।'),
    },
    {
      label: t('Difference of squares', 'দুটি বর্গের অন্তর'),
      latex: r`a^2 - b^2 = (a + b)(a - b)`,
      explain: t('Sum times difference. Great for quick mental maths.', 'যোগফল গুণ বিয়োগফল। মুখে মুখে হিসাবের জন্য দারুণ।'),
    },
    {
      label: t('Sum of squares from sum and product', 'যোগফল ও গুণফল থেকে বর্গের যোগফল'),
      latex: r`x^2 + y^2 = (x + y)^2 - 2xy`,
      explain: t('Square the sum, then take away twice the product.', 'যোগফলের বর্গ থেকে গুণফলের দ্বিগুণ বাদ দাও।'),
    },
    {
      label: t('Sum of cubes from sum and product', 'যোগফল ও গুণফল থেকে ঘনের যোগফল'),
      latex: r`x^3 + y^3 = (x + y)^3 - 3xy(x + y)`,
      explain: t('Cube the sum, then take away 3 × product × sum.', 'যোগফলের ঘন থেকে 3 × গুণফল × যোগফল বাদ দাও।'),
    },
    {
      label: t('Reciprocal square', 'অন্যোন্যক রাশির বর্গ'),
      latex: r`x^2 + \frac{1}{x^2} = \left(x + \frac{1}{x}\right)^2 - 2`,
      explain: t('Square the given value and subtract 2.', 'প্রদত্ত মানের বর্গ করে 2 বিয়োগ করো।'),
    },
    {
      label: t('Reciprocal cube', 'অন্যোন্যক রাশির ঘন'),
      latex: r`x^3 + \frac{1}{x^3} = \left(x + \frac{1}{x}\right)^3 - 3\left(x + \frac{1}{x}\right)`,
      explain: t('If x + 1/x = k, the answer is k³ − 3k.', 'x + 1/x = k হলে উত্তর k³ − 3k।'),
    },
  ],
  tips: [
    t('Whatever you do to one side of an equation, do exactly the same to the other side.', 'সমীকরণের এক দিকে যা করবে, অন্য দিকেও ঠিক তাই করবে।'),
    t('When a term crosses the = sign, its sign flips. Forgetting this is the most common mistake.', 'কোনো পদ = চিহ্ন পেরোলে তার চিহ্ন উলটে যায়। এটা ভুলে যাওয়াই সবচেয়ে বেশি হয়।'),
    t(r`$(a + b)^2$ is **not** $a^2 + b^2$: do not forget the middle term $2ab$.`, r`$(a + b)^2$ মানে $a^2 + b^2$ **নয়**: মাঝের পদ $2ab$ ভুলো না।`),
    t(r`For $x^3 + y^3$ the subtracted part is $3xy(x + y)$, not just $3xy$.`, r`$x^3 + y^3$-এর ক্ষেত্রে বাদ যায় $3xy(x + y)$, শুধু $3xy$ নয়।`),
    t('Always put your answer back into the question to check it. It takes ten seconds.', 'উত্তরটা প্রশ্নে বসিয়ে সবসময় যাচাই করো। দশ সেকেন্ডও লাগে না।'),
  ],
};
