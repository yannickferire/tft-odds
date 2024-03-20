export const numberOfEmblems: number = 4;

export const numberOfTraits: number = 28;

interface EmblemItem {
  name: string;
  item: string | null;
}
export const validEmblems: EmblemItem[] = [
  { name: "Altruist", item: null }, 
  { name: "Arcanist", item: null },
  { name: "Behemoth", item: null },
  { name: "Bruiser", item: null },
  { name: "Dragonlord", item: null },
  { name: "Dryad", item: "Giant's Belt" },
  { name: "Duelist", item: null },
  { name: "Exalted", item: null },
  { name: "Fated", item: "Needlessly Large Rod" },
  { name: "Fortune", item: null },
  { name: "Ghostly", item: "B.F. Sword" },
  { name: "Heavenly", item: "Negatron Cloak" },
  { name: "Inkshadow", item: null },
  { name: "Invoker", item: null },
  { name: "Mythic", item: "Tear of the Goddess" },
  { name: "Porcelain", item: "Recurve Bow" },
  { name: "Reaper", item: null },
  { name: "Sage", item: null },
  { name: "Sniper", item: null },
  { name: "Storyweaver", item: "Chain Vest" },
  { name: "Umbral", item: "Sparring Gloves" },
  { name: "Warden", item: null }
];
export const totalNumberOfEmblems = validEmblems.length;