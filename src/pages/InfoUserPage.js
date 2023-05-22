import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
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

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoaWV1QGNvZGVneW0uY29tIiwiaWF0IjoxNjg0NjkzNTk1LCJleHAiOjE2ODQ3MTE1OTV9.atexfoTNHQnZ5wSpVx8AhuWbJg4qTpMy_k0aeVopqZhIhZdkq-6-_Ua-OR5AP96-Xhb6WqCDHZ_cLzIkDMSOuw';

    useEffect(() => {
        if (userId) {
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
    }, [userId]);

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
                                    <UserProfile user={user}/>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <UserProfileDetails user = {user}/>
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