import React, { useState } from 'react';
import styled from '@mui/material/styles/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Axios from 'axios';

import DeleteConfirmationDialog from './DeleteConfirm'; // Import the dialog component
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#0066FF',
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
            return 'success';
        case 'Mild':
            return 'info';
        case 'Moderate':
            return 'warning';
        case 'Severe':
            return 'error';
        case 'Extremely Severe':
            return 'error';
        default:
            return 'default';
    }
};

// Define a function to get the color based on the workload
const getColorForWorkLoad = (workLoad) => {
    switch (workLoad) {
        case 'Light':
            return 'success';
        case 'Moderate':
            return 'info';
        case 'Normal':
            return 'default';
        case 'Heavy':
            return 'warning';
        case 'Overload':
            return 'error';
        default:
            return 'default';
    }
};

export default function CustomizedTables({ employees, filteredStatus, filteredWorkloadStatus }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleDeleteClick = (employee) => {
        setEmployeeToDelete(employee);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (employeeToDelete) {
            Axios.delete(`https://fyp-eud.azurewebsites.net/api/users/soft-delete/${employeeToDelete}`)
                .then((response) => {
                    if (response.data.message === 'User soft-deleted successfully') {
                        console.log('Employee deleted successfully');
                        setSnackbarMessage('Employee deleted successfully');
                        setSnackbarSeverity('success');
                    } else {
                        console.error('Error deleting employee:', response.data.message);
                        setSnackbarMessage('Error deleting employee');
                        setSnackbarSeverity('error');
                    }
                    setDialogOpen(false);
                    setSnackbarOpen(true);

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    console.error('Error deleting employee:', error);
                    setSnackbarMessage('Error deleting employee');
                    setSnackbarSeverity('error');
                    setDialogOpen(false);
                    setSnackbarOpen(true);
                });
        }
    };

    const handleDialogClose = () => {
        setEmployeeToDelete(null);
        setDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const filteredRows = employees
        .filter((emp) => filteredStatus === 'Health Status (All)' || emp.mentalHealthStatus.prediction === filteredStatus)
        .filter((emp) => filteredWorkloadStatus === 'Workload Status (All)' || emp.workLoad === filteredWorkloadStatus);

    return (
        <div>
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
                            <StyledTableCell>Remove User</StyledTableCell>
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
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Chip
                                        label={employee?.workLoad || 'Normal'}
                                        color={getColorForWorkLoad(employee?.workLoad)}
                                        variant="outlined"
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Chip
                                        label={employee?.workStatus || 'Online'}
                                        color={employee.workStatus === 'Online' ? 'success' : 'default'}
                                        variant="contained"
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton
                                        aria-label="delete"
                                        size="large"
                                        onClick={() => handleDeleteClick(employee.email)}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <DeleteConfirmationDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onConfirm={handleConfirmDelete}
                />
            </TableContainer>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
