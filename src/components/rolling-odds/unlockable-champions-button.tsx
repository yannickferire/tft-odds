'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Champion } from '@/types/champion';
import { filterUnlockableChampions, filterLockedChampions, filterUnlockedChampions, generateChampionSearchValue } from '@/utils/unlockable-utils';
import { useGroupedChampions } from './shared/use-grouped-champions';
import ChampionListItem from './shared/champion-list-item';

interface UnlockableChampionsButtonProps {
  champions: Champion[];
  unlockedChampions: Set<string>;
  setUnlockedChampions: (champions: Set<string>) => void;
}

const LIST_IMAGE_SIZE = 'w-8 h-8';
const MAX_CHAMPIONS_TO_DISPLAY = 3;

export default function UnlockableChampionsButton({
  champions,
  unlockedChampions,
  setUnlockedChampions,
}: UnlockableChampionsButtonProps) {
  const [open, setOpen] = useState(false);

  // Check if champions are loading
  const isLoading = champions.length === 0;

  // Filter unlockable champions
  const unlockableChampions = useMemo(() => filterUnlockableChampions(champions), [champions]);

  // Get unlocked and locked champions
  const unlockedChampionsList = useMemo(
    () => filterUnlockedChampions(unlockableChampions, unlockedChampions).sort((a, b) => a.name.localeCompare(b.name)),
    [unlockableChampions, unlockedChampions]
  );

  const lockedChampions = useMemo(
    () => filterLockedChampions(unlockableChampions, unlockedChampions),
    [unlockableChampions, unlockedChampions]
  );

  // Group locked champions by cost using the custom hook
  const groupedLockedChampions = useGroupedChampions(lockedChampions);

  // Toggle champion lock state
  const toggleChampion = useCallback((championName: string) => {
    const newSet = new Set(unlockedChampions);
    if (newSet.has(championName)) {
      newSet.delete(championName);
    } else {
      newSet.add(championName);
    }
    setUnlockedChampions(newSet);
  }, [unlockedChampions, setUnlockedChampions]);

  // Clear all unlocked champions
  const clearAll = useCallback(() => {
    setUnlockedChampions(new Set());
  }, [setUnlockedChampions]);

  // Computed values
  const unlockedCount = unlockedChampions.size;
  const totalUnlockable = unlockableChampions.length;

  // Get button display text
  const buttonDisplayText = useMemo(() => {
    if (unlockedCount === 0) return null;

    const sortedNames = Array.from(unlockedChampions)
      .map(name => name.trim()) // Remove leading/trailing whitespace
      .sort();
    return unlockedCount <= MAX_CHAMPIONS_TO_DISPLAY
      ? sortedNames.join(', ')
      : `${unlockedCount} champions`;
  }, [unlockedChampions, unlockedCount]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isLoading}
          className="h-12 bg-midnight border-white/10 text-crema hover:bg-black/40 hover:text-neutral-50 gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Image
            src="/images/icons/unlockableindicator_unlocked.png"
            alt="Unlockable"
            width={24}
            height={24}
            className="mt-px"
          />
          {buttonDisplayText && (
            <span className="text-xs opacity-60">{buttonDisplayText}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[768px] max-w-full p-0 border-white/10 bg-midnight/80 backdrop-blur-sm" align="start">
        <Command className="bg-transparent">
          <div className="flex items-center justify-between border-b border-white/10">
            <CommandInput placeholder="Search an unlockable champion by name, trait or cost" className="flex-1 text-crema [&_svg]:text-white/10 border-0" />
            <div className="flex items-center gap-2 px-3 h-[41px] text-xs text-crema whitespace-nowrap border-l border-b border-white/10">
              <div className="flex items-center gap-1 opacity-60 border-r border-white/10 pr-2">
                <span>{unlockedCount} / {totalUnlockable}</span>
                <Image
                  src="/images/icons/unlockableindicator_unlocked.png"
                  alt="Unlocked"
                  width={16}
                  height={16}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                disabled={unlockedCount === 0}
                className="h-6 px-2 text-xs text-crema hover:text-neutral-50 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Clear
              </Button>
            </div>
          </div>

          <CommandList className="[&_[cmdk-group-separator]]:bg-white/10 text-crema max-h-96">
            <CommandEmpty>No champion found.</CommandEmpty>

            {/* Unlocked Champions Section */}
            {unlockedChampionsList.length > 0 && (
              <CommandGroup heading="Unlocked Champions">
                <div className="grid grid-cols-3 gap-1">
                  {unlockedChampionsList.map((champion) => (
                    <ChampionListItem
                      key={champion.name}
                      champion={{ ...champion, locked: false }}
                      value={generateChampionSearchValue(champion)}
                      onSelect={() => toggleChampion(champion.name)}
                      imageSize={LIST_IMAGE_SIZE}
                      className="bg-crema/20"
                    />
                  ))}
                </div>
              </CommandGroup>
            )}

            {/* Locked Champions by Cost */}
            {groupedLockedChampions.map(group => (
              <CommandGroup key={group.cost} heading={group.cost}>
                <div className="grid grid-cols-3 gap-1">
                  {group.champions.map((champion) => (
                    <ChampionListItem
                      key={champion.name}
                      champion={champion}
                      value={generateChampionSearchValue(champion)}
                      onSelect={() => toggleChampion(champion.name)}
                      imageSize={LIST_IMAGE_SIZE}
                    />
                  ))}
                </div>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
