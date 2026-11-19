# WBI-02 — MSME ক্ষেত্র — Draft Report

- Book: wb_industry (পশ্চিমবঙ্গের শিল্পচিত্র), Chapter WBI-02, part `present`, subtopic `msme_sector` (title/subtopics verbatim from toc.js).
- Status: DRAFT, verification UNVERIFIED.

## Sources actually fetched (browser.open, 2026-11-19) — all within PROFILES.wb_industry publishers (GOVT / NCERT)

1. Union Budget 2025-26 — PIB release (classification revision, credit guarantee, credit cards) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389
2. Udyam Registration portal, official homepage (classification criteria; Pre & Post 01-04-2025 table; free/paperless/self-declaration rules) — https://udyamregistration.gov.in/
3. PIB release, Rajya Sabha written reply (state-wise Udyam/UAP registrations as on 04.12.2023; Udyam w.e.f. 01.07.2020; UAP 11.01.2023; retail/wholesale inclusion; MSEFC/Samadhaan) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1985022&reg=3&lang=2
4. RAMP Strategic Investment Plan — West Bengal, Dept. of MSME & Textiles, GoWB (NSS 73rd-round scale and women shares; district-wise Udyam table as on 04.09.2023; Directorate zones/DIC/IDO structure; Bhabishyat Credit Card; Banglashree; Silpasathi; three MSEFCs) — https://ramp.msme.gov.in/ramp/sites/default/files/2026-05/west_bengal.pdf
5. PIB release, Lok Sabha written reply (women-owned MSMEs on URP+UAP till 30.11.2024 — WB 24,86,603 = 62%; CGS 90% for women; PMEGP subsidy rates; 3% procurement) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2083806&reg=48&lang=2

## Counts

- Claims: 41 (every claim carries a verbatim quote from a fetched page above; every time-sensitive figure carries its as-of date in the claim text)
- Practice questions: 42 — levels: {'basic': 15, 'moderate': 14, 'difficult': 7, 'exam': 6}; per-section: {'definition': 8, 'wb_scale': 8, 'women': 7, 'registration': 7, 'field_machinery': 6, 'credit_support': 6}
- Sections: 6 (definition, wb_scale, women, registration, field_machinery, credit_support)

## PYQ candidates

- GK bank (db/gk/wb_industry.jsonl, subtopic = msme_sector): 2 items found — GK-IND-003, GK-IND-004. Both mapped and taught (2/2).
- PYQ corpus (db/pyq/*.json): 1 genuinely on-topic item found — WBCS-EXE-PRELIMS-2016-PRELIMS-Q43 (Textiles–MSME MoU, Technology Centre at Kanpur). Mapped, taught = false, with reason in pyq_map_WBI-02.json.
- Total candidates: 3; mapped: 3; taught: 2.
- Excluded after inspection: WBPSC Clerkship 2023 Session-III Q80 ('Divya Kala Mela') mentions the Ministry of MSME only as a distractor option — the question is about the Ministry of Social Justice and Empowerment, not the MSME sector, so it is not a candidate for this chapter. The IDO-2019 paper contains no MSME-sector question (general GS paper).

## Subtopic coverage

msme_sector fully covered: definition and the April-2025 revised classification (with the 2020 limits for contrast), West Bengal's scale (NSS 73rd round and Udyam/UAP registration series), women entrepreneurs, Udyam/UAP registration, the Directorate–DIC–IDO field machinery, and credit guarantee / delayed-payment / State flagship support.

## Gaps (disclosed, never filled from memory)

1. wbmsmet.gov.in (the MSME & Textiles Department's own site) could not be fetched from this machine on 2026-11-19 (browser.open failed at source fetch). Directorate/DIC/IDO facts are therefore sourced from the RAMP Strategic Investment Plan (a GoWB department document hosted on msme.gov.in) rather than the department homepage; GK-IND-004's original wbmsmet quotes were NOT reused.
2. The gazette text of Notification S.O. 1364(E) (21 March 2025) was not fetched from a *.gov.in page in this run; the chapter states the revised limits and the 01-04-2025 changeover from the Udyam portal's own Pre & Post table and the Budget PIB release, and does not cite the notification number in student text.
3. The WBCS-2016 Kanpur Technology Centre MoU fact is untaught (see PYQ map) — no fetched allowed-publisher source verifies it.
4. No NCERT source is used: the chapter's facts are administrative/statistical and are carried by GOVT sources, which the wb_industry profile allows; NCERT carries no WB MSME data.
5. All registration statistics are point-in-time (latest used: 30.11.2024 for women-owned registrations) and will drift; the chapter prints the as-of date beside each figure.
