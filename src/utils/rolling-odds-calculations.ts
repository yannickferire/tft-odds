import { rollingChancesByLevel, rollPrice, championsPerRoll } from '@/constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost } from '@/constants/champions';

/**
 * Calculate the probability of finding AT LEAST k copies using Poisson distribution
 * @param expectedCopies - Lambda (expected number of occurrences)
 * @param minCopiesNeeded - Minimum number of copies required (k)
 * @returns Probability as a percentage (0-100)
 */
function calculateProbabilityAtLeastKCopies(expectedCopies: number, minCopiesNeeded: number): number {
  // P(X >= k) = 1 - P(X < k) = 1 - sum(P(X=i) for i=0 to k-1)
  let cumulativeProbability = 0;
  let poissonTerm = Math.exp(-expectedCopies); // P(X=0)
  cumulativeProbability += poissonTerm;

  // Calculate P(X=1), P(X=2), ..., P(X=k-1) iteratively
  for (let i = 1; i < minCopiesNeeded; i++) {
    poissonTerm *= expectedCopies / i;
    cumulativeProbability += poissonTerm;
  }

  // Return P(X >= k) as percentage
  return Math.max(0, (1 - cumulativeProbability) * 100);
}

/**
 * Calculate rolling odds data for finding multiple copies of a champion
 *
 * This function models TFT's shared champion pool system where:
 * - Each shop slot has a chance to show a specific champion
 * - The pool depletes as you find copies (18 total for 3-cost, diminishes to 17, 16, etc.)
 * - Uses Poisson distribution to approximate probability of finding k+ copies
 *
 * @param level - Player level (e.g., "level 7")
 * @param cost - Champion cost (e.g., 3 for "3 cost")
 * @param maxGold - Maximum gold to calculate for (default: 10)
 * @param copiesOwned - Number of copies already owned (default: 0)
 * @param contestationLevel - How contested the champion is (1-5, default: 1)
 * @param contestedCopies - Number of copies taken by other players based on contestation (default: 0)
 * @param otherCostOut - Number of champions of the same cost removed from the pool by other players (default: 0)
 * @returns Array of {goldSpent, probability1Star, probability2Star, probability3Star} objects
 */
