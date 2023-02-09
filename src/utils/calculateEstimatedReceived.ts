import { SUBSIDIZE_FLAG } from 'constants/index'
import { subtract } from './numbers'
import { calculateEstimatedFee } from './calculateEstimatedFee'

export const calculateEstimatedReceived = (amount: string, txFee: string): string => {
  if (SUBSIDIZE_FLAG === 'true') {
    return subtract(amount, txFee)
  }

  return subtract(amount, calculateEstimatedFee(txFee, amount))
}
