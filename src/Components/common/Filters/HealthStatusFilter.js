import React, {useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';


export default function HealthStatusFilter({ onStatusFilterChange }) {

    const history = useHistory();

    const queryString = history.location.search;

    const params = new URLSearchParams(queryString);
    const status = params.get('status');

    const [selectedStatus, setSelectedStatus] = useState(status ? status : 'Health Status (All)');

    console.log(selectedStatus);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        onStatusFilterChange(e.target.value);
        history.replace(`/employees?status=${e.target.value}`);

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
                <MenuItem value="Health Status (All)">Health Status (All)</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Mild">Mild</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Severe">Severe</MenuItem>
                <MenuItem value="Extremely Severe">Extremely Severe</MenuItem>
            </Select>
        </div>
    );
}
