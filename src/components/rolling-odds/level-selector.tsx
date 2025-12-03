'use client';

import React, { useMemo } from 'react';
import { Group, Input, NumberField, Button as AriaButton } from 'react-aria-components';
import { MinusIcon, PlusIcon, ChevronsUp } from 'lucide-react';
import {
  getAvailableLevels,
  numberFieldGroupClassName,
  numberFieldInputClassName,
  numberFieldButtonClassName
} from '@/utils/rolling-odds-utils';

interface LevelSelectorProps {
  level: number;
  setLevel: (level: number) => void;
}

export default function LevelSelector({ level, setLevel }: LevelSelectorProps) {
  const { minLevel, maxLevel } = useMemo(() => {
    const levels = getAvailableLevels();
    return {
      minLevel: levels[0],
      maxLevel: levels[levels.length - 1]
    };
  }, []);

  return (
    <NumberField
      value={level}
      onChange={setLevel}
      minValue={minLevel}
      maxValue={maxLevel}
      className="w-24"
      aria-label="Player level"
    >
      <div className="relative">
        {/* Floating label */}
        <div className="absolute -top-2 left-2 z-10 flex items-center gap-1 backdrop-blur-lg px-1">
          <ChevronsUp className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-400">level</span>
        </div>

        <Group className={numberFieldGroupClassName}>
          <Input className={numberFieldInputClassName} />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <AriaButton slot="increment" className={numberFieldButtonClassName}>
              <PlusIcon className="w-4" />
              <span className="sr-only">Increment</span>
            </AriaButton>
            <AriaButton slot="decrement" className={`${numberFieldButtonClassName} -mt-px`}>
              <MinusIcon className="w-4" />
              <span className="sr-only">Decrement</span>
            </AriaButton>
          </div>
        </Group>
      </div>
    </NumberField>
  );
}
