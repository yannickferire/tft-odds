import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { encountersTable, hallOfNine } from "@/constants/portals";
import { FormatConsumables } from "@/utils/formatConsumables";
import { FormatChampions } from "@/utils/formatChampions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">Opening encounters data</strong> tables</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p>This page is designed to provide detailed insights into the <strong>random rewards and odds associated with the pre-game encounters</strong> in Teamfight Tactics. By understanding the mechanics and potential outcomes of these encounters, you can better prepare for the start of each game and adjust your strategy.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>In Teamfight Tactics, the early-game encounter sets the tone for the rest of the match. These encounters provide unique rewards or changes that can significantly impact your strategy. Understanding the odds and random mechanics behind these encounters helps you better prepare and adjust accordingly.</p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Page Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Early-Game Encounters:</strong> <br/>
                At the start of each match, you&apos;ll encounter different scenarios that offer bonuses or alter the dynamics of the game. These can include stat boosts, item drops, or other modifiers based on random conditions.</p>
                <p>2. <strong>Why This Information Is Useful:</strong><br/>
                By studying the possible rewards and odds associated with these encounters, you can:
                <ul>
                  <li>- Predict the rewards you might receive.</li>
                  <li>- Plan your strategy based on the potential bonuses or changes.</li>
                  <li>- Adjust your tactics to take full advantage of the encounter outcomes.</li>
                </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use This Information</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Review Encounter Scenarios:</strong> <br/>
                Check the table to understand the different types of encounters and their corresponding odds.
                </p>
                <p>2. <strong>Analyze Possible Outcomes:</strong><br/>
                Use the data to predict what rewards or changes may occur based on the scenario you face at the start of your match.
                </p>
                <p>3. <strong>Plan Your Strategy:</strong><br/>
                Tailor your early-game approach by factoring in the likely outcomes of your encounter, whether it&apos;s gaining a stat boost, a powerful item, or an alternate game modifier.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>By understanding the odds and potential rewards of early-game encounters, you&apos;ll be able to make better decisions from the start and set yourself up for success throughout the match. Dive into the details now and enhance your early-game strategy!</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <Table className="mb-12">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Opening Encounter</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {Object.entries(encountersTable).flatMap(([champion, encounters]) => {
          const encounterEntries = Object.entries(encounters); // encounters for each champion
          const rowCount: number = Object.values(encounters)
            .flatMap(encounterData => (Array.isArray(encounterData) ? encounterData : [encounterData]))
            .length;
          const rowSpan: any = rowCount === 1 ? undefined : rowCount;

          return encounterEntries.flatMap(([encounterName, encounterData], index) => {
            // variants ?
            const variants = Array.isArray(encounterData) ? encounterData : [{ chance: encounterData.chance }];
            return variants.map((variant, variantIndex) => {
              const uniqueKey = `${champion}-${index}-${variantIndex}`;
              return (
                <TableRow key={uniqueKey} className={`border ${index === 0 ? "border-t-midday border-t-2" : null}`}>
                  {index === 0 && variantIndex === 0 && (
                    <TableCell rowSpan={rowSpan} className={`py-2 w-1/4 font-semibold border border-crema border-opacity-20 bg-midnight`}>
                      <FormatChampions value={champion} />
                    </TableCell>
                  )}
                  <TableCell className={`py-2 border border-crema text-center border-opacity-20`}> 
                    {variant.name || encounterName}
                  </TableCell>
                  <TableCell className={`py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20`}>
                    {variant.chance}%
                  </TableCell>
                </TableRow>
              );
            });
          });
        })}
        </TableBody>
      </Table>
      <h2 className="text-3xl mt-4 mb-2 font-bold px-4 text-center"><strong className="text-morning">Sevika: Loot subscription</strong></h2>
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
                <TableCell className={`py-4 border border-crema border-opacity-20`}>
                  <FormatConsumables value={reward[0]} />
                </TableCell>
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
