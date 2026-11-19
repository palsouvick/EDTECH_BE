# DAY-01 জানুয়ারির দিবস — Draft Report

Date: 2026-11-19 · Status: DRAFT / UNVERIFIED · Validator: `chapter.json: OK`

## Deliverables
- `chapter.json` — 6 sections, 30 claims, 10 sources, 42 questions (basic 12, moderate 15, difficult 9, exam 6; formats DIRECT, STATEMENT, PAIRS, CHRONOLOGY, ASSERTION_REASON).
- `pyq_map_DAY-01.json` — 5 candidates mapped, 2 taught.

## Sources actually fetched (browser.open, all GOVT publishers per PROFILES.important_days)
1. Pravasi Bharatiya Divas — PIB Backgrounder (Ministry of External Affairs), 12 Jan 2023 — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2023/jan/doc2023112151701.pdf
2. PM to interact with young leaders / National Youth Day (Viksit Bharat Young Leaders Dialogue 2026), PIB PRID 2213133 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2213133&reg=3&lang=2
3. Indian Army celebrated its 73rd Army Day, PIB PRID 1688778 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1688778&reg=48&lang=2
4. Government announces 23rd January to be celebrated as "PARAKRAM DIWAS" every year, PIB PRID 1690007 — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1690007&reg=3&lang=2
5. Nation Celebrates National Girl Child Day, PIB PRID 1792050 — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1792050&reg=3&lang=2
6. 13th National Voters' Day (theme 'Nothing Like Voting, I Vote for Sure'), PIB PRID 1893268 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1893268&reg=48&lang=2
7. Tourism Ministry Organizes webinar to Mark The National Tourism Day, PIB PRID 1792585 — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1792585&reg=3&lang=2
8. Constitution Day — Factsheet, PIB Factsheet ID 148584 — https://www.pib.gov.in/FactsheetDetails.aspx?Id=148584
9. PM pays homage to Mahatma Gandhi and all the Martyrs, on Martyrs' Day — PM India, 30 Jan 2016 — https://www.pmindia.gov.in/en/news_updates/pm-pays-homage-to-mahatma-gandhi-and-all-the-martyrs-who-gave-their-lives-for-the-nation-on-martyrs-day/
10. PM pays homage to Mahatma Gandhi on his death anniversary at Rajghat, PIB PRID 2097579 (30 Jan 2025) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2097579&reg=48&lang=2

## Coverage (subtopic: january)
All eight January dates in the GK bank card GK-DAY-001 are taught with date + reason: 9 Jan Pravasi Bharatiya Divas (Gandhi's return, 1915), 12 Jan National Youth Day (Vivekananda), 15 Jan Army Day (Cariappa, 1949), 23 Jan Parakram Diwas (Netaji), 24 Jan National Girl Child Day (MWCD, 2008), 25 Jan National Voters' Day (ECI foundation, 1950; since 2011) + National Tourism Day, 26 Jan Republic Day (Constitution in force, 1950), 30 Jan Martyrs' Day (Gandhi's Punya Tithi). Extra claim-backed January material woven in: BBBP launch (22 Jan 2015, Panipat), Constitution signing + first President announcement (24 Jan 1950), Constitution Day contrast (26 Nov), year-labelled themes only (Voters' Day 2023, Tourism Day 2022).

## PYQ candidates
Found 5, mapped 5, taught 2:
- GK-DAY-001 (GK bank, subtopic january) — taught.
- WBPSC-CLERKSHIP-PART-I-2006-Q19 (Constitution in force) — taught (republic_day).
- WBPSC-CLERKSHIP-PART-I-2019-FORENOON-Q4 (year of Gandhi's assassination) — NOT taught: year 1948 not printed in any fetched official page (see Gaps).
- WBPSC-CLERKSHIP-PART-I-2007-Q27 (Republic Day 2008 chief guest) — NOT taught: year-specific current-affairs item, out of this chapter's permanent-date scope.
- WBCS-EXE-PRELIMS-2021-PRELIMS-Q101 (Republic Day 2021 chief guest) — NOT taught: same reason.
No other January-days questions were found in db/pyq/*.json (a Republic Day / voters / youth / army / pravasi / parakram / girl-child / martyrs grep returned only the items above plus unrelated SVEEP and arithmetic items).

## Gaps (disclosed, never filled from memory)
1. **Martyrs' Day — the year 1948 and the assassin's name** are not taught. The fetched PIB/PMO pages establish 30 January as Gandhi's Punya Tithi / death anniversary, observed as Martyrs' Day with Rajghat homage and a two-minute silence at 11 AM, but do not print the year 1948 or Nathuram Godse's name. The chapter text says this openly in the martyrs_day section. Consequence: Clerkship 2019 Q4 (which asks the year) is mapped taught=false.
2. **National Youth Day — the 1984 declaration / 1985 first observance** are not taught. The NYKS (nic.in) guidelines PDF that states them could not be fetched (browser.open failed on that URL and it was not retried); the fetched PIB release establishes only the date (12 January) and the person (Vivekananda's birth anniversary).
3. **Other January observances not covered** (no fetched official source obtained in this run, so excluded rather than filled from memory): World Braille Day (4 Jan), World Hindi Day (10 Jan), Armed Forces Veterans Day (14 Jan), National Startup Day (16 Jan). The chapter sticks to the GK-DAY-001 core list plus claim-backed extras.
4. Annual themes are included only with their year written explicitly (Voters' Day theme = 2023, Tourism Day theme = 2022), per the book rule; no theme is presented as permanent.
5. PIB's Army Day release spells the name "K M Carriappa"; the claim quote is reproduced verbatim, while the chapter prose uses the standard Bengali transliteration কারিয়াপ্পা.
