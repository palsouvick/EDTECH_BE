# WBI-03 — প্রধান শিল্প ও ক্লাস্টার (key_industries) — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, verbatim quotes taken from these pages only)

| id | Title | URL |
|---|---|---|
| s1 | NCERT Class X, Contemporary India II, Ch. 6: Manufacturing Industries | https://ncert.nic.in/textbook/pdf/jess106.pdf |
| s2 | Tea Board India — Darjeeling Tea: Country Regulations (GI protection) | https://teaboard.gov.in/TEABOARDCSM/NzI= |
| s3 | PIB — Status of Textile Sector in West Bengal (Ministry of Textiles) | https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=195470&reg=48&lang=2 |
| s4 | PIB — Union Minister's review of IISCO Steel Plant, Burnpur (Ministry of Steel) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2283924&reg=48&lang=2 |
| s5 | PIB — Implementation of IFLADP (Ministry of Commerce and Industry) | https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=190805&reg=3&lang=2 |
| s6 | WB MSME & Textiles Dept. — Cluster Section (292 MSME clusters) | https://msme.wb.gov.in/cluster/softIntervention |

All URLs are NCERT or *.gov.in / *.nic.in, matching PROFILES.wb_industry publishers (GOVT, NCERT).

## Counts

- Claims: **38** (c01–c38), every claim carries a verbatim quote from a fetched page above; every claim is used.
- Questions: **42** — basic 12, moderate 15, difficult 9, exam 6; 7 per section × 6 sections; formats include DIRECT, STATEMENT, MATCH, PAIRS, ASSERTION_REASON.
- Sections (6): jute_textile, tea_industry, steel_engineering, leather, handloom_clusters, concepts_new — full coverage of the `key_industries` subtopic: jute/textiles, tea, steel & engineering/foundry, leather, handloom & MSME clusters, industry concepts + electronics/automobile.

## PYQ candidates

- Bank items with subtopic `key_industries` in `db/gk/wb_industry.jsonl`: **3 found** — GK-IND-009 (Howrah foundry), GK-IND-010 (Kolkata Leather Complex), GK-IND-011 (Darjeeling tea GI). All 3 mapped in `pyq_map_WBI-03.json`.
- Real exam items grepped from `db/pyq/*.json` genuinely on this chapter's topic: **2** — WBCS-EXE-PRELIMS-2023-PRELIMS-Q166 (Rourkela steel plant) and WBPSC-IDO-2019-Q61 (Tea Board headquarters). (Other grep hits were maths/word-usage mentions of Howrah/Darjeeling/steel, not industry questions, and were excluded.)
- Total candidates: **5**; mapped: 5; **taught: 1** (GK-IND-011), partially covered but marked untaught: GK-IND-009, GK-IND-010; untaught with reasons: Q166 (out of WB scope), IDO-2019-Q61 (HQ city not in fetched gov source).

## Gaps (disclosed, never filled from memory)

1. **Durgapur Steel Plant's 1959 British collaboration and 1 MTPA initial capacity** — widely taught and present in bank item GK-IND-002 (subtopic industrial_roots), but its source is sail.co.in, which is not an allowed publisher for this book, and no fetched gov.in/NCERT page stated it. Not taught in this chapter; Durgapur appears only via its MSME ancillary clusters.
2. **'Sheffield of the East' nickname, ~500 Howrah foundry units, ~95% share** (GK-IND-009) — only non-gov sources found; not taught.
3. **Kolkata Leather Complex specifics** — ~1,150 acres, ~500 units, 2005 inauguration, Supreme Court relocation order, 'Karmadiganta' name (GK-IND-010) — only Wikipedia/news/CAG-PDF detail was located; the chapter teaches only the PIB-verified MLFAC approval and CETP assistance. (A CAG report on cag.gov.in does describe the Bantala relocation and 1100-acre complex, but the PDF was not opened for verbatim extraction in this run.)
4. **Tea Board headquarters = Kolkata** (IDO-2019 Q61) — no fetched gov.in page stated the HQ city; not taught.
5. **Darjeeling GI registration year (2004)** — the Tea Board page fetched confirms "first GI registered in India" but does not print the year; the chapter does not assert 2004.
6. **Dooars/Terai tea, hosiery (Kolkata), silk (Murshidabad), food processing, IT/Sector V** — no allowed-publisher page with quotable text was fetched for these in this run, so they are not covered; the handloom section covers Murshidabad only via the sanctioned Mega Handloom Cluster (PIB).
7. Time-sensitive figures carry their as-of context in the claims: handloom census figures are 4th All India Handloom Census (2019-20) as reported in 2019; IISCO hot-metal figure is FY 2025-26 (PIB).
