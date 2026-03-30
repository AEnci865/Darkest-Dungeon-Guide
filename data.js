// ============================================================
//  data.js — All static game data for DD Estate Optimizer
// ============================================================

var CLASSES = [
  "Antiquarian", "Arbalest", "Abomination", "Bounty Hunter", "Crusader",
  "Flagellant", "Grave Robber", "Hellion", "Highwayman", "Houndmaster",
  "Jester", "Leper", "Man-at-Arms", "Occultist", "Plague Doctor",
  "Shieldbreaker", "Vestal"
];

// ── REGION TEAM COMPOSITIONS ─────────────────────────────────
var REGIONS = {
  ruins: {
    4: {
      main: "Vestal", mS: ["Judgment", "Dazzling Light", "Divine Grace", "Divine Comfort"],
      sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Sacrificial Stab"]
    },
    3: {
      main: "Plague Doctor", mS: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Disorienting Blast"],
      sub: "Jester", sS: ["Inspiring Tune", "Harvest", "Solo", "Slice Off"]
    },
    2: {
      main: "Highwayman", mS: ["Duelist's Advance", "Point Blank Shot", "Pistol Shot", "Open Vein"],
      sub: "Houndmaster", sS: ["Hound's Rush", "Whistle", "Blackjack", "Lick Wounds"]
    },
    1: {
      main: "Crusader", mS: ["Smite", "Holy Lance", "Stunning Blow", "Inspiring Cry"],
      sub: "Leper", sS: ["Chop", "Hew", "Purge", "Withstand"]
    }
  },
  weald: {
    4: {
      main: "Arbalest", mS: ["Sniper Shot", "Flare", "Rallying Flare", "Bola"],
      sub: "Vestal", sS: ["Divine Grace", "Dazzling Light", "Judgment", "Divine Comfort"]
    },
    3: {
      main: "Houndmaster", mS: ["Hound's Rush", "Cry Havoc", "Guard Dog", "Lick Wounds"],
      sub: "Occultist", sS: ["Wyrd Reconstruction", "Weakening Curse", "Pull of the Abyss", "Sacrificial Stab"]
    },
    2: {
      main: "Bounty Hunter", mS: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"],
      sub: "Abomination", sS: ["Manacles", "Beast's Bile", "Transform", "Absolution"]
    },
    1: {
      main: "Hellion", mS: ["Wicked Hack", "Iron Swan", "If It Bleeds", "YAWP!"],
      sub: "Flagellant", sS: ["Punish", "Redeem", "Rain of Sorrows", "Reclaim"]
    }
  },
  warrens: {
    4: {
      main: "Occultist", mS: ["Wyrd Reconstruction", "Weakening Curse", "Hands from Below", "Pull of the Abyss"],
      sub: "Arbalest", sS: ["Sniper Shot", "Rallying Flare", "Bandage", "Bola"]
    },
    3: {
      main: "Jester", mS: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"],
      sub: "Houndmaster", sS: ["Hound's Rush", "Cry Havoc", "Whistle", "Lick Wounds"]
    },
    2: {
      main: "Houndmaster", mS: ["Hound's Rush", "Blackjack", "Cry Havoc", "Guard Dog"],
      sub: "Abomination", sS: ["Manacles", "Beast's Bile", "Absolution", "Transformation"]
    },
    1: {
      main: "Flagellant", mS: ["Punish", "Rain of Sorrows", "Redeem", "Reclaim"],
      sub: "Hellion", sS: ["Wicked Hack", "If It Bleeds", "YAWP!", "Adrenaline Rush"]
    }
  },
  cove: {
    4: {
      main: "Vestal", mS: ["Judgment", "Divine Grace", "Divine Comfort", "Dazzling Light"],
      sub: "Occultist", sS: ["Wyrd Reconstruction", "Hands from Below", "Weakening Curse", "Pull of the Abyss"]
    },
    3: {
      main: "Plague Doctor", mS: ["Noxious Blast", "Incision", "Battlefield Medicine", "Disorienting Blast"],
      sub: "Occultist", sS: ["Wyrd Reconstruction", "Hands from Below", "Weakening Curse", "Sacrificial Stab"]
    },
    2: {
      main: "Shieldbreaker", mS: ["Pierce", "Puncture", "Snake Skin", "Expose Weakness"],
      sub: "Highwayman", sS: ["Duelist's Advance", "Point Blank Shot", "Tracking Shot", "Open Vein"]
    },
    1: {
      main: "Man-at-Arms", mS: ["Crush", "Rampart", "Defender", "Retribution"],
      sub: "Hellion", sS: ["Wicked Hack", "If It Bleeds", "Iron Swan", "YAWP!"]
    }
  }
};

