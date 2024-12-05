export const heistPoints = {
  "2": {
    stage_points: 2,
    surviving_points: "0",
  },
  "3": {
    stage_points: 2,
    surviving_points: "+1",
  },
  "4+": {
    stage_points: 3,
    surviving_points: "+1",
  },
};

export const lootTable: Record<string, Record<number, string>> = {
  "10 points": {
    1: "1x Spatula",
    2: "1x Frying Pan",
    3: "3x Training Dummy",
    4: "1x Vi + 1x Jinx",
  },
  "17 points": {
    1: "1x Thief's Gloves",
    2: "3x Lesser Champion Duplicator",
    3: "2x Item Component",
    4: "1x Fishbones",
  },
  "20 points": {
    1: "20x Gold",
    2: "1x Artifact Item",
    3: "1x Pit Fighter Emblem",
    4: "1x Ambusher Emblem",
    5: "1x Watcher Emblem",
  },
  "30 points": {
    1: "30x Gold",
    2: "1x Vi 2 star + 1x Jinx 2 star",
    3: "3x Item Component",
  },
};