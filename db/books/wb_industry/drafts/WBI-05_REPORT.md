# WBI-05 — শিল্পনীতি ও সংস্থা (industrial_policy) — Draft Report

- **Book / chapter:** wb_industry, WBI-05, part `policy_support`, subtopic `industrial_policy` (title/subtitle/part/subtopics taken verbatim from `db/books/wb_industry/toc.js`).
- **Status:** DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/wbi-05/chapter.json` → **OK**.
- **Counts:** 42 claims (c01–c42, every claim used), 42 practice questions (basic 10, moderate 15, difficult 10, exam 7), 7 sections, 9 sources, 8 events, 8 timeline rows, 10 terms, 2 cause–effect chains, 12 quick-revision points.
- **Deliverables:** `chapter.json`, `pyq_map_WBI-05.json`, this `REPORT.md` — all in `~/workspace/edtech/bookwork/wbi-05/`.

## Sources actually fetched (browser.open, all within the wb_industry validator profile: GOVT *.gov.in/*.nic.in + NCERT)

1. Doing Business in Bengal — West Bengal State Portal — https://wb.gov.in/business-doing-business-in-bengal.aspx (WBIDC formed 1967, four support routes, responsibilities, SilpaSathi/SIFC)
2. Department Details: Industry, Commerce and Enterprises — West Bengal State Portal — https://wb.gov.in/departments-details.aspx?id=D180824112903743&page=Industry,-Commerce-and-Enterprises (ICE = large industries; MSME&T = nodal agency for MSMEs incl. textiles/handicrafts; PE&IR objective; WBIRS 2001)
3. About Silpa Sathi — Silpasathi, Govt. of West Bengal — https://silpasathi.wb.gov.in/node/7 (digital gateway; no-office-visit licences; 23 IFC kiosks)
4. Department Wise Services — Silpasathi — https://silpasathi.wb.gov.in/eodb-services-list (WBIDC/WBIIDC land allotment, MSME Incentives, WBPCB Consent to Establish)
5. West Bengal Single Window System Rules, 2017 — Kolkata Gazette, 24 Oct 2017 — https://www.wbindustries.gov.in/acts&policy/SilpaSathi/single_window_system_rules_2017.pdf (Silpa Sathi agency definition, Single Window System definition, CAF, stipulated-time disposal)
6. Administrative Calendar 2022 — Government of West Bengal — https://par.wb.gov.in/writereaddata/WBCSdirectory/calendar.pdf (three 2021 policies; WBSIDCL Integrated Silk Park, Malda)
7. Assistances — Directorate of MSME, Govt. of West Bengal — https://msme.wb.gov.in/assistances (DIC at district, IDO at block; land/shed assistance; WBSIDC infrastructure support; WB Incentive Scheme 2007)
8. About SAIP 2020 — State Approved Industrial Park — https://saipwbsidc.wb.gov.in/ (SAIP objective; WBSIDCL nodal organisation; SAIP = WB Incentive Scheme 2020 for AIP)
9. NCERT Class XI, Indian Economic Development, Ch. 2: Indian Economy 1950–1990 — https://ncert.nic.in/textbook/pdf/keec102.pdf (IPR 1948, IPR 1956 three categories, licensing, small-scale industry protection, industry GDP share, permit-licence-raj critique, 1991 policy)

## PYQ candidates (real items only)

Found 4, mapped 4, taught 3:

| Code | Source | Section | Taught |
|---|---|---|---|
| GK-IND-005 | `db/gk/wb_industry.jsonl` (subtopic industrial_policy) | wbidc | Yes — WBIDC 1967 + roles and WBSIDC estate role taught; WBSIDC's 1961 year NOT asserted (see gaps) |
| GK-IND-006 | `db/gk/wb_industry.jsonl` (subtopic industrial_policy) | sector_policies | No — only the Ethanol Policy's existence/year (2021) taught; tested details exist only on wbidc.com (see gaps) |
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q28 | `db/pyq/wbcs-prelims-2022.json` (WBIDC established 1967) | wbidc | Yes |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q134 | `db/pyq/wbcs-prelims-2021.json` (First Industrial Policy Resolution 1948) | policy_foundations | Yes |

The WBCS 2016 MSME/Textiles Technology Centre item (Kanpur) and Clerkship 2023 Session-III Q80 (Divya Kala Mela host ministry) were checked and excluded: neither is genuinely on West Bengal industrial policy/institutions.

## Subtopic coverage

`industrial_policy` covered across: national policy foundations (IPR 1948/1956, licensing, 1991 turn), small-scale-industry policy rationale, the State's two departments (ICE vs MSME&T), WBIDC, WBSIDC + DIC/IDO field machinery, the SilpaSathi single-window system and the 2017 Act/Rules, and sector policies/incentive schemes (Ethanol/Sand/Data Centre 2021, WBIS 2007, SAIP 2020, WBIRS 2001). Every section has questions at multiple levels.

## Gaps (disclosed, never filled from memory)

1. **WBSIDC founding year (1961):** stated on wbsidcl.in and in the GK bank (GK-IND-005), but no *.gov.in/*.nic.in page fetched states it, and wbsidcl.in is outside this book's allowed publishers. The chapter teaches WBSIDC's role only; the year is not asserted anywhere in student text or questions.
2. **Ethanol Policy 2021 details:** Cabinet decision date (2 Sep 2021), Notification No. 140-ICE dated 7 Sep 2021, the fuel-grade green-field eligibility and the incentive list (e.g. 5-year electricity-duty waiver) exist only in the notification PDF hosted on wbidc.com — outside the allowed publishers. Only the policy's existence and year are taught (par.wb.gov.in). Hence GK-IND-006 is mapped taught=false.
3. **West Bengal Investment Promotion Policy, 2026:** unveiled 5 Nov 2026 (news reports; launch booklet hosted on wbidc.com). No notification or booklet on a *.gov.in/*.nic.in domain was found/fetched, so the 2026 policy — including its 100%/110%/120% assistance ceilings, ₹5,000 crore fund and 30/45-day certificate timelines — is **not** taught in this draft. It will need a gov.in-notified source before it can enter the chapter; flagging for the review stage because exam current-affairs questions may target it.
4. **Bengal Global Business Summit (BGBS):** no citable *.gov.in/*.nic.in page with summit facts (editions, proposal totals) was found; BGBS is therefore mentioned nowhere in the chapter rather than sourced from news/coaching sites.
5. **WBIIDC profile:** the corporation's own profile page is served over http (wbiidc.wb.gov.in), which the validator's GOVT pattern (https only) rejects; WBIIDC appears only via the Silpasathi service list (land allotment/building-plan services), with no founding-year claim (1974 not asserted).
6. **Figures:** no MSME counts, investment or employment figures are used in the chapter — the available numbers (e.g. ~90 lakh MSMEs) circulate only on non-gov.in pages, so per the brief they are omitted rather than cited.
7. **People:** left as an empty array — this chapter's actors are institutions, not individuals; no person's role could be honestly claim-backed from the fetched sources.
