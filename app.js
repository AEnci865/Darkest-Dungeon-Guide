// ======================================================
// APP.JS - Darkest Dungeon Estate Master Guide
// Fully integrated with data.js and your HTML
// ======================================================

// GLOBAL STATE
let state = {
    roster: JSON.parse(localStorage.getItem("ddRoster")) || [],
    estate: JSON.parse(localStorage.getItem("ddEstate")) || {},
    estateName: localStorage.getItem("ddEstateName") || "Unnamed Estate",
};

// UTILITY FUNCTIONS
function $(id) { return document.getElementById(id); }
function createEl(tag, cls, inner) { let e = document.createElement(tag); if(cls)e.className=cls; if(inner)e.innerHTML=inner; return e; }

// ==================== NAVIGATION ====================
const tabs = document.querySelectorAll(".nav-tab");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
        tabs.forEach(t=>t.classList.remove("active"));
        panes.forEach(p=>p.classList.remove("active"));
        tab.classList.add("active");
        $("tab-"+tab.dataset.tab).classList.add("active");
    });
});

// ==================== REGION TEAMS ====================
function renderRegionTeams() {
    const regions = ["ruins","weald","warrens","cove"];
    regions.forEach(region=>{
        const container = $(region+"-team");
        container.innerHTML="";
        data.REGIONS[region].teams.forEach((team, idx)=>{
            const teamDiv = createEl("div","team-card");
            let title = idx===0 ? "Primary Team" : (team.loot ? "Loot Team" : "Substitute Team");
            teamDiv.innerHTML = `<div class="team-title">${title}</div><ul>${team.members.map(m=>`<li>${m.name} (${m.class}) - Skills: ${m.skills.join(", ")}</li>`).join("")}</ul>`;
            container.appendChild(teamDiv);
        });
    });
}

// ==================== BOSSES ====================
function renderBosses() {
    const container = $("boss-list");
    container.innerHTML="";
    Object.keys(data.BOSSES).forEach(boss=>{
        const bossDiv = createEl("div","boss-card");
        bossDiv.innerHTML=`<div class="boss-title">${boss}</div>`;
        ["Apprentice","Veteran","Champion"].forEach(tier=>{
            const team = data.BOSSES[boss][tier];
            if(team){
                const tierDiv = createEl("div","boss-tier");
                tierDiv.innerHTML=`<b>${tier}:</b> ${team.map(m=>m.name+" ("+m.class+")").join(", ")}`;
                bossDiv.appendChild(tierDiv);
            }
        });
        container.appendChild(bossDiv);
    });
}

// ==================== DARKEST DUNGEON ====================
function renderDarkest() {
    const container = $("dd-list");
    container.innerHTML="";
    data.DARKEST.forEach(run=>{
        const runDiv = createEl("div","dd-run");
        runDiv.innerHTML=`<b>${run.name}</b> - Heroes: ${run.heroes.map(h=>h.name+"("+h.class+")").join(", ")}`;
        container.appendChild(runDiv);
    });
}

// ==================== PROVISIONS ====================
function renderProvisions() {
    const provBtns = document.querySelectorAll(".prov-tab");
    const container = $("prov-content");

    function showProv(type){
        container.innerHTML="";
        data.PROVISIONS[type].forEach(item=>{
            container.appendChild(createEl("div","prov-item",`${item.name} x${item.qty}`));
        });
    }

    provBtns.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            provBtns.forEach(b=>b.classList.remove("active"));
            btn.classList.add("active");
            showProv(btn.dataset.prov);
        });
    });

    showProv("short");
}

// ==================== QUIRKS ====================
function renderQuirks() {
    const pos = $("pos-quirks");
    const neg = $("neg-quirks");
    pos.innerHTML="";
    neg.innerHTML="";
    data.QUIRKS.positive.forEach(q=>pos.appendChild(createEl("div","quirk-item",`<b>${q.name}</b> - ${q.effect} <i>${q.synergy.join(", ")}</i>`)));
    data.QUIRKS.negative.forEach(q=>neg.appendChild(createEl("div","quirk-item",`<b>${q.name}</b> - ${q.effect} <i>${q.synergy.join(", ")}</i>`)));
}

