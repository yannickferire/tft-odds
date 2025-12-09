'use client';

import React from 'react';
import Image from 'next/image';
import { useItemsData } from '@/hooks/useItemsData';
import { findItemByName } from '@/utils/fetchItems';
import ItemTooltip from '@/components/item-tooltip';
import { currentSet } from '@/constants/set';

interface TraitEmblemProps {
  traitName: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * TraitEmblem component - Displays a trait emblem with tooltip
 * Automatically fetches emblem data from the API based on trait name
 *
 * @example
 * <TraitEmblem traitName="Ixtal" />
 * <TraitEmblem traitName="Pyro" width={24} height={24} />
 */
export default function TraitEmblem({
  traitName,
  width = 20,
  height = 20,
  className = "inline-block -mt-0.5"
}: TraitEmblemProps) {
  const { allItems, isLoading } = useItemsData();

  // Search for the emblem item in the API
  const emblemName = `${traitName} Emblem`;
  const emblemItem = !isLoading ? findItemByName(allItems, emblemName) : null;

  // Fallback to local image if API item not found
  const fallbackImage = `/images/emblems/set${currentSet}/${traitName}.png`;

  if (isLoading) {
    // Show placeholder while loading
    return (
      <span
        className={className}
        style={{ width, height, display: 'inline-block' }}
      />
    );
  }

  if (!emblemItem?.imageUrl) {
    // Fallback to local image without tooltip
    return (
      <Image
        src={fallbackImage}
        alt={emblemName}
        width={width}
        height={height}
        className={className}
        onError={(e) => {
          // Hide if fallback image also fails
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Display emblem with tooltip
  return (
    <ItemTooltip item={emblemItem}>
      <Image
        src={emblemItem.imageUrl}
        alt={emblemName}
        width={width}
        height={height}
        className={className}
      />
    </ItemTooltip>
  );
}
