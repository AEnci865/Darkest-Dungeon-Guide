// ============================================================
//  app.js — Darkest Dungeon Estate Optimizer
//  All render logic, state management, and new Campaign tab
// ============================================================

// ── STATE ─────────────────────────────────────────────────────
var roster      = JSON.parse(localStorage.getItem(‘dd-roster’)  || ‘[]’);
var estateState = JSON.parse(localStorage.getItem(‘dd-estate’)  || ‘{}’);
var subsState   = {};
var activeProv        = ‘short’;
var activeProvRegion  = ‘ruins’;
var initialized = {};

// ── PERSISTENCE HELPERS ───────────────────────────────────────
function saveRoster()    { localStorage.setItem(‘dd-roster’,  JSON.stringify(roster));      }
function saveEstate()    { localStorage.setItem(‘dd-estate’,  JSON.stringify(estateState)); }
function saveEstateName(){ localStorage.setItem(‘dd-estate-name’, document.getElementById(‘estateName’).value); }

// ── MISC HELPERS ──────────────────────────────────────────────
function stressColor(s) {
return s < 50 ? ‘#80c060’ : s < 100 ? ‘#c5a059’ : s < 150 ? ‘#c08020’ : ‘#cc2222’;
}

// ── ESTATE HELPERS ─────────────────────────────────────────────
function getUpgradeLevel(bId, uIdx) { return estateState[bId + ‘*’ + uIdx] || 0; }
function setUpgradeLevel(bId, uIdx, level) {
estateState[bId + ’*’ + uIdx] = level;
saveEstate();
renderEstate();
if (initialized[‘buildroute’]) computeRoute();
}
function pipClick(bId, uIdx, clicked, maxLevel) {
var cur = getUpgradeLevel(bId, uIdx);
var nv  = (cur === clicked) ? clicked - 1 : clicked;
setUpgradeLevel(bId, uIdx, Math.max(0, Math.min(maxLevel, nv)));
}
function resetEstate() {
if (confirm(‘Reset all building levels to 0?’)) {
estateState = {};
saveEstate();
renderEstate();
if (initialized[‘buildroute’]) computeRoute();
}
}

// ── REGION TEAMS ──────────────────────────────────────────────
function renderRegion(rk) {
var region = REGIONS[rk];
var intel  = REGION_INTEL[rk];
if (!region || !intel) return;
if (!subsState[rk]) subsState[rk] = {1:false,2:false,3:false,4:false};

// Subtitle
var subEl = document.getElementById(rk + ‘-subtitle’);
if (subEl) subEl.textContent = intel.subtitle;

// Tips
var tipsEl = document.getElementById(rk + ‘-tips’);
if (tipsEl) {
tipsEl.innerHTML = ‘<h4>Region Intelligence</h4><ul>’
+ intel.tips.map(function(t){ return ‘<li>’ + t + ‘</li>’; }).join(’’)
+ ‘</ul>’;
}

var grid = document.getElementById(rk + ‘-team’);
if (!grid) return;

var positions  = [4,3,2,1];
var posLabels  = {4:‘Position 4 (Back)’,3:‘Position 3’,2:‘Position 2’,1:‘Position 1 (Front)’};
var html = ‘’;
positions.forEach(function(pos) {
var hero   = region[pos];
var isSub  = subsState[rk][pos];
var name   = isSub ? hero.sub  : hero.main;
var skills = isSub ? hero.sS   : hero.mS;
var skillsHtml = skills.map(function(s){
return ‘<div style="font-size:.82rem;color:var(--text-dim);line-height:1.8;font-style:italic;">’ + s + ‘</div>’;
}).join(’’);

```
html += '<div>'
  + '<div class="pos-label">' + posLabels[pos] + '</div>'
  + '<div class="hero-card' + (isSub ? ' subbed' : '') + '">'
  + '<div class="hero-name' + (isSub ? ' sub-active' : '') + '">' + name + '</div>'
  + '<div class="skills-list">' + skillsHtml + '</div>'
  + '<button class="swap-btn' + (isSub ? ' subbed' : '') + '" onclick="toggleSub(\'' + rk + '\',' + pos + ')">'
  + (isSub ? 'Back to Main' : 'Sub: ' + hero.sub)
  + '</button></div></div>';
```

});
grid.innerHTML = html;
}

function toggleSub(rk, pos) {
if (!subsState[rk]) subsState[rk] = {};
subsState[rk][pos] = !subsState[rk][pos];
renderRegion(rk);
}

