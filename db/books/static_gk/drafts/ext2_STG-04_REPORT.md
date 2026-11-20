# STG-04 extension pass 2 — report (2026-11-20)

Files: `ext2_STG-04_chapter.json` (copy of the live PUBLISHED chapter, extended), `ext2_STG-04_flipped.json` (9 PYQ codes).
Validator: `node scripts/validateBooks.js db/books/static_gk/drafts/ext2_STG-04_chapter.json` -> **OK**.
Integrity: all 45 old claims and all 42 old questions are identical to the live file (programmatic deep-compare); `status` and `verification` untouched. All 18 new quotes were checked verbatim against the fetched pages (0 failures).

## Sources fetched (all GOVT, `*.gov.in`)
| id | Title | URL |
|---|---|---|
| s8 | PM interacts with Thomas Cup and Uber Cup team (22 May 2022), pmindia.gov.in | https://www.pmindia.gov.in/en/news_updates/pm-interacts-with-thomas-cup-and-uber-cup-team/ |
| s9 | PM congratulates P V Sindhu for winning the Swiss Open 2022 (27 Mar 2022) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-indian-shuttler-p-v-sindhu-for-winning-the-swiss-open-2022/ |
| s10 | PM congratulates P V Sindhu on winning Gold at BWF World Championship (25 Aug 2019) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-p-v-sindhu-on-winning-gold-at-bwf-world-championship/ |
| s11 | PM's Mann Ki Baat, 28 Aug 2016 | https://www.pmindia.gov.in/en/news_updates/pms-mann-ki-baat-programme-on-all-india-radio-on-august-28-2016/ |
| s12 | PM condoles demise of Shri Dingko Singh (10 Jun 2021) | https://www.pmindia.gov.in/en/news_updates/pm-condoles-demise-of-shri-dingko-singh/ |
| s13 | PM congratulates Abhinav Bindra on the Olympic Order (24 Jul 2024) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-abhinav-bindra-on-being-awarded-prestigious-olympic-order/ |
| s14 | Rajeev Gandhi Khel Ratna Awardees, Dept of Sports, MYAS | https://sports.yas.gov.in/national-sports-awards/rajeev-gandhi-khel-ratna-174 |
| s15 | Arjuna Awardees, Dept of Sports, MYAS | https://sports.yas.gov.in/national-sports-awards/arjuna-award-173 |
| s16 | PM's interaction with World T20 Champions Indian Cricket Team (5 Jul 2024) | https://www.pmindia.gov.in/en/news_updates/pms-interaction-with-world-t20-champions-indian-cricket-team/ |
| s17 | PM meets chess grandmaster Praggnanandhaa (31 Aug 2023) | https://www.pmindia.gov.in/en/news_updates/pm-meets-chess-grandmaster-praggnanandhaa-along-with-his-family/ |
| s18 | PM congratulates Team India on winning the ICC Men's T20 World Cup (8 Mar 2026) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-team-india-on-winning-the-icc-mens-t20-world-cup/ |
| s19 | PM congratulates Lovlina Borgohain, Bronze, Tokyo 2020 (4 Aug 2021) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-lovlina-borgohain-for-winning-bronze-medal-in-boxing-at-tokyo-olympics-2020/ |
| s20 | PM congratulates Lovlina Borgohain, Boxing World Championships gold (26 Mar 2023) | https://www.pmindia.gov.in/en/news_updates/pm-congratulates-boxer-lovlina-borgohain-for-winning-gold-medal-at-boxing-world-championships/ |

Also read, not cited (nothing usable): other pmindia pages (Tokyo contingent interaction, Ashtalakshmi Mahotsav, Neeraj Chopra Tokyo gold, Ravi Dahiya CWG 2022, Nitu Ghanghas / Saweety Boora 2023, Wimbledon 2015, 2023 ODI World Cup match pages, Mar 2026 Mann Ki Baat), and the sports.yas.gov.in Arjuna (lifetime), Dronacharya, Dhyan Chand and Major Dhyan Chand Khel Ratna lists.
NCERT: Class XI *Health and Physical Education* is code `kehp1xx` (`https://ncert.nic.in/textbook/pdf/kehp101.pdf` and so on). Chapters 101, 102, 103, 106, 107, 108, 109 were read: none gives the Olympic rings, symbol history or ancient/modern Olympics (107 mentions the IOC only in the doping context). Chapters 104 and 105 and the Class XII book (`lehp1xx`) could not be downloaded completely (ncert.nic.in timed out or truncated repeatedly), so the rings items stay untaught. A later run with a stable connection should try those three.

