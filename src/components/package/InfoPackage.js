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
    Avatar,
    CardActions,
} from '@mui/material';
import { autoBatchEnhancer } from '@reduxjs/toolkit';

function InfoPackage() {
    const PACKAGE_API = `${process.env.REACT_APP_FETCH_API}/package-details`;
    const { packageId } = useParams();
    const [packages, setPackages] = useState({});

    useEffect(() => {
        if (packageId) {
            axios
                .get(`${PACKAGE_API}/${packageId}`)
                .then(res => {
                    setPackages(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [packageId]);

    console.log(packages)
    return (
        <form autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader title="packages's Detail" style={{ paddingBottom: '20px', fontSize: '100px' }} />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>

                            <Grid xs={12} md={12}>
                                <Avatar
                                    src={packages.image}
                                    sx={{
                                        height: 140,
                                        mb: 2,
                                        width: 140,
                                        ml: 'auto',
                                        mr: 'auto'
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Center's name"
                                    name="centerName"
                                    value={packages.centerName || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Package name"
                                    name="packageName"
                                    value={packages.packageName || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={packages.price || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={packages.description || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} md={12}>
                                <CardActions sx={{ justifyContent: 'flex-start' }}>
                                    <Chip
                                        label={packages.isActive ? 'Active' : 'Inactive'}
                                        style={packages.isActive ?
                                            { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' } :
                                            { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                                        }
                                        variant="outlined"
                                    />

                                    <Chip
                                        label={packages.status ? 'Stocking' : 'Out of stock'}
                                        style={packages.status ?
                                            { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' } :
                                            { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                                        }
                                        variant="outlined"
                                    />
                                </CardActions>
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
                <Divider />

            </Card>
        </form>
    );
}

export default InfoPackage;