// ── REGION INTEL ─────────────────────────────────────────────
var REGION_INTEL = {
  ruins: {
    focuses: [{ label: "Holy", type: "holy" }, { label: "Blight", type: "blight" }],
    subtitle: "Undead enemies are immune to Bleed. Prioritize Holy damage and Blight. Stress generation is moderate but constant.",
    tips: [
      "Undead are IMMUNE to bleed. Use Blight and Holy exclusively.",
      "Skeletons can self-resurrect once. Overkill with blight DoT to prevent this.",
      "Bone Rabble should be cleared fast — they swarm and stun-lock backliners.",
      "Holy Water on Ruins curios prevents most negative outcomes.",
      "Courtyard events can spawn Pestilent variants — bring extra antivenom."
    ]
  },
  weald: {
    focuses: [{ label: "Bleed", type: "bleed" }, { label: "Mark", type: "mark" }, { label: "Prot Strip", type: "prot" }],
    subtitle: "Enemies often have high protection. Brigands hit hard from any position. Fungal enemies cause disease — bring more food.",
    tips: [
      "Brigand Matchman — kill before he summons reinforcements. Highest priority target.",
      "Fungal Scratcher causes Infected — food consumption +33%. Bring 8-10 food on medium.",
      "Webber enemies can shuffle party positions — have positional flexibility.",
      "Bleed + Mark synergy: BH marks, then Hellion shreds with If It Bleeds.",
      "Stress healer (Jester/Vestal) critical — Weald has many stress-dealing combats."
    ]
  },
  warrens: {
    focuses: [{ label: "Bleed", type: "bleed" }, { label: "Blight", type: "blight" }],
    subtitle: "Beast-type enemies bleed well. Disease vectors are everywhere. High stress generation from pig-men affronts.",
    tips: [
      "Swine enemies are all Beast-type — Houndmaster's Mark and Cry trigger bonus damage.",
      "Disease is rampant — PD's Battlefield Medicine is a must.",
      "Carrion Eaters spawn from corpses — use abilities that prevent corpse creation.",
      "Swinetaur Commanders can generate reinforcements — kill them first.",
      "Pack shorter dungeons to minimize disease accumulation."
    ]
  },
  cove: {
    focuses: [{ label: "Pierce", type: "pierce" }, { label: "Eldritch", type: "eldritch" }],
    subtitle: "Eldritch enemies are resistant to Bleed and Blight. Shuffle abilities common — maintain position flexibility.",
    tips: [
      "Cove enemies have 40-60% bleed resist — do NOT rely on bleed DoT here.",
      "Squiffy Ghast applies massive stress — your Vestal must be on stress-heal watch.",
      "Shuffle is constant — bring at least 2 heroes with positional flexibility.",
      "Shieldbreaker's Pierce bypasses the Cove's high-protection enemy variants.",
      "Eerie Coral curio (use Medicinal Herbs) removes a negative quirk for free."
    ]
  }
};

