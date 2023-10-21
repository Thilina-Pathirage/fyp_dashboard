import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import LeavesTable from '../../common/LeavesTable/LeavesTable';
import { useHistory } from 'react-router-dom';

function Leaves() {

    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        }
    }, [history]);

    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <div className='center card-list-block'>
                        <LeavesTable />

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Leaves;
