/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useContractRead } from 'wagmi'
import web3Utils from 'web3-utils'

import ethSwapBscABI from 'assets/jsons/eth_swap_bsc_abi.json'
import bscSwapEthABI from 'assets/jsons/bsc_swap_eth_abi.json'
import { BSC_BRIDGE_CONTRACT_ADDRESS, ETH_BRIDGE_CONTRACT_ADDRESS } from 'constants/index'

import { numberWithCommas } from 'utils/numbers'
import { isEthereumChain } from 'utils/isEthereumChain'

export const useFetchEstimatedFee = (chainId: number) => {
  const tokenAddress = isEthereumChain(chainId) ? ETH_BRIDGE_CONTRACT_ADDRESS : BSC_BRIDGE_CONTRACT_ADDRESS
  const abi = isEthereumChain(chainId) ? ethSwapBscABI : bscSwapEthABI

  const { data, isLoading } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: abi,
    functionName: 'swapFee',
    enabled: !!chainId,
  })

  return {
    fee: data ? data.toString() : '0',
    formattedFee: data ? numberWithCommas(web3Utils.fromWei(data.toString())) : '0',
    isLoading,
  }
}
