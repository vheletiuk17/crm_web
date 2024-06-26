import React, { FC, useEffect, useState } from "react";
import css from './orderMoreDetailes.module.css'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { IComment } from "../../../Interface/commentInterface";
import { useAppDispatch } from "../../../Hook/reduxHooks";
import {Sort} from "../../SortContainer/Sort";

interface IProps {
    details: number;
}

const OrderMoreDetails: FC<IProps> = ({ details }) => {
    const { handleSubmit, control, watch, formState: { errors } } = useForm<IComment>();
    const dispatch = useAppDispatch();
    const watchedFields = watch();

    const comment: SubmitHandler<IComment> = async (user) => {
        // const {meta: {requestStatus}} = await dispatch(authActions.login({user}))
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        // Check if any field has a value
        const hasValue = Object.values(watchedFields).some(value => value && value.length > 0);
        setIsButtonDisabled(!hasValue);
    }, [watchedFields]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className={css.container}>
            <div className={css.formContainer}>
                <form onSubmit={handleSubmit(comment)} className={css.form}>
                    <Controller control={control} name={"comment"} render={({ field }) => (
                        <TextField
                            type="text"
                            label="comment"
                            className={css.comment}
                            size={"small"}
                            fullWidth={true}
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.comment}
                            helperText={errors.comment ? errors.comment.message : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: green[900], // Колір рамки при фокусі
                                    },
                                }, '& .MuiInputLabel-root.Mui-focused': {
                                    color: green[900], // Колір тексту мітки при фокусі
                                },
                            }}
                        />
                    )} />
                    <Button
                        size={"medium"}
                        style={{ background: green[900] }}
                        type="submit"
                        variant={"contained"}
                        sx={{ ml: 2, width: '50px', height: '40px' }}>
                        Submit
                    </Button>
                </form>
            </div>
            <div className={css.btn_edit}>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Sort/>
                        </Typography>

                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export { OrderMoreDetails };