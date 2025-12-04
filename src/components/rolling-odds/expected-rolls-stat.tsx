'use client';

import React from 'react';
import { getExpectedRolls } from '@/utils/rolling-odds-calculations';
import GoldIcon from '@/components/icons/goldIcon';
import RollIcon from '@/components/icons/rollIcon';

interface ExpectedRollsStatProps {
  level: number;
  cost: number;
  copiesOwned: number;
  contestedCopies: number;
  otherCostOut: number;
  adjustedChampionsByCost: { [cost: string]: number };
}

export default function ExpectedRollsStat({ level, cost, copiesOwned, contestedCopies, otherCostOut, adjustedChampionsByCost }: ExpectedRollsStatProps) {
  const expectedRolls1Copy = getExpectedRolls(`level ${level}`, cost, 1, copiesOwned, contestedCopies, otherCostOut, adjustedChampionsByCost);
  const goldCost = Math.round(expectedRolls1Copy) * 2;

  return (
    <div className="px-2.5 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-0.5 h-12 rounded-full bg-white/10"></div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-crema opacity-60">
            Average rolls for 1 copy
          </div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 text-2xl font-semibold leading-none text-crema w-14">
              <span className="leading-none">{Math.round(expectedRolls1Copy)}</span>
              <RollIcon color="crema" size={5} />
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-crema leading-none">
              <GoldIcon color="crema" size={3} />
              <span className="leading-none">{goldCost}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
