# Brief: blind answer check of new extension questions

You get a packet `ext2_<CODE>_blind_packet.json` (in the drafts folder named in your task). It holds the NEW practice
questions of an extension pass, each with its options in random order and **no answer**, plus the chapter's prose,
the new claims (with their verbatim quotes) and their sources.

For every question:
1. Work out the answer yourself from the chapter prose and the claim quotes. Where a quote is thin, open the cited
   source URL (allowed: the sources listed in the packet) and read the passage. Do not answer from memory alone.
2. Pick exactly one option. If two options are both defensible, or none is right, say so.
3. Note anything a student would find misleading: a stem that is ambiguous, an option that is also correct, a fact
   in the prose that contradicts its quote, a time-bound fact stated without its year.

Write `ext2_<CODE>_blind_result.json` next to the packet:
`{ "<qid>": { "answer": "<exact option text>", "sure": true|false, "issue": "<empty or one line>" }, … }`

Do not open the chapter file, the key, or any `ext2_<CODE>_chapter.json` — the check must stay blind.
Reply in under 60 words: questions answered, how many unsure, issues found.