// ── BOSSES ─────────────────────────────────────────────────────
function renderBosses() {
var el   = document.getElementById(‘boss-list’);
var html = ‘’;
BOSSES.forEach(function(b, i) {
var mechHtml  = b.mechanics.map(function(m){ return ‘<li>’ + m + ‘</li>’; }).join(’’);
var teamsHtml = b.teams.map(function(t){
return ‘<div class="team-rec"><div class="team-rec-label">’ + t.label + ’ Team</div>’
+ ‘<div class="team-rec-heroes">’ + t.heroes + ‘</div></div>’;
}).join(’’);
var avoidHtml = b.avoid.map(function(a){
var isCrit = (a.indexOf(‘CRITICAL’) >= 0 || a.indexOf(‘NEVER’) >= 0);
return ‘<li’ + (isCrit ? ’ class=“warn”’ : ‘’) + ‘>’ + a + ‘</li>’;
}).join(’’);

```
html += '<div class="boss-card">'
  + '<div class="boss-header" onclick="toggleBoss(' + i + ')">'
  + '<div><div class="boss-name">' + b.name + '</div>'
  + '<div class="boss-region">' + b.region + ' — ' + b.tiers + '</div></div>'
  + '<div class="chevron" id="chev-' + i + '">&#9658;</div></div>'
  + '<div class="boss-body" id="boss-body-' + i + '">'
  + '<div class="boss-section"><h4>Mechanics &amp; Priority</h4><ul>' + mechHtml + '</ul>' + teamsHtml + '</div>'
  + '<div class="boss-section"><h4>Avoid / Watch For</h4><ul>' + avoidHtml + '</ul></div>'
  + '</div></div>';
```

});
el.innerHTML = html;
}

function toggleBoss(i) {
var body = document.getElementById(‘boss-body-’ + i);
var chev = document.getElementById(‘chev-’ + i);
var isOpen = body.classList.contains(‘open’);
document.querySelectorAll(’.boss-body’).forEach(function(b){ b.classList.remove(‘open’); });
document.querySelectorAll(’.chevron’).forEach(function(c){ c.classList.remove(‘open’); });
if (!isOpen) { body.classList.add(‘open’); chev.classList.add(‘open’); }
}

// ── DARKEST DUNGEON ────────────────────────────────────────────
function renderDarkest() {
var el   = document.getElementById(‘dd-list’);
var html = ‘’;
DD_RUNS.forEach(function(r) {
var keyHtml   = r.key.map(function(k){ return ‘<li>’ + k + ‘</li>’; }).join(’’);
var watchHtml = r.watch.map(function(w){ return ‘<li>’ + w + ‘</li>’; }).join(’’);
html += ‘<div class="dd-card">’
+ ‘<div class="dd-card-title">’ + r.name + ‘</div>’
+ ‘<div style="color:var(--text-dim);font-style:italic;font-size:.82rem;margin-bottom:10px;">’ + r.desc + ‘</div>’
+ ‘<div class="dd-team"><div class="dd-team-label">Recommended Team</div><div class="dd-team-val">’ + r.team + ‘</div></div>’
+ ‘<div class="dd-grid">’
+ ‘<div class="dd-col"><h4>Key Tactics</h4><ul>’ + keyHtml + ‘</ul></div>’
+ ‘<div class="dd-col"><h4>Watch For</h4><ul>’   + watchHtml + ‘</ul></div>’
+ ‘</div></div>’;
});
el.innerHTML = html;
}

// ── PROVISIONS ─────────────────────────────────────────────────
function renderProvisions() {
var p     = PROVISIONS[activeProv];
var items = p.regions[activeProvRegion] || p.regions.ruins;

var regBtns = [‘ruins’,‘weald’,‘warrens’,‘cove’].map(function(r){
return ‘<button class="prov-tab' + (activeProvRegion===r?' active':'')
+ '" onclick="setProvRegion(\'' + r + '\')" style="text-transform:capitalize;">’ + r + ‘</button>’;
}).join(’’);

var rows = items.map(function(item){
return ‘<tr><td>’ + item[0] + ‘</td><td class="item-qty">’ + item[1] + ‘</td><td class="item-note">’ + item[2] + ‘</td></tr>’;
}).join(’’);

document.getElementById(‘prov-content’).innerHTML =
‘<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">’ + regBtns + ‘</div>’
+ ‘<div class="prov-card" style="max-width:480px;">’
+ ‘<div class="prov-card-title">’
+ activeProvRegion.charAt(0).toUpperCase() + activeProvRegion.slice(1)
+ ’ — ’ + p.rooms + ‘</div>’
+ ‘<table class="prov-table"><thead><tr><th>Item</th><th style="text-align:right;">Qty</th><th>Notes</th></tr></thead>’
+ ‘<tbody>’ + rows + ‘</tbody></table>’
+ ’<div class="prov-rule"><strong>Rule of Thumb:</strong> ’ + p.note + ‘</div></div>’
+ ‘<div class="tips-box" style="margin-top:16px;"><h4>Universal Rules</h4><ul>’
+ ‘<li>Torch: 4 short / 8 medium / 12 long — never go dark early</li>’
+ ‘<li>Food: always bring more than the minimum — hungry heroes take HP damage</li>’
+ ‘<li>Antivenom is the most underrated supply — triple up in Warrens</li>’
+ ‘<li>Shovels prevent obstacle penalties — at least 1 per expedition</li>’
+ ‘<li>Holy Water at Ruins curios prevents most negative outcomes</li>’
+ ‘</ul></div>’;
}

function setProvRegion(r) { activeProvRegion = r; renderProvisions(); }

