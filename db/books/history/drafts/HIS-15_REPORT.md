# HIS-15 — ইউরোপীয়দের আগমন — Draft Report (2026-11-19)

## Deliverables
- `chapter.json` — validator: **OK** (`node scripts/validateBooks.js`), status DRAFT, verification UNVERIFIED.
- `pyq_map_HIS-15.json` — 8 candidates mapped (6 primary + 2 alt), 4 taught.

## Sources actually fetched (browser text-fetch)
1. IGNOU eGyanKosh, BHIC-112 Unit 8 "Indian Ocean Trade Network" — http://egyankosh.ac.in//bitstream/123456789/82883/1/Unit-8.pdf (recorded in chapter as the https egyankosh URL)
2. IGNOU eGyanKosh, Unit 16 "Oceanic Trade" (Ancient and Medieval Societies) — https://egyankosh.ac.in/bitstream/123456789/98755/1/Unit-16.pdf
3. NIOS, Military History Module III, Chapter 9 "Colonial Era and the Indian Sepoy", sections 9.1.1–9.1.4 — http://digital.nios.ac.in/content/375en/9/files/basic-html/page2.html (and pages 3–5)

## Counts
- Claims: 52 (all with verbatim quotes from the fetched sources above; every claim is used).
- Practice questions: 45 (basic 14, moderate 16, difficult 8, exam 7 — DIRECT, STATEMENT ×2, CHRONOLOGY, MATCH, ASSERTION_REASON, PAIRS), across all 6 sections.
- Sections: 6 (sea_route, portuguese, portuguese_system, dutch, english, french_rivalry).

## PYQs (from history/pyq_chapters.json; polity pyq_map.json has no HIS-15 entries)
- Primary candidates: 6 — WBCS 2016 Q31, WBCS 2018 Q177, WBCS 2019 Q67, WBCS 2019 Q68, Clerkship 2019-Aft Q37, Clerkship 2023-S2 Q98.
- Alt candidates: 2 — WBCS 2018 Q43 (Tipu/French, primary HIS-16), WBCS 2019 Q57 (Carnatic Wars, primary HIS-16).
- Taught: 4 (Q177 first traders; Q68 Vasco 1498; Clerkship Q37 Portuguese colonies by elimination; Clerkship Q98 Calicut).
- Not taught: 4, each with a specific reason in the map.

## Subtopic coverage
Registered subtopic `company_rule` covered for the arrival phase: sea-route search, Portuguese system (cartaz/qafila), Dutch VOC, English EIC to the Bengal turn, French rivalry to 1765. Conquest narrative (Plassey→Dalhousie) is only bridged, as it belongs to HIS-16.

## Gaps
- **NCERT**: the primary NCERT source, Our Pasts III Ch. 2 (hees202.pdf), failed to fetch on 2026-11-19 (network error) and was not retried in this run; the chapter is therefore built on IGNOU + NIOS only (both admitted for History by the owner decision of 2026-11-19). A later pass should add NCERT quotes, especially for Surat/Jahangir.
- **WBBSE**: e-textbooks unreachable from this machine (standing gap).
- **Surat first English factory + Jahangir's firman** (WBCS 2016 Q31, WBCS 2019 Q67): not in any fetched source — recorded untaught, never filled from memory.
- **Carnatic Wars by name / Tipu's French alliance**: primary HIS-16; not taught here.
- Dates not in sources (e.g. Danish founding 1616, English Surat 1613) were left out of the chapter text.
