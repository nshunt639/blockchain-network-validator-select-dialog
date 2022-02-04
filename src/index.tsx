import * as React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from 'theme'
import App from './App'

ReactDOM.render(
    <React.Fragment>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
)
