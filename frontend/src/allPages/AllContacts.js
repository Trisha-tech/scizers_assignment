import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >

                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AllContacts = () => {
    const { toast } = useContext(ToastContext);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [contacts, setContacts] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/contact/myContacts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if (!result.error) {
                setContacts(result.contacts);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const deleteContact = async (id) => {
        if (window.confirm("are you sure you want to delete this contact ?")) {
            try {
                const res = await fetch(`http://localhost:8080/contact/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if (!result.error) {
                    setContacts(result.myContacts);
                    toast.success("Deleted contact");
                    setShowModal(false);
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const newSearchUser = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(newSearchUser);
        setContacts(newSearchUser);
    };

    return (
        <Container component="main" maxWidth="s">
            <Box>
                <Typography component="h1" variant="h2">Your Contacts</Typography>

                <Link to="/mycontacts">
                    <Button
                        type="submit"
                        value="Login"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reload Contacts
                    </Button>
                </Link>
                <hr className="my-4" /><br />
                {loading ? (
                    <Spinner splash="Loading Contacts..." />
                ) : (
                    <>
                        {contacts.length == 0 ? (
                            <Typography component="h1" variant="h4">No contacts created yet...</Typography>
                        ) : (
                            <>
                                <form className="d-flex" onSubmit={handleSearchSubmit}>

                                    <TextField type="search"
                                        name="searchInput"
                                        id="searchInput"
                                        fullWidth
                                        maxWidth='md'
                                        placeholder="Search Contact"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />

                                    <Button type="submit" color='inherit'>Search</Button>
                                </form>
                                <br />
                                <Typography component="h1" variant="h5">
                                    Your Total Contacts: <strong>{contacts.length}</strong>
                                </Typography><br /><br />
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell >Name</StyledTableCell>
                                                <StyledTableCell align="right">Email Address</StyledTableCell>
                                                <StyledTableCell align="right">Mobile Number</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contacts.map((contact) => (
                                                <StyledTableRow key={contact._id}
                                                    onClick={() => {
                                                        setModalData({});
                                                        setModalData(contact);
                                                        setShowModal(true);
                                                    }}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {contact.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{contact.email}</StyledTableCell>
                                                    <StyledTableCell align="right">{contact.mobile}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </>
                        )}
                    </>
                )}
            </Box>

            <BootstrapDialog
                fullWidth
                maxWidth='md'
                onClose={() => setShowModal(false)}
                aria-labelledby="customized-dialog-title"
                open={showModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setShowModal(false)}>
                    {modalData.name}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography component="h1" variant="h2">{modalData.name}</Typography><br />
                    <Typography component="h1" variant="h5" gutterBottom>
                        <strong>Address</strong>: {modalData.address}
                    </Typography>
                    <Typography component="h1" variant="h5" gutterBottom>
                        <strong>Email</strong>: {modalData.email}
                    </Typography>
                    <Typography component="h1" variant="h5" gutterBottom>
                        <strong>Phone Number</strong>: {modalData.phone}
                    </Typography>
                </DialogContent>
                <DialogActions>

                    <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
                        <Button autoFocus >
                            Edit
                        </Button>
                    </Link>
                    <Button autoFocus onClick={() => deleteContact(modalData._id)}>
                        Delete
                    </Button>
                    <Button autoFocus onClick={() => setShowModal(false)}>
                        Close
                    </Button>

                </DialogActions>
            </BootstrapDialog>
        </Container>
    );
};

export default AllContacts;
