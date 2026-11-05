# Brief: GK topic packs, pilot batch (2026-11-05)

Read `E:\EDTECH\backend\db\gk\drafts\BRIEF.md` first. Every rule there applies: sources only from
pages you fetched, verbatim quotes, NCERT/official preference, Bengali standards, no PYQ labels,
`verification.status` = `"UNVERIFIED"`, `bengali_review` = `"PENDING"`. Then read the **Topic packs**
section at the end of `E:\EDTECH\backend\db\gk\README.md`: the `pack` block format.

## Task
Write `E:\EDTECH\backend\db\gk\drafts\packs_history.jsonl`: exactly these three records, topic `indian_history`:

| code | subtopic | pack | connects (related) |
|---|---|---|---|
| GK-HIS-101 | vedic | The four Vedas: Rigveda, Samaveda, Yajurveda, Atharvaveda; what each contains; which is oldest; Brahmanas, Aranyakas, Upanishads as later Vedic literature | GK-HIS-002 |
| GK-HIS-102 | mughal | The three Battles of Panipat: 1526 (Babur vs Ibrahim Lodi), 1556 (Akbar's forces under Bairam Khan vs Hemu), 1761 (Ahmad Shah Abdali vs the Marathas): who, why, result, what followed | GK-HIS-008, GK-HIS-021, GK-HIS-019 |
| GK-HIS-103 | maurya_gupta | The Mauryas and Ashoka: Chandragupta → Bindusara → Ashoka; Kalinga war (c. 261 BCE); dhamma; rock and pillar edicts; Sarnath Lion Capital (National Emblem); Brahmi decipherment by Prinsep | GK-HIS-005, GK-HIS-020, GK-HIS-022 |

Read the related existing facts in `db/gk/indian_history.jsonl` so the pack agrees with them and adds to them.

## For each pack
- `statement`: 2–4 plain sentences a beginner can follow (the "basic explanation").
- `explanation`: why it matters and how it is usually asked.
- `milestones` (kind `EVENT`) for the dated events, with notes.
- `pack.table` for the comparison (Vedas: Veda / what it contains / exam fact; Panipat: battle / year / sides / winner / what followed; Mauryas: ruler / key facts).
- `pack.must_remember` (3–5), `pack.dont_confuse` (only real confusions), `pack.memory_trick` only if a genuine pattern exists (e.g. Panipat 1526 → 1556 → 1761) and states nothing unsourced.
- `pack.keywords` en + bn (e.g. Rigveda/ঋগ্বেদ, Samaveda/সামবেদ…; Panipat/পানিপথ; Ashoka/অশোক, Maurya/মৌর্য, Kalinga/কলিঙ্গ), `pack.pyq_terms` (English words found in exam questions, e.g. "Veda", "Panipat", "Ashoka", "Asoka", "Maurya", "Kalinga"), `pack.order` (vedic 10, maurya 20, panipat 30), `pack.related` as in the table.
- 3–4 `questions` in at least 3 formats across the batch (MATCH and CHRONOLOGY suit these topics).
- Approximate ancient dates: say "c." and follow the source's wording (NCERT gives ranges for Vedic texts).
- Any claim you cannot source exactly: leave it out of the pack. Do not pad.

## Finish
Validate: `cd E:\EDTECH\backend && node -e "const {validateLibrary}=require('./src/services/gkFacts.validate');const r=require('fs').readFileSync(process.argv[1],'utf8').trim().split('\n').map(l=>JSON.parse(l));console.log(validateLibrary(r).errors)" db/gk/drafts/packs_history.jsonl`
(the validator will learn the `pack` block while you work; if it reports `pack` errors that contradict the README, mention them).
Report: what each pack covers, sources used, anything dropped and why, disagreements between sources.
