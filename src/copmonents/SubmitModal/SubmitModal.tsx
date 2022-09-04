import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Paper, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import logo from "../../img/logo.png"
import {BsCheckCircleFill} from "react-icons/bs";

interface Modal {
    handleClose: () => void,
    state: boolean
}

export const SubmitModal = ({handleClose, state}: Modal) => {
    const [submitButtonHover, setSubmitButtonHover] = useState(false)
    const theme = useTheme()


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        backgroundColor: '#161d30',
        outline: 'none',
        borderRadius: 3,
        boxShadow: 24,
        paddingTop: 1,
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 2,
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
                        color: theme.palette.primary.contrastText,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        Your NFT drop submitted!
                    </Typography>

                    <div style={{
                        marginTop: '0.1rem',
                        marginBottom: '0.5rem'
                    }}>
                    <Typography variant='h5' display="inline" style={{
                        fontFamily: 'Pixels',
                        padding: 0,
                        margin: 0,
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: '1rem'
                    }}>
                        Want to get a verified badge?
                    </Typography>
                        <BsCheckCircleFill style={{
                            fontSize: 20,
                            color: '#4bb543',
                            marginLeft: 10,
                            marginTop: 10
                        }}/>
                    </div>

                    <Typography variant='body1' style={{
                        fontFamily: 'Pixels',
                        padding: 0,
                        margin: 0,
                        color: '#fff',
                        textAlign: 'justify',
                        fontWeight: 'bold',
                    }}>
                      Post our logo on your website with a link to Honey Drops
                    </Typography>

                    <img src={logo} style={{
                        width: 200,
                        textAlign: 'center',
                        marginTop: '1rem',
                        marginBottom: '0.5rem'
                    }}/>

                    <Link to="/" style={{
                        textDecoration: 'none'
                    }}>
                    <Paper
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? 'transparent' : theme.palette.primary.contrastText,
                            border: `1px solid ${theme.palette.primary.contrastText}`,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginTop: '0.7rem',
                        }}>

                        <Typography variant="h5" style={{
                            color: submitButtonHover ? theme.palette.primary.contrastText : '#424242',
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

