interface IHeadlinerToggle {
  headliner: boolean;
  setHeadliner: (headliner: boolean) => void;
}

const HeadlinerToggle: React.FC<IHeadlinerToggle> = ({ headliner, setHeadliner }) => {
  return (
    <label className="group inline-flex flex-col items-center text-center cursor-pointer">
      <input
          type="checkbox"
          className="sr-only peer"
          checked={headliner}
          readOnly
      />
      <div
        onClick={() => {
          setHeadliner(!headliner);
        }}
        className={`headliner-toggle border border-earlynight group-hover:border-midday relative mb-1 w-11 h-6 bg-earlynight rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-midday after:rounded-full after:h-5 after:w-5 after:transition-all ${headliner ? 'headliner-on border-midday' : ''}`}
      ></div>
      <span 
        onClick={() => {
        setHeadliner(!headliner);
        }}
        className="text-xs font-medium text-gray-900">
          Headliner
      </span>
  </label>
  )
}

export default HeadlinerToggle;