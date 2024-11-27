import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { FormatConsumables } from "@/utils/formatConsumables";
import { lootTable } from "@/constants/heartsteel";
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
        <title>Heartsteel tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/data/heartsteel" />
        <meta name="description" content="Discover exclusive rewards with the Heartsteel trait in Teamfight Tactics. Earn Hearts by defeating enemies and cash out every 4 player combats for powerful bonuses, gaining a strategic edge." />
        <meta property="og:title" content="Heartsteel tables – TFT odds Set 10" />
		    <meta property="og:description" content="Discover exclusive rewards with the Heartsteel trait in Teamfight Tactics. Earn Hearts by defeating enemies and cash out every 4 player combats for powerful bonuses, gaining a strategic edge." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/data/heartsteel" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Heartsteel tables – TFT odds Set 10" />
        <meta name="twitter:description" content="Discover exclusive rewards with the Heartsteel trait in Teamfight Tactics. Earn Hearts by defeating enemies and cash out every 4 player combats for powerful bonuses, gaining a strategic edge." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Heartsteel</strong> tables</h1>
      <Table className="mb-16">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">Cashout</TableHead>
            <TableHead>Value</TableHead>
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
                <TableRow key={uniqueKey} className={`border ${index === 0 && reward.generic !== "1 Gold" ? "border-t-midday border-t-2": null}`}>
                  {index === 0 && (
                    <TableCell rowSpan={rowSpan} className={`py-1 font-semibold border border-crema border-opacity-20 bg-midnight`}>
                      {key}
                    </TableCell>
                  )}
                  {index === 0 && (
                    <TableCell rowSpan={rowSpan} className={`py-1 text-center font-semibold border border-crema border-opacity-20 bg-midnight`}>
                      <FormatConsumables value={reward.generic} />
                    </TableCell>
                  )}
                  {typeof entryValue === "object" && (
                    <>
                      <TableCell className={`py-2 border border-crema border-opacity-20`}>
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

export default HeightBit;
