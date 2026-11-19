# SCI-01 — একক ও পরিমাপ (Units and Measurement): Draft Report

- **Book / part / subtopic:** science / physics / `physics_units` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-01/chapter.json` → **OK** (no errors)

## Sources actually fetched (browser.open, 2026-11-19)

All NCERT (allowed publisher for the science profile: NCERT, IGNOU, NIOS, EPG, GOVT):

1. **s1** — Physics Part I, Class XI, Chapter 1: Units and Measurement — https://ncert.nic.in/textbook/pdf/keph101.pdf
2. **s2** — Science, Class IX, Chapter 10: Work and Energy — https://ncert.nic.in/textbook/pdf/iesc110.pdf
3. **s3** — Science, Class IX, Chapter 11: Sound — https://ncert.nic.in/textbook/pdf/iesc111.pdf
4. **s4** — Science, Class X, Chapter 9: Light – Reflection and Refraction — https://ncert.nic.in/textbook/pdf/jesc109.pdf

Note: `iesc111.pdf` is the Sound chapter in the current numbering (it supplied the hertz claims); `fesc105.pdf` was opened but turned out to be Class VI "Body Movements" and was **not** used.

## Counts

- **Claims:** 41 (c01–c41), every one with a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- **Practice questions:** 42 — basic 12, moderate 16, difficult 8, exam 6; 7 per section across all 6 sections (meas_basics, systems_si, base_units, derived_units, scales, sigfig_dimensions). Formats include DIRECT, STATEMENT, MATCH, CHRONOLOGY, PAIRS and ASSERTION_REASON.
- **Sections:** 6, each with quick + standard; deep present in 5 (scales has deep = null).

## PYQ candidates

Found by (1) filtering `db/gk/general_science.jsonl` for `subtopic == physics_units` → **1 item** (GK-SCI-001), and (2) grepping `db/pyq/*.json` for genuine unit/measurement questions → **8 items**. Total **9 candidates**, all in `pyq_map_SCI-01.json`:

- **Taught (6):** GK-SCI-001 (seven base units), KP Constable 2023 Q14 (kelvin), WBP Constable 2021 Q74 (dioptre), WBCS 2019 Q135 (light year), Clerkship 2023 Session III Q95 (kelvin is not an energy unit), Clerkship 2023 Session IV Q92 (work function unit = joule — unit taught; the work-function concept itself belongs to SCI-05).
- **Not taught (3), each with a specific reason in the map:** WBP Constable 2021 Q98 (pascal/erg/calorie not in fetched sources), WBPSC IDO 2019 Q10 (1 hp = 746 W conversion not in any fetched NCERT source), Clerkship 2023 Session III Q92 (becquerel not in fetched sources; radioactivity belongs to SCI-05).

## Subtopic coverage

`physics_units` is fully covered at textbook depth: measurement and the unit concept, base vs derived units, CGS/FPS/MKS, the SI system (1971 scheme, November 2018 revision), all seven base units with symbols and constant-based definitions, supplementary radian/steradian, named derived units (joule, watt, hertz, dioptre), kilo- multiples (kJ, kW), length scales (angstrom, light year, wavelength in metres), significant figures and dimensional analysis (homogeneity principle, force dimensions, limits of the method).

## Gaps (disclosed, never filled from memory)

1. **Horsepower conversion (1 hp = 746 W)** — asked in IDO 2019; no fetched NCERT page states it, so it is not taught and the PYQ is mapped untaught.
2. **Becquerel (radioactivity)** — asked in Clerkship 2023; absent from the fetched sources; belongs to SCI-05 (আধুনিক পদার্থবিদ্যা).
3. **Pascal, erg, calorie, electron-volt** — appear only as PYQ options; none is defined in the fetched pages, so the chapter makes no claim about them (the two PYQs that turn on them are handled honestly in the map: Q98 untaught, Session-III Q95 taught via the kelvin/joule contrast).
4. **SI prefixes beyond kilo** (milli, micro, mega…) — keph101 refers readers to an appendix table that the text extraction did not include; the chapter therefore teaches only the kilo- multiples actually quoted (kJ, kW) and does not reproduce a prefix table.
5. **Dioptre page number** in s4 is marked "(approx.)" — the printed pagination of jesc109 was not cleanly recoverable from the extraction.
6. No WBBSE source was used: the science validator profile does not admit WBBSE, and the chapter is NCERT-only by design.
