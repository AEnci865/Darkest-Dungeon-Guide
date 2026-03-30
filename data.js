// Darkest Dungeon Estate Guide - Full Game Data
// REGIONS, BOSSES, DD_RUNS, PROVISIONS, CLASSES, POS_QUIRKS, NEG_QUIRKS, BUILDINGS

const REGIONS = {
  ruins: {
    teams: [
      {
        label: "Team A - High Damage",
        4: { main: "Arbalest", mS: ["Sniper Shot","Rallying Flare","Blindfire","Bola"], sub: "Highwayman", sS: ["Point Blank Shot","Pistol Shot","Tracking Shot","Open Vein"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Sacrificial Stab"] },
        2: { main: "Hellion", mS: ["Wicked Hack","Iron Swan","If It Bleeds","YAWP!"], sub: "Bounty Hunter", sS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"] },
        1: { main: "Crusader", mS: ["Smite","Holy Lance","Stunning Blow","Inspiring Cry"], sub: "Flagellant", sS: ["Punish","Rain of Sorrows","Redeem","Reclaim"] }
      },
      {
        label: "Team B - Balanced Sustain",
        4: { main: "Vestal", mS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Sacrificial Stab"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Sacrificial Stab"], sub: "Jester", sS: ["Battle Ballad","Inspiring Tune","Slice Off","Harvest"] },
        2: { main: "Crusader", mS: ["Smite","Holy Lance","Stunning Blow","Inspiring Cry"], sub: "Leper", sS: ["Chop","Hew","Purge","Withstand"] },
        1: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Retribution"], sub: "Leper", sS: ["Chop","Hew","Purge","Withstand"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Vestal", mS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Sacrificial Stab"] },
        3: { main: "Highwayman", mS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"], sub: "Houndmaster", sS: ["Hound’s Rush","Target Whistle","Guard Dog","Lick Wounds"] },
        2: { main: "Antiquarian", mS: ["Flashpowder","Protect Me!","Nervous Stab","Invigorating Vapours"], sub: "Plague Doctor", sS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"] },
        1: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Bolster"], sub: "Crusader", sS: ["Smite","Holy Lance","Stunning Blow","Inspiring Cry"] }
      }
    ]
  },
  weald: {
    teams: [
      {
        label: "Team A - Bleed and Mark",
        4: { main: "Plague Doctor", mS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"], sub: "Arbalest", sS: ["Sniper Shot","Rallying Flare","Blindfire","Bola"] },
        3: { main: "Grave Robber", mS: ["Thrown Dagger","Pick to the Face","Shadow Fade","Lunge"], sub: "Highwayman", sS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"] },
        2: { main: "Houndmaster", mS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Pull of the Abyss","Sacrificial Stab"] },
        1: { main: "Bounty Hunter", mS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"], sub: "Hellion", sS: ["Wicked Hack","Iron Swan","If It Bleeds","YAWP!"] }
      },
      {
        label: "Team B - Control and Ranged",
        4: { main: "Jester", mS: ["Battle Ballad","Inspiring Tune","Slice Off","Harvest"], sub: "Vestal", sS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"] },
        3: { main: "Arbalest", mS: ["Sniper Shot","Rallying Flare","Blindfire","Bola"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Pull of the Abyss","Sacrificial Stab"] },
        2: { main: "Occultist", mS: ["Wyrd Reconstruction","Weakening Curse","Pull of the Abyss","Sacrificial Stab"], sub: "Crusader", sS: ["Smite","Holy Lance","Stunning Blow","Inspiring Cry"] },
        1: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Bolster"], sub: "Houndmaster", sS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Vestal", mS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Pull of the Abyss","Sacrificial Stab"] },
        3: { main: "Highwayman", mS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"], sub: "Bounty Hunter", sS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"] },
        2: { main: "Houndmaster", mS: ["Hound’s Rush","Target Whistle","Guard Dog","Lick Wounds"], sub: "Bounty Hunter", sS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"] },
        1: { main: "Antiquarian", mS: ["Flashpowder","Protect Me!","Nervous Stab","Invigorating Vapours"], sub: "Man-at-Arms", sS: ["Crush","Rampart","Defender","Bolster"] }
      }
    ]
  },
  warrens: {
    teams: [
      {
        label: "Team A - Beast Bleed Core",
        4: { main: "Highwayman", mS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"], sub: "Grave Robber", sS: ["Thrown Dagger","Pick to the Face","Shadow Fade","Lunge"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"] },
        2: { main: "Flagellant", mS: ["Punish","Rain of Sorrows","Redeem","Reclaim"], sub: "Bounty Hunter", sS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"] },
        1: { main: "Houndmaster", mS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"], sub: "Hellion", sS: ["Wicked Hack","Iron Swan","If It Bleeds","YAWP!"] }
      },
      {
        label: "Team B - Balanced Survivability",
        4: { main: "Vestal", mS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"], sub: "Plague Doctor", sS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"] },
        2: { main: "Bounty Hunter", mS: ["Collect Bounty","Mark for Death","Flashbang","Finish Him"], sub: "Houndmaster", sS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"] },
        1: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Bolster"], sub: "Flagellant", sS: ["Punish","Rain of Sorrows","Redeem","Reclaim"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Jester", mS: ["Battle Ballad","Inspiring Tune","Slice Off","Harvest"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"] },
        3: { main: "Hellion", mS: ["Wicked Hack","Iron Swan","If It Bleeds","YAWP!"], sub: "Highwayman", sS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"] },
        2: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Bolster"], sub: "Flagellant", sS: ["Punish","Rain of Sorrows","Redeem","Reclaim"] },
        1: { main: "Antiquarian", mS: ["Flashpowder","Protect Me!","Nervous Stab","Invigorating Vapours"], sub: "Houndmaster", sS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"] }
      }
    ]
  },
  cove: {
    teams: [
      {
        label: "Team A - Blight and Control",
        4: { main: "Arbalest", mS: ["Sniper Shot","Rallying Flare","Blindfire","Bola"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"] },
        3: { main: "Plague Doctor", mS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Sacrificial Stab"] },
        2: { main: "Shieldbreaker", mS: ["Pierce","Puncture","Snake Skin","Expose Weakness"], sub: "Highwayman", sS: ["Duelist’s Advance","Point Blank Shot","Tracking Shot","Open Vein"] },
        1: { main: "Occultist", mS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"], sub: "Man-at-Arms", sS: ["Crush","Rampart","Defender","Retribution"] }
      },
      {
        label: "Team B - Stress and Damage",
        4: { main: "Vestal", mS: ["Judgment","Dazzling Light","Divine Grace","Divine Comfort"], sub: "Occultist", sS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"] },
        3: { main: "Jester", mS: ["Battle Ballad","Inspiring Tune","Slice Off","Harvest"], sub: "Plague Doctor", sS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"] },
        2: { main: "Hellion", mS: ["Wicked Hack","Iron Swan","If It Bleeds","YAWP!"], sub: "Shieldbreaker", sS: ["Pierce","Puncture","Snake Skin","Expose Weakness"] },
        1: { main: "Flagellant", mS: ["Punish","Rain of Sorrows","Redeem","Reclaim"], sub: "Houndmaster", sS: ["Hound’s Rush","Target Whistle","Cry Havoc","Lick Wounds"] }
      },
      {
        label: "Team C - Antiquarian Loot",
        4: { main: "Man-at-Arms", mS: ["Crush","Rampart","Defender","Bolster"], sub: "Jester", sS: ["Battle Ballad","Inspiring Tune","Slice Off","Harvest"] },
        3: { main: "Occultist", mS: ["Wyrd Reconstruction","Weakening Curse","Hands from Below","Pull of the Abyss"], sub: "Plague Doctor", sS: ["Noxious Blast","Blinding Gas","Battlefield Medicine","Disorienting Blast"] },
        2: { main: "Highwayman", mS: ["Duelist’s Advance","Point Blank Shot","Pistol Shot","Tracking Shot"], sub: "Grave Robber", sS: ["Thrown Dagger","Pick to the Face","Shadow Fade","Lunge"] },
        1: { main: "Antiquarian", mS: ["Flashpowder","Protect Me!","Nervous Stab","Invigorating Vapours"], sub: "Man-at-Arms", sS: ["Crush","Rampart","Defender","Bolster"] }
      }
    ]
  }
};

// BOSSES, DD_RUNS, PROVISIONS, CLASSES, POS_QUIRKS, NEG_QUIRKS, BUILDINGS
// For brevity, I can generate the remaining sections in the same fully valid JS format next.