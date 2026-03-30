// -------------------- APP.JS - FULL CAKE --------------------

// -------------------- TAB MANAGEMENT --------------------
const tabs = document.querySelectorAll(".nav-tab");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    panes.forEach(p => p.classList.remove("active"));
    const pane = document.getElementById(`tab-${tab.dataset.tab}`);
    if(pane) pane.classList.add("active");

    if(tab.dataset.tab.startsWith("prov")) renderProvision(tab.dataset.tab);
    if(tab.dataset.tab === "roster") renderRoster();
    if(tab.dataset.tab === "estate") renderEstate();
    if(tab.dataset.tab === "buildroute") computeRoute();
  });
});

// -------------------- REGION TEAMS DISPLAY --------------------
function renderRegions() {
  Object.keys(REGIONS).forEach(regionKey => {
    const container = document.getElementById(`${regionKey}-team`);
    if(!container) return;
    container.innerHTML = "";
    REGIONS[regionKey].teams.forEach(team => {
      const div = document.createElement("div");
      div.classList.add("team-box");
      div.innerHTML = `<h4>${team.label}</h4><p>${team.description}</p>`;
      const heroList = document.createElement("ul");
      team.heroes.forEach(hero => {
        const li = document.createElement("li");
        li.textContent = `${hero.name} [${hero.skills.join(", ")}]`;
        heroList.appendChild(li);
      });
      div.appendChild(heroList);
      container.appendChild(div);
    });
  });
}

// -------------------- BOSS COMPENDIUM --------------------
function renderBosses() {
  Object.keys(BOSSES).forEach(regionKey => {
    const container = document.getElementById(`${regionKey}-list`);
    if(!container) return;
    container.innerHTML = "";
    BOSSES[regionKey].forEach(boss => {
      const div = document.createElement("div");
      div.classList.add("boss-box");
      div.innerHTML = `<h4>${boss.name} (${boss.difficulty})</h4>`;
      const ul = document.createElement("ul");
      boss.recommendedTeam.forEach(hero => {
        const li = document.createElement("li");
        li.textContent = hero;
        ul.appendChild(li);
      });
      div.appendChild(ul);
      container.appendChild(div);
    });
  });
}

// -------------------- ROSTER MANAGEMENT --------------------
let roster = JSON.parse(localStorage.getItem("ddRoster") || "[]");

function saveRoster() {
  localStorage.setItem("ddRoster", JSON.stringify(roster));
}

function addHero(hero) {
  roster.push(hero);
  saveRoster();
  renderRoster();
}

function deleteHero(index) {
  roster.splice(index, 1);
  saveRoster();
  renderRoster();
}

function renderRoster() {
  const grid = document.getElementById("rosterGrid");
  grid.innerHTML = "";
  roster.forEach((hero, idx) => {
    const div = document.createElement("div");
    div.classList.add("roster-hero");
    div.innerHTML = `<strong>${hero.name}</strong> [${hero.class}] Lvl:${hero.level} Stress:${hero.stress}<br>
      PosQ: ${hero.posQuirks.join(", ")}<br>
      NegQ: ${hero.negQuirks.join(", ")}
      <button onclick="deleteHero(${idx})" class="ctrl-btn danger">X</button>`;
    grid.appendChild(div);
  });

  // Populate class filter dynamically
  const classSelect = document.getElementById("filterClass");
  const classes = [...new Set(roster.map(h => h.class))];
  classSelect.innerHTML = `<option value="">All Classes</option>` + classes.map(c=>`<option value="${c}">${c}</option>`).join("");
}

// -------------------- ADD HERO FORM --------------------
document.getElementById("addHeroBtn").addEventListener("click", () => {
  document.getElementById("addHeroForm").style.display = "block";
});

document.getElementById("cancelHero").addEventListener("click", () => {
  document.getElementById("addHeroForm").style.display = "none";
});

document.getElementById("saveHero").addEventListener("click", () => {
  const hero = {
    name: document.getElementById("newName").value,
    class: document.getElementById("newClass").value,
    level: parseInt(document.getElementById("newLevel").value),
    stress: parseInt(document.getElementById("newStress").value),
    status: document.getElementById("newStatus").value,
    posQuirks: document.getElementById("newPosQ").value.split(",").map(s=>s.trim()).filter(Boolean),
    negQuirks: document.getElementById("newNegQ").value.split(",").map(s=>s.trim()).filter(Boolean)
  };
  addHero(hero);
  document.getElementById("addHeroForm").style.display = "none";
});

