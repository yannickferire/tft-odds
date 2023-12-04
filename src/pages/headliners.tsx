import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useQuery } from 'react-query';
import { currentSet, setStage } from '@/constants/set';
import { baseLevel } from '@/constants/constants';
import { fetchChampions } from '@/utils/fetchChampions';
import LevelSelector from "@/components/headliners/levelSelector";
import ChampionSelector from '@/components/headliners/championSelector';
import RollingOdds from "@/components/headliners/rollingOdds";
import ResetButton from "@/components/headliners/resetButton";

const LoadedDice: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
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
        <title>Headliners odds – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/loaded-dice" />
        <meta name="description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Get the upgraded units your team needs easily! Good luck!" />
        <meta property="og:title" content="Loaded Dice cheatsheet – TFT odds Set 9" />
		    <meta property="og:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Get the upgraded units your team needs easily! Good luck!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/loaded-dice" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Loaded Dice cheatsheet – TFT odds Set 9" />
        <meta name="twitter:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Get the upgraded units your team needs easily! Good luck!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Headliners</strong> rolling odds</h1>
      <section className="flex items-start flex-col flex-1">
        <div className="flex w-full justify-between">
          <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
          <ResetButton selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} champs={champs} setChamps={setChamps} />
        </div>
        <aside className="flex flex-col w-full mb-8">
          <ChampionSelector 
            champs={champs} 
            setChamps={setChamps}
            selectedLevel={selectedLevel}
            isLoading={isLoading}
          />
        </aside>
        <main className="mb-16 w-full">
        </main>
      </section>
    </>
  )
}

export default LoadedDice;
