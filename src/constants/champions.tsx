export const numberOfChampionsByCost: { [cost: string]: number } = {
  "1 cost": 13,
  "2 cost": 13,
  "3 cost": 13,
  "4 cost": 12,
  "5 cost": 8
}
export const totalNumberOfChampions = Object.values(numberOfChampionsByCost)
  .reduce((accumulator, currentValue) => accumulator + currentValue)
export const numberOfCopiesByCost: { [cost: string]: number } = {
  "1 cost": 29,
  "2 cost": 22,
  "3 cost": 18,
  "4 cost": 12,
  "5 cost": 10
}
export const numberOfCopiesForTier: { [tier: string]: number } = {
  "1 star": 1,
  "2 star": 3,
  "3 star": 9
}