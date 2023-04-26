import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from '@/components/layout/_layout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full xl:container px-5 pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col min-h-screen">
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </div>
   </QueryClientProvider>
  )
}
