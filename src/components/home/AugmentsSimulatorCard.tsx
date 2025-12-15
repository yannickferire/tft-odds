import Link from 'next/link';

export const AugmentsSimulatorCard = () => {
  return (
    <Link href="/augments/augments-simulator" className="block h-full">
      <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-morning/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,179,101,0.1)]">

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-morning/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content - Text First */}
        <div className="flex flex-col mb-8 relative z-10">
          <h3 className="text-2xl font-bold text-crema mb-3 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
            Augments Simulator
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h3>
          <p className="text-base text-white/70 leading-snug max-w-md">
            Plan your game ahead. Select your current augment history to calculate exact probabilities for your next choice.
          </p>
        </div>

        {/* Visual - Interactive Slots */}
        <div className="flex-1 flex items-center justify-center relative w-full mt-auto pt-6 border-t border-white/5">
          <div className="flex justify-between items-end w-full max-w-full gap-4 px-2">

            {/* Slot 1 - Prismatic */}
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-xs text-white/50 font-mono text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-125">2-1</span>
              <div className="relative h-12 rounded bg-prismatic shadow-lg transform group-hover:-translate-y-1 transition-transform duration-500 delay-75 flex items-center justify-center w-full">
                <span className="font-semibold text-midnight text-sm">Prismatic</span>
              </div>
            </div>

            {/* Slot 2 - Gold */}
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-xs text-white/50 font-mono text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-125">3-2</span>
              <div className="relative h-12 rounded bg-gold shadow-lg transform group-hover:-translate-y-1 transition-transform duration-500 delay-100 flex items-center justify-center w-full">
                <span className="font-semibold text-midnight text-sm">Gold</span>
              </div>
            </div>

            {/* Slot 3 - Analysis */}
            <div className="w-[30%] flex flex-col gap-2">
              <span className="text-xs text-morning font-bold font-mono text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-125">4-2</span>
              <div className="relative h-12 rounded border-2 border-morning/50 bg-[#1A2332] flex items-center justify-center shadow-[0_0_15px_rgba(236,179,101,0.15)] transform group-hover:-translate-y-2 transition-transform duration-500 delay-150 w-full">
                <span className="text-xl font-bold text-white/40 group-hover:hidden">?</span>

                {/* Internal Probabilities on Hover/Default */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 w-full px-2">
                    <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-prismatic w-[33%]" />
                    </div>
                    <span className="text-[9px] text-white/90 font-mono">33%</span>
                  </div>
                  <div className="flex items-center gap-1.5 w-full px-2 mt-1">
                    <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-[67%]" />
                    </div>
                    <span className="text-[9px] text-gold font-mono">67%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
};
