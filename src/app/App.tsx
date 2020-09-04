import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import { HomePage } from '../pages/home/HomePage'

const App: React.FunctionComponent = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
