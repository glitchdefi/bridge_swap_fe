/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useCallback, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Pagination, TransactionHistory } from 'types'
import { fetcher } from 'services/swr.utils'

export const useTransactionHistory = (address: string) => {
  const { isMutating, data, trigger } = useSWRMutation(address ? `/transactionHistory/${address}` : null, fetcher)

  const [pagination, setPagination] = useState<Pagination>({ page: 0, limit: 5 })
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([])
  const [hasNext, setHasNext] = useState<boolean>(true)

  useEffect(() => {
    if (!isMutating && data?.length) {
      setTransactionHistory(data)
      setHasNext(true)
    } else {
      setHasNext(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMutating])

  useEffect(() => {
    if (address) {
      setPagination({ page: 0, limit: 5 })
      setTransactionHistory([])
      trigger({ page: 0, limit: 5 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const onPageChange = useCallback(
    async (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
      await trigger({ ...pagination, page })
    },
    [trigger, pagination],
  )

  return { isLoading: isMutating, transactionHistory, hasNext, pagination, onPageChange }
}
