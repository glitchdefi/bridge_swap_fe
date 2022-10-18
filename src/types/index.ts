export interface Transaction {
  fromNetwork: number | null
  toNetwork: number | null
  amount: {
    value: string
    hasError: boolean
  }
}
