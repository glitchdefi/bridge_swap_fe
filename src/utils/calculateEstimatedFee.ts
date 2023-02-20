import { BUSINESS_FEE, SUBSIDIZE_FLAG } from 'constants/index'
import { add, mul, subtract } from './numbers'

export const calculateEstimatedFee = (txFee: string, amount: string): string => {
  if (!txFee || !amount) return ''

  if (SUBSIDIZE_FLAG === 'false') {
    return mul(amount, `${((BUSINESS_FEE as unknown as number) / 100)}`)
  }

  return add(`${(subtract(amount, txFee) as unknown as number) * ((BUSINESS_FEE as unknown as number) / 100)}`, txFee)
}

