// import { useState } from "react";
// import { type NextPage } from "next";
// import Head from "next/head";
// import { useQuery } from 'react-query';
// import { fetchAugments } from '@/utils/fetchAugments';
// import { numberOfSlots } from '@/constants/hero-augments';
// import { baseStage, baseSlots } from '@/constants/constants';
// // import StageSelection from "../components/hero-augments/stageSelection";
// // import ResetButton from "../components/hero-augments/resetButton";
// // import Slot from "../components/hero-augments/slot";
// // import TraitsSelector from "../components/hero-augments/traitsSelector";
// // import Champions from "../components/hero-augments/result/champions";

// const HeroAugments: NextPage = () => {
//   const [champs, setChamps] = useState<any[]>([]);
//   const [traits, setTraits] = useState<any[]>([]);
//   const [stageSelected, setStageSelected] = useState(baseStage);
//   const [slotsCost, setSlotsCost] = useState(baseSlots);

//   const { isLoading, error, data } = useQuery('augments', () =>
//     fetchAugments(), 
//     {
//       onSuccess: (data) => {
//         setChamps(data.champions);
//         setTraits(data.traits);
//       }
//     }
//   );

//   const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

//   const activeTraits = traits.filter((trait) => trait.selected).length;

//   return (
//     <>
//       <Head>
//         <title>Hero Augments probabilities – TFT odds Set 8.5</title>
//         <link rel="canonical" href="https://tftodds.com/hero-augments" />
//         <meta name="description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
//         <meta property="og:title" content="Hero Augments probabilities – TFT odds" />
// 		    <meta property="og:description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
//         <meta property="og:image" content="/share.jpg" />
//         <meta property="og:url" content="https://tftodds.com/hero-augments" />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
// 		    <meta name="twitter:site" content="@tftodds" />
//         <meta name="twitter:title" content="Hero Augments probabilities – TFT odds" />
//         <meta name="twitter:description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
//         <meta name="twitter:image" content="/share.jpg" />
//       </Head>
//       <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Hero augments</strong> statistics and probabilities<span className="hidden"> – Best strategies to win!</span></h1>
//       <section className="flex items-start flex-col flex-1">
//         <aside className="flex flex-col w-full mb-6">
//           <h2 className="hidden">Select your stage and your active traits</h2>
//           <div className="flex justify-between gap-4 md:gap-6 mb-4 md:mb-6 flex-wrap md:flex-nowrap">
//             <StageSelection stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} />
//             <div className="min-w-full md:min-w-0 order-3 md:order-2 flex flex-1 justify-between gap-4 md:gap-6">
//               {slotsArray.map((slot) => (
//                 <Slot
//                   key={slot} index={slot} 
//                   stageSelected={stageSelected} 
//                   slotsCost={slotsCost}
//                   setSlotsCost={setSlotsCost}
//                 />
//               ))}
//             </div>
//             <ResetButton stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} traits={traits} setTraits={setTraits} />
//           </div>
//           <TraitsSelector traits={traits} setTraits={setTraits} isLoading={isLoading} stageSelected={stageSelected} activeTraits={activeTraits} />
//         </aside>
//         <main className="mt-4 mb-16 w-full">
//           <Champions champs={champs} slotsCost={slotsCost} traits={traits} stageSelected={stageSelected} activeTraits={activeTraits} />
//         </main>
//       </section>
//     </>
//   )
// }

// export default HeroAugments;
