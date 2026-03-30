var roster = [];

var REGIONS = {
  ruins: {},
  warrens: {},
  cove: {}
};

var DUNGEONS = [
  {
    name: "Ruins Short",
    region: "ruins",
    difficulty: 1,
    rewards: { gold: 2000, heirlooms: 6 },
    boss: false
  },
  {
    name: "Warrens Medium",
    region: "warrens",
    difficulty: 2,
    rewards: { gold: 3500, heirlooms: 10 },
    boss: false
  },
  {
    name: "Cove Long",
    region: "cove",
    difficulty: 3,
    rewards: { gold: 5000, heirlooms: 14 },
    boss: false
  },
  {
    name: "Necromancer",
    region: "ruins",
    difficulty: 2,
    rewards: { gold: 6000, heirlooms: 12 },
    boss: true
  }
];