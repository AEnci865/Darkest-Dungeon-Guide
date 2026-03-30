// Darkest Dungeon Estate Guide - Game Data
// REGIONS, BOSSES, DD_RUNS, PROVISIONS, CLASSES, POS_QUIRKS, NEG_QUIRKS, BUILDINGS

const REGIONS = {
  ruins: {
    teams: [
      {
        label: "Team A - High Damage",
        4: { main: "Arbalest", mS: ["Sniper Shot", "Rallying Flare", "Blindfire", "Bola"], sub: "Highwayman", sS: ["Point Blank Shot", "Pistol Shot", "Tracking Shot", "Open Vein"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"] },
        2: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
        1: { main: "Crusader", mS: ["Smite", "Holy Lance", "Stunning Blow", "Inspiring Cry"], sub: "Flagellant", sS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"] }
      },
      {
        label: "Team B - Balanced Sustain",
        4: { main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"], sub: "Jester", sS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"] },
        2: { main: "Crusader", mS: ["Smite", "Holy Lance", "Stunning Blow", "Inspiring Cry"], sub: "Leper", sS: ["Chop", "Hew", "Purge", "Withstand"] },
        1: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Retribution"], sub: "Leper", sS: ["Chop", "Hew", "Purge", "Withstand"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"] },
        3: { main: "Highwayman", mS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"], sub: "Houndmaster", sS: ["Hound’s Rush", "Target Whistle", "Guard Dog", "Lick Wounds"] },
        2: { main: "Antiquarian", mS: ["Flashpowder", "Protect Me!", "Nervous Stab", "Invigorating Vapours"], sub: "Plague Doctor", sS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"] },
        1: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Bolster"], sub: "Crusader", sS: ["Smite", "Holy Lance", "Stunning Blow", "Inspiring Cry"] }
      }
    ]
  },
  weald: {
    teams: [
      {
        label: "Team A - Bleed and Mark",
        4: { main: "Plague Doctor", mS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"], sub: "Arbalest", sS: ["Sniper Shot", "Rallying Flare", "Blindfire", "Bola"] },
        3: { main: "Grave Robber", mS: ["Thrown Dagger", "Pick to the Face", "Shadow Fade", "Lunge"], sub: "Highwayman", sS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"] },
        2: { main: "Houndmaster", mS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Pull of the Abyss", "Sacrificial Stab"] },
        1: { main: "Bounty Hunter", mS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"], sub: "Hellion", sS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"] }
      },
      {
        label: "Team B - Control and Ranged",
        4: { main: "Jester", mS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"], sub: "Vestal", sS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"] },
        3: { main: "Arbalest", mS: ["Sniper Shot", "Rallying Flare", "Blindfire", "Bola"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Pull of the Abyss", "Sacrificial Stab"] },
        2: { main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Pull of the Abyss", "Sacrificial Stab"], sub: "Crusader", sS: ["Smite", "Holy Lance", "Stunning Blow", "Inspiring Cry"] },
        1: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Bolster"], sub: "Houndmaster", sS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Pull of the Abyss", "Sacrificial Stab"] },
        3: { main: "Highwayman", mS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
        2: { main: "Houndmaster", mS: ["Hound’s Rush", "Target Whistle", "Guard Dog", "Lick Wounds"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
        1: { main: "Antiquarian", mS: ["Flashpowder", "Protect Me!", "Nervous Stab", "Invigorating Vapours"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Bolster"] }
      }
    ]
  },
  warrens: {
    teams: [
      {
        label: "Team A - Beast Bleed Core",
        4: { main: "Highwayman", mS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"], sub: "Grave Robber", sS: ["Thrown Dagger", "Pick to the Face", "Shadow Fade", "Lunge"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"] },
        2: { main: "Flagellant", mS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"], sub: "Bounty Hunter", sS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"] },
        1: { main: "Houndmaster", mS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"], sub: "Hellion", sS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"] }
      },
      {
        label: "Team B - Balanced Survivability",
        4: { main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"], sub: "Plague Doctor", sS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"] },
        2: { main: "Bounty Hunter", mS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"], sub: "Houndmaster", sS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"] },
        1: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Bolster"], sub: "Flagellant", sS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Jester", mS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"] },
        3: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"], sub: "Highwayman", sS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"] },
        2: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Bolster"], sub: "Flagellant", sS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"] },
        1: { main: "Antiquarian", mS: ["Flashpowder", "Protect Me!", "Nervous Stab", "Invigorating Vapours"], sub: "Houndmaster", sS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"] }
      }
    ]
  },
  cove: {
    teams: [
      {
        label: "Team A - Blight and Control",
        4: { main: "Arbalest", mS: ["Sniper Shot", "Rallying Flare", "Blindfire", "Bola"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"] },
        2: { main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Snake Skin", "Expose Weakness"], sub: "Highwayman", sS: ["Duelist’s Advance", "Point Blank Shot", "Tracking Shot", "Open Vein"] },
        1: { main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Retribution"] }
      },
      {
        label: "Team B - Stress and Damage",
        4: { main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"] },
        3: { main: "Jester", mS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"], sub: "Plague Doctor", sS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"] },
        2: { main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"], sub: "Shieldbreaker", sS: ["Pierce", "Puncture", "Snake Skin", "Expose Weakness"] },
        1: { main: "Flagellant", mS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"], sub: "Houndmaster", sS: ["Hound’s Rush", "Target Whistle", "Cry Havoc", "Lick Wounds"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Bolster"], sub: "Jester", sS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"], sub: "Plague Doctor", sS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"] },
        2: { main: "Highwayman", mS: ["Duelist’s Advance", "Point Blank Shot", "Pistol Shot", "Tracking Shot"], sub: "Grave Robber", sS: ["Thrown Dagger", "Pick to the Face", "Shadow Fade", "Lunge"] },
        1: { main: "Antiquarian", mS: ["Flashpowder", "Protect Me!", "Nervous Stab", "Invigorating Vapours"], sub: "Man-at-Arms", sS: ["Crush", "Rampart", "Defender", "Bolster"] }
      }
    ]
  }
};

// BOSSES
const BOSSES = {
  ruins: [
    { name: "Swine Prince", level: 3, type: "melee" },
    { name: "Shambler", level: 5, type: "abomination" },
    { name: "Bone Commander", level: 4, type: "undead" }
  ],
  weald: [
    { name: "The Hag", level: 4, type: "magic" },
    { name: "Shambler", level: 5, type: "abomination" },
    { name: "Spider Boss", level: 3, type: "beast" }
  ],
  warrens: [
    { name: "Collector", level: 5, type: "treasure" },
    { name: "Rabid Wolf", level: 3, type: "beast" },
    { name: "Flesh Eater", level: 4, type: "ghoul" }
  ],
  cove: [
    { name: "Crestfallen Captain", level: 4, type: "pirate" },
    { name: "Shambler", level: 5, type: "abomination" },
    { name: "Eel Boss", level: 3, type: "aquatic" }
  ]
};

// DD_RUNS
const DD_RUNS = [
  { name: "Short Ruins", region: "ruins", length: "short" },
  { name: "Medium Weald", region: "weald", length: "medium" },
  { name: "Long Warrens", region: "warrens", length: "long" },
  { name: "Short Cove", region: "cove", length: "short" }
];

// PROVISIONS
const PROVISIONS = [
  { name: "Food", cost: 2 },
  { name: "Shovel", cost: 3 },
  { name: "Torch", cost: 1 },
  { name: "Bandage", cost: 4 },
  { name: "Antivenom", cost: 6 }
];

// CLASSES
const CLASSES = [
  "Crusader",
  "Leper",
  "Hellion",
  "Plague Doctor",
  "Vestal",
  "Occultist",
  "Highwayman",
  "Grave Robber",
  "Jester",
  "Bounty Hunter",
  "Houndmaster",
  "Man-at-Arms",
  "Flagellant",
  "Shieldbreaker",
  "Antiquarian"
];

// POS_QUIRKS
const POS_QUIRKS = [
  "Dextrous",
  "Strong",
  "Stout",
  "Robust",
  "Steady",
  "Quick Healer",
  "Iron Will",
  "Fast Reflexes",
  "Hardy",
  "Sharp-eyed"
];

// NEG_QUIRKS
const NEG_QUIRKS = [
  "Fragile",
  "Cowardly",
  "Clumsy",
  "Vengeful",
  "Irrational",
  "Nervous",
  "Pessimist",
  "Greedy",
  "Obsessive",
  "Mark of Death"
];

// BUILDINGS
const BUILDINGS = {
  barracks: { level: 1, maxLevel: 3, benefit: "Stress Recovery" },
  blacksmith: { level: 1, maxLevel: 3, benefit: "Weapon Upgrade" },
  guild: { level: 1, maxLevel: 3, benefit: "Class Training" },
  sanitarium: { level: 1, maxLevel: 3, benefit: "Remove Negative Quirks" },
  stagecoach: { level: 1, maxLevel: 3, benefit: "Hire Heroes" },
  tavern: { level: 1, maxLevel: 3, benefit: "Stress Relief" },
  merchant: { level: 1, maxLevel: 3, benefit: "Sell Items" },
  abbey: { level: 1, maxLevel: 3, benefit: "Remove Negative Quirks" },
  altar: { level: 1, maxLevel: 3, benefit: "Bless Heroes" }
};

// EXPORT MODULE
export {
  REGIONS,
  BOSSES,
  DD_RUNS,
  PROVISIONS,
  CLASSES,
  POS_QUIRKS,
  NEG_QUIRKS,
  BUILDINGS
};