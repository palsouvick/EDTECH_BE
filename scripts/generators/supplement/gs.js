'use strict';

/**
 * General Studies: match-the-pair question families built from stable fact
 * tables (capitals, currencies, rivers, articles, symbols, units, inventors...).
 * Each table feeds one or two question forms; distractors come from the same
 * table so they are always plausible. A form hands out each question once, then
 * returns null (the runner treats that as "this chapter is exhausted").
 * Every pair is [english, bengali].
 */

const { shuffle, textOptions, build } = require('../common');

const P = (en, bn) => ({ en, bn });

/**
 * rows: [a, b] where a and b are { en, bn }.
 * forms: [{ q: (a) => ({en, bn}), pool: 'b' | 'a', ans: 'b' | 'a' ... }] - see below.
 */
function family({ topic, subtopic, tags, d = 1, rows, forms }) {
  const jobs = [];
  for (const form of forms) {
    for (const row of rows) {
      if (form.skip && form.skip(row)) continue;
      jobs.push({ form, row });
    }
  }
  let order = null;
  let next = 0;
  const gen = () => {
    order ??= shuffle(jobs);
    if (next >= order.length) return null;
    const { form, row } = order[next++];
    const [a, b] = row;
    const [given, answer] = form.reverse ? [b, a] : [a, b];
    const poolIdx = form.reverse ? 0 : 1;
    const pool = rows.map((r) => r[poolIdx]);
    const { correct, wrong } = textOptions(answer, pool);
    return build({
      topic,
      subtopic: subtopic.replace(/\s+/g, '_'),
      tags: ['gs-pairs', ...(tags || [])],
      difficulty: form.d || d,
      time: 30,
      stem: form.q(given),
      correct,
      wrong,
      steps: [form.e(a, b)],
    });
  };
  return { topic, weight: 1, gens: [gen], capacity: jobs.length };
}

// ------------------------------------------------------------------ geography
const STATE_CAPITALS = [
  [P('Arunachal Pradesh', 'অরুণাচল প্রদেশ'), P('Itanagar', 'ইটানগর')],
  [P('Assam', 'অসম'), P('Dispur', 'দিসপুর')],
  [P('Bihar', 'বিহার'), P('Patna', 'পাটনা')],
  [P('Chhattisgarh', 'ছত্তিশগড়'), P('Raipur', 'রায়পুর')],
  [P('Goa', 'গোয়া'), P('Panaji', 'পানাজি')],
  [P('Gujarat', 'গুজরাট'), P('Gandhinagar', 'গান্ধীনগর')],
  [P('Himachal Pradesh', 'হিমাচল প্রদেশ'), P('Shimla', 'শিমলা')],
  [P('Jharkhand', 'ঝাড়খণ্ড'), P('Ranchi', 'রাঁচি')],
  [P('Karnataka', 'কর্ণাটক'), P('Bengaluru', 'বেঙ্গালুরু')],
  [P('Kerala', 'কেরল'), P('Thiruvananthapuram', 'তিরুবনন্তপুরম')],
  [P('Madhya Pradesh', 'মধ্যপ্রদেশ'), P('Bhopal', 'ভোপাল')],
  [P('Maharashtra', 'মহারাষ্ট্র'), P('Mumbai', 'মুম্বই')],
  [P('Manipur', 'মণিপুর'), P('Imphal', 'ইম্ফল')],
  [P('Meghalaya', 'মেঘালয়'), P('Shillong', 'শিলং')],
  [P('Mizoram', 'মিজোরাম'), P('Aizawl', 'আইজল')],
  [P('Nagaland', 'নাগাল্যান্ড'), P('Kohima', 'কোহিমা')],
  [P('Odisha', 'ওড়িশা'), P('Bhubaneswar', 'ভুবনেশ্বর')],
  [P('Rajasthan', 'রাজস্থান'), P('Jaipur', 'জয়পুর')],
  [P('Sikkim', 'সিকিম'), P('Gangtok', 'গ্যাংটক')],
  [P('Tamil Nadu', 'তামিলনাড়ু'), P('Chennai', 'চেন্নাই')],
  [P('Telangana', 'তেলঙ্গানা'), P('Hyderabad', 'হায়দরাবাদ')],
  [P('Tripura', 'ত্রিপুরা'), P('Agartala', 'আগরতলা')],
  [P('Uttar Pradesh', 'উত্তরপ্রদেশ'), P('Lucknow', 'লখনউ')],
  [P('Uttarakhand', 'উত্তরাখণ্ড'), P('Dehradun', 'দেরাদুন')],
  [P('West Bengal', 'পশ্চিমবঙ্গ'), P('Kolkata', 'কলকাতা')],
];

