#!/usr/bin/env python3
"""build_artifact.py — emit data.js (from data/words.json) and the single-file
dist/latin-cards.html (index.html with fsrs.js/data.js/app.js inlined) for
publishing as a self-contained Artifact (CSP: no external requests allowed)."""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(HERE, p), encoding='utf-8').read()

cards = json.load(open(os.path.join(HERE, 'data', 'words.json')))
data_js = 'window.CARDS = ' + json.dumps(cards, ensure_ascii=False) + ';\n'
open(os.path.join(HERE, 'data.js'), 'w', encoding='utf-8').write(data_js)

html = rd('index.html')
for src, body in [('fsrs.js', rd('fsrs.js')), ('data.js', data_js), ('app.js', rd('app.js'))]:
    tag = f'<script src="{src}"></script>'
    assert tag in html, f'missing {tag}'
    html = html.replace(tag, '<script>\n' + body + '\n</script>')
assert 'src=' not in html, 'external src survived inlining'

os.makedirs(os.path.join(HERE, 'dist'), exist_ok=True)
out = os.path.join(HERE, 'dist', 'latin-cards.html')
open(out, 'w', encoding='utf-8').write(html)
print(f'OK: {out} ({len(html)//1024} KB, {len(cards)} cards)')
