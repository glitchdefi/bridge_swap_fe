import { ethereumChainIds } from 'constants/supportedNetworks'

export const isEthereumChain = (chainId: number): boolean => {
  return ethereumChainIds.includes(chainId)
}
