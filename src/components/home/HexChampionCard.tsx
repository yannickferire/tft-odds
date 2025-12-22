import React from 'react';
import NextImage from 'next/image';
import { apiURL, currentSet } from '@/constants/set';

interface HexChampionCardProps {
  name: string;
  apiName?: string;
  cost: 1 | 2 | 3 | 4 | 5;
  status?: 'locked' | 'unlocked' | 'none';
  className?: string;
}

const getFrameAsset = (cost: number) => {
  switch (cost) {
    case 1:
    case 2:
      return '/hex-frame-purple-transparent.png'; // Visual Green
    case 3:
    case 4:
      return '/hex-frame-gold-transparent.png'; // Visual Purple
    case 5:
      return '/hex-frame-green-transparent.png'; // Visual Gold
    default: return '/hex-frame-green-transparent.png';
  }
};

export const HexChampionCard: React.FC<HexChampionCardProps> = ({ name, apiName, cost, status = 'none', className = '' }) => {
  const normalizedName = (apiName || name).toLowerCase().replace(/['\s]/g, '');
  const imageUrl = `${apiURL}/game/assets/characters/tft${currentSet}_${normalizedName}/hud/tft${currentSet}_${normalizedName}_square.tft_set${currentSet}.png`;
  const frameUrl = getFrameAsset(cost);

  return (
    <div className={`relative group ${className}`}>
      {/* Container aspect ratio helper */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* 1. Champion Image (Background Layer) */}
        <div
          className="absolute inset-[10%] z-0 overflow-hidden bg-black"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          <NextImage
            src={imageUrl}
            alt={name}
            fill
            className="object-cover scale-75" // Reverted to scale-75 as requested
            sizes="(max-width: 768px) 100px, 200px"
          />
        </div>

        {/* 2. 3D Frame Overlay (Foreground Layer) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <NextImage
            src={frameUrl}
            alt="Frame"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 3. Status Icon (Inset) */}
        {status !== 'none' && (
          <div className="absolute top-[18%] right-[22%] z-20 w-5 h-5 md:w-6 md:h-6 drop-shadow-md">
            <NextImage
              src={status === 'locked' ? '/images/icons/unlockableindicator_locked.png' : '/images/icons/unlockableindicator_unlocked.png'}
              alt={status}
              fill
              className="object-contain"
            />
          </div>
        )}

      </div>
    </div>
  );
};