// ── BOSSES ────────────────────────────────────────────────────
var BOSSES = [
  {
    name: "The Necromancer", region: "Ruins", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Vestal · Plague Doctor · Highwayman · Crusader" },
      { label: "Alternate", heroes: "Arbalest · Occultist · Bounty Hunter · Hellion" }
    ],
    mechanics: [
      "Summons Bone Courtiers and Bone Soldiers — clear them or get overwhelmed",
      "Deal damage to push him to Phase 2 faster — he heals on summon turns",
      "Backline reach required: Ruins enemies sit in rows 3-4",
      "Crusader's Smite deals 33% bonus to Unholy — slot him",
      "Necromancer Lord variant (Veteran+): has self-heal — sustained pressure needed"
    ],
    avoid: [
      "Never leave summoned Courtiers alive — they can out-sustain your damage",
      "Avoid all-bleed team — undead are immune to bleed",
      "Don't camp-heal mid-fight if summons are active"
    ]
  },
  {
    name: "The Swine Prince", region: "Weald", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Arbalest · Occultist · Houndmaster · Man-at-Arms" },
      { label: "Alternate", heroes: "Vestal · Jester · Highwayman · Hellion" }
    ],
    mechanics: [
      "NEVER hit Wilbur — Swine King enters rage mode and wipes the party",
      "Kill Wilbur LAST or let him live — he does minimal damage alone",
      "Focus all damage on Swine King until he's dead",
      "Arbalest's Bola is crucial to prevent Wilbur buffing",
      "HM's Hound Rush + Blackjack can stun Wilbur to skip his buff turns"
    ],
    avoid: [
      "CRITICAL: ANY hit on Wilbur causes Swine King frenzy",
      "Don't bring multi-target abilities if Wilbur is alive",
      "Never rely on random targeting heroes (Leper, Abomination transformation)"
    ]
  },
  {
    name: "The Hag", region: "Weald", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Occultist · Plague Doctor · Highwayman · Jester" },
      { label: "Alternate", heroes: "Arbalest · Bounty Hunter · Man-at-Arms · Vestal" }
    ],
    mechanics: [
      "She traps a hero in the cauldron — that hero can't act and takes damage each round",
      "Skills that can hit rank 4 are critical: PBS, Occultist Stab, Arbalest Sniper",
      "Jester's Finale or Arbalest's Sniper can reach her in the back",
      "Heal the trapped hero — they still take DoT damage inside",
      "Stress heal essential — this fight is a war of attrition"
    ],
    avoid: [
      "Don't bring heroes with no rank 4 range — you'll have a dead slot constantly",
      "Never let the cauldron DoT go unhealed",
      "Avoid slow teams — she heals herself at certain health thresholds"
    ]
  },
  {
    name: "The Drowned Crew / Brigand Pounder", region: "Warrens / Weald", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Pounder Primary", heroes: "Plague Doctor · Bounty Hunter · Houndmaster · Vestal" },
      { label: "Drowned Primary", heroes: "Occultist · Hellion · Flagellant · Vestal" }
    ],
    mechanics: [
      "Brigand Pounder: destroy it in 3 turns before it fires",
      "Kill Fuseman and Matchman before Pounder is armed or wipe is imminent",
      "Drowned Crew: kill the Drowned Sailor first — he can summon more crew endlessly",
      "High bleed synergy against Drowned (human subtype despite appearance)",
      "Jester's Finale can chain-delete the Brigand Pounder immediately"
    ],
    avoid: [
      "Never let Matchman survive a turn with Pounder armed",
      "Don't neglect stress — both fights generate massive stress",
      "Avoid single-target-only comps for Pounder fight"
    ]
  },
  {
    name: "The Siren", region: "Cove", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Vestal · Plague Doctor · Shieldbreaker · Man-at-Arms" },
      { label: "Alternate", heroes: "Occultist · Arbalest · Highwayman · Houndmaster" }
    ],
    mechanics: [
      "She will charm a hero — they fight for her side for 1–3 turns",
      "Charmed heroes take reduced damage — but can be hit to break charm faster",
      "Shieldbreaker Pierce bypasses her high protection",
      "Keep stress low going in — charmed heroes use all their abilities",
      "MAA's Guard can protect party from charmed hero's attacks"
    ],
    avoid: [
      "Never bring heroes with high AoE damage — they'll massacre your own party when charmed",
      "Don't stack on bleed — Cove enemies resist it strongly",
      "Avoid bringing Abomination — transformation while charmed is catastrophic"
    ]
  },
  {
    name: "The Flesh", region: "Warrens", tiers: "Apprentice / Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Plague Doctor · Occultist · Flagellant · Vestal" },
      { label: "Alternate", heroes: "Arbalest · Bounty Hunter · Man-at-Arms · Houndmaster" }
    ],
    mechanics: [
      "The Flesh has multiple body parts — Twitching Column is highest priority kill",
      "Immovable — no position shuffling. Static team compositions work",
      "Blight is extremely effective — stack it on body parts and wait",
      "Corroded Body variant (Champion): applies disease — PD mandatory",
      "High HP pool — this is a sustained fight. Full healing comp is viable"
    ],
    avoid: [
      "Never ignore Twitching Column — it buffs the fight dramatically",
      "Avoid running out of heals — Flesh hits hard and has many parts",
      "Don't forget food: fight can run 8–12 rounds"
    ]
  },
  {
    name: "The Collector", region: "All (Roaming)", tiers: "Veteran / Champion",
    teams: [
      { label: "Primary", heroes: "Vestal · Plague Doctor · Houndmaster · Highwayman" },
      { label: "Alternate", heroes: "Arbalest · Occultist · Man-at-Arms · Crusader" }
    ],
    mechanics: [
      "Summons 'Head' versions of your dead heroes — they inherit some stats",
      "Kill the Heads immediately — they deal significant damage",
      "Collector himself has moderate HP but stuns and debuffs constantly",
      "Bring stun resist trinkets — stun resist is key to surviving his turns",
      "AoE skills excel here — three targets present constantly"
    ],
    avoid: [
      "Never walk into a Collector fight under-provisioned",
      "Don't neglect the summoned heads — they will pile up fast",
      "Avoid heroes with virtuous-dependent strategies — RNG heavy fight"
    ]
  }
];

