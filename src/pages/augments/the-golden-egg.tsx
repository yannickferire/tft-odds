import { type NextPage } from "next";
import Image from "next/image";
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { currentSet } from '@/constants/set';
import { goldenEgg } from "@/constants/augments";
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

const TheGoldenEgg: NextPage = () => {
  return (
    <AugmentPageLayout>
      <NextSeo
        title={`The Golden Egg Loot Table form Set ${currentSet} - Rewards & Drop Rates`}
        description={`Full rewards list for "The Golden Egg" augment in TFT Set ${currentSet}. See every possible potential drop and their exact probabilities.`}
        canonical="https://tftodds.com/augments/the-golden-egg"
        openGraph={{
          url: 'https://tftodds.com/augments/the-golden-egg',
          title: `The Golden Egg Loot Table - TFT Set ${currentSet} Rewards`,
          description: `Full rewards list for "The Golden Egg" augment in TFT Set ${currentSet}.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'The Golden Egg Rewards Table',
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
          { name: 'twitter:title', content: `The Golden Egg - TFT Set ${currentSet} Rewards` },
          { name: 'twitter:description', content: `Full rewards list for "The Golden Egg" augment in TFT Set ${currentSet}. All drop probabilities.` },
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
            name: 'Augments',
            item: 'https://tftodds.com/augments',
          },
          {
            position: 3,
            name: 'The Golden Egg',
            item: 'https://tftodds.com/augments/the-golden-egg',
          },
        ]}
      />

      <h2 id="golden-egg" className="text-3xl mt-4 mb-2 font-bold px-4 text-center">
        <Image className="inline-block mr-1" src="/images/augments/TheGoldenEgg.avif" alt="The Golden Egg" width="50" height="50" />
        <strong className="text-morning">The Golden Egg</strong>
      </h2>
      <p className="text-center mb-4 max-w-md mx-auto">Gain a massive golden egg that hatches in 11 turns. Victorious player combats accelerate the hatch timer by an additional turn.</p>
      <Table className="w-full mb-24">
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
    </AugmentPageLayout>
  )
}

export default TheGoldenEgg;
