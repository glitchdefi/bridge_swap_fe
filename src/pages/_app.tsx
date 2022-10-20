import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// Styles
import { GlobalStyles } from 'styles/GlobalStyles'
import { ThemeProvider } from 'styles/theme/themeContext'

// Constants
import { chains } from 'constants/supportedNetworks'

// Context
import { LanguageProvider } from 'contexts/Localization'

// Components
// import { Header } from 'components/Header'
import { Container } from 'components/Layout'
import { Footer } from 'components/Footer'

import 'styles/css/tailwindcss.css'
import 'react-toastify/dist/ReactToastify.css'

const Header = dynamic(() => import('components/Header/Header'), { ssr: false })

// const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? ErrorBoundary : Fragment

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </Layout>
    </>
  )
}

const { provider, webSocketProvider } = configureChains(chains, [publicProvider()])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const MyApp: React.FC<AppProps> = (props) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="description" content="Glitch Bridge" />
        <meta name="theme-color" content="#1FC7D4" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="Glitch Bridge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glitch Bridge" />
        <title>Glitch Bridge</title>
      </Head>

      <WagmiConfig client={client}>
        <LanguageProvider>
          <GlobalStyles />
          <ThemeProvider>
            <App {...props} />
          </ThemeProvider>
        </LanguageProvider>
        <ToastContainer theme="dark" icon={false} />
      </WagmiConfig>
    </>
  )
}

export default MyApp
