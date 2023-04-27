import { useState } from 'react';
import Image from 'next/image';
import { possibleCost } from '@/constants/cost';
import { numberOfChampionsByCost } from '@/constants/champions';
import GoldIcon from '@/components/icons/goldIcon';

interface IChampionsSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedCost: string;
  setSelectedCost: (cost: string) => void;
  isLoading: boolean
}

const ChampionsSelector: React.FC<IChampionsSelector> = ({ champs, setChamps, selectedCost, setSelectedCost, isLoading }) => {
  const [positionOfSelection, setPositionOfSelection] = useState(1);

  const handleChampionSelection = (index: number) => {
    setChamps(
      champs.map((champion, i) => {
        if (i === index) {
          if (champion.selected) {
            return { ...champion, selected: false, position: 0 };
          } else {
            setPositionOfSelection(positionOfSelection + 1);
            return  { ...champion, selected: true, position: positionOfSelection }
          }
        } else {
          return { ...champion };
        }
      })
    )
  }

  const skeletonNumberOfChampions = Array.from({ length: numberOfChampionsByCost["3 cost"] }, (_, index) => index + 1);
  
  return (
    <div className="flex flex-col bg-earlynight rounded w-100 overflow-hidden">
      <div className="inline-flex">
        {
          /* map over the array of possible cost of champions in order to show clickable buttons for each one */
          Object.keys(possibleCost).map((cost, index) => (
            <button 
              type="button"
              key={index} 
              onClick={(e) => {
                e.preventDefault();
                setSelectedCost(`${e.currentTarget.textContent} cost`);
              }} 
              className={`${(selectedCost == cost + ' cost')?'bg-midday':''} h-12 py-1 flex flex-1 content-center justify-center hover:bg-midday`}>
              <span className="my-auto flex">
                <GoldIcon color="crema" /><span className="ml-2">{cost}</span>
              </span>
            </button>
          ))
        }
      </div>
      {isLoading === false ? (
        <ul className="grid grid-cols-5 items-center gap-4 md:grid-cols-4 md:gap-2 lg:gap-4 lg:grid-cols-5 p-4 bg-midday">
          {champs.map((champion, index) => (
            <li 
              key={index} 
              className={`max-w-[57px] left-1/2 transform -translate-x-1/2 champion aspect-square border-2 border-${champion.cost}cost rounded relative ${(selectedCost == champion.cost + ' cost')?'':"hidden "}${champion.selected === true ? "champ-selected ": ""}cursor-pointer hover-effect text-${champion.cost}cost`}
              onClick={() => handleChampionSelection(index)}
              title={champion.name}
            >
              <div className="w-full h-full relative block rounded overflow-hidden">
                <Image 
                className={`w-20 -left-6 max-w-none absolute z-10`}
                src={champion.image} 
                alt={champion.name} width="53" height="53" />
              </div>
            </li>
          ))}
        </ul>
        ): 
        <ul className="grid grid-cols-5 gap-4 p-4 bg-midday">
          {skeletonNumberOfChampions.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`animate-pulse`}
            >
              <div className="flex items-center justify-center aspect-square mx-auto bg-3cost rounded">
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ChampionsSelector;