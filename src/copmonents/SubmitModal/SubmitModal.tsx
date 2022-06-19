import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, CircularProgress, Paper} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {Link} from "react-router-dom";

interface Modal {
    handleClose: () => void,
    state: boolean
}

export const SubmitModal = ({handleClose, state}: Modal) => {
    const [submitButtonHover, setSubmitButtonHover] = useState(false)


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 250,
        backgroundImage: `linear-gradient(to bottom, #1e2634, #1e2634, #151b25)`,
        outline: 'none',
        borderRadius: 5,
        boxShadow: 24,
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column'
    };



    return (
        <div>
            <Modal
                open={state}
                sx={{
                    border: 'none',
                    margin: 0
                }}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h4' style={{
                        fontFamily: 'Pixels',
                        padding: 0,
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        Your NFT drop submitted!
                    </Typography>
                    <Link to="/" style={{
                        textDecoration: 'none'
                    }}>
                    <Paper
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? '#fff' : '#c80e72',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginTop: '0.7rem',
                        }}>

                        <Typography variant="h5" style={{
                            color: submitButtonHover ? '#c80e72' : '#fff',
                            fontFamily: 'Pixels',
                            padding: 5,
                            paddingLeft: 7,
                            paddingRight: 7,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}>
                            Back to main page
                        </Typography>
                    </Paper>
                    </Link>

                </Box>
            </Modal>
        </div>
    );
};

