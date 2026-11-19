# SCI-06 — পদার্থ: মৌল, যৌগ ও মিশ্রণ — Draft Report

- Book: science · Code: SCI-06 · Part: chemistry · Subtopics: chemistry_matter (verbatim from `db/books/science/toc.js`)
- Status: DRAFT · Verification: UNVERIFIED
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-06/chapter.json` → **OK**

## Sources actually fetched (browser text-fetch, 2026-11-19)

1. NCERT Science, Class IX, Chapter 2: *Is Matter Around Us Pure?* — https://ncert.nic.in/textbook/pdf/iesc102.pdf
2. NCERT Science, Class IX, Chapter 3: *Atoms and Molecules* — https://ncert.nic.in/textbook/pdf/iesc103.pdf
3. NCERT Science, Class X, Chapter 1: *Chemical Reactions and Equations* — https://ncert.nic.in/textbook/pdf/jesc101.pdf

All three URLs match the science profile's allowed publishers (NCERT). Two earlier fetch attempts failed at the network layer and were not retried: `jesc102.pdf` and `jesc103.pdf` (those codes turned out to be wrong — Class IX is `iesc1xx`; the successful fetches above are the correct books). One wrong-code fetch (`fesc105.pdf`, Class VI *Body Movements*) succeeded but was irrelevant and unused.

## Counts

- Claims: **50** (c01–c50), every one with a verbatim quote from a fetched page above; every claim is used at least once.
- Practice questions: **42** — basic 17, moderate 12, difficult 6, exam 7 (STATEMENT ×3, MATCH, PAIRS, ASSERTION_REASON, CHRONOLOGY); 7 per section across all 6 sections.
- Sections: 6 — pure_substance, mixture_kinds, solution_forms, elements, atoms_molecules, compounds_separation.

## Subtopic coverage (chemistry_matter)

Covered in full from the fetched NCERT text: pure substances vs mixtures; homogeneous/heterogeneous mixtures; solutions (solvent/solute, saturated, concentration idea); suspensions and colloids (Tyndall effect, centrifugation); alloys (brass composition verbatim from NCERT); elements (Boyle, Lavoisier's definition, metals/non-metals/metalloids, element counts and states, liquid elements); atoms and molecules (Kanad, Dalton, symbols incl. Latin-name symbols, symbol case rule, molecule, atomicity, ions, chemical formula, molecular mass); compounds vs mixtures (fixed proportion, Proust's law, conservation of mass, Fe+S experiment); physical vs chemical changes; separation by evaporation, filtration and centrifugation.

## PYQ candidates

- GK bank (`db/gk/general_science.jsonl`, subtopic = chemistry_matter): **1 found** — GK-SCI-020. Mapped, **taught: false** (specific common-chemical formulas belong to SCI-07/SCI-08).
- PYQ corpus (`db/pyq/*.json`, genuinely on this chapter's topic): **11 found**, all mapped in `pyq_map_SCI-06.json`:
  - Taught (6): WBPSC-IDO-2019-Q18 (not a copper alloy), WBPSC-MISC-PRELIMS-2023-Q82 (bronze), WBCS-EXE-PRELIMS-2019-PRELIMS-Q140 (brass), WBCS-EXE-PRELIMS-2021-PRELIMS-Q130 (solder), WBCS-EXE-PRELIMS-2022-PRELIMS-Q146 (bronze), KP-CONSTABLE-PRELIMS-2023-Q47 (potassium symbol K).
  - Not taught (5), each with a specific reason in the map: WBPSC-IDO-2019-Q21 (methylated spirit composition — source gap), WBPSC-IDO-2019-Q28 (cement composition — source gap), WBCS-EXE-PRELIMS-2023-PRELIMS-Q107 (specific solubilities — not covered), WBCS-EXE-PRELIMS-2023-PRELIMS-Q184 (baking soda composition — SCI-07), WBPSC-CLERKSHIP-PART-I-2009-SESSION-I-Q43 (ionic/covalent bonding classification — not in fetched sources).
- Totals: **12 candidates, 12 mapped, 6 taught.**

Note on identifiers: the PYQ corpus files carry no per-question code field, so `pyq_code` values follow the project's established map convention (as in `pyq_map_HIS-21.json`), built from the item's own `pyq` metadata (exam, year, question number) copied from the corpus files.

## Gaps (disclosed, never filled from memory)

1. **Separation techniques are partial.** The rationalised NCERT Class IX Ch. 2 no longer carries the full separation section, and the Class VI *Separation of Substances* chapter could not be fetched. The chapter teaches only the three methods verbatim-supported by the fetched text — evaporation, filtration, centrifugation — and says so in an exam_note box. Distillation, fractional distillation, sublimation, crystallisation, chromatography, winnowing/threshing are NOT taught.
2. **Bronze and solder compositions** (copper+tin; tin+lead) appear only in an exam_note box: they are evidenced by the real PYQ corpus items themselves, not by a fetched NCERT quote, so no claim is attached to them beyond the brass claim (c08) the box also carries. They are not used in any practice question.
3. **Bengal connection is indirect** (Kanad's Indian origin of the word পরমাণু + Bengal-exam question patterns); the fetched NCERT sources contain no West Bengal-specific fact for this topic, and none was invented.
4. GK-SCI-020 and the baking-soda / common-chemical formula material are deliberately left to SCI-07/SCI-08.
5. Ionic vs covalent bonding (Clerkship 2009 Q43) is not taught — it needs the Class IX bonding material, which was not fetched.
