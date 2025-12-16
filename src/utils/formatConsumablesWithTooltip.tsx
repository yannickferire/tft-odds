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
  "Artifact Item": '/images/items/Artifact.png',
  "Boot": '/images/items/Boot.avif',
  "Training Dummy": '/images/items/TrainingDummy.png',
  "Spatula / Frying Pan": '/images/items/spatula-pan.png',
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
  // New items
  "Random unbuilt completed item": "/images/items/Tier0.png",
  "Spatula Emblem": "/images/items/random-spatula.png",
  "Frying Pan Emblem": "/images/items/random-pan.png",
  "Random Emblem": "/images/items/random-spatula.png",
  // Basic Components
  "B.F. Sword": "/images/items/BFSword.png",
  "Recurve Bow": "/images/items/RecurveBow.png",
  "Needlessly Large Rod": "/images/items/NeedlesslyLargeRod.png",
  "Tear of the Goddess": "/images/items/TearoftheGoddess.png",
  "Chain Vest": "/images/items/ChainVest.png",
  "Negatron Cloak": "/images/items/NegatronCloak.png",
  "Giant's Belt": "/images/items/GiantsBelt.png",
  "Sparring Gloves": "/images/items/SparringGloves.png",
  "Spatula": "/images/items/Spatula.png",
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

  // Check for global parenthetical note at the end of the string
  // Must be preceded by " + " OR be the start of the string (standalone)
  const globalNotePattern = /(?:^\s*|\s+\+\s+)(\([^)]+\))\s*$/;
  const globalNoteMatch = cleanedValue.match(globalNotePattern);

  let processingValue = cleanedValue;
  let globalNote = null;

  if (globalNoteMatch) {
    globalNote = globalNoteMatch[1]; // The "(text)" part
    // Remove the note from the string to parse items correctly
    // We need to be careful. matches[0] is e.g. " + (note)" or "(note)"
    // Replace the full match with empty string
    processingValue = cleanedValue.replace(globalNotePattern, "").trim();
  }

  // Updated regex to include / - ( ) characters for item names.
  const consumablesList = processingValue.match(/(\d+)x\s+([\w\s'\/\-\(\)]+?)(\s*\d\*)?(?:\s*\+\s*|$)/g);

  if (!consumablesList) {
    // If we have a note but no items matched (unlikely but possible), return just the note or value
    return (
      <div className="flex flex-col">
        <span>{processingValue || value}</span>
        {globalNote && <span className="text-xs opacity-70 mt-1">{globalNote}</span>}
      </div>
    );
  }

  // Define components for "Every component" case
  const EVERY_COMPONENT_LIST = [
    "B.F. Sword", "Recurve Bow", "Needlessly Large Rod", "Tear of the Goddess",
    "Chain Vest", "Negatron Cloak", "Giant's Belt", "Sparring Gloves"
  ];

  // Render consumable items
  const consumableElements = consumablesList
    .map((consumable, index) => {
      // Clean up the consumable string from the potential trailing " + "
      const cleanConsumableString = consumable.replace(/\s*\+\s*$/, "");

      // Regex to capture count, name (including parens), and star rating
      const matchResult = cleanConsumableString.match(/(\d+)x\s+([\w\s'\/\-\(\)]+?)(\s*(\d+)\*)?$/);
      if (!matchResult) return null;

      const [_, count, rawConsumableName, _starGroup, starCount] = matchResult;

      const consumableName = rawConsumableName.trim();
      const starMatch = starCount ? { 1: starCount } : null;

      // For lookup, we want the name WITHOUT the parenthetical note
      // e.g. "Random component (including Spatula)" -> lookup "Random component"
      const parenMatch = consumableName.match(/^(.+?)(\s*\(.*\))$/);
      const lookupName = parenMatch ? parenMatch[1].trim() : consumableName;

      const cleanedConsumableName = lookupName;

      // Special case for "Every component"
      if (cleanedConsumableName.toLowerCase() === "every component") {
        return (
          <div key={index} className="inline-flex flex-wrap items-center align-middle gap-1 mr-2 my-0.5">
            {index > 0 && <span className="mr-2 text-crema/50 font-light">+</span>}
            {EVERY_COMPONENT_LIST.map((compName, compIndex) => {
              const compMappedName = ITEM_NAME_MAPPINGS[compName] || compName;
              const compItemData = !itemsLoading ? findItemByName(allItems, compMappedName) : null;

              if (compItemData) {
                const localImage = Consumables[compName];
                const itemWithLocalImage = localImage
                  ? { ...compItemData, imageUrl: localImage }
                  : compItemData;

                return (
                  <ItemTooltip key={compIndex} item={itemWithLocalImage} hideDescription={true}>
                    <div className="inline-flex relative w-10 h-10 mr-1" style={{ border: '1px solid #000' }}>
                      <Image
                        src={itemWithLocalImage.imageUrl!}
                        alt={compName}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ItemTooltip>
                );
              }
              return <span key={compIndex} className="text-xs mr-1">{compName}</span>;
            })}
          </div>
        );
      }

      // Get data sources
      // Fix: Even if we have a custom image, we still want to try to fetch item data for stats
      const hasCustomImage = !!Consumables[cleanedConsumableName];
      const imagePath = Consumables[cleanedConsumableName];
      const champion = champs.find((champ: any) => champ.name === cleanedConsumableName);

      const mappedName = ITEM_NAME_MAPPINGS[cleanedConsumableName] || cleanedConsumableName;

      // Changed logic: Always look up item data if not manual gold/champ
      // If hasCustomImage is true, we will just OVERRIDE the image later, but we keep the itemData (stats, desc)
      const itemData = !itemsLoading && cleanedConsumableName !== "Gold" && !champion
        ? findItemByName(allItems, mappedName)
        : null;

      const showCount = cleanedConsumableName === "Gold" || parseInt(count) > 1;

      const element = (
        <div className="inline-flex flex-col justify-center align-middle">
          <div className="inline-flex items-center">
            {(imagePath || itemData?.imageUrl) && (
              <div className="inline-flex mr-2 ml-1 relative w-10 h-10 my-0.5">
                <Image
                  src={imagePath || itemData?.imageUrl!} // Prefer local custom image if available
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
            <span>
              {consumableName}
              {backtickMatch && ` ${backtickMatch[1]}`}
            </span>
          </div>
        </div>
      );

      return (
        <div key={index} className="inline-flex items-center align-middle mr-2 my-0.5">
          {index > 0 && <span className="mr-2 text-crema/50 font-light">+</span>}
          {itemData ? (
            <ItemTooltip item={itemData} hideDescription={true}>
              <div className="inline-flex items-center leading-snug">{element}</div>
            </ItemTooltip>
          ) : (
            <div className="inline-flex items-center leading-snug">{element}</div>
          )}
        </div>
      );
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center">
        {consumableElements}
      </div>
      {globalNote && (
        <div className="text-xs opacity-70 mt-1 italic">
          {globalNote}
        </div>
      )}
    </div>
  );
}

