import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { goldenEgg, spoilsOfWarSilver, spoilsOfWarSilverGold, spoilsOfWarGold, spoilsOfWarGoldGold, spoilsOfWarPrismatic, spoilsOfWarPrismaticGold } from "@/constants/augments";
import { formatConsumables } from "@/utils/formatConsumables";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Piltover: NextPage = () => {
  return (
    <>
      <Head>
        <title>Augments Rewards – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/data/augments-rewards" />
        <meta name="description" content="Tables for the loots you can get from your augments. The Golden Egg, Spoils of war, all of the orbs may lead you to victory!" />
        <meta property="og:title" content="Augments Rewards – TFT odds Set 9" />
		    <meta property="og:description" content="Tables for the loots you can get from your augments. The Golden Egg, Spoils of war, all of the orbs may lead you to victory!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/data/augments-rewards" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Augments Rewards – TFT odds Set 9" />
        <meta name="twitter:description" content="Tables for the loots you can get from your augments. The Golden Egg, Spoils of war, all of the orbs may lead you to victory!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Augments</strong> rewards</h1>
      <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><strong className="text-morning">The Golden Egg</strong></h2>
      <p className="text-center mb-4 max-w-md relative left-1/2 -translate-x-1/2">Gain a massive golden egg that hatches in 11 turns. Victorious player combats accelerate the hatch timer by an additional turn.</p>
      <Table className="mb-16">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Rewards</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(goldenEgg).map((reward, index) => {
            const uniqueKey = `golden-egg-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table>
      <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><strong className="text-morning">Spoils of War</strong></h2>
      <p className="text-center mb-4 max-w-md relative left-1/2 -translate-x-1/2">When you kill an enemy unit, there&apos;s a 20|30|40% chance to drop amazing loot.</p>
      <div className="flex mb-6 gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">Silver Spoiler of War Rewards – 20% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarSilver).map((reward, index) => {
                const uniqueKey = `spoil-war-silver-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
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
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
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
                <TableHead className="text-left">Gold Spoiler of War Rewards – 30% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarGold).map((reward, index) => {
                const uniqueKey = `spoil-war-gold-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
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
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );  
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex mb-24 gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b !border-crema !border-opacity-20">
                <TableHead className="text-left">Prismatic Spoiler of War Rewards – 40% to drop loot</TableHead>
                <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(spoilsOfWarPrismatic).map((reward, index) => {
                const uniqueKey = `spoil-war-prismatic-${index + 1}`;
                return (
                  <TableRow key={uniqueKey}>
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
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
                    <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                    <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
                  </TableRow>
                );  
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Piltover;
