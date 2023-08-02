export const piltoverRewards: Record<string, {generic: string;} & Record<number, { value: string; percent: number }>> = {
  "1 Energy;(0 loss)": {
    "generic": "1 Gold",
    1: {
      value: "1 Gold",
      percent: 100
    }
  },
  "2 Energy;(1 loss)": {
    "generic": "2 Gold",
    1: {
      value: "2 Gold",
      percent: 50
    },
    2: {
      value: "1x 2 cost",
      percent: 50
    }
  },
  "4 Energy;(2 loss)": {
    "generic": "5 Gold",
    1: {
      value: "5 Gold",
      percent: 50
    },
    2: {
      value: "1x 3 cost + 2 Gold",
      percent: 25
    },
    3: {
      value: "2x 2 cost + 1 Gold",
      percent: 25
    }
  },
  "6 Energy;(3 loss)": {
    "generic": "10 Gold",
    1: {
      value: "1x Item Component + 2 Gold",
      percent: 50
    },
    2: {
      value: "10 Gold",
      percent: 25
    },
    3: {
      value: "2x 3 cost + 4 Gold",
      percent: 25
    }
  },
  "9 Energy;(4 loss)": {
    "generic": "15 Gold",
    1: {
      value: "1x Item Component + 7 Gold",
      percent: 40
    },
    2: {
      value: "1x Thief's Gloves + 4 Gold",
      percent: 30
    },
    3: {
      value: "4x 3 cost + 3 Gold",
      percent: 30
    }
  },
  "12 Energy;(5 loss)": {
    "generic": "22 Gold",
    1: {
      value: "2x Item Components + 6 Gold",
      percent: 40
    },
    2: {
      value: "1x Tome of Traits + 4 Gold",
      percent: 30
    },
    3: {
      value: "1x Thief's Gloves + 11 Gold",
      percent: 30
    }
  },
  "16 Energy;(6 loss)": {
    "generic": "30 Gold",
    1: {
      value: "1x Completed Item Anvil + 15 Gold",
      percent: 30
    },
    2: {
      value: "3x Item Component + 6 Gold",
      percent: 25
    },
    3: {
      value: "1x Ornn Anvil + 15 Gold",
      percent: 25
    },
    4: {
      value: "1x Ornn Thief's Gloves + 8 Gold",
      percent: 20
    }
  },
  "20 Energy;(7 loss)": {
    "generic": "42 Gold",
    1: {
      value: "2x Completed Anvil + 10 Gold",
      percent: 35
    },
    2: {
      value: "5x Item Component",
      percent: 25
    },
    3: {
      value: "1x Champion Duplicator + 30 Gold",
      percent: 20
    },
    4: {
      value: "1x Radiant Item + 2x Reforger + 12 Gold",
      percent: 20
    }
  },
  "25 Energy;(8 loss)": {
    "generic": "55 Gold",
    1: {
      value: "2x Ornn Anvil + 19 Gold",
      percent: 30
    },
    2: {
      value: "1x Tactician's Crown + 25 Gold",
      percent: 25
    },
    3: {
      value: "1x Radiant Item + 2x Reforger + 25 Gold",
      percent: 25
    },
    4: {
      value: "3x 5 cost + 40 Gold",
      percent: 20
    }
  },
  "30 Energy;(9 loss)": {
    "generic": "70 Gold",
    1: {
      value: "1x Tactician's Crown + 4x 4 cost + 24 Gold",
      percent: 25
    },
    2: {
      value: "3x Thief's Gloves + 1x Radiant Item + 5 Gold",
      percent: 20
    },
    3: {
      value: "4x Completed Anvil + 10 Gold",
      percent: 20
    },
    4: {
      value: "1x Radiant Item + 1x Ornn Anvil + 1x Completed Anvil + 1x Reforger + 10 Gold",
      percent: 20
    },
    5: {
      value: "2x Spatula + 6 Item Components",
      percent: 15
    }
  },
  "40 Energy;(10 loss)": {
    "generic": "85 Gold",
    1: {
      value: "2x Radiant Item + 2x Reforger + 2x Removers + 25 Gold",
      percent: 30
    },
    2: {
      value: "1x Tactician's Crown + 1x Ornn Anvil + 1x Completed Anvil + 20 Gold",
      percent: 30
    },
    3: {
      value: "1x Radiant Thief's Gloves + 1x Tactician's Crown + 3x 5 cost",
      percent: 25
    },
    4: {
      value: "1x Champion Duplicator + 1x Radiant Item + 1x Reforger + 1x Remover + 45 Gold",
      percent: 15
    }
  },
  "50 Energy;(11 loss)": {
    "generic": "110 Gold",
    1: {
      value: "1x Tactician's Crown + 80 Gold",
      percent: 30
    },
    2: {
      value: "2x Ornn Anvil + 1x Radiant Item + 1x Reforger + 50 Gold",
      percent: 25
    },
    3: {
      value: "6x Item Components + 1x Tactician's Crown + 30 Gold",
      percent: 25
    },
    4: {
      value: "3x Radiant Thief's Gloves + 20 Gold",
      percent: 20
    }
  },
  "60 Energy;(12 loss)": {
    "generic": "135 Gold",
    1: {
      value: "3x Radiant Item + 45 Gold",
      percent: 25
    },
    2: {
      value: "1x Radiant Item + 1x Tactician's Crown + 1x Ornn Anvil + 1x Remover + 1x Reforger + 55 Gold",
      percent: 25
    },
    3: {
      value: "Convert all regular items to Radiant + dynamic Gold",
      percent: 25
    },
    4: {
      value: "4x Spatula + 75 Gold",
      percent: 20
    }
  },
  "70 Energy;(13 loss)": {
    "generic": "160 Gold",
    1: {
      value: "2x Tactician's Crown + 2x Champion Duplicator + 2x Radiant Items + 1x Reforger + 15 Gold",
      percent: 30
    },
    2: {
      value: "2x Radiant Items + 2x Reforger + 1x Tactician's Crown + 75 Gold",
      percent: 25
    },
    3: {
      value: "3x Completed Anvils + 1x Radiant item + 1 Reforger + 1x Tactician's Crown + 50 Gold",
      percent: 20
    },
    4: {
      value: "Convert all regular items to Radiant + dynamic Gold",
      percent: 15
    },
  },
  "80 Energy;(14 loss)": {
    "generic": "200 Gold",
    1: {
      value: "3x Tactician's Crown + 3x Radiant Items + 2x Removers + 1x Reforger + 25 Gold",
      percent: 35
    },
    2: {
      value: "2x Champion Duplicator + 175 Gold",
      percent: 30
    },
    3: {
      value: "3x Ornn Anvils + 2x Tactician's Crown + 2x Radiant Items + 2x Removers + 1x Tome of Traits + 25 Gold",
      percent: 30
    },
    4: {
      value: "3⭐ 5 cost",
      percent: 5
    },
  },
};

export const sixPiltoversRewards = {
  "3 Gold": 30,
  "1x 3 cost": 30,
  "1x 2 cost + 1x 3 cost": 10,
  "1x Item Component": 10,
  "2x 2 cost": 10,
  "1x 4 cost": 5,
  "1x Spatula": 4,
  "3x Remover": 1
}