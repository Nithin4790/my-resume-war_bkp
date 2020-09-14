import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '../pages/login/loginSlice'

const rootReducer = combineReducers({
  loginReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectLoginState = (state: RootState) => state.loginReducer
