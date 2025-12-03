import { apiURL, currentSet } from "@/constants/set";
import { UNLOCKABLE_CHAMPIONS_SET_16, normalizeChampionName } from "@/constants/unlockableChampions";

/**
 * Returns the list of unlockable champions for Set 16
 * Uses a hardcoded list for performance (no network request needed)
 *
 * For Set 16, returns the static list of unlockable champions
 * For other sets, returns an empty set
 */
export async function fetchUnlockableChampions(): Promise<Set<string>> {
  // Only apply unlockable logic for Set 16
  if (currentSet !== 16) {
    return new Set();
  }

  // Return the hardcoded list (no network request)
  return UNLOCKABLE_CHAMPIONS_SET_16;
}

/**
 * Updates the list of unlockable champions by fetching from the API
 * This function should ONLY be called manually to update the hardcoded list
 *
 * Usage (in browser console):
 * ```javascript
 * import { updateUnlockableChampions } from '@/utils/unlockableChampionsSet16';
 * updateUnlockableChampions();
 * ```
 *
 * Or use this one-liner in browser console:
 * ```javascript
 * fetch('https://raw.communitydragon.org/latest/cdragon/game/data/maps/shipping/map22/map22.bin.json')
 *   .then(r => r.json())
 *   .then(data => {
 *     const unlockable = data['{8027689d}']?.mConstants;
 *     if (unlockable) {
 *       const names = Object.keys(unlockable)
 *         .map(k => k.replace('TFT16_', '').replace(/[' &-]/g, '').toLowerCase())
 *         .sort();
 *       console.log('📋 Unlockable champions:');
 *       console.log(JSON.stringify(names, null, 2));
 *       console.log(`\n🔒 Total: ${names.length} champions`);
 *     }
 *   });
 * ```
 *
 * @returns Promise<Set<string>> The updated list of unlockable champions
 */
export async function updateUnlockableChampions(): Promise<Set<string>> {
  const unlockableChampionNames: Set<string> = new Set();

  // Only apply unlockable logic for Set 16
  if (currentSet !== 16) {
    console.log("❌ Not Set 16, no unlockable champions to fetch");
    return unlockableChampionNames;
  }

  try {
    console.log("🔍 Fetching unlockable champions from API...");
    const mapResponse = await fetch(`${apiURL}/game/data/maps/shipping/map22/map22.bin.json`);
    const mapData = await mapResponse.json();
    const unlockableData = mapData["{8027689d}"];

    if (unlockableData?.mConstants) {
      Object.keys(unlockableData.mConstants).forEach(key => {
        const championName = key.replace('TFT16_', '');
        const normalizedName = normalizeChampionName(championName);
        unlockableChampionNames.add(normalizedName);
      });
    }

    // Log the array for easy copying to constants file
    const championsArray = Array.from(unlockableChampionNames).sort();
    console.log("📋 Copy this array to UNLOCKABLE_CHAMPIONS_SET_16 in constants/unlockableChampions.ts:");
    console.log(JSON.stringify(championsArray, null, 2));
    console.log(`\n🔒 Found ${championsArray.length} unlockable champions`);

    // Compare with current hardcoded list
    const currentList = Array.from(UNLOCKABLE_CHAMPIONS_SET_16).sort();
    const added = championsArray.filter(c => !currentList.includes(c));
    const removed = currentList.filter(c => !championsArray.includes(c));

    if (added.length > 0) {
      console.log(`\n➕ New unlockable champions (${added.length}):`, added);
    }
    if (removed.length > 0) {
      console.log(`\n➖ Removed unlockable champions (${removed.length}):`, removed);
    }
    if (added.length === 0 && removed.length === 0) {
      console.log("\n✅ List is up to date! No changes detected.");
    }
  } catch (error) {
    console.error("❌ Failed to fetch unlockable champions data:", error);
  }

  return unlockableChampionNames;
}
