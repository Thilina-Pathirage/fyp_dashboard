import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function ComplaintsFilter({ onFilterChange }) {
    const [userEmails, setUserEmails] = useState([]);
    const [selectedUser, setSelectedUser] = useState('All Users');

    useEffect(() => {
        Axios.get('https://fyp-eud.azurewebsites.net/api/users/all-users')
            .then((response) => {
                const emails = response.data.map((user) => user.email);
                setUserEmails(emails);
            })
            .catch((error) => {
                console.error('Error fetching user emails:', error);
            });
    }, []);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <div>
            <Select
                value={selectedUser}
                onChange={handleUserChange}
                style={{height: '30px', backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px', marginBottom: '10px'}}
            >
                <MenuItem value="All Users">All Users</MenuItem>
                {userEmails.map((email) => (
                    <MenuItem key={email} value={email}>
                        {email}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}
