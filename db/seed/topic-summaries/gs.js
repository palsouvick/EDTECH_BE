'use strict';

/**
 * General Studies "how to study" sheets. Format: see ./validate.js.
 * Only stable, well-established facts. No current rates, office holders or
 * figures that change from year to year.
 */

module.exports = [
  // ───────────────────────────── Indian History ─────────────────────────────
  {
    subject: 'gs',
    topic: 'indian_history',
    title: { en: "Indian History", bn: "ভারতের ইতিহাস", hi: "भारतीय इतिहास" },
    overview: {
      en: "History questions in SSC, Banking, WBCS and Postal exams test **dates, persons, places and 'firsts'** across Ancient, Medieval and Modern India, with the **freedom struggle (1857–1947)** asked most often. Do not read history like a story book: build a **timeline skeleton** first and hang facts on it. Learn each event as a set: *year – person – place – outcome*. Revise with your own one-page charts (dynasties, Governors-General, INC sessions) and solve previous-year questions after every block, because the same facts repeat year after year.",
      bn: "SSC, ব্যাংকিং, WBCS ও পোস্টাল পরীক্ষায় ইতিহাসের প্রশ্নে প্রাচীন, মধ্যযুগ ও আধুনিক ভারতের **সাল, ব্যক্তি, স্থান ও 'প্রথম'** জাতীয় তথ্য জিজ্ঞাসা করা হয়; সবচেয়ে বেশি আসে **স্বাধীনতা সংগ্রাম (1857–1947)** থেকে। গল্পের বইয়ের মতো ইতিহাস পড়বেন না: আগে একটি **সময়রেখার কাঠামো** তৈরি করুন, তারপর তথ্যগুলি তাতে সাজান। প্রতিটি ঘটনা একটি সেট হিসেবে মনে রাখুন: *সাল – ব্যক্তি – স্থান – ফলাফল*। নিজের হাতে তৈরি এক পাতার চার্ট (রাজবংশ, গভর্নর-জেনারেল, কংগ্রেস অধিবেশন) দিয়ে রিভিশন করুন এবং প্রতিটি অংশ শেষে আগের বছরের প্রশ্ন সমাধান করুন, কারণ একই তথ্য বারবার ফিরে আসে।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "Build the timeline in 4 blocks", bn: "4টি ভাগে সময়রেখা তৈরি করুন" },
        body: {
          en: "**Ancient → Medieval → Modern (British rule) → Freedom struggle.** Fix these anchor dates first and place everything else relative to them:\n\n- **1206** Delhi Sultanate begins (Qutb-ud-din Aibak)\n- **1526** First Battle of Panipat – Mughal rule begins (Babur)\n- **1757** Battle of Plassey\n- **1857** Revolt of 1857\n- **1885** Indian National Congress founded\n- **1905** Partition of Bengal\n- **1947** Independence",
          bn: "**প্রাচীন → মধ্যযুগ → আধুনিক (ব্রিটিশ শাসন) → স্বাধীনতা সংগ্রাম।** আগে এই মূল সালগুলি মনে রাখুন, বাকি সব ঘটনা এদের আগে-পরে সাজান:\n\n- **1206** দিল্লি সুলতানির সূচনা (কুতুবউদ্দিন আইবক)\n- **1526** পানিপথের প্রথম যুদ্ধ – মুঘল শাসনের সূচনা (বাবর)\n- **1757** পলাশির যুদ্ধ\n- **1857** মহাবিদ্রোহ\n- **1885** ভারতীয় জাতীয় কংগ্রেস প্রতিষ্ঠা\n- **1905** বঙ্গভঙ্গ\n- **1947** স্বাধীনতা",
        },
      },
      {
        title: { en: "Freedom struggle as three Gandhian movements", bn: "স্বাধীনতা সংগ্রাম: গান্ধিজির তিনটি আন্দোলন" },
        body: {
          en: "Organise 1915–1947 around the three mass movements and attach the events before and after each:\n\n- **1919** Rowlatt Act, Jallianwala Bagh (13 April) → **1920 Non-Cooperation** → withdrawn after **Chauri Chaura (1922)**\n- **1928** Simon Commission protests → **1930 Civil Disobedience** with the **Dandi (Salt) March** → **Gandhi–Irwin Pact (1931)**\n- **1942** Cripps Mission fails → **1942 Quit India** ('Do or Die') → **1946** Cabinet Mission → **1947** Independence",
          bn: "1915–1947 সময়কালকে তিনটি গণআন্দোলনকে ঘিরে সাজান এবং প্রতিটির আগে-পরের ঘটনা জুড়ে দিন:\n\n- **1919** রাওলাট আইন, জালিয়ানওয়ালাবাগ (13 এপ্রিল) → **1920 অসহযোগ আন্দোলন** → **চৌরিচৌরা (1922)**-র পর প্রত্যাহার\n- **1928** সাইমন কমিশন বিরোধিতা → **1930 আইন অমান্য আন্দোলন**, **ডান্ডি (লবণ) অভিযান** → **গান্ধি–আরউইন চুক্তি (1931)**\n- **1942** ক্রিপস মিশনের ব্যর্থতা → **1942 ভারত ছাড়ো আন্দোলন** ('করেঙ্গে ইয়া মরেঙ্গে') → **1946** ক্যাবিনেট মিশন → **1947** স্বাধীনতা",
        },
      },
      {
        title: { en: "Make dynasty and ruler charts", bn: "রাজবংশ ও শাসকদের চার্ট তৈরি করুন" },
        body: {
          en: "For every dynasty write: **founder – greatest ruler – capital – one key event**. Examples: Maurya: founder Chandragupta Maurya, Ashoka fought the **Kalinga War** and turned to Buddhism. Gupta: founder of the empire Chandragupta I; this period is called the 'Golden Age'. Delhi Sultanate: five dynasties in order – **Slave (Mamluk), Khilji, Tughlaq, Sayyid, Lodi**. The Lodi rule ended at the First Battle of Panipat (1526).",
          bn: "প্রতিটি রাজবংশের জন্য লিখুন: **প্রতিষ্ঠাতা – শ্রেষ্ঠ শাসক – রাজধানী – একটি প্রধান ঘটনা**। উদাহরণ: মৌর্য: প্রতিষ্ঠাতা চন্দ্রগুপ্ত মৌর্য, অশোক **কলিঙ্গ যুদ্ধের** পর বৌদ্ধধর্ম গ্রহণ করেন। গুপ্ত: সাম্রাজ্যের প্রতিষ্ঠাতা প্রথম চন্দ্রগুপ্ত; এই যুগকে 'স্বর্ণযুগ' বলা হয়। দিল্লি সুলতানি: পাঁচটি বংশ ক্রমানুসারে – **দাস (মামলুক), খলজি, তুঘলক, সৈয়দ, লোদি**। পানিপথের প্রথম যুদ্ধে (1526) লোদি শাসনের অবসান ঘটে।",
        },
      },
      {
        title: { en: "Learn the Congress sessions and founders as a table", bn: "কংগ্রেসের অধিবেশন ও প্রতিষ্ঠাতাদের তালিকা করুন" },
        body: {
          en: "INC was founded in **1885** by **A. O. Hume**; the first session was held in **Bombay** under president **W. C. Bonnerjee**. Keep a short table of landmark sessions: **1906 Calcutta** (Swaraj demand, Dadabhai Naoroji), **1907 Surat** (split into Moderates and Extremists), **1916 Lucknow** (Lucknow Pact with the Muslim League), **1929 Lahore** (Purna Swaraj resolution, Jawaharlal Nehru).",
          bn: "**1885** সালে **এ. ও. হিউম** কংগ্রেস প্রতিষ্ঠা করেন; প্রথম অধিবেশন হয় **বোম্বাইয়ে**, সভাপতি **উমেশচন্দ্র বন্দ্যোপাধ্যায় (W. C. Bonnerjee)**। গুরুত্বপূর্ণ অধিবেশনগুলির একটি ছোট তালিকা রাখুন: **1906 কলকাতা** (স্বরাজের দাবি, দাদাভাই নৌরজি), **1907 সুরাট** (নরমপন্থী ও চরমপন্থীদের বিভাজন), **1916 লখনউ** (মুসলিম লিগের সঙ্গে লখনউ চুক্তি), **1929 লাহোর** (পূর্ণ স্বরাজের প্রস্তাব, জওহরলাল নেহরু)।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Mughal emperors in order: B-H-A-J-S-A", bn: "মুঘল সম্রাটদের ক্রম: B-H-A-J-S-A" },
        body: {
          en: "**B**abur → **H**umayun → **A**kbar → **J**ahangir → **S**hah Jahan → **A**urangzeb. Questions often ask who came before or after whom, or which emperor built a monument (Taj Mahal – Shah Jahan; Buland Darwaza – Akbar).",
          bn: "**B**abur (বাবর) → **H**umayun (হুমায়ুন) → **A**kbar (আকবর) → **J**ahangir (জাহাঙ্গির) → **S**hah Jahan (শাহজাহান) → **A**urangzeb (ঔরঙ্গজেব)। প্রশ্নে প্রায়ই জিজ্ঞাসা করা হয় কে কার আগে বা পরে, অথবা কোন স্মৃতিসৌধ কে নির্মাণ করেন (তাজমহল – শাহজাহান; বুলন্দ দরওয়াজা – আকবর)।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Three Battles of Panipat: 26 – 56 – 61", bn: "পানিপথের তিনটি যুদ্ধ: 26 – 56 – 61" },
        body: {
          en: "Remember the last two digits: **1526** Babur defeats Ibrahim Lodi; **1556** Akbar (under Bairam Khan) defeats Hemu; **1761** Ahmad Shah Abdali defeats the Marathas.",
          bn: "শুধু শেষ দুটি অঙ্ক মনে রাখুন: **1526** বাবর ইব্রাহিম লোদিকে পরাজিত করেন; **1556** আকবর (বৈরাম খানের নেতৃত্বে) হিমুকে পরাজিত করেন; **1761** আহমদ শাহ আবদালি মারাঠাদের পরাজিত করেন।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Lal–Bal–Pal = the Extremist trio", bn: "লাল–বাল–পাল = চরমপন্থী ত্রয়ী" },
        body: {
          en: "**Lal**a Lajpat Rai (Punjab), **Bal** Gangadhar Tilak (Maharashtra), Bipin Chandra **Pal** (Bengal). Tilak gave the slogan 'Swaraj is my birthright and I shall have it'. Moderates, by contrast, include Dadabhai Naoroji, Gopal Krishna Gokhale and Surendranath Banerjee.",
          bn: "**লাল**া লাজপত রায় (পাঞ্জাব), **বাল** গঙ্গাধর তিলক (মহারাষ্ট্র), বিপিনচন্দ্র **পাল** (বাংলা)। তিলকের স্লোগান: 'স্বরাজ আমার জন্মগত অধিকার এবং আমি তা অর্জন করবই'। অন্যদিকে নরমপন্থী নেতা: দাদাভাই নৌরজি, গোপালকৃষ্ণ গোখলে, সুরেন্দ্রনাথ বন্দ্যোপাধ্যায়।",
        },
      },
      {
        title: { en: "Delhi Sultanate dynasties: 'S-K-T-S-L'", bn: "দিল্লি সুলতানির বংশ: 'S-K-T-S-L'" },
        body: {
          en: "**S**lave → **K**hilji → **T**ughlaq → **S**ayyid → **L**odi (1206–1526). Make a sentence like 'Some Kings Took Six Lands' to keep the order.",
          bn: "**S**lave (দাস) → **K**hilji (খলজি) → **T**ughlaq (তুঘলক) → **S**ayyid (সৈয়দ) → **L**odi (লোদি) (1206–1526)। ক্রম মনে রাখতে নিজের মতো একটি বাক্য বানান, যেমন 'Some Kings Took Six Lands'।",
        },
      },
    ],
    common_traps: [
      {
        en: "**First Governor-General of Bengal vs of India vs first Viceroy.** Warren Hastings was the first Governor-General of **Bengal** (Regulating Act, 1773); Lord William Bentinck was the first Governor-General of **India** (Charter Act, 1833); Lord Canning became the first **Viceroy** (1858).",
        bn: "**বাংলার প্রথম গভর্নর-জেনারেল, ভারতের প্রথম গভর্নর-জেনারেল ও প্রথম ভাইসরয় আলাদা।** ওয়ারেন হেস্টিংস **বাংলার** প্রথম গভর্নর-জেনারেল (রেগুলেটিং অ্যাক্ট, 1773); লর্ড উইলিয়াম বেন্টিঙ্ক **ভারতের** প্রথম গভর্নর-জেনারেল (চার্টার অ্যাক্ট, 1833); লর্ড ক্যানিং প্রথম **ভাইসরয়** (1858)।",
      },
      {
        en: "**Founder of INC vs first president.** A. O. Hume founded the Congress; W. C. Bonnerjee presided over the first session (Bombay, 1885). Options often swap the two.",
        bn: "**কংগ্রেসের প্রতিষ্ঠাতা ও প্রথম সভাপতি আলাদা।** এ. ও. হিউম প্রতিষ্ঠাতা; প্রথম অধিবেশনের (বোম্বাই, 1885) সভাপতি উমেশচন্দ্র বন্দ্যোপাধ্যায়। বিকল্পে প্রায়ই দুজনকে অদলবদল করা হয়।",
      },
      {
        en: "**Lucknow Pact (1916) vs Poona Pact (1932).** Lucknow Pact: Congress and Muslim League agreement. Poona Pact: Gandhi and B. R. Ambedkar agreement on reserved seats for the Depressed Classes. Do not mix these with the **Gandhi–Irwin Pact (1931)**.",
        bn: "**লখনউ চুক্তি (1916) ও পুনা চুক্তি (1932) আলাদা।** লখনউ চুক্তি: কংগ্রেস ও মুসলিম লিগের সমঝোতা। পুনা চুক্তি: অনুন্নত শ্রেণির সংরক্ষিত আসন নিয়ে গান্ধিজি ও বি. আর. আম্বেদকরের সমঝোতা। এগুলিকে **গান্ধি–আরউইন চুক্তির (1931)** সঙ্গে গুলিয়ে ফেলবেন না।",
      },
      {
        en: "**Cripps Mission (1942) vs Cabinet Mission (1946).** Cripps came during World War II with a dominion-status offer, just before Quit India. The Cabinet Mission came after the war and proposed the plan that led to the Constituent Assembly.",
        bn: "**ক্রিপস মিশন (1942) ও ক্যাবিনেট মিশন (1946) আলাদা।** ক্রিপস মিশন দ্বিতীয় বিশ্বযুদ্ধের সময় ডোমিনিয়ন মর্যাদার প্রস্তাব নিয়ে আসে, ভারত ছাড়ো আন্দোলনের ঠিক আগে। ক্যাবিনেট মিশন আসে যুদ্ধের পরে এবং তার পরিকল্পনা থেকেই গণপরিষদ গঠিত হয়।",
      },
    ],
  },

  // ───────────────────────────── Geography ─────────────────────────────
  {
    subject: 'gs',
    topic: 'geography',
    title: { en: "Geography", bn: "ভূগোল", hi: "भूगोल" },
    overview: {
      en: "Geography questions come from two areas: **physical/world geography** (solar system, atmosphere, latitudes and longitudes, rocks, winds) and **Indian geography** (rivers, mountains, soils, crops, climate, national parks). Almost every fact here is **location-based**, so study with a blank outline map of India and mark rivers, states and lines yourself. Learn in pairs and lists – east- vs west-flowing rivers, kharif vs rabi crops, layers of the atmosphere – because the questions are usually 'which of these is different' or 'arrange in order'. NCERT Class 6–12 geography books are enough for the level asked in these exams.",
      bn: "ভূগোলের প্রশ্ন আসে দুটি অংশ থেকে: **প্রাকৃতিক ও বিশ্ব ভূগোল** (সৌরজগৎ, বায়ুমণ্ডল, অক্ষাংশ ও দ্রাঘিমাংশ, শিলা, বায়ুপ্রবাহ) এবং **ভারতের ভূগোল** (নদী, পর্বত, মৃত্তিকা, ফসল, জলবায়ু, জাতীয় উদ্যান)। এখানকার প্রায় সব তথ্যই **অবস্থান-ভিত্তিক**, তাই ভারতের একটি ফাঁকা মানচিত্র নিয়ে নিজে নদী, রাজ্য ও রেখাগুলি চিহ্নিত করে পড়ুন। জোড়া ও তালিকা আকারে শিখুন – পূর্ববাহিনী ও পশ্চিমবাহিনী নদী, খারিফ ও রবি ফসল, বায়ুমণ্ডলের স্তর – কারণ প্রশ্ন সাধারণত হয় 'কোনটি আলাদা' বা 'ক্রমানুসারে সাজাও'। এই পরীক্ষাগুলির স্তরের জন্য NCERT ষষ্ঠ–দ্বাদশ শ্রেণির ভূগোল বইই যথেষ্ট।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "Fix India's key lines on the map", bn: "মানচিত্রে ভারতের প্রধান রেখাগুলি চিনে নিন" },
        body: {
          en: "- **Tropic of Cancer (about 23.5° N)** passes through **8 states**: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.\n- **Indian Standard Time** is based on the **82°30′ E** meridian, which passes near **Mirzapur** (Uttar Pradesh). IST is **5 h 30 min ahead of GMT**.\n- Every 1° of longitude = **4 minutes** of time difference.",
          bn: "- **কর্কটক্রান্তি রেখা (প্রায় 23.5° উত্তর)** **8টি রাজ্যের** উপর দিয়ে গেছে: গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা, মিজোরাম।\n- **ভারতীয় প্রমাণ সময়** নির্ধারিত হয় **82°30′ পূর্ব** দ্রাঘিমারেখা অনুযায়ী, যা উত্তরপ্রদেশের **মির্জাপুরের** কাছ দিয়ে গেছে। IST, **GMT-র চেয়ে 5 ঘণ্টা 30 মিনিট এগিয়ে**।\n- প্রতি 1° দ্রাঘিমার জন্য সময়ের পার্থক্য **4 মিনিট**।",
        },
      },
      {
        title: { en: "Group rivers by direction and origin", bn: "নদীগুলিকে দিক ও উৎস অনুযায়ী ভাগ করুন" },
        body: {
          en: "- **Himalayan rivers** (perennial – fed by snow and rain): Indus, Ganga, Brahmaputra systems. The Ganga is formed at **Devprayag** where the **Bhagirathi and Alaknanda** meet.\n- **Peninsular east-flowing** (form deltas, fall into the Bay of Bengal): Mahanadi, Godavari, Krishna, Kaveri. The **Godavari** is the longest peninsular river ('Dakshin Ganga').\n- **Peninsular west-flowing** (form estuaries, fall into the Arabian Sea): **Narmada and Tapi**, which flow through rift valleys.",
          bn: "- **হিমালয়ের নদী** (চিরপ্রবাহী – বরফগলা জল ও বৃষ্টিতে পুষ্ট): সিন্ধু, গঙ্গা, ব্রহ্মপুত্র নদীব্যবস্থা। **দেবপ্রয়াগে ভাগীরথী ও অলকানন্দা** মিলিত হয়ে গঙ্গা নাম নেয়।\n- **উপদ্বীপের পূর্ববাহিনী নদী** (বদ্বীপ গঠন করে, বঙ্গোপসাগরে পড়ে): মহানদী, গোদাবরী, কৃষ্ণা, কাবেরী। **গোদাবরী** উপদ্বীপের দীর্ঘতম নদী ('দক্ষিণের গঙ্গা')।\n- **উপদ্বীপের পশ্চিমবাহিনী নদী** (খাঁড়ি বা মোহানা গঠন করে, আরব সাগরে পড়ে): **নর্মদা ও তাপ্তী**, যারা গ্রস্ত উপত্যকার মধ্য দিয়ে প্রবাহিত।",
        },
      },
      {
        title: { en: "Link soil, crop and season", bn: "মৃত্তিকা, ফসল ও ঋতুকে একসঙ্গে মনে রাখুন" },
        body: {
          en: "- **Black (regur) soil** – Deccan plateau, retains moisture, best for **cotton**.\n- **Alluvial soil** – the northern plains, most widespread and most fertile.\n- **Laterite soil** – high-rainfall areas, formed by leaching; suits tea, coffee, cashew.\n- **Kharif** crops are sown with the monsoon (June–July) and harvested around September–October: rice, maize, cotton, jute. **Rabi** crops are sown in winter (October–November) and harvested around March–April: wheat, mustard, gram, barley.",
          bn: "- **কৃষ্ণ (রেগুর) মৃত্তিকা** – দাক্ষিণাত্য মালভূমি, জল ধরে রাখে, **তুলা** চাষের জন্য সেরা।\n- **পলি মৃত্তিকা** – উত্তরের সমভূমি, সবচেয়ে বিস্তৃত ও সবচেয়ে উর্বর।\n- **ল্যাটেরাইট মৃত্তিকা** – অধিক বৃষ্টিপাতের অঞ্চলে ধৌত প্রক্রিয়ায় তৈরি; চা, কফি, কাজুর উপযোগী।\n- **খারিফ** ফসল বর্ষার শুরুতে (জুন–জুলাই) বোনা হয় এবং সেপ্টেম্বর–অক্টোবর নাগাদ কাটা হয়: ধান, ভুট্টা, তুলা, পাট। **রবি** ফসল শীতে (অক্টোবর–নভেম্বর) বোনা হয় এবং মার্চ–এপ্রিল নাগাদ কাটা হয়: গম, সরষে, ছোলা, যব।",
        },
      },
      {
        title: { en: "Layer the atmosphere from the ground up", bn: "ভূপৃষ্ঠ থেকে উপরে বায়ুমণ্ডলের স্তর সাজান" },
        body: {
          en: "**Troposphere → Stratosphere → Mesosphere → Thermosphere → Exosphere.** Weather happens in the **troposphere**; the **ozone layer** lies in the **stratosphere**; the **ionosphere** (which reflects radio waves) is part of the thermosphere. Temperature falls with height in the troposphere.",
          bn: "**ট্রপোস্ফিয়ার → স্ট্র্যাটোস্ফিয়ার → মেসোস্ফিয়ার → থার্মোস্ফিয়ার → এক্সোস্ফিয়ার।** আবহাওয়ার সব ঘটনা ঘটে **ট্রপোস্ফিয়ারে**; **ওজোন স্তর** থাকে **স্ট্র্যাটোস্ফিয়ারে**; **আয়নোস্ফিয়ার** (যা বেতার তরঙ্গ প্রতিফলিত করে) থার্মোস্ফিয়ারের অংশ। ট্রপোস্ফিয়ারে উচ্চতা বাড়লে তাপমাত্রা কমে।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Planets: 'My Very Educated Mother Just Served Us Noodles'", bn: "গ্রহের ক্রম: 'My Very Educated Mother Just Served Us Noodles'" },
        body: {
          en: "**M**ercury, **V**enus, **E**arth, **M**ars, **J**upiter, **S**aturn, **U**ranus, **N**eptune (from the Sun outward). Mercury is the smallest planet and nearest to the Sun; Jupiter is the largest.",
          bn: "সূর্য থেকে বাইরের দিকে: **M**ercury (বুধ), **V**enus (শুক্র), **E**arth (পৃথিবী), **M**ars (মঙ্গল), **J**upiter (বৃহস্পতি), **S**aturn (শনি), **U**ranus (ইউরেনাস), **N**eptune (নেপচুন)। বুধ সবচেয়ে ছোট এবং সূর্যের সবচেয়ে কাছে; বৃহস্পতি সবচেয়ে বড়।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Tropic of Cancer states: 'G-R-M-C-J-W-T-M'", bn: "কর্কটক্রান্তির রাজ্য: 'G-R-M-C-J-W-T-M'" },
        body: {
          en: "Go **west to east**: **G**ujarat → **R**ajasthan → **M**adhya Pradesh → **C**hhattisgarh → **J**harkhand → **W**est Bengal → **T**ripura → **M**izoram. Walking the line on a map in this order makes 'which state does NOT lie on the Tropic of Cancer' an easy elimination (Odisha and Bihar are common wrong options).",
          bn: "**পশ্চিম থেকে পূর্বে** যান: **G**ujarat (গুজরাট) → **R**ajasthan (রাজস্থান) → **M**adhya Pradesh (মধ্যপ্রদেশ) → **C**hhattisgarh (ছত্তিশগড়) → **J**harkhand (ঝাড়খণ্ড) → **W**est Bengal (পশ্চিমবঙ্গ) → **T**ripura (ত্রিপুরা) → **M**izoram (মিজোরাম)। এই ক্রমে মানচিত্রে রেখা ধরে এগোলে 'কোন রাজ্যের উপর দিয়ে কর্কটক্রান্তি যায়নি' প্রশ্নটি সহজে বাদ দিয়ে করা যায় (ওড়িশা ও বিহার সাধারণ ভুল বিকল্প)।",
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: "Kharif = monsoon, Rabi = winter", bn: "খারিফ = বর্ষা, রবি = শীত" },
        body: {
          en: "If a crop needs **lots of water and heat** (rice, cotton, jute, maize) it is kharif. If it grows in the **cool dry winter** (wheat, mustard, gram) it is rabi. Short crops grown between the two seasons (watermelon, cucumber) are **zaid**.",
          bn: "যে ফসলে **প্রচুর জল ও তাপ** লাগে (ধান, তুলা, পাট, ভুট্টা) তা খারিফ। যা **ঠান্ডা ও শুকনো শীতে** জন্মায় (গম, সরষে, ছোলা) তা রবি। দুই মরসুমের মাঝে স্বল্পমেয়াদি ফসল (তরমুজ, শসা) হল **জায়িদ**।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Hottest planet is Venus, not Mercury.** Mercury is closest to the Sun, but Venus's thick carbon-dioxide atmosphere traps heat (greenhouse effect), making it the hottest.",
        bn: "**সবচেয়ে উষ্ণ গ্রহ শুক্র, বুধ নয়।** বুধ সূর্যের সবচেয়ে কাছে, কিন্তু শুক্রের ঘন কার্বন ডাই-অক্সাইডের বায়ুমণ্ডল তাপ আটকে রাখে (গ্রিনহাউস প্রভাব), তাই শুক্রই সবচেয়ে উষ্ণ।",
      },
      {
        en: "**Narmada and Tapi flow west, not east.** Most peninsular rivers flow east into the Bay of Bengal and form deltas; Narmada and Tapi flow west through rift valleys and form **estuaries**, not deltas.",
        bn: "**নর্মদা ও তাপ্তী পশ্চিমবাহিনী, পূর্ববাহিনী নয়।** উপদ্বীপের বেশিরভাগ নদী পূর্বে বঙ্গোপসাগরে পড়ে বদ্বীপ তৈরি করে; নর্মদা ও তাপ্তী গ্রস্ত উপত্যকা দিয়ে পশ্চিমে প্রবাহিত হয় এবং বদ্বীপ নয়, **খাঁড়ি (মোহানা)** তৈরি করে।",
      },
      {
        en: "**Latitude vs longitude.** Latitudes are horizontal lines measured north–south from the Equator (0°) and decide **climate zones**; longitudes run pole to pole, measured east–west from Greenwich (0°), and decide **time**.",
        bn: "**অক্ষাংশ ও দ্রাঘিমাংশ আলাদা।** অক্ষরেখা নিরক্ষরেখা (0°) থেকে উত্তর–দক্ষিণে মাপা অনুভূমিক রেখা এবং তা **জলবায়ু অঞ্চল** নির্ধারণ করে; দ্রাঘিমারেখা মেরু থেকে মেরু পর্যন্ত বিস্তৃত, গ্রিনিচ (0°) থেকে পূর্ব–পশ্চিমে মাপা হয় এবং তা **সময়** নির্ধারণ করে।",
      },
      {
        en: "**Ozone layer is in the stratosphere, not the troposphere.** Weather and clouds belong to the troposphere; options often put ozone in the wrong layer.",
        bn: "**ওজোন স্তর স্ট্র্যাটোস্ফিয়ারে, ট্রপোস্ফিয়ারে নয়।** আবহাওয়া ও মেঘ ট্রপোস্ফিয়ারের বিষয়; বিকল্পে প্রায়ই ওজোনকে ভুল স্তরে দেখানো হয়।",
      },
    ],
  },

  // ───────────────────────────── Polity ─────────────────────────────
  {
    subject: 'gs',
    topic: 'polity',
    title: { en: "Indian Polity", bn: "ভারতীয় রাষ্ট্রব্যবস্থা", hi: "भारतीय राजव्यवस्था" },
    overview: {
      en: "Polity is the most **scoring and predictable** part of GS: questions come from the **Constitution** – its sources, Preamble, Parts and Articles, Fundamental Rights, DPSP, Parliament, President, judiciary, emergency provisions and key amendments. Learn it **structurally**: Part → Article range → key Articles inside it. Always study an institution in a fixed order – *composition, qualification, election/appointment, term, removal, powers* – so that you can compare President vs Governor or Lok Sabha vs Rajya Sabha instantly. Article numbers are asked directly, so revise them with short daily flash-cards.",
      bn: "রাষ্ট্রব্যবস্থা সাধারণ জ্ঞানের সবচেয়ে **নম্বর-তোলা ও অনুমানযোগ্য** অংশ: প্রশ্ন আসে **সংবিধান** থেকে – তার উৎস, প্রস্তাবনা, অংশ ও ধারা, মৌলিক অধিকার, নির্দেশমূলক নীতি, সংসদ, রাষ্ট্রপতি, বিচারব্যবস্থা, জরুরি অবস্থা ও গুরুত্বপূর্ণ সংশোধনী। এটি **কাঠামো ধরে** শিখুন: অংশ → ধারার পরিসর → তার ভিতরের মূল ধারাগুলি। প্রতিটি প্রতিষ্ঠান একটি নির্দিষ্ট ক্রমে পড়ুন – *গঠন, যোগ্যতা, নির্বাচন/নিয়োগ, কার্যকাল, অপসারণ, ক্ষমতা* – তাহলে রাষ্ট্রপতি বনাম রাজ্যপাল বা লোকসভা বনাম রাজ্যসভা সঙ্গে সঙ্গে তুলনা করতে পারবেন। ধারার নম্বর সরাসরি জিজ্ঞাসা করা হয়, তাই রোজ ছোট ফ্ল্যাশকার্ড দিয়ে রিভিশন করুন।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "Map Parts to Articles", bn: "অংশ (Part) ও ধারার (Article) মানচিত্র তৈরি করুন" },
        body: {
          en: "- **Part III** – Fundamental Rights – Art. **12–35**\n- **Part IV** – Directive Principles of State Policy – Art. **36–51**\n- **Part IV-A** – Fundamental Duties – Art. **51A** (added by the 42nd Amendment, 1976)\n- **Part V** – The Union (President, Parliament, Supreme Court) – Art. **52–151**\n- **Part VI** – The States – Art. **152–237**\n- **Part XV** – Elections – Art. **324–329**\n- **Part XVIII** – Emergency provisions – Art. **352–360**\n- **Part XX** – Amendment of the Constitution – Art. **368**",
          bn: "- **তৃতীয় অংশ (Part III)** – মৌলিক অধিকার – ধারা **12–35**\n- **চতুর্থ অংশ (Part IV)** – রাষ্ট্র পরিচালনার নির্দেশমূলক নীতি – ধারা **36–51**\n- **চতুর্থ-ক অংশ (Part IV-A)** – মৌলিক কর্তব্য – ধারা **51A** (42তম সংশোধনী, 1976-এ যুক্ত)\n- **পঞ্চম অংশ (Part V)** – কেন্দ্র (রাষ্ট্রপতি, সংসদ, সুপ্রিম কোর্ট) – ধারা **52–151**\n- **ষষ্ঠ অংশ (Part VI)** – রাজ্য – ধারা **152–237**\n- **পঞ্চদশ অংশ (Part XV)** – নির্বাচন – ধারা **324–329**\n- **অষ্টাদশ অংশ (Part XVIII)** – জরুরি অবস্থা – ধারা **352–360**\n- **বিংশ অংশ (Part XX)** – সংবিধান সংশোধন – ধারা **368**",
        },
      },
      {
        title: { en: "Fundamental Rights in six groups", bn: "মৌলিক অধিকারের ছয়টি ভাগ" },
        body: {
          en: "- Right to Equality – Art. 14–18 (Art. 14 equality before law; Art. 17 abolition of untouchability)\n- Right to Freedom – Art. 19–22 (Art. 21 life and personal liberty; **Art. 21A** education for children aged 6–14, added by the 86th Amendment, 2002)\n- Right against Exploitation – Art. 23–24\n- Right to Freedom of Religion – Art. 25–28\n- Cultural and Educational Rights – Art. 29–30\n- Right to Constitutional Remedies – **Art. 32**\n\nThe Right to Property was removed from Part III by the **44th Amendment (1978)**; it is now a legal right under **Art. 300A**.",
          bn: "- সাম্যের অধিকার – ধারা 14–18 (ধারা 14 আইনের চোখে সমতা; ধারা 17 অস্পৃশ্যতা বিলোপ)\n- স্বাধীনতার অধিকার – ধারা 19–22 (ধারা 21 জীবন ও ব্যক্তিগত স্বাধীনতা; **ধারা 21A** 6–14 বছর বয়সি শিশুদের শিক্ষার অধিকার, 86তম সংশোধনী, 2002)\n- শোষণের বিরুদ্ধে অধিকার – ধারা 23–24\n- ধর্মীয় স্বাধীনতার অধিকার – ধারা 25–28\n- সাংস্কৃতিক ও শিক্ষাগত অধিকার – ধারা 29–30\n- সাংবিধানিক প্রতিকারের অধিকার – **ধারা 32**\n\n**44তম সংশোধনী (1978)** সম্পত্তির অধিকারকে মৌলিক অধিকার থেকে বাদ দেয়; এখন এটি **ধারা 300A**-এর অধীনে একটি আইনি অধিকার।",
        },
      },
      {
        title: { en: "Borrowed features: country → feature", bn: "গৃহীত বৈশিষ্ট্য: দেশ → বৈশিষ্ট্য" },
        body: {
          en: "- **UK** – parliamentary government, rule of law, single citizenship, bicameralism\n- **USA** – Fundamental Rights, independent judiciary, judicial review, impeachment of the President\n- **Ireland** – Directive Principles, method of electing the President\n- **Canada** – federation with a strong Centre, residuary powers with the Centre\n- **Australia** – Concurrent List, joint sitting of Parliament\n- **USSR** – Fundamental Duties\n- **France** – Republic; liberty, equality, fraternity in the Preamble\n- **Germany (Weimar)** – suspension of Fundamental Rights during emergency\n- **South Africa** – procedure for amending the Constitution",
          bn: "- **ব্রিটেন** – সংসদীয় শাসনব্যবস্থা, আইনের শাসন, একক নাগরিকত্ব, দ্বিকক্ষ আইনসভা\n- **আমেরিকা** – মৌলিক অধিকার, স্বাধীন বিচারব্যবস্থা, বিচারবিভাগীয় পর্যালোচনা, রাষ্ট্রপতির ইমপিচমেন্ট\n- **আয়ারল্যান্ড** – নির্দেশমূলক নীতি, রাষ্ট্রপতি নির্বাচনের পদ্ধতি\n- **কানাডা** – শক্তিশালী কেন্দ্রসহ যুক্তরাষ্ট্র, অবশিষ্ট ক্ষমতা কেন্দ্রের হাতে\n- **অস্ট্রেলিয়া** – যুগ্ম তালিকা, সংসদের যৌথ অধিবেশন\n- **সোভিয়েত ইউনিয়ন** – মৌলিক কর্তব্য\n- **ফ্রান্স** – প্রজাতন্ত্র; প্রস্তাবনায় স্বাধীনতা, সাম্য, ভ্রাতৃত্ব\n- **জার্মানি (ভাইমার)** – জরুরি অবস্থায় মৌলিক অধিকার স্থগিত\n- **দক্ষিণ আফ্রিকা** – সংবিধান সংশোধনের পদ্ধতি",
        },
      },
      {
        title: { en: "Three emergencies, three Articles", bn: "তিন ধরনের জরুরি অবস্থা, তিনটি ধারা" },
        body: {
          en: "- **Art. 352** – National Emergency (war, external aggression or armed rebellion)\n- **Art. 356** – President's Rule in a state (failure of constitutional machinery)\n- **Art. 360** – Financial Emergency (never imposed so far)\n\nAlso fix the key constitutional dates: Constituent Assembly first met on **9 December 1946**; the Constitution was adopted on **26 November 1949** (Constitution Day) and came into force on **26 January 1950** (Republic Day). Dr. Rajendra Prasad was President of the Assembly; Dr. B. R. Ambedkar chaired the Drafting Committee.",
          bn: "- **ধারা 352** – জাতীয় জরুরি অবস্থা (যুদ্ধ, বহিরাক্রমণ বা সশস্ত্র বিদ্রোহ)\n- **ধারা 356** – রাজ্যে রাষ্ট্রপতি শাসন (সাংবিধানিক ব্যবস্থার ব্যর্থতা)\n- **ধারা 360** – আর্থিক জরুরি অবস্থা (এখনও পর্যন্ত কখনও জারি হয়নি)\n\nসংবিধানের মূল তারিখগুলিও মনে রাখুন: গণপরিষদের প্রথম অধিবেশন **9 ডিসেম্বর 1946**; সংবিধান গৃহীত হয় **26 নভেম্বর 1949** (সংবিধান দিবস) এবং কার্যকর হয় **26 জানুয়ারি 1950** (প্রজাতন্ত্র দিবস)। গণপরিষদের সভাপতি ড. রাজেন্দ্র প্রসাদ; খসড়া কমিটির সভাপতি ড. বি. আর. আম্বেদকর।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Emergency Articles: '352 – 356 – 360'", bn: "জরুরি অবস্থার ধারা: '352 – 356 – 360'" },
        body: {
          en: "Think **N-S-F**: **N**ational (352), **S**tate (356), **F**inancial (360) – the numbers increase by 4.",
          bn: "**N-S-F** মনে রাখুন: **N**ational/জাতীয় (352), **S**tate/রাজ্য (356), **F**inancial/আর্থিক (360) – সংখ্যা 4 করে বাড়ে।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Five writs: 'HM PCQ'", bn: "পাঁচটি লেখ (রিট): 'HM PCQ'" },
        body: {
          en: "- **H**abeas Corpus – 'produce the body' (against illegal detention)\n- **M**andamus – 'we command' (to perform a public duty)\n- **P**rohibition – stops a lower court *before* it acts beyond its jurisdiction\n- **C**ertiorari – quashes an order a lower court has *already* passed\n- **Q**uo Warranto – 'by what authority' (challenges illegal holding of a public office)",
          bn: "- **H**abeas Corpus (বন্দি প্রত্যক্ষীকরণ) – 'দেহকে হাজির করো' (বেআইনি আটকের বিরুদ্ধে)\n- **M**andamus (পরমাদেশ) – 'আমরা আদেশ করছি' (সরকারি কর্তব্য পালনে বাধ্য করা)\n- **P**rohibition (প্রতিষেধ) – নিম্ন আদালত এক্তিয়ারের বাইরে কাজ করার *আগেই* থামায়\n- **C**ertiorari (উৎপ্রেষণ) – নিম্ন আদালতের *ইতিমধ্যে দেওয়া* আদেশ বাতিল করে\n- **Q**uo Warranto (অধিকার পৃচ্ছা) – 'কোন অধিকারে' (সরকারি পদ বেআইনিভাবে দখলের বিরুদ্ধে)",
        },
      },
      {
        title: { en: "Minimum ages: 25 – 30 – 35", bn: "ন্যূনতম বয়স: 25 – 30 – 35" },
        body: {
          en: "**25** for Lok Sabha (and state Legislative Assembly), **30** for Rajya Sabha (and state Legislative Council), **35** for President, Vice-President and Governor. Lower house → lower age.",
          bn: "লোকসভা (ও রাজ্যের বিধানসভা) সদস্য হতে **25**, রাজ্যসভা (ও বিধান পরিষদ) সদস্য হতে **30**, রাষ্ট্রপতি, উপরাষ্ট্রপতি ও রাজ্যপাল হতে **35** বছর। নিম্নকক্ষ → কম বয়স।",
        },
      },
      {
        title: { en: "42nd Amendment = 'Mini-Constitution'", bn: "42তম সংশোধনী = 'ক্ষুদ্র সংবিধান'" },
        body: {
          en: "The **42nd Amendment (1976)** added three words to the Preamble – **Socialist, Secular, Integrity** – and added **Fundamental Duties** (Art. 51A). Any question about 'words added to the Preamble' or 'when were Fundamental Duties added' points to this amendment.",
          bn: "**42তম সংশোধনী (1976)** প্রস্তাবনায় তিনটি শব্দ যোগ করে – **সমাজতান্ত্রিক, ধর্মনিরপেক্ষ, সংহতি** – এবং **মৌলিক কর্তব্য** (ধারা 51A) যুক্ত করে। 'প্রস্তাবনায় কোন শব্দ যোগ হয়েছে' বা 'মৌলিক কর্তব্য কবে যুক্ত হয়' – এমন প্রশ্নের উত্তর এই সংশোধনী।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Article 32 vs Article 226.** Art. 32: the **Supreme Court** issues writs only for **Fundamental Rights**, and Art. 32 is itself a Fundamental Right. Art. 226: **High Courts** issue writs for Fundamental Rights **and any other legal right** – so the High Court's writ jurisdiction is wider.",
        bn: "**ধারা 32 ও ধারা 226 আলাদা।** ধারা 32: **সুপ্রিম কোর্ট** শুধু **মৌলিক অধিকার** রক্ষায় লেখ জারি করে, এবং ধারা 32 নিজেই একটি মৌলিক অধিকার। ধারা 226: **হাইকোর্ট** মৌলিক অধিকার **এবং অন্য যেকোনো আইনি অধিকার** রক্ষায় লেখ জারি করতে পারে – তাই হাইকোর্টের লেখ-এক্তিয়ার বেশি বিস্তৃত।",
      },
      {
        en: "**President vs Vice-President election.** The President is elected by the **elected** members of both Houses of Parliament **and** of the state Legislative Assemblies (including Delhi and Puducherry). The Vice-President is elected by **all members of both Houses of Parliament** only – state legislators have no role.",
        bn: "**রাষ্ট্রপতি ও উপরাষ্ট্রপতির নির্বাচন আলাদা।** রাষ্ট্রপতিকে নির্বাচন করেন সংসদের দুই কক্ষের **নির্বাচিত** সদস্য **এবং** রাজ্য বিধানসভাগুলির (দিল্লি ও পুদুচেরিসহ) নির্বাচিত সদস্যরা। উপরাষ্ট্রপতিকে নির্বাচন করেন শুধু **সংসদের দুই কক্ষের সকল সদস্য** – রাজ্যের বিধায়কদের কোনো ভূমিকা নেই।",
      },
      {
        en: "**DPSP are not enforceable in court; Fundamental Rights are.** Uniform Civil Code (Art. 44) and village panchayats (Art. 40) are Directive Principles, not rights. Fundamental Duties (Art. 51A) are also non-justiciable.",
        bn: "**নির্দেশমূলক নীতি আদালতে বলবৎযোগ্য নয়; মৌলিক অধিকার বলবৎযোগ্য।** অভিন্ন দেওয়ানি বিধি (ধারা 44) ও গ্রাম পঞ্চায়েত (ধারা 40) নির্দেশমূলক নীতি, অধিকার নয়। মৌলিক কর্তব্যও (ধারা 51A) আদালতে বলবৎযোগ্য নয়।",
      },
      {
        en: "**Money Bill (Art. 110) can be introduced only in the Lok Sabha.** The Rajya Sabha can only recommend changes and must return it within **14 days**; there is no joint sitting for a Money Bill. Also, the Rajya Sabha is a **permanent House** (one-third of members retire every 2 years) and is never dissolved.",
        bn: "**অর্থবিল (ধারা 110) শুধু লোকসভায় পেশ করা যায়।** রাজ্যসভা কেবল সুপারিশ করতে পারে এবং **14 দিনের** মধ্যে ফেরত দিতে হয়; অর্থবিলের জন্য যৌথ অধিবেশন হয় না। এছাড়া রাজ্যসভা একটি **স্থায়ী কক্ষ** (প্রতি 2 বছরে এক-তৃতীয়াংশ সদস্য অবসর নেন), এটি কখনও ভেঙে দেওয়া হয় না।",
      },
    ],
  },

  // ───────────────────────────── Economy ─────────────────────────────
  {
    subject: 'gs',
    topic: 'economy',
    title: { en: "Indian Economy", bn: "ভারতীয় অর্থনীতি", hi: "भारतीय अर्थव्यवस्था" },
    overview: {
      en: "Economy questions in these exams are mostly **conceptual definitions** (GDP, GNP, inflation, deficits, taxes), **institutions** (NITI Aayog, Finance Commission, RBI, SEBI) and **planning history** (Five-Year Plans, the 1991 reforms). Learn concepts as **formulas in words** – e.g. 'GNP = GDP + net factor income from abroad' – because options are built by swapping one term. Keep current numbers (growth rate, inflation figure, budget size) in your current-affairs notes, not here, since they change every year. Read the Economic Survey and Budget highlights only for themes, and practise PYQs to see which definitions repeat.",
      bn: "এই পরীক্ষাগুলিতে অর্থনীতির প্রশ্ন মূলত আসে **ধারণার সংজ্ঞা** (GDP, GNP, মুদ্রাস্ফীতি, ঘাটতি, কর), **প্রতিষ্ঠান** (নীতি আয়োগ, অর্থ কমিশন, RBI, SEBI) এবং **পরিকল্পনার ইতিহাস** (পঞ্চবার্ষিকী পরিকল্পনা, 1991-এর সংস্কার) থেকে। ধারণাগুলি **কথায় লেখা সূত্র** হিসেবে শিখুন – যেমন 'GNP = GDP + বিদেশ থেকে নিট উপাদান আয়' – কারণ একটি পদ বদলে দিয়েই ভুল বিকল্প তৈরি করা হয়। বৃদ্ধির হার, মুদ্রাস্ফীতির হার, বাজেটের আকারের মতো সংখ্যা প্রতি বছর বদলায়, তাই সেগুলি সাম্প্রতিক ঘটনার নোটে রাখুন। অর্থনৈতিক সমীক্ষা ও বাজেটের মূল বিষয়গুলি পড়ুন এবং আগের বছরের প্রশ্ন অনুশীলন করে দেখুন কোন সংজ্ঞাগুলি বারবার আসে।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "National income chain", bn: "জাতীয় আয়ের শৃঙ্খল" },
        body: {
          en: "- **GDP** – value of final goods and services produced **within the country**\n- **GNP = GDP + net factor income from abroad** (income of residents earned abroad minus income of foreigners earned here)\n- **NNP = GNP − depreciation**\n- **NDP = GDP − depreciation**\n- **National Income = NNP at factor cost**\n\n'Domestic' means inside the borders; 'National' means by the country's residents wherever they are.",
          bn: "- **GDP** – **দেশের ভৌগোলিক সীমার মধ্যে** উৎপাদিত চূড়ান্ত দ্রব্য ও সেবার মূল্য\n- **GNP = GDP + বিদেশ থেকে নিট উপাদান আয়** (বিদেশে বাসিন্দাদের আয় বিয়োগ দেশে বিদেশিদের আয়)\n- **NNP = GNP − অবচয় (ক্ষয়ক্ষতি)**\n- **NDP = GDP − অবচয়**\n- **জাতীয় আয় = উপাদান ব্যয়ে NNP**\n\n'Domestic' (অভ্যন্তরীণ) মানে দেশের সীমার ভিতরে; 'National' (জাতীয়) মানে দেশের বাসিন্দাদের আয়, তাঁরা যেখানেই থাকুন।",
        },
      },
      {
        title: { en: "Three deficits from one budget", bn: "এক বাজেট থেকে তিন রকম ঘাটতি" },
        body: {
          en: "- **Revenue deficit** = revenue expenditure − revenue receipts\n- **Fiscal deficit** = total expenditure − total receipts **excluding borrowings** (it shows how much the government must borrow)\n- **Primary deficit** = fiscal deficit − **interest payments**\n\nThe annual budget is called the **'Annual Financial Statement'** in the Constitution (**Art. 112**); the word 'budget' itself does not appear there.",
          bn: "- **রাজস্ব ঘাটতি** = রাজস্ব ব্যয় − রাজস্ব প্রাপ্তি\n- **রাজকোষ ঘাটতি** = মোট ব্যয় − **ঋণ বাদে** মোট প্রাপ্তি (সরকারকে কত ধার করতে হবে তা দেখায়)\n- **প্রাথমিক ঘাটতি** = রাজকোষ ঘাটতি − **সুদ প্রদান**\n\nসংবিধানে বার্ষিক বাজেটকে **'বার্ষিক আর্থিক বিবৃতি'** বলা হয় (**ধারা 112**); 'বাজেট' শব্দটি সংবিধানে নেই।",
        },
      },
      {
        title: { en: "Planning timeline", bn: "পরিকল্পনার সময়রেখা" },
        body: {
          en: "- **Planning Commission** set up in **1950**; **First Five-Year Plan 1951–56** focused on agriculture (Harrod–Domar model).\n- **Second Plan 1956–61** focused on heavy industry (**P. C. Mahalanobis** model).\n- **1991** – LPG reforms: **L**iberalisation, **P**rivatisation, **G**lobalisation.\n- **12th Plan (2012–17)** was the last Five-Year Plan.\n- **NITI Aayog** replaced the Planning Commission on **1 January 2015**.\n- **GST** came into force on **1 July 2017** (101st Constitutional Amendment, 2016).",
          bn: "- **1950** সালে **যোজনা কমিশন** গঠিত হয়; **প্রথম পঞ্চবার্ষিকী পরিকল্পনা (1951–56)** কৃষির উপর জোর দেয় (হ্যারড–ডোমার মডেল)।\n- **দ্বিতীয় পরিকল্পনা (1956–61)** ভারী শিল্পের উপর জোর দেয় (**প্রশান্তচন্দ্র মহলানবিশ** মডেল)।\n- **1991** – LPG সংস্কার: **উদারীকরণ (L), বেসরকারিকরণ (P), বিশ্বায়ন (G)**।\n- **দ্বাদশ পরিকল্পনা (2012–17)** ছিল শেষ পঞ্চবার্ষিকী পরিকল্পনা।\n- **1 জানুয়ারি 2015** যোজনা কমিশনের জায়গায় **নীতি আয়োগ** গঠিত হয়।\n- **1 জুলাই 2017** থেকে **GST** চালু হয় (101তম সংবিধান সংশোধনী, 2016)।",
        },
      },
      {
        title: { en: "Classify every term into a box", bn: "প্রতিটি পরিভাষাকে নির্দিষ্ট ঘরে রাখুন" },
        body: {
          en: "Keep four boxes and file every new term in one of them:\n\n- **Fiscal policy** (government – taxes, spending, borrowing)\n- **Monetary policy** (RBI – money supply, policy rates, CRR/SLR)\n- **Taxes**: **direct** (burden cannot be shifted – income tax, corporation tax) vs **indirect** (shifted to consumer – GST, customs duty)\n- **Sectors**: primary (agriculture, mining), secondary (manufacturing), tertiary (services)",
          bn: "চারটি ঘর রাখুন এবং প্রতিটি নতুন পরিভাষা তার একটিতে রাখুন:\n\n- **রাজস্ব নীতি (Fiscal policy)** (সরকার – কর, ব্যয়, ঋণ)\n- **আর্থিক নীতি (Monetary policy)** (RBI – অর্থের জোগান, নীতিগত সুদের হার, CRR/SLR)\n- **কর**: **প্রত্যক্ষ** (করের বোঝা অন্যের উপর চাপানো যায় না – আয়কর, কর্পোরেশন কর) বনাম **পরোক্ষ** (ক্রেতার উপর চাপে – GST, শুল্ক)\n- **ক্ষেত্র**: প্রাথমিক (কৃষি, খনি), মাধ্যমিক (উৎপাদন শিল্প), তৃতীয় (সেবা)",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "'Gross minus depreciation = Net'", bn: "'মোট (Gross) − অবচয় = নিট (Net)'" },
        body: {
          en: "G → N always means **subtract depreciation**. D → N (Domestic → National) always means **add net factor income from abroad**. With these two moves you can derive any of GDP, GNP, NDP, NNP.",
          bn: "G → N মানেই সবসময় **অবচয় বিয়োগ**। D → N (অভ্যন্তরীণ → জাতীয়) মানেই সবসময় **বিদেশ থেকে নিট উপাদান আয় যোগ**। এই দুটি ধাপ দিয়ে GDP, GNP, NDP, NNP – যেকোনোটি বের করা যায়।",
        },
        approx_time_saved_sec: 20,
      },
      {
        title: { en: "Deficit ladder: remove one item at each step", bn: "ঘাটতির সিঁড়ি: প্রতি ধাপে একটি অংশ বাদ" },
        body: {
          en: "Fiscal deficit = borrowing. Remove **interest** → primary deficit. If primary deficit is zero, the government is borrowing only to pay interest on old loans.",
          bn: "রাজকোষ ঘাটতি = সরকারের ঋণ। তা থেকে **সুদ** বাদ দিলে → প্রাথমিক ঘাটতি। প্রাথমিক ঘাটতি শূন্য হলে বুঝবেন সরকার শুধু পুরনো ঋণের সুদ মেটাতেই ধার করছে।",
        },
      },
      {
        title: { en: "Mahalanobis = Second Plan = industry", bn: "মহলানবিশ = দ্বিতীয় পরিকল্পনা = শিল্প" },
        body: {
          en: "Pair the plan with its theme: **1st – agriculture**, **2nd – heavy industry (Mahalanobis)**. Most plan questions ask only these two plus 'last plan' (12th) and 'replaced by' (NITI Aayog, 2015).",
          bn: "পরিকল্পনার সঙ্গে তার মূল বিষয় জুড়ে মনে রাখুন: **প্রথম – কৃষি**, **দ্বিতীয় – ভারী শিল্প (মহলানবিশ)**। পরিকল্পনার বেশিরভাগ প্রশ্নে শুধু এই দুটি, 'শেষ পরিকল্পনা' (দ্বাদশ) এবং 'কে প্রতিস্থাপন করে' (নীতি আয়োগ, 2015) জিজ্ঞাসা করা হয়।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Deflation vs disinflation.** Deflation = prices actually **fall** (inflation below zero). Disinflation = inflation is still positive but its **rate is falling** (e.g. from 6% to 4%).",
        bn: "**মুদ্রাসংকোচন (Deflation) ও মুদ্রাস্ফীতি হ্রাস (Disinflation) আলাদা।** Deflation মানে দাম সত্যিই **কমছে** (মুদ্রাস্ফীতি শূন্যের নিচে)। Disinflation মানে মুদ্রাস্ফীতি এখনও ধনাত্মক, কিন্তু তার **হার কমছে** (যেমন 6% থেকে 4%)।",
      },
      {
        en: "**Finance Commission vs NITI Aayog.** The Finance Commission is a **constitutional body (Art. 280)**, set up every 5 years to recommend sharing of taxes between Centre and states. NITI Aayog is a **non-constitutional, non-statutory** body created by an executive resolution.",
        bn: "**অর্থ কমিশন ও নীতি আয়োগ আলাদা।** অর্থ কমিশন একটি **সাংবিধানিক সংস্থা (ধারা 280)**, প্রতি 5 বছরে গঠিত হয় এবং কেন্দ্র ও রাজ্যের মধ্যে কর বণ্টনের সুপারিশ করে। নীতি আয়োগ একটি **অসাংবিধানিক ও অ-বিধিবদ্ধ** সংস্থা, যা সরকারের প্রশাসনিক প্রস্তাবে গঠিত।",
      },
      {
        en: "**GDP vs GNP.** Income earned by an Indian working abroad is counted in India's **GNP**, not its GDP. Profit of a foreign company's factory in India is in India's **GDP**, not its GNP.",
        bn: "**GDP ও GNP আলাদা।** বিদেশে কর্মরত ভারতীয়ের আয় ভারতের **GNP**-তে ধরা হয়, GDP-তে নয়। ভারতে অবস্থিত বিদেশি কোম্পানির কারখানার মুনাফা ভারতের **GDP**-তে ধরা হয়, GNP-তে নয়।",
      },
      {
        en: "**Fiscal policy vs monetary policy.** Changing tax rates or government spending is **fiscal** (Finance Ministry). Changing repo rate or CRR is **monetary** (RBI). Questions often describe a measure and ask which policy it belongs to.",
        bn: "**রাজস্ব নীতি ও আর্থিক নীতি আলাদা।** করের হার বা সরকারি ব্যয় বদলানো **রাজস্ব নীতি** (অর্থ মন্ত্রক)। রেপো রেট বা CRR বদলানো **আর্থিক নীতি** (RBI)। প্রশ্নে প্রায়ই একটি পদক্ষেপ বর্ণনা করে জিজ্ঞাসা করা হয় সেটি কোন নীতির অংশ।",
      },
    ],
  },

  // ───────────────────────────── General Science ─────────────────────────────
  {
    subject: 'gs',
    topic: 'general_science',
    title: { en: "General Science", bn: "সাধারণ বিজ্ঞান", hi: "सामान्य विज्ञान" },
    overview: {
      en: "General Science carries a large share of GS marks in SSC and Railways-style papers and appears regularly in WBCS and Postal exams. Questions are at **Class 8–10 NCERT level**: Physics (units, motion, light, sound, electricity), Chemistry (acids and bases, common compounds, metals) and Biology (human body, nutrition, diseases). **Biology is the largest share**, so start there. Make **tables** rather than paragraphs – vitamin → deficiency disease, SI quantity → unit, compound → common name – and revise them often, because most questions are direct one-line facts.",
      bn: "SSC ও এই ধরনের পরীক্ষায় সাধারণ জ্ঞানের বড় অংশ সাধারণ বিজ্ঞান থেকে আসে, এবং WBCS ও পোস্টাল পরীক্ষাতেও নিয়মিত প্রশ্ন থাকে। প্রশ্নের মান **NCERT অষ্টম–দশম শ্রেণির** মতো: পদার্থবিদ্যা (একক, গতি, আলো, শব্দ, তড়িৎ), রসায়ন (অ্যাসিড ও ক্ষার, সাধারণ যৌগ, ধাতু) এবং জীববিদ্যা (মানবদেহ, পুষ্টি, রোগ)। **জীববিদ্যা থেকে সবচেয়ে বেশি প্রশ্ন আসে**, তাই সেখান থেকে শুরু করুন। অনুচ্ছেদের বদলে **সারণি** তৈরি করুন – ভিটামিন → অভাবজনিত রোগ, SI রাশি → একক, যৌগ → প্রচলিত নাম – এবং বারবার রিভিশন করুন, কারণ বেশিরভাগ প্রশ্নই সরাসরি এক লাইনের তথ্য।",
    },
    formulas: [
      {
        key: 'first_equation_of_motion',
        label: { en: "First equation of motion", bn: "গতির প্রথম সমীকরণ" },
        latex: 'v = u + at',
        variables: [
          { symbol: 'u', meaning: { en: "Initial velocity", bn: "প্রাথমিক বেগ" } },
          { symbol: 'v', meaning: { en: "Final velocity", bn: "অন্তিম বেগ" } },
          { symbol: 'a', meaning: { en: "Uniform acceleration", bn: "সুষম ত্বরণ" } },
          { symbol: 't', meaning: { en: "Time taken", bn: "সময়" } },
        ],
      },
      {
        key: 'second_equation_of_motion',
        label: { en: "Second equation of motion", bn: "গতির দ্বিতীয় সমীকরণ" },
        latex: 's = ut + \\dfrac{1}{2}at^2',
        variables: [
          { symbol: 's', meaning: { en: "Distance (displacement) covered", bn: "অতিক্রান্ত দূরত্ব (সরণ)" } },
        ],
        explanation: {
          en: "A body starting from rest has $u = 0$, so $s = \\frac{1}{2}at^2$.",
          bn: "স্থির অবস্থা থেকে শুরু করলে $u = 0$, তাই $s = \\frac{1}{2}at^2$।",
        },
      },
      {
        key: 'newton_second_law',
        label: { en: "Newton's second law", bn: "নিউটনের দ্বিতীয় সূত্র" },
        latex: 'F = ma',
        variables: [
          { symbol: 'F', meaning: { en: "Force (newton, N)", bn: "বল (নিউটন, N)" } },
          { symbol: 'm', meaning: { en: "Mass (kg)", bn: "ভর (kg)" } },
        ],
        explanation: {
          en: "Weight is a force: $W = mg$. Mass stays the same everywhere; weight changes with $g$.",
          bn: "ওজন একটি বল: $W = mg$। ভর সব জায়গায় একই থাকে; ওজন $g$-এর সঙ্গে বদলায়।",
        },
      },
    ],
    derivation_rules: [
      {
        title: { en: "Vitamin → deficiency table", bn: "ভিটামিন → অভাবজনিত রোগের সারণি" },
        body: {
          en: "- **A** – night blindness\n- **B1 (thiamine)** – beriberi\n- **B3 (niacin)** – pellagra\n- **B12** – pernicious anaemia\n- **C** – scurvy (bleeding gums)\n- **D** – rickets in children\n- **K** – delayed blood clotting\n\nFat-soluble vitamins are **A, D, E, K**; B and C are water-soluble.",
          bn: "- **A** – রাতকানা\n- **B1 (থায়ামিন)** – বেরিবেরি\n- **B3 (নায়াসিন)** – পেলেগ্রা\n- **B12** – পারনিশিয়াস অ্যানিমিয়া (রক্তাল্পতা)\n- **C** – স্কার্ভি (মাড়ি থেকে রক্তপাত)\n- **D** – শিশুদের রিকেট\n- **K** – রক্ত জমাট বাঁধতে দেরি\n\nস্নেহে দ্রবণীয় ভিটামিন **A, D, E, K**; B ও C জলে দ্রবণীয়।",
        },
      },
      {
        title: { en: "Diseases by cause", bn: "কারণ অনুযায়ী রোগের ভাগ" },
        body: {
          en: "- **Bacterial**: tuberculosis, cholera, typhoid, tetanus\n- **Viral**: polio, measles, rabies, dengue, AIDS, chickenpox\n- **Protozoan**: malaria (caused by *Plasmodium*, spread by the female *Anopheles* mosquito)\n\nDengue is spread by the *Aedes* mosquito. Antibiotics work against bacteria, **not** viruses.",
          bn: "- **ব্যাকটেরিয়াঘটিত**: যক্ষ্মা, কলেরা, টাইফয়েড, ধনুষ্টংকার\n- **ভাইরাসঘটিত**: পোলিও, হাম, জলাতঙ্ক, ডেঙ্গি, এইডস, জলবসন্ত\n- **প্রোটোজোয়াঘটিত**: ম্যালেরিয়া (*প্লাসমোডিয়াম* দ্বারা সৃষ্ট, স্ত্রী *অ্যানোফিলিস* মশা বাহক)\n\nডেঙ্গির বাহক *এডিস* মশা। অ্যান্টিবায়োটিক ব্যাকটেরিয়ার বিরুদ্ধে কাজ করে, ভাইরাসের বিরুদ্ধে **নয়**।",
        },
      },
      {
        title: { en: "Quantity → SI unit table", bn: "রাশি → SI একক সারণি" },
        body: {
          en: "- Force – **newton (N)**\n- Work / energy – **joule (J)**\n- Power – **watt (W)**\n- Pressure – **pascal (Pa)**\n- Frequency – **hertz (Hz)**\n- Electric charge – **coulomb (C)**\n- Resistance – **ohm (Ω)**\n- Electric current – **ampere (A)** (one of the 7 base units, with metre, kilogram, second, kelvin, mole, candela)",
          bn: "- বল – **নিউটন (N)**\n- কার্য / শক্তি – **জুল (J)**\n- ক্ষমতা – **ওয়াট (W)**\n- চাপ – **প্যাসকেল (Pa)**\n- কম্পাঙ্ক – **হার্জ (Hz)**\n- তড়িদাধান – **কুলম্ব (C)**\n- রোধ – **ওহম (Ω)**\n- তড়িৎপ্রবাহ – **অ্যাম্পিয়ার (A)** (7টি মৌলিক এককের একটি; বাকিগুলি মিটার, কিলোগ্রাম, সেকেন্ড, কেলভিন, মোল, ক্যান্ডেলা)",
        },
      },
      {
        title: { en: "Common names of compounds", bn: "যৌগের প্রচলিত নাম" },
        body: {
          en: "- Common salt – NaCl (sodium chloride)\n- Baking soda – NaHCO₃ (sodium hydrogen carbonate)\n- Washing soda – Na₂CO₃·10H₂O (sodium carbonate decahydrate)\n- Bleaching powder – CaOCl₂\n- Plaster of Paris – CaSO₄·½H₂O; gypsum – CaSO₄·2H₂O\n- Dry ice – solid CO₂\n\nAlso fix the pH scale: below 7 acidic, 7 neutral, above 7 basic; human blood is slightly basic (about 7.4).",
          bn: "- খাদ্য লবণ – NaCl (সোডিয়াম ক্লোরাইড)\n- খাবার সোডা (বেকিং সোডা) – NaHCO₃ (সোডিয়াম হাইড্রোজেন কার্বনেট)\n- কাপড় কাচার সোডা – Na₂CO₃·10H₂O (সোডিয়াম কার্বনেট ডেকাহাইড্রেট)\n- ব্লিচিং পাউডার – CaOCl₂\n- প্লাস্টার অফ প্যারিস – CaSO₄·½H₂O; জিপসাম – CaSO₄·2H₂O\n- শুষ্ক বরফ – কঠিন CO₂\n\npH স্কেলও মনে রাখুন: 7-এর কম অম্লীয়, 7 প্রশম, 7-এর বেশি ক্ষারীয়; মানুষের রক্ত সামান্য ক্ষারীয় (প্রায় 7.4)।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Fat-soluble vitamins: 'ADEK'", bn: "স্নেহে দ্রবণীয় ভিটামিন: 'ADEK'" },
        body: {
          en: "**A, D, E, K** dissolve in fat and are stored in the body; everything else (B group, C) is water-soluble and must be taken regularly.",
          bn: "**A, D, E, K** স্নেহপদার্থে দ্রবণীয় এবং দেহে সঞ্চিত থাকে; বাকিগুলি (B গোষ্ঠী, C) জলে দ্রবণীয়, তাই নিয়মিত গ্রহণ করতে হয়।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Blood groups: O gives, AB takes", bn: "রক্তের গ্রুপ: O দেয়, AB নেয়" },
        body: {
          en: "**O negative** is the universal donor (no A/B antigens); **AB positive** is the universal recipient (no anti-A/anti-B antibodies). The ABO system was discovered by Karl Landsteiner.",
          bn: "**O নেগেটিভ** সর্বজনীন দাতা (A/B অ্যান্টিজেন নেই); **AB পজিটিভ** সর্বজনীন গ্রহীতা (অ্যান্টি-A/অ্যান্টি-B অ্যান্টিবডি নেই)। ABO পদ্ধতি আবিষ্কার করেন কার্ল ল্যান্ডস্টাইনার।",
        },
      },
      {
        title: { en: "Short-sight → concave, Long-sight → convex", bn: "ক্ষীণদৃষ্টি → অবতল, দীর্ঘদৃষ্টি → উত্তল" },
        body: {
          en: "**Myopia** (cannot see far) is corrected with a **concave** (diverging) lens. **Hypermetropia** (cannot see near) is corrected with a **convex** (converging) lens.",
          bn: "**মায়োপিয়া** (দূরের জিনিস দেখা যায় না) সংশোধনে **অবতল** (অপসারী) লেন্স লাগে। **হাইপারমেট্রোপিয়া** (কাছের জিনিস দেখা যায় না) সংশোধনে **উত্তল** (অভিসারী) লেন্স লাগে।",
        },
      },
      {
        title: { en: "Sound needs a medium; light does not", bn: "শব্দের মাধ্যম লাগে; আলোর লাগে না" },
        body: {
          en: "Sound travels **fastest in solids, slower in liquids, slowest in gases**, and **cannot** travel through a vacuum. Light travels through vacuum at about $3 \\times 10^8$ m/s. That is why we see lightning before we hear thunder.",
          bn: "শব্দ **কঠিনে সবচেয়ে দ্রুত, তরলে তার চেয়ে ধীরে, গ্যাসে সবচেয়ে ধীরে** চলে এবং শূন্যস্থানে চলতে **পারে না**। আলো শূন্যস্থানে প্রায় $3 \\times 10^8$ m/s বেগে চলে। তাই বজ্রের শব্দ শোনার আগে বিদ্যুৎ চমকানো দেখা যায়।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Baking soda vs washing soda.** Baking soda is **NaHCO₃** (used in cooking and antacids); washing soda is **Na₂CO₃·10H₂O** (used for cleaning and softening hard water). Options swap the formulas.",
        bn: "**খাবার সোডা ও কাপড় কাচার সোডা আলাদা।** খাবার সোডা **NaHCO₃** (রান্না ও অ্যান্টাসিডে ব্যবহৃত); কাপড় কাচার সোডা **Na₂CO₃·10H₂O** (পরিষ্কার করা ও খর জল মৃদু করতে ব্যবহৃত)। বিকল্পে সংকেত অদলবদল করা থাকে।",
      },
      {
        en: "**Concave vs convex mirror uses.** Concave mirrors are used in **shaving/make-up mirrors, torches and vehicle headlights**; convex mirrors are used as **rear-view mirrors** in vehicles because they give a wider field of view.",
        bn: "**অবতল ও উত্তল দর্পণের ব্যবহার আলাদা।** অবতল দর্পণ ব্যবহার হয় **দাড়ি কামানো/প্রসাধনের আয়না, টর্চ ও গাড়ির হেডলাইটে**; উত্তল দর্পণ গাড়ির **পশ্চাৎদর্শী (রিয়ার-ভিউ) আয়না** হিসেবে ব্যবহৃত হয়, কারণ এতে বড় এলাকা দেখা যায়।",
      },
      {
        en: "**Mass vs weight.** Mass (kg) is the amount of matter and is the same on the Moon; weight (N) is the force of gravity and is about one-sixth on the Moon. 'Your weight in kg' is everyday language, not physics.",
        bn: "**ভর ও ওজন আলাদা।** ভর (kg) হল পদার্থের পরিমাণ, চাঁদেও একই থাকে; ওজন (N) হল অভিকর্ষ বল, চাঁদে প্রায় এক-ষষ্ঠাংশ হয়। 'ওজন কত কেজি' কথাটি দৈনন্দিন ভাষা, পদার্থবিদ্যার ভাষা নয়।",
      },
      {
        en: "**Malaria is protozoan, not viral or bacterial.** It is caused by *Plasmodium* and spread by the female *Anopheles* mosquito; dengue (viral) is spread by *Aedes*.",
        bn: "**ম্যালেরিয়া প্রোটোজোয়াঘটিত, ভাইরাস বা ব্যাকটেরিয়াঘটিত নয়।** এর কারণ *প্লাসমোডিয়াম* এবং বাহক স্ত্রী *অ্যানোফিলিস* মশা; ডেঙ্গি (ভাইরাসঘটিত) ছড়ায় *এডিস* মশা।",
      },
    ],
  },

  // ───────────────────────────── Current Affairs ─────────────────────────────
  {
    subject: 'gs',
    topic: 'current_affairs',
    title: { en: "Current Affairs", bn: "সাম্প্রতিক ঘটনাবলি", hi: "समसामयिकी" },
    overview: {
      en: "Current affairs questions cover roughly the **6–12 months before the exam** and are asked in every SSC, Banking, WBCS and Postal paper; Banking mains and WBCS ask the most. You cannot 'finish' this topic, so the goal is a **steady system**: follow a small set of reliable sources daily, condense them into **monthly notes by category**, and revise those notes repeatedly. Questions concentrate on a few categories – **appointments, awards, sports, government schemes, summits and international organisations, reports and indices, and important days**. Always link a news item to its **static background** (who gives the award, where the organisation is headquartered), because that is often what is actually asked.",
      bn: "সাম্প্রতিক ঘটনার প্রশ্ন সাধারণত **পরীক্ষার আগের 6–12 মাসের** ঘটনা থেকে আসে এবং SSC, ব্যাংকিং, WBCS ও পোস্টাল – সব পরীক্ষাতেই থাকে; ব্যাংকিং মেইনস ও WBCS-এ সবচেয়ে বেশি। এই বিষয়টি কখনও 'শেষ' হয় না, তাই লক্ষ্য হল একটি **নিয়মিত পদ্ধতি**: রোজ অল্প কয়েকটি নির্ভরযোগ্য উৎস পড়ুন, **বিভাগ অনুযায়ী মাসিক নোট** তৈরি করুন এবং সেই নোট বারবার রিভিশন করুন। প্রশ্ন মূলত কয়েকটি বিভাগে কেন্দ্রীভূত – **নিয়োগ, পুরস্কার, খেলাধুলা, সরকারি প্রকল্প, শীর্ষ সম্মেলন ও আন্তর্জাতিক সংস্থা, রিপোর্ট ও সূচক, এবং গুরুত্বপূর্ণ দিবস**। প্রতিটি খবরকে তার **স্থায়ী পটভূমির** সঙ্গে জুড়ে নিন (পুরস্কার কে দেয়, সংস্থার সদর দপ্তর কোথায়), কারণ প্রায়ই সেটাই আসলে জিজ্ঞাসা করা হয়।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "Pick few sources and stick to them", bn: "অল্প কয়েকটি উৎস বেছে নিয়ে তাতেই লেগে থাকুন" },
        body: {
          en: "- **One national newspaper** (e.g. The Hindu or The Indian Express) – read only exam-relevant news, 30–40 minutes a day.\n- **PIB (Press Information Bureau)** releases for official names of schemes, ministries and launch details.\n- **One monthly current-affairs compilation** from a reputed publisher, for revision.\n- For WBCS/WBPSC, add a **Bengali daily** for state news and state government schemes.\n\nDo not collect five compilations – one source revised three times beats five sources read once.",
          bn: "- **একটি জাতীয় সংবাদপত্র** (যেমন The Hindu বা The Indian Express) – শুধু পরীক্ষার উপযোগী খবর পড়ুন, দিনে 30–40 মিনিট।\n- প্রকল্প ও মন্ত্রকের সরকারি নাম এবং উদ্বোধনের তথ্যের জন্য **PIB (প্রেস ইনফরমেশন ব্যুরো)**-র বিজ্ঞপ্তি।\n- রিভিশনের জন্য কোনো পরিচিত প্রকাশকের **একটি মাসিক সংকলন**।\n- WBCS/WBPSC-র জন্য রাজ্যের খবর ও রাজ্য সরকারের প্রকল্পের জন্য একটি **বাংলা দৈনিক** যোগ করুন।\n\nপাঁচটি সংকলন জমাবেন না – একটি উৎস তিনবার রিভিশন করা পাঁচটি উৎস একবার পড়ার চেয়ে ভালো।",
        },
      },
      {
        title: { en: "Make monthly notes in fixed categories", bn: "নির্দিষ্ট বিভাগে মাসিক নোট তৈরি করুন" },
        body: {
          en: "Use the same headings every month so revision is quick:\n\n1. **Appointments** (post – organisation – person)\n2. **Awards and honours** (award – field – given by – winner)\n3. **Sports** (event – venue – winner – trophy)\n4. **Government schemes** (name – ministry – objective – beneficiaries)\n5. **Summits and organisations** (summit – host city/country – theme)\n6. **Reports and indices** (index – publisher – India's position)\n7. **Science, defence and space** (mission/exercise – agency – partner country)\n8. **Important days, books and authors, obituaries**\n\nWrite one line per item – a table is better than paragraphs.",
          bn: "প্রতি মাসে একই শিরোনাম ব্যবহার করুন, যাতে রিভিশন দ্রুত হয়:\n\n1. **নিয়োগ** (পদ – সংস্থা – ব্যক্তি)\n2. **পুরস্কার ও সম্মান** (পুরস্কার – ক্ষেত্র – কে দেয় – প্রাপক)\n3. **খেলাধুলা** (প্রতিযোগিতা – স্থান – বিজয়ী – ট্রফি)\n4. **সরকারি প্রকল্প** (নাম – মন্ত্রক – উদ্দেশ্য – সুবিধাভোগী)\n5. **শীর্ষ সম্মেলন ও সংস্থা** (সম্মেলন – আয়োজক শহর/দেশ – মূল ভাবনা)\n6. **রিপোর্ট ও সূচক** (সূচক – প্রকাশক – ভারতের স্থান)\n7. **বিজ্ঞান, প্রতিরক্ষা ও মহাকাশ** (অভিযান/মহড়া – সংস্থা – অংশীদার দেশ)\n8. **গুরুত্বপূর্ণ দিবস, বই ও লেখক, প্রয়াণ**\n\nপ্রতিটি বিষয় এক লাইনে লিখুন – অনুচ্ছেদের চেয়ে সারণি ভালো।",
        },
      },
      {
        title: { en: "Revise with a 1-7-30 cycle and practise MCQs", bn: "1-7-30 চক্রে রিভিশন ও MCQ অনুশীলন" },
        body: {
          en: "Revise each day's notes the **next day**, again at the **end of the week**, and again at the **end of the month**. Then solve 50–100 current-affairs MCQs on that month. In the last month before the exam, revise only your own monthly notes for the whole 6–12 month window.",
          bn: "প্রতিদিনের নোট **পরের দিন**, আবার **সপ্তাহের শেষে** এবং আবার **মাসের শেষে** রিভিশন করুন। তারপর সেই মাসের উপর 50–100টি MCQ সমাধান করুন। পরীক্ষার আগের শেষ মাসে পুরো 6–12 মাসের জন্য শুধু নিজের মাসিক নোটগুলিই রিভিশন করুন।",
        },
      },
      {
        title: { en: "Attach every news item to static GK", bn: "প্রতিটি খবরকে স্থায়ী সাধারণ জ্ঞানের সঙ্গে জুড়ুন" },
        body: {
          en: "When you note a news item, add one static fact next to it: a summit → the organisation's **headquarters and member count**; an award → **who gives it and since when**; a sports event → **the trophy and the governing body**; a scheme → **the ministry**. Exams frequently ask the static part even when the news is the trigger.",
          bn: "কোনো খবর নোট করার সময় তার পাশে একটি স্থায়ী তথ্য লিখুন: শীর্ষ সম্মেলন → সংস্থার **সদর দপ্তর ও সদস্যসংখ্যা**; পুরস্কার → **কে দেয় ও কবে থেকে**; খেলা → **ট্রফি ও পরিচালন সংস্থা**; প্রকল্প → **কোন মন্ত্রক**। খবরটি উপলক্ষ হলেও পরীক্ষায় প্রায়ই স্থায়ী অংশটাই জিজ্ঞাসা করা হয়।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Headquarters of key organisations (static)", bn: "প্রধান সংস্থাগুলির সদর দপ্তর (স্থায়ী)" },
        body: {
          en: "- **Geneva**: WHO, WTO, ILO\n- **Washington DC**: IMF, World Bank\n- **New York**: United Nations, UNICEF\n- **Paris**: UNESCO\n- **Rome**: FAO\n- **Jakarta**: ASEAN Secretariat\n- **Kathmandu**: SAARC Secretariat\n- **Manila**: Asian Development Bank\n\nGroup them by city – it is faster than learning them one by one.",
          bn: "- **জেনেভা**: WHO, WTO, ILO\n- **ওয়াশিংটন ডিসি**: IMF, বিশ্বব্যাংক\n- **নিউ ইয়র্ক**: রাষ্ট্রসংঘ, UNICEF\n- **প্যারিস**: UNESCO\n- **রোম**: FAO\n- **জাকার্তা**: ASEAN সচিবালয়\n- **কাঠমান্ডু**: SAARC সচিবালয়\n- **ম্যানিলা**: এশীয় উন্নয়ন ব্যাংক (ADB)\n\nশহর ধরে ধরে মনে রাখুন – একটি একটি করে শেখার চেয়ে দ্রুত।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Important days by month (static)", bn: "মাস অনুযায়ী গুরুত্বপূর্ণ দিবস (স্থায়ী)" },
        body: {
          en: "- **12 Jan** National Youth Day (Swami Vivekananda's birthday)\n- **28 Feb** National Science Day (Raman Effect)\n- **8 Mar** International Women's Day\n- **5 Jun** World Environment Day\n- **21 Jun** International Day of Yoga\n- **5 Sep** Teachers' Day (Dr. S. Radhakrishnan)\n- **2 Oct** Gandhi Jayanti / International Day of Non-Violence\n- **14 Nov** Children's Day (Jawaharlal Nehru)\n\nEach year only the **theme** changes – note the theme in your monthly notes.",
          bn: "- **12 জানুয়ারি** জাতীয় যুব দিবস (স্বামী বিবেকানন্দের জন্মদিন)\n- **28 ফেব্রুয়ারি** জাতীয় বিজ্ঞান দিবস (রামন এফেক্ট)\n- **8 মার্চ** আন্তর্জাতিক নারী দিবস\n- **5 জুন** বিশ্ব পরিবেশ দিবস\n- **21 জুন** আন্তর্জাতিক যোগ দিবস\n- **5 সেপ্টেম্বর** শিক্ষক দিবস (ড. সর্বপল্লী রাধাকৃষ্ণণ)\n- **2 অক্টোবর** গান্ধী জয়ন্তী / আন্তর্জাতিক অহিংসা দিবস\n- **14 নভেম্বর** শিশু দিবস (জওহরলাল নেহরু)\n\nপ্রতি বছর শুধু **মূল ভাবনা (থিম)** বদলায় – সেটি মাসিক নোটে লিখে রাখুন।",
        },
      },
      {
        title: { en: "Award → field → giver (static)", bn: "পুরস্কার → ক্ষেত্র → প্রদানকারী (স্থায়ী)" },
        body: {
          en: "- **Bharat Ratna** – highest civilian award of India (instituted 1954)\n- **Jnanpith Award** – literature\n- **Dadasaheb Phalke Award** – lifetime contribution to Indian cinema\n- **Major Dhyan Chand Khel Ratna** – highest sports honour; **Arjuna Award** – outstanding sportspersons; **Dronacharya Award** – coaches\n\nWith this frame, a news item about a winner instantly tells you the field.",
          bn: "- **ভারতরত্ন** – ভারতের সর্বোচ্চ বেসামরিক সম্মান (1954 সালে প্রবর্তিত)\n- **জ্ঞানপীঠ পুরস্কার** – সাহিত্য\n- **দাদাসাহেব ফালকে পুরস্কার** – ভারতীয় চলচ্চিত্রে আজীবন অবদান\n- **মেজর ধ্যানচাঁদ খেলরত্ন** – খেলাধুলার সর্বোচ্চ সম্মান; **অর্জুন পুরস্কার** – বিশিষ্ট খেলোয়াড়; **দ্রোণাচার্য পুরস্কার** – প্রশিক্ষক\n\nএই কাঠামো মাথায় থাকলে কোনো প্রাপকের খবর দেখেই ক্ষেত্রটি বোঝা যায়।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Report vs publisher confusion.** Indices are asked as 'who publishes it'. Example (stable): the **Human Development Index** is published by **UNDP**; the **Global Gender Gap Report** by the **World Economic Forum**; the **World Economic Outlook** by the **IMF**. Note the publisher every time you note a rank.",
        bn: "**রিপোর্ট ও প্রকাশক গুলিয়ে ফেলা।** সূচক নিয়ে প্রায়ই জিজ্ঞাসা করা হয় 'কে প্রকাশ করে'। উদাহরণ (স্থায়ী): **মানব উন্নয়ন সূচক** প্রকাশ করে **UNDP**; **গ্লোবাল জেন্ডার গ্যাপ রিপোর্ট** প্রকাশ করে **ওয়ার্ল্ড ইকোনমিক ফোরাম**; **ওয়ার্ল্ড ইকোনমিক আউটলুক** প্রকাশ করে **IMF**। প্রতিবার র‍্যাঙ্ক লেখার সময় প্রকাশকের নামও লিখুন।",
      },
      {
        en: "**Report year vs release year.** A report titled with one year is often released in the next (or covers the previous) year. Write both the **edition** and the **month of release** in your notes so you do not pick an outdated edition's rank.",
        bn: "**রিপোর্টের নামের বছর ও প্রকাশের বছর আলাদা হতে পারে।** কোনো রিপোর্টের নামে যে বছর থাকে, তা প্রায়ই পরের বছরে প্রকাশিত হয় (বা আগের বছরের তথ্য দেয়)। নোটে **সংস্করণ** ও **প্রকাশের মাস** দুটিই লিখুন, যাতে পুরনো সংস্করণের র‍্যাঙ্ক বেছে না ফেলেন।",
      },
      {
        en: "**Similar-sounding days.** National Science Day (**28 February**, Raman Effect) is different from National Technology Day (**11 May**, Pokhran tests of 1998). Teachers' Day in India is **5 September**, while World Teachers' Day is **5 October**.",
        bn: "**একই রকম শোনায় এমন দিবস।** জাতীয় বিজ্ঞান দিবস (**28 ফেব্রুয়ারি**, রামন এফেক্ট) আর জাতীয় প্রযুক্তি দিবস (**11 মে**, 1998-এর পোখরান পরীক্ষা) আলাদা। ভারতে শিক্ষক দিবস **5 সেপ্টেম্বর**, কিন্তু বিশ্ব শিক্ষক দিবস **5 অক্টোবর**।",
      },
      {
        en: "**Out-of-date notes.** Appointments and office holders change. Before the exam, re-check your appointments list against the latest monthly compilation instead of trusting notes made a year earlier.",
        bn: "**পুরনো নোটের ফাঁদ।** নিয়োগ ও পদাধিকারী বদলে যায়। পরীক্ষার আগে এক বছর আগের নোটের উপর ভরসা না করে নিয়োগের তালিকা সর্বশেষ মাসিক সংকলনের সঙ্গে মিলিয়ে নিন।",
      },
    ],
  },

  // ───────────────────────────── Banking Awareness ─────────────────────────────
  {
    subject: 'gs',
    topic: 'banking_awareness',
    title: { en: "Banking Awareness", bn: "ব্যাংকিং সচেতনতা", hi: "बैंकिंग जागरूकता" },
    overview: {
      en: "Banking Awareness is asked mainly in **IBPS and SBI PO/Clerk mains** and in insurance and RBI exams. It has two layers: **static banking** (history of RBI and nationalisation, monetary policy tools, types of banks, payment systems, regulators, key terms like NPA and CRR) and **banking current affairs** (latest policy decisions, mergers, new schemes). Master the static layer first – every current news item makes sense only once you know what repo, CRR or a payments bank means. Learn **definitions precisely**, since options differ by one word ('lends to' vs 'borrows from'). Keep actual current rates in your current-affairs notes and update them after every RBI policy review.",
      bn: "ব্যাংকিং সচেতনতা মূলত **IBPS ও SBI PO/ক্লার্কের মেইনস** এবং বিমা ও RBI-এর পরীক্ষায় জিজ্ঞাসা করা হয়। এর দুটি স্তর: **স্থায়ী ব্যাংকিং** (RBI ও জাতীয়করণের ইতিহাস, আর্থিক নীতির হাতিয়ার, ব্যাংকের প্রকারভেদ, লেনদেন ব্যবস্থা, নিয়ন্ত্রক সংস্থা, NPA ও CRR-এর মতো পরিভাষা) এবং **ব্যাংকিং সংক্রান্ত সাম্প্রতিক ঘটনা** (সাম্প্রতিক নীতিগত সিদ্ধান্ত, সংযুক্তি, নতুন প্রকল্প)। আগে স্থায়ী অংশটি ভালো করে শিখুন – রেপো, CRR বা পেমেন্টস ব্যাংক কী তা জানলে তবেই সাম্প্রতিক খবর বোঝা যায়। **সংজ্ঞা নিখুঁতভাবে** শিখুন, কারণ বিকল্পগুলি একটি শব্দে আলাদা হয় ('ধার দেয়' বনাম 'ধার নেয়')। প্রকৃত বর্তমান হারগুলি সাম্প্রতিক ঘটনার নোটে রাখুন এবং RBI-এর প্রতিটি নীতি পর্যালোচনার পর তা হালনাগাদ করুন।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "RBI and banking history timeline", bn: "RBI ও ব্যাংকিং ইতিহাসের সময়রেখা" },
        body: {
          en: "- **1934** – RBI Act passed (on the recommendation of the Hilton Young Commission)\n- **1 April 1935** – RBI established; HQ first in **Calcutta**, moved to **Mumbai** in 1937\n- **1 January 1949** – RBI nationalised\n- **1955** – Imperial Bank of India became the **State Bank of India**\n- **1969** – 14 major banks nationalised; **1980** – 6 more\n- **1975** – Regional Rural Banks set up\n- **1982** – NABARD set up (agriculture and rural credit)",
          bn: "- **1934** – RBI আইন পাস (হিলটন ইয়ং কমিশনের সুপারিশে)\n- **1 এপ্রিল 1935** – RBI প্রতিষ্ঠা; সদর দপ্তর প্রথমে **কলকাতায়**, 1937-এ **মুম্বাইয়ে** স্থানান্তরিত\n- **1 জানুয়ারি 1949** – RBI-এর জাতীয়করণ\n- **1955** – ইম্পেরিয়াল ব্যাংক অফ ইন্ডিয়া হয় **স্টেট ব্যাংক অফ ইন্ডিয়া**\n- **1969** – 14টি বড় ব্যাংকের জাতীয়করণ; **1980** – আরও 6টি\n- **1975** – আঞ্চলিক গ্রামীণ ব্যাংক (RRB) গঠন\n- **1982** – NABARD গঠন (কৃষি ও গ্রামীণ ঋণ)",
        },
      },
      {
        title: { en: "Monetary policy tools: quantitative vs qualitative", bn: "আর্থিক নীতির হাতিয়ার: পরিমাণগত ও গুণগত" },
        body: {
          en: "**Quantitative** (control the total money supply):\n\n- **Repo rate** – rate at which RBI **lends** short-term money to banks against government securities\n- **Reverse repo rate** – rate at which RBI **borrows** from banks\n- **CRR** – share of deposits banks must keep as **cash with the RBI** (earns no interest)\n- **SLR** – share of deposits banks must keep **with themselves** in liquid assets (cash, gold, approved government securities)\n- **Bank rate**, **MSF**, **Open Market Operations** (buying/selling government securities)\n\n**Qualitative** (direct credit to specific uses): margin requirements, moral suasion, credit rationing, selective credit control.",
          bn: "**পরিমাণগত** (মোট অর্থের জোগান নিয়ন্ত্রণ করে):\n\n- **রেপো রেট** – সরকারি ঋণপত্র জামানত রেখে যে হারে RBI ব্যাংকগুলিকে স্বল্পমেয়াদি **ঋণ দেয়**\n- **রিভার্স রেপো রেট** – যে হারে RBI ব্যাংকগুলির কাছ থেকে **ঋণ নেয়**\n- **CRR** – আমানতের যে অংশ ব্যাংককে **RBI-এর কাছে নগদ** রাখতে হয় (কোনো সুদ মেলে না)\n- **SLR** – আমানতের যে অংশ ব্যাংককে **নিজের কাছে** তরল সম্পদ (নগদ, সোনা, অনুমোদিত সরকারি ঋণপত্র) হিসেবে রাখতে হয়\n- **ব্যাংক রেট**, **MSF**, **খোলা বাজারের কার্যক্রম (OMO)** (সরকারি ঋণপত্র কেনাবেচা)\n\n**গুণগত** (নির্দিষ্ট খাতে ঋণ পরিচালনা করে): মার্জিন নির্ধারণ, নৈতিক প্ররোচনা (মরাল সুয়েশন), ঋণ রেশনিং, নির্বাচিত ঋণ নিয়ন্ত্রণ।",
        },
      },
      {
        title: { en: "Know the regulators and development banks", bn: "নিয়ন্ত্রক সংস্থা ও উন্নয়ন ব্যাংকগুলি চিনে নিন" },
        body: {
          en: "- **RBI** – banks, NBFCs, payment systems\n- **SEBI** – stock markets and mutual funds (statutory since 1992)\n- **IRDAI** – insurance\n- **PFRDA** – pension (National Pension System)\n\nDevelopment institutions: **NABARD** (agriculture/rural, Mumbai), **SIDBI** (MSME, Lucknow), **EXIM Bank** (foreign trade, Mumbai), **NHB** (housing finance, New Delhi).",
          bn: "- **RBI** – ব্যাংক, NBFC, লেনদেন ব্যবস্থা\n- **SEBI** – শেয়ারবাজার ও মিউচুয়াল ফান্ড (1992 থেকে বিধিবদ্ধ সংস্থা)\n- **IRDAI** – বিমা\n- **PFRDA** – পেনশন (জাতীয় পেনশন ব্যবস্থা)\n\nউন্নয়ন প্রতিষ্ঠান: **NABARD** (কৃষি/গ্রামীণ, মুম্বাই), **SIDBI** (ক্ষুদ্র ও মাঝারি শিল্প, লখনউ), **EXIM ব্যাংক** (বৈদেশিক বাণিজ্য, মুম্বাই), **NHB** (গৃহঋণ, নয়াদিল্লি)।",
        },
      },
      {
        title: { en: "Payment systems compared", bn: "লেনদেন ব্যবস্থার তুলনা" },
        body: {
          en: "- **NEFT** – settled in **batches** (half-hourly); no minimum amount\n- **RTGS** – settled **one by one in real time**; meant for large values, minimum **₹2 lakh**\n- **IMPS** – instant, round-the-clock transfer, run by **NPCI**\n- **UPI** – mobile-based instant payments, also run by **NPCI** (launched 2016)\n\nNPCI also runs **RuPay** cards. Ask yourself for each: who operates it, is it batch or real-time, is there a minimum?",
          bn: "- **NEFT** – **ব্যাচে** নিষ্পত্তি (প্রতি আধ ঘণ্টায়); কোনো ন্যূনতম অঙ্ক নেই\n- **RTGS** – **প্রতিটি লেনদেন আলাদাভাবে, তাৎক্ষণিক** নিষ্পত্তি; বড় অঙ্কের জন্য, ন্যূনতম **₹2 লক্ষ**\n- **IMPS** – তাৎক্ষণিক, সর্বক্ষণ চালু, পরিচালনা করে **NPCI**\n- **UPI** – মোবাইল-ভিত্তিক তাৎক্ষণিক লেনদেন, এটিও **NPCI** পরিচালিত (2016 সালে চালু)\n\n**RuPay** কার্ডও NPCI চালায়। প্রতিটির জন্য নিজেকে প্রশ্ন করুন: কে পরিচালনা করে, ব্যাচে না তাৎক্ষণিক, ন্যূনতম অঙ্ক আছে কি?",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Repo = RBI gives; Reverse repo = RBI receives", bn: "রেপো = RBI দেয়; রিভার্স রেপো = RBI নেয়" },
        body: {
          en: "Look from the **bank's** side: under **repo** the bank sells securities to RBI and gets money (RBI lends). Under **reverse repo** the bank parks surplus money with RBI (RBI borrows). Higher repo → costlier loans → less money in the economy.",
          bn: "**ব্যাংকের** দিক থেকে দেখুন: **রেপোতে** ব্যাংক RBI-কে ঋণপত্র বিক্রি করে টাকা পায় (RBI ঋণ দেয়)। **রিভার্স রেপোতে** ব্যাংক বাড়তি টাকা RBI-এর কাছে রাখে (RBI ঋণ নেয়)। রেপো বাড়লে → ঋণ দামি হয় → বাজারে টাকার জোগান কমে।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "CRR = Cash with RBI; SLR = Self (bank keeps it)", bn: "CRR = RBI-এর কাছে নগদ; SLR = নিজের (ব্যাংকের) কাছে" },
        body: {
          en: "**C**RR → **C**ash, kept with the **C**entral bank. **S**LR → kept with the bank **S**elf, in **S**ecurities, gold or cash.",
          bn: "**C**RR → **C**ash (নগদ), রাখা হয় **C**entral bank (কেন্দ্রীয় ব্যাংক)-এর কাছে। **S**LR → ব্যাংক **S**elf (নিজের কাছে) রাখে, **S**ecurities (ঋণপত্র), সোনা বা নগদ আকারে।",
        },
      },
      {
        title: { en: "Nationalisation: 14 in '69, 6 in '80", bn: "জাতীয়করণ: '69-এ 14, '80-তে 6" },
        body: {
          en: "**1969 → 14 banks**, **1980 → 6 banks**. RBI itself was nationalised earlier, on **1 January 1949**.",
          bn: "**1969 → 14টি ব্যাংক**, **1980 → 6টি ব্যাংক**। RBI নিজে তার আগেই, **1 জানুয়ারি 1949**-এ জাতীয়করণ হয়।",
        },
      },
      {
        title: { en: "NPA = 90 days", bn: "NPA = 90 দিন" },
        body: {
          en: "A loan becomes a **Non-Performing Asset** when interest or principal remains **overdue for more than 90 days**. NPA categories by age: **substandard → doubtful → loss** assets.",
          bn: "সুদ বা আসল **90 দিনের বেশি বকেয়া** থাকলে ঋণটি **অনুৎপাদক সম্পদ (NPA)** হয়ে যায়। সময় অনুযায়ী NPA-র শ্রেণি: **সাবস্ট্যান্ডার্ড → ডাউটফুল → লস** সম্পদ।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Repo vs reverse repo.** Repo: RBI **lends** to banks. Reverse repo: RBI **borrows** from banks. Options flip the direction – always ask 'who is giving the money?'.",
        bn: "**রেপো ও রিভার্স রেপো আলাদা।** রেপো: RBI ব্যাংককে **ঋণ দেয়**। রিভার্স রেপো: RBI ব্যাংকের কাছ থেকে **ঋণ নেয়**। বিকল্পে দিক উল্টে দেওয়া থাকে – সবসময় প্রশ্ন করুন 'টাকা কে দিচ্ছে?'।",
      },
      {
        en: "**CRR vs SLR.** CRR is kept as **cash with the RBI** and earns no interest; SLR is kept by the bank **itself** as cash, gold or government securities. Government securities count for SLR, never for CRR.",
        bn: "**CRR ও SLR আলাদা।** CRR রাখা হয় **RBI-এর কাছে নগদে** এবং কোনো সুদ মেলে না; SLR ব্যাংক **নিজের কাছে** নগদ, সোনা বা সরকারি ঋণপত্র হিসেবে রাখে। সরকারি ঋণপত্র SLR-এ গণ্য হয়, CRR-এ কখনও নয়।",
      },
      {
        en: "**Payments bank vs small finance bank.** A payments bank can accept deposits (within a cap) and offer remittances and debit cards, but **cannot give loans or issue credit cards**. A small finance bank **can** lend.",
        bn: "**পেমেন্টস ব্যাংক ও স্মল ফিনান্স ব্যাংক আলাদা।** পেমেন্টস ব্যাংক (নির্দিষ্ট সীমার মধ্যে) আমানত নিতে, টাকা পাঠাতে ও ডেবিট কার্ড দিতে পারে, কিন্তু **ঋণ দিতে বা ক্রেডিট কার্ড দিতে পারে না**। স্মল ফিনান্স ব্যাংক ঋণ **দিতে পারে**।",
      },
      {
        en: "**Scheduled bank** means a bank listed in the **Second Schedule of the RBI Act, 1934** – not the Second Schedule of the Constitution or the Banking Regulation Act.",
        bn: "**তফসিলি ব্যাংক (Scheduled bank)** মানে **RBI আইন, 1934-এর দ্বিতীয় তফসিলে** তালিকাভুক্ত ব্যাংক – সংবিধান বা ব্যাংকিং রেগুলেশন অ্যাক্টের দ্বিতীয় তফসিল নয়।",
      },
    ],
  },

  // ───────────────────────────── West Bengal GK ─────────────────────────────
  {
    subject: 'gs',
    topic: 'west_bengal_gk',
    title: { en: "West Bengal GK", bn: "পশ্চিমবঙ্গ সাধারণ জ্ঞান", hi: "पश्चिम बंगाल सामान्य ज्ञान" },
    overview: {
      en: "West Bengal GK is essential for **WBCS, WBPSC Clerkship, WB Police and the WB Postal circle**. It covers the state's **geography** (rivers, physiographic regions, forests and national parks), **history** (Plassey, the Bengal Renaissance, the Partition of 1905, revolutionaries), **culture** (festivals, folk forms, literature) and **heritage sites**. Study it district- and region-wise with a map of the state: North Bengal hills and Dooars, the Rarh plateau in the west, the Gangetic delta and the Sundarbans in the south. Link every reformer or freedom fighter to one institution or event they are known for. Skip numbers that change (number of districts, population figures) unless you check the latest official source.",
      bn: "**WBCS, WBPSC ক্লার্কশিপ, WB পুলিশ ও পশ্চিমবঙ্গ পোস্টাল সার্কেলের** পরীক্ষায় পশ্চিমবঙ্গ সাধারণ জ্ঞান অপরিহার্য। এতে রাজ্যের **ভূগোল** (নদী, প্রাকৃতিক বিভাগ, বনাঞ্চল ও জাতীয় উদ্যান), **ইতিহাস** (পলাশি, বাংলার নবজাগরণ, 1905-এর বঙ্গভঙ্গ, বিপ্লবী), **সংস্কৃতি** (উৎসব, লোকশিল্প, সাহিত্য) এবং **ঐতিহ্যবাহী স্থান** অন্তর্ভুক্ত। রাজ্যের মানচিত্র নিয়ে জেলা ও অঞ্চল ধরে পড়ুন: উত্তরবঙ্গের পার্বত্য অঞ্চল ও ডুয়ার্স, পশ্চিমের রাঢ় মালভূমি, দক্ষিণের গাঙ্গেয় বদ্বীপ ও সুন্দরবন। প্রতিটি সমাজসংস্কারক বা স্বাধীনতা সংগ্রামীকে একটি প্রতিষ্ঠান বা ঘটনার সঙ্গে জুড়ে মনে রাখুন। যে সংখ্যা বদলায় (জেলার সংখ্যা, জনসংখ্যা) তা সর্বশেষ সরকারি উৎস না দেখে মুখস্থ করবেন না।",
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: "Locate the state: borders and regions", bn: "রাজ্যের অবস্থান: সীমানা ও অঞ্চল" },
        body: {
          en: "- **International borders (3)**: Bangladesh, Nepal, Bhutan\n- **State borders (5)**: Odisha, Jharkhand, Bihar, Sikkim, Assam\n- The **Tropic of Cancer** passes through the state.\n- Regions north to south: **Darjeeling Himalaya** (highest point **Sandakphu**, on the Singalila ridge) → **Terai and Dooars** → **North Bengal plains** → **Rarh / western plateau** (Purulia, Bankura) → **Gangetic delta** → **Sundarbans** on the coast of the Bay of Bengal.",
          bn: "- **আন্তর্জাতিক সীমানা (3টি দেশ)**: বাংলাদেশ, নেপাল, ভুটান\n- **রাজ্য সীমানা (5টি রাজ্য)**: ওড়িশা, ঝাড়খণ্ড, বিহার, সিকিম, অসম\n- **কর্কটক্রান্তি রেখা** এই রাজ্যের উপর দিয়ে গেছে।\n- উত্তর থেকে দক্ষিণে অঞ্চল: **দার্জিলিং হিমালয়** (সর্বোচ্চ শৃঙ্গ **সান্দাকফু**, সিঙ্গালিলা শৈলশিরায়) → **তরাই ও ডুয়ার্স** → **উত্তরবঙ্গের সমভূমি** → **রাঢ় / পশ্চিমের মালভূমি** (পুরুলিয়া, বাঁকুড়া) → **গাঙ্গেয় বদ্বীপ** → বঙ্গোপসাগরের উপকূলে **সুন্দরবন**।",
        },
      },
      {
        title: { en: "Rivers of Bengal by region", bn: "অঞ্চল অনুযায়ী বাংলার নদী" },
        body: {
          en: "- The **Ganga** divides near Farakka: the **Bhagirathi–Hooghly** flows south through West Bengal, while the main stream enters Bangladesh as the **Padma**. The **Farakka Barrage** (Murshidabad district) diverts water into the Hooghly.\n- **North Bengal**: Teesta, Torsa, Jaldhaka, Mahananda.\n- **Western plateau rivers** (flowing east/south-east): **Damodar**, Ajay, Mayurakshi, Kangsabati (Kasai), Dwarakeswar, Subarnarekha.\n- The **Damodar** was called the **'Sorrow of Bengal'** for its floods; the **Damodar Valley Corporation (1948)** was modelled on the **Tennessee Valley Authority (USA)**.",
          bn: "- **গঙ্গা** ফরাক্কার কাছে দুই ভাগ হয়: **ভাগীরথী–হুগলি** দক্ষিণে পশ্চিমবঙ্গের মধ্য দিয়ে বয়ে যায়, আর মূল প্রবাহ **পদ্মা** নামে বাংলাদেশে প্রবেশ করে। **ফরাক্কা ব্যারেজ** (মুর্শিদাবাদ জেলা) হুগলিতে জল পাঠায়।\n- **উত্তরবঙ্গ**: তিস্তা, তোর্সা, জলঢাকা, মহানন্দা।\n- **পশ্চিমের মালভূমির নদী** (পূর্ব/দক্ষিণ-পূর্বে প্রবাহিত): **দামোদর**, অজয়, ময়ূরাক্ষী, কংসাবতী (কাঁসাই), দ্বারকেশ্বর, সুবর্ণরেখা।\n- বন্যার জন্য **দামোদরকে 'বাংলার দুঃখ'** বলা হত; **দামোদর ভ্যালি কর্পোরেশন (1948)** গঠিত হয় আমেরিকার **টেনেসি ভ্যালি অথরিটির** আদর্শে।",
        },
      },
      {
        title: { en: "Bengal Renaissance: person → institution/reform", bn: "বাংলার নবজাগরণ: ব্যক্তি → প্রতিষ্ঠান/সংস্কার" },
        body: {
          en: "- **Raja Rammohan Roy** – Brahmo Sabha (1828); campaigned against Sati, which was abolished in **1829** under Lord William Bentinck\n- **Ishwar Chandra Vidyasagar** – widow remarriage (**Hindu Widows' Remarriage Act, 1856**); *Barnaparichay*\n- **Swami Vivekananda** – Chicago Parliament of Religions (**1893**); **Ramakrishna Mission (1897)**\n- **Bankim Chandra Chattopadhyay** – *Vande Mataram*, in the novel *Anandamath*\n- **Rabindranath Tagore** – **Nobel Prize in Literature, 1913** (*Gitanjali*); founded **Visva-Bharati** at Santiniketan; composed India's national anthem *Jana Gana Mana*\n- **Sir William Jones** – **Asiatic Society**, Calcutta (**1784**)",
          bn: "- **রাজা রামমোহন রায়** – ব্রাহ্মসভা (1828); সতীদাহের বিরুদ্ধে আন্দোলন, লর্ড উইলিয়াম বেন্টিঙ্কের আমলে **1829** সালে সতীদাহ নিষিদ্ধ হয়\n- **ঈশ্বরচন্দ্র বিদ্যাসাগর** – বিধবা বিবাহ (**হিন্দু বিধবা পুনর্বিবাহ আইন, 1856**); *বর্ণপরিচয়*\n- **স্বামী বিবেকানন্দ** – শিকাগো ধর্ম মহাসভা (**1893**); **রামকৃষ্ণ মিশন (1897)**\n- **বঙ্কিমচন্দ্র চট্টোপাধ্যায়** – *বন্দে মাতরম্*, *আনন্দমঠ* উপন্যাসে\n- **রবীন্দ্রনাথ ঠাকুর** – **1913 সালে সাহিত্যে নোবেল পুরস্কার** (*গীতাঞ্জলি*); শান্তিনিকেতনে **বিশ্বভারতী** প্রতিষ্ঠা; ভারতের জাতীয় সংগীত *জনগণমন*-র রচয়িতা\n- **স্যার উইলিয়াম জোন্স** – **এশিয়াটিক সোসাইটি**, কলকাতা (**1784**)",
        },
      },
      {
        title: { en: "Heritage and protected areas list", bn: "ঐতিহ্যবাহী স্থান ও সংরক্ষিত অঞ্চলের তালিকা" },
        body: {
          en: "- **UNESCO World Heritage**: **Sundarbans National Park** (1987), **Darjeeling Himalayan Railway** (1999, part of the Mountain Railways of India), **Santiniketan** (2023)\n- **UNESCO Intangible Cultural Heritage**: **Durga Puja in Kolkata** (2021); also **Chhau dance** (Purulia Chhau is one of its forms) and **Baul songs**\n- **National parks / reserves**: **Jaldapara** and **Gorumara** (one-horned rhinoceros), **Buxa Tiger Reserve**, **Neora Valley**, **Singalila**, **Sundarbans** (Royal Bengal tiger, mangroves)\n- **Darjeeling tea** was India's **first GI-tagged product**.",
          bn: "- **UNESCO বিশ্ব ঐতিহ্য**: **সুন্দরবন জাতীয় উদ্যান** (1987), **দার্জিলিং হিমালয়ান রেলওয়ে** (1999, ভারতের পার্বত্য রেলপথের অংশ), **শান্তিনিকেতন** (2023)\n- **UNESCO অধরা সাংস্কৃতিক ঐতিহ্য**: **কলকাতার দুর্গাপুজো** (2021); এছাড়া **ছৌ নাচ** (পুরুলিয়ার ছৌ তার একটি রূপ) ও **বাউল গান**\n- **জাতীয় উদ্যান / সংরক্ষিত অঞ্চল**: **জলদাপাড়া** ও **গরুমারা** (একশৃঙ্গ গন্ডার), **বক্সা ব্যাঘ্র প্রকল্প**, **নেওড়া ভ্যালি**, **সিঙ্গালিলা**, **সুন্দরবন** (রয়্যাল বেঙ্গল টাইগার, ম্যানগ্রোভ)\n- **দার্জিলিং চা** ভারতের **প্রথম GI ট্যাগপ্রাপ্ত পণ্য**।",
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: "Neighbours: '3 countries, 5 states'", bn: "প্রতিবেশী: '3টি দেশ, 5টি রাজ্য'" },
        body: {
          en: "Countries: **B-N-B** – **B**angladesh, **N**epal, **B**hutan. States, going clockwise from the south-west: **O**disha → **J**harkhand → **B**ihar → **S**ikkim → **A**ssam.",
          bn: "দেশ: **B-N-B** – **B**angladesh (বাংলাদেশ), **N**epal (নেপাল), **B**hutan (ভুটান)। রাজ্য, দক্ষিণ-পশ্চিম থেকে ঘড়ির কাঁটার দিকে: **ও**ড়িশা → **ঝা**ড়খণ্ড → **বি**হার → **সি**কিম → **অ**সম।",
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: "Rhino parks are in the Dooars", bn: "গন্ডারের উদ্যান ডুয়ার্সে" },
        body: {
          en: "One-horned rhino → **Jaldapara** (Alipurduar) and **Gorumara** (Jalpaiguri), both in the **Dooars**. Tiger → **Sundarbans** and **Buxa**. Red panda → **Neora Valley** and **Singalila** in the hills.",
          bn: "একশৃঙ্গ গন্ডার → **জলদাপাড়া** (আলিপুরদুয়ার) ও **গরুমারা** (জলপাইগুড়ি), দুটিই **ডুয়ার্সে**। বাঘ → **সুন্দরবন** ও **বক্সা**। রেড পান্ডা → পাহাড়ের **নেওড়া ভ্যালি** ও **সিঙ্গালিলা**।",
        },
      },
      {
        title: { en: "Bengal's political dates: 1757 – 1905 – 1911", bn: "বাংলার রাজনৈতিক সাল: 1757 – 1905 – 1911" },
        body: {
          en: "**1757** Plassey – Siraj-ud-Daulah defeated by Robert Clive (Mir Jafar's betrayal). **1905** Partition of Bengal by Lord Curzon → **Swadeshi movement**. **1911** Partition annulled and the capital of British India shifted from **Calcutta to Delhi** (announced at the Delhi Durbar).",
          bn: "**1757** পলাশি – রবার্ট ক্লাইভের কাছে সিরাজউদ্দৌলার পরাজয় (মীরজাফরের বিশ্বাসঘাতকতা)। **1905** লর্ড কার্জনের বঙ্গভঙ্গ → **স্বদেশি আন্দোলন**। **1911** বঙ্গভঙ্গ রদ এবং ব্রিটিশ ভারতের রাজধানী **কলকাতা থেকে দিল্লিতে** স্থানান্তর (দিল্লি দরবারে ঘোষণা)।",
        },
      },
    ],
    common_traps: [
      {
        en: "**Sandakphu vs Kangchenjunga.** Sandakphu is the **highest point of West Bengal**. Kangchenjunga is clearly visible from Darjeeling but lies on the **Sikkim–Nepal** border, not in West Bengal.",
        bn: "**সান্দাকফু ও কাঞ্চনজঙ্ঘা আলাদা।** সান্দাকফু **পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ**। দার্জিলিং থেকে কাঞ্চনজঙ্ঘা স্পষ্ট দেখা গেলেও তা **সিকিম–নেপাল** সীমান্তে অবস্থিত, পশ্চিমবঙ্গে নয়।",
      },
      {
        en: "**'Sorrow of Bengal' vs 'Sorrow of Bihar'.** The **Damodar** is the Sorrow of Bengal; the **Kosi** is the Sorrow of Bihar. Both are common paired options.",
        bn: "**'বাংলার দুঃখ' ও 'বিহারের দুঃখ' আলাদা।** **দামোদর** বাংলার দুঃখ; **কোশি** বিহারের দুঃখ। দুটিই প্রায়ই জোড়া বিকল্প হিসেবে আসে।",
      },
      {
        en: "**Who founded the INA?** The Indian National Army was first formed in 1942 (Mohan Singh, with Rash Behari Bose's support); **Netaji Subhas Chandra Bose took over its leadership in 1943** and formed the Azad Hind government. 'Founded by Netaji' is a frequent wrong option.",
        bn: "**আজাদ হিন্দ ফৌজ (INA) কে প্রতিষ্ঠা করেন?** 1942 সালে প্রথম INA গঠিত হয় (মোহন সিং, রাসবিহারী বসুর সহায়তায়); **1943 সালে নেতাজি সুভাষচন্দ্র বসু এর নেতৃত্ব গ্রহণ করেন** এবং আজাদ হিন্দ সরকার গঠন করেন। 'নেতাজি প্রতিষ্ঠা করেন' একটি প্রচলিত ভুল বিকল্প।",
      },
      {
        en: "**Hooghly vs Padma.** After the Ganga divides, the stream flowing through Kolkata is the **Bhagirathi–Hooghly**; the **Padma** is the main channel that flows into **Bangladesh**.",
        bn: "**হুগলি ও পদ্মা আলাদা।** গঙ্গা দুই ভাগ হওয়ার পর কলকাতার পাশ দিয়ে যে ধারা বয়ে যায় তা **ভাগীরথী–হুগলি**; **পদ্মা** হল মূল ধারা যা **বাংলাদেশে** প্রবাহিত হয়।",
      },
    ],
  },
];
