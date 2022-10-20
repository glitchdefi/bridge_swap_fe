/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react'
import { useNetwork, useContractRead } from 'wagmi'
import web3Utils from 'web3-utils'

import { GLITCH_ETH_TOKEN_ADDRESS, GLITCH_BSC_TOKEN_ADDRESS } from 'constants/index'
import erc20ABI from 'assets/jsons/erc20_abi.json'
import { isEthereumChain } from 'utils/isEthereumChain'

import { useAddress } from './useAddress'

export const useGlitchBalance = () => {
  const { address } = useAddress()
  const { chain } = useNetwork()

  const tokenAddress = isEthereumChain(chain?.id) ? GLITCH_ETH_TOKEN_ADDRESS : GLITCH_BSC_TOKEN_ADDRESS

  const { data, isError, isLoading, refetch } = useContractRead({
    addressOrName: address && tokenAddress ? tokenAddress : null,
    contractInterface: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  return useMemo(() => {
    return {
      data: {
        balance: data ? web3Utils.toWei(data.toString()) : '0',
        formattedBalance: data ? web3Utils.fromWei(data.toString()) : '0',
      },
      isError,
      isLoading,
      refetch,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
}
