import React from 'react'
import { Grid } from "@material-ui/core";
import Sidebar from '../Sidebar';

function Hexagon() {
    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <h1>Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon Hexagon </h1>
                </Grid>
            </Grid>
        </div>
    )
}

export default Hexagon;
