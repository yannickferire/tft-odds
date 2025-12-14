import { GetStaticProps, type NextPage } from "next";

import Link from "next/link";
import { useMemo } from "react";
import { fetchChampions } from "@/utils/fetchChampions";
import { IconCloud } from "@/components/ui/icon-cloud"
import { Champion, Trait } from "@/types/tft";

import { currentSet, setStage } from '@/constants/set';

interface HomeProps {
  championsData: {
    champions: Champion[];
    traits: Trait[];
  }
}

const Home: NextPage<HomeProps> = ({ championsData }) => {
  const championImages = useMemo(() => {
    if (!championsData?.champions) return [];

    const champions = [...championsData.champions];
    const shuffled = champions.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 12).map((champ: Champion) => ({
      image: champ.image || "",
      cost: champ.cost
    }));
  }, [championsData]);

  return (
    <>

      <h1 className="uppercase text-5xl mt-12 mb-20 font-bold text-center leading-tight tracking-wide">
        Level up your <br /><strong className="inline font-bold text-morning">Teamfight Tactics</strong> experience
        <span className="mt-2 block text-3xl lowercase tracking-normal">Odds, statistics and tips for the game</span>
      </h1>
      <Link href="/rolling-odds">
        <article className="flex flex-col relative md:flex-row justify-between gap-12 flex-auto mb-24 bg-earlynight p-4 pb-10 md:p-10 rounded">
          <div className="flex-1 flex flex-col gap-4 max-w-xl">
            <h2 className="text-3xl font-bold text-left">Champions rolling odds</h2>
            <p className="mb-2">Calculate your exact chances of hitting any champion in the shop. Our advanced calculator factors in your level, economy, and champions taken by other players. Stop gambling blindly and start making informed decisions to climb the ranked ladder.</p>
            <button className="inline w-fit text-left h-10 text-morning/80 hover-effect transition-all duration-300 ease-in-out"><span className="w-auto px-4 h-10 inline-block leading-10 rounded bg-morning text-midnight relative z-10 font-bold">Roll the dice</span></button>
          </div>
          <div className="w-96 max-h-96 rounded-full relative md:absolute md:right-5 md:-top-5 flex justify-center items-center">
            <IconCloud championImages={championImages} />
          </div>
        </article>
      </Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const championsData = await fetchChampions();

  return {
    props: {
      championsData,
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
};

export default Home;