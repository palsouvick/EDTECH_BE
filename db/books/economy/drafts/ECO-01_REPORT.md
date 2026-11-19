# ECO-01 — অর্থনীতির মূল ধারণা — Draft Report

- **Chapter:** ECO-01, book `economy`, part `foundations`, subtopics `["basics"]` (title/part/subtopics verbatim from `db/books/economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ECO-01.json`, this report — in `~/workspace/edtech/bookwork/eco-01/`

## Sources actually fetched (browser.open, verbatim quotes taken from the fetched text)

1. **NCERT, Understanding Economic Development, Class X, Ch. 2: Sectors of the Indian Economy** — https://ncert.nic.in/textbook/pdf/jess202.pdf (publisher NCERT, allowed for economy profile)
2. **NCERT, Indian Economic Development, Class XI, Ch. 2: Indian Economy 1950–1990** — https://ncert.nic.in/textbook/pdf/keec102.pdf (publisher NCERT, allowed)

No RBI / indiabudget / PIB source was needed: every fact used is carried by the two NCERT chapters above, and no time-sensitive rate or ratio is asserted (the two dated shares used — service sector 40.59% of GDP in 1990, tertiary largest producing sector in 2013-14 — are textbook historical figures and carry their years in the claim text itself).

## Counts

- **Claims:** 33 (c01–c22, c24–c34; c23 intentionally unused), every claim with a verbatim quote from a fetched page, every claim referenced by at least one section/block/question (validator-verified, no UNUSED_CLAIM).
- **Questions:** 42 — basic 13, moderate 14, difficult 7, exam 8 (STATEMENT ×4, ASSERTION_REASON ×2, MATCH ×1, plus DIRECT); all 6 sections tested.
- **Sections:** 6 — what_is_economy, three_sectors, gdp_basics, sector_change, organised_unorganised, ownership_systems. Plus events (3), people (1: Mahalanobis), timeline (3 rows, 1950/1990/2013), terms (12), cause_effect (2), exam_focus (5), bengal_connection (Mahalanobis — born in Calcutta, founded ISI in Calcutta; claim c33), quick_revision (14).

## PYQ candidates

- **Found:** 9 — 1 from the GK bank (`db/gk/economy.jsonl`, the only item with subtopic `basics`: GK-ECO-001) and 8 genuinely on-topic items grepped from `db/pyq/*.json` (IDO 2019 Q97; WBCS Prelims 2017 Q177, Q183; WBCS Prelims 2023 Q178; WBCS Prelims 2024 Q45, Q62, Q114, Q169).
- **Mapped:** 9/9 in `pyq_map_ECO-01.json`.
- **Taught:** 8/9. **Untaught:** WBCS-EXE-PRELIMS-2024-PRELIMS-Q45 (GDP vs NDP = depreciation) — national-income accounting detail that belongs to ECO-02; neither fetched ECO-01 source states it, so it is disclosed in the map and signposted in the chapter's `deep` text rather than asserted.
- Other economy PYQs in the corpus (five-year plans, FRBM, RBI year, budget receipts, GST Council, inflation measures) belong to ECO-02/03/04/06 and were deliberately not mapped to this chapter.

## Subtopic coverage (`basics`)

Fully covered from fetched sources: sector concept + three basic questions; primary/secondary/tertiary definitions, alternative names, examples, interdependence, classification criterion; final vs intermediate goods, double counting, GDP definition and who measures it in India; structural change (primary → secondary → tertiary), production-vs-employment mismatch, 1990 service share 40.59%, 2013-14 tertiary largest producer; organised/unorganised sectors and their conditions; underemployment and disguised unemployment; public/private sectors (ownership criterion, motives, examples); capitalism, socialism, mixed economy and India's choice; Planning Commission 1950 as the bridge to ECO-04.

## Gaps (disclosed, not filled)

1. **NCERT Class X Ch. 1 (Development — per-capita income, HDI, sustainability) could not be fetched** (the fetch failed with a network error and was not retried). Development indicators are therefore NOT taught in this chapter; they are better placed in ECO-05 (দারিদ্র্য ও উন্নয়ন) in any case.
2. **GDP–NDP / depreciation / GVA mechanics** are not taught (see PYQ note above) — ECO-02 territory; only the ranking fact behind WBCS-2023-Q178 is taught.
3. **MGNREGA** appears in the fetched jess202 text but is not used — it belongs to ECO-11 (সরকারি প্রকল্প).
4. No WBBSE source: the economy validator profile allows only NCERT/GOVT/RBI publishers, so no WBBSE claim was attempted.
5. Mahalanobis's death year is not stated in the fetched text and is omitted from `people[].when` (only "জন্ম ১৮৯৩, কলকাতা" is asserted).
