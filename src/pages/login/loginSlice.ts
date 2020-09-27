import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUser } from '../../api/Authentication'
import { AppThunk } from '../../app/store'

export interface LoginState {
  userPassword: string | undefined
  userIdentifier: string | undefined
  isLogging: boolean
  isLogged: boolean
  error: string | undefined
}

const initialLoginState: LoginState = {
  userPassword: undefined,
  userIdentifier: undefined,
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
      action: PayloadAction<{ userIdentifier: string; userPassword: string }>
    ) {
      const state = loginState
      state.isLogged = true
      state.isLogging = false
      state.userPassword = action.payload.userPassword
      state.userIdentifier = action.payload.userIdentifier
    },
    loginError(loginState: LoginState, action: PayloadAction<string>) {
      const state = loginState
      state.isLogging = false
      state.error = action.payload
    },
    logoutUser(loginState: LoginState) {
      const state = loginState
      state.isLogged = false
    },
  },
})

export const { loginStart, loginSuccess, loginError, logoutUser } = loginSlice.actions

export default loginSlice.reducer

export const authenticateUser = (
  userIdentifier: string,
  userPassword: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): AppThunk => async (dispatch: any) => {
  try {
    dispatch(loginStart())
    const authStatus = loginUser(userIdentifier, userPassword)
    if (authStatus) dispatch(loginSuccess({ userIdentifier, userPassword }))
  } catch (err) {
    dispatch(loginError('Login failed'))
  }
}
