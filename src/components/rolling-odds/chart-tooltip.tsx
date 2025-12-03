import React from 'react';
import GoldIcon from '@/components/icons/goldIcon';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
    payload: {
      goldSpent: number;
      probability: number;
      probability2Star: number;
      probability3Star: number;
    };
  }>;
  label?: string;
  show1Star?: boolean;
  show2Star?: boolean;
  show3Star?: boolean;
}

export default function ChartTooltip({ active, payload, show1Star, show2Star, show3Star }: TooltipProps) {
  if (active && payload && payload.length) {
    const { goldSpent, probability, probability2Star, probability3Star } = payload[0].payload;
    return (
      <div className="rounded-lg bg-midnight/90 text-crema p-3 shadow-lg border border-white/10">
        <div className="text-lg font-medium text-crema mb-2 flex items-center gap-1.5">
          <GoldIcon color="crema" size={3} />
          {goldSpent}
        </div>
        <div className="flex flex-col gap-1">
          {show1Star && (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-bronze"><span className="inline-block w-3">1</span>★ – {probability.toFixed(2)}%</div>
            </div>
          )}
          {show2Star && (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-silver"><span className="inline-block w-3">2</span>★ – {probability2Star.toFixed(2)}%</div>
            </div>
          )}
          {show3Star && (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-gold"><span className="inline-block w-3">3</span>★ – {probability3Star.toFixed(2)}%</div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
