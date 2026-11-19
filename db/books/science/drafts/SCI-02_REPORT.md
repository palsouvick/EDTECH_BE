# SCI-02 — গতি, বল ও শক্তি (Motion, Force and Energy) — Draft Report

- **Book / part / subtopic:** science / `physics` / `physics_mechanics` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js bookwork/sci-02/chapter.json` → **OK** (run 2026-11-19)
- **Deliverables:** `chapter.json`, `pyq_map_SCI-02.json`, this `REPORT.md`

## Sources actually fetched (browser.open, 2026-11-19)

All sources are NCERT (allowed publisher for the science profile). Every claim in `chapter.json` carries a verbatim quote from one of these six PDFs.

| # | Title | URL |
|---|-------|-----|
| s1 | NCERT Science, Class IX, Chapter 7: Motion | https://ncert.nic.in/textbook/pdf/iesc107.pdf |
| s2 | NCERT Science, Class IX, Chapter 8: Force and Laws of Motion | https://ncert.nic.in/textbook/pdf/iesc108.pdf |
| s3 | NCERT Science, Class IX, Chapter 9: Gravitation | https://ncert.nic.in/textbook/pdf/iesc109.pdf |
| s4 | NCERT Science, Class IX, Chapter 10: Work and Energy | https://ncert.nic.in/textbook/pdf/iesc110.pdf |
| s5 | NCERT Physics, Class XI, Chapter 4: Laws of Motion | https://ncert.nic.in/textbook/pdf/keph104.pdf |
| s6 | NCERT Physics, Class XI, Chapter 5: Work, Energy and Power | https://ncert.nic.in/textbook/pdf/keph105.pdf |

**Fetch failure:** NCERT Physics XI Chapter 7: Gravitation (`https://ncert.nic.in/textbook/pdf/keph107.pdf`) failed with a network error on fetch and was not retried; see Gaps.

## Counts

- **Claims:** 85 (`c01`–`c85`), every one used in the chapter (validator-enforced) and every one with a verbatim quote from a fetched source.
- **Questions:** 42 — basic 10, moderate 15, difficult 10, exam 7. Formats: DIRECT 35, STATEMENT 2, MATCH 2, ASSERTION_REASON 2, PAIRS 1. Every section is tested (5–7 questions per section); every question references its supporting claim ids.
- **Sections:** 7 — `motion_basics`, `acceleration_equations`, `force_inertia`, `second_law_momentum`, `third_law_conservation`, `gravitation_weight`, `work_energy_power`, each with quick/standard/deep texts and exam-oriented boxes.
- **Other blocks:** overview, events (3, scientist-era equivalents — the validator's science profile is non-dated), people (6: Galileo, Newton, Cavendish, Joule, Watt, Pascal), timeline (5 sourced milestones), terms (17), cause_effect (4), exam_focus (7), bengal_connection (WBPSC/WBCS PYQ relevance), quick_revision (12).

## PYQ candidates

- **Candidates found: 14** — 2 from `db/gk/general_science.jsonl` with subtopic `physics_mechanics` (`GK-SCI-002`, `GK-SCI-003`) and 12 genuine on-topic items grepped from `db/pyq/*.json` (WBCS Prelims 2016/2018/2021/2024, WBPSC Clerkship 2009/2023, IDO 2019, WBP Constable 2021), each with its official answer verified in the corpus.
- **Mapped: 14 / 14** in `pyq_map_SCI-02.json`.
- **Taught: 10.** The chapter's `related_facts` records `GK-SCI-002` and `GK-SCI-003`.

## Subtopic coverage

`physics_mechanics` is fully covered: distance/displacement, speed/velocity, acceleration and the three equations of motion, uniform circular motion, Newton's three laws, inertia, friction (µs, µk), momentum, impulse, universal gravitation, g, free fall, mass vs weight, thrust/pressure, work (conditions and sign), kinetic/potential energy, energy conservation, power, horse power and kWh — all from the six fetched NCERT chapters above.

## Gaps (disclosed, never filled from memory)

1. **Escape speed not taught.** The escape-speed values in GK bank item `GK-SCI-003` (11.2 km/s Earth, 2.3 km/s Moon) come from NCERT XI Ch. 7 Gravitation (`keph107.pdf`), which could not be fetched this run (network error). The chapter teaches gravitation from Class IX Ch. 9 only; `GK-SCI-003` is mapped `taught: false`, and the gravitation section's deep text discloses this to the student. A later run should fetch keph107 and add escape speed.
2. **Clerkship 2023 Session IV Q88 untaught (attribution).** The equations of motion are taught, but no fetched NCERT source attributes them to Newton "for the first time" (the official key), so the attribution is not asserted.
3. **Clerkship 2023 Session II Q49 untaught ('bar').** Pressure and the pascal are taught from iesc109, but the unit 'bar' appears in none of the fetched sources; flagged in a `dont_confuse` box in the gravitation section.
4. **Clerkship 2023 Session III Q95 untaught (kelvin).** Energy units are taught, but no fetched source for this chapter states kelvin is the unit of temperature, so the odd-one-out is not fully supported.
5. **Out of scope by design:** Sound (Class IX Ch. 11) is a different subtopic and is not part of this chapter; no sound content was included.
