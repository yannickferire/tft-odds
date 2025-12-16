import { type NextPage } from "next";
import { NextSeo } from 'next-seo';
import { currentSet } from '@/constants/set';
import { FormatConsumablesWithTooltip } from "@/utils/formatConsumablesWithTooltip";
import { carouselOdds } from "@/constants/carousel";
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
import { X } from "lucide-react";

import { PAGE_METADATA } from '@/config/page-metadata';

const CarouselOdds: NextPage = () => {
  const meta = PAGE_METADATA['/data/carousel-odds'];

  return (
    <>
      <NextSeo
        title={`TFT Carousel Odds - Set ${currentSet}`}
        description={meta.description}
        canonical="https://tftodds.com/data/carousel-odds"
        openGraph={{
          title: `TFT Carousel Odds - Set ${currentSet}`,
          description: meta.description,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center tracking-wide">
        <strong className="text-morning">Carousel</strong> Odds
      </h1>

      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-6 px-4 gap-2">
        <p>
          <strong>Mastering the Carousel odds allows you to plan your item economy and pivotal moments with precision.</strong>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2 text-crema">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>Strategic Planning with Carousel Odds</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>
                    The Carousel is more than just a draft; it's a probability event that can dictate your game plan. By understanding these odds, you can make smarter decisions about holding components or committing to a line.
                  </p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>The Spatula Angle</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>
                    In Stages 2, 3, and 4, there is always a chance for Spatulas or Frying Pans to appear. If you are sitting on a single component needed for a game-winning emblem, knowing these odds helps you decide if it's worth playing for the "high roll" or if you should slam a safer item to preserve HP.
                  </p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Preparing for Stage 5</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>
                    Stage 5 is a major turning point where <strong>Unbuilt Completed Items</strong> become common.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Item Greed:</strong> If you have a specific component on your bench (like a Sword) and need a Deathblade, you can check the odds of finding another Sword vs. an unbuilt item that requires a Sword.</li>
                    <li><strong>Emblem Power Spikes:</strong> Late-game carousels are a primary source of Emblems. If you are one trait away from a prism or gold tier vertical, this stage is your best bet to find it.</li>
                  </ul>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>End Game Capstone</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>
                    In Stage 6, the item pool narrows further. At this point, you should be looking for specific items to counter opponents (like Shield breaker or Anti-heal) or that final emblem to cap out your board. The odds show you how likely it is to find that specific component versus a full item.
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


      <div className="flex flex-col gap-12 w-full mx-auto mb-24 px-4">
        {carouselOdds.map((stageData, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center text-morning">{stageData.stage}</h2>

            {stageData.odds.length > 0 ? (
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="!border-b !border-crema !border-opacity-20">
                    <TableHead className="text-left">Items</TableHead>
                    <TableHead className="text-center w-24">Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stageData.odds.map((item, itemIndex) => (
                    <TableRow key={itemIndex}>
                      <TableCell className="py-3 border border-crema border-opacity-20">
                        <FormatConsumablesWithTooltip value={item.rewards.join(' + ')} />
                      </TableCell>
                      <TableCell className="py-3 font-semibold text-center text-base border border-crema border-opacity-20">
                        {item.probabilityPercent}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-8 text-center border border-crema border-opacity-20 rounded-lg bg-white/5">
                <p className="text-crema/60 italic">{stageData.notes || "Data coming soon"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default CarouselOdds;