// ==================== ROSTER ====================
function renderRoster() {
    const grid = $("rosterGrid");
    grid.innerHTML="";
    state.roster.forEach((h, idx)=>{
        const card = createEl("div","hero-card");
        card.innerHTML=`
            <div><b>${h.name}</b> (${h.class}) Lv${h.level}</div>
            <div>Stress: ${h.stress} | Status: ${h.status}</div>
            <div>+ ${h.posQuirks.join(", ")}</div>
            <div>- ${h.negQuirks.join(", ")}</div>
            <button onclick="removeHero(${idx})">Remove</button>
        `;
        grid.appendChild(card);
    });
}

function saveRoster(){
    localStorage.setItem("ddRoster",JSON.stringify(state.roster));
}

function addHero(hero){
    state.roster.push(hero);
    saveRoster();
    renderRoster();
}

function removeHero(idx){
    state.roster.splice(idx,1);
    saveRoster();
    renderRoster();
}

// ==================== ESTATE ====================
function renderEstate(){
    const grid = $("estate-grid");
    grid.innerHTML="";
    Object.keys(data.ESTATE).forEach(build=>{
        const level = state.estate[build] || 0;
        const bdiv = createEl("div","estate-card");
        bdiv.innerHTML=`<div class="building-name">${build}</div><div class="building-level">${"&#x25CF;".repeat(level)}${"&#x25CB;".repeat(data.ESTATE[build].max-level-level)}</div>`;
        bdiv.addEventListener("click", ()=>{
            state.estate[build] = (state.estate[build]||0)+1;
            if(state.estate[build]>data.ESTATE[build].maxLevel) state.estate[build]=0;
            saveEstate();
            renderEstate();
            computeRoute();
        });
        grid.appendChild(bdiv);
    });
    $("estate-summary").innerText=`Estate: ${state.estateName} | Buildings upgraded: ${Object.values(state.estate).reduce((a,b)=>a+b,0)}`;
}

function saveEstate(){
    localStorage.setItem("ddEstate",JSON.stringify(state.estate));
}

function saveEstateName(){
    state.estateName = $("estateName").value;
    localStorage.setItem("ddEstateName",state.estateName);
}

// ==================== BUILD ROUTE OPTIMIZER ====================
function computeRoute(){
    const week = parseInt($("routeWeek").value);
    const strategy = $("routeStrategy").value;
    const topN = parseInt($("routeCount").value);
    const container = $("route-queue");
    container.innerHTML="";

    const upgrades = Object.keys(data.ESTATE).map(b=>{
        const current = state.estate[b] || 0;
        const remaining = data.ESTATE[b].maxLevel - current;
        return {build:b, remaining, cost:data.ESTATE[b].trinkets, severity:data.ESTATE[b].severity};
    }).filter(u=>u.remaining>0);

    // simple priority by strategy
    upgrades.sort((a,b)=>{
        if(strategy==="speed") return a.severity-b.severity;
        if(strategy==="economy") return a.cost-b.cost;
        if(strategy==="darkest") return b.severity-a.severity;
        return b.severity-a.severity;
    });

    upgrades.slice(0,topN).forEach(u=>{
        container.appendChild(createEl("div","route-item",`${u.build} - Remaining: ${u.remaining}, Trinkets: ${u.cost}, Severity: ${u.severity}`));
    });

    $("route-summary").innerText=`Week ${week} | Strategy: ${strategy}`;
}

// ==================== DATA EXPORT/IMPORT ====================
function exportData(){navigator.clipboard.writeText(JSON.stringify({roster:state.roster,estate:state.estate,estateName:state.estateName})); alert("Copied!");}
function downloadData(){ const blob = new Blob([JSON.stringify({roster:state.roster,estate:state.estate,estateName:state.estateName})], {type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="DD_Guide_Save.json"; a.click();}
function importData(){try{const json=JSON.parse($("importArea").value); state.roster=json.roster||[]; state.estate=json.estate||{}; state.estateName=json.estateName||"Unnamed"; saveRoster(); saveEstate(); renderAll(); alert("Imported!");}catch(e){alert("Invalid JSON");}}
function nukeAll(){if(confirm("This will permanently erase all data. Continue?")){localStorage.clear(); state={roster:[],estate:{},estateName:"Unnamed Estate"}; renderAll();}}

// ==================== INITIALIZATION ====================
function renderAll(){
    renderRegionTeams();
    renderBosses();
    renderDarkest();
    renderProvisions();
    renderQuirks();
    renderRoster();
    renderEstate();
}

renderAll();