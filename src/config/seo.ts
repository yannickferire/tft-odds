import { DefaultSeoProps } from 'next-seo';
import { currentSet } from '@/constants/set';

export const defaultSeoConfig: DefaultSeoProps = {
  title: `TFT Odds - Set ${currentSet} Statistics, Probabilities & Rolling Calculator`,
  titleTemplate: "%s | TFT Odds",
  description: `Master Teamfight Tactics Set ${currentSet} with our advanced probability tools. Calculate rolling odds, analyze augment statistics, and discover drop rates to climb the ladder faster.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tftodds.com/',
    site_name: 'Teamfight Tactics Odds',
    images: [
      {
        url: 'https://tftodds.com/share.jpg',
        width: 1200,
        height: 630,
        alt: 'TFT Odds Share Image',
      },
    ],
  },
  twitter: {
    handle: '@tftodds',
    site: '@tftodds',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    }
  ]
};
