import { possibleLevels } from "@/constants/loaded-dice";
import { rollingChancesByLevel } from "@/constants/game";
import ResultHeader from "./resultHeader";

interface IDiceOdds {
  champs: any[];
  setChamps: (champions: any[]) => void;
  traits: any[];
}

const DiceOdds: React.FC<IDiceOdds> = ({ champs, setChamps, traits }) => {
  const handleChampionSelection = (name: string) => {
    setChamps(
      champs.map((champion) => {
        if (champion.name === name) {
          return  { ...champion, selected: true }
        } else {
          return { ...champion, selected: false }
        }
      })
    )
  }

  // get the list of traits of the champion selected
  const selectedChamp = champs.find((champ) => champ.selected === true);
  const selectedChampTraits = selectedChamp ? selectedChamp.traits : [];
  // get all the champions with at least one of the traits of the selected champion
  const champsWithSelectedTraits = champs.filter((champ) => {
    const champTraits = champ.traits;
    return champTraits.some((trait: any) => selectedChampTraits.includes(trait));
  });
  const chanceToGetChampion = (cost: number, traits: any, level: number) => {
    // get the number of champions with one of the traits and the same cost
    const numberOfChampsWithTrait = champs.filter((champ) => {
      const champTraits = champ.traits;
      return champTraits.some((trait: any) => traits.includes(trait)) && champ.cost === cost;
    }).length;
    // chance to get the champion
    const percent = rollingChancesByLevel['level ' + level][cost + ' cost'] / numberOfChampsWithTrait;
    const chance = Math.round(percent * 100) / 100;
    return chance;
  }
  // sort champs by chance
  const compareChampsByChance = (a: any, b: any) => {
    const chanceA = chanceToGetChampion(selectedChamp.cost, a.traits, 8);
    const chanceB = chanceToGetChampion(selectedChamp.cost, b.traits, 8);
    if (chanceA === chanceB) {
      return b.cost - a.cost;
    } else {
      return chanceB - chanceA;
    }
  }
  const sortedChamps = champsWithSelectedTraits.sort(compareChampsByChance);
  return (
    <>
      <ResultHeader numberOfChampsPossible={champsWithSelectedTraits.length} />
      <ul>
        {sortedChamps.map((champion, index) => (
          <li key={index} className="flex hover:bg-gradient-to-r from-midnight to-earlynight py-3">
            <header 
              className="w-20 md:w-40  flex items-center gap-1 md:gap-2 cursor-pointer"
              onClick={() => handleChampionSelection(champion.name)}
              >
              <img 
                className={`w-[50px] aspect-square border-2 border-${champion.cost}cost rounded relative`}
                src={champion.image} 
                alt={champion.name}
                title={champion.name} />
              <div className="hidden md:block">
                <h3 className="text-sm text-center mb-1 leading-tight opacity-30">{champion.name}</h3>
                <ul className="w-full max-w-[96px] md:w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
                  {champion.traits.map((trait:string, index:number) => {
                    const traitImage = traits.find(traitObj => traitObj.name === trait).image;
                    const path = trait === 'Threat' ? 'triangle pt-0 px-[6px] w-6 h-5' : 'hex w-5 h-6';
                    return (
                      <li className={`${path} flex items-center justify-center p-[3px] text-xs bg-midday ${selectedChampTraits.includes(trait)?'opacity-100':'opacity-50'}`} key={index}>
                        <img src={traitImage} alt={trait} title={trait} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </header>
            <ul className="flex items-center justify-around text-center gap-1 md:gap-2 w-full">
              {Object.values(possibleLevels).map((level, index) => {
                const chance = chanceToGetChampion(selectedChamp.cost, champion.traits, level);
                const opacity = (chance - 0) / (35 - 0) * (1 - 0.3) + 0.3; // Opacity varies from 0.3 to 1

                return (
                  <li key={index} className={`w-12 md:w-20 ${index == 0 || index == 7?"hidden":""} md:block`} style={{ opacity }}>
                    {chance}%
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DiceOdds;