// ── DARKEST DUNGEON RUNS ──────────────────────────────────────
var DD_RUNS = [
  {
    name: "Raid 1 — We Are the Flame", subtitle: "Shuffling Horror",
    team: "Highwayman · Crusader · Jester · Vestal",
    desc: "The first foray is manageable but deceptive. Enemy shuffles are constant.",
    key: [
      "Every enemy shuffles your party — bring heroes that function from multiple positions",
      "Highwayman works from positions 1–3, making him invaluable here",
      "Crusader's Inspiring Cry provides emergency stress healing mid-combat",
      "Vestal must stay in position 4 — protect her above all else",
      "The final boss applies extreme stress — virtuous heroes are far safer"
    ],
    watch: [
      "Position shuffles can strand your healer in slot 1",
      "Stress accumulates fast — manage it between rooms with Jester's tune",
      "Bring extra bandages — bleed sources are present"
    ]
  },
  {
    name: "Raid 2 — Lighting the Way", subtitle: "Templar Onslaught",
    team: "Arbalest · Houndmaster · Man-at-Arms · Vestal",
    desc: "Three Ancestor's Talismans must be found. Templars hit extremely hard.",
    key: [
      "Collect all 3 Talismans before the final room — they're mandatory",
      "MAA's Defender/Guard is crucial — Templars focus single targets",
      "Arbalest's Rallying Flare provides reliable stress management for the team",
      "Houndmaster's Cry Havoc applies debuffs to the large Templar groups",
      "Bring maximum torches — this dungeon has severe darkness penalties"
    ],
    watch: [
      "Never rush — exploration is mandatory to find all 3 Talismans",
      "Templar Impaler hits backline — protect your Vestal",
      "Stress builds rapidly from Templars' special attacks"
    ]
  },
  {
    name: "Raid 3 — Belly of the Beast", subtitle: "Exhaustion Marathon",
    team: "Plague Doctor · Highwayman · Occultist · Hellion",
    desc: "The longest and most punishing foray. Resource management defines success.",
    key: [
      "PD's Battlefield Medicine is mandatory — disease stacks rapidly here",
      "Occultist heal variance is risky but his debuffs and reach are essential",
      "Hellion from position 1 with YAWP keeps stress under control via stuns",
      "Camp aggressively — this run will require 2–3 camps minimum",
      "Bring extra food, herbs, bandages beyond what you think you need"
    ],
    watch: [
      "Exhaustion forces heroes to skip turns — plan for it",
      "Disease stacks reduce max HP — PD must cleanse constantly",
      "The run is extremely long — heroes will accumulate multiple quirks"
    ]
  },
  {
    name: "Raid 4 — Hell is in the Heart", subtitle: "Final Confrontation",
    team: "Crusader · Highwayman · Jester · Vestal",
    desc: "The final battle against the Heart of Darkness. Choose your sacrifices.",
    key: [
      "The Heart has three phases — each with different priority targets",
      "Phase 1: Kill the Coagulated Heart first to stop guaranteed crits",
      "Phase 2: Manage stress — Jester's Finale as finisher for phase 2 body",
      "Phase 3: The Heart itself attacks every hero — full healing focus",
      "Crusader is the single best hero here — Holy damage + stress heal + self-sustain"
    ],
    watch: [
      "Heroes who complete this run are Resolute — they cannot re-enter the DD",
      "Bring your most virtuous, least quirk-burdened heroes",
      "Don't bring irreplaceable heroes unless you must — acceptable sacrifice is strategy"
    ]
  }
];

