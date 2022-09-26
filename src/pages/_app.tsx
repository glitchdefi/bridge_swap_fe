import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import 'styles/css/tailwindcss.css'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalStyles } from 'styles/GlobalStyles'
import { LanguageProvider } from 'contexts/Localization'
import { Header } from 'components/Header'
import { ThemeProvider } from 'styles/theme/themeContext'

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
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

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

      <LanguageProvider>
        <GlobalStyles />
        <ThemeProvider>
          <App {...props} />
        </ThemeProvider>
      </LanguageProvider>
      <ToastContainer theme="dark" />
    </>
  )
}

export default MyApp
