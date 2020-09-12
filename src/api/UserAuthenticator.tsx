export interface User {
  username: string
  password: string
  email: string
}

export async function validateUser(username: string, password: string): Promise<boolean> {
  if (username === 'abc' && password === 'abc') {
    return true
  }
  return false
}
