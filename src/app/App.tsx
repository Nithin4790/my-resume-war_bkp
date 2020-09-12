import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import { Routes } from './Routes'

const App: React.FunctionComponent = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
