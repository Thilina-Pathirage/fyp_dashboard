import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { VictoryPie } from 'victory';
import { Paper, Typography } from '@material-ui/core';

function WorkloadChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('https://fyp-eud.azurewebsites.net/api/users/user-count-by-workload')
      .then((response) => {
        // Extract the data from the response
        const data = response.data;

        // Format the data for the pie chart
        const formattedData = data.map((item) => ({
          label: item._id,
          y: item.count,
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching workload data:', error);
      });
  }, []);

  return (
    <Paper>

      <Typography  variant="h6" component="div" style={{ textAlign: 'center', paddingTop: "20px" }}> By Workload</Typography>
      <VictoryPie
       colorScale={["#0066FF", "#1a75ff", "#3485ff", "#4d94ff", "#67a3ff" ]}
        labelRadius={60}
        style={{ labels: { fill: 'white', fontSize: 12 } }}
        data={data}
      />
    </Paper>
  );
}

export default WorkloadChart;
