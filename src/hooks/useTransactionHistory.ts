/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import ethSwapToGlitchABI from 'assets/jsons/eth_swap_glitch_abi.json'
import { GLITCH_BRIDGE_CONTRACT_ADDRESS } from 'constants/index'
import web3Utils from 'web3-utils'
import { TransactionHistory } from 'types'

const RPC_URL = `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
const INITIAL_BLOCK = 8130945

export const useTransactionHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [historyTransactions, setHistoryTransactions] = useState<TransactionHistory[]>([])

  const fetchTransactionHistory = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
    const bridgeContract = new ethers.Contract(GLITCH_BRIDGE_CONTRACT_ADDRESS, ethSwapToGlitchABI, provider)
    const events = await bridgeContract.queryFilter('TransferToGlitch', INITIAL_BLOCK, 'latest')
    const transformEvents = events.map((event) => {
      const [from, to, amount] = event.args
      return {
        from: from?.trim(),
        to: to?.trim(),
        amount: web3Utils.fromWei(amount?.toString()),
        time: '',
      }
    })
    setHistoryTransactions(transformEvents)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchTransactionHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoading, historyTransactions }
}
