import Image from "next/image";
import GoldIcon from '@/components/icons/goldIcon';

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
  "Radiant Item": '/images/items/RadiantItem.png',
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
  "Reforger": '/images/items/reforger.webp',
  "Magnetic Remover": '/images/items/remover.webp',
};

export function formatConsumables(value: string) {
  const consumables = value.match(/(\d+)x\s+([\w\s']+)\s*/g);

  if (!consumables) { return value; }
  return consumables.map((consumable, index) => {
    const matchResult = consumable.match(/(\d+)x\s+([\w\s']+)/);

    if (matchResult) {
      const [count, consumableName] = matchResult.slice(1);

      let radiant = false;
      if (consumableName.includes("Radiant")) { radiant = true; }
      let cleanedConsumableName = consumableName;

      if (!consumableName.includes("Radiant Item")) { cleanedConsumableName = cleanedConsumableName.replace("Radiant ", ""); }
      cleanedConsumableName = cleanedConsumableName.trim();
      const imagePath = Consumables[cleanedConsumableName];

      return (
        <span key={index}>
          {index > 0 && <span className="mr-1">+</span>}
          {consumableName === "Gold" ? (
            <>
              <span>{count} </span>
              <GoldIcon color="crema" size={3} />
            </>
          ) : (
            <>
              <span>{count}x </span>
              {imagePath && <Image src={imagePath} alt={consumableName} width={24} height={24} className={`inline-block ml-1 -mt-1 mr-1 border ${radiant ? 'border-gold' : 'border-midday'} box-border`} />}
            </>
          )}
          {consumableName !== "Gold" && consumableName}
        </span>
      );
    }
  });
}