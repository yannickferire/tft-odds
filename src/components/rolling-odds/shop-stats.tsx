'use client';

import React from 'react';
import { rollingChancesByLevel } from '@/constants/game';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { getAvailableLevels, getCostClasses } from '@/utils/rolling-odds-utils';

interface ShopStatsProps {
  level: number;
  cost: number;
  setLevel: (level: number) => void;
}

/**
 * Gets the probability of finding a champion cost at a given level
 */
const getProbability = (level: number, cost: number): number =>
  rollingChancesByLevel[`level ${level}`]?.[`${cost} cost`] || 0;

/**
 * Finds the level with the highest probability for a given cost
 */
const findBestLevel = (cost: number, levels: number[]): number =>
  levels.reduce((best, current) =>
    getProbability(current, cost) > getProbability(best, cost) ? current : best,
    levels[0]
  );

export default function ShopStats({ level, cost, setLevel }: ShopStatsProps) {
  const probability = getProbability(level, cost);
  const { textClass } = getCostClasses(cost);
  const levels = getAvailableLevels();
  const bestLevel = findBestLevel(cost, levels);

  // Calculate probability difference with next level
  const nextLevel = level + 1;
  const nextLevelProb = getProbability(nextLevel, cost);
  const probDiff = nextLevelProb - probability;

  // Determine feedback based on current vs best level
  const feedback = level === bestLevel ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-500">
      <Star className="w-5 h-5" />
      Best level
    </span>
  ) : probDiff > 0 ? (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium text-green-500 cursor-pointer hover:underline"
      onClick={() => setLevel(nextLevel)}
    >
      <TrendingUp className="w-5 h-5" />
      +{probDiff}% at lvl {nextLevel}
    </span>
  ) : probDiff < 0 ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
      <TrendingDown className="w-5 h-5" />
      {probDiff}% at lvl {nextLevel}
    </span>
  ) : null;

  return (
    <div className="px-2.5 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-0.5 h-12 rounded-full bg-white/10"></div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-crema opacity-60">
            <span className={textClass}>{cost} cost</span> chance per shop slot
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-semibold leading-none text-crema w-14">
              {probability}%
            </span>
            {feedback}
          </div>
        </div>
      </div>
    </div>
  );
}
