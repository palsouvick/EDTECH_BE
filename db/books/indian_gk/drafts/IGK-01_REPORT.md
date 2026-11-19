# IGK-01 — জাতীয় প্রতীক — Draft Report

Chapter: IGK-01, book `indian_gk`, part `symbols_firsts` (per toc.js + validator profile;
the task brief said "part: identity", but the registered part code in both the TOC and
`PROFILES.indian_gk` is `symbols_firsts`, which was used), subtopic `national_symbols`.
Status: DRAFT, verification UNVERIFIED. Validator: `chapter.json: OK`.

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to the validator's allowed publishers for this book (GOVT / NCERT):

1. Information on India — Embassy of India, Ashgabat (MEA, GoI) — https://www.eoiashgabat.gov.in/info-on-india.php — the Know India national-identity text republished on an official MEA site: flag, emblem, anthem, song, calendar, animal, bird, flower.
2. 150 Years of Vande Mataram — PIB backgrounder (PRID 2186984) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186984
3. Gangetic dolphin conservation — PIB (PRID 1946399) — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1946399
4. Dolphin declared National Aquatic Animal — PIB (Release ID 55824, 2009) — https://www.pib.gov.in/newsite/erelcontent.aspx?relid=55824&reg=48&lang=2
5. Making of the Constitution e-Photo Exhibition — PIB (PRID 1749614) — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1749614&reg=3&lang=2
6. Constitution Day factsheet — PIB (Factsheet ID 148584) — https://www.pib.gov.in/factsheetdetails.aspx?id=148584&reg=3&lang=1
7. FAQ on the Indian National Flag / Flag Code — PIB (PRID 1845264) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1845264&reg=3&lang=2
8. Prevention of Insults to National Honour Act, 1971 — MHA — https://www.mha.gov.in/sites/default/files/Prevention_Insults_National_Honour_Act1971_1.pdf
9. State Emblem of India (Prohibition of Improper Use) Act, 2005, Gazette copy — Dept. of Parliamentary Affairs, Govt. of Karnataka — https://dpal.karnataka.gov.in/storage/pdf-files/Act%2050%20of%202005.pdf
10. Ganga — A National River — NMCG, Ministry of Jal Shakti — https://nmcg.nic.in/ganga_basin.aspx
11. National Flag Day / IS 1-1968 — PIB, Bureau of Indian Standards (PRID 2035406) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035406&reg=48&lang=2

Also fetched but used only as navigation/confirmation: india.gov.in National Identity page
(https://www.india.gov.in/explore-india/facts-of-india/national-identity — extraction returned
navigation only, so no claim quotes were taken from it).

## Counts

- Claims: 38 (c01–c38), every one with a verbatim quote from a fetched page above; all 38 are used in the chapter (validator confirms no unused claims).
- Practice questions: 43 (basic 16, moderate 16, difficult 6, exam 5; formats: DIRECT 37, STATEMENT 2, PAIRS 1, ASSERTION_REASON 1, MATCH 1, CHRONOLOGY 1), spread over all 6 sections (flag 8, emblem 8, anthem_song 10, calendar 6, nature_symbols 7, laws_protection 4).
- Sections: 6, each with quick/standard; deep present on 5 (laws_protection deep = null).

## PYQ candidates

- From the GK bank (`db/gk/indian_gk.jsonl`, subtopic `national_symbols`): 20 items — GK-IGK-001…008 and GK-IGK-101…112. Mapped: 20. Taught: 19. Untaught: GK-IGK-104 (Radhakrishnan's interpretation of the flag's colours — only in the MHA Flag Code PDF, which returned 404 from this machine; reason recorded in the map and in the flag section's deep text). Two taught items are partial (GK-IGK-102 standard-size table and GK-IGK-105 three-part division not in the fetched texts) — noted in the map.
- From the PYQ corpus (`db/pyq/*.json`): 6 genuinely on-topic items found. Taught: WBCS-EXE-PRELIMS-2019-PRELIMS-Q182 (Vande Mataram 1896) and WBPSC-CLERKSHIP-2006-Q33 (composer of Vande Mataram). Untaught, each with a specific reason in the map: WBCS-EXE-PRELIMS-2017-PRELIMS-Q60 (cinema-hall Anthem order), WBCS-EXE-PRELIMS-2021-PRELIMS-Q160 (first flag designer), WBPSC-MISC-PRELIMS-2023-Q37 (two countries' anthems), WBPSC-CLERKSHIP-2006-Q30 (Saka Era epoch year 78 AD).
- Total: 26 candidates, 21 taught, 5 untaught.

## Subtopic coverage

`national_symbols` covered end-to-end: flag (design, chakra, ratio, adoption, standard),
State Emblem (design, adoption, motto, 2005 Act), National Anthem (author, adoption,
52s/20s versions), National Song (author, publication, Anandamath, 1896 singing, 1905
slogan, equal status), National Calendar (Saka Era, Chaitra, 1957 adoption, leap-year
rule, official uses), nature symbols (tiger + Project Tiger, peacock, lotus, Ganga,
Gangetic dolphin), and the legal layer (Flag Code 2002, Insults Act 1971, Emblem Act 2005).

## Gaps (disclosed, never filled from memory)

1. Know India (knowindia.india.gov.in) could not be fetched from this machine (fetcher resolution failure). Its national-identity text was used via the MEA's official republication on eoiashgabat.gov.in instead; india.gov.in's own page extraction returned navigation only.
2. Radhakrishnan's interpretation of the flag's colours/wheel (GK-IGK-104) untaught — the MHA Flag Code PDF 404'd at both known URLs; no other fetched official page carries the text.
3. Saka Era epoch year (78 AD, Clerkship 2006 Q30) untaught — not stated in the fetched calendar text.
4. Flag standard sizes: only the BIS "nine sizes" fact is taught; the size table (aircraft/car/table flags) from the Flag Code PDF is untaught (same 404 problem).
5. Project Tiger reserve count: the official page's "27 tiger reserves" figure is outdated and was deliberately not taught (disclosed in the nature_symbols deep text and in q35's explanation).
6. National Flower formal-notification nuance: the MEA/Know India text states the lotus is the National Flower and the chapter teaches exactly that; the GK bank's verification note records that a 2019 Rajya Sabha reply reportedly said no flower has been formally notified — the official reply text itself was not fetched, so the chapter does not assert either way beyond the portal text.
7. National River (Ganga) sourcing is a page title/heading on the NMCG site ("Ganga-A National River"), thinner than the narrative sourcing for the other symbols.
8. The 2026 MHA protocol on Vande Mataram rendering (six-stanza official version) appeared in news reports found during searching but no official order text was fetched, so it is not taught.
