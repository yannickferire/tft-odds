import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { currentSet, setStage } from '@/constants/set';
import { zaunMods } from "@/constants/zaun-mods";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ZaunMods: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zaun Chem-mods possibilities – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/zaun-mods" />
        <meta name="description" content="Discover the probabilities of obtaining each type of Zaun Chem-mods. Plan your game ahead and know exactly which mod you can expect." />
        <meta property="og:title" content="Zaun Chem-mods possibilities – TFT odds Set 9" />
		    <meta property="og:description" content="Discover the probabilities of obtaining each type of Zaun Chem-mods. Plan your game ahead and know exactly which mod you can expect." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/zaun-mods" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Zaun Chem-mods possibilities – TFT odds Set 9" />
        <meta name="twitter:description" content="Discover the probabilities of obtaining each type of Zaun Chem-mods. Plan your game ahead and know exactly which mod you can expect." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Zaun Chem-mods</strong> possibilities</h1>
      <Table className="mb-40">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead>1st Zaun Chem-Mod</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
            <TableHead>2nd Zaun Chem-Mod</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
            <TableHead>3rd Zaun Chem-Mod</TableHead>
            <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-lg">
          <TableRow className="border">
            <TableCell rowSpan={2} className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">offensive</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/robotic-arm.avif" alt="Robotic Arm" width="32" height="32" />Robotic Arm</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/virulent-bioware.avif" alt="Virulent Bioware" width="32" height="32" />Virulent Bioware</li>
              </ul>
            </TableCell>  
            <TableCell rowSpan={2} className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">50% <small className="inline-block text-xs opacity-40">25% each</small></TableCell>
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">hybrid</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/adaptative-implant.avif" alt="Adaptative Implant" width="32" height="32" />Adaptative Implant</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/shimmer-injector.avif" alt="Shimmer Injector" width="32" height="32" />Shimmer Injector</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">50% <small className="inline-block text-xs opacity-40">25% each</small></TableCell>
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">defensive</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/hextech-skeleton.avif" alt="Hextech Skeleton" width="32" height="32" />Hextech Skeleton</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/unstable-chemtank.avif" alt="Unstable Chemtank" width="32" height="32" />Unstable Chemtank</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">100% <small className="inline-block text-xs opacity-40">50% each</small></TableCell>
          </TableRow>
          <TableRow className="border">
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">defensive</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/hextech-skeleton.avif" alt="Hextech Skeleton" width="32" height="32" />Hextech Skeleton</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/unstable-chemtank.avif" alt="Unstable Chemtank" width="32" height="32" />Unstable Chemtank</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">50% <small className="inline-block text-xs opacity-40">25% each</small></TableCell>
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">hybrid</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/adaptative-implant.avif" alt="Adaptative Implant" width="32" height="32" />Adaptative Implant</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/shimmer-injector.avif" alt="Shimmer Injector" width="32" height="32" />Shimmer Injector</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">100% <small className="inline-block text-xs opacity-40">50% each</small></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-6 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">hybrid</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/adaptative-implant.avif" alt="Adaptative Implant" width="32" height="32" />Adaptative Implant</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/shimmer-injector.avif" alt="Shimmer Injector" width="32" height="32" />Shimmer Injector</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">50% <small className="inline-block text-xs opacity-40">25% each</small></TableCell>
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">offensive</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/robotic-arm.avif" alt="Robotic Arm" width="32" height="32" />Robotic Arm</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/virulent-bioware.avif" alt="Virulent Bioware" width="32" height="32" />Virulent Bioware</li>
              </ul>
            </TableCell>  
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">100% <small className="inline-block text-xs opacity-40">50% each</small></TableCell>
            <TableCell className="py-4 border border-crema border-opacity-20">
              <small className="relative left-1/2 -translate-x-1/2 mb-2 inline-block text-sm bg-midday rounded-sm py-0.5 px-2 opacity-40">defensive</small>
              <ul className="flex flex-col gap-2">
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/hextech-skeleton.avif" alt="Hextech Skeleton" width="32" height="32" />Hextech Skeleton</li>  
                <li><Image className="inline-block mr-2 border border-midnight rounded-sm" src="/images/zaun-mods/unstable-chemtank.avif" alt="Unstable Chemtank" width="32" height="32" />Unstable Chemtank</li>
              </ul>
            </TableCell>
            <TableCell className="text-center py-4 border border-crema border-opacity-20 leading-tight font-semibold">100% <small className="inline-block text-xs opacity-40">50% each</small></TableCell> 
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default ZaunMods;
