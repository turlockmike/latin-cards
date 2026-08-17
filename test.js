/* test.js — oracles for Tabula Latina. Run: node test.js */
const fs = require('fs');
let fails = 0;
const ok = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); fails++; } };

// ---- data oracles ----
const cards = JSON.parse(fs.readFileSync(__dirname + '/data/words.json', 'utf8'));
const src = JSON.parse(fs.readFileSync(__dirname + '/../kana-flashcards/data/words.json', 'utf8'));
const core = cards.filter(c => c.deck === 'core');
ok(core.length === src.length, `core deck (${core.length}) mirrors Japanese list (${src.length})`);
ok(core.every((c, i) => c.en === src[i].en), 'core glosses align 1:1 in order with the Japanese list');
ok(new Set(cards.map(c => c.id)).size === cards.length, 'ids unique');
cards.forEach(c => {
  ok(c.la && c.en && c.gram && c.deck, `fields present on ${c.id}`);
  ok(['core','homeschool','phrases','chants'].includes(c.deck), `known deck on ${c.id}`);
});
const withMacron = cards.filter(c => /[āēīōūȳĀĒĪŌŪ]/.test(c.la)).length;
ok(withMacron > 250, `macrons present at scale (${withMacron} cards) — long marks are load-bearing`);
ok(cards.filter(c => c.neo).length >= 25, 'neo-Latin coinages are tagged');

// ---- FSRS oracles (same engine as kana app; sanity that our copy behaves) ----
global.window = {};
require(__dirname + '/fsrs.js');
const FSRS = global.window.FSRS;
const now = 1755000000000;
const bad  = FSRS.schedule({state:'new'}, 1, now);
const okay = FSRS.schedule({state:'new'}, 2, now);
const good = FSRS.schedule({state:'new'}, 3, now);
ok(bad.due === now, 'Bad on new card re-shows this session');
ok(good.due > okay.due && okay.due >= now + 86400000, 'Good schedules further out than Okay; Okay at least a day');
const later = FSRS.schedule(good, 3, good.due);
ok(later.due - good.due > good.due - now, 'repeated Good grows the interval');

// ---- artifact build oracle ----
const dist = fs.readFileSync(__dirname + '/dist/latin-cards.html', 'utf8');
ok(!/src=/.test(dist), 'dist is fully inlined (no external src)');
ok(dist.includes('window.CARDS'), 'dist embeds the card data');
ok(dist.length < 16 * 1024 * 1024, 'dist under the 16MB artifact limit');

if (fails) { console.error(fails + ' failure(s)'); process.exit(1); }
console.log('ALL PASS: data + FSRS + dist oracles green (' + cards.length + ' cards)');
