import CopyIcon from '@/components/icons/copyIcon';
interface IOwnedCopies {
  champion: {
    name: string,
  }
  ownedCopies: number;
  setOwnedCopies: (copies: number) => void;
}

const OwnedCopies: React.FC<IOwnedCopies> = ({ champion, ownedCopies, setOwnedCopies }) => {
  return (
    <div className="animate-fromleft animate-delay-1 inline-block w-full bg-crema rounded">
      <h4 className="sm:h-10 lg:h-auto text-sm mb-2">Your <strong className="font-medium">{champion.name}</strong> <CopyIcon color="midnight" /></h4>
      <div className="flex text-lg w-full justify-between mb-2">
        <button 
          onClick={() => { setOwnedCopies(ownedCopies - 1)}}
          className={`text-midday h-10 text-lg ${(ownedCopies <= 0)?'opacity-40':'hover-effect'}`} 
          disabled={ownedCopies <= 0}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">–</span></button>
        <span className="px-2 w-10 h-10 inline-flex items-center justify-center">{ownedCopies}</span>
        <button
          onClick={() => setOwnedCopies(ownedCopies + 1)} 
          className={`text-midday h-10 text-lg ${(ownedCopies >= 9)?'opacity-40':'hover-effect'}`} 
          disabled={ownedCopies >= 9}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">+</span></button>
      </div>
    </div>
  )
}

export default OwnedCopies;