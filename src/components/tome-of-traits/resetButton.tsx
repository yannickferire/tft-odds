import { baseStage, baseSlots } from "@/constants/constants";

interface IResetButton {
  traits: any[];
  setTraits: (traits: any[]) => void;
}

const ResetButton: React.FC<IResetButton> = ({ traits, setTraits }) => {
  const selectedTraits = traits.filter((trait) => trait.selected);

  let resetEnabled = false;
  if (selectedTraits.length > 0) {
    resetEnabled = true;
  }
  const handleReset = () => {
    setTraits(
      traits.map((trait) => {
        return { ...trait, selected: false }
      })
    )
  }
  return (
    <button 
      onClick={() => handleReset()} 
      className={`h-10 text-midday ${(resetEnabled == false)?'opacity-40':'group'} transition-all duration-300 ease-in-out`}
      disabled={resetEnabled == false}>
      <span className="w-full px-3 h-8 block leading-8 rounded bg-earlynight text-crema relative z-10 group-hover:bg-midday">
        <span className="inline-block leading-7 text-xl rotate-45 mr-2">+</span>Reset
      </span>
    </button>
  )
}

export default ResetButton;