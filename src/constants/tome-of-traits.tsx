export const numberOfEmblems: number = 4;

export const numberOfTraits: number = 28;

interface EmblemItem {
  name: string;
  item: string | null;
}
export const validEmblems: EmblemItem[] = [
  { name: "8-bit", item: "Recurve Bow" }, 
  { name: "Big Shot", item: null },
  { name: "Bruiser", item: null },
  { name: "Country", item: null },
  { name: "Crowd Diver", item: null },
  { name: "Dazzler", item: null },
  { name: "Disco", item: null },
  { name: "Edgelord", item: null },
  { name: "Emo", item: "Tear of the Goddess" },
  { name: "Executioner", item: null },
  { name: "Guardian", item: null },
  { name: "Heartsteel", item: "Giant's Belt" },
  { name: "Hyperpop", item: null },
  { name: "Jazz", item: "Negatron Cloak" },
  { name: "Mosher", item: null },
  { name: "K/DA", item: "Needlessly Large Rod" },
  { name: "Pentakill", item: "Chain Vest" },
  { name: "Punk", item: "Sparring Gloves" },
  { name: "Rapidfire", item: null },
  { name: "Sentinel", item: null },
  { name: "Spellweaver", item: null },
  { name: "Superfan", item: null },
  { name: "True Damage", item: "B.F. Sword" },
];
export const totalNumberOfEmblems = validEmblems.length;