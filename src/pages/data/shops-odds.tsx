import { type NextPage } from "next";
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { rollingChancesByLevel } from "@/constants/game";
import { possibleCost } from "@/constants/cost";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentSet, setStage } from '@/constants/set';
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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * Calculates opacity based on probability percentage.
 * Higher probability = higher opacity.
 */
const getOpacity = (percentage: number) => {
  if (percentage >= 25) return 1;
  if (percentage >= 20) return 0.9;
  if (percentage >= 15) return 0.8;
  if (percentage >= 10) return 0.7;
  if (percentage >= 5) return 0.6;
  return 0.5;
};

const ShopsOdds: NextPage = () => {
  // Filter out Level 1 and 2
  const filteredLevels = Object.entries(rollingChancesByLevel).filter(([level]) => {
    const levelNum = parseInt(level.replace('level ', ''), 10);
    return levelNum >= 3;
  });

  return (
    <>
      <NextSeo
        title={`TFT Shop Odds & Level Rolling Chances - Set ${currentSet} Probabilities`}
        description={`Exact shop probabilities for TFT Set ${currentSet}. Know the best level to roll for 1, 2, 3, 4, and 5-cost champions to maximize your economy.`}
        canonical="https://tftodds.com/data/shops-odds"
        openGraph={{
          url: 'https://tftodds.com/data/shops-odds',
          title: `TFT Shop Odds & Level Rolling Chances - Set ${currentSet} Probabilities`,
          description: `Exact shop probabilities for TFT Set ${currentSet}. Know the best level to roll for 1, 2, 3, 4, and 5-cost champions to maximize your economy.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Shop Odds Table',
            },
          ],
          site_name: 'TFT Odds',
        }}
        twitter={{
          handle: '@tftodds',
          site: '@tftodds',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          { name: 'twitter:title', content: `TFT Shop Odds - Set ${currentSet} Rolling Chances` },
          { name: 'twitter:description', content: `Exact shop probabilities for TFT Set ${currentSet}. Know the best level to roll for champion costs.` },
          { name: 'twitter:image', content: 'https://tftodds.com/share.jpg' },
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: 'https://tftodds.com',
          },
          {
            position: 2,
            name: 'Data',
            item: 'https://tftodds.com/data',
          },
          {
            position: 3,
            name: 'Shops Odds',
            item: 'https://tftodds.com/data/shops-odds',
          },
        ]}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide">
        <strong className="text-morning">Shop Odds</strong> Data
      </h1>

      <article className="flex flex-col text-sm max-w-6xl w-full mx-auto mb-12 px-4 gap-2">
        <p className="text-center mb-8">
          This table displays the probability of finding champions of different costs in your shop at each player level.
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>Introduction</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>Understanding Shop Odds (or Rolling Odds) is fundamental to mastering Teamfight Tactics. These probabilities dictate how likely you are to find champions of a specific cost tier at your current player level.</p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>How Shop Odds Work</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>1. <strong>Player Level Impact:</strong><br />
                    As you level up, the odds of finding higher-cost champions (Tier 4 and Tier 5) increase, while the odds for lower-cost champions decrease.
                  </p>
                  <p>2. <strong>Why This Matters:</strong><br />
                    Knowing the optimal level to roll for specific champions is key to economy management.
                    <ul>
                      <li>- <strong>Reroll Comps:</strong> Stay at lower levels (Level 4-6) to maximize odds for naturally rolling 1, 2, or 3-cost units.</li>
                      <li>- <strong>Fast 8/9 Strategies:</strong> Save gold to level up quickly to access powerful 4 and 5-cost carries.</li>
                    </ul>
                  </p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Conclusion</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>Use this table to plan your leveling and rolling strategy. Timing your rolls when your desired unit has the highest probability of appearing gives you a significant statistical advantage over your opponents.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="absolute right-2 top-2">
                <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </p>

        <Table className="w-full mb-8">
          <TableHeader>
            <TableRow className="!border-b !border-crema !border-opacity-20">
              <TableHead className="text-left font-bold text-crema">Level</TableHead>
              {[1, 2, 3, 4, 5].map((cost) => (
                <TableHead
                  key={cost}
                  className="text-center font-bold text-white px-2"
                  style={{ backgroundColor: possibleCost[cost].hex }}
                >
                  {cost === 5 ? '5 & 7 Cost' : `${cost} Cost`}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLevels.map(([level, chances]) => (
              <TableRow key={level}>
                <TableCell className="py-3 font-bold text-lg border border-crema border-opacity-20 capitalize">
                  {level.replace('level ', '')}
                </TableCell>
                {[1, 2, 3, 4, 5].map((cost) => {
                  const chance = chances[`${cost} cost`] || 0;
                  return (
                    <TableCell
                      key={cost}
                      className="py-3 text-center border border-crema border-opacity-20 font-bold text-lg"
                      style={{ opacity: chance > 0 ? getOpacity(chance) : 0.3 }}
                    >
                      {chance > 0 ? `${chance}%` : '-'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article >
    </>
  );
};

export default ShopsOdds;
