import { useCallback, useEffect } from 'react'
import { useConnect, useDisconnect } from 'wagmi'
import { toast } from 'react-toastify'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { Toast } from 'components/Toast'

export const useMetamask = (): {
  onConnect: () => void
  onDisconnect: () => void
} => {
  const connector = new MetaMaskConnector()
  const { connect, error } = useConnect({ connector })
  const { disconnect } = useDisconnect()

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

  const onConnect = useCallback(() => {
    connect()
  }, [connect])

  const onDisconnect = useCallback(() => {
    disconnect()
  }, [disconnect])

  return { onConnect, onDisconnect }
}
