'use client';

import React from 'react';
import { getGoldForProbability } from '@/utils/rolling-odds-calculations';
import GoldIcon from '@/components/icons/goldIcon';

interface GoldThresholdStatProps {
  level: number;
  cost: number;
}

export default function GoldThresholdStat({ level, cost }: GoldThresholdStatProps) {
  const goldFor70Percent = getGoldForProbability(`level ${level}`, cost, 1, 70);

  return (
    <div className="px-2.5 mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-0.5 h-12 rounded-full bg-white/10"></div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-crema opacity-60">
            70% odds at
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-semibold leading-none text-crema w-14">
              {goldFor70Percent}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400">
              <GoldIcon color="neutral-400" size={3} />
              gold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
