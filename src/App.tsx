import * as React from 'react'
import { Box, Button, Container } from '@mui/material'
import ValidatorSelectDialog from 'components/ValidatorSelectDialog'

export default function App() {
    const [validatorSelectDialogActive, setValidatorSelectDialogActive] = React.useState(false)

    const handleClickOpen = () => {
        setValidatorSelectDialogActive(true)
    }

    const handleClose = () => {
        setValidatorSelectDialogActive(false)
    }

    return (
        <Container maxWidth="lg">
            <Box textAlign="center" marginTop={10}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Select Validator
                </Button>
            </Box>
            <ValidatorSelectDialog active={validatorSelectDialogActive} close={handleClose} />
        </Container>
    )
}
