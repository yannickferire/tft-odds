import { useState } from "react";
import { type NextPage } from "next";
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
import { currentSet, setStage } from '@/constants/set';
import { useTFTData } from '@/hooks/useTFTData';
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
import LineChart2 from "@/components/rolling-odds/chart";
import { Champion } from "@/types/tft";

const RollingOddsPage: NextPage = () => {
  // Set "Any 3 cost" as default selected champion
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>({
    name: 'Any 3 cost',
    cost: 3,
    traits: [],
    image: '',
    championUrl: '',
    selected: false
  });

  const { data } = useQuery('champions', fetchChampions);

  // Fetch complete TFT data for DevTools exploration
  useTFTData();

  const champions = data?.champions || [];

  return (
    <>
      <NextSeo
        title={`Rolling Odds Calculator – TFT Set ${currentSet}${setStage === 2 ? '.5' : ''}`}
        description="Calculate the exact gold and rolls needed to hit any champion in TFT. Get precise probabilities for 1-star, 2-star, and 3-star units based on level, contestation, and copies owned."
        canonical="https://tftodds.com/rolling-odds"
        openGraph={{
          url: 'https://tftodds.com/rolling-odds',
          title: `Rolling Odds Calculator – TFT Set ${currentSet}${setStage === 2 ? '.5' : ''} | TFT Odds`,
          description: "Calculate the exact gold and rolls needed to hit any champion in TFT. Get precise probabilities for 1-star, 2-star, and 3-star units based on level, contestation, and copies owned.",
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide">Champions <strong className="text-morning">rolling odds tool</strong><span className="hidden"> – See how much gold you need for every units!</span></h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p><strong>This advanced calculator shows you the exact probability of hitting any champion based on your level, gold spent, and game conditions</strong>. Whether you are slow-rolling for a 3-star Bard or fast-8 hunting for Aatrox, get precise probability curves to optimize your rolling strategy.
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>What is Rolling Odds Calculator?</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>This tool calculates the cumulative probability of finding champions across multiple rerolls. Unlike basic odds that show chances per shop, this shows your actual success rate after spending X gold rolling, accounting for level, contestation, unlockable champions, and copies already owned.</p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>How to Use This Tool</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p><strong>1. Select Your Target:</strong><br />
                    Choose a specific champion (e.g., Morgana, Silco) or a generic cost tier (e.g., &quot;Any 3 cost&quot;) to see odds for finding any champion of that cost.
                  </p>
                  <p><strong>2. Configure Your Situation:</strong><br />
                    <ul>
                      <li>- <strong>Level:</strong> Higher levels give better odds for expensive units</li>
                      <li>- <strong>Max Gold:</strong> How much gold you plan to spend rolling</li>
                      <li>- <strong>Copies Owned:</strong> Units you already have (affects 2★ and 3★ odds)</li>
                      <li>- <strong>Contestation:</strong> How many other players want the same unit</li>
                      <li>- <strong>Other Cost Out:</strong> Units of the same cost taken by other players</li>
                      <li>- <strong>Unlockable Champions:</strong> Mark champions you&apos;ve unlocked through encounters</li>
                    </ul>
                  </p>
                  <p><strong>3. Read the Chart:</strong><br />
                    The graph shows three probability curves:
                    <ul>
                      <li>- <strong>1★ (Green):</strong> Probability to find at least 1 copy</li>
                      <li>- <strong>2★ (Blue):</strong> Probability to find 3 copies total (for 2-star)</li>
                      <li>- <strong>3★ (Purple):</strong> Probability to find 9 copies total (for 3-star)</li>
                    </ul>
                    Each line shows how probability increases as you spend more gold.
                  </p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Key Stats Explained</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p><strong>Shop Odds per Roll:</strong> Your chance to see the champion in a single shop refresh at your current level.</p>
                  <p><strong>Expected Rolls to Hit:</strong> Average number of rerolls needed to find 1 copy. This helps you budget your gold (2 gold per roll).</p>
                  <p><strong>Copies in Pool:</strong> Shows remaining copies of your champion and the total pool for that cost tier. When contested or pool is small, odds decrease significantly.</p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Pro Tips</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>• <strong>Level before rolling:</strong> If odds are low at level 7, consider leveling to 8 first for better rates on 4-costs and 5-costs.</p>
                  <p>• <strong>Track contestation:</strong> If 2+ players want the same champion, adjust the slider to see realistic odds.</p>
                  <p>• <strong>Know when to pivot:</strong> If probability stays below 50% after 30 gold, consider switching targets.</p>
                  <p>• <strong>3-star calculations:</strong> Use this to decide if slow-rolling for a 3-star is worth it based on your economy.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="fixed right-2 top-2">
                <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </p>
      </article>
      <section className="flex w-full items-start flex-col md:flex-row flex-1 mb-20">
        <LineChart2
          champions={champions}
          selectedChampion={selectedChampion}
          setSelectedChampion={setSelectedChampion}
        />
      </section>
    </>
  )
}

export default RollingOddsPage;
