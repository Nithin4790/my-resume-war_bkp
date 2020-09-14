import axios from './axios'

export async function loginUser(
  userEmail: string,
  userPassword: string
): Promise<boolean> {
  const url = '/auth/local/'
  let success = false
  if (userEmail !== '' && userPassword !== '') {
    await axios
      .post(url, {
        identifier: userEmail,
        password: userPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('access_token', JSON.stringify(res.data.jwt))
          success = true
        }
      })
  }
  return success
}

export function logoutUser(): void {
  localStorage.removeItem('access_token')
}