const COUNTRY_CAPITALS = [
  [P('Japan', 'জাপান'), P('Tokyo', 'টোকিও')],
  [P('China', 'চীন'), P('Beijing', 'বেইজিং')],
  [P('Russia', 'রাশিয়া'), P('Moscow', 'মস্কো')],
  [P('United Kingdom', 'যুক্তরাজ্য'), P('London', 'লন্ডন')],
  [P('France', 'ফ্রান্স'), P('Paris', 'প্যারিস')],
  [P('Germany', 'জার্মানি'), P('Berlin', 'বার্লিন')],
  [P('Italy', 'ইতালি'), P('Rome', 'রোম')],
  [P('United States of America', 'মার্কিন যুক্তরাষ্ট্র'), P('Washington, D.C.', 'ওয়াশিংটন ডি.সি.')],
  [P('Canada', 'কানাডা'), P('Ottawa', 'অটোয়া')],
  [P('Australia', 'অস্ট্রেলিয়া'), P('Canberra', 'ক্যানবেরা')],
  [P('Egypt', 'মিশর'), P('Cairo', 'কায়রো')],
  [P('Saudi Arabia', 'সৌদি আরব'), P('Riyadh', 'রিয়াধ')],
  [P('Iran', 'ইরান'), P('Tehran', 'তেহরান')],
  [P('Iraq', 'ইরাক'), P('Baghdad', 'বাগদাদ')],
  [P('Pakistan', 'পাকিস্তান'), P('Islamabad', 'ইসলামাবাদ')],
  [P('Bangladesh', 'বাংলাদেশ'), P('Dhaka', 'ঢাকা')],
  [P('Nepal', 'নেপাল'), P('Kathmandu', 'কাঠমান্ডু')],
  [P('Bhutan', 'ভুটান'), P('Thimphu', 'থিম্পু')],
  [P('Afghanistan', 'আফগানিস্তান'), P('Kabul', 'কাবুল')],
  [P('Myanmar', 'মিয়ানমার'), P('Naypyidaw', 'নেপিদো')],
  [P('Thailand', 'থাইল্যান্ড'), P('Bangkok', 'ব্যাংকক')],
  [P('Malaysia', 'মালয়েশিয়া'), P('Kuala Lumpur', 'কুয়ালালামপুর')],
  [P('South Korea', 'দক্ষিণ কোরিয়া'), P('Seoul', 'সিওল')],
  [P('Switzerland', 'সুইজারল্যান্ড'), P('Bern', 'বার্ন')],
  [P('Turkey', 'তুরস্ক'), P('Ankara', 'আঙ্কারা')],
  [P('Brazil', 'ব্রাজিল'), P('Brasília', 'ব্রাসিলিয়া')],
  [P('Argentina', 'আর্জেন্টিনা'), P('Buenos Aires', 'বুয়েনস আইরেস')],
  [P('Kenya', 'কেনিয়া'), P('Nairobi', 'নাইরোবি')],
  [P('Maldives', 'মালদ্বীপ'), P('Malé', 'মালে')],
  [P('Cuba', 'কিউবা'), P('Havana', 'হাভানা')],
];

const NATIONAL_PARKS = [
  [P('Kaziranga National Park', 'কাজিরাঙ্গা জাতীয় উদ্যান'), P('Assam', 'অসম')],
  [P('Manas National Park', 'মানস জাতীয় উদ্যান'), P('Assam', 'অসম')],
  [P('Sundarbans National Park', 'সুন্দরবন জাতীয় উদ্যান'), P('West Bengal', 'পশ্চিমবঙ্গ')],
  [P('Jim Corbett National Park', 'জিম করবেট জাতীয় উদ্যান'), P('Uttarakhand', 'উত্তরাখণ্ড')],
  [P('Ranthambore National Park', 'রণথম্ভোর জাতীয় উদ্যান'), P('Rajasthan', 'রাজস্থান')],
  [P('Gir National Park', 'গির জাতীয় উদ্যান'), P('Gujarat', 'গুজরাট')],
  [P('Bandipur National Park', 'বান্দিপুর জাতীয় উদ্যান'), P('Karnataka', 'কর্ণাটক')],
  [P('Periyar National Park', 'পেরিয়ার জাতীয় উদ্যান'), P('Kerala', 'কেরল')],
  [P('Kanha National Park', 'কানহা জাতীয় উদ্যান'), P('Madhya Pradesh', 'মধ্যপ্রদেশ')],
  [P('Similipal National Park', 'সিমলিপাল জাতীয় উদ্যান'), P('Odisha', 'ওড়িশা')],
  [P('Keibul Lamjao National Park', 'কেইবুল লামজাও জাতীয় উদ্যান'), P('Manipur', 'মণিপুর')],
  [P('Namdapha National Park', 'নামদাফা জাতীয় উদ্যান'), P('Arunachal Pradesh', 'অরুণাচল প্রদেশ')],
  [P('Jaldapara National Park', 'জলদাপাড়া জাতীয় উদ্যান'), P('West Bengal', 'পশ্চিমবঙ্গ')],
  [P('Singalila National Park', 'সিঙ্গালিলা জাতীয় উদ্যান'), P('West Bengal', 'পশ্চিমবঙ্গ')],
  [P('Dachigam National Park', 'দাচিগাম জাতীয় উদ্যান'), P('Jammu and Kashmir', 'জম্মু ও কাশ্মীর')],
  [P('Nagarhole National Park', 'নাগারহোল জাতীয় উদ্যান'), P('Karnataka', 'কর্ণাটক')],
  [P('Pench National Park', 'পেঞ্চ জাতীয় উদ্যান'), P('Madhya Pradesh', 'মধ্যপ্রদেশ')],
  [P('Tadoba National Park', 'তাডোবা জাতীয় উদ্যান'), P('Maharashtra', 'মহারাষ্ট্র')],
];
const PARK_STATES = [
  P('Assam', 'অসম'), P('West Bengal', 'পশ্চিমবঙ্গ'), P('Uttarakhand', 'উত্তরাখণ্ড'), P('Rajasthan', 'রাজস্থান'),
  P('Gujarat', 'গুজরাট'), P('Karnataka', 'কর্ণাটক'), P('Kerala', 'কেরল'), P('Madhya Pradesh', 'মধ্যপ্রদেশ'),
  P('Odisha', 'ওড়িশা'), P('Manipur', 'মণিপুর'), P('Arunachal Pradesh', 'অরুণাচল প্রদেশ'),
  P('Jammu and Kashmir', 'জম্মু ও কাশ্মীর'), P('Maharashtra', 'মহারাষ্ট্র'), P('Tamil Nadu', 'তামিলনাড়ু'),
];

