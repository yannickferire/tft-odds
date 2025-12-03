import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchChampions } from "@/utils/fetchChampions";
import { IconCloud } from "@/components/ui/icon-cloud"

import { currentSet, setStage } from '@/constants/set';

const Home: NextPage = () => {
  const { data: championsData } = useQuery("champions", fetchChampions);

  const championImages = useMemo(() => {
    if (!championsData?.champions) return [];

    const champions = [...championsData.champions];
    const shuffled = champions.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 12).map((champ: any) => ({
      image: champ.image,
      cost: champ.cost
    }));
  }, [championsData]);

  return (
    <>
      <Head>
        <title>Teamfight Tactics Odds – TFT Set {currentSet}{setStage === 2 ? '.5': null} probabilities tools</title>
        <link rel="canonical" href="https://tftodds.com" />
        <meta name="description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:title" content="Teamfight Tactics Odds – TFT Set 13 probabilities tools" />
		    <meta property="og:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Teamfight Tactics Odds – TFT Set 13 probabilities tools" />
        <meta name="twitter:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="uppercase text-5xl mt-12 mb-20 font-bold text-center leading-tight tracking-wide">
        Level up your <br/><strong className="inline font-bold text-morning">Teamfight Tactics</strong> experience
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
      {/* <div className="flex flex-col md:flex-row gap-8 mb-24">
      <Link href="/chem-baron" className="flex-1">
      <article className="h-full flex flex-col md:flex-row justify-between gap-8 flex-[20%] bg-earlynight rounded relative">
        <div className="w-full sm:w-4/5 lg:w-3/5 flex flex-col gap-4 p-4 pb-10 md:p-10">
        <div className="flex items-start gap-4">
          <Image className="block h-auto mt-0.5" src="/images/traits/set13/chem-baron.png" alt="Chem Baron Trait Image" width={30} height={30} />
          <h2 className="text-3xl font-bold text-left leading-none">Chem Baron loots</h2>
        </div>
        <p className="mb-2 flex-grow">Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Take a look at what the Black Market can offer you.</p>
        <button className="inline w-fit text-left h-10 text-morning/80 hover-effect transition-all duration-300 ease-in-out"><span className="w-auto px-4 h-10 inline-block leading-10 rounded bg-morning text-midnight relative z-10 font-bold">Inject the Shimmer</span></button>
        </div>
        <div className="hidden sm:block absolute -bottom-[18px] right-4 lg:-bottom-[24px] lg:right-6">
          <Image
            src="/images/champions-home/sevika.png"
            alt="Sevika"
            width={216}
            height={162}
            className="scale-75 lg:scale-100 origin-bottom-right"
            />
        </div>
      </article>
      </Link>
      <Link href="/conqueror" className="flex-1">
      <article className="h-full flex flex-col md:flex-row justify-between gap-8 flex-[20%] bg-earlynight rounded relative">
        <div className="w-full sm:w-4/5 lg:w-3/5 flex flex-col gap-4 p-4 pb-10 md:p-10">
        <div className="flex items-start gap-4">
          <Image className="block h-auto mt-1" src="/images/traits/set13/conqueror.png" alt="Conqueror Trait Image" width={30} height={30} />
          <h2 className="text-3xl font-bold text-left leading-none">Conqueror rewards</h2>
        </div>
        <p className="mb-2 flex-grow">Be victorious by killing your enemy. Collect stacks of conquest and open War Chests full of loot!</p>
        <button className="inline w-fit text-left h-10 text-morning/80 hover-effect transition-all duration-300 ease-in-out"><span className="w-auto px-4 h-10 inline-block leading-10 rounded bg-morning text-midnight relative z-10 font-bold">Open the War Chest</span></button>
        </div>
        <div className="hidden sm:block absolute -bottom-[33px] -right-4 lg:-bottom-[44px]">
          <Image
            src="/images/champions-home/ambessa.png"
            alt="Ambessa"
            width={310}
            height={162}
            className="scale-75 lg:scale-100 origin-bottom-right"
            />
        </div>
      </article>
      </Link> 
      </div>
      */ }
    </>
  )
}

export default Home;