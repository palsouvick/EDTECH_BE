'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'seating_arrangement',
  patterns: [
    {
      key: 'position_in_row',
      emoji: '🔢',
      name: t(`Position in a row (from left and right)`, `সারিতে অবস্থান (বাঁ ও ডান থেকে)`),
      spot: t(
        `"Ravi is 7th from the left and 12th from the right." The question asks the total number of people, or a position from the other end.`,
        `"রবি বাঁ দিক থেকে 7ম আর ডান দিক থেকে 12তম।" প্রশ্নে মোট কতজন, বা অন্য প্রান্ত থেকে অবস্থান জানতে চাওয়া হয়।`,
      ),
      method: [
        t(`Total = position from left + position from right − 1 (the person is counted twice).`, `মোট = বাঁ দিক থেকে অবস্থান + ডান দিক থেকে অবস্থান − 1 (লোকটিকে দুবার গোনা হয়েছে)।`),
        t(`Position from the other end = Total − given position + 1.`, `অন্য প্রান্ত থেকে অবস্থান = মোট − দেওয়া অবস্থান + 1।`),
        t(`Check with a tiny row: in a row of 3, the 1st from the left is 3 − 1 + 1 = 3rd from the right.`, `ছোট সারিতে মিলিয়ে নাও: 3 জনের সারিতে বাঁ থেকে 1ম জন ডান থেকে 3 − 1 + 1 = 3য়।`),
      ],
      example: {
        question: t(`In a row of students, Ravi is 7th from the left and 12th from the right. How many students are in the row?`, `ছাত্রদের একটি সারিতে রবি বাঁ দিক থেকে 7ম আর ডান দিক থেকে 12তম। সারিতে মোট কতজন ছাত্র?`),
        steps: [
          t(`Total = 7 + 12 − 1.`, `মোট = 7 + 12 − 1।`),
          t(`= 18 (Ravi was counted in both 7 and 12, so subtract him once).`, `= 18 (রবিকে 7 আর 12 দুটোতেই গোনা হয়েছে, তাই একবার বাদ)।`),
        ],
        answer: t(`18 students`, `উত্তর: 18 জন`),
      },
      tryIt: {
        question: t(`In a row of 25 children, Mina is 9th from the left. What is her position from the right?`, `25 জন শিশুর একটি সারিতে মিনা বাঁ দিক থেকে 9ম। ডান দিক থেকে তার অবস্থান কত?`),
        options: [t('16th', '16তম'), t('17th', '17তম'), t('15th', '15তম'), t('34th', '34তম')],
        correct: 1,
        explanation: [
          t(`Position from right = 25 − 9 + 1.`, `ডান দিক থেকে অবস্থান = 25 − 9 + 1।`),
          t(`= 17th. (16th forgets the +1; 34 adds instead of subtracting.)`, `= 17তম। (16 হলে +1 ভুলে গেছ; 34 হলে বাদ না দিয়ে যোগ করেছ।)`),
        ],
      },
    },
    {
      key: 'linear_row_north',
      emoji: '🪑',
      name: t(`Linear row, all facing North`, `এক সারিতে বসা, সবাই উত্তরমুখী`),
      spot: t(
        `5 to 8 people sit in a straight row facing North (or "facing you"), with clues like "immediate left", "at an end", "second to the right", "two people between".`,
        `5 থেকে 8 জন এক সারিতে উত্তর দিকে মুখ করে বসে, আর সূত্র থাকে যেমন "ঠিক বাঁ পাশে", "এক প্রান্তে", "ডান দিকে দ্বিতীয়", "মাঝে দুজন"।`,
      ),
      method: [
        t(`Draw numbered seats 1, 2, 3 ... from left to right. Facing North, their left is your left.`, `বাঁ থেকে ডানে 1, 2, 3 ... নম্বর দিয়ে আসন আঁকো। উত্তরমুখী হলে তাদের বাঁ আর তোমার বাঁ একই।`),
        t(`Place the fixed clues first ("at the right end", "in the middle", "third from the left").`, `আগে নিশ্চিত সূত্রগুলি বসাও ("ডান প্রান্তে", "মাঝখানে", "বাঁ দিক থেকে তৃতীয়")।`),
        t(`Then use clues that link to someone already placed. "Two people between X and Y" means their seat numbers differ by 3.`, `তারপর যারা আগে বসে গেছে তাদের সঙ্গে জোড়া সূত্র লাগাও। "X আর Y-এর মাঝে দুজন" মানে আসন নম্বরের তফাত 3।`),
        t(`Fill the last seats with the "not next to" / "to the left of" clues and check every clue once more.`, `শেষ আসনগুলি "পাশে নয়" / "বাঁ দিকে" জাতীয় সূত্র দিয়ে ভরো, আর সব সূত্র আর একবার মিলিয়ে নাও।`),
      ],
      example: {
        question: t(
          `Five friends A, B, C, D and E sit in a row facing North. C is in the middle. A is to the immediate left of C. B is at the right end. E is to the immediate right of C. Who is at the left end?`,
          `পাঁচ বন্ধু A, B, C, D ও E এক সারিতে উত্তর দিকে মুখ করে বসে আছে। C মাঝখানে। A, C-এর ঠিক বাঁ পাশে। B ডান প্রান্তে। E, C-এর ঠিক ডান পাশে। বাঁ প্রান্তে কে?`,
        ),
        steps: [
          t(`Seats 1 to 5 from left. C is in the middle: seat 3. B is at the right end: seat 5.`, `বাঁ থেকে আসন 1 থেকে 5। C মাঝখানে: আসন 3। B ডান প্রান্তে: আসন 5।`),
          t(`A is immediate left of C: seat 2. E is immediate right of C: seat 4.`, `A, C-এর ঠিক বাঁয়ে: আসন 2। E, C-এর ঠিক ডানে: আসন 4।`),
          t(`Only seat 1 is left, so D sits there. Row: D A C E B.`, `শুধু আসন 1 বাকি, তাই সেখানে D। সারি: D A C E B।`),
        ],
        answer: t(`D`, `উত্তর: D`),
      },
      tryIt: {
        question: t(
          `Six people P, Q, R, S, T and U sit in a row facing North. R sits at the right end. Exactly three people sit between R and T. P is an immediate neighbour of T, but P is not at an end. S sits second to the right of P. Q sits somewhere to the left of U. Who sits to the immediate right of P?`,
          `ছয় জন P, Q, R, S, T ও U এক সারিতে উত্তর দিকে মুখ করে বসে আছে। R ডান প্রান্তে। R আর T-এর মাঝে ঠিক তিনজন বসে। P, T-এর ঠিক পাশে বসে, কিন্তু P কোনো প্রান্তে নয়। S, P-এর ডান দিকে দ্বিতীয় স্থানে। Q, U-এর বাঁ দিকে কোথাও বসে। P-এর ঠিক ডান পাশে কে?`,
        ),
        options: [t('S', 'S'), t('T', 'T'), t('Q', 'Q'), t('U', 'U')],
        correct: 3,
        explanation: [
          t(`Seats 1 to 6 from left. R = 6. Three people between R and T, so T = 6 − 4 = 2.`, `বাঁ থেকে আসন 1 থেকে 6। R = 6। R আর T-এর মাঝে তিনজন, তাই T = 6 − 4 = 2।`),
          t(`P is next to T (seat 1 or 3) but not at an end, so P = 3. S is second to the right of P: S = 5.`, `P, T-এর পাশে (আসন 1 বা 3) কিন্তু প্রান্তে নয়, তাই P = 3। S, P-এর ডান দিকে দ্বিতীয়: S = 5।`),
          t(`Seats 1 and 4 are left for Q and U; Q is to the left of U, so Q = 1, U = 4. Row: Q T P U S R.`, `আসন 1 আর 4 বাকি Q আর U-এর জন্য; Q, U-এর বাঁ দিকে, তাই Q = 1, U = 4। সারি: Q T P U S R।`),
          t(`Immediate right of P (seat 3) is seat 4: U. (S is second to the right, not immediate.)`, `P-এর (আসন 3) ঠিক ডানে আসন 4: U। (S হল ডান দিকে দ্বিতীয়, ঠিক পাশে নয়।)`),
        ],
      },
    },
    {
      key: 'circular_facing_centre',
      emoji: '⭕',
      name: t(`Circular table, facing the centre`, `গোল টেবিল, কেন্দ্রের দিকে মুখ করে`),
      spot: t(
        `People sit around a round (or square) table "facing the centre", with clues like "opposite", "immediate left", "between".`,
        `লোকেরা গোল (বা চৌকো) টেবিলের চারপাশে "কেন্দ্রের দিকে মুখ করে" বসে, আর সূত্র থাকে যেমন "মুখোমুখি", "ঠিক বাঁ পাশে", "মাঝে"।`,
      ),
      method: [
        t(`Draw a circle with seats numbered 1, 2, 3 ... going clockwise. With 6 people, seat k is opposite seat k + 3.`, `একটা বৃত্ত এঁকে ঘড়ির কাঁটার দিকে 1, 2, 3 ... নম্বর দিয়ে আসন বসাও। 6 জন হলে আসন k-এর মুখোমুখি আসন k + 3।`),
        t(`Facing the centre: a person's **left = clockwise** neighbour (next number), **right = anticlockwise** neighbour (previous number).`, `কেন্দ্রের দিকে মুখ করলে: কারও **বাঁ = ঘড়ির কাঁটার দিকে** পাশের জন (পরের নম্বর), **ডান = ঘড়ির কাঁটার উল্টো দিকে** পাশের জন (আগের নম্বর)।`),
        t(`Put the first person in seat 1 (any seat is fine in a circle), then place the others using the clues.`, `প্রথম জনকে আসন 1-এ বসাও (বৃত্তে যেকোনো আসন থেকে শুরু করা যায়), তারপর সূত্র ধরে বাকিদের বসাও।`),
      ],
      example: {
        question: t(
          `Six friends A, B, C, D, E and F sit around a round table facing the centre. A sits opposite D. B is to the immediate right of A. C is to the immediate right of D. F is not next to A. Who sits opposite E?`,
          `ছয় বন্ধু A, B, C, D, E ও F একটি গোল টেবিলের চারপাশে কেন্দ্রের দিকে মুখ করে বসে আছে। A, D-এর মুখোমুখি। B, A-এর ঠিক ডান পাশে। C, D-এর ঠিক ডান পাশে। F, A-এর পাশে বসে না। E-এর মুখোমুখি কে?`,
        ),
        steps: [
          t(`Seats 1 to 6 clockwise. A = 1, so D (opposite) = 4.`, `ঘড়ির কাঁটার দিকে আসন 1 থেকে 6। A = 1, তাই D (মুখোমুখি) = 4।`),
          t(`Right = anticlockwise (previous seat): B = seat 6 (right of A), C = seat 3 (right of D).`, `ডান = ঘড়ির কাঁটার উল্টো দিকে (আগের আসন): B = আসন 6 (A-এর ডানে), C = আসন 3 (D-এর ডানে)।`),
          t(`Seats 2 and 5 are left. Seat 2 is next to A, so F = 5 and E = 2.`, `আসন 2 আর 5 বাকি। আসন 2, A-এর পাশে, তাই F = 5 আর E = 2।`),
          t(`Opposite of seat 2 is seat 5, which is F.`, `আসন 2-এর মুখোমুখি আসন 5, সেখানে F।`),
        ],
        answer: t(`F`, `উত্তর: F`),
      },
      tryIt: {
        question: t(
          `Six people P, Q, R, S, T and U sit around a circular table facing the centre. P sits opposite S. Q is to the immediate left of P. T is to the immediate left of S. U is not next to Q. Who sits to the immediate right of P?`,
          `ছয় জন P, Q, R, S, T ও U একটি গোল টেবিলের চারপাশে কেন্দ্রের দিকে মুখ করে বসে আছে। P, S-এর মুখোমুখি। Q, P-এর ঠিক বাঁ পাশে। T, S-এর ঠিক বাঁ পাশে। U, Q-এর পাশে বসে না। P-এর ঠিক ডান পাশে কে?`,
        ),
        options: [t('Q', 'Q'), t('U', 'U'), t('R', 'R'), t('T', 'T')],
        correct: 1,
        explanation: [
          t(`Seats 1 to 6 clockwise. P = 1, S = 4. Left = clockwise (next seat): Q = 2, T = 5.`, `ঘড়ির কাঁটার দিকে আসন 1 থেকে 6। P = 1, S = 4। বাঁ = ঘড়ির কাঁটার দিকে (পরের আসন): Q = 2, T = 5।`),
          t(`Seats 3 and 6 are left. Seat 3 is next to Q, so U = 6 and R = 3.`, `আসন 3 আর 6 বাকি। আসন 3, Q-এর পাশে, তাই U = 6 আর R = 3।`),
          t(`Right of P = anticlockwise neighbour = seat 6 = U. (Q is on P's left, not right.)`, `P-এর ডান = ঘড়ির কাঁটার উল্টো দিকের পাশের জন = আসন 6 = U। (Q আছে P-এর বাঁ পাশে, ডানে নয়।)`),
        ],
      },
    },
    {
      key: 'mixed_facing_row',
      emoji: '↕️',
      name: t(`Row with some facing North, some facing South`, `সারিতে কেউ উত্তরমুখী, কেউ দক্ষিণমুখী`),
      spot: t(
        `People in one row do not all face the same way: "some face North and some face South" (common in Banking exams).`,
        `এক সারির সবাই একই দিকে মুখ করে নেই: "কেউ উত্তরমুখী, কেউ দক্ষিণমুখী" (ব্যাঙ্কের পরীক্ষায় বেশি আসে)।`,
      ),
      method: [
        t(`Number the seats 1, 2, 3 ... from West to East on your paper, and draw an arrow (↑ North, ↓ South) on each person.`, `কাগজে পশ্চিম থেকে পূর্বে 1, 2, 3 ... নম্বর দিয়ে আসন আঁকো, আর প্রত্যেকের উপর তীর দাও (↑ উত্তর, ↓ দক্ষিণ)।`),
        t(`North-facing person: right = higher number, left = lower number.`, `উত্তরমুখী লোক: ডান = বড় নম্বর, বাঁ = ছোট নম্বর।`),
        t(`South-facing person: it flips! right = lower number, left = higher number.`, `দক্ষিণমুখী লোক: উল্টে যায়! ডান = ছোট নম্বর, বাঁ = বড় নম্বর।`),
        t(`Always look at the direction of the person the clue is about ("immediate left of E" uses E's direction).`, `সূত্র যার সম্পর্কে, সবসময় তার মুখের দিক দেখো ("E-এর ঠিক বাঁয়ে" হলে E-এর দিক ধরতে হবে)।`),
      ],
      example: {
        question: t(
          `Four friends P, Q, R and S sit in a row. Q and S face North; P and R face South. Q sits at one end. P sits to the immediate right of Q. R sits at an end. Who sits to the immediate left of P?`,
          `চার বন্ধু P, Q, R ও S এক সারিতে বসে। Q আর S উত্তরমুখী; P আর R দক্ষিণমুখী। Q এক প্রান্তে বসে। P, Q-এর ঠিক ডান পাশে। R এক প্রান্তে বসে। P-এর ঠিক বাঁ পাশে কে?`,
        ),
        steps: [
          t(`Seats 1 to 4 from West to East. Q faces North, so Q's right is the higher seat. For Q to have someone on the right at an end, Q = 1, so P = 2.`, `পশ্চিম থেকে পূর্বে আসন 1 থেকে 4। Q উত্তরমুখী, তাই Q-এর ডান মানে বড় নম্বর। প্রান্তে বসে ডানে কাউকে পেতে হলে Q = 1, তাই P = 2।`),
          t(`R is at the other end: R = 4, so S = 3.`, `R অন্য প্রান্তে: R = 4, তাই S = 3।`),
          t(`P faces South, so P's left is the **higher** seat: seat 3 = S. (Saying Q means you forgot the flip.)`, `P দক্ষিণমুখী, তাই P-এর বাঁ মানে **বড়** নম্বর: আসন 3 = S। (Q বললে উল্টে যাওয়ার কথা ভুলে গেছ।)`),
        ],
        answer: t(`S`, `উত্তর: S`),
      },
      tryIt: {
        question: t(
          `Five people A, B, C, D and E sit in a row. A and B face North; C, D and E face South. E sits in the middle. A sits to the immediate left of E. B sits to the immediate right of A. D does not sit at an end. Who sits to the immediate right of D?`,
          `পাঁচ জন A, B, C, D ও E এক সারিতে বসে। A আর B উত্তরমুখী; C, D আর E দক্ষিণমুখী। E মাঝখানে বসে। A, E-এর ঠিক বাঁ পাশে। B, A-এর ঠিক ডান পাশে। D কোনো প্রান্তে বসে না। D-এর ঠিক ডান পাশে কে?`,
        ),
        options: [t('E', 'E'), t('A', 'A'), t('C', 'C'), t('B', 'B')],
        correct: 2,
        explanation: [
          t(`Seats 1 to 5 from West to East. E = 3. E faces South, so E's left is the higher seat: A = 4.`, `পশ্চিম থেকে পূর্বে আসন 1 থেকে 5। E = 3। E দক্ষিণমুখী, তাই E-এর বাঁ মানে বড় নম্বর: A = 4।`),
          t(`A faces North, so A's right is the higher seat: B = 5.`, `A উত্তরমুখী, তাই A-এর ডান মানে বড় নম্বর: B = 5।`),
          t(`Seats 1 and 2 are left; D is not at an end, so D = 2 and C = 1.`, `আসন 1 আর 2 বাকি; D প্রান্তে নয়, তাই D = 2 আর C = 1।`),
          t(`D faces South, so D's right is the lower seat: seat 1 = C. (E is the answer only if you forget the flip.)`, `D দক্ষিণমুখী, তাই D-এর ডান মানে ছোট নম্বর: আসন 1 = C। (উল্টে যাওয়ার কথা ভুলে গেলে E আসে।)`),
        ],
      },
    },
  ],
};
