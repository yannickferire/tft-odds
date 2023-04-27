import { possibleLevels } from "@/constants/loaded-dice"

interface IResultHeader {}

const ResultHeader: React.FC<IResultHeader> = () => {
  return (
    <div className="flex">
      <span className="w-20 md:w-40 text-xs opacity-30 text-center">Dice used on</span>
      <ul className="flex justify-around text-center gap-1 md:gap-2 w-full mb-6">
        {Object.values(possibleLevels).map((level, index) => (
          <li key={index} className={`w-12 md:w-20 text-xs opacity-30 ${index == 0 || index == 7?"hidden":""} md:block`}>Lvl. {level}</li>
        ))}
      </ul>
    </div>
  )
}

export default ResultHeader;