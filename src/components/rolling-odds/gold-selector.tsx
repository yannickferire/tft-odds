'use client';

import React from 'react';
import { Group, Input, NumberField, Button as AriaButton } from 'react-aria-components';
import { MinusIcon, PlusIcon } from 'lucide-react';
import GoldIcon from '@/components/icons/goldIcon';
import {
  numberFieldGroupClassName,
  numberFieldInputClassName,
  numberFieldButtonClassName
} from '@/utils/rolling-odds-utils';

interface GoldSelectorProps {
  maxGold: number;
  setMaxGold: (gold: number) => void;
}

const MIN_GOLD = 2;
const GOLD_STEP = 2;

export default function GoldSelector({ maxGold, setMaxGold }: GoldSelectorProps) {
  return (
    <NumberField
      value={maxGold}
      onChange={setMaxGold}
      minValue={MIN_GOLD}
      step={GOLD_STEP}
      className="w-24"
      aria-label="Maximum gold to spend"
    >
      <div className="relative">
        {/* Floating label */}
        <div className="absolute -top-2 left-2 z-10 flex items-center gap-1 backdrop-blur-lg px-1">
          <GoldIcon color="neutral-400" size={3} />
          <span className="text-xs text-neutral-400">gold</span>
        </div>

        <Group className={numberFieldGroupClassName}>
          <Input className={numberFieldInputClassName} />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <AriaButton slot="increment" className={numberFieldButtonClassName}>
              <PlusIcon className="w-4" />
              <span className="sr-only">Increment by {GOLD_STEP}</span>
            </AriaButton>
            <AriaButton slot="decrement" className={`${numberFieldButtonClassName} -mt-px`}>
              <MinusIcon className="w-4" />
              <span className="sr-only">Decrement by {GOLD_STEP}</span>
            </AriaButton>
          </div>
        </Group>
      </div>
    </NumberField>
  );
}
