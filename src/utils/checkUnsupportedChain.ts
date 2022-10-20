import { supportedChainIds } from 'constants/supportedNetworks'

export const checkUnsupportedChain = (chainId: number): boolean => {
  const isUnSupported = !supportedChainIds.includes(chainId)
  return isUnSupported
}
