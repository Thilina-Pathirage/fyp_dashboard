import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';
import { Paper, Typography } from '@material-ui/core';

function MentalHealthChart() {
  const [data, setData] = useState([]);

  const colorScale = [
    '#FF5733', // Normal
    '#FFD700', // Mild
    '#FFA500', // Moderate
    '#FF4500', // Severe
    '#8B0000', // Extremely Severe
  ];

  useEffect(() => {
    Axios.get('https://fyp-eud.azurewebsites.net/api/users/user-count-by-mental-health')
      .then((response) => {
        const dataMap = new Map();
        dataMap.set('Normal', 0);
        dataMap.set('Mild', 0);
        dataMap.set('Moderate', 0);
        dataMap.set('Severe', 0);

        response.data.forEach((item) => {
          const category = item._id;
          const count = item.count;
          dataMap.set(category, count);
        });

        const formattedData = Array.from(dataMap).map(([category, count], index) => ({
          x: category,
          y: count,
          fill: colorScale[index], // Assign color based on the index
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching mental health data:', error);
      });
  }, []);

  return (
    <Paper>
      <Typography  variant="h6" component="div" style={{ textAlign: 'center', paddingTop: "20px" }}> By Health Status</Typography>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={5}
        
      >
        <VictoryBar
        
        barRatio={0.8}
          style={{ data: { fill: "#0066FF" } }}
          data={data}
        />
      </VictoryChart>
    </Paper>
  );
}

export default MentalHealthChart;
