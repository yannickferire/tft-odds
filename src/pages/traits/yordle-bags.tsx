import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumablesWithTooltip } from "@/utils/formatConsumablesWithTooltip";
import { yordleGrabBag } from "@/constants/traits/yordle";
import TraitChampionsList from "@/components/trait-champions-list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
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
import { X } from "lucide-react";

const Ixtal: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);

  const { data } = useQuery('champions', fetchChampions);

  // Update champs when data is available
  React.useEffect(() => {
    if (data?.champions) {
      setChamps(data.champions);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Yordle grab bag TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/traits/yordle-bags" />
        <meta name="description" content="Discover the Yordle grab bag in Teamfight Tactics Set 16. View complete odds, costs, and rewards!" />
        <meta property="og:title" content={`Yordle grab bag TFT odds Set ${currentSet}${setStage === 2 ? '.5': ''}`} />
		    <meta property="og:description" content="Discover the Yordle grab bag in Teamfight Tactics Set 16. View complete odds, costs, and rewards!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/traits/yordle-bags" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content={`Yordle grab bag TFT odds Set ${currentSet}${setStage === 2 ? '.5': ''}`} />
        <meta name="twitter:description" content="Discover the Yordle grab bag in Teamfight Tactics Set 16. View complete odds, costs, and rewards" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center">
        <Image className="inline-block -mt-2 mr-2" src="/images/traits/set16/yordle.svg" alt="Yordle Trait Image" width="30" height="30" />
        <strong className="text-morning">Yordle</strong> grab bags
      </h1>
      <div className="py-4 px-6 bg-earlynight rounded-lg max-w-xl w-full mx-auto mb-8 mt-4">
        <p className="text-left mb-4 text-sm leading-snug">
          <span className="text-crema/50">
          (2) Yordles gain 40 Health and 5% Attack Speed for each unique Yordle fielded. 3 star Yordles grant 50% more!<br/>
          (4) AND your first shop each round has a Yordle in it!<br/>
          (6) AND get 2 free rerolls each round!<br/>
          </span>
          (8) AND get a Yordle Grab Bag each round!
        </p>
        <TraitChampionsList champions={champs} traitName="Yordle" />
      </div>
      
      {/* <article className="flex flex-col text-sm max-w-2xl mx-auto mb-6 px-4 gap-2">
        <p>
          <strong>This page showcases all the rewards you can unlock by cashing out</strong> with the Ixtal trait active. By banking gold throughout the game, you increase your cashout level and unlock increasingly valuable rewards.
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>TFT Set 16 Ixtal Trait Cashout Guide</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  The Ixtal trait in Teamfight Tactics Set 16 introduces a unique quest and cashout system with Sunshards.
                  At 3 Ixtal, you complete quests to earn Sunshards, which can be spent on 20 different cashout levels for powerful rewards.
                  At 5 Ixtal, you heal 2 player health at combat start. At 7 Ixtal, you earn 50 bonus Sunshards and bonus loot after winning combat.
                  This comprehensive guide shows all cashout odds, costs, and rewards to help you maximize your TFT strategy.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Understanding Ixtal Cashout Rewards & Odds</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>20 Cashout Levels with Progressive Costs:</strong><br/>
                  Each Ixtal cashout level requires an increasing amount of Sunshards to unlock. Our complete cashout table displays:
                  <ul>
                    <li>- Sunshard cost for each of the 20 cashout levels</li>
                    <li>- Exact probability percentages for all reward options</li>
                    <li>- Complete list of items, champions, and consumables available</li>
                    <li>- Estimated gold value to help you decide when to cashout</li>
                  </ul>
                </p>
                <p>2. <strong>7 Ixtal Bonus Loot System:</strong><br/>
                  When you reach 7 Ixtal, you automatically earn 50 Sunshards and bonus loot after each combat victory. This bonus system features 9 different reward types including:
                  <ul>
                    <li>- Item Components (30% chance)</li>
                    <li>- Masterwork Upgrades (25% chance)</li>
                    <li>- 5-Cost champions with gold (15% chance)</li>
                    <li>- Rare items like Spatula, Artifact Anvils, and Ixtal Emblems</li>
                  </ul>
                </p>
                <p>3. <strong>Strategic Value for TFT Players:</strong><br/>
                  Understanding Ixtal cashout odds helps you:
                  <ul>
                    <li>- Plan optimal economy and Sunshard management</li>
                    <li>- Maximize reward value based on cashout timing</li>
                    <li>- Evaluate risk vs reward for different cashout tiers</li>
                    <li>- Leverage 7 Ixtal bonus loot for competitive advantage</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Ixtal Cashout System</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Activate 3 Ixtal for Quest System:</strong><br/>
                  Field at least 3 Ixtal champions to unlock quests. Complete quests before combat ends to earn Sunshards and get a new quest next round.
                </p>
                <p>2. <strong>Accumulate Sunshards:</strong><br/>
                  Throughout the game, complete quests to earn Sunshards. Your total Sunshards determine which cashout levels you can access.
                </p>
                <p>3. <strong>Choose Optimal Cashout Timing:</strong><br/>
                  Use our detailed probability tables to identify the best cashout level based on your current Sunshards and desired rewards.
                </p>
                <p>4. <strong>Leverage 5 and 7 Ixtal Bonuses:</strong><br/>
                  At 5 Ixtal, heal 2 health each combat. At 7 Ixtal, earn automatic 50 Sunshards plus bonus loot from the 9-reward loot table after victories.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Master TFT Set 16 Ixtal Strategy</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  Dominate your TFT Set 16 games by mastering the Ixtal cashout system.
                  Track your Sunshards, complete quests efficiently, and use our detailed odds tables to cashout at the perfect moment.
                  With full knowledge of all 20 cashout levels and the 7 Ixtal bonus loot system, you&apos;ll consistently secure high-value rewards and climb the ranked ladder.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article> */}
        <Table className="w-full mb-24">
          <TableHeader>
            <TableRow className="!border-b !border-crema !border-opacity-20">
              <TableHead className="text-left">Possible Rewards</TableHead>
              <TableHead className="text-center w-24">Odds</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yordleGrabBag.map((bag, index) => (
              <TableRow key={index}>
                <TableCell className="py-1.5 border border-crema border-opacity-20">
                  <FormatConsumablesWithTooltip value={bag.rewards.join(' + ')} />
                </TableCell>
                <TableCell className="py-1.5 font-semibold text-center text-base border border-crema border-opacity-20">
                  {bag.probabilityPercent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  )
}

export default Ixtal;
