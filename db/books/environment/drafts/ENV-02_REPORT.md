# ENV-02 জীববৈচিত্র্য — Draft Report

**Chapter:** ENV-02, book `environment`, part `ecology`, subtopics `["biodiversity"]` (verbatim from `db/books/environment/toc.js`). Status DRAFT, verification UNVERIFIED.
**Deliverables:** `chapter.json`, `pyq_map_ENV-02.json`, this report — in `~/workspace/edtech/bookwork/env-02/`.
**Validation:** `node scripts/validateBooks.js chapter.json` → **OK** (first pass).

## Sources actually fetched (browser.open text-fetch)

| id | Title | URL | Notes |
|---|---|---|---|
| s1 | Biodiversity and Conservation (Chapter 13), Biology, Class XII — NCERT | https://ncert.nic.in/textbook/pdf/lebo113.pdf | Fetched in full (661 lines, pp. 216–225). Sole formal source; all 53 claims quote it verbatim. Publisher NCERT — allowed for `environment` profile. |

Attempted but **not** used: MoEF/TERI REDD+ booklet (moef.gov.in) — fetched via its `http://` address; the validator's GOVT pattern requires `https://`, and the https variant could not be fetched in this run, so no claim rests on it. Its differing counts (17 mega-diverse countries, four hotspots incl. Sundaland) are therefore **not asserted** anywhere in the chapter; the conservation `deep` text only discloses that later official lists differ from this NCERT edition, without giving unverified replacement numbers.

## Counts

- **Claims:** 53 (c01–c53), every one with a verbatim quote from the fetched NCERT PDF; every claim is used by at least one section/event/person/timeline/cause-effect/question (validator-verified, no UNUSED_CLAIM).
- **Questions:** 44 — basic 14, moderate 13, difficult 9, exam 8 (STATEMENT ×4, MATCH ×2, ASSERTION_REASON ×1, PAIRS ×1). All 6 sections tested (7–9 questions each).
- **Sections:** 6 — what_is_biodiversity, how_many_species, patterns, why_diversity_matters, loss_evil_quartet, conservation. Plus events (3), people (5), timeline (3), terms (15), cause_effect (3), exam_focus (10), quick_revision (14).

## PYQ candidates

- **Found: 6** — 3 GK bank items with subtopic `biodiversity` in `db/gk/environment.jsonl` (GK-ENV-003, GK-ENV-004, GK-ENV-005) + 3 real exam items found by grepping `db/pyq/*.json` (WBCS Prelims 2023 Q77; WBPSC Clerkship 2023 Session-I Q33; Session-II Q47).
- **Mapped: 6/6. Taught: 3** (all three GK items, all in the conservation section).
- **Untaught (3), each with a specific reason in the map:** Rosen coinage (source says Wilson *popularised*; disclosed in an exam_note, not taught as a claim), Rajaji Biosphere Reserve location (belongs to ENV-06), IUCN headquarters (belongs to the Organisations book).

## Subtopic coverage

`biodiversity` is covered end-to-end at NCERT XII level: definition and three levels; global and Indian species counts; latitudinal gradient and species–area relationship; stability, utilitarian and ethical value; extinction record and the Evil Quartet; in situ / ex situ conservation, hotspots, sacred groves, and the Rio 1992 / Johannesburg 2002 summits.

## Gaps (disclosed, never filled from memory)

1. **Edition-bound counts.** NCERT's figures (34 world hotspots; 3 covering India; 12 mega diversity countries; India 14 biosphere reserves / 90 national parks / 448 sanctuaries) are later than some official lists and earlier than others. The chapter states them as *per NCERT* wherever a question depends on them and discloses the caveat in the conservation deep text. No updated figure is asserted, because the only newer government document located (MoEF REDD+ booklet) could not be fetched over https in this run.
2. **"Coined by Rosen" (WBCS 2023 Q77).** Not in NCERT; handled via exam_note + map note, not taught.
3. **Bengal connection is indirect.** NCERT Ch. 13 names no West Bengal site. The `bengal_connection` says so openly and links only NCERT-named ecosystem categories (mangroves, wetlands, estuaries, alpine meadows) and the Eastern Ghats comparison to the student's own state; Bengal-specific protected-area facts are deferred to ENV-06.
4. **No WBBSE source** — the environment profile does not allow WBBSE publishers (NCERT/GOVT/IGNOU/NIOS/EPG only), so the chapter is NCERT-only by design.
5. Protected-area lists, the Biological Diversity Act 2002 and Ramsar/IUCN detail are out of this chapter's fetched source and are left to ENV-05/ENV-06.
