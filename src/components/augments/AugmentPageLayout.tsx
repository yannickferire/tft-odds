import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentSet } from '@/constants/set';


interface AugmentPageLayoutProps {
  children: React.ReactNode;
}

const TABS = [
  { name: "The Golden Egg", href: "/augments/the-golden-egg", image: "/images/augments/TheGoldenEgg.avif" },
  { name: "Spoils of War", href: "/augments/spoils-of-war", image: "/images/augments/SpoilsofWar.avif" },
  { name: "Pandora's Bench", href: "/augments/pandoras-bench", image: "/images/augments/PandorasBench.avif" },
  { name: "Warpath", href: "/augments/warpath", image: "/images/augments/Warpath.png" },
];

export const AugmentPageLayout: React.FC<AugmentPageLayoutProps> = ({
  children
}) => {
  const router = useRouter();

  return (
    <>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide"><strong className="text-morning">Augments data</strong> tables</h1>

      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-8 px-4 gap-2">
        <p><strong>This page is designed to provide detailed insights into the random rewards and unique mechanics of specific Augments</strong> in Teamfight Tactics Set {currentSet}.</p>
        <p>In Teamfight Tactics, understanding the rewards and unique mechanics of specific Augments can significantly enhance your gameplay. These Augments often come with random or conditional rewards that can swing the tide of a match when utilized effectively.</p>
        <p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-0 h-auto p-0 align-baseline font-bold underline">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>Introduction</AlertDialogTitle>
                <AlertDialogDescription className="space-y-4 text-left">
                  <p>In Teamfight Tactics, understanding the rewards and unique mechanics of specific Augments can significantly enhance your gameplay. These Augments often come with random or conditional rewards that can swing the tide of a match when utilized effectively.</p>

                  <p>Detailed breakdown of specific Augment mechanics in Set {currentSet}.</p>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-morning flex items-center gap-2">
                      <Image src="/images/augments/TheGoldenEgg.avif" alt="Egg" width={24} height={24} className="rounded" />
                      The Golden Egg
                    </h3>
                    <p>Hatches in 11 turns to grant massive loot. Speed up hatching by winning player combats (-1 extra turn).</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-morning flex items-center gap-2">
                      <Image src="/images/augments/SpoilsofWar.avif" alt="Spoils" width={24} height={24} className="rounded" />
                      Spoils of War
                    </h3>
                    <p>Chance to drop loot (Gold, Components, Items) when you kill enemy units. Tiers: Silver (25%), Gold (30%), Prismatic (40%).</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-morning flex items-center gap-2">
                      <Image src="/images/augments/PandorasBench.avif" alt="Pandora" width={24} height={24} className="rounded" />
                      Pandora's Bench
                    </h3>
                    <p>Transforms the 3 rightmost bench units into random units of the same cost at the start of every round. Great for 3-starring high-cost units.</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-morning flex items-center gap-2">
                      <Image src="/images/augments/Warpath.png" alt="Warpath" width={24} height={24} className="rounded" />
                      Warpath
                    </h3>
                    <p>Gain a random Emblem. Losing grants XP based on number of active traits. Winning grants flat XP.</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="absolute right-2 top-2">
                <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </p>
      </article>

      <nav className="flex flex-wrap justify-center gap-3 mb-8 px-4">
        {TABS.map((tab) => {
          const isActive = router.pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className="group">
              <div
                className={cn(
                  "flex items-center gap-2 p-1.5 px-3 rounded-lg border transition-all duration-300",
                  isActive
                    ? "bg-midnight/80 border-morning shadow-[0_0_10px_-4px_rgba(255,170,108,0.5)]"
                    : "bg-midnight/40 border-crema/5 hover:border-crema/20 hover:bg-midnight/60"
                )}
              >
                <div className={cn("relative shrink-0 transition-transform duration-300", isActive ? "scale-105" : "")}>
                  <Image
                    src={tab.image}
                    alt={tab.name}
                    width={28}
                    height={28}
                    className="rounded shadow-sm"
                  />
                </div>
                <span className={cn(
                  "font-bold text-xs tracking-wide transition-colors whitespace-nowrap",
                  isActive ? "text-morning" : "text-crema/60 group-hover:text-crema/90"
                )}>
                  {tab.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {children}
    </>
  );
};
