import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { currentSet, setStage } from '@/constants/set';
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend, 
  ChartLegendContent
} from "@/components/ui/chart"
import Tip from "@/components/layout/tip"

const totalAnomalies = 58;

const probabilityAtLeastOne = (n: any, k: any) => {
  if (n >= totalAnomalies) return 1; // Si on a tiré toutes les cartes, probabilité = 100%
  const numerator = factorial(totalAnomalies - k) * factorial(totalAnomalies - n);
  const denominator = factorial(totalAnomalies - k - n) * factorial(totalAnomalies);
  return 1 - numerator / denominator;
};

const factorial = (num: number): number => (num <= 1 ? 1 : num * factorial(num - 1));
const generateChartData = () => {
  const chartData = [];

  for (let n = 0; n <= totalAnomalies; n += 2) {
    const probabilityOne = probabilityAtLeastOne(n+1, 1);
    const probabilityTwo = probabilityAtLeastOne(n+1, 2);
    const probabilityThree = probabilityAtLeastOne(n+1, 3);
    const probabilityFour = probabilityAtLeastOne(n+1, 4);

    chartData.push({
      golds: n,
      one: (probabilityOne * 100).toFixed(2),
      two: (probabilityTwo * 100).toFixed(2),
      three: (probabilityThree * 100).toFixed(2),
      four: (probabilityFour * 100).toFixed(2),
    });
  }

  return chartData;
};

const chartData = generateChartData();

const chartConfig = {
  one: { label: "1 specific anomaly" },
  two: { label: "2 specific anomalies" },
  three: { label: "3 specific anomalies" },
  four: { label: "4 specific anomalies" },
} satisfies ChartConfig

