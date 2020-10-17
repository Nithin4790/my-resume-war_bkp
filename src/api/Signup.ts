import instance from './axios'
import { SignupType } from './model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (signup: SignupType): Promise<boolean> => {
  const url = '/auth/local/register'
  let result = false
  const response = await instance.post(url, {
    username: signup.username,
    email: signup.email,
    password: signup.password,
  })
  if (response.status === 200 || response.status === 201) {
    result = true
  }
  return result
}
