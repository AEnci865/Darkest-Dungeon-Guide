// ============================================================
//  app.js — Darkest Dungeon Estate Optimizer
// ============================================================

// -- STATE --
var roster      = JSON.parse(localStorage.getItem('dd-roster')  || '[]');
var estateState = JSON.parse(localStorage.getItem('dd-estate')  || '{}');
var subsState   = {};
var activeProv        = 'short';
var activeProvRegion  = 'ruins';
var initialized = {};

// -- PERSISTENCE HELPERS --
function saveRoster()    { localStorage.setItem('dd-roster',  JSON.stringify(roster));      }
function saveEstate()    { localStorage.setItem('dd-estate',  JSON.stringify(estateState)); }
function saveEstateName(){ localStorage.setItem('dd-estate-name', document.getElementById('estateName').value); }

// -- MISC HELPERS --
function stressColor(s) {
    return s < 50 ? '#80c060' : s < 100 ? '#c5a059' : s < 150 ? '#c08020' : '#cc2222';
}

function getUpgradeLevel(bId, uIdx) { return estateState[bId + '*' + uIdx] || 0; }
function setUpgradeLevel(bId, uIdx, level) {
    estateState[bId + '*' + uIdx] = level;
    saveEstate();
    renderEstate();
    if (initialized['buildroute']) computeRoute();
}

function pipClick(bId, uIdx, clicked, maxLevel) {
    var cur = getUpgradeLevel(bId, uIdx);
    var nv  = (cur === clicked) ? clicked - 1 : clicked;
    setUpgradeLevel(bId, uIdx, Math.max(0, Math.min(maxLevel, nv)));
}

function resetEstate() {
    if (confirm('Reset all building levels to 0?')) {
        estateState = {};
        saveEstate();
        renderEstate();
        if (initialized['buildroute']) computeRoute();
    }
}

// -- REGION TEAMS --
function renderRegion(rk) {
    var region = REGIONS[rk];
    var intel  = REGION_INTEL[rk];
    if (!region || !intel) return;
    if (!subsState[rk]) subsState[rk] = {1:false,2:false,3:false,4:false};

    var subEl = document.getElementById(rk + '-subtitle');
    if (subEl) subEl.textContent = intel.subtitle;

    var tipsEl = document.getElementById(rk + '-tips');
    if (tipsEl) {
        tipsEl.innerHTML = '<h4>Region Intelligence</h4><ul>'
        + intel.tips.map(function(t){ return '<li>' + t + '</li>'; }).join('')
        + '</ul>';
    }

    var grid = document.getElementById(rk + '-team');
    if (!grid) return;

    var positions  = [4,3,2,1];
    var posLabels  = {4:'Position 4 (Back)',3:'Position 3',2:'Position 2',1:'Position 1 (Front)'};
    var html = '';
    positions.forEach(function(pos) {
        var hero   = region[pos];
        var isSub  = subsState[rk][pos];
        var name   = isSub ? hero.sub  : hero.main;
        var skills = isSub ? hero.sS   : hero.mS;
        var skillsHtml = skills.map(function(s){
            return '<div style="font-size:.82rem;color:var(--text-dim);line-height:1.8;font-style:italic;">' + s + '</div>';
        }).join('');

        html += '<div>'
          + '<div class="pos-label">' + posLabels[pos] + '</div>'
          + '<div class="hero-card' + (isSub ? ' subbed' : '') + '">'
          + '<div class="hero-name' + (isSub ? ' sub-active' : '') + '">' + name + '</div>'
          + '<div class="skills-list">' + skillsHtml + '</div>'
          + '<button class="swap-btn' + (isSub ? ' subbed' : '') + '" onclick="toggleSub(\'' + rk + '\',' + pos + ')">'
          + (isSub ? 'Back to Main' : 'Sub: ' + hero.sub)
          + '</button></div></div>';
    });
    grid.innerHTML = html;
}

function toggleSub(rk, pos) {
    if (!subsState[rk]) subsState[rk] = {};
    subsState[rk][pos] = !subsState[rk][pos];
    renderRegion(rk);
}

