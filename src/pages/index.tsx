import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { currentSet, setStage } from '@/constants/set';

const Home: NextPage = () => {
  const { scrollY } = useScroll();
  const translateYLeft = useTransform(scrollY, [0, 500], [0, 10]);
  const translateXLeft = useTransform(scrollY, [0, 500], [0, -10]);
  const rotateLeft = useTransform(scrollY, [0, 500], [-6, -3]);
  const scaleCenter = useTransform(scrollY, [0, 500], [1.1, 1.15]);
  const translateYRight = useTransform(scrollY, [0, 500], [10, -10]);
  const rotateRight = useTransform(scrollY, [0, 500], [12, 3]);

  return (
    <>
      <Head>
        <title>Teamfight Tactics Odds – TFT Set {currentSet}{setStage === 2 ? '.5': null} probabilities tools</title>
        <link rel="canonical" href="https://tftodds.com" />
        <meta name="description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:title" content="Teamfight Tactics Odds – TFT Set 12 probabilities tools" />
		    <meta property="og:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Teamfight Tactics Odds – TFT Set 12 probabilities tools" />
        <meta name="twitter:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="uppercase text-5xl my-24 font-bold text-center leading-tight tracking-wide">
        Level up your <br/><strong className="inline font-bold text-morning">Teamfight Tactics</strong> experience
        <span className="mt-2 block text-3xl lowercase tracking-normal">Odds, statistics and tips for the game</span>
      </h1>
      <Link href="/champions">
      <article className="flex flex-col md:flex-row justify-between gap-12 flex-auto mb-8 bg-earlynight p-4 pb-10 md:p-10 rounded">
        <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-left">Champions rolling odds</h2>
        <p className="mb-2">Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder.</p>
        <button className="inline w-fit text-left h-10 text-morning/80 hover-effect transition-all duration-300 ease-in-out"><span className="w-auto px-4 h-10 inline-block leading-10 rounded bg-morning text-midnight relative z-10 font-bold">Roll the dice</span></button>
        </div>
        <div className="relative flex-1 flex justify-center items-center">
          <motion.div
            className="absolute -left-0 transform -rotate-6 scale-90 z-10"
            style={{ y: translateYLeft, rotate: rotateLeft, }}
          >
            <Image
              src="/images/champions-cards/powder.jpg"
              alt="Powder"
              width={216}
              height={162}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div 
            className="z-20 transform rotate-1 scale-110"
            style={{
              scale: scaleCenter,
            }}
          >
            <Image
              src="/images/champions-cards/caitlyn.jpg"
              alt="Caitlyn"
              width={216}
              height={162}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div 
            className="absolute right-0 transform rotate-12 scale-85 z-10"
            style={{
              y: translateYRight,
              rotate: rotateRight,
            }}
          >
            <Image
              src="/images/champions-cards/renni.jpg"
              alt="Renni"
              width={216}
              height={162}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </article>
      </Link>
      <div className="flex flex-col md:flex-row gap-8 mb-24">
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
    </>
  )
}

export default Home;