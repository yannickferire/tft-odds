'use client';

import React from 'react';

interface MaxGoldStatProps {
  oddsData: Array<{
    goldSpent: number;
    probability: number;
    probability2Star: number;
    probability3Star: number;
  }>;
  maxGold: number;
  show1Star: boolean;
  show2Star: boolean;
  show3Star: boolean;
}

export default function MaxGoldStat({
  oddsData,
  maxGold,
  show1Star,
  show2Star,
  show3Star
}: MaxGoldStatProps) {
  // Find the data point at maxGold
  const finalDataPoint = oddsData.find(point => point.goldSpent === maxGold);

  if (!finalDataPoint) return null;

  // New logic:
  // 1. Show the highest star level with >=33% chance
  // 2. If none are >=33%, show the one with the highest %
  const probabilities = [
    { star: 3, value: show3Star ? finalDataPoint.probability3Star : 0, label: '3★', color: '#f9be0a' },
    { star: 2, value: show2Star ? finalDataPoint.probability2Star : 0, label: '2★', color: '#b5cbde' },
    { star: 1, value: show1Star ? finalDataPoint.probability : 0, label: '1★', color: '#9f561b' },
  ];

  // Filter out disabled stars
  const activeProbabilities = probabilities.filter(p => p.value > 0);
  if (activeProbabilities.length === 0) return null;

  // Find highest star level with >=33%
  let selectedProb = activeProbabilities.find(p => p.value >= 33);

  // If none are >=33%, find the one with highest %
  if (!selectedProb) {
    selectedProb = activeProbabilities.reduce((max, current) =>
      current.value > max.value ? current : max
    );
  }

  const probability = selectedProb.value;
  const starLevel = selectedProb.label;
  const starColor = selectedProb.color;

  return (
    <div className="px-2.5 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-0.5 h-12 rounded-full bg-white/10"></div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-crema opacity-60">
            Odds after spending {maxGold} gold
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-semibold leading-none text-crema w-14">
              {probability.toFixed(0)}%
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-crema">
              to hit <span style={{ color: starColor }}>{starLevel}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
