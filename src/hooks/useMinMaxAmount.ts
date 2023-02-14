/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useContractRead } from 'wagmi'
import web3Utils from 'web3-utils'

import ethSwapGlitchABI from 'assets/jsons/eth_swap_glitch_abi.json'
import { GLITCH_BRIDGE_CONTRACT_ADDRESS } from 'constants/index'

export const useMinMaxAmount = (props?: { enabled?: boolean }) => {
  const { enabled = true } = props || {}

  const tokenAddress = GLITCH_BRIDGE_CONTRACT_ADDRESS
  const abi = ethSwapGlitchABI

  const {
    data: minAmount,
    isLoading: isMinAmountLoading,
    refetch: minAmountRefetch,
  } = useContractRead({
    address: tokenAddress,
    abi,
    functionName: 'minAmount',
    enabled,
  })

  const {
    data: maxAmount,
    isLoading: isMaxAmountLoading,
    refetch: maxAmountRefetch,
  } = useContractRead({
    address: tokenAddress,
    abi,
    functionName: 'maxAmount',
    enabled,
  })

  return {
    minAmount: minAmount ? minAmount.toString() : '0',
    maxAmount: maxAmount ? maxAmount.toString() : '0',
    formatted: {
      minAmount: minAmount ? Number(web3Utils.fromWei(minAmount.toString())) : '0',
      maxAmount: maxAmount ? Number(web3Utils.fromWei(maxAmount.toString())) : '0',
    },
    minAmountRefetch,
    maxAmountRefetch,
    isLoading: isMinAmountLoading || isMaxAmountLoading,
  }
}
