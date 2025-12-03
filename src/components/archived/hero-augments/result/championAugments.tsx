interface IChampionAugments {
  champion: any;
  stageSelected: number;
}

const ChampionAugments: React.FC<IChampionAugments> = ({ champion, stageSelected }) => {
  return (
    <div className="col-span-3 sm:col-span-4 md:col-span-2 mt-0.5">
      {Object.keys(champion.augments).map((augment: string) => (
        <div className="mb-3" key={champion.augments[augment].apiName}>
          <h4 className="text-center text-sm sm:text-base">
            <span className={`block mx-auto w-fit ${augment == 'support'?'bg-support':'bg-carry'} rounded-sm px-1 leading-3 pb-0.5 text-xs mb-0.5`}>{augment}</span> 
            {champion.augments[augment].name}{(augment == 'carry' && champion.name == 'Warwick' && stageSelected == 4)?'+':null}
          </h4>
        </div>
      ))}
    </div>
  )
}

export default ChampionAugments;