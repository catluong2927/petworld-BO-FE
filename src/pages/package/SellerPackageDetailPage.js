import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard/DashboardLayout';

import CenterProfile from '../../components/centers/CenterProfile';
import DetailPackage from '../../components/package/DetailPackage';


const Page = () => {

    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;
    
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        setToken(currentUser.token)
        setUserId(currentUser.userDtoResponse.id)
    }, [currentUser])


    useEffect(() => {
        if (userId && token) {
            axios
                .get(`${USER_API}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [userId, token]);

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
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <CenterProfile user={user} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <DetailPackage currentUser={currentUser}/>
                                </Grid>
                            </Grid>
                        </div>
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