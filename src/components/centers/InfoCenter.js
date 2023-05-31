import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Chip,
    Unstable_Grid2 as Grid,
    colors,
} from '@mui/material';

function InfoCenter() {
    const CENTER_API = `${process.env.REACT_APP_FETCH_API}/centers`;
    const { centerId } = useParams();
    const [center, setCenter] = useState({});

    useEffect(() => {
        if (centerId) {
            axios
                .get(`${CENTER_API}/${centerId}`)
                .then(res => {
                    setCenter(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [centerId]);

    console.log(center)
    return (
        <form autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader title="Center's Detail" style={{paddingBottom: '20px', fontSize:'100px'}}/>
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12} md={6}>
                                <Chip 
                                    label={center.isActive ? 'Active' : 'Inactive'} 
                                    style={center.isActive ? 
                                            {backgroundColor:'#C7F2A4', color:'#5F8D4E', fontSize:'15px', fontWeight:'bold'} : 
                                            {backgroundColor:'#FFA8A8', color:'#DF2E38', fontSize:'15px', fontWeight:'bold'}
                                        } 
                                    variant="outlined" 
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
                <Divider />

            </Card>
        </form>
    );
}

export default InfoCenter;