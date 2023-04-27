import { fetchChampionsURL, currentSet, championImageURL, gameURL } from "@/constants/set";

export async function fetchAugments() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  // champs
  const dataChampions = data.sets[currentSet].champions;
  const filteredChampions = dataChampions.filter((champion: any) => champion.traits.length > 0);
  const withImageChampions = filteredChampions.map((champion: any) => ({
    ...champion,
    // if champion is from Stage 2, then modifie url to get the correct image
    image: champion.icon.includes("Stage2")
      ? `${championImageURL}/${champion.apiName.toLowerCase()}_mobile.tft_set${currentSet}_stage2.png`
      : `${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`
  }));

  const dataArray: any[] = Object.values(data);
  const augments: any[] = dataArray[0].filter((item: any) => 
    (item.apiName.includes("TFT"+currentSet+"_Augment_") || item.apiName.includes("TFT"+currentSet+"_5_Augment_")));

  // augments
  const withAugmentsChampions = withImageChampions.map((champion: any) => {
    let championName = champion.name.replace(/ /g, "").replace(/'/g, "");
    let specialName = championName;
    switch (champion.name) {
      case "Ultimate Ezreal":
        specialName = "EzrealFuture";
        break;
      case "Nunu & Willump":
        specialName = "Nunu";
        break;
      case "Viego":
        specialName = "RenegadePartners";
      case "Kai'Sa":
        specialName = "Kaisa";
        break;
      default:
        break;
    }

    // base filter
    let heroAugments = augments.filter((augment: any) =>
      (augment.apiName.includes(championName)) || augment.apiName.includes(specialName));

    // if more than 2 filter again
    if (heroAugments.length > 2) {
      // priority mid set augments
      let midSetAugments = heroAugments.filter((augment: any) => augment.apiName.includes("TFT"+currentSet+"_5"));
      // if there's only one mid set augment, remove the same from base set
      if (midSetAugments.length == 1) {
        const type = midSetAugments[0].apiName.split("_").pop();
        heroAugments = heroAugments.filter((augment: any) => !(augment.apiName.includes("TFT"+currentSet+"_Augment_") && augment.apiName.includes(type)));
      }
      // if there's 2 mid set augments, remove the base set augments
      if (midSetAugments.length === 2) {
        heroAugments = midSetAugments;
      }
      // specific cases
      // Remove Carry2
      if (heroAugments.length > 2) {
        heroAugments = heroAugments.filter((augment: any) => !augment.apiName.includes("Carry2") && !augment.apiName.includes("Support2"));
      }
      // Remove Viego for Vi
      if (championName === 'Vi') {
        heroAugments = heroAugments.filter((augment: any) => !augment.apiName.includes("Viego"));
      }
    }
    
    let supportAugment = heroAugments.filter((augment: any) => augment.apiName.includes("Support"));
    let carryAugment;

    if (supportAugment.length > 0) {
      supportAugment = supportAugment[0];
      carryAugment = heroAugments.filter((augment: any) => !augment.apiName.includes("Support"))[0];
    } else {
      carryAugment = heroAugments.filter((augment: any) => augment.apiName.includes("Carry"));

      if (carryAugment.length > 0) {
        carryAugment = carryAugment[0];
        supportAugment = heroAugments.filter((augment: any) => !augment.apiName.includes("Carry"))[0];
      }
    }

    const enchancedAugments: any = {
      support: supportAugment,
      carry: carryAugment
    }

    // console.log(enchancedAugments);

    return {
      ...champion,
      augments: enchancedAugments
    }
  });


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
    
  const enhancedData = { champions: withAugmentsChampions, traits: sortedTraits };

  return enhancedData;
}