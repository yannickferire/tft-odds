import { apiURL, fetchChampionsURL, currentSet, gameURL } from "@/constants/set";
import { fetchUnlockableChampions } from "./unlockableChampionsSet16";
import { Champion, Trait, TFTAPIData } from "@/types/tft";

// Inline constants to fix runtime import issue
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

const excludedTraits = ["Deadeye", "Yordle", "Redeemer", "Shadow Isles"];

export async function fetchChampions() {
  try {
    const response = await fetch(fetchChampionsURL);
    if (!response.ok) {
      console.error(`Failed to fetch champions: ${response.status} ${response.statusText}`);
      return { champions: [], traits: [] };
    }

    const data: TFTAPIData = await response.json();

    if (!data.sets || !data.sets[currentSet]) {
      console.error(`Set ${currentSet} data not found in API response`);
      return { champions: [], traits: [] };
    }

    // Fetch unlockable champions (Set 16 specific logic)
    const unlockableChampionNames = await fetchUnlockableChampions();

    // champions
    const dataChampions = data.sets[currentSet].champions;
    const uniqueChampionNames: Record<string, boolean> = {};

    const filteredChampions = dataChampions.filter((champion: Champion) => {
      const hasTraits = champion.traits.length > 0;
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

    const withSelectionChampions = filteredChampions.map((champion: Champion) => {
      const isUnlockable = unlockableChampionNames.has(normalizeChampionName(champion.name));

      return {
        ...champion,
        selected: false,
        unlockable: isUnlockable,
        locked: isUnlockable
      };
    });

    const withImageChampions = withSelectionChampions.map((champion: Champion) => {
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
    const sortedTraits = data.sets[currentSet].traits
      .map((trait: Trait) => ({
        ...trait,
        selected: false,
        image: `${gameURL}/${trait.icon.toLowerCase().replace(".tex", ".png")}`
      }))
      .filter((trait: Trait) => !excludedTraits.includes(trait.name))
      .sort((a: Trait, b: Trait) => {
        // "Threat" should always be last
        if (a.name === "Threat") return 1;
        if (b.name === "Threat") return -1;
        return a.name.localeCompare(b.name);
      });

    const enhancedData = { champions: withImageChampions, traits: sortedTraits };

    return enhancedData;
  } catch (error) {
    console.error("Error in fetchChampions:", error);
    return { champions: [], traits: [] };
  }
}