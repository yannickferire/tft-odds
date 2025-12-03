'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { numberOfCopiesByCost, numberOfChampionsByCost } from '@/constants/champions';
import { getCostClasses } from '@/utils/rolling-odds-utils';

interface CopiesStatsProps {
  championName: string;
  cost: number;
  copiesOwned: number;
  contestedCopies: number;
  otherCostOut: number;
  adjustedChampionsByCost: { [cost: string]: number };
}

export default function CopiesStats({ championName, cost, copiesOwned, contestedCopies, otherCostOut, adjustedChampionsByCost }: CopiesStatsProps) {
  const { textClass } = getCostClasses(cost);

  // Get total copies per champion for this cost
  const totalCopiesPerChampion = numberOfCopiesByCost[`${cost} cost`] || 0;

  // Get number of champions at this cost (use adjusted count)
  const numberOfChampions = adjustedChampionsByCost[`${cost} cost`] || numberOfChampionsByCost[`${cost} cost`] || 0;

  // Calculate initial total pool for this cost tier
  const initialTotalPoolForCost = totalCopiesPerChampion * numberOfChampions;

  // Calculate remaining total pool (removing owned, contested copies, and other cost out from the entire pool)
  const remainingTotalPool = initialTotalPoolForCost - copiesOwned - contestedCopies - otherCostOut;

  // Calculate remaining copies for this specific champion
  const remainingCopies = totalCopiesPerChampion - copiesOwned - contestedCopies;

  // Display "This champion" for generic "Any X cost" champions
  const displayName = championName.startsWith('Any ') ? 'This champion' : championName;

  return (
    <div className="px-2.5 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-0.5 h-12 rounded-full bg-white/10"></div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-crema opacity-60">
            <span className={textClass}>{displayName}</span> copies in pool
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-semibold leading-none text-crema w-14">
              {remainingCopies}<small className="text-base">/{totalCopiesPerChampion}</small>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-crema">
              out of {remainingTotalPool} in total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
