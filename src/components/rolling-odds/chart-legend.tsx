'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface ChartLegendProps {
  userPrefer1Star: boolean;
  userPrefer2Star: boolean;
  userPrefer3Star: boolean;
  setUserPrefer1Star: (value: boolean) => void;
  setUserPrefer2Star: (value: boolean) => void;
  setUserPrefer3Star: (value: boolean) => void;
  is1StarDisabled: boolean;
  is2StarDisabled: boolean;
  is3StarDisabled: boolean;
  show1Star: boolean;
  show2Star: boolean;
  show3Star: boolean;
  copiesOwned: number;
}

type StarLevel = 1 | 2 | 3;

interface LegendItemConfig {
  starLevel: StarLevel;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  activeBorderColor: string;
}

const LEGEND_CONFIGS: LegendItemConfig[] = [
  {
    starLevel: 1,
    label: '1 Star',
    color: 'text-bronze',
    bgColor: 'bg-bronze/10',
    borderColor: 'border-bronze/30',
    activeBorderColor: 'border-bronze',
  },
  {
    starLevel: 2,
    label: '2 Star',
    color: 'text-silver',
    bgColor: 'bg-silver/10',
    borderColor: 'border-silver/30',
    activeBorderColor: 'border-silver',
  },
  {
    starLevel: 3,
    label: '3 Star',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/30',
    activeBorderColor: 'border-gold',
  },
];

export default function ChartLegend({
  userPrefer1Star,
  userPrefer2Star,
  userPrefer3Star,
  setUserPrefer1Star,
  setUserPrefer2Star,
  setUserPrefer3Star,
  is1StarDisabled,
  is2StarDisabled,
  is3StarDisabled,
  show1Star,
  show2Star,
  show3Star,
  copiesOwned,
}: ChartLegendProps) {
  /**
   * Calculates if a line would be visible after applying user preference
   */
  const wouldBeVisible = (starLevel: StarLevel, userPreference: boolean): boolean => {
    if (starLevel === 1) return userPreference && copiesOwned === 0;
    if (starLevel === 2) return userPreference && copiesOwned < 3;
    if (starLevel === 3) return userPreference;
    return false;
  };

  /**
   * Checks if disabling a star level would leave at least one visible line
   */
  const canDisable = (starLevel: StarLevel): boolean => {
    const otherStars = [1, 2, 3].filter(s => s !== starLevel) as StarLevel[];
    const preferences = {
      1: userPrefer1Star,
      2: userPrefer2Star,
      3: userPrefer3Star,
    };

    const remainingVisible = otherStars.filter(star =>
      wouldBeVisible(star, preferences[star])
    ).length;

    return remainingVisible > 0;
  };

  /**
   * Creates toggle handler for a specific star level
   */
  const createToggleHandler = (starLevel: StarLevel) => {
    const stateMap = {
      1: { isActive: userPrefer1Star, isDisabled: is1StarDisabled, setter: setUserPrefer1Star },
      2: { isActive: userPrefer2Star, isDisabled: is2StarDisabled, setter: setUserPrefer2Star },
      3: { isActive: userPrefer3Star, isDisabled: is3StarDisabled, setter: setUserPrefer3Star },
    };

    const { isActive, isDisabled, setter } = stateMap[starLevel];

    return () => {
      // Can't toggle if disabled
      if (isDisabled) return;

      // If trying to disable, check if other lines would remain visible
      if (isActive && !canDisable(starLevel)) return;

      // Toggle the preference
      setter(!isActive);
    };
  };

  const legendItems = LEGEND_CONFIGS.map((config) => {
    const { starLevel } = config;
    const stateMap = {
      1: { isActive: userPrefer1Star, isDisabled: is1StarDisabled, isVisible: show1Star },
      2: { isActive: userPrefer2Star, isDisabled: is2StarDisabled, isVisible: show2Star },
      3: { isActive: userPrefer3Star, isDisabled: is3StarDisabled, isVisible: show3Star },
    };

    return {
      ...config,
      ...stateMap[starLevel],
      toggle: createToggleHandler(starLevel),
    };
  });

  return (
    <div className="px-2.5 py-8">
      <div data-legend-container className="flex items-center justify-center gap-3">
        {legendItems.map((item) => (
          <button
            key={item.label}
            data-star-visible={item.isVisible}
            onClick={item.toggle}
            disabled={item.isDisabled}
            className={`
              flex items-center gap-2 px-2.5 py-1.5 rounded-md border-2 transition-all
              ${item.isDisabled
                ? 'bg-transparent border-white/5 opacity-30 cursor-not-allowed'
                : item.isActive
                  ? `${item.bgColor} ${item.activeBorderColor} opacity-100 cursor-pointer hover:bg-black/20`
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-70 cursor-pointer hover:bg-black/20'
              }
            `}
          >
            {/* Continuous line with dot in the middle */}
            <div className="relative flex items-center w-6 h-2">
              {/* Background continuous line */}
              <div className={`absolute inset-0 h-0.5 top-1/2 -translate-y-1/2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
              {/* Dot in the center */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: item.starLevel }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-3 h-3 ${item.color} fill-current`}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
