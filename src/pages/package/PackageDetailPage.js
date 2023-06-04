import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard/DashboardLayout';

import OwnerPackageInfo from '../../components/package/OwnerPackageInfo';
import DetailPackage from '../../components/package/DetailPackage';
import ServicePackage from '../../components/package/ServicePackage';
import ReviewPackage from '../../components/package/ReviewPackage';

const Page = () => {

    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const PACKAGE_API = `${process.env.REACT_APP_FETCH_API}/package-details/center`;

    const [packageCenters, setPackageCenters] = useState([]);

    const [token, setToken] = useState('');

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (currentUser) {
            setToken(currentUser.token);
            setEmail(currentUser.userDtoResponse.email);
        }
    }, [currentUser, email])

    useEffect(() => {
        if (token && email) {
            console.log(email);
            axios
                .get(`${PACKAGE_API}/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setPackageCenters(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [token, email]);

    console.log('Package: ', packageCenters)

    return (
        <>
            <Helmet>
                <title>Package detail</title>
            </Helmet>

            <Box>
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Package detail
                            </Typography>
                        </div>
                        {
                            packageCenters && packageCenters.map((packageCenter, index) => (
                                <div key={index}>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            xs={12}
                                            md={6}
                                            lg={4}
                                        >
                                            <OwnerPackageInfo packageCenter={packageCenter} />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                            lg={8}
                                        >
                                            <Grid
                                                xs={12}
                                                md={6}
                                                lg={8}
                                                sx={{ marginBottom: '20px' }}
                                            >
                                                <ServicePackage servicePackages={packageCenter.serviceDtoResponses} />
                                            </Grid>
                                            {
                                                packageCenter.packageDetailReviewDtoResponses &&
                                                <Grid
                                                    xs={12}
                                                    md={6}
                                                    lg={8}
                                                >
                                                    <ReviewPackage reviewPackages={packageCenter.packageDetailReviewDtoResponses} />
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            ))
                        }
                    </Stack>
                </Container>
            </Box>

        </>
    )
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;