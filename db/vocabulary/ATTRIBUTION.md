# Vocabulary Bank: sources, licences and how entries are checked

## Content

Every definition, Bengali meaning, Bengali explanation and example sentence in
`*.jsonl` was written for this project. Nothing is copied from a dictionary.

- **Bengali text** is not machine-verified. Each word carries
  `bengali_review.status = PENDING` until an administrator reviews it in the admin
  portal (Bengali review). The reviewer and date are recorded, and students see
  "Bengali meaning pending review" until then.
- **Exam claims:** only entries citing an official commission paper *and* its answer
  key (`examRelevance.basis = PYQ_VERIFIED`) claim to have appeared in an exam. In
  batch 1 these come from the WBPSC Clerkship 2023 (Session I) and WBCS Prelims 2022
  papers already imported in `db/pyq/`. Every other word is original practice
  material (`GENERAL`).

## Automatic checks (development only)

`npm run vocab:check` runs `scripts/vocabulary/checkLexicon.mjs` and rewrites
`lexicon-checks.json`. `npm run vocab:check -- --verify` fails if that file is out of
date. The two datasets below are **devDependencies**: they are used only by this
script and are never shipped to students or loaded by the server.

| Check | Dataset | Used for |
|---|---|---|
| Word exists with the declared part of speech | Princeton WordNet 3.1 (`wordnet-db`) | An entry that fails is not published. Prepositions, conjunctions and interjections are not in WordNet, so for those it is only a warning. |
| Synonyms | WordNet | `SAME_SYNSET` or `RELATED` (similar-to, also-see, verb group, hypernym or hyponym) counts as confirmed. WordNet can show that two words *can* share a meaning, **not** that they are interchangeable in every sentence. |
| Antonyms | WordNet, plus official answer keys in `db/pyq/` | `DIRECT` (a WordNet antonym link) or `INDIRECT` (through similar-to, hypernym or verb-group senses), or the pair is fixed by an official answer key. |
| Pronunciation | CMU Pronouncing Dictionary (`cmu-pronouncing-dictionary`) | US English. ARPAbet is converted to IPA, with stress marks placed by the maximal-onset rule. A word missing from CMUdict (for example the British spellings *meagre* and *sceptical*) gets no pronunciation rather than a guessed one. |

Relations that WordNet cannot confirm are still shown to students. They are listed in
`lexical_checks.unconfirmed` for editorial review and are **not** used as
practice-test answer keys.

## Licences and attribution

### Princeton WordNet 3.1

> WordNet Release 3.0. This software and database is being provided to you, the
> LICENSEE, by Princeton University under the following license. ... Permission to
> use, copy, modify and distribute this software and database and its documentation
> for any purpose and without fee or royalty is hereby granted, provided that you
> agree to comply with the following copyright notice and statements, including the
> disclaimer, and that the same appear on ALL copies of the software, database and
> documentation, including modifications that you make for internal use or for
> distribution.
>
> WordNet 3.0 Copyright 2006 by Princeton University. All rights reserved.
>
> THIS SOFTWARE AND DATABASE IS PROVIDED "AS IS" AND PRINCETON UNIVERSITY MAKES NO
> REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. ... The name of Princeton
> University or Princeton may not be used in advertising or publicity pertaining to
> distribution of the software and/or database.

We do not distribute the WordNet database. `lexicon-checks.json` stores only our
own yes/no results per relation. The full licence is in
`node_modules/wordnet-db/LICENSE`, and the npm packaging is MIT.

### CMU Pronouncing Dictionary

The IPA pronunciations shown to students are derived from CMUdict, so this notice
is reproduced as its licence requires:

> Copyright (C) 1993-2015 Carnegie Mellon University. All rights reserved.
>
> Redistribution and use in source and binary forms, with or without modification,
> are permitted provided that the following conditions are met:
>
> 1. Redistributions of source code must retain the above copyright notice, this
>    list of conditions and the following disclaimer. The contents of this file are
>    deemed to be source code.
> 2. Redistributions in binary form must reproduce the above copyright notice, this
>    list of conditions and the following disclaimer in the documentation and/or
>    other materials provided with the distribution.
>
> THIS SOFTWARE IS PROVIDED BY CARNEGIE MELLON UNIVERSITY "AS IS" AND ANY EXPRESSED
> OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
> MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
> SHALL CARNEGIE MELLON UNIVERSITY NOR ITS EMPLOYEES BE LIABLE FOR ANY DIRECT,
> INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
> NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
> PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
> WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
> POSSIBILITY OF SUCH DAMAGE.

Source: <https://github.com/cmusphinx/cmudict/blob/master/LICENSE>. The npm wrapper
`cmu-pronouncing-dictionary` is ISC-licensed. Its readme describes CMUdict as
"public domain", but the upstream BSD terms above are what we follow. The
Vocabulary Bank page also shows a short credit line next to pronunciations.
