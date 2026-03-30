// NAVIGATION
document.getElementById("mainNav").addEventListener("click", e => {
  let tab = e.target.dataset.tab;
  if (!tab) return;

  document.querySelectorAll(".nav-tab").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");

  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.getElementById("tab-" + tab).classList.add("active");
});

// SAMPLE HEROES
function addSampleHeroes() {
  roster = [
    { name: "Reynauld", cls: "Crusader", level: 2, stress: 20, status: "active" },
    { name: "Dismas", cls: "Highwayman", level: 2, stress: 35, status: "active" },
    { name: "Paracelsus", cls: "Plague Doctor", level: 1, stress: 10, status: "active" },
    { name: "Junia", cls: "Vestal", level: 2, stress: 25, status: "active" }
  ];
  renderRoster();
}

// ROSTER DISPLAY
function renderRoster() {
  let el = document.getElementById("rosterGrid");
  el.innerHTML = roster.map(h =>
    `<div class="hero-card">${h.name} (${h.cls}) | Lv${h.level} | Stress ${h.stress}</div>`
  ).join("");
}

// AUTO TEAM
function buildAutoTeam(region) {
  let sorted = [...roster].sort((a,b)=>(b.level*10-b.stress)-(a.level*10-a.stress));
  let team = sorted.slice(0,4);
  alert("Best Team:\n" + team.map(h=>h.name).join("\n"));
}

// RISK
function predictRunRisk() {
  let stress = roster.reduce((s,h)=>s+h.stress,0);
  alert(stress > 200 ? "HIGH RISK" : "LOW RISK");
}

// STRESS CHECK
function detectStressSpiral() {
  let count = roster.filter(h=>h.stress>80).length;
  alert(count>=3 ? "Stress Spiral Risk" : "Stable");
}

// TEAM SCORE
function getBestTeamScore(region) {
  let sorted = [...roster].sort((a,b)=>(b.level*10-b.stress)-(a.level*10-a.stress));
  let team = sorted.slice(0,4);

  let score = 0;
  team.forEach(h=>{
    score += h.level*10;
    score -= h.stress;
  });
  return score;
}

// CAMPAIGN OPTIMIZER
function optimizeCampaign() {
  let week = parseInt(document.getElementById("routeWeek").value)||1;

  let results = DUNGEONS.map(d=>{
    let teamScore = getBestTeamScore(d.region);
    let risk = d.difficulty*20 - teamScore/10;
    let value = d.rewards.gold/100 + d.rewards.heirlooms*5;

    if (d.boss) value *= 1.5;
    if (week < 10) value *= 1.3;

    return {
      name: d.name,
      score: Math.round(value-risk),
      risk: Math.round(risk),
      value: Math.round(value)
    };
  });

  results.sort((a,b)=>b.score-a.score);

  document.getElementById("campaign-output").innerHTML =
    results.map((r,i)=>
      `<div class="queue-item">
        #${i+1} ${r.name}<br>
        Score: ${r.score} | Value: ${r.value} | Risk: ${r.risk}
      </div>`
    ).join("");
}