import { type NextPage } from "next";
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
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
import { calculateRowSpans, AugmentScenario } from "@/utils/table-utils";
import { AugmentsSimulatorCard } from "@/components/home/AugmentsSimulatorCard";

const DataAugments: NextPage = () => {

  const dataWithSpans = calculateRowSpans(augmentsDistributionDetailed as unknown as AugmentScenario[]);

  return (
    <>
      <NextSeo
        title={`TFT Augment Distribution Rules - Set ${currentSet} Probability Tables`}
        description={`Complete guide to Augment Distribution in TFT Set ${currentSet}. See the exact probabilities for Silver, Gold, and Prismatic augment sequences.`}
        canonical="https://tftodds.com/augments/augments-distribution"
        openGraph={{
          title: `TFT Augment Distribution Rules - Set ${currentSet} Probability Tables`,
          description: `Complete guide to Augment Distribution in TFT Set ${currentSet}. See the exact probabilities for Silver, Gold, and Prismatic augment sequences.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'augments distribution tft',
            },
          ],
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: 'https://tftodds.com',
          },
          {
            position: 2,
            name: 'Augments',
            item: 'https://tftodds.com/augments',
          },
          {
            position: 3,
            name: 'Augments Distribution',
            item: 'https://tftodds.com/augments/augments-distribution',
          },
        ]}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide"><strong className="text-morning">Augments distribution</strong> rules</h1>
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
                  <p>1. <strong>Understanding Augment Tiers:</strong><br />
                    Augments are categorized into three tiers: Silver, Gold, and Prismatic. Each tier offers different levels of impact on your strategy.
                  </p>
                  <p>2. <strong>Scenario Breakdown:</strong><br />
                    The sequence of Augments you receive follows predefined probabilities. This page provides a clear view of those probabilities for every possible scenario.
                  </p>
                  <p>3. <strong>Strategic Advantage:</strong><br />
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
                  <p>1. <strong>Review the Table:</strong><br />
                    Browse through the scenarios to see the probability of each Augment tier based on previous outcomes.
                  </p>
                  <p>2. <strong>Analyze Your Game:</strong><br />
                    Compare your current Augments to the data provided and predict likely future options.
                  </p>
                  <p>3. <strong>Adapt Your Strategy:</strong><br />
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
            <TableHead>2-1</TableHead>
            <TableHead>3-2</TableHead>
            <TableHead>4-2</TableHead>
            <TableHead className="w-[120px] text-center">Probability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataWithSpans.map((scenario, id) => (
            <TableRow key={id} className={`border-0 ${id % 2 === 0 ? '' : ''}`}>
              {scenario.span1 > 0 && (
                <TableCell
                  rowSpan={scenario.span1}
                  className={`py-1 align-middle text-center bg-${scenario[1].toLowerCase()} font-bold text-lg text-midnight/[.8] border-2 border-crema border-opacity-20`}
                >
                  {scenario[1]}
                  {scenario.percent1 !== undefined && (
                    <span className="block text-sm font-normal opacity-70">
                      ({scenario.percent1.toFixed(2).replace(/[.,]00$/, "")}%)
                    </span>
                  )}
                </TableCell>
              )}
              {scenario.span2 > 0 && (
                <TableCell
                  rowSpan={scenario.span2}
                  className={`py-1 align-middle text-center bg-${scenario[2].toLowerCase()} font-semibold text-lg text-midnight/[.8] border-2 border-crema border-opacity-20`}
                >
                  {scenario[2]}
                  {scenario.percent2 !== undefined && (
                    <span className="ml-2 text-xs md:text-sm font-normal opacity-70">
                      ({scenario.percent2.toFixed(2).replace(/[.,]00$/, "")}%)
                    </span>
                  )}
                </TableCell>
              )}
              <TableCell className={`py-1 align-middle text-center bg-${scenario[3].toLowerCase()} font-semibold text-lg text-midnight/[.8] border-2 border-crema border-opacity-20`}>
                {scenario[3]}
                {scenario.percent3 !== undefined && (
                  <span className="ml-2 text-xs md:text-sm font-normal opacity-70">
                    ({scenario.percent3.toFixed(2).replace(/[.,]00$/, "")}%)
                  </span>
                )}
              </TableCell>
              <TableCell className="py-2 font-bold text-center text-xl border-b border-r border-crema border-opacity-20">
                {scenario["percent"]}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center text-crema">Plan ahead your strategy</h3>
        <div className="max-w-2xl mx-auto h-[340px]">
          <AugmentsSimulatorCard />
        </div>
      </section>

      <h3 className="text-2xl font-bold mb-6 text-center text-crema">Tiers probabilities</h3>
      <Table className="mb-24">
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead>Augments tier</TableHead>
            <TableHead>2-1</TableHead>
            <TableHead>3-2</TableHead>
            <TableHead>4-2</TableHead>
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
