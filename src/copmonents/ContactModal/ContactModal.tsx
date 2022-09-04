import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {CircularProgress, Paper, TextField, useTheme} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {addTicket} from "../../redux/actions/ticket";
import isMobile from "../isMobile";



interface Modal {
    handleClose: () => void,
    state: boolean
}

export const ContactModal = ({handleClose, state}: Modal) => {
    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const mobile = isMobile()
    const theme = useTheme()

    const descriptionField = useFormField("")
    const emailField = useFormField("")
    const dispatch: Dispatch<any> = useDispatch()

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const [loading, setLoading] = useState(false)


    const bigScreenFlag = window.innerWidth > 1600


    const handleClick = async () => {

        if (emailField.value.length > 0 || descriptionField.value.length > 0 ) {
            let ticket: ITicket = {
                id: '',
                email: emailField.value,
                ticket: descriptionField.value
            }
            setLoading(true)
            try {
                await submitTicket(ticket)
                setLoading(false);
                handleClose()
                alert('Your response is recorded!')
            } catch (err) {
                alert('Something went wrong! Please try again.')
                setLoading(false);
            }
        }

        else {
            alert('Not all the field are correct!')
        }
    }


    const submitTicket = useCallback(
        (ticket: ITicket) => dispatch(addTicket(ticket)),
        [dispatch]
    )

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        minWidth: mobile ? '80%' : 800,
        bgcolor: 'background.paper',
        outline: 'none',
        borderRadius: mobile ? 2 : 5,
        boxShadow: 24,
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#262b36'
    };


    return (
        <div>
            <Modal
                open={state}
                sx={{
                    border: 'none',
                }}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant={bigScreenFlag ? 'h3' : 'h4'} style={{
                        fontFamily: 'Pixels',
                        padding: 5,
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                       Please describe your issue
                    </Typography>

                    <TextField
                        style={{
                            width: '100%',
                            marginBottom: '0.5rem',
                        }}
                        id="outlined-name"
                        label="email"
                        helperText="e.g. myemail@email.com"
                        required
                        onChange={emailField.onChange}
                    />

                    <TextField
                        style={{
                            width: '100%',
                        }}
                        multiline
                        required
                        rows={3}
                        id="outlined-name"
                        label="Issue or proposition"
                        helperText="max 750 characters"
                        onChange={descriptionField.onChange}
                    />

                    <Paper
                        onClick={handleClick}
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? 'transparent' : theme.palette.primary.contrastText,
                            border: `1px solid ${theme.palette.primary.contrastText}`,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            cursor: 'pointer',
                            marginTop: '0.7rem'
                        }}>

                        {
                            loading ? <CircularProgress size="2rem" style={{
                                color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
                                padding: 4
                            }}/> : <GoPlus style={{
                                color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
                                fontSize: 25,
                                paddingLeft: 4
                            }}/>
                        }


                        <Typography variant="h5" style={{
                            color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
                            fontFamily: 'Pixels',
                            padding: 5,
                            paddingLeft: 0,
                            paddingRight: 7,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}>
                            Submit
                        </Typography>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
};
