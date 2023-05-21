import { useCallback, useState } from 'react';
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
    const [values, setValues] = useState({
        firstName: 'Anika',
        lastName: 'Visser',
        email: 'demo@devias.io',
        phone: '',
        state: 'los-angeles',
        country: 'USA'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    console.log(props.currentUser)
    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Edit"
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
                                    helperText="Please specify the full name"
                                    label="Full name"
                                    name="fullrstName"
                                    onChange={handleChange}
                                    required
                                    value={props.currentUser.fullName}
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
                                    value={props.currentUser.phone}
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
                                    value={props.currentUser.address}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;