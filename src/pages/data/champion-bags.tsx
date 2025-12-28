import { type NextPage } from "next";
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { useQuery } from "react-query";
import { fetchChampions } from "@/utils/fetchChampions";
import { numberOfChampionsByCost, numberOfCopiesByCost, numberOfUnlockableChampionsByCost } from "@/constants/champions";
import { possibleCost } from "@/constants/cost";
import { currentSet, setStage } from '@/constants/set';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Image from "next/image";
import { Champion } from "@/types/tft";

const ChampionBags: NextPage = () => {
  const { data } = useQuery('champions', fetchChampions);

  // Constants
  const COSTS = [1, 2, 3, 4, 5, 6, 7];

  // Helper to get copies count safely
  const getCopies = (cost: number) => numberOfCopiesByCost[`${cost} cost`] || 0;
  const getChampionsCount = (cost: number) => numberOfChampionsByCost[`${cost} cost`] || 0;
  const getUnlockablesCount = (cost: number) => numberOfUnlockableChampionsByCost[`${cost} cost`] || 0;

  // Process champions into a map for easy access by cost
  const championsByCost: { [key: number]: Champion[] } = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []
  };

  const unlockablesByCost: { [key: number]: Champion[] } = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []
  };

  if (data?.champions) {
    data.champions.forEach((champ: Champion) => {
      const cost = champ.cost;
      if (COSTS.includes(cost)) {
        if (champ.unlockable) {
          unlockablesByCost[cost].push(champ);
        } else {
          championsByCost[cost].push(champ);
        }
      }
    });

    // Sort them
    COSTS.forEach(cost => {
      championsByCost[cost].sort((a, b) => a.name.localeCompare(b.name));
      unlockablesByCost[cost].sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  return (
    <>
      <NextSeo
        title={`TFT Champion Pool Sizes & Bag Counts - Set ${currentSet} Stats`}
        description={`Current champion pool sizes (bag sizes) for TFT Set ${currentSet}. Check how many copies of each 1, 2, 3, 4, and 5-cost unit exist in the game.`}
        canonical="https://tftodds.com/data/champion-bags"
        openGraph={{
          url: 'https://tftodds.com/data/champion-bags',
          title: `TFT Champion Pool Sizes & Bag Counts - Set ${currentSet} Stats`,
          description: `Current champion pool sizes (bag sizes) for TFT Set ${currentSet}. Check how many copies of each 1, 2, 3, 4, and 5-cost unit exist in the game.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Champion Pool Sizes',
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
          { name: 'twitter:title', content: `TFT Champion Pool Sizes - Set ${currentSet} Bag Counts` },
          { name: 'twitter:description', content: `Champion pool sizes for TFT Set ${currentSet}. Check copies of each cost unit in the game.` },
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
            name: 'Champion Bags',
            item: 'https://tftodds.com/data/champion-bags',
          },
        ]}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide">
        <strong className="text-morning">Champion Bags</strong> Data
      </h1>

      <article className="flex flex-col text-sm max-w-6xl w-full mx-auto mb-12 px-4 gap-2">
        <p className="text-center mb-8">
          This table displays the <strong>Bag Sizes</strong> (number of copies per champion) and the list of champions for each cost.
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>Champion Bags & Pools</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>In Teamfight Tactics, there is a shared pool of champions. When you buy a champion, it is removed from the pool. When you sell it or if a player dies, it returns to the pool.</p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Key Concepts</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>1. <strong>Bag Size (Copies):</strong><br />
                    The total number of copies of <em>each specific champion</em> in the pool.
                  </p>
                  <p>2. <strong>Unlockable Champions:</strong><br />
                    Some champions are not part of the main shop pool and do not deplete the shared bag.
                  </p>
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
              <TableHead className="sr-only text-left font-bold text-crema min-w-[100px]">Metric</TableHead>
              {[1, 2, 3, 4, 5].map((cost) => (
                <TableHead
                  key={cost}
                  className="text-center font-bold text-white min-w-[120px]"
                  style={{ backgroundColor: possibleCost[cost].hex }}
                >
                  {cost === 5 ? '5 & 7 Cost' : `${cost} Cost`}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1: Number of Champions (from constants) */}
            <TableRow>
              <TableCell className="py-3 font-bold text-lg border border-crema border-opacity-20 capitalize">
                Champions
              </TableCell>
              {[1, 2, 3, 4, 5].map((cost) => (
                <TableCell
                  key={cost}
                  className="py-3 text-center border border-crema border-opacity-20 font-bold text-lg"
                >
                  {getChampionsCount(cost)}
                </TableCell>
              ))}
            </TableRow>

            {/* Row 2: Unlockable Champions (from constants) */}
            <TableRow>
              <TableCell className="py-3 font-bold text-lg border border-crema border-opacity-20 capitalize">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/icons/unlockableindicator_unlocked.png"
                    alt="Unlockable"
                    width={20}
                    height={20}
                  />
                  <span>Champions</span>
                </div>
              </TableCell>
              {[1, 2, 3, 4, 5].map((cost) => (
                <TableCell
                  key={cost}
                  className="py-3 text-center border border-crema border-opacity-20 font-bold text-lg"
                >
                  {getUnlockablesCount(cost)}
                </TableCell>
              ))}
            </TableRow>

            {/* Row 3: Copies per Champion */}
            <TableRow>
              <TableCell className="py-3 font-bold text-lg border border-crema border-opacity-20 capitalize">
                Copies
              </TableCell>
              {[1, 2, 3, 4, 5].map((cost) => (
                <TableCell
                  key={cost}
                  className="py-3 text-center border border-crema border-opacity-20 font-bold text-lg"
                >
                  {getCopies(cost)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </article>
    </>
  );
};

export default ChampionBags;
