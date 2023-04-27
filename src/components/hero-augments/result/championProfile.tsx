import GoldIcon from "../../icons/goldIcon";
import { bestItems } from '../../../data/bestItems';

interface IChampionProfile {
  champion: any;
  traits: any[];
  selectedTraits: any[];
}

const ChampionProfile: React.FC<IChampionProfile> = ({ champion, traits, selectedTraits }) => {
  return (
    <div className="col-span-3 sm:col-span-2 flex flex-col md:flex md:flex-row">
      <div className="relative mb-1 md:mr-4">
      <img 
      className={`mb-1 w-full md:max-w-[96px] aspect-square border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
      src={champion.image} 
      alt={champion.name} />
      <p className={`absolute text-crema text-xs sm:text-sm px-2 pb-0.5 text-center rounded bottom-1 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
      </div>
      <header className="flex-1">
        <h3 className="-mt-0.5 mb-1 text-center">{champion.name}</h3>
        <ul className="w-full max-w-[96px] md:w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
          {champion.traits.map((trait:string, index:number) => {
            const traitImage = traits.find(traitObj => traitObj.name === trait).image;
            const path = trait === 'Threat' ? 'triangle pt-0 px-[6px] w-6 h-5' : 'hex w-5 h-6';
            return (
              <li className={`${path} flex items-center justify-center p-[3px] text-xs bg-midday ${selectedTraits.includes(trait)?'opacity-100':'opacity-50'}`} key={index}>
                <img src={traitImage} alt={trait} title={trait} />
              </li>
            )
          })}
        </ul>
        {bestItems[champion.name] &&
          <ul className={`border-2 border-midnight mt-3 flex mx-auto w-full max-w-[80px] md:w-16 lg:w-20 z-10 overflow-hidden rounded`}>
            {bestItems[champion.name].map((item, index) => (
              <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                <img src={`/images/items/${item.replace(/['\s]/g, '')}.png`} alt={item} title={item} />
              </li>
            ))}
          </ul>
        }
      </header>
    </div>
  )
}

export default ChampionProfile;