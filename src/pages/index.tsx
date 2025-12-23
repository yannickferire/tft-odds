import { GetStaticProps, type NextPage } from "next";
import { NextSeo, OrganizationJsonLd } from 'next-seo';
import Head from 'next/head';

import Link from "next/link";
import NextImage from "next/image";
import { fetchChampions } from "@/utils/fetchChampions";
import { Champion, Trait } from "@/types/tft";
import { FeatureCard } from "@/components/ui/feature-card";
import { encountersTable } from '@/constants/encounters';
import { EncountersCard } from '@/components/home/EncountersCard';
import { AugmentsSimulatorCard } from '@/components/home/AugmentsSimulatorCard';
import { AugmentsDistributionCard } from '@/components/home/AugmentsDistributionCard';
import { AugmentsTablesCard } from '@/components/home/AugmentsTablesCard';
import { Hero } from "@/components/home/Hero";

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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://tftodds.com",
              "id": "https://tftodds.com/#website"
            })
          }}
        />
      </Head>
      <OrganizationJsonLd
        type="Organization"
        id="https://tftodds.com/#organization"
        name="TFT Odds"
        url="https://tftodds.com"
        logo="https://tftodds.com/logo.png"
        sameAs={[
          'https://twitter.com/tftodds',
        ]}
      />
      {/* Hero Section */}
      <Hero />

      {/* Encounters & Augments Section */}
      <div id="tools" className="mb-24 scroll-mt-24">
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
          <FeatureCard
            title="Carousel Odds"
            description="Detailed probabilities for carousel items and champions by stage."
            href="/data/carousel-odds"
            gradientColor="#ED64A6"
            delay={3}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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