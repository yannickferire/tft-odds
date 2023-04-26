import { baseLevel } from "@/constants/constants";

interface IResetButton {
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
  champs: any[];
  setChamps: (champions: any[]) => void;
}

const ResetButton: React.FC<IResetButton> = ({ selectedLevel, setSelectedLevel, champs, setChamps }) => {
  const selectedChampions = champs.filter((champion) => champion.selected);

  let resetEnabled = false;
  if (selectedLevel !== baseLevel || selectedChampions.length > 0) {
    resetEnabled = true;
  }
  const handleReset = () => {
    setSelectedLevel(baseLevel);
    setChamps(
      champs.map((champion) => {
        return { ...champion, selected: false, position: 0 }
      })
    )
  }
  return (
    <button 
      onClick={() => handleReset()} 
      className={`ml-2 h-10 text-midday ${(resetEnabled == false)?'opacity-40':'hover-effect'} transition-all duration-300 ease-in-out`}
      disabled={resetEnabled == false}>
      <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">
        <span className="inline-block leading-9 text-xl rotate-45 mr-2">+</span>Reset
      </span>
    </button>
  )
}

export default ResetButton;