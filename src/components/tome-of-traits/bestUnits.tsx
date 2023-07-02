import Image from 'next/image';
import { validEmblems } from '@/constants/tome-of-traits';

interface IBestUnits {
  champs: any[];
  isLoading: boolean;
  traits: any[];
  setTraits: (traits: any[]) => void;
}

const BestUnits: React.FC<IBestUnits> = ({ champs, isLoading, traits, setTraits }) => {
  const bestUnits = champs.filter((champion) => {
    const invalidTraits = champion.traits.filter((trait: string) => !validEmblems.some(emblem => emblem.name === trait));
    const hasValidTrait = invalidTraits.length === 0;
    return !hasValidTrait;
  }).map((champion) => {
    const invalidTraitCount = champion.traits.filter((trait: string) => !validEmblems.some(emblem => emblem.name === trait)).length;
    let tier = "b";
    if (invalidTraitCount === 2) { tier = "s"; }
    if (invalidTraitCount === 1 && champion.cost <= 3) { tier = "a"; }
    
    return {
      ...champion,
      invalidTraitCount: invalidTraitCount,
      tier: tier
    };
  });

  const sortedBestUnits = bestUnits.sort((a, b) => {
    if (a.tier === "s" && b.tier !== "s") return -1;
    if (a.tier !== "s" && b.tier === "s") return 1;
    if (a.tier < b.tier) return -1;
    if (a.tier > b.tier) return 1;
    if (a.cost < b.cost) return -1;
    if (a.cost > b.cost) return 1;
    return 0;
  });

  const skeletonNumberOfBestUnits = Array.from({ length: 12 }, (_, index) => index + 1);

  const handleChampionTraitSelection = (championTraits: any) => {
    setTraits(
      traits.map((trait: any) => {
        if (championTraits.includes(trait.name)) {
          return { ...trait, selected: true };
        } else {
          return { ...trait }
        }
      })
    )
  }

  return (
    <article className="pb-4 ml-4">
      <h3 className="opacity-50 mb-3 text-sm">Best units to use</h3>
      {isLoading === false ? (
        <ul className="flex flex-wrap gap-2 gap-y-4">
        {sortedBestUnits.map((champion, index) => (
          <li 
            key={index} 
            className={`w-12 h-12 relative hover-effect cursor-pointer border-2 border-${champion.cost}cost rounded champion aspect-square text-${champion.cost}cost`}
            title={champion.name}
            onClick={() => handleChampionTraitSelection(champion.traits)}
          >
            <div className={`w-full h-full relative block rounded overflow-hidden`}>
            <Image 
              className={`w-20 -left-7 -top-1 max-w-none absolute z-10`}
              src={champion.image} 
              alt={champion.name} 
              width="53" 
              height="53" 
            />
            </div>
            <div className={`absolute -top-1 left-1/2 -translate-x-1/2 z-20 rounded-sm text-earlynight bg-${champion.tier} flex w-4 h-4 items-center justify-center text-sm font-semibold uppercase`}><span>{champion.tier}</span></div>
          </li>
        ))}
        </ul>
      ) : (
        <ul className="flex flex-wrap gap-2 gap-y-4">
          {skeletonNumberOfBestUnits.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`animate-pulse w-12 h-12 flex-1`}
            >
              <div className="flex items-center justify-center aspect-square mx-auto bg-1cost rounded">
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default BestUnits;