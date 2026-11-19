# ORG-02 — আর্থিক ও বাণিজ্য সংস্থা — Draft Report

Chapter: ORG-02, book `organisations`, part `world`, subtopic `financial_bodies`. Status DRAFT, verification UNVERIFIED.
Validator: `node scripts/validateBooks.js` → **OK** (45 claims, 42 questions, 6 sections, all claims used, all sections tested).

## Sources actually fetched (browser.open, 2026-11-19)

Allowed publishers for this book (validator profile): NCERT, GOVT (*.gov.in / *.nic.in), IGNOU, EPG. All 10 sources used are IGNOU or GOVT.

1. IGNOU, *International Financial Institutions*, Unit 12 — https://egyankosh.ac.in/bitstream/123456789/122470/1/Unit-12.pdf
2. IGNOU, *World Trade Organisation*, Unit 7 — https://egyankosh.ac.in/bitstream/123456789/122458/1/Unit-7.pdf
3. PIB (Ministry of Finance), World Bank Group President Ajay Banga launches PPP e-Course, PRID 1989683 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1989683&ui=2&tf=1&pli=1&reg=3&lang=2
4. PIB (Ministry of Finance), FM's bilateral meeting with Kristalina Georgieva, MD IMF, PRID 1817932 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1817932&ui=2&tf=1&pli=1&reg=3&lang=2
5. PIB (Ministry of Finance), 7th Annual Meeting of NDB Board of Governors ("About NDB"), PRID 1826746 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1826746&ui=2&tf=1&pli=1&reg=48&lang=2
6. PIB (Ministry of Finance), Joint India–NDB workshop (India founding member, 20% stake), PRID 1584048 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1584048&ui=2&tf=1&pli=1&reg=48&lang=2
7. PIB (Ministry of Finance), AIIB–GoI Andhra Pradesh Rural Roads loan (AIIB HQ Beijing, India 2nd shareholder / largest borrower), PRID 1566685 — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1566685&reg=3&lang=2
8. Akashvani News (newsonair.gov.in), Piyush Goyal meets WTO Director-General Ngozi Okonjo-Iweala, 29 Mar 2026 — https://newsonair.gov.in/union-minister-piyush-goyal-meets-dg-of-world-trade-organisation/
9. Department of Economic Affairs (dea.gov.in), Fund Bank and Asian Development Bank Division — https://dea.gov.in/index.php/our-organizations/fund-bank-asian-development-bank-division
10. PIB via commerce.gov.in, India Concludes Eighth Trade Policy Review at WTO in Geneva, 23 Jul 2026 — https://www.commerce.gov.in/files/d-m-y/1pib.pdf

Every claim (c01–c45) carries a verbatim quote from one of these fetched pages/PDFs. Note: two IGNOU quotes (c09, c41, c15) come from tables whose PDF text extraction is compressed; the quotes reproduce the extracted wording exactly.

## Counts

- Claims: **45** (all used; validator confirms none unused)
- Practice questions: **42** — basic 15, moderate 13, difficult 8, exam 6 (STATEMENT ×2, MATCH ×2, CHRONOLOGY ×1, PAIRS ×1, ASSERTION_REASON ×1 among exam/difficult formats); every one of the 6 sections has 6–8 questions.
- Sections: 6 — bretton_woods_imf, world_bank_group, wto_gatt, unctad_trade, regional_banks, india_and_heads.

## PYQ candidates

Found **10** real candidates: 4 GK-bank items with subtopic `financial_bodies` in `db/gk/organisations.jsonl` (GK-ORG-005, 006, 007, 008) and 6 genuine exam questions grepped from `db/pyq/*.json` (WBCS 2015 Q190, WBCS 2017 Q75, WBCS 2017 Q181, WBCS 2022 Q94, WBCS 2023 Q142, Clerkship 2019 Forenoon Q24). All 10 are mapped in `pyq_map_ORG-02.json`; **7 taught, 3 untaught** with specific reasons (AfDB element of GK-ORG-008; Kaushik Basu chief-economist item; World Development Report publisher item). False-positive grep hits (Suez Canal, NITI Aayog SDG index, East Kolkata Wetlands, Ease of Doing Business rank) were excluded as not on this chapter's topic.

## Subtopic coverage (financial_bodies)

- IMF: origin, HQ, functions (surveillance, Article IV), lending windows (SBA/EFF/PRGT), publications, MD title + current head. ✔
- World Bank Group: five institutions and roles, HQ, 1946 start, 189 owners, President + current head. ✔
- WTO/GATT: 1948→1995 line, HQ Geneva, structure (Ministerial Conference, General Council, Secretariat/DG), MFN/National Treatment, GATS/TRIPS scope, dispute settlement/Appellate Body, India's concerns (public stockholding, S&DT), current DG. ✔
- UNCTAD: 1964, Geneva secretariat, 195 members, advisor-not-regulator role, flagship reports. ✔
- Regional/new banks: ADB (Manila, 1966, charter 1965, first President, 69 members), AIIB (Beijing, Jan 2016, India 2nd shareholder/largest borrower), NDB (Shanghai, 2014/2015, India founding member 20%). ✔
- India links: DEA Fund Bank Division, FM as Governor (IMF & NDB), SARTTAC New Delhi, India's 8th WTO Trade Policy Review (Geneva, Jul 2026). ✔

## Gaps (disclosed, never filled from memory)

1. **Current heads of ADB, AIIB and NDB are NOT named in the chapter.** As of the access date, non-allowed sources indicate Masato Kanda (ADB, since Feb 2025), Zou Jiayi (AIIB, since Jan 2026) and Dilma Rousseff (NDB, re-elected 2025) — but no PIB/DEA/IGNOU/EPG page fetched states any of these, so per the hard rule they are omitted and the omission is flagged in the chapter's own exam_note box. A later pass with an allowed source (e.g. a PIB release naming them) can add them.
2. **AfDB (African Development Bank, Abidjan)** — in GK-bank item GK-ORG-008 but no allowed source fetched; not taught (see PYQ map).
3. **"India is a founding member of the IMF / World Bank / ADB"** — widely stated in the GK bank, but the fetched allowed sources support only India's Governor-level membership and founding membership of the NDB and GATT-era participation (23-country Geneva talks including India, 1947). The chapter therefore does not assert IMF/WB/ADB founding-member status.
4. **Founding years of the individual World Bank Group arms** (IFC 1956, IDA 1960, ICSID 1966, MIGA 1988) are not in the fetched IGNOU text; the chapter teaches the five institutions' names and roles only.
5. **BIS (Basel), OECD, WEF, EBRD** — not covered: no fetched allowed-publisher source; left for a possible ORG-06 mixed-practice pass if sources are fetched then.
6. **IMF member count / quota shares and WTO's exact establishment-day sourcing** rely on the IGNOU units as fetched (IMF exhibit table extraction was too garbled to quote a member count, so none is claimed; WTO 166 members is quoted from IGNOU Unit 7).
7. NCERT was not used: the Contemporary World Politics chapter PDF could not be located through the available search/fetch route in this run (the leps-series codes resolved to the companion volume); the chapter is IGNOU + GOVT sourced, which the validator profile permits.
8. Bengal connection is honestly indirect (no body is headquartered in Bengal); the section says so and rests on the SARTTAC claim plus the WBCS/Clerkship recurrence of this topic.
