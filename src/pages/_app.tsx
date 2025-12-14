import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Script from 'next/script';

import { useRouter } from 'next/router';

import { AuroraBackground } from '@/components/ui/aurora-background';

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from '@/components/layout/_layout';
import { CookieConsentProvider, useCookieConsent } from '@/context/CookieConsentContext';
import { CookieConsent } from '@/components/CookieConsent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 min
      cacheTime: 10 * 60 * 1000, // 10 minutes - cache is kept for 10 min
    },
  },
})



const GoogleAds = () => {
  const { consent } = useCookieConsent();

  if (!consent.marketing) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5955862670449423"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <CookieConsentProvider>
        <DefaultSeo
          title="Teamfight Tactics Odds – TFT Set 13 probabilities tools"
          description="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder."
          openGraph={{
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
          }}
          twitter={{
            handle: '@tftodds',
            site: '@tftodds',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            }
          ]}
        />
        <GoogleAds />
        <AuroraBackground opacity={(isHomePage ? 40 : 10)}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
            <ReactQueryDevtools />
          </Layout>
          <CookieConsent />
        </AuroraBackground>
      </CookieConsentProvider>
    </QueryClientProvider>
  )
}
