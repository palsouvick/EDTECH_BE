# ART-06 — ইউনেস্কো বিশ্ব ঐতিহ্য (UNESCO World Heritage): Draft Report

- **Book / code:** art_culture / ART-06, number 6, part `visual_heritage` (per `db/books/art_culture/toc.js`; the workflow brief said "part: living" but the TOC registers chapter 6 under `visual_heritage`, and the TOC was followed verbatim), title ইউনেস্কো বিশ্ব ঐতিহ্য, subtopics: `unesco_sites`.
- **Status:** DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/art-06/chapter.json` → **OK** (no errors).
- **Counts:** 61 claims, 45 practice questions (basic 13, moderate 15, difficult 10, exam 7; formats DIRECT 38, STATEMENT 2, MATCH 2, CHRONOLOGY 1, PAIRS 1, ASSERTION_REASON 1), 6 sections, every section tested, every claim used.

## Sources actually fetched (browser.open, verbatim quotes taken from these pages)

All sources are GOVT publisher class (allowed for art_culture: NCERT, GOVT, IGNOU, EPG):

1. Press Information Bureau — 46th Session of the World Heritage Committee, Annexure-I: India World Heritage list of 43 properties (site, state, year). https://www.pib.gov.in/PressReleasePage.aspx?PRID=2079782&reg=48&lang=2
2. Press Information Bureau (Ministry of Culture) — Maratha Military Landscapes inscribed as India's 44th property, 11 Jul 2025. https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2144154&reg=48&lang=2
3. Press Information Bureau — "Turning the Wheel of Heritage: Sarnath's Path to the World Heritage List", 26 Aug 2026 (45 properties, full categorised list, ASI role, tentative list). https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=159711&ModuleId=3&reg=3&lang=1
4. Press Information Bureau (Ministry of Culture) — India inscribes Hoysala Temples and Santiniketan, 19 Sep 2023. https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1958855&reg=48&lang=2
5. Wildlife Institute of India (MoEF, Govt. of India) — Sundarban Biosphere Reserve (mangrove extent, Sundari name, World Heritage status, tiger, cyclone protection). https://v1.wii.gov.in/nmcg/protected-areas-along-ganga/sundarban-biosphere-reserve

## Subtopic coverage (unesco_sites)

- Concept layer: 1972 Convention, OUV, three categories, India's tally 45 (37/7/1), world rank 6th / Asia-Pacific 2nd, ASI as nodal agency, Tentative List as mandatory first step (69 properties), one nomination per year.
- Full list coverage: every one of India's 45 properties is named in the chapter with state and inscription year, grouped as first wave 1983–1993 (s2), cultural list (s3), natural 7 + mixed 1 (s4), staged/serial and recent inscriptions 1999–2026 (s5).
- Bengal layer (s6 + bengal_connection): Sundarbans 1987 (natural, mangrove), Darjeeling Himalayan Railway 1999, Santiniketan 2023 (41st, Tagore, criteria iv/vi).

## PYQ candidates

- Found: **6** — 2 GK bank items with subtopic `unesco_sites` (GK-ART-012, GK-ART-013) + 4 genuinely on-topic items grepped from `db/pyq/*.json` (WBCS 2016 Q39, WBCS 2019 Q35, WBCS 2021 Q63, WBCS 2024 Q148).
- Mapped: 6/6 in `pyq_map_ART-06.json`. **Taught: 4** (GK-ART-012, GK-ART-013, WBCS-2019-Q35, WBCS-2024-Q148). **Untaught: 2**, each with a specific reason in the map:
  - WBCS-2016-Q39 — UNESCO Creative Cities Network is a different UNESCO programme, outside this chapter's World Heritage List scope and absent from its sources.
  - WBCS-2021-Q63 — demands the Al-Biruni first-mention fact (medieval history), absent from this chapter's fetched sources; only Khajuraho's 1986 inscription is taught.

## Gaps (disclosed, not filled)

1. **No NCERT source used.** The NCERT *An Introduction to Indian Art* (Class XI) PDF could not be fetched with a verified `ncert.nic.in/textbook/pdf/…` URL in this run (search surfaced only third-party mirrors), so the chapter is GOVT-only (PIB + WII), which the art_culture validator profile allows. Site-level art-historical description (e.g. Ajanta paintings, Ellora's Kailasa) is therefore not taught here — it belongs to ART-03/ART-04.
2. **Gateway of India exclusion (claim c61)** rests on its absence from the complete official PIB list of 45 reproduced in source s3; the claim text states this basis explicitly rather than quoting a sentence that names the Gateway.
3. **India's ratification year of the Convention (1977)** appears only in non-allowed secondary sources found during the run, so it is deliberately not stated anywhere in the chapter.
4. **Intangible Cultural Heritage and Creative Cities** are named only as "do not confuse" contrasts (no facts asserted), because no allowed fetched source covered them; the WBCS 2016 Creative Cities PYQ is mapped as untaught for the same reason.
5. Quote typography: PIB pages render some names with curly apostrophes (e.g. "Humayun's Tomb") and the Santiniketan release has spaced apostrophes ("UNESCO ' s"); quotes preserve the fetched rendering.
6. The current tally (45, incl. Sarnath 2026) is time-sensitive: the counts in s1/s5 will need revision when the next inscription lands; the chapter's deep note in s1 shows the year-by-year count progression so a future editor can update cleanly.
