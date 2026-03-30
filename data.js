// ============================================================
//  data.js — FULL ENDGAME & DLC MASTER DATA
// ============================================================

var CLASSES = ["Abomination", "Antiquarian", "Arbalest", "Bounty Hunter", "Crusader", "Flagellant", "Grave Robber", "Hellion", "Highwayman", "Houndmaster", "Jester", "Leper", "Man-at-Arms", "Occultist", "Plague Doctor", "Shieldbreaker", "Vestal"];

var REGIONS = {
  ruins: {
    4: { main: "Vestal", mS: ["Judgement", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Sacrificial Stab", "Abyssal Artillery", "Weakening Curse", "Wyrd Reconstruction"] },
    3: { main: "Plague Doctor", mS: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], sub: "Jester", sS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"] },
    2: { main: "Highwayman", mS: ["Duelist's Advance", "Point Blank Shot", "Pistol Shot", "Open Vein"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
    1: { main: "Crusader", mS: ["Smite", "Stunning Blow", "Holy Lance", "Inspirit"], sub: "Shieldbreaker", sS: ["Pierce", "Puncture", "Adder's Kiss", "Expose"] }
  },
  weald: {
    4: { main: "Arbalest", mS: ["Sniper Shot", "Suppressing Fire", "B.Field Bandage", "Rallying Flare"], sub: "Vestal", sS: ["Judgement", "Dazzling Light", "Divine Grace", "Divine Comfort"] },
    3: { main: "Houndmaster", mS: ["Hound's Rush", "Target Whistle", "Blackjack", "Lick Wounds"], sub: "Plague Doctor", sS: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "B.Field Medicine"] },
    2: { main: "Bounty Hunter", mS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"], sub: "Highwayman", sS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] },
    1: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "Barbaric YAWP!"], sub: "Flagellant", sS: ["Punish", "Rain of Sorrows", "Exsanguinate", "Redeem"] }
  },
  warrens: {
    4: { main: "Houndmaster", mS: ["Hound's Rush", "Target Whistle", "Blackjack", "Lick Wounds"], sub: "Vestal", sS: ["Judgement", "Dazzling Light", "Divine Grace", "Divine Comfort"] },
    3: { main: "Jester", mS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"], sub: "Occultist", sS: ["Sacrificial Stab", "Abyssal Artillery", "Weakening Curse", "Wyrd Reconstruction"] },
    2: { main: "Flagellant", mS: ["Punish", "Rain of Sorrows", "Exsanguinate", "Redeem"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
    1: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "Barbaric YAWP!"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Retribution"] }
  },
  cove: {
    4: { main: "Plague Doctor", mS: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], sub: "Occultist", sS: ["Sacrificial Stab", "Abyssal Artillery", "Daemon's Pull", "Wyrd Reconstruction"] },
    3: { main: "Jester", mS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"], sub: "Highwayman", sS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] },
    2: { main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Captivate", "Serpent Sway"], sub: "Abomination", sS: ["Manacles", "Beast's Bile", "Absolution", "Transform"] },
    1: { main: "Occultist", mS: ["Sacrificial Stab", "Abyssal Artillery", "Weakening Curse", "Wyrd Reconstruction"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Retribution"] }
  },
  courtyard: {
    4: { main: "Vestal", mS: ["Judgement", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Arbalest", sS: ["Sniper Shot", "Suppressing Fire", "B.Field Bandage", "Rallying Flare"] },
    3: { main: "Jester", mS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"], sub: "Highwayman", sS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] },
    2: { main: "Flagellant", mS: ["Punish", "Rain of Sorrows", "Exsanguinate", "Redeem"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
    1: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "Barbaric YAWP!"], sub: "Shieldbreaker", sS: ["Pierce", "Puncture", "Captivate", "Serpent Sway"] }
  },
  farmstead: {
    4: { main: "Vestal", mS: ["Judgement", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Jester", sS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"] },
    3: { main: "Jester", mS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"], sub: "Highwayman", sS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] },
    2: { main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Captivate", "Serpent Sway"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Retribution"] },
    1: { main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Captivate", "Serpent Sway"], sub: "Highwayman", sS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] }
  }
};

var REGION_INTEL = {
  ruins: { subtitle: "Holy & Blight", tips: ["Undead are immune to Bleed", "Focus backline Bone Courtiers", "Bring Blight & Stun"] },
  weald: { subtitle: "Bleed & Mark", tips: ["Prioritize Hateful Viragos", "High PROT enemies frequent here", "Bleed resist is essential"] },
  warrens: { subtitle: "Beast & Bleed", tips: ["Swine Skiver is priority #1", "Bring high Bleed DMG", "Clear corpses to pull backline"] },
  cove: { subtitle: "Eldritch & Blight", tips: ["Uca Crusher has high PROT", "Bring Blight and Armor Pierce", "Eldritch Haters excel here"] },
  courtyard: { subtitle: "Bleed & Sustain", tips: ["Vampiric enemies have high Bleed resist", "Bring extra Blood", "Stress is high; bring a Jester"] },
  farmstead: { subtitle: "Reflection & Endurance", tips: ["Infinite waves of Husks", "Bring Shieldbreaker to ignore PROT", "Sustain is more important than burst"] }
};

var BOSSES = [
  { name: "The Necromancer", region: "Ruins", mechanics: ["Summons Skeletons; Moves Back"], teams: [{ label: "Unholy", heroes: "Vestal-PD-HWM-CRU" }], avoid: ["Bleed"] },
  { name: "The Swine Prince", region: "Warrens", mechanics: ["Wilbur marks targets"], teams: [{ label: "Anti-Mark", heroes: "ARB-OCC-HM-MAA" }], avoid: ["Hitting Wilbur"] },
  { name: "The Hag", region: "Weald", mechanics: ["Into the Pot (Stun/DoT)"], teams: [{ label: "Reach", heroes: "HEL-BH-HWM-VES" }], avoid: ["Rank 1-2 only heroes"] },
  { name: "The Siren", region: "Cove", mechanics: ["Song of Desire (Charm)"], teams: [{ label: "Dodge/Resist", heroes: "ANT-MAA-SB-OCC" }], avoid: ["Glass Cannons"] },
  { name: "The Flesh", region: "Warrens", mechanics: ["Multiple parts; High Blight weak"], teams: [{ label: "DoT Stack", heroes: "PD-OCC-FLA-VES" }], avoid: ["Low Healing"] },
  { name: "Brigand Pounder", region: "Weald", mechanics: ["Fuseman is priority #1"], teams: [{ label: "Precise", heroes: "PD-BH-HM-VES" }], avoid: ["Ignoring the Matchman"] }
];

var SPECIAL_BOSSES = [
  { name: "The Collector", region: "Roaming", mechanics: ["Summons Heads"], teams: [{ label: "Stun/Burst", heroes: "VES-PD-HWM-HEL" }], avoid: ["Low Accuracy"] },
  { name: "The Shambler", region: "Darkness", mechanics: ["Shuffles party; Shambler Spawns"], teams: [{ label: "Mobile", heroes: "GR-HWM-SB-CRU" }], avoid: ["Static formations"] }
];

var DD_RUNS = [
  { name: "We Are the Flame", desc: "M1: Horror", team: "PD - HM - CRU - VEST", key: ["Bleed Resist", "Shuffling"], watch: ["Shuffling Horror"] },
  { name: "An Unblinkable Eye", desc: "M2: The Cyst", team: "ARB - OCC - HM - MAA", key: ["Guard Support", "Marks"], watch: ["Templar Impaler"] },
  { name: "Belly of the Beast", desc: "M3: Long Map", team: "PD - VES - FLA - HEL", key: ["Sustain", "Exhaustion"], watch: ["Mammoth Cyst"] },
  { name: "Hell is in the Heart", desc: "M4: The End", team: "Any Balanced Team", key: ["Final Confrontation"], watch: ["The Ancestor"] }
];

var PROVISIONS = {
  short: { regions: { ruins: [["Food", 8], ["Torch", 8]], weald: [["Food", 8], ["Shovel", 4]] } },
  medium: { regions: { ruins: [["Food", 12], ["Torch", 12]], weald: [["Food", 12], ["Shovel", 5]] } },
  long: { regions: { ruins: [["Food", 16], ["Torch", 16]], weald: [["Food", 16], ["Shovel", 6]] } }
};

var BUILDINGS = [
  { id: "stage_coach", name: "Stage Coach", upgrades: [{ label: "Barracks", costs: [8, 12, 18, 24, 32], type: "deed" }] },
  { id: "blacksmith", name: "Blacksmith", upgrades: [{ label: "Weapons", costs: [12, 20, 28, 36], type: "deed" }] },
  { id: "guild", name: "Guild", upgrades: [{ label: "Training", costs: [10, 15, 25, 35], type: "portrait" }] },
  { id: "sanitarium", name: "Sanitarium", upgrades: [{ label: "Medical Ward", costs: [15, 20, 30], type: "bust" }] }
];