const RIVER_CITIES = [
  [P('Kolkata', 'কলকাতা'), P('Hooghly', 'হুগলি')],
  [P('Delhi', 'দিল্লি'), P('Yamuna', 'যমুনা')],
  [P('Varanasi', 'বারাণসী'), P('Ganga', 'গঙ্গা')],
  [P('Ahmedabad', 'আহমেদাবাদ'), P('Sabarmati', 'সবরমতী')],
  [P('Lucknow', 'লখনউ'), P('Gomti', 'গোমতী')],
  [P('Hyderabad', 'হায়দরাবাদ'), P('Musi', 'মুসি')],
  [P('Cuttack', 'কটক'), P('Mahanadi', 'মহানদী')],
  [P('Surat', 'সুরাত'), P('Tapi', 'তাপ্তী')],
  [P('Vijayawada', 'বিজয়ওয়াড়া'), P('Krishna', 'কৃষ্ণা')],
  [P('Nashik', 'নাসিক'), P('Godavari', 'গোদাবরী')],
  [P('Srinagar', 'শ্রীনগর'), P('Jhelum', 'ঝিলম')],
  [P('Ujjain', 'উজ্জয়িনী'), P('Shipra', 'শিপ্রা')],
  [P('Tiruchirappalli', 'তিরুচিরাপল্লি'), P('Kaveri', 'কাবেরী')],
  [P('Guwahati', 'গুয়াহাটি'), P('Brahmaputra', 'ব্রহ্মপুত্র')],
  [P('Jabalpur', 'জবলপুর'), P('Narmada', 'নর্মদা')],
  [P('Kota', 'কোটা'), P('Chambal', 'চম্বল')],
  [P('Ludhiana', 'লুধিয়ানা'), P('Sutlej', 'শতদ্রু')],
  [P('Asansol', 'আসানসোল'), P('Damodar', 'দামোদর')],
  [P('Siliguri', 'শিলিগুড়ি'), P('Mahananda', 'মহানন্দা')],
  [P('Ayodhya', 'অযোধ্যা'), P('Saryu', 'সরযূ')],
];

const DAMS = [
  [P('Bhakra Nangal Dam', 'ভাকরা নাঙ্গাল বাঁধ'), P('Sutlej', 'শতদ্রু')],
  [P('Hirakud Dam', 'হীরাকুদ বাঁধ'), P('Mahanadi', 'মহানদী')],
  [P('Tehri Dam', 'তেহরি বাঁধ'), P('Bhagirathi', 'ভাগীরথী')],
  [P('Sardar Sarovar Dam', 'সর্দার সরোবর বাঁধ'), P('Narmada', 'নর্মদা')],
  [P('Nagarjuna Sagar Dam', 'নাগার্জুন সাগর বাঁধ'), P('Krishna', 'কৃষ্ণা')],
  [P('Mettur Dam', 'মেট্টুর বাঁধ'), P('Kaveri', 'কাবেরী')],
  [P('Farakka Barrage', 'ফরাক্কা ব্যারাজ'), P('Ganga', 'গঙ্গা')],
  [P('Maithon Dam', 'মাইথন বাঁধ'), P('Barakar', 'বরাকর')],
  [P('Panchet Dam', 'পাঞ্চেত বাঁধ'), P('Damodar', 'দামোদর')],
  [P('Tilaiya Dam', 'তিলাইয়া বাঁধ'), P('Barakar', 'বরাকর')],
  [P('Mayurakshi (Massanjore) Dam', 'ময়ূরাক্ষী (মাসানজোড়) বাঁধ'), P('Mayurakshi', 'ময়ূরাক্ষী')],
  [P('Rana Pratap Sagar Dam', 'রাণাপ্রতাপ সাগর বাঁধ'), P('Chambal', 'চম্বল')],
  [P('Tungabhadra Dam', 'তুঙ্গভদ্রা বাঁধ'), P('Tungabhadra', 'তুঙ্গভদ্রা')],
  [P('Ukai Dam', 'উকাই বাঁধ'), P('Tapi', 'তাপ্তী')],
  [P('Kosi Barrage', 'কোসি ব্যারাজ'), P('Kosi', 'কোসি')],
];

