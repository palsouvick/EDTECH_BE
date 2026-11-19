# DAY-03 — মার্চের দিবস — Draft Report

- **Chapter:** DAY-03, part `q1`, subtopic `march` (title/subtopics verbatim from `important_days/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/day-03/chapter.json` → **OK**
- **Claims:** 28 (all with verbatim quotes from fetched PIB pages)
- **Questions:** 42 (basic 11, moderate 16, difficult 8, exam 7; 7 per section × 6 sections)
- **Sections (6):** week1_wildlife_safety, week2_jan_aushadhi_women, week3_consumer_vaccination, week4_forests_water, week4_martyrs_tb, date_traps

## Sources actually fetched (browser.open, 2026-11-19) — all PIB / *.gov.in (allowed publisher GOVT)

| id | Title | URL |
|---|---|---|
| s1 | World Wildlife Day 2025 — PIB Backgrounder (MoEFCC) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2107821&reg=3&lang=1 |
| s2 | PM's Mann Ki Baat Ep. 41 (25 Feb 2018), English rendering — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1521626&reg=3&lang=2 |
| s3 | 52nd National Safety Week, CVRDE Avadi — PIB Chennai | https://pib.gov.in/PressReleasePage.aspx?PRID=1905350 |
| s4 | Generic medicines, Lok Sabha reply (Jan Aushadhi Diwas) — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1943658&reg=48&lang=2 |
| s5 | International Women's Day 2026 celebration, MWCD — PIB | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2236240&reg=3&lang=2 |
| s6 | World Consumer Rights Day 2023, Dept. of Consumer Affairs — PIB | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1906882&reg=3&lang=2 |
| s7 | National Vaccination Day (March 16): Mission Indradhanush — PIB Explainer (MoHFW) | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2023/mar/doc2023316172401.pdf |
| s8 | MoEFCC celebrates International Day of Forest (21 Mar 2022) — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1807877&reg=48&lang=2 |
| s9 | World Water Day Conclave 2026, Ministry of Jal Shakti — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2243293&reg=3&lang=2 |
| s10 | World Meteorological Day (23 Mar), Navy METOC seminar — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2016642&ui=2&tf=1&pli=1&reg=48&lang=2 |
| s11 | Vice President's tribute on Shaheed Diwas (23 Mar 2023) — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=1909918&ui=2&tf=1&pli=1&reg=3&lang=2 |
| s12 | World TB Day 2026, MoHFW — PIB | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2244703&reg=3&lang=2 |

## Subtopic coverage (march) — days taught, each with date + reason

3 Mar World Wildlife Day · 4 Mar National Safety Day (+ Safety Week 4–10 Mar) · 7 Mar Jan Aushadhi Diwas (PMBJP/generic medicines) · 8 Mar International Women's Day (MWCD) · 15 Mar World Consumer Rights Day (helpline 1915) · 16 Mar National Vaccination Day (Mission Indradhanush 2014) · 21 Mar International Day of Forests · 22 Mar World Water Day (since 1993, SDG 6) · 23 Mar World Meteorological Day (WMO, 1950) + Shaheed Diwas (1931) · 24 Mar World TB Day. Annual themes are always taught with their year stated (Wildlife 2025, Forests 2022, Consumer 2023, Meteorological 2024, TB 2026).

## PYQ candidates

- Found: **2** — `GK-DAY-003` (GK bank, subtopic march) and `WBCS-EXE-PRELIMS-2016-PRELIMS-Q183` (real WBCS Prelims 2016 question, World Consumer Rights Day).
- Mapped: **2/2** in `pyq_map_DAY-03.json`.
- Taught: both mapped items are taught, **with one partial exception**: GK-DAY-003 also lists 20 March (International Day of Happiness), which is **not taught** (see gaps) — recorded in the map note.

## Gaps (disclosed, never filled from memory)

1. **20 March — International Day of Happiness** (listed in GK-DAY-003): no official GoI/NCERT source was fetched for it in this run, so it is not taught.
2. **Other commonly listed March days not taught** for the same reason (no fetched official GoI source): World Sparrow Day (20 Mar), World Poetry Day (21 Mar), World Down Syndrome Day (21 Mar), International Day for the Elimination of Racial Discrimination (21 Mar), Zero Discrimination Day / World Civil Defence Day (1 Mar), CISF Raising Day (10 Mar).
3. **CITES link for World Wildlife Day** (3 March marks CITES adoption): the fetched PIB backgrounder (s1) does not state this in the text retrieved, so the CITES reason is not asserted in the chapter.
4. **Kennedy 1962 origin of Consumer Rights Day** and **National Consumer Day (24 December)**: appear in the PYQ corpus explanation / non-official summaries but were not in a fetched official source used here, so they are not taught.
5. **Robert Koch / 1882 origin of World TB Day**: not stated in the fetched MoHFW release; not taught.
6. Forests Day date rests on the MoEFCC release of the 21 March 2022 celebration (s8); the release does not contain a standalone "21 March" date sentence — the date is evidenced by the release's own celebration context.
