import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';


const UserProfileDetails = (props) => {
    const [values, setValues] = useState({});

    useEffect(() => {
        setValues(props.user)
    }, [props])

    console.log(values)

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
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
                                    label="Full name"
                                    name="fullName"
                                    required
                                    value={values.fullName || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
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
                                    type="number"
                                    value={values.phone || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
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
                                    required
                                    value={values.address || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    required
                                    value={values.email || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
            </Card>
        </form>
    );
};

export default UserProfileDetails;