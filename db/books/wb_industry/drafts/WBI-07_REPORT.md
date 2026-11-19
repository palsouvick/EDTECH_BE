# WBI-07 — মিশ্র অনুশীলনী — Draft Report

Status: DRAFT / UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## What this chapter is
The book's mixed revision chapter (part `mixed`, subtopic `mixed`, TOC title verbatim). It re-teaches and drills the whole book in six sections — heritage_mix, msme_mix, key_industries_mix, areas_mix, support_mix, exam_strategy — with anchor dates, the revised MSME table, classification logic, the WBIIDC park model, scheme-vs-portal distinctions, and an explicit exam-trap section naming which WB exams (Clerkship, WBCS, IDO, WBP) ask this material and how.

## Counts
- Claims: **42** (all with verbatim quotes from fetched pages)
- Practice questions: **42** — basic 15, moderate 14, difficult 7, exam 6; every section tested (7 questions each)
- Sections: 6; sources: 8 (all GOVT *.gov.in/*.nic.in or NCERT, per PROFILES.wb_industry)

## Sources actually fetched (browser.open, 2026-11-19)
1. NCERT Class X Contemporary India II, Ch. 6 Manufacturing Industries — https://ncert.nic.in/textbook/pdf/jess106.pdf
2. Ministry of Coal — History and Background — https://coal.nic.in/about-us/history-background
3. WBIIDC — Profile — https://wbiidc.wb.gov.in/profile
4. WBIIDC — Haldia Industrial Park — https://wbiidc.wb.gov.in/haldia
5. PIB — Union Budget 2025-26 MSME classification revision (PRID 2098389) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389
6. Dept. of MSME & Textiles, Govt. of WB — portal/services — https://msme.wb.gov.in/
7. Silpasathi — State Single Window portal — https://silpasathi.wb.gov.in/
8. Chittaranjan Locomotive Works — About Us — https://clw.indianrailways.gov.in/ministry/about-us

Time-sensitive figures carry their as-of context in the claims: MSME limits and the 1 crore / 7.5 crore / 36% figures are stated as Budget 2025-26 figures (c18–c24); CLW's 580 locomotives is FY 2023-24 (c40).

## PYQ candidates
- Bank (`db/gk/wb_industry.jsonl`, subtopic `mixed`): **1 found** — GK-IND-014 (BGBS). Mapped, **taught: false** (see gaps).
- PYQ corpus (`db/pyq/*.json`) genuinely on this chapter's topics: **4 found** — KP Constable 2023 Q66 (CLW district), WBPSC Miscellaneous 2023 Q18 (Haldia port rivers), WBCS Prelims 2023 Q59 (Haldia industries), WBCS Prelims 2016 Q43 (MSME/Textiles Technology Centre). All mapped in `pyq_map_WBI-07.json`.
- **Total: 5 candidates, 5 mapped, 0 taught** — each untaught entry carries its specific reason in the map. The chapter's own 42 practice questions cover the same ground (CLW, Haldia, MSME) from sourced facts, but no corpus item's exact answer is fully supported by a fetched allowed quote, so none is claimed as taught.

## Subtopic coverage
Registered subtopic `mixed` only (per toc.js). Content deliberately spans the book's other subtopics as revision — industrial_roots (coal/jute/CLW), msme_sector (revised limits), key_industries (jute/steel classification), industrial_areas (WBIIDC/Haldia), support_schemes (Bhabishyat, Banglashree, Textile Incentive 2022, ODOP, Silpasathi) — without registering them as this chapter's subtopics.

## Gaps (disclosed, never filled from memory)
1. **BGBS (GK-IND-014) not taught.** The Bengal Global Business Summit's official page is on wbidc.com — outside this book's allowed publishers (GOVT/NCERT). No *.gov.in/*.nic.in page carrying the summit's facts (flagship status, WBIDC nodal role, 8th edition dates/venues, proposal figures) could be fetched. If an allowed gov.in BGBS page is later found, the item can be taught in a revision.
2. **WBIDC facts not taught.** For the same reason (wbidc.com only), WBIDC's formation year and roles are not asserted; the chapter's dont_confuse box names the WBIIDC/WBIDC distinction but teaches facts only about WBIIDC (wbiidc.wb.gov.in).
3. **Darjeeling tea GI not taught.** The Tea Board's Darjeeling page (teaboard.gov.in) could not be fetched in this run (fetch failed), so the "first GI product" fact — covered as a bank item under key_industries (GK-IND-011) — is not re-taught here. Only the MSME&T portal's GI-products listing is cited (c42).
4. **Haldia specifics beyond the park page** (Haldi–Hooghly confluence, petroleum refinery) are not in the fetched WBIIDC pages and are not taught — see pyq map.
5. **Scheme details** (Bhabishyat loan caps/eligibility, Banglashree rates) are taught in WBI-06 from its own sources; here only the department-portal listing of each scheme is claimed (c31, c41), to avoid re-asserting figures not re-fetched in this run.
6. **people[] is empty** — no person-level fact was needed for a mixed revision chapter; the validator does not require people for this non-dated book.
