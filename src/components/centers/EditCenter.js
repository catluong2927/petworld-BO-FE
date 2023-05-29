import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useParams } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    CardActions,
    Unstable_Grid2 as Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function EditCenter() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const CENTER_API = `${process.env.REACT_APP_FETCH_API}/centers`;

    const userEmail = currentUser.userDtoResponse.email;

    const { centerId } = useParams();

    const [editCenter, setEditCenter] = useState({});

    const toast = useRef(null);

    useEffect(() => {
        if (centerId) {
            axios
                .get(`${CENTER_API}/${centerId}`)
                .then(res => {
                    setEditCenter(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [centerId]);

    function handleChange(e) {
        setEditCenter({
            'userEmail': userEmail,
            ...editCenter,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        axios
            .put(`${CENTER_API}/${centerId}`, editCenter)
            .then(res => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Create successfully', life: 3000 });
                window.location.href = "/dashboard/centers/owner";
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Create Fail', life: 3000 });
                throw err;
            });
    }

    console.log(editCenter)

    return (
        <>
            <Toast ref={toast} />
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Center"
                        style={{ paddingBottom: '20px', fontSize: '100px' }}
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                    hidden
                                >
                                    <TextField
                                        fullWidth
                                        label="id"
                                        name="id"
                                        onChange={(e) => handleChange(e)}
                                        value={editCenter.id || ''}
                                        hidden
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the Name"
                                        label="Name"
                                        name="name"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        value={editCenter.name || ''}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        value={editCenter.email || ''}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={(e) => handleChange(e)}
                                        type="number"
                                        required
                                        value={editCenter.phone || ''}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        value={editCenter.address || ''}
                                    />
                                </Grid>

                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="User email"
                                        name="userEmail"
                                        onChange={(e) => handleChange(e)}
                                        value={userEmail || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Active"
                                            name="isActive"
                                            value={editCenter.isActive || ''}
                                            onChange={(e) => handleChange(e)}
                                            required
                                        >
                                            <MenuItem value={'true'}>Active</MenuItem>
                                            <MenuItem value={'false'}>Inactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={(e) => handleSubmit(e)}>
                            Save details
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
}

export default EditCenter;