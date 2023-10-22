import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Sidebar from '../../Sidebar';
import { Grid } from "@mui/material";
import BasicCard from '../../common/BasicCard';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import MentalHealthChart from '../../Stats/MentalHealthChart';
import WorkloadChart from '../../Stats/WorkloadChart';

function Dashboard() {
    const history = useHistory();
    const [userCounts, setUserCounts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        }

        // Make an API call to fetch user counts by mental health
        Axios.get('https://fyp-eud.azurewebsites.net/api/users/user-count-by-mental-health')
            .then((response) => {
                const counts = Array(6).fill(0); // Initialize an array with 5 zeroes
                response.data.forEach((countData) => {
                    // Map the count data to the appropriate card position based on mental health status
                    switch (countData._id) {
                        case 'Normal':
                            counts[1] = countData.count;
                            break;
                        case 'Mild':
                            counts[2] = countData.count;
                            break;
                        case 'Moderate':
                            counts[3] = countData.count;
                            break;
                        case 'Severe':
                            counts[4] = countData.count;
                            break;
                        case 'Extremely Severe':
                            counts[5] = countData.count;
                            break;
                        default:
                            // Ignore other statuses
                            break;
                    }
                });

                // Calculate the total count for the "All Users" card
                const totalCount = counts.reduce((total, count) => total + count, 0);
                counts[0] = totalCount;

                setUserCounts(counts);
            })
            .catch((error) => {
                console.error('Error fetching user counts by mental health:', error);
            });
    }, [history]);

    return (
        <div>
            <Grid container>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8}>
                    <div className='card-list-block'>
                        <Grid container spacing={5}>
                            {[
                                'All Users',
                                'Normal',
                                'Mild',
                                'Moderate',
                                'Severe',
                                'Extremely Severe',
                            ].map((status, index) => (
                                <Grid item xs={2} key={status}>
                                    <BasicCard title={status} count={userCounts[index]} />
                                </Grid>
                            ))}
                        </Grid>

                        <Grid mt={3} container spacing={5}>
                <Grid item xs={6}>
                    <MentalHealthChart />
                </Grid>
                <Grid item xs={6}>
                    <WorkloadChart />
                </Grid>

            </Grid>
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            
            
        </div>
    )
}

export default Dashboard;
