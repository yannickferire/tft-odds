import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Champion } from '@/types/tft';

interface EncountersCardProps {
  encountersCount: number;
  champions: Champion[];
}

export const EncountersCard = ({
  encountersCount,
  champions,
}: EncountersCardProps) => {
  // Initialize with first 6 to match server-side rendering
  const [previewChampions, setPreviewChampions] = useState(champions.slice(0, 6));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Randomize champions on client mount
    if (champions.length > 0) {
      const shuffled = [...champions].sort(() => 0.5 - Math.random());
      setPreviewChampions(shuffled.slice(0, 6));
    }
  }, [champions]);

  return (
    <Link href="/encounters" className="block h-full">
      <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-morning/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,179,101,0.1)]">

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-morning/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Section - Stat */}
        <div className="flex flex-col items-center justify-center flex-grow pt-4 pb-8 space-y-2">
          <span className="text-5xl font-bold text-crema tracking-tight">
            {encountersCount}
          </span>
          <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
            Possible Encounters
          </span>

          {/* Avatar Cluster */}
          <div className="flex items-center justify-center -space-x-4 pt-6">
            {previewChampions.map((champion, index) => (
              <div
                key={champion.apiName}
                className="relative w-12 h-12 rounded-full border-2 border-[#0f172a] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10"
                style={{ zIndex: 10 - index }}
              >
                <Image
                  src={champion.image}
                  alt={champion.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
            {/* Show count badge only if we have more than what we show,
                and ensure we are consistent with potential hydration.
                Using isClient to avoid mismatch if randomization changes length (unlikely here but good practice) */}
            {(champions.length > 6) && (
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0f172a] bg-midnight text-xs font-bold text-crema z-0">
                +{champions.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Content */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <h3 className="text-2xl font-bold text-crema mb-2 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
            Opening Encounters
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h3>
          <p className="text-base text-white/70 leading-snug">
            View spawn rates, rewards and champions for each encounter to optimize your early game strategy.
          </p>
        </div>
      </div>
    </Link>
  );
};
