// ============================================================
//  app.js — Darkest Dungeon Estate Optimizer (CORE LOGIC)
// ============================================================

// -- STATE --
var roster      = JSON.parse(localStorage.getItem('dd-roster')  || '[]');
var estateState = JSON.parse(localStorage.getItem('dd-estate')  || '{}');
var subsState   = {};
var activeProvLevel = 'short'; // Matches data.js: PROVISIONS.short
var initialized = {};

// -- PERSISTENCE HELPERS --
function saveRoster()    { localStorage.setItem('dd-roster',  JSON.stringify(roster));      }
function saveEstate()    { localStorage.setItem('dd-estate',  JSON.stringify(estateState)); }

// -- REGION RENDERING (Handles Ruins, Weald, Warrens, Cove, Courtyard, Farmstead) --
function renderRegion(rk) {
    var region = REGIONS[rk];
    var intel  = REGION_INTEL[rk];
    
    if (!region || !intel) return;

    if (!subsState[rk]) subsState[rk] = {1:false,2:false,3:false,4:false};

    // Update Text Elements
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
    var html = '';
    
    positions.forEach(function(pos) {
        var data = region[pos];
        if (!data) return;

        var isSub  = subsState[rk][pos];
        var name   = isSub ? data.sub  : data.main;
        var skills = isSub ? data.sS   : data.mS;
        
        var skillsHtml = skills.map(function(s){
            return '<div class="skill-item">' + s + '</div>';
        }).join('');

        html += '<div class="pos-container">'
          + '<div class="hero-card' + (isSub ? ' subbed' : '') + '">'
          + '<div class="hero-name">' + name + '</div>'
          + '<div class="skills-list">' + skillsHtml + '</div>'
          + '<button class="swap-btn" onclick="toggleSub(\'' + rk + '\',' + pos + ')">'
          + (isSub ? 'Main: ' + data.main : 'Sub: ' + data.sub)
          + '</button></div></div>';
    });
    grid.innerHTML = html;
}

function toggleSub(rk, pos) {
    subsState[rk][pos] = !subsState[rk][pos];
    renderRegion(rk);
}

// -- PROVISIONS RENDERING --
function renderProvisions() {
    var content = document.getElementById('prov-content');
    if (!content) return;

    var levelData = PROVISIONS[activeProvLevel];
    var html = '<div class="prov-grid">';

    for (var reg in levelData.regions) {
        html += '<div class="prov-card"><h3>' + reg.toUpperCase() + '</h3><ul>';
        levelData.regions[reg].forEach(function(item) {
            html += '<li><strong>' + item[1] + 'x</strong> ' + item[0] + '</li>';
        });
        html += '</ul></div>';
    }
    html += '</div>';
    content.innerHTML = html;
}

// -- BOSS COMPENDIUM RENDERING --
function renderBosses() {
    var mainList = document.getElementById('boss-list');
    var specList = document.getElementById('special-boss-list');

    if (mainList) {
        mainList.innerHTML = BOSSES.map(function(b) {
            return '<div class="boss-card"><h3>' + b.name + '</h3>'
            + '<p><strong>Region:</strong> ' + b.region + '</p>'
            + '<p><strong>Avoid:</strong> ' + b.avoid.join(', ') + '</p></div>';
        }).join('');
    }

    if (specList && typeof SPECIAL_BOSSES !== 'undefined') {
        specList.innerHTML = SPECIAL_BOSSES.map(function(b) {
            return '<div class="boss-card special"><h3>' + b.name + '</h3>'
            + '<p>' + b.mechanics[0] + '</p></div>';
        }).join('');
    }
}

// -- DARKEST DUNGEON RENDERING --
function renderDarkest() {
    var ddList = document.getElementById('dd-list');
    if (!ddList) return;

    ddList.innerHTML = DD_RUNS.map(function(run) {
        return '<div class="dd-card"><h3>' + run.name + '</h3>'
        + '<p><em>' + run.desc + '</em></p>'
        + '<p><strong>Team:</strong> ' + run.team + '</p></div>';
    }).join('');
}

// -- QUIRK REFERENCE --
function renderQuirks() {
    var posEl = document.getElementById('pos-quirks');
    var negEl = document.getElementById('neg-quirks');

    if (posEl) {
        posEl.innerHTML = '<h3>Positive Quirks</h3>' + POS_QUIRKS.map(function(q) {
            return '<div class="quirk-item"><strong>' + q.name + ':</strong> ' + q.effect + '</div>';
        }).join('');
    }
    if (negEl) {
        negEl.innerHTML = '<h3>Negative Quirks</h3>' + NEG_QUIRKS.map(function(q) {
            return '<div class="quirk-item"><strong>' + q.name + ':</strong> ' + q.effect + '</div>';
        }).join('');
    }
}

// -- TAB SWITCHING --
function switchTab(id) {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));

    const regions = ['ruins', 'weald', 'warrens', 'cove', 'courtyard', 'farmstead'];
    
    if (regions.includes(id)) { 
        renderRegion(id); 
    } else {
        switch(id) {
            case 'bosses':     renderBosses(); break;
            case 'darkest':    renderDarkest(); break;
            case 'provisions': renderProvisions(); break;
            case 'quirks':     renderQuirks(); break;
        }
    }
}

// -- INITIALIZATION --
document.addEventListener('DOMContentLoaded', function() {
    // Nav Tab Listener
    document.getElementById('mainNav').addEventListener('click', function(e) {
        var btn = e.target.closest('[data-tab]');
        if (btn) switchTab(btn.dataset.tab);
    });

    // Provision Toggle Listener
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-prov]');
        if (btn) {
            document.querySelectorAll('[data-prov]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeProvLevel = btn.dataset.prov;
            renderProvisions();
        }
    });

    // Start App
    switchTab('ruins');
});