// ── PROVISIONS ────────────────────────────────────────────────
var PROVISIONS = {
  short: {
    rooms: "3–5 rooms",
    note: "Short dungeons are resource-light. Conserve for future runs.",
    regions: {
      ruins: [["Torch", "4", "Standard"], ["Food", "4", "Prevent hunger dmg"], ["Medicinal Herbs", "1", "Disease clear"], ["Antivenom", "1", "Precaution"], ["Holy Water", "1", "Curio use"], ["Bandage", "1", "Precaution"]],
      weald: [["Torch", "4", ""], ["Food", "6", "Fungal disease"], ["Antivenom", "2", "Disease likely"], ["Bandage", "2", "Bleed"], ["Medicinal Herbs", "2", "Multi-disease risk"], ["Holy Water", "0", "Not useful"]],
      warrens: [["Torch", "4", ""], ["Food", "5", ""], ["Antivenom", "3", "Disease heavy"], ["Bandage", "2", ""], ["Medicinal Herbs", "2", ""], ["Laudanum", "1", "Stress"]],
      cove: [["Torch", "4", ""], ["Food", "4", ""], ["Antivenom", "1", ""], ["Bandage", "3", "Bleed focus"], ["Holy Water", "1", ""], ["Shovel", "1", "Obstacles"]]
    }
  },
  medium: {
    rooms: "6–8 rooms",
    note: "Standard provisioning tier. One camp typically needed.",
    regions: {
      ruins: [["Torch", "8", ""], ["Food", "8", ""], ["Medicinal Herbs", "2", ""], ["Antivenom", "2", ""], ["Holy Water", "2", "Curio + undead"], ["Bandage", "2", ""], ["Shovel", "1", ""], ["Key", "1", "Locked curios"]],
      weald: [["Torch", "8", ""], ["Food", "10", "Fungal disease +33%"], ["Antivenom", "4", ""], ["Bandage", "4", "Bleed"], ["Medicinal Herbs", "3", ""], ["Shovel", "2", ""], ["Holy Water", "1", ""], ["Laudanum", "1", ""]],
      warrens: [["Torch", "8", ""], ["Food", "8", ""], ["Antivenom", "5", "Disease endemic"], ["Bandage", "3", ""], ["Medicinal Herbs", "3", ""], ["Laudanum", "2", "Stress endemic"], ["Shovel", "1", ""], ["Key", "1", ""]],
      cove: [["Torch", "8", ""], ["Food", "8", ""], ["Antivenom", "2", ""], ["Bandage", "4", ""], ["Holy Water", "2", ""], ["Shovel", "2", "Obstacles common"], ["Laudanum", "1", ""], ["Key", "1", ""]]
    }
  },
  long: {
    rooms: "9–12 rooms",
    note: "Full provisioning. Two camps required.",
    regions: {
      ruins: [["Torch", "12", ""], ["Food", "12", ""], ["Medicinal Herbs", "3", ""], ["Antivenom", "3", ""], ["Holy Water", "4", ""], ["Bandage", "3", ""], ["Shovel", "2", ""], ["Key", "2", ""], ["Laudanum", "2", ""], ["Skeleton Key", "1", ""]],
      weald: [["Torch", "12", ""], ["Food", "16", "Fungal: pack extra"], ["Antivenom", "6", ""], ["Bandage", "6", ""], ["Medicinal Herbs", "4", ""], ["Shovel", "3", ""], ["Holy Water", "1", ""], ["Laudanum", "2", ""], ["Key", "2", ""], ["Skeleton Key", "1", ""]],
      warrens: [["Torch", "12", ""], ["Food", "12", ""], ["Antivenom", "8", "Max antivenom"], ["Bandage", "4", ""], ["Medicinal Herbs", "4", ""], ["Laudanum", "3", ""], ["Shovel", "2", ""], ["Key", "2", ""], ["Skeleton Key", "1", ""], ["Holy Water", "1", ""]],
      cove: [["Torch", "12", ""], ["Food", "12", ""], ["Antivenom", "3", ""], ["Bandage", "6", ""], ["Holy Water", "3", ""], ["Shovel", "3", ""], ["Laudanum", "2", ""], ["Key", "2", ""], ["Skeleton Key", "1", ""], ["Medicinal Herbs", "2", ""]]
    }
  }
};

