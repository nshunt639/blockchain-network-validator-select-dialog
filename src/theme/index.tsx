import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E1DFEB'
        }
    },
    typography: {
        fontFamily: 'Poppins, sans serif',
        h6: {
            fontSize: '28px',
            lineHeight: '25px',
            fontWeight: '400',
            fontFamily: 'Barlow Condensed'
        },
        body1: {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 'normal'
        },
        subtitle1: {
            fontSize: '16px',
            lineHeight: '28px',
            fontWeight: '400'
        },
        subtitle2: {
            fontSize: '12px',
            lineHeight: '28px',
            fontWeight: '400'
        }
    }
})

export default theme
