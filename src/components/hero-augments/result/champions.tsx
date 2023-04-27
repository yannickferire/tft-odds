import { numberOfHeroAugments, numberOfRerolls, numberOfSlots } from "../../../constants/hero-augments";
import ResultHeader from "../resultHeader";
import ChampionProfile from "./championProfile";
import ChampionAugments from "./championAugments";

interface IChampions {
  champs: any[];
  traits: any[];
  activeTraits: number;
  slotsCost: number[];
  stageSelected: number;
}

const Champions: React.FC<IChampions> = ({ champs, traits, activeTraits, slotsCost, stageSelected }) => {
  let selectedTraits = traits.filter((trait) => trait.selected).map((trait) => trait.name);
  let slotsTailored = 0;
  if (stageSelected === 2) {
    slotsTailored = 0;
  } else {
    slotsTailored = activeTraits >= 3 ? 3 : activeTraits;
  }

  const filteredChamps = champs.filter(champion => {
    let isPossible;
    const possibleTraits: any = [...selectedTraits, 'Threat'];
    if (slotsTailored !== 3) {
      isPossible = true;
    } else {
      isPossible = champion.traits.some((trait: string) => possibleTraits.includes(trait));
    }
    return slotsCost.includes(champion.cost) && isPossible;
  });
  const unFilteredChamps = champs.filter(champion => {
    let notSelectedTrait;
    const possibleTraits: any = [...selectedTraits, 'Threat'];
    notSelectedTrait = !champion.traits.some((trait: string) => possibleTraits.includes(trait));
    return notSelectedTrait;
  }); 

  const chanceToGetAugment = (name: string, cost: number, traits: any, unfiltered?: boolean) => {
    let chance = 0;
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const selectedChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => selectedTraits.includes(trait))).filter(champion => champion.cost === cost);
    const numberOfSelectedChamps = selectedChamps.length;
    const possibleChamps = filteredChamps.filter(champion => champion.cost === cost);
    const numberOfPossibleChamps = possibleChamps.length;
    let threatChamps, numberOfThreatChamps = 0;
    if (!selectedTraits.includes('Threat')) {
      threatChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => trait.includes('Threat'))).filter(champion => champion.cost === cost);
      numberOfThreatChamps = threatChamps.length / 2;
    }
    // if selected trait champ, calculate chance to get augment based on number of tailored slots
    if (selectedChamps.some(champion => champion.name === name)) {
      chance = (slots / numberOfSlots) * slotsTailored * (100 / (numberOfSelectedChamps + numberOfThreatChamps)) / numberOfHeroAugments * 100 / 100;
    } 
    if (traits.includes('Threat') && slotsTailored !== 0 && !selectedTraits.includes('Threat')) {
      chance = ((slots / numberOfSlots) * slotsTailored * (100 / (numberOfSelectedChamps + numberOfThreatChamps)) / numberOfHeroAugments * 100 / 100) / 2;
    }
    // then calculate chance for all possible champs (including selected trait champs)
    chance += (slots / numberOfSlots) * (3 - slotsTailored) * (100 / numberOfPossibleChamps) / numberOfHeroAugments * 100 / 100;
    chance = Math.round(chance * 100) / 100;
    // when unfiltered, this will always be 0
    if (unfiltered) {
      return 0;
    }
    if (chance > 100) return 100;
    return chance;
  }
  const chanceToGetOneAugmentWithRerolls = (name: string, cost: number, traits: any, iteration?: number, unfiltered?: boolean) => {
    let chance = 0;
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const selectedChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => selectedTraits.includes(trait))).filter(champion => champion.cost === cost);
    const numberOfSelectedChamps = selectedChamps.length;
    const possibleChamps = filteredChamps.filter(champion => champion.cost === cost);
    const numberOfPossibleChamps = possibleChamps.length;
    let threatChamps, numberOfThreatChamps = 0;
    if (!selectedTraits.includes('Threat')) {
      threatChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => trait.includes('Threat'))).filter(champion => champion.cost === cost);
      numberOfThreatChamps = threatChamps.length / 2;
    }
    if (iteration) {
      iteration = iteration * (slotsTailored/numberOfSlots);
    } else {
      if (slotsTailored === 0) {
        iteration = slots * (numberOfRerolls + 1);
      } else {
        iteration = slots * (numberOfRerolls + 1) * (slotsTailored/numberOfSlots);
      }
    }
    if (unfiltered) {
      const champs = unFilteredChamps.filter(champion => champion.cost === cost).length;
      chance = Math.round(iteration / (champs * numberOfHeroAugments) * 10000 / 100);
      return chance;
    }
    if (selectedChamps.some(champion => champion.name === name)) {
      chance = iteration / ((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments) * 10000 / 100;
    }
    if (traits.includes('Threat') && slotsTailored !== 0 && !selectedTraits.includes('Threat')) {
      chance = (iteration / ((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments) * 10000 / 100) / 2;
    }
    chance += iteration / (numberOfPossibleChamps * numberOfHeroAugments) * 10000 / 100;
    chance = Math.round(chance * 100) / 100;
    if (chance > 100) return 100;
    return chance;
  }
  const chanceToGetBothAugmentWithRerolls = (name: string, cost: number, traits: any, iteration?: number, unfiltered?: boolean) => {
    let chance = 0;
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const selectedChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => selectedTraits.includes(trait))).filter(champion => champion.cost === cost);
    const numberOfSelectedChamps = selectedChamps.length;
    const possibleChamps = filteredChamps.filter(champion => champion.cost === cost);
    const numberOfPossibleChamps = possibleChamps.length;
    let threatChamps, numberOfThreatChamps = 0;
    if (!selectedTraits.includes('Threat')) {
      threatChamps = filteredChamps.filter(champion => champion.traits.some((trait: string) => trait.includes('Threat'))).filter(champion => champion.cost === cost);
      numberOfThreatChamps = threatChamps.length / 2;
    }
    if (iteration) {
      iteration = iteration * (slotsTailored/numberOfSlots);
    } else {
      if (slotsTailored === 0) {
        iteration = slots * (numberOfRerolls + 1);
      } else {
        iteration = slots * (numberOfRerolls + 1) * (slotsTailored/numberOfSlots);
      }
    }
    let firstAugmentChance = 0, secondAugmentChance = 0;
    if (unfiltered) {
      const champs = unFilteredChamps.filter(champion => champion.cost === cost).length;
      firstAugmentChance = iteration / (champs * numberOfHeroAugments);
      secondAugmentChance = (iteration - 1) / ((champs * numberOfHeroAugments) - 1);
      chance =  Math.round((firstAugmentChance * secondAugmentChance) * 10000) / 100;
      return chance;
    }
    if (selectedChamps.some(champion => champion.name === name)) {
      firstAugmentChance = iteration / ((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments);
      secondAugmentChance = (iteration - 1) / (((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments) - 1);
      chance =  (firstAugmentChance * secondAugmentChance) * 10000 / 100;
    }
    if (traits.includes('Threat') && slotsTailored !== 0 && !selectedTraits.includes('Threat')) {
      firstAugmentChance = iteration / ((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments);
      secondAugmentChance = (iteration - 1) / (((numberOfSelectedChamps + numberOfThreatChamps) * numberOfHeroAugments) - 1);
      chance =  ((firstAugmentChance * secondAugmentChance) * 10000 / 100) / 2;
    }
    firstAugmentChance = iteration / (numberOfPossibleChamps * numberOfHeroAugments);
    secondAugmentChance = (iteration - 1) / ((numberOfPossibleChamps * numberOfHeroAugments) - 1);
    chance +=  (firstAugmentChance * secondAugmentChance) * 10000 / 100;
    chance = Math.round(chance * 100) / 100;
    if (chance > 100) return 100;
    return chance;
  }


  const costRandomized = () => {
    const slotsObject = slotsCost.reduce((acc: any, curr: number) => {
      curr in acc ? acc[curr]++ : acc[curr] = 1;
      return acc;
    }, {});
  
    let costWithRollsRemaining: any[] = [];
    const slots = Object.entries(slotsObject) as [string, number][];
    for (const [costStr, slot] of slots) {
      const cost = parseInt(costStr);
      const champs = filteredChamps.filter(champion => champion.cost === cost).length;
      const possibilities = champs * numberOfHeroAugments;
      if (possibilities < (slot * (numberOfRerolls + 1))) {
        const rollsRemaining = (slot * (numberOfRerolls + 1)) - possibilities;
        costWithRollsRemaining.push({ cost, rollsRemaining });
      }
    }
    costWithRollsRemaining.sort((a, b) => b.cost - a.cost);
    return costWithRollsRemaining;
  }
  const costWithRollsRemaining = costRandomized();

  // sort champs by chance to get augment
  const compareChampsByChance = (a: any, b: any) => {
    const chanceA = chanceToGetAugment(a.name, a.cost, a.traits);
    const chanceB = chanceToGetAugment(b.name, b.cost, b.traits);
    if (chanceA === chanceB) {
      return b.cost - a.cost;
    } else {
      return chanceB - chanceA;
    }
  }
  const sortedChamps = filteredChamps.sort(compareChampsByChance);

  return (
    <>
    <ResultHeader championPossibilities={filteredChamps.length} />
    <ul className="flex flex-col">  
      {sortedChamps.map((champion, index) => (
        <li key={champion.name} className={`animate-fromtop animate-delay-${index} grid grid-cols-12 md:grid-cols-10 gap-2 mb-6 relative items-start`}>
          <ChampionProfile champion={champion} traits={traits} selectedTraits={selectedTraits} />
          <ChampionAugments champion={champion} stageSelected={stageSelected} />
          <div className="col-span-2 text-center flex flex-col">
            <span className="h-10 text-sm sm:text-base flex items-end justify-center mb-3">{ chanceToGetAugment(champion.name, champion.cost, champion.traits) }%</span>
            <span className="h-10 text-sm sm:text-base flex items-star justify-center">{ chanceToGetAugment(champion.name, champion.cost, champion.traits) }%</span>
          </div>
          <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetOneAugmentWithRerolls(champion.name, champion.cost, champion.traits) }%</span></div>
          <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetBothAugmentWithRerolls(champion.name, champion.cost, champion.traits) }%</span></div>
        </li>
      ))}
      </ul>
        {costWithRollsRemaining.length > 0 && filteredChamps.length > 0 &&
          <div className="relative mt-6 mb-16 max-w-lg mx-auto opacity-30">
            <hr />
            <span className="max-w-[280px] w-full absolute -top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs bg-midnight px-6 text-center">After you've seen all the above augments, <br/>it will be totally randomized with the rest</span>
          </div>
        }
        {costWithRollsRemaining.map(({ cost, rollsRemaining }) => (
          <div key={cost} className="flex flex-col">
            <ul className="flex flex-col">  
            {unFilteredChamps.filter(champion => champion.cost === cost).map((champion, index) => (
              <li key={champion.name} className={`animate-fromtop animate-delay-${index} grid grid-cols-12 md:grid-cols-10 gap-2 mb-6 relative items-start`}>
                <ChampionProfile champion={champion} traits={traits} selectedTraits={selectedTraits} />
                <ChampionAugments  champion={champion} stageSelected={stageSelected} />
                <div className="col-span-2 text-center flex flex-col">
                  <span className="h-10 text-sm sm:text-base flex items-end justify-center mb-3">{ chanceToGetAugment(champion.name, champion.cost, champion.traits, true) }%</span>
                  <span className="h-10 text-sm sm:text-base flex items-star justify-center">{ chanceToGetAugment(champion.name, champion.cost, champion.traits, true) }%</span>
                </div>
                <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetOneAugmentWithRerolls(champion.name, champion.cost, champion.traits, rollsRemaining, true) }%</span></div>
                <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetBothAugmentWithRerolls(champion.name, champion.cost, champion.traits, rollsRemaining, true) }%</span></div>
              </li>
            ))}
            </ul>
          </div>
      )) }
    </>
  )
}

export default Champions;