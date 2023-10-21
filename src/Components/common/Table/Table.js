import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import './Table.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables({ employees }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Employee</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Position</StyledTableCell>
                        <StyledTableCell>Health Status</StyledTableCell>
                        <StyledTableCell>Work Status</StyledTableCell>
                        <StyledTableCell>Work Load</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <StyledTableRow key={employee._id}>
                            <StyledTableCell component="th" scope="row">
                                {employee.firstName} {employee.lastName}
                            </StyledTableCell>
                            <StyledTableCell>{employee.email}</StyledTableCell>
                            <StyledTableCell>{employee.position}</StyledTableCell>
                            <StyledTableCell>
                                <Chip
                                    label={employee.mentalHealthStatus?.prediction || 'N/A'}
                                    color="success"
                                    size='small'
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Chip label={employee?.workStatus || 'Online'} color="success" variant="outlined" size='small' />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Chip label={employee?.workLoad || 'Normal'} color="error" variant="outlined" size='small' />
                            </StyledTableCell>
                           
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
