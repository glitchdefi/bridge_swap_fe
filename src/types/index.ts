/* eslint-disable camelcase */
import { BigNumber } from 'ethers'

export interface Transaction {
  fromNetwork: number | null
  toNetwork: number | null
  amount: {
    value: string
    hasError: boolean
  }
  fee: string
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

export type TransactionHistory = {
  amount: string
  business_fee_amount: string
  business_fee_percentage: string
  extrinsic_hash: string
  from_eth_address: string
  id: number
  net_amount: string
  to_glitch_address: string
  tx_eth_hash: string
  tx_glitch_hash: string
  glitch_timestamp: string
}

export interface TransferError {
  cause?: unknown
}

export interface Pagination {
  page: number
  limit: number
}
