import '../styles/globals.css'

import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import defaultSEO from '../utils/defaultSEO'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <ThemeProvider attribute="class">
        {Component.getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  )
}

export default MyApp
