import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
import ChampionSelector from '@/components/loaded-dice/championSelector';
import SelectedChampion from "@/components/loaded-dice/selectedChampion";
import DiceOdds from "@/components/loaded-dice/diceOdds";

const LoadedDice: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        const champions = data.champions;
        champions.forEach((champion: any) => {
          if (champion.name === "Jhin") {
            champion.selected = true;
          } else {
            champion.selected = false;
          }
        });
        setChamps(champions);
        setTraits(data.traits);
      }
    }
  );

  return (
    <>
      <Head>
        <title>Loaded Dice cheatsheet – TFT odds Set 8.5</title>
        <link rel="canonical" href="https://tftodds.com/loaded-dice" />
        <meta name="description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta property="og:title" content="Loaded Dice cheatsheet – TFT odds Set 8.5" />
		    <meta property="og:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta property="og:image" content="/share.jpg" />
        <meta property="og:url" content="https://tftodds.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Loaded Dice cheatsheet – TFT odds Set 8.5" />
        <meta name="twitter:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta name="twitter:image" content="/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Loaded dice</strong> cheatsheet<span className="hidden"> – Use it correctly will lead you to victory!</span></h1>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-8">
          <ChampionSelector 
            champs={champs} 
            setChamps={setChamps}
            isLoading={isLoading}
          />
        </aside>
        <main className="mb-16 w-full">
          <SelectedChampion champs={champs} traits={traits} />
          <DiceOdds champs={champs} setChamps={setChamps} traits={traits} />
        </main>
      </section>
    </>
  )
}

export default LoadedDice;
