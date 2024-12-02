import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
import { baseCost, baseLevel } from '@/constants/constants';
import { currentSet, setStage } from '@/constants/set';
import LevelSelector from "@/components/champions/levelSelector";
import ResetButton from "@/components/champions/resetButton";
import RollingOdds from "@/components/champions/rollingOdds";
import ChampionsSelector from "@/components/champions/championsSelector";
import ChampionsOdds from "@/components/champions/championsOdds";
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

const Home: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>(baseCost + " cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(baseLevel);
  const [headliner, setHeadliner] = useState(false);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        setChamps(data.champions);
        setTraits(data.traits);
      }
    }
  );

  return (
    <>
      <Head>
        <title>Teamfight Tactics Odds – TFT Set {currentSet}{setStage === 2 ? '.5': null} probabilities tools</title>
        <link rel="canonical" href="https://tftodds.com/champions" />
        <meta name="description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:title" content="Teamfight Tactics Odds – TFT Set 13 probabilities tools" />
		    <meta property="og:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/champions" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Teamfight Tactics Odds – TFT Set 13 probabilities tools" />
        <meta name="twitter:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">Champions</strong> rolling odds<span className="hidden"> – See how much gold you need for every units!</span></h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p><strong>This tool is designed to help you calculate the average number of rolls and gold needed to find a champion</strong>. Either you need one Heimerdinger or a 3-star Kog&apos;Maw, you’ll get precise estimates to plan your economy efficiently. With this knowledge, you can optimize your reroll strategy, manage your resources wisely, and stay ahead of the competition.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>In Teamfight Tactics, managing your economy effectively is crucial to securing consistent TOP 4. Whether you&apos;re rerolling for key champions or aiming for that coveted 3-star upgrade, understanding the average gold cost and roll probability is vital.</p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Tool Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Champion Rolls:</strong><br/>
                  Each champion&apos;s availability depends on their tier, the number of copies already taken by other players, and the stage of the game. The tool calculates the average number of rolls needed and the gold cost to:
                  <ul>
                    <li>- Find a champion for the first time.</li>
                    <li>- Upgrade them to 2 stars (3 copies).</li>
                    <li>- Achieve a 3-star version (9 copies).</li>
                  </ul>
                </p>
                <p>2. <strong>Why This Tool Is Useful:</strong><br/>
                  By providing precise calculations, this tool helps you:
                  <ul>
                    <li>- Anticipate the cost of rerolling for specific champions.</li>
                    <li>- Optimize your economy and manage your gold wisely.</li>
                    <li>- Adapt your strategy based on competition for key units.</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Champion Roll Calculator</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Select Your Champion:</strong><br/>
                  Use the champion selector to choose the champion you’re targeting.
                </p>
                <p>2. <strong>Adjust Variables:</strong><br/>
                  If you already own some copies of the champion or notice high competition, update the tool with these factors.
                </p>
                <p>3. <strong>View the Results:</strong><br/>
                  The tool will display the average gold cost and rolls required to achieve your desired outcome.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>With this tool, you’ll have the insights you need to manage your gold efficiently and make smarter decisions. Plan your reroll strategy, adapt to competition, and take control of your path to victory. Explore the tool now and dominate your games!</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="fixed right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <section className="flex w-full items-start flex-col md:flex-row flex-1">
        <aside className="flex flex-col w-full md:w-2/6 xl:w-96 mb-6">
          <h2 className="hidden">Select your level and a champion</h2>
          <div className="flex justify-between">
            <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
            <ResetButton selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} champs={champs} setChamps={setChamps} headliner={headliner} setHeadliner={setHeadliner} />
          </div>
          <RollingOdds selectedLevel={selectedLevel} selectedCost={selectedCost}  />
          <ChampionsSelector 
          champs={champs} 
          setChamps={setChamps}
          selectedCost={selectedCost} 
          setSelectedCost={setSelectedCost}
          isLoading={isLoading}
        />
        </aside>
        <ChampionsOdds selectedLevel={selectedLevel} champs={champs} setChamps={setChamps} traits={traits} headliner={headliner} setHeadliner={setHeadliner} />
      </section>
    </>
  )
}

export default Home;
