import { glitchChainId } from 'constants/supportedNetworks'

export const isGlitchChain = (chainId: number): boolean => {
  return glitchChainId === chainId
}
