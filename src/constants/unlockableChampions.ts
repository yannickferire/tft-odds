/**
 * Hardcoded list of unlockable champions for Set 16
 * This list is static and only needs to be updated when new unlockable champions are added
 *
 * Last updated: 2025-11-30
 * Source: https://raw.communitydragon.org/latest/cdragon/game/data/maps/shipping/map22/map22.bin.json
 *
 * Update schedule: Check for updates every Wednesday afternoon (GMT+1) after TFT patches
 *
 * To update this list:
 * 1. Run updateUnlockableChampions() from unlockableChampionsSet16.ts in browser console
 * 2. Copy the logged array from console
 * 3. Update the array below
 * 4. Update the "Last updated" date above
 */

/**
 * Helper function to normalize champion names for comparison
 * Removes spaces, apostrophes, ampersands, hyphens and converts to lowercase
 */
export const normalizeChampionName = (name: string): string => {
  return name.replace(/[' &-]/g, '').toLowerCase();
};

/**
 * Set of unlockable champion names (normalized)
 * Names are normalized by removing spaces, apostrophes, ampersands, hyphens and converting to lowercase
 */
export const UNLOCKABLE_CHAMPIONS_SET_16: Set<string> = new Set([
  'aatrox',
  'aurelionsol',
  'bard',
  'baronnashor',
  'brock',
  'darius',
  'diana',
  'fizz',
  'galio',
  'graves',
  'gwen',
  'kaisa',
  'kalista',
  'kennen',
  'kobukoyuumi',
  'leblanc',
  'mel',
  'nasus',
  'nidalee',
  'orianna',
  'poppy',
  'renekton',
  'riftherald',
  'ryze',
  'sett',
  'singed',
  'skarner',
  'sylas',
  'tahmkench',
  'thex',
  'thresh',
  'tryndamere',
  'veigar',
  'volibear',
  'warwick',
  'xerath',
  'yone',
  'yorick',
  'zaahen',
  'ziggs',
]);
