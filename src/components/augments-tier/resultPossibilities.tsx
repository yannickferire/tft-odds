import Link from "next/link";
import { augmentsDistributionDetailed } from "@/constants/augments";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IResultPossibilities {
  slotsTier: string[];
  setSlotsTier: (tier: string[]) => void;
}

const ResultPossibilities: React.FC<IResultPossibilities> = ({ slotsTier, setSlotsTier }) => {
  let positionOfAugment = "First";
  const firstEmptySlot = slotsTier.findIndex((tier) => tier === '');
  switch (firstEmptySlot) {
    case 0:
      positionOfAugment = "First";
      break;
    case 1:
      positionOfAugment = "Second";
      break;
    case 2:
      positionOfAugment = "Third";
      break;
  }

  const filteredAugments = augmentsDistributionDetailed.filter((augment: any) => {
    for (let i = 0; i < firstEmptySlot; i++) {
      if (augment[i + 1] !== slotsTier[i]) {
        return false;
      }
    }
    return true;
  });

  const combinedData = filteredAugments.reduce((acc: any, augment: any) => {
    const key = augment[firstEmptySlot + 1];
    const percent = augment.percent;
  
    if (acc[key]) {
      acc[key] += percent;
    } else {
      acc[key] = percent;
    }
  
    return acc;
  }, {});
  const totalPercentage: any = Object.values(combinedData).reduce((sum: any, percent: any) => sum + percent, 0);
  const combinedPercentages = Object.entries(combinedData).map(([key, percent]: any) => ({
    key,
    percent: (percent / totalPercentage) * 100,
  }));
  
  const filteredScenario = filteredAugments.find((scenario: any) => {
    return (
      scenario[1] === slotsTier[0] &&
      scenario[2] === slotsTier[1] &&
      scenario[3] === slotsTier[2]
    );
  });

  const handleTierSelect = (tier: string) => {
    const newSlotsTier = [...slotsTier];
    newSlotsTier[firstEmptySlot] = tier;
    setSlotsTier(newSlotsTier);
  }

  return (
    <>
      {filteredScenario && slotsTier.every((tier) => tier !== '') ? (
        <article className="text-center text-xl">
          <p className="text-3xl mb-4">This scenario happens <span className="font-semibold">{filteredScenario.percent}%</span> of the time! 🎯</p>
          <p>See the full
            <Link 
              href="/data/augments-distribution" 
              className={`ml-2 inline-block transition-all duration-300 ease-in-out cursor-pointer text-morning underline underline-offset-4 hover:no-underline`}
            >Augments Distribution</Link>
          </p>
        </article>
      ) : (
      <Table>
      <TableCaption>The portal that makes 1st augment Prismatic will simply overwrite the 1st choice.</TableCaption>
        <TableHeader>
          <TableRow className="!border-b !border-crema !border-opacity-20">
            <TableHead className="text-left">{positionOfAugment} augment possibilities</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combinedPercentages.map((scenario: any, id: number) => (
            <TableRow key={id} className="border-0">
              <TableCell onClick={() => handleTierSelect(scenario["key"])} className={`cursor-pointer py-3 bg-${scenario["key"].toLowerCase()} font-semibold text-midnight/[.8] border-2 border-crema border-opacity-20`}>{scenario["key"]}</TableCell>
              <TableCell className="py-3 w-1/3 md:w-1/2 font-semibold text-xl text-center border border-crema border-opacity-20">{scenario["percent"].toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </>
  )
}

export default ResultPossibilities;