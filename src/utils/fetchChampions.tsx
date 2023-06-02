import { fetchChampionsURL, currentSet, championImageURL, gameURL } from "@/constants/set";

export async function fetchChampions() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  // champions
  // const dataChampions = data.sets[currentSet].champions;
  // const filteredChampions = dataChampions.filter((champion: any) => champion.traits.length > 0);
  const dataChampions = data.sets[currentSet].champions;
  const filteredChampions = dataChampions.filter((champion: any, index: number, array: any[]) => {
    const hasTraits =  champion.traits.length > 0;
    const isNotOtherRyze = !(champion.apiName.includes("TFT9_Ryze") && champion.apiName.length > 9);
    
    // Retourne true si le champion est Ryze ou s'il est le premier de son nom dans la liste
    return hasTraits && isNotOtherRyze;
  });
  const withSelectionChampions = filteredChampions.map((champion: any) => ({ ...champion, selected: false }));
  const withImageChampions = withSelectionChampions.map((champion: any) => ({
    ...champion,
    // if champion is from Stage 2, then modifie url to get the correct image
    image: champion.icon.includes("Stage2")
      ? `${championImageURL}/${champion.apiName.toLowerCase()}_mobile.tft_set${currentSet}_stage2.png`
      : `${championImageURL}/${champion.apiName.toLowerCase()}_mobile.tft_set${currentSet}.png`
  }));

  // traits
  const dataTraits = data.sets[currentSet].traits.map((trait: any) => ({
    ...trait,
    selected: false,
    image: `${gameURL}/${trait.icon.toLowerCase().replace(".tex", ".png")}`
  }));
  const sortedTraits = dataTraits.sort((a: any, b: any) => {
    if (a.name === "Threat") {
      return 1; // "Threat" doit être placé après "b"
    } else if (b.name === "Threat") {
      return -1; // "Threat" doit être placé avant "a"
    } else {
      return a.name.localeCompare(b.name); // tri par ordre alphabétique pour les autres noms de traits
    }
  });
  
  const enhancedData = { champions: withImageChampions, traits: sortedTraits };

  return enhancedData;
}