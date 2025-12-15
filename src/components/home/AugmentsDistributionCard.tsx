import Link from 'next/link';
import { augmentsDistributionDetailed } from "@/constants/augments";

export const AugmentsDistributionCard = () => {
  // Sort by percentage descending to show most common scenarios first
  const sortedDistribution = [...augmentsDistributionDetailed].sort((a, b) => b.percent - a.percent);

  // Helper to get color class based on tier name
  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'Prismatic': return 'bg-prismatic text-midnight';
      case 'Gold': return 'bg-gold text-midnight';
      case 'Silver': return 'bg-silver text-midnight';
      default: return 'bg-white/10 text-white';
    }
  };

  return (
    <Link href="/augments/augments-distribution" className="block h-full">
      <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-morning/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,179,101,0.1)]">

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-morning/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Content */}
        <div className="flex flex-col mb-6 relative z-10">
          <h3 className="text-2xl font-bold text-crema mb-3 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
            Augments Distribution
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h3>
          <p className="text-base text-white/70 leading-snug max-w-sm">
            View the complete probability table for every possible augment scenario in the game.
          </p>
        </div>

        {/* Visual - Distributions Mini Table */}
        <div className="flex-1 relative w-full overflow-hidden rounded-lg border border-white/5 bg-[#0f172a]/50">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-2 p-2 border-b border-white/5 bg-white/5 text-[10px] font-bold text-white/50 uppercase tracking-wider">
            <div>1st</div>
            <div>2nd</div>
            <div>3rd</div>
            <div className="text-right">%</div>
          </div>

          {/* Table Body - Infinite Scroll Mask */}
          <div className="relative h-[140px] overflow-hidden">
            {/* Gradient Mask for Fade Out */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#10192d] to-transparent z-20 pointer-events-none" />

            <div className="flex flex-col">
              {sortedDistribution.map((row: any, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 p-2 px-2 border-b border-white/5 text-[10px] items-center hover:bg-white/5 transition-colors">
                  <div className={`rounded px-1.5 py-0.5 font-bold truncate ${getTierClass(row[1])}`}>{row[1]}</div>
                  <div className={`rounded px-1.5 py-0.5 font-bold truncate ${getTierClass(row[2])}`}>{row[2]}</div>
                  <div className={`rounded px-1.5 py-0.5 font-bold truncate ${getTierClass(row[3])}`}>{row[3]}</div>
                  <div className="text-right font-mono text-morning font-bold">{row.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};
