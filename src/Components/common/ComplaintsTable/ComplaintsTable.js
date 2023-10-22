import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Axios from 'axios'; // Import Axios

import './ComplaintsTable.css';
import { Typography } from '@mui/material';

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

export default function ComplaintsTable({ filteredUser}) {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        // Make an API call to fetch complaints
        Axios.get('https://fyp-eud.azurewebsites.net/api/complaints/all')
            .then((response) => {
                // Update the rows with the response data
                setRows(response.data);
            })
            .catch((error) => {
                console.error('Error fetching complaints:', error);
            });
    }, []); // Empty dependency array, runs once on component mount

     // Filter rows based on the selected user
     useEffect(() => {
        const filteredRows = filteredUser !== 'All Users'
            ? rows.filter((row) => row.createdUserEmail === filteredUser)
            : rows;
        setFilteredRows(filteredRows);
    }, [filteredUser, rows]);

    return (
        filteredRows.length ?  <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Created User</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    filteredRows.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell>{row.description}</StyledTableCell>
                            <StyledTableCell>{row.createdUserEmail}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Typography variant="h6" style={{marginTop: '20px', color: 'white'}}>No complaints found</Typography>
    );
}
