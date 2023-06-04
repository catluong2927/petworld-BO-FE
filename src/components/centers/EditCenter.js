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

    const [errors, setErrors] = useState({});

    const toast = useRef(null);

    const REGEX = {
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    };

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

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate Fullname
        if (!editCenter.name) {
            newErrors.name = 'Please specify the Name.';
            formIsValid = false;
        }

        // Validate Phone Number
        if (!editCenter.phone) {
            newErrors.phone = 'Please enter your central phone number.';
            formIsValid = false;
        } else if (editCenter.phone.length > 10) {
            newErrors.phone = 'Phone number should be less than or equal to 10 digits.';
            formIsValid = false;
        }

        // Validate email
        if (!editCenter.email) {
            newErrors.email = 'Please enter your central email.';
            formIsValid = false;
        } else if (!REGEX.email.test(editCenter.email)) {
            newErrors.email = 'Invalid email address.';
            formIsValid = false;
        }

        // Validate Address
        if (!editCenter.address) {
            newErrors.address = 'Please enter your central address.';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .put(`${CENTER_API}/${centerId}`, editCenter)
                .then((res) => {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Create successfully', life: 3000 });
                    window.location.href = '/dashboard/owner/centers';
                })
                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Create Fail', life: 3000 });
                    throw err;
                });
        }
    };

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
                                        error={!!errors.name}
                                        helperText={errors.name || ""}
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
                                        error={!!errors.email}
                                        helperText={errors.email}
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
                                        error={!!errors.phone}
                                        helperText={errors.phone}
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
                                        error={!!errors.address}
                                        helperText={errors.address}
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
                                            value={editCenter.isActive|| ''}
                                            onChange={(e) => handleChange(e)}
                                            required
                                        >
                                            <MenuItem value={'true'}>Active</MenuItem>
                                            <MenuItem value={'false'}>InActive</MenuItem>
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