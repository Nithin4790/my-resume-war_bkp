export interface AuthenticationType {
  identifier: string
  password: string
  rememberMe: boolean
}

export interface SignupType {
  username: string
  email: string
  password: string
  confirmPassword: string
}
