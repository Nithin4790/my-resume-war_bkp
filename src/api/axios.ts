import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL } from '../utils/constants'

const instance = axios.create({
  baseURL: API_BASE_URL,
})

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
