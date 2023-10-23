import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';

export default function LeaveTable({ filteredUser, filteredStatus }) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#0066FF',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    };

    const handleDate = (startDateStr) => {
        const currentDate = new Date();
        const startDate = new Date(startDateStr);
        return currentDate > startDate;
    }

    const [leaveData, setLeaveData] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleMenuOpen = (event, leave) => {
        setSelectedLeave(leave);
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setMenuAnchorEl({ top: buttonRect.bottom, left: buttonRect.left });
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleAction = (status) => {
        if (!selectedLeave) {
            return;
        }

        Axios.put(`https://fyp-eud.azurewebsites.net/api/leaves/update-status/${selectedLeave._id}`, {
            status: status,
        })
            .then((response) => {
                const updatedLeaveData = leaveData.map((leave) => {
                    if (leave._id === selectedLeave._id) {
                        return { ...leave, status: status };
                    }
                    return leave;
                });
                setLeaveData(updatedLeaveData);
                handleMenuClose();

                // Show Snackbar when status changes
                setSnackbarMessage(`Leave ${status === 'Approved' ? 'approved' : 'rejected'}`);
                setSnackbarSeverity(status === 'Approved' ? 'success' : 'error');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Error updating leave status:', error);
            });
    };

    useEffect(() => {
        Axios.get('https://fyp-eud.azurewebsites.net/api/leaves/all')
            .then((response) => {
                setLeaveData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching leave data:', error);
            });
    }, []);

    const filteredRows = leaveData
        .filter((leave) => filteredUser === 'All Users' || leave.requestedUserEmail === filteredUser)
        .filter((leave) => filteredStatus === 'All' || leave.status === filteredStatus);


    return (
        filteredRows.length ? <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Start Date</StyledTableCell>
                            <StyledTableCell>End Date</StyledTableCell>
                            <StyledTableCell>Requested Date</StyledTableCell>
                            <StyledTableCell>Requested User</StyledTableCell>
                            <StyledTableCell>Reason</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((leave) => (
                            <TableRow key={leave._id}>
                                <StyledTableCell>{formatDate(leave.startDate)}</StyledTableCell>
                                <StyledTableCell>{formatDate(leave.endDate)}</StyledTableCell>
                                <StyledTableCell>{formatDate(leave.requestedDate)}</StyledTableCell>
                                <StyledTableCell>{leave.requestedUserEmail}</StyledTableCell>
                                <StyledTableCell>{leave.reason}</StyledTableCell>
                                <StyledTableCell>
                                    <Chip label={leave.status} color={leave.status === 'Pending' ? 'default' : leave.status === 'Approved' ? 'success' : 'error'} variant="contained" size='small' />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        disabled={handleDate(leave.startDate)}
                                        variant='contained'
                                        style={{ backgroundColor: handleDate(leave.startDate) ? '#ebebeb' : '#0066FF' }}
                                        onClick={(e) => handleMenuOpen(e, leave)}
                                    >
                                        Action
                                    </Button>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorReference="anchorPosition"
                anchorPosition={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleAction('Approved')}>Approve</MenuItem>
                <MenuItem onClick={() => handleAction('Rejected')}>Reject</MenuItem>
            </Menu>

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
        </div> : <Typography variant="h6" style={{marginTop: '20px', color: 'black'}}>No leaves found</Typography>
    );
}
