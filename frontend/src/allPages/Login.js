import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";


const theme = createTheme();

export default function Login() {

    const { toast } = useContext(ToastContext);
    const { loginUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Please enter all the required fields!");
            return;
        }

        loginUser(credentials);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1677526779537-c376aa880775?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZGlhcnl8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                className="form-control"
                                id="emailInput"
                                name="email"
                                value={credentials.email}
                                onChange={handleInputChange}
                                placeholder="trishasahu@example.com"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                autoComplete="current-password"
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                                required
                            />

                            <Button
                                type="submit"
                                value="Login"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Don't have an account?
                                <Link to="/register">
                                    <Button  color='inherit'>Register</Button>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}