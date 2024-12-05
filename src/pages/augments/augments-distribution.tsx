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

const DataAugments: NextPage = () => {

  return (
    <>
      <Head>
        <title>Augments odds – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/augments/augments-distribution" />
        <meta name="description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta property="og:title" content="Augments Distribution – TFT odds Set 13" />
		    <meta property="og:description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/augments/augments-distribution" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Augments Distribution – TFT odds Set 13" />
        <meta name="twitter:description" content="Comprehensive augments distribution rules cheatsheet. Will your final augment be a silver, gold or prismatic one? Master all the possible augment scenario." />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">Augments distribution</strong> rules</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p><strong>This page provides a comprehensive overview of all possible Augment tier scenarios</strong> along with their associated probabilities. By understanding the likelihood of each outcome, you can better anticipate your options, refine your strategy, and gain a competitive edge in your matches.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Introduction</AlertDialogTitle>
              <AlertDialogDescription>
                <p>This page provides a detailed breakdown of Augment tier scenarios in Teamfight Tactics. By understanding the probabilities for each combination, you can better anticipate your options, adapt your gameplay, and stay ahead of the competition.</p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How This Page Works</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Understanding Augment Tiers:</strong><br/>
                  Augments are categorized into three tiers: Silver, Gold, and Prismatic. Each tier offers different levels of impact on your strategy.
                </p>
                <p>2. <strong>Scenario Breakdown:</strong><br/>
                  The sequence of Augments you receive follows predefined probabilities. This page provides a clear view of those probabilities for every possible scenario.
                </p>
                <p>3. <strong>Strategic Advantage:</strong><br/>
                  Knowing these probabilities allows you to:
                  <ul>
                    <li>- Predict the likelihood of receiving specific tiers in later stages.</li>
                    <li>- Plan your choices around probable outcomes.</li>
                    <li>- Make informed decisions to align with your overall strategy.</li>
                  </ul>
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>How to Use This Page</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>1. <strong>Review the Table:</strong><br/>
                  Browse through the scenarios to see the probability of each Augment tier based on previous outcomes.
                </p>
                <p>2. <strong>Analyze Your Game:</strong><br/>
                  Compare your current Augments to the data provided and predict likely future options.
                </p>
                <p>3. <strong>Adapt Your Strategy:</strong><br/>
                  Use the insights to make better decisions about your economy, positioning, or composition.
                </p>
              </AlertDialogDescription>
              <hr className="opacity-30" />
              <AlertDialogTitle>Conclusion</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2">
                <p>By leveraging the information on this page, you’ll be equipped to navigate Augment scenarios with confidence. Use this knowledge to refine your approach, outplay your opponents, and climb the ladder!</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="absolute right-2 top-2">
              <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <Table className="mb-16">
        <TableCaption>Encounters that changes augments tier will simply overwrite normal distribution.</TableCaption>
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
