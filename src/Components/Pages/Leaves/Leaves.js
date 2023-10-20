import React from 'react'
import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import LeavesTable from '../../common/LeavesTable/LeavesTable';

function Leaves() {
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