// ── QUIRKS ────────────────────────────────────────────────────
var POS_QUIRKS = [
  { name: "Tough", effect: "+10% Max HP — straight survivability", keep: "Lock", category: "general", synergy: {}, score: 7 },
  { name: "Hard Skinned", effect: "+5 PROT — reduces all incoming damage", keep: "Lock", category: "general", synergy: {}, score: 7 },
  { name: "Quick Reflexes", effect: "+2 SPD — better action order every round", keep: "Lock", category: "general", synergy: {}, score: 8 },
  { name: "Natural Swing", effect: "+5 ACC — hits land more consistently", keep: "Lock", category: "general", synergy: {}, score: 7 },
  { name: "Evasive", effect: "+5 DODGE — harder to hit", keep: "Lock", category: "general", synergy: {}, score: 6 },
  { name: "Accurate", effect: "+1% CRIT — small but permanent crit boost", keep: "Situational", category: "general", synergy: {}, score: 5 },
  { name: "Luminous", effect: "+2 SPD, +5 DODGE — global, always active", keep: "Lock", category: "general", synergy: {}, score: 9 },
  { name: "On Guard", effect: "(Round 1) +4 SPD, +5 DODGE — excellent initiative", keep: "Lock", category: "conditional", synergy: {}, score: 7 },
  { name: "Quick Draw", effect: "(Round 1) +4 SPD — good initiative", keep: "Situational", category: "conditional", synergy: {}, score: 5 },
  { name: "Precision Striker", effect: "(Melee) +3% CRIT — lock on melee damage dealers", keep: "Lock", category: "conditional", synergy: {}, score: 7 },
  { name: "Slugger", effect: "(Melee) +10% DMG — strong on frontline bruisers", keep: "Lock", category: "conditional", synergy: {}, score: 8 },
  { name: "Unerring", effect: "(Ranged) +10% DMG — must-lock on ranged heroes", keep: "Lock", category: "conditional", synergy: {}, score: 9 },
  { name: "Natural Eye", effect: "(Ranged) +5 ACC — pairs with Unerring nicely", keep: "Lock", category: "conditional", synergy: {}, score: 6 },
  { name: "Eagle Eye", effect: "(Ranged) +3% CRIT — good on Arbalest/HWM", keep: "Lock", category: "conditional", synergy: {}, score: 7 },
  { name: "Second Wind", effect: "(HP <50%) +10% DMG — activates near death", keep: "Situational", category: "conditional", synergy: {}, score: 5 },
  { name: "Warrior of Light", effect: "(Light >75) +10% DMG — strong high-torch bonus", keep: "Lock", category: "light", synergy: { bonusRegions: ['ruins', 'weald', 'warrens', 'cove'] }, score: 8 },
  { name: "Ruins Tactician", effect: "(Ruins) +15% DMG — pure damage in the Ruins", keep: "Lock", category: "region", synergy: { bonusRegions: ['ruins'] }, score: 10 },
  { name: "Weald Tactician", effect: "(Weald) +15% DMG — pure damage in the Weald", keep: "Lock", category: "region", synergy: { bonusRegions: ['weald'] }, score: 10 },
  { name: "Warrens Tactician", effect: "(Warrens) +15% DMG — pure damage in the Warrens", keep: "Lock", category: "region", synergy: { bonusRegions: ['warrens'] }, score: 10 },
  { name: "Cove Tactician", effect: "(Cove) +15% DMG — pure damage in the Cove", keep: "Lock", category: "region", synergy: { bonusRegions: ['cove'] }, score: 10 },
  { name: "Cove Adventurer", effect: "(Cove) -20% Stress received", keep: "Lock", category: "region", synergy: { bonusRegions: ['cove'] }, score: 10 },
  { name: "Hatred of Eldritch", effect: "(vs Eldritch) +15% DMG, +15% Stress Resist", keep: "Lock", category: "monster", synergy: { bonusRegions: ['cove', 'ruins'] }, score: 10 },
  { name: "Unyielding", effect: "+10% Deathblow Resist — direct death prevention", keep: "Lock", category: "resist", synergy: {}, score: 9 }
];

