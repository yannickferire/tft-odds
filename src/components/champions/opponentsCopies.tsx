import CopyIcon from '@/components/icons/copyIcon';
import { numberOfCopiesByCost } from '@/constants/champions';

interface IOpponentsCopies {
  champion: {
    cost: number,
    name: string,
  }
  opponentsCopies: number;
  setOpponentsCopies: (copies: number) => void;
}

const OpponentsCopies: React.FC<IOpponentsCopies> = ({ champion, opponentsCopies, setOpponentsCopies }) => {
  return (
    <div className="animate-fromleft animate-delay-2 inline-block w-full bg-crema rounded">
      <h4 className="sm:h-10 lg:h-auto text-sm mb-2">Opponents&apos;s <strong className="font-medium">{champion.name}</strong> <CopyIcon color="midnight" /></h4>
      <div className="flex text-lg w-full justify-between mb-2">
        <button 
          onClick={() => { setOpponentsCopies(opponentsCopies - 1)}}
          className={`text-midday h-10 text-lg ${(opponentsCopies <= 0)?'opacity-40':'hover-effect'}`} 
          disabled={opponentsCopies <= 0}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">–</span></button>
        <span className="px-2 w-10 h-10 inline-flex items-center justify-center">{opponentsCopies}</span>
        <button
          onClick={() => setOpponentsCopies(opponentsCopies + 1)} 
          className={`text-midday h-10 text-lg ${(opponentsCopies >= numberOfCopiesByCost[champion.cost+" cost"])?'opacity-40':'hover-effect'}`} 
          disabled={opponentsCopies >= numberOfCopiesByCost[champion.cost+" cost"]}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">+</span></button>
      </div>
    </div>
  )
}

export default OpponentsCopies;