// ------------------------------------------------------------------- polity
const ARTICLES = [
  ['14', P('Equality before law', 'আইনের দৃষ্টিতে সমতা')],
  ['15', P('Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth', 'ধর্ম, জাতি, বর্ণ, লিঙ্গ বা জন্মস্থানের ভিত্তিতে বৈষম্যের নিষেধ')],
  ['16', P('Equality of opportunity in public employment', 'সরকারি চাকরিতে সমান সুযোগ')],
  ['17', P('Abolition of untouchability', 'অস্পৃশ্যতার বিলোপ')],
  ['19', P('Protection of six freedoms, such as speech and expression', 'বাক্‌স্বাধীনতা প্রভৃতি ছয়টি স্বাধীনতার সুরক্ষা')],
  ['21', P('Protection of life and personal liberty', 'জীবন ও ব্যক্তিস্বাধীনতার সুরক্ষা')],
  ['21A', P('Right to free and compulsory education for children aged 6-14', '৬-১৪ বছর বয়সি শিশুদের বিনামূল্যে ও বাধ্যতামূলক শিক্ষার অধিকার')],
  ['23', P('Prohibition of traffic in human beings and forced labour', 'মানুষ কেনাবেচা ও বলপূর্বক শ্রমের নিষেধ')],
  ['24', P('Prohibition of employment of children in hazardous work', 'বিপজ্জনক কাজে শিশুদের নিয়োগের নিষেধ')],
  ['32', P('Right to constitutional remedies', 'সাংবিধানিক প্রতিকারের অধিকার')],
  ['40', P('Organisation of village panchayats', 'গ্রাম পঞ্চায়েত গঠন')],
  ['44', P('Uniform civil code for citizens', 'নাগরিকদের জন্য অভিন্ন দেওয়ানি বিধি')],
  ['51A', P('Fundamental duties of citizens', 'নাগরিকদের মৌলিক কর্তব্য')],
  ['76', P('Attorney General of India', 'ভারতের অ্যাটর্নি জেনারেল')],
  ['110', P('Definition of a Money Bill', 'অর্থবিলের সংজ্ঞা')],
  ['112', P('Annual Financial Statement (Budget)', 'বার্ষিক আর্থিক বিবৃতি (বাজেট)')],
  ['123', P('President\'s power to promulgate Ordinances', 'অধ্যাদেশ জারির ক্ষেত্রে রাষ্ট্রপতির ক্ষমতা')],
  ['124', P('Establishment and constitution of the Supreme Court', 'সুপ্রিম কোর্টের প্রতিষ্ঠা ও গঠন')],
  ['148', P('Comptroller and Auditor General of India', 'ভারতের নিয়ন্ত্রক ও মহাগণনিরীক্ষক')],
  ['280', P('Finance Commission', 'অর্থ কমিশন')],
  ['324', P('Superintendence and control of elections by the Election Commission', 'নির্বাচন কমিশন দ্বারা নির্বাচন পরিচালনা ও নিয়ন্ত্রণ')],
  ['352', P('Proclamation of National Emergency', 'জাতীয় জরুরি অবস্থা ঘোষণা')],
  ['356', P('Imposition of President\'s Rule in a state', 'রাজ্যে রাষ্ট্রপতি শাসন জারি')],
  ['360', P('Financial Emergency', 'আর্থিক জরুরি অবস্থা')],
  ['368', P('Power of Parliament to amend the Constitution', 'সংবিধান সংশোধনের জন্য সংসদের ক্ষমতা')],
].map(([n, p]) => [P(`Article ${n}`, `অনুচ্ছেদ ${n}`), p]);

// ---------------------------------------------------------- general science
const ELEMENTS = [
  ['Na', 'Sodium', 'সোডিয়াম'], ['K', 'Potassium', 'পটাশিয়াম'], ['Fe', 'Iron', 'লোহা'], ['Au', 'Gold', 'সোনা'],
  ['Ag', 'Silver', 'রুপো'], ['Pb', 'Lead', 'সীসা'], ['Hg', 'Mercury', 'পারদ'], ['Cu', 'Copper', 'তামা'],
  ['Sn', 'Tin', 'টিন'], ['W', 'Tungsten', 'টাংস্টেন'], ['Sb', 'Antimony', 'অ্যান্টিমনি'], ['He', 'Helium', 'হিলিয়াম'],
  ['Ne', 'Neon', 'নিয়ন'], ['Ar', 'Argon', 'আর্গন'], ['Zn', 'Zinc', 'দস্তা'], ['Ca', 'Calcium', 'ক্যালসিয়াম'],
  ['Mg', 'Magnesium', 'ম্যাগনেসিয়াম'], ['Al', 'Aluminium', 'অ্যালুমিনিয়াম'], ['Cl', 'Chlorine', 'ক্লোরিন'],
  ['Pt', 'Platinum', 'প্ল্যাটিনাম'], ['Ni', 'Nickel', 'নিকেল'], ['Si', 'Silicon', 'সিলিকন'],
  ['P', 'Phosphorus', 'ফসফরাস'], ['S', 'Sulphur', 'সালফার'], ['Li', 'Lithium', 'লিথিয়াম'],
].map(([s, en, bn]) => [P(en, bn), P(s, s)]);

const VITAMINS = [
  [P('Vitamin A', 'ভিটামিন A'), P('Night blindness', 'রাতকানা')],
  [P('Vitamin B1 (Thiamine)', 'ভিটামিন B1 (থায়ামিন)'), P('Beriberi', 'বেরিবেরি')],
  [P('Vitamin B3 (Niacin)', 'ভিটামিন B3 (নিয়াসিন)'), P('Pellagra', 'পেলেগ্রা')],
  [P('Vitamin B12', 'ভিটামিন B12'), P('Pernicious anaemia', 'পার্নিশিয়াস অ্যানিমিয়া')],
  [P('Vitamin C', 'ভিটামিন C'), P('Scurvy', 'স্কার্ভি')],
  [P('Vitamin D', 'ভিটামিন D'), P('Rickets', 'রিকেট')],
  [P('Vitamin K', 'ভিটামিন K'), P('Delayed blood clotting', 'রক্ত জমাট বাঁধতে দেরি')],
  [P('Iodine', 'আয়োডিন'), P('Goitre', 'গলগণ্ড')],
  [P('Iron', 'লোহা'), P('Anaemia', 'রক্তাল্পতা')],
];

