import { rollingChancesByLevel } from '@/constants/game';
import { numberOfCopiesByCost, numberOfChampionsByCost } from '@/constants/champions';

/**
 * Lightens a hex color by a given percentage
 * @param hex - Hex color string (with or without #)
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color string
 */
export const lightenColor = (hex: string, percent: number): string => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Lighten by moving towards white (255)
  const newR = Math.min(255, Math.round(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.round(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.round(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

/**
 * Cost color values mapping
 */
const COST_COLORS: Record<number, string> = {
  1: '#9f9a89',
  2: '#39b65a',
  3: '#2875be',
  4: '#aa09a4',
  5: '#d78e00',
  6: '#f9be0a',
};

/**
 * Gets the pool size for a given champion cost
 * Uses data from numberOfCopiesByCost constant
 */
const getPoolSize = (cost: number): number => {
  const poolSize = numberOfCopiesByCost[`${cost} cost`];
  return poolSize || numberOfCopiesByCost["1 cost"]; // Fallback to 1-cost pool size
};

// Base copies per contestation level (representing player count)
const BASE_CONTESTATION_COPIES: Record<number, number> = {
  2: 1,  // Low
  3: 2,  // Normal
  4: 3,  // High
  5: 4,  // Very High
};

// Probability scaling constants
const MIN_PROBABILITY_FACTOR = 0.3;  // -70% impact
const MAX_PROBABILITY_FACTOR = 1.7;  // +70% impact
const REFERENCE_PROBABILITY = 25;

// Custom rounding threshold for Low contestation level
const LOW_LEVEL_ROUNDING_THRESHOLD = 0.75;

/**
 * Applies custom rounding based on contestation level
 * - Low level: rounds down if < 0.75, up if >= 0.75
 * - Other levels: standard rounding (nearest integer)
 */
const applyContestationRounding = (value: number, contestationLevel: number): number => {
  if (contestationLevel === 2) {
    const decimal = value % 1;
    return decimal < LOW_LEVEL_ROUNDING_THRESHOLD ? Math.floor(value) : Math.ceil(value);
  }
  return Math.round(value);
};

/**
 * Calculates the number of copies removed from the pool based on contestation level, champion cost, and player level
 * @param contestationLevel - Level of contestation (1-5)
 * @param championCost - Cost of the champion (1-5)
 * @param playerLevel - Current player level (1-11)
 * @returns Number of copies to remove from the pool (positive number)
 */
export const calculateContestationCopies = (
  contestationLevel: number,
  championCost: number,
  playerLevel: number
): number => {
  // None = no contestation
  if (contestationLevel === 1) return 0;

  // Get the probability of finding this cost at this level
  const probability = rollingChancesByLevel[`level ${playerLevel}`]?.[`${championCost} cost`] || 0;

  // If probability is 0, no contestation impact
  if (probability === 0) return 0;

  // Calculate contestation impact
  const baseCopies = BASE_CONTESTATION_COPIES[contestationLevel] || 0;
  const probabilityFactor = Math.max(MIN_PROBABILITY_FACTOR, Math.min(MAX_PROBABILITY_FACTOR, probability / REFERENCE_PROBABILITY));
  const poolSize = getPoolSize(championCost);

  // Apply custom rounding and cap at pool size - 1
  const rawValue = baseCopies * probabilityFactor;
  const adjustedCopies = applyContestationRounding(rawValue, contestationLevel);

  return Math.min(adjustedCopies, poolSize - 1);
};

// Base copies per other cost out level (representing other players playing same cost)
const BASE_OTHER_COST_OUT_COPIES: Record<number, number> = {
  2: 3,   // Low
  3: 7,   // Normal
  4: 12,  // High
  5: 18,  // Very High
};

/**
 * Calculates the number of champions of the same cost removed from the pool by other players
 * @param otherCostOutLevel - Level of other cost out (1-5)
 * @param championCost - Cost of the champion (1-5)
 * @param playerLevel - Current player level (1-11)
 * @returns Number of champions to remove from the total pool (positive number)
 */
export const calculateOtherCostOutCopies = (
  otherCostOutLevel: number,
  championCost: number,
  playerLevel: number
): number => {
  // None = no impact
  if (otherCostOutLevel === 1) return 0;

  // Calculate weighted average probability across adjacent levels
  // This simulates other players being at different levels (prev, current, next)
  const prevLevel = Math.max(1, playerLevel - 1);
  const nextLevel = Math.min(11, playerLevel + 1);

  const probCurrent = rollingChancesByLevel[`level ${playerLevel}`]?.[`${championCost} cost`] || 0;
  const probPrev = rollingChancesByLevel[`level ${prevLevel}`]?.[`${championCost} cost`] || 0;
  const probNext = rollingChancesByLevel[`level ${nextLevel}`]?.[`${championCost} cost`] || 0;

  // Weighted average: 25% prev, 50% current, 25% next
  const probability = (probPrev * 0.25 + probCurrent * 0.5 + probNext * 0.25);

  // If probability is 0, no impact
  if (probability === 0) return 0;

  // Calculate other cost out impact
  const baseCopies = BASE_OTHER_COST_OUT_COPIES[otherCostOutLevel] || 0;
  const probabilityFactor = Math.max(MIN_PROBABILITY_FACTOR, Math.min(MAX_PROBABILITY_FACTOR, probability / REFERENCE_PROBABILITY));
  const poolSize = getPoolSize(championCost);

  // Apply custom rounding and cap at a reasonable limit
  const rawValue = baseCopies * probabilityFactor;
  const adjustedCopies = applyContestationRounding(rawValue, otherCostOutLevel);

  // Cap at pool size * number of champions of this cost - 1
  const costKey = `${championCost} cost`;
  const championsAtCost = numberOfChampionsByCost[costKey] || 13;
  const maxPool = poolSize * championsAtCost;

  return Math.min(adjustedCopies, maxPool - 1);
};

/**
 * Gets cost-based CSS class names for styling
 * @param cost - Champion cost (1-6)
 * @returns Object containing cost-specific class names and color value
 */
export const getCostClasses = (cost: number) => {
  const bgClass = `bg-${cost}cost`;
  const borderClass = `border-${cost}cost`;
  const borderClassWithOpacity = `border-${cost}cost/50`;
  const textClass = `text-${cost}cost`;
  const textClassWithOpacity = `text-${cost}cost/50`;
  const colorValue = COST_COLORS[cost] || '#9f9a89';
  return { bgClass, borderClass, borderClassWithOpacity, textClass, textClassWithOpacity, colorValue };
};

/**
 * Extracts and returns sorted list of available levels from rollingChancesByLevel
 * @returns Array of available level numbers, sorted ascending
 */
export const getAvailableLevels = (): number[] => {
  return Object.keys(rollingChancesByLevel)
    .map(key => parseInt(key.replace('level ', '')))
    .sort((a, b) => a - b);
};

/**
 * Shared class names for NumberField increment/decrement buttons
 */
export const numberFieldButtonClassName = "border-white/10 bg-midnight/50 text-crema hover:bg-black/40 hover:text-neutral-50 -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Shared class names for NumberField Group wrapper
 */
export const numberFieldGroupClassName = "border-white/10 data-focus-within:border-neutral-300 data-focus-within:ring-neutral-300/50 relative inline-flex h-12 w-full min-w-0 items-center overflow-hidden rounded-md border bg-midnight text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px]";

/**
 * Shared class names for NumberField Input
 */
export const numberFieldInputClassName = "selection:bg-neutral-900 selection:text-crema w-full grow pr-1 py-2 text-center tabular-nums outline-none text-crema bg-transparent";
