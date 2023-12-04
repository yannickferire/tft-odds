import { rollingHeadlinersChancesByLevel } from '@/constants/game';

interface IRollingOdds {
  selectedLevel: number;
}

const RollingOdds: React.FC<IRollingOdds> = ({ selectedLevel }) => {
  return(
    <ul className="flex flex-1 gap-3 text-xs">
      {Object.keys(rollingHeadlinersChancesByLevel['level '+selectedLevel]).map((cost, index) => {
        if (rollingHeadlinersChancesByLevel['level '+selectedLevel][cost] == 0) { return null; }
        return (
          <li key={index} className={`flex flex-1 justify-center items-center`}>
            <span className={`w-2 h-2 bg-${cost.substring(0, 1)}cost rounded inline-block mr-1`}></span> 
            {rollingHeadlinersChancesByLevel['level '+selectedLevel][cost]}%
          </li>
        )
      })}
    </ul>
  )
}

export default RollingOdds;