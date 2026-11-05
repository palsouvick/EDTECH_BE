# Brief: GK topic packs, batch 2 (2026-11-05)

Read `BRIEF_PACKS.md` (batch 1) and everything it points to; all of it applies. Two changes, decided by the owner:

1. **Official or institutional sources only.** NCERT, government sites (india.gov.in, legislative.gov.in for
   the Constitution text, sansad.in, presidentofindia.gov.in, nmcg.nic.in / jalshakti, cwc.gov.in, wb.gov.in,
   ICMR/NIN, fssai.gov.in, mohfw.gov.in, asi.nic.in), UNESCO/WHO/UN. **No Wikipedia or other reference sites at
   all**, not even for side details. A detail you cannot source officially is left out, never labelled.
2. Read the published packs GK-HIS-101/102/103 at the end of `db/gk/indian_history.jsonl` as the model of
   length, tone and structure.

Write only your assigned draft file. Codes, topics, subtopics, pack.order and related existing facts:

| file | code | topic / subtopic | pack | related |
|---|---|---|---|---|
| packs_batch2_a.jsonl | GK-GEO-101 | geography / rivers | The Ganga system: origin (Bhagirathi & Alaknanda at Devprayag), main tributaries (Yamuna, Son, Gomti, Ghaghara, Gandak, Kosi…), states it flows through, major cities, Farakka, Ganga–Brahmaputra delta / Sundarbans, Hooghly in West Bengal | GK-GEO-004, GK-GEO-017, GK-WBG-017 |
| packs_batch2_a.jsonl | GK-POL-101 | polity / union_executive | The President of India: Article 52 onwards — election (electoral college, Art. 54–55), qualifications (58), term (56), oath, powers, impeachment (61), Vice-President (63–), relation to PM and Council of Ministers (74–75) | GK-POL-006, GK-POL-007 |
| packs_batch2_a.jsonl | GK-SCI-101 | general_science / biology_nutrition | Vitamins at a glance: fat- vs water-soluble, A B C D E K — chemical name, main sources, deficiency disease; Vitamin C (ascorbic acid, citrus/amla, scurvy) as the worked example | GK-SCI-011, GK-SCI-022 |
| packs_batch2_b.jsonl | GK-HIS-104 | indian_history / ivc | Harappan civilisation: dates, major sites and what each is known for, town planning, seals, script undeciphered, decline | GK-HIS-001 |
| packs_batch2_b.jsonl | GK-HIS-105 | indian_history / buddhism_jainism | Buddhism and Jainism compared: founders, key places, teachings, councils, texts | GK-HIS-003, GK-HIS-022 |
| packs_batch2_b.jsonl | GK-HIS-106 | indian_history / mahajanapadas | The sixteen mahajanapadas and the rise of Magadha | GK-HIS-004 |
| packs_batch2_b.jsonl | GK-HIS-107 | indian_history / maurya_gupta | The Guptas: rulers, Prayaga Prashasti, culture and science of the period | GK-HIS-006 |

pack.order: Ganga 10, President 10, Vitamins 10; IVC 5, Buddhism & Jainism 15, Mahajanapadas 17, Guptas 25.
Keywords must be specific enough not to over-link (e.g. "Ganga"/"গঙ্গা", "President of India", "রাষ্ট্রপতি",
"vitamin"/"ভিটামিন", "Harappa"/"হরপ্পা", "Mahajanapada", "Gupta"/"গুপ্ত" — avoid generic words like "river").
Polity: quote the article text from the Constitution on legislative.gov.in (or the India Code PDF); use the
current article numbers. Science: say "deficiency causes" only where the official source says so.
Run the validator, and report per pack: claims dropped for lack of an official source.
