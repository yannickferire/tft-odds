import { useState } from 'react';
import ChampionOdds from './championOdds';
import { numberOfChampionsByCost, numberOfCopiesByCost } from '@/constants/champions';
import GoldIcon from '@/components/icons/goldIcon';

interface IChampionsOdds {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedLevel: number;
  traits: any[];
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs, setChamps, selectedLevel, traits }) => {
  const getPool = () => {
    const newPool: any = [];
    Object.keys(numberOfChampionsByCost).forEach((cost) => {
      newPool[cost] = numberOfChampionsByCost[cost] * numberOfCopiesByCost[cost];
    });
    return newPool;
  }
  const [pool, setPool] = useState(getPool());

  let selectedChampions = champs.filter((champion) => champion.selected);
  selectedChampions.sort((a, b) => b.position - a.position);

  return (
    <main className="flex-1 md:ml-6 mb-20 w-full px-4 bg-crema text-midnight relative ticket">
      {selectedChampions.length > 0 ? (
        <ul>
        {selectedChampions.map((champion) => {
          return (
              <li key={champion.name} className="flex flex-wrap border-b border-dashed py-6 content-center last:border-0">
                <ChampionOdds champs={champs} setChamps={setChamps} champion={champion} selectedLevel={selectedLevel} pool={pool} traits={traits} />
              </li>
        )})}
        </ul>
        ):
        <p className="p-10 text-xl text-center"><strong>Choose one or multiple champions</strong> to see <br/>how much average <span className="mr-0.5"><GoldIcon color="midnight" size={4} /></span>golds you will need to hit them. <br/><br />Good Luck, Have Fun!</p>
      }
    </main>
  )
}

export default ChampionsOdds;