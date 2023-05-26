/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useMemo } from 'react'
import useSWRMutation from 'swr/mutation'
import { TransactionHistory } from 'types'
import { fetcher } from 'services/swr.utils'

export const useTransactionHistory = (address: string) => {
  const { isMutating, data, trigger } = useSWRMutation(address ? `/transactionHistory/${address}` : null, fetcher)

  const historyTransactions = useMemo(
    () => data?.sort((a: TransactionHistory, b: TransactionHistory) => b.id - a.id) as unknown as TransactionHistory[],
    [data],
  )

  useEffect(() => {
    if (address) trigger({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return { isLoading: isMutating, historyTransactions }
}
