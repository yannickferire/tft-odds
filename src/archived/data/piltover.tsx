// import { type NextPage } from "next";
// import Head from "next/head";
// import { currentSet, setStage } from '@/constants/set';
// import { piltoverRewards, sixPiltoversRewards } from "@/constants/archived/piltover";
// import { formatConsumables } from "@/utils/formatConsumables";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const Piltover: NextPage = () => {
//   return (
//     <>
//       <Head>
//         <title>Piltover tables – TFT odds Set {currentSet}{setStage === 2 ? '.5': null}</title>
//         <link rel="canonical" href="https://tftodds.com/data/piltover" />
//         <meta name="description" content="Piltover is your favorite region of Runeterra? Check now how far you can evolve your T-Hex to get the best rewards!" />
//         <meta property="og:title" content="Piltover tables – TFT odds Set 9" />
// 		    <meta property="og:description" content="Piltover is your favorite region of Runeterra? Check now how far you can evolve your T-Hex to get the best rewards!" />
//         <meta property="og:image" content="https://tftodds.com/share.jpg" />
//         <meta property="og:url" content="https://tftodds.com/data/piltover" />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
// 		    <meta name="twitter:site" content="@tftodds" />
//         <meta name="twitter:title" content="Piltover tables – TFT odds Set 9" />
//         <meta name="twitter:description" content="Piltover is your favorite region of Runeterra? Check now how far you can evolve your T-Hex to get the best rewards!" />
//         <meta name="twitter:image" content="https://tftodds.com/share.jpg" />
//       </Head>
//       <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Piltover rewards</strong> tables</h1>
//       <Table className="mb-16">
//         <TableHeader>
//           <TableRow className="!border-b !border-crema !border-opacity-20">
//             <TableHead className="text-left">Energy</TableHead>
//             <TableHead>Value</TableHead>
//             <TableHead>Rewards</TableHead>
//             <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {Object.entries(piltoverRewards).flatMap(([key, reward]) => {
//             const rewardEntries = Object.entries(reward).filter(([entryKey]) => entryKey !== "generic");
//             const rowCount: number = Object.keys(rewardEntries).length; // number of lines for the current row
//             const rowSpan: any = rowCount === 1 ? undefined : rowCount; // rowspan attribute
//             return rewardEntries.map(([entryKey, entryValue], index) => {
//               const uniqueKey = `${key}-${index + 1}`;
//               return (
//                 <TableRow key={uniqueKey} className={`border ${index === 0 && reward.generic !== "1 Gold" ? "border-t-midday border-t-2": null}`}>
//                   {index === 0 && (
//                     <TableCell rowSpan={rowSpan} className={`py-1 font-semibold border border-crema border-opacity-20 bg-midnight`}>
//                       {key.split(';').length > 1 && (
//                         <>
//                           <span className="block leading-tight">{key.split(';')[0]}</span>
//                           <span className="text-sm block font-normal opacity-40">{key.split(';')[1]}</span>
//                         </>
//                       )}
//                     </TableCell>
//                   )}
//                   {index === 0 && (
//                     <TableCell rowSpan={rowSpan} className={`py-1 text-center font-semibold border border-crema border-opacity-20 bg-midnight`}>
//                       {formatConsumables(reward.generic)}
//                     </TableCell>
//                   )}
//                   {typeof entryValue === "object" && (
//                     <>
//                       <TableCell className={`py-2 border border-crema border-opacity-20`}>{formatConsumables(entryValue.value)}</TableCell>
//                       <TableCell className={`py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20`}>{entryValue.percent}%</TableCell>
//                     </>
//                   )}
//                 </TableRow>
//               );
//             });
//           })}
//         </TableBody>
//       </Table>
//       <h2 className="text-3xl mt-4 mb-4 font-bold px-4 text-center"><strong className="text-morning">6 Piltovers</strong> extra rewards</h2>
//       <Table className="mb-24">
//         <TableHeader>
//           <TableRow className="!border-b !border-crema !border-opacity-20">
//             <TableHead className="text-left">Bonus rewards every round</TableHead>
//             <TableHead className="w-[100px]">Percent<span className="hidden md:inline">age</span></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {Object.entries(sixPiltoversRewards).map((reward, index) => {
//             const uniqueKey = `six-piltovers-${index + 1}`;
//             return (
//               <TableRow key={uniqueKey}>
//                 <TableCell className={`py-1 border border-crema border-opacity-20`}>{formatConsumables(reward[0])}</TableCell>
//                 <TableCell className="py-1 font-semibold text-center text-base md:text-lg border-b border-r border-crema border-opacity-20">{reward[1]}%</TableCell>
//               </TableRow>
//             );  
//           })}
//         </TableBody>
//       </Table>
//     </>
//   )
// }

// export default Piltover;
