# WBI-06 — সহায়তা প্রকল্প ও পরিষেবা — Draft Report

- Book: wb_industry · Code: WBI-06 · Number: 6 · Part: policy_support · Subtopics: support_schemes (verbatim from toc.js)
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/wbi-06/chapter.json` → **OK**

## Counts
- Claims: 44 (all with verbatim quotes from fetched pages; all used in the chapter)
- Practice questions: 42 (basic 13, moderate 17, difficult 6, exam 6; 7 per section × 6 sections)
- Sections: 6 — support_map, bhabishyat, silpasathi, incentives, outreach, apply_steps
- Sources: 7 (all GOVT publisher per PROFILES.wb_industry: *.gov.in / *.nic.in only)

## Sources actually fetched (browser.open, 2026-11-19)
1. Bhabishyat Credit Card Scheme — Dept of MSME & Textiles, Govt of WB — https://wb.gov.in/government-schemes-details-bhabisyat.aspx
2. Shilper Samadhane — Duare Sarkar (MSME) portal, Govt of WB — https://ds.wb.gov.in/MSME/Portal_New_Default.aspx
3. ICT Initiatives in the State — West Bengal (SilpaSathi), Informatics, NIC — https://informatics.nic.in/files/websites/jan-2024/west-bengal.php
4. Incentives/ Subsidies/ Schemes — Silpasathi, Govt of WB — https://silpasathi.wb.gov.in/node/10
5. About Silpa Sathi — Silpasathi, Govt of WB — https://silpasathi.wb.gov.in/node/7
6. Shilpasathi — Govt of WB scheme page — https://wb.gov.in/government-schemes-details-shilpasathi.aspx
7. MSME Facilitation Centre — Dept of MSME, Govt of WB — https://msme.wb.gov.in/node/3

Time-sensitive figures carry source + as-of in the claim text: MSME share (99%/98%, scheme page as accessed 2026-11-19); Silpasathi reach (2.5 lakh enterprises / 800+ compliances, NIC Informatics Jan 2024 issue, "past 12 months" at publication); Shilper Samadhane targets (portal edition shown on access, 2026-11-19).

## PYQ candidates
- Bank items with subtopic `support_schemes` in `db/gk/wb_industry.jsonl`: **2 found** — GK-IND-012, GK-IND-013. Both mapped and taught (see pyq_map_WBI-06.json; partial-coverage notes recorded there).
- Real exam PYQs: grepped `db/pyq/*.json` for Bhabishyat / Silpasathi / Shilper Samadhane / Udyam / MSME support-scheme items — **none found**. No code was invented; the map contains only the two real bank candidates.
- Taught: 2 of 2 candidates (with disclosed partial gaps below).

## Subtopic coverage
support_schemes covered in full breadth available from official sources: credit support (Bhabishyat), incentive basket (Silpasathi list), single-window service (Silpasathi/CAF/SWC/IFC), outreach (Shilper Samadhane), district hand-holding (MFC/SAG), application steps and documents.

## Gaps (disclosed, never filled from memory)
1. **Bhabishyat margin-money rate/cap** (bank item GK-IND-012 states 10% of project cost, cap ₹25,000): the fetched wb.gov.in scheme page says only that Government provides Margin Money Subsidy — no rate or cap. Not taught; the chapter teaches the existence of the subsidy only.
2. **Bhabishyat launch date / notification number** (April 2023, Notif. 75/MSMET): appears only in a non-gov.in publication (ICAI-hosted State MSME Policy PDF) found in search; not citable under this book's GOVT/NCERT-only rule, so no launch year is asserted in the chapter (the timeline uses only the fetched 2025 camp-edition entry).
3. **Banglashree scheme details** (zone-wise capital subsidy percentages, operative period 2020–2025, closure): available only on non-gov.in sites in this run; not taught. The chapter teaches only the incentive *types* listed on silpasathi.wb.gov.in/node/10.
4. **Shilper Samadhane camp venues** (blocks / municipalities / KMC wards, per bank item GK-IND-013): not stated on the fetched ds.wb.gov.in page; not asserted.
5. **Udyam registration thresholds / MSME classification limits**: no msme.gov.in page was fetched in this run (search surfaced only non-official guides); classification limits are not taught. Udyam appears only as the camps' registration target, as quoted.
6. **DIC (District Industries Centre) functions** beyond the MFC page: the fetched msme.wb.gov.in page covers MFCs located at DICs; a fuller DIC role description was not fetched from a gov.in page, so DICs are not separately taught.
7. `people` is an empty array: this chapter's actors are institutions (WBIDC, DIC/MFC, banks), not individuals; no honest person entries exist in the sources.
