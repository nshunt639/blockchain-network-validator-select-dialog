import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Validator from 'components/Validator'
import ValidatorListTable from 'components/ValidatorListTable'
import { Box } from '@mui/system'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'

interface ValidatorSelectDialogProps {
    active: boolean
    close: Function
}

const DialogFooter = styled(DialogActions)({
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
    flexWrap: 'wrap'
})
export default function ValidatorSelectDialog(props: ValidatorSelectDialogProps) {
    const closeDialog = () => {
        props.close()
    }

    const [validator, setValidator] = React.useState<Validator | null>(null)

    const selectValidator = () => {
        if (!validator) {
            alert('Please select a validator.')
            return
        }

        alert(`You have selected the validator '${validator.name}'`)
        closeDialog()
    }

    return (
        <Dialog open={props.active} onClose={closeDialog} fullWidth maxWidth="md">
            <DialogTitle>Select Validator node</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    As you gonna stake your NOMs, you need to select a validator for it. Please
                    choose one of the list of available validator nodes.
                </DialogContentText>
                <Box marginTop={2}>
                    <ValidatorListTable onSelect={setValidator} />
                </Box>
            </DialogContent>
            <DialogFooter>
                <Box>
                    <Typography variant="body1">Nom Balance</Typography>
                    <Typography variant="subtitle1" component="span">
                        23.20931
                    </Typography>
                    <Typography variant="body1" component="span">
                        &nbsp;= 16,208.04 $
                    </Typography>
                </Box>
                <Box flexGrow={1}></Box>
                <Button variant="contained" color="primary" onClick={selectValidator}>
                    Select Validator
                </Button>
            </DialogFooter>
        </Dialog>
    )
}
