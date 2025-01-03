interface IResetButton {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  levelTen: boolean;
  setLevelTen: (levelTen: boolean) => void;
  viktor: boolean;
  setViktor: (viktor: boolean) => void;
}

const ResetButton: React.FC<IResetButton> = ({ champs, setChamps, selectedStage, setSelectedStage, levelTen, setLevelTen, viktor, setViktor }) => {
  const selectedChampions = champs.filter((champion) => champion.selected);

  let resetEnabled = false;
  if (selectedStage !== "4-6" || selectedChampions.length > 0 || levelTen || viktor) {
    resetEnabled = true;
  }
  const handleReset = () => {
    setLevelTen(false);
    setViktor(false);
    setSelectedStage("4-6");
    setChamps(
      champs.map((champion) => {
        return { ...champion, selected: false, position: 0 }
      })
    );
  }
  return (
    <button 
      onClick={() => handleReset()} 
      className={`mt-8 h-10 text-midday ${(resetEnabled == false)?'opacity-40':'hover-effect'} transition-all duration-300 ease-in-out`}
      disabled={resetEnabled == false}>
      <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">
        <span className="inline-block leading-9 text-xl rotate-45 mr-2">+</span>Reset
      </span>
    </button>
  )
}

export default ResetButton;