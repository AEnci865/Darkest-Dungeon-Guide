# Darkest-Dungeon-Guide
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Darkest Dungeon: Estate Master Guide</title>
    <style>
        :root {
            --bg: #050505; --panel: #121212; --gold: #c5a059; --border: #4a3b21;
            --text: #bbb; --heal: #2d4d2d; --dmg: #7a1f1f; --util: #4b2d5c; --dd-red: #ff3333;
        }
        body { background: var(--bg); color: var(--text); font-family: 'Georgia', serif; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .container { width: 1100px; background: var(--panel); border: 2px solid var(--border); padding: 25px; box-shadow: 0 0 50px #000; }
        h1, h2 { text-align: center; color: var(--gold); text-transform: uppercase; letter-spacing: 4px; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
        
        .nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 30px; }
        button { background: #1a1a1a; border: 1px solid var(--border); color: var(--text); padding: 15px; cursor: pointer; text-transform: uppercase; transition: 0.2s; font-weight: bold; }
        button:hover { background: var(--gold); color: #000; }
        button.active { background: var(--gold); color: #000; box-shadow: 0 0 15px var(--gold); }

        .tab-content { display: none; border: 1px solid #333; padding: 20px; background: #0a0a0a; }
        .active { display: block; animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px; }
        .hero-slot { background: #151515; border: 1px solid #333; padding: 15px; text-align: center; position: relative; }
        .hero-name { color: var(--gold); font-size: 1.2rem; margin-bottom: 10px; height: 30px; }
        .skills-list { font-size: 0.85rem; line-height: 1.6; color: #888; min-height: 80px; }
        .sub-btn { width: 100%; margin-top: 15px; font-size: 0.7rem; padding: 5px; background: #222; border-color: #444; color: var(--text); cursor: pointer; }

        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #222; padding: 12px; text-align: left; }
        th { background: #1a1a1a; color: var(--gold); }

        .boss-card { border-left: 4px solid var(--dd-red); background: #151515; padding: 15px; margin-bottom: 20px; }
        .boss-strat { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px; font-size: 0.9rem; }
        .warning { color: var(--dd-red); font-size: 0.8rem; font-style: italic; }
    </style>
</head>
<body>

<div class="container">
    <h1>Estate Management System</h1>
    
    <div class="nav-grid">
        <button onclick="switchTab('ruins')" class="t-btn active">💀 Ruins</button>
        <button onclick="switchTab('weald')" class="t-btn">🌿 Weald</button>
        <button onclick="switchTab('warrens')" class="t-btn">🐀 Warrens</button>
        <button onclick="switchTab('cove')" class="t-btn">🐙 Cove</button>
        <button onclick="switchTab('looting')" class="t-btn">💰 Loot Team</button>
        <button onclick="switchTab('bosses')" class="t-btn">⚔️ Bosses</button>
        <button onclick="switchTab('darkest')" class="t-btn" style="color:var(--dd-red)">🔥 Darkest Dungeon</button>
        <button onclick="switchTab('provisions')" class="t-btn">🎒 Provisions</button>
    </div>

    <div id="content-area"></div>
</div>

<script>
    const data = {
        ruins: { title: "The Ruins", focus: "Holy / Blight", 
            4: { main: "Vestal", mS: "Judgment, Dazzling Light, Grace, Comfort", sub: "Occultist", sS: "Wyrd, Curse, Artillery, Hex" },
            3: { main: "Plague Doctor", mS: "Noxious, Grenade, Blinding Gas, Meds", sub: "Jester", sS: "Ballad, Tune, Slice, Dirk" },
            2: { main: "Highwayman", mS: "Duelist, PBS, Pistol, Open Vein", sub: "Houndmaster", sS: "Rush, Whistle, Blackjack, Lick" },
            1: { main: "Crusader", mS: "Smite, Stun, Holy Lance, Cry", sub: "Leper", sS: "Chop, Hew, Purge, Withstand" }
        },
        weald: { title: "The Weald", focus: "Bleed / Mark / Prot", 
            4: { main: "Arbalest", mS: "Sniper, Flare, Bandage, Bola", sub: "Vestal", sS: "Grace, Comfort, Dazzle, Judgment" },
            3: { main: "Houndmaster", mS: "Rush, Whistle, Guard, Lick", sub: "Occultist", sS: "Wyrd, Curse, Pull, Hex" },
            2: { main: "Bounty Hunter", mS: "Collect, Mark, Flashbang, Finish", sub: "Abomination", sS: "Manacles, Beast, Bile, Absolve" },
            1: { main: "Hellion", mS: "Wicked, Iron Swan, If It Bleeds, YAWP", sub: "Flagellant", sS: "Punish, Rain, Redeem, Reclaim" }
        },
        warrens: { title: "The Warrens", focus: "Bleed / Beast / Disease", 
            4: { main: "Occultist", mS: "Wyrd, Curse, Artillery, Hex", sub: "Arbalest", sS: "Sniper, Mark, Bandage, Bola" },
            3: { main: "Jester", mS: "Ballad, Tune, Slice Off, Harvest", sub: "Houndmaster", sS: "Rush, Cry, Whistle, Lick" },
            2: { main: "Houndmaster", mS: "Rush, Blackjack, Whistle, Guard", sub: "Abomination", sS: "Manacles, Bile, Absolve, Smash" },
            1: { main: "Flagellant", mS: "Punish, Rain, Redeem, Reclaim", sub: "Hellion", sS: "Wicked, Bleeds, YAWP, Adrenaline" }
        },
        cove: { title: "The Cove", focus: "Pierce / Eldritch / Bleed Resist", 
            4: { main: "Vestal", mS: "Judgment, Grace, Comfort, Dazzle", sub: "Occultist", sS: "Wyrd, Artillery, Curse, Pull" },
            3: { main: "Plague Doctor", mS: "Grenade, Gas, Meds, Disorient", sub: "Occultist", sS: "Wyrd, Artillery, Hex, Stab" },
            2: { main: "Shieldbreaker", mS: "Pierce, Puncture, Kiss, Expose", sub: "Highwayman", sS: "Duelist, PBS, Tracking, Open Vein" },
            1: { main: "Man-at-Arms", mS: "Crush, Rampart, Defender, Retribution", sub: "Hellion", sS: "Wicked, Bleed, Iron Swan, YAWP" }
        },
        looting: { title: "Looting Expedition", focus: "Antiquarian Profit Optimization",
            4: { main: "Antiquarian", mS: "Stab, Flashpowder, Vapours, Protect Me", sub: "Occultist", sS: "Wyrd, Artillery, Hex, Stab" },
            3: { main: "Highwayman", mS: "Duelist, PBS, Pistol, Tracking", sub: "Jester", sS: "Ballad, Tune, Slice, Dirk" },
            2: { main: "Crusader", mS: "Smite, Stun, Lance, Cry", sub: "Man-at-Arms", sS: "Crush, Rampart, Bellow, Defender" },
            1: { main: "Shieldbreaker", mS: "Pierce, Puncture, Sway, Captivate", sub: "Hellion", sS: "Wicked, Swan, Bleed, YAWP" }
        }
    };

    let activeRegion = 'ruins';
    let subsState = { 1: false, 2: false, 3: false, 4: false };

    function switchTab(id) {
        document.querySelectorAll('.t-btn').forEach(b => b.classList.toggle('active', b.innerText.toLowerCase().includes(id)));
        if (id === 'provisions') { renderProvisions(); return; }
        if (id === 'bosses') { renderBosses(); return; }
        if (id === 'darkest') { renderDarkest(); return; }
        activeRegion = id;
        subsState = { 1: false, 2: false, 3: false, 4: false };
        renderRegion();
    }

    function renderRegion() {
        const r = data[activeRegion];
        let html = `<h2>${r.title}</h2><div class="team-grid">`;
        for (let i = 4; i >= 1; i--) {
            const char = r[i];
            const isSub = subsState[i];
            html += `<div class="hero-slot"><div class="hero-name">${isSub ? char.sub : char.main}</div><div class="skills-list">${isSub ? char.sS : char.mS}</div><button class="sub-btn" onclick="toggleSub(${i})">Swap Sub</button></div>`;
        }
        html += `</div>`;
        document.getElementById('content-area').innerHTML = html;
    }

    function toggleSub(pos) { subsState[pos] = !subsState[pos]; renderRegion(); }

    function renderDarkest() {
        const floors = [
            { n: "DD1: We Are the Flame", d: "Shuffling horror. Bring hero movement skills.", t: "HWM - Crusader - Jester - Vestal" },
            { n: "DD2: Lighting the Way", d: "Bring 3 Talismans. Templars hit hard.", t: "Arb - HM - MAA - Vestal" },
            { n: "DD3: Belly of the Beast", d: "Exhausting marathon. Need massive camping/exhaustion control.", t: "PD - HWM - Occ - Hellion" },
            { n: "DD4: Hell is in the Heart", d: "Final confrontation. Choose your sacrifices wisely.", t: "Crusader - HWM - Jester - Vestal" }
        ];
        let html = `<h2>The Darkest Dungeon</h2>`;
        floors.forEach(f => {
            html += `<div class="boss-card"><h3>${f.n}</h3><p>${f.d}</p><strong>Team:</strong> ${f.t}</div>`;
        });
        document.getElementById('content-area').innerHTML = html;
    }

    function renderBosses() {
        const bosses = [
            { n: "Necromancer", d: "Backline reach required.", tA: "Vestal-PD-HWM-Crusader", tB: "Arb-Occ-BH-Hellion" },
            { n: "The Prophet", d: "Occultist DMG debuff is key.", tA: "Vestal-HWM-MAA-Hellion", tB: "Occ-HM-BH-Leper" },
            { n: "Swine King", d: "NEVER HIT WILBUR.", tA: "Arb-Occ-HM-MAA", tB: "Vestal-Jester-HWM-Hellion" }
        ];
        let html = `<h2>Boss Strategies</h2>`;
        bosses.forEach(b => {
            html += `<div class="boss-card"><h3>${b.n}</h3><div class="boss-strat"><div><strong>Team A:</strong> ${b.tA}</div><div><strong>Team B:</strong> ${b.tB}</div></div></div>`;
        });
        document.getElementById('content-area').innerHTML = html;
    }

    function renderProvisions() {
        document.getElementById('content-area').innerHTML = "<h2>Provisions</h2><p>Refer to regional table for optimized values based on length.</p>";
    }

    switchTab('ruins');
</script>
</body>
</html>
