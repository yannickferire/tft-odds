'use client';

import React, { useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { TrendingDown } from 'lucide-react';
import { getCostClasses, calculateOtherCostOutCopies } from '@/utils/rolling-odds-utils';

interface OtherCostOutSliderProps {
  otherCostOutLevel: number;
  setOtherCostOutLevel: (level: number) => void;
  championCost: number;
  playerLevel: number;
}

const MIN_LEVEL = 1;
const MAX_LEVEL = 5;
const DEFAULT_COLOR = 'hsl(120, 60%, 50%)';

const OTHER_COST_OUT_LEVEL_COLORS = [
  { level: 1, label: 'None', color: 'hsl(120, 60%, 50%)' },
  { level: 2, label: 'Low', color: 'hsl(90, 60%, 50%)' },
  { level: 3, label: 'Normal', color: 'hsl(45, 60%, 50%)' },
  { level: 4, label: 'High', color: 'hsl(30, 70%, 55%)' },
  { level: 5, label: 'Very High', color: 'hsl(0, 60%, 50%)' },
] as const;


/**
 * Determines the CSS translate class for label positioning
 */
const getTranslateClass = (level: number): string => {
  if (level === MIN_LEVEL) return '';
  if (level === MAX_LEVEL) return '-translate-x-full';
  return '-translate-x-1/2';
};

/**
 * Calculates the horizontal position percentage for a given level
 */
const getLabelPosition = (level: number): number =>
  ((level - MIN_LEVEL) / (MAX_LEVEL - MIN_LEVEL)) * 100;

export default function OtherCostOutSlider({
  otherCostOutLevel,
  setOtherCostOutLevel,
  championCost,
  playerLevel
}: OtherCostOutSliderProps) {
  // Calculate dynamic other cost out levels with copies removed based on cost and player level
  const otherCostOutLevels = useMemo(
    () => OTHER_COST_OUT_LEVEL_COLORS.map(({ level, label, color }) => ({
      level,
      label,
      color,
      copies: calculateOtherCostOutCopies(level, championCost, playerLevel)
    })),
    [championCost, playerLevel]
  );

  const currentOtherCostOut = otherCostOutLevels.find(({ level }) => level === otherCostOutLevel);
  const sliderColor = currentOtherCostOut?.color ?? DEFAULT_COLOR;
  const { textClass } = getCostClasses(championCost);

  return (
    <div className="w-48">
      <div className="relative">
        {/* Floating label */}
        <div className="absolute -top-2 left-2 z-10 flex items-center gap-1 backdrop-blur-lg px-1">
          <TrendingDown className="w-3 h-3 text-neutral-400" />
          <span className="text-xs text-neutral-400">
            other <strong className={textClass}>{championCost} cost</strong> out
          </span>
        </div>

        {/* Slider container */}
        <div className="bg-midnight border border-white/10 rounded-md px-4 h-12 flex items-center justify-center">
          <div className="relative w-full">
            <Slider
              value={[otherCostOutLevel]}
              onValueChange={(values) => setOtherCostOutLevel(values[0])}
              min={MIN_LEVEL}
              max={MAX_LEVEL}
              step={1}
              className="w-full relative cursor-pointer py-4"
              style={{ '--slider-range-bg': sliderColor } as React.CSSProperties}
              aria-label={`Other ${championCost} cost out level`}
            />

            {/* Dynamic labels */}
            <div className="absolute !-bottom-2.5 left-0 right-0 h-5 pointer-events-none">
              {otherCostOutLevels.map(({ level, label, copies }) => {
                const isSelected = otherCostOutLevel === level;
                const position = getLabelPosition(level);
                const translateClass = getTranslateClass(level);

                return (
                  <div
                    key={level}
                    className={`absolute bottom-1 transition-opacity ${translateClass} ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ left: `${position}%` }}
                  >
                    <span
                      className={`text-[9px] leading-none transition-colors whitespace-nowrap ${
                        isSelected ? 'text-crema font-medium' : 'text-neutral-400'
                      }`}
                    >
                      {label} ({copies === 0 ? '0' : `-${copies}`})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export calculation function for use in other components
export { calculateOtherCostOutCopies };
