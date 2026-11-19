# ORG-03 — বৈশ্বিক গোষ্ঠী ও জোট (Global Groups & Alliances) — Draft Report

- **Book / chapter:** organisations, ORG-03, part `world`, subtopics `["global_groups"]` (title and part taken verbatim from `db/books/organisations/toc.js`).
- **Status:** DRAFT, verification UNVERIFIED.
- **Deliverables:** `chapter.json`, `pyq_map_ORG-03.json`, this `REPORT.md` in `~/workspace/edtech/bookwork/org-03/`.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/org-03/chapter.json` → **OK** (after fixes: one malformed question argument list in the builder script; no validator errors in the final JSON).
- **Counts:** 62 claims (all used at least once), 42 practice questions — basic 13, moderate 17, difficult 8, exam 4 (STATEMENT ×2, MATCH, PAIRS, ASSERTION_REASON, CHRONOLOGY across the set); 7 sections; 12 sources, all from the organisations profile's allowed publishers (NCERT, GOVT — mea.gov.in / pib.gov.in).

## Sources actually fetched (browser.open, 2026-11-19)

| id | Title | URL |
|----|-------|-----|
| s1 | NCERT, Contemporary World Politics (Class XII), Ch. 2: Contemporary Centres of Power | https://ncert.nic.in/textbook/pdf/leps102.pdf |
| s2 | NCERT, Contemporary World Politics (Class XII), Ch. 1: The End of Bipolarity | https://ncert.nic.in/textbook/pdf/leps101.pdf |
| s3 | MEA Brief: Group of Twenty (G20) | https://www.mea.gov.in/Portal/ForeignRelation/G20_2026.pdf |
| s4 | MEA Brief on India-SCO Cooperation | https://www.mea.gov.in/Portal/ForeignRelation/India-SCO_Cooperation.pdf |
| s5 | MEA Brief: India-SAARC (June 2026) | https://www.mea.gov.in/Portal/ForeignRelation/India-SAARC-June-2026.pdf |
| s6 | MEA Brief: India in BIMSTEC | https://www.mea.gov.in/Portal/ForeignRelation/India_in_BIMSTEC.pdf |
| s7 | MEA Brief on India-ASEAN Relations (15 July 2025) | https://www.mea.gov.in/Portal/ForeignRelation/India-ASEAN-july-2025.pdf |
| s8 | MEA Brief: Quad (as of 12 November 2026) | https://www.mea.gov.in/Portal/ForeignRelation/Quad_Brief_for_MEA_Website.pdf |
| s9 | MEA Distinguished Lecture on BRICS / international financial architecture | https://www.mea.gov.in/distinguished-lectures-detail?285 |
| s10 | MEA Brief on India-EU Bilateral Relations (July 2026) | https://www.mea.gov.in/Portal/ForeignRelation/India-European_Union_July_2026.pdf |
| s11 | PIB Backgrounder: BRICS — Evolution, Cooperation and India's Leadership (10 Sep 2026) | https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2308611&lang=1&reg=3 |
| s12 | MEA: Speech by Secretary (East) at the ASEAN Secretariat, Jakarta (20 June 2025) | https://www.mea.gov.in/speeches-statements?dtl/39706/Speech_by_Secretary_East_at_the_ASEAN_Secretariat_during_celebration_of_the_10th_Anniversary_of_Establishment_of_Indian_Mission_to_ASEAN_Jakarta_June_20_2025 |

Also fetched for orientation (not used as chapter sources): MEA regional-organisations index page, MEA BRICS brief PDF (BRICS-2025.pdf — its text extraction is column-scrambled, so no verbatim quote was taken from it; BRICS facts were sourced from s9 and s11 instead), PIB G20 explainer search results.

## Coverage (subtopic: global_groups)

- **BRICS** — acronym origin (O'Neill, 2001), first summit 2009 Yekaterinburg, South Africa 2010, NDB Shanghai + CRA, expansion 2024/2025 to 11 members (PIB list, incl. Saudi Arabia), rotating presidency, India's chairships. No permanent HQ — taught as a trap.
- **SCO** — founded 15 Jun 2001, Secretariat Beijing, RATS Tashkent, India observer 2005 → full member 2017, Iran 2023, Belarus 10th member 2024, official languages, SG Nurlan Yermekbaev (dated).
- **G20 / G7 / Quad** — G20 founded 1999, 19 countries + EU + AU, no charter/secretariat, Spain permanent invitee, Hangzhou 2016; G7 formed 1975, members listed, Russia expelled 2014, India not a member; Quad members, 2004 tsunami origin, 2007 Manila meeting, 2017 revival, first Leaders' Summit 12 Mar 2021.
- **ASEAN** — founded 8 Aug 1967 Bangkok, 10 members, Secretariat Jakarta, ASEAN Way, ARF 1994, three pillars 2003, EAS 2005, India's status ladder 1992 → 1995 → CSP 2022, SG Dr Kao Kim Hourn (dated).
- **SAARC / BIMSTEC** — SAARC founded 8 Dec 1985 Dhaka, Secretariat Kathmandu, 8 members, last summit 2014, SG Md. Golam Sarwar (dated); BIMSTEC founded 6 Jun 1997, 7 members (5+2), Secretariat Dhaka (2014), SG Indramani Pandey (dated), Bangladesh current chair, India leads Security pillar, Charter in force 20 May 2024.
- **EU & alliances** — EEC 1957 → EU 1992 (Maastricht), 27 members, Commission President Ursula von der Leyen and Council President António Costa (dated, Jan 2026 summit), India-EEC relations 1962; NATO only as NCERT's "collective security structure" concept; Warsaw Pact and CIS from NCERT.
- **India's status summary** — member vs partner vs guest across all groups; founded-city vs secretariat-city trap table in prose.
- **Current heads (all dated 2026-11-19 in text):** SCO SG, SAARC SG, BIMSTEC SG, ASEAN SG, EU Commission & Council Presidents, BIMSTEC Chair (Bangladesh). The chapter's exam_note in section `g20_g7_quad` states the office-holder list is as of 19 November 2026.

## PYQ candidates

- **Found: 9** — 2 GK bank items with subtopic `global_groups` in `db/gk/organisations.jsonl` (GK-ORG-009, GK-ORG-010) and 7 real exam questions grepped from `db/pyq/*.json` (WBCS Prelims 2017 Q64, 2022 Q102, 2023 Q48, 2024 Q131; Clerkship 2019 Forenoon Q12, 2019 Afternoon Q8, 2023 Session IV Q33). One further corpus hit (WBCS 2024, a Ukraine-war statement question that merely mentions NATO/EU in one option) was excluded as not genuinely on this chapter's topic.
- **Mapped: 9. Taught: 6** (WBCS 2017 G20, WBCS 2022 BIMSTEC summit, WBCS 2023 BIMSTEC HQ, WBCS 2024 BRICS, Clerkship 2019 SAARC non-member, Clerkship 2019 BIMSTEC non-member).
- **Untaught: 3** — GK-ORG-009 and GK-ORG-010 (composite items depending on NATO/OPEC/Interpol/ICRC/EU-seat facts that could not be sourced from an allowed publisher) and Clerkship 2023 Session IV Q33 (NATO founding year 1949 — same sourcing gap). Each carries its specific reason in `pyq_map_ORG-03.json`.

## Gaps (disclosed, never filled from memory)

1. **NATO** — founding year (1949), headquarters (Brussels) and member count (32): no verbatim quote from an allowed publisher (NCERT/MEA/PIB/IGNOU/e-PG Pathshala) was fetched; targeted searches of egyankosh.ac.in and inflibnet.ac.in returned no usable unit. The chapter teaches only NCERT's sourced statement that the US created a collective security structure under NATO, and says so openly in the `eu_alliances` section. This is why Clerkship 2023 Q33 is marked untaught.
2. **OPEC** — founding (Baghdad, 1960) and headquarters (Vienna): same sourcing gap; not claimed anywhere in the chapter.
3. **EU institutional seats** — Commission Brussels / Parliament Strasbourg / Court of Justice Luxembourg (part of GK-ORG-009): not sourced from an allowed publisher in this draft; not claimed.
4. **Interpol (Lyon, 1923) and ICRC (Geneva, 1863)** — part of GK-ORG-010: not sourced; not claimed.
5. **ASEAN Secretariat in Jakarta** rests on MEA's Jakarta-based Permanent Representatives mechanism (s7) plus the MEA speech delivered at the ASEAN Secretariat in Jakarta (s12, quoted from its title); no single fetched sentence says "The ASEAN Secretariat is located in Jakarta" verbatim — the claim is worded accordingly.
6. **BRICS member count** follows PIB (11, including Saudi Arabia), which also matches the WBCS 2024 official key; some international listings count 10 pending Saudi Arabia's formal confirmation — the chapter discloses that it follows PIB.
7. **NCERT Contemporary South Asia chapter (leps103.pdf)** could not be fetched (network error); SAARC facts were sourced from the MEA SAARC brief instead, so no content was lost.
8. **Current heads not covered:** NATO Secretary-General and OPEC Secretary-General (blocked by gap 1–2); G20/BRICS presidencies rotate annually and are flagged in the exam_note as needing a fresh check at exam time rather than named.
9. **Bengal connection** is the nearest honest link (Bangladesh in SAARC/BIMSTEC, BIMSTEC Secretariat in Dhaka, Bay of Bengal framing) and is labelled as such in the chapter; no Bengal-specific claim beyond the sourced member/secretariat facts is made.
