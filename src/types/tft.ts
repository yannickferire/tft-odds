export interface ChampionTrait {
  name: string;
  // Add other trait properties if known from API, but name seems primary usage
}

export interface Champion {
  name: string;
  cost: number;
  traits: string[]; // Based on usage in fetchChampions (champion.traits.length)
  apiName?: string;
  icon?: string;
  // Added by our transformation
  image: string;
  selected: boolean;
  unlockable?: boolean;
  locked?: boolean;
  championUrl: string; // intermediate field
  [key: string]: any; // Allow extra props from API
}

export interface Trait {
  name: string;
  icon: string;
  apiName?: string;
  // Added by our transformation
  image?: string;
  selected?: boolean;
  [key: string]: any;
}

export interface TFTSetData {
  champions: Champion[];
  traits: Trait[];
}

export interface TFTAPIData {
  sets: {
    [key: number]: TFTSetData;
  };
}
