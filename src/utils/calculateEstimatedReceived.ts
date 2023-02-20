import { subtract } from './numbers'
import { calculateEstimatedFee } from './calculateEstimatedFee'

export const calculateEstimatedReceived = (amount: string, txFee: string): string => {
  return subtract(amount, calculateEstimatedFee(txFee, amount))
}
