import { type NextPage } from "next";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import { currentSet } from '@/constants/set';
import { spoilsOfWarSilver, spoilsOfWarSilverGold, spoilsOfWarGold, spoilsOfWarGoldGold, spoilsOfWarPrismatic, spoilsOfWarPrismaticGold } from "@/constants/augments";
import { FormatConsumablesWithTooltip } from "@/utils/formatConsumablesWithTooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AugmentPageLayout } from "@/components/augments/AugmentPageLayout";

const SpoilsOfWar: NextPage = () => {
  return (
    <AugmentPageLayout>
      <NextSeo
        title={`Spoils of War - TFT Set ${currentSet} Augment Odds & Rewards`}
        description={`Detailed reward tables for Spoils of War augment in TFT Set ${currentSet}. Discover loot drop rates for Silver, Gold, and Prismatic tiers.`}
        canonical="https://tftodds.com/augments/spoils-of-war"
        openGraph={{
          url: 'https://tftodds.com/augments/spoils-of-war',
          title: `Spoils of War - TFT Set ${currentSet} Augment Odds & Rewards`,
          description: `Detailed reward tables for Spoils of War augment in TFT Set ${currentSet}. Discover loot drop rates for Silver, Gold, and Prismatic tiers.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
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
          { name: 'twitter:title', content: `Spoils of War - TFT Set ${currentSet} Rewards` },
          { name: 'twitter:description', content: `Reward tables for Spoils of War augment in TFT Set ${currentSet}. Silver, Gold, Prismatic tiers.` },
          { name: 'twitter:image', content: 'https://tftodds.com/share.jpg' },
        ]}
      />

      <h2 id="spoils-of-war" className="text-3xl mt-4 mb-2 font-bold px-4 text-center">
        <Image className="inline-block mr-1" src="/images/augments/SpoilsofWar.avif" alt="Spoils of War" width="50" height="50" />
        <strong className="text-morning">Spoils of War</strong>
      </h2>
      <p className="text-center mb-4 max-w-md mx-auto">When you kill an enemy unit, there&apos;s a 25|30|45% chance to drop amazing loot.</p>

      <div className="flex mb-24 gap-6">
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
                <TableHead className="text-left"><span className="mr-2 bg-prismatic text-midnight/[.8] px-1 rounded-sm">Prismatic</span> Spoils of War rewards – 45% to drop loot</TableHead>
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
    </AugmentPageLayout>
  )
}

export default SpoilsOfWar;
