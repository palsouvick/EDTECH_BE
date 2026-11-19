# WBI-04 — শিল্পাঞ্চল ও পার্ক (subtopic: industrial_areas) — Draft Report

Status: DRAFT / UNVERIFIED. Validator: `node scripts/validateBooks.js chapter.json` → **OK**.

## Counts
- Claims: **40** (all with verbatim quotes from fetched pages)
- Practice questions: **42** (basic 14, moderate 14, difficult 7, exam 7; all 7 sections tested)
- Sections: 7 (park_model, haldia_area, falta_sez, kolkata_ring, western_belt, north_bengal, how_parks_work)
- PYQ candidates: **10** mapped, **2 taught** (see pyq_map_WBI-04.json)

## Sources actually fetched (browser.open, 2026-11-19) — all allowed GOVT publishers
1. WBIIDC — Corporation profile — https://wbiidc.wb.gov.in/profile
2. WBIIDC — Haldia Industrial Park — https://wbiidc.wb.gov.in/haldia
3. WBIIDC — Uluberia Industrial Park — https://wbiidc.wb.gov.in/uluberia
4. WBIIDC — Falta Industrial Park, Sector IV — https://wbiidc.wb.gov.in/faltas4
5. WBIIDC — Dabgram Industrial Park — https://wbiidc.wb.gov.in/dabgram
6. WBIIDC — Kalyani Industrial Park, Phase III — https://wbiidc.wb.gov.in/kalyani3
7. WBIIDC — Kharagpur Industrial Park — https://wbiidc.wb.gov.in/kharagpur
8. PIB — Falta SEZ exports/employment/investment release (10 June 2026) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2271151&reg=48&lang=2
9. Silpasathi (Govt. of West Bengal) — Industrial Parks under WBIDC — https://silpasathi.wb.gov.in/industrial-parks-wbidc

All time-sensitive figures (unit counts, employment, investment, Falta SEZ exports) carry their source and as-of date in the claim text (pages read 2026-11-19; PIB release dated 10 June 2026, figures for FY 2025-26).

## PYQ candidates
- From `db/gk/wb_industry.jsonl` (subtopic `industrial_areas`): GK-IND-007 (Haldia), GK-IND-008 (Sector V/New Town) — both mapped, both **untaught** with specific reasons in the map.
- From `db/pyq/*.json` (genuinely on-topic): WBCS 2021 Q112 (Falta EPZ — **taught**), Clerkship 2006 Q24 (SEZ full form — **taught**), WBCS 2023 Q59 (Haldia industries), Misc 2023 Q18 (Haldi–Hooghly confluence), WBCS 2017 Q144 (Haldia riverine port), WBCS 2022 Q128 (Haldi river formation), WBCS 2017 Q188 (SEZ Act commencement), WBCS 2018 Q132 (Kolkata dry port) — mapped untaught with reasons.

## Subtopic coverage
industrial_areas covered through: the park model and WBIIDC; Haldia; Falta park + Falta SEZ; the Kolkata ring (Uluberia, Kalyani); the western belt (Kharagpur/WBIIDC, Vidyasagar/Panagarh/Plasto Steel/WBIDC); North Bengal (Dabgram, Fatapukur PPP); and how parks work (99-year lease, pre-approved clearances, CFC).

## Gaps (disclosed, never filled from memory)
1. **Sector V / New Town IT corridor (GK-IND-008)**: SALTLEC (1989, Webel), NDITA's governance of Sector V and the Bengal Silicon Valley Tech Hub could not be sourced from any allowed *.gov.in / *.nic.in page — NDITA and Webel publish on non-gov.in domains, and no PIB/WB-gov page carrying these specifics was found. The chapter therefore does not teach them; the bank item is mapped untaught.
2. **Haldia specifics in GK-IND-007**: the two dock systems of Syama Prasad Mookerjee Port (KDS/HDC) and HPL's 2000 start of commercial production are not in the fetched WBIIDC Haldia page (the port authority's own site is on shipping.gov.in but was not fetched in this run); not asserted.
3. **WBCS Haldia keys**: the official keys' refinery + fertiliser pairing (2023 Q59), the Haldi–Hooghly confluence (Misc 2023 Q18), the riverine-port classification (2017 Q144) and the Haldi's formation (2022 Q128) are river/port facts outside the fetched industrial-park pages; mapped untaught.
4. **SEZ Act 2005 commencement date** (WBCS 2017 Q188) and **Kolkata dry port/ICD** (WBCS 2018 Q132): not in the fetched sources; untaught.
5. **WBSIDC industrial estates** (e.g. Behala, Tangra, Kasba, Bantala leather complex): WBSIDC publishes on non-gov.in domains (wbsidcl.in), which the book's publisher profile does not allow; the Bantala–leather pairing is therefore only named in an exam_note as belonging to WBI-03, not taught here.
6. **NCERT generic industry concepts**: no NCERT PDF was fetched in this run (the chapter is built entirely on WB Government park pages, which the profile allows); location-theory framing is written as original explanation tied to the fetched park facts only.
7. One fetch failure: https://wbiidc.wb.gov.in/growth-centres could not be opened by the text-fetch tool; its park-table totals were not used (the profile page's totals are used instead).
8. Internal inconsistency in a source, disclosed in the chapter: Uluberia's page gives 72 units in the snapshot and 70 in the performance table; the chapter teaches students to treat the figures as as-of-date snapshot data (question q41).
