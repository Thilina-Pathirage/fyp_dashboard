import * as React from 'react';
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

import './LeavesTable.css';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Thilina Pathirage', 'thilina@gmail.com', 'Junior Developer', 24, 4.0),
    createData('Ishan Chanuka', 'ishan@gmail.com', 'Junior Developer', 37, 4.3),
    createData('Thulaksha Marasinghe', 'thulaksha@gmail.com', 'Event Manager', 24, 6.0),
    createData('Hancie Gayathma', 'hancie@gmail.com', 'Full Stack Developer', 67, 4.3),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
    createData('Hiruna Gayashan', 'hiruna@gmail.com', 'Mobile Developer', 49, 3.9),
];

export default function LeavesTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                    <TableRow >
                        <StyledTableCell>Employee</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Position</StyledTableCell>
                        <StyledTableCell>Health Status</StyledTableCell>
                        <StyledTableCell>Work Status</StyledTableCell>
                        <StyledTableCell>Work Load</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell >{row.calories}</StyledTableCell>
                            <StyledTableCell >{row.fat}</StyledTableCell>
                            <StyledTableCell >
                                <Chip label="Mild" color="success" size='small' /></StyledTableCell>
                            <StyledTableCell >
                                <Chip label="Active" color="success" variant="outlined" size='small' />
                            </StyledTableCell>
                            <StyledTableCell >
                                <Chip label="Heavy" color="error" variant="outlined" size='small' />
                            </StyledTableCell>
                            <StyledTableCell >
                                <Button className='btn' variant="contained">Action</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}