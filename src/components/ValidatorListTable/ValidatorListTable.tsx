import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import { styled } from '@mui/system'

import Validator from 'components/Validator'
import { Typography } from '@mui/material'

function createValidator(
    name: string,
    logo: string,
    votingPower: number,
    apr: number,
    delegated: number,
    price: number
): Validator {
    return { name, logo, votingPower, apr, delegated, price }
}

const rows = [
    createValidator('Coinbase Custody', '', 13.9, 3.54, 23095.22, 4551.98),
    createValidator('Binance Staking', '', 13.9, 3.23, 21000, 4551.98)
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

interface HeadCell {
    id: 'name' | 'apr' | 'delegated'
    label: string
    minWidth?: number
    align?: 'left'
}

const headCells: readonly HeadCell[] = [
    { id: 'name', label: 'Name', minWidth: 200, align: 'left' },
    { id: 'apr', label: 'APR', minWidth: 50, align: 'left' },
    { id: 'delegated', label: 'Delegated', minWidth: 100, align: 'left' }
]

interface ValidatorListTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Validator) => void
    order: Order
    orderBy: string
}

function ValidatorListTableHead(props: ValidatorListTableHeadProps) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof Validator) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        style={{ minWidth: headCell.minWidth }}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function toCurrency(number: Number) {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}


const ValidatorName = styled(Typography)({
})

const VotingPower = styled(Typography)({
    color: '#9895A6',
})

const APR = styled('div')({
    color: '#88D1FF',
})

const Delegated = styled('div')({
    color: '#E1DFEB',
    font: 'normal normal bold 20px/28px Bebas Neue'
})

const Price = styled('div')({
    color: '#7CF9BA',
    font: 'normal normal medium 12px/28px Poppins'
})

interface ValidatorListTableProps {
    onSelect: (validator: Validator) => void
}

export default function ValidatorListTable(props: ValidatorListTableProps) {
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof Validator>('name')
    const [selectedValidator, setSelectedValidator] = React.useState<string>('')
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Validator) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleClick = (event: React.MouseEvent<unknown>, validator: Validator) => {
        setSelectedValidator(validator.name)
        props.onSelect(validator)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isValidatorSelected = (name: string) => selectedValidator.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <ValidatorListTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isValidatorSelected(row.name)

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align="left">
                                                <ValidatorName variant="subtitle1">{row.name}</ValidatorName>
                                                <VotingPower variant="subtitle2">{row.votingPower} Voting Power</VotingPower>
                                            </TableCell>
                                            <TableCell align="left">
                                                <APR>{row.apr.toFixed(2)}%</APR>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Delegated>{toCurrency(row.delegated)}</Delegated>
                                                <Price>{toCurrency(row.price)}</Price>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}
