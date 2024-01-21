import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { hallOfNine, threshEarly, threshLate } from "@/constants/portals";
import { formatConsumables } from "@/utils/formatConsumables";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Portals: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portals Rewards – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/data/portals" />
        <meta name="description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:title" content="Portals Reawards – TFT odds Set 10" />
		    <meta property="og:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/data/portals" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Portals Rewards – TFT odds Set 10" />
        <meta name="twitter:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Portals data</strong> tables</h1>
      <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><strong className="text-morning">Loot subscription</strong></h2>
      <p className="text-center mb-4">At the start of each stage, everyone gets the same <strong>loot from a highly varied pool</strong>.</p>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Rewards</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(hallOfNine).map((reward, index) => {
            const uniqueKey = `hall-of-nine-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table>
      {/* <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><strong className="text-morning">Thresh&apos;s Sanctum</strong> – Shadow Isles region</h2>
      <p className="text-center mb-4">When ANY unit dies, collect their soul. <br/>Every 40 souls, gain a <strong>loot orb</strong>.</p>
      <Table className="mb-6">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Early Game rewards – Stage 1-4</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(threshEarly).map((reward, index) => {
            const uniqueKey = `thresh-early-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Late Game rewards – Stage 5+</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(threshLate).map((reward, index) => {
            const uniqueKey = `thresh-late-${index + 1}`;
            return (
              <TableRow key={uniqueKey}>
                <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
                <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
              </TableRow>
            );  
          })}
        </TableBody>
      </Table> */}
    </>
  )
}

export default Portals;
