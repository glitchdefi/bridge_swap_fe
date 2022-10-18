// const IS_DEV = process.env.NODE_ENV !== 'production'

export const CHAIN_IDS = {
  BSC: {
    TESTNET: 97,
    MAINNET: 56,
  },
  ETH: {
    TESTNET: 3,
    MAINNET: 1,
  },
}

export const NETWORK_DROPDOWN = {
  eth: {
    value: [1, 3],
    label: 'Ethereum',
  },
  bsc: {
    value: [56, 97],
    label: 'Binance Smart Chain',
  },
}

export const SUPPORTED_NETWORK = [
  {
    chainIds: [1, 3],
    label: 'Ethereum',
    icon: './images/logo-eth.png',
  },
  {
    chainIds: [56, 97],
    label: 'Binance Smart Chain',
    icon: './images/logo-bnb.png',
  },
  {
    chainIds: [99, 99],
    label: 'Glitch',
    icon: './images/logo.png',
  },
]

export const MIN_AMOUNT = 100
export const MAX_AMOUNT = 40000
