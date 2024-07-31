import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
import { currentSet, setStage } from '@/constants/set';
import { validEmblems } from "@/constants/tome-of-traits";
import TraitsSelector from "@/components/tome-of-traits/traitsSelector";
import Emblems from "@/components/tome-of-traits/result/emblems";
import BestUnits from "@/components/tome-of-traits/bestUnits";

const TomeOfTraits: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        setChamps(data.champions);
        setTraits(data.traits);
      }
    }
  );
  
  const selectedTraits = traits.filter((trait) => trait.selected).length;
  const validTraits = traits.filter((trait) => validEmblems.some((emblem) => emblem.name === trait.name) && trait.selected).length;

  const emblems = 4;
  let emblemsTailored = 0;
  if (selectedTraits >= 6 && selectedTraits <= 7) { emblemsTailored = 1; }
  if (selectedTraits >= 8 && selectedTraits <= 9) { emblemsTailored = 2; } 
  if (selectedTraits >= 10 && selectedTraits <= 11) { emblemsTailored = 3; } 
  if (selectedTraits >= 12) { emblemsTailored = 4; }
  const emblemsRandom = emblems - emblemsTailored;

  return (
    <>
      <Head>
        <title>Tome of traits probabilities – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/tome-of-traits" />
        <meta name="description" content="Discover how you can have the best chance to get the emblem your team needs! Find out the probability to hit every trait. Optimize your gameplay to climb." />
        <meta property="og:title" content="Tome of traits – TFT odds Set 10" />
		    <meta property="og:description" content="Discover how you can have the best chance to get the emblem your team needs! Find out the probability to hit every trait. Optimize your gameplay to climb." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/tome-of-traits" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Tome of traits – TFT odds Set 10" />
        <meta name="twitter:description" content="Discover how you can have the best chance to get the emblem your team needs! Find out the probability to hit every trait. Optimize your gameplay to climb." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Tome of traits</strong> probabilities<span className="hidden"> – Best strategies to win!</span></h1>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-4">
          <TraitsSelector traits={traits} setTraits={setTraits} isLoading={isLoading} selectedTraits={selectedTraits} emblemsRandom={emblemsRandom} emblemsTailored={emblemsTailored} />
        </aside>
        <BestUnits champs={champs} isLoading={isLoading} traits={traits} setTraits={setTraits} />
        <main className="mt-4 mb-16 w-full">
          <Emblems traits={traits} selectedTraits={selectedTraits} validTraits={validTraits} emblemsRandom={emblemsRandom} emblemsTailored={emblemsTailored} />
        </main>
      </section>
    </>
  )
}

export default TomeOfTraits;