// ── ROSTER ─────────────────────────────────────────────────────
function renderRoster() {
var fc    = document.getElementById(‘filterClass’).value;
var fs    = document.getElementById(‘filterStatus’).value;
var grid  = document.getElementById(‘rosterGrid’);
var heroes = roster.filter(function(h){
return (!fc || h.cls === fc) && (!fs || h.status === fs);
});

if (!heroes.length) {
grid.innerHTML = ‘<div style="color:var(--text-dim);font-style:italic;grid-column:1/-1;padding:20px 0;">No heroes recorded. Add your first hero above.</div>’;
return;
}

grid.innerHTML = heroes.map(function(h) {
var sc  = stressColor(h.stress);
var sp  = Math.min(100, h.stress / 2);
var idx = roster.indexOf(h);
var posQHtml = (h.posQ||[]).map(function(q){ return ‘<span class="quirk-tag quirk-pos">’ + q + ‘</span>’; }).join(’’);
var negQHtml = (h.negQ||[]).map(function(q){ return ‘<span class="quirk-tag quirk-neg">’ + q + ‘</span>’; }).join(’’);

```
return '<div class="roster-card'
  + (h.status==='dead' ? ' dead' : '')
  + (h.status==='retired' ? ' retired' : '') + '">'
  + '<div class="rcard-level">Lv' + h.level + '</div>'
  + '<div class="rcard-name">' + h.name + '</div>'
  + '<div class="rcard-class">' + h.cls + '</div>'
  + '<div style="font-size:.7rem;color:var(--text-dim);margin-top:4px;text-transform:uppercase;letter-spacing:1px;">' + h.status + '</div>'
  + '<div style="margin-top:8px;font-size:.72rem;">'
  + '<div style="display:flex;justify-content:space-between;color:var(--text-dim);">Stress<span style="color:' + sc + '">' + h.stress + '</span></div>'
  + '<div class="stress-bar"><div class="stress-fill" style="width:' + sp + '%;background:' + sc + '"></div></div></div>'
  + '<div class="rcard-quirks">' + posQHtml + negQHtml + '</div>'
  + '<button class="rcard-del" onclick="deleteHero(' + idx + ')">&#10005;</button></div>';
```

}).join(’’);
}

function deleteHero(i) { roster.splice(i,1); saveRoster(); renderRoster(); }

function addSampleHeroes() {
roster = [
{ name:“Reynauld”,   cls:“Crusader”,     level:2, stress:20, status:“active”, posQ:[“Tough”,“Slugger”],    negQ:[“Faithless”]        },
{ name:“Dismas”,     cls:“Highwayman”,   level:2, stress:35, status:“active”, posQ:[“Unerring”,“Eagle Eye”],negQ:[“Nervous”]           },
{ name:“Paracelsus”, cls:“Plague Doctor”,level:1, stress:10, status:“active”, posQ:[“Hard Noggin”],         negQ:[“Warrens Phobe”]     },
{ name:“Junia”,      cls:“Vestal”,       level:2, stress:25, status:“active”, posQ:[“Resilient”,“Steady”],  negQ:[“Ruins Phobe”]       },
{ name:“Barristan”,  cls:“Man-at-Arms”,  level:1, stress:55, status:“active”, posQ:[“Optimistic”],          negQ:[“Nervous”,“Fragile”] },
{ name:“Caeso”,      cls:“Hellion”,      level:1, stress:80, status:“active”, posQ:[“Slayer of Beast”],     negQ:[“Syphilis”]          }
];
saveRoster();
renderRoster();
}

function initRoster() {
var cf = document.getElementById(‘filterClass’);
var cs = document.getElementById(‘newClass’);
CLASSES.forEach(function(c){
cf.innerHTML += ‘<option value="' + c + '">’ + c + ‘</option>’;
cs.innerHTML += ‘<option value="' + c + '">’ + c + ‘</option>’;
});

cf.addEventListener(‘change’, renderRoster);
document.getElementById(‘filterStatus’).addEventListener(‘change’, renderRoster);

document.getElementById(‘addHeroBtn’).addEventListener(‘click’, function(){
document.getElementById(‘addHeroForm’).classList.toggle(‘open’);
});
document.getElementById(‘addSampleBtn’).addEventListener(‘click’, addSampleHeroes);
document.getElementById(‘cancelHero’).addEventListener(‘click’, function(){
document.getElementById(‘addHeroForm’).classList.remove(‘open’);
});
document.getElementById(‘clearRoster’).addEventListener(‘click’, function(){
if (confirm(‘Clear all heroes?’)) { roster=[]; saveRoster(); renderRoster(); }
});
document.getElementById(‘saveHero’).addEventListener(‘click’, function(){
var posQ = document.getElementById(‘newPosQ’).value.split(’,’).map(function(s){return s.trim();}).filter(Boolean);
var negQ = document.getElementById(‘newNegQ’).value.split(’,’).map(function(s){return s.trim();}).filter(Boolean);
roster.push({
name:   document.getElementById(‘newName’).value.trim() || ‘Unnamed’,
cls:    document.getElementById(‘newClass’).value,
level:  parseInt(document.getElementById(‘newLevel’).value) || 0,
stress: parseInt(document.getElementById(‘newStress’).value) || 0,
status: document.getElementById(‘newStatus’).value,
posQ:   posQ, negQ: negQ
});
saveRoster();
renderRoster();
document.getElementById(‘addHeroForm’).classList.remove(‘open’);
document.getElementById(‘newName’).value   = ‘’;
document.getElementById(‘newStress’).value = ‘0’;
document.getElementById(‘newPosQ’).value   = ‘’;
document.getElementById(‘newNegQ’).value   = ‘’;
});
renderRoster();
}

