export const numberOfEmblems: number = 4;

export const numberOfTraits: number = 28;

interface EmblemItem {
  name: string;
  item: string | null;
}
export const validEmblems: EmblemItem[] = [
  { name: "Chrono", item: null }, 
  { name: "Multistriker", item: null },
  { name: "Incantor", item: null },
  { name: "Preserver", item: null },
  { name: "Arcana", item: null },
  { name: "Eldritch", item: "Giant's Belt" },
  { name: "Vanguard", item: null },
  { name: "Mage", item: null },
  { name: "Portal", item: "Needlessly Large Rod" },
  { name: "Warrior", item: null },
  { name: "Sugarcraft", item: "B.F. Sword" },
  { name: "Witchcraft", item: "Negatron Cloak" },
  { name: "Shapeshifter", item: null },
  { name: "Bastion", item: null },
  { name: "Faerie", item: "Tear of the Goddess" },
  { name: "Pyro", item: "Recurve Bow" },
  { name: "Blaster", item: null },
  { name: "Hunter", item: null },
  { name: "Scholar", item: null },
  { name: "Frost", item: "Chain Vest" },
  { name: "Honeymancy", item: "Sparring Gloves" },
];
export const totalNumberOfEmblems = validEmblems.length;