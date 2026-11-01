'use strict';

// Lesson: Mensuration. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'mensuration',
  title: t('Mensuration', 'পরিমিতি'),
  emoji: '📐',
  intro: t(
    'Mensuration means measuring shapes: how long the boundary is, how much floor they cover, and how much they can hold. We use it to fence a garden, tile a floor or find how much water a tank holds.',
    'পরিমিতি মানে আকারের মাপজোক: সীমানা কত লম্বা, মেঝের কতটা জায়গা জোড়ে, আর ভিতরে কতটা ধরে। বাগানে বেড়া দিতে, মেঝেতে টালি বসাতে বা ট্যাঙ্কে কত জল ধরবে জানতে আমরা এটা ব্যবহার করি।',
  ),
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: t('Perimeter: the boundary', 'পরিসীমা: চারপাশের সীমানা'),
          body: t(
            r`**Perimeter** is the total length **around** a shape. If you walk once around a field, the distance you walk is its perimeter.

- Add all the sides.
- It is measured in length units: cm, m, km.
- Fencing a garden or putting a border on a photo needs the perimeter.`,
            r`কোনো আকারের **চারপাশের** মোট দৈর্ঘ্যকে বলে **পরিসীমা**। একটা মাঠের চারদিকে একবার হাঁটলে যতটা পথ হাঁটো, সেটাই তার পরিসীমা।

- সব বাহু যোগ করো।
- এটা দৈর্ঘ্যের এককে মাপা হয়: সেমি, মি, কিমি।
- বাগানে বেড়া দিতে বা ছবির চারপাশে বর্ডার লাগাতে পরিসীমা লাগে।`,
          ),
        },
        {
          heading: t('Area: the space inside', 'ক্ষেত্রফল: ভিতরের জায়গা'),
          body: t(
            r`**Area** is how much flat surface a shape covers. Think of how many $1$ cm $\times$ $1$ cm squares fit inside.

- It is measured in **square units**: cm², m² (square centimetre, square metre).
- Tiling a floor or painting a wall needs the area.`,
            r`কোনো আকার কতটা সমতল জায়গা জুড়ে থাকে, তাকে বলে **ক্ষেত্রফল**। ভাবো, ভিতরে $1$ সেমি $\times$ $1$ সেমি মাপের কতগুলো বর্গ ধরবে।

- এটা **বর্গ এককে** মাপা হয়: বর্গসেমি (cm²), বর্গমিটার (m²)।
- মেঝেতে টালি বসাতে বা দেয়াল রং করতে ক্ষেত্রফল লাগে।`,
          ),
        },
        {
          heading: t('Rectangle and square', 'আয়তক্ষেত্র ও বর্গক্ষেত্র'),
          body: t(
            r`A **rectangle** has length $l$ and breadth $b$ (breadth means width).

- Perimeter $= 2(l + b)$, because there are two lengths and two breadths.
- Area $= l \times b$.

A **square** has all four sides equal, $a$.

- Perimeter $= 4a$, Area $= a \times a = a^2$.`,
            r`**আয়তক্ষেত্রের** দৈর্ঘ্য $l$ আর প্রস্থ $b$ (প্রস্থ মানে চওড়া)।

- পরিসীমা $= 2(l + b)$, কারণ দুটো দৈর্ঘ্য আর দুটো প্রস্থ আছে।
- ক্ষেত্রফল $= l \times b$।

**বর্গক্ষেত্রের** চারটে বাহুই সমান, $a$।

- পরিসীমা $= 4a$, ক্ষেত্রফল $= a \times a = a^2$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A room is 5 m long and 3 m wide. Find its perimeter and its area.',
            'একটা ঘর 5 মিটার লম্বা আর 3 মিটার চওড়া। ঘরটার পরিসীমা ও ক্ষেত্রফল বার করো।',
          ),
          given: t('Rectangle length = 5 m; breadth = 3 m.', 'আয়তক্ষেত্রের দৈর্ঘ্য = 5 মিটার; প্রস্থ = 3 মিটার।'),
          find: t('Perimeter and area.', 'পরিসীমা ও ক্ষেত্রফল।'),
          method: t('Use perimeter = 2(length + breadth) and area = length × breadth.', 'পরিসীমা = 2(দৈর্ঘ্য + প্রস্থ) এবং ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ ব্যবহার করো।'),
          steps: [
            t(r`Perimeter $= 2(5 + 3) = 2 \times 8 = 16$ m.`, r`পরিসীমা $= 2(5 + 3) = 2 \times 8 = 16$ মিটার।`),
            t(r`Area $= 5 \times 3 = 15$ m².`, r`ক্ষেত্রফল $= 5 \times 3 = 15$ বর্গমিটার।`),
          ],
          answer: t('Perimeter 16 m, area 15 m²', 'পরিসীমা 16 মিটার, ক্ষেত্রফল 15 বর্গমিটার'),
          why: t('Perimeter measures the boundary while area measures the inside surface, so their units differ.', 'পরিসীমা সীমানা মাপে, ক্ষেত্রফল ভিতরের জায়গা; তাই তাদের একক আলাদা।'),
        },
        {
          question: t(
            'The perimeter of a rectangle is 30 cm and its length is 9 cm. Find its area.',
            'একটা আয়তক্ষেত্রের পরিসীমা 30 সেমি এবং দৈর্ঘ্য 9 সেমি। এর ক্ষেত্রফল বার করো।',
          ),
          given: t('Rectangle perimeter = 30 cm; length = 9 cm.', 'আয়তক্ষেত্রের পরিসীমা = 30 সেমি; দৈর্ঘ্য = 9 সেমি।'),
          find: t('The area of the rectangle.', 'আয়তক্ষেত্রের ক্ষেত্রফল।'),
          method: t('Halve the perimeter to get length + breadth, solve for breadth, then multiply.', 'পরিসীমাকে অর্ধেক করে দৈর্ঘ্য + প্রস্থ বের করো, প্রস্থ নির্ণয় করে গুণ করো।'),
          steps: [
            t(r`$2(l + b) = 30$, so $l + b = 15$.`, r`$2(l + b) = 30$, তাই $l + b = 15$।`),
            t(r`Breadth $b = 15 - 9 = 6$ cm.`, r`প্রস্থ $b = 15 - 9 = 6$ সেমি।`),
            t(r`Area $= 9 \times 6 = 54$ cm².`, r`ক্ষেত্রফল $= 9 \times 6 = 54$ বর্গসেমি।`),
          ],
          answer: t('54 cm²', '54 বর্গসেমি'),
          why: t('The recovered breadth is 6 cm, and 9 × 6 gives the rectangle’s inside area.', 'নির্ণীত প্রস্থ 6 সেমি; 9 × 6 আয়তক্ষেত্রের ভিতরের ক্ষেত্রফল দেয়।'),
        },
        {
          question: t(
            'The perimeter of a rectangle is 164 cm and its length is 54 cm. Find its area.',
            'একটা আয়তক্ষেত্রের পরিসীমা 164 সেমি এবং দৈর্ঘ্য 54 সেমি। এর ক্ষেত্রফল বার করো।',
          ),
          given: t('Rectangle perimeter = 164 cm; length = 54 cm.', 'আয়তক্ষেত্রের পরিসীমা = 164 সেমি; দৈর্ঘ্য = 54 সেমি।'),
          find: t('The area of the rectangle.', 'আয়তক্ষেত্রের ক্ষেত্রফল।'),
          method: t('Divide perimeter by 2, subtract length to find breadth, then multiply.', 'পরিসীমাকে 2 দিয়ে ভাগ করে দৈর্ঘ্য বিয়োগে প্রস্থ বের করো, তারপর গুণ করো।'),
          steps: [
            t(r`$l + b = 164 \div 2 = 82$.`, r`$l + b = 164 \div 2 = 82$ সেমি।`),
            t(r`$b = 82 - 54 = 28$ cm.`, r`প্রস্থ $b = 82 - 54 = 28$ সেমি।`),
            t(r`Area $= 54 \times 28 = 1512$ cm².`, r`ক্ষেত্রফল $= 54 \times 28 = 1512$ বর্গসেমি।`),
          ],
          answer: t('1512 cm²', '1512 বর্গসেমি'),
          why: t('The breadth is 28 cm, and multiplying the two side lengths gives 1512 square centimetres.', 'প্রস্থ 28 সেমি; দুই বাহুর দৈর্ঘ্য গুণ করলে 1512 বর্গসেমি হয়।'),
        },
        {
          question: t('A square has side 7 cm. Find its perimeter and area.', 'একটি বর্গক্ষেত্রের বাহু 7 সেমি। এর পরিসীমা ও ক্ষেত্রফল নির্ণয় করো।'),
          given: t('Square side = 7 cm.', 'বর্গক্ষেত্রের বাহু = 7 সেমি।'),
          find: t('Perimeter and area.', 'পরিসীমা ও ক্ষেত্রফল।'),
          method: t('Use perimeter = 4 × side and area = side × side.', 'পরিসীমা = 4 × বাহু এবং ক্ষেত্রফল = বাহু × বাহু ব্যবহার করো।'),
          steps: [
            t(r`Perimeter $= 4 \times 7 = 28$ cm.`, r`পরিসীমা $= 4 \times 7 = 28$ সেমি।`),
            t(r`Area $= 7 \times 7 = 49$ cm².`, r`ক্ষেত্রফল $= 7 \times 7 = 49$ বর্গসেমি।`),
          ],
          answer: t('Perimeter 28 cm; area 49 cm²', 'পরিসীমা 28 সেমি; ক্ষেত্রফল 49 বর্গসেমি'),
          why: t('All four square sides are 7 cm, and the 7-by-7 square covers 49 unit squares.', 'বর্গের চার বাহুই 7 সেমি, আর 7 × 7 বর্গে 49 বর্গ একক থাকে।'),
        },
        {
          question: t('A rectangular garden is 12 m long and 8 m wide. How much fencing is needed around it?', 'একটি আয়তাকার বাগান 12 মিটার লম্বা ও 8 মিটার চওড়া। চারদিকে বেড়া দিতে কতটা লাগবে?'),
          given: t('Garden length = 12 m; breadth = 8 m.', 'বাগানের দৈর্ঘ্য = 12 মিটার; প্রস্থ = 8 মিটার।'),
          find: t('The length of fencing around the garden.', 'বাগানের চারদিকে বেড়ার দৈর্ঘ্য।'),
          method: t('Fencing goes around the boundary, so calculate the perimeter.', 'বেড়া সীমানা ঘিরে থাকে, তাই পরিসীমা হিসাব করো।'),
          steps: [
            t(r`Perimeter $= 2(12 + 8)$.`, r`পরিসীমা $= 2(12 + 8)$।`),
            t(r`$2 \times 20 = 40$ m of fencing.`, r`$2 \times 20 = 40$ মিটার বেড়া।`),
          ],
          answer: t('40 m', '40 মিটার'),
          why: t('Fencing covers the complete boundary, not the area inside the garden.', 'বেড়া বাগানের ভিতরের ক্ষেত্রফল নয়, সম্পূর্ণ সীমানা ঘিরে দেয়।'),
        },
        {
          question: t('A rectangle is 15 cm long and has area 90 cm². Find its breadth.', 'একটি আয়তক্ষেত্রের দৈর্ঘ্য 15 সেমি এবং ক্ষেত্রফল 90 বর্গসেমি। প্রস্থ কত?'),
          given: t('Length = 15 cm; area = 90 cm².', 'দৈর্ঘ্য = 15 সেমি; ক্ষেত্রফল = 90 বর্গসেমি।'),
          find: t('The breadth.', 'প্রস্থ।'),
          method: t('Since area = length × breadth, divide the area by the length.', 'ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ, তাই ক্ষেত্রফলকে দৈর্ঘ্য দিয়ে ভাগ করো।'),
          steps: [
            t(r`Breadth $= 90 \div 15$.`, r`প্রস্থ $= 90 \div 15$।`),
            t(r`Breadth $= 6$ cm.`, r`প্রস্থ $= 6$ সেমি।`),
          ],
          answer: t('6 cm', '6 সেমি'),
          why: t('15 × 6 = 90 cm², which matches the given area.', '15 × 6 = 90 বর্গসেমি, যা দেওয়া ক্ষেত্রফলের সমান।'),
        },
        {
          question: t('A square has perimeter 36 cm. Find its side and area.', 'একটি বর্গক্ষেত্রের পরিসীমা 36 সেমি। বাহু ও ক্ষেত্রফল নির্ণয় করো।'),
          given: t('Square perimeter = 36 cm.', 'বর্গক্ষেত্রের পরিসীমা = 36 সেমি।'),
          find: t('Side length and area.', 'বাহুর দৈর্ঘ্য ও ক্ষেত্রফল।'),
          method: t('Divide the perimeter by four for the side, then square the side for area.', 'বাহু পেতে পরিসীমাকে চার দিয়ে ভাগ করো, তারপর বাহুর বর্গ করে ক্ষেত্রফল বের করো।'),
          steps: [
            t(r`Side $= 36 \div 4 = 9$ cm.`, r`বাহু $= 36 \div 4 = 9$ সেমি।`),
            t(r`Area $= 9 \times 9 = 81$ cm².`, r`ক্ষেত্রফল $= 9 \times 9 = 81$ বর্গসেমি।`),
          ],
          answer: t('Side 9 cm; area 81 cm²', 'বাহু 9 সেমি; ক্ষেত্রফল 81 বর্গসেমি'),
          why: t('Four sides of 9 cm give perimeter 36 cm, and the area is 9 squared.', '9 সেমির চারটি বাহুতে পরিসীমা 36 সেমি; ক্ষেত্রফল 9-এর বর্গ।'),
        },
        {
          question: t('A floor is 9 m long and 4 m wide. Find the area to be tiled.', 'একটি মেঝে 9 মিটার লম্বা ও 4 মিটার চওড়া। টালি বসানোর ক্ষেত্রফল কত?'),
          given: t('Floor length = 9 m; breadth = 4 m.', 'মেঝের দৈর্ঘ্য = 9 মিটার; প্রস্থ = 4 মিটার।'),
          find: t('The floor area.', 'মেঝের ক্ষেত্রফল।'),
          method: t('Tiling covers the inside surface, so multiply length by breadth.', 'টালি ভিতরের পৃষ্ঠ ঢাকে, তাই দৈর্ঘ্যকে প্রস্থ দিয়ে গুণ করো।'),
          steps: [
            t(r`Area $= 9 \times 4$.`, r`ক্ষেত্রফল $= 9 \times 4$।`),
            t(r`Area $= 36$ m².`, r`ক্ষেত্রফল $= 36$ বর্গমিটার।`),
          ],
          answer: t('36 m²', '36 বর্গমিটার'),
          why: t('Nine rows of four square metres cover 36 square metres in total.', 'চার বর্গমিটারের নয়টি সারি মিলিয়ে মোট 36 বর্গমিটার হয়।'),
        },
        {
          question: t('A rectangle has perimeter 50 cm and breadth 10 cm. Find its length and area.', 'একটি আয়তক্ষেত্রের পরিসীমা 50 সেমি এবং প্রস্থ 10 সেমি। দৈর্ঘ্য ও ক্ষেত্রফল কত?'),
          given: t('Perimeter = 50 cm; breadth = 10 cm.', 'পরিসীমা = 50 সেমি; প্রস্থ = 10 সেমি।'),
          find: t('Length and area.', 'দৈর্ঘ্য ও ক্ষেত্রফল।'),
          method: t('Halve the perimeter to find length + breadth, then calculate area.', 'পরিসীমার অর্ধেক থেকে দৈর্ঘ্য + প্রস্থ বের করে ক্ষেত্রফল হিসাব করো।'),
          steps: [
            t(r`Length + breadth $= 50 \div 2 = 25$ cm, so length $= 25 - 10 = 15$ cm.`, r`দৈর্ঘ্য + প্রস্থ $= 50 \div 2 = 25$ সেমি, তাই দৈর্ঘ্য $= 25 - 10 = 15$ সেমি।`),
            t(r`Area $= 15 \times 10 = 150$ cm².`, r`ক্ষেত্রফল $= 15 \times 10 = 150$ বর্গসেমি।`),
          ],
          answer: t('Length 15 cm; area 150 cm²', 'দৈর্ঘ্য 15 সেমি; ক্ষেত্রফল 150 বর্গসেমি'),
          why: t('The sides 15 cm and 10 cm give 2(15 + 10) = 50 cm and area 150 cm².', '15 সেমি ও 10 সেমি বাহুতে 2(15 + 10) = 50 সেমি পরিসীমা এবং 150 বর্গসেমি ক্ষেত্রফল হয়।'),
        },
        {
          question: t('A square floor has area 64 m². Find its side length and perimeter.', 'একটি বর্গাকার মেঝের ক্ষেত্রফল 64 বর্গমিটার। বাহুর দৈর্ঘ্য ও পরিসীমা নির্ণয় করো।'),
          given: t('Square area = 64 m².', 'বর্গক্ষেত্রের ক্ষেত্রফল = 64 বর্গমিটার।'),
          find: t('Side length and perimeter.', 'বাহুর দৈর্ঘ্য ও পরিসীমা।'),
          method: t('Find the number whose square is 64, then multiply that side by four.', 'যে সংখ্যার বর্গ 64 সেটি বের করো, তারপর সেই বাহুকে চার দিয়ে গুণ করো।'),
          steps: [
            t(r`Side $= \sqrt{64} = 8$ m, because $8 \times 8 = 64$.`, r`বাহু $= \sqrt{64} = 8$ মিটার, কারণ $8 \times 8 = 64$।`),
            t(r`Perimeter $= 4 \times 8 = 32$ m.`, r`পরিসীমা $= 4 \times 8 = 32$ মিটার।`),
          ],
          answer: t('Side 8 m; perimeter 32 m', 'বাহু 8 মিটার; পরিসীমা 32 মিটার'),
          why: t('A square with side 8 m has area 64 m² and four equal sides totalling 32 m.', '8 মিটার বাহুর বর্গের ক্ষেত্রফল 64 বর্গমিটার এবং চার বাহুর যোগ 32 মিটার।'),
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Circles', 'বৃত্ত'),
          body: t(
            r`A **circle** is a perfectly round shape, like a roti or a bangle.

- The **radius** $r$ is the distance from the centre to the edge. The **diameter** $= 2r$ goes right across.
- $\pi$ (pi) is a special number, about $\frac{22}{7}$ or $3.14$.
- **Circumference** (the perimeter of a circle) $= 2\pi r$.
- **Area** $= \pi r^2$.
- Tip: when $\pi = \frac{22}{7}$, pick the radius as a multiple of $7$ and cancel the $7$ first.`,
            r`**বৃত্ত** হল একেবারে গোল আকার, যেমন রুটি বা চুড়ি।

- কেন্দ্র থেকে ধার পর্যন্ত দূরত্বকে বলে **ব্যাসার্ধ** $r$। **ব্যাস** $= 2r$, যা বৃত্তের এক ধার থেকে অন্য ধার পর্যন্ত যায়।
- $\pi$ (পাই) একটা বিশেষ সংখ্যা, মোটামুটি $\frac{22}{7}$ বা $3.14$।
- **পরিধি** (বৃত্তের পরিসীমা) $= 2\pi r$।
- **ক্ষেত্রফল** $= \pi r^2$।
- কৌশল: $\pi = \frac{22}{7}$ নিলে আগে ব্যাসার্ধের সঙ্গে $7$ কেটে নাও।`,
          ),
        },
        {
          heading: t('Triangles', 'ত্রিভুজ'),
          body: t(
            r`A triangle is **half of a rectangle**, so:

$$\text{Area} = \frac{1}{2} \times \text{base} \times \text{height}$$

- The **height** must be straight up (at a right angle, $90^\circ$) from the base.
- **Right-angled triangle**: the two shorter sides are the base and height. Test: if $a^2 + b^2 = c^2$ (c the longest side), it is right-angled. Example: $6, 8, 10$ since $36 + 64 = 100$.
- **Heron's formula** works for any triangle when all three sides are known: $s = \frac{a + b + c}{2}$, Area $= \sqrt{s(s-a)(s-b)(s-c)}$.`,
            r`ত্রিভুজ হল **আয়তক্ষেত্রের অর্ধেক**, তাই:

$$\text{ক্ষেত্রফল} = \frac{1}{2} \times \text{ভূমি} \times \text{উচ্চতা}$$

- **উচ্চতা** ভূমির সঙ্গে খাড়াভাবে (সমকোণে, $90^\circ$) মাপতে হবে।
- **সমকোণী ত্রিভুজ**: ছোট দুটো বাহুই ভূমি আর উচ্চতা। পরীক্ষা: $a^2 + b^2 = c^2$ হলে (c সবচেয়ে বড় বাহু) ত্রিভুজটা সমকোণী। যেমন $6, 8, 10$, কারণ $36 + 64 = 100$।
- তিনটে বাহু জানা থাকলে যে-কোনো ত্রিভুজে **হেরনের সূত্র** খাটে: $s = \frac{a + b + c}{2}$, ক্ষেত্রফল $= \sqrt{s(s-a)(s-b)(s-c)}$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'Find the circumference of a circle of radius 42 cm. (Take π = 22/7)',
            '42 সেমি ব্যাসার্ধের একটা বৃত্তের পরিধি বার করো। (π = 22/7 ধরো)',
          ),
          steps: [
            t(r`Circumference $= 2\pi r = 2 \times \frac{22}{7} \times 42$.`, r`পরিধি $= 2\pi r = 2 \times \frac{22}{7} \times 42$।`),
            t(r`$42 \div 7 = 6$, so $2 \times 22 \times 6 = 264$ cm.`, r`$42 \div 7 = 6$, তাই $2 \times 22 \times 6 = 264$ সেমি।`),
          ],
          answer: t('264 cm', '264 সেমি'),
        },
        {
          question: t(
            'Find the area of a circle of radius 63 cm. (Take π = 22/7)',
            '63 সেমি ব্যাসার্ধের একটা বৃত্তের ক্ষেত্রফল বার করো। (π = 22/7 ধরো)',
          ),
          steps: [
            t(r`Area $= \pi r^2 = \frac{22}{7} \times 63 \times 63$.`, r`ক্ষেত্রফল $= \pi r^2 = \frac{22}{7} \times 63 \times 63$।`),
            t(r`$63 \div 7 = 9$, so $22 \times 9 \times 63 = 198 \times 63 = 12474$ cm².`, r`$63 \div 7 = 9$, তাই $22 \times 9 \times 63 = 198 \times 63 = 12474$ বর্গসেমি।`),
          ],
          answer: t('12474 cm²', '12474 বর্গসেমি'),
        },
        {
          question: t(
            'The sides of a triangle are 9 cm, 12 cm and 15 cm. Find its area.',
            'একটা ত্রিভুজের বাহুগুলো 9 সেমি, 12 সেমি ও 15 সেমি। এর ক্ষেত্রফল বার করো।',
          ),
          steps: [
            t(r`Heron: $s = \frac{9 + 12 + 15}{2} = 18$.`, r`হেরনের সূত্রে: $s = \frac{9 + 12 + 15}{2} = 18$।`),
            t(r`Area $= \sqrt{18 \times 9 \times 6 \times 3} = \sqrt{2916} = 54$ cm².`, r`ক্ষেত্রফল $= \sqrt{18 \times 9 \times 6 \times 3} = \sqrt{2916} = 54$ বর্গসেমি।`),
            t(r`Faster: $81 + 144 = 225 = 15^2$, so it is right-angled. Area $= \frac{1}{2} \times 9 \times 12 = 54$.`, r`আরও সহজে: $81 + 144 = 225 = 15^2$, তাই এটা সমকোণী। ক্ষেত্রফল $= \frac{1}{2} \times 9 \times 12 = 54$।`),
          ],
          answer: t('54 cm²', '54 বর্গসেমি'),
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Solid shapes: volume and surface area', 'ঘনবস্তু: আয়তন ও তলের ক্ষেত্রফল'),
          body: t(
            r`Solid (3D) shapes have length, breadth **and** height.

- **Volume** is how much space is inside, in **cubic units** (cm³, m³). $1$ litre $= 1000$ cm³.
- **Total surface area (TSA)** is the area of all the outside faces together, like the paper needed to wrap a gift box.
- **Cube** (all edges $a$, like a dice): Volume $= a^3$, TSA $= 6a^2$.
- **Cuboid** (a box, $l \times b \times h$): Volume $= lbh$, TSA $= 2(lb + bh + hl)$.
- **Cylinder** (like a tin or a pipe, radius $r$, height $h$): Volume $= \pi r^2 h$, curved surface $= 2\pi r h$.`,
            r`ঘনবস্তুর (ত্রিমাত্রিক আকার) দৈর্ঘ্য, প্রস্থ **আর** উচ্চতা থাকে।

- ভিতরে কতটা জায়গা আছে তাকে বলে **আয়তন**, মাপা হয় **ঘন এককে** (ঘনসেমি, ঘনমিটার)। $1$ লিটার $= 1000$ ঘনসেমি।
- বাইরের সব তলের ক্ষেত্রফল একসঙ্গে হল **সমগ্রতলের ক্ষেত্রফল**, যেমন একটা উপহারের বাক্স মুড়তে যতটা কাগজ লাগে।
- **ঘনক** (সব ধার $a$, লুডোর ছক্কার মতো): আয়তন $= a^3$, সমগ্রতল $= 6a^2$।
- **আয়তঘন** (বাক্স, $l \times b \times h$): আয়তন $= lbh$, সমগ্রতল $= 2(lb + bh + hl)$।
- **লম্ব বৃত্তাকার চোঙ** (টিনের কৌটো বা পাইপের মতো, ব্যাসার্ধ $r$, উচ্চতা $h$): আয়তন $= \pi r^2 h$, বক্রতল $= 2\pi r h$।`,
          ),
        },
        {
          heading: t('Paths around a park', 'পার্কের চারপাশে রাস্তা'),
          body: t(
            r`A path of width $w$ runs **outside** a rectangular park of length $l$ and breadth $b$.

- The outer rectangle is $(l + 2w)$ by $(b + 2w)$, because the path adds $w$ on **both** sides.
- Area of path $=$ outer area $-$ park area.
- **Shortcut:** Area of path $= 2w(l + b + 2w)$.
- For a path **inside** the park: $2w(l + b - 2w)$.`,
            r`$l$ দৈর্ঘ্য ও $b$ প্রস্থের একটা আয়তাকার পার্কের **বাইরে** চারপাশে $w$ চওড়া রাস্তা আছে।

- বাইরের আয়তক্ষেত্রের মাপ $(l + 2w)$ আর $(b + 2w)$, কারণ রাস্তা **দুই** পাশেই $w$ করে যোগ করে।
- রাস্তার ক্ষেত্রফল $=$ বাইরের ক্ষেত্রফল $-$ পার্কের ক্ষেত্রফল।
- **শর্টকাট:** রাস্তার ক্ষেত্রফল $= 2w(l + b + 2w)$।
- রাস্তা পার্কের **ভিতরে** হলে: $2w(l + b - 2w)$।`,
          ),
        },
        {
          heading: t('Working backwards', 'উল্টো দিক থেকে হিসাব'),
          body: t(
            r`Exams often give the answer of one formula and ask for another.

- Volume of a cube is $2744$ cm³? Find the edge first: $a = \sqrt[3]{2744} = 14$, then TSA $= 6 \times 14^2$.
- Learn cubes up to $15$: $8^3 = 512$, $10^3 = 1000$, $12^3 = 1728$, $14^3 = 2744$, $15^3 = 3375$.`,
            r`পরীক্ষায় প্রায়ই একটা সূত্রের উত্তর দিয়ে অন্যটা জানতে চায়।

- ঘনকের আয়তন $2744$ ঘনসেমি? আগে ধার বার করো: $a = \sqrt[3]{2744} = 14$, তারপর সমগ্রতল $= 6 \times 14^2$।
- $15$ পর্যন্ত ঘন মুখস্থ রাখো: $8^3 = 512$, $10^3 = 1000$, $12^3 = 1728$, $14^3 = 2744$, $15^3 = 3375$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A cylinder has base radius 14 cm and height 16 cm. Find its volume. (π = 22/7)',
            'একটা লম্ব বৃত্তাকার চোঙের ভূমির ব্যাসার্ধ 14 সেমি এবং উচ্চতা 16 সেমি। এর আয়তন বার করো। (π = 22/7)',
          ),
          steps: [
            t(r`Volume $= \pi r^2 h = \frac{22}{7} \times 14 \times 14 \times 16$.`, r`আয়তন $= \pi r^2 h = \frac{22}{7} \times 14 \times 14 \times 16$।`),
            t(r`$14 \div 7 = 2$, so $22 \times 2 \times 14 \times 16 = 44 \times 224 = 9856$ cm³.`, r`$14 \div 7 = 2$, তাই $22 \times 2 \times 14 \times 16 = 44 \times 224 = 9856$ ঘনসেমি।`),
          ],
          answer: t('9856 cm³', '9856 ঘনসেমি'),
        },
        {
          question: t(
            'A rectangular park is 49 m long and 31 m wide. A path 3 m wide runs around it on the outside. Find the area of the path.',
            'একটা আয়তাকার পার্ক 49 মিটার লম্বা ও 31 মিটার চওড়া। এর বাইরে চারপাশে 3 মিটার চওড়া রাস্তা আছে। রাস্তার ক্ষেত্রফল বার করো।',
          ),
          steps: [
            t(r`Outer rectangle $= (49 + 6) \times (31 + 6) = 55 \times 37 = 2035$ m².`, r`বাইরের আয়তক্ষেত্র $= (49 + 6) \times (31 + 6) = 55 \times 37 = 2035$ বর্গমিটার।`),
            t(r`Park $= 49 \times 31 = 1519$ m². Path $= 2035 - 1519 = 516$ m².`, r`পার্ক $= 49 \times 31 = 1519$ বর্গমিটার। রাস্তা $= 2035 - 1519 = 516$ বর্গমিটার।`),
            t(r`Shortcut check: $2 \times 3 \times (49 + 31 + 6) = 6 \times 86 = 516$.`, r`শর্টকাটে যাচাই: $2 \times 3 \times (49 + 31 + 6) = 6 \times 86 = 516$।`),
          ],
          answer: t('516 m²', '516 বর্গমিটার'),
        },
        {
          question: t(
            'The volume of a cube is 2744 cm³. Find its total surface area.',
            'একটা ঘনকের আয়তন 2744 ঘনসেমি। এর সমগ্রতলের ক্ষেত্রফল বার করো।',
          ),
          steps: [
            t(r`$a^3 = 2744 \Rightarrow a = 14$ cm (since $14 \times 14 \times 14 = 2744$).`, r`$a^3 = 2744$, তাই $a = 14$ সেমি (কারণ $14 \times 14 \times 14 = 2744$)।`),
            t(r`TSA $= 6a^2 = 6 \times 196 = 1176$ cm².`, r`সমগ্রতল $= 6a^2 = 6 \times 196 = 1176$ বর্গসেমি।`),
          ],
          answer: t('1176 cm²', '1176 বর্গসেমি'),
        },
      ],
    },
  ],
  strategy: {
    heading: t('A beginner’s plan for mensuration', 'পরিমিতির অঙ্কের প্রাথমিক কৌশল'),
    sections: [
      { heading: t('1. Decide boundary or inside', '১. সীমানা না ভিতরের অংশ ঠিক করো'), body: t('Fencing and borders need perimeter; flooring, painting and covering need area.', 'বেড়া ও বর্ডারে পরিসীমা লাগে; মেঝে, রং ও ঢাকনায় ক্ষেত্রফল লাগে।') },
      { heading: t('2. Match the shape and formula', '২. আকার অনুযায়ী সূত্র বেছে নাও'), body: t('For a rectangle use P = 2(l + b), A = l × b; for a square use P = 4a, A = a².', 'আয়তক্ষেত্রে P = 2(l + b), A = l × b; বর্গক্ষেত্রে P = 4a, A = a² ব্যবহার করো।') },
      { heading: t('3. Find missing sides first', '৩. আগে অজানা বাহু বের করো'), body: t('If perimeter and one side are given, use the perimeter formula to recover the other side before finding area.', 'পরিসীমা ও একটি বাহু দেওয়া থাকলে ক্ষেত্রফল বের করার আগে পরিসীমার সূত্রে অন্য বাহুটি নির্ণয় করো।') },
      { heading: t('4. Keep units consistent', '৪. একক একই রাখো'), body: t('Convert all lengths to the same unit before adding or multiplying. A length uses cm or m; area uses cm² or m².', 'যোগ বা গুণের আগে সব দৈর্ঘ্য একই এককে বদলাও। দৈর্ঘ্যে সেমি বা মি, ক্ষেত্রফলে বর্গসেমি বা বর্গমি লাগে।') },
      { heading: t('5. Check formula and units', '৫. সূত্র ও একক যাচাই করো'), body: t('Perimeter must have a length unit and area a square unit. Check that the answer fits the shape and the question asked.', 'পরিসীমার একক দৈর্ঘ্য এবং ক্ষেত্রফলের একক বর্গ একক হবে। উত্তরটি আকার ও প্রশ্নের সঙ্গে মেলে কি না দেখো।') },
    ],
  },
  practice: {
    question: t('A rectangle is 8 cm long and 5 cm wide. Find its perimeter and area.', 'একটি আয়তক্ষেত্র 8 সেমি লম্বা ও 5 সেমি চওড়া। পরিসীমা ও ক্ষেত্রফল নির্ণয় করো।'),
    steps: [
      t(r`Perimeter $= 2(8 + 5) = 26$ cm.`, r`পরিসীমা $= 2(8 + 5) = 26$ সেমি।`),
      t(r`Area $= 8 \times 5 = 40$ cm².`, r`ক্ষেত্রফল $= 8 \times 5 = 40$ বর্গসেমি।`),
    ],
    answer: t('Perimeter 26 cm; area 40 cm²', 'পরিসীমা 26 সেমি; ক্ষেত্রফল 40 বর্গসেমি'),
  },
  rules: [
    {
      label: t('Rectangle', 'আয়তক্ষেত্র'),
      latex: r`P = 2(l + b), \quad A = l \times b`,
      explain: t('Perimeter adds two lengths and two breadths; area is length times breadth.', 'পরিসীমায় দুটো দৈর্ঘ্য ও দুটো প্রস্থ যোগ হয়; ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ।'),
    },
    {
      label: t('Square', 'বর্গক্ষেত্র'),
      latex: r`P = 4a, \quad A = a^2`,
      explain: t('All four sides are equal to a.', 'চারটে বাহুই a-এর সমান।'),
    },
    {
      label: t('Circle', 'বৃত্ত'),
      latex: r`C = 2\pi r, \quad A = \pi r^2`,
      explain: t('Circumference is the distance around; area is the space inside. r is the radius.', 'পরিধি হল চারপাশের দৈর্ঘ্য; ক্ষেত্রফল হল ভিতরের জায়গা। r হল ব্যাসার্ধ।'),
    },
    {
      label: t('Triangle', 'ত্রিভুজ'),
      latex: r`A = \tfrac{1}{2} \times b \times h`,
      explain: t('Half of base times the straight-up height.', 'ভূমি ও খাড়া উচ্চতার গুণফলের অর্ধেক।'),
    },
    {
      label: t("Heron's formula", 'হেরনের সূত্র'),
      latex: r`A = \sqrt{s(s-a)(s-b)(s-c)}, \quad s = \tfrac{a+b+c}{2}`,
      explain: t('Use it when all three sides are known; s is half the perimeter.', 'তিনটে বাহু জানা থাকলে ব্যবহার করো; s হল পরিসীমার অর্ধেক।'),
    },
    {
      label: t('Cube and cuboid', 'ঘনক ও আয়তঘন'),
      latex: r`V_{\text{cube}} = a^3,\ \text{TSA} = 6a^2; \quad V_{\text{cuboid}} = lbh`,
      explain: t('A cube has 6 equal square faces. A cuboid is a box with length, breadth and height.', 'ঘনকের 6টা সমান বর্গাকার তল। আয়তঘন হল দৈর্ঘ্য, প্রস্থ ও উচ্চতাওয়ালা বাক্স।'),
    },
    {
      label: t('Cylinder', 'লম্ব বৃত্তাকার চোঙ'),
      latex: r`V = \pi r^2 h, \quad \text{CSA} = 2\pi r h`,
      explain: t('Volume is the circle area times the height; curved surface is circumference times height.', 'আয়তন = বৃত্তের ক্ষেত্রফল × উচ্চতা; বক্রতল = পরিধি × উচ্চতা।'),
    },
    {
      label: t('Path around a rectangle', 'আয়তক্ষেত্রের চারপাশে রাস্তা'),
      latex: r`A_{\text{path}} = 2w(l + b + 2w)`,
      explain: t('For a path of width w outside the park. Use (l + b − 2w) for a path inside.', 'পার্কের বাইরে w চওড়া রাস্তার জন্য। ভিতরের রাস্তার জন্য (l + b − 2w) নাও।'),
    },
  ],
  tips: [
    t('Perimeter is in cm or m; area is in cm² or m²; volume is in cm³ or m³.', 'পরিসীমা সেমি বা মিটারে; ক্ষেত্রফল বর্গসেমি বা বর্গমিটারে; আয়তন ঘনসেমি বা ঘনমিটারে।'),
    t('If the diameter is given, halve it to get the radius before using the circle formulas.', 'ব্যাস দেওয়া থাকলে বৃত্তের সূত্রে বসানোর আগে অর্ধেক করে ব্যাসার্ধ নাও।'),
    t('With π = 22/7, cancel the 7 with the radius first to keep numbers small.', 'π = 22/7 নিলে আগে ব্যাসার্ধের সঙ্গে 7 কেটে নাও, সংখ্যা ছোট থাকবে।'),
    t('A path outside a park adds its width on both sides: length becomes l + 2w, not l + w.', 'পার্কের বাইরের রাস্তা দুই পাশেই চওড়া যোগ করে: দৈর্ঘ্য হয় l + 2w, l + w নয়।'),
    t('Before using Heron, check for a right triangle (3-4-5, 6-8-10, 5-12-13): it is much faster.', 'হেরনের সূত্রের আগে দেখে নাও ত্রিভুজটা সমকোণী কি না (3-4-5, 6-8-10, 5-12-13): তাতে অনেক তাড়াতাড়ি হয়।'),
    t('1 litre = 1000 cm³ and 1 m³ = 1000 litres.', '1 লিটার = 1000 ঘনসেমি এবং 1 ঘনমিটার = 1000 লিটার।'),
  ],
};
