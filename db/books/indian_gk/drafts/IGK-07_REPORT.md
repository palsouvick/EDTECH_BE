# IGK-07 — বিবিধ: ভারত এক নজরে (ভারত এক নজরে) — Draft Report

Chapter: IGK-07, book `indian_gk`, part `institutions`, subtopic `misc` (TOC title used verbatim: "বিবিধ: ভারত এক নজরে").
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19) — all GOVT publishers per PROFILES.indian_gk

1. **India Profile** (National Portal of India profile, carried on the Embassy of India, Bucharest website) — https://www.eoibucharest.gov.in/page/profile/
2. **Union Minister Dr Jitendra Singh unveils the theme for National Science Day 2023** (PIB, PRID 1889763) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1889763
3. **PM Extends Greetings on National Sports Day, Pays Tribute to Major Dhyan Chand** (PIB, PRID 2161734) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2161734
4. **On the occasion of National Youth Day, PM to participate in the Viksit Bharat Young Leaders Dialogue 2025 on 12th January** (PIB, PRID 2091968) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2091968
5. **President of India to confer National Teachers' Award 2023 to 75 selected teachers on 5th September 2023** (PIB, PRID 1954262) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1954262
6. **14th National Voters' Day (NVD) to be celebrated on 25th January 2024** (PIB, PRID 1999141) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1999141
7. **26th November to be observed as 'Constitution Day'** (PIB, relid 131806) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=131806
8. **Observance of the Rashtriya Ekta Diwas on 31st October** (PIB, relid 110785) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=110785
9. **Armed Forces Flag Day - 2018** (PIB, relid 186065) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=186065

Note: knowindia.india.gov.in could not be resolved to a fetchable profile URL from search results in this run; the same National Portal "India Profile" content was fetched from the official Embassy of India (gov.in) mirror above instead.

## Counts

- **Claims: 43** (c01–c43), every one with a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- **Practice questions: 44** (basic 13, moderate 16, difficult 9, exam 6 — STATEMENT ×3, MATCH ×1, PAIRS ×2), spread across all 6 sections, each referencing its supporting claim ids.
- Sections: 6 — desh_ek_nojore, jonosankhya_bhasha, rashtra_kathamo, dibos_bigyan_khela, dibos_jubo_shikkhok, dibos_gonotontro. Plus events (3), people (6), timeline (7 entries, 1928–2011), terms (7), cause_effect (2), exam_focus (8), bengal_connection, quick_revision (14 points).

## PYQ candidates

- **Found: 11** — 8 GK bank items with subtopic `misc` in `db/gk/indian_gk.jsonl` (GK-IGK-113 … GK-IGK-120, all national-days items) + 3 real exam items found by grepping `db/pyq/*.json` (WBCS Prelims 2022 Q174; WBPSC Clerkship 2006 Q19; WBPSC Clerkship 2005 Q54).
- **Mapped: 11/11** in `pyq_map_IGK-07.json`.
- **Taught: 10/11.** Untaught: WBPSC-CLERKSHIP-PART-I-2005-Q54 ("Wizard of Hockey") — the chapter teaches that Sports Day honours Dhyan Chand, but the epithet itself appears in no fetched allowed-publisher page; reason recorded in the map.

## Subtopic coverage

The `misc` subtopic's entire bank (8 items) is national-days material, and the chapter covers all of it, framed as "ভারত এক নজরে": (a) country-at-a-glance facts from the official India Profile (area, rank, extents, frontiers, coastline, time zone, country code, neighbours); (b) Census 2011 headline figures (population, sex ratio, literacy, growth rate) and the 22 recognised languages / Hindi official language / Article 343(3); (c) state structure (President vs PM, Parliament, Supreme Court, the profile's three National Days, flag description in brief — depth stays in IGK-01); (d) the eight observance days behind the bank items, each with date, person/event, and start year where the source gives one.

## Gaps (disclosed, never filled from memory)

1. **States/UT count not taught.** The fetched India Profile is an older edition (says "28 States and 7 Union Territories"; religion figures are from Census 2001). The current count is not asserted anywhere in the chapter; an exam_note in section `desh_ek_nojore` tells students the page is outdated and points them to IGK-03 / IGK-04 for the current lists. Religion break-up likewise omitted.
2. **Coastline figure:** the profile's prose says 7,516 km while its own Geography table says 7,517 km; the chapter teaches the prose figure (7,516 km, claim c05) and the table variant is not used.
3. **Area figure:** the profile gives 3,287,590 sq km; the frequently quoted 3,287,263 sq km figure appears in no fetched page and is not used.
4. **"Wizard of Hockey"** epithet untaught (see PYQ map) — no allowed-publisher source fetched states it.
5. **Vivekananda's birth year/place** (1863, Calcutta) and the **Raman–IACS Calcutta** link appear in the GK bank's explanations but in none of the fetched PIB/profile pages, so they are not asserted; the Bengal connection instead rests on two fetched facts — Bangladesh lying east of West Bengal (c08) and West Bengal's National Teachers' Award 2023 awardees (c31, c43).
6. **Ekta Diwas start year:** the fetched PIB release (relid 110785) announces the decision without the chapter asserting a start year beyond the release itself; no year is taught for its first observance.
7. Know India (knowindia.india.gov.in) profile page itself was not fetched (no fetchable URL surfaced); the identical National Portal profile was used via the Embassy of India gov.in site.
