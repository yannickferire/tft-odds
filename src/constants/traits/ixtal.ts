/**
 * Ixtal Explorer cashout data
 */

export interface IxtalCashout {
  cashoutNumber: number;
  cost: number;
  estimatedValue: number;
  options: {
    optionNumber: number;
    probability: number;
    probabilityPercent: string;
    rewards: string[];
  }[];
}

export const ixtalCashouts: Record<string, IxtalCashout> = {
  "Cashout1": {
    "cashoutNumber": 1,
    "cost": 1,
    "estimatedValue": 1,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["1x Gold"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["1x 1 Cost"]
      }
    ]
  },
  "Cashout2": {
    "cashoutNumber": 2,
    "cost": 25,
    "estimatedValue": 2,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["2x Gold"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["1x 2 Cost"]
      }
    ]
  },
  "Cashout3": {
    "cashoutNumber": 3,
    "cost": 50,
    "estimatedValue": 4,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.34,
        "probabilityPercent": "34%",
        "rewards": ["1x 3 Cost, 1x 1 Cost"]
      },
      {
        "optionNumber": 2,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["4x Gold"]
      },
      {
        "optionNumber": 3,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["2x 2 Cost"]
      }
    ]
  },
  "Cashout4": {
    "cashoutNumber": 4,
    "cost": 80,
    "estimatedValue": 6,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.34,
        "probabilityPercent": "34%",
        "rewards": ["1x 3 Cost, 1x 2 Cost, 1x 1 Cost"]
      },
      {
        "optionNumber": 2,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["3x 2 Cost"]
      },
      {
        "optionNumber": 3,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["1x Gold", "1x Lesser Champion Duplicator"]
      }
    ]
  },
  "Cashout5": {
    "cashoutNumber": 5,
    "cost": 120,
    "estimatedValue": 8,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["1x Component Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["4x Gold", "2x 3 Cost"]
      }
    ]
  },
  "Cashout6": {
    "cashoutNumber": 6,
    "cost": 150,
    "estimatedValue": 12,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.50,
        "probabilityPercent": "50%",
        "rewards": ["4x Gold", "1x Component Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.50,
        "probabilityPercent": "50%",
        "rewards": ["6x Gold", "3x 3 Cost"]
      }
    ]
  },
  "Cashout7": {
    "cashoutNumber": 7,
    "cost": 200,
    "estimatedValue": 16,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["2x Gold", "1x Completed Item Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["2x Item Component"]
      },
      {
        "optionNumber": 3,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["3x 3 Cost", "2x Lesser Champion Duplicator"]
      },
      {
        "optionNumber": 4,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["3x Gold", "1x Thief's Gloves"]
      },
    ]
  },
  "Cashout8": {
    "cashoutNumber": 8,
    "cost": 250,
    "estimatedValue": 20,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.8,
        "probabilityPercent": "80%",
        "rewards": ["6x Gold", "1x Completed Item Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.1,
        "probabilityPercent": "10%",
        "rewards": ["1x Spatula", "1x Item Component", "1x Reforger"]
      },
      {
        "optionNumber": 3,
        "probability": 0.1,
        "probabilityPercent": "10%",
        "rewards": ["1x Frying Pan", "1x Item Component", "1x Reforger"]
      }
    ]
  },
  "Cashout9": {
    "cashoutNumber": 9,
    "cost": 300,
    "estimatedValue": 25,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.34,
        "probabilityPercent": "34%",
        "rewards": ["14x Gold", "3x 4 Cost"]
      },
      {
        "optionNumber": 2,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["2x Gold", "1x Artifact Item Anvil"]
      },
      {
        "optionNumber": 3,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["12x Gold", "1x Reforger", "1x Completed Item Anvil"]
      }
    ]
  },
  "Cashout10": {
    "cashoutNumber": 10,
    "cost": 350,
    "estimatedValue": 32,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.3,
        "probabilityPercent": "30%",
        "rewards": ["2x Completed Item Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.3,
        "probabilityPercent": "30%",
        "rewards": ["2x Gold", "1x Radiant Item", "1x Reforger"]
      },
      {
        "optionNumber": 3,
        "probability": 0.2,
        "probabilityPercent": "20%",
        "rewards": ["12x Gold", "1x Champion Duplicator", "3x 4 Cost"]
      },
      {
        "optionNumber": 4,
        "probability": 0.2,
        "probabilityPercent": "20%",
        "rewards": ["2x Thief's Gloves", "1x Golden Item Remover"]
      }
    ]
  },
  "Cashout11": {
    "cashoutNumber": 11,
    "cost": 400,
    "estimatedValue": 40,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.34,
        "probabilityPercent": "34%",
        "rewards": ["1x Tactician's Crown", "1x Component Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["1x Radiant Item", "1x Component Anvil", "1x Reforger"]
      },
      {
        "optionNumber": 3,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["12x Gold", "2x Completed Item Anvil", "1x Magnetic Remover"]
      }
    ]
  },
  "Cashout12": {
    "cashoutNumber": 12,
    "cost": 450,
    "estimatedValue": 48,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.4,
        "probabilityPercent": "40%",
        "rewards": ["8x Gold", "5x Item Component"]
      },
      {
        "optionNumber": 2,
        "probability": 0.4,
        "probabilityPercent": "40%",
        "rewards": ["3x 5 Cost", "3x Component Anvil", "1x Champion Duplicator"]
      },
      {
        "optionNumber": 3,
        "probability": 0.2,
        "probabilityPercent": "20%",
        "rewards": ["12x Gold", "1x Masterwork Upgrade", "1x Completed Item Anvil"]
      }
    ]
  },
  "Cashout13": {
    "cashoutNumber": 13,
    "cost": 500,
    "estimatedValue": 60,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["1x Tactician's Shield", "1x Magnetic Remover", "1x Completed Item Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["15x Gold", "3x Completed Item Anvil"]
      }
    ]
  },
  "Cashout14": {
    "cashoutNumber": 14,
    "cost": 550,
    "estimatedValue": 75,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["7x Lesser Champion Duplicator", "1x Tactician's Crown", "2x Champion Duplicator"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["30x Gold", "1x Tactician's Crown", "1x Radiant Thief's Gloves"]
      }
    ]
  },
  "Cashout15": {
    "cashoutNumber": 15,
    "cost": 625,
    "estimatedValue": 95,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.34,
        "probabilityPercent": "34%",
        "rewards": ["10x Gold", "1x Radiant Item", "2x Tactician's Crown"]
      },
      {
        "optionNumber": 2,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["3x Masterwork Upgrade", "1x Magnetic Remover", "2x Completed Item Anvil"]
      },
      {
        "optionNumber": 3,
        "probability": 0.33,
        "probabilityPercent": "33%",
        "rewards": ["70x Gold", "2x Radiant Item", "1x Golden Item Remover", "2x Reforger"]
      }
    ]
  },
  "Cashout16": {
    "cashoutNumber": 16,
    "cost": 700,
    "estimatedValue": 120,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["2x Radiant Item", "1x Champion Duplicator", "1x Magnetic Remover", "1x Reforger", "2x Artifact Item Anvil"]
      },
      {
        "optionNumber": 2,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["30x Gold", "1x Tactician's Crown", "1x 5 Cost 2 star", "1x Artifact Item Anvil", "1x Radiant Item"]
      }
    ]
  },
  "Cashout17": {
    "cashoutNumber": 17,
    "cost": 800,
    "estimatedValue": 145,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["50x Gold", "2x Radiant Item", "2x Tactician's Crown", "1x Magnetic Remover"]
      },
      {
        "optionNumber": 2,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["145x Gold", "1x Radiant Item Conversion", "1x Golden Item Remover"]
      },
      {
        "optionNumber": 3,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["1x Frying Pan", "1x Spatula", "1x Double all item components", "1x 5 Cost"]
      }
    ]
  },
  "Cashout18": {
    "cashoutNumber": 18,
    "cost": 900,
    "estimatedValue": 180,
    "options": [
      {
        "optionNumber": 1,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["60x Gold", "3x Radiant Item", "2x Tactician's Crown"]
      },
      {
        "optionNumber": 2,
        "probability": 0.25,
        "probabilityPercent": "25%",
        "rewards": ["100x Gold", "2x Radiant Item", "2x Tactician's Crown", "2x Champion Duplicator"]
      },
      {
        "optionNumber": 3,
        "probability": 0.5,
        "probabilityPercent": "50%",
        "rewards": ["180x Gold", "1x Radiant Item Conversion", "1x Golden Item Remover"]
      }
    ]
  },
  "Cashout19": {
    "cashoutNumber": 19,
    "cost": 1000,
    "estimatedValue": 225,
    "options": [
      {
        "optionNumber": 1,
        "probability": 1.0,
        "probabilityPercent": "100%",
        "rewards": ["1x 5 Cost 3 star", "1x Golden Item Remover"]
      }
    ]
  },
  "Cashout20": {
    "cashoutNumber": 20,
    "cost": 1250,
    "estimatedValue": 250,
    "options": [
      {
        "optionNumber": 1,
        "probability": 1.0,
        "probabilityPercent": "100%",
        "rewards": ["2x 5 Cost 3 star", "1x Golden Item Remover"]
      }
    ]
  }
};

