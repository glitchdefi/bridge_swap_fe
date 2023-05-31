/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { Request } from './Request'

export const fetcher = (url: string, { arg }: { arg: any }): AxiosResponse['data'] => {
  return Request.get(url, { params: arg })
}
