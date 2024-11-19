import { fetchChampionsURL, currentSet, championImageURL, gameURL } from "@/constants/set";

export async function fetchChampions() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  // champions
  // const dataChampions = data.setData[0].champions;
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
  const withSelectionChampions = filteredChampions.map((champion: any) => ({ ...champion, selected: false }));
  const withImageChampions = withSelectionChampions.map((champion: any) => {
    // exceptions
    const championUrl = 
      champion.name === "Powder" ? "blue" : 
      champion.name === "Dr. Mundo" ? "drmundo" : 
      champion.name === "Scar" ? "flyguy" : 
      champion.name === "Sevika" ? "lieutenant" : 
      champion.name === "Smeech" ? "gremlin" : 
      champion.name === "Vander" ? "prime" : 
      champion.name === "Violet" ? "red" : 
      champion.name === "Nunu & Willump" ? "nunuwillump" : 
      champion.name === "Maddie" ? "shooter" : 
      champion.name === "Renni" ? "chainsaw" : 
      champion.name === "Loris" ? "beardy" : 
      champion.name === "Steb" ? "fish" : 
      champion.name;
    return {
      ...champion,
      championUrl,
      image: 
        `${championImageURL}/tft${currentSet}_${championUrl.toLowerCase().replace(/[' ]/g, '')}_teamplanner_splash.png`
    };
  });

  // traits
  const dataTraits = data.sets[currentSet].traits.map((trait: any) => ({
    ...trait,
    selected: false,
    image: `${gameURL}/${trait.icon.toLowerCase().replace(".tex", ".png")}`
  }));
  const filteredTraits = dataTraits.filter((trait: any) => trait.name !== "Deadeye" && trait.name !== "Yordle" && trait.name !== "Redeemer" && trait.name !== "Shadow Isles");
  const sortedTraits = filteredTraits.sort((a: any, b: any) => {
    if (a.name === "Threat") {
      return 1; // "Threat" doit être placé après "b"
    } else if (b.name === "Threat") {
      return -1; // "Threat" doit être placé avant "a"
    } else {
      return a.name.localeCompare(b.name); // tri par ordre alphabétique pour les autres noms de traits
    }
  });

  //emblems
  // const items = data.items;
  // const emblems = items.filter((item: any) => item.apiName.includes("TFT9") && item.apiName.includes("Item") && item.apiName.includes("Emblem"));
  
  const enhancedData = { champions: withImageChampions, traits: sortedTraits };

  return enhancedData;
}