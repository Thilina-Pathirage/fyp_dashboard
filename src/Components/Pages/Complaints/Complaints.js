import React, { useEffect, useState } from 'react';

import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import ComplaintsTable from '../../common/ComplaintsTable/ComplaintsTable';
import { useHistory } from 'react-router-dom';
import ComplaintsFilter from '../../common/Filters/CompliantsFilter';

function Complaints() {
    const history = useHistory();
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        }
    }, [history]);

    const [filteredUser, setFilteredUser] = useState('All Users');

    const handleFilterChange = (userEmail) => {
        setFilteredUser(userEmail);
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
                            <div className='right'>
                                <ComplaintsFilter onFilterChange={handleFilterChange} />
                            </div>
                        </div>
                        {/* Pass employees data as a prop to CustomizedTables */}
                        <ComplaintsTable filteredUser={filteredUser} />

                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default Complaints;
