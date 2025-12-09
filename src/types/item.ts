/**
 * Item type definition based on CdragonAPI structure
 */
export interface Item {
  name: string;
  apiName: string;
  desc: string | null;
  icon: string;
  effects: Record<string, number>;
  composition: string[];
  tags: string[];
  associatedTraits: string[];
  unique: boolean;
  // Computed fields
  imageUrl?: string;
  isComponent?: boolean;
  isConsumable?: boolean;
  isCompleted?: boolean;
}

/**
 * Simplified item type for display purposes
 */
export interface ItemDisplay {
  name: string;
  description: string;
  imageUrl: string;
  type: 'component' | 'completed' | 'consumable' | 'support' | 'artifact' | 'other';
  effects?: string[];
}
