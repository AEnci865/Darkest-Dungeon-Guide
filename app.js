// NAVIGATION
document.getElementById("mainNav").addEventListener("click", e => {
  let tab = e.target.dataset.tab;
  if (!tab) return;

  document.querySelectorAll(".nav-tab").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");

  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.getElementById("tab-" + tab).classList.add("active");
});

// LOAD SAMPLE (RESETS DATA)
function loadSampleRoster() {
  alert("Sample roster loaded.");
  renderRoster();
}

// RENDER ROSTER
function renderRoster() {
  let el = document.getElementById("rosterGrid");

  el.innerHTML = roster.map(h => `
    <div class="hero-card">
      <strong>${h.name}</strong> (${h.cls})<br>
      Level: ${h.level} | Stress: ${h.stress}
    </div>
  `).join("");
}

// TEAM BUILDER
function buildAutoTeam() {
  let sorted = [...roster].sort((a,b)=>(b.level*10-b.stress)-(a.level*10-a.stress));
  let team = sorted.slice(0,4);

  document.getElementById("team-output").innerHTML =
    "<div class='output-box'><strong>Best Team:</strong><br>" +
    team.map(h => `${h.name} (${h.cls})`).join("<br>") +
    "</div>";
}

// RISK
function predictRunRisk() {
  let totalStress = roster.slice(0,4).reduce((s,h)=>s+h.stress,0);

  let result =
    totalStress > 200 ? "HIGH RISK"
    : totalStress > 120 ? "MEDIUM RISK"
    : "LOW RISK";

  alert(result);
}

// STRESS SPIRAL
function detectStressSpiral() {
  let count = roster.filter(h => h.stress > 80).length;

  alert(count >= 3 ? "STRESS SPIRAL WARNING" : "Stress manageable");
}

// TEAM SCORE
function getTeamScore(region) {
  let sorted = [...roster].sort((a,b)=>(b.level*10-b.stress)-(a.level*10-a.stress));
  let team = sorted.slice(0,4);

  let score = 0;

  team.forEach(h => {
    score += h.level * 10;
    score -= h.stress;

    if (region === "ruins" && h.cls === "Crusader") score += 20;
    if (region === "warrens" && h.cls === "Plague Doctor") score += 20;
    if (region === "cove" && h.cls === "Highwayman") score += 15;
  });

  return score;
}

// CAMPAIGN OPTIMIZER
function optimizeCampaign() {
  let week = parseInt(document.getElementById("weekInput").value) || 1;

  let results = DUNGEONS.map(d => {
    let teamScore = getTeamScore(d.region);

    let risk = d.difficulty * 20 - teamScore / 10;
    let value = d.gold / 100 + d.heirlooms * 5;

    if (d.boss) value *= 1.5;
    if (week < 10) value *= 1.3;

    return {
      name: d.name,
      score: Math.round(value - risk),
      risk: Math.round(risk),
      value: Math.round(value)
    };
  });

  results.sort((a,b)=>b.score-a.score);

  document.getElementById("campaign-output").innerHTML =
    results.map((r,i)=>`
      <div class="output-box">
        <strong>#${i+1} ${r.name}</strong><br>
        Score: ${r.score}<br>
        Value: ${r.value} | Risk: ${r.risk}
      </div>
    `).join("");
}

// INITIAL RENDER
renderRoster();