// ── QUIRKS ─────────────────────────────────────────────────────
var QUIRK_CATS = {
general:‘General Stats’, conditional:‘Conditional’, light:‘Light-Related’,
region:‘Region-Specific’, monster:‘Monster-Specific’, resist:‘Resistances’,
curio:‘Curio Triggers’, town:‘Town Behaviour’
};
var REGION_COLORS = {ruins:’#c0a020’,weald:’#507a20’,warrens:’#a02040’,cove:’#5090c0’};

function regionTag(r)  {
var col = REGION_COLORS[r] || ‘#888’;
return ‘<span style="font-size:.6rem;padding:1px 5px;border:1px solid '+col+';color:'+col+';margin-right:3px;">’ + r + ‘</span>’;
}
function penaltyTag(r) {
return ‘<span style="font-size:.6rem;padding:1px 5px;border:1px solid var(--red-dim);color:var(--red-dim);margin-right:3px;">✕’ + r + ‘</span>’;
}

function renderQuirks() {
function renderGroup(quirks, isPos) {
var byCat = {};
quirks.forEach(function(q){ if (!byCat[q.category]) byCat[q.category]=[]; byCat[q.category].push(q); });
var out = ‘’;
Object.keys(QUIRK_CATS).forEach(function(key) {
var group = byCat[key];
if (!group) return;
var cards = group.map(function(q) {
var bonusR = (q.synergy && q.synergy.bonusRegions)   || [];
var penR   = (q.synergy && q.synergy.penaltyRegions) || [];
var kc     = q.keep===‘Lock’ ? ‘keep-yes’ : q.keep===‘Purge’ ? ‘keep-no’ : ‘keep-situational’;
var syn    = ‘’;
if (bonusR.length || penR.length) {
syn = ‘<div style="margin-top:5px;">’
+ bonusR.map(regionTag).join(’’)
+ penR.map(penaltyTag).join(’’)
+ ‘</div>’;
}
return ‘<div class="quirk-entry ' + (isPos ? 'pos' : 'neg') + '">’
+ ‘<div class="quirk-keep-label ' + kc + '">’ + q.keep + ‘</div>’
+ ‘<div class="quirk-entry-name">’ + q.name + ‘</div>’
+ ‘<div class="quirk-entry-effect">’ + q.effect + ‘</div>’
+ syn + ‘</div>’;
}).join(’’);

```
  out += '<div style="margin-bottom:18px;">'
    + '<div style="font-size:.68rem;color:var(--text-dim);letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid var(--border2);padding-bottom:5px;margin-bottom:8px;">'
    + QUIRK_CATS[key] + '</div>'
    + '<div class="quirk-grid">' + cards + '</div></div>';
});
return out;
```

}
document.getElementById(‘pos-quirks’).innerHTML = renderGroup(POS_QUIRKS, true);
document.getElementById(‘neg-quirks’).innerHTML = renderGroup(NEG_QUIRKS, false);
}

// ── ESTATE ─────────────────────────────────────────────────────
function renderEstate() {
var nameEl = document.getElementById(‘estateName’);
if (nameEl && !nameEl.value) nameEl.value = localStorage.getItem(‘dd-estate-name’) || ‘’;

var total = 0, maxT = 0;
BUILDINGS.forEach(function(b){
b.upgrades.forEach(function(u, ui){
total += getUpgradeLevel(b.id, ui);
maxT  += u.maxLevel;
});
});
var pct = Math.round((total / maxT) * 100);

document.getElementById(‘estate-summary’).innerHTML =
‘<div class="estate-stat"><div class="estate-stat-val">’ + total + ‘</div><div class="estate-stat-label">Upgrades Done</div></div>’
+ ‘<div class="estate-stat"><div class="estate-stat-val">’ + maxT  + ‘</div><div class="estate-stat-label">Total</div></div>’
+ ‘<div class="estate-stat"><div class="estate-stat-val">’ + pct   + ‘%</div><div class="estate-stat-label">Completion</div></div>’
+ ‘<div class="estate-stat"><div class="estate-stat-val">’ + (maxT-total) + ‘</div><div class="estate-stat-label">Remaining</div></div>’;

var html = ‘’;
BUILDINGS.forEach(function(b) {
var allMaxed = b.upgrades.every(function(u, ui){ return getUpgradeLevel(b.id, ui) >= u.maxLevel; });
var upgradeHtml = ‘’;
b.upgrades.forEach(function(u, ui) {
var lvl   = getUpgradeLevel(b.id, ui);
var isMax = lvl >= u.maxLevel;
var pips  = ‘’;
for (var pi = 0; pi < u.maxLevel; pi++) {
var filled = pi < lvl;
var isLast = pi === u.maxLevel - 1;
var cls    = filled ? (isLast && isMax ? ‘maxpip’ : ‘filled’) : ‘’;
var ttl    = ’Lvl ’ + (pi+1) + ’: ’ + (u.effects[pi] || ‘’);
pips += ‘<div class="pip ' + cls + '" onclick="pipClick(\'' + b.id + '\',' + ui + ',' + (pi+1) + ',' + u.maxLevel + ')" title="' + ttl + '"></div>’;
}
var effectText = u.effects[Math.max(0, lvl-1)] || ‘’;
upgradeHtml +=
‘<div class="upgrade-row">’
+ ‘<span class="upgrade-label">’ + u.label + ‘</span>’
+ ‘<div class="upgrade-pips">’ + pips + ‘</div>’
+ ‘<span style="font-size:.7rem;color:' + (isMax ? 'var(--gold)' : 'var(--text-dim)') + ';">’ + lvl + ‘/’ + u.maxLevel + ‘</span>’
+ ‘</div>’
+ ‘<div class="building-effect">’ + effectText
+ (!isMax ? ’<div class="building-cost">Next: Lvl ’ + (lvl+1) + ‘</div>’ : ‘’)
+ ‘</div>’;
});

```
html += '<div class="building-card' + (allMaxed ? ' maxed' : '') + '">'
  + '<div class="building-header">'
  + '<span class="building-icon">' + b.icon + '</span>'
  + '<span class="building-name">' + b.name + '</span>'
  + (allMaxed ? '<span class="building-maxed-badge">MAXED</span>' : '')
  + '</div>'
  + '<div class="upgrade-rows">' + upgradeHtml + '</div></div>';
```

});
document.getElementById(‘estate-grid’).innerHTML = html;
}

// ── BUILD ROUTE OPTIMIZER ──────────────────────────────────────
var STRATEGY_WEIGHTS = {
balanced: {survival:1.0,stress:1.0,speed:1.0,economy:0.8,darkest:1.0,quirks:0.9},
survival: {survival:2.0,stress:1.8,speed:0.7,economy:0.5,darkest:0.9,quirks:1.2},
speed:    {survival:0.8,stress:0.8,speed:2.0,economy:0.7,darkest:1.2,quirks:0.6},
economy:  {survival:0.8,stress:0.9,speed:0.8,economy:2.5,darkest:0.7,quirks:0.8},
darkest:  {survival:1.2,stress:1.0,speed:1.5,economy:0.6,darkest:3.0,quirks:1.0}
};

function weekUrgency(week, tag) {
if (week <= 10) {
if (tag===‘survival’) return 1.6;
if (tag===‘stress’)   return 1.5;
if (tag===‘economy’)  return 1.4;
if (tag===‘speed’)    return 1.2;
} else if (week <= 25) {
if (tag===‘darkest’)  return 1.4;
if (tag===‘speed’)    return 1.3;
if (tag===‘quirks’)   return 1.2;
} else {
if (tag===‘darkest’)  return 2.0;
}
return 1.0;
}

function computeRoute() {
var week     = parseInt(document.getElementById(‘routeWeek’).value)  || 1;
var strategy = document.getElementById(‘routeStrategy’).value;
var count    = parseInt(document.getElementById(‘routeCount’).value) || 10;
var weights  = STRATEGY_WEIGHTS[strategy] || STRATEGY_WEIGHTS.balanced;
var candidates = [];

BUILDINGS.forEach(function(b) {
b.upgrades.forEach(function(u, ui) {
var lvl = getUpgradeLevel(b.id, ui);
if (lvl >= u.maxLevel) return;
var score = u.priority * 10;
u.tags.forEach(function(tag){ score *= (weights[tag] || 1.0) * weekUrgency(week, tag); });
score *= (1 / (lvl + 1));
var tier = score>=60 ? ‘critical’ : score>=35 ? ‘high’ : score>=18 ? ‘medium’ : ‘low’;
candidates.push({
bName:b.name, bIcon:b.icon, uLabel:u.label,
nextLevel:lvl+1, maxLevel:u.maxLevel, effect:u.effects[lvl]||’’,
score:Math.round(score), tier:tier
});
});
});

candidates.sort(function(a,b){ return b.score - a.score; });
var shown = (count === 999) ? candidates : candidates.slice(0, count);
var crit  = candidates.filter(function(c){ return c.tier===‘critical’; }).length;
var highP = candidates.filter(function(c){ return c.tier===‘high’ || c.tier===‘critical’; }).length;

document.getElementById(‘route-summary’).innerHTML =
‘<div class="route-stat"><div class="route-stat-val">’ + candidates.length + ‘</div><div class="route-stat-label">Available</div></div>’
+ ‘<div class="route-stat"><div class="route-stat-val">’ + crit  + ‘</div><div class="route-stat-label">Critical</div></div>’
+ ‘<div class="route-stat"><div class="route-stat-val">’ + shown.length + ‘</div><div class="route-stat-label">Showing</div></div>’
+ ‘<div class="route-stat"><div class="route-stat-val">’ + highP + ‘</div><div class="route-stat-label">High+</div></div>’;

if (!shown.length) {
document.getElementById(‘route-queue’).innerHTML = ‘<div style="color:var(--gold);font-style:italic;padding:20px;text-align:center;">ALL BUILDINGS MAXED</div>’;
return;
}

var qhtml = shown.map(function(c, i){
return ‘<div class="queue-item priority-' + c.tier + '">’
+ ‘<div class="queue-rank">’ + (i+1) + ‘</div>’
+ ‘<div><div class="queue-building">’ + c.bIcon + ’ ’ + c.bName + ‘</div>’
+ ‘<div class="queue-upgrade">’ + c.uLabel + ’ → Lvl ’ + c.nextLevel + ‘/’ + c.maxLevel + ‘</div>’
+ ‘<div class="queue-reason">’ + c.effect + ‘</div></div>’
+ ‘<div><div class="priority-pill pill-' + c.tier + '">’ + c.tier + ‘</div>’
+ ‘<div style="font-size:.7rem;color:var(--text-dim);margin-top:4px;">’ + c.score + ‘</div></div>’
+ ‘</div>’;
}).join(’’);

var STRATEGY_TIPS = {
balanced:‘Balanced weights all categories equally.’,
survival:‘Survival: Abbey/Tavern stress, roster size, armor first.’,
speed:‘Speed: Guild skill tiers and Blacksmith weapons.’,
economy:‘Economy: Nomad Wagon rates and heirloom income.’,
darkest:‘Darkest prep: Champion weapon/skill tiers and Survivalist.’
};
var earlyNote = week <= 8 ? ’ Early game: stress slots and roster size are most urgent.’ : ‘’;
document.getElementById(‘route-queue’).innerHTML = qhtml
+ ‘<div class="route-tip"><strong>Strategy:</strong> ’ + (STRATEGY_TIPS[strategy]||’’) + earlyNote + ‘</div>’;
}

// ── CAMPAIGN OPTIMIZER ─────────────────────────────────────────
//   Properly integrates: roster data, estate state, DUNGEONS data
//   Replaces alert()-based skeleton with full card-based output

function getHeroScore(hero) {
// Composite readiness score: level*10, penalize stress
var base = hero.level * 10;
base -= hero.stress * 0.15;
// Bonus from positive quirks
if (hero.posQ && hero.posQ.length) base += hero.posQ.length * 2;
// Penalty from negative quirks
if (hero.negQ && hero.negQ.length) base -= hero.negQ.length * 1.5;
return Math.max(0, base);
}

function getBestTeam(region) {
// Filter to active heroes only
var active = roster.filter(function(h){ return h.status === ‘active’; });
if (!active.length) return [];
// Region-aware bonus: quirks with matching bonusRegions
var scored = active.map(function(h) {
var score = getHeroScore(h);
if (h.posQ) {
h.posQ.forEach(function(qName) {
var found = POS_QUIRKS.filter(function(q){ return q.name === qName; })[0];
if (found && found.synergy && found.synergy.bonusRegions && found.synergy.bonusRegions.indexOf(region) >= 0) {
score += 5;
}
});
}
if (h.negQ) {
h.negQ.forEach(function(qName) {
var found = NEG_QUIRKS.filter(function(q){ return q.name === qName; })[0];
if (found && found.synergy && found.synergy.penaltyRegions && found.synergy.penaltyRegions.indexOf(region) >= 0) {
score -= 8;
}
});
}
return { hero: h, score: score };
});
scored.sort(function(a,b){ return b.score - a.score; });
return scored.slice(0,4).map(function(s){ return s.hero; });
}

function getBestTeamScore(region) {
var team = getBestTeam(region);
if (!team.length) return 0;
return team.reduce(function(acc, h){ return acc + getHeroScore(h); }, 0);
}

function getEstateBonus() {
// How many blacksmith + guild upgrades done — proxy for readiness
var totalDone = 0;
[‘blacksmith’,‘guild’].forEach(function(bId){
var b = BUILDINGS.filter(function(x){ return x.id === bId; })[0];
if (b) b.upgrades.forEach(function(u, ui){ totalDone += getUpgradeLevel(bId, ui); });
});
return totalDone * 2; // small bonus per combat upgrade
}

function detectStressSpiral() {
var active = roster.filter(function(h){ return h.status === ‘active’; });
var high   = active.filter(function(h){ return h.stress > 80; });
return high.length;
}

function predictRunRisk(dungeon, teamScore) {
var baseDifficulty = dungeon.difficulty * 25;
var teamFactor     = Math.max(0, 60 - teamScore / 2);
var estateGap      = Math.max(0, 20 - getEstateBonus());
var riskScore      = baseDifficulty + teamFactor + estateGap;
if (dungeon.boss) riskScore += 20;
return Math.min(100, Math.round(riskScore));
}

function optimizeCampaign() {
var week     = parseInt(document.getElementById(‘campaignWeek’).value) || 1;
var priority = document.getElementById(‘campaignPriority’).value;
var count    = parseInt(document.getElementById(‘campaignCount’).value) || 5;

var active = roster.filter(function(h){ return h.status === ‘active’; });

// ── Roster preview panel ──────────────────────────────────
var rosterPanelHtml = ‘’;
if (active.length) {
var heroCards = active.map(function(h) {
var sc = stressColor(h.stress);
return ‘<div class="roster-mini-card">’
+ ‘<div class="roster-mini-name">’ + h.name + ‘</div>’
+ ‘<div class="roster-mini-stats">’ + h.cls + ’ · Lv’ + h.level
+ ’ · <span style="color:' + sc + '">Stress ’ + h.stress + ‘</span></div></div>’;
}).join(’’);
rosterPanelHtml = ‘<div class="roster-panel"><h4>Active Party Pool (’ + active.length + ’ heroes)</h4>’
+ ‘<div class="roster-panel-heroes">’ + heroCards + ‘</div></div>’;
} else {
rosterPanelHtml = ‘<div class="roster-panel" style="border-color:var(--red-dim);">’
+ ‘<h4>No Active Heroes</h4>’
+ ‘<p style="font-size:.82rem;color:var(--text-dim);margin-top:4px;">Add heroes in the Roster tab to get personalized recommendations.</p></div>’;
}
document.getElementById(‘campaign-roster-panel’).innerHTML = rosterPanelHtml;

// ── Stress spiral warning ─────────────────────────────────
var spiralCount = detectStressSpiral();
var riskPanel   = ‘’;
if (spiralCount >= 3) {
riskPanel = ‘<div style="margin-bottom:16px;padding:12px 16px;background:rgba(122,21,21,.15);border:1px solid var(--red-dim);border-left:3px solid var(--red);">’
+ ‘<strong style="color:var(--red);font-size:.78rem;letter-spacing:1px;">⚠ STRESS SPIRAL RISK</strong>’
+ ‘<div style="font-size:.82rem;color:var(--text-dim);margin-top:4px;">’ + spiralCount + ’ heroes above 80 stress. Prioritize short dungeons and stress recovery before boss attempts.</div></div>’;
} else if (spiralCount > 0) {
riskPanel = ‘<div style="margin-bottom:16px;padding:12px 16px;background:rgba(197,160,89,.04);border:1px solid var(--border);">’
+ ‘<strong style="color:var(--gold-dim);font-size:.78rem;letter-spacing:1px;">⚠ ’ + spiralCount + ’ hero(es) at high stress</strong>’
+ ‘<div style="font-size:.82rem;color:var(--text-dim);margin-top:4px;">Consider Abbey or Tavern treatment before a long dungeon.</div></div>’;
}
document.getElementById(‘campaign-risk-panel’).innerHTML = riskPanel;

// ── Score each dungeon ────────────────────────────────────
var results = DUNGEONS.map(function(d) {
var teamScore  = active.length ? getBestTeamScore(d.region) : 20;
var bestTeam   = getBestTeam(d.region);
var risk       = predictRunRisk(d, teamScore);
var goldVal    = d.rewards.gold    / 100;
var heirloomVal= d.rewards.heirlooms * 4;
var levelVal   = Math.max(0, 30 - teamScore); // more value in leveling weak teams

```
var value = goldVal + heirloomVal;
if (d.boss) value *= 1.6;
if (week < 10) value *= 1.2;

// Priority weighting
if (priority === 'gold')      value = goldVal * 3 + heirloomVal * 0.5;
if (priority === 'heirlooms') value = goldVal * 0.5 + heirloomVal * 3;
if (priority === 'safety')    value = Math.max(0, 150 - risk * 1.5);
if (priority === 'speed')     value = levelVal * 2 + goldVal;

var finalScore = Math.round(value - risk * 0.4);

var riskLabel = risk < 35 ? 'low' : risk < 65 ? 'medium' : 'high';

return {
  dungeon:    d,
  teamScore:  Math.round(teamScore),
  bestTeam:   bestTeam,
  risk:       risk,
  riskLabel:  riskLabel,
  goldVal:    Math.round(goldVal),
  heirloomVal:Math.round(heirloomVal),
  score:      finalScore
};
```

});

results.sort(function(a,b){ return b.score - a.score; });
var shown = (count === 999) ? results : results.slice(0, count);

if (!shown.length) {
document.getElementById(‘campaign-output’).innerHTML = ‘<div style="color:var(--text-dim);font-style:italic;padding:20px;">No dungeons available.</div>’;
return;
}

document.getElementById(‘campaign-output’).innerHTML = shown.map(function(r, i) {
var d         = r.dungeon;
var rankClass = i===0 ? ‘rank-1’ : i===1 ? ‘rank-2’ : i===2 ? ‘rank-3’ : ‘rank-other’;
var teamStr   = r.bestTeam.length
? r.bestTeam.map(function(h){ return h.name; }).join(’ · ’)
: ‘No heroes — add roster first’;
var diffLabel = d.difficulty===1 ? ‘Short’ : d.difficulty===2 ? ‘Medium’ : ‘Long’;

```
return '<div class="campaign-card ' + rankClass + '">'
  + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">'
  + '<span style="font-size:.65rem;color:var(--text-dim);letter-spacing:2px;text-transform:uppercase;">#' + (i+1) + '</span>'
  + (d.boss ? '<span class="campaign-boss-badge">BOSS</span>' : '<span style="font-size:.65rem;color:var(--text-dim);">' + diffLabel + '</span>')
  + '</div>'
  + '<div class="campaign-card-name">' + d.name + '</div>'
  + '<div style="font-size:.72rem;color:var(--text-dim);text-transform:capitalize;margin-bottom:8px;">' + d.region + ' Region</div>'
  + '<div class="campaign-card-scores">'
  + '<div class="campaign-score-item"><div class="campaign-score-val score-positive">' + r.score + '</div><div class="campaign-score-label">Score</div></div>'
  + '<div class="campaign-score-item"><div class="campaign-score-val" style="color:var(--gold-dim);">' + d.rewards.gold.toLocaleString() + 'g</div><div class="campaign-score-label">Gold</div></div>'
  + '<div class="campaign-score-item"><div class="campaign-score-val" style="color:#8090c0;">' + d.rewards.heirlooms + '</div><div class="campaign-score-label">Heirlooms</div></div>'
  + '<div class="campaign-score-item"><div class="campaign-score-val ' + (r.risk>65?'score-negative':'') + '">' + r.risk + '%</div><div class="campaign-score-label">Risk</div></div>'
  + '</div>'
  + '<div class="risk-indicator risk-' + r.riskLabel + '">' + r.riskLabel + ' risk</div>'
  + '<div class="campaign-team-preview">Best Team: ' + teamStr + '</div>'
  + '</div>';
```

}).join(’’);
}

// ── DATA EXPORT / IMPORT ───────────────────────────────────────
function exportData() {
var data = {
roster:    roster,
estate:    estateState,
name:      localStorage.getItem(‘dd-estate-name’) || ‘’,
timestamp: new Date().toISOString()
};
var str = JSON.stringify(data, null, 2);
if (navigator.clipboard && navigator.clipboard.writeText) {
navigator.clipboard.writeText(str)
.then(function(){ alert(‘Copied to clipboard! Paste into a note to save.’); })
.catch(function(){ fallbackCopy(str); });
} else { fallbackCopy(str); }
}

function fallbackCopy(str) {
var ta = document.createElement(‘textarea’);
ta.value = str; ta.style.position=‘fixed’; ta.style.opacity=‘0’;
document.body.appendChild(ta); ta.select();
try { document.execCommand(‘copy’); alert(‘Copied to clipboard!’); }
catch(e) { alert(‘Copy failed. Use Download instead.’); }
document.body.removeChild(ta);
}

function downloadData() {
var data = {
roster:    roster,
estate:    estateState,
name:      localStorage.getItem(‘dd-estate-name’) || ‘’,
timestamp: new Date().toISOString()
};
var blob = new Blob([JSON.stringify(data, null, 2)], {type:‘application/json’});
var url  = URL.createObjectURL(blob);
var a    = document.createElement(‘a’);
a.href = url; a.download = ‘dd-estate-save.json’; a.click();
URL.revokeObjectURL(url);
}

function importData() {
var json = document.getElementById(‘importArea’).value.trim();
if (!json) { alert(‘Nothing to import.’); return; }
try {
var data = JSON.parse(json);
if (data.roster) { roster = data.roster; saveRoster(); }
if (data.estate) { estateState = data.estate; saveEstate(); }
if (data.name)   { localStorage.setItem(‘dd-estate-name’, data.name); }
alert(‘Import successful! Switching tabs will reload with your data.’);
initialized = {};
document.getElementById(‘importArea’).value = ‘’;
if (document.getElementById(‘estate-grid’)) renderEstate();
if (document.getElementById(‘rosterGrid’))  renderRoster();
} catch(e) { alert(‘Invalid JSON. Please check and try again.’); }
}

function nukeAll() {
if (confirm(‘This will permanently delete all saved data. Are you sure?’)) {
localStorage.removeItem(‘dd-roster’);
localStorage.removeItem(‘dd-estate’);
localStorage.removeItem(‘dd-estate-name’);
roster = []; estateState = {};
alert(‘All data cleared.’);
initialized = {};
if (document.getElementById(‘estate-grid’)) renderEstate();
if (document.getElementById(‘rosterGrid’))  renderRoster();
}
}

// ── TAB SWITCHING ──────────────────────────────────────────────
function switchTab(id) {
document.querySelectorAll(’.nav-tab’).forEach(function(b){
b.classList.toggle(‘active’, b.dataset.tab === id);
});
document.querySelectorAll(’.tab-pane’).forEach(function(p){
p.classList.toggle(‘active’, p.id === ‘tab-’ + id);
});

if (!initialized[id]) {
if      (id === ‘ruins’)       { renderRegion(‘ruins’); }
else if (id === ‘weald’)       { renderRegion(‘weald’); }
else if (id === ‘warrens’)     { renderRegion(‘warrens’); }
else if (id === ‘cove’)        { renderRegion(‘cove’); }
else if (id === ‘bosses’)      { renderBosses(); }
else if (id === ‘darkest’)     { renderDarkest(); }
else if (id === ‘provisions’)  { renderProvisions(); }
else if (id === ‘roster’)      { initRoster(); }
else if (id === ‘quirks’)      { renderQuirks(); }
else if (id === ‘estate’)      { renderEstate(); }
else if (id === ‘buildroute’)  { renderEstate(); computeRoute(); }
else if (id === ‘campaign’)    { optimizeCampaign(); }
else if (id === ‘data’)        { /* static HTML */ }
initialized[id] = true;
}
}

// ── PROVISION TAB CLICKS ───────────────────────────────────────
document.addEventListener(‘click’, function(e) {
var pt = e.target.closest(’.prov-tab[data-prov]’);
if (pt) {
document.querySelectorAll(’.prov-tab[data-prov]’).forEach(function(b){ b.classList.remove(‘active’); });
pt.classList.add(‘active’);
activeProv = pt.dataset.prov;
renderProvisions();
}
});

// ── NAV CLICK HANDLER ──────────────────────────────────────────
document.getElementById(‘mainNav’).addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-tab]’);
if (btn) switchTab(btn.dataset.tab);
});

// ── INIT ───────────────────────────────────────────────────────
renderRegion(‘ruins’);
initialized[‘ruins’] = true;