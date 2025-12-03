'use client';

import React from 'react';
import Image from 'next/image';
import { CommandItem } from '@/components/ui/command';
import { Champion } from '@/types/champion';
import { getCostClasses } from '@/utils/rolling-odds-utils';

interface ChampionListItemProps {
  champion: Champion;
  value: string;
  onSelect: () => void;
  imageSize?: string;
  showCheckIcon?: boolean;
  isSelected?: boolean;
  className?: string;
}

const DEFAULT_IMAGE_SIZE = 'w-8 h-8';

export default function ChampionListItem({
  champion,
  value,
  onSelect,
  imageSize = DEFAULT_IMAGE_SIZE,
  showCheckIcon = false,
  isSelected = false,
  className = '',
}: ChampionListItemProps) {
  const { borderClass } = getCostClasses(champion.cost);
  const isLocked = champion.locked === true;
  const isUnlockable = champion.unlockable === true;

  return (
    <CommandItem
      key={champion.name}
      value={value}
      onSelect={onSelect}
      className={`text-crema p-1 cursor-pointer data-[selected=true]:bg-crema data-[selected=true]:text-midnight min-h-10 ${className}`}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className={`${imageSize} rounded overflow-hidden relative border-2 shrink-0 ${borderClass}`}>
          <Image
            src={champion.image}
            alt={champion.name}
            fill
            className="object-cover scale-110"
          />
        </div>
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className="text-sm line-clamp-2 leading-tight">{champion.name}</span>
          {isUnlockable && (
            <Image
              src={isLocked ? "/images/icons/unlockableindicator_locked.png" : "/images/icons/unlockableindicator_unlocked.png"}
              alt={isLocked ? "Locked" : "Unlocked"}
              width={16}
              height={16}
              className="drop-shadow-lg shrink-0"
            />
          )}
        </div>
      </div>
      {showCheckIcon && isSelected && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </CommandItem>
  );
}
