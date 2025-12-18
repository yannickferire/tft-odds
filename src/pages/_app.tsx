import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
import { defaultSeoConfig } from '@/config/seo';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  // Calculate canonical URL
  const canonicalUrl = `https://tftodds.com${router.asPath === '/' ? '' : router.asPath.split('?')[0]}`;

  return (
    <QueryClientProvider client={queryClient}>
      <CookieConsentProvider>
        <DefaultSeo
          {...defaultSeoConfig}
          canonical={canonicalUrl}
        />
        <GoogleAds />
        <AuroraBackground opacity={(isHomePage ? 40 : 10)}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
            <ReactQueryDevtools />
          </Layout>
          <CookieConsent />
        </AuroraBackground>
      </CookieConsentProvider>
    </QueryClientProvider>
  )
}