const UNITS = [
  [P('Force', 'বল'), P('Newton', 'নিউটন')],
  [P('Pressure', 'চাপ'), P('Pascal', 'প্যাসকেল')],
  [P('Energy', 'শক্তি'), P('Joule', 'জুল')],
  [P('Power', 'ক্ষমতা'), P('Watt', 'ওয়াট')],
  [P('Frequency', 'কম্পাঙ্ক'), P('Hertz', 'হার্জ')],
  [P('Electrical resistance', 'বৈদ্যুতিক রোধ'), P('Ohm', 'ওহম')],
  [P('Electric current', 'তড়িৎপ্রবাহ'), P('Ampere', 'অ্যাম্পিয়ার')],
  [P('Electric charge', 'তড়িৎ আধান'), P('Coulomb', 'কুলম্ব')],
  [P('Magnetic flux density', 'চৌম্বক ফ্লাক্স ঘনত্ব'), P('Tesla', 'টেসলা')],
  [P('Luminous intensity', 'দীপন তীব্রতা'), P('Candela', 'ক্যান্ডেলা')],
  [P('Thermodynamic temperature', 'তাপগতীয় উষ্ণতা'), P('Kelvin', 'কেলভিন')],
  [P('Capacitance', 'ধারকত্ব'), P('Farad', 'ফ্যারাড')],
  [P('Inductance', 'আবেশাঙ্ক'), P('Henry', 'হেনরি')],
  [P('Amount of substance', 'পদার্থের পরিমাণ'), P('Mole', 'মোল')],
];

const DISCOVERIES = [
  [P('the telephone', 'টেলিফোন'), P('Alexander Graham Bell', 'আলেকজান্ডার গ্রাহাম বেল')],
  [P('the electric telegraph code', 'টেলিগ্রাফের সংকেত'), P('Samuel Morse', 'স্যামুয়েল মর্স')],
  [P('the practical electric bulb', 'ব্যবহারযোগ্য বৈদ্যুতিক বাল্ব'), P('Thomas Alva Edison', 'টমাস আলভা এডিসন')],
  [P('the wireless radio telegraphy', 'বেতার টেলিগ্রাফি'), P('Guglielmo Marconi', 'গুলিয়েলমো মার্কনি')],
  [P('penicillin', 'পেনিসিলিন'), P('Alexander Fleming', 'আলেকজান্ডার ফ্লেমিং')],
  [P('the theory of relativity', 'আপেক্ষিকতাবাদ'), P('Albert Einstein', 'আলবার্ট আইনস্টাইন')],
  [P('the law of universal gravitation', 'মহাকর্ষ সূত্র'), P('Isaac Newton', 'আইজাক নিউটন')],
  [P('the smallpox vaccine', 'বসন্তের টিকা'), P('Edward Jenner', 'এডওয়ার্ড জেনার')],
  [P('the theory of natural selection', 'প্রাকৃতিক নির্বাচন তত্ত্ব'), P('Charles Darwin', 'চার্লস ডারউইন')],
  [P('dynamite', 'ডিনামাইট'), P('Alfred Nobel', 'আলফ্রেড নোবেল')],
  [P('X-rays', 'এক্স-রে'), P('Wilhelm Röntgen', 'উইলহেলম রন্টজেন')],
  [P('the electron', 'ইলেকট্রন'), P('J. J. Thomson', 'জে. জে. থমসন')],
  [P('the neutron', 'নিউট্রন'), P('James Chadwick', 'জেমস চ্যাডউইক')],
  [P('the periodic table', 'পর্যায় সারণি'), P('Dmitri Mendeleev', 'দিমিত্রি মেন্ডেলিভ')],
  [P('the circulation of blood', 'রক্ত সঞ্চালন'), P('William Harvey', 'উইলিয়াম হার্ভে')],
  [P('the cell', 'কোশ'), P('Robert Hooke', 'রবার্ট হুক')],
  [P('the laws of heredity', 'বংশগতির সূত্র'), P('Gregor Mendel', 'গ্রেগর মেন্ডেল')],
  [P('the World Wide Web', 'ওয়ার্ল্ড ওয়াইড ওয়েব'), P('Tim Berners-Lee', 'টিম বার্নার্স-লি')],
  [P('the inactivated polio vaccine', 'নিষ্ক্রিয় পোলিও টিকা'), P('Jonas Salk', 'জোনাস সক')],
  [P('the Raman effect', 'রমন এফেক্ট'), P('C. V. Raman', 'সি. ভি. রমন')],
  [P('the crescograph', 'ক্রেস্কোগ্রাফ'), P('J. C. Bose', 'জগদীশচন্দ্র বসু')],
];

