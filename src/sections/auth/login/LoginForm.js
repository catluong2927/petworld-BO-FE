import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Iconify from '../../../components/iconify';
import {loginUser} from "../../../redux/apiRequest";



export default function LoginForm() {
    const toast = useRef(null);
    function handleChangeLogin(event) {
        console.log(1)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = async () => {
        console.log(2)
        await loginUser(form, dispatch, navigate, toast)
    };

    return (
        <>
            <Toast ref={toast} />
            <Stack spacing={3}>
                <TextField name="email"
                           label="Email address"
                           value={form.email || ""}
                           onChange={(e) => handleChangeLogin(e)}
                />

                <TextField
                    value={form.password || ""}
                    onChange={(e) => handleChangeLogin(e)}
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <Checkbox name="remember" label="Remember me"/>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
            </LoadingButton>
        </>
    );
}
