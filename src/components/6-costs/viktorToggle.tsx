interface IViktorToggle {
  viktor: boolean;
  setViktor: (viktor: boolean) => void;
}

const ViktorToggle: React.FC<IViktorToggle> = ({ viktor, setViktor }) => {
  return (
    <label className="group inline-flex flex-col items-center text-center cursor-pointer">
      <input
          type="checkbox"
          className="sr-only peer"
          checked={viktor}
          readOnly
      />
      <div
        onClick={() => {
          setViktor(!viktor);
        }}
        className={`headliner-toggle border border-earlynight group-hover:border-midday relative mb-1 w-11 h-6 bg-earlynight rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-midday after:rounded-full after:h-5 after:w-5 after:transition-all ${viktor ? 'after:bg-morning border-midday' : ''}`}
      ></div>
      <span 
        onClick={() => {
        setViktor(!viktor);
        }}
        className={`text-xs font-medium leading-tight mt-px text-center ml-1 ${viktor ? 'text-morning' : 'text-midday'}`}>
          Viktor&apos;s <br/>encounter
      </span>
  </label>
  )
}

export default ViktorToggle;