import { useMemo } from 'react';
import { Champion } from '@/types/champion';

export interface GroupedChampions {
  cost: string;
  champions: Champion[];
}

/**
 * Hook to group champions by cost and sort them
 * @param champions - Array of all champions
 * @param filter - Optional filter function to apply before grouping
 * @returns Array of grouped champions by cost
 */
export function useGroupedChampions(
  champions: Champion[],
  filter?: (champion: Champion) => boolean
): GroupedChampions[] {
  return useMemo(() => {
    const filteredChampions = filter ? champions.filter(filter) : champions;

    const championsByCost = filteredChampions.reduce((acc: Record<number, Champion[]>, champion) => {
      if (!acc[champion.cost]) acc[champion.cost] = [];
      acc[champion.cost].push(champion);
      return acc;
    }, {});

    return Object.keys(championsByCost)
      .sort((a, b) => Number(a) - Number(b))
      .map(cost => ({
        cost: Number(cost) >= 5 ? '5+ cost' : `${cost} cost`,
        champions: championsByCost[Number(cost)].sort((a, b) => a.name.localeCompare(b.name))
      }));
  }, [champions, filter]);
}
