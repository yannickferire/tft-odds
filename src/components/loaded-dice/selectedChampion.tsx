import Image from "next/image";
import GoldIcon from "@/components/icons/goldIcon";
import { bestItems } from '@/data/bestItems';

interface ISelectedChampion {
  champs: any[];
  traits: any[];
}

const SelectedChampion: React.FC<ISelectedChampion> = ({ champs, traits }) => {
  return (
    <div className="mb-12">
      {champs.map((champion, index) => (
        champion.selected === true ? (
          <div key={index} className="relative flex gap-6 px-4">
            <div>
              <Image 
              className={`mb-1 aspect-square border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
              width="96" height="96"
              src={champion.image} 
              alt={champion.name} />
              <p className={`absolute text-crema text-xs sm:text-sm px-2 pb-0.5 text-center rounded bottom-1 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
            </div>
            <header>
              <h3 className="mt-0.5 mb-1 font-medium text-center">{champion.name}</h3>
              <ul className="w-full max-w-[96px] md:w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
                {champion.traits.map((trait:string, index:number) => {
                  const traitImage = traits.find(traitObj => traitObj.name === trait).image;
                  const path = trait === 'Threat' ? 'triangle pt-0 px-[6px] w-6 h-5' : 'hex w-5 h-6';
                  return (
                    <li className={`${path} flex items-center justify-center p-[3px] text-xs bg-midday`} key={index}>
                      <Image src={traitImage} width="14" height="14" alt={trait} title={trait} />
                    </li>
                  )
                })}
              </ul>
              {bestItems[champion.name] &&
                <ul className={`border-2 border-midnight mt-3 flex mx-auto w-full max-w-[80px] md:w-16 lg:w-20 z-10 overflow-hidden rounded`}>
                  {bestItems[champion.name].map((item, index) => (
                    <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                      <Image src={`/images/items/${item.replace(/['\s]/g, '')}.png`} width="50" height="50" alt={item} title={item} />
                    </li>
                  ))}
                </ul>
              }
            </header>
          </div>
        ) : null
      ))}
    </div>
  )
}

export default SelectedChampion;