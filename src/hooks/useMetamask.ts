import { useCallback } from 'react'
import { chain, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { bscMainnet, bscTestnet } from 'constants/supportedNetworks'

export const useMetamask = () => {
  const connector = new MetaMaskConnector({
    chains: [chain.mainnet, chain.ropsten, chain.goerli, bscTestnet, bscMainnet],
  })
  const { connect } = useConnect({ connector })
  const { disconnect } = useDisconnect()

  const onConnect = useCallback(() => {
    connect()
  }, [connect])

  const onDisconnect = useCallback(() => {
    disconnect()
  }, [disconnect])

  return { onConnect, onDisconnect }
}
