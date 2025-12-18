import { currentSet } from '@/constants/set';

export interface PageMetadata {
  title?: string;
  description: string;
}

export const PAGE_METADATA: Record<string, PageMetadata> = {
  '/rolling-odds': {
    title: 'Rolling Odds Tool',
    description: 'Calculate your probability of hitting units based on your level and gold.',
  },
  '/data/carousel-odds': {
    title: 'Carousel Odds',
    description: `Discover the Carousel odds. View complete items and components you can have at each stage`,
  },
  '/encounters': {
    title: 'Encounters',
    description: 'Explore all Set 16 encounters and their effects on the game.',
  },
  '/augments/augments-simulator': {
    title: 'Augments Simulator',
    description: 'Practice your augment choices and simulate probability.',
  },
  '/augments/augments-distribution': {
    title: 'Augments Distribution',
    description: 'View statistics on how often augments appear.',
  },
  '/augments/augments-tables': {
    title: 'Augments Tables',
    description: 'Complete list of all augments structured by tier.',
  },
  '/traits/ixtal-cashout': {
    title: 'Ixtal Cashout',
    description: 'See the loot tables for the Ixtal trait.',
  },
  '/traits/yordle-bags': {
    title: 'Yordle Bags',
    description: 'Discover what items Yordles can bring you.',
  },
  '/data/shops-odds': {
    title: 'Shop Odds',
    description: 'Detailed breakdown of shop probabilities by level.',
  },
  '/data/champion-bags': {
    title: 'Champion Bags',
    description: 'Number of copies of each champion in the pool.',
  },
  '/augments/warpath': {
    title: 'Warpath Augment',
    description: 'Detailed stats and information about the Warpath augment.',
  }
};
