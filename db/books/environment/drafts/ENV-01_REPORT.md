# ENV-01 — বাস্তুতন্ত্র (Ecosystems) — Draft Report

Chapter: ENV-01, book `environment`, part `ecology`, subtopics `["ecosystems"]` (title/part/subtopics taken verbatim from `db/books/environment/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open)

| id | Title | URL | Result |
|---|---|---|---|
| s1 | Biology, Class XII, Chapter 12: Ecosystem (NCERT) | https://ncert.nic.in/textbook/pdf/lebo112.pdf | Fetched in full (600 lines, §§12.1–12.5 + summary + exercises). All 48 claims quote this fetch verbatim. |

Attempted but **not** fetched (recorded as gaps, not retried per tool guidance):

- NCERT Biology XII Ch. 11 "Organisms and Populations" — https://ncert.nic.in/textbook/pdf/lebo111.pdf — fetch failed (page not found / network error).
- NCERT Geography XI "Life on the Earth" — https://ncert.nic.in/textbook/pdf/kege115.pdf — fetch failed (page not found / network error).

Publisher check (PROFILES.environment: NCERT, GOVT, IGNOU, NIOS, EPG): the single source used is NCERT — allowed. No WBBSE source is permitted for this book, and none was used.

## Counts

- Claims: **48** (c01–c48), every one with a verbatim quote from s1; every claim is used by at least one section/question (validator-enforced).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH, ASSERTION_REASON, PAIRS, CHRONOLOGY). All 6 sections are tested.
- Sections: 6 (s1 concept & types; s2 structure & the pond; s3 productivity GPP/NPP; s4 decomposition; s5 energy flow, food chains & trophic levels; s6 pyramids, nutrient cycling & ecosystem services).
- Terms: 19. Cause–effect rows: 3. Quick revision: 13 points.
- `events` / `people`: empty arrays — the source chapter contains no dated events or people, and the environment profile is `dated: false`. `timeline` carries the closest honest equivalent: the 5-step one-way energy-flow sequence (process order, explicitly labelled ধাপ ১–৫, not dates).

## PYQ candidates

Found **5**, mapped **5**, taught **2**:

| Code | Source | Taught | Section |
|---|---|---|---|
| GK-ENV-001 | `db/gk/environment.jsonl` (subtopic ecosystems — 10 per cent law) | ✅ | s5 |
| GK-ENV-002 | `db/gk/environment.jsonl` (subtopic ecosystems — energy pyramid always upright) | ✅ | s6 |
| WBCS-EXE-PRELIMS-2016-PRELIMS-Q156 | `db/pyq/wbcs-prelims-2016.json` (competitive exclusion / niche) | ❌ | — source gap (below) |
| WBCS-EXE-PRELIMS-2019-PRELIMS-Q26 | `db/pyq/wbcs-prelims-2019.json` (East Kolkata Wetlands = Ramsar site) | ❌ | — belongs to ENV-06 |
| WBCS-EXE-PRELIMS-2024-PRELIMS-Q81 | `db/pyq/wbcs-prelims-2024.json` (East Kolkata Wetland = Ramsar site) | ❌ | — belongs to ENV-06 |

The other 16 GK environment items and all 10 `topic_code: environment` PYQ items belong to other ENV chapters (biodiversity, pollution, climate change, conventions, protected areas, energy) and were excluded — they are not ecosystems content. No code or question was invented.

## Subtopic coverage (ecosystems)

Fully covered from NCERT Ch. 12: definition & types (incl. manmade), biosphere as global ecosystem, species composition, stratification, pond model (abiotic/autotroph/consumer/decomposer), primary & secondary productivity, GPP/NPP with the 170 bt / 55 bt figures, decomposition (all five steps, humus, rate factors), energy flow (PAR, 2–10% capture, unidirectional flow, second law), producers/consumers, GFC vs DFC, saprotrophs, food web & omnivores, trophic levels, standing crop, 10 per cent law, ecological pyramids (number/biomass/energy; upright vs inverted; limitations; sparrow example; grassland 6-million-plants figure; 1% NPP figure), nutrient cycling (gaseous/sedimentary, carbon/phosphorus reservoirs), ecosystem services.

## Gaps (disclosed, never filled from memory)

1. **Ecological niche & Gause's competitive exclusion principle — NOT taught.** Needed for WBCS 2016 Q156. The material sits in NCERT Biology XII Ch. 11, whose PDF could not be fetched in this run; Ch. 12 does not cover it. Fix in a later pass: fetch lebo111 (or an IGNOU/NIOS/e-PG Pathshala equivalent) and add a short section + claims.
2. **Ecological succession — NOT taught.** Present in older NCERT editions but absent from the rationalised Ch. 12 fetched here; no allowed fetched source covers it in this run.
3. **Single-source chapter.** All claims rest on one NCERT chapter (the same chapter the GK bank's ecosystems items cite). A second allowed source (IGNOU/NIOS depth material) would strengthen the blind-check stage.
4. **Bengal connection is applicative, not site-specific.** It maps NCERT's pond model and "wetland" as an aquatic ecosystem type onto Bengal's ponds/wetlands using only Ch. 12 claims; no Bengal-specific site facts (e.g. Ramsar status of East Kolkata Wetlands) are asserted, because no fetched source supports them.
5. Page numbers in claims are marked "approx." — the fetched text extraction gives section numbers (§12.1–12.5) reliably but printed pagination only intermittently, following the exemplar's convention.
