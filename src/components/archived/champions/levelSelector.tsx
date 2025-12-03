interface ILevelSelector {
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
}

const LevelSelector: React.FC<ILevelSelector> = ({ selectedLevel, setSelectedLevel }) => {
  const maxLevel = 11;
  return (
    <div className="inline-block text-xl mb-6">
      <button 
        onClick={() => setSelectedLevel(selectedLevel - 1)}
        className={`text-midday ${(selectedLevel <= 1)?'opacity-40':'hover-effect'}`} 
        disabled={selectedLevel <= 1}
      ><span className="w-10 h-10 block leading-9 rounded bg-earlynight text-crema relative z-10">–</span></button>
      <span className="px-2 w-20 inline-block text-center">Lvl. {selectedLevel}</span>
      <button
        onClick={() => setSelectedLevel(selectedLevel + 1)} 
        className={`text-midday ${(selectedLevel >= maxLevel)?'opacity-40':'hover-effect'}`} 
        disabled={selectedLevel >= maxLevel}
      ><span className="w-10 h-10 block leading-9 rounded bg-earlynight text-crema relative z-10">+</span></button>
    </div>
  )
}

export default LevelSelector;