const Anomalies: NextPage = () => {
  const [numberOfSpecificAnomalies, setNumberOfSpecificAnomalies] = useState<number>(1);
  const [golds, setGolds] = useState<number>(30);
  return (
    <>
      <Head>
        <title>Anomalies – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
        <link rel="canonical" href="https://tftodds.com/anomalies" />
        <meta name="description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:title" content="Anomalies – TFT odds Set 13" />
		    <meta property="og:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta property="og:image" content="https://tftodds.com/share.jpg" />
        <meta property="og:url" content="https://tftodds.com/anomalies" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content="@tftodds" />
        <meta name="twitter:title" content="Anomalies – TFT odds Set 13" />
        <meta name="twitter:description" content="A simple table with rewards for a specific Portal. Know exactly your chance to get what you want and improve your gameplan!" />
        <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
      </Head>
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center"><strong className="text-morning">Anomalies</strong> odds tool</h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p>This tool is designed to calculate the <strong>number of rolls needed to reach a specific anomaly</strong> in the game. With {totalAnomalies} anomalies in total and one being offered at a time, each roll reveals a new anomaly. By leveraging this tool, you can better understand the mechanics behind these probabilities.
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="ml-2">More info</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Introduction</AlertDialogTitle>
            <AlertDialogDescription>
              <p>In set 13, anomalies are a core mechanic. With {totalAnomalies} different anomalies available, players are offered one at a time, and rolling reveals a new anomaly. Understanding the probabilities involved in finding a specific anomaly can help players make informed decisions and refine their approach.</p>
            </AlertDialogDescription>
            <hr className="opacity-30" />
            <AlertDialogTitle>How This Tool Works</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <p>1. <strong>Understanding Anomalies:</strong><br/>
              Each roll presents you with one anomaly from the pool of {totalAnomalies}. When you roll, the anomaly is replaced by another, maintaining the random distribution.</p>
              <p>2. <strong>Why This Information Is Useful:</strong><br/>
              By calculating the number of rolls required to achieve a specific probability of encountering a particular anomaly, you can:
              <ul>
                <li>- Estimate the effort needed to find your desired anomaly.</li>
                <li>- Optimize your strategy by knowing when to roll or save resources.</li>
                <li>- Plan for specific outcomes based on calculated probabilities.</li>
              </ul>
              </p>
            </AlertDialogDescription>
            <hr className="opacity-30" />
            <AlertDialogTitle>How to Use This Tool</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <p>1. <strong>Input the number of anomalies you will accept:</strong><br/>
              It will begin calculating the probabilities.</p>
              <p>2. <strong>Input the Golds you have:</strong><br/>
              The tool provides a detailed breakdown of the likelihood of encountering your desired anomaly over successive rolls.</p>
              <p>3. <strong>Plan Your Rolls:</strong><br/>
              Use the insights from the calculations to determine the optimal number of rolls required to maximize your chances of finding the anomaly you need.</p>
            </AlertDialogDescription>
            <hr className="opacity-30" />
            <AlertDialogTitle>Conclusion</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <p>By leveraging this tool, you can better understand the probabilities and mechanics behind anomalies in the game. This knowledge empowers you to make strategic decisions, conserve resources, and ultimately enhance your gameplay experience. Start calculating now and take control of your anomaly hunt!</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="absolute right-2 top-2">
            <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
        </p>
      </article>
      <article className="bg-earlynight max-w-xl w-full mx-auto p-6 rounded flex flex-col justify-center items-center">
        <Tip>If you have <strong>57 golds</strong> to spend you could see all the anomalies</Tip>
        <div className="flex gap-12 mb-6">
          <div>
            <p className="text-center"><strong>Anomalies</strong> you want:</p>
            <div className="inline-block text-xl mt-2">
              <button 
                onClick={() => setNumberOfSpecificAnomalies(numberOfSpecificAnomalies - 1)}
                className={`text-midday/30 ${(numberOfSpecificAnomalies <= 1)?'opacity-40':'hover-effect'}`} 
                disabled={numberOfSpecificAnomalies <= 1}
              ><span className="w-10 h-10 block leading-9 rounded bg-midday text-crema relative z-10">–</span></button>
              <span className="px-2 w-20 inline-block text-center">{numberOfSpecificAnomalies}</span>
              <button
                onClick={() => setNumberOfSpecificAnomalies(numberOfSpecificAnomalies + 1)} 
                className={`text-midday/30 ${(numberOfSpecificAnomalies >= totalAnomalies)?'opacity-40':'hover-effect'}`} 
                disabled={numberOfSpecificAnomalies >= totalAnomalies}
              ><span className="w-10 h-10 block leading-9 rounded bg-midday text-crema relative z-10">+</span></button>
            </div>
          </div>
          <div>
            <p className="text-center"><strong>Golds</strong> you have:</p>
            <div className="inline-block text-xl mt-2">
              <button 
                onClick={() => setGolds(golds - 3)}
                className={`text-midday/30 ${(golds <= 0)?'opacity-40':'hover-effect'}`} 
                disabled={golds <= 0}
              ><span className="w-10 h-10 block leading-9 rounded bg-midday text-crema relative z-10">–3</span></button>
              <span className="px-2 w-20 inline-block text-center">{golds}</span>
              <button
                onClick={() => setGolds(golds + 3)} 
                className={`text-midday/30 ${(golds >= totalAnomalies - 1)?'opacity-40':'hover-effect'}`} 
                disabled={golds >= totalAnomalies - 1}
              ><span className="w-10 h-10 block leading-9 rounded bg-midday text-crema relative z-10">+3</span></button>
            </div>
          </div>
        </div>
        <p className="text-center">If you roll all your golds, you have a <strong className="block text-2xl text-morning">probabiliy of {(probabilityAtLeastOne(golds + 1, numberOfSpecificAnomalies) * 100).toFixed(2)}%</strong> to see {numberOfSpecificAnomalies == 1 ? "the anomaly": "one of the anomalies"} you want</p>
      </article>
      <article>
        <h2 className="text-3xl pt-8 mt-4 mb-2 font-bold px-4 text-center">Probability chart</h2>
        <p className="text-center mb-4 max-w-md relative left-1/2 -translate-x-1/2">This chart shows the probability of encountering a specific number of anomalies based on the number of golds spent.</p>
        <ChartContainer config={chartConfig} className="mb-24">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
          <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
          <CartesianGrid vertical={true} strokeDasharray="3 3" className="opacity-50" />
            <XAxis
              dataKey="golds"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis
              dataKey="one"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="w-[200px]"
                  />
                }
              />
            <defs>
              <linearGradient id="fillOne" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--silver)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--silver)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTwo" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--s)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--s)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillThree" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--a)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--a)"
                  stopOpacity={0.1}
                />
                </linearGradient>
                <linearGradient id="fillFour" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--b)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--b)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="four"
              type="natural"
              fill="url(#fillFour)"
              fillOpacity={0.5}
              stroke="var(--b)"
            />
            <Area
              dataKey="three"
              type="natural"
              fill="url(#fillThree)"
              fillOpacity={0.5}
              stroke="var(--a)"
            />
            <Area
              dataKey="two"
              type="natural"
              fill="url(#fillTwo)"
              fillOpacity={0.5}
              stroke="var(--s)"
            />
            <Area
              dataKey="one"
              type="natural"
              fill="url(#fillOne)"
              fillOpacity={0.5}
              stroke="var(--silver)"
            />
          </AreaChart>
        </ChartContainer>
      </article>
    </>
  )
}

export default Anomalies;
