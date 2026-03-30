// -------------------- DATA.JS - FULL CAKE --------------------

// -------------------- HEROES & TEAMS --------------------
const REGIONS = {
  ruins: {
    teams: [
      {
        label: "Main Ruins Team",
        description: "Balanced team for general Ruins encounters.",
        heroes: [
          { name: "Arbalest", skills: ["Sniper Shot","Rallying Flare","Blindfire","Bola"] },
          { name: "Vestal", skills: ["Divine Grace","Judgment","Dazzling Light","Dazzling Light"] },
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] },
          { name: "Plague Doctor", skills: ["Noxious Blast","Plague Grenade","Battlefield Medicine","Disorienting Blast"] }
        ]
      },
      {
        label: "Substitute Ruins Team",
        description: "Alternative team if primary is unavailable.",
        heroes: [
          { name: "Leper", skills: ["Chop","Hack","Withstand","Solemnity"] },
          { name: "Occultist", skills: ["Wyrd Reconstruction","Weakening Curse","Sacrificial Stab","Abyssal Arts"] },
          { name: "Hellion", skills: ["Iron Swan","Barbaric Yell","If It Bleeds","Bleed Out"] },
          { name: "Vestal", skills: ["Divine Grace","Judgment","Dazzling Light","Dazzling Light"] }
        ]
      },
      {
        label: "Loot Ruins Team",
        description: "Optimized for treasure runs, includes Antiquarian.",
        heroes: [
          { name: "Antiquarian", skills: ["Protect Me","Collectibles","Gold Rush","Archaic Knowledge"] },
          { name: "Arbalest", skills: ["Sniper Shot","Rallying Flare","Blindfire","Bola"] },
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] },
          { name: "Plague Doctor", skills: ["Noxious Blast","Plague Grenade","Battlefield Medicine","Disorienting Blast"] }
        ]
      }
    ]
  },
  weald: {
    teams: [
      {
        label: "Main Weald Team",
        description: "Balanced Weald clearing team.",
        heroes: [
          { name: "Leper", skills: ["Chop","Hack","Withstand","Solemnity"] },
          { name: "Occultist", skills: ["Wyrd Reconstruction","Weakening Curse","Sacrificial Stab","Abyssal Arts"] },
          { name: "Hellion", skills: ["Iron Swan","Barbaric Yell","If It Bleeds","Bleed Out"] },
          { name: "Jester", skills: ["Inspiring Tune","Battle Ballad","Dirge","Solo"] }
        ]
      },
      {
        label: "Substitute Weald Team",
        description: "Flexible alternative team.",
        heroes: [
          { name: "Vestal", skills: ["Divine Grace","Judgment","Dazzling Light","Dazzling Light"] },
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] },
          { name: "Bounty Hunter", skills: ["Mark","Collect Bounty","Finish Him","Uppercut"] },
          { name: "Grave Robber", skills: ["Pick to the Face","Lunge","Shadow Fade","Thrown Dagger"] }
        ]
      },
      {
        label: "Loot Weald Team",
        description: "Treasure-focused with Antiquarian.",
        heroes: [
          { name: "Antiquarian", skills: ["Protect Me","Collectibles","Gold Rush","Archaic Knowledge"] },
          { name: "Hellion", skills: ["Iron Swan","Barbaric Yell","If It Bleeds","Bleed Out"] },
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] },
          { name: "Plague Doctor", skills: ["Noxious Blast","Plague Grenade","Battlefield Medicine","Disorienting Blast"] }
        ]
      }
    ]
  },
  warrens: {
    teams: [
      {
        label: "Main Warrens Team",
        description: "Beast-focused team for Warrens.",
        heroes: [
          { name: "Houndmaster", skills: ["Hound's Rush","Mark","Cry Havoc","Target Whistle"] },
          { name: "Crusader", skills: ["Smite","Zealous Accusation","Bulwark of Faith","Inspiring Cry"] },
          { name: "Occultist", skills: ["Wyrd Reconstruction","Weakening Curse","Sacrificial Stab","Abyssal Arts"] },
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] }
        ]
      },
      {
        label: "Substitute Warrens Team",
        description: "Flexible substitute team.",
        heroes: [
          { name: "Vestal", skills: ["Divine Grace","Judgment","Dazzling Light","Dazzling Light"] },
          { name: "Leper", skills: ["Chop","Hack","Withstand","Solemnity"] },
          { name: "Hellion", skills: ["Iron Swan","Barbaric Yell","If It Bleeds","Bleed Out"] },
          { name: "Jester", skills: ["Inspiring Tune","Battle Ballad","Dirge","Solo"] }
        ]
      },
      {
        label: "Loot Warrens Team",
        description: "Treasure-focused with Antiquarian.",
        heroes: [
          { name: "Antiquarian", skills: ["Protect Me","Collectibles","Gold Rush","Archaic Knowledge"] },
          { name: "Houndmaster", skills: ["Hound's Rush","Mark","Cry Havoc","Target Whistle"] },
          { name: "Hellion", skills: ["Iron Swan","Barbaric Yell","If It Bleeds","Bleed Out"] },
          { name: "Occultist", skills: ["Wyrd Reconstruction","Weakening Curse","Sacrificial Stab","Abyssal Arts"] }
        ]
      }
    ]
  },
  cove: {
    teams: [
      {
        label: "Main Cove Team",
        description: "Balanced Cove team.",
        heroes: [
          { name: "Crusader", skills: ["Smite","Zealous Accusation","Bulwark of Faith","Inspiring Cry"] },
          { name: "Plague Doctor", skills: ["Noxious Blast","Plague Grenade","Battlefield Medicine","Disorienting Blast"] },
          { name: "Grave Robber", skills: ["Pick to the Face","Lunge","Shadow Fade","Thrown Dagger"] },
          { name: "Arbalest", skills: ["Sniper Shot","Rallying Flare","Blindfire","Bola"] }
        ]
      },
      {
        label: "Substitute Cove Team",
        description: "Alternative Cove team.",
        heroes: [
          { name: "Highwayman", skills: ["Open Vein","Point Blank Shot","Duelist's Advance","Pistol Shot"] },
          { name: "Jester", skills: ["Inspiring Tune","Battle Ballad","Dirge","Solo"] },
          { name: "Occultist", skills: ["Wyrd Reconstruction","Weakening Curse","Sacrificial Stab","Abyssal Arts"] },
          { name: "Vestal", skills: ["Divine Grace","Judgment","Dazzling Light","Dazzling Light"] }
        ]
      },
      {
        label: "Loot Cove Team",
        description: "Treasure-focused Cove run.",
        heroes: [
          { name: "Antiquarian", skills: ["Protect Me","Collectibles","Gold Rush","Archaic Knowledge"] },
          { name: "Arbalest", skills: ["Sniper Shot","Rallying Flare","Blindfire","Bola"] },
          { name: "Grave Robber", skills: ["Pick to the Face","Lunge","Shadow Fade","Thrown Dagger"] },
          { name: "Plague Doctor", skills: ["Noxious Blast","Plague Grenade","Battlefield Medicine","Disorienting Blast"] }
        ]
      }
    ]
  }
};

