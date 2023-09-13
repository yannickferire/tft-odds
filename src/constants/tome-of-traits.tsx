export const numberOfEmblems: number = 4;

export const numberOfTraits: number = 28;

interface EmblemItem {
  name: string;
  item: string | null;
}
export const validEmblems: EmblemItem[] = [
  { name: "Bilgewater", item: "Negatron Cloak" },
  { name: "Bastion", item: null },
  { name: "Challenger", item: "Recurve Bow" }, 
  { name: "Demacia", item: null },
  { name: "Freljord", item: null },
  { name: "Gunner", item: null },
  { name: "Ionia", item: "B.F. Sword" },
  { name: "Ixtal", item: null },
  { name: "Juggernaut", item: "Chain Vest" },
  { name: "Noxus", item: "Giant's Belt" },
  { name: "Piltover", item: null },
  { name: "Rogue", item: null },
  { name: "Shurima", item: "Needlessly Large Rod" },
  { name: "Slayer", item: null },
  { name: "Sorcerer", item: "Tear of the Goddess" },
  { name: "Strategist", item: null },
  { name: "Targon", item: null },
  { name: "Bruiser", item: null },
  { name: "Invoker", item: null },
  { name: "Vanquisher", item: "Sparring Gloves" },
  { name: "Void", item: null },
  { name: "Zaun", item: null },
];
export const totalNumberOfEmblems = validEmblems.length;