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

const Home: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>(baseCost + " cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(baseLevel);

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
        <link rel="canonical" href="https://tftodds.com" />
        <meta name="description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:title" content="Teamfight Tactics Odds – TFT Set 9 probabilities tools" />
		    <meta property="og:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Teamfight Tactics Odds – TFT Set 9 probabilities tools" />
        <meta name="twitter:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Champions</strong> rolling odds<span className="hidden"> – See how much gold you need for every units!</span></h1>
      <section className="flex w-full items-start flex-col md:flex-row flex-1">
        <aside className="flex flex-col w-full md:w-2/6 xl:w-96 mb-6">
          <h2 className="hidden">Select your level and a champion</h2>
          <div className="flex justify-between">
            <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
            <ResetButton selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} champs={champs} setChamps={setChamps} />
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
        <ChampionsOdds selectedLevel={selectedLevel} champs={champs} setChamps={setChamps} traits={traits} />
      </section>
    </>
  )
}

export default Home;
