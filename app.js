// APP.JS - FULL FUNCTIONAL

import { REGIONS, BOSSES, DARKEST, PROVISIONS, QUIRKS, ESTATE } from './data.js';

// TAB NAVIGATION
const tabs = document.querySelectorAll('.nav-tab');
const panes = document.querySelectorAll('.tab-pane');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t=>t.classList.remove('active'));
        panes.forEach(p=>p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
});

// RENDER TEAMS
function renderTeams() {
    for (let regionKey in REGIONS) {
        const region = REGIONS[regionKey];
        const container = document.getElementById(regionKey+'-team');
        container.innerHTML = '';
        region.teams.forEach(team => {
            const div = document.createElement('div');
            div.className='team-box';
            div.innerHTML=`<strong>${team.label}</strong>: ${team.members.join(', ')}<br><em>Substitutes:</em> ${team.substitutes.join(', ')}`;
            container.appendChild(div);
        });
    }
}

// RENDER BOSSES
function renderBosses() {
    const bossList = document.getElementById('boss-list');
    bossList.innerHTML='';
    ['standard','dlc'].forEach(type=>{
        const header = document.createElement('h3');
        header.textContent = type.toUpperCase();
        bossList.appendChild(header);
        BOSSES[type].forEach(b=>{
            const div = document.createElement('div');
            div.className='boss-box';
            div.textContent=`${b.name} - Tiers: ${b.tiers.join(', ')}`;
            bossList.appendChild(div);
        });
    });
}

// RENDER DARKEST DUNGEON
function renderDarkest() {
    const ddList = document.getElementById('dd-list');
    ddList.innerHTML='';
    DARKEST.runs.forEach(run=>{
        const div = document.createElement('div');
        div.className='dd-box';
        div.innerHTML=`${run.name} - Completed: ${run.completed}`;
        ddList.appendChild(div);
    });
}

// RENDER PROVISIONS
function renderProvisions() {
    const provContent = document.getElementById('prov-content');
    provContent.innerHTML='';
    Object.keys(PROVISIONS).forEach(len=>{
        const ul = document.createElement('ul');
        PROVISIONS[len].forEach(item=>{
            const li = document.createElement('li');
            li.textContent=item;
            ul.appendChild(li);
        });
        provContent.appendChild(document.createElement('h4')).textContent = len.toUpperCase();
        provContent.appendChild(ul);
    });
}

// RENDER QUIRKS
function renderQuirks() {
    const pos = document.getElementById('pos-quirks');
    const neg = document.getElementById('neg-quirks');
    pos.innerHTML='';
    neg.innerHTML='';
    QUIRKS.positive.forEach(q=>{
        const div = document.createElement('div');
        div.className='quirk-box';
        div.textContent=`${q.name} (${q.bonus}) Synergy: ${q.synergies.join(', ')}`;
        pos.appendChild(div);
    });
    QUIRKS.negative.forEach(q=>{
        const div = document.createElement('div');
        div.className='quirk-box';
        div.textContent=`${q.name} (${q.penalty}) Synergy: ${q.synergies.join(', ')}`;
        neg.appendChild(div);
    });
}

// ESTATE LOGIC
function renderEstate() {
    const grid = document.getElementById('estate-grid');
    grid.innerHTML='';
    ESTATE.buildings.forEach((b, i)=>{
        const div = document.createElement('div');
        div.className='estate-box';
        div.dataset.index=i;
        div.textContent=`${b.name}: Level 0 / ${b.maxLevel}`;
        div.addEventListener('click', ()=> {
            if (!b.currentLevel) b.currentLevel=0;
            b.currentLevel++;
            if (b.currentLevel>b.maxLevel) b.currentLevel=0;
            div.textContent=`${b.name}: Level ${b.currentLevel} / ${b.maxLevel}`;
            computeRoute();
        });
        grid.appendChild(div);
    });
}

// BUILD ROUTE OPTIMIZER
function computeRoute() {
    const summary = document.getElementById('route-summary');
    const queue = document.getElementById('route-queue');
    const week = parseInt(document.getElementById('routeWeek').value);
    const strat = document.getElementById('routeStrategy').value;
    const count = parseInt(document.getElementById('routeCount').value);
    
    // simple scoring: severity*level + trinket weight
    let upgrades=[];
    ESTATE.buildings.forEach(b=>{
        for (let lvl=1; lvl<=b.maxLevel; lvl++) {
            const current = b.currentLevel||0;
            if (lvl>current) upgrades.push({building:b.name,level:lvl,severity:b.severity[lvl-1],trinket:b.trinketCost[lvl]});
        }
    });
    // sort by severity descending
    upgrades.sort((a,b)=>b.severity-a.severity);
    // slice top N
    const top = upgrades.slice(0,count);
    summary.textContent=`Week ${week} - Strategy: ${strat}`;
    queue.innerHTML='';
    top.forEach(u=>{
        const div = document.createElement('div');
        div.textContent=`${u.building} -> Level ${u.level} | Severity: ${u.severity} | Trinkets: ${u.trinket}`;
        queue.appendChild(div);
    });
}

// INITIALIZE
function init() {
    renderTeams();
    renderBosses();
    renderDarkest();
    renderProvisions();
    renderQuirks();
    renderEstate();
    computeRoute();
}

window.onload=init;