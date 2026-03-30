// DATA.JS - COMPLETE DARKSTEST DUNGEON GUIDE

// ---------------------- REGIONS ---------------------- //
const REGIONS = {
  ruins: {
    teams: [
      {
        label: "Damage Core",
        main: ["Crusader", "Plague Doctor", "Hellion", "Vestal"],
        roles: ["Frontline", "Support", "Damage", "Healer"],
        notes: "Balanced high damage team"
      },
      {
        label: "Loot Team",
        main: ["Antiquarian", "Highwayman", "Occultist", "Leper"],
        roles: ["Loot", "Ranged", "Support", "Frontline"],
        notes: "Antiquarian ensures maximum loot, moderate combat"
      },
      {
        label: "Alternative Core",
        main: ["Man-at-Arms", "Arbalest", "Bounty Hunter", "Jester"],
        roles: ["Frontline", "Ranged", "Debuff", "Stress Relief"],
        notes: "Good substitute team"
      }
    ],
    focus: ["Holy", "Blight"],
    tips: [
      "Undead are IMMUNE to bleed. Use Blight and Holy exclusively.",
      "Skeletons can self-resurrect once. Overkill with blight DoT to prevent this.",
      "Bone Rabble should be cleared fast - they swarm and stun-lock backliners.",
      "Holy Water on Ruins curios prevents most negative outcomes.",
      "Courtyard events can spawn Pestilent variants - bring extra antivenom."
    ]
  },
  weald: {
    teams: [
      {
        label: "Damage Core",
        main: ["Hellion", "Bounty Hunter", "Vestal", "Highwayman"],
        roles: ["Frontline", "Debuff", "Healer", "Ranged"],
        notes: "High damage, moderate stress management"
      },
      {
        label: "Loot Team",
        main: ["Antiquarian", "Occultist", "Highwayman", "Hellion"],
        roles: ["Loot", "Support", "Ranged", "Frontline"],
        notes: "Antiquarian included for loot"
      },
      {
        label: "Alternative Core",
        main: ["Crusader", "Plague Doctor", "Jester", "Arbalest"],
        roles: ["Frontline", "Support", "Stress Relief", "Ranged"],
        notes: "Substitute team with good survivability"
      }
    ],
    focus: ["Bleed", "Mark", "Protection Strip"],
    tips: [
      "Brigand Matchman - kill before he summons reinforcements.",
      "Fungal Scratcher causes Infected - food consumption +33%.",
      "Webber enemies shuffle positions - maintain flexibility.",
      "Bleed + Mark synergy: BH marks, Hellion shreds.",
      "Stress healer critical - Weald has many stress-dealing combats."
    ]
  },
  warrens: {
    teams: [
      {
        label: "Damage Core",
        main: ["Houndmaster", "Hellion", "Plague Doctor", "Vestal"],
        roles: ["Debuff", "Frontline", "Support", "Healer"],
        notes: "Beast focused"
      },
      {
        label: "Loot Team",
        main: ["Antiquarian", "Highwayman", "Occultist", "Leper"],
        roles: ["Loot", "Ranged", "Support", "Frontline"],
        notes: "Max loot team"
      },
      {
        label: "Alternative Core",
        main: ["Crusader", "Bounty Hunter", "Jester", "Arbalest"],
        roles: ["Frontline", "Debuff", "Stress Relief", "Ranged"],
        notes: "Substitute team"
      }
    ],
    focus: ["Bleed", "Blight"],
    tips: [
      "Swine enemies are Beast-type - Houndmaster Mark triggers bonus damage.",
      "Disease is rampant - PD's Battlefield Medicine essential.",
      "Carrion Eaters spawn from corpses - prevent corpse creation.",
      "Swinetaur Commanders can generate reinforcements - kill first.",
      "Pack shorter dungeons to minimize disease."
    ]
  },
  cove: {
    teams: [
      {
        label: "Damage Core",
        main: ["Hellion", "Arbalest", "Vestal", "Plague Doctor"],
        roles: ["Frontline", "Ranged", "Healer", "Support"],
        notes: "Eldritch and shuffle aware"
      },
      {
        label: "Loot Team",
        main: ["Antiquarian", "Highwayman", "Occultist", "Hellion"],
        roles: ["Loot", "Ranged", "Support", "Frontline"],
        notes: "Antiquarian ensures treasure"
      },
      {
        label: "Alternative Core",
        main: ["Crusader", "Bounty Hunter", "Jester", "Plague Doctor"],
        roles: ["Frontline", "Debuff", "Stress Relief", "Support"],
        notes: "Substitute team"
      }
    ],
    focus: ["Pierce", "Eldritch"],
    tips: [
      "Cove enemies have 40-60% bleed resist.",
      "Squiffy Ghast applies massive stress - keep Vestal ready.",
      "Shuffle is constant - at least 2 heroes with positional flexibility.",
      "Shieldbreaker's Pierce bypasses high-protection enemies.",
      "Eerie Coral curio with Medicinal Herbs removes negative quirk."
    ]
  }
};

