import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

interface Column {
    id: 'name' | 'apr' | 'delegated'
    label: string
    minWidth?: number
    align?: 'left'
    format?: (value: number) => string
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'apr', label: 'APR', minWidth: 50 },
    { id: 'delegated', label: 'Delegated', minWidth: 100 }
]

interface Data {
    name: string
    logo: string
    votingPower: number
    apr: number
    delegated: number
    price: number
}

function createData(
    name: string,
    logo: string,
    votingPower: number,
    apr: number,
    delegated: number,
    price: number
): Data {
    return { name, logo, votingPower, apr, delegated, price }
}

const rows = [
    createData('Coinbase Custody', '', 13.9, 3.54, 23095.22, 4551.98),
    createData('Binance Staking', '', 13.9, 3.54, 23095.22, 4551.98),
]

export default function ValidatorListTable() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                        {columns.map(column => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
