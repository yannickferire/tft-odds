import { type NextPage } from "next";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import { currentSet, setStage } from '@/constants/set';
import { goldenEgg, spoilsOfWarSilver, spoilsOfWarSilverGold, spoilsOfWarGold, spoilsOfWarGoldGold, spoilsOfWarPrismatic, spoilsOfWarPrismaticGold } from "@/constants/augments";
import { numberOfChampionsByCost } from "@/constants/champions";
import { FormatConsumablesWithTooltip } from "@/utils/formatConsumablesWithTooltip";
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
import { X } from "lucide-react"

const Piltover: NextPage = () => {
  return (
    <>
      <NextSeo

        title={`TFT Augment Odds & Drop Tables - Set ${currentSet} Loot Rates`}
        description={`Detailed reward tables for TFT Set ${currentSet} augments. Discover loot drop rates for The Golden Egg, Spoils of War, Pandora's Bench and more.`}
        canonical="https://tftodds.com/augments/augments-tables"
        openGraph={{
          title: `TFT Augment Odds & Drop Tables - Set ${currentSet} Loot Rates`,
          description: `Detailed reward tables for TFT Set ${currentSet} augments. Discover loot drop rates for The Golden Egg, Spoils of War, Pandora's Bench and more.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide"><strong className="text-morning">Augments data</strong> tables</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p><strong>This page is designed to provide detailed insights into the random rewards and unique mechanics of specific Augments</strong> in Teamfight Tactics Set {currentSet}.</p>
        <p>In Teamfight Tactics, understanding the rewards and unique mechanics of specific Augments can significantly enhance your gameplay. These Augments often come with random or conditional rewards that can swing the tide of a match when utilized effectively.</p>
        <p className="opacity-80">Check the table below to understand the different types of encounters and their corresponding odds.</p>
      </article>
      <h2 id="golden-egg" className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><Image className="inline-block mr-1" src="/images/augments/TheGoldenEgg.avif" alt="The Golden Egg" width="50" height="50" /> <strong className="text-morning">The Golden Egg</strong></h2>
      <p className="text-center mb-4 max-w-md relative left-1/2 -translate-x-1/2">Gain a massive golden egg that hatches in 11 turns. Victorious player combats accelerate the hatch timer by an additional turn.</p>
      <Table className="w-full mb-8">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left"><span className="mr-2 bg-prismatic text-midnight/[.8] px-1 rounded-sm">Prismatic</span> Possible Rewards</TableHead>
            <TableHead className="text-center w-24">Odds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(goldenEgg).map((reward, index) => {
            const uniqueKey = `golden-egg-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className="py-1.5 border border-crema border-opacity-20">
                  <FormatConsumablesWithTooltip value={reward[0]} />
                </TableCell>
                <TableCell className="py-1.5 font-semibold text-center text-base border border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <h2 id="spoils-of-war" className="text-3xl pt-8 mt-4 mb-2 font-bold px-4 text-center"><Image className="inline-block mr-1" src="/images/augments/SpoilsofWar.avif" alt="Spoils of War" width="50" height="50" /> <strong className="text-morning">Spoils of War</strong></h2>
      <p className="text-center mb-4 max-w-md relative left-1/2 -translate-x-1/2">When you kill an enemy unit, there&apos;s a 25|30|40% chance to drop amazing loot.</p>
      <div className="flex mb-6 gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left"><span className="mr-2 bg-silver text-midnight/[.8] px-1 rounded-sm">Silver</span> Spoils of War rewards – 25% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarSilver).map((reward, index) => {
                const uniqueKey = `spoil-war-silver-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="grow-0">
          <Table className="w-50">
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">+ Extra Gold</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarSilverGold).map((reward, index) => {
                const uniqueKey = `spoil-war-silver-gold-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex mb-6 gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left"><span className="mr-2 bg-gold text-midnight/[.8] px-1 rounded-sm">Gold</span> Spoils of War rewards – 30% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarGold).map((reward, index) => {
                const uniqueKey = `spoil-war-gold-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="grow-0">
          <Table className="w-50">
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">+ Extra Gold</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarGoldGold).map((reward, index) => {
                const uniqueKey = `spoil-war-gold-gold-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex mb-8 gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left"><span className="mr-2 bg-prismatic text-midnight/[.8] px-1 rounded-sm">Prismatic</span> Spoils of War rewards – 40% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarPrismatic).map((reward, index) => {
                const uniqueKey = `spoil-war-prismatic-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="grow-0">
          <Table className="w-50">
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">+ Extra Gold</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarPrismaticGold).map((reward, index) => {
                const uniqueKey = `spoil-war-prismatic-gold-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>
                      <FormatConsumablesWithTooltip value={reward[0]} />
                    </TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <h2 id="pandoras-bench" className="pt-8 text-3xl mt-4 mb-2 font-bold px-4 text-center"><Image className="inline-block mr-1" src="/images/augments/PandorasBench.avif" alt="Pandora's Bench" width="50" height="50" /> <strong className="text-morning">Pandora&apos;s Bench</strong></h2>
      <p className="text-center mb-4 max-w-lg relative left-1/2 -translate-x-1/2">Gain 2 gold. At the start of every round, champions on the 3 rightmost bench slots transform into random champions of the same cost.</p>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left"><span className="mr-2 bg-silver text-midnight/[.8] px-1 rounded-sm">Silver</span> Cost <span className="hidden md:inline">of champion you put in</span></TableHead>
            <TableHead><span className="hidden md:inline">Specific champ (</span>1 slot<span className="hidden md:inline">)</span></TableHead>
            <TableHead><span className="hidden md:inline">Specific champ (</span>2 slots<span className="hidden md:inline">)</span></TableHead>
            <TableHead><span className="hidden md:inline">Specific champ (</span>3 slots<span className="hidden md:inline">)</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(numberOfChampionsByCost).map((champion, index) => {
            const uniqueKey = `pandoras-bench-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 text-${champion[0].replace(' ', '')} border border-crema border-opacity-20`}>{champion[0]}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{((1 / champion[1]) * 100).toFixed(2)}%</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{((2 / champion[1]) * 100).toFixed(2)}%</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{((3 / champion[1]) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <h2 id="march-of-progress" className="pt-8 text-3xl mt-4 mb-2 font-bold px-4 text-center"><Image className="inline-block mr-1" src="/images/augments/MarchofProgress.avif" alt="March of Progress" width="50" height="50" /> <strong className="text-morning">March of Progress</strong></h2>
      <p className="text-center mb-4 max-w-lg relative left-1/2 -translate-x-1/2">Gain 3 XP now, and bonus XP equal to your level at the start of every player combat round. You can no longer use gold to level up.</p>
      <Table className="mb-8">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left"><span className="mr-2 bg-prismatic text-midnight/[.8] px-1 rounded-sm">Prismatic</span> Reach level</TableHead>
            <TableHead>Stage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(marchOfProgress).map((reward, index) => {
            const uniqueKey = `march-of-progress-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-4 leading-[3em] border border-crema border-opacity-20`}>{reward[0]}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table> */}
    </>
  )
}

export default Piltover;
