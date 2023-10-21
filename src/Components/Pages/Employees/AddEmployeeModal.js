import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField, Select, MenuItem, FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const fieldSpacing = {
    mb: 5,
};

export default function AddEmployeeModal() {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity is 'success'

    const handleOpen = () => {
        setOpen(true);
        // Reset Snackbar state
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: 'admin',
        position: 'Junior Developer',
        workStatus: 'online',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = () => {
        // Check for null values in form fields
        if (
            formData.firstName === '' ||
            formData.lastName === '' ||
            formData.email === '' ||
            formData.password === '' ||
            formData.userRole === '' ||
            formData.position === ''
        ) {
            setSnackbarMessage('All fields are required');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        // Create the request body with default workStatus
        const requestBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            userRole: formData.userRole,
            position: formData.position,
            workStatus: formData.workStatus,
        };

        // Make the API call to add the employee
        Axios.post("https://fyp-eud.azurewebsites.net/api/users/register", requestBody)
            .then((response) => {
                console.log('Employee added successfully:', response.data);
                // Show the success Snackbar
                setSnackbarMessage('Employee added successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                handleClose(); // Close the modal

                // Wait for 3 seconds and then refresh the page
                setTimeout(() => {
                    window.location.reload(); // Refresh the page
                }, 3000); // 3000 milliseconds = 3 seconds
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
                // Show the error Snackbar
                setSnackbarMessage('Error adding employee');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                handleClose(); // Close the modal
            });
    };

    return (
        <div>
            <Button onClick={handleOpen} className='create-new-user-btn' endIcon={<AddIcon />} variant="contained" color="error">
                New Employee
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Employee
                    </Typography>
                    <form>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="firstName">First Name</label>
                            <TextField
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="lastName">Last Name</label>
                            <TextField
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="email">Email</label>
                            <TextField
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="password">Password</label>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="userRole">User Role</label>
                            <FormControl fullWidth>
                                <Select
                                    id="userRole"
                                    name="userRole"
                                    value={formData.userRole}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="employee">Employee</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div sx={fieldSpacing} className='input-field'>
                            <label htmlFor="position">Position</label>
                            <TextField
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <Button
                            sx={{ backgroundColor: '#0066FF', color: '#ffffff' }}
                            variant="contained"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
