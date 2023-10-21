import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar';
import { Grid } from "@material-ui/core";
import BasicCard from '../../common/BasicCard';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';


function Dashboard() {
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
                        <Grid container spacing={5}>
                            <Grid item xs={3}>
                                <BasicCard />
                            </Grid>
                            <Grid item xs={3}>
                                <BasicCard />
                            </Grid><Grid item xs={3}>
                                <BasicCard />
                            </Grid>
                            <Grid item xs={3}>
                                <BasicCard />
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
