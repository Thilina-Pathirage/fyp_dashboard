import React from 'react'
import { Grid } from "@material-ui/core";
import Sidebar from '../../Sidebar';
import './Employees.css';
import CustomizedTables from '../../common/Table/Table';

function Employees() {
    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
               <div className='center card-list-block'>
               <CustomizedTables />

               </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Employees;
