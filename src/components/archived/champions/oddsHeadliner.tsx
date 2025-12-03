import Image from "next/image";
import { numberOfChampionsByCost } from '@/constants/champions';

interface IOddsHeadliner{
  headliner: boolean;
  selectedLevel: number;
  champion: {
    apiName: string,
    image: string,
    cost: number,
    name: string,
    traits: string[],
    selected: boolean
  }
}

const OddsHeadliner: React.FC<IOddsHeadliner> = ({ headliner, selectedLevel, champion }) => {
  // Archived: rollingHeadlinersChancesByLevel no longer exists
  // const percentOfThisChampCost = (rollingHeadlinersChancesByLevel['level ' + selectedLevel][champion.cost + ' cost']);
  // const chanceToSeeThisChamp = percentOfThisChampCost * 1 / numberOfChampionsByCost[champion.cost + " cost"];
  const chanceToSeeThisChamp = 0;

  return chanceToSeeThisChamp > 0 ? (
    <div className="animate-fromtop animate-delay-5 mt-5 rounded bg-[#e5e5bc] p-2 flex items-center justify-center">
      <div className="bg-headliner rounded-full bg-headliner h-6 w-10 relative flex items-center justify-center">
        <span className="bg-earlynight flex items-center h-5 w-9 rounded-full justify-center">
          <Image src="/images/icons/headliner.png" alt="Headliner" width="15" height="14" />
        </span>
      </div>
      <p className="ml-2 text-xs">+ <strong>{chanceToSeeThisChamp.toFixed(2)}%</strong> chance to see this champion as <strong>Headliner</strong> { headliner ? "every 4 rolls": "on each roll" }</p>
    </div>
  ) : null;
}

export default OddsHeadliner;