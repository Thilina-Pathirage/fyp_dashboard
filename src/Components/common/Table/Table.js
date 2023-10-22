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

// Define a function to get the color based on the prediction
const getColorForPrediction = (prediction) => {
    switch (prediction) {
        case 'Normal':
            return 'primary'; // You can change 'primary' to the color you want
        case 'Mild':
            return 'info'; // You can change 'info' to the color you want
        case 'Moderate':
            return 'warning'; // You can change 'warning' to the color you want
        case 'Severe':
            return 'error'; // You can change 'error' to the color you want
        case 'Extremely Severe':
            return 'error'; // You can change 'error' to the color you want
        default:
            return 'default'; // Default color
    }
};

// Define a function to get the color based on the workload
const getColorForWorkLoad = (workLoad) => {
    switch (workLoad) {
        case 'Light':
            return 'success'; // You can change 'success' to the color you want
        case 'Moderate':
            return 'info'; // You can change 'info' to the color you want
        case 'Normal':
            return 'default'; // You can change 'default' to the color you want
        case 'Heavy':
            return 'warning'; // You can change 'warning' to the color you want
        case 'Overload':
            return 'error'; // You can change 'error' to the color you want
        default:
            return 'default'; // Default color
    }
};








export default function CustomizedTables({ employees, filteredStatus, filteredWorkloadStatus }) {

    const filteredRows = employees
        .filter((emp) => filteredStatus === 'Health Status (All)' || emp.mentalHealthStatus.prediction === filteredStatus)
        .filter((emp) => filteredWorkloadStatus === 'Workload Status (All)' || emp.workLoad === filteredWorkloadStatus);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Employee</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Position</StyledTableCell>
                        <StyledTableCell>Health Status</StyledTableCell>
                        <StyledTableCell>Work Load</StyledTableCell>

                        <StyledTableCell>Work Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((employee) => (
                        <StyledTableRow key={employee._id}>
                            <StyledTableCell component="th" scope="row">
                                {employee.firstName} {employee.lastName}
                            </StyledTableCell>
                            <StyledTableCell>{employee.email}</StyledTableCell>
                            <StyledTableCell>{employee.position}</StyledTableCell>
                            <StyledTableCell>
                                <Chip
                                    label={employee.mentalHealthStatus?.prediction || 'N/A'}
                                    color={getColorForPrediction(employee.mentalHealthStatus?.prediction)}
                                    size='small'
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Chip
                                    label={employee?.workLoad || 'Normal'}
                                    color={getColorForWorkLoad(employee?.workLoad)}
                                    variant="outlined"
                                    size='small'
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Chip label={employee?.workStatus || 'Online'} color="success" variant="outlined" size='small' />
                            </StyledTableCell>


                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
