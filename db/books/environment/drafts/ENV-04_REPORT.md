# ENV-04 — জলবায়ু পরিবর্তন (Climate Change) — Draft Report

- **Chapter:** ENV-04, book `environment`, part `threats`, subtopic `climate_change` (title/part/subtopics verbatim from `db/books/environment/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ENV-04.json`, this report — in `~/workspace/edtech/bookwork/env-04/`

## Sources actually fetched (browser.open, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | NCERT Class XI Geography: India — Physical Environment, Chapter: Climate (Global Warming section, pp. 39–40; weather/climate definitions p. 28) | https://ncert.nic.in/textbook/pdf/kegy104.pdf |
| s2 | PIB (MoEFCC): India's National Action Plan on Climate Change (NAPCC) release | https://www.pib.gov.in/newsite/erelcontent.aspx?relid=41277&reg=48&lang=2 |
| s3 | PIB (MoEFCC): Paris Climate Agreement Comes into Force Today, 4 Nov 2016 | https://pib.gov.in/newsite/PrintRelease.aspx?relid=153285 |
| s4 | PIB (MoEFCC): India's Progress Towards Climate Resilience, 12 Jan 2025 | https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2092311 |
| s5 | PM India: Cabinet approves India's NDC (2031–2035) to be communicated to the UNFCCC | https://www.pmindia.gov.in/en/news_updates/cabinet-approves-indias-nationally-determined-contribution-2031-2035-to-be-communicated-to-the-united-nations-framework-convention-on-climate-change/?comment=disable |

All five URLs belong to publishers allowed for the environment book (NCERT, GOVT). One further fetch was attempted and failed on a network error: NCERT Class XII Biology `kebo116.pdf` (old Environmental Issues chapter) — not retried and not used; no claim rests on it.

## Counts

- **Claims:** 40 (c01–c40), every one with a verbatim quote from a fetched page above; every claim is used by at least one section/event/timeline/cause-effect/Bengal-connection/question (checked programmatically — unused: none).
- **Questions:** 42 — basic 12, moderate 15, difficult 9, exam 6; 7 per section across all 6 sections; exam formats: STATEMENT ×2, ASSERTION_REASON, PAIRS, CHRONOLOGY, MATCH.
- **Sections:** 6 — basic_concepts, greenhouse_effect, causes, impacts, global_response, india_response (each with quick/standard/deep + boxes).
- **Structure:** overview, events (5), people (empty — see gaps), timeline (6), terms (9), cause_effect (3), exam_focus (6), bengal_connection, quick_revision (12), sources (5), claims (40), questions (42).

## PYQ candidates

- **GK bank** (`db/gk/environment.jsonl`, subtopic `climate_change`): **1 found** — GK-ENV-007 (Paris Agreement). Mapped, taught.
- **PYQ corpus** (`db/pyq/*.json`, genuinely on this chapter's topic): **5 found** —
  - WBCS-EXE-PRELIMS-2016-PRELIMS-Q62 (Paris Agreement facts) — taught (Kyoto strand caveat in map note)
  - CLERKSHIP-PART-I-2019-AFTERNOON-Q31 (what does NOT cause global warming) — taught (deforestation option caveat in map note)
  - WBP-CONSTABLE-2021-Q64 (no atmosphere → extremely cold) — taught (concept; exact −18 °C figure not taught)
  - CLERKSHIP-PART-I-2019-FORENOON-Q40 (Greta Thunberg) — **not taught** (current-affairs person item, no fetched source)
  - CLERKSHIP-PART-I-2007-Q28 (Pachauri / IPCC) — **not taught** (no fetched allowed-publisher quote for IPCC/Pachauri)
- **Total: 6 candidates, 6 mapped, 4 taught.**
- Excluded after inspection: Clerkship 2023 Session-III Q96 (acid rain) — belongs to ENV-03 দূষণ (pollution), not this chapter; misc CO₂/solar-cooker items in WBCS files are general-science items, not climate-change questions.

## Subtopic coverage

`climate_change` is covered end-to-end within the sourced limits: concepts (weather vs climate) → greenhouse effect & gases → natural/human causes (incl. India's energy-sector share 75.66%) → impacts (sea level +48 cm, flooding, malaria, boundary/agriculture shifts, India's vulnerability) → global response (UNFCCC 1994, Paris 2015/2016, 2 °C/1.5 °C goals, NDC, CBDR-RC) → India's response (NAPCC 2008 + 8 missions, NDC 2015 → 2031–35 targets, net-zero 2070, coastal adaptation). Bengal connection is genuine and sourced: Ganga delta storm exposure (NCERT), ICZMP for West Bengal and MISHTI mangrove restoration funds including West Bengal (PIB).

## Gaps (disclosed, never filled from memory)

1. **Kyoto Protocol** (1997, binding Annex-I targets, entry into force 2005): no fetched quote from an allowed publisher was obtained in this run, so the chapter does **not** teach Kyoto facts. This affects one strand of WBCS-2016-Q62 (still answerable from the taught Paris facts) — flagged in the PYQ map.
2. **IPCC** (founding, role, Rajendra Pachauri's chairmanship): no fetched allowed-publisher quote obtained; not taught. Clerkship-2007-Q28 is mapped untaught for this reason. The `people` array is therefore empty — no person is asserted anywhere in the chapter.
3. **El Niño / ENSO and monsoon variability**: searched in the fetched NCERT chapter text; no usable passage was retrieved, so it is not taught.
4. **Updated NDC (2022) headline numbers (45% / 50%)**: the fetched PM-India page confirms the 2022 update happened and that its non-fossil target was met early (52.57% by Feb 2026), but does not quote the 45%/50% figures verbatim; the chapter therefore teaches the 2015 NDC targets and the 2031–35 targets (both verbatim-quoted) and mentions the 2022 update only through the quoted achievement figure.
5. **Ozone-layer / Montreal Protocol**: deliberately out of scope here (pollution/protection territory); no fetched source was used for it.
6. NCERT Class XII Biology `kebo116.pdf` could not be fetched (network error on the single attempt); the chapter is built on the Class XI Geography chapter plus official GoI pages instead.
