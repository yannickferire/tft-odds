import Link from 'next/link';
import { useItemsData } from '@/hooks/useItemsData';
import { goldenEgg } from "@/constants/augments";
import GoldIcon from '@/components/icons/goldIcon';
import TacticianCrownIcon from '@/components/icons/tacticianCrownIcon';
import ThiefsGlovesIcon from '@/components/icons/thiefsglovesIcon';
import RemoverIcon from '@/components/icons/remover';
import DuplicatorIcon from '@/components/icons/duplicator';
import { default as ItemIcon } from '@/components/icons/item'; // Generic item icon if available or just use it for components

export const AugmentsTablesCard = () => {
  const { allItems } = useItemsData();

  // Convert object to array for mapping and filter out Radiant Item
  const lootTable = Object.entries(goldenEgg)
    .filter(([loot]) => !loot.includes('Radiant Item'))
    .map(([loot, percent]) => ({ loot, percent }));

  // Helper to find item image
  const getItemImage = (name: string) => {
    // Normalize name for search
    const cleanName = name.replace('x ', '').trim();
    // Try to find exact match or match specific known artifacts
    const item = allItems.find(i => i.name === cleanName || i.name.toLowerCase() === cleanName.toLowerCase());
    return item?.imageUrl;
  };

  const renderLootItem = (text: string, index: number) => {
    const cleanText = text.trim();
    if (!cleanText || cleanText === '+') return <span key={index} className="text-white/20 mx-1">+</span>;

    // Parse count and name
    // Matches "1x Name", "88x Name", or just "Name"
    const match = cleanText.match(/^(\d+x)?\s*(.+)$/);
    const count = match ? match[1] : '';
    const name = match ? match[2] : cleanText;

    // 1. Handle Gold
    if (name === 'Gold') {
      return (
        <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-gold/30 rounded px-1.5 py-0.5 mx-1">
          {count && <span className="text-xs font-bold text-gold">{count.replace('x', '')}</span>}
          <GoldIcon color="gold" size={3} />
        </div>
      );
    }

    // 2. Handle Specific Icons
    if (name.includes("Tactician's Crown")) {
      return (
        <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-morning/30 rounded px-1.5 py-0.5 mx-1" title={name}>
          {count && <span className="text-xs font-bold text-morning">{count.replace('x', '')}</span>}
          <TacticianCrownIcon size={16} />
        </div>
      );
    }
    if (name.includes("Thief's Gloves")) {
      // Distinguish Radiant? For now use same icon but maybe add glow
      const isRadiant = name.includes('Radiant');
      return (
        <div key={index} className={`inline-flex items-center gap-1 bg-[#1A2332] border ${isRadiant ? 'border-prismatic/50' : 'border-purple-400/30'} rounded px-1.5 py-0.5 mx-1`} title={name}>
          {count && <span className={`text-xs font-bold ${isRadiant ? 'text-prismatic' : 'text-purple-400'}`}>{count.replace('x', '')}</span>}
          <ThiefsGlovesIcon size={16} />
        </div>
      );
    }
    if (name.includes("Magnetic Remover")) {
      return (
        <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-blue-400/30 rounded px-1.5 py-0.5 mx-1" title={name}>
          {count && <span className="text-xs font-bold text-blue-400">{count.replace('x', '')}</span>}
          <RemoverIcon size={16} />
        </div>
      );
    }
    if (name.includes("Champion Duplicator")) {
      return (
        <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-green-400/30 rounded px-1.5 py-0.5 mx-1" title={name}>
          {count && <span className="text-xs font-bold text-green-400">{count.replace('x', '')}</span>}
          <DuplicatorIcon size={16} />
        </div>
      );
    }


    // 3. Handle Real Items (Artifacts, etc.)
    const imageUrl = getItemImage(name);
    if (imageUrl) {
      return (
        <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-white/10 rounded pr-2 py-0.5 mx-1 pl-0.5" title={name}>
          <img src={imageUrl} alt={name} className="w-6 h-6 rounded" />
          {count && <span className="text-xs font-bold text-white/80 ml-1">{count}</span>}
          <span className="text-[10px] text-white/60 truncate max-w-[80px] hidden md:inline-block">{name}</span>
        </div>
      );
    }

    // 4. Fallback for generic text (e.g. "Radiant Item")
    return (
      <div key={index} className="inline-flex items-center gap-1 bg-[#1A2332] border border-white/10 rounded px-2 py-0.5 mx-1">
        <span className="text-[10px] text-white/70">{cleanText}</span>
      </div>
    );
  };

  const parseLootString = (text: string) => {
    // Split by ' + ' but keep the structure
    return text.split(' + ').map((part, i) => renderLootItem(part, i));
  };

  return (
    <Link href="/augments/augments-tables" className="block h-full">
      <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-morning/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,179,101,0.1)]">

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-morning/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Content */}
        <div className="flex flex-col mb-6 relative z-10">
          <h3 className="text-2xl font-bold text-crema mb-3 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
            Augments Tables
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h3>
          <p className="text-base text-white/70 leading-snug max-w-sm">
            Discover detailed loot tables for every augment. See what's inside the Golden Egg and more.
          </p>
        </div>

        {/* Visual - Distributions Mini Table */}
        <div className="flex-1 relative w-full overflow-hidden rounded-lg border border-white/5 bg-[#0f172a]/50">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-2 p-2 px-3 border-b border-white/5 bg-white/5 text-[10px] font-bold text-white/50 uppercase tracking-wider">
            <div className="col-span-3">The Golden Egg Rewards</div>
            <div className="text-right">%</div>
          </div>

          {/* Table Body - Infinite Scroll Mask */}
          {/* Table Body - Infinite Scroll Mask */}
          <div className="relative h-[140px] overflow-hidden">
            {/* Gradient Mask for Fade Out */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#10192d] to-transparent z-20 pointer-events-none" />

            <div className="flex flex-col text-[11px]">
              {lootTable.map((row, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 p-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-3 leading-relaxed flex flex-wrap items-center">
                    {parseLootString(row.loot)}
                  </div>
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
