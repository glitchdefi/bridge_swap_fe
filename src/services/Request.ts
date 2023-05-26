import axios, { AxiosError, AxiosResponse } from 'axios'
import { GLITCH_API } from 'constants/index'

const instance = axios.create({
  baseURL: GLITCH_API,
})

const handleResponse = (response: AxiosResponse) => {
  return response?.data
}

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return handleResponse(response)
  },
  (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.message)
  },
)

export { instance as Request }
