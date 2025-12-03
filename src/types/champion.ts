export interface Champion {
  name: string;
  cost: number;
  traits: string[];
  image: string;
  championUrl: string;
  selected: boolean;
  unlockable?: boolean;
  locked?: boolean;
}
