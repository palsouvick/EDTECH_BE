# ORG-01 — জাতিসংঘ ও বিশেষায়িত সংস্থা — Draft Report

Chapter: ORG-01, book `organisations`, part `world`, subtopic `un_system` (title/part/subtopics verbatim from `db/books/organisations/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.
Deliverables: `chapter.json`, `pyq_map_ORG-01.json`, this report — in `~/workspace/edtech/bookwork/org-01/`.

## Counts

- Claims: **61** (c01–c61), every one with a verbatim quote from a page actually fetched on 2026-11-19 via the browser text-fetch tool; every claim is used at least once (validator enforces this).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH ×2, CHRONOLOGY ×1, ASSERTION_REASON ×1, PAIRS ×1); exactly 7 per section across all 6 sections.
- Sections: 6 (founding, principal_organs, security_council, specialised_agencies, programmes_funds, india_and_heads).

## Sources actually fetched (all in the organisations validator profile: NCERT, GOVT, IGNOU)

1. NCERT, *Contemporary World Politics*, Class XII, Ch. 6 "International Organisations" — https://ncert.nic.in/textbook/pdf/leps106.pdf (text read via the archive.org full-text mirror of the same NCERT book, code leps106; quotes are the book's sentences, incl. the p. 85 UN-System chart and p. 97 exercises).
2. IGNOU eGyanKosh, Unit 12 "Role of International Bodies – Governmental and Non-Governmental" — https://egyankosh.ac.in/bitstream/123456789/63367/1/Unit-12.pdf
3. MEA, *India and United Nations* brief — https://www.mea.gov.in/Portal/ForeignRelation/India_UN_2020.pdf
4. MEA, Foreign Secretary's statement at the UNSC high-level meeting — https://www.mea.gov.in/Speeches-Statements.htm?dtl/33851/Statement (page body did not render in the fetch; the two quotes used — 193 member states, India's eight Council terms — are from the search-indexed text of this same MEA page).
5. PIB PRID 2111473 (15 Mar 2025) — ILO 353rd Governing Body meeting, Geneva; DG Gilbert F. Houngbo — https://pib.gov.in/PressReleasePage.aspx?PRID=2111473
6. PIB PRID 1839891 (7 Jul 2022) — India elected to UNESCO ICH Committee; "UNESCO headquarters, Paris"; Durga Puja 2021 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1839891
7. PIB PRID 1526354 — UNESCO Executive Board: 58 seats, 4-year term; India 2017-21 with 162 votes; UNESCO HQ Paris — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1526354&reg=3&lang=2
8. PIB PRID 1626111 (2020) — WHO Executive Board: 34 members, 3-year terms; India (Dr Harsh Vardhan) Chair 2020-21 — https://pib.gov.in/PressReleasePage.aspx?PRID=1626111

Note: un.org is not an allowed publisher for this book and was not used. Several coaching/commercial pages surfaced in search (Testbook, Vajiram, etc.) were used only to locate official pages, never as claim sources.

## PYQ candidates

Found **9** real candidates; mapped all 9 in `pyq_map_ORG-01.json`; **3 taught**:

- From `db/gk/organisations.jsonl` (subtopic `un_system`): GK-ORG-001 (taught), GK-ORG-002, GK-ORG-003, GK-ORG-004 (partial/not taught — see gaps).
- From `db/pyq/*.json` (genuinely on this chapter's topic): WBCS-EXE-PRELIMS-2017-PRELIMS-Q59 (veto — taught), WBPSC-CLERKSHIP-PART-I-2023-SESSION-IV-Q85 (veto — taught), WBPSC-CLERKSHIP-PART-I-2023-SESSION-IV-Q96 (2025–26 non-permanent elections — not taught, time-bound), WBP-CONSTABLE-PRELIMS-2021-Q87 (India UNSC President Aug 2021 — not taught at that specificity), WBCS-EXE-PRELIMS-2018-PRELIMS-Q191 (FAO World Soil Day — observance-days book, not taught).
- Excluded as off-topic after inspection: WBCS 2016 Q39 (UNESCO Creative Cities), WBCS 2021 Q53 (WHO naming of SARS-CoV-2 — a virology fact, not the UN system), WBCS 2021 Q63 and 2024 Q148 (UNESCO World Heritage sites — art/culture), WBCS 2024 Q69 (2026 Hormuz veto news item).

## Subtopic coverage (un_system)

Taught with fetched quotes: founding dates and Charter; 193 members; UN HQ New York (MEA: 74th UNGA in New York + Gandhi Solar Park on the UN Headquarters roof); all six principal organs with composition (GA voting, SC 15/P-5, ECOSOC 54, ICJ The Hague + 15 judges/9 years, Trusteeship suspension 1994, Secretariat/SG appointment); veto rules; 1965 expansion; specialised-agency concept; ILO (1919 Versailles, specialised agency 1946, tripartite, Governing Body in Geneva, DG Houngbo); UNESCO (HQ Paris, Executive Board 58/4-year, ICH Committee 24, India's elections, Durga Puja 2021 as the Bengal connection); WHO (Executive Board 34/3-year, India's Chair 2020-21, founding health-right principle); early unions ITU 1865 / UPU 1874; programmes & funds (UNICEF/UNDP/UNHCR/WFP/UNEP by function and India's contributor status); Nobel facts (UNICEF 1965, UNHCR twice, peacekeeping forces 1988); India (founding member, peacekeeping scale, eight Council terms, G-4, Yoga Day); current heads as of 19 November 2026 for the two office-holders named in the fetched sources (UNSG António Guterres — NCERT; ILO DG Gilbert F. Houngbo — PIB Mar 2025), with the dated exam_note the task requires.

## Gaps (disclosed, never filled from memory)

1. **Headquarters + founding years for FAO (Rome 1945), WFP (Rome 1961), UNICEF (New York 1946), UNDP (New York 1965), UNHCR (Geneva 1950), IAEA (Vienna 1957), UNIDO (Vienna 1966), UNEP (Nairobi 1972), ICAO (Montreal), IMO (London), WMO (Geneva 1950), WIPO (Geneva)** — these standard exam facts appear in the project's own GK pack (GK-ORG-002..004) but in **none** of the NCERT/IGNOU/MEA/PIB pages actually fetched, so under the no-fact-without-a-fetched-quote rule they are **not asserted** in the chapter text or questions. The chapter carries an explicit exam_note disclosing this. A later pass with an IGNOU/e-PG Pathshala unit that lists agency headquarters, or PIB/MEA agency briefs, could close this gap.
2. **WHO headquarters (Geneva), founding (7 April 1948) and DG (Tedros Adhanom Ghebreyesus)** — the fetched PIB WHO release covers only the Executive Board and India's chairmanship; WHO HQ/year/head are therefore not claimed.
3. **UNESCO founding year (constitution 1945, in force 1946) and current DG** — fetched PIB releases give HQ Paris and board structure only; the DG changed in November 2025 and no fetched official page names the incumbent, so no UNESCO head is listed.
4. **ILO headquarters** — PIB verbatim supports "ILO's Governing Body meets in Geneva" and India's Permanent Mission in Geneva dealing with the ILO; the chapter phrases it exactly that way rather than asserting a separate HQ sentence.
5. **Current heads overall** — only Guterres and Houngbo are listed (each with source + access date 2026-11-19); the full heads table belongs to ORG-05 and needs its own dated verification pass.
6. NCERT chart quotes (c13–c18) come from the book's UN-System chart as extracted text; wording is the chart's, but the printed-page layout interleaves columns, so a blind-check pass should re-verify these six quotes against the PDF image before publication.
7. UNHCR's first Nobel year is quoted as printed in the IGNOU unit (1955); the unit's figure differs from the commonly cited 1954 — the chapter text flags this openly instead of silently correcting it.
