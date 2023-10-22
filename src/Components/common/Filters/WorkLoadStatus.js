import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function WorkloadStatusFilter({ onWorkloadStatusFilterChange }) {
    const [selectedStatus, setSelectedStatus] = useState('Workload Status (All)');

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        onWorkloadStatusFilterChange(e.target.value);
    };

    return (
        <div>
            <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{
                    marginLeft: '10px',
                    height: '37px',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '5px',
                    padding: '5px',
                    marginBottom: '10px'
                }}
            >
                <MenuItem value="Workload Status (All)">Workload Status (All)</MenuItem>
                <MenuItem value="Light">Light</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Heavy">Heavy</MenuItem>
                <MenuItem value="Overload">Overload</MenuItem>
            </Select>
        </div>
    );
}
