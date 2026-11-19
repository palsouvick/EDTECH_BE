# POL-19 — অন্যান্য সংস্থা — NHRC, কমিশন, CVC, CIC, লোকপাল — Draft Report

- **Chapter file:** `chapter.json` (book `polity`, code `POL-19`, number 19, part `bodies_elections_local`, subtopics `["constitutional_bodies"]` — title/part/subtopics verbatim from `db/books/polity/toc.js`)
- **Status:** DRAFT · verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (run 2026-11-19)
- **Counts:** 70 claims · 44 practice questions (basic 15, moderate 15, difficult 7, exam 7; formats: DIRECT 36, STATEMENT 4, PAIRS 1, MATCH 1, ASSERTION_REASON 1, CHRONOLOGY 1) · 8 sections · 7 events · 2 people · 12 timeline entries · 13 terms · 3 cause–effect · 14 quick-revision bullets · 10 exam-focus points

## Sources actually fetched (browser.open, 2026-11-19)

| # | Title | URL |
|---|---|---|
| s1 | The Constitution of India (updated, incl. 106th Amendment) — Arts. 338/338A/338B, pp. 195–202 | https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf |
| s2 | The Protection of Human Rights Act, 1993 (India Code, updated) — ss. 1–36 | https://www.indiacode.nic.in/bitstream/123456789/15709/1/a199410.pdf |
| s3 | NHRC — Composition of the Commission (official site) | https://nhrc.nic.in/about-us/composition_of_commission |
| s4 | The Central Vigilance Commission Act, 2003 (Gazette text) — ss. 3–14 | https://py.gov.in/sites/default/files/cvcact.pdf |
| s5 | The Right to Information Act, 2005 — Chapter III: The Central Information Commission (ss. 12–14) | https://cdacuttack.nic.in/RTI_Chapter_3.aspx |
| s6 | The Lokpal and Lokayuktas Act, 2013 (India Code) — ss. 1–63 + Schedule | https://www.indiacode.nic.in/bitstream/123456789/2122/1/201401.pdf |
| s7 | PIB — NITI Aayog: Objectives and Composition (Cabinet Resolution, 1 January 2015) | https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=114273 |
| s8 | Lokayukta Maharashtra — Introduction (official site; Ombudsman origin, ARC 1966, Maharashtra 1971) | https://lokayukta.maharashtra.gov.in/en/about-department/introduction/ |

Also consulted for orientation (not claim sources): NCERT *Indian Constitution at Work* index (ncert.nic.in) — the chapter's NHRC/NITI facts were sourced from the Acts themselves above, which rank higher in the source order.

## PYQ candidates

`db/books/polity/pyq_map.json` has **no entries under POL-19** (empty array), so the PYQ bank (`db/pyq/*.json`) was searched directly for this chapter's topics. **10 real candidates found → 6 taught, 4 untaught** (full mapping in `pyq_map_POL-19.json`):

Taught:
- WBCS 2016 Q176 & WBCS 2018 Q113 — NITI Aayog set up by a Union Cabinet resolution → `niti_aayog`
- WBCS 2018 Q88 — Ombudsman originated in Sweden → `lokpal`
- WBCS 2019 Q151 — 123rd Amendment Bill 2017 empowers NCBC → `jatiya_commission`
- WBCS 2021 Q136 — Protection of Human Rights Act passed in 1993 → `nhrc_gathon`
- WBCS 2024 Q166 — Finance Commission constitutional + NCW statutory (NCW half) → `jatiya_commission`

Untaught (reasons in the map file):
- WBCS 2018 Q129 — emphasis of NITI Governing Council's 2nd meeting: dated current-affairs detail, not in fetched official sources.
- WBCS 2023 Q86 — NITI–UNDP NE District SDG Index: current-affairs partnership detail, not in fetched official sources.
- WBP Constable 2021 Q45 — Planning Commission established 1950: the PIB release used does not give the 1950 date; the Planning Commission's own resolution was not fetched.
- WBPSC Clerkship 2019 Q25 — HQ of the **UN** Human Rights Council (Geneva): international-body GK, out of this chapter's scope (Indian NHRC, HQ Delhi, is taught).

## Subtopic coverage

Registered subtopic `constitutional_bodies` is covered comparatively across the whole chapter: the three constitutional commissions (Arts. 338/338A/338B) get a full section, and every other body is classified against them (statutory vs executive). Section coverage: three-types classification; NHRC composition/appointment/term; NHRC functions/limits + State HRCs + Human Rights Courts; NCSC/NCST/NCBC + NCW/NCM/NCPCR; CVC; CIC; Lokpal/Lokayukta; NITI Aayog. Every section has practice questions (3–7 each) and every claim is used at least once (checked programmatically; validator confirms).

## Gaps and deliberate exclusions (disclosed, never filled from memory)

1. **RTI (Amendment) Act, 2019** — it replaced the CIC's fixed 5-year term and CEC-equivalent salary with government-prescribed terms (rules prescribe 3 years). No fetched source in this build states this from an allowed government page (search results surfaced only non-government summaries; the CIC Annual Report PDF failed to fetch — `upstream_fetch_failed`). The chapter therefore teaches the **original s. 13 text verbatim** and its `deep` note openly flags that 2019 changed the term/salary regime, without asserting the new numbers in claims or question keys.
2. **CIC establishment date (12 October 2005)** — appears only in the CIC Annual Report PDF that failed to fetch; not used. The chapter teaches constitution under s. 12 by Gazette notification only.
3. **Named first office-holders** (first NHRC Chairperson, first Lokpal, first CVC/CIC) — not taught: available sources for these names in this run were non-official (news/Wikipedia), and the polity book's precedent avoids naming office-holders. People entries are role-based (Prime Minister, President) and fully claim-backed.
4. **Planning Commission year 1950** — not in the fetched PIB release; disclosed in the PYQ map as a source gap.
5. **Lokpal complaint time limit (s. 53, seven years)** — mentioned in the `lokpal` section's `deep` note as a memory aid only; deliberately **not** in claims[] and not used in any question key, because the fetched India Code text was truncated before s. 53.
6. **NHRC removal grounds beyond proved misbehaviour/incapacity** (insolvency, paid employment, infirmity, unsoundness of mind, conviction — s. 5(3)) — the fetched PHRA PDF text was truncated at that point; the chapter teaches the s. 5(1)–(2) Supreme-Court-inquiry route only.
7. **Constitution PDF extraction** — the official Constitution PDF is two-column; Arts. 338–338B extracted with column interleaving, so claims use only short, cleanly readable verbatim fragments (composition, appointment, consultation, civil-court powers).
8. NCERT *Politics in India Since Independence* was not fetched (its NITI/Planning material is superseded by the PIB Cabinet Resolution, which ranks as the primary government source for NITI Aayog).