// ---------------------- BOSSES ---------------------- //
const BOSSES = [
  {
    name: "Bone Commander",
    region: "ruins",
    tiers: {
      apprentice: ["Crusader", "Vestal", "Hellion", "Bounty Hunter"],
      veteran: ["Crusader", "Plague Doctor", "Hellion", "Occultist"],
      champion: ["Crusader", "Plague Doctor", "Hellion", "Vestal"]
    },
    dlc: false
  },
  {
    name: "The Swine King",
    region: "warrens",
    tiers: {
      apprentice: ["Houndmaster", "Hellion", "Vestal", "Plague Doctor"],
      veteran: ["Houndmaster", "Hellion", "Plague Doctor", "Occultist"],
      champion: ["Houndmaster", "Hellion", "Vestal", "Plague Doctor"]
    },
    dlc: false
  },
  {
    name: "Prophet of the Cove",
    region: "cove",
    tiers: {
      apprentice: ["Hellion", "Arbalest", "Vestal", "Plague Doctor"],
      veteran: ["Hellion", "Arbalest", "Plague Doctor", "Occultist"],
      champion: ["Hellion", "Arbalest", "Vestal", "Plague Doctor"]
    },
    dlc: false
  },
  {
    name: "Abomination of the Ruins",
    region: "ruins",
    tiers: {
      apprentice: ["Crusader", "Hellion", "Vestal", "Bounty Hunter"],
      veteran: ["Crusader", "Hellion", "Plague Doctor", "Occultist"],
      champion: ["Crusader", "Hellion", "Vestal", "Plague Doctor"]
    },
    dlc: true
  }
];

// ---------------------- DARKEST DUNGEON ---------------------- //
const DARKEST = [
  {
    name: "Darkest Dungeon Expedition 1",
    parties: ["Crusader", "Hellion", "Vestal", "Bounty Hunter"]
  },
  {
    name: "Darkest Dungeon Expedition 2",
    parties: ["Houndmaster", "Arbalest", "Occultist", "Jester"]
  }
];

// ---------------------- PROVISIONS ---------------------- //
const PROVISIONS = {
  short: ["Food x4", "Torches x4", "Shovels x1", "Medicinal Herbs x2"],
  medium: ["Food x6", "Torches x6", "Shovels x2", "Medicinal Herbs x4"],
  long: ["Food x8", "Torches x8", "Shovels x3", "Medicinal Herbs x6"]
};

// ---------------------- HEROES / ROSTER ---------------------- //
const CLASSES = [
  "Crusader","Vestal","Hellion","Bounty Hunter","Plague Doctor","Arbalest",
  "Highwayman","Jester","Houndmaster","Occultist","Leper","Man-at-Arms"
];

// ---------------------- QUIRKS ---------------------- //
const QUIRKS = {
  positive: [
    {name:"Unerring",effect:"+5% accuracy",tags:["combat","ranged"]},
    {name:"Quick Reflexes",effect:"+5% dodge",tags:["combat","defense"]},
    {name:"Resilient",effect:"+15 stress resist",tags:["stress"]}
  ],
  negative: [
    {name:"Nervous",effect:"+10 stress per turn",tags:["stress"]},
    {name:"Zoophobia",effect:"Fear of beasts - -5% damage vs beasts",tags:["combat","beast"]},
    {name:"Claustrophobic",effect:"-5% speed in dungeons",tags:["dungeon"]}
  ]
};

// ---------------------- ESTATE BUILDINGS ---------------------- //
const ESTATE = [
  {name:"Guild Hall",maxLevel:5,trinketCost:[2,3,5,8,12],severity:["Low","Medium","High","High","Critical"]},
  {name:"Blacksmith",maxLevel:5,trinketCost:[1,2,4,6,10],severity:["Low","Medium","High","High","Critical"]},
  {name:"Abbey",maxLevel:3,trinketCost:[2,4,6],severity:["Low","Medium","High"]},
  {name:"Sanctuary",maxLevel:3,trinketCost:[1,3,5],severity:["Low","Medium","High"]},
  {name:"Tavern",maxLevel:5,trinketCost:[1,2,4,6,8],severity:["Low","Medium","High","High","Critical"]}
];