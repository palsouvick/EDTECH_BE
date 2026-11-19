# SCI-05 — আধুনিক পদার্থবিদ্যা (Modern Physics) — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Deliverables
- `chapter.json` — 63 claims, 52 practice questions (basic 17, moderate 21, difficult 10, exam 4), 8 sections (s1–s8), 8 events, 10 people, 9-entry timeline, 10 terms, 2 cause_effect, 6 exam_focus points, 12 quick_revision points.
- `pyq_map_SCI-05.json` — 13 real PYQ candidates, 8 taught, 5 untaught with reasons.

## Sources actually fetched (browser.open, 2026-11-19)
1. NCERT, *Science Class IX*, Chapter 4 "Structure of the Atom" — https://ncert.nic.in/textbook/pdf/iesc104.pdf
2. NCERT, *Chemistry Class XI*, Unit 2 "Structure of Atom" — https://ncert.nic.in/textbook/pdf/kech102.pdf
3. NCERT, *Science Class X*, Chapter 14 "Sources of Energy" — https://ncert.nic.in/textbook/pdf/jesc114.pdf
4. IGNOU, *MEV-001 Block 3 Unit 2 "Radiation and Pollution"* — https://egyankosh.ac.in/bitstream/123456789/86528/1/Block-3.pdf
5. NCERT, *Physics Class XI*, Chapter 13 "Kinetic Theory" — https://ncert.nic.in/textbook/pdf/keph213.pdf

All five publishers are in the science profile's allowed list (NCERT, IGNOU). Every claim carries a verbatim quote from one of these fetched PDFs.

## Subtopic coverage (physics_modern)
- Atomic structure: sub-atomic particles, canal/cathode rays, Thomson/Rutherford/Bohr models, Chadwick's neutron (s1, s2, s6)
- Quantum foundations: electromagnetic spectrum, Planck's quantum, photon energy E = hν (s3)
- Photoelectric effect: Hertz, threshold frequency, work function, Einstein's 1905 explanation (s4)
- de Broglie duality and Heisenberg uncertainty (s5)
- Nucleus arithmetic: Z, A, isotopes, isobars, shell capacity 2n² (s6)
- Radioactivity: Becquerel's discovery, α/β/γ nature and penetration, Bq/Ci units, half-life (s7)
- Nuclear energy: fission, chain reaction, fusion, E = Δmc², Indian reactors (s8)

## PYQ candidates
- GK bank (`db/gk/general_science.jsonl`): **0 items** carry subtopic `physics_modern` (the bank's science subtopics are physics_units, physics_mechanics, physics_heat_light_sound, physics_electricity, etc.). No GK codes were therefore available; none were invented.
- PYQ corpus (`db/pyq/*.json`): 13 genuine modern-physics questions found and mapped — WBCS Prelims 2016 (Q61, Q65), 2017 (Q50), 2022 (Q26, Q27, Q73), 2023 (Q39), 2024 (Q35, Q102, Q119, Q179), WBPSC Clerkship Part-I 2023 Session III (Q92) and Session IV (Q92).
- Taught: 8 (X-ray nature, lead shielding, curie unit, ion electron count, photon energy, thorium fission, becquerel SI unit, work-function unit). Several are also drilled as practice questions (q17, q25, q34, q40, q42).
- Untaught: 5, each with a specific reason in the map.

## Gaps (disclosed, never filled from memory)
- **Semiconductor electronics not taught.** NCERT Class XII Physics chapters (keph109–114, leph111/114) could not be fetched through the text-fetch tool (network/page-not-found failures on repeated attempts). Two real PYQs (semiconductor resistance vs temperature; silicon) are therefore mapped untaught.
- **Detailed radioactive decay law, carbon-14 dating, plutonium in pacemakers, radioactive-series isotopes** are not covered by any fetched source; the corresponding PYQs are mapped untaught.
- The X-ray wavelength-ordering point rests on NCERT XI Chemistry's reference to its electromagnetic-spectrum figure (Fig. 2.7); the figure image itself was not text-extractable, so the claim is worded to the figure reference only.
- The "thorium adequately available in India" angle of WBCS 2024 Q119 is not in the sources; the chapter teaches thorium as a fissile heavy atom and the exam_focus box flags the gap explicitly.
- Sections s5 and s7 have no `deep` box (validator permits); their content is carried in quick/standard.
