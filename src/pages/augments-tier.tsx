import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { augmentsDistribution, augmentsDistributionDetailed } from "@/constants/augments";
import Slot from "@/components/augments-tier/slot";
import ResetButton from "@/components/augments-tier/resetButton";
import ResultPossibilities from "@/components/augments-tier/resultPossibilities";

const HeroAugments: NextPage = () => {
  const [slotsTier, setSlotsTier] = useState(["", "", ""]);

  const numberOfSlots = augmentsDistribution.length;
  const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

  return (
    <>
      <Head>
        <title>Augments tier possibilities – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/augments-tier" />
        <meta name="description" content="Discover the probabilities of obtaining Silver, Gold, or Prismatic augments in your games with our Augments Tier Possibilities tool. Prepare yourself for the best augments your team needs!" />
        <meta property="og:title" content="Augments tier possibilities – TFT odds Set 9" />
		    <meta property="og:description" content="Discover the probabilities of obtaining Silver, Gold, or Prismatic augments in your games with our Augments Tier Possibilities tool. Prepare yourself for the best augments your team needs!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/augments-tier" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Augments tier possibilities – TFT odds Set 9" />
        <meta name="twitter:description" content="Discover the probabilities of obtaining Silver, Gold, or Prismatic augments in your games with our Augments Tier Possibilities tool. Prepare yourself for the best augments your team needs!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Augments tier</strong> possibilities</h1>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-6">
          <h2 className="mb-2">Select your augments tier</h2>
          <div className="flex justify-between gap-4 md:gap-6 mb-4 md:mb-6 flex-wrap md:flex-nowrap">
            <div className="min-w-full md:min-w-0 order-3 md:order-2 flex flex-1 justify-between gap-4 md:gap-6">
              {slotsArray.map((slot) => (
                <Slot
                  key={slot} index={slot}
                  slotsTier={slotsTier} setSlotsTier={setSlotsTier} 
                />
              ))}
            </div>
            <ResetButton slotsTier={slotsTier} setSlotsTier={setSlotsTier} />
          </div>
        </aside>
        <main className="mt-4 mb-24 w-full">
          <ResultPossibilities slotsTier={slotsTier} setSlotsTier={setSlotsTier} />
        </main>
      </section>
    </>
  )
}

export default HeroAugments;
