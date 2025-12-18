import { type NextPage } from "next";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import { currentSet } from '@/constants/set';
import { warpath } from "@/constants/augments";
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

const WarpathPage: NextPage = () => {
  return (
    <AugmentPageLayout>
      <NextSeo
        title={`Warpath - TFT Set ${currentSet} Augment Odds & Rewards`}
        description={`Details about Warpath augment in Set ${currentSet}.`}
        canonical="https://tftodds.com/augments/warpath"
        openGraph={{
          title: `Warpath - TFT Set ${currentSet} Augment Odds & Rewards`,
          description: `Details about Warpath augment in Set ${currentSet}.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />

      <h2 id="warpath" className="text-3xl mt-4 mb-2 font-bold px-4 text-center">
        <Image className="inline-block mr-1" src="/images/augments/Warpath.png" alt="Warpath" width="50" height="50" />
        <strong className="text-morning">Warpath</strong>
      </h2>
      <p className="text-center mb-4 max-w-lg mx-auto">Gain a 2-star 2-cost champion. After dealing 80 player damage, gain a chest of high cost champions and items.</p>
      <Table className="w-full mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left"><span className="mr-2 bg-gold text-midnight/[.8] px-1 rounded-sm">Gold</span> Rewards</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(warpath).map((reward, index) => {
            const uniqueKey = `warpath-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className="py-1.5 border border-crema border-opacity-20">
                  <FormatConsumablesWithTooltip value={reward[0]} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </AugmentPageLayout>
  )
}

export default WarpathPage;
