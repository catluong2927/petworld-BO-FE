import { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Checkbox,
    TextField,
    FormControlLabel,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { autoBatchEnhancer } from '@reduxjs/toolkit';


const AccountProfileDetails = (props) => {
    const ROLE_API = `${process.env.REACT_APP_FETCH_API}/roles`;

    const [user, setUser] = useState({});

    const isLogin = useSelector((state) => state.auth.login?.currentUser);

    const [token, setToken] = useState('');

    const [roleList, setRoleList] = useState([]);

    const [checkedRoles, setCheckedRoles] = useState([]);

    const [userRoles, setUserRoles] = useState([])

    useEffect(() => {
        setToken(isLogin.token)
    }, [isLogin])

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        axios
            .get(`${ROLE_API}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setRoleList(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [token]);

    const checkboxHandler = (event) => {
        let updatedList = [...checkedRoles];
        if (event.target.checked) {
            updatedList = [...checkedRoles, event.target.value];
        } else {
            updatedList.splice(checkedRoles.indexOf(event.target.value), 1);
        }
        setCheckedRoles(updatedList);
    };


    // const handleAddRoleOwner = (e) => {
    //     e.preventDefault();
    //     if (values.id) {
    //         axios
    //             .put(`${ROLE_API}/${values.id}`, owner, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             .then(res => {
    //                 props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
    //                 setStatusOwner(false);
    //                 window.location.reload();
    //             })
    //             .catch(err => {
    //                 props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
    //                 throw err;
    //             });
    //     }
    // }

    function checkedUsereRole(userRoles, roleName) {
        console.log('userRoles: ', userRoles)
        console.log('roleName: ', roleName)
        if (userRoles.indexOf(roleName) !== -1) return true;
        return false;
    }

    // if (values && values.userDtoResponse) {
    //     const newRoles = values.userDtoResponse.userRoleDtos?.map(role => role.roleDtoResponse.name);
    //     roles = newRoles;
    // }



    // console.log('values: ', values);
    console.log('roles 1: ', userRoles)
    // console.log('checkedRoles: ',checkedRoles);

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
                    title="Identity management"
                    sx={{ fontSize: 60, paddingBottom: '20px' }}
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5, mr: 'auto', ml: 'auto' }}>
                        <Grid
                            container
                            spacing={1}
                        >

                            {roleList.map((role) => (
                                <Grid key={role.name} xs={12} md={12} container spacing={1} sx={{ padding: '10px' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={role.id}
                                                value={role.id}
                                                onChange={checkboxHandler}
                                                checked={checkedUsereRole(userRoles, role.name)}
                                            />
                                        }
                                        label={role.desc}
                                    />
                                </Grid>
                            ))}

                        </Grid>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="contained">
                                Save details
                            </Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;