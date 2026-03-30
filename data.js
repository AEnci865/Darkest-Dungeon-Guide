// ============================================================
//  data.js — THE OMNI-ESTATE MASTER DATA (FULL GAME + DLC)
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

var BOSSES = [
  { name: "The Necromancer", region: "Ruins", mechanics: ["Summons Skeletons; Moves Back"], teams: [{ label: "Unholy", heroes: "VES-PD-HWM-CRU" }], avoid: ["Bleed"] },
  { name: "The Swine Prince", region: "Warrens", mechanics: ["Wilbur marks targets"], teams: [{ label: "Anti-Mark", heroes: "ARB-OCC-HM-MAA" }], avoid: ["Hitting Wilbur"] },
  { name: "The Hag", region: "Weald", mechanics: ["Into the Pot"], teams: [{ label: "Reach", heroes: "HEL-BH-HWM-VES" }], avoid: ["Rank 1-2 only heroes"] },
  { name: "The Siren", region: "Cove", mechanics: ["Song of Desire (Charm)"], teams: [{ label: "Resist", heroes: "ANT-MAA-SB-OCC" }], avoid: ["Glass Cannons"] },
  { name: "The Flesh", region: "Warrens", mechanics: ["Multiple parts; High Blight weak"], teams: [{ label: "DoT Stack", heroes: "PD-OCC-FLA-VES" }], avoid: ["Low Healing"] },
  { name: "The Prophet", region: "Ruins", mechanics: ["Calamitous Prognosis"], teams: [{ label: "Occultist/MAA", heroes: "VES-PD-OCC-MAA" }], avoid: ["Low reach"] }
];

var SPECIAL_BOSSES = [
  { name: "The Collector", region: "Roaming", mechanics: ["Summons Heads"], teams: [{ label: "Stun/Burst", heroes: "VES-PD-HWM-HEL" }], avoid: ["Low ACC"] },
  { name: "The Shambler", region: "Darkness", mechanics: ["Shuffles party"], teams: [{ label: "Mobile", heroes: "GR-HWM-SB-CRU" }], avoid: ["Static formations"] },
  { name: "The Fanatic", region: "Crimson Court", mechanics: ["Burning at the Stake"], teams: [{ label: "High DMG", heroes: "VES-HWM-SB-HEL" }], avoid: ["Vampire heavy teams"] }
];

var DD_RUNS = [
  { name: "We Are the Flame", desc: "M1: Shuffling Horror", team: "PD - HM - CRU - VEST", key: ["Bleed Resist", "Mobility"], watch: ["Shuffling Horror"] },
  { name: "An Unblinkable Eye", desc: "M2: The Cyst", team: "ARB - OCC - HM - MAA", key: ["Guard Support", "Marks"], watch: ["Templar Impaler"] },
  { name: "Belly of the Beast", desc: "M3: Long Map", team: "PD - VES - FLA - HEL", key: ["Sustain", "Exhaustion"], watch: ["Mammoth Cyst"] },
  { name: "Hell is in the Heart", desc: "M4: The End", team: "Any Balanced Team", key: ["Final Confrontation"], watch: ["The Ancestor"] }
];

var PROVISIONS = {
  short: { regions: { ruins: [["Food", 8], ["Torch", 8]], weald: [["Food", 8], ["Shovel", 4]], cove: [["Food", 8], ["Herbs", 2]], warrens: [["Food", 8], ["Bandage", 2]], courtyard: [["Food", 12], ["Blood", 4]] } },
  medium: { regions: { ruins: [["Food", 12], ["Torch", 12]], weald: [["Food", 12], ["Shovel", 5]], cove: [["Food", 12], ["Herbs", 3]], warrens: [["Food", 12], ["Bandage", 3]], courtyard: [["Food", 18], ["Blood", 6]] } },
  long: { regions: { ruins: [["Food", 16], ["Torch", 16]], weald: [["Food", 16], ["Shovel", 6]], cove: [["Food", 16], ["Herbs", 4]], warrens: [["Food", 16], ["Bandage", 4]], courtyard: [["Food", 24], ["Blood", 8]] } }
};

var POS_QUIRKS = [
  { name: "Luminous", effect: "+2 SPD, +5 DODGE" },
  { name: "Hard Skinned", effect: "+10% PROT" },
  { name: "Quick Reflexes", effect: "+2 SPD" }
];

var NEG_QUIRKS = [
  { name: "The Fits", effect: "-2 SPD, -5 ACC" },
  { name: "Off Guard", effect: "-4 SPD, -5 DODGE (R1)" },
  { name: "Anemic", effect: "-10% Bleed Resist" }
];

var BUILDINGS = [
  { id: "stage_coach", name: "Stage Coach", upgrades: [{ label: "Barracks", costs: [8, 12, 18, 24, 32], type: "deed" }] },
  { id: "blacksmith", name: "Blacksmith", upgrades: [{ label: "Weapons", costs: [12, 20, 28, 36], type: "deed" }] },
  { id: "guild", name: "Guild", upgrades: [{ label: "Training", costs: [10, 15, 25, 35], type: "portrait" }] },
  { id: "sanitarium", name: "Sanitarium", upgrades: [{ label: "Medical Ward", costs: [15, 20, 30], type: "bust" }] }
];
