import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import Logo from '../../../Images/logo-eu.png'; // Replace with your logo
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the request body
        const requestBody = {
            email: formData.username,
            password: formData.password,
        };

        Axios.post("https://fyp-eud.azurewebsites.net/api/users/login", requestBody)
            .then((response) => {
                // Handle successful login
                console.log('Login data:', formData);

                // Handle the JWT token and save it to local storage
                const { token } = response.data;
                const decodedToken = parseJwt(token);

                // Check if the user is an admin
                if (decodedToken.userRole === 'admin') {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', decodedToken.userId);
                    localStorage.setItem('userFirstName', decodedToken.firstName);
                    localStorage.setItem('userLastName', decodedToken.lastName);
                    localStorage.setItem('userEmail', decodedToken.email);
                    localStorage.setItem('userRole', decodedToken.userRole);

                    // Redirect to the desired route (e.g., '/')
                    history.push('/home');
                } else {
                    // User is not an admin, show an error Snackbar
                    setSnackbarMessage('You do not have access to log in.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                // Handle login error
                console.error('Error during login:', error);

                // Show an error Snackbar
                setSnackbarMessage('Login failed. Please check your credentials.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    // Function to decode a JWT token (sample)
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64));
        return JSON.parse(jsonPayload);
    }

    // Check if userRole is admin in localStorage onload
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            history.push('/home');
        }
    }, [history]);

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh" // Vertically center within the viewport height
            >
                <Paper elevation={3} style={{ padding: 20 }}>
                    <div className='center'>
                        <img src={Logo} alt="logo" style={{ width: 300 }} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: 20, backgroundColor: '#0066FF', color: '#ffffff' }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Box>
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
        </Container>
    );
};

export default Login;
