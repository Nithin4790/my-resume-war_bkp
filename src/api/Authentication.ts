import { ACCESS_TOKEN_KEY } from '../utils/constants'
import instance from './axios'

export async function loginUser(
  userEmail: string,
  userPassword: string
): Promise<boolean> {
  const url = '/auth/local/'
  let success = false
  if (userEmail !== '' && userPassword !== '') {
    const data = await instance.post(url, {
      identifier: userEmail,
      password: userPassword,
    })

    if (data) {
      localStorage.setItem('access_token', JSON.stringify(data.data.jwt))
      success = true
    }
  }
  return success
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