// -- BOSSES --
function renderBosses() {
    var el   = document.getElementById('boss-list');
    var html = '';
    BOSSES.forEach(function(b, i) {
        var mechHtml  = b.mechanics.map(function(m){ return '<li>' + m + '</li>'; }).join('');
        var teamsHtml = b.teams.map(function(t){
            return '<div class="team-rec"><div class="team-rec-label">' + t.label + ' Team</div>'
            + '<div class="team-rec-heroes">' + t.heroes + '</div></div>';
        }).join('');
        var avoidHtml = b.avoid.map(function(a){
            var isCrit = (a.indexOf('CRITICAL') >= 0 || a.indexOf('NEVER') >= 0);
            return '<li' + (isCrit ? ' class="warn"' : '') + '>' + a + '</li>';
        }).join('');

        html += '<div class="boss-card">'
          + '<div class="boss-header" onclick="toggleBoss(' + i + ')">'
          + '<div><div class="boss-name">' + b.name + '</div>'
          + '<div class="boss-region">' + b.region + ' - ' + b.tiers + '</div></div>'
          + '<div class="chevron" id="chev-' + i + '">&#9658;</div></div>'
          + '<div class="boss-body" id="boss-body-' + i + '">'
          + '<div class="boss-section"><h4>Mechanics &amp; Priority</h4><ul>' + mechHtml + '</ul>' + teamsHtml + '</div>'
          + '<div class="boss-section"><h4>Avoid / Watch For</h4><ul>' + avoidHtml + '</ul></div>'
          + '</div></div>';
    });
    el.innerHTML = html;
}

function toggleBoss(i) {
    var body = document.getElementById('boss-body-' + i);
    var chev = document.getElementById('chev-' + i);
    var isOpen = body.classList.contains('open');
    document.querySelectorAll('.boss-body').forEach(function(b){ b.classList.remove('open'); });
    document.querySelectorAll('.chevron').forEach(function(c){ c.classList.remove('open'); });
    if (!isOpen) { body.classList.add('open'); chev.classList.add('open'); }
}

// -- DARKEST DUNGEON --
function renderDarkest() {
    var el   = document.getElementById('dd-list');
    var html = '';
    DD_RUNS.forEach(function(r) {
        var keyHtml   = r.key.map(function(k){ return '<li>' + k + '</li>'; }).join('');
        var watchHtml = r.watch.map(function(w){ return '<li>' + w + '</li>'; }).join('');
        html += '<div class="dd-card">'
        + '<div class="dd-card-title">' + r.name + '</div>'
        + '<div style="color:var(--text-dim);font-style:italic;font-size:.82rem;margin-bottom:10px;">' + r.desc + '</div>'
        + '<div class="dd-team"><div class="dd-team-label">Recommended Team</div><div class="dd-team-val">' + r.team + '</div></div>'
        + '<div class="dd-grid">'
        + '<div class="dd-col"><h4>Key Tactics</h4><ul>' + keyHtml + '</ul></div>'
        + '<div class="dd-col"><h4>Watch For</h4><ul>'   + watchHtml + '</ul></div>'
        + '</div></div>';
    });
    el.innerHTML = html;
}

// -- PROVISIONS --
function renderProvisions() {
    var p     = PROVISIONS[activeProv];
    var items = p.regions[activeProvRegion] || p.regions.ruins;
    var regBtns = ['ruins','weald','warrens','cove'].map(function(r){
        return '<button class="prov-tab' + (activeProvRegion===r?' active':'')
        + '" onclick="setProvRegion(\'' + r + '\')">' + r + '</button>';
    }).join('');

    var rows = items.map(function(item){
        return '<tr><td>' + item[0] + '</td><td>' + item[1] + '</td><td>' + item[2] + '</td></tr>';
    }).join('');

    document.getElementById('prov-content').innerHTML =
    '<div style="display:flex;gap:6px;margin-bottom:12px;">' + regBtns + '</div>'
    + '<table class="prov-table"><thead><tr><th>Item</th><th>Qty</th><th>Notes</th></tr></thead><tbody>' + rows + '</tbody></table>';
}

function setProvRegion(r) { activeProvRegion = r; renderProvisions(); }

// -- ROSTER --
function renderRoster() {
    var fc    = document.getElementById('filterClass').value;
    var fs    = document.getElementById('filterStatus').value;
    var grid  = document.getElementById('rosterGrid');
    var heroes = roster.filter(function(h){
        return (!fc || h.cls === fc) && (!fs || h.status === fs);
    });

    grid.innerHTML = heroes.map(function(h) {
        var sc  = stressColor(h.stress);
        var idx = roster.indexOf(h);
        return '<div class="roster-card' + (h.status==='dead' ? ' dead' : '') + '">'
          + '<div>Lv' + h.level + ' <strong>' + h.name + '</strong> (' + h.cls + ')</div>'
          + '<div style="color:' + sc + '">Stress: ' + h.stress + '</div>'
          + '<button onclick="deleteHero(' + idx + ')">Delete</button></div>';
    }).join('');
}

