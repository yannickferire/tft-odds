import { odds } from "@/constants/6-costs";

interface StageSelectorProps {
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
}

const StageSelector = ({ selectedStage, setSelectedStage }: StageSelectorProps) => {
  const stages = odds.map(odd => odd.stage);
  
  const handleStageChange = (direction: 'prev' | 'next') => {
    const currentIndex = stages.indexOf(selectedStage);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedStage(stages[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < stages.length - 1) {
      setSelectedStage(stages[currentIndex + 1]);
    }
  };

  return (
    <div className="inline-flex text-xl mb-6">
      <button 
        onClick={() => handleStageChange('prev')}
        className={`text-midday ${stages.indexOf(selectedStage) <= 0 ? 'opacity-40' : 'hover-effect'}`} 
        disabled={stages.indexOf(selectedStage) <= 0}
      >
        <span className="w-10 h-10 block leading-9 rounded bg-earlynight text-crema relative z-10">–</span>
      </button>
      <span className="px-2 w-20 inline-block text-center text-xs">
        stage <strong className="font-bold block text-base">{selectedStage}</strong>
      </span>
      <button
        onClick={() => handleStageChange('next')} 
        className={`text-midday ${stages.indexOf(selectedStage) >= stages.length - 1 ? 'opacity-40' : 'hover-effect'}`} 
        disabled={stages.indexOf(selectedStage) >= stages.length - 1}
      >
        <span className="w-10 h-10 block leading-9 rounded bg-earlynight text-crema relative z-10">+</span>
      </button>
    </div>
  );
};

export default StageSelector;