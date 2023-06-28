import { mul, subtract } from 'utils/numbers'
import { fromWei } from 'web3-utils'

export const calculateNetAmount = (amount: string, businessFeePercentage: string): string => {
  if (!amount) return '0'

  if (!businessFeePercentage || businessFeePercentage === '0') {
    return fromWei(amount)
  }

  return subtract(
    fromWei(amount),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromWei(mul(fromWei(amount), `${(businessFeePercentage as any) / 100}`)?.split('.')?.[0]),
  )
}
