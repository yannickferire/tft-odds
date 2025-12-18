import { type NextPage } from "next";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import { currentSet } from '@/constants/set';
import { numberOfChampionsByCost } from "@/constants/champions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AugmentPageLayout } from "@/components/augments/AugmentPageLayout";

const PandorasBench: NextPage = () => {
  return (
    <AugmentPageLayout>
      <NextSeo
        title={`Pandora's Bench - TFT Set ${currentSet} Augment Odds & Mechanics`}
        description={`Detailed odds and mechanics for Pandora's Bench augment in TFT Set ${currentSet}. Understand transformation probabilities.`}
        canonical="https://tftodds.com/augments/pandoras-bench"
        openGraph={{
          title: `Pandora's Bench - TFT Set ${currentSet} Augment Odds & Mechanics`,
          description: `Detailed odds and mechanics for Pandora's Bench augment in TFT Set ${currentSet}. Understand transformation probabilities.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />

      <h2 id="pandoras-bench" className="text-3xl mt-4 mb-2 font-bold px-4 text-center">
        <Image className="inline-block mr-1" src="/images/augments/PandorasBench.avif" alt="Pandora's Bench" width="50" height="50" />
        <strong className="text-morning">Pandora&apos;s Bench</strong>
      </h2>
      <p className="text-center mb-4 max-w-lg mx-auto">Gain 2 gold. At the start of every round, champions on the 3 rightmost bench slots transform into random champions of the same cost.</p>
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
    </AugmentPageLayout>
  )
}

export default PandorasBench;
