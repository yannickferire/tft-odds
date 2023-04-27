import { possibleStages } from '../../constants/hero-augments';

interface IStageSelection {
  stageSelected: number;
  setStageSelected: (stage: number) => void;
  slotsCost: number[];
  setSlotsCost: (cost: number[]) => void;
}

const StageSelection: React.FC<IStageSelection> = ({ stageSelected, setStageSelected, setSlotsCost }) => {
  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setStageSelected(value);
    setSlotsCost([value - 1, value, value]);
  }

  return (
    <div className="select bg-earlynight text-midday rounded leading-10 hover-effect cursor-pointer transition-all duration-300 ease-in-out">
      <select value={stageSelected} onChange={handleStageChange} className="bg-earlynight text-crema pl-4 pr-9 z-10 relative rounded focus:outline-none focus:ring focus:ring-midday">
        <option disabled>Select your stage</option>
        {Object.keys(possibleStages).map((stage, index) => {
          return (
            <option value={possibleStages[stage]} key={index}>Stage {stage}</option>
          )
        })}
      </select>
    </div>
  )
}

export default StageSelection;