import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { augmentsDistribution } from "@/constants/augments";
import Slot from "@/components/augments-tier/slot";
import ResetButton from "@/components/augments-tier/resetButton";
import ResultPossibilities from "@/components/augments-tier/resultPossibilities";
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

const AugmentsTier: NextPage = () => {
  const [slotsTier, setSlotsTier] = useState(["", "", ""]);
  const [university, setUniversity] = useState(false);

  const numberOfSlots = augmentsDistribution.length;
  const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

  return (
    <>
      <Head>
        <title>Augments tier possibilities – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/augments/augments-tier" />
        <meta name="description" content="Predict your next augment tier in TFT Set 16. Calculate probabilities for Silver, Gold, and Prismatic augments based on your previous selections." />
        <meta property="og:title" content={`Augments tier possibilities – TFT odds Set ${currentSet}${setStage === 2 ? '.5': ''}`} />
        <meta property="og:description" content="Predict your next augment tier in TFT Set 16. Calculate probabilities for Silver, Gold, and Prismatic augments based on your previous selections." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/augments/augments-tier" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content={`Augments tier possibilities – TFT odds Set ${currentSet}${setStage === 2 ? '.5': ''}`} />
        <meta name="twitter:description" content="Predict your next augment tier in TFT Set 16. Calculate probabilities for Silver, Gold, and Prismatic augments based on your previous selections." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">Augments tier</strong> possibilities</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p><strong>This tool is designed to help you predict your next Augment tier</strong> by showing the likelihood of different outcomes based on your first ones. With this knowledge, you can plan ahead, adjust your strategy, and gain an edge over your opponents.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
              <p>In Teamfight Tactics, choosing the right Augments can make or break your game. At three key moments during each match, players are offered Augments of varying tiers: Silver, Gold, or Prismatic. But did you know that these Augments tier follow specific patterns based on the game&apos;s scenario?</p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Tool Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
              <p>1. <strong>Understanding Augments Tier:</strong> <br/>
              Augments come in three tiers: Silver, Gold and Prismatic.<br/>
              Each match features a sequence of three Augments. The combination and tier of these Augments depend on predefined scenarios.
              </p>
              <p>2. <strong>Why This Tool Is Useful:</strong><br/>
              By Analyzing the patterns of Augment scenarios, you can:
              <ul>
                <li>- Anticipate the type of Augment you’ll receive next.</li>
                <li>- Choose early Augments that align with your late-game strategy.</li>
                <li>- Avoid being caught off guard by unexpected tier changes.</li>
              </ul>
              </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use the Augments Tier Predictor</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
              <p>1. <strong>Input Your Current Augments:</strong> <br/>
              Select the tier of your first and/or second Augments from the dropdown menus.
              </p>
              <p>2. <strong>View Possible Outcomes:</strong><br/>
              The tool will display the probabilities for your next Augment.
              </p>
              <p>3. <strong>Plan Your Strategy:</strong><br/>
              Use the results to adapt your composition or economy based on the likely outcome.
              </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
              <p>By predicting the path of your Augments, you’ll make smarter decisions, adapt faster, and secure more victories. Explore the tool now and climb the ladder!</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-6">
          <h2 className="mb-2">Select your augments tier</h2>
          <div className="flex justify-between gap-4 md:gap-6 mb-2 md:mb-4 flex-wrap md:flex-nowrap">
            <div className="min-w-full md:min-w-0 order-3 md:order-2 flex flex-1 justify-between gap-4 md:gap-6">
              {slotsArray.map((slot) => (
                <Slot
                  key={slot} index={slot}
                  slotsTier={slotsTier} setSlotsTier={setSlotsTier} 
                />
              ))}
            </div>
            <ResetButton slotsTier={slotsTier} setSlotsTier={setSlotsTier} university={university} setUniversity={setUniversity} />
          </div>
          {/* <UniversityToggle slotsTier={slotsTier} setSlotsTier={setSlotsTier} university={university} setUniversity={setUniversity} /> */}
        </aside>
        <main className="mt-4 mb-24 w-full">
          <ResultPossibilities slotsTier={slotsTier} setSlotsTier={setSlotsTier} />
        </main>
      </section>
    </>
  )
}

export default AugmentsTier;
