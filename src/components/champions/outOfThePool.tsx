interface IOutOfThePool {
  champion: {
    cost: number
  }
  sameCostCopies: number;
  setSameCostCopies: (copies: number) => void;
  pool: {[cost: string]: number};
}

const OutOfThePool: React.FC<IOutOfThePool> = ({ champion,sameCostCopies, setSameCostCopies, pool }) => {
  // Max same cost copies is half of the pool rounded at the nearest multiple of 3
  const maxSameCostCopies = Math.round(pool[champion.cost + " cost"] / 2 / 3) * 3;

  return (
    <div className="animate-fromleft animate-delay-3 inline-block w-full bg-crema rounded">
      <h4 className="sm:h-10 lg:h-auto text-sm mb-2 leading-tight">Others <strong className={`text-${champion.cost}cost font-medium`}>{champion.cost} cost</strong> out of the pool <small className="inline-block opacity-60">(approximatively)</small></h4>
      <div className="flex text-lg w-full justify-between mb-2">
        <button 
          onClick={() => { setSameCostCopies(sameCostCopies - 3)}}
          className={`text-midday h-10 text-lg ${(sameCostCopies <= 0)?'opacity-40':'hover-effect'}`} 
          disabled={sameCostCopies <= 0}
        >
          <span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">
          {(sameCostCopies > 0)?
          (<><span className="-ml-0.5">--</span><span className="text-base relative top-px left-0.5">3</span></>)
          :'–'}
          </span>
        </button>
        <span className="px-2 w-10 h-10 inline-flex items-center justify-center">{sameCostCopies}</span>
        <button
          onClick={() => setSameCostCopies(sameCostCopies + 3)} 
          className={`text-midday h-10 text-lg ${(sameCostCopies == maxSameCostCopies)?'opacity-40':'hover-effect'}`} 
          disabled={sameCostCopies == maxSameCostCopies}
        >
          <span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">+
          {(sameCostCopies !== maxSameCostCopies)?(<span className="text-base relative top-px left-px">3</span>):null}
          </span>
        </button>
      </div>
    </div>
  )
}

export default OutOfThePool;