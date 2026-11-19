# WBI-01 — শিল্পের শিকড় ও ঐতিহ্য — Draft Report

- Book: `wb_industry` · Code: **WBI-01** · Part: `heritage` · Subtopic: `industrial_roots` (verbatim from `db/books/wb_industry/toc.js`)
- Status: DRAFT · Verification: UNVERIFIED
- Deliverables: `chapter.json`, `pyq_map_WBI-01.json`, this report — in `~/workspace/edtech/bookwork/wbi-01/`
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/wbi-01/chapter.json` → **OK**

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to this book's allowed publishers (PROFILES.wb_industry: GOVT = *.gov.in/*.nic.in, NCERT):

| id | Title | URL |
|---|---|---|
| s1 | NCERT, Contemporary India II, Class X, Ch. 6: Manufacturing Industries | https://ncert.nic.in/textbook/pdf/jess106.pdf |
| s2 | Ministry of Coal, Govt of India — History and Background | https://coal.nic.in/about-us/history-background |
| s3 | Chittaranjan Locomotive Works, Indian Railways — About Us | https://clw.indianrailways.gov.in/ministry/about-us |
| s4 | Tea Board India, Ministry of Commerce — About Tea Board India | https://www.teaboard.gov.in/TEABOARDCSM/NA== |
| s5 | Ministry of Steel, Govt of India — Annual Report 2005-06, Ch. III (SAIL) | https://steel.gov.in/sites/default/files/Annual%20Report%20%282005-06%29.pdf |

## Counts

- **Claims: 34** (c01–c34), every one with a verbatim quote from a fetched page above; every claim is used somewhere in the chapter (validator-enforced).
- **Questions: 42** — basic 13, moderate 12, difficult 11, exam 6 (STATEMENT ×6, MATCH, CHRONOLOGY ×2, PAIRS ×2, ASSERTION_REASON among them); 7 questions per section × 6 sections.
- Sections (6): `roots_concepts` (industry concepts & classification), `coal_raniganj` (Raniganj coal, 1774 → nationalisation), `jute_hooghly` (Rishra 1855, Hugli belt factors, Partition), `steel_damodar` (basic industry, 4:2:1, Durgapur/Burnpur, IISCO→SAIL 2006), `chittaranjan_loco` (CLW 1950), `tea_board` (Tea Board, HQ Kolkata).
- Also present: events (7), people (4), timeline (12 entries, 1774–2006), terms (7), cause_effect (3), exam_focus (9, naming Clerkship/WBCS/IDO/WBP relevance via bengal_connection + exam boxes), quick_revision (13).

## PYQ candidates

- **Found: 3** — mapped: 3 — taught: 2, untaught: 1.
- From `db/gk/wb_industry.jsonl`, subtopic `industrial_roots` has exactly 2 items: **GK-IND-001** (Rishra 1855 — taught, from NCERT verbatim) and **GK-IND-002** (Durgapur/IISCO — **untaught** for its 1959/British-collaboration and IISCO-1918 specifics; only the SAIL/IISCO-merger part is taught from steel.gov.in).
- From `db/pyq/*.json` (full-corpus grep for jute/steel/Durgapur/Rishra/tea-board/CLW topics): one genuinely on-topic real exam item — **IDO-2019-Q61** (WBPSC Industrial Development Officer 2019, Q61, Tea Board HQ = Kolkata; the corpus file has no code field, so it is identified by exam-year-question number) — taught. No Clerkship/WBCS/WBP PYQ in the corpus is genuinely on this chapter's heritage topics.

## Subtopic coverage

`industrial_roots` is covered through: coal origins (Raniganj 1774, steam-loco demand 1853, NCDC 1956, nationalisation 1971–73), jute origins (Rishra 1855, Hugli-belt location factors, Partition 1947), steel belt foundations (basic-industry concept, Chhotanagpur concentration, Durgapur/Burnpur under SAIL, IISCO merger 2006), railway engineering heritage (CLW 1947–1961, record FY2023-24 output of 580 locomotives as reported on CLW's page), and the tea industry's statutory body (1903 cess bill → Tea Act 1953 → Board 1954, HQ Kolkata).

## Gaps (disclosed, never filled from memory)

1. **Durgapur Steel Plant founding year (1959) and British/UK collaboration; IISCO founding year (1918) and first iron at Hirapur/Burnpur (1922)** — standard exam facts (and part of GK-IND-002), but in this run they were found only on non-allowed sites (sail.co.in, Wikipedia, testbook). No fetched gov.in/NCERT page states them, so they are **not taught**; the steel section carries an honest deep-note saying so, and GK-IND-002 is marked `taught: false` with the reason.
2. **Rishra mill founder detail (George Acland, Bengali partner, Dundee machinery)** — part of GK-IND-001's bank statement; found only on GIPE/Banglapedia (non-gov.in). Not taught; the Rishra fact itself is taught from NCERT.
3. **Darjeeling tea history / GI tag (2004)** — no allowed gov.in page stating it was fetched in this run (the Tea Board page fetched covers the Board, not Darjeeling GI). Not taught.
4. **Howrah engineering heritage, Bowreah cotton mill (1818), Haldia, Bengal Chemicals** — commonly listed in WB industry heritage, but no allowed source was fetched for them in this run; omitted rather than asserted.
5. One NCERT XII PDF fetch (India: People and Economy, Manufacturing Industries) failed at the fetch stage; the chapter relies on the Class X NCERT chapter instead, which covers the same core facts used here.
6. Time-sensitive figure: CLW's 580 locomotives is for **FY 2023-24** as stated on its About Us page (accessed 2026-11-19); the claim text carries that as-of framing.
