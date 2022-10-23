import { BigNumber } from 'ethers'

export interface Transaction {
  fromNetwork: number | null
  toNetwork: number | null
  amount: {
    value: string
    hasError: boolean
  }
}

export interface TransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  root?: string
  gasUsed: BigNumber
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: Array<Log>
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: BigNumber
  effectiveGasPrice: BigNumber
  byzantium: boolean
  type: number
  status?: number
}

export interface Log {
  blockNumber: number
  blockHash: string
  transactionIndex: number

  removed: boolean

  address: string
  data: string

  topics: Array<string>

  transactionHash: string
  logIndex: number
}

export interface TransferError {
  cause?: unknown
}
