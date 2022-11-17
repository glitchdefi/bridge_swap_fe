import { useContext } from 'react'
import { PolkadotApiContext, PolkadotContextApiTypes } from './Provider'

export const usePolkadotApi = (): PolkadotContextApiTypes => {
  return useContext(PolkadotApiContext)
}
