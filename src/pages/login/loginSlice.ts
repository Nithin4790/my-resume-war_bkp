import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LoginState {
  userPassword: string | undefined
  userEmail: string | undefined
  isLogging: boolean
  isLogged: boolean
  error: string | undefined
}

const initialLoginState: LoginState = {
  userPassword: undefined,
  userEmail: undefined,
  isLogging: false,
  isLogged: false,
  error: undefined,
}

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    loginStart(loginState: LoginState) {
      const state = loginState
      state.isLogging = true
    },
    loginSuccess(
      loginState: LoginState,
      action: PayloadAction<{ userEmail: string; userPassword: string }>
    ) {
      const state = loginState
      state.isLogged = true
      state.isLogging = false
      state.userPassword = action.payload.userPassword
      state.userEmail = action.payload.userEmail
    },
    loginError(loginState: LoginState, action: PayloadAction<string>) {
      const state = loginState
      state.isLogging = false
      state.error = action.payload
    },
  },
})

export const { loginStart, loginSuccess, loginError } = loginSlice.actions

export default loginSlice.reducer
