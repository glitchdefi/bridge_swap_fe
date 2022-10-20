import { BigNumber } from 'ethers'
import { fromWei, toBN, toWei } from 'web3-utils'

export function numberWithCommas(n: string | number): string {
  const parts = n?.toString()?.split('.')
  return parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? `.${parts[1]}` : '')
}

export const subtract = (n1: string, n2: string): string => {
  if (!n1 || !n2) {
    return '0'
  }

  return fromWei(toBN(toWei(n1)).sub(toBN(toWei(n2))))
}