var NEG_QUIRKS = [
  { name: "Fragile", effect: "-10% Max HP — dangerous on frontliners", keep: "Purge", category: "general", synergy: {}, score: -7 },
  { name: "The Runs", effect: "-10 DEF, -10% Max HP — double penalty", keep: "Purge", category: "general", synergy: {}, score: -8 },
  { name: "Tetanus", effect: "-5 ACC, -10% DMG — significant combat penalty", keep: "Purge", category: "general", synergy: {}, score: -8 },
  { name: "Syphilis", effect: "-5 ACC, -10 DMG, -10% Max HP — severe triple penalty", keep: "Purge", category: "general", synergy: {}, score: -10 },
  { name: "Ruins Phobe", effect: "(Ruins) -20% Stress Resist — badly stressed in Ruins", keep: "Purge", category: "region", synergy: { penaltyRegions: ['ruins'] }, score: -10 },
  { name: "Weald Phobe", effect: "(Weald) -20% Stress Resist — badly stressed in Weald", keep: "Purge", category: "region", synergy: { penaltyRegions: ['weald'] }, score: -10 },
  { name: "Warrens Phobe", effect: "(Warrens) -20% Stress Resist — badly stressed in Warrens", keep: "Purge", category: "region", synergy: { penaltyRegions: ['warrens'] }, score: -10 },
  { name: "Cove Phobe", effect: "(Cove) +20% Stress received — brutal in the Cove", keep: "Purge", category: "region", synergy: { penaltyRegions: ['cove'] }, score: -10 },
  { name: "Wasting Sickness", effect: "-50% Disease Resist — never run in Warrens", keep: "Purge", category: "resist", synergy: { penaltyRegions: ['warrens'] }, score: -10 },
  { name: "Compulsive", effect: "20% chance to auto-trigger ANY curio", keep: "Purge", category: "curio", synergy: { penaltyRegions: ['ruins', 'weald', 'warrens', 'cove'] }, score: -8 }
];

// ── BUILDINGS ─────────────────────────────────────────────────
var BUILDINGS = [
  {
    id: 'abbey', name: 'Abbey', icon: '⛪',
    upgrades: [
      { label: 'Cloister', maxLevel: 6, effects: ['Unlocks Prayer treatment', 'Improved quality', 'Further improvement', 'Veteran recovery', 'Reduced cost', 'Max mastery'], tags: ['stress', 'survival'], priority: 9 },
      { label: 'Transept', maxLevel: 6, effects: ['Unlocks Flagellation', 'Improved quality', 'Further improvement', 'Veteran recovery', 'Reduced cost', 'Max mastery'], tags: ['stress', 'survival'], priority: 8 }
    ]
  },
  {
    id: 'blacksmith', name: 'Blacksmith', icon: '⚒️',
    upgrades: [
      { label: 'Weaponsmithing', maxLevel: 4, effects: ['Apprentice weapons', 'Veteran weapons', 'Champion weapons', 'Max tier'], tags: ['speed', 'darkest'], priority: 10 },
      { label: 'Armorsmithing', maxLevel: 4, effects: ['Apprentice armor', 'Veteran armor', 'Champion armor', 'Max tier'], tags: ['survival', 'darkest'], priority: 10 }
    ]
  },
  {
    id: 'guild', name: 'Guild', icon: '⚔️',
    upgrades: [
      { label: 'Instructor Mastery', maxLevel: 4, effects: ['Apprentice skills', 'Veteran skills', 'Champion skills', 'Max tier'], tags: ['speed', 'darkest'], priority: 10 }
    ]
  },
  {
    id: 'stagecoach', name: 'Stage Coach', icon: '🚌',
    upgrades: [
      { label: 'Stagecoach Network', maxLevel: 5, effects: ['Recruit 2/week', 'Recruit 3/week', 'Recruit 4/week', 'Variety boost', 'Max 5/week'], tags: ['survival', 'speed'], priority: 9 },
      { label: 'Hero Barracks', maxLevel: 5, effects: ['Roster +2', 'Roster +4', 'Roster +6', 'Roster +8', 'Max 19 size'], tags: ['survival'], priority: 9 }
    ]
  }
];

// ── DUNGEONS (campaign optimizer) ─────────────────────────────
var DUNGEONS = [
  { name: "Ruins Short", region: "ruins", difficulty: 1, rewards: { gold: 2000, heirlooms: 6 }, boss: false },
  { name: "Ruins Medium", region: "ruins", difficulty: 2, rewards: { gold: 3500, heirlooms: 10 }, boss: false },
  { name: "Weald Short", region: "weald", difficulty: 1, rewards: { gold: 2000, heirlooms: 6 }, boss: false },
  { name: "Warrens Short", region: "warrens", difficulty: 1, rewards: { gold: 2000, heirlooms: 6 }, boss: false },
  { name: "Cove Short", region: "cove", difficulty: 1, rewards: { gold: 2000, heirlooms: 6 }, boss: false }
];
