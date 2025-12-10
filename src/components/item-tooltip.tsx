'use client';

import React from 'react';
import Image from 'next/image';
import { Item } from '@/types/item';
import { cleanItemDescription } from '@/utils/fetchItems';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useItemsData } from '@/hooks/useItemsData';

interface ItemTooltipProps {
  item: Item | null;
  children: React.ReactNode;
}

// Mapping des noms de stats vers leurs icônes
const STAT_ICONS: Record<string, string> = {
  'Ability Power': '/images/icons/abilitypower.svg',
  'AP': '/images/icons/abilitypower.svg',
  'Armor': '/images/icons/armor.svg',
  'Attack Speed': '/images/icons/attackspeed.svg',
  'AS': '/images/icons/attackspeed.svg',
  'Attack Damage': '/images/icons/attackdamage.svg',
  'AD': '/images/icons/attackdamage.svg',
  'Crit': '/images/icons/crit.svg',
  'CritChance': '/images/icons/crit.svg',
  'Critical Strike': '/images/icons/crit.svg',
  'Health': '/images/icons/health.svg',
  'HP': '/images/icons/health.svg',
  'Magic Resist': '/images/icons/magicresist.svg',
  'MR': '/images/icons/magicresist.svg',
  'Mana': '/images/icons/mana.svg',
  'Durability': '/images/icons/durability.png',
  'Omnivamp': '/images/icons/omnivamp.png',
  'Bonus Damage': '/images/icons/bonusdamage.png',
};

/**
 * ItemTooltip component - Displays a tooltip with item details on hover
 * Uses Radix UI HoverCard for better accessibility and positioning
 */
export default function ItemTooltip({ item, children }: ItemTooltipProps) {
  const { allItems } = useItemsData();

  if (!item) {
    return <>{children}</>;
  }

  const cleanedDescription = cleanItemDescription(item.desc, item.effects);

  // Only show effects that have icons (visual stats)
  const visualEffects = Object.entries(item.effects).filter(([key]) => {
    return !key.startsWith('{') && STAT_ICONS[key];
  });
  const hasVisualEffects = visualEffects.length > 0;

  // Format description to wrap text in brackets with special styling
  const formatDescription = (text: string) => {
    if (!text) return null;

    // Split by brackets and wrap bracketed text
    const parts = text.split(/(\[[^\]]+\])/g);

    // Find all bracketed parts and join them
    const bracketedParts: string[] = [];
    const normalParts: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        bracketedParts.push(part);
      } else if (part) {
        normalParts.push(<span key={index}>{part}</span>);
      }
    });

    return (
      <>
        {normalParts}
        {bracketedParts.length > 0 && (
          <span className="opacity-70 italic block mt-1">
            {bracketedParts.join(' ')}
          </span>
        )}
      </>
    );
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="inline-flex cursor-help">
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="bg-midnight border-2 border-crema/20 w-[320px] p-0 shadow-2xl rounded-sm"
        sideOffset={8}
        align="start"
      >
        {/* Header with item image and name */}
        <div className="flex items-center gap-3 p-3 border-b border-crema/20">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-8 h-8 object-contain flex-shrink-0"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-crema font-semibold text-base leading-tight">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {hasVisualEffects && (
                <span className="flex items-center gap-2 text-xs text-morning/80">
                  {visualEffects.map(([key, value]) => {
                    const iconPath = STAT_ICONS[key];
                    // Crit icon needs to be smaller because of different viewBox dimensions
                    const isCritIcon = key === 'CritChance' || key === 'Crit' || key === 'Critical Strike';
                    const iconSize = isCritIcon ? 12 : 14;

                    // Format the value: if it's a decimal (< 1), multiply by 100 for percentage display
                    let displayValue = value;
                    if (typeof value === 'number' && value < 1 && value > 0) {
                      // Convert decimal to percentage (e.g., 0.30 -> 30)
                      displayValue = Math.round(value * 100);
                    } else if (typeof value === 'number') {
                      // Round whole numbers to remove floating point errors
                      displayValue = Math.round(value);
                    }

                    return (
                      <span key={key} className="flex items-center gap-1">
                        <Image
                          src={iconPath}
                          alt={key}
                          width={iconSize}
                          height={iconSize}
                          className="inline-block"
                        />
                        <span className="font-medium text-crema/90">{displayValue}</span>
                      </span>
                    );
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {cleanedDescription && (
          <div className="p-3 border-b border-crema/20">
            <p className="text-crema/90 text-sm leading-relaxed whitespace-pre-wrap">
              {formatDescription(cleanedDescription)}
            </p>
          </div>
        )}

        {/* Composition (if completed item) */}
        {item.composition && item.composition.length > 0 && (
          <div className="p-3">
            <div className="flex items-center gap-1">
              {item.composition.map((componentApiName, idx) => {
                // Find the component item in allItems to get its imageUrl
                const componentItem = allItems.find(i => i.apiName === componentApiName);

                return (
                  <React.Fragment key={idx}>
                    {componentItem?.imageUrl && (
                      <img
                        src={componentItem.imageUrl}
                        alt={componentItem.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    {idx < item.composition.length - 1 && (
                      <span className="text-crema/20 text-xs mx-0.5">+</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
