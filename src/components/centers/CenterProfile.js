import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';


function CenterProfile(props) {

    const [center, setCenter] = useState({});
    const CENTER_API = `${process.env.REACT_APP_FETCH_API}/package-details/center`;

    useEffect(() => {
        axios
            .get(`${CENTER_API}/${props.user.email}`)
            .then(res => {
                setCenter(res.data);
            })
            .catch(err => {
                throw err;
            });
    }, [props]);

    console.log('center: ',center)

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={props.user.avatar}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        {props.user.fullName}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {center.name}&ensp;{center.phone}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {center.address}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
        </Card>
    )
};


export default CenterProfile;