// -------------------- ESTATE TRACKING --------------------
let estateState = JSON.parse(localStorage.getItem("ddEstate") || "{}");

function saveEstate() {
  localStorage.setItem("ddEstate", JSON.stringify(estateState));
}

function saveEstateName() {
  estateState.name = document.getElementById("estateName").value;
  saveEstate();
}

function resetEstate() {
  estateState = {};
  saveEstate();
  renderEstate();
}

function renderEstate() {
  const grid = document.getElementById("estate-grid");
  const summary = document.getElementById("estate-summary");
  grid.innerHTML = "";
  summary.textContent = estateState.name ? `Estate: ${estateState.name}` : "Estate not named";

  const buildings = ["Barracks","Guild Hall","Abbey","Blacksmith","Armory","Sanctum"];
  buildings.forEach(b => {
    const div = document.createElement("div");
    div.classList.add("estate-building");
    const level = estateState[b] || 0;
    div.innerHTML = `${b}: <span class="level-display">${level}</span> <button onclick="upgradeBuilding('${b}')">+</button> <button onclick="downgradeBuilding('${b}')">-</button>`;
    grid.appendChild(div);
  });
}

function upgradeBuilding(name) {
  estateState[name] = (estateState[name] || 0) + 1;
  saveEstate();
  renderEstate();
}

function downgradeBuilding(name) {
  estateState[name] = Math.max((estateState[name] || 0) -1, 0);
  saveEstate();
  renderEstate();
}

// -------------------- BUILD ROUTE OPTIMIZER --------------------
function computeRoute() {
  const week = parseInt(document.getElementById("routeWeek").value);
  const strategy = document.getElementById("routeStrategy").value;
  const topN = parseInt(document.getElementById("routeCount").value);

  // Example: simple build priority based on strategy
  const buildings = ["Barracks","Guild Hall","Abbey","Blacksmith","Armory","Sanctum"];
  let sorted = [...buildings];
  if(strategy==="survival") sorted.sort((a,b)=> a.length-b.length);
  if(strategy==="speed") sorted.sort((a,b)=> b.length-a.length);
  if(strategy==="economy") sorted.sort((a,b)=> a.localeCompare(b));
  // For demo, just slice top N
  const queue = sorted.slice(0, topN);

  const container = document.getElementById("route-queue");
  container.innerHTML = "<ul>" + queue.map(b => `<li>Upgrade ${b}</li>`).join("") + "</ul>";
  document.getElementById("route-summary").textContent = `Week ${week} | Strategy: ${strategy}`;
}

// -------------------- PROVISION GUIDE --------------------
const PROVISIONS = {
  short: ["Food x4","Shovel x1","Torch x1"],
  medium: ["Food x8","Shovel x1","Torch x2","Medicinal Herbs x1"],
  long: ["Food x12","Shovel x2","Torch x3","Medicinal Herbs x2","Holy Water x1"]
};

function renderProvision(length) {
  const container = document.getElementById("prov-content");
  container.innerHTML = "<ul>" + PROVISIONS[length].map(i=>`<li>${i}</li>`).join("") + "</ul>";
}

// -------------------- DATA EXPORT / IMPORT --------------------
function exportData() {
  const data = JSON.stringify({ roster, estate: estateState }, null, 2);
  navigator.clipboard.writeText(data).then(()=>alert("Copied to clipboard"));
}

function downloadData() {
  const data = JSON.stringify({ roster, estate: estateState }, null, 2);
  const blob = new Blob([data], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dd_save.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData() {
  try {
    const data = JSON.parse(document.getElementById("importArea").value);
    roster = data.roster || [];
    estateState = data.estate || {};
    saveRoster();
    saveEstate();
    renderRoster();
    renderEstate();
    alert("Data imported successfully");
  } catch(e) {
    alert("Invalid JSON");
  }
}

function nukeAll() {
  if(confirm("This will permanently erase all saved data. Are you sure?")) {
    localStorage.clear();
    roster = [];
    estateState = {};
    renderRoster();
    renderEstate();
    alert("All data cleared");
  }
}

// -------------------- INIT --------------------
renderRegions();
renderBosses();
renderRoster();
renderEstate();
computeRoute();