## Worklist (37 items)
| pyq_code | Result |
|---|---|
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q58 (Rohit 10,000 T20 runs) | STILL_UNTAUGHT: no allowed page states T20 run milestones |
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q70 (Asian Wrestling 2022 solitary gold, Ravi Dahiya) | STILL_UNTAUGHT: the only Dahiya page found is his Birmingham CWG 2022 gold (6 Aug 2022), not the Asian Championships |
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q187 (Thomas Cup 2022) | TAUGHT (c46, c47; section indian_stars, event, timeline) |
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q194 (Swiss Open 2022) | TAUGHT (c48; indian_stars). Page says "Indian shuttler P V Sindhu ... Swiss Open 2022"; it does not say "women's singles" |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-I-Q71 (2026 T20 WC co-hosts) | STILL_UNTAUGHT: no allowed page names the hosts (c61 teaches only that India won in March 2026; exam_note added) |
| WBCS-EXE-PRELIMS-2015-PRELIMS-Q185 (India medals CWG 2014) | STILL_UNTAUGHT: no allowed page with the 2014 tally |
| WBCS-EXE-PRELIMS-2018-PRELIMS-Q165 (Glasgow 2017 women's singles, Okuhara) | STILL_UNTAUGHT: foreign result, no allowed page |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q52 (2019 WC final tie, super over) | STILL_UNTAUGHT: no allowed page |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q60 (Tokyo hockey captain Manpreet) | STILL_UNTAUGHT: the Tokyo contingent interaction names "Manpreet Singh (Hockey)" but never calls him captain |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q83 (Asiad-gold boxer died aged 42) | TAUGHT (c52; indian_stars). Page: PM condoled the demise of boxer Dingko Singh, 10 Jun 2021. It does not mention Asian Games gold or age 42; the other three options are not shown as deceased, so the key is reachable but those two details are not sourced |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q30 (2023 IBA women's boxing host India) | STILL_UNTAUGHT: PM pages (25 Mar 2023) congratulate Nitu Ghanghas / Saweety Boora but name no host |
| WBCS-EXE-PRELIMS-2024-PRELIMS-Q27 (Club World Cup 2025 Chelsea) | STILL_UNTAUGHT: foreign result, no allowed page |
| WBPSC-CLERKSHIP-PART-I-2004-Q69 (Sehwag Test 300) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2004-Q71 (Athens 2004 100 m) | STILL_UNTAUGHT: foreign result |
| WBPSC-CLERKSHIP-PART-I-2005-Q60 (Black Pearl = Pele) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2005-Q72 (Rathore, Athens 2004 silver, double trap) | STILL_UNTAUGHT: pmindia pages only call Rathore "an Olympic medallist"; the Khel Ratna list gives only his sport (Shooting), not year, medal or event |
| WBPSC-CLERKSHIP-PART-I-2006-Q12 (Wimbledon in London) | STILL_UNTAUGHT: pmindia Wimbledon pages (2015) never state the city |
| WBPSC-CLERKSHIP-PART-I-2006-Q23 (match players and games) | STILL_UNTAUGHT: Anand = Chess and Sania = Tennis are taught (c55, c56), but Yasin Merchant (snooker) and Vijay Merchant (cricket) appear on no allowed page, so the match cannot be solved from the chapter |
| WBPSC-CLERKSHIP-PART-I-2007-Q3 (Green Park, Kanpur) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2007-Q21 (Beijing mascots Fuwa) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2007-Q30 (Dravid 10,000 Test runs partner) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2009-SESSION-I-Q8 (India's Beijing 2008 gold: shooting) | TAUGHT (c53, c54; olympic_games). Chain: PM page calls Bindra "the 2008 Olympic Gold Medallist"; Khel Ratna list gives his sport as Shooting. The city "Beijing" is on neither page, so the text speaks of the 2008 Olympics only |
| WBPSC-CLERKSHIP-PART-I-2019-AFTERNOON-Q9 (Keshav Maharaj, South Africa) | STILL_UNTAUGHT: foreign player, no allowed page |
| WBPSC-CLERKSHIP-PART-I-2019-AFTERNOON-Q25 (NOT a hockey player: Milkha Singh) | STILL_UNTAUGHT: Sardar Singh and Manpreet Singh are listed under Hockey, but the hockey player Sandeep Singh and Milkha Singh are on no allowed list (the lists have only a para-athletics Sandeep Singh Mann) |
| WBPSC-CLERKSHIP-PART-I-2019-AFTERNOON-Q36 (most Test double hundreds, Kohli) | STILL_UNTAUGHT: no allowed page |
| WBPSC-CLERKSHIP-PART-I-2019-FORENOON-Q21 (2019 Cricket WC winner England) | STILL_UNTAUGHT: foreign result |
| WBPSC-CLERKSHIP-PART-I-2019-FORENOON-Q31 (2019 BWF women's singles, Sindhu) | TAUGHT (c49; indian_stars). Page: "winning the Gold at the BWF World Championships" (25 Aug 2019), no event named |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-II-Q36 (Olympic symbol designed 1913) | STILL_UNTAUGHT: the NCERT XI HPE chapters fetched do not cover it (see sources note) |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-III-Q36 (Norway Chess 2024) | STILL_UNTAUGHT: foreign result, time-bound |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-III-Q54 (T20 WC 2024 venue USA and West Indies) | TAUGHT (c60; cricket_world_cups). Rohit: team went to the West Indies, cricket was played in New York for the first time, final in Barbados. "USA" is not written on the page; the chapter says New York is a US city |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-IV-Q72 (first Indian woman gymnast to qualify) | TAUGHT (c50, c51; olympic_games, people, timeline) |
| WBPSC-MISCELLANEOUS-PRELIMS-2023-Q76 (Praggnanandhaa is a chess player) | TAUGHT (c57, c58; indian_stars) |
| WBP-CONSTABLE-PRELIMS-2021-Q4 (Olympic ring yellow = Asia) | STILL_UNTAUGHT: no allowed page found (NCERT chapters 104, 105 and Class XII not retrievable; the others are silent) |
| WBP-CONSTABLE-PRELIMS-2021-Q8 (2023 ODI WC host India) | STILL_UNTAUGHT: the pmindia match pages (Oct-Nov 2023) name no host country |
| WBP-CONSTABLE-PRELIMS-2021-Q20 (Neeraj Chopra from Panipat) | STILL_UNTAUGHT: no allowed page gives his town |
| WBP-CONSTABLE-PRELIMS-2021-Q40 (Lovlina Borgohain, Assam) | STILL_UNTAUGHT: the one page found (PM at Ashtalakshmi Mahotsav) lists her among "North East" icons only; the award lists have no state column |
| WBP-CONSTABLE-PRELIMS-2021-Q80 (India's first T20 WC win 2007) | TAUGHT (c59; cricket_world_cups). Rohit: after joining the team in 2007 India went to South Africa for the World Cup and won it, and later "often came close but couldn't win". The words "first" and "T20" are inferred from the page title ("World T20 Champions") and that remark; no page says "first T20 World Cup" |

Counts: TAUGHT 9, STILL_UNTAUGHT 28, OTHER_CHAPTER 0, KEY_CONFLICT 0.

## New claims (c46-c63) and questions (q43-q60)
- Claims: c46-c47 Thomas Cup 2022 (gold; captain Srikanth); c48 Swiss Open 2022; c49 BWF Worlds 2019; c50-c51 Dipa Karmakar and Rio tally (Mann Ki Baat 2016); c52 Dingko Singh; c53-c54 Bindra 2008 gold + Shooting; c55-c56 Anand Chess, Sania Tennis (Khel Ratna list); c57-c58 Praggnanandhaa (Arjuna 2022 Chess; grandmaster); c59-c60 Rohit on 2007 and 2024; c61 T20 WC win, 8 Mar 2026; c62-c63 Lovlina bronze 2021 / world gold 2023.
- Questions (18): q43-q47 olympic_games, q48-q51 cricket_world_cups, q52-q60 indian_stars (new section). Formats include one STATEMENT, one MATCH, one CHRONOLOGY, one ASSERTION_REASON; the rest DIRECT. Each cites its claim ids.
- New section `indian_stars` (now 7 sections). New boxes: exam_note in olympic_games (no home-town / state facts taught), remember + exam_note in cricket_world_cups (what is still untaught). Events +1, people +6, timeline +7, terms +1, exam_focus +3, quick_revision +5; reading_minutes standard 28 -> 32, deep 38 -> 40.

## Source disagreements / cautions
- No source contradicts a key. c53 ("2008 Olympic Gold Medallist") agrees with the existing c22 ("India's first Olympic gold medallist"); both are the government's wording.
- Time-bound teaching carries its date: Thomas Cup (2022), Sindhu (2019, 2022), Dingko Singh (2021), T20 World Cup win (8 Mar 2026).
- pmindia.gov.in is a Government of India site (`*.gov.in`) and passes the GOVT pattern; the pages are PM Office releases, not PIB.
- The new 2026 T20 World Cup fact means the existing chapter's quick text ("only 2024 documented") is now slightly out of date for cricket; the new cricket paragraph and remember box cover 2007, 2024 and 2026.
