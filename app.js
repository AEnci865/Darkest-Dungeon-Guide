// ============================================================
//  REVISED app.js — Darkest Dungeon Estate Optimizer
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

// -- REGION TEAMS (FIXED: Added robust error handling and proper data mapping) --
function renderRegion(rk) {
    var region = REGIONS[rk];
    var intel  = REGION_INTEL[rk];
    
    // Safety check to prevent the "Empty Tab" issue seen in screenshots
    if (!region || !intel) {
        console.error("Missing data for region:", rk);
        return;
    }

    if (!subsState[rk]) subsState[rk] = {1:false,2:false,3:false,4:false};

    // Update Text Descriptions
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

    // Build the 4-position grid
    var positions  = [4,3,2,1];
    var posLabels  = {4:'Position 4 (Back)',3:'Position 3',2:'Position 2',1:'Position 1 (Front)'};
    var html = '';
    
    positions.forEach(function(pos) {
        var hero = region[pos];
        if (!hero) return; // Skip if position data is missing

        var isSub  = subsState[rk][pos];
        var name   = isSub ? hero.sub  : hero.main;
        var skills = isSub ? hero.sS   : hero.mS;
        
        var skillsHtml = skills.map(function(s){
            return '<div class="skill-item">' + s + '</div>';
        }).join('');

        html += '<div class="pos-container">'
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

// -- TAB SWITCHING (FIXED: Added dynamic region handling) --
function switchTab(id) {
    // 1. Update UI Classes
    document.querySelectorAll('.nav-tab').forEach(function(b){
        b.classList.toggle('active', b.dataset.tab === id);
    });
    document.querySelectorAll('.tab-pane').forEach(function(p){
        p.classList.toggle('active', p.id === 'tab-' + id);
    });

    // 2. Initialize content if it's the first time clicking this tab
    if (!initialized[id]) {
        const regionList = ['ruins', 'weald', 'warrens', 'cove'];
        
        if (regionList.includes(id)) { 
            renderRegion(id); 
        } 
        else if (id === 'bosses')      { renderBosses(); }
        else if (id === 'darkest')     { renderDarkest(); }
        else if (id === 'provisions')  { renderProvisions(); }
        else if (id === 'roster')      { initRoster(); }
        else if (id === 'quirks')      { renderQuirks(); }
        else if (id === 'estate')      { renderEstate(); }
        
        initialized[id] = true;
    }
}

// -- INIT --
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mainNav').addEventListener('click', function(e) {
        var btn = e.target.closest('[data-tab]');
        if (btn) switchTab(btn.dataset.tab);
    });

    // Default view
    renderRegion('ruins');
    initialized['ruins'] = true;
});