function deleteHero(i) { roster.splice(i,1); saveRoster(); renderRoster(); }

function initRoster() {
    var cs = document.getElementById('newClass');
    CLASSES.forEach(function(c){
        cs.innerHTML += '<option value="' + c + '">' + c + '</option>';
        document.getElementById('filterClass').innerHTML += '<option value="' + c + '">' + c + '</option>';
    });

    document.getElementById('addHeroBtn').addEventListener('click', function(){
        document.getElementById('addHeroForm').classList.toggle('open');
    });

    document.getElementById('saveHero').addEventListener('click', function(){
        roster.push({
            name:   document.getElementById('newName').value || 'Unnamed',
            cls:    document.getElementById('newClass').value,
            level:  parseInt(document.getElementById('newLevel').value) || 0,
            stress: parseInt(document.getElementById('newStress').value) || 0,
            status: document.getElementById('newStatus').value,
            posQ: [], negQ: []
        });
        saveRoster();
        renderRoster();
    });
    renderRoster();
}

// -- QUIRKS --
function renderQuirks() {
    var posHtml = POS_QUIRKS.map(function(q){ return '<div><strong>' + q.name + '</strong>: ' + q.effect + '</div>'; }).join('');
    var negHtml = NEG_QUIRKS.map(function(q){ return '<div><strong>' + q.name + '</strong>: ' + q.effect + '</div>'; }).join('');
    document.getElementById('pos-quirks').innerHTML = '<h3>Positive</h3>' + posHtml;
    document.getElementById('neg-quirks').innerHTML = '<h3>Negative</h3>' + negHtml;
}

// -- ESTATE --
function renderEstate() {
    var html = '';
    BUILDINGS.forEach(function(b) {
        var upgradeHtml = '';
        b.upgrades.forEach(function(u, ui) {
            var lvl = getUpgradeLevel(b.id, ui);
            upgradeHtml += '<div>' + u.label + ': ' + lvl + '/' + u.maxLevel + ' <button onclick="pipClick(\'' + b.id + '\',' + ui + ',' + (lvl+1) + ',' + u.maxLevel + ')">+</button></div>';
        });
        html += '<div class="building-card"><strong>' + b.name + '</strong>' + upgradeHtml + '</div>';
    });
    document.getElementById('estate-grid').innerHTML = html;
}

// -- BUILD ROUTE --
function computeRoute() {
    var strategy = document.getElementById('routeStrategy').value;
    var html = 'Optimization for ' + strategy + ' strategy generated.';
    document.getElementById('route-queue').innerHTML = html;
}

// -- CAMPAIGN --
function optimizeCampaign() {
    var active = roster.filter(function(h){ return h.status === 'active'; });
    var html = 'Found ' + active.length + ' active heroes. Recommended dungeon: Ruins (Level 1).';
    document.getElementById('campaign-output').innerHTML = html;
}

// -- DATA --
function exportData() {
    var str = JSON.stringify({roster:roster, estate:estateState});
    document.getElementById('importArea').value = str;
    alert('Data exported to textarea below.');
}

function importData() {
    try {
        var data = JSON.parse(document.getElementById('importArea').value);
        roster = data.roster || [];
        estateState = data.estate || {};
        saveRoster(); saveEstate();
        alert('Import successful!');
        location.reload();
    } catch(e) { alert('Invalid JSON'); }
}

function nukeAll() {
    if(confirm('Wipe everything?')) { localStorage.clear(); location.reload(); }
}

// -- TAB SWITCHING --
function switchTab(id) {
    document.querySelectorAll('.nav-tab').forEach(function(b){
        b.classList.toggle('active', b.dataset.tab === id);
    });
    document.querySelectorAll('.tab-pane').forEach(function(p){
        p.classList.toggle('active', p.id === 'tab-' + id);
    });

    if (!initialized[id]) {
        if      (id === 'ruins')       { renderRegion('ruins'); }
        else if (id === 'bosses')      { renderBosses(); }
        else if (id === 'darkest')     { renderDarkest(); }
        else if (id === 'provisions')  { renderProvisions(); }
        else if (id === 'roster')      { initRoster(); }
        else if (id === 'quirks')      { renderQuirks(); }
        else if (id === 'estate')      { renderEstate(); }
        else if (id === 'campaign')    { optimizeCampaign(); }
        initialized[id] = true;
    }
}

// -- INIT --
document.getElementById('mainNav').addEventListener('click', function(e) {
    var btn = e.target.closest('[data-tab]');
    if (btn) switchTab(btn.dataset.tab);
});

renderRegion('ruins');
initialized['ruins'] = true;
