import { useMemo } from 'react'
import { truncateAddress } from 'utils/strings'
import { useAccount, useEnsName } from 'wagmi'

export const useAddress = (): { address: string; shortAddress: string } => {
  const { address } = useAccount()
  //   const { data: ensName } = useEnsName({ address })

  return useMemo(() => {
    return {
      address,
      shortAddress: truncateAddress(address),
    }
  }, [address])
}
