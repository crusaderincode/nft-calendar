import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {CircularProgress, Grid, Paper, TextField} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {addTicket} from "../../redux/actions/ticket";
import {addPromo} from "../../redux/actions/promo";



interface Modal {
    handleClose: () => void,
    state: boolean
}

export const PromoModal = ({handleClose, state}: Modal) => {
    const useFormField = (initialValue: string) => {
        const [value, setValue] = useState(initialValue);
        const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
        return {value, onChange};
    };

    const imageField = useFormField("")
    const urlField = useFormField("")
    const dispatch: Dispatch<any> = useDispatch()

    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const [loading, setLoading] = useState(false)


    const bigScreenFlag = window.innerWidth > 1600


    const handleClick = async () => {

        if (imageField.value.length > 0 && urlField.value.length > 0) {
            let promo: IPromo = {
                id: '',
                image: imageField.value,
                url: urlField.value
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
        (promo: IPromo) => dispatch(addPromo(promo)),
        [dispatch]
    )

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        minWidth: 800,
        bgcolor: 'background.paper',
        outline: 'none',
        borderRadius: 5,
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
    Add promo
    </Typography>

        <Grid container spacing={3}>
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
        </Grid>

        {

            imageField.value.length > 0 ? <img src={imageField.value} alt="Wrong img url"
                                               style={{
                                                   width: '100%',
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
                    Collection Image example*
                </Typography>
        }

    <Paper
    onClick={handleClick}
    onMouseOver={() => setSubmitButtonHover(true)}
    onMouseOut={() => setSubmitButtonHover(false)}
    style={{
        backgroundColor: submitButtonHover ? 'transparent' : '#fbff2b',
            border: '1px solid #fbff2b',
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
        color: submitButtonHover ? '#fbff2b' : '#424242',
            padding: 4
    }}/> : <GoPlus style={{
        color: submitButtonHover ? '#fbff2b' : '#424242',
            fontSize: 25,
        paddingLeft: 4
    }}/>
}


<Typography variant="h5" style={{
    color: submitButtonHover ? '#fbff2b' : '#424242',
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
