# ENV-06 — সংরক্ষিত এলাকা ও পরিবেশ আইন (Protected Areas & Environment Laws) — Draft Report

- **Chapter:** ENV-06, book `environment`, part `protection`, subtopic `protected_areas` (title/part/subtopics verbatim from `db/books/environment/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/env-06/chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ENV-06.json`, this report — in `~/workspace/edtech/bookwork/env-06/`

## Sources actually fetched (browser.open, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | Forest and Wildlife Resources (Ch. 2), Contemporary India II, Class X (NCERT) | https://ncert.nic.in/textbook/pdf/jess102.pdf |
| s2 | Biodiversity and Conservation (Ch. 13), Biology, Class XII (NCERT) | https://ncert.nic.in/textbook/pdf/lebo113.pdf |
| s3 | PIB Backgrounder: Environmental Acts (MoEF) | https://www.pib.gov.in/newsite/erelcontent.aspx?relid=51884&reg=3&lang=2 |
| s4 | National Wildlife Database Cell, Wildlife Institute of India — About Us | https://v1.wii.gov.in/nwdc_aboutus |
| s5 | MoEFCC: Biosphere Reserve Division website note (Dec 2023) | https://moef.gov.in/uploads/pdf/Approved%20copy%20of%20Website%20note%20of%20BR.pdf |
| s6 | PIB: Ramsar Sites in India (25 Oct 2026) | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/oct/doc_10255_20261025_09460901.pdf |

All six URLs belong to publishers allowed for the environment book (NCERT, GOVT).

## Counts

- **Claims:** 55 (c01–c55), every one with a verbatim quote from a fetched page above; every claim is used by at least one section/event/timeline/cause-effect/Bengal-connection/question (checked programmatically — unused: none).
- **Questions:** 42 — basic 12, moderate 18, difficult 6, exam 6; 7 per section across all 6 sections; exam formats: STATEMENT ×2, PAIRS, MATCH, ASSERTION_REASON, CHRONOLOGY.
- **Sections:** 6 — pa_network, in_situ_ex_situ, tiger_projects, biosphere_ramsar, wildlife_forest_laws, env_laws_community (each with quick/standard/deep + boxes).
- **Structure:** overview, events (5), people (empty — see gaps), timeline (13), terms (11), cause_effect (3), exam_focus (6), bengal_connection, quick_revision (13), sources (6), claims (55), questions (42).

## PYQ candidates

- **GK bank** (`db/gk/environment.jsonl`, subtopic `protected_areas`): **1 found** — GK-ENV-013 (Project Tiger, 1973). Mapped, taught.
- **PYQ corpus** (`db/pyq/*.json`, genuinely on this chapter's topic): **17 found** — taught: WBCS-2019-Q26 (East Kolkata Wetlands/Ramsar), WBCS-2021-Q68 (Sundarban Ramsar 2019), WBCS-2022-Q129 (Sariska, Rajasthan), WBCS-2023-Q156 (Reserved Forests), WBCS-2024-Q81 (East Kolkata Wetland/Ramsar). Not taught (11), each with a specific reason in the map: WBCS-2016-Q41 (Singalila district), WBCS-2019-Q35 (Sundarban WHS reason), WBCS-2019-Q168 + Clerkship-2023-S4-Q61 (Vansda), WBCS-2024-Q155 (Jaldapara), WBCS-2024-Q188 (only Manas strand sourced), WBP-2021-Q21 (Buxa district), Clerkship-2023-S1-Q33 (Rajaji Raghati BR), Clerkship-2023-S1-Q80 (Bhitarkanika), Clerkship-2023-S4-Q51 (Gandhi Sagar), Misc-2023-Q14 (largest tiger reserve), Misc-2023-Q50 (first national park).
- **Total: 18 candidates, 18 mapped, 6 taught.**
- Excluded after inspection: WBCS-2024-Q71 (mangrove carbon storage — ENV-04 climate territory), WBCS-2024-Q148 (UNESCO WHS identification incl. Kaziranga — heritage-list item, not protected-area law/network), WBCS-2016-Q194 / 2018-Q53 etc. matched only on incidental keywords (Buxar, highest peak).

## Subtopic coverage

`protected_areas` is covered end-to-end within the sourced limits: PA network types and current official counts (WII 2023) → forest classification (reserved/protected/unclassed) → in-situ vs ex-situ, hotspots, sacred groves → Project Tiger and species projects → biosphere reserves (18, MoEFCC) and Ramsar wetlands (103, PIB 2026) with both West Bengal sites → Wildlife Protection Act 1972 and Forest Conservation Act 1980 → umbrella EPA 1986, Water/Air Acts, Biodiversity Act 2002, Wetlands Rules 2017, and community conservation (Chipko, Sariska, Bhairodev Dakav Sonchuri, JFM). Bengal connection is genuine and sourced: Sunderbans NP in NCERT's tiger-reserve list, Sundarban Wetland as India's largest Ramsar site, East Kolkata Wetlands' wastewater-fisheries, Sundarban BR in the MoEFCC list.

## Gaps (disclosed, never filled from memory)

1. **Individual park/sanctuary locations beyond the NCERT tiger-reserve list** (Singalila district, Jaldapara, Buxa district, Bhitarkanika, Vansda, Gandhi Sagar): no fetched allowed-publisher source gives these, so they are not taught and 7 PYQ items are mapped untaught for exactly this reason. A WII state-wise PA list fetch would close most of this gap in a later pass.
2. **"First national park" (Corbett, 1936) and Sundarban UNESCO World Heritage inscription (1987)**: widely known, but no fetched quote in this run states them; not asserted anywhere in the chapter (Misc-2023-Q50 and WBCS-2019-Q35 mapped untaught/partial accordingly).
3. **Changing counts taught with dates, not as timeless facts:** NCERT Biology's 14/90/448 figures are explicitly labelled textbook-era; current figures are cited with their source dates (WII updated 27 Nov 2023; MoEFCC Dec 2023; PIB Ramsar backgrounder 25 Oct 2026, 103 sites). Students are warned in an exam_note box not to mix the two.
4. **Wildlife Protection Act schedules, NTCA (2006 amendment) and the 2022 amendment:** the fetched PIB backgrounder does not cover schedules or amendments, so they are not taught. The `people` array is empty for the same reason — no person is asserted anywhere in the chapter.
5. **Biosphere-reserve zonation detail (core/buffer/transition names and areas per reserve):** only the buffer/transition livelihood principle is quoted from the MoEFCC note (c46); the full per-reserve table in s5 is extraction-fragmented, so individual reserve years/areas (other than the aggregate 18 / 91,425.11 sq km) are not asserted.
6. **Verbatim-quote note:** claim c36's quote reproduces the PIB backgrounder's own wording exactly, including its typographical error ("sued" for "use") in the fetched text; the claim text itself is written correctly.
