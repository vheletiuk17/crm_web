import React, {FC, useState} from "react";
import css from './orderMoreDetailes.module.css'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import {IComment} from "../../../Interface/commentInterface";
// import {useAppDispatch} from "../../../Hook/reduxHooks";



interface IProps {
    details: number;
}

const OrderMoreDetails: FC<IProps> = ({details}) => {
    const {handleSubmit, control, watch, formState: {errors}} = useForm<IComment>();
    // const dispatch = useAppDispatch();


    const comment: SubmitHandler<IComment> = async (user) => {

    }


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
        <tr className={css.container}>


            <td className={css.formContainer}>
                <form onSubmit={handleSubmit(comment)} className={css.form}>
                    <Controller control={control} name={"comment"} render={({field}) => (
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
                                        borderColor: green[900],
                                    },
                                }, '& .MuiInputLabel-root.Mui-focused': {
                                    color: green[900],
                                },
                            }}
                        />
                    )}/>
                    <Button
                        size={"medium"}
                        style={{background: green[900]}}
                        type="submit"
                        variant={"contained"}
                        sx={{ml: 2, width: '50px', height: '40px'}}>
                        Submit
                    </Button>
                </form>
            </td>
            <td className={css.btn_edit}>
                <Button onClick={handleOpen}
                        size={"medium"}
                        style={{background: green[900]}}
                        type="submit"
                        variant={"contained"}
                        sx={{ml: 2, width: '50px', height: '40px'}}>Edit</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">

                        </Typography>

                    </Box>
                </Modal>
            </td>
        </tr>
    );
};

export {
    OrderMoreDetails
};
