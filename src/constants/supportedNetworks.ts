import { chain, Chain } from 'wagmi'

export const bscTestnet: Chain = {
  id: 97,
  name: 'Binance Smart Chain',
  network: 'BSC',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-2-s2.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
}

export const bscMainnet: Chain = {
  id: 56,
  name: 'Binance Smart Chain',
  network: 'BSC',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
}

// export const chains = [chain.mainnet, chain.goerli, bscTestnet, bscMainnet]
export const chains = [chain.goerli, bscTestnet]

export const ethereumChainIds = [1, 5]
export const bscChainIds = [56, 97]
export const glitchChainId = 42

// 1 - ETH mainnet
// 5 - ETH Goerli
// 56 - BSC Mainnet
// 97 - BSC Testnet
// 42 - GLCH
export const supportedChainIds = [...ethereumChainIds, glitchChainId]
