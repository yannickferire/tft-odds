interface ILevelTenToggle {
  levelTen: boolean;
  setLevelTen: (levelTen: boolean) => void;
}

const LevelTenToggle: React.FC<ILevelTenToggle> = ({ levelTen, setLevelTen }) => {
  return (
    <label className="group inline-flex flex-col items-center text-center cursor-pointer">
      <input
          type="checkbox"
          className="sr-only peer"
          checked={levelTen}
          readOnly
      />
      <div
        onClick={() => {
          setLevelTen(!levelTen);
        }}
        className={`headliner-toggle border border-earlynight group-hover:border-midday relative mb-1 w-11 h-6 bg-earlynight rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-midday after:rounded-full after:h-5 after:w-5 after:transition-all ${levelTen ? 'after:bg-morning border-midday' : ''}`}
      ></div>
      <span 
        onClick={() => {
        setLevelTen(!levelTen);
        }}
        className={`text-xs font-medium text-center ml-1 ${levelTen ? 'text-morning' : 'text-midday'}`}>
          Lvl 10.
      </span>
  </label>
  )
}

export default LevelTenToggle;