# DAY-07 — জুলাইয়ের দিবস — Draft Report

Chapter: `DAY-07`, book `important_days`, part `q3`, subtopics `["july"]` (title/part/subtopics verbatim from `db/books/important_days/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.
Deliverables: `chapter.json` (this folder), `pyq_map_DAY-07.json`, this report.

## Counts

- Claims: **45** (c01–c45), every one with a verbatim quote fetched on 2026-11-19 via browser text-fetch.
- Sources: **18**, all official Government of India (PIB / DD News / MHA) — the only publishers the `important_days` profile allows besides NCERT.
- Practice questions: **45** — basic 12, moderate 19, difficult 8, exam 6 (MATCH, CHRONOLOGY, PAIRS, STATEMENT ×2, ASSERTION_REASON ×2 among them); all 6 sections tested.
- Sections: 6, organised week-wise (week 1; week 2; week 3; week 4 in two halves; closing review/confusions section). `quick_revision` is a date-ordered Bengali table (12 day rows). `timeline` is the honest equivalent for this book: the month itself, date-ordered (sort_year = day of month).

## Sources actually fetched (title + URL)

1. DD News — "Best wishes to all hardworking doctors on Doctors' Day: PM Modi" — https://ddnews.gov.in/en/best-wishes-to-all-hardworking-doctors-on-doctors-day-pm-modi/
2. PIB (PMO) — PM addresses Doctors' Day programme, 1 July 2021 (PRID 1731904) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1731904
3. PIB (MoS&T) — Dr. Jitendra Singh on Doctors' Day / Dr. B.C. Roy's era (PRID 2144395) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144395
4. PIB (DAHD) — Session to mark World Zoonoses Day (PRID 2031381) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2031381
5. PIB feature — "11th July – World Population Day" (PRID 1495120) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1495120
6. PIB (MoHFW) — World Population Day 2024 event, theme (PRID 2032409) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2032409
7. PIB (MSDE) — Rajya Sabha reply on National Skill Development Mission (PRID 1596324) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1596324
8. PIB (MEA) — Mandela Day exhibition, 18 July 2023 (PRID 1940591) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1940591
9. PIB (Ministry of I&B, Films Division) — "Nelson Mandela: A Messiah of Freedom" (PRID 1736453) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1736453
10. Ministry of Home Affairs — List of all National/International/Special Days/Events (PDF) — https://www.mha.gov.in/files/policies_guidelines_document/dayslist.pdf
11. PIB (Defence, PIB Pune) — Kargil Vijay Diwas, 26 July 2022 (PRID 1844944) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1844944
12. PIB (Finance, CBDT) — 159th Income Tax Day (PRID 1580003) — https://pib.gov.in/PressReleasePage.aspx?PRID=1580003
13. PIB backgrounder — World Hepatitis Day 2024, "It's Time For Action" — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/jul/doc2024728356601.pdf
14. PIB (MoHFW) — Year Ender 2018, NVHCP section (PRID 1559536) — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1559536
15. PIB (MoEFCC) backgrounder — International Tiger Day (PRID 2290233) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290233
16. PIB (NCPCR) — Campaign on Combating Child Trafficking (PRID 1846304) — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1846304
17. PIB backgrounder — Nine Years of GST (30 June 2026) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/oct/doc_10265_20261026_14041401.pdf
18. PIB (Vice President's Secretariat) — Human trafficking address quoting the UN designation of July 30 (relid 192352) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=192352

## Subtopic coverage (subtopic: july)

Taught with GoI-sourced claims (12 days): National Doctors' Day (1 Jul), GST Day (1 Jul), World Zoonoses Day (6 Jul), World Population Day (11 Jul), World Youth Skills Day (15 Jul), Nelson Mandela International Day (18 Jul), National Broadcasting Day (23 Jul), Income Tax Day (24 Jul), Kargil Vijay Diwas (26 Jul), World Hepatitis Day (28 Jul), International Tiger Day (29 Jul), World Day against Trafficking in Persons (30 Jul). Annual themes are included only with their year written explicitly (Population Day 2017; India's Population Day event 2024; Hepatitis Day 2024).

## PYQ candidates

Found **2**, mapped **2**, taught **2** (see `pyq_map_DAY-07.json`):

- `GK-DAY-007` — the GK bank's July topic pack (the only `important_days.jsonl` item with subtopic `july`). All three embedded questions taught; its World Nature Conservation Day element is disclosed as untaught (source gap).
- `WBPSC-CLERKSHIP-PART-I-2023-SESSION-II-Q64` — real Clerkship 2023 question on Mandela and the anti-apartheid movement; taught in week3 (PIB calls Mandela "the icon of the anti-apartheid movement").

Corpus grep of `db/pyq/*.json` for July-day topics found no other genuine candidates: the remaining hits were incidental (Mandela/Kargil appearing only as distractors or place names — e.g. Miscellaneous 2023 Q30 on Martin Luther King Jr., Clerkship 2023 Session I Q99 on Parkachik Glacier, Kargil district) and were excluded.

## Gaps (disclosed, never filled from memory)

1. **World Nature Conservation Day (28 July)** — listed in GK-DAY-007 and in most commercial lists, but no PIB/MoEFCC/GoI page confirming it could be fetched (searched explicitly). Not taught; the chapter carries an `exam_note` in week4_health_nature disclosing this, in the project's established style.
2. **Other commonly listed July days with no official GoI source fetched** — World UFO Day (2 Jul), International Plastic Bag Free Day (3 Jul), Malala Day (12 Jul), World Day for International Justice (17 Jul), International Moon Day / World Chess Day (20 Jul), International Day of Friendship (30 Jul), World Ranger Day (31 Jul): not taught.
3. **Dr B.C. Roy's birth/death years (1882/1962)** — the fetched GoI sources state that his birth and death anniversaries both fall on 1 July, the 1961 Bharat Ratna and the 1991 establishment, but do not print the years; the chapter therefore does not state them.
4. **Why 28 July for Hepatitis Day** (Dr Baruch Blumberg's birthday) — appears only in non-GoI sources; not taught.
5. **Mandela Day's UN declaration year (2009)** — not stated in the fetched PIB releases; the chapter teaches the date, the birth-anniversary link and the 2019–2028 Mandela Decade of Peace instead.
6. **Source disagreement noted**: the MHA days list records World Population Day as observed since 1987, while the PIB feature says the Day was first celebrated in 1989 (five-billion milestone). The chapter follows the PIB feature; the MHA list is used only for Broadcasting Day, Kargil Vijay Diwas and the Vijay Diwas contrast, where its table text could be quoted.
7. **Chartered Accountants Day (1 July)** — ICAI is not a GoI publisher, so no ICAI source was used; the day is mentioned only to the extent a fetched DD News quote supports (the PM's remark that 1 July honours doctors and chartered accountants, claim c04).
8. MHA days-list quotes (c24–c26) come from a table whose PDF text extraction is fragmented; quotes were kept to the exact cell wording.
