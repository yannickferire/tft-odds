import { GetStaticProps, type NextPage } from "next";
import { NextSeo } from 'next-seo';

import Link from "next/link";
import NextImage from "next/image";
import { fetchChampions } from "@/utils/fetchChampions";
import { Champion, Trait } from "@/types/tft";
import { FeatureCard } from "@/components/ui/feature-card";
import { encountersTable } from '@/constants/portals';
import { EncountersCard } from '@/components/home/EncountersCard';
import { AugmentsSimulatorCard } from '@/components/home/AugmentsSimulatorCard';
import { AugmentsDistributionCard } from '@/components/home/AugmentsDistributionCard';
import { AugmentsTablesCard } from '@/components/home/AugmentsTablesCard';

import { currentSet, setStage } from '@/constants/set';

interface HomeProps {
  championsData: {
    champions: Champion[];
    traits: Trait[];
  }
}

const Home: NextPage<HomeProps> = ({ championsData }) => {
  // Filter champions for encounters
  const encounterChampions = championsData.champions.filter(champion =>
    Object.keys(encountersTable).includes(champion.name)
  );

  // Calculate total encounters count
  const totalEncounters = Object.values(encountersTable).reduce((acc, curr) => acc + Object.keys(curr).length, 0);

  return (
    <>
      <NextSeo
        title={`TFT Odds - Teamfight Tactics Rolling Chances, Augment Stats & Probabilities`}
        description={`Know your chances of hitting champions in any scenario for Set ${currentSet}. Mastering the odds will help you managing your golds and climb the ranks in the ladder. Check our Rolling odds, Augment odds and Encounters tools.`}
        titleTemplate="%s"
      />
      {/* Hero Section - Breakout Layout */}
      <section className="relative mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Project Description */}
          <div className="text-left px-4 lg:px-0 py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wide mb-4">
              <span className="text-gradient glow-hover-subtle">Teamfight Tactics odds</span> & probabilities
            </h1>
            <h2 className="block w-full text-lg md:text-xl tracking-normal opacity-90 mb-6 text-balance">
              Master the odds, climb the ranks with data-driven decisions with our tools and tables. Leverage precise rolling probabilities and advanced analytics to dominate the meta.
            </h2>

            {/* CTA Button */}
            <Link href="/rolling-odds">
              <button className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-morning to-[#E07B4A] text-midnight font-bold rounded-lg shadow-[0_2px_10px_rgba(236,179,101,0.25)] hover:shadow-[0_4px_20px_rgba(236,179,101,0.4)] hover:brightness-105 transition-all duration-300">

                <span>Try Rolling Odds Calculator</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Right Column - Breakout Image */}
          <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[50vw] lg:max-w-[600px]">
            <Link href="/rolling-odds">
              <div className="hero-glow-permanent rounded-lg overflow-hidden border-2 border-crema/20 cursor-pointer group">
                <img
                  src="/rolling-odds-preview.jpg"
                  alt="Rolling Odds Calculator Interface"
                  className="w-full h-auto"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Encounters & Augments Section */}
      <div className="mb-24">
        <h3 className="text-4xl font-bold mb-3 text-center tracking-wide">
          <span className="text-gradient">Encounters & Augments</span>
        </h3>
        <p className="text-center max-w-md mx-auto mb-10 text-base leading-tight opacity-80">
          Optimize your strategy with detailed probabilities for every encounter and augment odds choice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <EncountersCard
              encountersCount={totalEncounters}
              champions={encounterChampions}
            />
          </div>

          <div className="lg:col-span-4">
            <AugmentsSimulatorCard />
          </div>

          <div className="lg:col-span-3">
            <AugmentsDistributionCard />
          </div>

          <div className="lg:col-span-3">
            <AugmentsTablesCard />
          </div>
        </div>
      </div>

      {/* Traits Section */}
      <div className="mb-24">
        <h3 className="text-4xl font-bold mb-3 text-center tracking-wide">
          <span className="text-gradient">Traits infos</span>
        </h3>
        <p className="text-center max-w-md mx-auto mb-10 text-base leading-tight opacity-80">
          Maximize your board&apos;s potential with specialized tools for complex trait mechanics.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureCard
            title="Ixtal Cashout"
            description="View complete odds, costs, and rewards for all 20 cashout levels."
            href="/traits/ixtal-cashout"
            gradientColor="#ED8936"
            delay={1}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            icon={
              <NextImage
                src="/images/traits/set16/ixtal.svg"
                alt="Ixtal"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-md"
              />
            }
          />
          <FeatureCard
            title="Yordle Bags"
            description="Check the rewards and odds for Yordle Grab Bags at 8 Yordles."
            href="/traits/yordle-bags"
            gradientColor="#F6E05E"
            delay={2}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            icon={
              <NextImage
                src="/images/traits/set16/yordle.svg"
                alt="Yordle"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-md"
              />
            }
          />
        </div>
      </div>

      {/* Data Section */}
      <div className="mb-24">
        <h3 className="text-4xl font-bold mb-3 text-center tracking-wide">
          <span className="text-gradient">Set data</span>
        </h3>
        <p className="text-center max-w-md mx-auto mb-10 text-base leading-tight opacity-80">
          Deep dive into the numbers with comprehensive champion pool and shop odds data.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureCard
            title="Shop Odds"
            description="View complete shop probability tables for every level."
            href="/data/shops-odds"
            gradientColor="#4299E1"
            delay={1}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <FeatureCard
            title="Champion Bags"
            description="Check champion pool sizes even for unlockable champions."
            href="/data/champion-bags"
            gradientColor="#48BB78"
            delay={2}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
          />
        </div>
      </div>
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