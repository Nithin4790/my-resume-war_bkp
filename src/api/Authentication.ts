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
