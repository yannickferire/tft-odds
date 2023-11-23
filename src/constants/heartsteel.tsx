export const lootTable: Record<string, {generic: string;} & Record<number, { value: string; percent: number }>> = {
  "0 Heart": {
    "generic": "4x Gold",
    1: {
      value: "4x Gold",
      percent: 50
    },
    2: {
      value: "1x 3 Cost + 1x Gold",
      percent: 25
    },
    3: {
      value: "1x 2 Cost + 2x Gold",
      percent: 25
    }
  },
  "20 Heart": {
    "generic": "6x Gold",
    1: {
      value: "6x Gold",
      percent: 50
    },
    2: {
      value: "2x 3 Cost",
      percent: 25
    },
    3: {
      value: "2x 2 Cost + 2x Gold",
      percent: 25
    }
  },
  "40 Heart": {
    "generic": "8x Gold",
    1: {
      value: "1x Item Component",
      percent: 50
    },
    2: {
      value: "2x 3 Cost + 2x Gold",
      percent: 25
    },
    3: {
      value: "8x Gold",
      percent: 25
    }
  },
  "60 Heart": {
    "generic": "11x Gold",
    1: {
      value: "3x 3 Cost + 2x Gold",
      percent: 50
    },
    2: {
      value: "1x Thief's Gloves",
      percent: 25
    },
    3: {
      value: "1x Item Component + 3x Gold",
      percent: 25
    }
  },
  "80 Heart": {
    "generic": "14x Gold",
    1: {
      value: "1x Item Component + 6x Gold",
      percent: 50
    },
    2: {
      value: "2x 4 Cost + 6x Gold",
      percent: 25
    },
    3: {
      value: "1x Thief's Gloves + 3x Gold",
      percent: 25
    }
  },
  "100 Heart": {
    "generic": "17x Gold",
    1: {
      value: "2x Item Component + 1x Gold",
      percent: 40
    },
    2: {
      value: "1x Support Item",
      percent: 30
    },
    3: {
      value: "1x Random Completed Item + 1x Reforger + 2x Gold",
      percent: 30
    }
  },
  "130 Heart": {
    "generic": "21x Gold",
    1: {
      value: "2x Artifact Item + 1x Reforger + 3x Gold",
      percent: 25
    },
    2: {
      value: "1x Support Item + 1x Reforger + 3x Gold",
      percent: 25
    },
    3: {
      value: "1x Tome of Traits",
      percent: 25
    },
    4: {
      value: "1x Random Completed Item + 1x Item Component",
      percent: 25
    }
  },
  "160 Heart": {
    "generic": "26x Gold",
    1: {
      value: "1x Completed Item Anvil + 10x Gold",
      percent: 30
    },
    2: {
      value: "3x Item Component + 2x Gold",
      percent: 30
    },
    3: {
      value: "1x Target Dummy with Random Support Item",
      percent: 20
    },
    4: {
      value: "1x Blacksmith's Gloves + 2x Gold",
      percent: 20
    }
  },
  "200 Heart": {
    "generic": "32x Gold",
    1: {
      value: "1x Radiant Item + 2x Reforger",
      percent: 30
    },
    2: {
      value: "1x Artifact Item + 1x Random Completed Item + 1x Reforger",
      percent: 30
    },
    3: {
      value: "1x Champion Duplicator + 12x Gold",
      percent: 20
    },
    4: {
      value: "1x Tome of Traits + 12x Gold",
      percent: 20
    }
  },
  "250 Heart": {
    "generic": "38x Gold",
    1: {
      value: "1x Random Completed Anvil + 22x Gold",
      percent: 40
    },
    2: {
      value: "1x Tactician's Crown + 8 Gold",
      percent: 20
    },
    3: {
      value: "1x 5 Cost + 25x Gold",
      percent: 20
    },
    4: {
      value: "1x Support Item Anvil + 20x Gold",
      percent: 20
    }
  },
  "300 Heart": {
    "generic": "46x Gold",
    1: {
      value: "2x Item Component + 2x Spatula",
      percent: 25
    },
    2: {
      value: "2x Artifact Item Anvil + 2x 5 Cost + 2x Magnetic Remover",
      percent: 25
    },
    3: {
      value: "1x Radiant Item + 1x Completed Item Anvil + 2x Reforger",
      percent: 25
    },
    4: {
      value: "1x Tactician's Crown + 16x Gold",
      percent: 25
    }
  },
  "400 Heart": {
    "generic": "56x Gold",
    1: {
      value: "1x Radiant Item + 1x Reforger + 26x Gold",
      percent: 30
    },
    2: {
      value: "1x Tactician's Crown + 1x Artifact Item Anvil + 8x Gold",
      percent: 25
    },
    3: {
      value: "1x Champion Duplicator + 44x Gold",
      percent: 20
    },
    4: {
      value: "3x Support Item Anvil",
      percent: 15
    },
    5: {
      value: "1x Zz'Rot Portal + 20x Gold",
      percent: 10
    }
  },
  "500 Heart": {
    "generic": "70x Gold",
    1: {
      value: "2x Warmogg's Armor + 2x Virtue of the martyr + 4x Gold",
      percent: 20
    },
    2: {
      value: "1x Radiant Item + 2x Support Item Anvil + 1x Reforger + 1x Magnetic Remover + 20x Gold",
      percent: 20
    },
    3: {
      value: "1x Tactician's Crown + 1x Radiant Thief's Gloves + 10x Gold",
      percent: 20
    },
    4: {
      value: "4x Completed Item Anvil + 1x Magnetic Remover + 6 Gold",
      percent: 20
    },
    5: {
      value: "1x Radiant Item + 1x Artifact Item Anvil + 1x Reforger + 22x Gold",
      percent: 20
    }
  },
  "750 Heart": {
    "generic": "85x Gold",
    1: {
      value: "1x Target Dummy with 3x Iron Locket Solari + 20x Gold",
      percent: 20
    },
    2: {
      value: "3x K'Sante + 3x Aphelios + 3x Yone + 3x Sett",
      percent: 20
    },
    3: {
      value: "1x Tactician's Crown + 5x 5 Cost + 1x Radiant Thief's Gloves",
      percent: 20
    },
    4: {
      value: "1x Radiant Item + 1x Completed Item Anvil + 1x Support Item Anvil + 1x Artifact Item Anvil + 1x Reforger + 1x Magnetic Remover + 13x Gold",
      percent: 20
    },
    5: {
      value: "2x Radiant Item + 1x Champion Duplicator + 2x Reforger + 13x Gold",
      percent: 20
    }
  },
  "1000 Heart": {
    "generic": "100x Gold",
    1: {
      value: "2x Radiant Item + 2x Reforger + 1x Magnetic Remover + 40x Gold",
      percent: 30
    },
    2: {
      value: "100x Gold",
      percent: 30
    },
    3: {
      value: "2x Tactician's Crown + 1x Radiant Item + 1x Reforger + 10x Gold",
      percent: 30
    },
    4: {
      value: "1x Target Dummy with 1x Radiant Warmogg's Armor + 1x Radiant Bramble Vest + 1x Giant Slayer",
      percent: 10
    }
  },
  "1250 Heart": {
    "generic": "125x Gold",
    1: {
      value: "4x Spatula + 65x Gold",
      percent: 25
    },
    2: {
      value: "2x Zephyr + 2x Shroud of Stillness + 50x Gold",
      percent: 25
    },
    3: {
      value: "1x Tactician's Crown + 1x Radiant Thief's Gloves + 3x same 5 Cost + 45x Gold",
      percent: 25
    },
    4: {
      value: "2x Radiant Item + 2x Artifact Item Anvil + 1x Champion Duplicator + 1x Reforger + 1x Magnetic Remover + 12x Gold",
      percent: 25
    }
  },
  "1500 Heart": {
    "generic": "150x Gold",
    1: {
      value: "3x Zeke's Herald + 3x Locket of the Iron Solari + 40x Gold",
      percent: 25
    },
    2: {
      value: "Convert all items into Radiant + 1x Magnetic Remover",
      percent: 25
    },
    3: {
      value: "4x Radiant Item + 1x Reforger + 1x Magnetic Remover + 30x Gold",
      percent: 25
    },
    4: {
      value: "2x Tactician's Crown + 2x Radiant Item + 1x Reforger + 1x Magnetic Remover + 30x Gold",
      percent: 25
    }
  },
  "1750 Heart": {
    "generic": "175x Gold",
    1: {
      value: "3Convert all items into Radiant + 1x Magnetic Remover",
      percent: 25
    },
    2: {
      value: "1x Tactician's Crown + 4x Support Item Anvil + 75x Gold",
      percent: 25
    },
    3: {
      value: "2x Tactician's Crown + 2x Radiant Item + 2x Champion Duplicator + 1x Reforger + 30x Gold",
      percent: 25
    },
    4: {
      value: "2x Tactician's Crown + 2x Radiant Item + 1 Random Completed Item + 1x Reforger + 40x Gold",
      percent: 25
    }
  },
  "2000 Heart": {
    "generic": "220x Gold",
    1: {
      value: "4 Tactician's Crown + 100x Gold",
      percent: 25
    },
    2: {
      value: "2x Tactician's Crown + 2x Radiant Item + 1x Random Completed Item + 1x Reforger + 85x Gold",
      percent: 25
    },
    3: {
      value: "2x Champion Duplicator + 200x Gold",
      percent: 25
    },
    4: {
      value: "9x same 5 Cost + 1x Magnetic Remover",
      percent: 25
    }
  },
};