import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {CircularProgress, Grid, Paper, TextField, useTheme} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {addNews} from "../../redux/actions/news";
import isMobile from "../isMobile";



interface Modal {
    handleClose: () => void,
    state: boolean
}

export const NewsModal = ({handleClose, state}: Modal) => {
    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const mobile = isMobile()
    const theme = useTheme()
    const imageField = useFormField("")
    const urlField = useFormField("")
    const titleField = useFormField("")
    const textField = useFormField("")

    const dispatch: Dispatch<any> = useDispatch()

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const [loading, setLoading] = useState(false)


    const bigScreenFlag = window.innerWidth > 1600


    const handleClick = async () => {

        if (imageField.value.length > 0 && urlField.value.length > 0) {
            let promo: INews = {
                id: '',
                image: imageField.value,
                url: urlField.value,
                header: titleField.value,
                text: textField.value,
                date: new Date()
            }
            setLoading(true)
            try {
                await submitTicket(promo)
                setLoading(false);
                handleClose()
                alert('Success!')
            } catch (err) {
                alert('Something went wrong! Please try again.')
                setLoading(false);
            }
        }

        else {
            alert('Check the field again!')
        }
    }


    const submitTicket = useCallback(
        (promo: IPromo) => dispatch(addNews(promo)),
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
        borderRadius:  mobile ? 2 : 5,
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
    Add news
    </Typography>

        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                    style={{
                        width: '100%',
                        marginBottom: '0.5rem',
                    }}
                    id="outlined-name"
                    label="Title"
                    required
                    onChange={titleField.onChange}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                    style={{
                        width: '100%',
                        marginBottom: '0.5rem',
                    }}
                    id="outlined-name"
                    label="Image"
                    required
                    onChange={imageField.onChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                    style={{
                        width: '100%',
                        marginBottom: '0.5rem',
                    }}
                    id="outlined-name"
                    label="Link to"
                    required
                    onChange={urlField.onChange}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                    style={{
                        width: '100%',
                        marginBottom: '0.5rem',
                    }}
                    id="outlined-name"
                    label="Text"
                    required
                    multiline
                    rows={3}
                    onChange={textField.onChange}
                />
            </Grid>
        </Grid>

        {

            imageField.value.length > 0 ? <img src={imageField.value} alt="Wrong img url"
                                               style={{
                                                   height: 120,
                                                   textAlign: 'center',
                                                   borderRadius: 10,
                                                   marginTop: '0.5rem',
                                                   marginBottom: '0.5rem'
                                               }}/> :
                <Typography variant="h5" style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#fff',
                    marginTop: '1rem'
                }}>
                    Post Image example*
                </Typography>
        }

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