/**
 * Bonus Ixtal cashout rewards (from completing quests at 7 Ixtal)
 */
export interface BonusIxtalReward {
  probability: number;
  probabilityPercent: string;
  rewards: string[];
}

export const bonusIxtalCashouts: BonusIxtalReward[] = [
  {
    probability: 0.30,
    probabilityPercent: "30%",
    rewards: ["1x Item Component"]
  },
  {
    probability: 0.25,
    probabilityPercent: "25%",
    rewards: ["1x Masterwork Upgrade"]
  },
  {
    probability: 0.15,
    probabilityPercent: "15%",
    rewards: ["5x Gold", "1x 5 Cost"]
  },
  {
    probability: 0.10,
    probabilityPercent: "10%",
    rewards: ["1x Thief's Gloves"]
  },
  {
    probability: 0.05,
    probabilityPercent: "5%",
    rewards: ["1x Champion Duplicator"]
  },
  {
    probability: 0.05,
    probabilityPercent: "5%",
    rewards: ["1x Tactician's Crown"]
  },
  {
    probability: 0.05,
    probabilityPercent: "5%",
    rewards: ["1x Artifact Item Anvil"]
  },
  {
    probability: 0.03,
    probabilityPercent: "3%",
    rewards: ["1x Ixtal Emblem"]
  },
  {
    probability: 0.02,
    probabilityPercent: "2%",
    rewards: ["1x Spatula"]
  }
];
