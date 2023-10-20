import React from 'react'
import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import ComplaintsTable from '../../common/ComplaintsTable/ComplaintsTable';

function Complaints() {
    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <div className='center card-list-block'>
                        <ComplaintsTable />

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Complaints;
