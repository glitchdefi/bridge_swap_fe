import React, { Fragment } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Lottie from 'lottie-react'

import loadingJson from 'assets/jsons/loading.json'

import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'

// Components
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment

  const { isApiConnected, isApiInitialized } = usePolkadotApi()

  return (
    <>
      <Layout>
        {!isApiConnected || !isApiInitialized ? (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <Lottie className="w-[120px] h-[120px]" animationData={loadingJson} autoPlay loop />
            <div className="text-primary">Initializing connection ...</div>
          </div>
        ) : (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </Layout>
    </>
  )
}

export default App
