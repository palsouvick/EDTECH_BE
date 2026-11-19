# ECO-04 — পরিকল্পনা ও অর্থনৈতিক সংস্কার (Draft Report)

Chapter: ECO-04, book `economy`, part `foundations`, subtopic `plans_reforms` (title/part/subtopics verbatim from `db/books/economy/toc.js`). Status: DRAFT, verification UNVERIFIED.

## Deliverables
- `chapter.json` — validator: `node scripts/validateBooks.js` → **OK**
- `pyq_map_ECO-04.json`
- `REPORT.md` (this file)

## Sources actually fetched (browser.open, 2026-11-19)
1. NCERT, *Indian Economic Development*, Class XI, Ch. 2: Indian Economy 1950–1990 — https://ncert.nic.in/textbook/pdf/keec102.pdf (publisher: NCERT — allowed)
2. NCERT, *Indian Economic Development*, Class XI, Ch. 3: Liberalisation, Privatisation and Globalisation: An Appraisal — https://ncert.nic.in/textbook/pdf/keec103.pdf (publisher: NCERT — allowed)
3. NITI Aayog official homepage — https://www.niti.gov.in/ (publisher: GOVT — allowed; used only for NITI Aayog's constitution by Union Cabinet resolution dated 1 January 2015, its think-tank role and cooperative federalism)

One fetch failed and was not used: https://www.niti.gov.in/about-niti-aayog (404). No RBI source was needed for this chapter's scope.

## Counts
- Claims: **58** (c01–c58), every claim carries a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- Practice questions: **42** — basic 12, moderate 15, difficult 8, exam 7 (STATEMENT ×3, ASSERTION_REASON, MATCH, CHRONOLOGY, PAIRS); all 7 sections tested.
- Sections: 7 (planning_choice, plan_goals, mahalanobis_second_plan, plan_agriculture, plan_record, reforms_1991, niti_aayog).

## Subtopic coverage (plans_reforms)
Planning choice & mixed economy; Planning Commission (1950); plan goals; perspective plan; Mahalanobis & Second Plan; IPR 1956 & licensing; Karve Committee; land reforms & Green Revolution within the planning framework; plan-era record (import substitution, permit-licence raj, PSU losses); 1991 crisis & NEP; LPG (liberalisation incl. industrial/financial/tax/forex/trade reforms, privatisation & disinvestment, globalisation & WTO); GST constitutional amendment (2016); NITI Aayog (2015) & cooperative federalism.

Time-sensitive figures: none asserted as current. Reserve/FDI/GDP-growth figures are NCERT-reported historical values, and each claim states its reference years (e.g. reserves ~US$6 bn in 1990-91 → ~US$413 bn in 2018-19).

## PYQ candidates
Found **15**: 3 GK bank items with subtopic `plans_reforms` (GK-ECO-008, GK-ECO-009, GK-ECO-010, copied verbatim from `db/gk/economy.jsonl`) and 12 real exam items greped from `db/pyq/*.json` (WBCS Prelims 2015–2023, WBP Constable 2021; corpus codes built in the established exam-year-Qno convention from each item's `pyq` metadata).
- Mapped & taught: **9**
- Mapped, untaught (with specific reason in the map): **6**

## Gaps (disclosed, never filled from memory)
1. **First Five Year Plan start year (1951)** — not stated in keec102/keec103 as fetched; WBCS-2015-Q174 left untaught.
2. **Decentralised planning first introduced in the Seventh Plan** (WBCS-2016-Q157) — not in the sources used; untaught.
3. **First Plan national-income growth of 18%** (WBCS-2016-Q169) — no such figure in the sources; untaught.
4. **National Planning Committee, 1938 / Subhas Chandra Bose** (WBCS-2023-Q46) — pre-independence planning history is outside the NCERT chapters used; untaught (belongs to history-book scope).
5. **NITI Aayog specifics** — 2nd Governing Council meeting emphasis (WBCS-2018-Q129) and the NE Region District SDG Index / UNDP partnership (WBCS-2023-Q86) are not on the fetched NITI homepage; untaught.
6. **Planning Commission's exact day (15 March 1950)** appears in GK-ECO-008's own cited sources but not in this chapter's fetched quotes, so the chapter states only the year 1950.
7. Harrod–Domar model (First Plan) is a common textbook claim but is not mentioned in the NCERT chapters used, so it is not taught; an exam_note in the chapter flags this openly.
8. Plan-by-plan outlays/targets, the Twelfth Plan's end (2017) as a standalone fact, and post-2019 data are outside the fetched sources and are not covered.
