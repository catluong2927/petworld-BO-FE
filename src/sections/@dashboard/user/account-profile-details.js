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


const AccountProfileDetails = (props) => {
    const ROLE_API = `${process.env.REACT_APP_FETCH_API}/role`;

    const [values, setValues] = useState({});

    const isLogin = useSelector((state) => state.auth.login?.currentUser);

    const [token, setToken] = useState('');

    const [admin, setAdmin] = useState({
        "id": 1,
        "name": "ROLE_ADMIN",
        "desc": "Quản trị viên"
    });

    const [customer, setCustomer] = useState({
        "id": 2,
        "name": "ROLE_CUSTOMER",
        "desc": "Khách hàng"
    });

    const [owner, setOwner] = useState({
        "id": 3,
        "name": "ROLE_OWNER",
        "desc": "Trung tâm dịch vụ"
    });

    const [statusAdmin, setStatusAdmin] = useState(false);
    const [statusCustomer, setStatusCustomer] = useState(false);
    const [statusOwner, setStatusOwner] = useState(false);

    useEffect(() => {
        setToken(isLogin.token)
    }, [isLogin])

    useEffect(() => {
        setValues(props.user)
    }, [props])

    useEffect(() => {
        // Kiểm tra xem người dùng đã có roleDtoResponse tương ứng hay chưa
        if (values.userRoleDtos) {
            setStatusAdmin(values.userRoleDtos.some(role => role.roleDtoResponse.id === admin.id));
            setStatusCustomer(values.userRoleDtos.some(role => role.roleDtoResponse.id === customer.id));
            setStatusOwner(values.userRoleDtos.some(role => role.roleDtoResponse.id === owner.id));
        }
    }, [values]);

    console.log(values)

    // Admin
    const handleAddRoleAdmin = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/${values.id}`, admin, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusAdmin(false);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }
    const handleRemoveRoleAdmin = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/remove/${values.id}`, admin, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusAdmin(true);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }

    const handleAddRoleCustomer = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/${values.id}`, customer, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusCustomer(false);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }
    const handleRemoveRoleCustomer = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/remove/${values.id}`, customer, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusCustomer(true);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }
    const handleAddRoleOwner = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/${values.id}`, owner, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusOwner(false);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }
    const handleRemoveRoleOwner = (e) => {
        e.preventDefault();
        if (values.id) {
            axios
                .put(`${ROLE_API}/remove/${values.id}`, owner, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    setStatusOwner(true);
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }




    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
                    title="All roles"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid xs={12} md={12} container spacing={4}>
                                <Grid xs={12} md={6} lg={3}>
                                    1
                                </Grid>
                                <Grid xs={12} md={6} lg={3}>
                                    Quản trị viên
                                </Grid>
                                <Grid xs={12} md={6} lg={3}>
                                    <Button variant="contained" color="success" disabled={statusAdmin} onClick={(e) => handleAddRoleAdmin(e)}>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid xs={12} md={6} lg={3}>
                                    <Button variant="contained" color="error" disabled={!statusAdmin} onClick={(e) => handleRemoveRoleAdmin(e)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid xs={12} md={12} container spacing={4}>
                                <Grid xs={6} md={3} >
                                    2
                                </Grid>
                                <Grid xs={6} md={3} >
                                    Khách hàng
                                </Grid>
                                <Grid xs={6} md={3} >
                                    <Button variant="contained" color="success" disabled={statusCustomer} onClick={(e) => handleAddRoleCustomer(e)}>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid xs={6} md={3} >
                                    <Button variant="contained" color="error" disabled={!statusCustomer} onClick={(e) => handleRemoveRoleCustomer(e)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid xs={12} md={12} container spacing={4}>
                                <Grid xs={6} md={3} >
                                    3
                                </Grid>
                                <Grid xs={6} md={3} >
                                    Trung tâm dịch vụ
                                </Grid>
                                <Grid xs={6} md={3} >
                                    <Button variant="contained" color="success" disabled={statusOwner} onClick={(e) => handleAddRoleOwner(e)}>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid xs={6} md={3} >
                                    <Button variant="contained" color="error" disabled={!statusOwner} onClick={(e) => handleRemoveRoleOwner(e)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
            </Card>
        </form>
    );
};

export default AccountProfileDetails;