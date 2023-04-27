import { possibleCost } from '../../constants/cost';

interface ISlot {
  index: number;
  stageSelected: number;
  slotsCost: number[];
  setSlotsCost: (cost: number[]) => void;
}

const Slot: React.FC<ISlot> = ({ index, stageSelected, slotsCost, setSlotsCost }) => {
  const handleCostChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedSlotsCost = [...slotsCost];
    updatedSlotsCost[index-1] = parseInt(event.target.value);
    setSlotsCost(updatedSlotsCost);
  }

  return (
    <div className="select flex-1 bg-earlynight text-midday rounded leading-10 hover-effect cursor-pointer transition-all duration-300 ease-in-out">
      <select value={slotsCost[index-1]} onChange={handleCostChange} className={`w-full text-crema ${slotsCost[index-1] == 0 ? 'bg-earlynight' : 'bg-'+slotsCost[index-1]+'cost'} pl-4 pr-9 z-10 relative rounded focus:outline-none focus:ring focus:ring-midday transition-all duration-500`}>
        <option value="0" disabled>Hero {index}</option>
        {Object.keys(possibleCost).map((cost, index) => (
          <option disabled={![stageSelected - 1, stageSelected, stageSelected + 1].includes(parseInt(cost))} value={cost} key={index}>{cost} cost</option>
        ))}
      </select>
    </div>
  )
}

export default Slot;