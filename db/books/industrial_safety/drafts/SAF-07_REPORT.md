# SAF-07 — মিশ্র অনুশীলনী — Draft Report

- **Book / chapter:** industrial_safety, SAF-07 (part: mixed, subtopics: [mixed]) — title and part taken verbatim from `db/books/industrial_safety/toc.js`.
- **Status:** DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.
- **Deliverables:** `chapter.json`, `pyq_map_SAF-07.json`, this report — in `~/workspace/edtech/bookwork/saf-07/`.

## Counts

- **Claims:** 53 (c01–c53), every one with a verbatim quote from a page/PDF actually fetched via browser.open in this run.
- **Questions:** 42 — basic 12, moderate 12, difficult 12, exam 6 (MATCH ×2, STATEMENT, CHRONOLOGY, PAIRS, ASSERTION_REASON); 7 per section across all 6 sections.
- **Sections (6):** factory_act_recap, hours_welfare, fire_electrical, chemical_bhopal, pollution_laws, osh_code.

## Sources actually fetched (all allowed GOVT publisher for this book)

1. The Factories Act, 1948 — Chapter I — Labour Department, GNCT of Delhi — https://labour.delhi.gov.in/it/chapter-1
2. Form No. 20, Abstract of the Factories Act, 1948 and Delhi Factories Rules, 1950 — Labour Department, GNCT of Delhi — https://labour.delhi.gov.in/it/form-no20
3. PIB Factsheet: OSH Code, 2020 (22 Nov 2025) — https://www.pib.gov.in/FactsheetDetails.aspx?Id=150475&reg=3&lang=1
4. CPCB — Water Pollution (Acts & Rules) — https://cpcb.nic.in/water-pollution/
5. CPCB — Air Pollution (Acts & Rules) — https://cpcb.nic.in/air-pollution/
6. The Environment (Protection) Act, 1986 — India Code — https://indiacode.gov.in/server/api/core/bitstreams/2eeec562-717d-4070-b70e-a91a4269c9ca/content
7. Indian Railways CAMTECH pamphlet: Classification of Fires & Types of Fire Extinguishers (IS 15683:2018, IS 2190:2010) — https://rb.indianrailways.gov.in/uploads/directorate/eff_res/camtech/ElectricalEngineering/YearWise/Pamphlet%20on%20Classification%20of%20Fires%20%26%20Types%20of%20Fire%20Extinguishers%20(1).pdf
8. ICMR Technical Report: Health Effects of the Toxic Gas Leak from the Union Carbide MIC Plant in Bhopal — https://www.icmr.gov.in/icmrobject/custom_data/1720338063_bgdrc-technical_report.pdf
9. CPCB reply in NGT OA No. 197/2024 (WZ), annexing CPCB Directions 07.03.2016 on Red/Orange/Green/White categorisation — https://www.greentribunal.gov.in/sites/default/files/news_updates/Reply%20by%20R-3%20in%20OA%20No.197-2024%20(Ealier%20OA%20No.1161-2024)%20(page%20nos.11-115).pdf

## PYQ candidates

- **Found:** 2 — **mapped:** 2 — **taught:** 2.
- `GK-SAF-013` — the only item in `db/gk/industrial_safety.jsonl` with subtopic `mixed` (OSH Code, 2020) → taught in section `osh_code`.
- `WBPSC-MISC-2023-PRELIMS-Q8` — real PYQ found by grepping `db/pyq/*.json` (WBPSC Miscellaneous Prelims 2023, Q8; the corpus record carries no code field, so the identifier is derived from its pyq metadata — exam, year, question number — and flagged as such in the map). Bhopal 1984 appears as a distractor option; the underlying Bhopal facts are taught in `chemical_bhopal`. The item's own answer (COVID-19 as a biological disaster) is outside this book's scope — noted in the map.
- No other pyq corpus items on this chapter's topics were found.

## Subtopic coverage

The chapter's single registered subtopic is `mixed`: the chapter is a mixed drill over the whole book — Factories Act definitions and welfare ladder (SAF-01/02), fire classes, extinguisher colour bands and electrical-fire rules (SAF-03/04), Bhopal and hazardous processes (SAF-05), the Water/Air/EP Act trio, CPCB categorisation and CTE/CTO (SAF-06), plus the OSH Code, 2020 as the unifying new topic (the `mixed` GK item GK-SAF-013).

## Gaps (disclosed, not filled)

1. **Earthing / RCCB / ELCB** (GK-SAF-007, SAF-04 territory): no fetched allowed-publisher page in this run carried a quotable statement, so the mixed chapter does not re-teach earthing/RCCB facts; electrical safety here is limited to the fetched Indian Railways material (no separate class for electrical fires; permitted extinguisher media).
2. **PPE detail** (GK-SAF-014, SAF-02 territory): only the Factories Act s.35 eye-protection provision was quotable from fetched sources; the PPE hierarchy/last-line-of-defence framing is not re-taught here.
3. **Safety Officer at 1,000 workers** (Factories Act s.40B, in GK-SAF-003): the fetched Delhi abstract (Form No. 20) does not carry s.40B, so the 1,000-worker Safety Officer rung is omitted rather than asserted; the ladder taught here stops at the fetched rungs (canteen 250, ambulance room 500, Welfare Officer 500).
4. **DG FASLI** (dgfasli.gov.in): the homepage fetch failed (unresolvable in this run); no DG FASLI institutional claims are made.
5. **OSH Code commencement date** (21 November 2025, widely reported): the fetched PIB factsheet is dated 22 Nov 2025 but its fetched text does not state the commencement date in a quotable line, so no commencement-date claim is made; the timeline ends at enactment (2020).
6. **White-category consent exemption**: the fetched CPCB reply states CTE/CTO is required for Red/Orange/Green; the White exemption is implied, not quoted, so the chapter teaches only the positive requirement and does not assert the exemption.
7. Bengal connection is generic (state-board consent applies in West Bengal as elsewhere); no West Bengal-specific fetched source was used, and none was invented.
