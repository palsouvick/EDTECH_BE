# SAF-01 — কারখানা নিরাপত্তা ও আইন — Draft Report

- **Book / chapter:** industrial_safety, SAF-01 (part: workplace, subtopics: factory_safety)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_SAF-01.json`, this report — in `~/workspace/edtech/bookwork/saf-01/`

## Sources actually fetched (browser.open, 2026-11-19)

All three URLs belong to publishers allowed for this book in `PROFILES.industrial_safety` (GOVT = *.gov.in / *.nic.in):

1. **s1 — The Factories Act, 1948 (Act 63 of 1948), full bare text**, hosted by the Directorate of Factories & Boilers, Government of Odisha — https://dfb.odisha.gov.in/sites/default/files/2022-04/act.pdf (4,149 extracted lines read in full for Chapters I–X)
2. **s2 — The Occupational Safety, Health and Working Conditions Code, 2020 (Act 37 of 2020)**, India Code, Government of India — https://indiacode.gov.in/server/api/core/bitstreams/3a7333e5-1f94-4f64-aff7-be67c0e63435/content
3. **s3 — PIB Release: "Four Labour Codes Herald Transformational Change"**, Ministry of Labour & Employment, posted 21 Nov 2025 — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2192463&reg=48&lang=2

## Counts

- **Claims:** 68 (c01–c68), every one with a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- **Practice questions:** 42 — basic 13, moderate 15, difficult 8, exam 6 (STATEMENT ×2, MATCH ×2, ASSERTION_REASON ×1, CHRONOLOGY ×1); all 6 sections tested with 7 questions each.
- **Sections:** 6 — act_intro, definitions, health, safety, welfare_hours, enforcement_osh.

## PYQ candidates

- **GK bank (`db/gk/industrial_safety.jsonl`, subtopic factory_safety):** 3 candidates found — GK-SAF-001 (factory definition 10/20), GK-SAF-002 (working hours 48/9/weekly holiday), GK-SAF-003 (welfare threshold ladder). All 3 mapped and **taught = true** (see `pyq_map_SAF-01.json`); they are also listed in the chapter's `related_facts`.
- **PYQ corpus (`db/pyq/*.json`):** grepped for Factories Act / factory-safety content. **No genuine candidates exist** — the only hits were English word-formation items using the word "FACTOR" (KP Constable 2023, WBP Constable 2021) and steel-plant location items (ভিলাই/রাউরকেল্লা ইস্পাত কারখানা), none of which test factory safety law. No codes were invented.

## Subtopic coverage

factory_safety is covered end-to-end from the Act itself: definitions (s.2), health (Ch. III), safety (Ch. IV + IVA hazardous processes), welfare and hours (Ch. V–VIII), enforcement, penalties (s.92), DGFASLI (named in s.91A), and the successor OSH Code 2020 thresholds (20/40) with its 21 Nov 2025 commencement (PIB).

## Gaps (disclosed, not filled)

1. **DGFASLI institutional detail** (establishment year 1945, Mumbai HQ, CLI/RLI network): the labour.gov.in DGFASLI page returned no readable text and the dgfasli.gov.in help page failed to load, so no verbatim government quote could be captured. The chapter therefore teaches only what the Act itself states — DGFASLI's name and its survey power under s.91A (and its emergency-standards role noted in the safety section's deep text via s.41E context) — and does **not** assert the founding year or institute locations.
2. **OSH Code detail beyond the factory definition:** only the s.2(1)(w) definition and Act identity were quoted from India Code; finer Code provisions (e.g. s.22 safety-officer thresholds under the Code) are not taught — PIB-level changes (single licence, safety committees at 500+, Inspector-cum-Facilitator, women's night work with consent) are taught from the PIB release only.
3. **State rules** (West Bengal Factories Rules, state-specific forms/fees) are outside the fetched sources and are not taught; the Bengal connection is limited to the Act's all-India extent and the State-Government-appointed inspectorate, both directly quoted.
4. **NIOS vocational lessons** were not needed: the bare Act + Code + PIB covered the whole subtopic, so no NIOS source was fetched.
5. Exam-knowledge boundary kept: the chapter teaches what the Acts, thresholds, bodies and committees **are**; it contains no operational how-to instructions for hazardous work (confined-space content is limited to the legal entry conditions stated in s.36).
