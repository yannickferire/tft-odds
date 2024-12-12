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
import { X } from "lucide-react"

const Portals: NextPage = () => {
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
        <title>6 costs reroll odds – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/6-costs" />
        <meta name="description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:title" content="6 costs reroll odds – TFT odds Set 13" />
		    <meta property="og:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/encounters" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="6 costs reroll odds – TFT odds Set 13" />
        <meta name="twitter:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">6 costs reroll odds</strong> table</h1>
      <ul className="mb-6 flex gap-2 justify-center">
        {champs
          .filter((champion) => champion.cost === 6)
          .sort((a, b) => a.cost - b.cost)
          .map((champion, index) => (
          <li 
          key={index} 
          className={`w-12 champion aspect-square border-2 border-carry rounded relative text-carry`}
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
            <TableCell className="py-1 text-center">{row.default}</TableCell>
            <TableCell className="py-1 text-center border-r border-crema border-opacity-20">{row.max}</TableCell>
            <TableCell className="py-1 text-center">{row.viktor}</TableCell>
            <TableCell className="py-1 border-r border-crema border-opacity-20 text-center">{row.viktor_max}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </div>
    </>
  )
}

export default Portals;
