# ECO-05 দারিদ্র্য ও উন্নয়ন — Draft Report

- **Chapter:** ECO-05, part `foundations`, subtopic `poverty_development` (verbatim from `economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**

## Sources actually fetched (browser.open, verbatim quotes taken from the fetched text)

| id | Title | URL |
|---|---|---|
| s1 | NCERT, Indian Economic Development, Class XI, Ch. 5: Rural Development | https://ncert.nic.in/textbook/pdf/keec105.pdf |
| s2 | NCERT, Indian Economic Development, Class XI, Ch. 4: Human Capital Formation in India | https://ncert.nic.in/textbook/pdf/keec104.pdf |
| s3 | NCERT, Indian Economic Development, Class XI, Ch. 6: Employment — Growth, Informalisation and Other Issues | https://ncert.nic.in/textbook/pdf/keec106.pdf |
| s4 | NITI Aayog Discussion Paper (Jan 2024): Multidimensional Poverty in India since 2005-06 | https://www.niti.gov.in/sites/default/files/2024-01/MPI-22_NITI-Aayog20254.pdf |

All four URLs belong to allowed publishers for the economy profile (NCERT, GOVT). An Economic Times page opened by mistake during source discovery was **not** used as a source.

## Counts

- Claims: **38** (c01–c38), every claim with a verbatim quote from a fetched page above; every claim is used by at least one section/block/question (validator-checked).
- Practice questions: **42** — basic 16, moderate 14, difficult 6, exam 6; 7 per section across all 6 sections; formats DIRECT, STATEMENT, MATCH, ASSERTION_REASON.
- Sections: 6 (poverty_concept, measuring_poverty, mpi_trends, unemployment, human_development, poverty_alleviation).

## PYQ candidates

- **GK bank (`db/gk/economy.jsonl`): 0 candidates** — the file has 35 items but none carries subtopic `poverty_development` (subtopics present: basics, inflation_income, budget_tax, plans_reforms, rbi_banking, banking_operations, financial_institutions, agri_industry, schemes). `related_facts` is therefore empty.
- **PYQ corpus (`db/pyq/*.json`): 4 genuine candidates** found by topic search, mapped in `pyq_map_ECO-05.json`:
  - WBCS-EXE-PRELIMS-2024-PRELIMS-Q177 (HDI components) — **taught: true** (via NCERT Table 4.1 health/education/income indicators).
  - WBCS-EXE-PRELIMS-2017-PRELIMS-Q131 (highest-HDI district of WB) — taught: false (WB HDR district ranking not in fetched allowed sources).
  - WBCS-EXE-PRELIMS-2017-PRELIMS-Q179 (HDI first introduced, 1990) — taught: false (UNDP fact; UNDP is not an allowed publisher and no fetched page states it).
  - WBCS-EXE-PRELIMS-2021-PRELIMS-Q154 ('Poverty and Unbritish Rule in India' author) — taught: false (primarily ECO-04 / history economic nationalism; not in this chapter's fetched sources).
- Planning Commission / NITI Aayog formation / Drain Theory PYQs found in the same search were excluded — they belong to ECO-04 (`plans_reforms`), not this chapter.

## Subtopic coverage

`poverty_development` covered through: poverty concept and the limits of monetary measurement; MPI construction (dimensions, 12 vs 10 indicators, dual cutoff, MPI = H × A); MPI trends 2005-06 → 2022-23 with as-of dates on all figures; unemployment (open/disguised/seasonal, informal sector, WPR 2022-23); human capital vs human development; poverty alleviation via employment generation (MGNREGA), rural development, rural credit (NABARD, SHG/micro-credit, Kudumbashree); West Bengal MPI figures in `bengal_connection`.

## Gaps (disclosed, never filled from memory)

1. **Poverty line & estimation committees (Lakdawala, Tendulkar, Rangarajan) not taught.** The current NCERT Class XI IED edition has no standalone Poverty chapter (the old Ch. 4 was removed in rationalisation), and no fetched allowed-publisher page in this run states the committee figures. A future pass should fetch the older NCERT IED Poverty chapter or a Planning Commission/NITI document from an allowed URL before adding this material.
2. **HDI's introducing body/year (UNDP, 1990) and India's HDI rank/value not taught** — UNDP is not in this book's allowed publishers (NCERT/GOVT/RBI only). Two WBCS PYQs are therefore mapped `taught: false`.
3. **West Bengal district-level HDI ranking** (WBCS 2017 Q131) not taught — the West Bengal Human Development Report is not among the fetched sources.
4. The Class IX NCERT chapter "Poverty as a Challenge" could not be fetched (its current PDF code did not resolve), so calorie-norm/poverty-line basics from that book are absent; the chapter instead builds the poverty-line idea only as far as the fetched NITI/NCERT-XI material supports.
5. Time-sensitive figures are dated in the claim text (MPI estimates Jan 2024 paper; WPR/workforce 2022-23; NCERT indicators 2018-21).
