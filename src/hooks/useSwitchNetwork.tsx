import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { chain, useSwitchNetwork as useWagmiSwitchNetwork } from 'wagmi'

import { Toast } from 'components/Toast'
import { isDevelopment } from 'constants/index'

export const useSwitchNetwork = (): {
  switchNetwork: () => void
  isLoading?: boolean
  pendingChainId?: number
} => {
  const { switchNetwork, isLoading, pendingChainId, error } = useWagmiSwitchNetwork()

  useEffect(() => {
    if (error) {
      const message = error?.message?.includes('user rejected transaction')
        ? 'User rejected transaction'
        : error?.message?.includes('Error switching chain')
        ? 'Switching chain already pending on Metamask'
        : error?.message || 'An error occurred. Please try again'

      toast(<Toast type="error" message={message} />, {
        type: 'error',
      })
    }
  }, [error])

  const _switchNetwork = useCallback(() => {
    switchNetwork(isDevelopment ? chain.goerli.id : chain.mainnet.id)
  }, [switchNetwork])

  return { switchNetwork: _switchNetwork, isLoading, pendingChainId }
}
