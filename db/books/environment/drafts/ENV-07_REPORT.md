# ENV-07 — শক্তি সংরক্ষণ ও নবায়নযোগ্য শক্তি — Draft Report

- Book: environment | Code: ENV-07 | Part: protection | Subtopic: energy
- Status: DRAFT, verification UNVERIFIED
- Validator: `node scripts/validateBooks.js` → **OK**

## Sources actually fetched (browser.open, 2026-11-19)

1. NCERT, Science Class X, Ch. 14 "Sources of Energy" — https://ncert.nic.in/textbook/pdf/jesc114.pdf
2. MNRE, Solar Overview — https://mnre.gov.in/en/solar-overview/
3. Bureau of Energy Efficiency, FAQs (Ministry of Power) — https://beeindia.gov.in/show_content.php?lang=1&level=0&ls_id=147&lid=311
4. PIB, National Statement by the Prime Minister at COP26, Glasgow — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1768712&reg=48&lang=2
5. PIB, UJALA: 10 Years of Energy-Efficient Lighting — https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=153633&ModuleId=3&reg=3&lang=1

All five URLs belong to publishers allowed for the environment profile (NCERT, GOVT).

## Counts

- Claims: 54 (every claim carries a verbatim quote from a fetched source above)
- Practice questions: 42 (basic 10, moderate 15, difficult 10, exam 7; all 6 sections tested)
- Sections: 6 (energy_basics, fossil_thermal, hydro_biomass, wind_solar, sea_geo_nuclear, conservation_policy)

## PYQ candidates

- GK bank (subtopic `energy` in db/gk/environment.jsonl): 5 found — GK-ENV-014 to GK-ENV-018; mapped 5, taught 4 (GK-ENV-016 ISA untaught, see gaps).
- Real exam corpus (db/pyq/*.json): 10 genuinely on-topic WBCS Prelims items found (solar cooker ×2, wind power/farm ×2, biogas, Rammam, Sharavati, Dulhasti, solar cell efficiency, WB wind project); mapped 10, taught 5.
- Total: 15 candidates, 9 taught, 6 untaught with specific reasons in pyq_map_ENV-07.json.

## Subtopic coverage

`energy` covered in full: energy basics and classification, fossil fuels and thermal power, hydro/biomass/biogas, wind and solar, sea/geothermal/nuclear, and the conservation framework (EC Act 2001, BEE, NMEEE/PAT, ECBC, S&L, National Solar Mission, UJALA, NDC, Panchamrit, ISA).

## Gaps (disclosed, not filled)

- ISA: only "India initiated the International Solar Alliance" is sourced (PIB COP26). Launch year, India–France joint launch and Gurugram HQ could not be sourced — isa.int is outside this book's allowed publishers, so those facts are omitted and GK-ENV-016 is marked untaught.
- Project-specific locations asked in real PYQs (Rammam–Darjeeling, Sharavati–Karnataka, Dulhasti, Fraserganj wind project, WB) appear in no fetched source; the chapter teaches the underlying concepts only, and those 4 PYQs are marked untaught.
- Commercial solar-cell efficiency % (WBCS 2024 Q45) is not stated in the fetched NCERT chapter; not taught.
- MNRE wind-overview page fetch timed out; all wind facts are therefore sourced from NCERT instead. Not retried per instructions.
- NCERT's "a quarter of India's energy requirement is met by hydro power" is a textbook-era figure; the chapter attributes it to the NCERT figure explicitly.
- `people` is an empty array: no person's contribution is asserted, because no fetched source supported one (the environment profile does not require people).
