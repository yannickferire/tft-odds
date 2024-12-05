import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { heistPoints, lootTable } from "@/constants/family";
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
        <title>Family heist rewards tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/family" />
        <meta name="description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta property="og:title" content="Conqueror tables – TFT odds Set 13" />
		    <meta property="og:description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/family" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Conqueror tables – TFT odds Set 13" />
        <meta name="twitter:description" content="Discover exclusive rewards with the Conqueror trait in Teamfight Tactics. Collect stacks of conquest and open War Chests full of loot!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center"><Image className="inline-block -mt-2 mr-1" src="/images/traits/set13/family.png" alt="Family Trait Image" width="30" height="30" /> <strong className="text-morning">Family Heist</strong> tables</h1>
      <p className="text-center mb-4">Family members support each other, reducing their max Mana and gaining extra bonuses.<br/>
      (5) Heist on topside! After combat, progress the heist, increased for each surviving Family member!</p>
      <p className="text-sm rounded-sm bg-morning/60 text-crema px-2 py-0.5 inline-block w-fit mx-auto mb-6">⚡ Tip: You need <strong>2 Family Emblems</strong> to unlock the Heist</p>
      <ul className="mb-6 flex gap-2 justify-center">
        {champs
          .filter((champion) => champion.traits.includes("Family"))
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
        <p><strong>This page showcases the rewards you can unlock by completing the Heist</strong> with the Family trait active. By progressing through the Heist objectives and keeping Family members alive, you can maximize the bonuses and claim increasingly valuable rewards.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  In Teamfight Tactics, the Family trait unlocks unique rewards through the Heist system. 
                  By progressing through Heist stages and keeping Family members alive during combat, 
                  you can unlock increasingly valuable treasures that enhance your gameplay and strategy. 
                  Understanding these rewards is key to making the most of the Family trait.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Page Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Heist Rewards:</strong><br/>
                  The Family trait rewards progress through Heist stages based on player combat and surviving Family members. 
                  This page shows:
                  <ul>
                    <li>- The Heist stages and the progress required to unlock them.</li>
                    <li>- The rewards available at each stage.</li>
                  </ul>
                </p>
                <p>2. <strong>Why This Page Is Useful:</strong><br/>
                  By providing detailed insights into the Heist rewards system, this tool helps you:
                  <ul>
                    <li>- Plan your strategy to maximize Heist progress.</li>
                    <li>- Optimize your Family lineup to ensure maximum survival.</li>
                    <li>- Predict the treasures you’ll unlock in the next Heist stage.</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Heist Rewards Tracker</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Activate the Family Trait:</strong><br/>
                  Include enough champions with the Family trait to activate the bonus and enable Heist progression. You will also need 2 Family Emblems.
                </p>
                <p>2. <strong>Track Heist Progress:</strong><br/>
                  Monitor your current Heist stage and see what rewards are available as you progress.
                </p>
                <p>3. <strong>Plan Your Rewards:</strong><br/>
                  Use this page to optimize your board, keep Family members alive, and unlock the maximum rewards.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  This page is your ultimate guide to the Heist rewards system for the Family trait. 
                  Track your progress, plan your strategy, and unlock powerful bonuses to dominate your matches. 
                  Explore the rewards and make the most of the Family trait!
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
      <div className="flex mb-24 gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">Heist Objective</TableHead>
                <TableHead>Possible Rewards (no info about percentage)</TableHead>
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
                        <TableCell rowSpan={rowSpan} className={`w-40 py-1 text-lg text-center font-semibold border border-crema border-opacity-20 bg-midnight`}>
                          {key}
                        </TableCell>
                      )}
                          <TableCell className="py-4 border border-crema border-opacity-20">
                            <FormatConsumables value={entryValue} />
                          </TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </div>
        <div className="grow-0">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead>Stage</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Surviving unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              {Object.entries(heistPoints).map(([stage, points]) => (
                <TableRow key={stage} className="border-b border-crema border-opacity-20">
                  <TableCell className="py-2 border border-crema border-opacity-20 text-center">{stage}</TableCell>
                  <TableCell className="py-2 border border-crema border-opacity-20">{points.stage_points}</TableCell>
                  <TableCell className="py-2 border border-crema border-opacity-20">{points.surviving_points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Conqueror;
