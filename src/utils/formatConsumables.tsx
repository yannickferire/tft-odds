import React, { useEffect, useState } from "react";
import Image from "next/image";
import GoldIcon from '@/components/icons/goldIcon';
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';

const Consumables: { [key: string]: string } = {
  // gold
  "Gold": "",
  // items
  "Tactician's Crown": '/images/items/ForceofNature.png',
  "Thief's Gloves": '/images/items/ThiefsGloves.png',
  "Deathblade": '/images/items/Deathblade.png',
  "Infinity Edge": '/images/items/InfinityEdge.png',
  "Warmogg's Armor": '/images/items/WarmogsArmor.png',
  "Titan's Resolve": '/images/items/TitansResolve.png',
  "Giant Slayer": '/images/items/GiantSlayer.png',
  "Spear Of Shojin": '/images/items/SpearofShojin.png', 
  "Hextech Gunblade": '/images/items/HextechGunblade.png',
  "Bloodthirster": '/images/items/Bloodthirster.png',
  "Edge of Night": '/images/items/EdgeofNight.png',
  "Guardbreaker": '/images/items/Guardbreaker.png',
  "Quicksilver": '/images/items/Quicksilver.png',
  "Hand of Justice": '/images/items/HandofJustice.png',
  "Jewelled Gauntlet": '/images/items/JeweledGauntlet.png',
  "Rabadon's Deathcap": '/images/items/RabadonsDeathcap.png',
  "Zeke's Herald": '/images/items/ZekesHerald.png',
  "Locket of the Iron Solari": '/images/items/LocketoftheIronSolari.png',
  "Zephyr": '/images/items/Zephyr.png',
  "Shroud of Stillness": '/images/items/Shroud.png',
  "Spatula": '/images/items/Spatula.png',
  "Bramble Vest": '/images/items/BrambleVest.png',
  "Item Component": '/images/items/ItemComponent.png',
  "Tier 0 Item": '/images/items/ItemComponent.png',
  "Tier 1 Item": '/images/items/ItemComponent.png',
  "Tier 2 Item": '/images/items/ItemComponent.png',
  "Tier 3 Item": '/images/items/ItemComponent.png',
  "Tier 4 Item": '/images/items/ItemComponent.png',
  "Radiant Item": '/images/items/RadiantItem.png',
  "Radiant Conversion": '/images/items/RadiantItem.png',
  "Artifact Item" : '/images/items/Artifact.png',
  // anvils
  "Artifact Item Anvil": '/images/items/ArtifactItemAnvil.avif',
  "Support Item Anvil": '/images/items/SupportItemAnvil.avif',
  "Completed Item Anvil": '/images/items/CompletedItemAnvil.avif',
  // units
  "2 Cost": '/images/items/2CostUnit.png',
  "3 Cost": '/images/items/3CostUnit.png',
  "4 Cost": '/images/items/4CostUnit.png',
  "5 Cost": '/images/items/5CostUnit.png',
  // others
  "Tome of Traits": '/images/items/TomeofTraits.avif',
  "Champion Duplicator": '/images/items/duplicator.png',
  "Lesser Champion Duplicator": '/images/items/duplicator-low.webp',
  "Lesser Shimmer Duplicator": '/images/items/duplicator-shimmer.png',
  "Reforger": '/images/items/reforger.webp',
  "Magnetic Remover": '/images/items/remover.webp',
  "Remover": '/images/items/remover.webp',
};

interface FormatConsumablesProps {
  value: string;
}

export function FormatConsumables({ value }: FormatConsumablesProps) { 
  const [champs, setChamps] = useState<any[]>([]);

  // Fetch des champions avec useQuery
  const { isLoading, error } = useQuery('champions', fetchChampions, {
    onSuccess: (data) => {
      setChamps(data.champions);
    },
  });

  const consumables = value.match(/(\d+)x\s+([\w\s']+)(\s*\d\*)?\s*/g);

  if (!consumables) {
    return <span>{value}</span>; // Retourne directement si aucune correspondance
  }

  // Création des éléments JSX
  const consumableElements = consumables
    .map((consumable, index) => {
      const matchResult = consumable.match(/(\d+)x\s+([\w\s']+)(\s*(\d\*))?/);

      if (matchResult) {
        const [_, count, consumableName] = matchResult;

        let radiant = false;
        if (consumableName.includes("Radiant")) radiant = true;
        
        let cleanedConsumableName = consumableName;
        if (!consumableName.includes("Radiant Item")) {
          cleanedConsumableName = cleanedConsumableName.replace("Radiant ", "");
        }
        
        const starPattern = /(\d+)\s*star/;
        const starMatch = cleanedConsumableName.match(starPattern);
        cleanedConsumableName = cleanedConsumableName.replace(starPattern, "").trim();

        const imagePath = Consumables[cleanedConsumableName];
        const champion = champs.find((champ: any) => champ.name === cleanedConsumableName);

        return (
          <span key={index} className="pr-0.5 mr-1">
            {index > 0 && <span className="mr-1">+</span>}
            {consumableName === "Gold" ? (
              <>
                <span>{count} </span>
                <GoldIcon color="crema" size={3} />
              </>
            ) : (
              <>
                <span>{count}x </span>
                {imagePath && (
                  <div className="inline-block mr-2 ml-1 relative">
                    <Image
                      src={imagePath}
                      alt={consumableName}
                      width={32}
                      height={32}
                      className={`inline-block -mt-1 border-2 ${
                        radiant ? 'border-gold' : 
                        consumableName === "Tier 1 Item " ? 'border-1cost' :
                        consumableName === "Tier 2 Item " ? 'border-2cost' :
                        consumableName === "Tier 3 Item " ? 'border-3cost' :
                        consumableName === "Tier 4 Item " ? 'border-4cost' : 'border-midday'
                      } box-border`}
                    />
                    {starMatch &&
                      <Image
                        src={`/images/icons/${starMatch[1]}-star.png`}
                        alt="2 star"
                        width={40}
                        height={13}
                        className="max-w-none absolute -top-2 mt-1 left-1/2 -translate-x-1/2 z-20"
                      />
                    }
                  </div>
                )}
                {champion && (
                  <div className="inline-block mr-2 ml-1 relative">
                    <div className={`inline-block align-middle w-8 h-8 relative border-2 border-${champion.cost}cost box-border overflow-hidden`}>
                      <Image
                        src={champion.image}
                        alt={champion.name}
                        width={40}
                        height={40}
                        className="max-w-none w-16 -top-2 left-1/2 -translate-x-1/2 absolute inline-block"
                      />
                    </div>
                    {starMatch &&
                      <Image
                        src={`/images/icons/${starMatch[1]}-star.png`}
                        alt="2 star"
                        width={40}
                        height={13}
                        className="max-w-none absolute -top-2 mt-1 left-1/2 -translate-x-1/2 z-20"
                      />
                    }
                  </div>
                )}
              </>
            )}
            {consumableName !== "Gold" && cleanedConsumableName}
          </span>
        );
      }
      return undefined;
    })
    .filter(Boolean); // delete undefined values
  return <span>{consumableElements}</span>;
}