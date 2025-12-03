import { Champion } from '@/types/champion';

/**
 * Filters only unlockable champions
 */
export function filterUnlockableChampions(champions: Champion[]): Champion[] {
  return champions.filter(champion => champion.unlockable === true);
}

/**
 * Filters locked champions (unlockable but not yet unlocked)
 */
export function filterLockedChampions(champions: Champion[], unlockedSet: Set<string>): Champion[] {
  return champions.filter(champion =>
    champion.unlockable === true && !unlockedSet.has(champion.name)
  );
}

/**
 * Filters unlocked champions
 */
export function filterUnlockedChampions(champions: Champion[], unlockedSet: Set<string>): Champion[] {
  return champions.filter(champion =>
    champion.unlockable === true && unlockedSet.has(champion.name)
  );
}

/**
 * Updates champion locked status based on unlocked set
 */
export function updateChampionLockStatus(champion: Champion, unlockedSet: Set<string>): Champion {
  if (champion.unlockable && unlockedSet.has(champion.name)) {
    return { ...champion, locked: false };
  }
  return champion;
}

/**
 * Generates search value for champion (includes name, traits, cost variations)
 */
export function generateChampionSearchValue(champion: Champion, includeUnlockable: boolean = false): string {
  const base = `${champion.name} ${champion.traits.join(' ')} ${champion.cost}cost ${champion.cost}-cost`;
  const unlockablePart = includeUnlockable && champion.locked ? ' unlockable' : '';
  return base + unlockablePart;
}
