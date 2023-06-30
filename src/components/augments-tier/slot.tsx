import { augmentsDistributionDetailed } from "@/constants/augments";

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

  const otherSlotsTier = slotsTier.reduce((acc: any, value, i) => {
    if (i+1 !== index) {
      acc[i+1] = value;
    }
    return acc;
  }, {});
  const filteredAugments = augmentsDistributionDetailed.filter((augment: any) => {
    return Object.entries(otherSlotsTier).every(([tier, value]) => {
      return value === '' || value === '*' || augment[tier] === value;
    });
  });
  const currentPossibilities = filteredAugments.map((augment: any) => augment[index]);
  const availablePossibilities = ["Silver", "Gold", "Prismatic"];
  const disabledOptions = availablePossibilities.filter(option => !currentPossibilities.includes(option));
  const enabledOptions = availablePossibilities.filter(option => currentPossibilities.includes(option));

  let tierSelected = slotsTier[index-1];
  if (tierSelected == '*') {
    tierSelected = 'Prismatic';
  }

  return (
    <div className={`select relative flex-1 ${slotsTier[index-2] == '' ? 'opacity-50': 'hover-effect cursor-pointer'} ${tierSelected == '' ? "expand" : "expand-black"} bg-midday text-earlynight rounded leading-10 transition-all duration-300 ease-in-out`}>
      <select 
        value={tierSelected} 
        onChange={handleTierChange} 
        disabled={slotsTier[index - 2] === "" || slotsTier[index - 1] == "*"}
        className={`w-full ${tierSelected == '' ? 'bg-midday' : 'text-midnight/[.8] focus:ring-'+tierSelected.toLowerCase()+'/[.30] expand-black bg-'+tierSelected.toLowerCase()} font-semibold text-crema pl-4 pr-9 z-10 relative rounded focus:outline-none focus:ring  transition-all duration-500`}>
        <option defaultValue="" disabled={slotsTier[index - 1] !== ""}>Augment {index}</option>
          {disabledOptions.map((augment, index) => (
            <option value={augment} key={index} disabled>{augment}</option>
          ))}
          {enabledOptions.map((augment, index) => (
            <option value={augment} key={index}>{augment}</option>
          ))}
      </select>
    </div>
  )
}

export default Slot;