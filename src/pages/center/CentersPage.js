import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { Toast } from 'primereact/toast';

// @mui
import {
    Card,
    Table,
    Stack,
    Button,
    TableRow,
    Popover,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead } from '../../sections/@dashboard/user';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'number', label: '#', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: '', label: '', alignRight: false },
    { id: 'isActive', label: 'Status', alignRight: false },
    {},
];
// ----------------------------------------------------------------------
export default function ProductsPage() {

    const CENTER_API = `${process.env.REACT_APP_FETCH_API}/centers`;

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(9);

    const [totalElements, setTotalElements] = useState(0);

    const [selectedCenterId, setSelectedCenterId] = useState(null);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [status, setStatus] = useState(true);

    const [centers, setCenters] = useState([]);

    const isLogin = useSelector((state) => state.auth.login?.currentUser);

    const [token, setToken] = useState('');

    const toast = useRef(null);

    useEffect(() => {
        setToken(isLogin.token)
    }, [isLogin])


    useEffect(() => {
        axios
            .get(`${CENTER_API}/all?size=${size}&page=${page}&sort=id,desc`)
            .then(res => {
                setCenters(res.data.content);
                setTotalElements(res.data.totalElements);
            })
            .catch(err => {
                console.log(err)
            })
    }, [size, page])

    const handleOpenMenu = (event, centerId, status) => {
        setOpen(event.currentTarget);
        setSelectedCenterId(centerId);
        setStatus(status);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };

    const handleChangeSize = (event) => {
        setPage(0);
        setSize(parseInt(event.target.value, 10));
    };

    const handleOpenDelete = () => {
        setConfirmDelete(true);
    };

    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };

    function handleDeleteCenter(centerId) {
        if (centerId) {
            axios
                .delete(`${CENTER_API}/${centerId}`)
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: `Delete ${res.data.name} successfully`, life: 3000 });
                    setConfirmDelete(false);
                })
                .then(setTimeout(() => window.location.reload(), 3000))
                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Delete Fail', life: 3000 });
                });
        }
    }

    return (
        <>
            <Toast ref={toast} />

            <Helmet>
                <title> Center | Center Management </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Center Management
                    </Typography>
                    {/* <Link to={`/dashboard/centers/new`}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            New Center
                        </Button>
                    </Link> */}
                </Stack>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead key="user-list-head" headLabel={TABLE_HEAD} rowCount={totalElements} />
                                <TableBody>
                                    {centers.map((center, index) => {
                                        const { id, name, address, email, isActive, phone } = center;
                                        return (
                                            <TableRow hover key={id} tabIndex={-1}>
                                                <TableCell align="left">{id}</TableCell>
                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{address}</TableCell>
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="left">{phone}</TableCell>
                                                <TableCell align="left">{isActive}</TableCell>
                                                <TableCell align="left">
                                                    <Label color={isActive ? 'success' : 'error'}> {isActive ? 'Active' : 'InActive'} </Label>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        size="large"
                                                        color="inherit"
                                                        onClick={(event) => handleOpenMenu(event, id, isActive)}
                                                    >
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        rowsPerPageOptions={[9, 18, 27, 36, 45]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </Card>
            </Container>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Link to={`info/${selectedCenterId}`} style={{ textDecoration: 'none', color: '#2CD3E1' }}>
                    <MenuItem>
                        <Iconify icon={'eva:info-fill'} sx={{ mr: 2 }} />
                        Detail
                    </MenuItem>
                </Link>
                <MenuItem disabled={!status} sx={{ color: 'error.main' }} onClick={handleOpenDelete}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

            {confirmDelete && (
                <Dialog open={confirmDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Delete the center</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this center?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete}>Cancel</Button>
                        <Button
                            onClick={() => handleDeleteCenter(selectedCenterId)}
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}