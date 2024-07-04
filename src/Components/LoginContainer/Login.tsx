import React from 'react';

import css from './login.module.css'
import {Button, TextField, Typography} from "@mui/material";
import {green} from '@mui/material/colors';

import {useNavigate} from "react-router";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../Interface/authInterface";
import {useAppDispatch, useAppSelector} from "../../Hook/reduxHooks";
import {authActions} from "../../Redux/Slice/authSlice";
import {joiResolver} from "@hookform/resolvers/joi";
import {formValidator} from "../../Validator/formValidators";


const Login = () => {
    const {handleSubmit, control, formState: {errors}} = useForm<IAuth>({
        resolver: joiResolver(formValidator)
    })
    const {error} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/orders')
        }
    }

    return (
        <div className={css.father_container}>
            <div className={css.login_container}>
                <form onSubmit={handleSubmit(login)} className={css.login_form}>
                    <Controller control={control} name={"email"} render={({field}) => (
                        <TextField type="text"
                                   label="email"
                                   size={"small"}
                                   margin={"normal"} fullWidth={true}
                                   onChange={(e) => field.onChange(e)}
                                   error={!!errors.email}
                                   helperText={errors.email ? errors.email.message : ''}
                                   sx={{
                                       '& .MuiOutlinedInput-root': {
                                           '&.Mui-focused fieldset': {
                                               borderColor: green[900],
                                           },
                                       }, '& .MuiInputLabel-root.Mui-focused': {
                                           color: green[900],
                                       },
                                   }}
                        />
                    )}/>
                    <Controller control={control} name={"password"} render={({field}) => (
                        <TextField type="password"
                                   label="password"
                                   size={"small"}
                                   margin={"normal"}
                                   fullWidth={true}
                                   onChange={(e) => field.onChange(e)}
                                   error={!!errors.password}
                                   helperText={errors.password ? errors.password.message : ''}
                                   sx={{
                                       '& .MuiOutlinedInput-root': {
                                           '&.Mui-focused fieldset': {
                                               borderColor: green[900],
                                           },
                                       }, '& .MuiInputLabel-root.Mui-focused': {
                                           color: green[900],
                                       },
                                   }}
                        />
                    )}/>
                    <Button size={"large"} style={{background: green[900]}} type="submit" variant={"contained"}
                            fullWidth={true} sx={{mt: 4}}>Login</Button>
                    <Typography className={css.errorTypography}>{error}</Typography>
                </form>
            </div>
        </div>
    );
};

export {Login};
