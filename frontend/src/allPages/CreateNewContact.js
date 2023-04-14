import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";



const theme = createTheme();

export default function CreateNewContact() {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:8080/contact/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userDetails),
        });
        const result = await res.json();
        if (!result.error) {
            toast.success(`Created [${userDetails.name}] contact`);

            setUserDetails({ name: "", email: "", mobile: "" });
        } else {
            toast.error(result.error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="s">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Create New Contact
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    fullWidth
                                    label="Name"
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Trisha Sahu"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    autoComplete="email"
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    placeholder="trisha@example.com"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    autoComplete="new-password"
                                    type="number"
                                    className="form-control"
                                    id="phoneInput"
                                    name="mobile"
                                    value={userDetails.mobile}
                                    onChange={handleInputChange}
                                    placeholder="+91 9876543210"
                                    required
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            value="Add Contact"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Contact
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}