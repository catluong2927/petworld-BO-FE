import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import UserProfile from '../sections/@dashboard/user/user-popover';
import UserProfileDetails from '../sections/@dashboard/user/user-profile-details';


const Page = () => {

    const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;
    const { userId } = useParams();
    const [user, setUser] = useState({});
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

    console.log(user)


    return (
        <>
            <Helmet>
                <title> Info User </title>
            </Helmet>
            <Box>
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Info User
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
                                    <UserProfile user={user} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <UserProfileDetails user={user} />
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