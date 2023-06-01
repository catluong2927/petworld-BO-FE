import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import AccountProfile from '../sections/@dashboard/user/account-popover';
import AccountProfileDetails from '../sections/@dashboard/user/account-profile-details';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


const Page = () => {

    const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const toast = useRef(null);
    const isLogin = useSelector((state) => state.auth.login?.currentUser);
    const [token, setToken] = useState('');
    

    useEffect(() => {
        setToken(isLogin.token)
    }, [isLogin])

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
            <Toast ref={toast} />
            <Helmet>
                <title> Edit User </title>
            </Helmet>
            <Box>
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Edit User's Role
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
                                    <AccountProfile user={user} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <AccountProfileDetails user={user} toast={toast} />
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