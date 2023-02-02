import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './routes'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { CyclesProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <BrowserRouter>
      <CyclesProvider>
        <ThemeProvider theme={defaultTheme}>
          <Router />
          <GlobalStyle />
        </ThemeProvider>
      </CyclesProvider>
    </BrowserRouter>
  )
}
