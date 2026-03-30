// Darkest Dungeon Estate Guide - Full Plug & Play Version

// –– STATE ––
var roster = JSON.parse(localStorage.getItem('dd-roster') || '[]');
var subsState = {};
var estateState = JSON.parse(localStorage.getItem('dd-estate') || '{}');
var activeProv = 'short';
var activeProvRegion = 'ruins';
var activeTeam = {ruins:0, weald:0, warrens:0, cove:0};
var initialized = {};

// –– HELPERS ––
function stressColor(s) {
    return s < 50 ? '#80c060' : s < 100 ? '#c5a059' : s < 150 ? '#c08020' : '#cc2222';
}

function saveRoster() { 
    localStorage.setItem('dd-roster', JSON.stringify(roster)); 
}

function saveEstate() { 
    localStorage.setItem('dd-estate', JSON.stringify(estateState)); 
}

function saveEstateName() { 
    localStorage.setItem('dd-estate-name', document.getElementById('estateName').value); 
}

function getUpgradeLevel(bId, uIdx) { 
    return estateState[bId + '*' + uIdx] || 0; 
}

function setUpgradeLevel(bId, uIdx, level) {
    estateState[bId + '*' + uIdx] = level;
    saveEstate();
    renderEstate();
    if (initialized['buildroute']) computeRoute();
}

function pipClick(bId, uIdx, clicked, maxLevel) {
    var cur = getUpgradeLevel(bId, uIdx);
    var nv = cur === clicked ? clicked - 1 : clicked;
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

// –– REGION TEAMS ––
function renderRegion(rk) {
    var region = REGIONS[rk];
    if (!region) return;
    var teamIdx = activeTeam[rk] || 0;
    var team = region.teams[teamIdx];
    if (!team) return;
    if (!subsState[rk]) subsState[rk] = {1:false,2:false,3:false,4:false};
    var grid = document.getElementById(rk + '-team');
    if (!grid) return;

    var positions = [4,3,2,1];
    var posLabels = {4:'Position 4 (Back)',3:'Position 3',2:'Position 2',1:'Position 1 (Front)'};

    var teamBtns = region.teams.map(function(t, i) {
        var isActive = i === teamIdx;
        return '<button onclick="switchTeam(\'' + rk + '\',' + i + ')" style="' +
            'padding:5px 12px;font-size:.65rem;letter-spacing:1px;text-transform:uppercase;cursor:pointer;' +
            'font-family:\'Cinzel Decorative\',serif;transition:all .2s;' +
            (isActive ? 'background:linear-gradient(135deg,#1a1308,#0d0b0b);border:1px solid var(--gold);color:var(--gold);' :
                        'background:var(--panel);border:1px solid var(--border);color:var(--text-dim);') +
            '">' + t.label + '</button>';
    }).join('');

    var html = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">' + teamBtns + '</div>';
    html += '<div class="team-grid">';
    positions.forEach(function(pos) {
        var hero = team[pos];
        var isSub = subsState[rk][pos];
        var name = isSub ? hero.sub : hero.main;
        var skills = isSub ? hero.sS : hero.mS;
        var skillsHtml = skills.map(function(s) {
            return '<div style="font-size:.82rem;color:var(--text-dim);line-height:1.8;font-style:italic;">' + s + '</div>';
        }).join('');
        html += '<div>' +
                '<div class="pos-label">' + posLabels[pos] + '</div>' +
                '<div class="hero-card' + (isSub ? ' subbed' : '') + '">' +
                    '<div class="hero-name' + (isSub ? ' sub-active' : '') + '">' + name + '</div>' +
                    '<div class="skills-list">' + skillsHtml + '</div>' +
                    '<button class="swap-btn' + (isSub ? ' subbed' : '') + '" onclick="toggleSub(\'' + rk + '\',' + pos + ')">' +
                        (isSub ? 'Back to Main' : 'Sub: ' + hero.sub) +
                    '</button>' +
                '</div></div>';
    });
    html += '</div>';
    grid.innerHTML = html;
}

function switchTeam(rk, idx) {
    activeTeam[rk] = idx;
    subsState[rk] = {1:false,2:false,3:false,4:false};
    renderRegion(rk);
}

function toggleSub(rk, pos) {
    if (!subsState[rk]) subsState[rk] = {};
    subsState[rk][pos] = !subsState[rk][pos];
    renderRegion(rk);
}

// –– BOSSES ––
function renderBosses() {
    var el = document.getElementById('boss-list');
    var html = '';
    BOSSES.forEach(function(b, i) {
        var mechHtml = b.mechanics.map(function(m){ return '<li>' + m + '</li>'; }).join('');
        var teamsHtml = b.teams.map(function(t){ 
            return '<div class="team-rec"><div class="team-rec-label">' + t.label + ' Team</div><div class="team-rec-heroes">' + t.heroes + '</div></div>'; 
        }).join('');
        var avoidHtml = b.avoid.map(function(a){
            return '<li class="' + (a.indexOf('CRITICAL') >= 0 || a.indexOf('NEVER') >= 0 ? 'warn' : '') + '">' + a + '</li>';
        }).join('');
        html += '<div class="boss-card">' +
                    '<div class="boss-header" onclick="toggleBoss(' + i + ')">' +
                        '<div><div class="boss-name">' + b.name + '</div><div class="boss-region">' + b.region + ' — ' + b.tiers + '</div></div>' +
                        '<div class="chevron" id="chev-' + i + '">▶</div>' +
                    '</div>' +
                    '<div class="boss-body" id="boss-body-' + i + '">' +
                        '<div class="boss-section"><h4>Mechanics & Priority</h4><ul>' + mechHtml + '</ul>' + teamsHtml + '</div>' +
                        '<div class="boss-section"><h4>Avoid / Watch For</h4><ul>' + avoidHtml + '</ul></div>' +
                    '</div>' +
                '</div>';
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

// –– ESTATE BUILDINGS ––
function renderEstate() {
    var container = document.getElementById('estate-container');
    var html = '';
    Object.keys(BUILDINGS).forEach(function(bId) {
        var b = BUILDINGS[bId];
        var upgradesHtml = b.upgrades.map(function(up, idx) {
            var level = getUpgradeLevel(bId, idx);
            var pips = '';
            for (var i = 1; i <= up.maxLevel; i++) {
                pips += '<span class="pip' + (i <= level ? ' active' : '') + '" onclick="pipClick(\'' + bId + '\',' + idx + ',' + i + ',' + up.maxLevel + ')"></span>';
            }
            return '<div class="upgrade">' +
                    '<div class="upgrade-name">' + up.name + '</div>' +
                    '<div class="pips">' + pips + '</div>' +
                   '</div>';
        }).join('');
        html += '<div class="building">' +
                    '<div class="building-name">' + b.name + '</div>' +
                    '<div class="upgrades">' + upgradesHtml + '</div>' +
                '</div>';
    });
    container.innerHTML = html;
}

// –– PROVISIONS ––
function renderProvisions() {
    var container = document.getElementById('prov-list');
    if (!container) return;
    var provs = PROVISIONS[activeProvRegion][activeProv];
    var html = provs.map(function(p){
        return '<div class="prov-item">' +
                '<div class="prov-name">' + p.name + '</div>' +
                '<div class="prov-cost">' + p.cost + '</div>' +
               '</div>';
    }).join('');
    container.innerHTML = html;
}

// –– INIT ––
function init() {
    ['ruins','weald','warrens','cove'].forEach(renderRegion);
    renderBosses();
    renderEstate();
    renderProvisions();
    initialized['buildroute'] = true;
}

window.onload = init;