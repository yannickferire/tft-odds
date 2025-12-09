import { Item } from '@/types/item';
import { apiURL, currentSet, fetchChampionsURL, gameURL } from '@/constants/set';

/**
 * Fetches all items from CdragonAPI and processes them
 * Returns items categorized by type (components, completed, consumables, etc.)
 */
export async function fetchItems(): Promise<{
  allItems: Item[];
  components: Item[];
  completedItems: Item[];
  consumables: Item[];
  supports: Item[];
}> {
  try {
    const response = await fetch(fetchChampionsURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    const data = await response.json();
    const rawItems = data.items || [];

    // Process items
    const processedItems: Item[] = rawItems
      .filter((item: any) =>
        item.name &&
        item.apiName &&
        // Filter for Set 16 items and universal items
        (item.apiName.includes(`TFT${currentSet}_`) ||
         item.apiName.startsWith('TFT_Item_') ||
         item.apiName.startsWith('TFT_Consumable_') ||
         item.apiName.includes('_Consumable_') || // Include consumables from all sets (TFT9_Consumable_, etc.)
         item.apiName.includes('_Item_') || // Include items from all sets (TFT5_Item_ThiefsGlovesRadiant, etc.)
         item.apiName.startsWith('TFT_Assist_'))
      )
      .map((item: any) => {
        const processedItem: Item = {
          name: item.name,
          apiName: item.apiName,
          desc: item.desc || null,
          icon: item.icon,
          effects: item.effects || {},
          composition: item.composition || [],
          tags: item.tags || [],
          associatedTraits: item.associatedTraits || [],
          unique: item.unique || false,
        };

        // Compute image URL
        if (item.icon) {
          processedItem.imageUrl = `${gameURL}/${item.icon.toLowerCase().replace('.tex', '.png')}`;
        }

        // Determine item type
        processedItem.isComponent = item.tags?.includes('component') || false;
        processedItem.isConsumable = item.tags?.includes('Consumable') || item.apiName.includes('Consumable') || false;
        processedItem.isCompleted = item.composition && item.composition.length > 0;

        return processedItem;
      });

    // Categorize items
    const components = processedItems.filter(item => item.isComponent);
    const completedItems = processedItems.filter(item => item.isCompleted);
    const consumables = processedItems.filter(item => item.isConsumable);

    // Support items are those without components that aren't consumables or components
    const supports = processedItems.filter(
      item => !item.isComponent && !item.isCompleted && !item.isConsumable && item.apiName.startsWith('TFT_Item_')
    );

    return {
      allItems: processedItems,
      components,
      completedItems,
      consumables,
      supports,
    };
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

/**
 * Helper function to get a specific item by name or apiName
 * STRICT matching only - returns undefined if no exact match
 * Prioritizes components (TFT_Item_*) over assist items (TFT_Assist_*)
 */
export function findItemByName(items: Item[], searchName: string): Item | undefined {
  const normalizedSearch = searchName.toLowerCase().trim();

  // Find all exact name matches
  const exactNameMatches = items.filter(item =>
    item.name.toLowerCase().trim() === normalizedSearch
  );

  if (exactNameMatches.length > 0) {
    // Prioritize TFT_Item_* (components) over TFT_Assist_* (rewards)
    const componentMatch = exactNameMatches.find(item =>
      item.apiName.startsWith('TFT_Item_')
    );
    if (componentMatch) return componentMatch;

    // If no TFT_Item_, return the first match
    return exactNameMatches[0];
  }

  // Try exact apiName match (remove spaces and special chars)
  const searchApiName = normalizedSearch.replace(/[\s'-]/g, '').toLowerCase();
  const exactApiMatch = items.find(item => {
    const itemApiName = item.apiName.toLowerCase();
    // Extract the item name part after TFT_Item_, TFT_Consumable_, etc.
    const itemNamePart = itemApiName.split('_').pop() || '';
    return itemNamePart === searchApiName;
  });

  return exactApiMatch;
}

// Precompiled regex patterns for better performance
const HTML_CLEANUP_PATTERNS = [
  { regex: /<br\s*\/?>/gi, replacement: '\n' },
  { regex: /<tftitemrules>/gi, replacement: '\n' },
  { regex: /<\/tftitemrules>/gi, replacement: '' },
  { regex: /<TFTBonus>/gi, replacement: '' },
  { regex: /<\/TFTBonus>/gi, replacement: '' },
  { regex: /<TFTRadiantItemBonus>/gi, replacement: '' },
  { regex: /<\/TFTRadiantItemBonus>/gi, replacement: '' },
  { regex: /<active>/gi, replacement: '' },
  { regex: /<\/active>/gi, replacement: '' },
  { regex: /<rules>/gi, replacement: '' },
  { regex: /<\/rules>/gi, replacement: '' },
  { regex: /<\/?[^>]+(>|$)/g, replacement: '' }, // Remove any remaining HTML tags
  { regex: /@[^@]+@/g, replacement: '' }, // Remove unreplaced Riot variables
  { regex: /\n{2,}/g, replacement: '\n' }, // Replace multiple newlines
];

/**
 * Helper function to clean HTML tags from item descriptions and replace template variables
 */
export function cleanItemDescription(desc: string | null, effects?: Record<string, number>): string {
  if (!desc) return '';

  let cleanedDesc = desc;

  // Replace template variables with actual values from effects
  if (effects) {
    Object.entries(effects).forEach(([key, value]) => {
      // Skip internal keys like {27d80030}
      if (key.startsWith('{')) return;

      // Replace @KeyName@ or @KeyName*100@ with the value
      const regex = new RegExp(`@${key}(@|\\*100@)`, 'g');
      cleanedDesc = cleanedDesc.replace(regex, () => value.toString());
    });
  }

  // Apply all HTML cleanup patterns
  for (const { regex, replacement } of HTML_CLEANUP_PATTERNS) {
    cleanedDesc = cleanedDesc.replace(regex, replacement);
  }

  return cleanedDesc.trim();
}

/**
 * Maps common item names from encounters to their exact CdragonAPI item names
 * ONLY add mappings for items that EXIST in the API
 * If an item doesn't exist in the API, DON'T add it here - it will display without tooltip
 */
export const ITEM_NAME_MAPPINGS: Record<string, string> = {
  // Components - these exist in API
  "B.F. Sword": "B.F. Sword",
  "Chain Vest": "Chain Vest",
  "Giant's Belt": "Giant's Belt",
  "Needlessly Large Rod": "Needlessly Large Rod",
  "Negatron Cloak": "Negatron Cloak",
  "Recurve Bow": "Recurve Bow",
  "Sparring Gloves": "Sparring Gloves",
  "Tear of the Goddess": "Tear of the Goddess",
  "Spatula": "Spatula",

  // Consumables - these exist in API
  "Reforger": "Reforger",
  "Champion Duplicator": "Champion Duplicator",
  "Magnetic Remover": "Magnetic Remover",
  "Golden Item Remover": "Golden Item Remover",
  "Tactician's Crown": "Tactician's Crown",
  "Masterwork Upgrade": "Masterwork Upgrade",

  // Emblems - Set 16
  "Ixtal Emblem": "Ixtal Emblem",

  // Completed Items - common ones
  "Deathblade": "Deathblade",
  "Infinity Edge": "Infinity Edge",
  "Giant Slayer": "Giant Slayer",
  "Bloodthirster": "Bloodthirster",
  "Hand of Justice": "Hand of Justice",
  "Rabadon's Deathcap": "Rabadon's Deathcap",
  "Hextech Gunblade": "Hextech Gunblade",
  "Spear of Shojin": "Spear of Shojin",
  "Jeweled Gauntlet": "Jeweled Gauntlet",
  "Guardbreaker": "Guardbreaker",
  "Quicksilver": "Quicksilver",
  "Thief's Gloves": "Thief's Gloves",
  "Radiant Thief's Gloves": "Radiant Thief's Gloves",
};
