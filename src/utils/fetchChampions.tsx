import { apiURL, fetchChampionsURL, currentSet, gameURL } from "@/constants/set";
import { fetchUnlockableChampions } from "./unlockableChampionsSet16";

export async function fetchChampions() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  // Fetch unlockable champions (Set 16 specific logic)
  const unlockableChampionNames = await fetchUnlockableChampions();

  // champions
  const dataChampions = data.sets[currentSet].champions;
  const uniqueChampionNames: any = {};
  const filteredChampions = dataChampions.filter((champion: any, index: number, array: any[]) => {
    const hasTraits =  champion.traits.length > 0;
    const cost = champion.cost;

    if (hasTraits && cost !== 11 && !uniqueChampionNames[champion.name] && champion.name !== "Xayah & Rakan") {
      uniqueChampionNames[champion.name] = true;
      return true;
    }
    return false;
  });

  // Helper function to normalize champion names for comparison
  const normalizeChampionName = (name: string): string => {
    return name.replace(/[' &-]/g, '').toLowerCase();
  };

  const withSelectionChampions = filteredChampions.map((champion: any) => {
    const isUnlockable = unlockableChampionNames.has(normalizeChampionName(champion.name));

    return {
      ...champion,
      selected: false,
      unlockable: isUnlockable,
      locked: isUnlockable
    };
  });

  // Champion name mappings for image URLs (exceptions to default naming)
  const championUrlMappings: Record<string, string> = {
    // Set 13
    "Powder": "blue",
    "Dr. Mundo": "drmundo",
    "Scar": "flyguy",
    "Sevika": "lieutenant",
    "Smeech": "gremlin",
    "Vander": "prime",
    "Violet": "red",
    "Nunu & Willump": "nunuwillump",
    "Maddie": "shooter",
    "Renni": "chainsaw",
    "Steb": "fish",
    "Mel": "missmage",
    // Set 14
    "Nidalee": "nidaleecougar",
    // Set 15
    "Jarvan IV": "jarvaniv",
    "Rammus": "rammuspb",
    // Set 16
    "T-Hex": "thex",
    "Lucian & Senna": "lucian",
    "Kobuko & Yuumi": "kobuko",
  };

  const championUrlSquareMappings: Record<string, string> = {
    "Rammus": "rammus",
  };

  const withImageChampions = withSelectionChampions.map((champion: any) => {
    const championUrl = championUrlMappings[champion.name] || champion.name;
    const championUrlSquare = championUrlSquareMappings[champion.name] || championUrl;
    return {
      ...champion,
      championUrl,
      image: 
        `${apiURL}/game/assets/characters/tft${currentSet}_${championUrl.toLowerCase().replace(/[' ]/g, '')}/hud/tft${currentSet}_${championUrlSquare.toLowerCase().replace(/[' ]/g, '')}_square.tft_set${currentSet}.png`
    };
  });

  // Traits
  const excludedTraits = ["Deadeye", "Yordle", "Redeemer", "Shadow Isles"];

  const sortedTraits = data.sets[currentSet].traits
    .map((trait: any) => ({
      ...trait,
      selected: false,
      image: `${gameURL}/${trait.icon.toLowerCase().replace(".tex", ".png")}`
    }))
    .filter((trait: any) => !excludedTraits.includes(trait.name))
    .sort((a: any, b: any) => {
      // "Threat" should always be last
      if (a.name === "Threat") return 1;
      if (b.name === "Threat") return -1;
      return a.name.localeCompare(b.name);
    });

  const enhancedData = { champions: withImageChampions, traits: sortedTraits };

  return enhancedData;
}