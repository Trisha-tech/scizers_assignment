import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Link to="/" underline="none">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: "white" }}>
                            Address Book Manager
                        </Typography>
                    </Link>

                    {user ? (
                        <Box>
                            <Link to="/mycontacts">
                                <Button color="inherit" style={{ color: "white" }}>All Contacts</Button>
                            </Link>
                            <Link to="/create">
                                <Button color="inherit" style={{ color: "white" }}>Create</Button>
                            </Link>
                            <Button variant="contained" href="#contained-buttons" value="Login"
                                onClick={() => {
                                    setUser(null);
                                    localStorage.clear();
                                    toast.success("Logged Out Successfully!");
                                    navigate("/login", { replace: true });
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box >
                            <Link to="/login">
                                <Button color="inherit" style={{ color: "white" }}>Login</Button>
                            </Link>

                            <Link to="/register" underline="none">  <Button style={{ color: "white" }}>Register</Button></Link>
                        </Box>
                    )}


                </Toolbar>
            </AppBar>
        </Box>
    );
}
