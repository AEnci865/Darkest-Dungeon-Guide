// DATA.JS - FULL SYSTEM

const REGIONS = {
    ruins: {
        teams: [
            { label: "Main Team", members: ["Arbalest","Occultist","Plague Doctor","Vestal"], substitutes:["Crusader","Hellion","Man-at-Arms"], role:"standard" },
            { label: "Loot Team", members: ["Antiquarian","Highwayman","Bounty Hunter","Jester"], substitutes:["Leper","Occultist"], role:"loot" },
            { label: "Alternative Team", members:["Crusader","Leper","Hellion","Vestal"], substitutes:["Plague Doctor","Jester"], role:"substitute" }
        ]
    },
    weald: {
        teams: [
            { label: "Main Team", members: ["Highwayman","Leper","Jester","Occultist"], substitutes:["Vestal","Hellion"], role:"standard" },
            { label: "Loot Team", members: ["Antiquarian","Grave Robber","Bounty Hunter","Occultist"], substitutes:["Highwayman","Jester"], role:"loot" },
            { label: "Alternative Team", members:["Hellion","Crusader","Plague Doctor","Vestal"], substitutes:["Leper","Jester"], role:"substitute" }
        ]
    },
    warrens: {
        teams: [
            { label: "Main Team", members: ["Houndmaster","Highwayman","Plague Doctor","Occultist"], substitutes:["Vestal","Bounty Hunter"], role:"standard" },
            { label: "Loot Team", members: ["Antiquarian","Jester","Hellion","Crusader"], substitutes:["Grave Robber"], role:"loot" },
            { label: "Alternative Team", members:["Bounty Hunter","Leper","Hellion","Vestal"], substitutes:["Plague Doctor"], role:"substitute" }
        ]
    },
    cove: {
        teams: [
            { label: "Main Team", members:["Crusader","Shieldbreaker","Occultist","Jester"], substitutes:["Vestal","Highwayman"], role:"standard" },
            { label: "Loot Team", members:["Antiquarian","Grave Robber","Hellion","Bounty Hunter"], substitutes:["Plague Doctor"], role:"loot" },
            { label: "Alternative Team", members:["Highwayman","Leper","Vestal","Hellion"], substitutes:["Crusader"], role:"substitute" }
        ]
    }
};

const BOSSES = {
    standard: [
        { name:"Necromancer", tiers:["Apprentice","Veteran","Champion"] },
        { name:"Swine King", tiers:["Apprentice","Veteran","Champion"] },
        { name:"Prophet", tiers:["Apprentice","Veteran","Champion"] }
    ],
    dlc: [
        { name:"Bone Bearer", tiers:["Apprentice","Veteran","Champion"] },
        { name:"The Colossus", tiers:["Apprentice","Veteran","Champion"] },
        { name:"Eldritch Horror", tiers:["Apprentice","Veteran","Champion"] }
    ]
};

const DARKEST = {
    runs: [
        { name:"DD1", completed:false },
        { name:"DD2", completed:false },
        { name:"DD3", completed:false },
        { name:"DD4", completed:false }
    ]
};

const PROVISIONS = {
    short: ["8 Food","1 Shovel","1 Torch","0 Antivenom"],
    medium:["10 Food","2 Shovels","2 Torches","1 Antivenom"],
    long:["12 Food","3 Shovels","3 Torches","2 Antivenom"]
};

const QUIRKS = {
    positive:[
        { name:"Unerring", bonus:"+5% Accuracy", synergies:["Ranged"] },
        { name:"Resilient", bonus:"+15% Stress Resist", synergies:["Stress"] },
        { name:"Eagle Eye", bonus:"+10% Crit", synergies:["Ranged"] },
        { name:"Quick Reflexes", bonus:"+10% Dodge", synergies:["Melee"] }
    ],
    negative:[
        { name:"Nervous", penalty:"-10% Stress Resist", synergies:["Stress"] },
        { name:"Zoophobia", penalty:"Cannot enter Courtyard events", synergies:["Ruins"] },
        { name:"Claustrophobia", penalty:"-10% Accuracy in dungeons", synergies:["All"] },
        { name:"Greedy", penalty:"-5% Gold from battles", synergies:["All"] }
    ]
};

const ESTATE = {
    name: "??? Estate",
    buildings: [
        { name:"Sanitarium", maxLevel:3, trinketCost:[0,2,4], severity:[3,3,3] },
        { name:"Abbey", maxLevel:3, trinketCost:[0,1,3], severity:[2,2,2] },
        { name:"Blacksmith", maxLevel:3, trinketCost:[0,2,3], severity:[3,3,2] },
        { name:"Guild", maxLevel:3, trinketCost:[0,1,2], severity:[2,2,1] },
        { name:"Stage Coach", maxLevel:3, trinketCost:[0,2,3], severity:[3,3,3] },
        { name:"Tavern", maxLevel:3, trinketCost:[0,1,2], severity:[1,1,2] }
    ]
};

// Export everything
export { REGIONS, BOSSES, DARKEST, PROVISIONS, QUIRKS, ESTATE };