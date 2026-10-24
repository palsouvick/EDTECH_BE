# Previous-year questions (official papers only)

One JSON file per paper, e.g. `wbcs-prelims-2022.json`: an array of questions in
the authoring format of `db/seed/pyq-sample-25.json`, plus a `pyq` block and
catalogue codes:

```json
{
  "category": "WBPSC_WBCS",
  "subject_code": "gs",
  "topic_code": "polity",
  "difficulty": "Medium",
  "pyq": {
    "exam_name": "WBCS (Exe.) Prelims",
    "tier": "PRELIMS",
    "year": 2022,
    "shift": null,
    "question_no": 17,
    "paper_url": "https://wbpsc.gov.in/...",
    "answer_key_url": "https://wbpsc.gov.in/..."
  },
  "content": {
    "en": { "question_text": "...", "options": [{ "id": "A", "text": "..." }], "explanation": "..." },
    "bn": { "question_text": "...", "options": [{ "id": "A", "text": "..." }], "explanation": "..." }
  },
  "correct_option_id": "B"
}
```

Rules, enforced by the importer (`src/services/importers/examStyleJson.js`):

- **Official source only.** `paper_url` (and `answer_key_url`) must be an https link on a commission's own site
  (`wbpsc.gov.in`, `ssc.gov.in`, `ibps.in`, `indiapost.gov.in`, ...). Never a coaching site.
- **The question as printed, the answer as in the official key.** Explanations are ours; the question and answer are not edited.
- `question_no` is the number in the paper; with exam and year it forms the unique PYQ code, so re-importing never duplicates.

Check a file with `node scripts/seed.js --dry-run db/pyq/<file>.json`. The server imports
new files on startup (existing questions are kept as they are).
