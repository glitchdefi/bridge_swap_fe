import { subtract } from 'utils/numbers'
import { fromWei } from 'web3-utils'

export const calculateNetAmount = (amount: string, businessFee: string): string => {
  if (!amount) return '0'

  return subtract(fromWei(amount), fromWei(businessFee))
}
