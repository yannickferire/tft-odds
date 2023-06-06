interface Item {
  name: string;
  image: string;
  type: string;
  stat: string;
}
interface Items {
  [key: string]: Item;
}

export const items: Items = {
  "B.F. Sword": {
    "name": "B.F. Sword",
    "image": "/images/items/BFSword.png",
    "type": "Attack Damage",
    "stat": "10%"
  },
  "Chain Vest": {
    "name": "Chain Vest",
    "image": "/images/items/ChainVest.png",
    "type": "Armor",
    "stat": "20"
  },
  "Giant's Belt": {
    "name": "Giant's Belt",
    "image": "/images/items/GiantsBelt.png",
    "type": "Health",
    "stat": "150"
  },
  "Needlessly Large Rod": {
    "name": "Needlessly Large Rod",
    "image": "/images/items/NeedlesslyLargeRod.png",
    "type": "Ability Power",
    "stat": "10"
  },
  "Negatron Cloak": {
    "name": "Negatron Cloak",
    "image": "/images/items/NegatronCloak.png",
    "type": "Magic Resist",
    "stat": "20"
  },
  "Recurve Bow": {
    "name": "Recurve Bow",
    "image": "/images/items/RecurveBow.png",
    "type": "Attack Speed",
    "stat": "10%"
  },
  "Sparring Gloves": {
    "name": "Sparring Gloves",
    "image": "/images/items/SparringGloves.png",
    "type": "Crit",
    "stat": "20%"
  },
  "Tear of the Goddess": {
    "name": "Tear of the Goddess",
    "image": "/images/items/TearoftheGoddess.png",
    "type": "Mana",
    "stat": "15"
  }
}