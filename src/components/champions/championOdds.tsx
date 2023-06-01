import { useState } from 'react';
import Image from 'next/image';
import OwnedCopies from './ownedCopies';
import OpponentsCopies from './opponentsCopies';
import OutOfThePool from './outOfThePool';
import GoldIcon from '@/components/icons/goldIcon';
import OddsByStar from './oddsByStar';
import { numberOfCopiesForTier } from '@/constants/champions';
import { bestItems } from '@/data/bestItems';

interface IChampionOdds {
  champion: {
    apiName: string,
    image: string,
    cost: number,
    name: string,
    traits: string[],
    selected: boolean
  }
  selectedLevel: number;
  pool: {[cost: string]: number};
  champs: any[];
  setChamps: (champions: any[]) => void;
  traits: any[];
}

const ChampionOdds: React.FC<IChampionOdds> = ({ champion, selectedLevel, pool, champs, setChamps, traits }) => {
  const [ownedCopies, setOwnedCopies] = useState(0);
  const [opponentsCopies, setOpponentsCopies] = useState(0);
  const [sameCostCopies, setSameCostCopies] = useState(0);

  // randomized emojis for success (different for each tier)
  const emojis = ['👌', '🤘', '✌️', '👊', '🤝', '👍', '🚀', '🥇', '🎉', '💯', '😎', '🥳', '🔥', '✨', '🙉', '🎯'];
  const [randomizedEmojis, setRandomizedEmojis] = useState(() => {
    const randomEmojis : any[] = [];
    for (let i = 0; i < Object.keys(numberOfCopiesForTier).length; i++) {
      let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      (randomEmojis.includes(randomEmoji) ? i-- : randomEmojis.push(randomEmoji));
    }
    return randomEmojis;
  });

  function handleRemoveChampion(name: string) {
  setChamps(
    champs.map((champion) => {
      if (champion.name === name) {
        return { ...champion, selected: false, position: 0 };
      } else {
        return { ...champion };
      }
    })
  );
}

  return (
    <>
      <header className="animate-fadein flex flex-col mr-2 md:mr-4">
        <div 
          onClick={() => handleRemoveChampion(champion.name)}
          className="animate-fromleft w-20 h-20 lg:w-24 lg:h-24 relative bg-midnight rounded group cursor-pointer">
            <Image 
              className={`mb-1 h-full border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
              src={champion.image} 
              alt={champion.name}
              width="96"
              height="96" />
            <span className={`group-hover:scale-100 group-hover:opacity-100 transition duration-500 scale-75 origin-center opacity-0 absolute -mt-1 ml-1 text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 text-${champion.cost}cost`}>+</span>
          <p className={`absolute text-crema text-sm px-2 pb-0.5 text-center rounded bottom-0 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
        </div>
        <h3 className="animate-fromtop animate-delay-1 w-20 lg:w-24 mt-2 mb-2 text-center font-semibold leading-4">{champion.name}</h3>
        <ul className="animate-fromtop animate-delay-2 w-20 lg:w-24 flex justify-center items-center gap-1">
          {champion.traits.map((trait, index) => {
            const traitImage = traits.find(traitObj => traitObj.name === trait).image;
            const path = trait === 'Threat' ? 'triangle pt-0 px-[6px] w-7 h-6' : 'hex w-6 h-7';

            return (
              <li className={`${path} flex items-center justify-center p-1 text-xs bg-midnight opacity-50`} key={index}>
                <Image src={traitImage} alt={trait} title={trait} width="16" height="16" />
              </li>
            )
          })}
        </ul>
        {bestItems[champion.name] &&
          <ul className={`animate-fromtop animate-delay-3 border border-midnight mt-2 lg:mt-4 flex w-20 mx-auto justify-center z-10 overflow-hidden rounded`}>
            {bestItems[champion.name].map((item, index) => (
              <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                <Image src={`/images/items/${item.replace(/['\s]/g, '')}.png`} alt={item} title={item} width="25" height="25" />
              </li>
            ))}
          </ul>
        }
      </header>
      <div className="animate-fadein animate-delay-2 order-3 lg:order-2 lg:mr-4 mt-6 lg:mt-0 flex flex-1 md:flex-1 flex-col sm:flex-row lg:flex-wrap gap-4 lg:gap-1 lg:min-w-[165px] lg:w-48 lg:flex-none">
        <OwnedCopies champion={champion} ownedCopies={ownedCopies} setOwnedCopies={setOwnedCopies} />
        <OpponentsCopies champion={champion} opponentsCopies={opponentsCopies} setOpponentsCopies={setOpponentsCopies} />
        <OutOfThePool champion={champion} sameCostCopies={sameCostCopies} setSameCostCopies={setSameCostCopies} pool={pool} />
      </div>
      <div className="animate-fadein animate-delay-1 order-2 lg:order-3 flex flex-auto lg:flex-1">
        <OddsByStar star={1} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies} opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} emoji={randomizedEmojis[0]} />
        <OddsByStar star={2} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} emoji={randomizedEmojis[1]} />
        <OddsByStar star={3} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} emoji={randomizedEmojis[2]} />
      </div>
    </>
  )
}

export default ChampionOdds;