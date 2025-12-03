import { rollingChancesByLevel } from '@/constants/game';

interface IRollingOdds {
  selectedLevel: number;
  selectedCost: string;
}

const RollingOdds: React.FC<IRollingOdds> = ({ selectedLevel, selectedCost }) => {
  return(
    <ul className="flex flex-1 justify-between text-xs mb-px pb-1">
      {Object.keys(rollingChancesByLevel['level '+selectedLevel]).map((cost, index) => {
        return (
          <li key={index} className={`flex flex-1 justify-center items-center ${(cost !== selectedCost)?'opacity-50':null}`}>
            <span className={`w-2 h-2 bg-${cost.substring(0, 1)}cost rounded inline-block mr-1`}></span> 
            {rollingChancesByLevel['level '+selectedLevel][cost]}%
            {/*rollingHeadlinersChancesByLevel['level ' + selectedLevel][cost] > 0 && (
              <span className="ml-1 text-xxs">
                {' - '}
                {rollingHeadlinersChancesByLevel['level ' + selectedLevel][cost]}%
              </span>
            )*/}
          </li>
        )
      })}
    </ul>
  )
}

export default RollingOdds;