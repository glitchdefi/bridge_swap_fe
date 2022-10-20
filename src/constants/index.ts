// const IS_DEV = process.env.NODE_ENV !== 'production'

export const CHAIN_IDS = {
  BSC: {
    TESTNET: 97,
    MAINNET: 56,
  },
  ETH: {
    TESTNET: 5,
    MAINNET: 1,
  },
}

export const NETWORK_DROPDOWN = {
  eth: {
    value: [1, 5],
    label: 'Ethereum',
  },
  bsc: {
    value: [56, 97],
    label: 'Binance Smart Chain',
  },
}

export const SUPPORTED_NETWORK = [
  {
    chainIds: [1, 5],
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
export const GLITCH_ETH_TOKEN_ADDRESS = '0x9F720F007b9d9169c4481CeaA2fA82fdfec0b21F'
export const ETH_BRIDGE_CONTRACT_ADDRESS = '0xEd51cCd8b9DDc59e71E692C142702e3ec5738bd4'
export const GLITCH_BSC_TOKEN_ADDRESS = '0xC29c28Ef6eC433076C5e0BCbAFcC033537b48B0b'
export const BSC_BRIDGE_CONTRACT_ADDRESS = '0x2700d71C5FCfd5109f6997Aaf6A6e1B47ED0E717'
