import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { lootTable } from "@/constants/chem-baron";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
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
import { X } from "lucide-react"

const ChemBaron: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        setChamps(data.champions);
      }
    }
  );
  
  return (
    <>
      <Head>
        <title>Chem Baron tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/chem-baron" />
        <meta name="description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta property="og:title" content="Chem Baron tables – TFT odds Set 13" />
		    <meta property="og:description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/chem-baron" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Chem Baron tables – TFT odds Set 13" />
        <meta name="twitter:description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center"><Image className="inline-block -mt-2 mr-1" src="/images/traits/set13/chem-baron.png" alt="Chem-Baron Trait Image" width="30" height="30" /> <strong className="text-morning">Chem Baron</strong> loot tables</h1>
      <p className="text-center mb-6">Gain Shimmer after each player combat. If your loss streak is at least 3, gain more.<br/>
      At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use. <br/>Chem-Barons gain max Health for each Black Market you pass on.</p>
      <ul className="mb-6 flex gap-2 justify-center">
        {champs
          .filter((champion) => champion.traits.includes("Chem-Baron"))
          .sort((a, b) => a.cost - b.cost)
          .map((champion, index) => (
          <li 
          key={index} 
          className={`w-12 champion aspect-square border-2 border-${champion.cost}cost rounded relative text-${champion.cost}cost`}
          title={champion.name}
        >
          <div className="w-full h-full relative block rounded overflow-hidden">
            <Image 
            className={`w-20 -left-8 -top-2 max-w-none absolute z-10`}
            src={champion.image} 
            alt={champion.name} width="53" height="53" />
          </div>
        </li>
        ))}
      </ul>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-6 px-4 gap-2">
        <p><strong>This page shows you the rewards you can earn by activating the Chem Baron trait</strong> on your board. By tracking your Shimmer stacks, you can anticipate the contraband loot offered by the Black Market and plan your strategy to maximize these unique benefits.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>In Teamfight Tactics, the Chem Baron trait introduces a unique mechanic where Shimmer stacks grant access to exclusive contraband loot from the Black Market. Understanding how to maximize these rewards is key to leveraging the Chem Baron advantage.</p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Page Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Chem Baron Rewards:</strong><br/>
                  Chem Barons accumulate Shimmer stacks after each player combat. If you’re on a loss streak of 3 or more, you gain additional stacks. At 100 stacks, the Black Market offers contraband loot that only Chem Barons can use. Additionally, skipping a Black Market increases the Chem Barons maximum Health.
                </p>
                <p>2. <strong>Why This Page Is Useful:</strong><br/>
                  By providing precise details of potential rewards, this page helps you:
                  <ul>
                    <li>- Plan your strategy around optimal Shimmer stack management.</li>
                    <li>- Decide when to claim contraband or pass for the Health bonus.</li>
                    <li>- Maximize the potential of the Chem Baron trait for your board.</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Chem Baron Rewards Tracker</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Track Your Shimmer Stacks:</strong><br/>
                  Keep an eye on your current Shimmer stack count during the game.
                </p>
                <p>2. <strong>Evaluate Your Options:</strong><br/>
                  Use this page to understand the rewards you can earn at the next Black Market threshold and make informed decisions on whether to claim or skip.
                </p>
                <p>3. <strong>Adjust Your Strategy:</strong><br/>
                  Adapt your gameplay based on your position in the game, the rewards available, and your overall plan for the Chem Baron trait.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>By understanding and leveraging the Chem Baron rewards system, you can optimize your strategy, stay ahead of your opponents, and dominate the game. Explore the page now and turn your Chem Barons into unstoppable forces!</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <Table className="mb-16">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Stacks</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(lootTable).flatMap(([key, reward]) => {
            const rewardEntries = Object.entries(reward).filter(([entryKey]) => entryKey !== "generic");
            const rowCount: number = Object.keys(rewardEntries).length; // number of lines for the current row
            const rowSpan: any = rowCount === 1 ? undefined : rowCount; // rowspan attribute
            return rewardEntries.map(([entryKey, entryValue], index) => {
              const uniqueKey = `${key}-${index + 1}`;
              return (
                <TableRow key={uniqueKey} className={`border ${index === 0 ? "border-t-midday border-t-2": null}`}>
                  {index === 0 && (
                    <TableCell rowSpan={rowSpan} className={`w-40 py-1 font-semibold border border-crema border-opacity-20 bg-midnight`}>
                      {key}
                    </TableCell>
                  )}
                  {typeof entryValue === "object" && (
                    <>
                      <TableCell className="py-4 border border-crema border-opacity-20">
                        <FormatConsumables value={entryValue.value} />
                      </TableCell>
                      <TableCell className={`py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20`}>{entryValue.percent}%</TableCell>
                    </>
                  )}
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default ChemBaron;
