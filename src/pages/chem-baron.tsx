import { type NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { lootTable } from "@/constants/chem-baron";
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

const ChemBaron: NextPage = () => {
  const [champs, setChamps] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery('champions', () =>
    fetchChampions(), 
    {
      onSuccess: (data) => {
        setChamps(data.champions);
      }
    }
  );
  
  return (
    <>
      <Head>
        <title>Chem Baron tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/chem-baron" />
        <meta name="description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta property="og:title" content="Chem Baron tables – TFT odds Set 13" />
		    <meta property="og:description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/chem-baron" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Chem Baron tables – TFT odds Set 13" />
        <meta name="twitter:description" content="Discover exclusive rewards with the Chem Baron trait in Teamfight Tactics. Gain Shimmer after each player combat. At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-4 font-bold px-4 text-center"><Image className="inline-block -mt-2 mr-1" src="/images/traits/set13/chem-baron.png" alt="Chem-Baron Trait Image" width="30" height="30" /> <strong className="text-morning">Chem Baron</strong> loot tables</h1>
      <ul className="mb-4 flex gap-2 justify-center">
        {champs
          .filter((champion) => champion.traits.includes("Chem-Baron"))
          .sort((a, b) => a.cost - b.cost)
          .map((champion, index) => (
          <li 
          key={index} 
          className={`w-12 champion aspect-square border-2 border-${champion.cost}cost rounded relative text-${champion.cost}cost`}
          title={champion.name}
        >
          <div className="w-full h-full relative block rounded overflow-hidden">
            <Image 
            className={`w-20 -left-8 -top-2 max-w-none absolute z-10`}
            src={champion.image} 
            alt={champion.name} width="53" height="53" />
          </div>
        </li>
        ))}
      </ul>
      <p className="text-center mb-8">Gain Shimmer after each player combat. If your loss streak is at least 3, gain more.<br/>
      At each stack of 100 Shimmer, the Black Market offers you contraband that only Chem-Barons can use. <br/>Chem-Barons gain max Health for each Black Market you pass on.</p>
      <Table className="mb-16">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Stacks</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(lootTable).flatMap(([key, reward]) => {
            const rewardEntries = Object.entries(reward).filter(([entryKey]) => entryKey !== "generic");
            const rowCount: number = Object.keys(rewardEntries).length; // number of lines for the current row
            const rowSpan: any = rowCount === 1 ? undefined : rowCount; // rowspan attribute
            return rewardEntries.map(([entryKey, entryValue], index) => {
              const uniqueKey = `${key}-${index + 1}`;
              return (
                <TableRow key={uniqueKey} className={`border ${index === 0 ? "border-t-midday border-t-2": null}`}>
                  {index === 0 && (
                    <TableCell rowSpan={rowSpan} className={`w-40 py-1 font-semibold border border-crema border-opacity-20 bg-midnight`}>
                      {key}
                    </TableCell>
                  )}
                  {typeof entryValue === "object" && (
                    <>
                      <TableCell className="py-4 border border-crema border-opacity-20">
                        <FormatConsumables value={entryValue.value} />
                      </TableCell>
                      <TableCell className={`py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20`}>{entryValue.percent}%</TableCell>
                    </>
                  )}
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default ChemBaron;
