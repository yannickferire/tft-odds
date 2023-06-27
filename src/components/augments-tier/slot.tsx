import { augmentsDistribution, augmentsDistributionDetailed } from "@/constants/augments";

interface ISlot {
  index: number;
  slotsTier: string[];
  setSlotsTier: (tier: string[]) => void;
}

const Slot: React.FC<ISlot> = ({ index, slotsTier, setSlotsTier }) => {
  const firstEmptySlot = slotsTier.findIndex((tier) => tier === '');
  const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedSlotsTier = [...slotsTier];
    updatedSlotsTier[index-1] = event.target.value;
    setSlotsTier(updatedSlotsTier);
  }

  const availablePossibilities = ["Silver", "Gold", "Prismatic"];
  const filteredAugments = augmentsDistributionDetailed.filter((augment: any) => {
    for (let i = 0; i < firstEmptySlot; i++) {
      if (augment[i + 1] !== slotsTier[i]) {
        return false;
      }
    }
    return true;
  });
  const currentPossibilities = filteredAugments.map((augment: any) => augment[firstEmptySlot + 1]);
  const disabledOptions = availablePossibilities.filter(option => !currentPossibilities.includes(option));
  const enabledOptions = availablePossibilities.filter(option => currentPossibilities.includes(option));

  return (
    <div className={`select relative flex-1 ${slotsTier[index-2] == '' ? 'opacity-50': 'hover-effect cursor-pointer'} ${slotsTier[index-1] == '' ? "expand" : "expand-black"} bg-midday text-earlynight rounded leading-10 transition-all duration-300 ease-in-out`}>
      <select 
        value={slotsTier[index-1]} 
        onChange={handleTierChange} 
        disabled={slotsTier[index - 2] === ""}
        className={`w-full ${slotsTier[index-1] == '' ? 'bg-midday' : 'text-midnight/[.8] focus:ring-'+slotsTier[index-1].toLowerCase()+'/[.30] expand-black bg-'+slotsTier[index-1].toLowerCase()} font-semibold text-crema pl-4 pr-9 z-10 relative rounded focus:outline-none focus:ring  transition-all duration-500`}>
        <option defaultValue="" disabled={slotsTier[index - 1] !== ""}>Augment {index}</option>
        {index === 3 && (
          <>
            {disabledOptions.map((augment, index) => (
              <option value={augment} key={index} disabled>{augment}</option>
            ))}
            {enabledOptions.map((augment, index) => (
              <option value={augment} key={index}>{augment}</option>
            ))}
          </>
        )}
        {index !== 3 && (
          availablePossibilities.map((augment, index) => (
            <option value={augment} key={index}>{augment}</option>
          ))
        )}
      </select>
    </div>
  )
}

export default Slot;