import { numberOfRerolls } from "../../constants/hero-augments";

interface IResultHeader {
  championPossibilities: number
}

const ResultHeader: React.FC<IResultHeader> = ({ championPossibilities }) => {
  return (
    <header className="grid grid-cols-12 md:grid-cols-10 gap-2 w-full mb-6">
      <h3 className="col-span-3 sm:col-span-2 text-xs opacity-30 text-center">Champions ({championPossibilities})</h3>
      <h3 className="col-span-3 sm:col-span-4 md:col-span-2 text-xs opacity-30 text-center">Augments</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% to get <br/>on show</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% <span className="hidden sm:inline-block">to get atleast</span> 1 <br className="hidden sm:inline-block" />with { numberOfRerolls }&nbsp;rerolls</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% <span className="hidden sm:inline-block">to get</span> both <br className="hidden sm:inline-block" />with { numberOfRerolls }&nbsp;rerolls</h3>
    </header>
  )
}

export default ResultHeader;