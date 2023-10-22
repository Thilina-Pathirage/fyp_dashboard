import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import LeavesTable from '../../common/LeavesTable/LeavesTable';
import { useHistory } from 'react-router-dom';
import ComplaintsFilter from '../../common/Filters/CompliantsFilter';
import StatusFilter from '../../common/Filters/StatusFilter';
import { Stack } from '@mui/material';

function Leaves() {

    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        }
    }, [history]);

    const [filteredUser, setFilteredUser] = useState('All Users');
    const [filteredStatus, setFilteredStatus] = useState('All');

    const handleFilterChange = (userEmail) => {
        setFilteredUser(userEmail);
    };

    const handleStatusFilterChange = (status) => {
        setFilteredStatus(status);
    };

    return (



        <div>
            <Grid container>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8}>
                    <div className='card-list-block'>
                        <div className='button-bar'>
                            <div className='left'>
                               <Stack direction="row" spacing={2}>
                               <ComplaintsFilter onFilterChange={handleFilterChange} />
                                <StatusFilter onStatusFilterChange={handleStatusFilterChange} />
                               </Stack>
                            </div>
                        </div>
                        {/* Pass employees data as a prop to CustomizedTables */}
                        <LeavesTable filteredUser={filteredUser} filteredStatus={filteredStatus}/>

                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default Leaves;
