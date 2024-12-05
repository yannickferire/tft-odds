import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { lootTable } from "@/constants/conqueror";
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

const Conqueror: NextPage = () => {
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
        <title>Conqueror loot tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/conqueror" />
        <meta name="description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta property="og:title" content="Conqueror tables – TFT odds Set 13" />
		    <meta property="og:description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/conqueror" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Conqueror tables – TFT odds Set 13" />
        <meta name="twitter:description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center"><Image className="inline-block -mt-2 mr-1" src="/images/traits/set13/conqueror.png" alt="Conqueror Trait Image" width="30" height="30" /> <strong className="text-morning">Conqueror Chest</strong> tables</h1>
      <p className="text-center mb-6">Conquerors&apos; takedowns grant stacks of Conquest. After gaining enough Conquest, open War Chests full of loot!<br/>
      Conquerors gain Attack Damage and Ability Power, increased by 3% for each War Chest opened.</p>
      <ul className="mb-6 flex gap-2 justify-center">
        {champs
          .filter((champion) => champion.traits.includes("Conqueror"))
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
        <p><strong>This page shows you the rewards you can earn by activating the Conqueror trait</strong> on your board. By tracking your Conquest stacks you can predict the bonuses you&apos;ll receive.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  In Teamfight Tactics, the Conqueror trait provides a unique advantage by rewarding takedowns with Conquest stacks. 
                  After accumulating enough stacks, War Chests filled with valuable loot are unlocked, 
                  offering bonuses that can enhance your gameplay and strategy. 
                  Understanding these rewards is key to making the most of Conqueror&apos;s power.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Page Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Conqueror Rewards:</strong><br/>
                  Conqueror&apos;s bonuses increase Attack Damage and Ability Power by 3% for each War Chest opened. 
                  By unlocking War Chests, you gain significant advantages to outplay your opponents. 
                  This page shows:
                  <ul>
                    <li>- The Conquest stacks needed to open each War Chest.</li>
                    <li>- The rewards available at every tier.</li>
                  </ul>
                </p>
                <p>2. <strong>Why This Page Is Useful:</strong><br/>
                  By providing detailed insights into the Conqueror rewards system, this tool helps you:
                  <ul>
                    <li>- Plan your strategy to maximize loot collection.</li>
                    <li>- Leverage bonuses to strengthen your board.</li>
                    <li>- Predict what you’ll unlock in your next War Chest.</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Conqueror Rewards Tracker</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Activate the Conqueror Trait:</strong><br/>
                  Ensure your board includes enough champions with the Conqueror trait to activate the bonus.
                </p>
                <p>2. <strong>Track Conquest Stacks:</strong><br/>
                  View your next War Ches reward based on your Conquest Stacks.
                </p>
                <p>3. <strong>Plan Your Rewards:</strong><br/>
                  Use the information provided to time your rolls, manage your board upgrades, and collect maximum rewards.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  With this page, you can make the most of the Conqueror trait by effectively tracking and planning your rewards. 
                  Unlock powerful bonuses, enhance your strategy, and outmaneuver your opponents. Explore the page now and dominate the battlefield!
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <Table className="mb-24">
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

export default Conqueror;
