import { AxiosResponse } from 'axios'
import { Request } from './Request'

export const fetcher = (url: string, { arg }: { arg: unknown }): AxiosResponse['data'] => {
  return Request.get(url, { params: arg })
}
