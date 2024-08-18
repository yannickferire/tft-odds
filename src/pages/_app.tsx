import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from '@/components/layout/_layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="ezoic-site-verification" content="g1Z9B6z7ZdSh1I2ytsxu67eOj6djdK" />
      </Head>
      <div className="w-full xl:container px-5 pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col min-h-screen">
        <Layout>
          <Component {...pageProps} />
          <Analytics />
          <ReactQueryDevtools />
        </Layout>
      </div>
   </QueryClientProvider>
  )
}
