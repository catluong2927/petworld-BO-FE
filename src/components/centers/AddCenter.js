import { useState , useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Toast } from 'primereact/toast';

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
} from '@mui/material';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function AddCenter() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const CENTER_API = `${process.env.REACT_APP_FETCH_API}/centers`;

    const userEmail = currentUser.userDtoResponse.email;

    const [newCenter, setNewCenter] = useState({});

    const toast = useRef(null);

    function handleChange(e) {
        setNewCenter({
            'userEmail': userEmail,
            ...newCenter,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        console.log('submit')
        axios
            .post(`${CENTER_API}`, newCenter)
            .then(res => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Create successfully', life: 3000 });
                window.location.href = "/dashboard/owner/centers";
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Create Fail', life: 3000 });
                throw err;
            });
    }

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
                                        value={newCenter.id || ''}
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
                                        value={newCenter.name || ''}
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
                                        value={newCenter.email || ''}
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
                                        value={newCenter.phone || ''}
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
                                        value={newCenter.address || ''}
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

export default AddCenter;