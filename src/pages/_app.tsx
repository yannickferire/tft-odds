import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { AuroraBackground } from '@/components/ui/aurora-background';

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from '@/components/layout/_layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 min
      cacheTime: 10 * 60 * 1000, // 10 minutes - cache is kept for 10 min
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5955862670449423" crossOrigin="anonymous"></script>
      </Head>
      <AuroraBackground opacity={(isHomePage ? 40 : 10 )}>  
          <Layout>
            <Component {...pageProps} />
            <Analytics />
            <ReactQueryDevtools />
          </Layout>
      </AuroraBackground>
   </QueryClientProvider>
  )
}
