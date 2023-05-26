import { AxiosResponse } from 'axios'
import { Request } from 'services/Request'

const getTxHistory = (address: string): AxiosResponse['data'] => {
  return Request.get(`transactionHistory/${address}`)
}

export { getTxHistory }
