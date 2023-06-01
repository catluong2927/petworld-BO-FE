import { useEffect, useState } from 'react';
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
    FormControlLabel,
    Unstable_Grid2 as Grid
} from '@mui/material';

const AccountProfileDetails = (props) => {
    const ROLE_API = `${process.env.REACT_APP_FETCH_API}/userroles`;

    const USER_ROLE_API = `${process.env.REACT_APP_FETCH_API}/role`;

    const isLogin = useSelector((state) => state.auth.login?.currentUser);

    const [data, setData] = useState({})

    const [token, setToken] = useState('');

    const [roleList, setRoleList] = useState([]);

    const [checkedRoles, setCheckedRoles] = useState([]);

    const { user } = props;

    useEffect(() => {
        const roleNames = user && user.userRoleDtos?.map((role) => role.roleDtoResponse.id);
        if (roleNames) {
            setCheckedRoles(roleNames);
        }
    }, [user]);

    useEffect(() => {
        setToken(isLogin.token)
    }, [isLogin])

    useEffect(() => {
        if(token) {
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
        }
    }, [token]);

    const checkboxHandler = (event) => {
        let updatedList = [...checkedRoles];
        if (event.target.checked) {
            updatedList = [...checkedRoles, +(event.target.value)];
        } else {
            updatedList.splice(checkedRoles.indexOf(+(event.target.value)), 1);
        }
        setCheckedRoles(updatedList.sort());
    };

    function checkedUserRole(userRoles, roleName) {
        if (userRoles && userRoles.indexOf(roleName) !== -1) return true;
        return false;
    }

    const handleEnhancedAuthorization = async () => {
        if (checkedRoles) {
            await axios
                .put(`${USER_ROLE_API}/${user.id}?roles=${checkedRoles}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Editing is successful', life: 3000 });
                    window.location.reload();
                })
                .catch(err => {
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${err}`, life: 3000 });
                    throw err;
                });
        }
    }

    console.log('checkedRoles: ', checkedRoles)

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
                                                id={role.id.toString()}
                                                value={role.id}
                                                onChange={checkboxHandler}
                                                checked={checkedUserRole(checkedRoles, role.id)}
                                            />
                                        }
                                        label={role.desc}
                                    />
                                </Grid>
                            ))}

                        </Grid>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={() => handleEnhancedAuthorization()}>
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