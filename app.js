// ==========================
// DARKHEST DUNGEON APP.JS
// ==========================

// ---- DATA IMPORTED FROM data.js ----
// Assumes REGIONS, BOSSES, DD_RUNS, PROVISIONS, CLASSES, POS_QUIRKS, NEG_QUIRKS, BUILDINGS exist

// ==========================
// TAB SWITCHING
// ==========================
document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and its pane
            tab.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // ---- Provisions Sub-Tabs ----
    const provTabs = document.querySelectorAll('.prov-tab');
    const provContent = document.getElementById('prov-content');

    provTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.prov;

            // Remove active
            provTabs.forEach(t => t.classList.remove('active'));

            // Add active
            tab.classList.add('active');

            // Render provisions for this selection
            provContent.innerHTML = '';
            PROVISIONS[target].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                provContent.appendChild(li);
            });
        });
    });

    // Render default provisions tab
    document.querySelector('.prov-tab.active')?.click();

    // ==========================
    // REGION TEAMS
    // ==========================
    Object.keys(REGIONS).forEach(region => {
        const container = document.getElementById(`${region}-team`);
        if (!container) return;

        const team = REGIONS[region].teams[0]; // Default team 0
        Object.keys(team).forEach(idx => {
            if (idx === 'label') return;
            const hero = team[idx];
            const div = document.createElement('div');
            div.textContent = `${hero.main} [${hero.mS.join(', ')}]`;
            container.appendChild(div);
        });
    });

    // ==========================
    // BOSSES
    // ==========================
    const bossList = document.getElementById('boss-list');
    BOSSES.forEach(boss => {
        const div = document.createElement('div');
        div.className = 'boss-item';
        div.innerHTML = `<strong>${boss.name}</strong> (${boss.region}) - ${boss.tier.join(', ')}`;
        bossList.appendChild(div);
    });

    // ==========================
    // DARKEST DUNGEON RUNS
    // ==========================
    const ddList = document.getElementById('dd-list');
    DD_RUNS.forEach(run => {
        const div = document.createElement('div');
        div.className = 'dd-item';
        div.textContent = `${run.name} - ${run.effect}`;
        ddList.appendChild(div);
    });

    // ==========================
    // HERO ROSTER
    // ==========================
    const rosterGrid = document.getElementById('rosterGrid');
    const addHeroBtn = document.getElementById('addHeroBtn');
    const addHeroForm = document.getElementById('addHeroForm');
    const saveHeroBtn = document.getElementById('saveHero');
    const cancelHeroBtn = document.getElementById('cancelHero');

    // Populate class dropdown
    const newClassSelect = document.getElementById('newClass');
    CLASSES.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        newClassSelect.appendChild(opt);
    });

    // Load roster from localStorage
    let roster = JSON.parse(localStorage.getItem('roster') || '[]');
    renderRoster();

    addHeroBtn.addEventListener('click', () => addHeroForm.style.display = 'block');
    cancelHeroBtn.addEventListener('click', () => addHeroForm.style.display = 'none');

    saveHeroBtn.addEventListener('click', () => {
        const hero = {
            name: document.getElementById('newName').value,
            class: document.getElementById('newClass').value,
            level: parseInt(document.getElementById('newLevel').value),
            stress: parseInt(document.getElementById('newStress').value),
            status: document.getElementById('newStatus').value,
            posQ: document.getElementById('newPosQ').value.split(',').map(s => s.trim()).filter(Boolean),
            negQ: document.getElementById('newNegQ').value.split(',').map(s => s.trim()).filter(Boolean)
        };
        roster.push(hero);
        saveRoster();
        renderRoster();
        addHeroForm.style.display = 'none';
    });

    function renderRoster() {
        rosterGrid.innerHTML = '';
        roster.forEach((h, idx) => {
            const div = document.createElement('div');
            div.className = 'roster-card';
            div.innerHTML = `<strong>${h.name}</strong> (${h.class}) Lv.${h.level} Stress:${h.stress}<br>Status: ${h.status}<br>+${h.posQ.join(', ')}<br>-${h.negQ.join(', ')}`;
            rosterGrid.appendChild(div);
        });
    }

    function saveRoster() {
        localStorage.setItem('roster', JSON.stringify(roster));
    }

    // ==========================
    // QUIRKS
    // ==========================
    const posQuirkDiv = document.getElementById('pos-quirks');
    const negQuirkDiv = document.getElementById('neg-quirks');

    POS_QUIRKS.forEach(q => {
        const div = document.createElement('div');
        div.textContent = q;
        posQuirkDiv.appendChild(div);
    });
    NEG_QUIRKS.forEach(q => {
        const div = document.createElement('div');
        div.textContent = q;
        negQuirkDiv.appendChild(div);
    });

    // ==========================
    // ESTATE
    // ==========================
    const estateGrid = document.getElementById('estate-grid');
    const estateSummary = document.getElementById('estate-summary');
    const estateNameInput = document.getElementById('estateName');

    let estate = JSON.parse(localStorage.getItem('estate') || '{}');
    if (estate.name) estateNameInput.value = estate.name;

    estateNameInput.addEventListener('input', saveEstateName);

    function saveEstateName() {
        estate.name = estateNameInput.value;
        localStorage.setItem('estate', JSON.stringify(estate));
        renderEstate();
    }

    function renderEstate() {
        estateGrid.innerHTML = '';
        estateSummary.textContent = estate.name || 'Unnamed Estate';
        BUILDINGS.forEach(building => {
            const div = document.createElement('div');
            div.className = 'estate-card';
            div.innerHTML = `<strong>${building.name}</strong> Level: ${estate[building.id] || 0}`;
            div.addEventListener('click', () => {
                estate[building.id] = ((estate[building.id] || 0) + 1) % (building.max + 1);
                saveEstateName();
            });
            estateGrid.appendChild(div);
        });
    }

    renderEstate();

    window.resetEstate = function() {
        BUILDINGS.forEach(b => delete estate[b.id]);
        saveEstateName();
    };

    // ==========================
    // DATA EXPORT / IMPORT
    // ==========================
    window.exportData = function() {
        const save = JSON.stringify({ roster, estate }, null, 2);
        navigator.clipboard.writeText(save);
        alert('Data copied to clipboard!');
    };

    window.downloadData = function() {
        const save = JSON.stringify({ roster, estate }, null, 2);
        const blob = new Blob([save], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dd_estate_save.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    window.importData = function() {
        const area = document.getElementById('importArea');
        try {
            const imported = JSON.parse(area.value);
            roster = imported.roster || [];
            estate = imported.estate || {};
            saveRoster();
            renderRoster();
            renderEstate();
            alert('Import successful!');
        } catch (e) {
            alert('Invalid JSON');
        }
    };

    window.nukeAll = function() {
        if (!confirm('Are you sure? This will erase everything.')) return;
        localStorage.clear();
        roster = [];
        estate = {};
        renderRoster();
        renderEstate();
    };

}); // DOMContentLoaded