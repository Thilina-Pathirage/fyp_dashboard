import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function StatusFilter({ onStatusFilterChange }) {
    const [selectedStatus, setSelectedStatus] = useState('All');

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        onStatusFilterChange(e.target.value);
    };

    return (
        <div>
            <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{
                    height: '30px',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '5px',
                    padding: '5px',
                    marginBottom: '10px'
                }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
        </div>
    );
}
