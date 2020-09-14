import { ThunkAction } from 'redux-thunk'
/* eslint-disable global-require */
import { configureStore, Action } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  // By using the module.hot API for reloading, we can re-import
  // the new version of the root reducer function whenever it's been recompiled,
  // and tell the store to use the new version instead.
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
