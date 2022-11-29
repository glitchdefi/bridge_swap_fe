/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useState } from 'react'
import { erc20ABI, useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { toHex, toWei } from 'web3-utils'

import ethSwapToBscABI from 'assets/jsons/eth_swap_bsc_abi.json'
import ethSwapToGlitchABI from 'assets/jsons/eth_swap_glitch_abi.json'
import bscSwapToEthABI from 'assets/jsons/bsc_swap_eth_abi.json'
import {
  BSC_BRIDGE_CONTRACT_ADDRESS,
  ETH_BRIDGE_CONTRACT_ADDRESS,
  GLITCH_BRIDGE_CONTRACT_ADDRESS,
  GLITCH_BSC_TOKEN_ADDRESS,
  GLITCH_ETH_TOKEN_ADDRESS,
  GLITCH_NATIVE_TOKEN_ADDRESS,
} from 'constants/index'
import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'
import { Transaction, TransactionReceipt } from 'types'
import { isEthereumChain } from 'utils/isEthereumChain'
import { isGlitchChain } from 'utils/isGlitchChain'

import { useAddress } from './useAddress'

export const useTransfer = (
  tx: Transaction,
  fee: string,
): {
  onTransfer: () => Promise<void>
  onApprove: () => Promise<void>
  allowanceRefetch: () => Promise<any>
  error: any
  approveProcess: 'approve' | 'confirmation' | null
  approvedData: TransactionReceipt
  isApprovedSuccess: boolean
  transferData: TransactionReceipt
  transferProcess: 'transfer' | 'confirmation' | null
  isTransferSuccess: boolean
} => {
  const { address } = useAddress()
  const { accountSelected: glitchAccountSelected } = usePolkadotApi()
  const { amount, fromNetwork, toNetwork } = tx

  const tokenContractAddress =
    isEthereumChain(fromNetwork) && !isGlitchChain(toNetwork)
      ? GLITCH_ETH_TOKEN_ADDRESS
      : isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
      ? GLITCH_NATIVE_TOKEN_ADDRESS
      : GLITCH_BSC_TOKEN_ADDRESS

  const bridgeContractAddress =
    isEthereumChain(fromNetwork) && !isGlitchChain(toNetwork)
      ? ETH_BRIDGE_CONTRACT_ADDRESS
      : isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
      ? GLITCH_BRIDGE_CONTRACT_ADDRESS
      : BSC_BRIDGE_CONTRACT_ADDRESS

  const transferContractInterface =
    isEthereumChain(fromNetwork) && !isGlitchChain(toNetwork)
      ? ethSwapToBscABI
      : isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
      ? ethSwapToGlitchABI
      : bscSwapToEthABI

  const transferFunctionName =
    isEthereumChain(fromNetwork) && !isGlitchChain(toNetwork)
      ? 'swapETH2BSC'
      : isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
      ? 'transferToGlitch'
      : 'swapBSC2ETH'

  // Check the approved status or not
  const { refetch: allowanceRefetch } = useContractRead({
    address: tokenContractAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as `0x${string}`, bridgeContractAddress],
    enabled: false,
  })

  // Config the approve contract
  const { config: approveConfig } = usePrepareContractWrite({
    address: tokenContractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [bridgeContractAddress, toHex(toWei(amount.value)) as any],
    overrides: {
      from: address as `0x${string}`,
    },
    enabled: false,
  })
  // Config transfer contract
  const { config: transferConfig } = usePrepareContractWrite({
    address: bridgeContractAddress,
    abi: transferContractInterface,
    functionName: transferFunctionName,
    args:
      isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
        ? [glitchAccountSelected, toHex(toWei(amount.value))]
        : [toHex(toWei(amount.value))],
    overrides: (isEthereumChain(fromNetwork) && isGlitchChain(toNetwork)
      ? {}
      : {
          from: address,
          value: fee,
        }) as any,
    enabled: false,
  })

  const { writeAsync: approveWriteAsync, error: approveError } = useContractWrite(approveConfig)
  const { writeAsync: transferWriteAsync, error: confirmTransferError } = useContractWrite(transferConfig)

  const [approveProcess, setApproveProcess] = useState<'approve' | 'confirmation' | null>(null)
  const [transferProcess, setTransferProcess] = useState<'transfer' | 'confirmation' | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [approveTxHash, setApproveTxHash] = useState<string | null>(null)

  const {
    data: transferData,
    error: transferError,
    isSuccess: isTransferSuccess,
  } = useWaitForTransaction({ hash: txHash as `0x${string}` })
  const {
    data: approvedData,
    error: approvedError,
    isSuccess: isApprovedSuccess,
  } = useWaitForTransaction({ hash: approveTxHash as `0x${string}` })

  const onTransfer = useCallback(async () => {
    try {
      // Start the transfer
      setTransferProcess('transfer')
      const txData = await transferWriteAsync?.()

      if (txData) {
        setTransferProcess('confirmation')
        setTxHash(txData?.hash)
      }
    } catch (error: any) {
      console.log('Transfer Error', error)
    }
  }, [transferWriteAsync])

  const onApprove = useCallback(async () => {
    try {
      setApproveProcess('approve')
      const txData = await approveWriteAsync?.()

      if (txData) {
        setApproveProcess('confirmation')
        setApproveTxHash(txData?.hash)
      }
    } catch (error: any) {
      console.log('Approved Error', error)
    }
  }, [approveWriteAsync])

  return {
    onTransfer,
    onApprove,
    allowanceRefetch,
    error: approveError || confirmTransferError || transferError || approvedError,
    approveProcess,
    approvedData,
    isApprovedSuccess,
    transferProcess,
    transferData,
    isTransferSuccess,
  }
}