export function getOddsData(
  level: string,
  cost: number,
  maxGold: number = 10,
  copiesOwned: number = 0,
  contestedCopies: number = 0,
  otherCostOut: number = 0,
  adjustedChampionsByCost?: { [cost: string]: number }
): { goldSpent: number; probability: number; probability2Star: number; probability3Star: number }[] {
  const costKey = `${cost} cost`;

  // Get the chance to roll this cost at this level (in %)
  const chanceForCost = rollingChancesByLevel[level]?.[costKey] || 0;

  // Get the number of unique champions at this cost (use adjusted if provided)
  const championsByCostToUse = adjustedChampionsByCost || numberOfChampionsByCost;
  const championsAtCost = championsByCostToUse[costKey] || 1;

  // Get total copies in the pool for this cost
  const totalCopiesInPool = numberOfCopiesByCost[costKey] || 18;

  // Adjust pool for copies already owned and copies taken by other players (contestation + other cost out)
  const totalCopiesRemoved = copiesOwned + contestedCopies;
  const remainingCopiesInPool = totalCopiesInPool - totalCopiesRemoved;

  // Pre-calculate constants (outside loop for performance)
  const chanceForCostDecimal = chanceForCost / 100;
  const pSpecificChampion = 1 / championsAtCost;
  const baseSlotProbability = chanceForCostDecimal * pSpecificChampion;
  const totalChampionsInPool = totalCopiesInPool * championsAtCost;
  // Reduce the total pool by otherCostOut (affects all champions of this cost)
  const adjustedTotalChampionsInPool = totalChampionsInPool - totalCopiesRemoved - otherCostOut;

  // Pre-calculate average pool probabilities for 2-star and 3-star
  // These account for pool depletion as you find copies
  // For 2-star: need 3 more copies (or less if already have some)
  const copiesNeededFor2Star = Math.max(0, 3 - copiesOwned);
  const avgPoolFactor2Star = copiesNeededFor2Star === 0 ? 0 :
    Array.from({ length: copiesNeededFor2Star }, (_, i) => i).reduce((sum, copiesFound) => {
      return sum + (remainingCopiesInPool - copiesFound) / (adjustedTotalChampionsInPool - copiesFound);
    }, 0) / copiesNeededFor2Star;

  // For 3-star: need 9 more copies (or less if already have some)
  const copiesNeededFor3Star = Math.max(0, 9 - copiesOwned);
  const avgPoolFactor3Star = copiesNeededFor3Star === 0 ? 0 :
    Array.from({ length: copiesNeededFor3Star }, (_, i) => i).reduce((sum, copiesFound) => {
      return sum + (remainingCopiesInPool - copiesFound) / (adjustedTotalChampionsInPool - copiesFound);
    }, 0) / copiesNeededFor3Star;

  // Generate data points from 0 to maxGold (step of rollPrice, which is 2)
  const data: { goldSpent: number; probability: number; probability2Star: number; probability3Star: number }[] = [];

  for (let gold = 0; gold <= maxGold; gold += rollPrice) {
    const numRolls = Math.floor(gold / rollPrice);
    const totalSlots = numRolls * championsPerRoll;

    // ==================== 1-STAR (1 copy) ====================
    // If already have 1+ copies, the probability is 100% for getting to 1-star
    let p1Star = 100;
    if (copiesOwned === 0) {
      // Simple binomial: probability of seeing the champion in at least 1 of 5 slots per roll
      // Adjust for remaining pool
      const adjustedSlotProb = chanceForCostDecimal * (remainingCopiesInPool / adjustedTotalChampionsInPool);
      const pNotSlot = 1 - adjustedSlotProb;
      const pRoll = 1 - Math.pow(pNotSlot, championsPerRoll);
      p1Star = (1 - Math.pow(1 - pRoll, numRolls)) * 100;
    }

    // ==================== 2-STAR (3 copies) ====================
    // Adjusted probability considering pool depletion
    let p2Star = 0;
    if (copiesOwned >= 3) {
      p2Star = 100; // Already have enough for 2-star
    } else if (copiesNeededFor2Star > 0) {
      const pSlot2Star = chanceForCostDecimal * avgPoolFactor2Star;
      const expectedCopies2Star = totalSlots * pSlot2Star;
      p2Star = calculateProbabilityAtLeastKCopies(expectedCopies2Star, copiesNeededFor2Star);
    }

    // ==================== 3-STAR (9 copies) ====================
    // Adjusted probability considering pool depletion
    let p3Star = 0;
    if (copiesOwned >= 9) {
      p3Star = 100; // Already have enough for 3-star
    } else if (copiesNeededFor3Star > 0) {
      const pSlot3Star = chanceForCostDecimal * avgPoolFactor3Star;
      const expectedCopies3Star = totalSlots * pSlot3Star;
      p3Star = calculateProbabilityAtLeastKCopies(expectedCopies3Star, copiesNeededFor3Star);
    }

    data.push({
      goldSpent: gold,
      probability: Math.round(p1Star * 100) / 100,
      probability2Star: Math.round(Math.min(p2Star, 100) * 100) / 100,
      probability3Star: Math.round(Math.min(p3Star, 100) * 100) / 100
    });
  }

  return data;
}

/**
 * Calculate expected number of rolls to find at least k copies
 * @param level - Player level (e.g., "level 7")
 * @param cost - Champion cost (e.g., 3 for "3 cost")
 * @param copiesNeeded - Number of copies needed (1, 3, or 9)
 * @param copiesOwned - Number of copies already owned (default: 0)
 * @param contestedCopies - Number of copies removed by contestation (default: 0)
 * @param otherCostOut - Number of champions of the same cost removed from the pool by other players (default: 0)
 * @returns Expected number of rolls
 */
