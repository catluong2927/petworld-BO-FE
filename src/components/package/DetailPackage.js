import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Button,
    TextField,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Unstable_Grid2 as Grid
} from '@mui/material';

import Iconify from '../iconify';

const DetailPackage = (props) => {

    const PACKAGE_DETAIL_API = `${process.env.REACT_APP_FETCH_API}/centers`;

    const userEmail = props.currentUser.userDtoResponse.email;

    const [center, setCenter] = useState({});

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [statusDelete, setStatusDelete] = useState(false);

    const toast = useRef(null);

    useEffect(() => {
        if (userEmail) {
            axios
                .get(`${PACKAGE_DETAIL_API}/package-details/center/${userEmail}`)
                .then(res => {
                    setCenter(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [userEmail]);

    function isEmpty(obj) {
        const valueArr = Object.values(obj);
        if (valueArr.includes(null)) {
            return true;
        }
        return false;
    }

    const handleOpenDelete = () => {
        setConfirmDelete(true);
    };

    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };

    function handleDeleteCenter(centerId) {
        if (centerId) {
            axios
                .delete(`${PACKAGE_DETAIL_API}/${centerId}`)
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: `Delete ${center.name} successfully`, life: 3000 });
                    setConfirmDelete(false);
                    setStatusDelete(true);
                })
                .then(setTimeout(() => window.location.reload(), 3000))
                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Delete Fail', life: 3000 });
                });
        }
    }

    console.log(center)

    return (
        <>
            <Toast ref={toast} />
            < form
                autoComplete="off"
                noValidate
            >
                <Card>
                    <CardHeader title="Package Detail" style={{ paddingBottom: '20px', fontSize: '100px' }} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>

                            <Grid container spacing={3}>

                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={center.name || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        value={center.phone || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={center.email || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={center.address || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid xs={12} md={6}>
                                    <Chip
                                        label={center.isActive ? 'Active' : 'Inactive'}
                                        style={center.isActive ?
                                            { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' } :
                                            { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                                        }
                                        variant="outlined"
                                    />
                                </Grid>

                            </Grid>

                            <Grid xs={12} md={12}>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteIcon />}
                                        style={{ backgroundColor: "#ED2B2A", color: "#fff", marginRight: '10px' }}
                                        onClick={handleOpenDelete}
                                        disabled={!center.isActive}
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/dashboard/centers/owner/edit/${center.id}`}>
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            style={{ backgroundColor: "#54E346", color: "#fff" }}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Grid>

                        </Box>
                    </CardContent>
                </Card>
            </form >

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
                            onClick={() => handleDeleteCenter(center.id)}
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default DetailPackage;