// -------------------- BOSSES (Base + DLC) --------------------
const BOSSES = {
  ruins: [
    {
      name: "Shambler",
      difficulty: "Champion",
      recommendedTeam: ["Arbalest","Vestal","Highwayman","Plague Doctor"]
    },
    {
      name: "Bone Court",
      difficulty: "Veteran",
      recommendedTeam: ["Leper","Occultist","Hellion","Vestal"]
    },
    // DLC Bosses
    {
      name: "The Swine Prince",
      difficulty: "Champion",
      recommendedTeam: ["Houndmaster","Crusader","Occultist","Highwayman"]
    }
  ],
  weald: [
    {
      name: "Brigand Cannon",
      difficulty: "Champion",
      recommendedTeam: ["Leper","Occultist","Hellion","Jester"]
    },
    {
      name: "The Prophet",
      difficulty: "Veteran",
      recommendedTeam: ["Vestal","Highwayman","Bounty Hunter","Grave Robber"]
    }
  ],
  warrens: [
    {
      name: "Flesh",
      difficulty: "Champion",
      recommendedTeam: ["Houndmaster","Crusader","Occultist","Highwayman"]
    },
    {
      name: "Swine King",
      difficulty: "Champion",
      recommendedTeam: ["Houndmaster","Leper","Vestal","Hellion"]
    }
  ],
  cove: [
    {
      name: "Shark",
      difficulty: "Champion",
      recommendedTeam: ["Crusader","Plague Doctor","Grave Robber","Arbalest"]
    },
    {
      name: "Sea Captain",
      difficulty: "Veteran",
      recommendedTeam: ["Highwayman","Jester","Occultist","Vestal"]
    }
  ]
};

// -------------------- QUIRKS --------------------
const QUIRKS = {
  positive: [
    { name: "Quick Reflexes", tags: ["dodge","combat","all"] },
    { name: "Strong", tags: ["damage","all"] },
    { name: "Resilient", tags: ["stress","all"] },
    { name: "Unerring", tags: ["accuracy","ranged","all"] }
  ],
  negative: [
    { name: "Nervous", tags: ["stress","all"] },
    { name: "Zoophobia", tags: ["beast","stress","ruins"] },
    { name: "Hemophobic", tags: ["bleed","stress","weald"] },
    { name: "Claustrophobic", tags: ["dungeon length","all"] }
  ]
};