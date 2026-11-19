# STG-07 — আন্তর্জাতিক সংস্থা (সারসংক্ষেপ) — Draft Report

- Book: static_gk · Code: STG-07 · Number: 7 · Part: `links` (per `db/books/static_gk/toc.js` — the task brief's "world" does not exist in the TOC/validator profile; TOC title, part and subtopic used verbatim) · Subtopic: `international_orgs`
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/stg-07/chapter.json` → **OK**
- This is a summary chapter by design: it teaches a compact overview and explicitly points students to the dedicated Organisations book (full headquarters/founding-year/head lists) and the Important Days book.

## Sources actually fetched (browser.open)

1. NCERT, *Contemporary World Politics*, Class XII, Ch. 6: International Organisations — https://ncert.nic.in/textbook/pdf/leps106.pdf (read via the NCERT text of the same chapter)
2. NCERT, *Contemporary World Politics*, Class XII, Ch. 4: Alternative Centres of Power — https://ncert.nic.in/textbook/pdf/leps104.pdf
3. NCERT, *Contemporary World Politics*, Class XII, Ch. 5: Contemporary South Asia — https://ncert.nic.in/textbook/pdf/leps105.pdf
4. Ministry of External Affairs (Govt of India), *India and United Nations* — https://www.mea.gov.in/Portal/ForeignRelation/India_UN_2020.pdf
5. PIB (Govt of India), *Twelfth WTO Ministerial Conference all set to begin from 12th June 2022 in Geneva* — https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1833118&reg=3&lang=2
6. Ministry of External Affairs (Govt of India), *ASEAN-India Eminent Persons' Report to the Leaders* — https://www.mea.gov.in/Uploads/PublicationDocs/20831_ASEAN-India_Eminent_Persons__Report_to_the_Leaders.pdf

All six URLs belong to the validator's allowed publishers for `static_gk` (NCERT + GOVT). One fetch failed and was not retried per tool guidance: the MEA BIMSTEC brief PDF (fsi.mea.gov.in) — the resulting gap is disclosed below.

## Counts

- Claims: **42** (every claim carries a verbatim quote from a fetched source above; all 42 are used in the chapter)
- Practice questions: **42** — basic 15, moderate 13, difficult 8, exam 6; formats DIRECT, STATEMENT, MATCH, CHRONOLOGY, PAIRS, ASSERTION_REASON; all 6 sections tested (7/7/7/7/9/5)
- Sections: 6 — un_founding, un_organs, un_agencies_finance, trade_wto, regional, india_un

## PYQ candidates

- Source (1): `db/gk/static_gk.jsonl`, subtopic `international_orgs` → 3 bank items: GK-SGK-009, GK-SGK-010, GK-SGK-011.
- Source (2): `db/pyq/*.json` grep for genuinely on-topic exam questions → 13 further real items (WBCS Prelims 2015–2024; WBPSC Clerkship 2019, 2023).
- Total candidates mapped in `pyq_map_STG-07.json`: **16** · Taught: **3** (GK-SGK-009 UN Day; WBCS-2022-Q94 WTO's earlier framework GATT; Clerkship-2019-FN-Q12 SAARC non-member) · Not taught: **13**, each with a specific reason in the map.

## Subtopic coverage

Covered from fetched official sources: UN founding/Charter/UN Day; principal organs (GA voting, UNSC composition + P5 + veto, ICJ at The Hague, Secretary-General, Human Rights Council 2005); specialised agencies by function (WHO, UNESCO, UNICEF, UNHCR, UNDP); IMF role and unequal voting; World Bank creation (1944) and loans/grants role; WTO–GATT continuity with India's dates (GATT 8 July 1948, WTO founding member 1 January 1995), MC12 Geneva, G-33; SAARC (Charter Dhaka 1985, Afghanistan 2007, SAFTA 2004), ASEAN (8 August 1967, members, Secretariat Jakarta), EU (OEEC 1948, Council of Europe 1949, Maastricht 1992, euro 2002), NATO named as a US-created collective security structure; India at the UN (founding member, peacekeeping figures as published by MEA, all-women FPU Liberia 2007, seven UNSC terms as listed by MEA, 22 UN bodies, G-4).

## Gaps (disclosed, never filled from memory)

- Headquarters/founding years not present in the fetched NCERT/MEA/PIB sources are **not taught**: WHO headquarters + 1948 founding year (GK-SGK-010), UNESCO Constitution adoption date 16 Nov 1945 (part of GK-SGK-011), World Bank headquarters (WBCS-2017-Q75), UN Human Rights Council headquarters (Clerkship-2019-Q25), IUCN headquarters (Clerkship-2023-Q47).
- BIMSTEC headquarters (WBCS-2023-Q48): the MEA BIMSTEC brief PDF fetch failed in this run and was not retried; the fact is absent from the other fetched sources.
- NATO founding year (Clerkship-2023-Q33): NCERT leps104 names NATO but gives no year in the fetched pages.
- WTO Appellate Body location (WBCS-2023-Q142) and BRICS full form/member count (WBCS-2024-Q131, also time-sensitive after the 2024 expansion): not in the fetched sources.
- Dated/current-affairs items (World Bank Chief Economist 2012, UNESCO Creative Cities, Ease of Doing Business rank, FAO day) are outside a static summary chapter's scope and are marked untaught with reasons.
- All of the above are the core content of the dedicated Organisations / Important Days books, to which the chapter's final section explicitly directs students.
