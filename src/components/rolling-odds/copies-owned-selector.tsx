'use client';

import React from 'react';
import { Group, Input, NumberField, Button as AriaButton } from 'react-aria-components';
import { MinusIcon, PlusIcon } from 'lucide-react';
import CopyIcon from '@/components/icons/copyIcon';
import {
  numberFieldGroupClassName,
  numberFieldInputClassName,
  numberFieldButtonClassName
} from '@/utils/rolling-odds-utils';

interface CopiesOwnedSelectorProps {
  copiesOwned: number;
  setCopiesOwned: (copies: number) => void;
  maxCopies: number;
}

const MIN_COPIES = 0;
const MAX_COPIES = 9;

export default function CopiesOwnedSelector({ copiesOwned, setCopiesOwned, maxCopies }: CopiesOwnedSelectorProps) {
  return (
    <NumberField
      value={copiesOwned}
      onChange={setCopiesOwned}
      minValue={MIN_COPIES}
      maxValue={MAX_COPIES}
      className="w-24"
      aria-label="Number of copies owned"
    >
      <div className="relative">
        {/* Floating label */}
        <div className="absolute -top-2 left-2 z-10 flex items-center gap-1 backdrop-blur-lg px-1">
          <CopyIcon color="neutral-400" size={3} />
          <span className="text-xs text-neutral-400">owned</span>
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
