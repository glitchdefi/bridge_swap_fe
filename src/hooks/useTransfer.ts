/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useState } from 'react'
import { erc20ABI, useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { toHex, toWei, fromWei } from 'web3-utils'

import ethSwapToBscABI from 'assets/jsons/eth_swap_bsc_abi.json'
import bscSwapToEthABI from 'assets/jsons/bsc_swap_eth_abi.json'
import {
  BSC_BRIDGE_CONTRACT_ADDRESS,
  ETH_BRIDGE_CONTRACT_ADDRESS,
  GLITCH_BSC_TOKEN_ADDRESS,
  GLITCH_ETH_TOKEN_ADDRESS,
} from 'constants/index'
import { Transaction, TransactionReceipt } from 'types'
import { isEthereumChain } from 'utils/isEthereumChain'

import { useAddress } from './useAddress'

export const useTransfer = (
  tx: Transaction,
  fee: string,
): {
  onTransfer: () => Promise<void>
  data: TransactionReceipt
  error: any
  process: 'approve' | 'transfer' | 'confirmation' | null
  isSuccess: boolean
} => {
  const { address } = useAddress()
  const { amount, fromNetwork } = tx

  const tokenContractAddress = isEthereumChain(fromNetwork) ? GLITCH_ETH_TOKEN_ADDRESS : GLITCH_BSC_TOKEN_ADDRESS
  const bridgeContractAddress = isEthereumChain(fromNetwork) ? ETH_BRIDGE_CONTRACT_ADDRESS : BSC_BRIDGE_CONTRACT_ADDRESS
  const transferContractInterface = isEthereumChain(fromNetwork) ? ethSwapToBscABI : bscSwapToEthABI
  const transferFunctionName = isEthereumChain(fromNetwork) ? 'swapETH2BSC' : 'swapBSC2ETH'

  // Check the approved status or not
  const { refetch: allowanceRefetch } = useContractRead({
    addressOrName: tokenContractAddress,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [address, bridgeContractAddress],
    enabled: false,
  })

  // Config the approve contract
  const { config: approveConfig } = usePrepareContractWrite({
    addressOrName: tokenContractAddress,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [bridgeContractAddress, toHex(toWei(amount.value))],
    overrides: {
      from: address,
    },
  })
  // Config transfer contract
  const { config: transferConfig } = usePrepareContractWrite({
    addressOrName: bridgeContractAddress,
    contractInterface: transferContractInterface,
    functionName: transferFunctionName,
    args: [toHex(toWei(amount.value))],
    overrides: {
      from: address,
      value: fee,
    },
  })

  const { writeAsync: approveWriteAsync, error: approveError } = useContractWrite(approveConfig)
  const { writeAsync: transferWriteAsync, error: confirmTransferError } = useContractWrite(transferConfig)

  const [txHash, setTxHash] = useState<string | null>(null)
  const [process, setProcess] = useState<'approve' | 'transfer' | 'confirmation' | null>(null)

  const { data, error: transferError, isSuccess } = useWaitForTransaction({ hash: txHash })

  const onTransfer = useCallback(async () => {
    try {
      const allowanceResult = await allowanceRefetch()
      const allowance = fromWei(allowanceResult.data.toString())

      // If not approved, ask to approve
      if (!Number(allowance)) {
        setProcess('approve')
        await approveWriteAsync?.()
      }

      // Start the transfer
      setProcess('transfer')
      const txData = await transferWriteAsync?.()

      setProcess('confirmation')
      setTxHash(txData.hash)
    } catch (error: unknown) {
      // error
    }
  }, [allowanceRefetch, transferWriteAsync, approveWriteAsync])

  return {
    onTransfer,
    data,
    error: approveError || confirmTransferError || transferError,
    process,
    isSuccess,
  }
}
