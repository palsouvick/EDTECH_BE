# SAF-02 — পেশাগত স্বাস্থ্য ও PPE — Draft Report

Chapter: SAF-02, book `industrial_safety`, part `workplace`, subtopic `occupational_health`.
Status: DRAFT / UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser.open, verbatim quotes taken)

1. **The Factories Act, 1948 (Act 63 of 1948)** — India Code, Legislative Department (GOVT)
   https://www.indiacode.nic.in/bitstream/123456789/20951/2/the_factories_act%2c_1948.pdf
   (One other India Code copy of the Act failed to fetch; this copy was read in full — sections 1, 2, 7A, 10–20, 35, 36, 36A, 40B, 41C, 41E–41H, 45–49, 89, 90, 91A and the Third Schedule.)
2. **Noise Pollution (Regulation and Control) Rules, 2000** — CPCB (GOVT)
   https://cpcb.nic.in/noise-pollution-rules/
3. **CIPET gets accreditation by NABL for Testing and Certification of PPE Kit** — Press Information Bureau (GOVT)
   https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1639766&reg=48&lang=2
4. **DGFASLI official homepage** — Ministry of Labour and Employment (GOVT)
   https://dgfasli.gov.in/ (used only for the RLI Kolkata AFIH Bengal-connection claim)

## Counts

- Claims: **52** (c01–c52), every one with a verbatim quote from a fetched page above; all claims are used (validator enforces this).
- Practice questions: **48** — basic 15, moderate 17, difficult 10, exam 6; formats DIRECT 42, STATEMENT 2, MATCH 1, PAIRS 1, ASSERTION_REASON 1, CHRONOLOGY 1; all 6 sections tested.
- Sections: 6 (health_duties, workroom_health, medical_surveillance, notifiable_diseases, ppe_protection, welfare_noise).

## PYQ candidates

- GK bank (`db/gk/industrial_safety.jsonl`, subtopic `occupational_health`): **2 found** — GK-SAF-008, GK-SAF-014. Both mapped in `pyq_map_SAF-02.json`; **taught: 0 of 2** (both partially covered — see map notes for the specific untaught facts).
- Exam PYQ corpus (`db/pyq/*.json`): grep for silicosis / protective equipment / occupational topics returned **no items** on this chapter's topic.

## Subtopic coverage (occupational_health)

Covered from the Act itself: occupier's general duties (7A), Chapter III health provisions (ss. 11–18), certifying surgeons (s. 10), hazardous-process health surveillance (41C, 41F, 41G, 41H, 91A, 41E), notifiable diseases and the Third Schedule (s. 89, 90), PPE in law (ss. 35, 36, 36A, 41C(b)), PPE kit composition and NABL testing (PIB), welfare thresholds (ss. 40B, 45–49), ambient noise rules (CPCB).

## Gaps (disclosed, not filled from memory)

1. **90 dB(A) / 8-hour occupational noise exposure limit** — the single most-asked number in this area (it is in GK-SAF-008). It lives in the Factories (Model) Rules / state factory rules schedules. In this run it was found only on non-government sites (comply4hr, commercial blogs); no allowed-publisher (gov.in / nic.in / NCERT / NIOS) copy could be fetched, so the chapter teaches noise-induced hearing loss only as Third Schedule entry 22 plus the CPCB ambient-noise rules, and does **not** state the 90 dB(A) figure.
2. **Hierarchy of controls (PPE last)** — GK-SAF-014's core fact. Its bank source is an ILO publication, outside this book's allowed publishers; no GOVT/NCERT/NIOS statement of the five-step hierarchy was fetched. The chapter teaches the Act's own control provisions (exhaust at source, s. 14; screens, s. 35) and hazard-matched PPE, but does not present the named hierarchy as fact.
3. **Clinical detail of occupational diseases** (e.g. silicosis = irreversible fibrosis from crystalline silica; byssinosis = cotton dust) — the Act's Third Schedule lists disease names only; no allowed medical source was fetched, so disease–dust pairings are taught only at the level the Schedule and section text support, and the dust-pairing explanation in the `deep` text is framed as a confusion-warning, not a sourced clinical claim. A future pass with a DGFASLI/NIOS occupational-health publication could close gaps 1–3 and flip both PYQ items to taught.
4. DGFASLI has been renamed (DGOSH) on its own homepage masthead (Hindi text); the chapter uses the name as it appears in the Factories Act text (DGFASLI), which is what exams based on the Act use.
