export const numberOfChampionsByCost: { [cost: string]: number } = {
  "1 cost": 14,
  "2 cost": 13,
  "3 cost": 13,
  "4 cost": 12,
  "5 cost": 8
}
export const totalNumberOfChampions = Object.values(numberOfChampionsByCost)
  .reduce((accumulator, currentValue) => accumulator + currentValue)
export const numberOfCopiesByCost: { [cost: string]: number } = {
  "1 cost": 22,
  "2 cost": 20,
  "3 cost": 17,
  "4 cost": 10,
  "5 cost": 9
}
export const numberOfCopiesForTier: { [tier: string]: number } = {
  "1 star": 1,
  "2 star": 3,
  "3 star": 9
}