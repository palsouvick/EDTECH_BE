'use strict';

/**
 * "How to solve" concept sheets for Quantitative Aptitude (part B):
 * partnership, pipes_cistern, ages.
 * Format: see ./validate.js header.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/quant_more_b.js
 */

// String.raw keeps LaTeX backslashes readable (\frac instead of \\frac).
const r = String.raw;
const t = (en, bn) => ({ en, bn });
const v = (symbol, en, bn) => ({ symbol, meaning: { en, bn } });

module.exports = [
  // ───────────────────────────── PARTNERSHIP ─────────────────────────────
  {
    subject: 'quant',
    topic: 'partnership',
    title: { en: 'Partnership', bn: 'অংশীদারি কারবার', hi: 'साझेदारी' },
    overview: t(
      r`In a partnership, profit (or loss) is shared in the ratio of each partner's **effective capital = capital × time** (often called rupee-months). If all partners invest for the same period, the profit ratio is simply the capital ratio; if they invest equal sums, it is the time ratio. When a partner joins late, leaves early, or adds/withdraws money midway, split that partner's investment into periods and add the products. A **working partner's** salary or commission is paid out of the profit **first**; only the balance is divided in the investment ratio. Reverse questions (find the capital or the months) are just the same ratio read backwards: $\text{time} \propto \frac{\text{profit}}{\text{capital}}$.`,
      r`অংশীদারি কারবারে লাভ (বা ক্ষতি) ভাগ হয় প্রত্যেক অংশীদারের **কার্যকর মূলধন = মূলধন × সময়** (একে টাকা-মাসও বলে) অনুপাতে। সব অংশীদার একই সময়ের জন্য টাকা খাটালে লাভের অনুপাত শুধু মূলধনের অনুপাত; সবাই সমান টাকা খাটালে তা সময়ের অনুপাত। কোনো অংশীদার দেরিতে যোগ দিলে, আগে চলে গেলে, বা মাঝপথে টাকা যোগ/প্রত্যাহার করলে তার বিনিয়োগকে সময়ভিত্তিক ভাগে ভেঙে গুণফলগুলি যোগ করুন। **কর্মরত অংশীদারের** বেতন বা কমিশন লাভ থেকে **আগে** দেওয়া হয়; বাকি অংশ বিনিয়োগের অনুপাতে ভাগ হয়। উল্টো প্রশ্ন (মূলধন বা মাস বের করা) একই অনুপাতকে পিছন দিক থেকে পড়া মাত্র: $\text{সময়} \propto \frac{\text{লাভ}}{\text{মূলধন}}$।`,
    ),
    formulas: [
      {
        key: 'profit_ratio',
        label: t('Profit-sharing ratio', 'লাভ বণ্টনের অনুপাত'),
        latex: r`P_1 : P_2 : P_3 = C_1 T_1 : C_2 T_2 : C_3 T_3`,
        variables: [
          v('P', 'Share of profit', 'লাভের অংশ'),
          v('C', 'Capital invested', 'বিনিয়োগ করা মূলধন'),
          v('T', 'Time (months) for which it was invested', 'বিনিয়োগের সময় (মাস)'),
        ],
      },
      {
        key: 'simple_partnership',
        label: t('Same time / same capital', 'সমান সময় / সমান মূলধন'),
        latex: r`T_1 = T_2 \Rightarrow P_1 : P_2 = C_1 : C_2, \qquad C_1 = C_2 \Rightarrow P_1 : P_2 = T_1 : T_2`,
      },
      {
        key: 'changing_capital',
        label: t('Capital changed midway', 'মাঝপথে মূলধনের পরিবর্তন'),
        latex: r`\text{Effective capital} = C_a t_a + C_b t_b + \cdots`,
        explanation: t(
          r`Each $C$ is the amount actually in the business during a period of $t$ months. Example: ₹8000 for 3 months, then ₹5000 (after withdrawing ₹3000) for 9 months $= 24000 + 45000 = 69000$.`,
          r`প্রতিটি $C$ হল $t$ মাস সময়কালে কারবারে প্রকৃতপক্ষে থাকা টাকা। উদাহরণ: ₹8000 × 3 মাস, তারপর ₹3000 তুলে নেওয়ায় ₹5000 × 9 মাস $= 24000 + 45000 = 69000$।`,
        ),
      },
      {
        key: 'late_joining',
        label: t('Joining after m months (1-year business)', 'm মাস পরে যোগদান (১ বছরের কারবার)'),
        latex: r`T = 12 - m`,
        explanation: t(
          r`A partner who joins "after 4 months" stays for $8$ months; one who leaves "after 4 months" stays for $4$ months.`,
          r`যে অংশীদার "4 মাস পরে" যোগ দেয় সে থাকে $8$ মাস; যে "4 মাস পরে" চলে যায় সে থাকে $4$ মাস।`,
        ),
      },
      {
        key: 'working_partner',
        label: t('Working partner\'s total share', 'কর্মরত অংশীদারের মোট প্রাপ্য'),
        latex: r`\text{Share}_A = S + (P - S) \times \dfrac{c_A}{c_A + c_B}`,
        variables: [
          v('P', 'Total profit', 'মোট লাভ'),
          v('S', 'Salary / commission paid to A for managing', 'পরিচালনার জন্য A-কে দেওয়া বেতন / কমিশন'),
          v('c_A : c_B', 'Ratio of effective capitals', 'কার্যকর মূলধনের অনুপাত'),
        ],
      },
      {
        key: 'find_time',
        label: t('Time ratio from profit and capital ratios', 'লাভ ও মূলধনের অনুপাত থেকে সময়ের অনুপাত'),
        latex: r`T_1 : T_2 = \dfrac{P_1}{C_1} : \dfrac{P_2}{C_2}, \qquad C_1 : C_2 = \dfrac{P_1}{T_1} : \dfrac{P_2}{T_2}`,
        explanation: t(
          r`Capitals $3 : 5$, profits $1 : 2$ → times $\frac{1}{3} : \frac{2}{5} = 5 : 6$. Check: $3 \times 5 : 5 \times 6 = 15 : 30 = 1 : 2$.`,
          r`মূলধন $3 : 5$, লাভ $1 : 2$ → সময় $\frac{1}{3} : \frac{2}{5} = 5 : 6$। যাচাই: $3 \times 5 : 5 \times 6 = 15 : 30 = 1 : 2$।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Step 1: effective capital of each partner', 'ধাপ ১: প্রত্যেকের কার্যকর মূলধন'),
        body: t(
          r`Multiply capital by months for every period and add. Example: A starts with ₹5000; B joins after 4 months with ₹6000. A $= 5000 \times 12 = 60000$, B $= 6000 \times 8 = 48000$. Ratio $= 60 : 48 = 5 : 4$. Out of a profit of ₹9000, A gets ₹5000 and B ₹4000.`,
          r`প্রতিটি সময়কালের জন্য মূলধন × মাস গুণ করে যোগ করুন। উদাহরণ: A ₹5000 দিয়ে শুরু করে; B 4 মাস পরে ₹6000 নিয়ে যোগ দেয়। A $= 5000 \times 12 = 60000$, B $= 6000 \times 8 = 48000$। অনুপাত $= 60 : 48 = 5 : 4$। ₹9000 লাভ হলে A পায় ₹5000 ও B পায় ₹4000।`,
        ),
      },
      {
        title: t('Step 2: pay salary / commission first', 'ধাপ ২: আগে বেতন / কমিশন দিন'),
        body: t(
          r`Deduct the working partner's salary, commission, or any charity/reserve from the total profit, then share the balance. Example: profit ₹12000; A (working partner) gets $10\%$ of the profit for managing; capitals are in $3 : 2$. A's commission $=$ ₹1200, balance ₹10800 → A ₹6480, B ₹4320. A's total $=$ ₹7680.`,
          r`মোট লাভ থেকে কর্মরত অংশীদারের বেতন, কমিশন বা দান/সংরক্ষিত তহবিল আগে বাদ দিন, তারপর বাকিটা ভাগ করুন। উদাহরণ: লাভ ₹12000; পরিচালনার জন্য A (কর্মরত অংশীদার) লাভের $10\%$ পায়; মূলধনের অনুপাত $3 : 2$। A-র কমিশন $=$ ₹1200, বাকি ₹10800 → A ₹6480, B ₹4320। A-র মোট প্রাপ্য $=$ ₹7680।`,
        ),
      },
      {
        title: t('Step 3: work back from a given share', 'ধাপ ৩: প্রদত্ত অংশ থেকে পিছনে হিসাব'),
        body: t(
          r`Express the known share as a fraction of the total profit. Example: A and B invest in the ratio $3 : 2$; $5\%$ of the profit goes to charity; A's share is ₹855. A gets $\frac{3}{5}$ of $95\% = 57\%$ of the profit, so profit $= \frac{855}{0.57} =$ ₹1500.`,
          r`জানা অংশটিকে মোট লাভের ভগ্নাংশ হিসেবে লিখুন। উদাহরণ: A ও B-এর বিনিয়োগের অনুপাত $3 : 2$; লাভের $5\%$ দানে যায়; A-র অংশ ₹855। A পায় $95\%$-এর $\frac{3}{5} = 57\%$, তাই মোট লাভ $= \frac{855}{0.57} =$ ₹1500।`,
        ),
      },
      {
        title: t('Unknown months or capital', 'অজানা মাস বা মূলধন'),
        body: t(
          r`Set up $\frac{C_1 T_1}{C_2 T_2} = \frac{P_1}{P_2}$ and solve. Example: A invests ₹3000 for the full year; B invests ₹4000 and the profit is shared equally. $3000 \times 12 = 4000 \times T \Rightarrow T = 9$, so B joined after $12 - 9 = 3$ months.`,
          r`$\frac{C_1 T_1}{C_2 T_2} = \frac{P_1}{P_2}$ লিখে সমাধান করুন। উদাহরণ: A সারা বছরের জন্য ₹3000 খাটায়; B ₹4000 খাটায় এবং লাভ সমান ভাগ হয়। $3000 \times 12 = 4000 \times T \Rightarrow T = 9$, অর্থাৎ B যোগ দিয়েছে $12 - 9 = 3$ মাস পরে।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Cancel capital and time ratios separately', 'মূলধন ও সময়ের অনুপাত আলাদা করে কাটাকুটি'),
        body: t(
          r`Reduce each ratio first, then multiply term by term.

Example: capitals ₹15000, ₹20000, ₹25000 → $3 : 4 : 5$; months $12, 9, 6$ → $4 : 3 : 2$. Profit ratio $= 12 : 12 : 10 = 6 : 6 : 5$.`,
          r`প্রতিটি অনুপাত আগে লঘিষ্ঠ করে তারপর পদে পদে গুণ করুন।

উদাহরণ: মূলধন ₹15000, ₹20000, ₹25000 → $3 : 4 : 5$; মাস $12, 9, 6$ → $4 : 3 : 2$। লাভের অনুপাত $= 12 : 12 : 10 = 6 : 6 : 5$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Fractional capitals → multiply by LCM', 'ভগ্নাংশে মূলধন → ল.সা.গু. দিয়ে গুণ'),
        body: t(
          r`If capitals are $\frac{1}{2} : \frac{1}{3} : \frac{1}{4}$ of something, multiply by LCM $12$: $6 : 4 : 3$.

Example: "$2A = 3B = 4C$" means $A : B : C = \frac{1}{2} : \frac{1}{3} : \frac{1}{4} = 6 : 4 : 3$.`,
          r`মূলধন কোনো রাশির $\frac{1}{2} : \frac{1}{3} : \frac{1}{4}$ হলে ল.সা.গু. $12$ দিয়ে গুণ করুন: $6 : 4 : 3$।

উদাহরণ: "$2A = 3B = 4C$" মানে $A : B : C = \frac{1}{2} : \frac{1}{3} : \frac{1}{4} = 6 : 4 : 3$।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('Time ratio = profit ratio ÷ capital ratio', 'সময়ের অনুপাত = লাভের অনুপাত ÷ মূলধনের অনুপাত'),
        body: t(
          r`Divide term by term instead of forming an equation.

Example: capitals $5 : 6$, profits $5 : 9$ → times $\frac{5}{5} : \frac{9}{6} = 1 : \frac{3}{2} = 2 : 3$. If A stayed $8$ months, B stayed $12$.`,
          r`সমীকরণ না বানিয়ে পদে পদে ভাগ করুন।

উদাহরণ: মূলধন $5 : 6$, লাভ $5 : 9$ → সময় $\frac{5}{5} : \frac{9}{6} = 1 : \frac{3}{2} = 2 : 3$। A $8$ মাস থাকলে B থেকেছে $12$ মাস।`,
        ),
        approx_time_saved_sec: 25,
      },
      {
        title: t('Difference of shares → value of one part', 'অংশের অন্তর → এক অংশের মান'),
        body: t(
          r`If the difference between two partners' shares is given, divide it by the difference in ratio parts.

Example: ratio $7 : 4$, A gets ₹1200 more than B → $3$ parts $=$ ₹1200, one part ₹400, total profit $= 11 \times 400 =$ ₹4400.`,
          r`দুই অংশীদারের অংশের অন্তর দেওয়া থাকলে তাকে অনুপাতের অংশের অন্তর দিয়ে ভাগ করুন।

উদাহরণ: অনুপাত $7 : 4$, A, B-এর থেকে ₹1200 বেশি পায় → $3$ অংশ $=$ ₹1200, এক অংশ ₹400, মোট লাভ $= 11 \times 400 =$ ₹4400।`,
        ),
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      t(
        r`**"Joined after 3 months" means 9 months, not 3.** In a 12-month year the late partner's time is $12 - 3 = 9$ months.`,
        r`**"3 মাস পরে যোগ দিল" মানে 9 মাস, 3 মাস নয়।** 12 মাসের বছরে দেরিতে আসা অংশীদারের সময় $12 - 3 = 9$ মাস।`,
      ),
      t(
        r`**Salary before sharing.** A working partner's salary is taken out of the profit first; splitting the whole profit in the capital ratio and then adding the salary double-counts it.`,
        r`**ভাগের আগে বেতন।** কর্মরত অংশীদারের বেতন আগে লাভ থেকে বাদ যায়; পুরো লাভ মূলধনের অনুপাতে ভাগ করে তারপর বেতন যোগ করলে বেতন দু'বার গোনা হয়।`,
      ),
      t(
        r`**Monthly salary over a year.** "₹500 per month for managing" means ₹6000 is deducted from the annual profit, not ₹500.`,
        r`**মাসিক বেতন সারা বছরে।** "পরিচালনার জন্য মাসে ₹500" মানে বার্ষিক লাভ থেকে ₹6000 বাদ যাবে, ₹500 নয়।`,
      ),
      t(
        r`**Withdrawal reduces capital only from that point.** If A withdraws ₹2000 of ₹10000 after 4 months, A's effective capital is $10000 \times 4 + 8000 \times 8 = 104000$, not $8000 \times 12$.`,
        r`**টাকা তুললে মূলধন কমে সেই সময় থেকেই।** A ₹10000-এর মধ্যে 4 মাস পরে ₹2000 তুলে নিলে কার্যকর মূলধন $10000 \times 4 + 8000 \times 8 = 104000$, $8000 \times 12$ নয়।`,
      ),
      t(
        r`**Mixed units of time.** If one period is in years and another in months, convert all to months before multiplying.`,
        r`**সময়ের একক মিশে যাওয়া।** কোনো সময় বছরে আর কোনোটি মাসে দেওয়া থাকলে গুণ করার আগে সবগুলি মাসে বদলে নিন।`,
      ),
    ],
  },

  // ───────────────────────────── PIPES & CISTERN ─────────────────────────────
  {
    subject: 'quant',
    topic: 'pipes_cistern',
    title: { en: 'Pipes & Cistern', bn: 'নল ও চৌবাচ্চা', hi: 'पाइप और टंकी' },
    overview: t(
      r`Pipes & Cistern is Time & Work with a sign: an **inlet** pipe does positive work (fills) and an **outlet** pipe or a **leak** does negative work (empties). The quickest method is to take the **tank capacity = LCM of all the given times**, find each pipe's rate in units per hour (+ for filling, − for emptying), add the rates, and divide the capacity (or the part still to be filled) by the net rate. For pipes opened alternately, work in cycles; for a pipe closed midway, first find the work done while all were open. If the net rate is negative, the tank empties — it will never fill.`,
      r`নল ও চৌবাচ্চা আসলে চিহ্নসহ সময় ও কার্য: **পূরক নল** ধনাত্মক কাজ করে (ভরায়) আর **নির্গম নল** বা **ছিদ্র** ঋণাত্মক কাজ করে (খালি করে)। সবচেয়ে দ্রুত পদ্ধতি হল **চৌবাচ্চার ধারণক্ষমতা = প্রদত্ত সব সময়ের ল.সা.গু.** ধরা, প্রতিটি নলের ঘণ্টাপ্রতি হার একক হিসেবে বের করা (ভরালে +, খালি করলে −), হারগুলি যোগ করা, এবং ধারণক্ষমতা (বা যতটুকু ভরা বাকি) কে মোট হার দিয়ে ভাগ করা। নলগুলি পালাক্রমে খোলা হলে চক্র ধরে হিসাব করুন; মাঝপথে কোনো নল বন্ধ হলে আগে সব নল খোলা থাকাকালীন কতটা ভরেছে বের করুন। মোট হার ঋণাত্মক হলে চৌবাচ্চা খালি হতে থাকে — কখনও ভরবে না।`,
    ),
    formulas: [
      {
        key: 'pipe_rate',
        label: t('Rate of a pipe', 'একটি নলের হার'),
        latex: r`\text{Inlet: } +\dfrac{1}{a} \text{ per hour}, \qquad \text{Outlet: } -\dfrac{1}{b} \text{ per hour}`,
        variables: [
          v('a', 'Hours the inlet takes to fill the tank alone', 'পূরক নল একা চৌবাচ্চা ভরাতে যত ঘণ্টা নেয়'),
          v('b', 'Hours the outlet takes to empty the full tank alone', 'নির্গম নল একা ভরা চৌবাচ্চা খালি করতে যত ঘণ্টা নেয়'),
        ],
      },
      {
        key: 'two_inlets',
        label: t('Two inlets together', 'দুটি পূরক নল একসঙ্গে'),
        latex: r`T = \dfrac{ab}{a + b}`,
      },
      {
        key: 'inlet_outlet',
        label: t('Inlet and outlet together', 'পূরক ও নির্গম নল একসঙ্গে'),
        latex: r`T_{\text{fill}} = \dfrac{ab}{b - a} \;(b > a), \qquad T_{\text{empty}} = \dfrac{ab}{a - b} \;(a > b)`,
        explanation: t(
          r`Inlet fills in $a$ hours, outlet empties in $b$ hours. If $a > b$ (outlet faster) a full tank empties in $\frac{ab}{a - b}$ hours and an empty tank never fills.`,
          r`পূরক নল $a$ ঘণ্টায় ভরায়, নির্গম নল $b$ ঘণ্টায় খালি করে। $a > b$ হলে (নির্গম নল দ্রুততর) ভরা চৌবাচ্চা $\frac{ab}{a - b}$ ঘণ্টায় খালি হয় এবং খালি চৌবাচ্চা কখনও ভরে না।`,
        ),
      },
      {
        key: 'three_pipes',
        label: t('Two inlets and one outlet', 'দুটি পূরক ও একটি নির্গম নল'),
        latex: r`T = \dfrac{1}{\dfrac{1}{a} + \dfrac{1}{b} - \dfrac{1}{c}} = \dfrac{abc}{bc + ca - ab}`,
        explanation: t(
          r`A and B fill in $a$ and $b$ hours, C empties in $c$ hours. Valid only when the denominator is positive.`,
          r`A ও B যথাক্রমে $a$ ও $b$ ঘণ্টায় ভরায়, C $c$ ঘণ্টায় খালি করে। হর ধনাত্মক হলে তবেই সূত্রটি খাটে।`,
        ),
      },
      {
        key: 'leak_time',
        label: t('Time for a leak to empty the tank', 'ছিদ্র দিয়ে চৌবাচ্চা খালি হওয়ার সময়'),
        latex: r`L = \dfrac{a\,t}{t - a}`,
        variables: [
          v('a', 'Hours to fill without the leak', 'ছিদ্র ছাড়া ভরাতে লাগা ঘণ্টা'),
          v('t', 'Hours to fill with the leak (t > a)', 'ছিদ্রসহ ভরাতে লাগা ঘণ্টা (t > a)'),
        ],
      },
      {
        key: 'pair_times',
        label: t('A+B, B+C, C+A times given → all three', 'A+B, B+C, C+A-এর সময় জানা → তিনটি একসঙ্গে'),
        latex: r`T_{A+B+C} = \dfrac{2xyz}{xy + yz + zx}`,
        explanation: t(
          r`$x, y, z$ are the times for the pairs A+B, B+C, C+A. Adding the pairs counts every pipe twice, hence the factor $2$.`,
          r`$x, y, z$ হল A+B, B+C, C+A জোড়ার সময়। জোড়াগুলি যোগ করলে প্রতিটি নল দু'বার গোনা হয়, তাই $2$ গুণক।`,
        ),
      },
      {
        key: 'capacity_leak',
        label: t('Capacity when inlet rate (in litres) is given', 'পূরক নলের হার (লিটারে) দেওয়া থাকলে ধারণক্ষমতা'),
        latex: r`\text{Capacity} = \dfrac{r \, L \, T}{T - L}`,
        variables: [
          v('r', 'Inlet rate in litres per hour', 'পূরক নলের হার, লিটার প্রতি ঘণ্টা'),
          v('L', 'Hours for the leak alone to empty the full tank', 'শুধু ছিদ্র দিয়ে ভরা চৌবাচ্চা খালি হতে লাগা ঘণ্টা'),
          v('T', 'Hours to empty when the inlet is also open (T > L)', 'পূরক নলও খোলা থাকলে খালি হতে লাগা ঘণ্টা (T > L)'),
        ],
        explanation: t(
          r`From $\frac{C}{L} - r = \frac{C}{T}$. Example: leak alone $6$ h, inlet $4$ L/min $= 240$ L/h, both together $8$ h → $C = \frac{240 \times 6 \times 8}{2} = 5760$ litres.`,
          r`$\frac{C}{L} - r = \frac{C}{T}$ থেকে আসে। উদাহরণ: শুধু ছিদ্রে $6$ ঘণ্টা, পূরক নল $4$ লিটার/মিনিট $= 240$ লিটার/ঘণ্টা, দুটি একসঙ্গে $8$ ঘণ্টা → $C = \frac{240 \times 6 \times 8}{2} = 5760$ লিটার।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('LCM-of-capacity method', 'ল.সা.গু. ধারণক্ষমতা পদ্ধতি'),
        body: t(
          r`1. Capacity $=$ LCM of all the times.
2. Rate of each pipe $=$ capacity ÷ its time; give outlets/leaks a minus sign.
3. Net rate $=$ sum of rates.
4. Time $=$ (part to be filled) ÷ net rate.

Example: A fills in $12$ h, B in $15$ h, C empties in $20$ h. Capacity $= 60$; A $= +5$, B $= +4$, C $= -3$; net $= 6$ → $10$ hours.`,
          r`1. ধারণক্ষমতা $=$ সব সময়ের ল.সা.গু.।
2. প্রতিটি নলের হার $=$ ধারণক্ষমতা ÷ তার সময়; নির্গম নল/ছিদ্রের হারে বিয়োগ চিহ্ন দিন।
3. মোট হার $=$ হারগুলির যোগফল।
4. সময় $=$ (যতটুকু ভরাতে হবে) ÷ মোট হার।

উদাহরণ: A $12$ ঘণ্টায়, B $15$ ঘণ্টায় ভরায়, C $20$ ঘণ্টায় খালি করে। ধারণক্ষমতা $= 60$; A $= +5$, B $= +4$, C $= -3$; মোট $= 6$ → $10$ ঘণ্টা।`,
        ),
      },
      {
        title: t('Leak problems', 'ছিদ্রের প্রশ্ন'),
        body: t(
          r`Treat the leak as an outlet. Example: a pipe fills a tank in $6$ h but because of a leak takes $8$ h. Capacity $= 24$; pipe $= 4$/h, pipe with leak $= 3$/h, so leak $= 1$/h and it empties the full tank in $24$ h. (Formula: $\frac{6 \times 8}{8 - 6} = 24$.)`,
          r`ছিদ্রকে একটি নির্গম নল ধরুন। উদাহরণ: একটি নল $6$ ঘণ্টায় চৌবাচ্চা ভরায়, কিন্তু ছিদ্রের জন্য $8$ ঘণ্টা লাগে। ধারণক্ষমতা $= 24$; নল $= 4$/ঘণ্টা, ছিদ্রসহ $= 3$/ঘণ্টা, তাই ছিদ্র $= 1$/ঘণ্টা এবং ভরা চৌবাচ্চা খালি করতে লাগে $24$ ঘণ্টা। (সূত্র: $\frac{6 \times 8}{8 - 6} = 24$।)`,
        ),
      },
      {
        title: t('Pipe closed midway', 'মাঝপথে নল বন্ধ'),
        body: t(
          r`Split the time into "all open" and "after closing". Example: A fills in $20$ min, B in $30$ min. Both open; B is closed after $6$ min. Capacity $= 60$; A $= 3$, B $= 2$. In $6$ min: $5 \times 6 = 30$ units. Remaining $30$ units by A: $10$ min. Total $= 16$ min.`,
          r`সময়কে "সব খোলা" ও "বন্ধ করার পরে" — এই দুই ভাগে ভাঙুন। উদাহরণ: A $20$ মিনিটে, B $30$ মিনিটে ভরায়। দুটিই খোলা; $6$ মিনিট পরে B বন্ধ করা হল। ধারণক্ষমতা $= 60$; A $= 3$, B $= 2$। $6$ মিনিটে: $5 \times 6 = 30$ একক। বাকি $30$ একক A ভরায় $10$ মিনিটে। মোট $= 16$ মিনিট।`,
        ),
      },
      {
        title: t('Pipes opened alternately', 'পালাক্রমে নল খোলা'),
        body: t(
          r`Take one round of all pipes as a cycle. Example: A fills in $12$ h, B in $15$ h, opened alternately for one hour each, starting with A. Capacity $= 60$; A $= 5$, B $= 4$; one 2-hour cycle $= 9$ units. $6$ cycles $= 12$ h $= 54$ units. Hour 13 (A): $59$. Last $1$ unit by B takes $\frac{1}{4}$ h. Total $= 13\frac{1}{4}$ h $= 13$ h $15$ min.`,
          r`সব নলের এক পালাকে একটি চক্র ধরুন। উদাহরণ: A $12$ ঘণ্টায়, B $15$ ঘণ্টায় ভরায়; A দিয়ে শুরু করে এক ঘণ্টা করে পালাক্রমে খোলা হয়। ধারণক্ষমতা $= 60$; A $= 5$, B $= 4$; 2 ঘণ্টার এক চক্রে $9$ একক। $6$ চক্র $= 12$ ঘণ্টা $= 54$ একক। 13তম ঘণ্টায় (A): $59$। শেষ $1$ একক B ভরায় $\frac{1}{4}$ ঘণ্টায়। মোট $= 13\frac{1}{4}$ ঘণ্টা $= 13$ ঘণ্টা $15$ মিনিট।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Product over difference for fill + empty', 'ভরানো + খালি: গুণফল ÷ অন্তর'),
        body: t(
          r`Inlet $a$ h, outlet $b$ h ($b > a$): time $= \frac{ab}{b - a}$.

Example: $10$ h and $15$ h → $\frac{150}{5} = 30$ h.`,
          r`পূরক $a$ ঘণ্টা, নির্গম $b$ ঘণ্টা ($b > a$): সময় $= \frac{ab}{b - a}$।

উদাহরণ: $10$ ও $15$ ঘণ্টা → $\frac{150}{5} = 30$ ঘণ্টা।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('Pairs given → halve the sum of rates', 'জোড়ার সময় জানা → হারের যোগফলের অর্ধেক'),
        body: t(
          r`A+B in $6$ h, B+C in $8$ h, C+A in $12$ h. Capacity $= 24$; pair rates $4 + 3 + 2 = 9 = 2(A + B + C)$, so all three $= 4.5$/h → $\frac{24}{4.5} = 5\frac{1}{3}$ h. C alone $= 4.5 - 4 = 0.5$/h → $48$ h.`,
          r`A+B $6$ ঘণ্টায়, B+C $8$ ঘণ্টায়, C+A $12$ ঘণ্টায়। ধারণক্ষমতা $= 24$; জোড়ার হার $4 + 3 + 2 = 9 = 2(A + B + C)$, তাই তিনটি একসঙ্গে $= 4.5$/ঘণ্টা → $\frac{24}{4.5} = 5\frac{1}{3}$ ঘণ্টা। C একা $= 4.5 - 4 = 0.5$/ঘণ্টা → $48$ ঘণ্টা।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Partly filled tank: scale the time', 'আংশিক ভরা চৌবাচ্চা: সময়কে অনুপাতে নিন'),
        body: t(
          r`Time is proportional to the part to be filled.

Example: a pipe fills a tank in $9$ h; the tank is already $\frac{1}{3}$ full → time $= \frac{2}{3} \times 9 = 6$ h.`,
          r`সময় ভরাতে বাকি অংশের সমানুপাতিক।

উদাহরণ: একটি নল $9$ ঘণ্টায় চৌবাচ্চা ভরায়; চৌবাচ্চা আগে থেকেই $\frac{1}{3}$ ভরা → সময় $= \frac{2}{3} \times 9 = 6$ ঘণ্টা।`,
        ),
        approx_time_saved_sec: 10,
      },
      {
        title: t('"k times as fast" → rates k : 1', '"k গুণ দ্রুত" → হার k : 1'),
        body: t(
          r`If A fills $k$ times as fast as B and together they take $T$ h, capacity $= (k + 1)T$ units.

Example: A is twice as fast as B; together $12$ h → capacity $36$; A alone $\frac{36}{2} = 18$ h, B alone $36$ h.`,
          r`A যদি B-এর $k$ গুণ দ্রুত ভরায় এবং একসঙ্গে $T$ ঘণ্টা লাগে, ধারণক্ষমতা $= (k + 1)T$ একক।

উদাহরণ: A, B-এর দ্বিগুণ দ্রুত; একসঙ্গে $12$ ঘণ্টা → ধারণক্ষমতা $36$; A একা $\frac{36}{2} = 18$ ঘণ্টা, B একা $36$ ঘণ্টা।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        r`**Adding an outlet's rate.** An outlet or leak must be **subtracted**: inlet $10$ h with outlet $15$ h is $\frac{1}{10} - \frac{1}{15}$, not $\frac{1}{10} + \frac{1}{15}$.`,
        r`**নির্গম নলের হার যোগ করা।** নির্গম নল বা ছিদ্রের হার **বিয়োগ** করতে হয়: পূরক $10$ ঘণ্টা ও নির্গম $15$ ঘণ্টা হলে $\frac{1}{10} - \frac{1}{15}$, $\frac{1}{10} + \frac{1}{15}$ নয়।`,
      ),
      t(
        r`**Overflow in alternate cycles with an outlet.** With fill–empty cycles, check whether the tank becomes full **during an inlet's turn**; stop there. Counting whole cycles blindly overshoots the answer.`,
        r`**নির্গম নলসহ পালাক্রমে চক্রে উপচে পড়া।** ভরানো–খালি চক্রে দেখে নিন **পূরক নলের পালার মধ্যেই** চৌবাচ্চা ভরে যাচ্ছে কি না; সেখানেই থামুন। অন্ধভাবে পুরো চক্র গুনলে উত্তর বেশি আসে।`,
      ),
      t(
        r`**Ignoring the initial level.** If the tank is half full at the start, only the remaining half has to be filled (or only the half has to be emptied).`,
        r`**শুরুর জলস্তর উপেক্ষা করা।** শুরুতে চৌবাচ্চা অর্ধেক ভরা থাকলে শুধু বাকি অর্ধেক ভরাতে হবে (বা শুধু অর্ধেক খালি করতে হবে)।`,
      ),
      t(
        r`**Minutes vs hours.** Pipes given in minutes and a leak in hours must be converted to one unit before taking the LCM.`,
        r`**মিনিট বনাম ঘণ্টা।** নল মিনিটে আর ছিদ্র ঘণ্টায় দেওয়া থাকলে ল.সা.গু. নেওয়ার আগে একই এককে বদলে নিন।`,
      ),
      t(
        r`**Outlet faster than inlet.** If the net rate is negative, an empty tank will **never** fill — choose "cannot be filled" rather than forcing a number.`,
        r`**নির্গম নল পূরক নলের থেকে দ্রুত।** মোট হার ঋণাত্মক হলে খালি চৌবাচ্চা **কখনও** ভরবে না — জোর করে সংখ্যা না বের করে "ভরা সম্ভব নয়" বিকল্পটি বাছুন।`,
      ),
    ],
  },

  // ───────────────────────────── PROBLEMS ON AGES ─────────────────────────────
  {
    subject: 'quant',
    topic: 'ages',
    title: { en: 'Problems on Ages', bn: 'বয়স সংক্রান্ত সমস্যা', hi: 'आयु संबंधी प्रश्न' },
    overview: t(
      r`Age problems are linear equations with one key fact: **the difference between two people's ages never changes**, while their ratio does. Let the present ages be $x$ (or ratio parts $ak, bk$), write "$n$ years ago" as $x - n$ and "after $n$ years" as $x + n$ for **every** person, and form the equation from the given condition. The ratio-parts method is fastest: make the age difference equal in both ratios, and the change in parts equals the gap in years. For groups, the total age rises by $n \times$ (number of people) in $n$ years, and the average rises by exactly $n$. In MCQs, checking the options against both conditions is often quicker than solving.`,
      r`বয়সের প্রশ্ন আসলে সরল সমীকরণ, যার মূল কথা: **দুজনের বয়সের অন্তর কখনও বদলায় না**, কিন্তু অনুপাত বদলায়। বর্তমান বয়স $x$ (বা অনুপাতের অংশ $ak, bk$) ধরুন, **প্রত্যেকের** জন্য "$n$ বছর আগে" লিখুন $x - n$ আর "$n$ বছর পরে" লিখুন $x + n$, তারপর প্রদত্ত শর্ত থেকে সমীকরণ গঠন করুন। অনুপাতের অংশ পদ্ধতি সবচেয়ে দ্রুত: দুটি অনুপাতেই বয়সের অন্তর সমান করুন, তাহলে অংশের পরিবর্তন = মাঝের বছরের ব্যবধান। দলের ক্ষেত্রে $n$ বছরে মোট বয়স বাড়ে $n \times$ (লোকসংখ্যা), আর গড় বয়স বাড়ে ঠিক $n$। MCQ-তে বিকল্পগুলি দুটি শর্তে বসিয়ে যাচাই করা অনেক সময় সমাধানের থেকে দ্রুত।`,
    ),
    formulas: [
      {
        key: 'constant_difference',
        label: t('Age difference is constant', 'বয়সের অন্তর ধ্রুবক'),
        latex: r`(A + n) - (B + n) = (A - n) - (B - n) = A - B`,
        explanation: t(
          r`So the father's age when the son was born $=$ (father's age) $-$ (son's age), at any time.`,
          r`তাই ছেলের জন্মের সময় বাবার বয়স $=$ (বাবার বয়স) $-$ (ছেলের বয়স), যে কোনো সময়ে।`,
        ),
      },
      {
        key: 'ratio_after',
        label: t('Ratio now a:b, after n years c:d', 'এখন অনুপাত a:b, n বছর পরে c:d'),
        latex: r`\dfrac{ak + n}{bk + n} = \dfrac{c}{d} \;\Longrightarrow\; k = \dfrac{n(c - d)}{ad - bc}`,
        variables: [
          v('ak, bk', 'Present ages', 'বর্তমান বয়স'),
          v('n', 'Number of years', 'বছরের সংখ্যা'),
        ],
        explanation: t(
          r`Example: now $3 : 4$, after $5$ years $4 : 5$ → $k = \frac{5(4 - 5)}{15 - 16} = 5$; ages $15$ and $20$.`,
          r`উদাহরণ: এখন $3 : 4$, $5$ বছর পরে $4 : 5$ → $k = \frac{5(4 - 5)}{15 - 16} = 5$; বয়স $15$ ও $20$।`,
        ),
      },
      {
        key: 'ratio_ago',
        label: t('Ratio now a:b, n years ago c:d', 'এখন অনুপাত a:b, n বছর আগে c:d'),
        latex: r`\dfrac{ak - n}{bk - n} = \dfrac{c}{d} \;\Longrightarrow\; k = \dfrac{n(d - c)}{ad - bc}`,
        explanation: t(
          r`Example: now $4 : 3$, $6$ years ago $2 : 1$ → $k = \frac{6(1 - 2)}{4 - 6} = 3$; ages $12$ and $9$ (six years ago $6$ and $3$).`,
          r`উদাহরণ: এখন $4 : 3$, $6$ বছর আগে $2 : 1$ → $k = \frac{6(1 - 2)}{4 - 6} = 3$; বয়স $12$ ও $9$ (ছয় বছর আগে $6$ ও $3$)।`,
        ),
      },
      {
        key: 'times_after',
        label: t('A is m times B now, p times after n years', 'এখন A, B-এর m গুণ; n বছর পরে p গুণ'),
        latex: r`B = \dfrac{n(p - 1)}{m - p}, \qquad A = mB`,
        explanation: t(
          r`Example: father is $3$ times the son now and will be $2$ times after $15$ years → son $= \frac{15 \times 1}{1} = 15$, father $45$. Check: $60 = 2 \times 30$.`,
          r`উদাহরণ: বাবা এখন ছেলের $3$ গুণ, $15$ বছর পরে হবেন $2$ গুণ → ছেলে $= \frac{15 \times 1}{1} = 15$, বাবা $45$। যাচাই: $60 = 2 \times 30$।`,
        ),
      },
      {
        key: 'times_ago',
        label: t('A is m times B now, p times n years ago', 'এখন A, B-এর m গুণ; n বছর আগে p গুণ'),
        latex: r`B = \dfrac{n(p - 1)}{p - m}, \qquad A = mB`,
        explanation: t(
          r`Example: father is $3$ times the son now; $5$ years ago he was $4$ times → son $= \frac{5 \times 3}{1} = 15$, father $45$. Check: $40 = 4 \times 10$.`,
          r`উদাহরণ: বাবা এখন ছেলের $3$ গুণ; $5$ বছর আগে ছিলেন $4$ গুণ → ছেলে $= \frac{5 \times 3}{1} = 15$, বাবা $45$। যাচাই: $40 = 4 \times 10$।`,
        ),
      },
      {
        key: 'group_total',
        label: t('Total and average age of a group after n years', 'n বছর পরে দলের মোট ও গড় বয়স'),
        latex: r`\text{Total}_{+n} = \text{Total} + N n, \qquad \text{Avg}_{+n} = \text{Avg} + n`,
        variables: [v('N', 'Number of people (unchanged)', 'লোকসংখ্যা (অপরিবর্তিত)')],
      },
    ],
    derivation_rules: [
      {
        title: t('Shift every person by the same years', 'প্রত্যেকের বয়স একই বছর সরান'),
        body: t(
          r`Choose one reference time (usually now), write all present ages, then add or subtract $n$ for **each** person. Example: the sum of A's and B's ages is $50$; $5$ years ago A was $3$ times B. $(A - 5) = 3(B - 5)$ and $A + B = 50$ → $50 - B - 5 = 3B - 15 \Rightarrow B = 15$, $A = 35$.`,
          r`একটি নির্দিষ্ট সময় (সাধারণত বর্তমান) ধরে সবার বর্তমান বয়স লিখুন, তারপর **প্রত্যেকের** বয়সে $n$ যোগ বা বিয়োগ করুন। উদাহরণ: A ও B-এর বয়সের যোগফল $50$; $5$ বছর আগে A ছিল B-এর $3$ গুণ। $(A - 5) = 3(B - 5)$ এবং $A + B = 50$ → $50 - B - 5 = 3B - 15 \Rightarrow B = 15$, $A = 35$।`,
        ),
      },
      {
        title: t('Ratio-parts method: equalise the difference', 'অনুপাতের অংশ পদ্ধতি: অন্তর সমান করুন'),
        body: t(
          r`Because the difference is constant, scale both ratios so their differences match; then the change in parts equals the gap in years. Example: $4$ years ago $5 : 7$ (difference $2$), after $4$ years $3 : 4$ (difference $1$) → write it as $6 : 8$. From $5 : 7$ to $6 : 8$ is $1$ part $= 8$ years. Four years ago: $40$ and $56$, so now $44$ and $60$. Check: after $4$ years $48 : 64 = 3 : 4$.`,
          r`অন্তর ধ্রুবক বলে দুটি অনুপাতকে এমনভাবে গুণ করুন যাতে অন্তর সমান হয়; তখন অংশের পরিবর্তন = মাঝের বছরের ব্যবধান। উদাহরণ: $4$ বছর আগে $5 : 7$ (অন্তর $2$), $4$ বছর পরে $3 : 4$ (অন্তর $1$) → একে লিখুন $6 : 8$। $5 : 7$ থেকে $6 : 8$-এ $1$ অংশ $= 8$ বছর। চার বছর আগে: $40$ ও $56$, তাই এখন $44$ ও $60$। যাচাই: $4$ বছর পরে $48 : 64 = 3 : 4$।`,
        ),
      },
      {
        title: t('Group and average questions', 'দল ও গড় বয়সের প্রশ্ন'),
        body: t(
          r`Convert averages to totals at the same point of time. Example: $3$ years ago the average age of a family of $5$ was $17$. With a baby born since, the average today is still $17$. Total now of the $5$ $= 5 \times 20 = 100$; total of $6$ today $= 6 \times 17 = 102$; baby $= 2$ years.`,
          r`গড়কে একই সময়ের মোট বয়সে বদলে নিন। উদাহরণ: $3$ বছর আগে $5$ জনের একটি পরিবারের গড় বয়স ছিল $17$। এর মধ্যে একটি শিশু জন্মানোর পরে আজও গড় $17$। সেই $5$ জনের এখনকার মোট $= 5 \times 20 = 100$; আজ $6$ জনের মোট $= 6 \times 17 = 102$; শিশুর বয়স $= 2$ বছর।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Test the options', 'বিকল্প বসিয়ে যাচাই'),
        body: t(
          r`Plug each option into the easier condition first, then confirm with the second.

Example: "ratio now $3 : 4$, after $5$ years $4 : 5$; find the elder's age" — options $16, 20, 24$: only $20$ (younger $15$) gives $20 : 25 = 4 : 5$ after $5$ years.`,
          r`প্রতিটি বিকল্প আগে সহজ শর্তে বসান, তারপর দ্বিতীয় শর্তে মিলিয়ে নিন।

উদাহরণ: "এখন অনুপাত $3 : 4$, $5$ বছর পরে $4 : 5$; বড়জনের বয়স কত?" — বিকল্প $16, 20, 24$: শুধু $20$ (ছোটজন $15$) দিলে $5$ বছর পরে $20 : 25 = 4 : 5$ হয়।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Same difference → one part = gap in years', 'অন্তর সমান → এক অংশ = বছরের ব্যবধান'),
        body: t(
          r`If both ratios already have the same difference, read the answer directly.

Example: now $3 : 4$, after $5$ years $4 : 5$ (both differences $1$) → $1$ part $= 5$ years → ages $15$ and $20$.`,
          r`দুটি অনুপাতের অন্তর আগে থেকেই সমান হলে সরাসরি উত্তর পড়ে নিন।

উদাহরণ: এখন $3 : 4$, $5$ বছর পরে $4 : 5$ (দুটিরই অন্তর $1$) → $1$ অংশ $= 5$ বছর → বয়স $15$ ও $20$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Reversed digits → difference is a multiple of 9', 'অঙ্ক উল্টানো বয়স → অন্তর 9-এর গুণিতক'),
        body: t(
          r`If one age is $\overline{ab} = 10a + b$ and the other is $\overline{ba}$, the difference is $9(a - b)$.

Example: father's age is the son's age with digits reversed and they differ by $27$ → $a - b = 3$: possible pairs $41/14$, $52/25$, $63/36$ … — use the second condition to pick.`,
          r`একজনের বয়স $\overline{ab} = 10a + b$ আর অন্যজনের $\overline{ba}$ হলে অন্তর $9(a - b)$।

উদাহরণ: বাবার বয়স ছেলের বয়সের অঙ্ক উল্টে পাওয়া যায় এবং অন্তর $27$ → $a - b = 3$: সম্ভাব্য জোড়া $41/14$, $52/25$, $63/36$ … — দ্বিতীয় শর্ত দিয়ে বেছে নিন।`,
        ),
        approx_time_saved_sec: 25,
      },
    ],
    common_traps: [
      t(
        r`**Shifting only one person.** "After $5$ years" adds $5$ to **everyone's** age, not just the person mentioned in the sentence.`,
        r`**শুধু একজনের বয়স সরানো।** "$5$ বছর পরে" মানে **সবার** বয়সে $5$ যোগ, শুধু বাক্যে উল্লিখিত ব্যক্তির নয়।`,
      ),
      t(
        r`**Treating the ratio as constant.** The ratio of ages changes with time; only the **difference** stays the same. Never add $n$ to the ratio parts themselves ($3 : 4$ does not become $8 : 9$ after $5$ years).`,
        r`**অনুপাতকে ধ্রুবক ভাবা।** সময়ের সঙ্গে বয়সের অনুপাত বদলায়; শুধু **অন্তর** একই থাকে। অনুপাতের অংশে সরাসরি $n$ যোগ করবেন না ($5$ বছর পরে $3 : 4$, $8 : 9$ হয় না)।`,
      ),
      t(
        r`**Group totals grow by n per person.** For $4$ people, the total age after $3$ years increases by $12$, not by $3$.`,
        r`**দলের মোট বয়স বাড়ে মাথাপিছু n।** $4$ জনের মোট বয়স $3$ বছর পরে বাড়ে $12$, $3$ নয়।`,
      ),
      t(
        r`**Mixing reference points.** In "A's age $5$ years ago equals B's age $3$ years hence", write $A - 5 = B + 3$ — each phrase applies to its own person and its own time.`,
        r`**ভিন্ন সময়ের রাশি গুলিয়ে ফেলা।** "$5$ বছর আগে A-র বয়স = $3$ বছর পরে B-এর বয়স" হলে লিখুন $A - 5 = B + 3$ — প্রতিটি অংশ তার নিজের ব্যক্তি ও নিজের সময়ের জন্য।`,
      ),
      t(
        r`**Answering the wrong time.** Many questions ask for the age "after $n$ years" or "at the time of birth" — after solving for the present age, adjust before choosing the option.`,
        r`**ভুল সময়ের বয়স উত্তর দেওয়া।** অনেক প্রশ্নে "$n$ বছর পরের" বা "জন্মের সময়ের" বয়স চাওয়া হয় — বর্তমান বয়স বের করার পরে সেই অনুযায়ী সমন্বয় করে তবে বিকল্প বাছুন।`,
      ),
    ],
  },
];
