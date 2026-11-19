# ENV-05 — আন্তর্জাতিক চুক্তি ও সম্মেলন — Draft Report

Chapter: ENV-05, book `environment`, part `protection`, subtopics `conventions` (verbatim from `db/books/environment/toc.js`).
Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19)

All URLs belong to publishers allowed for the environment book (NCERT / GOVT / IGNOU per `PROFILES.environment`).

1. NCERT, Biology Class XII, Ch. 13 Biodiversity and Conservation — https://ncert.nic.in/textbook/pdf/lebo113.pdf
2. NCERT, Contemporary World Politics Class XII, Ch. 6 Environment and Natural Resources — https://ncert.nic.in/textbook/pdf/leps106.pdf
3. IGNOU, Environmental Acts, Laws and Policies, Unit 1: International Environmental Policies, Agreements and Treaties — https://egyankosh.ac.in/bitstream/123456789/86560/1/Unit-1.pdf
4. PIB (MoEFCC), Cabinet approval for ratification of the Kigali Amendment, 18 Aug 2021 — https://www.pib.gov.in/pressreleasepage.aspx?prid=1746948
5. PIB Backgrounder (MoEFCC), World Wetlands Day / 75 Ramsar sites, 1 Feb 2023 — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2023/feb/doc202321156601.pdf
6. PIB (MoEFCC), Ramsar Sites: Up from 26 in 2014 to 75 in 2023 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1919921&reg=48&lang=2
7. Department of Chemicals and Petrochemicals (GoI), Minamata Convention page — https://chemicals.gov.in/minamata-convention
8. PIB (MoEFCC), CMS COP13 Gandhinagar, 17 Feb 2020 — https://pib.gov.in/PressReleasePage.aspx?PRID=1603392

## Counts

- Claims: **54** (c01–c54), every one with a verbatim quote from a fetched source above; every claim is used in the chapter (validator-enforced).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×2, MATCH ×2, CHRONOLOGY, ASSERTION_REASON, PAIRS); all 6 sections tested.
- Sections: 6 (conferences, wetlands_species, biodiversity, ozone, climate, chemicals_waste); timeline 15 entries; events 7; terms 10; cause_effect 2; people: empty array (no person is named in the fetched sources in a chapter-relevant role — kept as the honest equivalent for a non-dated book).

## PYQ candidates

- GK bank (`db/gk/environment.jsonl`, subtopic `conventions`): **5** — GK-ENV-008, 009, 010, 011, 012.
- PYQ corpus (`db/pyq/*.json`), genuinely on this chapter's topic: **7** — WBCS 2016 Q62 (Paris Agreement), WBCS 2017 Q63 (Ozone Day), WBCS 2019 Q26 (East Kolkata Wetlands/Ramsar), WBCS 2021 Q68 (Sundarban Ramsar year), WBCS 2024 Q81 (East Kolkata Wetlands/Ramsar), WBCS 2022 Q142 (CFC in refrigerator), WBPSC Clerkship 2023 Session II Q53 (ozone layer/UV).
- Total candidates: **12**; mapped: 12; **taught: 9**; untaught: 3 (GK-ENV-011, WBCS-2016-Q62, WBCS-2021-Q68), each with the specific source-gap reason in `pyq_map_ENV-05.json`.
- Excluded after inspection: Clerkship 2023 Session III Q96 (acid rain — a pollution question, ENV-03's topic, not conventions) and WBCS 2023 Q on the word "biodiversity" (ENV-02's topic).

## Subtopic coverage

`conventions` is covered across all six sections: conferences (Stockholm/Rio/Johannesburg, Agenda 21, sustainable development, CBDR), wetlands & species treaties (Ramsar, CITES, CMS), CBD + Cartagena, ozone chain (Vienna → Montreal → Kigali), climate chain (UNFCCC → Kyoto → Paris), chemicals & waste (Basel, Rotterdam, Stockholm POPs, Minamata).

## Gaps (disclosed, never filled from memory)

1. **Paris Agreement substance** — the below-2 °C target, COP21 (Paris, Dec 2015) adoption and the 196-party figure appear in no fetched allowed source; NCERT Pol. Science gives only India's ratification (2 Oct 2016). The chapter therefore teaches Paris only at that depth, and WBCS-2016-Q62 is marked untaught.
2. **CMS signing (Bonn, 1979)** — the GK bank's own sources are cms.int (not an allowed publisher here); PIB confirms CMS's role and COP13 but not Bonn/1979. Not asserted; GK-ENV-011 untaught.
3. **Ramsar designation years for West Bengal sites** — East Kolkata Wetlands (2002) and Sundarban Wetland (2019) are not dated in the fetched PIB texts (PIB confirms EKW's listing and Sundarbans as largest site, 0.42 M ha). Years not asserted; WBCS-2021-Q68 untaught.
4. **Rotterdam Convention adoption year** — the IGNOU unit's text is internally unreliable on this point (it prints 1988); the chapter teaches the PIC mechanism only, with no year claimed.
5. **UNCCD, Nagoya Protocol, World Environment Day (5 June), Ramsar Montreux Record, CITES Appendices I–III detail, India's CITES party year (1976)** — none supported by a fetched allowed source, so all are omitted rather than written from memory.
6. One attempted NCERT fetch (lebo116, old Environmental Issues chapter) failed with a network error and was not retried; the chapter does not depend on it.
