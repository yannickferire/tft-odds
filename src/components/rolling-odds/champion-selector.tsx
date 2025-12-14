'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Champion } from '@/types/champion';
import { possibleCost } from '@/constants/cost';
import { getCostClasses } from '@/utils/rolling-odds-utils';
import { updateChampionLockStatus, generateChampionSearchValue } from '@/utils/unlockable-utils';
import { useGroupedChampions } from './shared/use-grouped-champions';
import ChampionListItem from './shared/champion-list-item';

interface ChampionSelectorProps {
  champions: Champion[];
  selectedChampion: Champion | null;
  setSelectedChampion: (champion: Champion | null) => void;
  unlockedChampions: Set<string>;
  setUnlockedChampions: (unlockedChampions: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  setCopiesOwned: (copiesOwned: number) => void;
}

// Constants
const SELECTOR_WIDTH = 'w-52';
const SELECTOR_HEIGHT = 'h-12';
const BUTTON_IMAGE_SIZE = 'w-11 h-11';
const LIST_IMAGE_SIZE = 'w-8 h-8';
const GENERIC_IMAGE_OPACITY = 'opacity-40';

// Helper functions
function getRandomChampion(champions: Champion[], cost: number): Champion | null {
  // Filter champions by cost and exclude unlockable champions (locked by default)
  const championsOfCost = champions.filter(c => c.cost === cost && !(c as any).unlockable);
  if (championsOfCost.length === 0) return null;
  return championsOfCost[Math.floor(Math.random() * championsOfCost.length)];
}

function generateRandomChampionsByCost(champions: Champion[]): Record<number, Champion | null> {
  const result: Record<number, Champion | null> = {};
  Object.keys(possibleCost).forEach(cost => {
    result[Number(cost)] = getRandomChampion(champions, Number(cost));
  });
  return result;
}

export default function ChampionSelector({ champions, selectedChampion, setSelectedChampion, unlockedChampions, setUnlockedChampions, setCopiesOwned }: ChampionSelectorProps) {
  const [open, setOpen] = useState(false);
  const [showUnlockable, setShowUnlockable] = useState(true);
  const isLoading = champions.length === 0;
  const [randomChampionsByCost, setRandomChampionsByCost] = useState<Record<number, Champion | null>>(() =>
    isLoading ? {} : generateRandomChampionsByCost(champions)
  );

  // Generate random champions once champions are loaded
  useEffect(() => {
    if (champions.length > 0 && Object.keys(randomChampionsByCost).length === 0) {
      setRandomChampionsByCost(generateRandomChampionsByCost(champions));
    }
  }, [champions, randomChampionsByCost]);

  // Regenerate random champions when popover opens (except selected)
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen || champions.length === 0) return;

