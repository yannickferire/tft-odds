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
      
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-6 px-4 gap-2">
        <p>
          <strong>This page showcases all the rewards you can unlock from Yordle Grab Bags</strong> when you reach 8 Yordles. Each round, you&apos;ll receive a grab bag containing valuable loot to power up your board.
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>TFT Set 16 Yordle Trait Guide</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  The Yordle trait in Teamfight Tactics Set 16 rewards you for fielding multiple Yordles with scaling bonuses and powerful loot.
                  At 2 Yordles, your units gain Health and Attack Speed for each unique Yordle fielded. At 4 Yordles, your first shop each round has a Yordle in it. At 6 Yordles, you get 2 free rerolls each round.
                  At 8 Yordles, you receive a Yordle Grab Bag each round containing high-value items and champions. This comprehensive guide shows all grab bag odds to help you maximize your TFT strategy.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Understanding Yordle Grab Bag Rewards & Odds</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Yordle Grab Bag Contents:</strong><br/>
                  The Yordle Grab Bag you receive at 8 Yordles can contain various rewards. Our complete table displays:
                  <ul>
                    <li>- Exact probability percentages for all reward options</li>
                    <li>- Complete list of items, champions, and consumables available</li>
                    <li>- High-value rewards including 4 and 5-cost Yordle champions</li>
                    <li>- Gold and item combinations to accelerate your board strength</li>
                  </ul>
                </p>
                <p>2. <strong>Yordle Synergy Bonuses:</strong><br/>
                  The Yordle trait provides powerful scaling bonuses as you add more Yordles:
                  <ul>
                    <li>- (2) Yordles gain 40 Health and 5% Attack Speed per unique Yordle (3-stars grant 50% more!)</li>
                    <li>- (4) Your first shop each round has a Yordle in it</li>
                    <li>- (6) Get 2 free rerolls each round</li>
                    <li>- (8) Receive a Yordle Grab Bag each round</li>
                  </ul>
                </p>
                <p>3. <strong>Strategic Value for TFT Players:</strong><br/>
                  Understanding Yordle Grab Bag odds helps you:
                  <ul>
                    <li>- Plan your composition around the 8 Yordle breakpoint</li>
                    <li>- Maximize value from consistent grab bag rewards</li>
                    <li>- Evaluate the power spike from reaching 8 Yordles</li>
                    <li>- Leverage free rerolls and shop bonuses for economy advantage</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Yordle Trait</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Build Towards 8 Yordles:</strong><br/>
                  Field 8 unique Yordles to unlock the Grab Bag reward. Use the shop bonus at 4 Yordles and free rerolls at 6 Yordles to help you find Yordle units.
                </p>
                <p>2. <strong>Tactician&apos;s Crown Power Spike:</strong><br/>
                  Tactician&apos;s Crowns are extremely powerful in Yordle compositions! They allow you to reach 8 Yordles at level 7 instead of waiting for level 8, letting you access Yordle Grab Bags multiple rounds earlier. This early access to consistent high-value loot can be game-winning.
                </p>
                <p>3. <strong>Maximize 3-Star Value:</strong><br/>
                  3-star Yordles grant 50% more bonus stats. Use the free rerolls at 6 Yordles to help you 3-star your key units.
                </p>
                <p>4. <strong>Leverage Consistent Loot:</strong><br/>
                  At 8 Yordles, you receive a grab bag every round. This consistent value stream helps you scale into the late game.
                </p>
                <p>5. <strong>Use Shop and Reroll Advantages:</strong><br/>
                  The guaranteed Yordle in your first shop and 2 free rerolls per round make it easier to hit your composition and find upgrades.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Master TFT Set 16 Yordle Strategy</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  Dominate your TFT Set 16 games by mastering the Yordle trait.
                  Build towards 8 Yordles to unlock powerful grab bags each round, leverage free rerolls to upgrade your board, and use our detailed odds tables to understand your expected value.
                  With full knowledge of Yordle Grab Bag contents and the trait&apos;s scaling bonuses, you&apos;ll consistently secure high-value rewards and climb the ranked ladder.
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
