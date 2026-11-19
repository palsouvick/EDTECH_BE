# HIS-10 (Delhi Sultanate incl. Bengal Sultanate) — Completion Report v2

**Date:** 2026-11-19 · **Work copy:** `bookwork/his10/chapter_v2.json` (repo chapter file untouched) · **Status:** DRAFT, verification object left as-is (fresh blind check to follow)

## ⚠️ VALIDATOR CHANGE — PARENT REVIEW REQUIRED

The completion could not pass the repo validator as written, because the History
validator profile hard-codes allowed source publishers to NCERT/WBBSE only
(`BHIC` sources on `egyankosh.ac.in`, `nios.ac.in`, `inflibnet.ac.in` match none
of the existing URL patterns, and any source whose `publisher` is not in the
profile list fails validation).

**Change made** (`BE/src/services/books.validate.js`, minimal and additive):
1. Added three entries to `SOURCE_PUBLISHERS`:
   `IGNOU` → `^https://egyankosh.ac.in/\S+$`,
   `NIOS` → `^https://([a-z0-9-]+\.)*nios\.ac\.in/\S+$`,
   `EPG` → `^https://([a-z0-9-]+\.)*inflibnet\.ac\.in/\S+$`
   (with a comment recording the owner's 2026-11-19 authorisation).
2. History profile publishers: `['NCERT', 'WBBSE']` →
   `['NCERT', 'WBBSE', 'IGNOU', 'NIOS', 'EPG']`.

Geography/polity profiles untouched. This needs the parent's review before the
chapter is published. **Test check (2026-11-19):** `test/books.test.js` was run
with the change applied and with it temporarily stashed — identical results
both ways (13 tests, 11 pass, 2 fail; the 2 failures are pre-existing
auth-status assertions, 401 vs expected 200/403, in this VM's test
environment). The validator change introduces no test regressions.

## Result summary

| | Before (v1) | After (v2) |
|---|---|---|
| Sources | 5 (all NCERT) | **16** (+11 IGNOU/NIOS/e-PG) |
| Claims | 63 | **132** (+69) |
| Questions | 42 | **70** (+28: q43–q70) |
| Sections | 7 | **8** (+s8 Architecture & court culture) |
| Events / People / Timeline / Terms | 8 / 8 / 10 / 8 | **16 / 15 / 23 / 14** |
| Mapped PYQs taught | 4/32 | **24/32** |

Validator: `node scripts/validateBooks.js bookwork/his10/chapter_v2.json` →
**OK** (no errors, no warnings). All 63 original claims and 42 original
questions preserved byte-identical; all 132 claims are used somewhere in the
chapter (no unused claims).

## Sources fetched (all via browser text-fetch, read in full or in the relevant range)

**IGNOU eGyanKosh — BHIC-107 (History of India V)**
- Unit-3 *Evolution of Institutions: Sultan, Nobility and Ulama* — https://egyankosh.ac.in/bitstream/123456789/73300/1/Unit-3.pdf — khutba/sikka definition, Chahalgani as Iltutmish's creation, Balban's elimination of the Forty, Alauddin's 1296 accession.
- Unit-4 *Administration under the Khaljis and the Tughluqs* — https://egyankosh.ac.in/bitstream/123456789/73301/1/Unit-4.pdf — cash salary (Alauddin), Iltutmish's iqta organisation + tanka/jital, Balban's NW frontier (Sunam/Bhatinda, Prince Muhammad 1285), dagh/huliya.
- Unit-10 *Rural Economy: Irrigation* — https://egyankosh.ac.in/bitstream/123456789/73309/1/Unit-10.pdf — first canal under Ghiyasuddin Tughlaq; Firoz's Rajabwah/Ulughkhani canals, "biggest canal network in India till the 19th century".
- Unit-12 *Urban Economy and Monetization* — https://egyankosh.ac.in/bitstream/123456789/73311/1/Unit-12.pdf — Firoz's fort towns (Hissar Firuza, Fatehabad, Firozabad, Jaunpur); Alauddin's half-produce land tax; Ibn Battuta on Delhi/Daulatabad.
- Unit-18 *Royal Buildings: Palaces and Forts* — https://egyankosh.ac.in/bitstream/123456789/73319/2/Unit18.pdf — Quwwat-ul Islam Mosque as centrepiece of the new city.

**IGNOU — other programmes**
- *Unit 17: Architecture and Painting* (EHI) — https://egyankosh.ac.in/bitstream/123456789/68927/3/Unit-17.pdf — Qutb Minar dated 1199–1235; Alai Darwaza (1305 per this unit) and Khalji true arch/dome features.
- *Block-3, Unit 9 §9.8 The Kingdom of Bengal* (EHI-03) — https://egyankosh.ac.in/bitstream/123456789/66567/1/Block-3.pdf — Bakhtiyar Khalji and the beginning of Muslim rule in Bengal; Bengal's partition under Ghiyasuddin Tughlaq; Ilyas Shah's unification (c. 1345) and dynasty; Firoz's failed Bengal recovery; Raja Ganesh; Husain Shah (1493), his expansion, Chaitanya's movement; why Bengal kept slipping from Delhi's control.

**NIOS — Senior Secondary History 315**
- Lesson 9 *The Delhi Sultanate* — https://digital.nios.ac.in/content/315en/315_History_Eng_Lesson9.pdf — Ghaznavi's 17 invasions; Tarain I/II; Iltutmish's institutions and Chahalgani's elimination by Balban; Balban's court; Devagiri 1294; Alauddin's market regulations (3 markets, Shahna-i-Mandi); Malik Kafur; Daulatabad transfer and Barani's reason; token currency and its withdrawal; Timur 1398; Ibrahim Lodi as last Sultan.

**e-PG Pathshala (INFLIBNET) — Indian Culture, Outlines of Indian History**
- *The Slave Dynasty (1206–1290)* — https://ebooks.inflibnet.ac.in/icp01/chapter/the-slave-dynasty-1206-1290/ — Qutb Minar foundation by Aibak, completed 1231; Iltutmish as slave and son-in-law of Aibak; Balban destroying the Forty, kingship theory, sijda/paibos, espionage, Mongol attacks and Prince Muhammad's death; Tughril revolt and Bughra Khan in Bengal; Iltutmish's centrally organised army.
- *The Sayyid and Lodi Dynasties & Salient Features of the Delhi Sultanate* — https://ebooks.inflibnet.ac.in/icp01/chapter/the-sayyid-and-lodi-dynasties-salient-features-of-the-delhi-sultanate/ — Qutb Minar "foundation laid by Aibak, completed by Iltutmish"; Alai Darwaza as Alauddin's most important monument; Amir Khusrau — Tut-i-Hind, credited with the sitar "though we have no evidence of it", Alauddin's court poet; Khizr Khan 1414; Sikandar Lodi's Agra (1504).
- *Sources for the Study of Indian History* — https://ebooks.inflibnet.ac.in/icp01/chapter/sources-for-the-study-of-indian-history/ — Tarikh-i-Firoz Shahi covers the Sultanate from Balban to Firoz Shah Tughlaq.

**Not fetched (recorded honestly):** BHIC-107 Units 8 (Emergence of New Kingdoms — Bengal), 9 (Land Administration) and 17 (Temples, Mosques and Dargahs) could not be located — eGyanKosh unit PDFs are not sequentially numbered and the DSpace REST search did not return usable results; NIOS Lesson 11's official `digital.nios.ac.in` URL was never returned verbatim by search (only third-party mirrors). Bengal coverage therefore rests on the IGNOU EHI-03 Block-3 §9.8 unit and NIOS Lesson 9, which proved sufficient for the mapped PYQs except the three gaps below.

## What was added

- **Sections strengthened:** s1 (Ghazni/Ghori/Tarain foundation, khutba–sikka, Ibrahim Lodi), s2 (Chahalgani creation vs destruction, Balban's kingship/court/espionage), s3 (Iltutmish attributions, market control, cash salary + dagh/huliya, half-produce tax), s4 (Deccan/Malik Kafur, Balban's frontier, Daulatabad, token currency, Firoz's towns/canals, Timur), s7 (Bakhtiyar, Ilyas Shahi, Raja Ganesh, Husain Shahi, Chaitanya).
- **New section s8:** *সুলতানি স্থাপত্য ও দরবারি সংস্কৃতি* — Qutb Minar (foundation Aibak, completion Iltutmish 1231), Alai Darwaza, Quwwat-ul Islam Mosque, Barani, Amir Khusrau.
- **New questions q43–q70** (28): basic 8, moderate 10, difficult 4 (STATEMENT/MATCH/CHRONOLOGY/PAIRS), exam 6 (incl. ASSERTION_REASON) — every section covered, each referencing its new claims. Level totals now: basic 18, moderate 25, difficult 14, exam 13.
- **Learning blocks:** +8 events, +7 people (incl. Balban, Malik Kafur, Firoz Tughlaq, Ilyas Shah, Husain Shah, Amir Khusrau, Barani), +13 timeline entries (re-sorted), +6 terms, +2 cause–effect pairs, +5 exam-focus points, +9 quick-revision lines; bengal_connection extended with sourced claims.
- **Student-facing honesty boxes updated:** the old NCERT-limitation warnings were rewritten — s3's box now teaches the market-control cluster and flags the Clerkship 2004 doubtful key; s7's box now lists what Bengal detail is taught and what still is not (Adina Mosque/Pandua, Gunaraj Khan, Roop/Sanatan Goswami); s8's box carries the sitar "credited, no evidence" caveat.

## PYQs: 24/32 taught (was 4/32)

Newly taught (20): WBCS 2016 Q143 (Barani), 2016 Q166 (first Deccan incursion), 2017 Q79 (Daulatabad), 2018 Q170 (Chahalgani), 2018 Q176 (market control), 2018 Q184 (Qutb Minar completion), 2019 Q70 (Malik Kafur), 2021 Q28 (sultan who was not a slave), 2021 Q84 (khutba), 2021 Q90 (iqta–Iltutmish), 2021 Q98 (Bakhtiyar Khalji), 2022 Q173 (Iltutmish's organisation), 2023 Q117 (Khusrau), 2023 Q191 (Balban's NW frontier), 2023 Q47 (Ibrahim Lodi), 2023 Q82 (Deccan under Alauddin), 2024 Q122 (cash salary), 2024 Q73 (Firoz's cities), Clerkship 2007 Q15 (Khusrau/sitar), Clerkship 2023 Q42 (market control). Full per-PYQ notes in `pyq_map_HIS-10_v2.json`.

## Remaining gaps (8/32 untaught) — with reasons

1. **WBCS 2016 Q161** (earliest Islam contact) — pre-Sultanate scope; no fetched source supports the merchant-contact key.
2. **WBCS 2021 Q63** (Khajuraho/Alberuni pair) — primary chapter HIS-09.
3. **WBCS 2022 Q31** (monuments pair mismatch, doubtful key) — the specific pair is unverifiable from the fetched sources.
4. **WBCS 2023 Q137** (Adina Mosque — Sikandar Shah) — no authorised source fetched covers the Adina Mosque.
5. **WBPSC Clerkship 2009 Q3** (Adina Mosque at Pandua) — same gap as (4).
6. **WBPSC Clerkship 2004 Q66** (Gunaraj Khan → Maladhar Basu) — no authorised source covers Bengal literary personalities.
7. **WBCS 2024 Q95** (Roop/Sanatan Goswami) — primary chapter HIS-12; not in fetched sources.
8. **WBPSC Clerkship 2004 Q65** (bank key: "Alauddin abolished iqta", doubtful_key) — contradicts the fetched sources; the tension is now flagged to students in s3, but the key itself is deliberately not taught.

Gaps 4–6 are Bengal-specific and are disclosed to students in the s7 `bengal` box. They would need either the WBBSE Class VII text (still unreachable from this VM) or a Bengal-focused authorised source (e.g. BHIC-107 Unit 8, whose PDF could not be located on eGyanKosh).

**Source-disagreement note:** the IGNOU architecture unit dates the Alai Darwaza to 1305; several common references give 1311. The chapter teaches only the IGNOU-quoted 1305 attribution (as Alauddin's-period monument) and no question depends on the exact year.
