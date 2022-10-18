import { SUPPORTED_NETWORK } from 'constants/index'

export const checkUnsupportedChain = (chainId: number): boolean => {
  const isUnSupported = SUPPORTED_NETWORK.findIndex((n) => n.chainIds.includes(chainId)) <= -1
  return isUnSupported
}
