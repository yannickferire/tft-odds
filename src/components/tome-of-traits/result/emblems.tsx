import Image from 'next/image';
import { validEmblems, totalNumberOfEmblems } from "@/constants/tome-of-traits";
import { items } from "@/constants/items";

interface IEmblems {
  traits: any[];
  selectedTraits: number;
  validTraits: number;
  emblemsRandom: number;
  emblemsTailored: number;
}

const Champions: React.FC<IEmblems> = ({ traits, selectedTraits, validTraits, emblemsRandom, emblemsTailored }) => {
  let selectedTraitsName = traits.filter((trait) => trait.selected).map((trait) => trait.name);

  const chanceToGetEmblem = (emblem: string) => {
    let chance = 0;
    chance = (emblemsRandom / totalNumberOfEmblems) * 100;
    if (selectedTraitsName.includes(emblem)) {
      chance += (emblemsTailored / validTraits) * 100;
    }
    chance = Math.round(chance * 100) / 100;
    if (chance > 100) return 100;
    return chance;
  }

  // sort emblems by chance
  validEmblems.sort((a, b) => chanceToGetEmblem(b.name) - chanceToGetEmblem(a.name));

  return (
    <>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
        {validEmblems.map((emblem) => (
          <li key={emblem.name} className="group flex w-full items-center bg-earlynight rounded p-3 first-letter:pr-6">
            <div className="rounded-md overflow-hidden border border-midnight">
              <Image src={`/images/emblems/${emblem.name.toLowerCase().replace(/['\s]/g, '')}.tft_set9.png`} alt={emblem.name} width={50} height={50} />
            </div>
            <header className="ml-4 mr-4 flex flex-col gap-1">
              <div className="flex items-center">
              <h2 className="font-semibold">{emblem.name}</h2>
              {emblem.item && (
                <div className="opacity-50 -mt-0.5 ml-3 flex gap-1 items-center group-hover:opacity-100 transition-all duration-500">
                  <Image src={`/images/items/Spatula.png`} alt="Spatula" width={20} height={20} /> <span className="opacity-50 text-xs">+</span> 
                  <Image src={`/images/items/${emblem.item.replace(/['\s.]/g, '')}.png`} alt={emblem.item} width={20} height={20} />
                </div>
              )}
              </div>
              {emblem.item ? (
                <>
                  <p className="text-xs flex items-center">
                    <Image className="mr-1 -mt-px" src={`/images/icons/${items[emblem.item].type.toLowerCase().replace(/['\s.]/g, '')}.svg`} width={12} height={12} alt="" /> 
                    <span className="opacity-50">+{items[emblem.item].stat} {items[emblem.item].type}</span>
                  </p>
                </>
              ):(
              <p className="text-xs flex items-center"><Image className="mr-1 -mt-px" src="/images/icons/health.svg" width={12} height={12} alt="" /> <span className="opacity-50">+{items["Giant's Belt"].stat} {items["Giant's Belt"].type}</span></p>
              )}
            </header>
            <span className="ml-auto text-xl md:text-2xl font-semibold">{chanceToGetEmblem(emblem.name)}%</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Champions;