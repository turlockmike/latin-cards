# Latin Flashcards — Status

**Status:** SHIPPED v1 (2026-08-17)

Live: https://turlockmike.github.io/latin-cards/ (primary, GitHub Pages — Mike directive 2026-08-17 "like the other one") · artifact mirror 6d36d401

Verification state: list-alignment/data/FSRS/dist oracles green (`node test.js`);
headless playwright smoke green (profile → study → flip → grade → persist;
full-session exhaustion with Bad-recycles). Latin translations authored from
weights (strong stable domain) — **spot-check against a dictionary pending**;
individual glosses are estimated-correct, structure is verified.

Closed loop: producer = build_words.py/build_artifact.py · consumer = family via
artifact link · drift detector = test.js (kana-list alignment assert breaks loudly
if the source list changes) · decay rule = if family-latin interest dies again
(see ../family-latin/STATUS.md history), mark STOPPED here, keep artifact live.

Backlog (only if the family actually uses it):
- Cloud sync via the kana-flashcards worker pattern (profiles follow devices)
- Dictionary spot-check pass on the 592 core translations (n=40 sample)
- Audio recorded properly instead of speechSynthesis approximation
