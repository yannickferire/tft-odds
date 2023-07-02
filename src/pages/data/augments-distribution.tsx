import { type NextPage } from "next";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
import { augmentsDistribution, augmentsDistributionDetailed } from "@/constants/augments";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataAugments: NextPage = () => {

  return (
    <>
      <Head>
        <title>Augments odds – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/data/augments-distribution" />
        <meta name="description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta property="og:title" content="Augments odds – TFT odds Set 9" />
		    <meta property="og:description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/data/augments-distribution" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Augments odds – TFT odds Set 9" />
        <meta name="twitter:description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Augments distribution</strong> rules</h1>
      <Table className="mb-16">
        <TableCaption>The portal that makes 1st augment Prismatic will simply overwrite the 1st choice.</TableCaption>
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead>1st augment</TableHead>
            <TableHead>2nd augment</TableHead>
            <TableHead>3rd augment</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {augmentsDistributionDetailed.map((scenario, id) => (
            <TableRow key={id} className="border-0">
              <TableCell className={`py-1 bg-${scenario[1].toLowerCase()} font-semibold text-midnight/[.8] border-2 border-crema border-opacity-20`}>{scenario[1]}</TableCell>
              <TableCell className={`py-1 bg-${scenario[2].toLowerCase()} font-semibold text-midnight/[.8] border-2 border-crema border-opacity-20`}>{scenario[2]}</TableCell>
              <TableCell className={`py-1 bg-${scenario[3].toLowerCase()} font-semibold text-midnight/[.8] border-2 border-crema border-opacity-20`}>{scenario[3]}</TableCell>
              <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{scenario["percent"]}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead>Augments tier</TableHead>
            <TableHead>1st choice</TableHead>
            <TableHead>2nd choice</TableHead>
            <TableHead>3rd choice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {augmentsDistribution.map((scenario, id) => (
            <TableRow key={id} className="border-0">
              <TableCell className={`py-1 bg-${scenario["tier"].toLowerCase()} font-semibold text-midnight/[.8] border-2 border-crema border-opacity-20`}>{scenario["tier"]}</TableCell>
              <TableCell className="py-1 font-semibold text-lg text-center border border-crema border-opacity-20">{scenario[1]}%</TableCell>
              <TableCell className="py-1 font-semibold text-lg text-center border border-crema border-opacity-20">{scenario[2]}%</TableCell>
              <TableCell className="py-1 font-semibold text-lg text-center border-b border-r border-crema border-opacity-20">{scenario[3]}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default DataAugments;
