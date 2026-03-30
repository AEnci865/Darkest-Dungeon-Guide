// ============================================================
//  data.js — COMPLETE ESTATE MASTER DATA
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
    3: { main: "Jester", mS: ["Harvest", "Slice Off", "Battle Ballad", "Inspiring Tune"], sub: "Highwayman", mS: ["Pistol Shot", "Grapeshot Blast", "Duelist's Advance", "Open Vein"] },
    2: { main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Captivate", "Serpent Sway"], sub: "Abomination", sS: ["Manacles", "Beast's Bile", "Absolution", "Transform"] },
    1: { main: "Occultist", mS: ["Sacrificial Stab", "Abyssal Artillery", "Weakening Curse", "Wyrd Reconstruction"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Retribution"] }
  }
};

var REGION_INTEL = {
  ruins: { subtitle: "Holy & Blight", tips: ["Undead are immune to Bleed", "Focus backline Bone Courtiers", "Bring Blight & Stun"] },
  weald: { subtitle: "Bleed & Mark", tips: ["Prioritize Hateful Viragos", "High PROT enemies frequent here", "Bleed resist is essential"] },
  warrens: { subtitle: "Beast & Bleed", tips: ["Swine Skiver is priority #1", "Bring high Bleed DMG", "Clear corpses to pull backline"] },
  cove: { subtitle: "Eldritch & Blight", tips: ["Uca Crusher has high PROT", "Bring Blight and Armor Pierce", "Eldritch Haters excel here"] }
};

var BOSSES = [
  {
    name: "The Necromancer", region: "Ruins", tiers: "Apprentice / Veteran / Champion",
    teams: [{ label: "Primary", heroes: "Vestal · Plague Doctor · Highwayman · Crusader" }],
    mechanics: ["Summons skeletons upon attacking", "Moves backward as he summons", "Weak to Blight and Stun"],
    avoid: ["Bleed-focused heroes", "Leper (Necromancer moves to Rank 4)"]
  },
  {
    name: "The Swine Prince", region: "Warrens", tiers: "Apprentice / Veteran / Champion",
    teams: [{ label: "Primary", heroes: "Arbalest · Occultist · Houndmaster · Man-at-Arms" }],
    mechanics: ["NEVER hit Wilbur first", "Arbalest clears marks from your team", "King retaliates if Wilbur is hit"],
    avoid: ["Any hit on Wilbur causes King frenzy", "Riposte (can hit Wilbur accidentally)"]
  },
  {
    name: "The Hag", region: "Weald", tiers: "Apprentice / Veteran / Champion",
    teams: [{ label: "Primary", heroes: "Hellion · Bounty Hunter · Highwayman · Vestal" }],
    mechanics: ["Traps hero in 'The Pot'", "Hag stays in Ranks 3-4", "Backline reach is mandatory"],
    avoid: ["Leper/Crusader (cannot hit Ranks 3/4)", "Focusing the Pot is usually a trap"]
  }
];

var DD_RUNS = [
  { name: "We Are the Flame", desc: "First Descent", team: "PD - HM - CRU - VEST", key: ["Bleed Resist", "Stun/Blight"], watch: ["Shuffling Horror"] },
  { name: "An Unblinkable Eye", desc: "The Cyst", team: "ARB - OCC - HM - MAA", key: ["Marking Synergy", "Guard Support"], watch: ["Templar Impaler"] }
];

var PROVISIONS = {
  short: {
    regions: {
      ruins: [["Food", 8, "Basic"], ["Torch", 8, "Light"], ["Shovel", 2, "Obstacles"], ["Holy Water", 2, "Curios"]],
      weald: [["Food", 8, "Basic"], ["Torch", 8, "Light"], ["Shovel", 4, "High Frequency"], ["Bandage", 2, "Bleeds"]],
      warrens: [["Food", 8, "Basic"], ["Torch", 8, "Light"], ["Medicinal Herbs", 2, "Curios"], ["Bandage", 2, "Bleeds"]],
      cove: [["Food", 8, "Basic"], ["Torch", 8, "Light"], ["Shovel", 3, "Obstacles"], ["Medicinal Herbs", 3, "Fish/Traps"]]
    }
  }
};

var POS_QUIRKS = [
  { name: "Luminous", effect: "+2 SPD, +5 DODGE" },
  { name: "Corvid's Eye", effect: "+8 ACC, +2% Crit" }
];

var NEG_QUIRKS = [
  { name: "The Fits", effect: "-2 SPD, -5 ACC" },
  { name: "Off Guard", effect: "-4 SPD, -5 DODGE on Round 1" }
];

var BUILDINGS = [
  {
    id: "stage_coach", name: "Stage Coach", priority: 10,
    upgrades: [
      { label: "Network (Heroes)", maxLevel: 5, costs: [10, 15, 20, 25, 30], type: "deed" },
      { label: "Barracks (Roster)", maxLevel: 5, costs: [8, 12, 18, 24, 32], type: "deed" }
    ]
  },
  {
    id: "blacksmith", name: "Blacksmith", priority: 9,
    upgrades: [
      { label: "Weapons", maxLevel: 4, costs: [12, 20, 28, 36], type: "deed" },
      { label: "Armor", maxLevel: 4, costs: [12, 20, 28, 36], type: "deed" }
    ]
  }
];
