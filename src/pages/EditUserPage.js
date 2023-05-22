import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
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
    const [newAvatar, setNewAvatar] = useState('')
    const [currentUser, setCurrentUser] = useState(user)
    const toast = useRef(null);

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
            <Toast ref={toast} />
            <Helmet>
                <title> Edit User </title>
            </Helmet>
            <Box>
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
                                    <AccountProfile user={(newAvatar) ? currentUser : user} setNewAvatar={setNewAvatar} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <AccountProfileDetails currentUser = {(newAvatar) ? currentUser : user} toast={toast}/>
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