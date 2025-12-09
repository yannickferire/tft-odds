import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
import { useItemsData } from '@/hooks/useItemsData';
import { findItemByName, ITEM_NAME_MAPPINGS } from '@/utils/fetchItems';
import ItemTooltip from '@/components/item-tooltip';

const Consumables: { [key: string]: string } = {
  // gold
  "Gold": "/images/items/gold.png",
  // items
  "Item Component": '/images/items/ItemComponent.png',
  "Tier 0 Item": '/images/items/Tier0.png',
  "Tier 1 Item": '/images/items/Tier1.png',
  "Tier 2 Item": '/images/items/Tier2.png',
  "Tier 3 Item": '/images/items/Tier3.png',
  "Tier 4 Item": '/images/items/Tier4.png',
  "Radiant Item": '/images/items/RadiantItem.png',
  "Radiant Item Conversion": '/images/items/RadiantConversion.png',
  "Double all item components": '/images/items/DoubleAllComponents.png',
  "Artifact Item" : '/images/items/Artifact.png',
  "Boot": '/images/items/Boot.avif',
  "Training Dummy": '/images/items/TrainingDummy.png',
  // anvils
  "Artifact Item Anvil": '/images/items/ArtifactItemAnvil.avif',
  "Support Item Anvil": '/images/items/SupportItemAnvil.avif',
  // units
  "1 Cost": "/images/items/1CostUnit.png",
  "2 Cost": '/images/items/2CostUnit.png',
  "3 Cost": '/images/items/3CostUnit.png',
  "3 Cost Yordle": '/images/items/3CostUnit.png',
  "4 Cost": '/images/items/4CostUnit.png',
  "4 Cost Yordle": '/images/items/4CostUnit.png',
  "5 Cost": '/images/items/5CostUnit.png',
  "Champion": '/images/items/3CostUnit.png',
  "Random Champion": '/images/items/2CostUnit.png',
  "Random Higher Champion": '/images/items/4CostUnit.png',
  // emblems
  "Pit Fighter Emblem": '/images/emblems/set13/PitFighter.png',
  "Ambusher Emblem": '/images/emblems/set13/Ambusher.png',
  "Watcher Emblem": '/images/emblems/set13/Watcher.png',
  // others
  "Tome of Traits": '/images/items/TomeofTraits.avif',
};

interface FormatConsumablesWithTooltipProps {
  value: string;
}

export function FormatConsumablesWithTooltip({ value }: FormatConsumablesWithTooltipProps) {
  const [champs, setChamps] = useState<any[]>([]);
  const { allItems, isLoading: itemsLoading } = useItemsData();

  // Fetch champions data
  const { data } = useQuery('champions', fetchChampions);

  // Update champs when data is available
  React.useEffect(() => {
    if (data?.champions) {
      setChamps(data.champions);
    }
  }, [data]);

  // Parse the value string
  const backtickPattern = /`([^`]+)`/;
  const backtickMatch = value.match(backtickPattern);
  const cleanedValue = value.replace(backtickPattern, "").trim();
  const consumables = cleanedValue.match(/(\d+)x\s+([\w\s']+)(\s*\d\*)?\s*/g);

  if (!consumables) {
    return <span>{value}</span>;
  }

  // Render consumable items
  const consumableElements = consumables
    .map((consumable, index) => {
      const matchResult = consumable.match(/(\d+)x\s+([\w\s']+)(\s*(\d\*))?/);
      if (!matchResult) return null;

      const [_, count, consumableName] = matchResult;
      const starPattern = /(\d+)\s*star/;
      const starMatch = consumableName.match(starPattern);
      const cleanedConsumableName = consumableName.replace(starPattern, "").trim();

      // Get data sources
      const imagePath = Consumables[cleanedConsumableName];
      const champion = champs.find((champ: any) => champ.name === cleanedConsumableName);
      const mappedName = ITEM_NAME_MAPPINGS[cleanedConsumableName] || cleanedConsumableName;
      const itemData = !itemsLoading && cleanedConsumableName !== "Gold" && !champion
        ? findItemByName(allItems, mappedName)
        : null;

      const showCount = cleanedConsumableName === "Gold" || parseInt(count) > 1;

      const element = (
        <>
          {(imagePath || itemData?.imageUrl) && (
            <div className="inline-flex mr-2 ml-1 relative w-10 h-10 my-0.5">
              <Image
                src={itemData?.imageUrl || imagePath}
                alt={consumableName}
                width={40}
                height={40}
                className="w-full h-full object-cover box-border"
                style={{ border: '1px solid #000' }}
              />
              {showCount && (
                <div
                  className="absolute bottom-0 right-0 mb-px leading-none backdrop-blur-md flex text-xs items-center justify-center"
                  style={{ marginRight: '1px', borderRadius: '5px 0 0 0', backgroundColor: 'rgba(0,0,0,.5)', padding: '2px 2px 1px 3px' }}
                >
                  x{count}
                </div>
              )}
              {starMatch && (
                <Image
                  src={`/images/icons/${starMatch[1]}-star.png`}
                  alt={`${starMatch[1]} star`}
                  width={40}
                  height={13}
                  className="max-w-none absolute -top-2 mt-1 left-1/2 -translate-x-1/2 z-20"
                />
              )}
            </div>
          )}
          {champion && (
            <div className="inline-flex mr-2 ml-1 relative w-12 h-12 overflow-hidden mt-1 mb-1" style={{ border: '1px solid #000' }}>
              <Image
                src={champion.image}
                alt={champion.name}
                width={60}
                height={60}
                className="max-w-none w-24 -top-3 left-1/2 -translate-x-1/2 absolute"
              />
              {parseInt(count) > 1 && (
                <div className="absolute -bottom-1 -right-1 bg-midnight border border-crema/50 rounded-full w-5 h-5 flex items-center justify-center z-30">
                  <span className="text-crema text-xs font-bold leading-none">{count}</span>
                </div>
              )}
              {starMatch && (
                <Image
                  src={`/images/icons/${starMatch[1]}-star.png`}
                  alt={`${starMatch[1]} star`}
                  width={40}
                  height={13}
                  className="max-w-none absolute -top-2 mt-1 left-1/2 -translate-x-1/2 z-20"
                />
              )}
            </div>
          )}
          {cleanedConsumableName}
          {backtickMatch && ` ${backtickMatch[1]}`}
        </>
      );

      return (
        <div key={index} className="inline-flex items-center align-middle mr-2 my-0.5">
          {index > 0 && "+"}
          {itemData ? (
            <ItemTooltip item={itemData}>
              <div className="inline-flex items-center leading-snug">{element}</div>
            </ItemTooltip>
          ) : (
            <div className="inline-flex items-center leading-snug">{element}</div>
          )}
        </div>
      );
    })
    .filter(Boolean);

  return <>{consumableElements}</>;
}
