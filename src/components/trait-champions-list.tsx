import React from 'react';
import Image from 'next/image';
import TraitEmblem from '@/components/trait-emblem';

interface Champion {
  name: string;
  cost: number;
  image: string;
  traits: string[];
  unlockable?: boolean;
}

interface TraitChampionsListProps {
  champions: Champion[];
  traitName: string;
}

/**
 * Displays a list of champions that belong to a specific trait
 * Shows champion portraits sorted by cost, with unlockable indicators
 */
export default function TraitChampionsList({ champions, traitName }: TraitChampionsListProps) {
  const filteredChampions = champions
    .filter((champion) => champion.traits.includes(traitName))
    .sort((a, b) => a.cost - b.cost);

  return (
    <ul className="mb-0.5 flex gap-2 justify-center flex-wrap max-w-md mx-auto">
      {filteredChampions.map((champion, index) => (
        <li
          key={index}
          className={`w-12 h-12 champion aspect-square border-2 border-${champion.cost}cost rounded relative text-${champion.cost}cost`}
          title={champion.name}
        >
          <div className="w-full h-full relative rounded overflow-hidden flex items-center justify-center">
            <Image
              className="w-full h-full object-cover"
              src={champion.image}
              alt={champion.name}
              width={48}
              height={48}
            />
          </div>
          {champion.unlockable && (
            <Image
              src="/images/icons/unlockableindicator_unlocked.png"
              alt="Unlockable"
              width={20}
              height={20}
              className="absolute -top-1 -right-1 z-20"
            />
          )}
        </li>
      ))}
      <li>
        <TraitEmblem
          traitName={traitName}
          width={48}
          height={48}
          className="inline-block border-2 rounded relative border-1cost text-1cost ml-4"
        />
      </li>
    </ul>
  );
}
