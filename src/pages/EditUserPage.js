import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import AccountProfile from '../sections/@dashboard/user/account-popover';
import AccountProfileDetails from '../sections/@dashboard/user/account-profile-details';


const Page = () => {

    const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [newAvatar, setNewAvatar] = useState('')
    const [currentUser, setCurrentUser] = useState(user)

    useEffect(() => {
        if (userId) {
            axios
                .get(`${USER_API}/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [userId]);

    useEffect(() => {
        setCurrentUser(prevUser => ({
            address: user.address,
            avatar: newAvatar,
            email: user.email,
            fullName: user.fullName,
            id: user.id,
            isStatus: user.isStatus,
            phone: user.phone,
            rememberToken: user.rememberToken,
            userName: user.userName
        }));
    }, [newAvatar]);

    console.log(currentUser)

    return (
        <>
            <Helmet>
                <title> Edit User </title>
            </Helmet>
            <Box
            // component="main"
            // sx={{
            //     flexGrow: 1,
            //     py: 8
            // }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Edit User
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
                                    <AccountProfile user={user} setNewAvatar={setNewAvatar} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <AccountProfileDetails currentUser = {(newAvatar) ? currentUser : user} />
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