import { ACCESS_TOKEN_KEY } from '../utils/constants'
import instance from './axios'
import { AuthenticationType } from './model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginUser(auth: AuthenticationType): Promise<any> {
  const url = '/auth/local/'
  let data = {}
  if (auth.identifier !== '' && auth.password !== '') {
    try {
      const response = await instance.post(url, {
        identifier: auth.identifier,
        password: auth.password,
      })
      data = response
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('access_token', JSON.stringify(response.data.jwt))
      }
    } catch (err) {
      data = err
    }
  }
  return data
}

export const validateUser = (): boolean => {
  if (localStorage.getItem(ACCESS_TOKEN_KEY)) return true
  return false
}

export const logout = (): boolean => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    return true
  } catch (err) {
    return false
  }
}
