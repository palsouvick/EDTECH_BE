# SCI-03 — তাপ, আলো ও শব্দ (Heat, Light and Sound) — Draft Report

- **Chapter:** SCI-03, book `science`, part `physics`, subtopics `["physics_heat_light_sound"]` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-03/chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_SCI-03.json`, `REPORT.md` (this file)

## Counts

| Item | Count |
|---|---|
| Claims (each with a verbatim quote from a fetched source) | 78 |
| Sources | 7 |
| Sections | 6 |
| Practice questions | 42 (basic 14, moderate 16, difficult 6, exam 6; 7 per section) |
| PYQ candidates found | 21 (18 real PYQs from the local PYQ corpus + 3 GK bank cards) |
| PYQ candidates mapped | 21 |
| PYQ candidates taught | 14 |
| PYQ candidates not taught (with reasons in the map) | 7 |

All 78 claims are referenced at least once in validator-counted places (section claim lists, question claim lists, people, cause_effect, bengal_connection).

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to publishers allowed for the science profile (NCERT, IGNOU).

| ID | Title | URL |
|---|---|---|
| s1 | NCERT Class X Science, Ch 9: Light – Reflection and Refraction | https://ncert.nic.in/textbook/pdf/jesc109.pdf |
| s2 | NCERT Class X Science, Ch 10: The Human Eye and the Colourful World | https://ncert.nic.in/textbook/pdf/jesc110.pdf |
| s3 | NCERT Class IX Science, Ch 11: Sound | https://ncert.nic.in/textbook/pdf/iesc111.pdf |
| s4 | NCERT Class VIII Science, Light chapter | https://ncert.nic.in/textbook/pdf/hesc113.pdf |
| s5 | IGNOU Physics, Unit 2: Heat | https://egyankosh.ac.in/bitstream/123456789/28407/1/Unit-2.pdf |
| s6 | IGNOU, Unit 2: Measurement of Temperature | https://egyankosh.ac.in/bitstream/123456789/18926/1/Unit-2.pdf |
| s7 | IGNOU Physics, Unit 4: Light (total internal reflection, mirage, optical fibres) | https://egyankosh.ac.in/bitstream/123456789/29623/1/Unit-4.pdf |

### Failed / unusable fetches (disclosed, not retried)

- `https://ncert.nic.in/textbook/pdf/gesc104.pdf` (NCERT Class VII, Heat) — fetch failed. Heat is therefore sourced from the two IGNOU units (s5, s6) instead of the school-level NCERT heat chapter.
- `keph110.pdf`, `keph111.pdf`, `keph211.pdf` (NCERT Class XI Physics, thermal/optics units) — fetch failed. Consequence: thermal expansion of solids is not covered by any fetched source (see gaps).
- `iesc112.pdf` and `gesc107.pdf` were fetched but contain unrelated chapters (Improvement in Food Resources; Transportation in Animals and Plants) and were not used.

## Subtopic coverage — `physics_heat_light_sound`

- **Heat:** temperature scales (Celsius fixed points, kelvin, absolute zero), thermometers, kilocalorie/joule, specific heat capacity and Q = mCθ, calorimetry principle, conduction/convection/radiation, good absorber = good radiator, black body, anomalous expansion of water (density maximum at 4 °C), change of state, liquid expansion.
- **Light:** laws of reflection, plane/spherical mirrors, R = 2f, lateral inversion, periscope, refraction and refractive index, lenses and lens power (dioptre), total internal reflection, mirage, optical fibres, dispersion, rainbow, atmospheric refraction (twinkling, early sunrise), scattering (blue sky, red signals, Tyndall effect), human eye and vision defects (myopia, hypermetropia, presbyopia).
- **Sound:** production and propagation, longitudinal waves, wavelength/frequency/pitch/loudness, v = λν, speed of sound vs medium and temperature, reflection, echo (17.2 m), reverberation, audible range, infrasound/ultrasound and their uses.

Sections: `heat_temperature`, `heat_transfer_expansion`, `light_reflection`, `light_refraction_lenses`, `light_phenomena_eye`, `sound`.

`events` and `timeline` are honest empty arrays — this is a non-dated physics chapter and the science validator profile does not require dated entries. `people` has 2 entries (Newton — dispersion; Hertz — the frequency unit), each backed by a claim. `bengal_connection` is genuine (coastal convection/ocean currents, white clothes in the Bengal summer, pond water at 4 °C) and uses only claims c78/c16/c17.

## PYQ candidates

- **GK bank** (`db/gk/general_science.jsonl`, subtopic `physics_heat_light_sound`): exactly 3 items — GK-SCI-004, GK-SCI-018, GK-SCI-024. All 3 are taught and are also the chapter's `related_facts`.
- **PYQ corpus** (`db/pyq/*.json`): 18 genuinely on-topic items (KP Constable 2023 ×1, WBCS 2015–2023 ×9, IDO 2019 ×2, WBP Constable 2021 ×2, Clerkship 2023 ×2 — see the map for the full list). 11 of 18 are taught.
- **Excluded near-misses (not candidates for this chapter):** KP 2023 Q77 (NTP gas volume — SCI-01/chemistry), KP 2023 Q87 (camphor sublimation — SCI-06), WBCS 2016 Q65 (semiconductor resistance — SCI-04), WBCS 2018 Q38 (Plaster of Paris — chemistry), WBCS 2021 Q145 (heater filament power — SCI-04), WBCS 2021 Q169 (kinetic energy — SCI-02), WBCS 2024 Q35 (photon frequency — SCI-05).

## Gaps (not taught — never filled from memory)

1. **Temperature-scale conversion** — no fetched source states the Celsius↔Fahrenheit relation, so the famous "−40 °C = −40 °F" point (WBCS 2015 Q94) is untaught. The IGNOU temperature unit gives Celsius fixed points and the kelvin scale only.
2. **Light-year definition** (WBCS 2019 Q135) — not stated in any fetched source.
3. **Sun–Earth light travel time** (Clerkship 2023 Session I Q64) — needs the Sun–Earth distance, absent from fetched sources; the speed of light itself is taught.
4. **Thermal expansion of solids** (WBCS 2023 Q152, Q198) — fetched sources cover liquid expansion only; the NCERT Class XI thermal chapters could not be fetched.
5. **Refractive indices of eye parts** (WBCS 2022 Q141) — NCERT states most refraction occurs at the cornea but gives no refractive-index values for eye parts; the chapter does not teach against the official key.
6. **Electromagnetic spectrum ordering** (Clerkship 2023 Session II Q57) — belongs to SCI-05 (modern physics), out of this chapter's scope.
7. **SONAR by name** — the fetched NCERT Class IX Sound chapter contains no SONAR passage; ultrasound applications that are in the source (flaw detection, echocardiography, ultrasonography) are taught instead. GK-SCI-018 is still counted taught with this caveat noted in the map.
8. **Numeric variance flagged in the chapter:** GK-SCI-018 gives sound speed ≈332 m/s at 0 °C and ≈343 m/s at 20 °C; NCERT (fetched) gives 331 m/s at 0 °C and 344 m/s at 22 °C. The chapter teaches the NCERT values and tells students the bank values differ slightly.
