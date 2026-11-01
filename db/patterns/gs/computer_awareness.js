'use strict';

// Computer Awareness. Every fact used here is in the verified GK library
// (db/gk/computer_awareness.jsonl, sources: NCERT Computer Science XI/XII,
// Microsoft Support, CERT-In).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'computer_awareness',
  patterns: [
    {
      key: 'memory_types',
      emoji: '💾',
      name: t('Types of memory and memory units', 'মেমরির প্রকার ও মেমরির একক'),
      spot: t(
        'The question asks which memory is volatile, what ROM or cache does, or how many bytes make a KB or MB.',
        'প্রশ্নে জানতে চায় কোন মেমরি অস্থায়ী (volatile), ROM বা ক্যাশে কী করে, বা কত বাইটে এক KB বা MB হয়।',
      ),
      method: [
        t('RAM is volatile: its contents are lost when the power goes off. ROM is non-volatile and holds the boot loader.', 'RAM অস্থায়ী: বিদ্যুৎ বন্ধ হলে এর তথ্য মুছে যায়। ROM স্থায়ী (non-volatile) এবং এতে বুট লোডার থাকে।'),
        t('Cache is a very fast memory between the CPU and main memory.', 'ক্যাশে হল CPU ও প্রধান মেমরির মাঝে থাকা খুব দ্রুতগতির মেমরি।'),
        t('Units (NCERT): 4 bits = nibble, 8 bits = byte, and each next unit is 1024 times the previous (KB, MB, GB, TB).', 'একক (NCERT): ৪ বিট = নিবল, ৮ বিট = বাইট, এবং প্রতিটি পরের একক আগেরটির ১০২৪ গুণ (KB, MB, GB, TB)।'),
      ],
      example: {
        question: t('Which memory loses its contents when the power is switched off?', 'বিদ্যুৎ বন্ধ করলে কোন মেমরির তথ্য মুছে যায়?'),
        steps: [
          t('ROM and secondary storage (hard disk, DVD) are non-volatile.', 'ROM এবং সেকেন্ডারি স্টোরেজ (হার্ড ডিস্ক, DVD) স্থায়ী।'),
          t('RAM is volatile, so its contents are wiped out without power.', 'RAM অস্থায়ী, তাই বিদ্যুৎ ছাড়া এর তথ্য মুছে যায়।'),
        ],
        answer: t('RAM (Random Access Memory)', 'RAM (র‍্যান্ডম অ্যাক্সেস মেমরি)'),
      },
      tryIt: {
        question: t('According to NCERT, 1 GB is equal to:', 'NCERT অনুযায়ী ১ GB সমান:'),
        options: [t('1000 KB', '১০০০ KB'), t('1024 MB', '১০২৪ MB'), t('1024 TB', '১০২৪ TB'), t('1000 bits', '১০০০ বিট')],
        correct: 1,
        explanation: [
          t('NCERT\'s table gives 1 GB = 1024 MB.', 'NCERT-এর সারণি অনুযায়ী ১ GB = ১০২৪ MB।'),
          t('Note: in the SI system "kilo" means 1000, so exam questions on computer memory follow the 1024 convention unless stated otherwise.', 'লক্ষ্য করো: SI পদ্ধতিতে "কিলো" মানে ১০০০, তাই কম্পিউটার মেমরির প্রশ্নে অন্যভাবে বলা না থাকলে ১০২৪ ধরা হয়।'),
        ],
      },
    },
    {
      key: 'networks_internet',
      emoji: '🌐',
      name: t('Networks, addresses and the Web', 'নেটওয়ার্ক, ঠিকানা ও ওয়েব'),
      spot: t(
        'The question asks the size of an IP or MAC address, what DNS does, who invented the Web, or which type of network (PAN, LAN, MAN, WAN) fits a description.',
        'প্রশ্নে IP বা MAC ঠিকানার আকার, DNS-এর কাজ, ওয়েবের উদ্ভাবক, বা কোনো বর্ণনার সঙ্গে কোন নেটওয়ার্ক (PAN, LAN, MAN, WAN) মেলে তা জানতে চায়।',
      ),
      method: [
        t('IPv4 = 32 bits, IPv6 = 128 bits, MAC = 48 bits (engraved on the network card).', 'IPv4 = ৩২ বিট, IPv6 = ১২৮ বিট, MAC = ৪৮ বিট (নেটওয়ার্ক কার্ডে খোদাই করা)।'),
        t('DNS converts a domain name into an IP address (domain name resolution).', 'DNS ডোমেন নামকে IP ঠিকানায় রূপান্তর করে (domain name resolution)।'),
        t('Tim Berners-Lee invented the World Wide Web in 1990 (HTML, URI/URL, HTTP). The Web is not the same as the Internet.', 'টিম বার্নার্স-লি ১৯৯০ সালে ওয়ার্ল্ড ওয়াইড ওয়েব উদ্ভাবন করেন (HTML, URI/URL, HTTP)। ওয়েব আর ইন্টারনেট এক জিনিস নয়।'),
        t('Range: PAN about 10 m, LAN up to about 1 km, MAN a city (30–40 km), WAN countries and continents. The Internet is the largest WAN.', 'বিস্তার: PAN প্রায় ১০ মিটার, LAN প্রায় ১ কিমি পর্যন্ত, MAN একটি শহর (৩০–৪০ কিমি), WAN দেশ ও মহাদেশ জুড়ে। ইন্টারনেট সবচেয়ে বড় WAN।'),
      ],
      example: {
        question: t('A cable TV network covering a whole town is an example of which type of network?', 'একটি গোটা শহর জুড়ে কেবল টিভি নেটওয়ার্ক কোন ধরনের নেটওয়ার্কের উদাহরণ?'),
        steps: [
          t('A town is larger than a building or campus (LAN) but smaller than a country (WAN).', 'শহর একটি ভবন বা ক্যাম্পাস (LAN)-এর চেয়ে বড়, কিন্তু একটি দেশ (WAN)-এর চেয়ে ছোট।'),
          t('NCERT gives cable TV networks as an example of a MAN.', 'NCERT কেবল টিভি নেটওয়ার্ককে MAN-এর উদাহরণ হিসেবে দিয়েছে।'),
        ],
        answer: t('MAN (Metropolitan Area Network)', 'MAN (মেট্রোপলিটান এরিয়া নেটওয়ার্ক)'),
      },
      tryIt: {
        question: t('Which server converts a domain name into an IP address?', 'কোন সার্ভার ডোমেন নামকে IP ঠিকানায় রূপান্তর করে?'),
        options: [t('Web server', 'ওয়েব সার্ভার'), t('Mail server', 'মেল সার্ভার'), t('DNS server', 'DNS সার্ভার'), t('Proxy server', 'প্রক্সি সার্ভার')],
        correct: 2,
        explanation: [
          t('Converting a domain name into its IP address is called domain name resolution.', 'ডোমেন নামকে IP ঠিকানায় রূপান্তর করাকে domain name resolution বলে।'),
          t('It is done by a DNS (Domain Name System) server, which NCERT compares to a phonebook.', 'এই কাজটি করে DNS (ডোমেন নেম সিস্টেম) সার্ভার; NCERT একে ফোনবুকের সঙ্গে তুলনা করেছে।'),
        ],
      },
    },
    {
      key: 'software_translators',
      emoji: '⚙️',
      name: t('System software and language translators', 'সিস্টেম সফটওয়্যার ও ভাষা অনুবাদক'),
      spot: t(
        'The question asks what an operating system does, or the difference between an assembler, a compiler and an interpreter.',
        'প্রশ্নে অপারেটিং সিস্টেমের কাজ, বা অ্যাসেম্বলার, কম্পাইলার ও ইন্টারপ্রেটারের পার্থক্য জানতে চায়।',
      ),
      method: [
        t('The operating system is the most basic system software: the interface between the user and the computer.', 'অপারেটিং সিস্টেম হল সবচেয়ে মৌলিক সিস্টেম সফটওয়্যার: ব্যবহারকারী ও কম্পিউটারের মধ্যে সংযোগস্থল।'),
        t('Assembler: assembly language → machine language.', 'অ্যাসেম্বলার: অ্যাসেম্বলি ভাষা → যন্ত্রভাষা।'),
        t('Compiler: translates the whole program at once. Interpreter: one line at a time, needed every time the program runs.', 'কম্পাইলার: পুরো প্রোগ্রাম একবারে অনুবাদ করে। ইন্টারপ্রেটার: এক লাইন করে অনুবাদ করে, প্রোগ্রাম চালানোর প্রতিবার লাগে।'),
      ],
      example: {
        question: t('Which translator is needed every time the source code is run?', 'সোর্স কোড চালানোর প্রতিবার কোন অনুবাদক লাগে?'),
        steps: [
          t('A compiler translates once; after that the machine code runs without it.', 'কম্পাইলার একবার অনুবাদ করে; তারপর তাকে ছাড়াই যন্ত্রকোড চলে।'),
          t('An interpreter translates line by line during each run, so it is needed every time.', 'ইন্টারপ্রেটার প্রতিবার চালানোর সময় লাইন ধরে অনুবাদ করে, তাই প্রতিবার লাগে।'),
        ],
        answer: t('Interpreter', 'ইন্টারপ্রেটার'),
      },
    },
    {
      key: 'cyber_security',
      emoji: '🛡️',
      name: t('Malware, phishing and cyber law', 'ম্যালওয়্যার, ফিশিং ও সাইবার আইন'),
      spot: t(
        'The question describes a threat (self-copying program, fake bank email, data held for ransom) and asks its name, or asks about the IT Act or CERT-In.',
        'প্রশ্নে কোনো বিপদের বর্ণনা দিয়ে (নিজে কপি হওয়া প্রোগ্রাম, ভুয়ো ব্যাংক ইমেল, টাকার জন্য আটকে রাখা তথ্য) তার নাম, বা IT আইন বা CERT-In নিয়ে জানতে চায়।',
      ),
      method: [
        t('Virus: attaches to other programs. Worm: standalone and spreads through the network by itself. Trojan: looks genuine but does not self-replicate.', 'ভাইরাস: অন্য প্রোগ্রামের সঙ্গে জুড়ে যায়। ওয়ার্ম: স্বাধীন, নিজে নিজেই নেটওয়ার্কে ছড়ায়। ট্রোজান: আসল মনে হয় কিন্তু নিজে কপি হয় না।'),
        t('Ransomware encrypts or blocks data and demands money; a keylogger records the keys pressed.', 'র‍্যানসমওয়্যার তথ্য এনক্রিপ্ট বা আটকে রেখে টাকা দাবি করে; কি-লগার চাপা কী-গুলি রেকর্ড করে।'),
        t('Phishing uses fake websites or emails to steal passwords and bank details. The IT Act, 2000 (amended 2008) deals with cyber crime; CERT-In, under MeitY, is the national cyber-security agency.', 'ফিশিং ভুয়ো ওয়েবসাইট বা ইমেল দিয়ে পাসওয়ার্ড ও ব্যাংকের তথ্য চুরি করে। IT আইন, ২০০০ (২০০৮-এ সংশোধিত) সাইবার অপরাধ নিয়ে; MeitY-র অধীন CERT-In জাতীয় সাইবার নিরাপত্তা সংস্থা।'),
      ],
      example: {
        question: t('A fake email that looks like it is from your bank asks for your password. What is this attack called?', 'তোমার ব্যাংকের মতো দেখতে একটি ভুয়ো ইমেল তোমার পাসওয়ার্ড চাইছে। এই আক্রমণকে কী বলে?'),
        steps: [
          t('The email pretends to be genuine in order to collect sensitive details.', 'ইমেলটি সংবেদনশীল তথ্য সংগ্রহের জন্য আসল হওয়ার ভান করছে।'),
          t('NCERT defines this as phishing; forging the sender address is called email spoofing.', 'NCERT একে ফিশিং বলে; প্রেরকের ঠিকানা জাল করাকে ইমেল স্পুফিং বলে।'),
        ],
        answer: t('Phishing', 'ফিশিং'),
      },
      tryIt: {
        question: t('A standalone program that copies itself and spreads through a network on its own is a:', 'যে স্বাধীন প্রোগ্রাম নিজেকে কপি করে নিজে নিজেই নেটওয়ার্কে ছড়িয়ে পড়ে, তা হল:'),
        options: [t('Trojan', 'ট্রোজান'), t('Worm', 'ওয়ার্ম'), t('Keylogger', 'কি-লগার'), t('Adware', 'অ্যাডওয়্যার')],
        correct: 1,
        explanation: [
          t('A worm is standalone and replicates by itself through the network.', 'ওয়ার্ম স্বাধীন এবং নেটওয়ার্কের মাধ্যমে নিজে নিজেই কপি হয়।'),
          t('A Trojan does not self-replicate, and a keylogger only records keystrokes.', 'ট্রোজান নিজে কপি হয় না, আর কি-লগার শুধু চাপা কী রেকর্ড করে।'),
        ],
      },
    },
  ],
};
