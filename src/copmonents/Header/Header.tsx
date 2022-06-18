import React, {useState} from 'react';
import {Container, Paper, Typography} from "@mui/material";
import {GoPlus} from "react-icons/go";
import {FaTwitter} from "react-icons/fa";
import firebase from "firebase/compat";


interface Header {
    handleModalOpen: () => void
}

export const Header = (props: Header) => {
    const [submitButtonHover, setSubmitButtonHover] = useState(false)

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            paddingTop: 20,
            width: '100%'
        }}>
            <Container maxWidth="lg" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                <Typography variant="h5" style={{
                    color:  '#fff',
                    fontFamily: 'Pixels',
                    padding: 5,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                    NFT Calendar
                </Typography>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Paper
                        onClick={props.handleModalOpen}
                        onMouseOver={() => setSubmitButtonHover(true)}
                        onMouseOut={() => setSubmitButtonHover(false)}
                        style={{
                            backgroundColor: submitButtonHover ? '#fff' : '#c80e72',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                        <GoPlus style={{
                            color: submitButtonHover ? '#c80e72' : '#fff',
                            fontSize: 25,
                            paddingLeft: 4
                        }}/>
                        <Typography variant="h5" style={{
                            color: submitButtonHover ? '#c80e72' : '#fff',
                            fontFamily: 'Pixels',
                            padding: 5,
                            paddingLeft: 0,
                            paddingRight: 7,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}>
                            Submit NFT
                        </Typography>
                    </Paper>

                    <FaTwitter style={{fontSize: 30, cursor: 'pointer', color: '#fff', marginLeft: '2rem',}}
                               onClick={() => window.open("https://twitter.com/Hazed_Chameleon", "_blank")}
                    />
                </div>
            </Container>
        </div>
    );
};

