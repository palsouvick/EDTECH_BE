# SCI-11 — মানবদেহ — Draft Report

- Book: science, code SCI-11, number 11, part biology, subtopics: biology_human_body (verbatim from toc.js). Status DRAFT, verification UNVERIFIED.
- Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-11/chapter.json` → **chapter.json: OK**.

## Sources actually fetched (browser.open, 2026-11-19)
1. NCERT Science, Class X, Ch. 5: Life Processes — https://ncert.nic.in/textbook/pdf/jesc105.pdf (digestion, respiration, circulation, excretion)
2. NCERT Science, Class X, Ch. 6: Control and Coordination — https://ncert.nic.in/textbook/pdf/jesc106.pdf (neuron, reflex, brain, insulin feedback)
3. NCERT Science, Class X, Ch. 10: The Human Eye and the Colourful World — https://ncert.nic.in/textbook/pdf/jesc110.pdf (eye as camera, cornea refraction, lens, accommodation, myopia)
4. NCERT Biology, Class XI, Ch. 14: Breathing and Exchange of Gases — https://ncert.nic.in/textbook/pdf/kebo114.pdf (alveoli, breathing rate, tidal volume, O2 delivery, medulla rhythm centre, emphysema)
5. NCERT Biology, Class XI, Ch. 15: Body Fluids and Circulation — https://ncert.nic.in/textbook/pdf/kebo115.pdf (plasma 55%, iron in haemoglobin, RBC life 120 days, ABO groups, 4-chambered heart, pulmonary veins)
6. NCERT Biology, Class XI, Ch. 17: Locomotion and Movement — https://ncert.nic.in/textbook/pdf/kebo117.pdf (voluntary striated muscle, lactic-acid fatigue, 206 bones, femur longest, ear ossicles, joints)
7. NCERT Biology, Class XI, Ch. 19: Chemical Coordination and Integration — https://ncert.nic.in/textbook/pdf/kebo119.pdf (ductless glands, pituitary/GH, thyroid lobes and goitre, beta-cell insulin and its targets, ADH, adrenal position)

All URLs match the science validator profile (NCERT publisher). No WBBSE source was used.

## Counts
- Claims: 64 (all with verbatim quotes from the fetched pages above; every claim is used at least once — checked programmatically)
- Practice questions: 42 (basic 12, moderate 14, difficult 10, exam 6; formats DIRECT, STATEMENT, MATCH, PAIRS, ASSERTION_REASON), across all 6 sections (digestion 7, respiration 7, circulation 8, excretion 6, nervous_senses 7, skeleton_hormones 7)
- Sections: 6 (digestion, respiration, circulation, excretion, nervous_senses, skeleton_hormones)

## PYQ candidates
- Found: 24 — 2 GK bank items with subtopic biology_human_body in db/gk/general_science.jsonl (GK-SCI-014, GK-SCI-021) plus 22 real corpus PYQs from db/pyq genuinely on the human body (IDO 2019 ×6, KP Constable 2023 ×1, WBPSC Miscellaneous 2023 ×1, WBCS 2015–2024 ×11, Clerkship 2023 ×2, plus the WBCS-2022 ovum item screened in and marked as belonging to SCI-10).
- Mapped: 24; Taught: 14 (GK-SCI-014; IDO Q2 thyroid, Q31 eye-camera, Q82 bile, Q87 lens, Q89 femur, Q92 forebrain; Misc-2023 Q45 kidney; WBCS-2016 Q139 voluntary muscle, Q152 insulin targets — with the official-key discrepancy disclosed; WBCS-2018 Q119 RBC life, Q155 lactic acid; WBCS-2022 Q138 iron in haemoglobin; WBCS-2024 Q134 pulmonary veins).

## Subtopic coverage
biology_human_body covered for: digestive system and enzymes, respiratory system and cellular respiration, blood/heart/circulation and blood groups, excretory system and nephron, nervous system/brain and the eye, skeleton/muscles/joints and the endocrine system.

## Gaps (disclosed, never filled from memory)
- NCERT XI Biology Ch. 18 "Neural Control and Coordination" (kebo118.pdf) could NOT be fetched (repeated fetch failure; the old-syllabus codes kebo118/kebo120 also failed before the rationalised codes were identified). Consequently the cranial-nerve count (12 pairs, WBCS-2015-Q186) and spinal-nerve count (31 pairs, WBCS-2019-Q128) are NOT taught; both PYQs are marked taught:false with the reason.
- Salivary-gland pair count (3 pairs, KP-2023-Q45): sources teach salivary glands and amylase but not the count — untaught.
- O2 carrying capacity 20 ml/100 ml blood (WBCS-2018-Q161): fetched NCERT gives only ~5 ml delivered per 100 ml; the 20 ml figure is untaught and the distinction is flagged in an exam_note box.
- GK-SCI-021 is a mixed records item: skin as largest organ, liver as largest gland, stapes as smallest bone, resting heart rate 72/min and the Rh-specific O-negative/AB-positive wording are not in the fetched sources — item marked taught:false with the taught parts itemised in the map note.
- Liver damage by alcohol via fat accumulation (WBCS-2019-Q149), eye part with maximum refractive index (WBCS-2022-Q141), nerve cell as longest cell (Clerkship-2023-III-Q81) and blood pH (Clerkship-2023-IV-Q84, primary SCI-07): not in this chapter's fetched sources — all marked taught:false with specific reasons in pyq_map_SCI-11.json.
- events[] is an empty array (non-dated book; no dated events belong to this subject). timeline carries the honest equivalent: the five-step pathway of food through the body systems, in sequence order. bengal_connection states openly that the fetched NCERT sources carry no West Bengal-specific fact and gives only the sourced India-level gutkha/oral-cancer warning as the nearest relevant link.
