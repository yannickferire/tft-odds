export const numberOfEmblems: number = 4;

export const numberOfTraits: number = 28;

interface EmblemItem {
  name: string;
  item: string | null;
}
export const validEmblems: EmblemItem[] = [
  { name: "Bastion", item: null },
  { name: "Challenger", item: "Recurve Bow" }, 
  { name: "Deadeye", item: null },
  { name: "Demacia", item: "Negatron Cloak" },
  { name: "Freljord", item: null },
  { name: "Gunner", item: null },
  { name: "Ionia", item: "B.F. Sword" },
  { name: "Juggernaut", item: "Chain Vest" },
  { name: "Noxus", item: "Giant's Belt" },
  { name: "Piltover", item: null },
  { name: "Rogue", item: null },
  { name: "Shadow Isles", item: null },
  { name: "Shurima", item: "Needlessly Large Rod" },
  { name: "Slayer", item: "Sparring Gloves" },
  { name: "Sorcerer", item: "Tear of the Goddess" },
  { name: "Strategist", item: null },
  { name: "Targon", item: null },
  { name: "Bruiser", item: null },
  { name: "Invoker", item: null },
  { name: "Void", item: null },
  { name: "Zaun", item: null },
];
export const totalNumberOfEmblems = validEmblems.length;