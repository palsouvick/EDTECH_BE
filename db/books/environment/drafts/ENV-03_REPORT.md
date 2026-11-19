# ENV-03 দূষণ — Draft Report

Chapter: ENV-03, part `threats`, subtopic `pollution` (title/part/subtopics verbatim from `environment/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19)

| id | Source | URL |
|---|---|---|
| s1 | NCERT Science, Class VIII, Ch. 18: Pollution of Air and Water | https://ncert.nic.in/textbook/pdf/hesc118.pdf |
| s2 | NCERT Science, Class X, Ch. 15: Our Environment | https://ncert.nic.in/textbook/pdf/jesc115.pdf |
| s3 | NCERT Science, Class VII, Ch. 18: Wastewater Story | https://ncert.nic.in/textbook/pdf/gesc118.pdf |
| s4 | NCERT Fundamentals of Physical Geography, Class XI, Ch. 7: Composition and Structure of Atmosphere | https://ncert.nic.in/textbook/pdf/kegy207.pdf |
| s5 | CPCB — Noise Pollution (Regulation and Control) Rules, 2000 (GOVT) | https://cpcb.nic.in/noise-pollution-rules/ |
| s6 | Dept. of Chemicals and Petrochemicals — Stockholm Convention (GOVT) | https://chemicals.gov.in/index.php/stockholm_convention |

All URLs belong to publishers allowed for the environment profile (NCERT, GOVT).

## Counts

- Claims: **55** (c01–c55), each with a verbatim quote from a fetched page; every claim is used.
- Practice questions: **50** — basic 17, moderate 18, difficult 9, exam 6 (STATEMENT ×3, MATCH, CHRONOLOGY, ASSERTION_REASON, PAIRS); all 6 sections tested.
- Sections: 6 (s1 concept/types, s2 air, s3 acid rain/greenhouse, s4 ozone/CFC, s5 water/Ganga, s6 waste/noise/POPs + control).
- Structure: overview, 6 sections, 5 events, people `[]` (no person-centred content in the sources — kept empty, allowed for non-dated books), 6-entry timeline (1985–2016), 14 terms, 4 cause_effect chains, 8 exam_focus points, bengal_connection (Ganga through West Bengal/Kolkata, from the NCERT case study), 12 quick_revision points.

## PYQ candidates

- GK bank (`db/gk/environment.jsonl`, subtopic `pollution`): **1 item** — GK-ENV-006 (Stockholm Convention). Mapped to s6, taught.
- PYQ corpus (`db/pyq/*.json`) genuinely on pollution: **6 items** found.
- Total candidates mapped: **7**; taught **4** (GK-ENV-006, Clerkship 2023 acid rain, Clerkship 2023 stratosphere, WBCS 2022 CFC); untaught **3**, each with a specific reason in `pyq_map_ENV-03.json` (WBCS 2019 noise 80–99 dB threshold — not in fetched sources; WBCS 2017 Ozone Day 16 Sep — date not in NCERT sources; WBCS 2023 Delhi Winter Action Plan — current-affairs, out of textbook scope).
- Excluded as not genuinely on this chapter's topic: WBPSC Clerkship 2009 'Green Bench' (judiciary item, topic_code polity).

## Gaps (disclosed in the chapter, never filled from memory)

1. **NCERT Biology XII Ch. 16 'Environmental Issues' (lebo116.pdf) could not be fetched** (fetch failed; the chapter is also absent from the current rationalised NCERT list). Consequently these standard exam facts are NOT taught: BOD definition, eutrophication as a named term, PM 2.5/CPCB particle-size claim, Environment (Protection) Act 1986 as a standalone fact, Air Act noise amendment 1987, solid/radioactive waste detail, Delhi CNG case-study specifics beyond the Class VIII account. The algae–oxygen chain (the eutrophication mechanism) IS taught from Class VIII without the technical label.
2. **Noise threshold 80–99 dB (WBCS 2019 answer)** and the CPCB zone-wise dB Schedule (residential 55/45 etc.): the fetched CPCB page reproduces the Rules' text but not the Schedule table, so no dB limit table is asserted; only the provisions present in the fetched text are taught.
3. **International Ozone Day (16 September)**: not in the NCERT sources; flagged in an exam_note box as a date to memorise separately, not asserted as sourced content.
4. **Montreal Protocol by name**: Class X NCERT describes the 1987 UNEP agreement to freeze CFC production at 1986 levels without naming it 'Montreal Protocol' in the fetched text; the chapter teaches the agreement and year, and the deep text notes the protocol era without asserting the name from the quote.
5. **Bengal connection** is limited to the Ganga (NCERT's case study and course map include West Bengal/Kolkata); no Hooghly-specific data was in the fetched sources, and the chapter says so rather than inventing it.
6. **people[] is empty**: the sources name no individual person for this chapter; institutions (Supreme Court, UNEP, CPCB) appear in the text instead.
