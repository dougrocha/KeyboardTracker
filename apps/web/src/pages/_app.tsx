import "../styles/global.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { NextPage } from "next"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import type { ReactElement, ReactNode } from "react"

import defaultSEO from "../utils/defaultSEO"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          {Component.getLayout ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
