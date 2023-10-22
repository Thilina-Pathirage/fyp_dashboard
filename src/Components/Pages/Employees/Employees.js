import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import Axios from 'axios'; // Import Axios
import Sidebar from '../../Sidebar';
import './Employees.css';
import CustomizedTables from '../../common/Table/Table';
import AddEmployeeModal from './AddEmployeeModal';
import { useHistory } from 'react-router-dom';
import HealthStatusFilter from '../../common/Filters/HealthStatusFilter';
import WorkloadStatusFilter from '../../common/Filters/WorkLoadStatus';


function Employees() {
    const history = useHistory();

    const [employees, setEmployees] = useState([]);

    const [filteredStatus, setFilteredStatus] = useState('Health Status (All)');
    const [filteredWorkloadStatus, setFilteredWorkloadStatus] = useState('Workload Status (All)');


    const handleStatusFilterChange = (status) => {
        setFilteredStatus(status);
    };

    const handleWorkloadStatusFilterChange = (status) => {
        setFilteredWorkloadStatus(status);
    };


    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        }


        // Make an API call to fetch all employees
        Axios.get("https://fyp-eud.azurewebsites.net/api/users/all-users")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees: ", error);
            });
    }, [history]); // The empty dependency array ensures this effect runs only once

    
    return (
        <div>
            <Grid container>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8}>
                    <div className='card-list-block'>
                        <div className='button-bar'>
                            <div className='left'>
                                <AddEmployeeModal />
                            <HealthStatusFilter onStatusFilterChange={handleStatusFilterChange} />
                            <WorkloadStatusFilter onWorkloadStatusFilterChange={handleWorkloadStatusFilterChange} />


                            </div>

                        </div>
                        {/* Pass employees data as a prop to CustomizedTables */}
                        <CustomizedTables employees={employees} filteredStatus={filteredStatus} filteredWorkloadStatus={filteredWorkloadStatus}/>
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}

export default Employees;
