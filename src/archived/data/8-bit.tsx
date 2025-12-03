import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { lootTable, thresholds } from "@/constants/8-bit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HeightBit: NextPage = () => {
  return (
    <>
      <Head>
        <title>8-bit tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/data/8-bit" />
        <meta name="description" content="Unlock exclusive rewards in Teamfight Tactics with the 8-bit trait. Keep track of your team's damage dealt and achieve high scores to empower 8-bit champions with bonus Attack Damage." />
        <meta property="og:title" content="8-bit tables – TFT odds Set 10" />
		    <meta property="og:description" content="Unlock exclusive rewards in Teamfight Tactics with the 8-bit trait. Keep track of your team's damage dealt and achieve high scores to empower 8-bit champions with bonus Attack Damage." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/data/8-bit" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="8-bit tables – TFT odds Set 10" />
        <meta name="twitter:description" content="Unlock exclusive rewards in Teamfight Tactics with the 8-bit trait. Keep track of your team's damage dealt and achieve high scores to empower 8-bit champions with bonus Attack Damage." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">8-bit</strong> tables</h1>
      <Table className="mb-8">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">8-bit Loot Table – when you hit the final score (check below)</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(lootTable).map((reward, index) => {
            const uniqueKey = `golden-egg-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border leading-[3em] border-crema border-opacity-20`}>
                  <FormatConsumables value={reward[0]} />
                </TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">8-bit Thresholds – score required for each stack</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(thresholds).map((stack, index) => {
            const uniqueKey = `golden-egg-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border leading-[3em] border-crema border-opacity-20`}>{stack[0]}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{stack[1]}</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default HeightBit;
