import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// Styles
import { GlobalStyles } from 'styles/GlobalStyles'
import { ThemeProvider } from 'styles/theme/themeContext'

// Constants
import { bscTestnet, chains } from 'constants/supportedNetworks'

// Context
import { LanguageProvider } from 'contexts/Localization'

import { Container } from 'components/Layout'

import 'styles/css/tailwindcss.css'
import 'react-toastify/dist/ReactToastify.css'

const PolkadotApiProvider = dynamic(() => import('contexts/PolkadotApi/Provider'), { ssr: false })
const App = dynamic(() => import('views/App'), { ssr: false })

// const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? ErrorBoundary : Fragment

const { provider, webSocketProvider } = configureChains(chains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID, stallTimeout: 1000, priority: 0 }),
  publicProvider({ stallTimeout: 1000, priority: 2 }),
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id !== bscTestnet.id) return null
      return { http: chain.rpcUrls.default }
    },
  }),
])

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
        <PolkadotApiProvider>
          <LanguageProvider>
            <GlobalStyles />
            <ThemeProvider>
              <Container>
                <App {...props} />
              </Container>
            </ThemeProvider>
          </LanguageProvider>
          <ToastContainer theme="dark" icon={false} />
        </PolkadotApiProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