export function getExpectedRolls(
  level: string,
  cost: number,
  copiesNeeded: number = 1,
  copiesOwned: number = 0,
  contestedCopies: number = 0,
  otherCostOut: number = 0,
  adjustedChampionsByCost?: { [cost: string]: number }
): number {
  const costKey = `${cost} cost`;
  const chanceForCost = rollingChancesByLevel[level]?.[costKey] || 0;
  const championsByCostToUse = adjustedChampionsByCost || numberOfChampionsByCost;
  const championsAtCost = championsByCostToUse[costKey] || 1;
  const totalCopiesInPool = numberOfCopiesByCost[costKey] || 18;

  // Adjust pool for copies already owned and contested
  const adjustedCopiesInPool = totalCopiesInPool - copiesOwned - contestedCopies;

  const chanceForCostDecimal = chanceForCost / 100;
  const pSpecificChampion = 1 / championsAtCost;
  const baseSlotProbability = chanceForCostDecimal * pSpecificChampion;
  const totalChampionsInPool = totalCopiesInPool * championsAtCost;
  const adjustedTotalChampionsInPool = totalChampionsInPool - copiesOwned - contestedCopies - otherCostOut;

  if (copiesNeeded === 1) {
    // For 1 copy: use adjusted pool
    const adjustedSlotProb = chanceForCostDecimal * (adjustedCopiesInPool / adjustedTotalChampionsInPool);
    const pNotSlot = 1 - adjustedSlotProb;
    const pRoll = 1 - Math.pow(pNotSlot, championsPerRoll);
    return 1 / pRoll;
  } else if (copiesNeeded === 3) {
    // For 3 copies: adjust for pool depletion
    const avgPoolFactor = [0, 1, 2].reduce((sum, copiesFound) => {
      return sum + (adjustedCopiesInPool - copiesFound) / (adjustedTotalChampionsInPool - copiesFound);
    }, 0) / 3;
    const pSlot = chanceForCostDecimal * avgPoolFactor;
    const expectedCopiesPerRoll = championsPerRoll * pSlot;
    return 3 / expectedCopiesPerRoll;
  } else if (copiesNeeded === 9) {
    // For 9 copies: adjust for pool depletion
    const avgPoolFactor = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((sum, copiesFound) => {
      return sum + (adjustedCopiesInPool - copiesFound) / (adjustedTotalChampionsInPool - copiesFound);
    }, 0) / 9;
    const pSlot = chanceForCostDecimal * avgPoolFactor;
    const expectedCopiesPerRoll = championsPerRoll * pSlot;
    return 9 / expectedCopiesPerRoll;
  }

  return 0;
}

/**
 * Calculate gold needed to reach a target probability threshold
 * @param level - Player level (e.g., "level 7")
 * @param cost - Champion cost (e.g., 3 for "3 cost")
 * @param copiesNeeded - Number of copies needed (1, 3, or 9)
 * @param targetProbability - Target probability (0-100)
 * @returns Gold needed to reach target probability
 */
export function getGoldForProbability(
  level: string,
  cost: number,
  copiesNeeded: number,
  targetProbability: number = 70
): number {
  // Binary search to find gold amount that reaches target probability
  let low = 0;
  let high = 200; // Max search range
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const data = getOddsData(level, cost, mid);
    const lastDataPoint = data[data.length - 1];

    let probability = 0;
    if (copiesNeeded === 1) {
      probability = lastDataPoint.probability;
    } else if (copiesNeeded === 3) {
      probability = lastDataPoint.probability2Star;
    } else if (copiesNeeded === 9) {
      probability = lastDataPoint.probability3Star;
    }

    if (probability >= targetProbability) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
}
