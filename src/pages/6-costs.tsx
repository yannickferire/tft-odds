import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { odds } from "@/constants/6-costs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useQuery } from 'react-query';
import { fetchChampions } from '@/utils/fetchChampions';
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
import { X } from "lucide-react";
import { baseCost, baseLevel } from '@/constants/constants';
import LevelTenToggle from "@/components/6-costs/levelTenToggle";
import ViktorToggle from "@/components/6-costs/viktorToggle";
import ResetButton from "@/components/6-costs/resetButton";
import ChampionsSelector from "@/components/6-costs/championsSelector";
import ChampionsOdds from "@/components/6-costs/championsOdds";
import StageSelector from "@/components/6-costs/stageSelector";

const SixCosts: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>(baseCost + " cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(baseLevel);
  const [selectedStage, setSelectedStage] = useState<string>("4-6");
  const [levelTen, setLevelTen] = useState(false);
  const [viktor, setViktor] = useState(false);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        setChamps(data.champions.filter((champion: any) => champion.cost === 6));
        setTraits(data.traits);
      }
    }
  );

  const getOddsForStage = (stage: string, levelTen: boolean, viktor: boolean) => {
    const stageData = odds.find(odd => odd.stage === stage);
    const baseOdds = typeof stageData?.default === 'number' ? stageData.default : 0;
    const levelTenOdds = levelTen ? baseOdds + 1.1 : baseOdds;
    
    if (viktor) {
      if (stageData?.viktor !== undefined) {
        return levelTen ? stageData.viktor + 3.3 : stageData.viktor;
      }
      return levelTenOdds * 3;
    }
    
    return levelTenOdds;
  };

  return (
    <>
      <Head>
        <title>6 costs reroll odds – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/6-costs" />
        <meta name="description" content="Know your chances of hitting 6 cost champion in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:title" content="6 costs reroll odds – TFT odds Set 13" />
		    <meta property="og:description" content="Know your chances of hitting 6 cost champion in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/encounters" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="6 costs reroll odds – TFT odds Set 13" />
        <meta name="twitter:description" content="Know your chances of hitting 6 cost champion in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">6 costs</strong> rolling odds</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p>This page offers insights into the <strong>odds of finding the brand new 6-cost champions</strong> in TFT Set 13, helping you refine your strategy and increase your chances of securing these powerful units.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  In Teamfight Tactics, obtaining the powerful new 6-cost champions can significantly influence your late-game strategy. Understanding the odds and key mechanics behind their appearance will help you maximize your chances of success.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Key Points to Know</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  1. <strong>Those units are very rare:</strong> <br />
                  The chances of encountering a 6-cost champion are initially low but increase notably at level 10.
                </p>
                <p>
                  2. <strong>Viktor Opening Encounters&apos;s Boost:</strong> <br />
                  If the opening encounter features Viktor, your odds of finding a 6-cost champion are tripled, making it a prime opportunity to secure these powerful units.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use This Information</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  1. <strong>Track Your Level:</strong> <br />
                  Aim for level 10 to maximize your odds of encountering 6-cost champions.
                </p>
                <p>
                  2. <strong>Capitalize on Viktor:</strong> <br />
                  Take full advantage of scenarios where Viktor Opening encounter show up to increase your chances of securing a 6-cost champion.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>
                  By leveraging these odds and planning accordingly, you can significantly improve your chances of finding the new 6-cost champions and adapting your strategy for success. Dive into the details now and optimize your gameplay!
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5">
                <X className="w-6 h-6" />
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <section className="flex w-full items-start flex-col md:flex-row flex-1">
        <aside className="flex flex-col w-full md:w-2/6 xl:w-96 mb-24">
          <h2 className="hidden">Select your level, stage and a champion</h2>
          <div className="flex justify-between mb-4">
            <StageSelector selectedStage={selectedStage} setSelectedStage={setSelectedStage} />
            <LevelTenToggle levelTen={levelTen} setLevelTen={setLevelTen} />
            <ViktorToggle viktor={viktor} setViktor={setViktor} />
          </div>
          <ChampionsSelector 
            champs={champs} 
            setChamps={setChamps}
            selectedStage={selectedStage}
            levelTen={levelTen}
            viktor={viktor}
            getOddsForStage={getOddsForStage}
            isLoading={isLoading}
          />
          <ResetButton 
            setSelectedStage={setSelectedStage}
            selectedStage={selectedStage}
            levelTen={levelTen}
            viktor={viktor}
            setLevelTen={setLevelTen}
            setViktor={setViktor}
            champs={champs} 
            setChamps={setChamps} 
          />
        </aside>
        <ChampionsOdds selectedLevel={selectedLevel} champs={champs} setChamps={setChamps} traits={traits} getOddsForStage={getOddsForStage} selectedStage={selectedStage}
            levelTen={levelTen}
            viktor={viktor} />
      </section>
      <h2 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">6 costs reroll odds</strong> table</h2>
      <div className="relative pt-8">
      <p className="w-2/5 h-12 text-center absolute right-0 top-4 text-sm font-semibold text-3cost">Viktor Opening encounter (x3)</p>
      <Table className="mb-24">
        <TableHeader className="relative pt-4">
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead>Stage</TableHead>
            <TableHead className="w-1/5 text-morning">Odds Percentage</TableHead>
            <TableHead className="w-1/5 text-morning">Lvl. 10</TableHead>
            <TableHead className="w-1/5 text-3cost">Odds Percentage</TableHead>
            <TableHead className="w-1/5 text-3cost">Lvl.10</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {odds.map((row, rowIndex) => (
          <TableRow key={rowIndex} className={`!border-b !border-crema !border-opacity-20`}>
            <TableCell className="py-1 border text-center border-r border-crema border-opacity-20">{row.stage}</TableCell>
            <TableCell className="py-1 text-center">
              {typeof row.default === "number" ? row.default.toFixed(2) + "%" : row.default}
            </TableCell>
            <TableCell className="py-1 text-center border-r border-crema border-opacity-20">
              {row.default !== "-" ? (Number(row.default) + 1.1).toFixed(2) + "%" : "-"}
            </TableCell>
            <TableCell className="py-1 text-center">
              {row.viktor !== undefined ? row.viktor.toFixed(2) : (Number(row.default) * 3).toFixed(2)}%
            </TableCell>
            <TableCell className="py-1 border-r border-crema border-opacity-20 text-center">
              {row.viktor !== undefined 
                ? (row.viktor + 3.3).toFixed(2) 
                : ((Number(row.default) + 1.1) * 3).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </div>
    </>
  )
}

export default SixCosts;