    const selectedCost = selectedChampion?.image ? null : selectedChampion?.cost;
    setRandomChampionsByCost(prev => {
      const result = { ...prev };
      Object.keys(possibleCost).forEach(cost => {
        const costNum = Number(cost);
        if (costNum !== selectedCost) {
          result[costNum] = getRandomChampion(champions, costNum);
        }
      });
      return result;
    });
  }, [champions, selectedChampion]);

  const displayChampion = useMemo(() => {
    if (!selectedChampion || selectedChampion.image) return selectedChampion;
    return randomChampionsByCost[selectedChampion.cost];
  }, [selectedChampion, randomChampionsByCost]);

  const genericOptions = useMemo(() =>
    Object.keys(possibleCost).map(cost => ({
      name: `Any ${cost} cost`,
      cost: Number(cost),
      image: '',
    })),
    []
  );

  // Filter and update champions based on settings
  const processedChampions = useMemo(() => {
    const filtered = showUnlockable
      ? champions
      : champions.filter(c => !c.locked);

    // Update locked status based on unlockedChampions set
    return filtered.map(champion => updateChampionLockStatus(champion, unlockedChampions));
  }, [champions, showUnlockable, unlockedChampions]);

  // Group champions by cost
  const groupedChampions = useGroupedChampions(processedChampions);

  const handleSelect = useCallback((champion: Champion | { name: string; cost: number; image: string }) => {
    const championToSelect = champion as Champion;

    if (championToSelect.unlockable) {
      // Auto-unlock when selecting an unlockable champion
      setUnlockedChampions(prev => {
        if (prev.has(championToSelect.name)) return prev;
        const newSet = new Set(prev);
        newSet.add(championToSelect.name);
        return newSet;
      });

      // Set as selected with unlocked status
      setSelectedChampion({ ...championToSelect, locked: false });
      // Unlockable champions start with 1 copy owned
      setCopiesOwned(1);
    } else {
      // Regular champion - reset copies to 0
      setSelectedChampion(championToSelect);
      setCopiesOwned(0);
    }

    setOpen(false);
  }, [setSelectedChampion, setUnlockedChampions, setCopiesOwned]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isLoading}
          className={`${SELECTOR_WIDTH} ${SELECTOR_HEIGHT} pr-1 pl-0 justify-between bg-midnight border-2 text-crema hover:bg-black/25 hover:text-crema ${isLoading ? 'border-white/10' : selectedChampion ? getCostClasses(selectedChampion.cost).borderClassWithOpacity : 'border-white/10'
            }`}
        >
          {isLoading ? (
            <span className="flex min-w-0 items-center gap-2">
              <div className={`${BUTTON_IMAGE_SIZE} rounded-l overflow-hidden shrink-0 relative bg-white/10 flex items-center justify-center`}>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
              </div>
              <span className="truncate ml-1 text-neutral-400">Loading champs...</span>
            </span>
          ) : selectedChampion ? (
            <span className="flex min-w-0 items-center gap-2">
              <div className={`${BUTTON_IMAGE_SIZE} rounded-l overflow-hidden shrink-0 relative ${getCostClasses(selectedChampion.cost).bgClass}`}>
                {displayChampion?.image && (
                  <Image
                    src={displayChampion.image}
                    alt={displayChampion.name}
                    fill
                    sizes="44px"
                    className={`object-cover ${!selectedChampion.image ? GENERIC_IMAGE_OPACITY : ''}`}
                  />
                )}
              </div>
              <span className="truncate ml-1 flex items-center gap-1.5">
                {selectedChampion.name}
                {selectedChampion.unlockable && (
                  <Image
                    src="/images/icons/unlockableindicator_unlocked.png"
                    alt="Unlockable"
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                )}
              </span>
            </span>
          ) : (
            <span className="text-neutral-400">Select champion</span>
          )}
          <ChevronsUpDownIcon size={14} className="text-neutral-400 shrink-0" aria-hidden="true" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[768px] max-w-full p-0 border-white/10 bg-midnight/80 backdrop-blur-sm" align="start">
        <Command className="bg-transparent">
          <div className="flex items-center justify-between border-b border-white/10">
            <CommandInput placeholder="Search a champion by name, trait or cost" className="flex-1 text-crema [&_svg]:text-white/10 border-0" />
            <label className="flex items-center gap-2 px-3 pt-2.5 pb-2 text-xs text-crema whitespace-nowrap cursor-pointer border-l border-b border-white/10">
              <div className="relative">
                <Switch
                  checked={showUnlockable}
                  onCheckedChange={setShowUnlockable}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-white/20 [&>span]:bg-transparent [&>span]:shadow-none"
                />
                <div className="absolute inset-0 pointer-events-none flex items-center pl-0.5">
                  <div className={`transition-transform ${showUnlockable ? 'translate-x-3.5' : '-translate-x-0.5'}`}>
                    <Image
                      src="/images/icons/unlockableindicator_locked.png"
                      alt="Lock"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
              <span className="-mt-0.5">Show unlockable</span>
            </label>
          </div>
          <CommandList className="[&_[cmdk-group-separator]]:bg-white/10 text-crema">
            <CommandEmpty>No champion found.</CommandEmpty>

            {/* Generic Options */}
            <CommandGroup heading="Generic">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-1">
                {genericOptions.map((option) => {
                  const randomChamp = randomChampionsByCost[option.cost];
                  const isSelected = selectedChampion?.name === option.name;

                  return (
                    <CommandItem
                      key={option.name}
                      value={option.name}
                      onSelect={() => handleSelect(option)}
                      className="text-crema p-1 cursor-pointer data-[selected=true]:bg-crema data-[selected=true]:text-midnight min-h-10"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={`${LIST_IMAGE_SIZE} rounded overflow-hidden relative shrink-0 ${getCostClasses(option.cost).bgClass}`}>
                          {randomChamp?.image && (
                            <Image
                              src={randomChamp.image}
                              alt={randomChamp.name}
                              fill
                              sizes="32px"
                              className={`object-cover scale-110 ${GENERIC_IMAGE_OPACITY}`}
                            />
                          )}
                        </div>
                        <span className="text-sm line-clamp-2 leading-tight">{option.name}</span>
                      </div>
                      {isSelected && <CheckIcon size={14} className="ml-auto shrink-0" />}
                    </CommandItem>
                  );
                })}
              </div>
            </CommandGroup>

            {/* Champions by Cost */}
            {groupedChampions.map(group => (
              <CommandGroup key={group.cost} heading={group.cost}>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-1">
                  {group.champions.map((champion) => {
                    const isSelected = selectedChampion?.name === champion.name;

                    return (
                      <ChampionListItem
                        key={champion.name}
                        champion={champion}
                        value={generateChampionSearchValue(champion, true)}
                        onSelect={() => handleSelect(champion)}
                        imageSize={LIST_IMAGE_SIZE}
                        showCheckIcon={true}
                        isSelected={isSelected}
                      />
                    );
                  })}
                </div>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
