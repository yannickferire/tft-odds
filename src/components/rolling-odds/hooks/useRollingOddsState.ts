import { useState, useMemo, useEffect, useCallback } from 'react';
import { Champion } from '@/types/champion';
import { getOddsData } from '@/utils/rolling-odds-calculations';
import { calculateContestationCopies, calculateOtherCostOutCopies } from '@/utils/rolling-odds-utils';
import { numberOfCopiesByCost, numberOfChampionsByCost } from '@/constants/champions';

/**
 * Custom hook to manage rolling odds state and calculations
 * Centralizes all state management and computed values for the rolling odds feature
 */
export function useRollingOddsState(champions: Champion[] = []) {
  // === State Management ===
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [unlockedChampions, setUnlockedChampions] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState(6);
  const [maxGold, setMaxGold] = useState(50);
  const [copiesOwned, setCopiesOwned] = useState(0);
  const [contestationLevel, setContestationLevel] = useState(2);
  const [otherCostOutLevel, setOtherCostOutLevel] = useState(3);

  // User preferences for line visibility (persists even when lines auto-hide)
  const [userPrefer1Star, setUserPrefer1Star] = useState(true);
  const [userPrefer2Star, setUserPrefer2Star] = useState(true);
  const [userPrefer3Star, setUserPrefer3Star] = useState(false);

  // Track previous copiesOwned to detect transitions
  const [prevCopiesOwned, setPrevCopiesOwned] = useState(0);

  // Auto-enable 3★ line when 1★ or 2★ reach 100% to prevent empty chart
  useEffect(() => {
    if (userPrefer3Star) return; // Already enabled, no need to check

    const shouldAutoEnable =
      (prevCopiesOwned === 0 && copiesOwned >= 1) || // 1★ reaches 100%
      (prevCopiesOwned < 3 && copiesOwned >= 3);     // 2★ reaches 100%

    if (shouldAutoEnable) {
      setUserPrefer3Star(true);
    }

    setPrevCopiesOwned(copiesOwned);
  }, [copiesOwned, prevCopiesOwned, userPrefer3Star]);

  // === Computed Values ===

  // Calculate adjusted champion counts per cost tier (base + unlocked)
  const adjustedChampionsByCost = useMemo(() => {
    // Count unlocked champions grouped by cost
    const unlockedCountByCost = champions.reduce((acc, champion) => {
      if (champion.unlockable && unlockedChampions.has(champion.name)) {
        acc[champion.cost] = (acc[champion.cost] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    // Calculate adjusted counts (base + unlocked)
    const adjusted: { [cost: string]: number } = {};
    Object.entries(numberOfChampionsByCost).forEach(([costKey, baseCount]) => {
      const cost = parseInt(costKey.split(' ')[0]);
      const unlockedCount = unlockedCountByCost[cost] || 0;
      adjusted[costKey] = baseCount + unlockedCount;
    });

    return adjusted;
  }, [champions, unlockedChampions]);

  // Get max copies available for selected champion cost
  const maxCopiesForCost = useMemo(() => {
    if (!selectedChampion) return 18;
    const costKey = `${selectedChampion.cost} cost`;
    return numberOfCopiesByCost[costKey] || 18;
  }, [selectedChampion]);

  // Memoize contested copies calculation to avoid redundant calls
  const contestedCopies = useMemo(
    () => selectedChampion ? calculateContestationCopies(contestationLevel, selectedChampion.cost, level) : 0,
    [contestationLevel, selectedChampion, level]
  );

  // Memoize other cost out calculation to avoid redundant calls
  const otherCostOut = useMemo(
    () => selectedChampion ? calculateOtherCostOutCopies(otherCostOutLevel, selectedChampion.cost, level) : 0,
    [otherCostOutLevel, selectedChampion, level]
  );

  // Calculate odds data based on selected champion
  const oddsData = useMemo(() => {
    if (!selectedChampion) {
      // Default data if no champion selected (step of 2 to match rollPrice)
      const data = [];
      for (let i = 0; i <= maxGold; i += 2) {
        data.push({ goldSpent: i, probability: 0, probability2Star: 0, probability3Star: 0 });
      }
      return data;
    }

    return getOddsData(`level ${level}`, selectedChampion.cost, maxGold, copiesOwned, contestedCopies, otherCostOut, adjustedChampionsByCost);
  }, [selectedChampion, level, maxGold, copiesOwned, contestedCopies, otherCostOut, adjustedChampionsByCost]);

  // Calculate X-axis ticks dynamically based on maxGold
  const xAxisTicks = useMemo(() => {
    const step = maxGold <= 60 ? 2 : 4;
    const ticks = [];
    for (let i = 0; i <= maxGold; i += step) {
      ticks.push(i);
    }
    return ticks;
  }, [maxGold]);

  // === Line Visibility Logic ===

  // Calculate actual visibility based on user preferences and automatic rules
  const show1Star = useMemo(() => {
    // 1★ visible only if user wants it AND copiesOwned === 0 (at 1+ copies it's 100%)
    return userPrefer1Star && copiesOwned === 0;
  }, [userPrefer1Star, copiesOwned]);

  const show2Star = useMemo(() => {
    // 2★ visible only if user wants it AND copiesOwned < 3 (at 3+ copies it's 100%)
    return userPrefer2Star && copiesOwned < 3;
  }, [userPrefer2Star, copiesOwned]);

  const show3Star = useMemo(() => {
    // 3★ visible if user wants it (always show if user preference is on)
    return userPrefer3Star;
  }, [userPrefer3Star]);

  // Calculate disabled state for toggles
  const is1StarDisabled = copiesOwned >= 1; // Disabled when at 100%
  const is2StarDisabled = copiesOwned >= 3; // Disabled when at 100%
  const is3StarDisabled = false; // Never disabled

  // Check if current values are at default
  const isAtDefault = useMemo(() => {
    return (
      selectedChampion?.name === 'Any 3 cost' &&
      selectedChampion?.cost === 3 &&
      level === 6 &&
      maxGold === 50 &&
      copiesOwned === 0 &&
      contestationLevel === 2 &&
      otherCostOutLevel === 3 &&
      userPrefer1Star === true &&
      userPrefer2Star === true &&
      userPrefer3Star === false &&
      unlockedChampions.size === 0
    );
  }, [selectedChampion, level, maxGold, copiesOwned, contestationLevel, otherCostOutLevel, userPrefer1Star, userPrefer2Star, userPrefer3Star, unlockedChampions]);

  // === Actions ===

  // Reset function to restore default values
  const handleReset = useCallback(() => {
    setSelectedChampion({
      name: 'Any 3 cost',
      cost: 3,
      traits: [],
      image: '',
      championUrl: '',
      selected: false
    });
    setUnlockedChampions(new Set());
    setLevel(6);
    setMaxGold(50);
    setCopiesOwned(0);
    setContestationLevel(2);
    setOtherCostOutLevel(3);
    setUserPrefer1Star(true);
    setUserPrefer2Star(true);
    setUserPrefer3Star(false);
  }, []);

  return {
    // States
    selectedChampion,
    setSelectedChampion,
    unlockedChampions,
    setUnlockedChampions,
    level,
    setLevel,
    maxGold,
    setMaxGold,
    copiesOwned,
    setCopiesOwned,
    contestationLevel,
    setContestationLevel,
    otherCostOutLevel,
    setOtherCostOutLevel,

    // User preferences (what user wants to see)
    userPrefer1Star,
    setUserPrefer1Star,
    userPrefer2Star,
    setUserPrefer2Star,
    userPrefer3Star,
    setUserPrefer3Star,

    // Actual visibility (computed from preferences + auto-hide logic)
    show1Star,
    show2Star,
    show3Star,

    // Toggle disabled states
    is1StarDisabled,
    is2StarDisabled,
    is3StarDisabled,

    // Computed values
    maxCopiesForCost,
    contestedCopies,
    otherCostOut,
    oddsData,
    xAxisTicks,
    isAtDefault,
    adjustedChampionsByCost,

    // Actions
    handleReset,
  };
}
