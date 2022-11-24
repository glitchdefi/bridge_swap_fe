import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSwitchNetwork as useWagmiSwitchNetwork } from 'wagmi'

import { Toast } from 'components/Toast'

export const useSwitchNetwork = (): {
  switchNetwork: (chainId_?: number) => void
  isLoading?: boolean
  pendingChainId?: number
} => {
  const { switchNetwork, isLoading, pendingChainId, error } = useWagmiSwitchNetwork()

  useEffect(() => {
    if (error) {
      const message = error?.message?.includes('user rejected transaction')
        ? 'User rejected transaction'
        : error?.message || 'An error occurred. Please try again'

      toast(<Toast type="error" message={message} />, {
        type: 'error',
      })
    }
  }, [error])

  return { switchNetwork, isLoading, pendingChainId }
}
