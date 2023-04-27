import { numberOfSlots, numberOfTraits } from '../../constants/hero-augments';

interface ITraitsSelector {
  traits: any[];
  setTraits: (traits: any[]) => void;
  traitsLoaded: boolean;
  activeTraits: number;
  stageSelected: number;
}

const TraitsSelector: React.FC<ITraitsSelector> = ({ traits, setTraits, traitsLoaded, activeTraits, stageSelected }) => {
  const handleTraitSelection = (index: number) => {
    setTraits(
      traits.map((trait, i) => {
        if (i === index) {
          if (trait.selected) {
            return { ...trait, selected: false };
          } else {
            return  { ...trait, selected: true }
          }
        } else {
          return { ...trait };
        }
      })
    )
  }
  const slotsTailored = activeTraits > numberOfSlots ? numberOfSlots : activeTraits;
  const slotsRandom = activeTraits > numberOfSlots ? 0 : numberOfSlots - activeTraits;

  const skeletonNumberOfTraits = Array.from({ length: numberOfTraits }, (_, index) => index + 1);
  return (
    <div className="flex flex-col rounded w-100 overflow-hidden">
      <h2 className="rounded-t px-4 py-3 bg-earlynight"><span className={`${(stageSelected == 2)?'opacity-10 pointer-events-none':'opacity-100'} transition duration-500`}>Select your actives traits <small className="block sm:inline-block opacity-50">({activeTraits} trait{activeTraits > 1?'s':null} selected: {slotsTailored} slot{slotsTailored > 1?'s':null} tailored, {slotsRandom} slot{slotsRandom > 1 ?'s':null} random)</small></span></h2>
      {traitsLoaded === true ? (
      <ul className="relative grid grid-cols-8 md:grid-cols-10 gap-y-3 lg:gap-y-2 gap-x-2 lg:gap-x-1 bg-midday py-3 px-4 rounded-b">
        {traits.map((trait, index) => {
          const path = trait.name === 'Threat' ? 'triangle pt-0 px-[6px] w-7 h-6' : 'hex w-6 h-7';
          return(
          <li 
            key={index} 
            className={`${(stageSelected == 2)?'opacity-10 pointer-events-none':'opacity-100'} transition-all flex justify-center lg:justify-start`}
            onClick={() => handleTraitSelection(index)}
          >
            <div className={`h-full lg:py-1 lg:px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 ${trait.selected === true ? "opacity-100": "opacity-50"} hover:opacity-100`}>
              <figure className={`${path} flex items-center justify-center p-1 text-xs bg-midnight`}>
                <img src={trait.image} alt={trait.name} />
              </figure>
              <h3 className={`hidden lg:inline transition-all duration-500 text-xs ml-2 ${trait.selected === true ? "underline underline-offset-4":null}`}>{trait.name}</h3>
            </div>
          </li>
        )})}
        {stageSelected == 2 ? (
          <li className="animate-fromtop absolute top-0 left-0 w-full h-full text-center flex items-center justify-center">
            <span>Hero augments in <strong>2-1 are not tailored</strong> <br/>on your active traits.</span>
          </li>
        ):null}
      </ul>
      ):(
        <ul className="grid grid-cols-8 md:grid-cols-10 gap-y-3 lg:gap-y-2 gap-x-2 lg:gap-x-1 bg-midday py-3 px-4 rounded-b">
          {skeletonNumberOfTraits.map((index) => (
          <li key={index} className="flex justify-center lg:justify-start">
            <div className="h-full lg:py-1 lg:px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 opacity-50">
              <span className={`hex w-6 h-7 flex items-center justify-center p-1 text-xs bg-midnight`}>
              </span>
              <span className="hidden lg:inline ml-2 w-16 h-2.5 bg-crema rounded"></span>
            </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TraitsSelector;