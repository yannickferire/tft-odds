import Image from 'next/image';
import { numberOfTraits, validEmblems } from '@/constants/tome-of-traits';
import ResetButton from './resetButton';

interface ITraitsSelector {
  traits: any[];
  setTraits: (traits: any[]) => void;
  isLoading: boolean;
  selectedTraits: number;
  emblemsRandom: number;
  emblemsTailored: number;
}

const TraitsSelector: React.FC<ITraitsSelector> = ({ traits, setTraits, isLoading, selectedTraits, emblemsRandom, emblemsTailored }) => {
  const handleTraitSelection = (name: string) => {
    setTraits(
      traits.map((trait) => {
        if (trait.name === name) {
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

  const skeletonNumberOfTraits = Array.from({ length: numberOfTraits }, (_, index) => index + 1);

  return (
    <div className="flex flex-col rounded w-100 overflow-hidden">
      <header 
        className={`relative rounded md:rounded-b-none bg-earlynight flex`}
      >
        <h2 className="rounded-t pl-4 py-3 bg-earlynight"><span>Select your traits <small className="block sm:inline-block opacity-50">({selectedTraits} trait{selectedTraits > 1?'s':null} selected: {emblemsTailored} emblem{emblemsTailored > 1?'s':null} tailored, {emblemsRandom} emblem{emblemsRandom > 1 ?'s':null} random)</small></span></h2>
        <div className="hidden md:flex gap-1 absolute top-1/2 -translate-y-1/2 right-2">
          <ResetButton traits={traits} setTraits={setTraits} />
        </div>
      </header>
      {isLoading === false ? (
        <div className="relative bg-midday rounded-b py-3 px-4">
          <ul className="grid grid-cols-7 gap-y-4 md:gap-y-1 gap-x-2 md:gap-x-1 ">
            {traits
              .filter((trait) => validEmblems.some((emblem) => emblem.name === trait.name))
              .map((trait) => {
              return(
              <li 
                key={trait.name} 
                className={`transition-all relative flex justify-center md:justify-start`}
                onClick={() => handleTraitSelection(trait.name)}
              >
                <div className={`h-full md:py-1 md:px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 ${trait.selected === true ? "opacity-100": "opacity-50"} hover:opacity-100`}>
                  <figure className={`hex w-7 h-8 flex items-center justify-center p-1 text-sm bg-midnight`}>
                    <Image src={trait.image} width="18" height="18" alt={trait.name} />
                  </figure>
                  <h3 className={`hidden md:inline transition-all duration-500 text-sm ml-2 ${trait.selected === true ? "underline underline-offset-4":null}`}>{trait.name}</h3>
                </div>
              </li>
            )})}
          </ul>
          <p className="px-2 pt-4 pb-2 opacity-50 text-center">Traits without emblems:</p>
          <ul className="relative grid grid-cols-7 gap-y-1 gap-x-2 lg:gap-x-1">
            {traits
              .filter((trait) => !validEmblems.some((emblem) => emblem.name === trait.name))
              .map((trait) => {
              return(
              <li 
                key={trait.name} 
                className={`transition-all relative flex justify-center lg:justify-start`}
                onClick={() => handleTraitSelection(trait.name)}
              >
                <div className={`h-full md:py-1 md:px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 ${trait.selected === true ? "opacity-100": "opacity-50"} hover:opacity-100`}>
                  <figure className={`hex w-7 h-8 flex items-center justify-center p-1 text-sm bg-midnight`}>
                    <Image src={trait.image} width="18" height="18" alt={trait.name} />
                  </figure>
                  <h3 className={`hidden md:inline transition-all duration-500 text-sm ml-2 ${trait.selected === true ? "underline underline-offset-4":null}`}>{trait.name}</h3>
                </div>
              </li>
            )})}
          </ul>
        </div>
      ):(
        <ul className="grid grid-cols-7 gap-y-3 lg:gap-y-2 gap-x-2 lg:gap-x-1 bg-midday py-3 px-4 rounded-b">
          {skeletonNumberOfTraits.map((index) => (
          <li key={index} className="flex justify-center md:justify-start">
            <div className="h-full md:py-1 md:px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 opacity-50">
              <span className={`hex w-7 h-8 flex items-center justify-center p-1 text-xs bg-midnight`}>
              </span>
              <span className="hidden md:inline ml-2 w-20 h-3 bg-crema rounded"></span>
            </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TraitsSelector;