import { useState } from 'react';
import Image from 'next/image';
import { numberOfChampionsByCost } from '@/constants/champions';
import GoldIcon from '@/components/icons/goldIcon';
import { odds } from "@/constants/6-costs";

interface IChampionsSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedStage: string;
  levelTen: boolean;
  viktor: boolean;
  getOddsForStage: (stage: string, levelTen: boolean, viktor: boolean) => number;
  isLoading: boolean;
}

const ChampionsSelector: React.FC<IChampionsSelector> = ({ 
  champs, 
  setChamps, 
  selectedStage, 
  levelTen, 
  viktor, 
  getOddsForStage,
  isLoading 
}) => {
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

  const skeletonNumberOfChampions = Array.from({ length: numberOfChampionsByCost["6 cost"] }, (_, index) => index + 1);
  
  return (
    <div className="flex flex-col bg-earlynight rounded w-100 overflow-hidden">
      <div className="inline-flex justify-between items-center">
        <p className="h-12 py-1 flex self-start flex-1 items-center justify-center gap-2"><GoldIcon color="crema" /> 6 – <span className="text-morning">{getOddsForStage(selectedStage, levelTen, viktor).toFixed(2)}%</span></p>
      </div>
      {isLoading === false ? (
        <ul className="grid grid-cols-3 items-center gap-4 md:grid-cols-3 md:gap-2 lg:gap-3 lg:grid-cols-3 p-4 bg-midday">
          {champs.map((champion, index) => (
            <li 
              key={index} 
              className={`w-20 h-20 lg:w-24 lg:h-24 left-1/2 transform -translate-x-1/2 champion aspect-square border-2 border-carry rounded relative ${champion.selected === true ? "champ-selected ": ""}cursor-pointer hover-effect text-carry`}
              onClick={() => handleChampionSelection(index)}
              title={champion.name}
            >
              <div className="w-full h-full relative block rounded overflow-hidden">
                <Image 
                className={`h-full w-full max-w-none absolute z-10`}
                src={champion.image} 
                alt={champion.name} width="53" height="53" />
              </div>
            </li>
          ))}
        </ul>
        ): 
        <ul className="grid grid-cols-3 gap-4 p-4 bg-midday">
          {skeletonNumberOfChampions.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`animate-pulse`}
            >
              <div className="flex items-center justify-center aspect-square mx-auto bg-carry rounded">
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ChampionsSelector;