// ------------------------------------------------------------ indian history
const BOOKS = [
  [P('Gitanjali', 'গীতাঞ্জলি'), P('Rabindranath Tagore', 'রবীন্দ্রনাথ ঠাকুর')],
  [P('The Discovery of India', 'ডিসকভারি অফ ইন্ডিয়া'), P('Jawaharlal Nehru', 'জওহরলাল নেহরু')],
  [P('Arthashastra', 'অর্থশাস্ত্র'), P('Kautilya', 'কৌটিল্য')],
  [P('Harshacharita', 'হর্ষচরিত'), P('Banabhatta', 'বাণভট্ট')],
  [P('Rajatarangini', 'রাজতরঙ্গিণী'), P('Kalhana', 'কলহণ')],
  [P('Ain-i-Akbari', 'আইন-ই-আকবরি'), P('Abul Fazl', 'আবুল ফজল')],
  [P('Mudrarakshasa', 'মুদ্রারাক্ষস'), P('Vishakhadatta', 'বিশাখদত্ত')],
  [P('Anandamath', 'আনন্দমঠ'), P('Bankim Chandra Chattopadhyay', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়')],
  [P('Pather Panchali', 'পথের পাঁচালী'), P('Bibhutibhushan Bandyopadhyay', 'বিভূতিভূষণ বন্দ্যোপাধ্যায়')],
  [P('Devdas', 'দেবদাস'), P('Sarat Chandra Chattopadhyay', 'শরৎচন্দ্র চট্টোপাধ্যায়')],
  [P('Wings of Fire', 'উইংস অফ ফায়ার'), P('A. P. J. Abdul Kalam', 'এ. পি. জে. আবদুল কালাম')],
  [P('Hind Swaraj', 'হিন্দ স্বরাজ'), P('Mahatma Gandhi', 'মহাত্মা গান্ধি')],
  [P('Nil Darpan', 'নীলদর্পণ'), P('Dinabandhu Mitra', 'দীনবন্ধু মিত্র')],
  [P('Meghaduta', 'মেঘদূত'), P('Kalidasa', 'কালিদাস')],
  [P('Buddhacharita', 'বুদ্ধচরিত'), P('Ashvaghosha', 'অশ্বঘোষ')],
  [P('Gita Govinda', 'গীতগোবিন্দ'), P('Jayadeva', 'জয়দেব')],
  [P('Mahabhashya', 'মহাভাষ্য'), P('Patanjali', 'পতঞ্জলি')],
  [P('Durgeshnandini', 'দুর্গেশনন্দিনী'), P('Bankim Chandra Chattopadhyay', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়')],
  [P('Ramcharitmanas', 'রামচরিতমানস'), P('Tulsidas', 'তুলসীদাস')],
  [P('Humayun-nama', 'হুমায়ুন-নামা'), P('Gulbadan Begum', 'গুলবদন বেগম')],
];

const EVENTS = [
  [P('the First Battle of Panipat', 'প্রথম পানিপথের যুদ্ধ'), P('1526', '১৫২৬')],
  [P('the Battle of Khanwa', 'খানুয়ার যুদ্ধ'), P('1527', '১৫২৭')],
  [P('the Battle of Chausa', 'চৌসার যুদ্ধ'), P('1539', '১৫৩৯')],
  [P('the Second Battle of Panipat', 'দ্বিতীয় পানিপথের যুদ্ধ'), P('1556', '১৫৫৬')],
  [P('the Battle of Haldighati', 'হলদিঘাটের যুদ্ধ'), P('1576', '১৫৭৬')],
  [P('the Battle of Talikota', 'তালিকোটার যুদ্ধ'), P('1565', '১৫৬৫')],
  [P('the Second Battle of Tarain', 'দ্বিতীয় তরাইনের যুদ্ধ'), P('1192', '১১৯২')],
  [P('the Battle of Plassey', 'পলাশির যুদ্ধ'), P('1757', '১৭৫৭')],
  [P('the Battle of Buxar', 'বক্সারের যুদ্ধ'), P('1764', '১৭৬৪')],
  [P('the Third Battle of Panipat', 'তৃতীয় পানিপথের যুদ্ধ'), P('1761', '১৭৬১')],
  [P('the Great Revolt', 'মহাবিদ্রোহ'), P('1857', '১৮৫৭')],
  [P('the founding of the Indian National Congress', 'ভারতীয় জাতীয় কংগ্রেসের প্রতিষ্ঠা'), P('1885', '১৮৮৫')],
  [P('the Partition of Bengal by Lord Curzon', 'লর্ড কার্জনের বঙ্গভঙ্গ'), P('1905', '১৯০৫')],
  [P('the Jallianwala Bagh massacre', 'জালিয়ানওয়ালাবাগ হত্যাকাণ্ড'), P('1919', '১৯১৯')],
  [P('the start of the Non-Cooperation Movement', 'অসহযোগ আন্দোলনের সূচনা'), P('1920', '১৯২০')],
  [P('the Dandi March', 'ডান্ডি অভিযান'), P('1930', '১৯৩০')],
  [P('the Poona Pact', 'পুনা চুক্তি'), P('1932', '১৯৩২')],
  [P('the Cripps Mission', 'ক্রিপস মিশন'), P('1942', '১৯৪২')],
  [P('the Cabinet Mission', 'ক্যাবিনেট মিশন'), P('1946', '১৯৪৬')],
  [P('the Battle of Wandiwash', 'ওয়ান্ডিওয়াশের যুদ্ধ'), P('1760', '১৭৬০')],
  [P('Nadir Shah\'s invasion of Delhi', 'নাদির শাহের দিল্লি আক্রমণ'), P('1739', '১৭৩৯')],
  [P('the First Battle of Tarain', 'প্রথম তরাইনের যুদ্ধ'), P('1191', '১১৯১')],
];

// ----------------------------------------------------------------- West Bengal
const WB_DISTRICTS = [
  [P('Purba Medinipur', 'পূর্ব মেদিনীপুর'), P('Tamluk', 'তমলুক')],
  [P('Paschim Medinipur', 'পশ্চিম মেদিনীপুর'), P('Midnapore', 'মেদিনীপুর')],
  [P('Birbhum', 'বীরভূম'), P('Suri', 'সিউড়ি')],
  [P('Purba Bardhaman', 'পূর্ব বর্ধমান'), P('Bardhaman', 'বর্ধমান')],
  [P('Paschim Bardhaman', 'পশ্চিম বর্ধমান'), P('Asansol', 'আসানসোল')],
  [P('Hooghly', 'হুগলি'), P('Chinsurah', 'চুঁচুড়া')],
  [P('Nadia', 'নদিয়া'), P('Krishnanagar', 'কৃষ্ণনগর')],
  [P('Murshidabad', 'মুর্শিদাবাদ'), P('Baharampur', 'বহরমপুর')],
  [P('Malda', 'মালদহ'), P('English Bazar', 'ইংরেজবাজার')],
  [P('Uttar Dinajpur', 'উত্তর দিনাজপুর'), P('Raiganj', 'রায়গঞ্জ')],
  [P('Dakshin Dinajpur', 'দক্ষিণ দিনাজপুর'), P('Balurghat', 'বালুরঘাট')],
  [P('North 24 Parganas', 'উত্তর ২৪ পরগনা'), P('Barasat', 'বারাসাত')],
  [P('South 24 Parganas', 'দক্ষিণ ২৪ পরগনা'), P('Alipore', 'আলিপুর')],
];

// Reverse forms are skipped where the answer would merely repeat the name.
const same = ([a, b]) => a.en === b.en;

function spec() {
  return {
    subject: 'gs',
    topics: [
      family({
        topic: 'geography', subtopic: 'capitals', tags: ['capitals'], rows: STATE_CAPITALS,
        forms: [
          { q: (a) => P(`What is the capital of ${a.en}?`, `${a.bn}-এর রাজধানী কোনটি?`), e: (a, b) => P(`${b.en} is the capital of ${a.en}.`, `${b.bn} ${a.bn}-এর রাজধানী।`) },
          { reverse: true, q: (b) => P(`${b.en} is the capital of which Indian state?`, `${b.bn} ভারতের কোন রাজ্যের রাজধানী?`), e: (a, b) => P(`${b.en} is the capital of ${a.en}.`, `${b.bn} ${a.bn}-এর রাজধানী।`) },
        ],
      }),
      family({
        topic: 'geography', subtopic: 'world', tags: ['capitals', 'world'], rows: COUNTRY_CAPITALS,
        forms: [
          { q: (a) => P(`Which city is the capital of ${a.en}?`, `${a.bn}-এর রাজধানী কোন শহর?`), e: (a, b) => P(`${b.en} is the capital of ${a.en}.`, `${b.bn} ${a.bn}-এর রাজধানী।`) },
          { reverse: true, q: (b) => P(`${b.en} is the capital of which country?`, `${b.bn} কোন দেশের রাজধানী?`), e: (a, b) => P(`${b.en} is the capital of ${a.en}.`, `${b.bn} ${a.bn}-এর রাজধানী।`) },
        ],
      }),
      family({
        topic: 'geography', subtopic: 'national parks', tags: ['national-parks'], rows: NATIONAL_PARKS.map(([a, b]) => [a, b]), d: 2,
        forms: [{ q: (a) => P(`In which state is the ${a.en} located?`, `${a.bn} কোন রাজ্যে অবস্থিত?`), e: (a, b) => P(`${a.en} is in ${b.en}.`, `${a.bn} ${b.bn}-এ অবস্থিত।`) }],
      }),
      family({
        topic: 'geography', subtopic: 'rivers', tags: ['rivers'], rows: RIVER_CITIES, d: 2,
        forms: [
          { q: (a) => P(`${a.en} is situated on the banks of which river?`, `${a.bn} কোন নদীর তীরে অবস্থিত?`), e: (a, b) => P(`${a.en} stands on the ${b.en}.`, `${a.bn} ${b.bn} নদীর তীরে অবস্থিত।`) },
        ],
      }),
      family({
        topic: 'geography', subtopic: 'dams', tags: ['dams', 'rivers'], rows: DAMS, d: 2,
        forms: [{ q: (a) => P(`The ${a.en} is built on which river?`, `${a.bn} কোন নদীর উপর নির্মিত?`), e: (a, b) => P(`${a.en} is built on the ${b.en}.`, `${a.bn} ${b.bn} নদীর উপর নির্মিত।`) }],
      }),
      family({
        topic: 'polity', subtopic: 'articles', tags: ['articles'], rows: ARTICLES, d: 2,
        forms: [
          { q: (a) => P(`Which provision of the Indian Constitution deals with the following: ${a.en}?`, `ভারতের সংবিধানের কোন অনুচ্ছেদে নিম্নলিখিত বিষয়টি রয়েছে: ${a.bn}?`), reverse: true, e: (a, b) => P(`${a.en}: ${b.en}.`, `${a.bn}: ${b.bn}।`) },
          { q: (a) => P(`${a.en} of the Indian Constitution deals with:`, `ভারতের সংবিধানের ${a.bn} কী নিয়ে?`), e: (a, b) => P(`${a.en}: ${b.en}.`, `${a.bn}: ${b.bn}।`) },
        ],
      }),
      family({
        topic: 'general_science', subtopic: 'chemistry', tags: ['symbols'], rows: ELEMENTS,
        forms: [
          { q: (a) => P(`What is the chemical symbol of ${a.en}?`, `${a.bn}-এর রাসায়নিক সংকেত কী?`), e: (a, b) => P(`The symbol of ${a.en} is ${b.en}.`, `${a.bn}-এর সংকেত ${b.bn}।`) },
          { reverse: true, q: (b) => P(`Which element has the chemical symbol ${b.en}?`, `কোন মৌলের রাসায়নিক সংকেত ${b.bn}?`), e: (a, b) => P(`${b.en} stands for ${a.en}.`, `${b.bn} হল ${a.bn}-এর সংকেত।`) },
        ],
      }),
      family({
        topic: 'general_science', subtopic: 'health', tags: ['vitamins'], rows: VITAMINS, d: 2,
        forms: [
          { q: (a) => P(`Deficiency of ${a.en} causes:`, `${a.bn}-এর অভাবে কোন রোগ হয়?`), e: (a, b) => P(`${a.en} deficiency leads to ${b.en}.`, `${a.bn}-এর অভাবে ${b.bn} হয়।`) },
          { reverse: true, q: (b) => P(`${b.en} is caused by the deficiency of:`, `${b.bn} রোগ কীসের অভাবে হয়?`), e: (a, b) => P(`${b.en} is caused by lack of ${a.en}.`, `${b.bn} হয় ${a.bn}-এর অভাবে।`) },
        ],
      }),
      family({
        topic: 'general_science', subtopic: 'physics', tags: ['units'], rows: UNITS,
        forms: [
          { q: (a) => P(`What is the SI unit of ${a.en.toLowerCase()}?`, `${a.bn}-এর SI একক কী?`), e: (a, b) => P(`The SI unit of ${a.en.toLowerCase()} is the ${b.en}.`, `${a.bn}-এর SI একক ${b.bn}।`) },
          { reverse: true, q: (b) => P(`The ${b.en} is the SI unit of:`, `${b.bn} কোন রাশির SI একক?`), e: (a, b) => P(`${b.en} measures ${a.en.toLowerCase()}.`, `${b.bn} দিয়ে ${a.bn} মাপা হয়।`) },
        ],
      }),
      family({
        topic: 'general_science', subtopic: 'discoveries', tags: ['inventors'], rows: DISCOVERIES, d: 2,
        forms: [{ q: (a) => P(`Who is credited with ${a.en}?`, `${a.bn}-এর আবিষ্কারক হিসেবে কে স্বীকৃত?`), e: (a, b) => P(`${b.en} is credited with ${a.en}.`, `${a.bn}-এর কৃতিত্ব ${b.bn}-এর।`) }],
      }),
      family({
        topic: 'indian_history', subtopic: 'literature', tags: ['books'], rows: BOOKS, d: 2,
        forms: [{ q: (a) => P(`Who wrote "${a.en}"?`, `"${a.bn}" কার রচনা?`), e: (a, b) => P(`"${a.en}" was written by ${b.en}.`, `"${a.bn}" রচনা করেছেন ${b.bn}।`) }],
      }),
      family({
        topic: 'indian_history', subtopic: 'chronology', tags: ['dates'], rows: EVENTS, d: 2,
        forms: [
          { q: (a) => P(`In which year did ${a.en} take place?`, `${a.bn} কত সালে ঘটেছিল?`), e: (a, b) => P(`${a.en} took place in ${b.en}.`, `${a.bn} ঘটেছিল ${b.bn} সালে।`) },
          { reverse: true, q: (b) => P(`Which of the following events occurred in ${b.en}?`, `${b.bn} সালে নিচের কোন ঘটনাটি ঘটেছিল?`), e: (a, b) => P(`${a.en} took place in ${b.en}.`, `${a.bn} ঘটেছিল ${b.bn} সালে।`) },
        ],
      }),
      family({
        topic: 'west_bengal_gk', subtopic: 'districts', tags: ['districts'], rows: WB_DISTRICTS,
        forms: [
          { q: (a) => P(`What is the headquarters of ${a.en} district?`, `${a.bn} জেলার সদর দপ্তর কোথায়?`), e: (a, b) => P(`${b.en} is the headquarters of ${a.en}.`, `${a.bn} জেলার সদর ${b.bn}।`) },
          { reverse: true, skip: same, q: (b) => P(`${b.en} is the headquarters of which district of West Bengal?`, `${b.bn} পশ্চিমবঙ্গের কোন জেলার সদর?`), e: (a, b) => P(`${b.en} is the headquarters of ${a.en}.`, `${a.bn} জেলার সদর ${b.bn}।`) },
        ],
      }),
    ],
  };
}

module.exports = spec();
