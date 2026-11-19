# SAF-06 দূষণ নিয়ন্ত্রণ (Pollution Control) — Draft Report

Chapter: SAF-06, book `industrial_safety`, part `hazards_environment`, subtopic `pollution_control` (title/part/subtopics verbatim from `db/books/industrial_safety/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Deliverables
- `chapter.json` — 6 sections, 68 claims, 42 questions, 10 sources.
- `pyq_map_SAF-06.json` — 7 candidates mapped, 4 taught.

## Sources actually fetched (browser.open, 2026-11-19) — all GOVT publishers per PROFILES.industrial_safety
1. Introduction | Central Pollution Control Board — https://cpcb.nic.in/Introduction/
2. The Water (Prevention and Control of Pollution) Act, 1974 — India Code — https://upload.indiacode.nic.in/showfile?actid=AC_MP_74_308_00001_00001_1543231213781&type=actfile&filename=water_act_1974.pdf
3. The Air (Prevention and Control of Pollution) Act, 1981 — India Code — https://www.indiacode.nic.in/bitstream/123456789/21429/1/the_air_%28prevention_and_control_of_pollution%29_act%2c_1981.pdf
4. The Environment (Protection) Act, 1986 — Chandigarh Pollution Control Committee document store — https://chocmms.nic.in/SPCB_DOCUMENTS/EPAct1986.pdf
5. Online Consent Management & Monitoring System — Consent FAQ | Chandigarh PCC — https://chocmms.nic.in/index.gsp
6. Revised Categorisation of Industries (R/O/G/W) | Maharashtra Pollution Control Board — https://mpcb.gov.in/index.php/en/consentmgt/revised-industry-categorization
7. Classification of Sectors into Red, Orange, Green, White and Blue Categories (Jan 2025) | CPCB — https://cpcb.gov.in/openpdffile.php?id=TGF0ZXN0RmlsZS9fMTczNzYxMzk2OV9tZWRpYXBob3RvMTEzODMucGRm?
8. The Noise Pollution (Regulation and Control) Rules, 2000 | Forest, Environment & Climate Change Dept., Govt. of Odisha — https://forest.odisha.gov.in/sites/default/files/2022-03/The%20Noise%20Pollution%20%28Regulation%20and%20Control%29%20Rules%2C%202000.pdf?ref=slightlyacidic.com
9. Annual Report 2020-2021 | West Bengal Pollution Control Board — https://www.wbpcb.gov.in/files/Th-12-2022-12-52-08Annual%20Report%202020-21.pdf
10. About Us | National Green Tribunal — https://www.greentribunal.gov.in/about-us

## Counts
- Claims: 68 (c01–c68), every claim carrying a verbatim quote from a fetched page above; every claim is used at least once (machine-checked).
- Questions: 42 — basic 8, moderate 19, difficult 8, exam 7; formats: DIRECT 34, STATEMENT 4, ASSERTION_REASON 1, PAIRS 1, CHRONOLOGY 1, MATCH 1. Every section has questions (basics 7, water_act 9, air_act 7, epa_act 7, consent_categories 7, rules_enforcement 5).
- Sections: 6 (basics, water_act, air_act, epa_act, consent_categories, rules_enforcement), each with quick/standard, deep where useful, and one box.
- `people` is an empty array (no individual persons belong to this statutory subject; institutions are covered in sections/terms instead). `events`/`timeline` carry the legal milestones (1972 Stockholm → 2025 CPCB revision).

## PYQ candidates
Found 7 real candidates; mapped 7; taught 4.
- From `db/gk/industrial_safety.jsonl` (subtopic `pollution_control`): GK-SAF-009 (Water Act/boards), GK-SAF-010 (Air Act consent), GK-SAF-011 (EPA umbrella), GK-SAF-012 (CTE/CTO + colour ladder) — all 4 taught, mapped to water_act / air_act / epa_act / consent_categories.
- From `db/pyq/*.json` (grep for pollution): WBCS-EXE-PRELIMS-2019-PRELIMS-Q148 (noise threshold — NOT taught, see gaps), WBCS-EXE-PRELIMS-2023-PRELIMS-Q163 (Delhi Winter Action Plan — current affairs, not taught), WBPSC-CLERKSHIP-PART-I-2009-SESSION-II-Q1 (Green Bench — not taught).
- A fourth grep hit (WBCS 2015 Q166, Mudgal Committee) mentions pollution only in a distractor/explanation and is not a pollution-control question; excluded as not genuinely on-topic.

## Subtopic coverage (pollution_control)
Definitions (EPA s.2, Water Act s.2, Air Act s.2 incl. noise) · Water Act 1974 (Art. 252 basis, ss. 3/4 boards, 16/17 functions, 24 prohibition, 25/26 consent, deemed consent) · CPCB/SPCB system incl. UT rule and the 1988 renaming · Air Act 1981 (Stockholm preamble, in force 16 May 1981, ss. 16/17, 19 control areas, 21 consent, 22 emission bar, NAMP) · EPA 1986 (umbrella, Act 29, in force 19 Nov 1986, ss. 3/5/6/7) · Consent system (CTE/CTO, water vs air consent) · Industry colour classification (1989 Doon Valley origin, s.18(1)(b) harmonisation, PI construction, 2016 bands + sector counts, White CTO exemption, Red bar in sensitive areas, Jan 2025 revised bands + Blue category) · Noise Rules 2000 (parentage, S.O. 123(E), zone table, day/night, silence zone, loudspeaker rule) · EIA Notification (1994 → 2006 restructuring, SEIAA/SEAC, A/B categories) · Hazardous Wastes Rules 2016 occupier duty · NGT 2010 (6-month endeavour, Kolkata sitting) · Bengal connection (WBPCB 1974, Paribesh Bhawan HQ, first SEIAA state).

## Gaps (disclosed, never filled from memory)
1. **Article 253 basis of the Air Act / EPA** (asserted in GK bank cards GK-SAF-010/011): the fetched India Code texts of both Acts do not state it; only the Stockholm basis from the Acts' own preambles is taught. The pyq map notes this on both cards.
2. **Bhopal-trigger framing of the EPA** (GK-SAF-011 card statement): no allowed-publisher quote was fetched, so the chapter does not teach it; noted in the map and in the chapter's verification notes.
3. **WBCS 2019 Q148's ~80 dB noise threshold**: a physiological/general-science fact absent from all fetched official sources; the chapter teaches the statutory zone limits instead. Mapped taught=false with the reason.
4. **2025 vs 2016 PI bands**: both are taught and the conflict is flagged head-on in the consent_categories deep text and an exam note — bank/exam convention follows 2016 unless a paper specifies the revised methodology.
5. Air Act Section 31A (Board direction power) and Water Cess Act 1977 were seen in fetched material but left out to keep the chapter inside its registered subtopic scope; the Cess Act appears only in the Chandigarh FAQ's law list and is not examined in the bank cards for this subtopic.
6. Operational how-to content is excluded by design (exam knowledge only: what the Acts, standards, classifications and bodies ARE).
