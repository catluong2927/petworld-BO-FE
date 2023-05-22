import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';


const AccountProfileDetails = (props) => {
    const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;
    const [values, setValues] = useState({});

    useEffect(() => {
        setValues(props.currentUser)
    }, [props])

    console.log(values)

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoaWV1QGNvZGVneW0uY29tIiwiaWF0IjoxNjg0Njk3ODU0LCJleHAiOjE2ODQ3MTU4NTR9.gq8cn2G-nmAkfgMD6MtKd5U-O8QMUOP3A45uJCTIQqXEXTFiK5qYDqR0GuYhiDMz0D1HExs4VcMZ4khI4Z9DFA';

    const handleSubmit = useCallback(
        (event) => {
            console.log('1')
            event.preventDefault();
            axios
                .put(`${USER_API}`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    window.location.href = "/dashboard/user";
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        },
        [props.toast]
    );


    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="Full name"
                                    name="fullName"
                                    onChange={handleChange}
                                    required
                                    value={values.fullName || ''}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone || ''}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    onChange={handleChange}
                                    required
                                    value={values.address || ''}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" type="submit">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;