import { DefaultSeoProps } from 'next-seo';
import { currentSet } from '@/constants/set';

export const defaultSeoConfig: DefaultSeoProps = {
  title: `Teamfight Tactics Odds – TFT Set ${currentSet} probabilities tools`,
  titleTemplate: "%s | TFT Odds",
  description: "Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder.",
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
