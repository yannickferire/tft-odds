export const numberOfChampionsByCost: { [cost: string]: number } = {
  "1 cost": 14,
  "2 cost": 13,
  "3 cost": 13,
  "4 cost": 12,
  "5 cost": 8,
}
export const totalNumberOfChampions = Object.values(numberOfChampionsByCost)
  .reduce((accumulator, currentValue) => accumulator + currentValue)
export const numberOfUnlockableChampionsByCost: { [cost: string]: number } = {
  "1 cost": 0,
  "2 cost": 6,
  "3 cost": 5,
  "4 cost": 13,
  "5 cost": 16,
  "6 cost": 0, // Assuming 0 as not provided
  "7 cost": 0  // Assuming 0 as not provided
}

export const numberOfCopiesByCost: { [cost: string]: number } = {
  "1 cost": 30,
  "2 cost": 25,
  "3 cost": 18,
  "4 cost": 10,
  "5 cost": 9,
  "6 cost": 9,
  "7 cost": 9, // Assuming same as 5/6, or maybe 1?
}
export const numberOfCopiesForTier: { [tier: string]: number } = {
  "1 star": 1,
  "2 star": 3,
  "3 star": 9,
  "4 star": 27
}